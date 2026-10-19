/* Verifies src/data/directory.ts against the GitHub inventory:
 *   1. every inventory repo has exactly one canonical directory entry
 *   2. no duplicate repository URLs
 *   3. every repository URL is correct (repo name matches, no typos)
 *   4. HTTP-checks every repository URL and every live URL
 * Usage: node scripts/verify-directory.cjs [--http]
 */
const fs = require('fs');

const inv = JSON.parse(fs.readFileSync('scripts/inventory.json', 'utf8'));
const src = fs.readFileSync('src/data/directory.ts', 'utf8');

const entries = [...src.matchAll(/name: "([^"]+)",\n\s+url: "([^"]+)"/g)].map((m) => ({ name: m[1], url: m[2] }));
const liveUrls = [...src.matchAll(/url: "(https:\/\/github\.com\/[^"]+)",[\s\S]{0,600}?liveUrl: "([^"]+)"/g)].map((m) => ({
  repo: m[1].split('/').pop(),
  liveUrl: m[2],
}));

const problems = [];
const urls = entries.map((e) => e.url);

// 1 + 2
const invUrls = new Set(inv.map((r) => `https://github.com/Bannysukumar/${r.name}`));
const dupeUrls = urls.filter((u, i) => urls.indexOf(u) !== i);
if (dupeUrls.length) problems.push(`duplicate URLs: ${dupeUrls.join(', ')}`);
const missing = [...invUrls].filter((u) => !urls.includes(u));
if (missing.length) problems.push(`inventory repos missing from directory: ${missing.join(', ')}`);
const extra = urls.filter((u) => !invUrls.has(u));
if (extra.length) problems.push(`directory entries not in inventory: ${extra.join(', ')}`);

// 3
for (const e of entries) {
  const slug = decodeURIComponent(e.url.split('/').pop());
  if (!inv.some((r) => r.name === slug)) problems.push(`URL slug does not match a repo: ${e.url}`);
}

console.log(`directory entries : ${entries.length}`);
console.log(`inventory repos   : ${inv.length}`);
console.log(`live URLs listed  : ${liveUrls.length}`);
console.log(problems.length ? `PROBLEMS:\n - ${problems.join('\n - ')}` : 'Coverage: OK — 1 canonical entry per inventory repo, no duplicates, all slugs valid');

if (process.argv.includes('--http')) {
  const UA = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126 Safari/537.36' };
  const check = async (url) => {
    try {
      const res = await fetch(url, { redirect: 'follow', headers: UA, signal: AbortSignal.timeout(20000) });
      return { url, status: res.status };
    } catch (err) {
      return { url, status: 'ERR ' + String(err.cause?.code || err.message).slice(0, 40) };
    }
  };
  (async () => {
    const targets = [...new Set([...urls, ...liveUrls.map((l) => l.liveUrl)])];
    const results = [];
    for (let i = 0; i < targets.length; i += 6) {
      results.push(...(await Promise.all(targets.slice(i, i + 6).map(check))));
    }
    const bad = results.filter((r) => r.status !== 200);
    console.log(`\nHTTP: ${results.length} URLs checked, ${bad.length} non-200`);
    bad.forEach((b) => console.log('  ', b.status, b.url));
    fs.writeFileSync('link-check-results.json', JSON.stringify(results, null, 2));
  })();
}
