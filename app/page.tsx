import { getOwner } from "@/lib/owner-auth";
import { portfolioEnv } from "@/lib/supabase";
import { isOwner, listProjects } from "@/lib/portfolio-service";
import { defaultProjects } from "@/lib/project-data";
import Portfolio from "./portfolio";
export const dynamic = "force-dynamic";
export default async function Home({ searchParams }: { searchParams: Promise<{ studio?: string }> }) {
  const { studio } = await searchParams;
  const env = portfolioEnv(), canEdit = isOwner(await getOwner(), env);
  let projects = defaultProjects, error = "";
  try { projects = await listProjects(env); }
  catch { error = "Projects could not be loaded. Please reload to try again."; }
  return <Portfolio initialProjects={canEdit ? projects : projects.filter(p => !p.archived)} initialCanEdit={canEdit} initialError={error} initialStudio={canEdit && studio === "1"}/>;
}
