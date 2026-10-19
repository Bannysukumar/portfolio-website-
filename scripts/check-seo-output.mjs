/**
 * Validates the prerendered SEO output in dist/:
 *   - one title + one meta description per page, no duplicates across routes
 *   - canonical / og:url agreement (absent on the noindex 404)
 *   - JSON-LD parses, has no duplicate @id, and contains no fabricated
 *     entity types or fields (ratings, reviews, address, phone, awards)
 *   - sitemap.xml well-formed, canonical URLs only, and mirrored in public/
 *   - robots.txt exposes the sitemap and does not blanket-block crawlers
 *   - social image file exists and its PNG dimensions match the declared ones
 *
 * Run after `npm run build`:  npm run check:seo
 */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const dist = path.resolve("dist");
const publicDir = path.resolve("public");
const SITE_ORIGIN = "https://adepu-sukumar.vercel.app";

const problems = [];
const notes = [];

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (entry.endsWith(".html")) out.push(full);
  }
  return out;
}

/** Banned in JSON-LD: we have no office, phone, ratings or awards. */
const BANNED_KEYS = [
  "aggregateRating",
  "ratingValue",
  "review",
  "reviews",
  "LocalBusiness",
  "address",
  "telephone",
  "priceRange",
  "openingHours",
  "award",
  "alumniOf",
  "memberOf",
  "employee",
  "brand",
];

function scanObject(node, trail, route) {
  if (Array.isArray(node)) {
    node.forEach((item, i) => scanObject(item, `${trail}[${i}]`, route));
    return;
  }
  if (!node || typeof node !== "object") return;
  for (const [key, value] of Object.entries(node)) {
    if (BANNED_KEYS.includes(key)) {
      problems.push(`${route}: JSON-LD contains banned key "${key}" at ${trail}`);
    }
    scanObject(value, `${trail}.${key}`, route);
  }
}

const htmlFiles = walk(dist);
const seenTitles = new Map();
const seenDescriptions = new Map();
const canonicals = new Map();
let jsonLdCount = 0;

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const rel = path.relative(dist, file).replace(/\\/g, "/");
  const route = "/" + rel.replace(/index\.html$/, "").replace(/\/$/, "");
  const is404 = rel === "404.html";

  // --- basic head tags ---
  const titles = [...html.matchAll(/<title[^>]*>([^<]*)<\/title>/g)];
  if (titles.length !== 1) problems.push(`${route}: expected exactly 1 <title>, found ${titles.length}`);
  const title = titles[0]?.[1] ?? "";
  if (title.length > 75) problems.push(`${route}: title too long (${title.length} chars): ${title}`);

  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!desc) problems.push(`${route}: missing meta description`);
  else if (desc.length > 165) problems.push(`${route}: description ${desc.length} chars: ${desc}`);

  if (!/<html[^>]*\blang="en"/.test(html)) problems.push(`${route}: <html> is missing lang="en"`);
  if (!/name="viewport"/.test(html)) problems.push(`${route}: missing viewport`);
  if (!/charset="UTF-8"|charset="utf-8"/i.test(html)) problems.push(`${route}: missing charset`);

  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  const ogUrl = html.match(/<meta property="og:url" content="([^"]*)"/)?.[1];
  const robots = html.match(/<meta name="robots" content="([^"]*)"/)?.[1];

  if (is404) {
    if (canonical) problems.push(`${route}: noindex page must not declare a canonical`);
    if (ogUrl) problems.push(`${route}: noindex page must not declare og:url`);
    if (robots !== "noindex, follow") problems.push(`${route}: expected "noindex, follow", got "${robots}"`);
  } else {
    if (!canonical) problems.push(`${route}: missing canonical`);
    else if (!canonical.startsWith(`${SITE_ORIGIN}/`)) problems.push(`${route}: canonical not on ${SITE_ORIGIN}: ${canonical}`);
    else if (canonical.includes("#")) problems.push(`${route}: canonical must not contain a fragment: ${canonical}`);
    if (ogUrl !== canonical) problems.push(`${route}: og:url (${ogUrl}) !== canonical (${canonical})`);
    if (robots?.includes("noindex")) problems.push(`${route}: indexable page is marked noindex`);

    if (title) {
      if (seenTitles.has(title)) problems.push(`${route}: duplicate title also used by ${seenTitles.get(title)}`);
      seenTitles.set(title, route);
    }
    if (desc) {
      if (seenDescriptions.has(desc)) problems.push(`${route}: duplicate description also used by ${seenDescriptions.get(desc)}`);
      seenDescriptions.set(desc, route);
    }
    canonicals.set(route, canonical);
  }

  // --- structured data ---
  const blocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  jsonLdCount += blocks.length;
  const graphIds = new Set();
  for (const [, raw] of blocks) {
    let data;
    try {
      data = JSON.parse(raw);
    } catch (error) {
      problems.push(`${route}: unparseable JSON-LD — ${error.message}`);
      continue;
    }
    scanObject(data, "$", route);
    const nodes = Array.isArray(data) ? data : data["@graph"] ?? [data];
    for (const node of nodes) {
      const id = node["@id"];
      if (id) {
        if (graphIds.has(id)) problems.push(`${route}: duplicate JSON-LD @id ${id}`);
        graphIds.add(id);
      }
      if (!node["@type"]) problems.push(`${route}: JSON-LD node without @type`);
    }
  }
  if (!is404 && blocks.length === 0) problems.push(`${route}: no JSON-LD on an indexable page`);
}

// --- sitemap ---
const sitemapDist = path.join(dist, "sitemap.xml");
const sitemapPublic = path.join(publicDir, "sitemap.xml");
if (!existsSync(sitemapDist)) problems.push("dist/sitemap.xml missing");
else {
  const xml = readFileSync(sitemapDist, "utf8");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (locs.length === 0) problems.push("sitemap.xml has no <loc> entries");
  for (const loc of locs) {
    if (!loc.startsWith(`${SITE_ORIGIN}/`)) problems.push(`sitemap: non-canonical origin ${loc}`);
    if (loc.includes("#")) problems.push(`sitemap: fragment in ${loc}`);
    const rel = loc.slice(SITE_ORIGIN.length);
    const target = rel === "/" ? path.join(dist, "index.html") : path.join(dist, rel.replace(/^\//, ""), "index.html");
    if (!existsSync(target)) problems.push(`sitemap: ${loc} has no prerendered file`);
    else if (!canonicals.get(rel === "/" ? "/" : rel.replace(/\/$/, ""))) {
      problems.push(`sitemap: ${loc} does not match a canonical URL in its page`);
    }
  }
  const indexRoutes = canonicals.size;
  if (locs.length !== indexRoutes) problems.push(`sitemap lists ${locs.length} URLs but ${indexRoutes} canonical pages exist`);
  if (existsSync(sitemapPublic) && readFileSync(sitemapPublic, "utf8") !== xml) {
    problems.push("public/sitemap.xml differs from dist/sitemap.xml");
  }
  notes.push(`sitemap: ${locs.length} canonical URLs, mirrored in public/`);
}

// --- robots ---
const robotsFile = path.join(dist, "robots.txt");
if (!existsSync(robotsFile)) problems.push("dist/robots.txt missing");
else {
  const robots = readFileSync(robotsFile, "utf8");
  if (robots.split(/\r?\n/).some((l) => l.trim() === "Disallow: /")) {
    problems.push("robots.txt blanket-disallows all crawlers");
  }
  if (!robots.includes(`Sitemap: ${SITE_ORIGIN}/sitemap.xml`)) problems.push("robots.txt does not reference the sitemap");
  for (const bot of ["Googlebot", "Bingbot", "OAI-SearchBot"]) {
    if (!robots.includes(bot)) problems.push(`robots.txt does not mention ${bot}`);
  }
  notes.push("robots.txt: search + AI-search crawlers allowed, sitemap referenced");
}

// --- social image ---
const ogFile = path.join(dist, "og.png");
if (!existsSync(ogFile)) problems.push("dist/og.png missing");
else {
  const buf = readFileSync(ogFile);
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  notes.push(`og.png: ${width}×${height} (${Math.round(buf.length / 1024)} kB) — declared 1140×838`);
  if (width !== 1140 || height !== 838) {
    problems.push(`og.png is ${width}×${height} but src/seo/site.ts declares 1140×838`);
  }
  if (Math.abs(width / height - 1200 / 630) > 0.05) {
    notes.push("og.png aspect ratio is not 1.91:1 — consider regenerating at 1200×630 for large social cards");
  }
}

console.log(`Validated ${htmlFiles.length} pages, ${jsonLdCount} JSON-LD blocks.`);
for (const note of notes) console.log(`  • ${note}`);
if (problems.length) {
  console.log(`\nPROBLEMS (${problems.length}):`);
  problems.forEach((p) => console.log("  ✗ " + p));
  process.exit(1);
}
console.log("\nOK — metadata, canonicals, JSON-LD, sitemap and robots are consistent.");
