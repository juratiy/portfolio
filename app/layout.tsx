import type { Metadata } from "next";
import "./globals.css";
export const metadata:Metadata={
  metadataBase:new URL(process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")),
  title:{default:"Stratos — Jur’at’s Aviation & 3D Portfolio",template:"%s — Stratos"},
  description:"Jur’at Esonboyev: EdEx student, Blender learner, photography enthusiast, and aspiring aviator from Uzbekistan. A portfolio of ideas, images, and a path toward Purdue.",
  robots:{index:false,follow:false},
  openGraph:{title:"Stratos — A portfolio by Jur’at",description:"Aviation ambitions. Creative explorations.",images:["/assets/stratos-hero.png"]},
  icons:{icon:"/assets/favicon.svg"}
};
export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en"><body>{children}</body></html>;
}
