import { SITE, canonicalUrl } from "./site";
import type { RouteMeta } from "./meta";

/**
 * Turns a RouteMeta into concrete <head> tags. One pure description of the
 * head is shared by the build-time prerenderer (which serialises it to HTML)
 * and the client `useSeo` hook (which applies it to the live document), so the
 * two can never drift apart.
 */

export interface HeadTag {
  tag: "title" | "meta" | "link" | "script";
  attrs?: Record<string, string>;
  content?: string;
}

/** Marker attribute so the client hook can replace exactly the tags it owns. */
const OWNED = "data-seo";

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Escapes a JSON string for safe embedding inside a <script> element. */
function escapeJson(json: string): string {
  return json.replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
}

export function jsonLdGraph(meta: RouteMeta): string {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": meta.jsonLd });
}

export function headTags(meta: RouteMeta): HeadTag[] {
  const url = canonicalUrl(meta.path);
  const image = `${SITE.baseUrl}${SITE.ogImage}`;
  const tags: HeadTag[] = [
    { tag: "title", content: meta.title },
    { tag: "meta", attrs: { name: "description", content: meta.description } },
  ];

  if (meta.noindex) {
    // A noindex page (e.g. the 404 page) must not advertise a canonical URL.
    tags.push({ tag: "meta", attrs: { name: "robots", content: "noindex, follow" } });
  } else {
    tags.push({ tag: "link", attrs: { rel: "canonical", href: url } });
  }

  tags.push(
    { tag: "meta", attrs: { property: "og:type", content: meta.ogType } },
    { tag: "meta", attrs: { property: "og:site_name", content: SITE.name } },
    { tag: "meta", attrs: { property: "og:title", content: meta.title } },
    { tag: "meta", attrs: { property: "og:description", content: meta.description } },
    { tag: "meta", attrs: { property: "og:locale", content: SITE.locale } },
    { tag: "meta", attrs: { property: "og:image", content: image } },
    { tag: "meta", attrs: { property: "og:image:type", content: "image/png" } },
    { tag: "meta", attrs: { property: "og:image:width", content: String(SITE.ogImageWidth) } },
    { tag: "meta", attrs: { property: "og:image:height", content: String(SITE.ogImageHeight) } },
    { tag: "meta", attrs: { property: "og:image:alt", content: SITE.ogImageAlt } },
    { tag: "meta", attrs: { name: "twitter:card", content: "summary_large_image" } },
    { tag: "meta", attrs: { name: "twitter:title", content: meta.title } },
    { tag: "meta", attrs: { name: "twitter:description", content: meta.description } },
    { tag: "meta", attrs: { name: "twitter:image", content: image } },
    { tag: "meta", attrs: { name: "twitter:image:alt", content: SITE.ogImageAlt } },
  );

  if (!meta.noindex) {
    tags.push({ tag: "meta", attrs: { property: "og:url", content: url } });
  }

  if (meta.jsonLd.length > 0) {
    tags.push({ tag: "script", attrs: { type: "application/ld+json" }, content: jsonLdGraph(meta) });
  }

  return tags;
}

/** Serialises the tags to indented HTML for the prerenderer. */
export function renderHeadTags(meta: RouteMeta): string {
  return headTags(meta)
    .map((tag) => renderTag(tag, "    "))
    .join("\n");
}

export function renderTag(tag: HeadTag, indent: string): string {
  if (tag.tag === "title") {
    return `${indent}<title ${OWNED}>${escapeAttr(tag.content ?? "")}</title>`;
  }
  if (tag.tag === "script") {
    return `${indent}<script ${OWNED} ${serializeAttrs(tag.attrs)}>${escapeJson(tag.content ?? "")}</script>`;
  }
  const attrs = serializeAttrs({ ...tag.attrs, [OWNED]: "" });
  if (tag.tag === "meta") return `${indent}<meta ${attrs} />`;
  return `${indent}<link ${attrs} />`;
}

function serializeAttrs(attrs?: Record<string, string>): string {
  if (!attrs) return "";
  return Object.entries(attrs)
    .map(([key, value]) => (value === "" ? key : `${key}="${escapeAttr(value)}"`))
    .join(" ");
}

export { OWNED as SEO_ATTR };
