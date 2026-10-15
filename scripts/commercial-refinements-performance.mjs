import { execFileSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
const routes = (
  process.env.QA_ROUTES ||
  "referencement-seo,publicites-sea,maintenance-et-securite,nos-prestations,a-propos,faq,blog,contact"
).split(",");
const reports = [];
for (const route of routes) {
  const file = `.private/refinements-lh-${route}.json`;
  execFileSync(
    process.execPath,
    [
      "node_modules/lighthouse/cli/index.js",
      `http://127.0.0.1:4322/${route}/`,
      "--quiet",
      "--chrome-flags=--headless=new",
      "--only-categories=performance,accessibility,best-practices",
      "--output=json",
      `--output-path=${file}`,
      "--no-enable-error-reporting",
    ],
    { timeout: 120000, stdio: "pipe" },
  );
  const r = JSON.parse(await readFile(file, "utf8"));
  const report = {
    route,
    version: r.lighthouseVersion,
    date: r.fetchTime,
    scores: Object.fromEntries(
      Object.entries(r.categories).map(([k, v]) => [
        k,
        Math.round(v.score * 100),
      ]),
    ),
    lcp: r.audits["largest-contentful-paint"].numericValue,
    cls: r.audits["cumulative-layout-shift"].numericValue,
    tbt: r.audits["total-blocking-time"].numericValue,
    bytes: r.audits["total-byte-weight"].numericValue,
    lcpDetails: r.audits["lcp-breakdown-insight"].details,
    settings: r.configSettings,
    warnings: r.runWarnings,
  };
  reports.push(report);
  console.log(
    JSON.stringify({
      route,
      scores: report.scores,
      lcp: report.lcp,
      cls: report.cls,
    }),
  );
  await writeFile(
    `docs/qa/commercial-refinements/${process.env.QA_LABEL || "performance"}.json`,
    JSON.stringify(reports, null, 2),
  );
}
