import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { dirname } from "node:path";
const read = async (name) =>
  JSON.parse(
    (await readFile(`.private/wordpress/${name}.json`, "utf8")).replace(
      /^\uFEFF/,
      "",
    ),
  );
const crawl = await read("crawl");
const categories = await read("categories");
await mkdir("src/data", { recursive: true });
await writeFile(
  "src/data/categories.json",
  JSON.stringify(
    categories.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      count: c.count,
    })),
    null,
    2,
  ),
);
const redirects = Object.fromEntries(
  crawl.rows
    .filter(
      (r) =>
        r.status === 200 &&
        r.final_url !== r.old_url &&
        !r.final_url.endsWith("/404-2/") &&
        new URL(r.old_url).pathname.replace(/\/$/, "") !==
          new URL(r.final_url).pathname.replace(/\/$/, ""),
    )
    .map((r) => [new URL(r.old_url).pathname, new URL(r.final_url).pathname]),
);
// Équivalents éditoriaux contrôlés des anciens liens internes cassés.
Object.assign(redirects, {
  "/blog/pourquoi-entreprise-besoin-site-web-professionnel-2025/":
    "/site-web-professionnel-2025/",
  "/blog/publicite-digitale-maximiser-roi-google-ads-facebook-ads/":
    "/publicite-digitale-roi-google-ads-facebook-ads/",
  "/blog/optimiser-site-wordpress-seo-2025-ia/":
    "/optimiser-son-site-wordpress-pour-le-seo-en-2025-maitrisez-les-algorithmes-et-lia/",
  "/blog/category/conseils-business-roi/": "/category/conseils-business-roi/",
  "/blog/category/referencement-seo/": "/category/referencement-seo/",
  "/blog/category/strategie-digitale-tpe-pme/":
    "/category/strategie-digitale-pour-tpe-pme/",
  "/blog/category/creation-sites-web/": "/category/creation-de-sites-web/",
});
await writeFile("src/data/redirects.json", JSON.stringify(redirects, null, 2));
const files = await readdir("src/content/posts");
let downloaded = 0;
const media = new Set();
for (const file of files) {
  const path = `src/content/posts/${file}`;
  const post = JSON.parse(await readFile(path, "utf8"));
  post.html = post.html.replace(/href="([^"#]+)"/g, (full, href) => {
    if (!href.startsWith("/")) return full;
    const normalized = href.endsWith("/") ? href : href + "/";
    return `href="${redirects[normalized] || normalized}"`;
  });
  for (const match of post.html.matchAll(
    /src="(https:\/\/aimy-digital.fr\/wp-content\/uploads\/[^"?]+)"/g,
  ))
    media.add(match[1]);
  if (post.image?.startsWith("https://aimy-digital.fr/wp-content/uploads/"))
    media.add(post.image);
  await writeFile(path, JSON.stringify(post, null, 2));
}
for (const url of media) {
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`${response.status}: ${url}`);
  const path = `public${decodeURIComponent(new URL(url).pathname)}`;
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, Buffer.from(await response.arrayBuffer()));
  downloaded++;
}
for (const file of files) {
  const path = `src/content/posts/${file}`;
  let post = JSON.parse(await readFile(path, "utf8"));
  post.html = post.html.replaceAll(
    "https://aimy-digital.fr/wp-content/uploads/",
    "/wp-content/uploads/",
  );
  if (post.image)
    post.image = post.image.replace("https://aimy-digital.fr", "");
  await writeFile(path, JSON.stringify(post, null, 2));
}
await writeFile(
  "public/.htaccess",
  `# À fusionner avec la configuration serveur existante après revue.\nOptions -Indexes\nErrorDocument 404 /404.html\n<IfModule mod_headers.c>\nHeader always set X-Content-Type-Options "nosniff"\nHeader always set Referrer-Policy "strict-origin-when-cross-origin"\nHeader always set X-Frame-Options "SAMEORIGIN"\n</IfModule>\n<IfModule mod_rewrite.c>\nRewriteEngine On\n${Object.entries(
    redirects,
  )
    .map(
      ([old, target]) =>
        "RewriteRule ^" +
        old
          .replace(/^\//, "")
          .replace(/\/$/, "")
          .replace(/[.*+?^$()|[\]\\]/g, "\\$&") +
        "/?$ " +
        target +
        " [R=301,L]",
    )
    .join("\n")}\n</IfModule>\n`,
);
console.log(
  `${Object.keys(redirects).length} redirections ciblées proposées ; ${downloaded} médias conservés à leur chemin historique.`,
);
