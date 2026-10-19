import { useEffect } from "react";
import type { RouteMeta } from "./meta";
import { headTags, SEO_ATTR, type HeadTag } from "./head";

/**
 * Applies route metadata to the live document during in-app navigation.
 *
 * The prerendered HTML already contains the correct head for a page loaded
 * directly; this hook exists for client-side route changes. Every tag it owns
 * carries the `data-seo` marker, so tags written at build time are replaced
 * rather than duplicated.
 */

function removeOwned(): void {
  document.head.querySelectorAll(`[${SEO_ATTR}]`).forEach((el) => el.remove());
}

function applyTag(tag: HeadTag): void {
  if (tag.tag === "title") {
    document.title = tag.content ?? "";
    document.head.querySelector("title")?.setAttribute(SEO_ATTR, "");
    return;
  }

  if (tag.tag === "script") {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute(SEO_ATTR, "");
    script.textContent = tag.content ?? "";
    document.head.appendChild(script);
    return;
  }

  const el = document.createElement(tag.tag);
  for (const [key, value] of Object.entries(tag.attrs ?? {})) el.setAttribute(key, value);
  el.setAttribute(SEO_ATTR, "");
  document.head.appendChild(el);
}

export function useSeo(meta: RouteMeta): void {
  useEffect(() => {
    removeOwned();
    for (const tag of headTags(meta)) applyTag(tag);
  }, [meta]);
}
