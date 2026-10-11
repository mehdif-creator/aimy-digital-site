import { chromium } from "@playwright/test";
import sharp from "sharp";
import { writeFile } from "node:fs/promises";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const rows = [];
for (const width of [320, 375, 390, 1440]) {
  const c = await browser.newContext({
    viewport: { width, height: 900 },
    deviceScaleFactor: 2,
  });
  const p = await c.newPage();
  await p.goto("http://127.0.0.1:4322/portfolio/ht-crea-jeux/");
  for (const img of await p.locator(".ht-case img").all()) {
    await img.scrollIntoViewIfNeeded();
    await img.evaluate((e) => e.decode());
    await p.waitForTimeout(450);
    const r = await img.evaluate((e) => ({
      src: e.currentSrc,
      width: e.getBoundingClientRect().width,
      filter: getComputedStyle(e).filter,
      transform: getComputedStyle(e.parentElement).transform,
      alt: e.alt,
    }));
    const m = await sharp("dist/" + new URL(r.src).pathname).metadata();
    rows.push({
      viewport: width,
      dpr: 2,
      ...r,
      encodedWidth: m.width,
      adequate: m.width >= r.width * 2 - 2,
    });
  }
  await c.close();
}
const sources = [];
for (const f of ["home", "product", "mobile", "speedy", "duo"]) {
  const m = await sharp("public/images/cases/ht/" + f + ".webp").metadata();
  sources.push({ file: f, width: m.width, height: m.height });
}
await browser.close();
await writeFile(
  "docs/qa/ht-case/sharpness.json",
  JSON.stringify({ sources, rows }, null, 2),
);
console.log(
  JSON.stringify(
    { sources, undersized: rows.filter((r) => !r.adequate) },
    null,
    2,
  ),
);
