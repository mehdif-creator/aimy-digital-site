import { chromium } from "@playwright/test";
import sharp from "sharp";
import { mkdir, writeFile, readFile } from "node:fs/promises";
const browser = await chromium.launch({ channel: "chrome", headless: true });
await mkdir("public/images/showcase", { recursive: true });
const records = process.env.CAPTURE_ONLY
  ? JSON.parse(
      await readFile("docs/qa/portfolio/capture-sources.json", "utf8"),
    ).filter((r) => r.slug !== process.env.CAPTURE_ONLY)
  : [];
for (const [slug, url] of [
  ["ht-crea-jeux", "https://htcreajeux.fr/"],
  ["my-nutrizen", "https://mynutrizen.fr/"],
  ["sc-renovation", "https://sc-renovation.com/"],
  ["lambert-digital-pulse", "https://lambertdigitalpulse.fr/"],
]) {
  if (process.env.CAPTURE_ONLY && slug !== process.env.CAPTURE_ONLY) continue;
  if (slug === "lambert-digital-pulse") {
    const original =
      "https://aimy-digital.fr/wp-content/uploads/2026/09/lambertdigitalpulse.fr-1.png";
    const response = await fetch(original);
    if (!response.ok) throw Error("Original Lambert indisponible");
    const data = Buffer.from(await response.arrayBuffer());
    const metadata = await sharp(data).metadata();
    await sharp(data)
      .webp({ quality: 95 })
      .toFile("public/images/showcase/lambert-digital-pulse.webp");
    records.push({
      slug,
      url: original,
      verifiedOn: "https://aimy-digital.fr/",
      date: new Date().toISOString(),
      status: response.status,
      width: metadata.width,
      height: metadata.height,
      method: "Original published screenshot; no upscale",
    });
    continue;
  }
  const p = await browser.newPage({
    viewport: { width: 1440, height: 1800 },
    deviceScaleFactor: 2,
  });
  try {
    const r = await p.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 45000,
    });
    if (r.status() !== 200) throw Error("HTTP " + r.status());
    await p.evaluate(() =>
      Promise.race([
        document.fonts.ready,
        new Promise((r) => setTimeout(r, 5000)),
      ]),
    );
    await p.waitForTimeout(2500);
    await p.evaluate(async () => {
      await Promise.race([
        Promise.all(
          [...document.images]
            .filter((i) => i.getBoundingClientRect().top < 1800)
            .map((i) => i.decode().catch(() => {})),
        ),
        new Promise((r) => setTimeout(r, 8000)),
      ]);
    });
    const path = `public/images/showcase/${slug}.webp`;
    await sharp(await p.screenshot({ timeout: 20000, animations: "disabled" }))
      .webp({ quality: 92, effort: 5 })
      .toFile(path);
    const m = await sharp(path).metadata();
    records.push({
      slug,
      url: p.url(),
      date: new Date().toISOString(),
      status: r.status(),
      viewport: { width: 1440, height: 1800 },
      dpr: 2,
      width: m.width,
      height: m.height,
      path,
    });
    console.log(slug, m.width, m.height);
  } catch (e) {
    records.push({ slug, error: e.message });
    console.error(slug, e.message);
  }
  await p.close();
}
await browser.close();
await writeFile(
  "docs/qa/portfolio/capture-sources.json",
  JSON.stringify(records, null, 2),
);
if (records.some((r) => r.error)) process.exitCode = 1;
