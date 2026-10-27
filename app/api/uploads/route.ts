import { getOwner, requireSameOrigin } from '@/lib/owner-auth';
import { prepareUploads } from '@/lib/direct-upload';
import { PortfolioError } from '@/lib/portfolio-service';
import { apiError } from '@/lib/api-response';
export async function POST(request: Request) {
  try {
    requireSameOrigin(request);
    const owner = await getOwner();
    if (!owner) throw new PortfolioError('Only the portfolio owner can upload images.', 403);
    const { files } = await request.json() as { files: { type: string; size: number }[] };
    return Response.json({ uploads: await prepareUploads(files, owner.userId) }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) { return apiError(error); }
}
