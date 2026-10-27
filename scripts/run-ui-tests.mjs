import ts from 'typescript';
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import {resolve,dirname,relative} from 'node:path';
import {spawnSync} from 'node:child_process';
const root=process.cwd(),out=resolve(root,'.sites-runtime/ui-test');
const files=['app/portfolio.tsx','components/portfolio-modal.tsx','components/portfolio-motion.tsx','components/project-detail.tsx','components/project-editor.tsx','lib/project-data.ts','lib/curated-projects.ts','components/blender-lab.tsx','components/story-chapters.tsx','lib/flight-model.ts','components/media-archive.tsx','components/certificates-section.tsx','lib/media-data.ts'];
for(const name of files){
  const dest=resolve(out,name.replace(/\.tsx?$/,'.mjs'));
  let compiled=ts.transpileModule(readFileSync(name,'utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext,jsx:ts.JsxEmit.ReactJSX}}).outputText;
  compiled=compiled.replace(/(from\s*["'])([^"']+)(["'])/g,(all,start,path,end)=>{
    if(path==="next/link")return start+"next/link.js"+end;
    if(!path.startsWith('.')&&!path.startsWith('@/'))return all;
    const source=path.startsWith('@/')?resolve(root,path.slice(2)):resolve(dirname(resolve(root,name)),path);
    let next=relative(dirname(dest),resolve(out,relative(root,source))).replace(/\.(ts|tsx)$/, '')+'.mjs';
    if(!next.startsWith('.'))next='./'+next;return start+next+end;
  });
  mkdirSync(dirname(dest),{recursive:true});writeFileSync(dest,compiled);
}
const result=spawnSync(process.execPath,['--test','tests/portfolio-ui.test.mjs'],{stdio:'inherit'});
process.exit(result.status??1);
