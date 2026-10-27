import { env } from "cloudflare:workers";
import { notFound } from "next/navigation";
import { getChatGPTUser } from "../../chatgpt-auth";
import { isOwner,listProjects } from "@/lib/portfolio-service";
import { defaultProjects } from "@/lib/project-data";
import Portfolio from "../../portfolio";
export const dynamic="force-dynamic";
export default async function ProjectPage({params}:{params:Promise<{id:string}>}){
  const {id}=await params,canEdit=isOwner(await getChatGPTUser(),env);
  let projects;
  try{projects=await listProjects(env);}catch{
    if(defaultProjects.some(p=>p.id===id))projects=defaultProjects;
    else throw new Error("The portfolio could not be loaded. Please try again.");
  }
  if(!projects.some(p=>p.id===id && !p.archived))notFound();
  return <Portfolio initialProjects={canEdit?projects:projects.filter(p=>!p.archived)} initialCanEdit={canEdit} initialProjectId={id}/>;
}
