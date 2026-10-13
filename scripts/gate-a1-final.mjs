import { chromium } from "@playwright/test";
import sharp from "sharp";
import { existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";
const b = await chromium.launch({ channel: "chrome", headless: true }),
  errors = [],
  results = [];
for (const width of [375, 1440]) {
  const p = await b.newPage({
    viewport: { width, height: 900 },
    deviceScaleFactor: 2,
  });
  await p.goto("http://127.0.0.1:4322/creation-de-sites-internet/", {
    waitUntil: "networkidle",
  });
  await p.waitForTimeout(1400);
  const initial = await p
    .locator(".cc-detail-image img")
    .evaluate((e) => getComputedStyle(e).transform);
  await p.locator('[data-detail="0"]').click();
  await p.waitForTimeout(750);
  const clicked = await p
    .locator(".cc-detail-image img")
    .evaluate((e) => getComputedStyle(e).transform);
  if (initial !== clicked) errors.push({ width, initial, clicked });
  const images = [];
  for (const img of await p
    .locator(
      ".cc-hero-screen img,.cc-desktop-shot img,.cc-mobile-shot img,.cc-detail-image img",
    )
    .all()) {
    await img.scrollIntoViewIfNeeded();
    await img.evaluate((e) => e.decode());
    const data = await img.evaluate((e) => ({
      src: e.currentSrc,
      width: e.getBoundingClientRect().width,
      height: e.getBoundingClientRect().height,
      fit: getComputedStyle(e).objectFit,
    }));
    const meta = await sharp("dist/" + new URL(data.src).pathname).metadata();
    const needed =
      data.fit === "cover"
        ? Math.max(data.width, (data.height * meta.width) / meta.height)
        : data.width;
    images.push({ ...data, encodedWidth: meta.width, neededDPR2: needed * 2 });
    if (meta.width < needed * 2 - 2)
      errors.push({
        width,
        image: data.src,
        needed: needed * 2,
        actual: meta.width,
      });
  }
  const seo = await p.evaluate(() => ({
    title: document.title,
    description: document.querySelector('meta[name="description"]').content,
    canonical: document.querySelector('link[rel="canonical"]').href,
    h1: document.querySelectorAll("h1").length,
    links: [...document.querySelectorAll('a[href^="/"]')].map((e) =>
      e.getAttribute("href"),
    ),
  }));
  if (
    seo.h1 !== 1 ||
    seo.canonical !== "https://aimy-digital.fr/creation-de-sites-internet/"
  )
    errors.push({ width, seo });
  for (const link of new Set(seo.links)) {
    const path = new URL(link, "http://localhost").pathname;
    if (!existsSync("dist" + path + "index.html")) errors.push({ link });
  }
  results.push({ width, initial, clicked, images, seo });
  await p.close();
}
await b.close();
await writeFile(
  "docs/qa/gate-a1/final.json",
  JSON.stringify({ results, errors }, null, 2),
);
console.log(JSON.stringify({ errors }, null, 2));
if (errors.length) process.exitCode = 1;
