import { NextResponse } from 'next/server';
import { requireSameOrigin, sessionCookie, localSessionCookie } from '@/lib/owner-auth';
export async function POST(request: Request) {
  try { requireSameOrigin(request); }
  catch { return new Response('Forbidden', { status: 403 }); }
  const response = NextResponse.redirect(new URL('/', request.url), 303);
  response.cookies.delete(sessionCookie);
  response.cookies.delete(localSessionCookie);
  response.headers.set('Cache-Control', 'no-store');
  return response;
}
