import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
const routes = (
  process.env.QA_ROUTES ||
  "referencement-seo,publicites-sea,maintenance-et-securite"
).split(",");
const dir = "docs/qa/eight-pages";
await mkdir(dir, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const results = [];
const errors = [];
for (const route of routes)
  for (const width of [320, 375, 390, 768, 1024, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      deviceScaleFactor: 2,
      hasTouch: width < 768,
    });
    const page = await context.newPage();
    page.on("pageerror", (e) => errors.push(`${route}/${width}: ${e.message}`));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(`${route}: ${m.text()}`);
    });
    await page.goto(`http://127.0.0.1:4322/${route}/`, {
      waitUntil: "networkidle",
    });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    );
    if (overflow) errors.push(`${route}/${width} overflow`);
    for (const root of await page.locator("[data-choice]").all()) {
      const buttons = root.locator("[data-select]");
      for (let i = 0; i < (await buttons.count()); i++) {
        await buttons.nth(i).focus();
        await page.keyboard.press("Enter");
        if (!(await root.locator("[data-panel]").nth(i).isVisible()))
          errors.push(`${route} panel ${i}`);
      }
      await buttons.first().click();
      await page.waitForTimeout(350);
    }
    const violations = (
      await new AxeBuilder({ page }).analyze()
    ).violations.map((v) => ({
      id: v.id,
      targets: v.nodes.map((n) => n.target),
    }));
    if (violations.length) errors.push({ route, width, violations });
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    if ([390, 1440].includes(width))
      await page.screenshot({
        path: `${dir}/${route}-${width}.png`,
        fullPage: true,
      });
    results.push({ route, width, overflow, axe: violations.length });
    await context.close();
  }
for (const route of routes)
  for (const mode of ["no-js", "reduced"]) {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      javaScriptEnabled: mode !== "no-js",
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto(`http://127.0.0.1:4322/${route}/`, {
      waitUntil: "networkidle",
    });
    if ((await page.locator("h1").count()) !== 1) errors.push(`${route} h1`);
    if (mode === "no-js") {
      for (const panel of await page.locator("[data-panel]").all())
        if (!(await panel.isVisible()))
          errors.push(`${route} no-js hidden panel`);
    }
    await context.close();
  }
await browser.close();
await writeFile(
  `${dir}/qa-${routes[0]}.json`,
  JSON.stringify({ results, errors }, null, 2),
);
console.log(JSON.stringify({ checks: results.length, errors }, null, 2));
if (errors.length) process.exitCode = 1;
