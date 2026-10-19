/**
 * Single source of truth for site identity and canonical URLs.
 *
 * If the production domain changes (for example to a custom domain), update
 * `baseUrl` here, then run `npm run build` — index.html, sitemap.xml, robots.txt
 * and every canonical/Open Graph URL are derived from this value.
 *
 * NOTE: `https://adepu-sukumar.vercel.app` is the currently deployed domain.
 * It is kept in one place precisely because it may change.
 */
export const SITE = {
  baseUrl: "https://adepu-sukumar.vercel.app",
  name: "Adepu Sukumar",
  shortName: "Sukumar",
  locale: "en_IN",
  language: "en",
  /** Social preview image, relative to the site root. */
  ogImage: "/og.png",
  ogImageWidth: 1140,
  ogImageHeight: 838,
  ogImageAlt: "Adepu Sukumar — independent freelance software developer",
} as const;

/** Absolute canonical URL for a path (hash and query removed). */
export function canonicalUrl(path: string): string {
  const clean = stripToPath(path);
  return `${SITE.baseUrl}${clean === "/" ? "/" : clean}`;
}

/** "/projects/x#y?z" -> "/projects/x" */
export function stripToPath(input: string): string {
  let path = (input || "/").split("#")[0].split("?")[0];
  if (!path.startsWith("/")) path = `/${path}`;
  path = path.replace(/\/{2,}/g, "/");
  if (path.length > 1) path = path.replace(/\/+$/, "");
  return path || "/";
}
