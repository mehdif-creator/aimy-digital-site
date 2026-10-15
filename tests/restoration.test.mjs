import test from "node:test";
import assert from "node:assert/strict";
import { extractArticle } from "../scripts/restore-articles.mjs";
import fs from "node:fs";
import { createHash } from "node:crypto";

test("restaure titres, tableaux, ancres et paragraphes sans les widgets WordPress", () => {
  const html = `<div data-widget_type="heading.default"><h1>Titre</h1></div>
    <div data-widget_type="text-editor.default"><h2 id="etapes">Étapes</h2><p>Texte intégral <a href="#etapes">sommaire</a>.</p></div>
    <div data-widget_type="html.default"><table><tr><th>Choix</th><td>Valeur</td></tr></table><script>bad()</script></div>
    <div data-widget_type="text-editor.default"><p>Mots-clés : agence web</p></div>
    <div data-widget_type="heading.default"><h2>Envie d’échanger sur votre projet digital ?</h2></div>
    <div data-widget_type="text-editor.default"><p>Widget partagé</p></div>`;
  const restored = extractArticle(html);
  assert.match(restored, /<h2 id="etapes">Étapes/);
  assert.match(restored, /Texte intégral/);
  assert.match(restored, /<table>/);
  assert.doesNotMatch(restored, /<h1|Mots-clés|Widget partagé|bad\(\)/);
});

test("préserve un accès au média vidéo sans chargement automatique", () => {
  assert.match(
    extractArticle(
      '<div data-widget_type="video.default"><video src="https://aimy-digital.fr/wp-content/uploads/2025/09/telechargement.mp4"></video></div>',
    ),
    /href="\/wp-content\/uploads\/2025\/09\/telechargement.mp4"/,
  );
});

test("les onze restaurations correspondent au manifeste revu et leurs images existent", () => {
  const manifest = JSON.parse(
    fs.readFileSync("docs/qa/articles-seo/restoration-manifest.json", "utf8"),
  );
  assert.equal(manifest.articles.length, 11);
  for (const entry of manifest.articles) {
    const post = JSON.parse(
      fs.readFileSync(`src/content/posts/${entry.slug}.json`, "utf8"),
    );
    assert.equal(
      createHash("sha256").update(post.html).digest("hex"),
      entry.restoredSha256,
      entry.slug,
    );
    assert.equal(post.historicalReview, true);
    assert.ok(entry.words > 1500, entry.slug);
    for (const image of entry.images) {
      assert.ok(image.src);
      assert.ok(fs.existsSync("public" + image.src));
      assert.ok(Number(image.width) > 0);
    }
    for (const video of entry.videos)
      assert.ok(fs.existsSync("public" + video));
    assert.doesNotMatch(
      post.html,
      /<script|<form|<iframe|data:image|\sonclick=/i,
    );
  }
});
