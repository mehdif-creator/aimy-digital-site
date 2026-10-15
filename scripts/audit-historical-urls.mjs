import fs from "node:fs";
const crawl = JSON.parse(
  fs
    .readFileSync(".private/wordpress/crawl.json", "utf8")
    .replace(/^\uFEFF/, ""),
);
const urls = [...new Set(crawl.rows.map((r) => r.old_url))];
const rows = [];
async function inspect(url) {
  const hops = [];
  let target = url;
  try {
    for (let i = 0; i < 8; i++) {
      const response = await fetch(target, {
        redirect: "manual",
        signal: AbortSignal.timeout(20000),
      });
      const location = response.headers.get("location");
      hops.push({ url: target, status: response.status, location });
      await response.body?.cancel();
      if (!location || response.status < 300 || response.status >= 400) break;
      target = new URL(location, target).href;
      if (new URL(target).origin !== "https://aimy-digital.fr") break;
    }
    return { url, hops };
  } catch (e) {
    return { url, hops, error: e.message };
  }
}
let index = 0;
await Promise.all(
  Array.from({ length: 4 }, async () => {
    while (index < urls.length) {
      const url = urls[index++];
      rows.push(await inspect(url));
    }
  }),
);
rows.sort((a, b) => a.url.localeCompare(b.url));
fs.writeFileSync(
  "docs/qa/articles-seo/historical-http.json",
  JSON.stringify({ at: new Date().toISOString(), rows }, null, 2) + "\n",
);
console.log({
  urls: rows.length,
  errors: rows.filter((r) => r.error),
  statuses: rows.reduce((a, r) => {
    const s = r.hops.at(-1)?.status;
    a[s] = (a[s] || 0) + 1;
    return a;
  }, {}),
});
