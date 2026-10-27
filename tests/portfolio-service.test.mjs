import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import {filterProjects,referenceProjects,defaultProjects,validateMetadata} from '../lib/project-data.ts';
import {authorizeWrite,isOwner,listProjects,saveProject,serveImage,setArchived} from '../lib/portfolio-service.ts';

const BASE_TOTAL=defaultProjects.length,BASE_ACTIVE=filterProjects(defaultProjects).length;
const actor={userId:'site-specific-owner',email:'owner@example.test'};
const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+nmWQAAAAASUVORK5CYII=','base64');
const metadata={title:'Aircraft material study',summary:'Testing a metal surface under daylight.',category:'Aviation',kind:'Original render',role:'Modelling and rendering',tools:['Blender','Cycles'],skills:['Materials','Lighting'],description:'A material experiment.',process:'Model, light, and render.',learning:'Roughness changes the highlight.',credits:'Own work.',sourceUrl:'https://t.me/example/1'};
function environment(){
  const db=new DatabaseSync(':memory:');db.exec(readFileSync(new URL('../drizzle/0000_eminent_red_wolf.sql',import.meta.url),'utf8'));
  const objects=new Map();
  const state={failWrites:false};
  return {state,objects,env:{PORTFOLIO_OWNER_EMAIL:actor.email,DB:{prepare(sql){return {args:[],bind(...args){this.args=args;return this;},async all(){return {results:db.prepare(sql).all(...this.args)};},async run(){if(state.failWrites)throw new Error('Simulated write failure');return db.prepare(sql).run(...this.args);}};}},BUCKET:{async put(key,body,options){objects.set(key,{body:new Uint8Array(body),httpMetadata:options.httpMetadata});},async get(key){return objects.get(key)??null;},async delete(key){objects.delete(key);}}}};
}
function upload(raw=metadata,files=[new File([png],'render.png',{type:'image/png'})]){
  const form=new FormData();form.set('metadata',JSON.stringify(raw));files.forEach(f=>form.append('images',f));
  return new Request('https://portfolio.test/api/projects',{method:'POST',headers:{Origin:'https://portfolio.test'},body:form});
}
function archiveRequest(id,archived){return new Request('https://portfolio.test/api/projects',{method:'PATCH',headers:{Origin:'https://portfolio.test','Content-Type':'application/json'},body:JSON.stringify({id,archived})});}

test('filters combine category and case-insensitive title, tool, and skill searches; sorting does not mutate data',()=>{
  const projects=[{...referenceProjects[0],tools:['Blender'],createdAt:'2026-02-01'},referenceProjects[1],{...referenceProjects[0],id:'archived',archived:true}];
  assert.equal(filterProjects(projects,'Aviation','bLeNdEr').length,1);
  assert.equal(filterProjects(projects,'Spaces','blender').length,0);
  assert.equal(filterProjects(projects,'All','lighting').length,1);
  assert.equal(filterProjects(projects,'All','unknown').length,0);
  assert.equal(filterProjects(projects,'All','','newest')[0].id,'a-space-to-think');
  assert.equal(filterProjects(projects,'All','','oldest')[0].id,'aircraft-in-detail');
  assert.equal(filterProjects(projects,'All','','title')[0].id,'a-space-to-think');
  assert.equal(projects[0].id,'aircraft-in-detail');
});
test('metadata rejects executable URLs, invalid categories, and missing required fields',()=>{
  for(const bad of ['javascript:alert(1)','data:text/html,test','http://example.test','https://user:pass@example.test'])assert.throws(()=>validateMetadata({...metadata,sourceUrl:bad}));
  assert.throws(()=>validateMetadata({...metadata,category:'Invalid'}));
  assert.throws(()=>validateMetadata({...metadata,title:'  '}));
  assert.throws(()=>validateMetadata({...metadata,skills:'Blender'}));
  assert.deepEqual(validateMetadata({...metadata,tools:['Blender','Blender',' Cycles ']}).tools,['Blender','Cycles']);
});
test('only the configured signed-in owner can write; cross-origin changes are rejected',async()=>{
  const {env}=environment();
  assert.equal(isOwner(actor,env),true);assert.equal(isOwner(null,env),false);assert.equal(isOwner(actor,{}),false);
  await assert.rejects(saveProject(upload(),null,env),e=>e.status===403);
  await assert.rejects(saveProject(upload(),{userId:'viewer',email:'viewer@example.test'},env),e=>e.status===403);
  assert.throws(()=>authorizeWrite(new Request('https://portfolio.test/api/projects',{headers:{Origin:'https://other.test'}}),actor,env),e=>e.status===403);
});
test('multiple image upload, reload, image serving, editing, archive, and restore persist in a real SQLite database',async()=>{
  const {env,objects}=environment();
  assert.equal((await listProjects(env)).length,BASE_TOTAL);
  const p=await saveProject(upload(metadata,[new File([png],'one.png',{type:'image/png'}),new File([png],'two.png',{type:'image/png'})]),actor,env);
  assert.equal(p.images.length,2);assert.equal(objects.size,2);
  const reloaded=(await listProjects(env)).find(v=>v.id===p.id);assert.equal(reloaded.title,metadata.title);
  const imageRequest=new Request('https://portfolio.test'+p.images[0].url),image=await serveImage(imageRequest,env);
  assert.equal(image.status,200);assert.equal(image.headers.get('Content-Type'),'image/png');assert.deepEqual(Buffer.from(await image.arrayBuffer()),png);
  const edited=await saveProject(upload({...metadata,id:p.id,expectedUpdatedAt:p.updatedAt,title:'Refined aircraft study',keepImageIds:p.images.map(i=>i.id)},[]),actor,env);
  assert.equal(edited.title,'Refined aircraft study');assert.equal(edited.images.length,2);assert.equal((await listProjects(env)).length,BASE_TOTAL+1);
  await assert.rejects(saveProject(upload({...metadata,id:p.id,expectedUpdatedAt:'stale',keepImageIds:p.images.map(i=>i.id)},[]),actor,env),e=>e.status===409);
  await setArchived(archiveRequest(p.id,true),actor,env);
  assert.equal(filterProjects(await listProjects(env)).length,BASE_ACTIVE);
  await assert.rejects(serveImage(imageRequest,env),e=>e.status===404);
  await setArchived(archiveRequest(p.id,false),actor,env);
  assert.equal(filterProjects(await listProjects(env)).length,BASE_ACTIVE+1);assert.equal((await serveImage(imageRequest,env)).status,200);
  assert.equal(objects.size,2,'archiving preserves images for restoration');
});
test('imported projects can be archived and restored without duplicate entries',async()=>{
  const {env}=environment();await setArchived(archiveRequest('coffee-design',true),actor,env);
  assert.equal((await listProjects(env)).length,BASE_TOTAL);assert.equal(filterProjects(await listProjects(env)).length,BASE_ACTIVE-1);
  await setArchived(archiveRequest('coffee-design',false),actor,env);assert.equal(filterProjects(await listProjects(env)).length,BASE_ACTIVE);
});
test('invalid, absent, oversized, or excessive images fail before storage is written',async()=>{
  const {env,objects}=environment();
  await assert.rejects(saveProject(upload(metadata,[]),actor,env),/at least one/);
  await assert.rejects(saveProject(upload(metadata,[new File(['not a picture'],'fake.png',{type:'image/png'})]),actor,env),/valid PNG/);
  await assert.rejects(saveProject(upload(metadata,[new File([png],'fake.jpg',{type:'image/jpeg'})]),actor,env),/valid PNG/);
  await assert.rejects(saveProject(upload(metadata,Array.from({length:7},()=>new File([png],'render.png',{type:'image/png'}))),actor,env),/up to 6/);
  await assert.rejects(saveProject(upload(metadata,[new File([new Uint8Array(8*1024*1024+1)],'large.png',{type:'image/png'})]),actor,env),e=>e.status===413);
  assert.equal(objects.size,0);
});
test('failed database writes clean up new images; removed or foreign image IDs cannot be attached',async()=>{
  const {env,state,objects}=environment();state.failWrites=true;
  await assert.rejects(saveProject(upload(),actor,env),/Simulated write failure/);assert.equal(objects.size,0);
  state.failWrites=false;const p=await saveProject(upload(),actor,env);
  await assert.rejects(saveProject(upload({...metadata,id:p.id,expectedUpdatedAt:p.updatedAt,keepImageIds:['foreign']},[]),actor,env),/does not belong/);
  await assert.rejects(serveImage(new Request('https://portfolio.test/api/image?key=../../secret'),env),e=>e.status===404);
});
