import fs from "node:fs";
import path from "node:path";
import { parseDocument } from "htmlparser2";
import { findAll, textContent } from "domutils";
const walk = (dir) =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) =>
      e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)],
    );
const htmlFiles = walk("dist").filter((f) => f.endsWith(".html"));
const origin = "https://aimy-digital.fr";
const pages = new Map(
  htmlFiles.map((f) => [
    "/" +
      path
        .relative("dist", f)
        .replaceAll("\\", "/")
        .replace(/index\.html$/, ""),
    parseDocument(fs.readFileSync(f, "utf8")),
  ]),
);
const errors = [];
const warnings = [];
const rows = [];
const select = (doc, p) => findAll(p, doc.children);
const attr = (doc, name, key, value, out) =>
  select(doc, (n) => n.name === name && n.attribs?.[key] === value)[0]?.attribs[
    out
  ];
const redirects = JSON.parse(
  fs.readFileSync("src/data/redirects.json", "utf8"),
);
const descriptions = new Map();
const external = new Set();
for (const [route, doc] of pages) {
  const description = attr(doc, "meta", "name", "description", "content");
  const title = select(doc, (n) => n.name === "title")
    .map(textContent)
    .join("");
  const canonical = attr(doc, "link", "rel", "canonical", "href");
  const robots = attr(doc, "meta", "name", "robots", "content");
  const schemas = select(
    doc,
    (n) => n.name === "script" && n.attribs.type === "application/ld+json",
  ).map((n) => JSON.parse(textContent(n)));
  if (descriptions.has(description))
    warnings.push({
      route,
      type: "description-duplicate",
      other: descriptions.get(description),
    });
  descriptions.set(description, route);
  if (title.length > 70)
    warnings.push({ route, type: "title-long", length: title.length });
  if ((description?.length || 0) > 170)
    warnings.push({
      route,
      type: "description-long",
      length: description.length,
    });
  if (route !== "/404.html" && canonical !== origin + route)
    errors.push({ route, type: "canonical", canonical });
  for (const link of select(doc, (n) => n.name === "a" && n.attribs.href)) {
    const href = link.attribs.href;
    if (/^(mailto:|tel:)/.test(href)) continue;
    const url = new URL(href, origin + route);
    if (url.origin !== origin) {
      external.add(url.href);
      continue;
    }
    const target = pages.get(url.pathname);
    if (!target && !fs.existsSync("dist" + decodeURIComponent(url.pathname)))
      errors.push({
        route,
        type: "internal-link",
        href,
        redirect: redirects[url.pathname],
      });
    if (
      target &&
      url.hash &&
      !select(
        target,
        (n) => n.attribs?.id === decodeURIComponent(url.hash.slice(1)),
      ).length
    )
      errors.push({ route, type: "anchor", href });
  }
  for (const schema of schemas.filter((s) => s["@type"] === "Article")) {
    if (!schema.image || !schema.datePublished || !schema.dateModified)
      errors.push({ route, type: "article-schema" });
    if (!schema.author) warnings.push({ route, type: "author-unconfirmed" });
  }
  rows.push({
    route,
    title,
    description,
    canonical,
    robots,
    schemas: schemas.map((s) => s["@type"]),
  });
}
for (const [from, to] of Object.entries(redirects)) {
  if (!pages.has(to) || redirects[to])
    errors.push({ from, to, type: "redirect-target-or-chain" });
}
const report = {
  at: new Date().toISOString(),
  pages: rows.length,
  redirects: Object.keys(redirects).length,
  errors,
  warnings,
  externalLinks: [...external],
  rows,
};
fs.mkdirSync("docs/qa/articles-seo", { recursive: true });
fs.writeFileSync(
  `docs/qa/articles-seo/seo-${process.env.PUBLIC_SITE_ENV || "staging"}.json`,
  JSON.stringify(report, null, 2) + "\n",
);
console.log(
  JSON.stringify(
    { pages: rows.length, errors, warnings, externalLinks: [...external] },
    null,
    2,
  ),
);
if (errors.length) process.exitCode = 1;
