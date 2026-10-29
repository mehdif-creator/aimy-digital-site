import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { site } from "../lib/site";
const escape = (s: string) =>
  s.replace(
    /[<>&"']/g,
    (c) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[c]!,
  );
// Remplace /feed/ et les flux WordPress de catégories et d'auteur (301).
export const GET: APIRoute = async () => {
  const posts = (await getCollection("posts")).sort((a, b) =>
    b.data.date.localeCompare(a.data.date),
  );
  const items = posts
    .map((post) => {
      const link = new URL(`/${post.data.path}/`, site.url).href;
      return `<item><title>${escape(post.data.title)}</title><link>${link}</link><guid isPermaLink="true">${link}</guid><pubDate>${new Date(post.data.date).toUTCString()}</pubDate><description>${escape(post.data.description)}</description></item>`;
    })
    .join("");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Le journal Aimy Digital</title><link>${new URL("/blog/", site.url).href}</link><atom:link href="${new URL("/feed.xml", site.url).href}" rel="self" type="application/rss+xml"/><description>Web, SEO et stratégie digitale pour les entreprises du Bocage.</description><language>fr-FR</language>${items}</channel></rss>`,
    { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } },
  );
};
