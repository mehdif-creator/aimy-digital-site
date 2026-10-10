import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";

const base = process.env.QA_BASE || "http://127.0.0.1:4322";
await mkdir("docs/qa/hero", { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const results = [];
const errors = [];
const contexts = [];
async function pageFor(options) {
  const context = await browser.newContext(options);
  contexts.push(context);
  const page = await context.newPage();
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  return page;
}
const desktop = await pageFor({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "no-preference",
});
await desktop.waitForSelector('[data-ready="true"]');
await desktop.waitForTimeout(1600);
const before = await desktop.locator(".cinema-copy").evaluate((e) => ({
  opacity: getComputedStyle(e).opacity,
  transform: getComputedStyle(e).transform,
}));
await desktop.screenshot({ path: "docs/qa/hero/desktop-opening.png" });
const range = await desktop.locator(".cinema").evaluate((e) => ({
  top: e.offsetTop,
  distance: e.offsetHeight - innerHeight,
}));
await desktop.evaluate(
  ({ top, distance }) =>
    window.scrollTo({ top: top + distance * 0.67, behavior: "instant" }),
  range,
);
await desktop.waitForTimeout(1200);
const after = await desktop.locator(".cinema-copy").evaluate((e) => ({
  opacity: getComputedStyle(e).opacity,
  transform: getComputedStyle(e).transform,
}));
const settle = await desktop
  .locator(".cinema-settle")
  .evaluate((e) => Number(getComputedStyle(e).opacity));
if (
  before.opacity === after.opacity ||
  before.transform === after.transform ||
  settle < 0.1
)
  errors.push("La séquence au scroll n'a pas modifié la scène");
results.push({ check: "scroll-desktop", before, after, settle });
await desktop.screenshot({ path: "docs/qa/hero/desktop-scroll.png" });
if (!(await desktop.locator(".cinema-cta").isVisible()))
  errors.push("CTA indisponible au scroll");
const artBefore = await desktop
  .locator(".cinema-art")
  .evaluate((e) => getComputedStyle(e).transform);
await desktop.locator(".cinema-art-hit").hover({ position: { x: 110, y: 90 } });
await desktop.waitForTimeout(650);
const artAfter = await desktop
  .locator(".cinema-art")
  .evaluate((e) => getComputedStyle(e).transform);
if (artBefore === artAfter) errors.push("Inclinaison au survol absente");
results.push({ check: "hover-desktop", changed: artBefore !== artAfter });
await desktop.getByRole("button", { name: "Réduire les animations" }).click();
if (
  (await desktop.locator(".cinema").getAttribute("data-motion")) !== "reduced"
)
  errors.push("Commande réduction sans effet");
await desktop.getByRole("button", { name: "Activer les animations" }).click();
await desktop.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
await desktop.waitForTimeout(1000);
if (
  Number(
    await desktop
      .locator(".cinema-copy")
      .evaluate((e) => getComputedStyle(e).opacity),
  ) < 0.95
)
  errors.push("Retour au début illisible");
const axe = await new AxeBuilder({ page: desktop })
  .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
  .analyze();
results.push({
  check: "axe-home",
  violations: axe.violations.map((v) => ({
    id: v.id,
    impact: v.impact,
    targets: v.nodes.map((n) => n.target),
  })),
});
if (axe.violations.length) errors.push("Violation axe sur l'accueil");
for (const width of [320, 375, 390, 768, 1024, 1440]) {
  const page = await pageFor({
    viewport: { width, height: 900 },
    reducedMotion: "reduce",
  });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > innerWidth,
  );
  const staticScene = await page.locator(".cinema").getAttribute("data-motion");
  if (overflow || staticScene !== "reduced")
    errors.push(`Layout réduit ${width}`);
  results.push({ check: "responsive-reduced", width, overflow, staticScene });
  await page.close();
}
const mobile = await pageFor({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
  deviceScaleFactor: 1,
  reducedMotion: "no-preference",
});
await mobile.waitForTimeout(1600);
await mobile.screenshot({ path: "docs/qa/hero/mobile-opening.png" });
await mobile.getByText("Menu", { exact: false }).first().click();
await mobile.keyboard.press("Escape");
if (await mobile.locator(".mobile-nav").evaluate((e) => e.open))
  errors.push("Menu mobile Échap");
const mobileRange = await mobile.locator(".cinema").evaluate((e) => ({
  top: e.offsetTop,
  distance: e.offsetHeight - innerHeight,
}));
await mobile.evaluate(
  ({ top, distance }) =>
    window.scrollTo({ top: top + distance * 0.8, behavior: "instant" }),
  mobileRange,
);
await mobile.waitForTimeout(800);
await mobile.screenshot({ path: "docs/qa/hero/mobile-scroll.png" });
const mobileSettle = await mobile
  .locator(".cinema-settle")
  .evaluate((e) => Number(getComputedStyle(e).opacity));
if (mobileSettle < 0.2) errors.push("Séquence mobile absente");
results.push({ check: "scroll-mobile-touch", settle: mobileSettle });
await mobile.emulateMedia({ reducedMotion: "reduce" });
await mobile.waitForTimeout(300);
if ((await mobile.locator(".cinema").getAttribute("data-motion")) !== "reduced")
  errors.push("Changement de préférence système ignoré");
const fallback = await pageFor({
  viewport: { width: 390, height: 844 },
  javaScriptEnabled: false,
});
if (!(await fallback.getByRole("heading", { level: 1 }).isVisible()))
  errors.push("H1 absent sans JS");
if (!(await fallback.locator(".cinema-cta").isVisible()))
  errors.push("CTA absent sans JS");
results.push({
  check: "sans-javascript",
  titleVisible: true,
  ctaVisible: true,
});
await fallback.screenshot({ path: "docs/qa/hero/mobile-sans-js.png" });
const href = await fallback.locator(".cinema-cta").getAttribute("href");
const response = await fallback.goto(base + href);
if (response.status() !== 200) errors.push("Destination du CTA indisponible");
await browser.close();
const report = { date: new Date().toISOString(), results, errors };
await writeFile("docs/qa/hero/browser.json", JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (errors.length) process.exitCode = 1;
