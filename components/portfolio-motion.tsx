"use client";
import {useEffect,useState} from "react";
import {Plane} from "lucide-react";
const clamp=(v:number,lo=0,hi=1)=>Math.min(hi,Math.max(lo,v));
const smooth=(t:number)=>t*t*(3-2*t);
const canMeasure=(path:SVGPathElement)=>typeof path.getTotalLength==="function"&&typeof path.getPointAtLength==="function";
function aim(path:SVGPathElement,mark:SVGGElement,total:number,p:number){
  const d=total*clamp(p),at=path.getPointAtLength(d),a=path.getPointAtLength(Math.max(0,d-1.5)),b=path.getPointAtLength(Math.min(total,d+1.5));
  mark.setAttribute("transform",`translate(${at.x.toFixed(1)} ${at.y.toFixed(1)}) rotate(${(Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI).toFixed(1)})`);
}
export default function PortfolioMotion(){
  const [reducedMotion,setReducedMotion]=useState(false);
  useEffect(()=>{
    const preference=window.matchMedia("(prefers-reduced-motion: reduce)");
    const changed=()=>setReducedMotion(preference.matches);
    changed();preference.addEventListener("change",changed);
    return()=>preference.removeEventListener("change",changed);
  },[]);
  useEffect(()=>{
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
    if(reduced.matches||reducedMotion)return;
    let frame=0,lastCard:HTMLElement|null=null;
    const root=document.documentElement;

    /* Creative route: the aircraft follows the scroll position along the path and leaves a warm flown trail. */
    const route=document.querySelector<HTMLElement>(".creative-route");
    const routePath=route?.querySelector<SVGPathElement>(".route-dashes"),routeFlown=route?.querySelector<SVGPathElement>(".route-flown"),routePlane=route?.querySelector<SVGGElement>(".route-aircraft");
    let routeTotal=0,routeP=-1;
    if(route&&routePath&&routePlane&&canMeasure(routePath)){routeTotal=routePath.getTotalLength();if(routeTotal>0)route.dataset.flight="js";}
    const paintRoute=(p:number)=>{if(!(routeTotal>0&&routePath&&routePlane))return;aim(routePath,routePlane,routeTotal,p);routeFlown?.setAttribute("stroke-dasharray",`${(routeTotal*p).toFixed(1)} ${routeTotal.toFixed(1)}`);};

    /* Hero: one small aircraft crosses the sky every so often. It only runs while the hero is on screen. */
    const hero=document.querySelector<HTMLElement>(".hero");
    const heroPath=hero?.querySelector<SVGPathElement>(".hero-trail"),heroPlane=hero?.querySelector<SVGGElement>(".hero-plane");
    let heroTotal=0,heroLive=true,heroRaf=0,heroStart=0,heroShown=false;
    if(heroPath&&heroPlane&&canMeasure(heroPath))heroTotal=heroPath.getTotalLength();
    const CYCLE=24000,WAIT=1600,FLIGHT=9000;
    const heroTick=(now:number)=>{
      heroRaf=0;
      if(!heroLive||document.hidden||!heroPath||!heroPlane||heroTotal<=0)return;
      if(!heroStart)heroStart=now;
      const raw=(((now-heroStart)%CYCLE)-WAIT)/FLIGHT;
      if(raw>=0&&raw<=1){
        aim(heroPath,heroPlane,heroTotal,smooth(raw)*.5+raw*.5);
        heroPlane.style.opacity=Math.min(raw/.1,(1-raw)/.12,1).toFixed(2);heroShown=true;
      }else if(heroShown){heroPlane.style.opacity="0";heroShown=false;}
      heroRaf=window.requestAnimationFrame(heroTick);
    };
    const startHero=()=>{if(!heroRaf&&heroTotal>0)heroRaf=window.requestAnimationFrame(heroTick);};
    const visibility=()=>{if(!document.hidden&&heroLive)startHero();};

    const update=()=>{
      frame=0;
      const vh=window.innerHeight,total=root.scrollHeight-vh,scroll=window.scrollY;
      /* read layout first, then write styles */
      let nextRoute=routeP;
      if(route&&routeTotal>0)nextRoute=clamp((vh*.95-route.getBoundingClientRect().top)/(vh*.7));
      root.style.setProperty("--flight-progress",String(total>0?Math.min(scroll/total,1):0));root.style.setProperty("--flight-progress-opacity",scroll>30?"1":"0");root.style.setProperty("--hero-drift",`${Math.min(scroll*.11,70)}px`);
      if(Math.abs(nextRoute-routeP)>.0006){routeP=nextRoute;paintRoute(nextRoute);}
    };
    const schedule=()=>{if(!frame)frame=window.requestAnimationFrame(update);};
    const reset=()=>{if(lastCard){lastCard.style.removeProperty("--tilt-x");lastCard.style.removeProperty("--tilt-y");lastCard.style.removeProperty("--spot-opacity");lastCard=null;}};
    const pointer=(event:PointerEvent)=>{
      if(event.pointerType!=="mouse")return;
      const card=(event.target as Element).closest?.(".project-image-wrap") as HTMLElement|null;
      if(!card){reset();return;}
      if(card!==lastCard)reset();lastCard=card;
      const b=card.getBoundingClientRect();if(!b.width||!b.height)return;
      const x=(event.clientX-b.left)/b.width,y=(event.clientY-b.top)/b.height;
      card.style.setProperty("--tilt-x",`${(0.5-y)*3}deg`);card.style.setProperty("--tilt-y",`${(x-0.5)*4}deg`);
      card.style.setProperty("--spot-x",`${x*100}%`);card.style.setProperty("--spot-y",`${y*100}%`);card.style.setProperty("--spot-opacity","1");
    };

    /* Reveal on scroll (unchanged behaviour, a few more sections). */
    const observer=typeof window.IntersectionObserver!=="undefined"?new window.IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){(entry.target as HTMLElement).dataset.reveal="shown";observer?.unobserve(entry.target);}});},{threshold:.12,rootMargin:"0px 0px -35px 0px"}):null;
    const elements=[...document.querySelectorAll<HTMLElement>(".intro-content,.section-heading,.approach-heading,.approach-card,.about-heading,.about-content,.portrait-visual,.portrait-copy,.interest-heading,.interest-browser,.learning-copy,.edex-card,.flight-goal-heading,.flight-plan,.lab-frame,.media-toolbar,.journal-grid,.certificates-heading,.certificate-card,.closing")];
    for(const el of elements){if(observer&&el.getBoundingClientRect().top>window.innerHeight*.9){el.dataset.reveal="pending";observer.observe(el);}}

    /* Pause looping animation whenever its section is off screen. */
    const liveTargets=new Set<HTMLElement>();
    const live=typeof window.IntersectionObserver!=="undefined"?new window.IntersectionObserver(entries=>{
      for(const entry of entries){const el=entry.target as HTMLElement;el.dataset.live=entry.isIntersecting?"true":"false";if(el===hero){heroLive=entry.isIntersecting;if(heroLive)startHero();}}
    }):null;
    const refreshTargets=()=>{
      const current=new Set(document.querySelectorAll<HTMLElement>(".hero,.creative-route,.gym-section,.lab-frame,.project-grid,.media-grid"));
      for(const el of liveTargets)if(!current.has(el)){live?.unobserve(el);liveTargets.delete(el);}
      for(const el of current)if(!liveTargets.has(el)){liveTargets.add(el);live?.observe(el);}
    };
    refreshTargets();
    const gridObserver=typeof window.MutationObserver!=="undefined"?new window.MutationObserver(refreshTargets):null;
    document.querySelectorAll(".work-section,.media-section").forEach(el=>gridObserver?.observe(el,{childList:true}));
    if(!live)startHero();

    /* Gym entrance: plays once, the first time the section scrolls into view. */
    const gym=document.querySelector<HTMLElement>(".gym-section");
    const gymObserver=typeof window.IntersectionObserver!=="undefined"?new window.IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)&&gym){gym.dataset.gym="in";gymObserver?.disconnect();}},{threshold:.22}):null;
    if(gym&&gymObserver&&gym.getBoundingClientRect().top>window.innerHeight*.85){gym.dataset.gym="pending";gymObserver.observe(gym.querySelector(".gym-heading")??gym);}

    update();window.addEventListener("scroll",schedule,{passive:true});window.addEventListener("resize",schedule,{passive:true});document.addEventListener("pointermove",pointer,{passive:true});document.addEventListener("pointerleave",reset);document.addEventListener("visibilitychange",visibility);
    return()=>{
      if(frame)window.cancelAnimationFrame(frame);if(heroRaf)window.cancelAnimationFrame(heroRaf);
      observer?.disconnect();live?.disconnect();gridObserver?.disconnect();gymObserver?.disconnect();
      elements.forEach(el=>delete el.dataset.reveal);liveTargets.forEach(el=>delete el.dataset.live);if(gym)delete gym.dataset.gym;
      if(route)delete route.dataset.flight;routePlane?.removeAttribute("transform");routeFlown?.setAttribute("stroke-dasharray","0 2000");
      heroPlane?.removeAttribute("transform");if(heroPlane)heroPlane.style.opacity="";
      reset();window.removeEventListener("scroll",schedule);window.removeEventListener("resize",schedule);document.removeEventListener("pointermove",pointer);document.removeEventListener("pointerleave",reset);document.removeEventListener("visibilitychange",visibility);
      ["--flight-progress","--flight-progress-opacity","--hero-drift"].forEach(p=>root.style.removeProperty(p));
    };
  },[reducedMotion]);
  return <div className="flight-progress" aria-hidden="true"><div className="flight-progress-line"/><span><Plane size={15}/></span></div>;
}
