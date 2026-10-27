import { curatedProjects } from "./curated-projects.ts";
export const categories = ["Aviation", "Spaces", "Product", "Exploration", "Photography"] as const;
export const kinds = ["Original render", "Work in progress", "Visual reference", "Channel project", "Photograph"] as const;
export type ProjectImage = { id: string; url: string; alt: string; key?: string };
export type Project = {
  id: string; title: string; category: string; kind: string; summary: string;
  description: string; process: string; learning: string; role: string;
  tools: string[]; skills: string[]; credits: string; sourceUrl: string;
  sourceCaption?: string; images: ProjectImage[]; createdAt: string; updatedAt: string; archived?: boolean;
};
export const MAX_IMAGES = 6;
export const MAX_FILE_BYTES = 8 * 1024 * 1024;
export const MAX_TOTAL_BYTES = 24 * 1024 * 1024;
// Learning references are explicitly distinguished from original work.
export const referenceProjects: Project[] = [
  {
    id: "aircraft-in-detail", title: "Aircraft, in detail.", category: "Aviation", kind: "Visual reference",
    summary: "An aircraft study in proportion, structure, and the language of technical illustration.",
    description: "An A320-inspired visual reference from my learning collection. It connects my interest in aircraft with the shapes and structural relationships I want to explore in 3D.",
    process: "Look closely at the silhouette, wing placement, fuselage proportions, and the relationship between large forms and smaller components. Use those observations as a starting point for original modelling practice.",
    learning: "A reference can guide observation, but it needs to be checked against reliable sources before being used for accurate aircraft modelling.",
    role: "Reference selection and visual exploration", tools: ["AI-assisted imagery"],
    skills: ["Visual research", "Composition", "Form analysis"],
    credits: "AI-assisted visual reference. This image is not an original Blender render or a verified engineering drawing. Dimensions and labels are not technical specifications.",
    sourceUrl: "", images: [{id:"aircraft-reference",url:"/assets/a320-study.png",alt:"AI-assisted A320-inspired aircraft diagram on a black background"}],
    createdAt:"2026-10-19T08:00:00.000Z",updatedAt:"2026-10-19T08:00:00.000Z"
  },
  {
    id:"a-space-to-think",title:"A space to think.",category:"Spaces",kind:"Visual reference",
    summary:"Warm wood, olive upholstery, and the quiet character of natural light.",
    description:"An interior reference for my Blender learning journey. The palette and daylight are starting points for exploring how materials, scale, and lighting work together.",
    process:"Study the balance of wood, fabric, and metal, then observe how a large window shapes the atmosphere. Translate individual ideas into material and lighting exercises in Blender.",
    learning:"Material roughness, texture scale, and light direction each change the way a space feels. This reference is inspiration for practice, rather than a completed 3D project.",
    role:"Reference selection and visual exploration",tools:["AI-assisted imagery"],skills:["Material research","Lighting studies","Colour exploration"],
    credits:"AI-assisted visual reference from my learning collection. Not presented as my original Blender model or render.",sourceUrl:"",
    images:[{id:"interior-reference",url:"/assets/interior-study.png",alt:"AI-assisted warm home-office reference with wood furniture, olive seating, and large windows"}],
    createdAt:"2026-10-19T07:00:00.000Z",updatedAt:"2026-10-19T07:00:00.000Z"
  }
];
export const defaultProjects: Project[] = [...curatedProjects,...referenceProjects.map(p=>({...p,archived:true}))];

export function filterProjects(projects: Project[], category="All", query="", sort="newest") {
  const q = query.trim().toLocaleLowerCase();
  const filtered = projects.filter(p => !p.archived && (category === "All" || p.category === category) &&
    (!q || [p.title,p.summary,p.category,p.kind,...p.skills,...p.tools].join(" ").toLocaleLowerCase().includes(q)));
  return filtered.sort((a,b) => sort === "title" ? a.title.localeCompare(b.title) :
    sort === "oldest" ? a.createdAt.localeCompare(b.createdAt) : b.createdAt.localeCompare(a.createdAt));
}
export function validSourceUrl(value: string) {
  if (!value) return "";
  try {const u = new URL(value);if(u.protocol !== "https:" || u.username || u.password) throw new Error();return u.href;}
  catch { throw new Error("Use a complete https:// source link, or leave it blank."); }
}
export function validateMetadata(raw: Record<string,unknown>) {
  const text = (name:string,max:number,required=false) => {
    if (raw[name] !== undefined && typeof raw[name] !== "string") throw new Error(`Invalid ${name}.`);
    const value = String(raw[name] ?? "").trim();
    if(required && !value) throw new Error(`${name[0].toUpperCase()+name.slice(1)} is required.`);
    if(value.length > max) throw new Error(`${name} must be ${max} characters or fewer.`);
    return value;
  };
  const tags = (name:string) => {
    if(!Array.isArray(raw[name]) || (raw[name] as unknown[]).some(t=>typeof t!=="string")) throw new Error(`Invalid ${name}.`);
    const values = [...new Set((raw[name] as string[]).map(t=>t.trim()).filter(Boolean))];
    if(values.length>12 || values.some(t=>t.length>60)) throw new Error(`Use up to 12 ${name}, each under 60 characters.`);
    return values;
  };
  const category=text("category",50,true),kind=text("kind",50,true);
  if(!categories.includes(category as typeof categories[number])) throw new Error("Choose a project category.");
  if(!kinds.includes(kind as typeof kinds[number])) throw new Error("Choose a project type.");
  return {title:text("title",100,true),summary:text("summary",240,true),category,kind,
    description:text("description",5000),process:text("process",5000),learning:text("learning",3000),
    role:text("role",160,true),sourceCaption:text("sourceCaption",5000),tools:tags("tools"),skills:tags("skills"),credits:text("credits",1600),sourceUrl:validSourceUrl(text("sourceUrl",1000))};
}
export function imageType(bytes: Uint8Array): {mime:string;extension:string} | null {
  if(bytes.length>=8 && [137,80,78,71,13,10,26,10].every((b,i)=>bytes[i]===b)) return {mime:"image/png",extension:"png"};
  if(bytes.length>=3 && bytes[0]===255 && bytes[1]===216 && bytes[2]===255) return {mime:"image/jpeg",extension:"jpg"};
  if(bytes.length>=12 && String.fromCharCode(...bytes.slice(0,4))==="RIFF" && String.fromCharCode(...bytes.slice(8,12))==="WEBP") return {mime:"image/webp",extension:"webp"};
  return null;
}
