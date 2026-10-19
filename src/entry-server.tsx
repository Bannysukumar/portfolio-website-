import { renderToString } from "react-dom/server";
import { App } from "./App";
import { allRoutes, getMeta, normalizeRoute } from "./seo/meta";
import { renderHeadTags } from "./seo/head";

export interface PrerenderResult {
  /** Server-rendered application markup (goes inside #root). */
  appHtml: string;
  /** Serialised <head> tags for the route (goes between the SEO markers). */
  head: string;
  title: string;
  noindex: boolean;
}

/**
 * Renders one route to static HTML. Used only by scripts/prerender.mjs at
 * build time; it is never shipped to the browser.
 */
export function render(inputPath: string): PrerenderResult {
  const path = normalizeRoute(inputPath);
  // getMeta() falls back to noindex 404 metadata for unknown routes.
  const meta = getMeta(path);
  const appHtml = renderToString(<App initialPath={path} />);
  return {
    appHtml,
    head: renderHeadTags(meta),
    title: meta.title,
    noindex: Boolean(meta.noindex),
  };
}

export { allRoutes };
