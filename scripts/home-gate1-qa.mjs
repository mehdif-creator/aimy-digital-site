import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
const folder = "docs/qa/home-gate1";
await mkdir(folder, { recursive: true });
const b = await chromium.launch({ channel: "chrome", headless: true });
const results = [],
  errors = [];
for (const width of [1440, 390]) {
  const c = await b.newContext({
    viewport: { width, height: 900 },
    isMobile: width < 760,
    hasTouch: width < 760,
  });
  const p = await c.newPage();
  p.on("pageerror", (e) => errors.push(e.message));
  await p.goto("http://127.0.0.1:4322/", { waitUntil: "networkidle" });
  await p.waitForFunction(
    () =>
      document.querySelector("[data-home-experience]")?.dataset.motion ===
      "full",
  );
  for (let i = 0; i < 3; i++) {
    const summary = p.locator(".home-service summary").nth(i);
    await summary.focus();
    if (!(await summary.locator("..").evaluate((e) => e.open)))
      await p.keyboard.press("Enter");
    await p.waitForTimeout(200);
    if (
      !(await p
        .locator(".home-service")
        .nth(i)
        .evaluate((e) => e.open))
    )
      errors.push("Service fermé");
    if (
      (await p.locator(".home-services").getAttribute("data-service")) !==
      String(i)
    )
      errors.push("Orientation service");
    results.push({ width, service: i });
  }
  await p.locator(".home-service summary").first().click();
  await p.locator(".home-services").scrollIntoViewIfNeeded();
  await p.waitForTimeout(350);
  await p.screenshot({ path: `${folder}/services-${width}.png` });
  const transforms = [];
  for (const i of [0, 1, 2, 3, 0]) {
    await p
      .locator("[data-process-step]")
      .nth(i)
      .evaluate((e) =>
        scrollTo({
          top: scrollY + e.getBoundingClientRect().top - innerHeight * 0.3,
          behavior: "instant",
        }),
      );
    await p.waitForTimeout(400);
    transforms.push(
      await p
        .locator(".home-process-rail i")
        .evaluate((e) => getComputedStyle(e).transform),
    );
    results.push({ width, step: i });
    if (i === 1) await p.screenshot({ path: `${folder}/process-${width}.png` });
  }
  if (new Set(transforms).size < 3) errors.push("Progression inactive");
  for (let i = 0; i < 5; i++) {
    const summary = p.locator(".home-questions summary").nth(i);
    await summary.focus();
    await p.keyboard.press("Enter");
    if (!(await summary.locator("..").evaluate((e) => e.open)))
      errors.push("FAQ clavier");
    await p.keyboard.press("Enter");
    results.push({ width, faq: i });
  }
  await p.locator(".home-questions summary").first().click();
  await p.locator(".home-questions").scrollIntoViewIfNeeded();
  await p.screenshot({ path: `${folder}/faq-${width}.png` });
  for (const s of [".home-closing", ".home-footer"]) {
    await p.locator(s).scrollIntoViewIfNeeded();
    await p.waitForTimeout(400);
    await p.screenshot({ path: `${folder}/${s.slice(1)}-${width}.png` });
  }
  const a = await new AxeBuilder({ page: p })
    .include(".home-experience")
    .include(".home-footer")
    .analyze();
  if (a.violations.length)
    errors.push({
      width,
      axe: a.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    });
  await p.locator(".home-motion-toggle").click();
  if (
    (await p.locator(".home-experience").getAttribute("data-motion")) !==
    "reduced"
  )
    errors.push("Mode manuel");
  await p.locator(".home-motion-toggle").click();
  await p.emulateMedia({ reducedMotion: "reduce" });
  await p.waitForFunction(
    () =>
      document.querySelector(".home-experience")?.dataset.motion === "reduced",
  );
  await p.emulateMedia({ reducedMotion: "no-preference" });
  await p.waitForFunction(
    () => document.querySelector(".home-experience")?.dataset.motion === "full",
  );
  if (
    (await p.locator(".preview-selection article").count()) !== 2 ||
    (await p.locator(".showcase-chapter").count()) !== 0
  )
    errors.push("Aperçu projets changé");
  for (const href of await p
    .locator(".home-experience a")
    .evaluateAll((els) => [
      ...new Set(els.map((e) => e.getAttribute("href"))),
    ])) {
    if ((await p.request.get("http://127.0.0.1:4322" + href)).status() !== 200)
      errors.push("Lien " + href);
  }
  await c.close();
}
for (const width of [320, 375, 390, 768, 1024, 1440]) {
  const p = await b.newPage({
    viewport: { width, height: 800 },
    reducedMotion: "reduce",
  });
  await p.goto("http://127.0.0.1:4322/", { waitUntil: "networkidle" });
  for (const section of [
    ".home-services",
    ".home-process",
    ".home-questions",
    ".home-closing",
    ".home-footer",
  ]) {
    await p.locator(section).scrollIntoViewIfNeeded();
    if (
      await p.evaluate(() => document.documentElement.scrollWidth > innerWidth)
    )
      errors.push({ width, section, overflow: true });
  }
  results.push({ responsive: width });
  await p.close();
}
const p = await b.newPage({
  javaScriptEnabled: false,
  viewport: { width: 390, height: 844 },
});
await p.goto("http://127.0.0.1:4322/", { waitUntil: "networkidle" });
await p.locator(".home-service summary").nth(2).click();
if (
  !(await p
    .locator(".home-service")
    .nth(2)
    .evaluate((e) => e.open))
)
  errors.push("Service sans JS");
await p.locator(".home-questions summary").first().click();
if (
  !(await p
    .locator(".home-questions details")
    .first()
    .evaluate((e) => e.open))
)
  errors.push("FAQ sans JS");
await p.goto("http://127.0.0.1:4322/portfolio/");
if (await p.locator(".home-footer").count()) errors.push("Footer hors accueil");
await b.close();
await writeFile(
  `${folder}/browser.json`,
  JSON.stringify({ date: new Date().toISOString(), results, errors }, null, 2),
);
console.log(JSON.stringify({ checks: results.length, errors }, null, 2));
if (errors.length) process.exitCode = 1;
