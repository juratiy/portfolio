import { NextResponse } from 'next/server';
import { authConfig, requireSameOrigin, sessionCookie, localSessionCookie } from '@/lib/owner-auth';
export async function POST(request: Request) {
  try {
    requireSameOrigin(request);
    const form = await request.formData();
    const email = String(form.get('email') ?? ''), password = String(form.get('password') ?? '');
    if (!email || email.length > 254 || !password || password.length > 256 || email.toLowerCase() !== process.env.PORTFOLIO_OWNER_EMAIL?.toLowerCase()) throw new Error('Invalid credentials');
    const { url, key } = authConfig();
    const response = await fetch(`${url}/auth/v1/token?grant_type=password`, { method: 'POST', headers: { apikey: key, 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }), cache: 'no-store' });
    if (!response.ok) throw new Error('Invalid credentials');
    const session = await response.json() as { access_token: string; expires_in: number; user: { email: string } };
    if (!session.access_token || session.user.email.toLowerCase() !== process.env.PORTFOLIO_OWNER_EMAIL?.toLowerCase()) throw new Error('Invalid credentials');
    const result = NextResponse.redirect(new URL('/?studio=1#work', request.url), 303);
    result.headers.set('Cache-Control', 'no-store');
    const production = process.env.NODE_ENV === 'production';
    result.cookies.set(production ? sessionCookie : localSessionCookie, session.access_token, { httpOnly: true, secure: production, sameSite: 'lax', path: '/', maxAge: Math.min(session.expires_in || 3600, 3600) });
    return result;
  } catch {
    return NextResponse.redirect(new URL('/login?error=1', request.url), 303);
  }
}
