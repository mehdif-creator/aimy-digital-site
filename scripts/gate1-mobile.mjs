import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { writeFile, mkdir } from "node:fs/promises";
const folder = "docs/qa/gate1-technical";
await mkdir(folder, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const results = [],
  consoleMessages = [],
  errors = [];
for (const width of [320, 375, 390]) {
  const context = await browser.newContext({
    viewport: { width, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  page.on("console", (m) => {
    if (["warning", "error"].includes(m.type()))
      consoleMessages.push({
        width,
        type: m.type(),
        text: m.text(),
        location: m.location(),
      });
  });
  page.on("pageerror", (e) => errors.push({ width, error: e.message }));
  page.on("requestfailed", (r) =>
    errors.push({ width, url: r.url(), failure: r.failure() }),
  );
  await page.goto("http://127.0.0.1:4322/", { waitUntil: "networkidle" });
  const images = await page
    .locator(".shot-window img")
    .evaluateAll((imgs) =>
      imgs.map((i) => ({
        url: i.currentSrc,
        natural: i.naturalWidth,
        box: i.getBoundingClientRect().width,
        sizes: i.sizes,
      })),
    );
  await page.locator(".mobile-nav summary").tap();
  if (!(await page.locator(".mobile-nav").evaluate((e) => e.open)))
    errors.push("menu");
  const menuTargets = await page
    .locator(".mobile-nav summary,.mobile-nav a")
    .evaluateAll((els) =>
      els.map((e) => ({
        text: e.textContent.trim(),
        height: e.getBoundingClientRect().height,
        width: e.getBoundingClientRect().width,
      })),
    );
  if (menuTargets.some((t) => t.height < 44))
    errors.push({ width, menuTargets });
  const menuAxe = await new AxeBuilder({ page })
    .include(".mobile-nav")
    .analyze();
  if (menuAxe.violations.length)
    errors.push({ width, menuAxe: menuAxe.violations });
  await page.screenshot({ path: `${folder}/menu-${width}.png` });
  await page.keyboard.press("Escape");
  if (await page.locator(".mobile-nav").evaluate((e) => e.open))
    errors.push("escape");
  for (let i = 0; i < 3; i++) {
    const summary = page.locator(".home-service summary").nth(i);
    await summary.tap();
    if (!(await summary.locator("..").evaluate((e) => e.open)))
      await summary.tap();
  }
  for (const s of [
    ".home-services",
    ".home-process",
    ".home-questions",
    ".home-closing",
  ]) {
    await page.locator(s).scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
    if (
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      )
    )
      errors.push({ width, overflow: s });
    await page.screenshot({ path: `${folder}/${s.slice(1)}-${width}.png` });
  }
  for (const summary of await page.locator(".home-questions summary").all()) {
    await summary.focus();
    await page.keyboard.press("Enter");
    if (!(await summary.locator("..").evaluate((e) => e.open)))
      errors.push("FAQ");
    await page.keyboard.press("Enter");
  }
  await page.locator(".home-closing a").tap();
  await page.waitForURL("**/contact/");
  await page.goBack({ waitUntil: "networkidle" });
  const targets = await page
    .locator(".home-service summary,.home-questions summary,.home-closing a")
    .evaluateAll((els) =>
      els.map((e) => ({
        text: e.textContent.trim(),
        width: e.getBoundingClientRect().width,
        height: e.getBoundingClientRect().height,
      })),
    );
  const axe = await new AxeBuilder({ page }).analyze();
  if (axe.violations.length)
    errors.push({
      width,
      axe: axe.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    });
  await page.locator(".home-services").scrollIntoViewIfNeeded();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForFunction(
    () =>
      document.querySelector(".home-experience").dataset.motion === "reduced" &&
      document.querySelector(".cinema").dataset.motion === "reduced",
  );
  const resource = await page.evaluate(() =>
    performance
      .getEntriesByType("resource")
      .filter((e) => /woff|css|js/.test(e.name))
      .map((e) => ({
        url: e.name,
        start: e.startTime,
        duration: e.duration,
        bytes: e.transferSize,
      })),
  );
  results.push({ width, images, menuTargets, targets, resources: resource });
  await context.close();
}
await browser.close();
await writeFile(
  `${folder}/mobile-console.json`,
  JSON.stringify({ results, consoleMessages, errors }, null, 2),
);
console.log(
  JSON.stringify({ widths: results.length, consoleMessages, errors }),
);
if (errors.length) process.exitCode = 1;
