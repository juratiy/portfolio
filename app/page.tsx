import { env } from "cloudflare:workers";
import { getChatGPTUser } from "./chatgpt-auth";
import { isOwner,listProjects } from "@/lib/portfolio-service";
import { defaultProjects } from "@/lib/project-data";
import Portfolio from "./portfolio";
export const dynamic="force-dynamic";
export default async function Home(){
  const canEdit=isOwner(await getChatGPTUser(),env);
  try{const projects=await listProjects(env);return <Portfolio initialProjects={canEdit?projects:projects.filter(p=>!p.archived)} initialCanEdit={canEdit}/>;}
  catch{return <Portfolio initialProjects={defaultProjects} initialCanEdit={canEdit} initialError="Projects could not be loaded. Please reload to try again."/>;}
}
