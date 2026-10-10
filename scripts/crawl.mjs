import { readFile, writeFile, mkdir } from "node:fs/promises";
const base = "https://aimy-digital.fr";
const read = async (name) =>
  JSON.parse(
    (await readFile(`.private/wordpress/${name}.json`, "utf8")).replace(
      /^\uFEFF/,
      "",
    ),
  );
const [pages, posts, categories, media] = await Promise.all(
  ["pages", "posts", "categories", "media"].map(read),
);
const queue = new Set([...pages, ...posts, ...categories].map((p) => p.link));
const initial = await readFile(
  "aimy-digital-refonte-codex/04_MATRICE_URL_EXISTANTES.csv",
  "utf8",
);
initial
  .split("\n")
  .slice(1)
  .forEach((line) => {
    const url = line.split(";")[0];
    if (url.startsWith(base)) queue.add(url);
  });
const sources = [];
for (const name of [
  "sitemap_index.xml",
  "post-sitemap.xml",
  "page-sitemap.xml",
  "category-sitemap.xml",
]) {
  const response = await fetch(`${base}/${name}`, {
    signal: AbortSignal.timeout(30000),
  });
  const xml = await response.text();
  await writeFile(`.private/wordpress/${name}`, xml);
  sources.push({ url: `${base}/${name}`, status: response.status });
  for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g))
    if (!match[1].endsWith(".xml")) queue.add(match[1]);
}
const rows = [];
const seen = new Set();
const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#039;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
const attr = (html, tag, key, value, property) => {
  const el = [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, "gi"))]
    .map((m) => m[0])
    .find((t) => new RegExp(`${key}=["']${value}["']`, "i").test(t));
  return el?.match(new RegExp(`${property}=["']([^"']*)["']`, "i"))?.[1] || "";
};
await mkdir(".private/wordpress/html", { recursive: true });
while (queue.size) {
  const batch = [...queue].slice(0, 5);
  batch.forEach((u) => {
    queue.delete(u);
    seen.add(u);
  });
  const results = await Promise.all(
    batch.map(async (url) => {
      try {
        const response = await fetch(url, {
          signal: AbortSignal.timeout(30000),
        });
        const html = await response.text();
        const path = new URL(url).pathname;
        const filename = Buffer.from(path).toString("base64url");
        await writeFile(`.private/wordpress/html/${filename}.html`, html);
        for (const m of html.matchAll(/href=["']([^"'#]+)["']/gi)) {
          try {
            const u = new URL(m[1].replace(/&amp;/g, "&"), url);
            u.hash = "";
            if (
              u.origin === base &&
              !u.search &&
              !/\.(?:xml|png|jpe?g|webp|avif|svg|css|js|pdf|zip|ico|woff2?)$/i.test(
                u.pathname,
              ) &&
              !/^\/(?:wp-|feed)/.test(u.pathname) &&
              !seen.has(u.href)
            )
              queue.add(u.href);
          } catch {}
        }
        return {
          old_url: url,
          status: response.status,
          final_url: response.url,
          title: decode(
            html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "",
          ),
          h1: decode(
            [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)]
              .map((m) => m[1])
              .join(" | "),
          ),
          canonical: attr(html, "link", "rel", "canonical", "href"),
          robots: attr(html, "meta", "name", "robots", "content"),
          target_url: response.status === 200 ? response.url : "",
          action: "REVIEW",
          rationale: "À comparer au contenu reconstruit",
          snapshot: filename,
        };
      } catch (e) {
        return {
          old_url: url,
          status: "ERROR",
          action: "REVIEW",
          rationale: e.message,
        };
      }
    }),
  );
  rows.push(...results);
  console.log(`${rows.length} URL vérifiées ; ${queue.size} restantes`);
  if (seen.size > 500)
    throw new Error(
      "Inventaire supérieur à 500 URL : examiner les boucles avant poursuite",
    );
}
await mkdir("docs/migrations", { recursive: true });
await writeFile(
  ".private/wordpress/crawl.json",
  JSON.stringify(
    { capturedAt: new Date().toISOString(), sources, rows },
    null,
    2,
  ),
);
const fields = [
  "old_url",
  "status",
  "final_url",
  "title",
  "h1",
  "canonical",
  "robots",
  "target_url",
  "action",
  "rationale",
];
await writeFile(
  "docs/migrations/url-map.csv",
  [fields, ...rows.map((r) => fields.map((k) => r[k] || ""))]
    .map((row) =>
      row.map((v) => '"' + String(v).replaceAll('"', '""') + '"').join(";"),
    )
    .join("\n"),
);
await writeFile(
  "docs/migrations/media-inventory.csv",
  "url;type\n" + media.map((m) => `${m.source_url};${m.mime_type}`).join("\n"),
);
console.log(
  JSON.stringify({
    pages: pages.length,
    posts: posts.length,
    categories: categories.length,
    media: media.length,
    crawled: rows.length,
  }),
);
