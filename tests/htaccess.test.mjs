import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
// Émulation simplifiée de mod_rewrite (contexte .htaccess : chemin sans « / » initial,
// première règle [L] correspondante appliquée). Ne remplace pas un test sur Apache.
// Seules les conditions sur HTTP_HOST sont évaluées, pour l'hôte canonique.
const host = "aimy-digital.fr";
const rules = [];
let conds = [];
for (const line of readFileSync("public/.htaccess", "utf8").split(/\r?\n/)) {
  if (line.startsWith("RewriteCond %{HTTP_HOST} ")) {
    conds.push(new RegExp(line.split(/\s+/)[2], "i"));
  } else if (line.startsWith("RewriteRule ")) {
    const [, pattern, target, flags] = line.split(/\s+/);
    rules.push({ pattern: new RegExp(pattern), target, flags, conds });
    conds = [];
  }
}
const resolve = (path) => {
  const rule = rules.find(
    (r) =>
      r.conds.every((c) => c.test(host)) &&
      r.pattern.test(path.replace(/^\//, "")),
  );
  if (!rule) return { status: 200 };
  if (rule.flags.includes("G")) return { status: 410 };
  return { status: 301, location: rule.target };
};
const rows = readFileSync("docs/migrations/url-map.csv", "utf8")
  .split(/\r?\n/)
  .slice(1)
  .filter(Boolean)
  .map((line) => line.slice(1, -1).split('";"'));
test("chaque redirection de redirects.json aboutit en 301 à sa cible", () => {
  const redirects = JSON.parse(readFileSync("src/data/redirects.json", "utf8"));
  for (const [from, to] of Object.entries(redirects)) {
    assert.deepEqual(resolve(from), { status: 301, location: to }, from);
    assert.deepEqual(
      resolve(from.replace(/\/$/, "")),
      { status: 301, location: to },
      from + " sans slash final",
    );
  }
});
test("chaque URL de gone.json répond 410", () => {
  for (const path of JSON.parse(readFileSync("src/data/gone.json", "utf8")))
    assert.equal(resolve(path).status, 410, path);
});
test("aucune URL conservée n'est redirigée ni retirée", () => {
  const kept = rows.filter((r) => r[8] === "KEEP");
  assert.ok(kept.length > 30);
  for (const r of kept) {
    const path = new URL(r[0]).pathname;
    assert.equal(resolve(path).status, 200, path);
  }
});
test("chaque URL de l'inventaire obtient l'action décidée", () => {
  for (const r of rows) {
    const path = new URL(r[0]).pathname;
    const expected = { KEEP: 200, 301: 301, "404/410": null }[r[8]];
    assert.notEqual(r[8], "REVIEW", path);
    if (expected === 301)
      assert.equal(resolve(path).location, new URL(r[7]).pathname, path);
    else if (expected !== null) assert.equal(resolve(path).status, 200, path);
  }
});
test("les cibles des redirections ne sont pas elles-mêmes redirigées", () => {
  for (const rule of rules.filter((r) => r.flags.includes("R=301")))
    assert.equal(resolve(rule.target).status, 200, rule.target);
});
