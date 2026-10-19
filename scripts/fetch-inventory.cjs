/* Enumerates every public repository for Bannysukumar via the GitHub API (paginated)
   and writes scripts/inventory.json. Unauthenticated; 60 requests/hour limit — 2 pages is plenty. */
const fs = require('fs');

const UA = { 'User-Agent': 'portfolio-inventory-script', Accept: 'application/vnd.github+json' };

(async () => {
  const repos = [];
  let page = 1;
  for (;;) {
    const url = `https://api.github.com/users/Bannysukumar/repos?per_page=100&page=${page}&type=public`;
    const res = await fetch(url, { headers: UA, signal: AbortSignal.timeout(20000) });
    if (!res.ok) throw new Error(`GitHub API ${res.status} on page ${page}`);
    const batch = await res.json();
    repos.push(...batch);
    if (batch.length < 100) break;
    page++;
  }
  const slim = repos.map((r) => ({
    name: r.name,
    url: r.html_url,
    description: r.description,
    language: r.language,
    topics: r.topics || [],
    stars: r.stargazers_count,
    forks: r.forks_count,
    updated: r.pushed_at,
    archived: r.archived,
    fork: r.fork,
    homepage: r.homepage || null,
    isFork: r.fork,
  }));
  fs.writeFileSync('scripts/inventory.json', JSON.stringify(slim, null, 2));
  console.log('repos:', slim.length);
  console.log('forks:', slim.filter((r) => r.fork).length, '| archived:', slim.filter((r) => r.archived).length);
  console.log('with description:', slim.filter((r) => r.description).length);
  console.log('with homepage:', slim.filter((r) => r.homepage).length);
  console.log('languages:', JSON.stringify(slim.reduce((a, r) => { const k = r.language || 'none'; a[k] = (a[k] || 0) + 1; return a; }, {})));
})();
