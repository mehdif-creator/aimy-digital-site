import { chromium } from "@playwright/test";
import { existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage();
const results = [],
  errors = [];
for (const slug of ["creation-de-sites-internet", "referencement-seo"]) {
  await page.goto("http://127.0.0.1:4322/" + slug + "/");
  const data = await page.evaluate(() => ({
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.content,
    canonical: document.querySelector('link[rel="canonical"]')?.href,
    h1: [...document.querySelectorAll("h1")].map((e) => e.textContent),
    headings: [...document.querySelectorAll("h1,h2,h3,h4")].map((e) => ({
      level: Number(e.tagName[1]),
      text: e.textContent,
    })),
    links: [...document.querySelectorAll('a[href^="/"]')].map((e) =>
      e.getAttribute("href"),
    ),
    schemas: [
      ...document.querySelectorAll('script[type="application/ld+json"]'),
    ].map((e) => JSON.parse(e.textContent)),
  }));
  if (
    data.h1.length !== 1 ||
    !data.title ||
    !data.description ||
    data.canonical !== "https://aimy-digital.fr/" + slug + "/"
  )
    errors.push({ slug, metadata: true });
  for (let i = 1; i < data.headings.length; i++)
    if (data.headings[i].level > data.headings[i - 1].level + 1)
      errors.push({ slug, heading: data.headings[i] });
  for (const href of new Set(data.links)) {
    const url = new URL(href, "https://aimy-digital.fr");
    if (!existsSync("dist" + url.pathname + "index.html"))
      errors.push({ slug, missing: href });
  }
  await page.setViewportSize({ width: 375, height: 844 });
  await page.locator(".mobile-nav summary").focus();
  await page.keyboard.press("Enter");
  if (!(await page.locator(".mobile-nav").evaluate((e) => e.open)))
    errors.push({ slug, menu: false });
  await page.keyboard.press("Escape");
  if (await page.locator(".mobile-nav").evaluate((e) => e.open))
    errors.push({ slug, escape: false });
  results.push({ slug, ...data });
}
await browser.close();
if (
  new Set(results.map((r) => r.title)).size !== 2 ||
  new Set(results.map((r) => r.description)).size !== 2
)
  errors.push("metadata duplicated");
await writeFile(
  "docs/qa/gate-a/seo.json",
  JSON.stringify({ results, errors }, null, 2),
);
console.log(JSON.stringify({ pages: results.length, errors }));
if (errors.length) process.exitCode = 1;
