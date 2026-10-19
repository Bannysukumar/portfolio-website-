/**
 * Navigation model. Links are either in-page sections on the homepage
 * (`/#work`) or real routes (`/services`). Section links always carry the full
 * `/#id` path so they behave correctly from any page, while still giving
 * crawlers a real, crawlable href.
 */

export interface NavLink {
  label: string;
  href: string;
  /** "section" scrolls on the homepage; "page" is a prerendered route. */
  kind: "section" | "page";
  /** Section id for hash links, or route path for pages. */
  id: string;
}

/** Primary navigation — kept to six items so it fits the header at every width. */
export const navLinks: NavLink[] = [
  { label: "Work", href: "/#work", kind: "section", id: "work" },
  { label: "Services", href: "/services", kind: "page", id: "/services" },
  { label: "Pricing", href: "/pricing", kind: "page", id: "/pricing" },
  { label: "Directory", href: "/#directory", kind: "section", id: "directory" },
  { label: "FAQ", href: "/faq", kind: "page", id: "/faq" },
  { label: "Contact", href: "/#contact", kind: "section", id: "contact" },
];

/** Full sitemap used in the footer. */
export const footerLinks: NavLink[] = [
  { label: "Home", href: "/", kind: "page", id: "/" },
  { label: "Selected work", href: "/#work", kind: "section", id: "work" },
  { label: "Services", href: "/services", kind: "page", id: "/services" },
  { label: "Pricing", href: "/pricing", kind: "page", id: "/pricing" },
  { label: "Project directory", href: "/#directory", kind: "section", id: "directory" },
  { label: "Skills", href: "/#skills", kind: "section", id: "skills" },
  { label: "About", href: "/#about", kind: "section", id: "about" },
  { label: "Journey", href: "/#journey", kind: "section", id: "journey" },
  { label: "FAQ", href: "/faq", kind: "page", id: "/faq" },
  { label: "Contact", href: "/contact", kind: "page", id: "/contact" },
];

/** Homepage sections observed for nav highlighting. */
export const SECTION_IDS = ["work", "directory", "skills", "about", "journey", "contact"] as const;
