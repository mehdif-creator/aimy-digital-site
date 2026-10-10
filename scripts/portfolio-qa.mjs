import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
const folder = "docs/qa/portfolio";
await mkdir(folder, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const errors = [],
  results = [];
for (const width of [1440, 390]) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    isMobile: width < 760,
    hasTouch: width < 760,
  });
  const page = await context.newPage();
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("http://127.0.0.1:4322/portfolio/", {
    waitUntil: "networkidle",
  });
  await page.waitForFunction(
    () => document.querySelector(".showcase")?.dataset.motion === "full",
  );
  if ((await page.locator(".showcase-chapter").count()) !== 4)
    errors.push("Nombre de projets");
  for (let i = 0; i < 4; i++) {
    const chapter = page.locator(".showcase-chapter").nth(i);
    const transforms = [];
    for (const p of [0, 0.55, 1, 0]) {
      await chapter.evaluate(
        (e, p) =>
          scrollTo({
            top: e.offsetTop + (e.offsetHeight - innerHeight) * p,
            behavior: "instant",
          }),
        p,
      );
      await page.waitForTimeout(650);
      const state = await chapter.evaluate((e) => {
        const h = e.querySelector("h3").getBoundingClientRect(),
          a = e.querySelector(".showcase-project-link").getBoundingClientRect(),
          im = e.querySelector(".showcase-viewport img");
        return {
          title: h.top >= 0 && h.bottom <= innerHeight,
          link: a.top >= 0 && a.bottom <= innerHeight,
          loaded: im.complete && im.naturalWidth > 0,
          transform: getComputedStyle(e.querySelector(".showcase-desktop"))
            .transform,
          overflow: document.documentElement.scrollWidth > innerWidth,
        };
      });
      transforms.push(state.transform);
      if (!state.title || !state.link || !state.loaded || state.overflow)
        errors.push({ width, i, p, state });
      results.push({ width, project: i + 1, progress: p, ...state });
      if (p === 0.55)
        await page.screenshot({ path: `${folder}/${width}-${i + 1}.png` });
    }
    if (new Set(transforms).size < 2)
      errors.push(`Animation inactive ${width}/${i}`);
    const href = await chapter
      .locator(".showcase-project-link")
      .getAttribute("href");
    if (
      (await page.request.get("http://127.0.0.1:4322" + href)).status() !== 200
    )
      errors.push("Lien projet " + href);
    const axe = await new AxeBuilder({ page }).include(".showcase").analyze();
    if (axe.violations.length)
      errors.push({
        width,
        axe: axe.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
      });
  }
  await page.locator("[data-showcase-toggle]").click();
  if (
    (await page.locator(".showcase").getAttribute("data-motion")) !== "reduced"
  )
    errors.push("Mode manuel");
  await page.locator("[data-showcase-toggle]").click();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForFunction(
    () => document.querySelector(".showcase")?.dataset.motion === "reduced",
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.waitForFunction(
    () => document.querySelector(".showcase")?.dataset.motion === "full",
  );
  await page.locator(".showcase-intro nav a").nth(3).click();
  await page.waitForTimeout(600);
  await page
    .locator(".showcase-chapter")
    .last()
    .locator(".showcase-project-link")
    .focus();
  await page.waitForTimeout(650);
  if (
    !(await page
      .locator(".showcase-chapter")
      .last()
      .locator(".showcase-project-link")
      .evaluate((e) => {
        const r = e.getBoundingClientRect();
        return r.top >= 0 && r.bottom < innerHeight;
      }))
  )
    errors.push("Focus hors écran " + width);
  await page.close();
}
for (const width of [320, 375, 390, 768, 1024, 1440]) {
  const page = await browser.newPage({
    viewport: { width, height: 740 },
    reducedMotion: "reduce",
  });
  await page.goto("http://127.0.0.1:4322/portfolio/", {
    waitUntil: "networkidle",
  });
  await page.locator(".showcase-chapter").first().scrollIntoViewIfNeeded();
  if (
    await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
  )
    errors.push("Overflow " + width);
  if (width === 390)
    await page.screenshot({ path: `${folder}/reduced-mobile.png` });
  results.push({ reducedWidth: width });
  await page.close();
}
const nojs = await browser.newPage({
  viewport: { width: 390, height: 844 },
  javaScriptEnabled: false,
});
await nojs.goto("http://127.0.0.1:4322/portfolio/", {
  waitUntil: "networkidle",
});
for (const link of await nojs.locator(".showcase-project-link").all()) {
  await link.scrollIntoViewIfNeeded();
  if (!(await link.isVisible())) errors.push("Lien sans JS");
}
await browser.close();
await writeFile(
  `${folder}/browser.json`,
  JSON.stringify({ date: new Date().toISOString(), results, errors }, null, 2),
);
console.log(JSON.stringify({ checks: results.length, errors }, null, 2));
if (errors.length) process.exitCode = 1;
