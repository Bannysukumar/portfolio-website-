/* Link-verification sweep: checks every URL referenced in src/data/projects.ts */
const fs = require('fs');

const src = fs
  .readFileSync('src/data/projects.ts', 'utf8')
  .replace(/\$\{GH\}/g, 'https://github.com/Bannysukumar');
const profile = fs.readFileSync('src/data/profile.ts', 'utf8');
const all = src + '\n' + profile;
const urls = [...new Set([...all.matchAll(/https?:\/\/[^'"\s)`;]+/g)].map((m) => m[0]))];

const UA = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
};

async function check(url) {
  try {
    const res = await fetch(url, { method: 'GET', redirect: 'follow', headers: UA, signal: AbortSignal.timeout(15000) });
    return { url, status: res.status };
  } catch (err) {
    return { url, status: 'ERR ' + String(err.cause?.code || err.message).slice(0, 50) };
  }
}

(async () => {
  const results = [];
  for (let i = 0; i < urls.length; i += 6) {
    results.push(...(await Promise.all(urls.slice(i, i + 6).map(check))));
  }
  for (const r of results) console.log(String(r.status).padEnd(8), r.url);
  const bad = results.filter((r) => r.status !== 200 && r.status !== 301 && r.status !== 302 && r.status !== 304);
  console.log('\nTotal:', results.length, '| Non-200:', bad.length);
  fs.writeFileSync('link-check-results.json', JSON.stringify(results, null, 2));
})();
