"use client";
import {useEffect,useRef,useState} from "react";
import type {FormEvent} from "react";
import {categories,kinds,MAX_FILE_BYTES,MAX_IMAGES,MAX_TOTAL_BYTES,validateMetadata} from "@/lib/project-data";
import type {Project} from "@/lib/project-data";
import {Check,ImagePlus,LoaderCircle,Upload,X} from "lucide-react";
import PortfolioModal from "./portfolio-modal";
export default function ProjectEditor({project,lang,onClose,onSave}:{project:Project|null;lang:string;onClose:()=>void;onSave:(p:Project)=>void}){
  const [files,setFiles]=useState<File[]>([]),[previews,setPreviews]=useState<string[]>([]),[keep,setKeep]=useState(project?.images??[]);
  const [error,setError]=useState(""),[busy,setBusy]=useState(false),[dragOver,setDragOver]=useState(false);
  const fileRef=useRef<HTMLInputElement>(null),errorRef=useRef<HTMLParagraphElement>(null);
  const t=(en:string,uz:string)=>lang==="uz"?uz:en;
  useEffect(()=>{const urls=files.map(f=>URL.createObjectURL(f));setPreviews(urls);return()=>urls.forEach(URL.revokeObjectURL);},[files]);
  useEffect(()=>{if(error)errorRef.current?.focus();},[error]);
  function addFiles(incoming:File[]){
    setError("");
    if(keep.length+files.length+incoming.length>MAX_IMAGES){setError(t("Choose up to 6 images per project.","Bitta loyihaga 6 tagacha rasm qo‘shing."));return;}
    if(incoming.some(f=>!['image/png','image/jpeg','image/webp'].includes(f.type)||f.size>MAX_FILE_BYTES||f.size===0)){setError(t("Use PNG, JPEG, or WebP images, each up to 8 MB.","PNG, JPEG yoki WebP rasmlarni tanlang, har biri 8 MB gacha."));return;}
    if([...files,...incoming].reduce((s,f)=>s+f.size,0)>MAX_TOTAL_BYTES){setError(t("Keep the total upload under 24 MB.","Jami rasmlar 24 MB dan oshmasin."));return;}
    setFiles(f=>[...f,...incoming]);
  }
  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();setError("");
    const values=new FormData(event.currentTarget),raw=Object.fromEntries(values.entries());
    const metadata={...raw,tools:String(raw.tools??"").split(","),skills:String(raw.skills??"").split(",")};
    try{validateMetadata(metadata);}catch(e){setError((e as Error).message);return;}
    if(!files.length&&!keep.length){setError(t("Add at least one render or image.","Kamida bitta render yoki rasm qo‘shing."));return;}
    setBusy(true);
    const body=new FormData();body.set("metadata",JSON.stringify({...metadata,id:project?.id,expectedUpdatedAt:project?.updatedAt,keepImageIds:keep.map(im=>im.id)}));
    files.forEach(file=>body.append("images",file));
    try{const response=await fetch("/api/projects",{method:"POST",body}),result=await response.json() as {project:Project;error?:string};if(!response.ok)throw new Error(result.error??"Could not save this project.");onSave(result.project);}
    catch(e){setError((e as Error).message);setBusy(false);}
  }
  const field=(name:keyof Project,label:string,placeholder="",required=false,maxLength=5000,multiline=false)=><label className={multiline?"form-field full":"form-field"}><span>{label}{required&&<i> *</i>}</span>{multiline?<textarea name={name} rows={4} defaultValue={String(project?.[name]??"")} placeholder={placeholder} maxLength={maxLength}/>:<input name={name} defaultValue={String(project?.[name]??(name==="role"?"Modelling, materials & rendering":""))} placeholder={placeholder} required={required} maxLength={maxLength} type={name==="sourceUrl"?"url":"text"}/>}</label>;
  return <PortfolioModal labelId="editor-title" onClose={onClose} wide busy={busy}><div className="editor">
    <div className="editor-heading"><div><span className="eyebrow">YOUR STUDIO / {project?"EDIT":"NEW PROJECT"}</span><h2 id="editor-title">{project?t("Refine the story.","Loyihani takomillashtiring."):t("Give an idea a place.","G‘oyangizga joy bering.")}</h2><p>{t("Show the result. Explain the thinking behind it.","Natijani ko‘rsating. Uning ortidagi fikrni tushuntiring.")}</p></div><button className="icon-button" aria-label={t("Close editor","Tahrirlashni yopish")} disabled={busy} onClick={onClose}><X/></button></div>
    <form onSubmit={submit} aria-busy={busy}><fieldset disabled={busy}>
      <div className={`upload-zone ${dragOver?"drag-over":""}`} onDragOver={e=>{e.preventDefault();setDragOver(true);}} onDragLeave={()=>setDragOver(false)} onDrop={e=>{e.preventDefault();setDragOver(false);addFiles([...e.dataTransfer.files]);}}>
        <input id="render-files" ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp" multiple className="visually-hidden" aria-label={t("Choose render images","Render rasmlarini tanlang")} onChange={e=>{addFiles([...e.target.files??[]]);e.target.value="";}}/>
        <ImagePlus size={32} strokeWidth={1.2}/><h3>{t("Your renders belong here.","Renderlaringiz uchun joy.")}</h3><p>{t("Drag images here, or choose files below.","Rasmlarni shu yerga tashlang yoki fayl tanlang.")}</p><button className="button button-dark" type="button" onClick={()=>fileRef.current?.click()}><Upload size={15}/>{t("Choose images","Rasmlarni tanlash")}</button><small>PNG, JPEG, WEBP · 6 {t("images","rasm")} · 8 MB / {t("image","rasm")} · 24 MB {t("total","jami")}</small>
      </div>
      {(keep.length+files.length)>0&&<div className="upload-previews">{keep.map((im,i)=><div key={im.id}><img src={im.url} alt={im.alt}/><span>{i===0?t("Cover image","Muqova"):String(i+1)}</span><button type="button" className="icon-button" aria-label={`${t("Remove image","Rasmni olib tashlash")} ${i+1}`} onClick={()=>setKeep(v=>v.filter(k=>k.id!==im.id))}><X size={16}/></button></div>)}{files.map((file,i)=><div key={`${file.name}-${i}`}><img src={previews[i]} alt={file.name}/><span>{keep.length+i===0?t("Cover image","Muqova"):String(keep.length+i+1)}</span><button type="button" className="icon-button" aria-label={`${t("Remove image","Rasmni olib tashlash")} ${keep.length+i+1}`} onClick={()=>setFiles(v=>v.filter((_,j)=>j!==i))}><X size={16}/></button></div>)}</div>}
      <div className="form-grid">
        {field("title",t("Project title","Loyiha nomi"),t("e.g. An aircraft at golden hour","Masalan: Quyosh botishidagi samolyot"),true,100)}
        <label className="form-field"><span>{t("Category","Kategoriya")} *</span><select name="category" defaultValue={project?.category??"Aviation"}>{categories.map(c=><option key={c}>{c}</option>)}</select></label>
        <label className="form-field"><span>{t("Project type","Loyiha turi")} *</span><select name="kind" defaultValue={project?.kind??"Original render"}>{kinds.map(k=><option key={k}>{k}</option>)}</select></label>
        {field("role",t("Your contribution","Sizning hissangiz"),"",true,160)}
        <label className="form-field full"><span>{t("Short introduction","Qisqa izoh")} *</span><input name="summary" required maxLength={240} defaultValue={project?.summary??""} placeholder={t("What should a viewer notice first?","Tomoshabin avval nimaga e’tibor bersin?")}/></label>
        {field("description",t("The idea","G‘oya"),t("What did you set out to create?","Nima yaratishni maqsad qildingiz?"),false,5000,true)}
        {field("process",t("Behind the piece","Yaratish jarayoni"),t("How did you model, texture, light, and render it?","Modellashtirish, tekstura, yorug‘lik va render haqida yozing."),false,5000,true)}
        <label className="form-field"><span>{t("Tools & software","Vositalar va dasturlar")}</span><input name="tools" maxLength={720} defaultValue={project?project.tools.join(", "):"Blender"} placeholder="Blender, Cycles, Photoshop"/><small>{t("Separate with commas","Vergul bilan ajrating")}</small></label>
        <label className="form-field"><span>{t("Skills explored","Ko‘nikmalar")}</span><input name="skills" maxLength={720} defaultValue={project?.skills.join(", ")??""} placeholder="Modelling, UV mapping, Lighting"/><small>{t("Separate with commas","Vergul bilan ajrating")}</small></label>
        {field("learning",t("What you learned","Nimalarni o‘rgandingiz"),t("A challenge, a discovery, or what you would improve next.","Qiyinchilik, yangi bilim yoki keyingi yaxshilash rejasi."),false,3000,true)}
        {field("sourceCaption",t("Original post caption","Asl post izohi"),"",false,5000,true)}
        {field("credits",t("Credits & authorship","Manbalar va mualliflik"),t("Credit any external assets, tutorials, collaborators, or AI assistance.","Tashqi modellar, darslar, hamkorlar yoki AI yordamini ko‘rsating."),false,1600,true)}
        <div className="full">{field("sourceUrl",t("Original post / source link","Asl post / manba havolasi"),"https://t.me/your_channel/123",false,1000)}</div>
      </div>
    </fieldset>
      {error&&<p className="form-error" role="alert" ref={errorRef} tabIndex={-1}>{error}</p>}
      <div className="editor-footer"><p>{t("Projects are saved to your portfolio and remain available on your other devices.","Loyihalar portfolioda saqlanadi va boshqa qurilmalaringizda ham ochiladi.")}</p><div><button type="button" className="button button-outline" onClick={onClose} disabled={busy}>{t("Cancel","Bekor qilish")}</button><button className="button button-dark" type="submit" disabled={busy}>{busy?<LoaderCircle className="spin" size={16}/>:<Check size={16}/>} {busy?t("Saving…","Saqlanmoqda…"):t("Save project","Loyihani saqlash")}</button></div></div>
    </form>
  </div></PortfolioModal>;
}
