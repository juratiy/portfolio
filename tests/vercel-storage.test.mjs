import test from 'node:test';
import assert from 'node:assert/strict';
import { portfolioEnv, imageRedirect } from '../lib/supabase.ts';
import { prepareUploads, readTicket, resolveUploads } from '../lib/direct-upload.ts';
import { listProjects, saveProject } from '../lib/portfolio-service.ts';

const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+nmWQAAAAASUVORK5CYII=','base64');

test('Supabase adapter and direct upload lifecycle preserve private storage and validate signed tickets', async()=>{
  const originalFetch=globalThis.fetch;
  const previous=Object.fromEntries(['SUPABASE_URL','SUPABASE_SERVICE_ROLE_KEY','PORTFOLIO_OWNER_EMAIL'].map(k=>[k,process.env[k]]));
  process.env.SUPABASE_URL='https://project.supabase.co';
  process.env.SUPABASE_SERVICE_ROLE_KEY='test-service-key';
  process.env.PORTFOLIO_OWNER_EMAIL='owner@example.test';
  const rows=[],objects=new Map(),calls=[];
  let downloaded=png;
  globalThis.fetch=async(url,init)=>{
    calls.push({url,init});
    assert.equal(init.headers.apikey,'test-service-key');
    assert.equal(init.cache,'no-store');
    if(url.includes('/object/sign/'))return Response.json({signedURL:'/object/sign/portfolio-images/test?token=download'});
    if(url.includes('/object/upload/sign/'))return Response.json({url:'/object/upload/sign/portfolio-images/staging/file?token=signed'});
    if(url.includes('/rest/v1/')&&init.method==='POST'){rows.push(JSON.parse(init.body));return new Response(null,{status:201});}
    if(url.includes('/rest/v1/'))return Response.json(rows);
    if(url.includes('/object/portfolio-images/staging/'))return new Response(downloaded);
    if(init.method==='POST'){objects.set(url,init.body);return Response.json({});}
    if(init.method==='DELETE')return Response.json({});
    throw new Error('Unexpected request: '+url);
  };
  try {
    const actor={userId:'owner-id',email:'owner@example.test'},env=portfolioEnv();
    const uploads=await prepareUploads([{type:'image/png',size:png.length}],actor.userId);
    assert.equal(uploads.length,1);
    assert.ok(uploads[0].url.startsWith('https://project.supabase.co/storage/v1/object/upload/sign/'));
    const ticket=uploads[0].ticket;
    assert.throws(()=>readTicket(ticket,'other-owner'),/expired/);
    assert.throws(()=>readTicket(ticket+'tampered',actor.userId),/Invalid/);
    await assert.rejects(prepareUploads([{type:'image/png',size:9*1024*1024}],actor.userId));
    const resolved=await resolveUploads([ticket],actor.userId);
    assert.deepEqual(Buffer.from(await resolved.files[0].arrayBuffer()),png);
    downloaded=Buffer.alloc(png.length+1);
    await assert.rejects(resolveUploads([ticket],actor.userId),/size does not match/);
    downloaded=Buffer.alloc(png.length);
    await assert.rejects(resolveUploads([ticket],actor.userId),/valid PNG/);
    downloaded=png;
    const form=new FormData();
    form.set('metadata',JSON.stringify({title:'Upload test',summary:'A Supabase storage test.',category:'Aviation',kind:'Original render',role:'Testing',tools:['Blender'],skills:[],keepImageIds:[]}));
    form.append('images',resolved.files[0]);
    const project=await saveProject(new Request('https://portfolio.test/api/projects',{method:'POST',headers:{Origin:'https://portfolio.test'},body:form}),actor,env);
    assert.equal(project.images.length,1);
    assert.equal(objects.size,1);
    const redirect=await imageRedirect(new Request('https://portfolio.test'+project.images[0].url));
    assert.equal(redirect.status,302);
    assert.equal(redirect.headers.get('cache-control'),'private, no-store');
    assert.ok(redirect.headers.get('location').startsWith('https://project.supabase.co/storage/v1/object/sign/'));
    rows[0].archived=1;
    await assert.rejects(imageRedirect(new Request('https://portfolio.test'+project.images[0].url)),e=>e.status===404);
    rows[0].archived=0;
    await assert.rejects(imageRedirect(new Request('https://portfolio.test/api/image?key=../../secret')),e=>e.status===404);
    assert.equal(rows[0].owner_id,actor.userId);
    assert.equal((await listProjects(env)).find(p=>p.id===project.id).title,'Upload test');
    assert.ok(calls.some(c=>c.init.headers.Prefer==='resolution=merge-duplicates,return=minimal'));
  } finally {
    globalThis.fetch=originalFetch;
    for(const [key,value] of Object.entries(previous))if(value===undefined)delete process.env[key];else process.env[key]=value;
  }
});
