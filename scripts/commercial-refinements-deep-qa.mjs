import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
const b = await chromium.launch({ channel: "chrome", headless: true });
const errors = [],
  results = [];
for (const width of [390, 1440])
  for (const route of [
    "referencement-seo",
    "publicites-sea",
    "maintenance-et-securite",
    "nos-prestations",
    "a-propos",
    "blog",
    "contact",
    "faq",
  ]) {
    const c = await b.newContext({
      viewport: { width, height: 900 },
      deviceScaleFactor: 2,
    });
    const p = await c.newPage();
    await p.goto(`http://127.0.0.1:4322/${route}/`, {
      waitUntil: "networkidle",
    });
    if (width === 390) {
      await p.locator(".mobile-nav summary").click();
      if (!(await p.locator(".mobile-nav nav").isVisible()))
        errors.push(`${route} menu`);
      await p.keyboard.press("Escape");
      if ((await p.locator(".mobile-nav").getAttribute("open")) !== null)
        errors.push(`${route} escape`);
    }
    for (const root of await p.locator("[data-choice]").all()) {
      for (const button of await root.locator("[data-select]").all()) {
        await button.click();
        await p.waitForTimeout(800);
        const violations = (
          await new AxeBuilder({ page: p }).include("[data-choice]").analyze()
        ).violations;
        if (violations.length)
          errors.push({
            route,
            width,
            panel: await button.textContent(),
            violations: violations.map((x) => ({
              id: x.id,
              targets: x.nodes.map((n) => n.target),
            })),
          });
      }
      await root.locator("[data-select]").first().click();
    }
    for (const img of await p.locator(".premium img").all()) {
      if (await img.isVisible()) {
        await img.scrollIntoViewIfNeeded();
        await img.evaluate(async (e) => {
          await e.decode();
        });
        const data = await img.evaluate((e) => ({
          src: e.currentSrc,
          width: e.getBoundingClientRect().width,
          natural: e.naturalWidth,
        }));
        const source = join("dist", new URL(data.src).pathname);
        const m = await sharp(source).metadata();
        if (data.width > m.width + 1)
          errors.push({
            route,
            width,
            imageUpscaled: { display: data.width, native: m.width },
          });
      }
    }
    if (route === "blog") {
      await p.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
      await p.screenshot({
        path: `docs/qa/commercial-refinements/blog-${width}.png`,
        fullPage: true,
      });
    }
    for (const a of await p.locator('.premium a[href^="/"]').all()) {
      const href = await a.getAttribute("href");
      const response = await p.request.get(`http://127.0.0.1:4322${href}`);
      if (response.status() !== 200)
        errors.push({ route, href, status: response.status() });
    }
    results.push({ route, width });
    console.log(route, width);
    await c.close();
  }
await b.close();
await writeFile(
  "docs/qa/commercial-refinements/deep-qa.json",
  JSON.stringify({ results, errors }, null, 2),
);
console.log(JSON.stringify({ checks: results.length, errors }, null, 2));
if (errors.length) process.exitCode = 1;
