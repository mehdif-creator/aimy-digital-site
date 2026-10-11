import { chromium } from "@playwright/test";
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
const b = await chromium.launch({ channel: "chrome", headless: true });
await mkdir("public/images/cases/ht", { recursive: true });
const sources = [];
for (const [name, url, width, height] of [
  ["home", "https://htcreajeux.fr/", 1440, 900],
  ["product", "https://htcreajeux.fr/produit/easy-peasy-multi/", 1440, 1100],
  ["mobile", "https://htcreajeux.fr/", 390, 844],
]) {
  const p = await b.newPage({
    viewport: { width, height },
    deviceScaleFactor: 2,
    isMobile: width < 500,
    hasTouch: width < 500,
  });
  const r = await p.goto(url, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await p.evaluate(() =>
    Promise.race([
      document.fonts.ready,
      new Promise((r) => setTimeout(r, 5000)),
    ]),
  );
  const cookie = p.locator("#cn-close-notice");
  if (await cookie.isVisible()) await cookie.click();
  await p.waitForTimeout(800);
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
  const path = `public/images/cases/ht/${name}.webp`;
  await p.waitForLoadState("load", { timeout: 15000 }).catch(() => {});
  if (await cookie.isVisible()) {
    await cookie.click();
    await cookie.waitFor({ state: "hidden", timeout: 5000 });
  }
  await sharp(await p.screenshot())
    .webp({ quality: 94, effort: 5 })
    .toFile(path);
  const metadata = await sharp(path).metadata();
  sources.push({
    date: new Date().toISOString(),
    url: p.url(),
    status: r.status(),
    viewport: { width, height },
    dpr: 2,
    path,
    width: metadata.width,
    height: metadata.height,
    headings: await p.locator("h1,h2,h3").allTextContents(),
  });
  await p.close();
}
await writeFile(
  "docs/qa/ht-case/capture-sources.json",
  JSON.stringify(sources, null, 2),
);
await b.close();
console.log(
  sources.map((s) => ({
    path: s.path,
    status: s.status,
    width: s.width,
    height: s.height,
  })),
);
