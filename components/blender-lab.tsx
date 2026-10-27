"use client";
import {useEffect,useRef,useState} from "react";
import {Box,Move,Pause,Play,RotateCcw,Sun,Plane} from "lucide-react";
import {buildFlightModel,disposeFlightModel,fitFlightCamera} from "@/lib/flight-model";
import type {FlightView} from "@/lib/flight-model";
import type * as Three from "three";
export default function BlenderLab({lang}:{lang:string}){
  const [subject,setSubject]=useState<"aircraft"|"cube">("aircraft"),[view,setView]=useState<FlightView>("solid"),[light,setLight]=useState(45),[auto,setAuto]=useState(true),[status,setStatus]=useState("loading");
  const host=useRef<HTMLDivElement>(null),controls=useRef({subject,view,light,auto}),reset=useRef(()=>{}),nudge=useRef<(x:number,y:number)=>void>(()=>{});
  const t=(en:string,uz:string)=>lang==="uz"?uz:en,rad=light*Math.PI/180;
  function labKeys(e:React.KeyboardEvent<HTMLDivElement>){
    if(e.target!==e.currentTarget)return;
    const step:Record<string,[number,number]>={ArrowLeft:[-.14,0],ArrowRight:[.14,0],ArrowUp:[0,-.09],ArrowDown:[0,.09]};
    if(e.key==="Home"){e.preventDefault();reset.current();return;}
    const s=step[e.key];if(s){e.preventDefault();nudge.current(s[0],s[1]);}
  }
  useEffect(()=>{controls.current={subject,view,light,auto};},[subject,view,light,auto]);
  useEffect(()=>{
    const node=host.current!;let cancelled=false,started=false,frame=0,active=true,dispose=()=>{};
    const preference=window.matchMedia("(prefers-reduced-motion: reduce)");let calm=preference.matches;
    const motionChanged=()=>{calm=preference.matches;if(calm){controls.current.auto=false;setAuto(false);}};
    motionChanged();preference.addEventListener("change",motionChanged);
    async function start(){
      if(started||cancelled)return;started=true;
      if(!("WebGLRenderingContext" in window)){setStatus("fallback");return;}
      try{
        const T=await import("three");if(cancelled)return;
        const renderer=new T.WebGLRenderer({antialias:true,alpha:true,powerPreference:"low-power"});
        renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.65));renderer.setClearColor(0x000000,0);renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
        renderer.domElement.setAttribute("aria-label","Interactive aircraft sketch. Use the controls to change the subject, surface, and light.");renderer.domElement.setAttribute("role","img");node.appendChild(renderer.domElement);
        const scene=new T.Scene(),camera=new T.PerspectiveCamera(38,1,.1,80);camera.position.set(7,4.6,8);camera.lookAt(0,0,0);
        scene.add(new T.HemisphereLight(0xe9f3ee,0x3c5264,2.1));
        const sun=new T.DirectionalLight(0xffe0b8,3.6);sun.position.set(4,7,3);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-6;sun.shadow.camera.right=6;sun.shadow.camera.top=6;sun.shadow.camera.bottom=-6;sun.shadow.bias=-.001;scene.add(sun);
        const rim=new T.DirectionalLight(0x9ecacb,2);rim.position.set(-4,2,-5);scene.add(rim);
        const ground=new T.Mesh(new T.PlaneGeometry(60,60),new T.ShadowMaterial({opacity:.18}));ground.rotation.x=-Math.PI/2;ground.position.y=-1.5;ground.receiveShadow=true;scene.add(ground);
        const grid=new T.GridHelper(14,28,0x4c7478,0x36555b);grid.position.y=-1.51;(grid.material as Three.Material).transparent=true;(grid.material as Three.Material).opacity=.22;scene.add(grid);
        let model=buildFlightModel(T,controls.current.subject,controls.current.view);scene.add(model);
        let signature=controls.current.subject+controls.current.view,swapAt=-1e9,yaw=0,targetYaw=0,pitch=.05,targetPitch=.05,drag=false,lastX=0,lastY=0;
        reset.current=()=>{targetYaw=0;targetPitch=.05;setLight(45);};nudge.current=(x,y)=>{targetYaw+=x;targetPitch=Math.max(-.6,Math.min(.8,targetPitch+y));};
        const size=()=>{const width=node.clientWidth||800,height=node.clientHeight||470;renderer.setSize(width,height);const scale=model.scale.clone();model.scale.setScalar(1);fitFlightCamera(T,camera,model,width/height);model.scale.copy(scale);};
        const resizeObserver=typeof ResizeObserver!=="undefined"?new ResizeObserver(size):null;resizeObserver?.observe(node);window.addEventListener("resize",size);size();
        const down=(e:PointerEvent)=>{drag=true;node.dataset.dragging="true";lastX=e.clientX;lastY=e.clientY;node.setPointerCapture?.(e.pointerId);};
        const move=(e:PointerEvent)=>{if(!drag)return;targetYaw+=(e.clientX-lastX)*.008;targetPitch=Math.max(-.6,Math.min(.8,targetPitch+(e.clientY-lastY)*.005));lastX=e.clientX;lastY=e.clientY;};
        const up=()=>{drag=false;delete node.dataset.dragging;};node.addEventListener("pointerdown",down);node.addEventListener("pointermove",move);node.addEventListener("pointerup",up);node.addEventListener("pointercancel",up);
        let lastTime=0;
        function render(time:number){
          if(cancelled)return;frame=window.requestAnimationFrame(render);if(!active||document.hidden)return;
          const delta=Math.min((time-lastTime)/1000,.04);lastTime=time;
          const c=controls.current,nextSignature=c.subject+c.view;
          if(signature!==nextSignature){scene.remove(model);disposeFlightModel(model);model=buildFlightModel(T,c.subject,c.view);scene.add(model);signature=nextSignature;size();swapAt=time;}
          const swap=calm?1:Math.min((time-swapAt)/520,1);model.scale.setScalar(swap<1?.82+.18*(1-Math.pow(1-swap,3)):1);
          if(c.auto&&!drag)targetYaw+=delta*.14;
          yaw+=(targetYaw-yaw)*.08;pitch+=(targetPitch-pitch)*.08;model.rotation.y=yaw-.35;model.rotation.x=pitch;model.position.y=c.subject==="aircraft"&&c.auto?Math.sin(time*.0007)*.035:0;
          const angle=c.light*Math.PI/180;sun.position.set(Math.cos(angle)*6,5.5,Math.sin(angle)*6);renderer.render(scene,camera);
        }
        frame=window.requestAnimationFrame(render);setStatus("ready");
        dispose=()=>{window.cancelAnimationFrame(frame);node.removeEventListener("pointerdown",down);node.removeEventListener("pointermove",move);node.removeEventListener("pointerup",up);node.removeEventListener("pointercancel",up);window.removeEventListener("resize",size);resizeObserver?.disconnect();disposeFlightModel(model);ground.geometry.dispose();(ground.material as Three.Material).dispose();grid.geometry.dispose();(grid.material as Three.Material).dispose();renderer.dispose();renderer.domElement.remove();};
      }catch{if(!cancelled)setStatus("fallback");}
    }
    const observer=typeof IntersectionObserver!=="undefined"?new IntersectionObserver(entries=>{active=entries[0]?.isIntersecting??true;if(active)void start();},{rootMargin:"120px"}):null;
    if(observer)observer.observe(node);else void start();
    return()=>{cancelled=true;preference.removeEventListener("change",motionChanged);observer?.disconnect();window.cancelAnimationFrame(frame);dispose();reset.current=()=>{};nudge.current=()=>{};};
  },[]);
  return <section className="lab-section section-shell" id="lab" aria-labelledby="lab-title"><div className="section-heading"><div><span className="eyebrow">03 / THE BLENDER MINDSET</span><h2 id="lab-title">{t("A cube today.","Bugun — kub.")}<br/><em>{t("A wider world tomorrow.","Ertaga — kengroq dunyo.")}</em></h2></div><p>{t("Every scene begins with a shape. Here’s a small interactive flight sketch — a place to explore form, surfaces, and light.","Har bir sahna oddiy shakldan boshlanadi. Bu kichik interaktiv parvoz eskizida shakl, sirt va yorug‘likni sinab ko‘ring.")}</p></div>
    <div className="lab-frame"><div className="lab-topline"><span><i/>{t("INTERACTIVE FLIGHT SKETCH","INTERAKTIV PARVOZ ESKIZI")}</span><span>{t("DRAG TO ROTATE","AYLANTIRISH UCHUN TORTING")}<Move size={12}/></span></div><div ref={host} className={`lab-canvas view-${view}`} tabIndex={0} role="group" aria-label={t("Interactive aircraft sketch. Use the arrow keys to rotate and Home to reset.","Interaktiv parvoz eskizi. Aylantirish uchun strelka tugmalari, tiklash uchun Home tugmasidan foydalaning.")} onKeyDown={labKeys} style={{"--lx":Math.cos(rad).toFixed(3),"--lz":Math.sin(rad).toFixed(3)} as React.CSSProperties}><span className="lab-sun" aria-hidden="true"/>
      {status!=="ready"&&<div className="lab-fallback" aria-live="polite"><div className={`fallback-shape ${subject}`}>{subject==="cube"?<Box size={110} strokeWidth={.65}/>:<Plane size={150} strokeWidth={.6}/>}</div><span>{status==="loading"?t("Preparing a different point of view…","O‘zgacha nigoh tayyorlanmoqda…"):t("A flight sketch. 3D view needs WebGL support.","Parvoz eskizi. 3D ko‘rinish uchun WebGL kerak.")}</span></div>}
      <span className="lab-axis">Y ↑<br/>Z ↙ &nbsp; X →</span><span className="lab-scene-label" key={subject}>{subject==="cube"?"001 / FIRST GEOMETRY":"002 / EYES ON THE SKY"}</span>
    </div><div className="lab-controls"><div role="group" aria-label={t("3D subject","3D obyekt")} className="lab-toggle"><button aria-pressed={subject==="aircraft"} onClick={()=>setSubject("aircraft")}><Plane size={14}/>{t("Aircraft","Samolyot")}</button><button aria-pressed={subject==="cube"} onClick={()=>setSubject("cube")}><Box size={14}/>{t("First cube","Birinchi kub")}</button></div><div role="group" aria-label={t("Surface style","Sirt ko‘rinishi")} className="lab-toggle">{([['solid',t('Studio','Studiya')],['wireframe',t('Wireframe','Karkas')],['clay',t('Clay','Loy')]] as [FlightView,string][]).map(([value,label])=><button key={value} onClick={()=>setView(value)} aria-pressed={view===value}>{label}</button>)}</div><label className="lab-light"><Sun size={14}/><span className="visually-hidden">{t("Light direction","Yorug‘lik yo‘nalishi")}</span><input type="range" min={0} max={360} value={light} onChange={e=>setLight(Number(e.target.value))}/></label><div className="lab-transport"><button className="icon-button" onClick={()=>setAuto(v=>!v)} aria-label={auto?t("Pause rotation","Aylanishni to‘xtatish"):t("Start rotation","Aylantirish")} aria-pressed={auto}>{auto?<Pause size={15}/>:<Play size={15}/>}</button><button className="icon-button" onClick={()=>{setLight(45);reset.current();}} aria-label={t("Reset 3D view","3D ko‘rinishni tiklash")}><RotateCcw size={15}/></button></div></div></div>
    <p className="lab-note">↳ {t("A stylised interactive model made for this website, alongside my Blender learning collection. Explore it with your mouse or use the controls.","Bu sayt uchun yaratilgan stilizatsiyalangan interaktiv model Blender izlanishlarim yonida joylashgan. Sichqoncha yoki tugmalar yordamida sinab ko‘ring.")}</p>
  </section>;
}
