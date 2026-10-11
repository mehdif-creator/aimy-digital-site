import { chromium } from "@playwright/test";
import sharp from "sharp";
import { writeFile } from "node:fs/promises";
const b = await chromium.launch({ channel: "chrome", headless: true });
const c = await b.newContext();
const sources = [];
for (const [name, url] of [
  ["dashboard", "https://mynutrizen.fr/assets/dashboard-preview-CXIEHD8m.png"],
  ["logo", "https://mynutrizen.fr/assets/nutrizen-main-logo-DxD1uQyk.png"],
]) {
  const r = await c.request.get(url);
  const data = await r.body();
  const path = `public/images/cases/nutrizen/${name}.png`;
  await writeFile(path, data);
  const m = await sharp(data).metadata();
  sources.push({
    url,
    path,
    width: m.width,
    height: m.height,
    date: new Date().toISOString(),
  });
}
for (const [name, url, width, height] of [
  ["speedy", "https://htcreajeux.fr/produit/multi-speedy/", 1440, 1100],
  ["duo", "https://htcreajeux.fr/produit/pack-duo/", 1440, 1100],
  ["mobile", "https://mynutrizen.fr/", 390, 844],
]) {
  const p = await b.newPage({
    viewport: { width, height },
    deviceScaleFactor: 2,
  });
  await p.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await p.waitForLoadState("load", { timeout: 15000 }).catch(() => {});
  await p.evaluate(() => document.fonts.ready);
  const cookie = p.locator("#cn-close-notice");
  if (await cookie.isVisible()) await cookie.click();
  await p.evaluate(() =>
    Promise.race([
      Promise.all(
        [...document.images]
          .filter((i) => i.getBoundingClientRect().top < innerHeight)
          .map((i) => i.decode().catch(() => {})),
      ),
      new Promise((r) => setTimeout(r, 8000)),
    ]),
  );
  const path = `public/images/cases/${name === "mobile" ? "nutrizen" : "ht"}/${name}.webp`;
  await sharp(await p.screenshot())
    .webp({ quality: 94 })
    .toFile(path);
  sources.push({
    url,
    path,
    width: width * 2,
    height: height * 2,
    date: new Date().toISOString(),
    text: await p.locator("body").innerText(),
  });
  await p.close();
}
await writeFile(
  "docs/qa/nutrizen-case/sources.json",
  JSON.stringify(sources, null, 2),
);
await b.close();
console.log(sources.map(({ text, ...s }) => s));
