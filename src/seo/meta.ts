import {
  breadcrumbNode,
  faqNode,
  personNode,
  projectListNodes,
  projectNode,
  serviceCatalogNode,
  webPageNode,
  websiteNode,
} from "./schema";
import { projects } from "../data/projects";
import { serviceAreasSentence } from "../data/business";

/**
 * Route metadata: one entry per indexable page. Used by two consumers that
 * must never disagree:
 *   1. scripts/prerender.mjs — writes the static <head> for each route.
 *   2. the client `useSeo` hook — keeps the head in sync during in-app
 *      navigation.
 */

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  ogType: "website" | "article" | "profile";
  noindex?: boolean;
  breadcrumbs?: { name: string; path: string }[];
  /** JSON-LD nodes; assembled into a single @graph by the head module. */
  jsonLd: Record<string, unknown>[];
}

const HOME_DESCRIPTION =
  "Freelance software developer Adepu Sukumar builds websites and web apps for businesses in Telangana, Andhra Pradesh and Tamil Nadu. Projects start at ₹20,000.";

/** Static, human-authored routes. */
export const staticRoutes = ["/", "/services", "/pricing", "/faq", "/contact"] as const;

/** Every route that should be prerendered, indexed and listed in the sitemap. */
export function allRoutes(): string[] {
  return [...staticRoutes, ...projects.map((project) => `/projects/${project.id}`)];
}

/** Connector words that read badly at the end of a truncated description. */
const DANGLING_WORDS =
  /\s+(?:a|an|and|as|at|by|for|from|in|into|is|of|on|or|that|the|their|to|while|which|with|your|through|about|over|under|between)$/i;

/**
 * Truncates a description to roughly 160 characters without cutting mid-word.
 * Prefers a sentence boundary; otherwise cuts on a word boundary, drops a
 * half-cut proper noun and any dangling connector, and appends an ellipsis.
 */
function trim(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;

  const cut = clean.slice(0, max - 1);
  const sentenceEnd = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("! "), cut.lastIndexOf("? "));
  if (sentenceEnd >= max * 0.5) return cut.slice(0, sentenceEnd + 1);

  let out = cut.replace(/\s+\S*$/, "");
  const dropped = cut.slice(out.length).trim();
  const lastWord = out.slice(out.lastIndexOf(" ") + 1);
  // "Tamil Nadu" cut to "Tamil Na" would leave a broken place name behind.
  if (/^[A-Z]/.test(dropped) && /^[A-Z]/.test(lastWord)) {
    out = out.replace(/\s+\S*$/, "");
  }
  while (DANGLING_WORDS.test(out)) out = out.replace(DANGLING_WORDS, "");
  out = out.replace(/[\s,;:.!?-]+$/, "");
  return `${out}…`;
}

/** Shared head-of-graph nodes present on every page. */
function baseNodes() {
  return [personNode(), websiteNode()];
}

export function getMeta(inputPath: string): RouteMeta {
  const path = normalizeRoute(inputPath);

  if (path === "/") {
    const meta: RouteMeta = {
      path,
      title: "Adepu Sukumar | Freelance Software Developer in South India",
      description: HOME_DESCRIPTION,
      ogType: "website",
      jsonLd: [
        ...baseNodes(),
        webPageNode({ path, title: "Adepu Sukumar | Freelance Software Developer", description: HOME_DESCRIPTION }),
        ...projectListNodes(projects),
      ],
    };
    return meta;
  }

  if (path === "/services") {
    const description = trim(
      `Freelance web & software services for businesses in ${serviceAreasSentence()} — websites, web apps, APIs and dashboards.`,
    );
    return {
      path,
      title: "Services — Freelance Web & Software Development | Adepu Sukumar",
      description,
      ogType: "website",
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
      ],
      jsonLd: [
        ...baseNodes(),
        webPageNode({ path, title: "Freelance software development services", description }),
        breadcrumbNode([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]),
        serviceCatalogNode(),
      ],
    };
  }

  if (path === "/pricing") {
    const description =
      "Custom software development projects start at ₹20,000. See what affects the price, what a written quote includes, and how to request an estimate.";
    return {
      path,
      title: "Pricing — Custom Software Projects from ₹20,000 | Adepu Sukumar",
      description,
      ogType: "website",
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Pricing", path: "/pricing" },
      ],
      jsonLd: [
        ...baseNodes(),
        webPageNode({ path, title: "Pricing", description }),
        breadcrumbNode([
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ]),
        serviceCatalogNode(),
      ],
    };
  }

  if (path === "/faq") {
    const description = trim(
      "Answers about the services offered, pricing from ₹20,000, working directly with clients, service regions, and how to request a project estimate.",
    );
    return {
      path,
      title: "FAQ — Working with Freelance Developer Adepu Sukumar",
      description,
      ogType: "website",
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "FAQ", path: "/faq" },
      ],
      jsonLd: [
        ...baseNodes(),
        webPageNode({ path, title: "Frequently asked questions", description }),
        breadcrumbNode([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ]),
        faqNode(),
      ],
    };
  }

  if (path === "/contact") {
    const description =
      "Tell me what you need built. Share the project type, key features, budget and timeline, and get an honest read on scope and price.";
    return {
      path,
      title: "Contact — Start a Software Project | Adepu Sukumar",
      description,
      ogType: "website",
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
      ],
      jsonLd: [
        ...baseNodes(),
        webPageNode({ path, title: "Contact", description }),
        breadcrumbNode([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]),
      ],
    };
  }

  const project = projects.find((item) => path === `/projects/${item.id}`);
  if (project) {
    const description = trim(project.description);
    const title = `${project.title} — ${project.category} | Adepu Sukumar`;
    return {
      path,
      title,
      description,
      ogType: "article",
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Projects", path: "/#work" },
        { name: project.title, path },
      ],
      jsonLd: [
        ...baseNodes(),
        webPageNode({ path, title: project.title, description }),
        breadcrumbNode([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/#work" },
          { name: project.title, path },
        ]),
        projectNode(project),
      ],
    };
  }

  return notFoundMeta(path);
}

export function notFoundMeta(path: string): RouteMeta {
  return {
    path: normalizeRoute(path),
    title: "Page not found | Adepu Sukumar",
    description:
      "That page does not exist. Browse the project directory, or contact Adepu Sukumar about a website or software project.",
    ogType: "website",
    noindex: true,
    jsonLd: [],
  };
}

/** Normalises a raw pathname to a canonical route key. */
export function normalizeRoute(input: string): string {
  let path = (input || "/").split("#")[0].split("?")[0];
  if (!path.startsWith("/")) path = `/${path}`;
  path = path.replace(/\/{2,}/g, "/");
  if (path.length > 1) path = path.replace(/\/+$/, "");
  return path || "/";
}
