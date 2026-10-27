import { cookies } from 'next/headers';
import { PortfolioError } from './portfolio-service.ts';

export const sessionCookie = '__Host-portfolio-session';
export const localSessionCookie = 'portfolio-session';
export function authConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, '');
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) throw new PortfolioError('Owner login is not configured yet.', 503);
  return { url, key };
}

export function requireSameOrigin(request: Request) {
  if (request.headers.get('origin') !== new URL(request.url).origin || request.headers.get('sec-fetch-site') === 'cross-site') {
    throw new PortfolioError('Please submit this form from this website.', 403);
  }
}

export async function getOwner() {
  const jar = await cookies();
  const token = jar.get(process.env.NODE_ENV === 'production' ? sessionCookie : localSessionCookie)?.value;
  if (!token) return null;
  const { url, key } = authConfig();
  const response = await fetch(`${url}/auth/v1/user`, { headers: { apikey: key, Authorization: `Bearer ${token}` }, cache: 'no-store' });
  if (!response.ok) return null;
  const user = await response.json() as { id?: string; email?: string };
  if (!user.id || !user.email || user.email.toLowerCase() !== process.env.PORTFOLIO_OWNER_EMAIL?.toLowerCase()) return null;
  return { userId: user.id, email: user.email };
}
