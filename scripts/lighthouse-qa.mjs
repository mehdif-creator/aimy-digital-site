import { execFileSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
const routes = [
  ["accueil", "/", false],
  ["creation", "/creation-de-sites-internet/", false],
  ["portfolio", "/portfolio/", false],
  ["contact", "/contact/", false],
  ["article", "/maintenance-site-web-essentielle-2025/", false],
  ["accueil-desktop", "/", true],
];
const reports = [];
for (const [name, route, desktop] of routes) {
  const output = `.private/lighthouse-${name}.json`;
  execFileSync(
    process.execPath,
    [
      "node_modules/lighthouse/cli/index.js",
      "http://127.0.0.1:4322" + route,
      "--quiet",
      "--chrome-flags=--headless=new",
      "--only-categories=performance,accessibility,best-practices,seo",
      "--output=json",
      `--output-path=${output}`,
      "--no-enable-error-reporting",
      ...(desktop ? ["--preset=desktop"] : []),
    ],
    { stdio: "pipe", env: process.env, timeout: 120000 },
  );
  const r = JSON.parse(await readFile(output, "utf8"));
  const result = {
    name,
    route,
    formFactor: desktop ? "desktop" : "mobile",
    version: r.lighthouseVersion,
    fetchTime: r.fetchTime,
    scores: Object.fromEntries(
      Object.entries(r.categories).map(([k, v]) => [
        k,
        Math.round(v.score * 100),
      ]),
    ),
    lcpMs: r.audits["largest-contentful-paint"].numericValue,
    cls: r.audits["cumulative-layout-shift"].numericValue,
    tbtMs: r.audits["total-blocking-time"].numericValue,
    bytes: r.audits["total-byte-weight"].numericValue,
    warnings: r.runWarnings,
  };
  reports.push(result);
  await writeFile("docs/qa/lighthouse.json", JSON.stringify(reports, null, 2));
  console.log(`${name} : ${JSON.stringify(result.scores)}`);
}
