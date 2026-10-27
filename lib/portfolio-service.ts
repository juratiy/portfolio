import { imageType, MAX_FILE_BYTES, MAX_IMAGES, MAX_TOTAL_BYTES, defaultProjects, validateMetadata } from "./project-data.ts";
import type { Project } from "./project-data.ts";
export type Actor = {userId:string;email:string}|null;
export type PortfolioEnv = { DB?: D1Database; BUCKET?: R2Bucket; PORTFOLIO_OWNER_EMAIL?: string };
export class PortfolioError extends Error {
  status:number;
  constructor(message:string,status=400){super(message);this.status=status;}
}
export function isOwner(actor:Actor, env:PortfolioEnv) {
  return Boolean(actor?.userId && env.PORTFOLIO_OWNER_EMAIL && actor.email.toLowerCase()===env.PORTFOLIO_OWNER_EMAIL.toLowerCase());
}
export function authorizeWrite(request:Request,actor:Actor,env:PortfolioEnv) {
  if(!isOwner(actor,env)) throw new PortfolioError("Only the portfolio owner can make changes.",403);
  const origin=request.headers.get("origin");
  if((origin && origin!==new URL(request.url).origin) || request.headers.get("sec-fetch-site")==="cross-site") throw new PortfolioError("Please make changes from this website.",403);
}
export async function listProjects(env:PortfolioEnv):Promise<Project[]> {
  if(!env.DB) throw new PortfolioError("The portfolio storage is temporarily unavailable.",503);
  const rows=await env.DB.prepare("SELECT data, archived FROM portfolio_projects ORDER BY created_at DESC").all<{data:string;archived:number}>();
  const map=new Map(defaultProjects.map(p=>[p.id,{...p}]));
  for(const row of rows.results){const p=JSON.parse(row.data) as Project;map.set(p.id,{...p,archived:Boolean(row.archived)});}
  return [...map.values()];
}
async function writeProject(env:PortfolioEnv,p:Project,ownerId:string) {
  await env.DB!.prepare("INSERT INTO portfolio_projects (id,data,archived,created_at,updated_at,owner_id) VALUES (?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data,archived=excluded.archived,updated_at=excluded.updated_at,owner_id=excluded.owner_id")
    .bind(p.id,JSON.stringify(p),p.archived?1:0,p.createdAt,p.updatedAt,ownerId).run();
}
export async function saveProject(request:Request,actor:Actor,env:PortfolioEnv):Promise<Project> {
  authorizeWrite(request,actor,env);
  if(!env.DB || !env.BUCKET) throw new PortfolioError("Project storage is temporarily unavailable. Please try again.",503);
  if(Number(request.headers.get("content-length") || 0)>MAX_TOTAL_BYTES+1024*1024) throw new PortfolioError("Keep the total upload under 24 MB.",413);
  const form=await request.formData();
  let raw:Record<string,unknown>;
  try {raw=JSON.parse(String(form.get("metadata")));if(!raw||Array.isArray(raw)||typeof raw!=="object")throw new Error();}
  catch {throw new PortfolioError("Project details could not be read.");}
  let details:ReturnType<typeof validateMetadata>;
  try{details=validateMetadata(raw);}catch(e){throw new PortfolioError((e as Error).message);}
  const id=typeof raw.id==="string"?raw.id:crypto.randomUUID();
  if(!/^[a-zA-Z0-9-]{1,80}$/.test(id))throw new PortfolioError("Invalid project identifier.");
  const previous=(await listProjects(env)).find(p=>p.id===id);
  if(raw.id && !previous)throw new PortfolioError("This project could not be found.",404);
  if(previous && raw.expectedUpdatedAt!==previous.updatedAt)throw new PortfolioError("This project changed in another window. Reload before editing.",409);
  if(previous?.archived)throw new PortfolioError("Restore this project before editing it.",409);
  const keep=Array.isArray(raw.keepImageIds)?raw.keepImageIds:[];
  if(keep.some(id=>typeof id!=="string" || !previous?.images.some(i=>i.id===id)))throw new PortfolioError("An image does not belong to this project.");
  const retained=previous?.images.filter(i=>keep.includes(i.id))??[];
  const files=form.getAll("images").filter((f):f is File=>typeof f!=="string" && f.size>0);
  if(retained.length+files.length===0)throw new PortfolioError("Add at least one render or image.");
  if(retained.length+files.length>MAX_IMAGES)throw new PortfolioError("A project can contain up to 6 images.");
  if(files.reduce((sum,f)=>sum+f.size,0)>MAX_TOTAL_BYTES)throw new PortfolioError("Keep the total upload under 24 MB.",413);
  const validated=[];
  for(const file of files){
    if(file.size>MAX_FILE_BYTES)throw new PortfolioError("Each image must be 8 MB or smaller.",413);
    const type=imageType(new Uint8Array(await file.slice(0,12).arrayBuffer()));
    if(!type || type.mime!==file.type)throw new PortfolioError("Upload valid PNG, JPEG, or WebP images.");
    validated.push({file,type});
  }
  const added:string[]=[],images=[...retained];
  try {
    for(const {file,type} of validated){
      const imageId=crypto.randomUUID(),key=`${id}/${imageId}.${type.extension}`;
      await env.BUCKET.put(key,await file.arrayBuffer(),{httpMetadata:{contentType:type.mime}});
      added.push(key);images.push({id:imageId,key,url:`/api/image?key=${encodeURIComponent(key)}`,alt:`${details.title} — image ${images.length+1}`});
    }
    const now=new Date().toISOString();
    const project:Project={...details,id,images,createdAt:previous?.createdAt??now,updatedAt:now,archived:false};
    await writeProject(env,project,actor!.userId);return project;
  }catch(e){await Promise.allSettled(added.map(key=>env.BUCKET!.delete(key)));throw e;}
}
export async function setArchived(request:Request,actor:Actor,env:PortfolioEnv):Promise<Project> {
  authorizeWrite(request,actor,env);
  const data=await request.json() as {id?:string;archived?:boolean};
  if(typeof data.id!=="string" || typeof data.archived!=="boolean")throw new PortfolioError("Invalid archive request.");
  const previous=(await listProjects(env)).find(p=>p.id===data.id);
  if(!previous)throw new PortfolioError("Project not found.",404);
  const next={...previous,archived:data.archived,updatedAt:new Date().toISOString()};
  await writeProject(env,next,actor!.userId);return next;
}
export async function serveImage(request:Request,env:PortfolioEnv) {
  const key=new URL(request.url).searchParams.get("key")??"";
  if(!/^[a-zA-Z0-9-]{1,80}\/[a-f0-9-]{36}\.(png|jpg|webp)$/.test(key))throw new PortfolioError("Image not found.",404);
  const p=(await listProjects(env)).find(p=>!p.archived && p.images.some(i=>i.key===key));
  if(!p || !env.BUCKET)throw new PortfolioError("Image not found.",404);
  const object=await env.BUCKET.get(key);
  if(!object)throw new PortfolioError("Image not found.",404);
  return new Response(object.body,{headers:{"Content-Type":object.httpMetadata?.contentType??"image/png","Cache-Control":"private, max-age=3600","X-Content-Type-Options":"nosniff"}});
}
