import { chromium } from "@playwright/test";
import { writeFile } from "node:fs/promises";
const b = await chromium.launch({ channel: "chrome", headless: true });
for (const [name, url] of [
  ["nutrizen", "https://mynutrizen.fr/"],
  ["ht", "https://htcreajeux.fr/"],
]) {
  const p = await b.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 2,
  });
  await p.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  const data = await p.evaluate(() => ({
    url: location.href,
    text: document.body.innerText,
    links: [...document.querySelectorAll("a")].map((e) => ({
      text: e.innerText,
      href: e.href,
    })),
    images: [...document.images].map((e) => ({
      src: e.currentSrc,
      alt: e.alt,
      w: e.naturalWidth,
      h: e.naturalHeight,
    })),
  }));
  await writeFile(
    `docs/qa/nutrizen-case/${name}-live.json`,
    JSON.stringify(data, null, 2),
  );
  await p.screenshot({ path: `.private/${name}-live.png`, fullPage: true });
  console.log(name, JSON.stringify(data));
  await p.close();
}
await b.close();
