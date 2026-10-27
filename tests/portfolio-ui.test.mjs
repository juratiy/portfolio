import test from 'node:test';
import assert from 'node:assert/strict';
import {Window} from 'happy-dom';

const win=new Window({url:'https://portfolio.test/'});
globalThis.self=win;
for(const key of ['window','document','navigator','HTMLElement','HTMLDialogElement','HTMLInputElement','Event','MouseEvent','KeyboardEvent','FormData'])Object.defineProperty(globalThis,key,{value:key==='window'?win:win[key],configurable:true,writable:true});
globalThis.IS_REACT_ACT_ENVIRONMENT=true;
win.HTMLElement.prototype.scrollIntoView=function(){};
win.HTMLDialogElement.prototype.showModal=function(){this.open=true;};
win.HTMLDialogElement.prototype.close=function(){this.open=false;};
globalThis.URL.createObjectURL=()=> 'blob:local-test-preview';
globalThis.URL.revokeObjectURL=()=>{};
let copied='';Object.defineProperty(win.navigator,'clipboard',{value:{writeText:async value=>{copied=value;}},configurable:true});

const {act,createElement}=await import('react'),{createRoot}=await import('react-dom/client');
const {default:Portfolio}=await import('../.sites-runtime/ui-test/app/portfolio.mjs');
const {default:PortfolioMotion}=await import('../.sites-runtime/ui-test/components/portfolio-motion.mjs');
const {referenceProjects,defaultProjects}=await import('../.sites-runtime/ui-test/lib/project-data.mjs');
let serverProjects=[];
globalThis.fetch=async (_url,options={})=>{
  if(_url==='/api/uploads'){
    const {files}=JSON.parse(options.body);
    return Response.json({uploads:files.map((_,i)=>({url:`https://storage.test/upload/${i}`,ticket:`ticket-${i}`}))});
  }
  if(options.method==='PUT')return new Response(null,{status:200});
  if(options.method==='POST'){
    const metadata=JSON.parse(options.body.get('metadata')),old=serverProjects.find(p=>p.id===metadata.id);
    const project={...metadata,id:old?.id??'test-original-render',createdAt:old?.createdAt??'2026-10-19T15:00:00.000Z',updatedAt:'2026-10-19T15:01:00.000Z',archived:false,images:[...(old?.images.filter(im=>metadata.keepImageIds.includes(im.id))??[]),...JSON.parse(options.body.get('uploads')||'[]').map((_,i)=>({id:`new-${i}`,url:`/test-${i}.png`,alt:`${metadata.title} — image ${i+1}`}))]};
    serverProjects=[project,...serverProjects.filter(p=>p.id!==project.id)];return Response.json({project});
  }
  if(options.method==='PATCH'){
    const data=JSON.parse(options.body),project={...serverProjects.find(p=>p.id===data.id),archived:data.archived};serverProjects=serverProjects.map(p=>p.id===project.id?project:p);return Response.json({project});
  }
  return Response.json({projects:serverProjects,canEdit:true});
};
function button(text,scope=document){const result=[...scope.querySelectorAll('button')].find(el=>el.textContent.trim()===text||el.getAttribute('aria-label')===text);assert.ok(result,`Button not found: ${text}`);return result;}
async function click(el){await act(async()=>{el.click();});}
async function change(el,value){await act(async()=>{const proto=el.tagName==='SELECT'?win.HTMLSelectElement.prototype:win.HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(proto,'value').set.call(el,value);el.dispatchEvent(new win.Event(el.tagName==='SELECT'?'change':'input',{bubbles:true}));});}
function cards(){return [...document.querySelectorAll('.project-card')];}

test('gallery UI filters, searches, sorts, opens detail views, switches language, saves images, edits, archives, and restores',async()=>{
  serverProjects=structuredClone(referenceProjects);document.body.innerHTML='<div id="root"></div>';
  const root=createRoot(document.getElementById('root'));
  await act(async()=>root.render(createElement(Portfolio,{initialProjects:serverProjects,initialCanEdit:true})));
  assert.equal(cards().length,2);
  await click(button('Aviation1'));assert.equal(cards().length,1);assert.match(cards()[0].textContent,/Aircraft/);
  const search=document.querySelector('input[type="search"]');await change(search,'no-such-project');assert.equal(cards().length,0);assert.ok(document.querySelector('.empty-state'));
  await click(button('Clear filters'));assert.equal(cards().length,2);
  await change(search,'material');assert.equal(cards().length,1);assert.match(cards()[0].textContent,/space to think/);
  await change(search,'');await change(document.querySelector('.sort-select select'),'title');assert.match(cards()[0].textContent,/space to think/);
  await click(document.querySelector('.project-open'));assert.ok(document.querySelector('dialog[open]'));assert.match(document.querySelector('#project-title').textContent,/space to think/);
  await click(button('Copy project link'));assert.equal(copied,'https://portfolio.test/projects/a-space-to-think');
  assert.ok(document.querySelector('a[href="/projects/a-space-to-think"]'));
  await act(async()=>document.querySelector('dialog').dispatchEvent(new win.Event('cancel',{cancelable:true})));assert.equal(document.querySelector('dialog'),null);
  await click(button('O‘Z'));assert.equal(document.documentElement.lang,'uz');assert.ok(document.querySelector('#work-title').textContent.includes('G‘oyalar'));
  await click(button('EN'));await click(button('Your studio'));assert.ok(document.querySelector('.studio-panel'));
  await click(button('Add project'));assert.ok(document.querySelector('#editor-title'));
  await change(document.querySelector('input[name="title"]'),'Aircraft light study');await change(document.querySelector('input[name="summary"]'),'An aircraft material and lighting exercise.');await change(document.querySelector('input[name="skills"]'),'Lighting, Materials');
  await act(async()=>document.querySelector('.editor form').dispatchEvent(new win.Event('submit',{bubbles:true,cancelable:true})));assert.match(document.querySelector('.form-error').textContent,/at least one/);
  const input=document.querySelector('#render-files');Object.defineProperty(input,'files',{configurable:true,value:[new win.File(['png'],'one.png',{type:'image/png'}),new win.File(['png'],'two.png',{type:'image/png'})]});await act(async()=>input.dispatchEvent(new win.Event('change',{bubbles:true})));
  assert.equal(document.querySelectorAll('.upload-previews>div').length,2);
  await act(async()=>document.querySelector('.editor form').dispatchEvent(new win.Event('submit',{bubbles:true,cancelable:true})));
  assert.equal(serverProjects.length,3);assert.equal(serverProjects[0].tools[0],'Blender');assert.equal(document.querySelector('.editor'),null);assert.equal(document.querySelector('#project-title').textContent,'Aircraft light study');
  assert.equal(document.querySelectorAll('.image-thumbnails button').length,2);await click(button('Next image'));assert.equal(document.querySelector('.image-controls span').textContent,'2 / 2');
  await click(button('Edit project'));assert.equal(document.querySelector('input[name="title"]').value,'Aircraft light study');
  await change(document.querySelector('input[name="title"]'),'Refined light study');await act(async()=>document.querySelector('.editor form').dispatchEvent(new win.Event('submit',{bubbles:true,cancelable:true})));
  assert.equal(document.querySelector('#project-title').textContent,'Refined light study');assert.equal(serverProjects.length,3);
  await click(button('Close project'));await click(button('Archive project: Refined light study'));assert.equal(cards().length,2);assert.equal(serverProjects.find(p=>p.id==='test-original-render').archived,true);
  await click(button('Undo'));assert.equal(cards().length,3);assert.equal(serverProjects.find(p=>p.id==='test-original-render').archived,false);
  await act(async()=>root.unmount());
});
test('viewer UI has no editor controls, while project links remain usable',async()=>{
  document.body.innerHTML='<div id="root"></div>';const root=createRoot(document.getElementById('root'));
  await act(async()=>root.render(createElement(Portfolio,{initialProjects:referenceProjects,initialCanEdit:false})));
  assert.equal(document.querySelector('.studio-button'),null);assert.equal([...document.querySelectorAll('button')].some(b=>b.textContent.includes('Add your work')),false);
  assert.equal(document.querySelector('.project-open').getAttribute('href'),'/projects/aircraft-in-detail');
  await act(async()=>root.unmount());
});


test('imported captions, interest chapters, flight goals, and 3D controls remain interactive',async()=>{
  document.body.innerHTML='<div id="root"></div>';const root=createRoot(document.getElementById('root'));
  await act(async()=>root.render(createElement(Portfolio,{initialProjects:defaultProjects,initialCanEdit:false})));
  assert.equal(cards().length,7);
  await click(document.querySelector('.project-open[href="/projects/room-day-and-night"]'));
  assert.equal(document.querySelectorAll('.image-thumbnails button').length,3);
  assert.match(document.querySelector('.source-caption p').textContent,/@sherzadovc/);
  assert.match(document.querySelector('.project-specs').textContent,/@sherzadovc/);
  await click(button('Close project'));
  await click(button('Psychology'));assert.match(document.querySelector('#interest-panel').textContent,/how people think/);
  await click(button('The next horizon'));assert.match(document.querySelector('#flight-story').textContent,/Purdue/);
  assert.equal(document.querySelector('#flight-story a').getAttribute('href'),'https://polytechnic.purdue.edu/academics/professional-flight');
  await click(button('First cube'));assert.equal(button('First cube').getAttribute('aria-pressed'),'true');assert.match(document.querySelector('.lab-scene-label').textContent,/FIRST GEOMETRY/);
  await click(button('Wireframe'));assert.equal(button('Wireframe').getAttribute('aria-pressed'),'true');
  await click(document.querySelector('.journal-photo'));assert.equal(document.querySelector('#project-title').textContent,'After class, the light stays.');
  await click(button('Close project'));
  assert.match(document.querySelector('.portrait-stamp').textContent,/28.03.2010/);
  assert.equal(document.querySelector('.edex-card').getAttribute('href'),'https://edexschool.uz/');
  await act(async()=>root.unmount());
});

test('all 40 photos are reachable, album/type filters compose, media opens and navigates, and Gym has photos and video',async()=>{
  document.body.innerHTML='<div id="root"></div>';const root=createRoot(document.getElementById('root'));
  await act(async()=>root.render(createElement(Portfolio,{initialProjects:defaultProjects,initialCanEdit:false})));
  const archive=document.querySelector('#media');assert.equal(archive.querySelectorAll('.media-card').length,12);
  assert.match(archive.querySelector('.media-totals').textContent,/40 photos21 videos/);
  await click(button('Photos',archive));
  while([...archive.querySelectorAll('button')].some(b=>b.textContent.trim()==='Show more moments'))await click(button('Show more moments',archive));
  assert.equal(archive.querySelectorAll('.media-card').length,40);
  await click(archive.querySelector('.media-card[aria-label="Open photo: Dining Room"]'));
  assert.equal(document.querySelector('#media-viewer-title').textContent,'Dining Room');
  assert.match(document.querySelector('.media-viewer-copy').textContent,/@sherzadovc/);
  assert.equal(document.querySelector('.media-viewer-links a').getAttribute('href'),'https://t.me/jurats_portfolio/14');
  await click(button('Next media'));assert.notEqual(document.querySelector('#media-viewer-title').textContent,'Dining Room');
  await act(async()=>document.querySelector('.media-viewer').dispatchEvent(new win.KeyboardEvent('keydown',{key:'ArrowLeft',bubbles:true})));
  assert.equal(document.querySelector('#media-viewer-title').textContent,'Dining Room');
  await click(button('Close media viewer'));assert.equal(document.querySelector('dialog'),null);
  await click(button('Videos',archive));assert.equal(archive.querySelectorAll('.media-card').length,12);
  await click(archive.querySelector('.media-card'));
  const player=document.querySelector('.media-viewer video');assert.ok(player);assert.equal(player.getAttribute('preload'),'metadata');assert.ok(player.hasAttribute('controls'));assert.match(player.getAttribute('src'),/clip-027.mp4$/);
  let paused=0;const otherVideo=document.querySelector('#gym video');otherVideo.pause=()=>{paused++;};
  await act(async()=>player.dispatchEvent(new win.Event('play',{bubbles:true})));assert.equal(paused,1);
  await act(async()=>player.dispatchEvent(new win.Event('error',{bubbles:true})));assert.match(document.querySelector('.media-playback-error').textContent,/original channel/);
  await click(button('Close media viewer'));
  const learning=[...archive.querySelectorAll('.album-filters button')].find(b=>b.textContent.startsWith('School & learning'));await click(learning);assert.ok(archive.querySelector('.media-empty'));
  await click(button('Show everything',archive));assert.equal(archive.querySelectorAll('.media-card').length,12);
  await click(button('Explore the Gym album'));assert.equal(archive.querySelector('.album-filters button.active').textContent.startsWith('Gym & sport'),true);
  assert.ok(archive.querySelector('.media-is-video'));assert.ok([...archive.querySelectorAll('.media-card')].some(card=>!card.classList.contains('media-is-video')));
  assert.equal(document.querySelector('#gym video').getAttribute('preload'),'none');assert.equal(document.querySelectorAll('.gym-photo').length,2);
  await click(document.querySelector('.gym-photo'));assert.ok(document.querySelector('.media-viewer-stage img'));
  await act(async()=>document.querySelector('dialog').dispatchEvent(new win.Event('cancel',{cancelable:true})));assert.equal(document.querySelector('dialog'),null);
  await click(button('O‘Z'));assert.equal(document.querySelector('#gym-title').textContent,'Gym.Har kuni bir qadam.');assert.match(document.querySelector('.media-totals').textContent,/40 rasm21 video/);
  await act(async()=>root.unmount());
});

test('certificates are discoverable, show real scores, open full previews, download, and switch language',async()=>{
  document.body.innerHTML='<div id="root"></div>';const root=createRoot(document.getElementById('root'));
  await act(async()=>root.render(createElement(Portfolio,{initialProjects:defaultProjects,initialCanEdit:false})));
  await click(button('EN'));
  const section=document.querySelector('#certificates');
  assert.ok(section);assert.equal(document.querySelector('#navigation a[href="#certificates"]').textContent,'Certificates');
  assert.equal(section.querySelectorAll('.certificate-card').length,2);
  assert.match(section.textContent,/C\+/);assert.match(section.textContent,/53\.22/);assert.match(section.textContent,/81\.88%/);
  assert.match(section.textContent,/1070/);assert.match(section.textContent,/450/);assert.match(section.textContent,/620/);
  await click(button('Open document: Uzbek language & literature',section));
  assert.ok(document.querySelector('dialog[open]'));assert.equal(document.querySelector('#certificate-viewer-title').textContent,'Uzbek language & literature');
  assert.equal(document.querySelector('.certificate-document-image img').getAttribute('src'),'/assets/archive/uzbek-certificate-private-preview.png');
  assert.equal(document.querySelector('.certificate-document-links a[download]').getAttribute('href'),'/assets/archive/uzbek-certificate-private-preview.png');
  assert.equal(document.querySelector('.certificate-document-links a[target="_blank"]').getAttribute('href'),'https://t.me/jurats_portfolio/12');
  await click(button('Close document'));assert.equal(document.querySelector('dialog'),null);
  await click(button('Open document: SAT · English & mathematics',section));
  assert.equal(document.querySelector('.certificate-document-image img').getAttribute('src'),'/assets/archive/sat-private-preview.png');
  assert.equal(document.querySelector('.certificate-viewer-details time').getAttribute('datetime'),'2026-08-22');
  await act(async()=>document.querySelector('dialog').dispatchEvent(new win.Event('cancel',{cancelable:true})));assert.equal(document.querySelector('dialog'),null);
  await click(button('O‘Z'));assert.equal(document.querySelector('#navigation a[href="#certificates"]').textContent,'Sertifikatlar');
  assert.match(section.textContent,/O‘zbek tili va adabiyot/);
  await click(button('Hujjatni ochish: O‘zbek tili va adabiyot',section));assert.equal(document.querySelector('#certificate-viewer-title').textContent,'O‘zbek tili va adabiyot');
  const download=document.querySelector('.certificate-document-links a[download]');assert.equal(download.textContent,'Rasmni yuklab olish');assert.equal(download.getAttribute('download'),'Jurat-Uzbek-language-certificate.png');
  await click(button('Hujjatni yopish'));await act(async()=>root.unmount());
});

test('scroll flight, Gym reveal, filtered grids, visibility, and live reduced-motion changes clean up correctly',async()=>{
  const saved=new Map();
  function override(target,key,value){saved.set([target,key],Object.getOwnPropertyDescriptor(target,key));Object.defineProperty(target,key,{value,configurable:true,writable:true});}
  const observers=[],frames=new Map(),listeners=new Set();let nextFrame=0,hidden=false;
  const preference={matches:false,addEventListener:(_type,fn)=>listeners.add(fn),removeEventListener:(_type,fn)=>listeners.delete(fn)};
  class Observer{
    targets=new Set();disconnected=false;
    constructor(callback,options={}){this.callback=callback;this.options=options;observers.push(this);}
    observe(el){this.targets.add(el);}unobserve(el){this.targets.delete(el);}
    disconnect(){this.targets.clear();this.disconnected=true;}
    emit(el,isIntersecting){assert.ok(this.targets.has(el));this.callback([{target:el,isIntersecting}]);}
  }
  const flush=now=>{const queued=[...frames];frames.clear();for(const [,callback] of queued)callback(now);};
  override(win,'IntersectionObserver',Observer);override(win,'matchMedia',()=>preference);
  override(win,'requestAnimationFrame',callback=>{frames.set(++nextFrame,callback);return nextFrame;});
  override(win,'cancelAnimationFrame',id=>frames.delete(id));override(win,'innerHeight',1000);
  const hiddenDescriptor=Object.getOwnPropertyDescriptor(document,'hidden');Object.defineProperty(document,'hidden',{get:()=>hidden,configurable:true});
  document.body.innerHTML='<div id="root"></div><div class="hero"><svg><path class="hero-trail"/><g class="hero-plane"/></svg></div><div class="creative-route"><svg><path class="route-dashes"/><path class="route-flown"/><g class="route-aircraft"/></svg></div><section class="gym-section"><h2 class="gym-heading">Gym</h2></section><section class="work-section"><div class="project-grid"></div></section><section class="media-section"><div class="media-grid"></div></section>';
  let routeTop=950;
  const route=document.querySelector('.creative-route'),hero=document.querySelector('.hero'),gym=document.querySelector('.gym-section');
  route.getBoundingClientRect=()=>({top:routeTop});gym.getBoundingClientRect=()=>({top:1500});
  for(const path of document.querySelectorAll('.route-dashes,.hero-trail')){path.getTotalLength=()=>100;path.getPointAtLength=d=>({x:d,y:0});}
  const root=createRoot(document.getElementById('root'));let mounted=true;
  try{
    await act(async()=>root.render(createElement(PortfolioMotion)));
    assert.equal(route.dataset.flight,'js');assert.match(route.querySelector('.route-aircraft').getAttribute('transform'),/translate\(0.0 0.0\)/);
    routeTop=600;win.dispatchEvent(new win.Event('scroll'));flush(100);
    assert.match(route.querySelector('.route-aircraft').getAttribute('transform'),/translate\(50.0 0.0\)/);
    assert.equal(route.querySelector('.route-flown').getAttribute('stroke-dasharray'),'50.0 100.0');
    const gymObserver=observers.find(observer=>observer.options.threshold===.22);
    assert.equal(gym.dataset.gym,'pending');assert.ok(gymObserver.targets.has(gym.querySelector('.gym-heading')));
    gymObserver.emit(gym.querySelector('.gym-heading'),true);assert.equal(gym.dataset.gym,'in');
    const live=observers.find(observer=>observer.targets.has(hero));
    live.emit(hero,true);flush(200);flush(2500);assert.ok(Number(hero.querySelector('.hero-plane').style.opacity)>0);
    hidden=true;document.dispatchEvent(new win.Event('visibilitychange'));flush(3000);assert.equal(frames.size,0);
    hidden=false;document.dispatchEvent(new win.Event('visibilitychange'));assert.equal(frames.size,1);
    const oldGrid=document.querySelector('.project-grid'),newGrid=document.createElement('div');newGrid.className='project-grid';
    await act(async()=>{oldGrid.replaceWith(newGrid);await new Promise(resolve=>setTimeout(resolve,0));});
    assert.ok(!live.targets.has(oldGrid));assert.ok(live.targets.has(newGrid));live.emit(newGrid,false);assert.equal(newGrid.dataset.live,'false');
    await act(async()=>{preference.matches=true;for(const listener of listeners)listener();});
    assert.equal(frames.size,0);assert.equal(gym.hasAttribute('data-gym'),false);assert.equal(route.hasAttribute('data-flight'),false);
    assert.equal(newGrid.hasAttribute('data-live'),false);assert.equal(document.documentElement.style.getPropertyValue('--hero-drift'),'');
    assert.ok(observers.every(observer=>observer.disconnected));
    await act(async()=>root.unmount());mounted=false;assert.equal(listeners.size,0);
  }finally{
    if(mounted)await act(async()=>root.unmount());
    for(const [[target,key],descriptor] of saved)if(descriptor)Object.defineProperty(target,key,descriptor);else delete target[key];
    if(hiddenDescriptor)Object.defineProperty(document,'hidden',hiddenDescriptor);else delete document.hidden;
  }
});
