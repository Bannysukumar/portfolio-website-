# Adepu Sukumar — Developer Portfolio (v2)

A premium, editorial dark portfolio for **Adepu Sukumar** ([@Bannysukumar](https://github.com/Bannysukumar)) — full-stack and blockchain developer. Built with React, TypeScript (strict), Vite and GSAP. Every project card maps to public GitHub repositories; live links were verified during research and are marked honestly in the data layer.

## Quick start

```bash
npm install
npm run dev      # dev server (http://localhost:5173, --host for LAN)
npm run build    # type-check + production build + prerender every route to dist/
npm run preview  # serve the production build
npm run lint     # ESLint
```

## Deploying

Static output in `dist/` — one pre-rendered `index.html` per route plus `404.html`, `sitemap.xml` and `robots.txt`. Deploys as-is to Vercel, Netlify, Cloudflare Pages or any static host.

- **Vercel:** framework preset *Vite*, build `npm run build`, output `dist`. `vercel.json` sets `cleanUrls` (no `.html` suffixes) plus security and cache headers.
- **Custom domain:** change `baseUrl` in `src/seo/site.ts` and rebuild — the canonical URL, Open Graph URLs, JSON-LD, `sitemap.xml` and `robots.txt` all derive from it.

No environment variables are required. Optionally set `VITE_INQUIRY_ENDPOINT` to have the contact form POST JSON to your form service; without it the form composes a pre-filled email instead. The site makes no other API calls.

## Architecture

```
src/
  components/        Nav, Hero (+SystemDiagram), StackTicker, Work
                     (ProjectCard, ProjectDialog, LiveIndicator),
                     ProjectDirectory (searchable repository catalogue),
                     Skills, About, Journey, Contact, Footer, Reveal,
                     ServicesSection + ServiceList, PricingSection,
                     FaqSection + FaqList, PageHeader, Breadcrumbs,
                     InquiryForm
  pages/             Home, ServicesPage, PricingPage, FaqPage,
                     ContactPage, ProjectPage, NotFound (+ pages.css)
  data/              profile.ts, projects.ts, directory.ts (generated),
                     business.ts, services.ts, faq.ts, pricing.ts, nav.ts
  seo/               site.ts (baseUrl), schema.ts, meta.ts (route metadata),
                     head.ts, useSeo.ts
  router/            router.tsx — History-API router + link interception
  hooks/             useReveal, useActiveSection, useLockBodyScroll
  styles/            global.css — design tokens ("Ink & Ember")
  types/             project.ts — typed catalogue model
  entry-server.tsx   renderToString entry used by the prerenderer
public/
  images/projects/   real screenshots (captured 19 Oct 2026) + illustrative SVG artwork
scripts/             inventory refresh + verification (Node, no dependencies)
                     prerender.mjs — build-time HTML for every route
vercel.json          clean URLs, security headers, cache policy
```

### Routing

Real, crawlable routes: `/`, `/services`, `/pricing`, `/faq`, `/contact`, `/projects/:id` (18 pages) and a prerendered `404.html`. The router in `src/router/router.tsx` only intercepts same-origin `<a>` clicks; unknown paths render the `NotFound` page. Section links use full `/#id` hrefs so they work from any page.

### Curation layers

- **`src/data/projects.ts`** — the hand-written showcase: 18 detailed projects (6 featured) with narrative, features and repo roles.
- **`src/data/directory.ts`** — generated, canonical directory of **every** public repository (one entry per repo, no duplicates). The homepage stays curated; the `#directory` section is the complete, searchable experience.

### Project catalogue conventions (`src/data/projects.ts`)

- `repos[]` and `live` are separate: a project can have many repositories, one live URL, or none.
- `live.status` is one of `verified-live` (HTTP 200 + render confirmed), `responds-but-unrendered`, `deployment-missing` (recorded but 404), or `source-only`.
- The UI only renders a live link as a clickable affordance for the first two states; otherwise it shows a text status chip.
- `thumbnailIllustrative: true` labels artwork that is *not* a screenshot of the product.

### Refreshing the catalogue

```bash
node scripts/fetch-inventory.cjs     # GitHub API snapshot -> scripts/inventory.json (96 repos)
node scripts/generate-directory.cjs  # merges snapshot + curated overrides -> src/data/directory.ts
node scripts/verify-directory.cjs --http   # coverage + duplicate + HTTP checks of every URL
node scripts/check-links.cjs         # sweeps URLs in projects.ts/profile.ts
```

Refresh workflow, in order:

1. **Inventory** — `node scripts/fetch-inventory.cjs` re-reads `/users/Bannysukumar/repos` with pagination and overwrites `scripts/inventory.json`. It fails loudly on API errors instead of writing a partial file.
2. **Regenerate** — `node scripts/generate-directory.cjs` merges the snapshot with `scripts/directory-overrides.json` (curated display names, tech lines, verified live URLs, notes) and rewrites `src/data/directory.ts`. It is idempotent: one entry per repository, no duplicates, verified by assertion at the end.
3. **Verify** — `node scripts/verify-directory.cjs --http` asserts one canonical entry per inventory repo, no duplicate URLs, valid slug↔URL mapping, then HTTP-checks every repository URL and live URL.
4. **Live URLs** — never invented and never guessed. A `liveUrl` is only written when the deployment returned HTTP 200 (and, where noted, rendered). Add or correct them in `scripts/directory-overrides.json`:
   ```json
   "my-repo": { "display": "My Repo", "tech": "React · Firebase",
                "liveUrl": "https://example.com", "liveStatus": "verified-live" }
   ```
   Broken deployments keep a `note` (e.g. "Domain TLS certificate expired") and get **no** link, so no card ever offers a dead demo.
5. **Showcase** — hand-edit `src/data/projects.ts` for narrative content; the featured six stay as they are unless there is evidence-based reason to change them.
6. **Screenshots** — replace images in `public/images/projects/` (16:10 crops, JPEG q≈82 works well).

Never commit tokens — the GitHub API is accessed unauthenticated for research.

## Accessibility & motion

- Semantic landmarks, skip link, single `h1`, ordered headings, labelled sections.
- Full keyboard support: visible focus rings, Escape closes the project dialog, focus trap and focus restoration in the dialog, Escape closes the mobile menu.
- Status is never color-only (every state carries text).
- `prefers-reduced-motion` disables the hero timeline, marquee, pulse, reveals and diagram signals.
- Directory controls are native `input`/`select`/`button` elements with real labels; results announce through a polite live region ("Showing 24 of 96 repositories"); Load More keeps the button in the DOM.

## Credits

Design, content and code by Adepu Sukumar. Fonts: Fraunces, Inter, IBM Plex Mono (self-hosted via Fontsource). Icons: lucide-react.
## SEO, Metadata & AI Discoverability

Technical SEO and content SEO are built into the site:

- **Prerendered HTML:** Every indexable route (`/`, `/services`, `/pricing`, `/faq`, `/contact` and all 18 project pages) is pre-rendered at build time using `react-dom/server`, and a prerendered `404.html` exists for unknown paths. See `scripts/prerender.mjs` and `src/entry-server.tsx`.
- **Shared head:** Route-specific titles, descriptions, canonical URLs, Open Graph, Twitter Cards, robots (noindex only on 404) and JSON-LD are generated from `src/seo/meta.ts` and serialised by `src/seo/head.ts`. `useSeo` keeps the live document in sync on client-side navigation using `data-seo`-marked tags.
- **Sitemap:** `dist/sitemap.xml` is generated at build time and also written to `public/sitemap.xml` (includes only canonical indexable URLs).
- **Link integrity:** `npm run check:links` asserts that every internal link and in-page anchor in the prerendered HTML resolves to a real route or element id, and that no indexable page is an orphan. `npm run check:seo` validates titles, descriptions, canonical/og:url agreement, JSON-LD (parse, unique `@id`, no invented ratings/reviews/addresses/phone), sitemap coverage and robots.txt.
- **Robots:** `public/robots.txt` explicitly allows traditional search crawlers and AI-search crawlers. Adjust training crawler rules per the file comments if you wish to opt out of model training while keeping search discoverable.
- **Structured data:** One `@graph` per route (Person, WebSite, WebPage, BreadcrumbList; Service/ItemList on Services; FAQPage on FAQ; CreativeWork + ItemList on project routes). No fake reviews, ratings, prices, awards, employment, addresses or LocalBusiness schema.
- **Geographic context:** Service areas are Telangana, Andhra Pradesh, Tamil Nadu and Chennai (service-area only; no physical office). Geographic keywords appear in content and schema, but no doorway city pages.
- **Unconfirmed claims:** `business.typicalProjectValueINR.confirmed=false` and `business.clientsPerMonth.confirmed=false`; these are never rendered on the UI or in any schema. Only the confirmed starting price (₹20,000) is public.
- **Assets:** `public/og.png` is 1140×838 (off the 1200×630 ideal; dimensions declared in `src/seo/site.ts`). Update `SITE.ogImageWidth/Height` after regenerating the image.
- **Known issue:** LinkedIn URLs `/in/adepusukumar/` and `/in/adepu-sukumar-59b423351` return HTTP 999 to bots; ownership cannot be programmatically verified — leave the shipped value as-is and manually confirm if needed.

### Setting up Search Console & Webmaster Tools

- **Google Search Console (GSC):** Create a property for `https://adepu-sukumar.vercel.app` (URL prefix or Domain). Since it's a static site, DNS verification may be easiest with Domain; or upload an HTML verification file if your host allows. Submit `https://adepu-sukumar.vercel.app/sitemap.xml` once verified. Monitor Coverage, Core Web Vitals and "Page indexing" — no verification tokens are stored in code.
- **Bing Webmaster Tools:** Add the same URL and submit the sitemap (`https://adepu-sukumar.vercel.app/sitemap.xml`). Bing also surfaces via API; verification can be done via DNS/meta tag/HTML file — choose the same method as GSC to avoid duplication.
- **AI-search indexing:** `robots.txt` already allows `OAI-SearchBot`, `PerplexityBot`, `Claude-SearchBot`, etc. No additional files (e.g. `llms.txt`) have been added unless needed; the task recommends adding only if concretely justified.
- **Content updates:** After changing copy, rerun `npm run build` (which regenerates prerendered HTML, sitemap and writes `public/sitemap.xml`), then re-submit the sitemap in GSC/Bing.

### Notes for deployment & maintenance

- Base URL is the single source of truth (`src/seo/site.ts`). Change it before building to generate correct canonical/OG/sitemap/robots values.
- Build command: `tsc -b && vite build && node scripts/prerender.mjs`. Type/lint checks must pass (`npx tsc -b && npm run lint`) before shipping.
- Client bundle: directory data is imported by `src/components/ProjectDirectory.tsx` (96 repos) — typical impact (chunk split by Vite); build output is ~316 kB gzipped for the main chunk plus fonts/assets. Acceptable for a portfolio.
- Third-party calls: None at runtime. Fonts self-hosted; no tracking scripts, no external analytics.
