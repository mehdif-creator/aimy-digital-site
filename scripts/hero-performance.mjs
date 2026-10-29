import { execFileSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
const output = ".private/lighthouse-hero.json";
execFileSync(
  process.execPath,
  [
    "node_modules/lighthouse/cli/index.js",
    process.env.QA_BASE || "http://127.0.0.1:4322/",
    "--quiet",
    "--chrome-flags=--headless=new",
    "--only-categories=performance,accessibility,best-practices",
    "--output=json",
    `--output-path=${output}`,
    "--no-enable-error-reporting",
  ],
  { timeout: 120000, stdio: "pipe" },
);
const r = JSON.parse(await readFile(output, "utf8"));
const report = {
  version: r.lighthouseVersion,
  date: r.fetchTime,
  mode: "mobile simulé, Chrome headless, build de production local",
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
await writeFile(
  "docs/qa/hero-v2/lighthouse.json",
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
