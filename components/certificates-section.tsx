"use client";

import {useState} from "react";
import {ArrowUpRight,Download,FileText,Maximize2,ShieldCheck,X} from "lucide-react";
import PortfolioModal from "@/components/portfolio-modal";
import {mediaItems} from "@/lib/media-data";

export default function CertificatesSection({lang}:{lang:string}){
  const uz=lang==="uz",t=(en:string,uzbek:string)=>uz?uzbek:en;
  const [selected,setSelected]=useState<string|null>(null);
  const documents=[
    {
      id:"uzbek-language",item:mediaItems.find(item=>item.id==="design-06")!,
      kind:t("NATIONAL CERTIFICATE","MILLIY SERTIFIKAT"),
      title:t("Uzbek language & literature","O‘zbek tili va adabiyot"),
      issuer:t("Knowledge and Skills Assessment Agency","Bilim va malakalarni baholash agentligi"),
      result:"C+",resultLabel:t("Certificate level","Sertifikat darajasi"),
      description:t("A certificate I earned in ninth grade — one of the academic milestones behind my next chapter.","9-sinfda olgan sertifikatim — keyingi maqsadlarim sari erishgan natijalarimdan biri."),
      facts:[{label:t("Total score","Umumiy ball"),value:"53.22"},{label:t("Percentage","Foiz ko‘rsatkichi"),value:"81.88%"}],
      date:"2026-06-15",dateLabel:t("Issued","Berilgan sana"),filename:"Jurat-Uzbek-language-certificate.png"
    },
    {
      id:"sat-result",item:mediaItems.find(item=>item.id==="design-05")!,
      kind:t("SAT SCORE REPORT","SAT NATIJASI"),title:t("SAT · English & mathematics","SAT · Ingliz tili va matematika"),
      issuer:"College Board",result:"1070",resultLabel:t("Total SAT score","Umumiy SAT bali"),
      description:t("A starting point in my preparation for studying abroad. I’m continuing to strengthen my English and mathematics.","Chet elda o‘qishga tayyorgarligimdagi bir bosqich. Ingliz tili va matematika bilimlarimni mustahkamlashda davom etyapman."),
      facts:[{label:t("Reading & Writing","O‘qish va yozish"),value:"450"},{label:t("Math","Matematika"),value:"620"}],
      date:"2026-08-22",dateLabel:t("Test date","Imtihon sanasi"),filename:"Jurat-SAT-score-report.png"
    }
  ];
  const active=documents.find(document=>document.id===selected);
  const formatDate=(value:string)=>new Intl.DateTimeFormat(uz?"uz-UZ":"en-GB",{day:"numeric",month:"long",year:"numeric",timeZone:"UTC"}).format(new Date(value+"T12:00:00Z"));
  const facts=(document:typeof documents[number])=><dl className="certificate-facts">{document.facts.map(fact=><div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>;
  return <>
    <section className="certificates-section section-shell" id="certificates" aria-labelledby="certificates-title">
      <div className="section-heading certificates-heading"><div><span className="eyebrow">09 / {t("LEARNING, DOCUMENTED","BILIMIMNING HUJJATDAGI AKSI")}</span><h2 id="certificates-title">{t("Certificates.","Sertifikatlarim.")}<br/><em>{t("Steps toward the horizon.","Ufqlar sari qadamlar.")}</em></h2></div><p>{t("The documents behind my learning journey. Open a certificate or score report to see the full image and the details.","Bilim yo‘limdagi hujjatlar va natijalar. To‘liq rasm va tafsilotlarni ko‘rish uchun hujjatni oching.")}</p></div>
      <div className="certificates-grid">{documents.map((document,index)=><article className="certificate-card" key={document.id}>
        <button className="certificate-preview" onClick={()=>setSelected(document.id)} aria-label={`${t("Open document","Hujjatni ochish")}: ${document.title}`}><img src={document.item.url} alt={document.title} loading="lazy" decoding="async" width={document.id==="uzbek-language"?1001:1672} height={document.id==="uzbek-language"?1570:941}/><span className="certificate-preview-number">0{index+1} / {t("DOCUMENT","HUJJAT")}</span><span className="certificate-expand" aria-hidden="true"><Maximize2 size={19}/></span></button>
        <div className="certificate-card-body"><span className="eyebrow"><FileText size={12}/>{document.kind}</span><h3>{document.title}</h3><p className="certificate-issuer">{document.issuer}</p><div className="certificate-result"><strong>{document.result}</strong><span>{document.resultLabel}</span></div>{facts(document)}<p className="certificate-description">{document.description}</p><div className="certificate-card-footer"><time dateTime={document.date}>{formatDate(document.date)}</time><button className="text-link" onClick={()=>setSelected(document.id)}>{t("View document","Hujjatni ko‘rish")}<ArrowUpRight size={16}/></button></div></div>
      </article>)}</div>
      <p className="certificates-note"><ShieldCheck size={16}/>{t("Personal identification numbers and QR codes are hidden in these previews.","Bu ko‘rinishlarda shaxsiy raqamlar va QR kodlar berkitilgan.")}</p>
    </section>
    {active&&<PortfolioModal labelId="certificate-viewer-title" onClose={()=>setSelected(null)} wide><div className="certificate-viewer"><div className="certificate-viewer-top"><span className="eyebrow">{active.kind}</span><button className="icon-button" onClick={()=>setSelected(null)} aria-label={t("Close document","Hujjatni yopish")}><X size={21}/></button></div><div className="certificate-document-image"><img src={active.item.url} alt={active.title}/></div><div className="certificate-viewer-details"><div><h3 id="certificate-viewer-title">{active.title}</h3><p>{active.issuer}</p><p><strong>{active.result}</strong> · {active.resultLabel}</p>{facts(active)}<p>{active.dateLabel}: <time dateTime={active.date}>{formatDate(active.date)}</time></p></div><div className="certificate-document-links"><a className="button button-dark" href={active.item.url} download={active.filename}><Download size={16}/>{t("Download preview","Rasmni yuklab olish")}</a><a className="text-link" href={active.item.sourceUrl} target="_blank" rel="noopener noreferrer">{t("Original channel post","Kanaldagi asl post")}<ArrowUpRight size={15}/></a><p><ShieldCheck size={13}/>{t("Personal codes and QR hidden.","Shaxsiy raqamlar va QR berkitilgan.")}</p></div></div></div></PortfolioModal>}
  </>;
}
