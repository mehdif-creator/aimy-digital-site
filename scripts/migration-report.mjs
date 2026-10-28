import { readFile, writeFile, readdir } from "node:fs/promises";
const walk = async (dir) =>
  (
    await Promise.all(
      (await readdir(dir, { withFileTypes: true })).map((e) =>
        e.isDirectory() ? walk(dir + "/" + e.name) : dir + "/" + e.name,
      ),
    )
  ).flat();
const files = await walk("dist");
const paths = new Set(
  files.map((f) => "/" + f.slice(5).replace(/index\.html$/, "")),
);
const redirects = JSON.parse(await readFile("src/data/redirects.json", "utf8"));
const gone = JSON.parse(await readFile("src/data/gone.json", "utf8"));
const crawl = JSON.parse(
  await readFile(".private/wordpress/crawl.json", "utf8"),
);
const rows = crawl.rows.map((r) => {
  const path = new URL(r.old_url).pathname;
  const normalized = path.endsWith("/") ? path : path + "/";
  const target = redirects[path] || redirects[normalized];
  let action = "REVIEW";
  let reason = "Décision propriétaire ou audit complémentaire requis";
  if (paths.has(path) || paths.has(normalized)) {
    action = "KEEP";
    reason = "Route compilée ; contenu révisé, comparaison éditoriale requise";
  } else if (target && paths.has(target)) {
    action = "301";
    reason =
      r.final_url !== r.old_url
        ? "Destination actuelle observée"
        : "Équivalent éditorial proposé après inspection";
  } else if (gone.includes(normalized)) {
    action = "404/410";
    reason =
      "Retrait validé par le propriétaire le 28/10/2026 (410), voir url-decisions.md";
  } else if (r.status === 404) {
    action = "404/410";
    reason =
      "404 actuelle, pas de destination pertinente établie ; pas de suppression nouvelle";
  }
  return {
    ...r,
    action,
    target_url: target
      ? "https://aimy-digital.fr" + target
      : action === "KEEP"
        ? "https://aimy-digital.fr" + normalized
        : "",
    rationale: reason,
    qa_status:
      action === "KEEP"
        ? "BUILD_OK_HTTP_LOCAL_A_CONTROLER"
        : action === "301"
          ? "CONFIG_APACHE_NON_TESTEE"
          : "NON_VALIDE",
  };
});
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
  "qa_status",
];
await writeFile(
  "docs/migrations/url-map.csv",
  [fields, ...rows.map((r) => fields.map((k) => r[k] ?? ""))]
    .map((row) =>
      row.map((v) => '"' + String(v).replaceAll('"', '""') + '"').join(";"),
    )
    .join("\n"),
);
const counts = Object.fromEntries(
  ["KEEP", "301", "404/410", "REVIEW"].map((a) => [
    a,
    rows.filter((r) => r.action === a).length,
  ]),
);
await writeFile(
  "docs/migrations/seo-diff.md",
  `# Comparaison de migration\n\nInventaire public du 10 octobre 2026 : ${rows.length} URL observées (variantes incluses). ${JSON.stringify(counts)}. Le champ status est le statut FINAL après suivi des redirections, pas le code du premier saut. Les codes exacts des sauts et leur exécution Apache restent à vérifier.\n\nLes 11 articles sont conservés aux chemins REST actuels, avec leur date de publication. Les anciens slugs redirigés sont proposés en 301 vers les destinations observées. Les onze corps historiques ont été restaurés le 15 octobre 2026 avec une mention de validation éditoriale en cours. Voir docs/qa/articles-seo/rapport.md et reserves-editoriales.md : les affirmations historiques ne sont pas validées.\n\n40 pages compilées, dont 8 catégories et 4 dossiers de réalisations. Les catégories vides sont noindex et exclues du sitemap production. Le staging est intégralement noindex et ne produit pas de sitemap.\n\n21 médias récupérés à leur chemin historique, plus quatre illustrations extraites sans altération des données base64 ; l’inventaire REST en compte 114. La couverture des médias, liens entrants, flux, archives et pages privées n’est pas complète. L’inventaire public ne remplace pas l’export WordPress, les logs et la sauvegarde serveur.\n\n## URL nécessitant encore une décision\n\n${rows
    .filter((r) => r.action === "REVIEW")
    .map((r) => "- " + r.old_url)
    .join(
      "\n",
    )}\n\n## Conditions de bascule\n\nAucune suppression de ces URL n’est autorisée par ce rapport. La production reste bloquée tant que leur maintien, migration ou retrait explicite n’est pas validé et testé. Les règles .htaccess doivent être fusionnées avec la configuration existante, puis testées par requêtes HTTP sur Apache.\n`,
);
console.log(counts);
