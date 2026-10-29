import { chromium } from "@playwright/test";
import { writeFile } from "node:fs/promises";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const results = [];
const page = await browser.newPage({ viewport: { width: 390, height: 667 } });
await page.goto("http://127.0.0.1:4322/portfolio/", {
  waitUntil: "networkidle",
});
await page.waitForTimeout(500);
if ((await page.locator(".showcase").getAttribute("data-motion")) !== "compact")
  throw Error("Petit écran non compact");
for (const link of await page.locator(".showcase-project-link").all()) {
  await link.focus();
  await page.waitForTimeout(500);
  const visible = await link.evaluate((e) => {
    const r = e.getBoundingClientRect();
    return r.top >= 0 && r.bottom <= innerHeight;
  });
  if (!visible) {
    console.log(
      await link.evaluate((e) => ({
        text: e.textContent,
        rect: e.getBoundingClientRect().toJSON(),
        scroll: scrollY,
      })),
    );
    await page.screenshot({ path: "docs/qa/portfolio/focus-debug.png" });
    throw Error("Focus petit écran");
  }
}
results.push("4 liens accessibles au clavier à 390 × 667, mode compact");
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("http://127.0.0.1:4322/", { waitUntil: "networkidle" });
for (const progress of [0, 0.5, 1, 0]) {
  await page.evaluate((p) => {
    const e = document.querySelector(".cinema");
    scrollTo({
      top: e.offsetTop + (e.offsetHeight - innerHeight) * p,
      behavior: "instant",
    });
  }, progress);
  await page.waitForTimeout(500);
  if (
    !(await page.locator("h1").evaluate((e) => {
      const r = e.getBoundingClientRect();
      return (
        r.top >= 0 &&
        r.bottom <= innerHeight &&
        getComputedStyle(e).opacity === "1"
      );
    }))
  )
    throw Error("Titre hero");
}
results.push("Titre hero lisible avant/après parcours, desktop");
await page.screenshot({ path: "docs/qa/portfolio/hero-preserve.png" });
await browser.close();
await writeFile(
  "docs/qa/portfolio/smoke.json",
  JSON.stringify({ results, errors: [] }, null, 2),
);
console.log(results);
