import { portfolioEnv } from "@/lib/supabase";
const env = portfolioEnv();
import { getOwner as getChatGPTUser } from "@/lib/owner-auth";
import { isOwner, listProjects, saveProject, setArchived } from "@/lib/portfolio-service";
import { resolveUploads } from "@/lib/direct-upload";
import { requireSameOrigin } from "@/lib/owner-auth";
import { PortfolioError, authorizeWrite } from "@/lib/portfolio-service";
import { apiError } from "@/lib/api-response";
export const dynamic="force-dynamic";
export async function GET(){
  try{const user=await getChatGPTUser(),canEdit=isOwner(user,env),projects=await listProjects(env);
    return Response.json({projects:canEdit?projects:projects.filter(p=>!p.archived),canEdit},{headers:{"Cache-Control":"private, no-store"}});
  }catch(error){return apiError(error);}
}
export async function POST(request:Request){
  let stagedKeys:string[]=[];
  try {
    requireSameOrigin(request);
    const actor=await getChatGPTUser();
    authorizeWrite(request,actor,env);
    if(Number(request.headers.get("content-length")||0)>1_000_000) throw new PortfolioError("Use direct image uploads.",413);
    const form=await request.formData();
    if(form.getAll("images").length) throw new PortfolioError("Please reload the editor and upload images directly.",400);
    const tickets=JSON.parse(String(form.get("uploads")||"[]"));
    const resolved=await resolveUploads(tickets,actor!.userId);
    stagedKeys=resolved.keys;
    resolved.files.forEach(file=>form.append("images",file));
    const internal=new Request(request.url,{method:"POST",headers:{origin:new URL(request.url).origin},body:form});
    return Response.json({project:await saveProject(internal,actor,env)},{status:201});
  }catch(error){return apiError(error);}
  finally { await Promise.allSettled(stagedKeys.map(key=>env.BUCKET!.delete(key))); }
}
export async function PATCH(request:Request){try{requireSameOrigin(request);return Response.json({project:await setArchived(request,await getChatGPTUser(),env)});}catch(error){return apiError(error);}}
