import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
const dir = "docs/qa/gate-a1";
await mkdir(dir, { recursive: true });
const b = await chromium.launch({ channel: "chrome", headless: true });
const errors = [],
  results = [];
const url = "http://127.0.0.1:4322/creation-de-sites-internet/";
for (const width of [320, 375, 390, 740, 768, 1440]) {
  const c = await b.newContext({
    viewport: { width, height: 900 },
    deviceScaleFactor: 2,
    hasTouch: width < 760,
  });
  const p = await c.newPage();
  p.on("pageerror", (e) => errors.push({ width, error: e.message }));
  p.on("console", (m) => {
    if (m.type() === "error") errors.push({ width, console: m.text() });
  });
  await p.goto(url, { waitUntil: "networkidle" });
  await p.waitForTimeout(1300);
  await p.screenshot({ path: dir + "/hero-" + width + ".png" });
  const positions = await p.locator(".cc-responsive").evaluate((e) => ({
    start: scrollY + e.getBoundingClientRect().top,
    range: e.offsetHeight - innerHeight,
  }));
  const frames = [];
  for (const progress of [0, 0.25, 0.65, 1, 0]) {
    await p.evaluate(
      (y) => scrollTo({ top: y, behavior: "instant" }),
      positions.start + progress * positions.range,
    );
    await p.waitForTimeout(700);
    frames.push(
      await p
        .locator(".cc-aperture")
        .evaluate((e) => getComputedStyle(e).clipPath),
    );
    if ([390, 1440].includes(width))
      await p.screenshot({
        path: dir + "/responsive-" + width + "-" + progress + ".png",
      });
  }
  if (new Set(frames).size < 3 || frames[0] !== frames[4])
    errors.push({ width, scrollReversible: frames });
  const selected = [];
  for (const name of ["vitrine", "commerce", "refonte"]) {
    const tab = p.locator('[data-tab="' + name + '"]');
    if (width < 760) await tab.tap();
    else await tab.click();
    await p.waitForTimeout(550);
    const panel = p.locator('[data-panel="' + name + '"]');
    if (
      !(await panel.isVisible()) ||
      (await tab.getAttribute("aria-selected")) !== "true"
    )
      errors.push({ width, tab: name });
    if ((await p.locator("[data-panel]:visible").count()) !== 1)
      errors.push({ width, panels: true });
    selected.push(await panel.locator(".cc-link").getAttribute("href"));
    await panel.locator("img").evaluate((e) => e.decode());
    const data = await panel.locator("img").evaluate((e) => ({
      src: e.currentSrc,
      width: e.getBoundingClientRect().width,
    }));
    const meta = await sharp("dist/" + new URL(data.src).pathname).metadata();
    if (meta.width < data.width * 2 - 2)
      errors.push({ width, undersized: data });
    if ([390, 1440].includes(width))
      await p.screenshot({
        path: dir + "/explorer-" + name + "-" + width + ".png",
      });
  }
  await p.locator('[data-tab="refonte"]').focus();
  await p.keyboard.press("Home");
  if (
    (await p.locator('[data-tab="vitrine"]').getAttribute("aria-selected")) !==
    "true"
  )
    errors.push({ width, home: false });
  await p.keyboard.press("ArrowRight");
  if (
    (await p.locator('[data-tab="commerce"]').getAttribute("aria-selected")) !==
    "true"
  )
    errors.push({ width, arrow: false });
  await p.keyboard.press("End");
  const details = [];
  for (let i = 0; i < 3; i++) {
    await p.locator('[data-detail="' + i + '"]').click();
    await p.waitForTimeout(700);
    details.push(
      await p
        .locator(".cc-detail-image img")
        .evaluate((e) => getComputedStyle(e).transform),
    );
    if ([390, 1440].includes(width))
      await p.screenshot({ path: dir + "/detail-" + i + "-" + width + ".png" });
  }
  if (new Set(details).size !== 3) errors.push({ width, details });
  for (const section of await p
    .locator(".creation-cinema>section,.cc-finale")
    .all()) {
    await section.scrollIntoViewIfNeeded();
    if (
      await p.evaluate(() => document.documentElement.scrollWidth > innerWidth)
    )
      errors.push({ width, overflow: true });
  }
  const axe = await new AxeBuilder({ page: p }).analyze();
  if (axe.violations.length)
    errors.push({
      width,
      axe: axe.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    });
  await p.emulateMedia({ reducedMotion: "reduce" });
  await p.waitForTimeout(350);
  if (
    await p
      .locator(".creation-cinema")
      .evaluate((e) => e.classList.contains("cc-motion"))
  )
    errors.push({ width, reduced: false });
  await p.locator(".cc-finale .cc-primary").click();
  await p.waitForURL("**/contact/");
  results.push({ width, frames, details, selected });
  await c.close();
}
for (const reducedMotion of ["reduce", "no-preference"]) {
  const c = await b.newContext({
    viewport: { width: 390, height: 844 },
    javaScriptEnabled: false,
    reducedMotion,
  });
  const p = await c.newPage();
  await p.goto(url);
  if ((await p.locator("[data-panel]:visible").count()) !== 3)
    errors.push({ noJS: reducedMotion });
  await p.locator(".cc-mobile-shot").scrollIntoViewIfNeeded();
  if (!(await p.locator(".cc-mobile-shot img").isVisible()))
    errors.push({ noJSMobile: false });
  await p.locator(".cc-finale .cc-primary").click();
  await p.waitForURL("**/contact/");
  await c.close();
}
await b.close();
await writeFile(
  dir + "/browser.json",
  JSON.stringify({ results, errors }, null, 2),
);
console.log(JSON.stringify({ viewports: results.length, errors }, null, 2));
if (errors.length) process.exitCode = 1;
