import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const dist = path.resolve("dist");

/** Every prerendered HTML file under dist/. */
function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (entry.endsWith(".html")) out.push(full);
  }
  return out;
}

const htmlFiles = walk(dist);
const problems = [];
let checked = 0;
let anchors = 0;

/** Inbound internal-link counts, used to catch orphan pages. */
const inbound = new Map();
const routeOf = (file) =>
  "/" + path.relative(dist, file).replace(/\\/g, "/").replace(/index\.html$/, "").replace(/\/$/, "");

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const rel = path.relative(dist, file).replace(/\\/g, "/");
  const route = "/" + rel.replace(/index\.html$/, "").replace(/\/$/, "");

  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));

  for (const [, href] of html.matchAll(/<a\s[^>]*href="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|sms:)/.test(href)) continue;

    if (href.startsWith("#")) {
      anchors++;
      const id = href.slice(1);
      if (id && !ids.has(id)) problems.push(`${route}: anchor ${href} has no target in this document`);
      continue;
    }

    checked++;
    const [pure, hash] = href.split("#");
    const clean = pure.replace(/^\//, "").replace(/\/$/, "");

    // Destination document: "/" -> dist/index.html, "/services" -> its index.html.
    let dest;
    if (!clean) dest = path.join(dist, "index.html");
    else if (existsSync(path.join(dist, clean, "index.html"))) dest = path.join(dist, clean, "index.html");
    else if (existsSync(path.join(dist, clean))) dest = path.join(dist, clean);
    else {
      problems.push(`${route}: dead internal link ${href}`);
      continue;
    }

    if (dest !== file) inbound.set(routeOf(dest), (inbound.get(routeOf(dest)) ?? 0) + 1);

    if (hash) {
      const destIds = new Set([...readFileSync(dest, "utf8").matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
      if (!destIds.has(hash)) {
        problems.push(`${route}: ${href} → #${hash} not found in ${path.relative(dist, dest)}`);
      }
    }
  }
}

// Orphan detection: every indexable route should be reachable from another page.
for (const file of htmlFiles) {
  const route = routeOf(file);
  if (route.endsWith(".html")) continue; // 404.html is noindex, never linked
  if (!inbound.has(route)) problems.push(`${route}: no inbound internal links (orphan page)`);
}

console.log(`Checked ${checked} internal links and ${anchors} in-page anchors across ${htmlFiles.length} files.`);
if (problems.length) {
  console.log(`PROBLEMS (${problems.length}):`);
  problems.forEach((p) => console.log("  " + p));
  process.exit(1);
}
console.log("OK — all internal links and anchors resolve.");
