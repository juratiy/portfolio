import { PortfolioError } from "./portfolio-service";
export function apiError(error:unknown) {
  if(error instanceof PortfolioError)return Response.json({error:error.message},{status:error.status});
  console.error("Portfolio request failed", error instanceof Error ? error.message : "Unknown error");
  return Response.json({error:"The request could not be completed. Please try again."},{status:500});
}
