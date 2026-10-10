import { readdir, readFile, stat, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { loadEnv } from "vite";
import { gzipSync } from "node:zlib";
const walk = async (dir) =>
  (
    await Promise.all(
      (await readdir(dir, { withFileTypes: true })).map((e) =>
        e.isDirectory() ? walk(join(dir, e.name)) : join(dir, e.name),
      ),
    )
  ).flat();
const files = await walk("dist");
const errors = [];
let count = 0;
const titles = new Set();
const production =
  loadEnv(process.env.NODE_ENV || "production", process.cwd(), "PUBLIC_")
    .PUBLIC_SITE_ENV === "production";
const categories = JSON.parse(
  await readFile("src/data/categories.json", "utf8"),
);
const sitemapFiles = files.filter((f) => /sitemap.*\.xml$/.test(f));
const sitemapText = (
  await Promise.all(sitemapFiles.map((f) => readFile(f, "utf8")))
).join("\n");
if (production && !sitemapFiles.length)
  errors.push("Sitemap production absent");
if (!production && sitemapFiles.length)
  errors.push("Sitemap présent en staging");
const robots = await readFile("dist/robots.txt", "utf8");
if (
  production
    ? !robots.includes("Allow: /\nSitemap:")
    : !robots.includes("Disallow: /")
)
  errors.push("Robots incompatible avec l'environnement");
const paths = new Set(
  files.map(
    (p) =>
      "/" +
      p
        .replaceAll("\\", "/")
        .replace(/^dist\//, "")
        .replace(/index\.html$/, ""),
  ),
);
for (const file of files.filter((f) => f.endsWith(".html"))) {
  const html = await readFile(file, "utf8");
  count++;
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  if (!title || titles.has(title))
    errors.push(`Titre absent ou dupliqué : ${file}`);
  titles.add(title);
  if ([...html.matchAll(/<h1\b/g)].length !== 1) errors.push(`H1 : ${file}`);
  if (!html.includes('lang="fr"') || !html.includes('name="description"'))
    errors.push(`Métadonnées : ${file}`);
  const route =
    "/" +
    file
      .replaceAll("\\", "/")
      .replace(/^dist\//, "")
      .replace(/index\.html$/, "");
  if (
    route !== "/404.html" &&
    !html.includes(`rel="canonical" href="https://aimy-digital.fr${route}"`)
  )
    errors.push(`Canonical : ${file}`);
  if (route === "/404.html" && !html.includes("noindex, nofollow"))
    errors.push("404 indexable");
  if (!production && !html.includes("noindex, nofollow"))
    errors.push(`Protection staging : ${file}`);
  if (production) {
    const excluded =
      route === "/404.html" ||
      categories.some((c) => c.count === 0 && route === `/category/${c.slug}/`);
    if (html.includes('content="noindex, nofollow"') !== excluded)
      errors.push(`Indexabilité : ${file}`);
    if (
      sitemapText.includes(`<loc>https://aimy-digital.fr${route}</loc>`) ===
      excluded
    )
      errors.push(`Couverture sitemap : ${file}`);
  }
  if (/Djez|[ÉE]co.?Bois/i.test(html)) errors.push(`Projet exclu : ${file}`);
  for (const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    const target = decodeURIComponent(match[1]);
    if (!paths.has(target))
      errors.push(`Lien ou média absent : ${route} -> ${target}`);
  }
}
for (const file of files)
  if (/\.(env|sql|xlsx|pdf)$/i.test(file) || /wordpress.*json/.test(file))
    errors.push(`Fichier interdit : ${file}`);
const scripts = files.filter((f) => f.endsWith(".js"));
let jsBytes = 0;
let jsGzipBytes = 0;
for (const f of scripts) jsBytes += (await stat(f)).size;
for (const f of scripts) jsGzipBytes += gzipSync(await readFile(f)).length;
// GSAP et ScrollTrigger sont demandés pour le hero et chargés uniquement à l'accueil.
if (jsBytes > 125000 || jsGzipBytes > 50000)
  errors.push(
    `Budget JavaScript cinématique dépassé : ${jsBytes} brut / ${jsGzipBytes} gzip`,
  );
for (const file of files.filter(
  (f) => f.endsWith(".html") && f.replaceAll("\\", "/") !== "dist/index.html",
)) {
  const html = await readFile(file, "utf8");
  if (/src="[^"]*CinematicHero[^\"]*\.js"/.test(html))
    errors.push(`Animation chargée hors accueil : ${file}`);
}
const report = {
  environment: production ? "production" : "staging",
  htmlPages: count,
  jsBytes,
  jsGzipBytes,
  errors: [...new Set(errors)],
};
await mkdir("docs/qa", { recursive: true });
await writeFile(
  `docs/qa/build-audit-${report.environment}.json`,
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
if (errors.length) process.exitCode = 1;
