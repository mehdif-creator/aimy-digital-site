import sanitize from "sanitize-html";
export function cleanContent(html) {
  return sanitize(html, {
    allowedTags: [
      "p",
      "h2",
      "h3",
      "h4",
      "ul",
      "ol",
      "li",
      "a",
      "strong",
      "em",
      "blockquote",
      "figure",
      "figcaption",
      "img",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "br",
    ],
    allowedAttributes: {
      a: ["href", "title"],
      img: ["src", "alt", "width", "height", "loading"],
      th: ["scope"],
      td: ["colspan"],
    },
    nonTextTags: [
      "script",
      "style",
      "textarea",
      "option",
      "form",
      "iframe",
      "noscript",
    ],
    allowedSchemes: ["http", "https", "mailto", "tel"],
    transformTags: {
      h1: "h2",
      a: (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          href: (attribs.href || "").replace(
            /^https:\/\/aimy-digital\.fr(?=\/)/,
            "",
          ),
        },
      }),
      img: (tagName, attribs) => ({
        tagName,
        attribs: { ...attribs, loading: "lazy", alt: attribs.alt || "" },
      }),
    },
  });
}
export function originalPath(value) {
  const url = new URL(value);
  if (url.origin !== "https://aimy-digital.fr" || url.search || url.hash)
    throw new Error("URL hors périmètre");
  return url.pathname.replace(/^\/|\/$/g, "");
}
