import { chromium } from "@playwright/test";
import { writeFile } from "node:fs/promises";
import sharp from "sharp";
const b = await chromium.launch({ channel: "chrome", headless: true });
const observations = [];
for (const width of [1440, 390]) {
  const p = await b.newPage({
    viewport: { width, height: 900 },
    deviceScaleFactor: 2,
  });
  await p.goto("http://127.0.0.1:4322/", { waitUntil: "networkidle" });
  for (const progress of [0, 0.45, 0.9]) {
    await p
      .locator(".cinema")
      .evaluate(
        (e, t) =>
          scrollTo({
            top: e.offsetTop + (e.offsetHeight - innerHeight) * t,
            behavior: "instant",
          }),
        progress,
      );
    await p.waitForTimeout(650);
    await p.screenshot({
      path: `docs/qa/gate1-technical/hero-${width}-${progress}.png`,
    });
  }
  const imgs = await p
    .locator(".shot-window img,.shot-phone img")
    .evaluateAll((es) =>
      es.map((e) => ({
        url: e.currentSrc,
        box: e.getBoundingClientRect().width,
      })),
    );
  for (const i of imgs) {
    const response = await p.request.get(i.url);
    const m = await sharp(await response.body()).metadata();
    observations.push({
      viewport: width,
      ...i,
      sourceWidth: m.width,
      sourceHeight: m.height,
    });
  }
  await p.close();
}
await b.close();
await writeFile(
  "docs/qa/gate1-technical/image-quality.json",
  JSON.stringify(observations, null, 2),
);
