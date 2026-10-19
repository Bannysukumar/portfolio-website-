/* One-time extraction of curated directory entries from src/data/projects.ts
   into scripts/directory-overrides.json (committed, hand-editable afterwards). */
const fs = require('fs');

const src = fs.readFileSync('src/data/projects.ts', 'utf8');

// Curated one-liner entries
const dirMatches = [...src.matchAll(/\{ name: "([^"]+)", url: `\$\{GH\}\/([^`]+)`, tech: "([^"]+)"(?:, liveUrl: "([^"]+)")?(?:, note: "([^"]+)")? \}/g)];
const overrides = {};
for (const m of dirMatches) {
  overrides[m[2]] = { display: m[1], tech: m[3] };
  if (m[4]) overrides[m[2]].liveUrl = m[4];
  if (m[5]) overrides[m[2]].note = m[5];
}

// Project-linked repos: inherit the project's live URL (verified statuses only).
// [^\]]* ensures the match never bridges across a project that has no live block.
const repoBlock = /repos: \[([^\]]*)\],\s*live: \{\s*url: "([^"]+)",\s*status: "([^"]+)",(?:\s*note: "([^"]+)")?/g;
for (const m of src.matchAll(repoBlock)) {
  const repoNames = [...m[1].matchAll(/url: `\$\{GH\}\/([^`"]+)/g)].map((x) => x[1]);
  const status = m[3];
  if (status === "verified-live" || status === "responds-but-unrendered") {
    // The deployment belongs to the frontend repo — the first listed repo.
    const first = repoNames[0];
    if (first && !overrides[first]) {
      overrides[first] = { display: undefined, liveUrl: m[2], liveStatus: status };
      if (m[4]) overrides[first].note = m[4];
    }
  }
}

fs.writeFileSync('scripts/directory-overrides.json', JSON.stringify(overrides, null, 2));
console.log('overrides written:', Object.keys(overrides).length);
console.log('with liveUrl:', Object.values(overrides).filter((o) => o.liveUrl).length);
