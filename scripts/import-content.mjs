import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import sanitize from "sanitize-html";
import { cleanContent, originalPath } from "./content-utils.mjs";
const read = async (name) =>
  JSON.parse(
    (await readFile(`.private/wordpress/${name}.json`, "utf8")).replace(
      /^\uFEFF/,
      "",
    ),
  );
const posts = await read("posts");
const media = await read("media");
const pages = await read("pages");
const plain = (html) =>
  sanitize(html, { allowedTags: [], allowedAttributes: {} })
    .replace(/\s+/g, " ")
    .trim();
await mkdir(".private/import-drafts", { recursive: true });
await mkdir("src/content/cases", { recursive: true });
await mkdir("public/images", { recursive: true });
await copyFile(
  "aimy-digital-refonte-codex/assets/logo-source.png",
  "public/images/logo-source.png",
);
for (const post of posts) {
  const image = media.find((m) => m.id === post.featured_media)?.source_url;
  const data = {
    title: plain(post.title.rendered),
    description: plain(post.excerpt.rendered).slice(0, 170),
    path: originalPath(post.link),
    date: post.date,
    modified: post.modified,
    html: cleanContent(post.content.rendered),
    categories: post.categories,
    source: post.link,
    ...(image ? { image } : {}),
  };
  await writeFile(
    `.private/import-drafts/${post.slug}.json`,
    JSON.stringify(data, null, 2),
  );
}
const portfolio = pages.find((p) => p.slug === "portfolio").content.rendered;
await writeFile(
  ".private/wordpress/portfolio-assets.json",
  JSON.stringify(
    {
      images: [...portfolio.matchAll(/<img[^>]+>/g)].map((m) => m[0]),
      links: [...portfolio.matchAll(/href="([^"]+)"/g)].map((m) => m[1]),
    },
    null,
    2,
  ),
);
console.log(
  `${posts.length} brouillons privés importés. Aucun article publiable remplacé. Actifs portfolio extraits pour contrôle.`,
);
