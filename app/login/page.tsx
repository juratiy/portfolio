import type { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = { title: 'Owner login', robots: { index: false, follow: false } };
export default async function Login({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return <main className="error-page"><span className="eyebrow">STRATOS / OWNER STUDIO</span><h1>Xush<br/><em>kelibsiz.</em></h1><p>Portfolio egasi uchun kirish. Sessiya tugasa, qayta kiring.</p>
    <form action="/api/auth/login" method="post" style={{ maxWidth: 420, margin: '24px auto', textAlign: 'left' }}>
      <label className="form-field">Email<input name="email" type="email" autoComplete="username" required maxLength={254}/></label>
      <label className="form-field">Parol<input name="password" type="password" autoComplete="current-password" required maxLength={256}/></label>
      {error && <p role="alert">Kirish amalga oshmadi. Email, parol va hosting sozlamalarini tekshiring.</p>}
      <button type="submit" className="button button-dark">Kirish →</button>
    </form><Link href="/">Portfolioga qaytish</Link></main>;
}
