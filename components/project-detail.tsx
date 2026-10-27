"use client";
import Link from "next/link";
import {useState} from "react";
import type {Project} from "@/lib/project-data";
import {ArrowDownLeft,ArrowUpRight,ChevronLeft,ChevronRight,Copy,Pencil,X} from "lucide-react";
export default function ProjectDetail({project:p,lang,onClose,onEdit,canEdit=false,standalone=false}:{project:Project;lang:string;onClose?:()=>void;onEdit?:(p:Project)=>void;canEdit?:boolean;standalone?:boolean}){
  const [imageIndex,setImageIndex]=useState(0),[feedback,setFeedback]=useState(""),[dir,setDir]=useState(0);
  const t=(en:string,uz:string)=>lang==="uz"?uz:en;
  const image=p.images[Math.min(imageIndex,p.images.length-1)];
  async function copy(){const url=new URL(`/projects/${p.id}`,window.location.origin).href;try{await navigator.clipboard.writeText(url);setFeedback(t("Project link copied.","Loyiha havolasi nusxalandi."));}catch{setFeedback(url);}}
  const changeImage=(delta:number)=>{setDir(delta);setImageIndex(i=>(i+delta+p.images.length)%p.images.length);};
  return <article className={`project-detail ${standalone?"standalone-detail":""}`}>
    <div className="detail-topbar"><span className="eyebrow">STRATOS / {p.category.toUpperCase()}</span>
      {onClose?<button className="icon-button" onClick={onClose} aria-label={t("Close project","Loyihani yopish")}><X size={22}/></button>:<Link className="text-link" href="/#work"><ArrowDownLeft size={17}/>{t("All work","Barcha ishlar")}</Link>}
    </div>
    <div className="detail-main-image" onKeyDown={e=>{if(e.key==="ArrowRight"){e.preventDefault();changeImage(1);}if(e.key==="ArrowLeft"){e.preventDefault();changeImage(-1);}}} tabIndex={p.images.length>1?0:undefined} role={p.images.length>1?"group":undefined} aria-label={p.images.length>1?t("Project images. Use left and right arrows.","Loyiha rasmlari. Chap va o‘ng tugmalarini ishlating."):undefined}>
      <img key={image.id} src={image.url} alt={image.alt} data-dir={dir>0?"next":dir<0?"prev":undefined}/>
      {p.images.length>1&&<div className="image-controls"><button className="icon-button" aria-label={t("Previous image","Oldingi rasm")} onClick={()=>changeImage(-1)}><ChevronLeft size={19}/></button><span aria-live="polite">{imageIndex+1} / {p.images.length}</span><button className="icon-button" aria-label={t("Next image","Keyingi rasm")} onClick={()=>changeImage(1)}><ChevronRight size={19}/></button></div>}
    </div>
    {p.images.length>1&&<div className="image-thumbnails" aria-label={t("Choose an image","Rasmni tanlang")}>{p.images.map((im,i)=><button key={im.id} onClick={()=>{setDir(i>imageIndex?1:-1);setImageIndex(i);}} aria-pressed={imageIndex===i} aria-label={`${t("Show image","Rasm")} ${i+1}`}><img src={im.url} alt=""/></button>)}</div>}
    <div className="detail-copy"><div className="detail-title-row"><div><span className="eyebrow">{p.kind.toUpperCase()}</span><h2 id="project-title">{p.title}</h2><p className="detail-summary">{p.summary}</p></div><span className="detail-category">{p.category}<ArrowUpRight size={24}/></span></div>
      <div className="detail-columns"><div className="detail-story">
        {p.description&&<section><h3>{t("The idea","G‘oya")}</h3><p>{p.description}</p></section>}
        {p.process&&<section><h3>{t("Behind the piece","Loyiha ortidagi jarayon")}</h3><p>{p.process}</p></section>}
        {p.learning&&<section><h3>{t("What I’m learning","O‘rganayotganlarim")}</h3><p>{p.learning}</p></section>}
      </div><aside className="project-specs"><div><h3>{t("Role & attribution","Ishtirok va mualliflik")}</h3><p>{p.role}</p></div>
        {p.tools.length>0&&<div><h3>{t("Tools & software","Vositalar va dasturlar")}</h3><div className="tags">{p.tools.map(v=><span key={v}>{v}</span>)}</div></div>}
        {p.skills.length>0&&<div><h3>{t("Skills explored","Ko‘nikmalar")}</h3><div className="tags">{p.skills.map(v=><span key={v}>{v}</span>)}</div></div>}
        {p.sourceUrl&&<Link className="text-link" href={p.sourceUrl} target="_blank" rel="noopener noreferrer">{t("Original post / source","Asl post / manba")}<ArrowUpRight size={16}/></Link>}
      </aside></div>
      {p.sourceCaption&&<details className="source-caption"><summary>{t("Read the original post caption","Asl post izohini o‘qish")}</summary><p>{p.sourceCaption}</p></details>}
      {p.credits&&<p className="authorship-note"><span>↳</span>{p.credits}</p>}
      <div className="detail-actions"><button className="text-link" onClick={copy}><Copy size={15}/>{t("Copy project link","Loyiha havolasi")}</button><Link className="text-link" href={image.url} target="_blank" rel="noopener noreferrer">{t("View full image","To‘liq tasvir")}<ArrowUpRight size={16}/></Link>{!standalone&&<Link className="text-link" href={`/projects/${p.id}`}>{t("Open project page","Loyiha sahifasi")}<ArrowUpRight size={16}/></Link>}{canEdit&&onEdit&&<button className="text-link" onClick={()=>onEdit(p)}><Pencil size={15}/>{t("Edit project","Tahrirlash")}</button>}</div>
      <p className="small-feedback" role="status">{feedback}</p>
    </div>
  </article>;
}
