/* Reconciliation: GitHub inventory vs existing catalogue entries. */
const fs = require('fs');

const inv = JSON.parse(fs.readFileSync('scripts/inventory.json', 'utf8'));
const src = fs.readFileSync('src/data/projects.ts', 'utf8');

// Repo names referenced by detailed projects (repos: [ { name: ... } ]) — crude but accurate for this file shape.
const projectRepoNames = [...src.matchAll(/name: "([^"]+)",\r?\n\s+url: `\$\{GH\}\/([^`"]+)/g)].map((m) => m[2]);
// Directory entries: name + url
const dirEntries = [...src.matchAll(/\{ name: "([^"]+)", url: `\$\{GH\}\/([^`]+)`[^}]*\}/g)].map((m) => ({ name: m[1], repo: m[2] }));

const invNames = new Set(inv.map((r) => r.name));
const projectSet = new Set(projectRepoNames);
const dirSet = new Set(dirEntries.map((e) => e.repo));

const dupes = dirEntries.filter((e, i, a) => a.findIndex((x) => x.repo === e.repo) !== i);
const inBoth = [...dirSet].filter((n) => projectSet.has(n));
const missing = inv.filter((r) => !dirSet.has(r.name) && !projectSet.has(r.name));
const ghostDir = [...dirSet].filter((n) => !invNames.has(n));
const ghostProj = [...projectSet].filter((n) => !invNames.has(n));

console.log('inventory:', inv.length);
console.log('project repos:', projectSet.size, '| dir entries:', dirSet.size);
console.log('dupe dir entries:', dupes.map((d) => d.repo));
console.log('repos in BOTH projects and dir:', inBoth);
console.log('MISSING from catalogue (' + missing.length + '):');
missing.forEach((r) => console.log('  -', r.name, '|', r.language, '|', (r.description || '').slice(0, 70)));
console.log('dir ghosts (not on GitHub):', ghostDir);
console.log('project ghosts:', ghostProj);
console.log('union covered:', new Set([...dirSet, ...projectSet]).size);
const stars = inv.reduce((a, r) => a + r.stars, 0);
console.log('total stars:', stars, '| repos with >0 stars:', inv.filter((r) => r.stars > 0).length);
console.log('repos without description:', inv.filter((r) => !r.description).map((r) => r.name));
console.log('topics present:', inv.filter((r) => r.topics.length).length, '| total distinct topics:', new Set(inv.flatMap((r) => r.topics)).size);
