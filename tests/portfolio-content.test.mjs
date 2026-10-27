import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import * as THREE from 'three';
import {curatedProjects} from '../lib/curated-projects.ts';
import {validateMetadata} from '../lib/project-data.ts';
import {buildFlightModel,disposeFlightModel,fitFlightCamera} from '../lib/flight-model.ts';

test('curated project files exist and imported source author credits remain intact',()=>{
  assert.equal(curatedProjects.length,7);
  for(const p of curatedProjects){
    assert.doesNotThrow(()=>validateMetadata(p));
    assert.match(p.sourceUrl,/^https:\/\/t.me\/(jurats_portfolio|juratss)\/\d+$/);
    for(const image of p.images)assert.equal(existsSync('public'+image.url),true,image.url);
    if(p.kind==='Channel project'){
      assert.match(p.sourceCaption,/@sherzadovc/);assert.match(p.credits,/@sherzadovc/);assert.match(p.role,/@sherzadovc/);
    }
  }
  assert.equal(existsSync('public/assets/journal/on-the-move.mp4'),true);
});
test('camera framing keeps both subjects visible on wide and narrow screens',()=>{
  for(const subject of ['aircraft','cube'])for(const aspect of [2.5,1,.7]){
    const model=buildFlightModel(THREE,subject,'solid'),camera=new THREE.PerspectiveCamera(38,aspect,.1,80);
    fitFlightCamera(THREE,camera,model,aspect);
    for(const angle of [0,Math.PI/2,Math.PI,Math.PI*1.5]){
      model.rotation.y=angle;model.updateMatrixWorld(true);
      model.traverse(item=>{if(!item.isMesh)return;const positions=item.geometry.attributes.position;for(let i=0;i<positions.count;i++){
        const p=new THREE.Vector3().fromBufferAttribute(positions,i).applyMatrix4(item.matrixWorld).project(camera);
        assert.ok(Math.abs(p.x)<1&&Math.abs(p.y)<1,`${subject} fits aspect ${aspect}`);
      }});
    }
    disposeFlightModel(model);
  }
});
test('interactive aircraft and cube geometry are finite and renderable in each surface mode',()=>{
  for(const subject of ['aircraft','cube'])for(const view of ['solid','wireframe','clay']){
    const model=buildFlightModel(THREE,subject,view),bounds=new THREE.Box3().setFromObject(model),size=bounds.getSize(new THREE.Vector3());
    assert.ok([size.x,size.y,size.z].every(n=>Number.isFinite(n)&&n>0));
    if(subject==='aircraft')assert.ok(size.x>5&&size.z>5,'the aircraft should have a visible wing span and fuselage');
    let meshes=0;model.traverse(item=>{if(item.isMesh){meshes++;assert.ok(item.geometry.attributes.position.count>0);if(view==='wireframe')assert.equal(item.material.wireframe,true);}});
    assert.ok(meshes>0);disposeFlightModel(model);
  }
});

test('the complete media archive covers both channel photo collections and ships playable short clips',async()=>{
  const {mediaItems,filterMedia,photoCount,videoCount}=await import('../lib/media-data.ts');
  assert.equal(photoCount,40);assert.equal(videoCount,21);assert.equal(new Set(mediaItems.map(item=>item.id)).size,61);
  for(let i=1;i<=32;i++)assert.ok(mediaItems.find(item=>item.id===`personal-${String(i).padStart(2,'0')}`),`personal photo ${i} is included`);
  for(let i=1;i<=8;i++)assert.ok(mediaItems.find(item=>item.id===`design-${String(i).padStart(2,'0')}`),`portfolio photo ${i} is included`);
  for(const item of mediaItems){
    assert.equal(existsSync('public'+item.url),true,item.url);
    assert.match(item.sourceUrl,/^https:\/\/t.me\/(juratss|jurats_portfolio)\/\d+$/);
    assert.ok(item.attribution.en&&item.attribution.uz);
    if(item.type==='video'){assert.equal(existsSync('public'+item.poster),true,item.poster);assert.ok(item.duration>0&&item.duration<60);}
  }
  assert.deepEqual(filterMedia(mediaItems,'learning','video'),[]);
  assert.equal(filterMedia(mediaItems,'all','photo').length,40);
  assert.equal(filterMedia(mediaItems,'all','video').length,21);
  const gym=filterMedia(mediaItems,'gym');assert.ok(gym.some(item=>item.type==='photo'));assert.ok(gym.some(item=>item.type==='video'));
  for(const id of ['personal-21','design-05','design-06']){const item=mediaItems.find(item=>item.id===id);assert.equal(item.redacted,true);assert.match(item.url,/private-preview/);}
  for(const id of ['design-01','design-02','design-03','design-04','design-08'])assert.match(mediaItems.find(item=>item.id===id).attribution.en,/@sherzadovc/);
});
