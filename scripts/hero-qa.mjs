import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
const base = process.env.QA_BASE || "http://127.0.0.1:4322";
const folder = "docs/qa/hero-v2";
await mkdir(folder, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const results = [],
  errors = [];
async function open(options) {
  const context = await browser.newContext(options);
  const page = await context.newPage();
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(base, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1150);
  return page;
}
async function inspectScene(page, progress, name) {
  await page.evaluate((p) => {
    const hero = document.querySelector(".cinema");
    window.scrollTo({
      top: hero.offsetTop + (hero.offsetHeight - innerHeight) * p,
      behavior: "instant",
    });
  }, progress);
  await page.waitForTimeout(450);
  const state = await page.evaluate(() => {
    const h1 = document.querySelector("h1"),
      copy = document.querySelector(".cinema-copy"),
      cta = document.querySelector(".cinema-cta"),
      shot = document.querySelector(".shot-main");
    const r = h1.getBoundingClientRect(),
      c = cta.getBoundingClientRect();
    return {
      scene: document.querySelector(".cinema").dataset.scene,
      titleOpacity:
        +getComputedStyle(h1).opacity * +getComputedStyle(copy).opacity,
      titleVisible: r.top >= 0 && r.bottom < innerHeight,
      ctaVisible: c.top >= 0 && c.bottom < innerHeight,
      titleHeight: r.height,
      shotTransform: getComputedStyle(shot).transform,
      overflow: document.documentElement.scrollWidth > innerWidth,
    };
  });
  if (
    state.titleOpacity < 0.99 ||
    !state.titleVisible ||
    !state.ctaVisible ||
    state.overflow
  )
    errors.push(`Lisibilité/CTA ${name} à ${progress}`);
  results.push({ name, progress, ...state });
  return state;
}
for (const [name, options] of [
  [
    "desktop",
    { viewport: { width: 1440, height: 900 }, reducedMotion: "no-preference" },
  ],
  [
    "mobile",
    {
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 1,
      reducedMotion: "no-preference",
    },
  ],
]) {
  const page = await open(options);
  const states = [];
  for (const p of [0, 0.15, 0.3, 0.4, 0.55, 0.7, 0.8, 1, 0.55, 0]) {
    states.push(await inspectScene(page, p, name));
    if ([0, 0.55, 1].includes(p))
      await page.screenshot({
        path: `${folder}/${name}-${p === 0 ? "impact" : p === 1 ? "realisations" : "transformation"}.png`,
      });
  }
  if (new Set(states.map((s) => s.shotTransform)).size < 3)
    errors.push(`Pas de transformation réelle ${name}`);
  if (
    !states.some((s) => s.scene === "2") ||
    !states.some((s) => s.scene === "3")
  )
    errors.push(`Scène manquante ${name}`);
  await page.evaluate(() =>
    window.scrollTo({
      top: document.querySelector(".cinema-bridge").offsetTop - 150,
      behavior: "instant",
    }),
  );
  await page.waitForTimeout(450);
  await page.screenshot({ path: `${folder}/${name}-transition.png` });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(450);
  const axe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  results.push({
    name,
    axe: axe.violations.map((v) => ({
      id: v.id,
      targets: v.nodes.map((n) => n.target),
    })),
  });
  if (axe.violations.length) errors.push(`Axe ${name}`);
  await page.getByRole("button", { name: "Réduire les animations" }).click();
  if ((await page.locator(".cinema").getAttribute("data-motion")) !== "reduced")
    errors.push(`Réduction ${name}`);
  await page.getByRole("button", { name: "Activer les animations" }).click();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForFunction(
    () =>
      document.querySelector(".cinema")?.getAttribute("data-motion") ===
      "reduced",
  );
  if ((await page.locator(".cinema").getAttribute("data-motion")) !== "reduced")
    errors.push(`Préférence système ${name}`);
  await page.close();
}
for (const width of [320, 375, 390, 768, 1024, 1440]) {
  const page = await open({
    viewport: { width, height: 900 },
    reducedMotion: "reduce",
  });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > innerWidth,
  );
  if (overflow) errors.push(`Débordement ${width}`);
  results.push({ check: "reduced-layout", width, overflow });
  if (width < 760) {
    await page.getByText("Menu", { exact: false }).first().click();
    await page.keyboard.press("Escape");
    if (await page.locator(".mobile-nav").evaluate((e) => e.open))
      errors.push(`Menu ${width}`);
  }
  await page.close();
}
const fallback = await open({
  viewport: { width: 390, height: 844 },
  javaScriptEnabled: false,
});
if (
  !(await fallback.getByRole("heading", { level: 1 }).isVisible()) ||
  !(await fallback.locator(".cinema-cta").isVisible())
)
  errors.push("Version sans JS illisible");
await fallback.screenshot({ path: `${folder}/sans-js.png` });
const response = await fallback.goto(base + "/contact/");
if (response.status() !== 200) errors.push("Destination CTA");
await browser.close();
const report = { date: new Date().toISOString(), results, errors };
await writeFile(`${folder}/browser.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify({ checks: results.length, errors }, null, 2));
if (errors.length) process.exitCode = 1;
