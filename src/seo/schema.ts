import { SITE, canonicalUrl } from "./site";
import { profile } from "../data/profile";
import { business } from "../data/business";
import { services } from "../data/services";
import { faqs } from "../data/faq";
import type { Project } from "../types/project";

/**
 * JSON-LD builders. Every value here is a known fact about the person, the
 * site or the projects — no ratings, reviews, prices, awards, employment or
 * addresses that do not exist.
 *
 * Entities are linked by `@id` and assembled into a single `@graph` by the
 * head renderer, so Person and WebSite are declared once and referenced
 * elsewhere.
 */

type Node = Record<string, unknown>;

const PERSON_ID = `${SITE.baseUrl}/#person`;
const WEBSITE_ID = `${SITE.baseUrl}/#website`;
const SERVICE_CATALOG_ID = `${SITE.baseUrl}/#services`;

const KNOWS_ABOUT = [
  "Web application development",
  "React",
  "Next.js",
  "TypeScript",
  "FastAPI",
  "Spring Boot",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
  "Firebase",
  "Docker",
  "Solidity",
];

/** Person entity for the developer. */
export function personNode(): Node {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: profile.name,
    url: `${SITE.baseUrl}/`,
    jobTitle: business.positioning,
    description: `${business.positioning} with ${business.experienceYears} years of freelancing experience, building websites and software applications for clients across South India.`,
    knowsAbout: KNOWS_ABOUT,
    sameAs: [profile.github, profile.linkedin],
    // A service-area arrangement; no physical address is claimed.
    areaServed: business.serviceAreas.map(areaNode),
  };
}

/** WebSite entity, linked back to the Person as author and publisher. */
export function websiteNode(): Node {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE.baseUrl}/`,
    name: `${profile.name} — ${business.positioning}`,
    inLanguage: SITE.language,
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
  };
}

/** WebPage entity for an individual route. */
export function webPageNode(meta: { path: string; title: string; description: string }): Node {
  const url = canonicalUrl(meta.path);
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: meta.title,
    description: meta.description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
    inLanguage: SITE.language,
  };
}

/** BreadcrumbList for a route. */
export function breadcrumbNode(items: { name: string; path: string }[]): Node {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}

function areaNode(area: { name: string; schemaType: "State" | "City"; parent?: string }): Node {
  if (area.schemaType === "City" && area.parent) {
    return {
      "@type": "City",
      name: area.name,
      containedInPlace: { "@type": "State", name: area.parent },
    };
  }
  return { "@type": "State", name: area.name };
}

/** One Service node for a service in the catalogue. */
export function serviceNode(service: (typeof services)[number]): Node {
  return {
    "@type": "Service",
    "@id": `${SITE.baseUrl}/services#${service.id}`,
    name: service.title,
    serviceType: service.title,
    description: service.summary,
    provider: { "@id": PERSON_ID },
    areaServed: business.serviceAreas.map(areaNode),
  };
}

/** ItemList wrapping every service, referenced from the services page. */
export function serviceCatalogNode(): Node {
  return {
    "@type": "ItemList",
    "@id": SERVICE_CATALOG_ID,
    name: "Freelance software development services",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: serviceNode(service),
    })),
  };
}

/** FAQPage — mirrors the visible FAQ exactly. */
export function faqNode(): Node {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** CreativeWork for a project page, linked to its public source. */
export function projectNode(project: Project): Node {
  const path = `/projects/${project.id}`;
  const url = canonicalUrl(path);
  const node: Node = {
    "@type": "CreativeWork",
    "@id": `${url}#project`,
    name: project.title,
    description: project.description,
    url,
    author: { "@id": PERSON_ID },
    creator: { "@id": PERSON_ID },
    keywords: project.stack.join(", "),
    genre: project.category,
    isPartOf: { "@id": WEBSITE_ID },
    codeRepository: project.repos[0]?.url,
    programmingLanguage: project.repos.map((repo) => repo.language),
  };
  if (project.live && project.live.status !== "deployment-missing") {
    node.sameAs = project.live.url;
  }
  return node;
}

/** ItemList of project pages, for the work/portfolio surface. */
export function projectListNodes(projects: Project[]): Node[] {
  return [
    {
      "@type": "ItemList",
      "@id": `${SITE.baseUrl}/#projects`,
      name: "Selected projects",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: canonicalUrl(`/projects/${project.id}`),
        name: project.title,
      })),
    },
    ...projects.map(projectNode),
  ];
}
