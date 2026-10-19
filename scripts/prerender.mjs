/**
 * Build-time prerenderer.
 *
 * Runs after `vite build`. For every route it:
 *   1. renders the app to static HTML via react-dom/server,
 *   2. writes route-specific <head> tags (title, description, canonical,
 *      Open Graph, JSON-LD) into the built dist/index.html template,
 *   3. writes dist/<route>/index.html,
 *   4. writes dist/404.html, dist/sitemap.xml and public/sitemap.xml.
 *
 * The result is real HTML for every URL — readable by crawlers that do not
 * execute JavaScript, and by traditional search engines — while the client
 * bundle then takes over for interactivity.
 */
import { createServer } from "vite";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const distDir = path.join(root, "dist");
const SEO_START = "<!--seo:start-->";
const SEO_END = "<!--seo:end-->";
const APP_START = "<!--app:begin-->";
const APP_END = "<!--app:end-->";
/**
 * Both marker pairs are *retained* in the output, so the script can be run
 * again over an already-prerendered dist/ without losing the template.
 * (Consuming the markers would freeze the first route's body into every file.)
 */

/** Per-route sitemap hints. Unlisted routes fall back to the project defaults. */
const SITEMAP_META = {
  "/": { changefreq: "monthly", priority: "1.0" },
  "/services": { changefreq: "monthly", priority: "0.9" },
  "/pricing": { changefreq: "monthly", priority: "0.8" },
  "/faq": { changefreq: "monthly", priority: "0.7" },
  "/contact": { changefreq: "monthly", priority: "0.8" },
  project: { changefreq: "yearly", priority: "0.6" },
};

function injectHead(template, head) {
  const start = template.indexOf(SEO_START);
  const end = template.indexOf(SEO_END);
  if (start === -1 || end === -1) {
    throw new Error(
      `SEO markers (${SEO_START} / ${SEO_END}) were not found in dist/index.html. ` + "Run `vite build` first.",
    );
  }
  return template.slice(0, start + SEO_START.length) + "\n" + head + "\n    " + template.slice(end);
}

/** Swaps the markup between the app markers (the markers themselves survive). */
function injectHtml(template, appHtml) {
  const start = template.indexOf(APP_START);
  const end = template.indexOf(APP_END);
  if (start === -1 || end === -1) {
    throw new Error(
      `App markers (${APP_START} / ${APP_END}) were not found in dist/index.html. ` + "Run `vite build` first.",
    );
  }
  return template.slice(0, start + APP_START.length) + appHtml + template.slice(end);
}

function sitemapXml(baseUrl, routes, lastmod) {
  const urls = routes
    .map((route) => {
      const hint = route.startsWith("/projects/") ? SITEMAP_META.project : SITEMAP_META[route];
      const loc = `${baseUrl}${route === "/" ? "/" : route}`;
      const lines = [
        "  <url>",
        `    <loc>${loc}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${hint.changefreq}</changefreq>`,
        `    <priority>${hint.priority}</priority>`,
        "  </url>",
      ];
      return lines.join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

const vite = await createServer({
  root,
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "warn",
});

try {
  const { render, allRoutes } = await vite.ssrLoadModule("/src/entry-server.tsx");
  const { SITE } = await vite.ssrLoadModule("/src/seo/site.ts");

  const template = await readFile(path.join(distDir, "index.html"), "utf8");
  const routes = allRoutes();

  const results = [];
  for (const route of routes) {
    const { appHtml, head, title, noindex } = render(route);
    const html = injectHtml(injectHead(template, head), appHtml);
    const outPath =
      route === "/" ? path.join(distDir, "index.html") : path.join(distDir, route.slice(1), "index.html");
    await mkdir(path.dirname(outPath), { recursive: true });
    await writeFile(outPath, html, "utf8");
    results.push({ route, title, noindex });
  }

  // Custom 404 page.
  const notFound = render("/__404__");
  const notFoundHtml = injectHtml(injectHead(template, notFound.head), notFound.appHtml);
  await writeFile(path.join(distDir, "404.html"), notFoundHtml, "utf8");

  // Sitemap — canonical, indexable URLs only.
  const lastmod = new Date().toISOString().slice(0, 10);
  const xml = sitemapXml(SITE.baseUrl, routes, lastmod);
  await writeFile(path.join(distDir, "sitemap.xml"), xml, "utf8");
  await writeFile(path.join(root, "public", "sitemap.xml"), xml, "utf8");

  console.log(`\n  Prerendered ${results.length} routes (+404.html) and wrote sitemap.xml`);
  for (const { route, title } of results) {
    console.log(`    ${route.padEnd(26)} ${title}`);
  }
  console.log();
} finally {
  await vite.close();
}
