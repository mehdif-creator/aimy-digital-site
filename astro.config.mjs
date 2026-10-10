import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { readFileSync } from "node:fs";
import { loadEnv } from "vite";
const env = loadEnv(
  process.env.NODE_ENV || "production",
  process.cwd(),
  "PUBLIC_",
);
const categories = JSON.parse(
  readFileSync(new URL("./src/data/categories.json", import.meta.url), "utf8"),
);
export default defineConfig({
  site: "https://aimy-digital.fr",
  output: "static",
  trailingSlash: "always",
  build: { format: "directory" },
  integrations:
    env.PUBLIC_SITE_ENV === "production"
      ? [
          sitemap({
            filter: (page) =>
              !page.endsWith("/404/") &&
              !page.endsWith("/404.html") &&
              !categories.some(
                (c) => c.count === 0 && page.endsWith(`/category/${c.slug}/`),
              ),
          }),
        ]
      : [],
  vite: { plugins: [tailwindcss()] },
});
