import { execFileSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
const label = process.argv[2] || "baseline";
await mkdir("docs/qa/gate1-technical", { recursive: true });
const reports = [];
for (let i = 1; i <= 3; i++) {
  const output = `.private/lcp-${label}-${i}.json`;
  execFileSync(
    process.execPath,
    [
      "node_modules/lighthouse/cli/index.js",
      "http://127.0.0.1:4322/",
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
  const item = {
    run: i,
    date: r.fetchTime,
    version: r.lighthouseVersion,
    settings: r.configSettings,
    score: r.categories.performance.score * 100,
    accessibility: r.categories.accessibility.score * 100,
    lcp: r.audits["largest-contentful-paint"].numericValue,
    cls: r.audits["cumulative-layout-shift"].numericValue,
    tbt: r.audits["total-blocking-time"].numericValue,
    bytes: r.audits["total-byte-weight"].numericValue,
    breakdown: r.audits["lcp-breakdown-insight"]?.details,
    requests: r.audits["network-requests"]?.details?.items,
    warnings: r.runWarnings,
  };
  reports.push(item);
  console.log(
    JSON.stringify({
      label,
      run: i,
      lcp: item.lcp,
      score: item.score,
      bytes: item.bytes,
    }),
  );
  await writeFile(
    `docs/qa/gate1-technical/lighthouse-${label}.json`,
    JSON.stringify(reports, null, 2),
  );
}
