import type { PortfolioEnv } from './portfolio-service.ts';
import { listProjects } from './portfolio-service.ts';
import { PortfolioError } from './portfolio-service.ts';

export function supabaseConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, '');
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new PortfolioError('Portfolio storage is not configured yet.', 503);
  if (!/^https:\/\/[^/]+$/.test(url)) throw new Error('SUPABASE_URL must be an HTTPS project URL.');
  return { url, key };
}

export async function supabaseRequest(path: string, init: RequestInit = {}) {
  const { url, key } = supabaseConfig();
  const response = await fetch(`${url}${path}`, {
    ...init, cache: 'no-store',
    headers: { apikey: key, Authorization: `Bearer ${key}`, ...init.headers },
  });
  if (!response.ok) {
    // Never expose upstream bodies, which can contain private database details.
    console.error('Supabase operation failed', response.status, path.split('?')[0]);
    throw new PortfolioError('Storage could not complete the request. Please try again.', 503);
  }
  return response;
}

export const bucketName = 'portfolio-images';
export const objectPath = (key: string) => `/storage/v1/object/${bucketName}/${key.split('/').map(encodeURIComponent).join('/')}`;

// This narrow adapter preserves the existing, tested project service contract.
// It deliberately supports only the two statements used by that service.
export function portfolioEnv(): PortfolioEnv {
  return {
    PORTFOLIO_OWNER_EMAIL: process.env.PORTFOLIO_OWNER_EMAIL,
    DB: {
      prepare(sql: string) {
        let args: unknown[] = [];
        return {
          bind(...values: unknown[]) { args = values; return this; },
          async all() {
            if (!sql.startsWith('SELECT data, archived FROM portfolio_projects ')) throw new Error('Unsupported query');
            const response = await supabaseRequest('/rest/v1/portfolio_projects?select=data,archived&order=created_at.desc');
            return { results: await response.json() };
          },
          async run() {
            if (!sql.startsWith('INSERT INTO portfolio_projects ')) throw new Error('Unsupported query');
            const [id, data, archived, created_at, updated_at, owner_id] = args;
            await supabaseRequest('/rest/v1/portfolio_projects?on_conflict=id', {
              method: 'POST', headers: { 'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates,return=minimal' },
              body: JSON.stringify({ id, data, archived, created_at, updated_at, owner_id }),
            });
            return { success: true };
          },
        };
      },
    },
    BUCKET: {
      async put(key: string, body: ArrayBuffer, options: { httpMetadata: { contentType: string } }) {
        await supabaseRequest(objectPath(key), { method: 'POST', headers: { 'Content-Type': options.httpMetadata.contentType }, body });
      },
      async get(key: string) {
        const response = await supabaseRequest(objectPath(key));
        return { body: response.body, httpMetadata: { contentType: response.headers.get('content-type') ?? 'application/octet-stream' } };
      },
      async delete(key: string) {
        await supabaseRequest(`/storage/v1/object/${bucketName}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prefixes: [key] }) });
      },
    },
  } as unknown as PortfolioEnv;
}

export async function imageRedirect(request: Request) {
  const key = new URL(request.url).searchParams.get('key') ?? '';
  if (!/^[a-zA-Z0-9-]{1,80}\/[a-f0-9-]{36}\.(png|jpg|webp)$/.test(key)) throw new PortfolioError('Image not found.', 404);
  const project = (await listProjects(portfolioEnv())).find(p => !p.archived && p.images.some(image => image.key === key));
  if (!project) throw new PortfolioError('Image not found.', 404);
  // Download from Storage to avoid Vercel's function response size limit.
  const response = await supabaseRequest(`/storage/v1/object/sign/${bucketName}/${key}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ expiresIn: 60 }) });
  const { signedURL } = await response.json() as { signedURL: string };
  return new Response(null, { status: 302, headers: { Location: `${supabaseConfig().url}/storage/v1${signedURL}`, 'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff' } });
}
