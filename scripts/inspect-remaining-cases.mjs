import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';
const b=await chromium.launch({channel:'chrome',headless:true});
const reports=[];
for(const [id,url] of [['lambert','https://lambertdigitalpulse.fr/']]){
 const p=await b.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:2});
 try {const r=await p.goto(url,{waitUntil:'networkidle',timeout:60000});
 await p.evaluate(()=>document.fonts.ready); await mkdir(`docs/qa/remaining-cases/${id}`,{recursive:true});
 await p.screenshot({path:`docs/qa/remaining-cases/${id}/source.png`,fullPage:false});
 reports.push({id,url:p.url(),status:r.status(),text:await p.locator('body').innerText(),links:await p.locator('a').evaluateAll(es=>es.map(e=>({text:e.textContent,href:e.href}))),dimensions:await sharp(`docs/qa/remaining-cases/${id}/source.png`).metadata()});
 }catch(e){reports.push({id,error:e.message});} await p.close();
}
await b.close();await writeFile('docs/qa/remaining-cases/inspection.json',JSON.stringify(reports,null,2));console.log(reports);


