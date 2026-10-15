import { chromium } from '@playwright/test';
import { mkdir, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
const out=path.resolve('../Validation-commerciale-Aimy-Digital-2026-10-15');
await mkdir(path.join(out,'videos'),{recursive:true});const report=[];
const b=await chromium.launch({channel:'chrome',headless:true});
for(const width of [1440,390])for(const route of ['referencement-seo','publicites-sea']){
 const height=width===1440?900:844;
 const c=await b.newContext({viewport:{width,height},deviceScaleFactor:1,hasTouch:width===390,reducedMotion:'no-preference',recordVideo:{dir:path.join(out,'videos'),size:{width,height}}});
 const p=await c.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://127.0.0.1:4322/'+route+'/',{waitUntil:'networkidle'});await p.waitForTimeout(1000);
 const scene=p.locator('[data-journey]');const y=await scene.evaluate(e=>scrollY+e.getBoundingClientRect().top-100);
 await p.evaluate(y=>scrollTo({top:y,behavior:'smooth'}),y);await p.waitForTimeout(1400);
 const controls=p.locator('[data-journey-select]');const positions=[];
 for(const i of [0,1,2,3,1,0]){
   if(width===390)await controls.nth(i).tap();else await controls.nth(i).click();
   await p.waitForTimeout(150);positions.push({stage:i,during:await p.locator('.journey-traveller').getAttribute('style')});
   await p.waitForTimeout(1250);positions[positions.length-1].after=await p.locator('.journey-traveller').getAttribute('style');
 }
 await p.screenshot({path:path.join(out,`${route}-${width}.png`)});
 await p.waitForTimeout(900);const video=p.video();await c.close();
 const file=`${route}-${width}.webm`;await rename(await video.path(),path.join(out,'videos',file));report.push({route,width,height,file,errors,positions});console.log(file);
}
await b.close();await writeFile(path.join(out,'preuves-videos.json'),JSON.stringify(report,null,2));
await writeFile(path.join(out,'index.html'),`<!doctype html><html lang="fr"><meta charset="utf-8"><title>Aimy Digital — corrections commerciales</title><style>body{font:16px system-ui;background:#e5f1f7;color:#10283e;margin:40px auto;max-width:1200px;padding:20px}h1{font-size:40px}section{margin:40px 0}video{max-width:100%;max-height:750px;background:#10283e}a{color:#006397}p{max-width:80ch;line-height:1.6}</style><h1>Corrections commerciales</h1><p>15 octobre 2026. Enregistrements natifs du navigateur local, sans montage. Les séquences montrent les étapes, les retours arrière et les commandes tactiles. Le déplacement du repère est animé ; les textes explicatifs changent immédiatement.</p><p><a href="rapport.md">Rapport unique et réserves avant publication</a></p>${report.map(r=>`<section><h2>${r.route} — ${r.width} px</h2><video controls preload="metadata" src="videos/${r.file}"></video></section>`).join('')}</html>`);
console.log(out);
