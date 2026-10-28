// Contrôle HTTP réel des redirections et retraits : node scripts/check-redirects-http.mjs [base] [rapport.json]
// Requêtes sans suivi de redirection ; à lancer sur un Apache local ou une préproduction.
// Préproduction protégée : définir QA_AUTH="utilisateur:motdepasse" (authentification HTTP Basic).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
const base = (process.argv[2] || "http://127.0.0.1:8099").replace(/\/$/, "");
const output = process.argv[3];
const headers = process.env.QA_AUTH
  ? {
      Authorization:
        "Basic " + Buffer.from(process.env.QA_AUTH).toString("base64"),
    }
  : {};
const redirects = JSON.parse(readFileSync("src/data/redirects.json", "utf8"));
const gone = JSON.parse(readFileSync("src/data/gone.json", "utf8"));
const kept = readFileSync("docs/migrations/url-map.csv", "utf8")
  .split(/\r?\n/)
  .slice(1)
  .filter(Boolean)
  .map((line) => line.slice(1, -1).split('";"'))
  .filter((r) => r[8] === "KEEP")
  .map((r) => new URL(r[0]).pathname);
const cases = [
  ...Object.entries(redirects).flatMap(([from, to]) => [
    { path: from, status: 301, location: to },
    { path: from.replace(/\/$/, ""), status: 301, location: to },
  ]),
  ...gone.flatMap((path) => [
    { path, status: 410 },
    { path: path.replace(/\/$/, ""), status: 410 },
  ]),
  // Sans slash final, mod_dir ajoute le slash par une 301 vers la même page.
  ...[...new Set(kept)].map((path) =>
    path.endsWith("/")
      ? { path, status: 200 }
      : { path, status: 301, location: path + "/" },
  ),
  ...[...new Set(Object.values(redirects))].map((path) => ({
    path,
    status: 200,
  })),
  // Variantes non crawlées couvertes par les règles génériques.
  { path: "/page/9/", status: 301, location: "/" },
  { path: "/blog/page/3/", status: 301, location: "/blog/" },
  {
    path: "/category/referencement-seo/feed",
    status: 301,
    location: "/feed.xml",
  },
  { path: "/combien-coute-site-vitrine-2025/feed/", status: 410 },
  { path: "/page-inexistante-test/", status: 404 },
];
const results = [];
for (const c of cases) {
  const res = await fetch(base + encodeURI(c.path), {
    redirect: "manual",
    headers,
  });
  if (res.status === 401)
    throw new Error("401 : authentification refusée, vérifier QA_AUTH");
  const raw = res.headers.get("location");
  const location = raw ? new URL(raw, base).pathname : undefined;
  const ok =
    res.status === c.status &&
    (c.location === undefined || location === c.location);
  results.push({ ...c, got: res.status, gotLocation: location, ok });
}
const failed = results.filter((r) => !r.ok);
for (const r of failed)
  console.log(
    `ÉCHEC ${r.path} : attendu ${r.status} ${r.location ?? ""}, obtenu ${r.got} ${r.gotLocation ?? ""}`,
  );
console.log(
  `${results.length - failed.length}/${results.length} contrôles réussis sur ${base}`,
);
if (output) {
  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(
    output,
    JSON.stringify({ base, date: new Date().toISOString(), results }, null, 2),
  );
}
process.exitCode = failed.length ? 1 : 0;
