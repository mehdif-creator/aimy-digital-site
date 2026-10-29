import fs from "node:fs";
import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const base = "http://127.0.0.1:4322";
const posts = fs
  .readdirSync("src/content/posts")
  .map((f) => JSON.parse(fs.readFileSync("src/content/posts/" + f, "utf8")));
fs.mkdirSync(".private/seo-restoration/screenshots", { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const results = [];
try {
  for (const width of [320, 390, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      isMobile: width < 500,
      hasTouch: width < 500,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    for (const post of posts) {
      const errors = [];
      const listener = (e) => errors.push(e.message);
      page.on("pageerror", listener);
      const response = await page.goto(`${base}/${post.path}/`, {
        waitUntil: "networkidle",
      });
      await page.locator(".article-history").waitFor();
      for (const img of await page.locator("article img").all()) {
        await img.scrollIntoViewIfNeeded();
        await img.evaluate((el) => el.decode());
      }
      const images = await page
        .locator("article img")
        .evaluateAll((imgs) =>
          imgs.map((img) => ({
            src: img.getAttribute("src"),
            loaded: img.complete && img.naturalWidth > 0,
            width: img.naturalWidth,
            display: img.getBoundingClientRect().width,
          })),
        );
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth + 1,
      );
      const axe = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      await page.evaluate(() => scrollTo(0, 0));
      await page.keyboard.press("Tab");
      const focus = await page.evaluate(() => document.activeElement?.tagName);
      if (
        [
          "wordpress-cms-2025",
          "maintenance-site-web-essentielle-2025",
        ].includes(post.path) &&
        width !== 320
      )
        await page.screenshot({
          path: `.private/seo-restoration/screenshots/${post.path}-${width}.png`,
          fullPage: true,
        });
      results.push({
        slug: post.path,
        width,
        status: response.status(),
        overflow,
        images,
        errors,
        focus,
        violations: axe.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          nodes: v.nodes.map((n) => n.target),
        })),
      });
      page.off("pageerror", listener);
      console.log(
        width,
        post.path,
        overflow ? "OVERFLOW" : "ok",
        axe.violations.length,
      );
    }
    await context.close();
  }
} finally {
  await browser.close();
}
fs.writeFileSync(
  "docs/qa/articles-seo/browser.json",
  JSON.stringify(results, null, 2) + "\n",
);
if (
  results.some(
    (r) =>
      r.status !== 200 ||
      r.overflow ||
      r.errors.length ||
      r.violations.length ||
      r.images.some((i) => !i.loaded),
  )
)
  process.exitCode = 1;
