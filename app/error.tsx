"use client";
export default function ErrorPage({reset}:{reset:()=>void}){return <main className="error-page"><span className="eyebrow">A BRIEF INTERRUPTION</span><h1>Let’s try<br/><em>that again.</em></h1><p>The portfolio could not be loaded.</p><button className="button button-dark" onClick={reset}>Reload this page ↻</button><a href="/">Return home</a></main>;}
