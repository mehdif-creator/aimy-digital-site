import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const checks = [];
await page.goto("http://127.0.0.1:4322/nos-prestations/", {
  waitUntil: "networkidle",
});
await page.locator("[data-select]").nth(4).click();
await page.locator("[data-select]").nth(4).click();
await page.waitForTimeout(900);
let clip = await page
  .locator("#need-4 figure")
  .evaluate((e) => getComputedStyle(e).clipPath);
assert.ok(
  clip === "none" || clip === "inset(0px)",
  `Double clic: capture masquée ${clip}`,
);
checks.push("Double clic : reveal termine sans figer la capture");
for (const i of [2, 5, 0, 4, 3, 1])
  await page.locator("[data-select]").nth(i).click();
await page.waitForTimeout(900);
assert.equal(
  await page.locator("[data-panel]:visible").getAttribute("id"),
  "need-1",
);
checks.push("Clics rapides : dernier panneau seul visible");
await page.locator("[data-select]").nth(4).click();
await page.emulateMedia({ reducedMotion: "reduce" });
await page.waitForTimeout(100);
clip = await page
  .locator("#need-4 figure")
  .evaluate((e) => getComputedStyle(e).clipPath);
assert.equal(clip, "none");
checks.push("Changement reduced-motion annule reveal en cours");
await page.goto("http://127.0.0.1:4322/publicites-sea/", {
  waitUntil: "networkidle",
});
await page.emulateMedia({ reducedMotion: "no-preference" });
await page.locator("[data-select]").nth(3).click();
await page.waitForTimeout(1000);
assert.equal(
  await page.locator("[data-journey]").getAttribute("data-step"),
  "3",
);
await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(300);
const bounds = await page.locator(".journey-traveller").boundingBox();
assert.ok(bounds.x >= 0 && bounds.x + bounds.width <= 390);
checks.push("Repère persistant : étape finale et redimensionnement mobile");
await page.locator("[data-select]").first().click();
await page.waitForTimeout(1000);
assert.equal(
  await page.locator("[data-journey]").getAttribute("data-step"),
  "0",
);
checks.push("Retour arrière publicitaire");
await page.goto("http://127.0.0.1:4322/referencement-seo/", {
  waitUntil: "networkidle",
});
await page.locator("[data-journey-select]").last().click();
await page.waitForTimeout(1000);
const station = await page.locator("[data-station]").last().boundingBox();
const traveller = await page.locator(".journey-traveller").boundingBox();
assert.ok(station.y < 844 && station.y + station.height > 0);
assert.ok(traveller.y >= 0 && traveller.y < 844);
checks.push("SEO mobile : étape commandée et repère visibles ensemble");
await browser.close();
await writeFile(
  "docs/qa/commercial-refinements/motion-regressions.json",
  JSON.stringify({ checks }, null, 2),
);
console.log(checks);
