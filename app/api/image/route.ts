import { env } from "cloudflare:workers";
import { serveImage } from "@/lib/portfolio-service";
import { apiError } from "@/lib/api-response";
export const dynamic="force-dynamic";
export async function GET(request:Request){try{return await serveImage(request,env);}catch(error){return apiError(error);}}
