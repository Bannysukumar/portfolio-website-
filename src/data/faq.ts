import { business, serviceAreasSentence } from "./business";
import { services } from "./services";

/**
 * Client-facing FAQ. Answers must match the visible page exactly — the same
 * array feeds both the rendered section and the FAQPage structured data, so
 * the markup can never disagree with the content.
 *
 * Nothing here is invented: answers restate the services catalogue, the pricing
 * policy and the public repository inventory.
 */

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    id: "what-services",
    question: "What software development services does Adepu Sukumar provide?",
    answer:
      "Website design and development, custom web applications, frontend work in React and Next.js, backend and API development, database design and integration, authentication and authorization, admin dashboards, third-party API integration, maintenance of existing applications, smart-contract and Web3 work, and Android/mobile-web builds. Each service is described in full, with examples from the public repositories, on the services page.",
  },
  {
    id: "how-much",
    question: "How much does a freelance software development project cost?",
    answer:
      "Custom software development projects start at ₹20,000. The final price depends on features, complexity, integrations, design requirements, and delivery scope. A written estimate is provided after the requirements are understood, so the number is tied to a defined scope rather than a guess.",
  },
  {
    id: "starting-budget",
    question: "What is the starting project budget?",
    answer:
      "The starting point is ₹20,000 for a custom project. Small, well-defined pieces of work can be quoted at that level; larger applications with accounts, admin areas or several integrations are quoted above it once the scope is clear.",
  },
  {
    id: "direct-clients",
    question: "Does Adepu Sukumar work directly with clients?",
    answer: `Yes. ${business.modelDetail} You deal with the developer who writes the code, from the first conversation through to deployment and handover.`,
  },
  {
    id: "regions",
    question: "Which regions does he serve?",
    answer: `Services are available to clients in ${serviceAreasSentence()} — described as service areas, with remote and direct collaboration rather than a physical office in each location. Work is carried out remotely and coordinated directly with the client.`,
  },
  {
    id: "custom-web-app",
    question: "Can clients discuss a custom web application?",
    answer:
      "Yes. Custom web applications are the core of the offering — portals and marketplaces, management systems and dashboards, products with user accounts and admin areas. A first conversation to describe the workflow and the users is the usual starting point.",
  },
  {
    id: "request-estimate",
    question: "How can a client request a project estimate?",
    answer:
      "Use the enquiry form on the contact page, or email directly. Share what the software needs to do, who will use it, any required integrations and a rough timeline. You will get an honest read on scope, a fixed or staged price where possible, and a proposed delivery order.",
  },
  {
    id: "view-projects",
    question: "Where can his completed projects and source code be viewed?",
    answer:
      "The work section shows selected projects with live links where a deployment is verified, and the full project directory covers every public repository — searchable by name, description, language and topic. Source code for all of it is public on GitHub at github.com/Bannysukumar.",
  },
  {
    id: "technologies",
    question: "What technologies does he work with?",
    answer:
      "On the front end: React, Next.js, TypeScript, Tailwind CSS and MUI. On the backend: FastAPI, Spring Boot, Node.js and PHP (CodeIgniter). For data: PostgreSQL, MongoDB, Firebase/Firestore, Redis and RabbitMQ. For Web3: Solidity, Hardhat, OpenZeppelin and ethers.js. Deployment and tooling: Docker, Vercel, Firebase Hosting and Capacitor for Android.",
  },
  {
    id: "timeline",
    question: "How long does a project take?",
    answer:
      "It depends on scope, so a timeline is agreed in writing before work starts rather than promised up front. Small, well-defined pieces of work move quickly; larger applications with accounts, admin areas and integrations take longer and are usually delivered in stages so you can see progress early.",
  },
  {
    id: "what-to-provide",
    question: "What should a client provide to get started?",
    answer:
      "A description of what the software should do and who will use it, any existing designs or brand assets, sample data or spreadsheets that show the real structure, details of any services it must connect to, and a rough idea of budget and timeline. If some of that is not decided yet, that is normal — it can be worked out together.",
  },
  {
    id: "ongoing-support",
    question: "Is ongoing support available after delivery?",
    answer:
      "Yes. Improvements and maintenance for existing applications are an offered service — bug fixes, performance work, feature additions, dependency upgrades and deployment documentation. Support can be arranged as small pieces of work or as an ongoing arrangement, depending on what the project needs.",
  },
];

/** A short subset for the homepage, linking to the full FAQ page. */
export const featuredFaqIds = ["what-services", "how-much", "direct-clients", "regions"] as const;

export const featuredFaqs: FaqItem[] = featuredFaqIds
  .map((id) => faqs.find((item) => item.id === id))
  .filter((item): item is FaqItem => item !== undefined);

/** Sanity guard used by the SEO meta layer: questions must have answers. */
export const serviceCount = services.length;
