"use client";
import { useEffect,useRef } from "react";
export default function PortfolioModal({children,labelId,onClose,wide=false,busy=false}:{children:React.ReactNode;labelId:string;onClose:()=>void;wide?:boolean;busy?:boolean}){
  const ref=useRef<HTMLDialogElement>(null);
  useEffect(()=>{
    const dialog=ref.current!;
    dialog.showModal();
    const previous=document.body.style.overflow;document.body.style.overflow="hidden";
    return ()=>{dialog.close();document.body.style.overflow=previous;};
  },[]);
  return <dialog ref={ref} aria-labelledby={labelId} className={`portfolio-dialog ${wide?"dialog-wide":""}`}
    onCancel={e=>{e.preventDefault();if(!busy)onClose();}}
    onClick={e=>{if(e.target===ref.current && !busy){const b=ref.current!.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)onClose();}}}>
    {children}
  </dialog>;
}
