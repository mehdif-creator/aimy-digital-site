// Génère l'image de partage par défaut (1200 × 630) : node scripts/og-image.mjs
import { chromium } from "@playwright/test";
import { readFileSync } from "node:fs";
const image = (path) =>
  "data:image/webp;base64," + readFileSync(path).toString("base64");
const font = (weight) =>
  "data:font/woff2;base64," +
  readFileSync(
    `node_modules/@fontsource/manrope/files/manrope-latin-${weight}-normal.woff2`,
  ).toString("base64");
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:M;font-weight:500;src:url(${font(500)})}
@font-face{font-family:M;font-weight:700;src:url(${font(700)})}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;overflow:hidden;font-family:M;color:#edf6ff;
background:radial-gradient(ellipse at 82% 50%,#123b59 0,#08192b 42%,#050d1a 75%);position:relative}
.copy{position:absolute;left:72px;top:70px;width:560px}
.logo{display:flex;align-items:center;gap:14px;font-size:30px;font-weight:700;letter-spacing:-.045em}
.logo b{color:#0686ce}
h1{margin-top:92px;font-size:62px;line-height:1.02;letter-spacing:-.055em;font-weight:700}
h1 span{color:#69caff}
p{margin-top:26px;font-size:21px;color:#9bb5ce;font-weight:500}
.shot{position:absolute;border-radius:14px;overflow:hidden;box-shadow:0 40px 80px #0009;border:1px solid #2b425a}
.a{left:640px;top:70px;width:520px;height:330px;transform:rotate(-2deg)}
.b{left:800px;top:300px;width:340px;height:210px;transform:rotate(3deg)}
.shot img{display:block;width:100%}
.line{position:absolute;left:72px;right:72px;bottom:48px;border-top:1px solid #2b425a;padding-top:14px;
font:14px ui-monospace,monospace;letter-spacing:.12em;color:#9bb5ce;display:flex;justify-content:space-between}
</style></head><body>
<div class="copy">
<div class="logo"><svg viewBox="0 0 48 48" width="46" height="46"><path d="M10.5 37.5A19 19 0 0 1 37.5 10.5" fill="none" stroke="#edf6ff" stroke-opacity=".38" stroke-width="3.2" stroke-linecap="round"/><path d="M41.6 17.2A19.5 19.5 0 0 1 17.2 41.6" fill="none" stroke="#0686ce" stroke-width="4.4" stroke-linecap="round"/><circle cx="24" cy="24" r="4.2" fill="#0686ce"/></svg><span>aimy digital<b>.</b></span></div>
<h1>Votre savoir-faire mérite un site <span>à sa hauteur.</span></h1>
<p>Création de sites et SEO local pour les entreprises du Bocage.</p>
</div>
<div class="shot a"><img src="${image("public/images/showcase/sc-renovation.webp")}"></div>
<div class="shot b"><img src="${image("public/images/showcase/ht-crea-jeux.webp")}"></div>
<div class="line"><span>MAULÉON · CHOLET · BRESSUIRE · LES HERBIERS</span><span>AIMY-DIGITAL.FR</span></div>
</body></html>`;
const browser = await chromium.launch({
  channel: process.env.QA_BROWSER || "chrome",
});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: "load" });
await page.screenshot({
  path: "public/images/og-default.jpg",
  type: "jpeg",
  quality: 88,
});
await browser.close();
console.log("public/images/og-default.jpg");
