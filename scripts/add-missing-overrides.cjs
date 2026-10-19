/* One-off: add curated display names for the 14 repos that were missing from
 * the catalogue, plus the verified live URL for portfolio-security-service. */
const fs = require('fs');

const file = 'scripts/directory-overrides.json';
const o = JSON.parse(fs.readFileSync(file, 'utf8'));

const add = {
  assets: { display: 'Crypto Token Reference' },
  Bannysukumar: { display: 'Profile README' },
  'Blockchain-Solidity': { display: 'Blockchain Solidity Coursework' },
  'bxc-mining-app': { display: 'BXC Mining App' },
  'mytree-website': { display: 'Mytree Ecosystem Website' },
  'pin-token': { display: 'Pin Token' },
  PMATv: { display: 'PMATv (second copy of PMTv)' },
  'portfolio-security-service': {
    display: 'Singha Security Services Site',
    liveUrl: 'https://portfolio-security-service.vercel.app',
    liveStatus: 'responds-but-unrendered',
  },
  Pratice: { display: 'Java Practice Notes' },
  product: { display: 'Shopping Community Site' },
  'product-2': { display: 'Product 2' },
  sample: { display: 'Sample' },
  trustnft: { display: 'TrustNFT DApp' },
  Web3Todaywebsite: { display: 'Web3Today & Publications Clients' },
};

let added = 0;
for (const [key, val] of Object.entries(add)) {
  if (!o[key]) added++;
  o[key] = { ...o[key], ...val };
}
fs.writeFileSync(file, JSON.stringify(o, null, 2));
console.log('overrides now:', Object.keys(o).length, `(added ${added})`);
