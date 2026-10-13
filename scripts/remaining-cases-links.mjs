import { chromium } from "@playwright/test";
import { writeFile } from "node:fs/promises";
const b = await chromium.launch({ channel: "chrome", headless: true });
const records = [];
for (const slug of ["sc-renovation", "lambert-digital-pulse"]) {
  const p = await b.newPage();
  const url = `http://127.0.0.1:4322/portfolio/${slug}/`;
  await p.goto(url);
  const links = await p.locator(".case-return").count();
  for (let i = 0; i < links; i++) {
    await p.locator(".case-return").nth(i).click();
    await p.waitForURL("**/portfolio/");
    await p.goto(url);
  }
  const href = await p.locator(".case-visit").getAttribute("href");
  try {
    const [r] = await Promise.all([
      p.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 30000 }),
      p.locator(".case-visit").click(),
    ]);
    records.push({ slug, returns: links, url: p.url(), status: r.status() });
  } catch (e) {
    records.push({ slug, returns: links, href, error: e.message });
  }
  await p.close();
}
await b.close();
await writeFile(
  "docs/qa/remaining-cases/links.json",
  JSON.stringify(records, null, 2),
);
console.log(records);
