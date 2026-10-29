import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { writeFile, mkdir } from "node:fs/promises";
const b = await chromium.launch({ channel: "chrome", headless: true });
const folder = "docs/qa/ht-case";
await mkdir(folder, { recursive: true });
const errors = [],
  results = [];
for (const width of [1440, 320, 375, 390, 768]) {
  const c = await b.newContext({
    viewport: { width, height: 900 },
    deviceScaleFactor: 1,
    isMobile: width < 760,
    hasTouch: width < 760,
  });
  const p = await c.newPage();
  p.on("pageerror", (e) => errors.push({ width, error: e.message }));
  p.on("console", (m) => {
    if (["error", "warning"].includes(m.type()))
      errors.push({ width, console: m.text() });
  });
  await p.goto("http://127.0.0.1:4322/portfolio/ht-crea-jeux/", {
    waitUntil: "networkidle",
  });
  const clipped = await p
    .locator(".ht-case h1,.ht-case h2,.ht-case h3,.ht-case p")
    .evaluateAll((els) =>
      els.flatMap((e) => {
        const r = document.createRange();
        r.selectNodeContents(e);
        return [...r.getClientRects()]
          .filter((b) => b.left < -0.5 || b.right > innerWidth + 0.5)
          .map((b) => ({ text: e.textContent, left: b.left, right: b.right }));
      }),
    );
  if (clipped.length) errors.push({ width, clipped });
  await p.screenshot({ path: `${folder}/intro-${width}.png` });
  for (const s of [
    ".ht-context",
    ".ht-approach",
    ".ht-showcase",
    ".ht-details",
    ".ht-outcome",
    ".ht-next",
  ]) {
    await p.locator(s).scrollIntoViewIfNeeded();
    await p.waitForTimeout(400);
    if (
      await p.evaluate(() => document.documentElement.scrollWidth > innerWidth)
    )
      errors.push({ width, overflow: s });
    if (width === 1440 || width === 390)
      await p.screenshot({ path: `${folder}/${s.slice(1)}-${width}.png` });
  }
  const broken = await p
    .locator(".ht-case img")
    .evaluateAll((els) =>
      els.filter((e) => !e.complete || !e.naturalWidth).map((e) => e.src),
    );
  if (broken.length) errors.push({ width, broken });
  for (const href of ["/contact/", "/portfolio/"]) {
    if (!(await p.request.get(new URL(href, p.url()).href)).ok())
      errors.push({ width, href });
  }
  if (
    (await p.locator(".ht-external").getAttribute("href")) !==
    "https://htcreajeux.fr/"
  )
    errors.push({ width, external: "incorrect" });
  const a = await new AxeBuilder({ page: p }).analyze();
  if (a.violations.length)
    errors.push({
      width,
      axe: a.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
    });
  const transforms = [];
  for (const fraction of [0, 0.5, 1, 0]) {
    await p.locator(".ht-exhibit").evaluate(
      (e, f) =>
        scrollTo({
          top:
            scrollY +
            e.getBoundingClientRect().top +
            (e.offsetHeight - innerHeight * 0.5) * f -
            innerHeight * 0.25,
          behavior: "instant",
        }),
      fraction,
    );
    await p.waitForTimeout(500);
    transforms.push(
      await p
        .locator(".ht-mobile")
        .evaluate((e) => getComputedStyle(e).transform),
    );
  }
  if (new Set(transforms).size < 2) errors.push({ width, motion: "inactive" });
  await p.locator(".ht-motion").click();
  if ((await p.locator(".ht-case").getAttribute("data-motion")) !== "reduced")
    errors.push("toggle");
  await p.locator(".ht-motion").click();
  await p.emulateMedia({ reducedMotion: "reduce" });
  await p.waitForFunction(
    () => document.querySelector(".ht-case").dataset.motion === "reduced",
  );
  await p.locator(".ht-contact").click();
  await p.waitForURL("**/contact/");
  results.push({ width, transforms });
  await c.close();
}
const p = await b.newPage({
  javaScriptEnabled: false,
  viewport: { width: 390, height: 844 },
});
await p.goto("http://127.0.0.1:4322/portfolio/ht-crea-jeux/");
if (
  (await p.locator("h1").count()) !== 1 ||
  (await p.locator(".ht-case img").count()) !== 5
)
  errors.push("nojs");
await p.locator(".ht-contact").click();
await p.waitForURL("**/contact/");
await b.close();
await writeFile(
  `${folder}/browser.json`,
  JSON.stringify({ date: new Date().toISOString(), results, errors }, null, 2),
);
console.log(JSON.stringify({ viewports: results.length, errors }, null, 2));
if (errors.length) process.exitCode = 1;
