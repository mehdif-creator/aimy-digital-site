import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import sharp from "sharp";
import { writeFile, mkdir } from "node:fs/promises";
const b = await chromium.launch({ channel: "chrome", headless: true });
const errors = [],
  results = [];
const folder = "docs/qa/placement-sharpness";
await mkdir(folder, { recursive: true });
for (const [width, height, dpr] of [
  [1440, 900, 2],
  [390, 844, 3],
]) {
  const c = await b.newContext({
    viewport: { width, height },
    deviceScaleFactor: dpr,
  });
  const p = await c.newPage();
  p.on("pageerror", (e) => errors.push(e.message));
  await p.goto("http://127.0.0.1:4322/", { waitUntil: "networkidle" });
  if (
    (await p.locator(".showcase-chapter").count()) !== 0 ||
    (await p.locator(".preview-selection article").count()) !== 2
  )
    errors.push("Placement accueil");
  if (
    (await p
      .getByRole("link", { name: "Découvrir toutes nos réalisations" })
      .getAttribute("href")) !== "/portfolio/"
  )
    errors.push("CTA portfolio");
  await p.locator(".project-preview").scrollIntoViewIfNeeded();
  await p.waitForTimeout(350);
  await p.screenshot({ path: `${folder}/accueil-${width}.png` });
  for (const selector of [".preview-image img", ".shot-main img"]) {
    for (const im of await p.locator(selector).all()) {
      await im.scrollIntoViewIfNeeded();
      const info = await im.evaluate((i) => ({
        src: i.currentSrc,
        css: i.getBoundingClientRect().width,
        filter: getComputedStyle(i).filter,
      }));
      const meta = await sharp(
        await (await p.request.get(info.src)).body(),
      ).metadata();
      results.push({
        page: "home",
        width,
        dpr,
        selector,
        ...info,
        pixels: meta.width,
      });
      if (meta.width + 4 < info.css * dpr)
        errors.push({
          reason: "Source insuffisante accueil",
          width,
          dpr,
          ...info,
          pixels: meta.width,
        });
    }
  }
  const axe = await new AxeBuilder({ page: p })
    .include(".project-preview")
    .analyze();
  if (axe.violations.length)
    errors.push({ homeAxe: axe.violations.map((v) => v.id) });
  await p.goto("http://127.0.0.1:4322/portfolio/", {
    waitUntil: "networkidle",
  });
  if (!(await p.title()).startsWith("Réalisations web"))
    errors.push("Title SEO");
  if (
    (await p.locator('meta[name="description"]').getAttribute("content")) !==
    "Découvrez HT Créa Jeux, My NutriZen, SC Rénovation et Lambert Digital Pulse, quatre projets présentés par Aimy Digital."
  )
    errors.push("Description SEO");
  if (
    !(await p.locator('link[rel="canonical"]').getAttribute("href")).endsWith(
      "/portfolio/",
    )
  )
    errors.push("Canonical");
  for (let i = 0; i < 4; i++) {
    const e = p.locator(".showcase-chapter").nth(i);
    for (const progress of [0, 0.3, 1]) {
      await e.evaluate(
        (e, progress) =>
          scrollTo({
            top: e.offsetTop + (e.offsetHeight - innerHeight) * progress,
            behavior: "instant",
          }),
        progress,
      );
      await p.waitForTimeout(600);
      const info = await e.evaluate((e) => {
        const im = e.querySelector(".showcase-viewport img");
        return {
          src: im.currentSrc,
          css: im.clientWidth,
          rect: im.getBoundingClientRect().width,
          transform: getComputedStyle(e.querySelector(".showcase-desktop"))
            .transform,
          filter: getComputedStyle(im).filter,
          opacity: getComputedStyle(im).opacity,
        };
      });
      const m = await sharp(
        await (await p.request.get(info.src)).body(),
      ).metadata();
      results.push({
        page: "portfolio",
        width,
        dpr,
        project: i + 1,
        progress,
        ...info,
        pixels: m.width,
      });
      if (m.width + 4 < info.css * dpr)
        errors.push({
          reason: "Source insuffisante",
          width,
          project: i + 1,
          progress,
          ...info,
          pixels: m.width,
        });
      if (info.filter !== "none" || info.opacity !== "1")
        errors.push("Filtre image");
      if (
        progress === 1 &&
        info.transform !== "matrix(1, 0, 0, 1, 0, 0)" &&
        info.transform !== "none"
      )
        errors.push({ reason: "Plan non plat", ...info });
      if (progress === 0.3 || progress === 1)
        await p.screenshot({
          path: `${folder}/portfolio-${width}-${i + 1}-${progress}.png`,
        });
    }
  }
  if (await p.evaluate(() => document.documentElement.scrollWidth > innerWidth))
    errors.push("Overflow");
  await c.close();
}
await b.close();
await writeFile(
  `${folder}/report.json`,
  JSON.stringify({ date: new Date().toISOString(), results, errors }, null, 2),
);
console.log(JSON.stringify({ checks: results.length, errors }, null, 2));
if (errors.length) process.exitCode = 1;
