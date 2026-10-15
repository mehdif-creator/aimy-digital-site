import fs from "node:fs";
import { createHash } from "node:crypto";
import { pathToFileURL } from "node:url";
import { parseDocument } from "htmlparser2";
import { findAll, textContent, removeElement } from "domutils";
import { cleanContent } from "./content-utils.mjs";
import sharp from "sharp";
import render from "dom-serializer";

const readJSON = (path) =>
  JSON.parse(fs.readFileSync(path, "utf8").replace(/^\uFEFF/, ""));
const plain = (html) =>
  textContent(parseDocument(html)).replace(/\s+/g, " ").trim();
const hash = (value) => createHash("sha256").update(value).digest("hex");

export function extractArticle(html) {
  const doc = parseDocument(html);
  const widgets = findAll(
    (node) => Boolean(node.attribs?.["data-widget_type"]),
    doc.children,
  );
  if (!widgets.length)
    throw new Error("Structure WordPress inattendue : extraction à revoir");
  const selected = [];
  for (const widget of widgets) {
    const text = textContent(widget).trim();
    if (/^Envie d[’']échanger sur votre projet digital/i.test(text)) break;
    if (/^Mots-clés(?: principaux)?\s*:/i.test(text)) continue;
    if (widget.attribs["data-widget_type"] === "video.default") {
      const video = findAll((n) => n.name === "video", [widget])[0];
      const url = video?.attribs.src;
      if (
        !url ||
        !url.startsWith("https://aimy-digital.fr/wp-content/uploads/")
      )
        throw new Error("Média vidéo à examiner");
      selected.push(
        `<p><a href="${url}">Voir la vidéo de l’article (MP4)</a></p>`,
      );
      continue;
    }
    if (
      ![
        "heading.default",
        "text-editor.default",
        "html.default",
        "image.default",
      ].includes(widget.attribs["data-widget_type"])
    )
      continue;
    for (const node of findAll((n) => n.name === "h1", [widget]))
      removeElement(node);
    selected.push(render(widget));
  }
  return cleanContent(selected.join("\n"))
    .replace(/<h[234](?:\s[^>]*)?>\s*(?:&nbsp;|\u00a0)?\s*<\/h[234]>/g, "")
    .replace(/https:\/\/aimy-digital\/contact\/?/g, "/contact/");
}

export async function restore() {
  const archived = readJSON(".private/wordpress/posts.json");
  const live = readJSON(".private/seo-restoration/posts-live.json");
  if (archived.length !== 11 || live.length !== 11)
    throw new Error("Inventaire des onze articles à revalider");
  const manifest = [];
  const claims = [];
  const redirects = readJSON("src/data/redirects.json");
  for (const source of archived) {
    const current = live.find((p) => p.slug === source.slug);
    if (
      !current ||
      hash(current.content.rendered) !== hash(source.content.rendered)
    )
      throw new Error(`Source publique modifiée : ${source.slug}`);
    const file = `src/content/posts/${source.slug}.json`;
    const old = readJSON(file);
    let sourceHTML = source.content.rendered;
    const embedded = [];
    for (const match of sourceHTML.matchAll(
      /data:image\/(png|jpeg);base64,([A-Za-z0-9+/=\r\n]+)/g,
    )) {
      const bytes = Buffer.from(match[2], "base64");
      const metadata = await sharp(bytes).metadata();
      if (!["png", "jpeg"].includes(metadata.format))
        throw new Error("Image intégrée inattendue");
      const target = `/wp-content/uploads/restored/${hash(bytes).slice(0, 20)}.${metadata.format === "jpeg" ? "jpg" : "png"}`;
      fs.mkdirSync("public/wp-content/uploads/restored", { recursive: true });
      fs.writeFileSync("public" + target, bytes);
      sourceHTML = sourceHTML.replace(match[0], target);
      embedded.push({
        path: target,
        sha256: hash(bytes),
        width: metadata.width,
        height: metadata.height,
      });
    }
    let html = extractArticle(sourceHTML).replace(
      /href="([^"]+)"/g,
      (attribute, href) => {
        return redirects[href] ? `href="${redirects[href]}"` : attribute;
      },
    );
    const imageDoc = parseDocument(html);
    for (const img of findAll((n) => n.name === "img", imageDoc.children)) {
      const src = img.attribs.src;
      if (
        !src?.startsWith("/wp-content/uploads/") ||
        !fs.existsSync("public" + src)
      )
        throw new Error(`Image manquante : ${src}`);
      const metadata = await sharp("public" + src).metadata();
      img.attribs.width = String(metadata.width);
      img.attribs.height = String(metadata.height);
    }
    html = imageDoc.children.map((n) => render(n)).join("");
    if (/djez|éco.?bois|eco.?bois/i.test(plain(html)))
      throw new Error(`Référence exclue à traiter : ${source.slug}`);
    const doc = parseDocument(html);
    // A review inventory, not an automated factual verdict. Full source text stays intact.
    const flagged = findAll(
      (n) =>
        ["p", "li", "table"].includes(n.name) &&
        /%|€|\bROI\b|garanti|certifi|nous |notre |nos |RGPD|FID|témoign|cas concret/i.test(
          textContent(n),
        ),
      doc.children,
    )
      .filter((n) => !(n.parent && ["li", "table"].includes(n.parent.name)))
      .map((n) => plain(render(n)));
    const post = {
      ...old,
      title: plain(source.title.rendered),
      seoTitle: old.seoTitle || old.title,
      description:
        source.yoast_head_json?.description ||
        "Guide historique 2025 : fondations techniques, contenu, performance et suivi du référencement WordPress. Édition restaurée, conseils à contextualiser.",
      date: source.date,
      modified: source.modified,
      html,
      historicalReview: true,
    };
    fs.writeFileSync(file, JSON.stringify(post, null, 2) + "\n");
    manifest.push({
      slug: source.slug,
      source: source.link,
      sourceSha256: hash(source.content.rendered),
      liveIdentical: true,
      restoredSha256: hash(html),
      words: plain(html).split(/\s+/).length,
      headings: findAll((n) => /^h[234]$/.test(n.name), doc.children).map(
        textContent,
      ),
      images: findAll((n) => n.name === "img", doc.children).map(
        (n) => n.attribs,
      ),
      embedded,
      videos: findAll(
        (n) => n.name === "a" && /\.mp4$/.test(n.attribs.href),
        doc.children,
      ).map((n) => n.attribs.href),
      reviewBlocks: flagged.length,
    });
    claims.push(
      `## ${source.slug}\n\n${flagged.map((t) => `- À vérifier : ${t}`).join("\n")}\n`,
    );
  }
  fs.mkdirSync("docs/qa/articles-seo", { recursive: true });
  fs.writeFileSync(
    "docs/qa/articles-seo/restoration-manifest.json",
    JSON.stringify(
      { checkedAt: new Date().toISOString(), articles: manifest },
      null,
      2,
    ) + "\n",
  );
  fs.writeFileSync(
    "docs/qa/articles-seo/reserves-editoriales.md",
    "# Réserves éditoriales — édition historique restaurée\n\nDétection indicative, non exhaustive. Ces affirmations proviennent des articles WordPress, pas de nouvelles preuves. Les tarifs, résultats, certifications, conseils juridiques et engagements doivent être justifiés ou corrigés avant publication. Le bandeau des articles précise leur statut historique non validé. Aucun chiffre n’est validé par la restauration.\n\n" +
      claims.join("\n"),
  );
  console.log(
    manifest.map(({ slug, words, reviewBlocks }) => ({
      slug,
      words,
      reviewBlocks,
    })),
  );
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  await restore();
