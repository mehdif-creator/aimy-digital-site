import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
await mkdir("docs/qa/screenshots", { recursive: true });
const browser = await chromium.launch({
  channel: process.env.QA_BROWSER || "chrome",
  headless: true,
});
const results = [];
const errors = [];
const base = process.env.QA_BASE || "http://127.0.0.1:4322";
for (const width of [320, 375, 390, 768, 1024, 1440]) {
  const page = await browser.newPage({
    viewport: { width, height: 900 },
    reducedMotion: "reduce",
  });
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(base + "/", { waitUntil: "networkidle" });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > innerWidth,
  );
  if (overflow) errors.push(`Débordement accueil ${width}`);
  if (width < 760) {
    await page.getByText("Menu", { exact: false }).first().click();
    await page.keyboard.press("Escape");
    if (await page.locator(".mobile-nav").evaluate((e) => e.open))
      errors.push(`Échap menu ${width}`);
  }
  if ([375, 1440].includes(width)) {
    await page
      .locator('img[loading="lazy"]')
      .evaluateAll((images) =>
        images.forEach((img) => (img.loading = "eager")),
      );
    await page.evaluate(() =>
      Promise.all(
        [...document.images].map((img) => img.decode().catch(() => {})),
      ),
    );
    await page.screenshot({
      path: `docs/qa/screenshots/home-${width}.png`,
      fullPage: true,
    });
    await page.screenshot({ path: `docs/qa/screenshots/hero-${width}.png` });
  }
  results.push({ width, overflow });
  await page.close();
}
const context = await browser.newContext({
  viewport: { width: 1280, height: 900 },
});
const page = await context.newPage();
for (const route of [
  "/",
  "/creation-de-sites-internet/",
  "/portfolio/",
  "/contact/",
  "/maintenance-site-web-essentielle-2025/",
  "/creation-site-internet-cholet/",
  "/faq/",
]) {
  const response = await page.goto(base + route, { waitUntil: "networkidle" });
  const axe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  const violations = axe.violations.map((v) => ({
    id: v.id,
    impact: v.impact,
    targets: v.nodes.map((n) => n.target),
  }));
  results.push({ route, status: response.status(), violations });
  if (violations.length) errors.push(`Accessibilité ${route}`);
}
await page.goto(base + "/contact/");
// Sans configuration serveur, le formulaire prépare un e-mail (mailto) et ne poste rien.
if (
  (await page.locator(".contact-form").getAttribute("data-enabled")) !==
    "false" ||
  !(await page.locator(".form-mailto").count())
)
  errors.push("Formulaire relié au serveur sans configuration");
const missing = await page.goto(base + "/page-absente-qa/");
if (missing.status() !== 404) errors.push("Statut 404 incorrect");
await browser.close();
await writeFile(
  "docs/qa/browser-audit.json",
  JSON.stringify({ results, errors }, null, 2),
);
console.log(JSON.stringify({ checks: results.length, errors }, null, 2));
if (errors.length) process.exitCode = 1;
