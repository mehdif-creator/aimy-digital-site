import type { APIRoute } from "astro";
export const GET: APIRoute = () =>
  new Response(
    import.meta.env.PUBLIC_SITE_ENV === "production"
      ? "User-agent: *\nAllow: /\nSitemap: https://aimy-digital.fr/sitemap-index.xml\n"
      : "User-agent: *\nDisallow: /\n",
    { headers: { "Content-Type": "text/plain" } },
  );
