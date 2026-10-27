import { env } from "cloudflare:workers";
import { getChatGPTUser } from "../../chatgpt-auth";
import { isOwner, listProjects, saveProject, setArchived } from "@/lib/portfolio-service";
import { apiError } from "@/lib/api-response";
export const dynamic="force-dynamic";
export async function GET(){
  try{const user=await getChatGPTUser(),canEdit=isOwner(user,env),projects=await listProjects(env);
    return Response.json({projects:canEdit?projects:projects.filter(p=>!p.archived),canEdit},{headers:{"Cache-Control":"private, no-store"}});
  }catch(error){return apiError(error);}
}
export async function POST(request:Request){try{return Response.json({project:await saveProject(request,await getChatGPTUser(),env)},{status:201});}catch(error){return apiError(error);}}
export async function PATCH(request:Request){try{return Response.json({project:await setArchived(request,await getChatGPTUser(),env)});}catch(error){return apiError(error);}}
