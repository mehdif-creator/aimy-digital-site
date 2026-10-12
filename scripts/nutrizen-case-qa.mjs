import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { writeFile } from "node:fs/promises";
import sharp from "sharp";
const browser = await chromium.launch({ channel: "chrome", headless: true }),
  errors = [],
  results = [];
for (const width of [320, 375, 390, 768, 1440]) {
  const c = await browser.newContext({
    viewport: { width, height: 900 },
    deviceScaleFactor: 2,
  });
  const p = await c.newPage();
  p.on("pageerror", (e) => errors.push(e.message));
  p.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  await p.goto("http://127.0.0.1:4322/portfolio/my-nutrizen/", {
    waitUntil: "networkidle",
  });
  await p.screenshot({ path: `docs/qa/nutrizen-case/intro-${width}.png` });
  for (const selector of [".nz-week", ".nz-recipe", ".nz-finish"]) {
    await p.locator(selector).scrollIntoViewIfNeeded();
    await p.waitForTimeout(500);
    if (
      await p.evaluate(() => document.documentElement.scrollWidth > innerWidth)
    )
      errors.push({ width, overflow: selector });
    if ([390, 1440].includes(width))
      await p.screenshot({
        path: `docs/qa/nutrizen-case/${selector.slice(1)}-${width}.png`,
      });
  }
  const clipped = await p
    .locator(".nz-case h1,.nz-case h2,.nz-case h3,.nz-case p")
    .evaluateAll((els) =>
      els.flatMap((e) => {
        const r = document.createRange();
        r.selectNodeContents(e);
        return [...r.getClientRects()]
          .filter((b) => b.left < -0.5 || b.right > innerWidth + 0.5)
          .map(() => e.textContent);
      }),
    );
  if (clipped.length) errors.push({ width, clipped });
  const images = [];
  for (const img of await p.locator(".nz-case img").all()) {
    await img.scrollIntoViewIfNeeded();
    await img.evaluate((e) => e.decode());
    const r = await img.evaluate((e) => ({
      src: e.currentSrc,
      width: e.getBoundingClientRect().width,
    }));
    const m = await sharp("dist/" + new URL(r.src).pathname).metadata();
    images.push({ ...r, encodedWidth: m.width });
    if (m.width < r.width * 2 - 2) errors.push({ width, undersized: r });
  }
  const axe = await new AxeBuilder({ page: p }).analyze();
  if (axe.violations.length)
    errors.push({
      width,
      axe: axe.violations.map((x) => ({
        id: x.id,
        nodes: x.nodes.map((n) => n.target),
      })),
    });
  const transforms = [];
  for (const f of [0, 1, 0]) {
    await p
      .locator(".nz-week-story")
      .evaluate(
        (e, f) =>
          scrollTo({
            top:
              scrollY +
              e.getBoundingClientRect().top +
              e.clientHeight * f -
              100,
            behavior: "instant",
          }),
        f,
      );
    await p.waitForTimeout(600);
    transforms.push(
      await p
        .locator(".nz-week-window img")
        .evaluate((e) => getComputedStyle(e).transform),
    );
  }
  if (width >= 760 && new Set(transforms).size < 2)
    errors.push({ width, motion: "inactive" });
  await p.emulateMedia({ reducedMotion: "reduce" });
  await p.waitForTimeout(200);
  if (
    await p
      .locator(".nz-week-window img")
      .evaluate((e) => getComputedStyle(e).transform !== "none")
  )
    errors.push({ width, reduced: "transform remaining" });
  await p.locator(".nz-contact").click();
  await p.waitForURL("**/contact/");
  results.push({ width, images, transforms });
  await c.close();
}
const c = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  }),
  p = await c.newPage();
await p.goto("http://127.0.0.1:4322/portfolio/my-nutrizen/");
if ((await p.locator(".nz-case img").count()) !== 4) errors.push("nojs images");
await p.locator(".nz-contact").click();
await p.waitForURL("**/contact/");
await browser.close();
await writeFile(
  "docs/qa/nutrizen-case/browser.json",
  JSON.stringify({ results, errors }, null, 2),
);
console.log(JSON.stringify({ viewports: results.length, errors }, null, 2));
if (errors.length) process.exitCode = 1;
