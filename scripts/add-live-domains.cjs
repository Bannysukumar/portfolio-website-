/* One-off: attach the user-supplied live domains to their repositories.
 * Every URL below was checked on 19 Oct 2026 (HTTP status + browser render).
 * Domains with no matching public repository are reported, not invented. */
const fs = require('fs');

const file = 'scripts/directory-overrides.json';
const o = JSON.parse(fs.readFileSync(file, 'utf8'));

Object.assign(o, {
  'mytree-website': {
    ...o['mytree-website'],
    liveUrl: 'https://mytree.info',
    liveStatus: 'verified-live',
  },
  'Telugu-Earning-Hub': {
    ...o['Telugu-Earning-Hub'],
    liveUrl: 'https://teluguearninghub.live',
    liveStatus: 'verified-live',
  },
  'rich-pay-mlm-website': {
    ...o['rich-pay-mlm-website'],
    liveUrl: 'https://richpay.live',
    liveStatus: 'responds-but-unrendered',
  },
  'malaysiantradenets.com-mlm-website': {
    ...o['malaysiantradenets.com-mlm-website'],
    note: "Domain TLS certificate expired (checked 19 Oct 2026) — no live link offered",
  },
  'thanvish.com': {
    ...o['thanvish.com'],
    note: 'Domain thanvish.travel currently serves a parking/lander redirect — no live link offered',
  },
});

fs.writeFileSync(file, JSON.stringify(o, null, 2));
console.log('overrides:', Object.keys(o).length, '| with liveUrl:', Object.values(o).filter((v) => v.liveUrl).length);
