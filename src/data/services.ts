/**
 * Services offered as a freelancer. Every service is supported by projects in
 * the public catalogue — `evidence` references things that can actually be
 * inspected. Specialities that the portfolio does not evidence (enterprise
 * consulting, security audits, AI product consulting) are deliberately absent.
 *
 * See README ("Services scope") for the reasoning behind what is and is not
 * advertised.
 */

export interface ServiceEvidence {
  /** Human label, e.g. a project name. */
  label: string;
  /** What it demonstrates, and where to look. */
  detail: string;
  /** Optional internal project route for a deeper read. */
  projectId?: string;
}

export interface Service {
  id: string;
  title: string;
  /** One-line hook. */
  tagline: string;
  /** Two or three factual sentences. */
  summary: string;
  /** What the engagement includes. */
  includes: string[];
  /** The business problems it solves. */
  problems: string[];
  /** What the client should be ready to provide. */
  clientProvides: string[];
  /** What moves the cost and the timeline. */
  costFactors: string[];
  /** Public projects that evidence this service. */
  evidence: ServiceEvidence[];
}

export const services: Service[] = [
  {
    id: "website-development",
    title: "Website design & development",
    tagline: "Fast, responsive business websites with a clear path to contact.",
    summary:
      "Marketing and business websites built end to end — layout, front-end, hosting configuration and the content structure that makes the site easy to navigate. Everything is responsive, keyboard-accessible and tuned to load quickly on a phone.",
    includes: [
      "Custom, mobile-first responsive layout built for your content",
      "Semantic, accessible markup (keyboard navigation, focus states, reduced-motion support)",
      "Performance-minded delivery — small bundles, optimised images, no needless libraries",
      "SEO-ready foundations: page titles, descriptions, canonical URLs, structured data",
      "Contact and enquiry paths, with an optional enquiry form",
      "Deployment to Vercel, Netlify, Cloudflare Pages or any static host",
    ],
    problems: [
      "The current site is dated, slow, or breaks on phones.",
      "Visitors cannot find a clear way to enquire or book.",
      "The site cannot be updated without a developer.",
    ],
    clientProvides: [
      "Brand basics: logo, colour preferences and any existing guidelines",
      "The pages you need, with copy where it exists (I can help shape the rest)",
      "Images or photography you own the rights to",
      "Domain and DNS access, so the site can go live on your address",
    ],
    costFactors: [
      "Number of distinct page designs rather than pages that reuse a layout",
      "Whether copywriting or content restructuring is part of the work",
      "Photography, illustration or custom graphics",
      "Animation and interactive elements",
      "CMS versus static content",
    ],
    evidence: [
      {
        label: "PelliMandapam — venue marketplace website",
        detail: "Public site with venue browsing, comparison and booking pages, built in Next.js.",
        projectId: "pelli-mandapam",
      },
      {
        label: "MRECW results portal",
        detail: "Responsive results and analytics site with its own backend and Docker deployment.",
        projectId: "mrecw-results",
      },
      {
        label: "Mytree ecosystem website",
        detail: "Live climate-action site (mytree.info) — branding, content structure and a shop.",
      },
      {
        label: "Mana Code Playground",
        detail: "Browser-based product site with PWA manifest and service worker.",
        projectId: "mana-code-playground",
      },
    ],
  },
  {
    id: "web-applications",
    title: "Custom web application development",
    tagline: "Products, portals and dashboards built around a real workflow.",
    summary:
      "Full applications rather than brochure sites: user accounts, data that needs to persist, admin screens and the backend that ties them together. I have built result portals, marketplaces, health-record apps and e-commerce systems from front end to deployment.",
    includes: [
      "Discovery: the workflow, the roles and the data involved",
      "Front-end application built in React or Next.js",
      "Backend service with the API your front end needs",
      "Database and storage design, including access rules",
      "Admin and management screens for day-to-day operation",
      "Deployment configuration and documentation in the repository",
    ],
    problems: [
      "A process that lives in spreadsheets, chat or paper and needs to become software.",
      "An existing tool that does not fit the way the business actually works.",
      "A product idea that needs a working first version to evaluate.",
    ],
    clientProvides: [
      "A description of the users, their roles and the steps they take",
      "Sample data or spreadsheets that show the real structure",
      "The rules that matter — who can see or change what",
      "Any integration details (existing accounts, APIs, payment or messaging providers)",
    ],
    costFactors: [
      "Number of user roles and permission levels",
      "Depth of the data model and reporting requirements",
      "Third-party integrations and their access requirements",
      "Whether an admin interface is needed alongside the customer-facing app",
      "Design fidelity: custom UI versus a straightforward functional interface",
    ],
    evidence: [
      {
        label: "Mana JNTUH Results",
        detail: "Next.js + FastAPI platform with PostgreSQL, Redis, RabbitMQ and an Android shell.",
        projectId: "mana-jntuh-results",
      },
      {
        label: "E-Commerce Platform",
        detail: "Storefront plus a deep admin: analytics, orders, coupons, customers, newsletter.",
        projectId: "ecommerce-platform",
      },
      {
        label: "MedMitra",
        detail: "Healthcare web app on React + Firebase with security rules versioned in the repo.",
        projectId: "medmitra",
      },
      {
        label: "DevBrain AI",
        detail: "React dashboard over a Python retrieval-augmented backend for knowledge search.",
        projectId: "devbrain-ai",
      },
    ],
  },
  {
    id: "frontend-development",
    title: "Frontend development (React & Next.js)",
    tagline: "Interface work that holds up on real devices and real data.",
    summary:
      "Front-end builds and rebuilds in React and Next.js with TypeScript — component systems, routing, forms, state and accessibility. I can join an existing product to take over the interface, or build it from a design.",
    includes: [
      "Component-based UI in React or Next.js with TypeScript",
      "Responsive layout and cross-browser behaviour",
      "Accessibility pass: landmarks, headings, focus order, labels, contrast",
      "Forms with validation and clear error states",
      "Integration with the backend API or data layer",
      "Performance work: bundle size, image loading, layout stability",
    ],
    problems: [
      "A design that needs to become a working, maintainable interface.",
      "An existing front end that is slow, inconsistent or hard to change.",
      "Accessibility and mobile issues that keep real users out.",
    ],
    clientProvides: [
      "Design files (Figma or similar) or a clear description of the desired screens",
      "Access to the existing codebase and its API, where one exists",
      "Content and example data for the main screens",
    ],
    costFactors: [
      "Number of unique screens and states (empty, loading, error, success)",
      "Whether a design handoff exists or the interface must be designed too",
      "State complexity: forms, filters, real-time data, offline behaviour",
      "Integration work with existing APIs or SDKs",
    ],
    evidence: [
      {
        label: "KAIT admin console",
        detail: "Next.js + MUI console with KYC, wallet, withdrawal and stake-plan screens.",
        projectId: "kait-admin",
      },
      {
        label: "JNTUH results front end",
        detail: "Next.js App Router front end over a FastAPI service.",
        projectId: "mana-jntuh-results",
      },
      {
        label: "DevBrain AI dashboard",
        detail: "Vite + React + TypeScript client with search, chat and task-monitoring views.",
        projectId: "devbrain-ai",
      },
    ],
  },
  {
    id: "backend-apis",
    title: "Backend & API development",
    tagline: "Services, APIs and background work that stay predictable under load.",
    summary:
      "Backend services and REST/WebSocket APIs in FastAPI, Spring Boot and Node.js. I handle authentication, data access, caching, background jobs and the deployment configuration, with the architecture documented in the repository.",
    includes: [
      "REST or WebSocket API design and implementation",
      "Data modelling and persistence (SQL or document stores)",
      "Authentication and authorisation on the server side",
      "Background processing, queues and caching where the workload calls for it",
      "Containerisation (Docker) and deployment configuration",
      "In-repo documentation: architecture, setup and runbooks",
    ],
    problems: [
      "A front end that needs a reliable API rather than ad-hoc scripts.",
      "Slow or fragile data access that needs caching or background processing.",
      "A prototype backend that must become stable enough to run in production.",
    ],
    clientProvides: [
      "The operations the application must support",
      "Existing database schema or a description of the data",
      "Constraints: expected volume, latency, hosting environment",
      "Credentials and access for any service the backend must talk to",
    ],
    costFactors: [
      "Number of endpoints and their complexity",
      "Authentication model and permission rules",
      "Data migration from an existing system",
      "Throughput requirements that call for caching, queues or workers",
      "Monitoring, logging and deployment expectations",
    ],
    evidence: [
      {
        label: "JNTUH results backend",
        detail: "FastAPI service with scrapers, PostgreSQL/Prisma, Redis, RabbitMQ, Docker Compose and Prometheus.",
        projectId: "mana-jntuh-results",
      },
      {
        label: "DevConnect Social Network API",
        detail: "Spring Boot service with JWT rotation, Argon2id hashing and end-to-end encrypted messaging.",
        projectId: "devconnect-api",
      },
      {
        label: "JNTUK results backend",
        detail: "FastAPI service with chatbot module, Prisma/Postgres, RabbitMQ, tests and load testing.",
        projectId: "jntuk-results",
      },
    ],
  },
  {
    id: "database-integration",
    title: "Database design & integration",
    tagline: "Schemas, access rules and the storage layer behind the app.",
    summary:
      "Designing and wiring the storage layer: relational schemas with migrations, document stores, cloud data with access rules, plus the caching and messaging that keep a busy app responsive.",
    includes: [
      "Schema and data-model design for the actual queries the app runs",
      "Relational databases (PostgreSQL) with migrations via Prisma",
      "Document databases (MongoDB) where the data is naturally nested",
      "Firebase Firestore and Storage with security rules kept in version control",
      "Caching (Redis) and message queues (RabbitMQ) where they help",
      "Backups and data-access patterns appropriate to the app",
    ],
    problems: [
      "Data that has grown beyond spreadsheets and needs structure.",
      "Queries that have become slow as the data set grew.",
      "Client-side apps that need secure, rule-based access to cloud data.",
    ],
    clientProvides: [
      "The entities involved and how they relate",
      "Representative data or an export from the current system",
      "Reporting questions the data must be able to answer",
    ],
    costFactors: [
      "Number of entities and the complexity of their relationships",
      "Migration of existing data, including clean-up",
      "Query performance and indexing requirements",
      "Whether caching or queuing infrastructure is justified",
    ],
    evidence: [
      {
        label: "PostgreSQL + Prisma in the result backends",
        detail: "Result data modelled with migrations in the JNTUH and JNTUK backends.",
        projectId: "mana-jntuh-results",
      },
      {
        label: "MongoDB in the DevConnect API",
        detail: "Document persistence for profiles, friendships and encrypted messages.",
        projectId: "devconnect-api",
      },
      {
        label: "Firestore with versioned security rules",
        detail: "MedMitra and Mana Code Playground keep their rules files in the repository.",
        projectId: "medmitra",
      },
    ],
  },
  {
    id: "auth-and-access",
    title: "Authentication & authorization",
    tagline: "Sign-in, sessions and permissions done properly.",
    summary:
      "Account systems built around short-lived tokens, refresh rotation and modern password hashing, plus role-based access to admin areas and rule-based access to cloud data. For sensitive messaging I have implemented the server side of an end-to-end encrypted protocol.",
    includes: [
      "Sign-up, sign-in, email verification and password reset flows",
      "Short-lived access tokens with rotating refresh tokens",
      "Password hashing with modern algorithms (Argon2id)",
      "Role-based and permission-based access to admin surfaces",
      "Cloud access rules (Firebase Auth / Firestore rules) in version control",
      "Optional: client-side end-to-end encryption with key exchange handled by the server",
    ],
    problems: [
      "Admin areas that anyone with the URL can currently reach.",
      "Passwords or sessions handled in a way that would not survive review.",
      "Sensitive data that should not be readable by the server operator.",
    ],
    clientProvides: [
      "Who the user types are and what each is allowed to do",
      "Whether users will sign in with email, phone or a provider",
      "Any compliance or policy constraints on credentials and personal data",
    ],
    costFactors: [
      "Number of roles and the granularity of permissions",
      "Whether social or enterprise sign-in is required",
      "Email/SMS delivery for verification and reset",
      "Additional security requirements such as encryption-at-rest or audit trails",
    ],
    evidence: [
      {
        label: "DevConnect Social Network API",
        detail: "JWT access tokens with rotating refresh tokens and Argon2id; server relays ciphertext only for E2EE chat.",
        projectId: "devconnect-api",
      },
      {
        label: "Firebase Auth with repository-held rules",
        detail: "MedMitra and Mana Code Playground version their Firestore/Storage security rules.",
        projectId: "medmitra",
      },
      {
        label: "Role-scoped admin consoles",
        detail: "KAIT and the e-commerce build separate administrative screens from customer surfaces.",
        projectId: "kait-admin",
      },
    ],
  },
  {
    id: "admin-dashboards",
    title: "Admin dashboards & management systems",
    tagline: "The internal screens that run the business day to day.",
    summary:
      "Operational consoles: user and role management, review and approval queues, money movement, reporting and the small screens that save an hour a day. Built as part of the same application or as a separate admin surface.",
    includes: [
      "User, customer or member management with detail views",
      "Review and approval queues (for example KYC or withdrawal review)",
      "Listing, order, coupon or content management",
      "Wallet, plan or subscription administration",
      "Analytics and reporting views",
      "Audit-friendly state: pending, approved, rejected, and who changed what",
    ],
    problems: [
      "Operations that only a developer can currently perform.",
      "No clear queue for reviews that need a human decision.",
      "Reporting assembled by hand from several places.",
    ],
    clientProvides: [
      "The day-to-day tasks staff actually perform",
      "The states a record moves through (for example pending → approved → paid)",
      "Who should be able to perform each action",
    ],
    costFactors: [
      "Number of management areas and their depth",
      "Workflow states and approval rules",
      "Charts and reporting requirements",
      "Role and permission granularity",
    ],
    evidence: [
      {
        label: "KAIT admin console",
        detail: "Users, KYC review, withdrawals, internal wallet, stake plans and contract lists.",
        projectId: "kait-admin",
      },
      {
        label: "E-Commerce Platform admin",
        detail: "Analytics, carousel, categories, coupons, customers, featured products and orders.",
        projectId: "ecommerce-platform",
      },
      {
        label: "JNTUH admin area",
        detail: "Dashboard, analytics, feedback, group chat and API-key management.",
        projectId: "mana-jntuh-results",
      },
    ],
  },
  {
    id: "api-integration",
    title: "Third-party API & service integration",
    tagline: "Connecting your product to the services it depends on.",
    summary:
      "Wiring in external services: messaging platforms, payments and plans, maps, cloud services and wallets. I work from the provider's documentation and keep the integration isolated so it can be replaced or updated without rewriting the product.",
    includes: [
      "Reading the provider's API and integrating it cleanly",
      "Handling tokens, webhooks, retries and failure states",
      "Mapping external data into your own model",
      "Configuration through environment variables rather than hard-coded keys",
      "Clear error surfacing so failures are visible, not silent",
    ],
    problems: [
      "A service the product needs is only half-connected, or brittle.",
      "Credentials and keys are sitting in the source code.",
      "Failures are invisible until a customer complains.",
    ],
    clientProvides: [
      "Provider accounts and the level of API access required",
      "Documentation or a point of contact for the provider",
      "A sandbox or test credentials where the provider offers them",
    ],
    costFactors: [
      "Provider API complexity and quotas",
      "Whether webhooks or scheduled jobs are involved",
      "Volume of data or messages to process",
      "Access approval lead time from the provider",
    ],
    evidence: [
      {
        label: "WhatsApp Business messaging platform",
        detail: "Bulk messaging, templates, chatbot and autoresponder over the WhatsApp API.",
        projectId: "whatsapp-bulk-messenger",
      },
      {
        label: "Telegram Mini App with TON Connect",
        detail: "Wallet linking and messaging inside Telegram's web view.",
        projectId: "telegram-mini-app",
      },
      {
        label: "Cloud and provider services",
        detail: "Firebase services across MedMitra and the e-commerce build; map features via Leaflet.",
        projectId: "medmitra",
      },
    ],
  },
  {
    id: "maintenance",
    title: "Improvements & maintenance for existing apps",
    tagline: "Taking over, steadying and extending software that already exists.",
    summary:
      "Work on applications that are already live: fixing defects, improving performance, adding features, upgrading dependencies and writing down how the system actually runs so it can be handed over safely.",
    includes: [
      "Code review and a plan of what to fix first",
      "Bug fixes and small feature work",
      "Performance and reliability improvements",
      "Dependency and framework upgrades",
      "Deployment and runbook documentation",
      "Handover notes so the next person is not guessing",
    ],
    problems: [
      "The original developer has moved on and changes feel risky.",
      "The app works, but slowly, or fails without explanation.",
      "Nothing is written down about how it deploys or recovers.",
    ],
    clientProvides: [
      "Repository access and, where possible, staging environment access",
      "A list of the issues that hurt most, in priority order",
      "Context on anything that must not change",
    ],
    costFactors: [
      "Size and condition of the existing codebase",
      "Whether tests and documentation exist",
      "Number and risk of the changes required",
      "Access and environment constraints",
    ],
    evidence: [
      {
        label: "Documented deployment and runbooks",
        detail: "Backends ship with DEPLOYMENT/RUNBOOK-style docs, Dockerfiles and Compose files.",
        projectId: "jntuk-results",
      },
      {
        label: "Dependency and tooling upkeep",
        detail: "Frameworks and build tools kept current across the catalogue (Vite, Next, FastAPI, Spring).",
      },
      {
        label: "Inspection tooling for existing installs",
        detail: "A VS Code extension that audits installed extension metadata and capabilities.",
        projectId: "extension-security-inspector",
      },
    ],
  },
  {
    id: "blockchain-web3",
    title: "Smart contracts & Web3 applications",
    tagline: "Solidity contracts and the dApps that talk to them.",
    summary:
      "Ethereum smart contracts and the front ends that use them — marketplaces, staking, token swaps, registries and randomness. Contracts are developed with Hardhat and OpenZeppelin libraries, and deployments are stated honestly, including testnets.",
    includes: [
      "Solidity contracts for the required behaviour",
      "Contract tooling and tests with Hardhat",
      "Front-end integration via ethers.js or web3.js and a browser wallet",
      "Deployment scripts and network configuration",
      "Clear notes on which network a contract is deployed to",
    ],
    problems: [
      "A marketplace, staking or registry flow that needs an on-chain record.",
      "A dApp front end that must talk to an existing contract.",
      "A proof-of-concept that needs honest, testable contract code.",
    ],
    clientProvides: [
      "The behaviour the contract must guarantee",
      "The network or chain to target (mainnet or a testnet)",
      "Wallet and RPC access for deployment",
    ],
    costFactors: [
      "Contract complexity and the number of interacting contracts",
      "Testing and audit expectations",
      "Front-end integration depth",
      "Network deployment and gas considerations",
    ],
    evidence: [
      {
        label: "IP Registry dApp",
        detail: "Solidity registry contract with register/transfer/verify, deployed to the Sepolia testnet.",
        projectId: "ip-registry",
      },
      {
        label: "OpenSea-style NFT marketplace",
        detail: "Marketplace contracts built with Hardhat and OpenZeppelin.",
      },
      {
        label: "Staking, swaps and randomness",
        detail: "Staking platforms and a Chainlink VRF lucky draw in the public catalogue.",
      },
    ],
  },
  {
    id: "android-mobile",
    title: "Android builds & mobile web",
    tagline: "Getting a web product onto a phone, cleanly.",
    summary:
      "A narrower offering than the rest: packaging web products for Android and building the mobile web experience. This includes Capacitor-wrapped Android builds of a web app, and Java/Android applications where the requirement is native.",
    includes: [
      "Capacitor (or similar) packaging of a web app as an Android build",
      "Mobile-web layout and touch interaction work",
      "Java/Android application development where a web view is not enough",
      "Build and signing configuration for release",
    ],
    problems: [
      "The web product exists but users expect it in the Play Store.",
      "The mobile experience is a squeezed desktop layout.",
    ],
    clientProvides: [
      "The existing web application and its build process",
      "Google Play developer account and signing details, for store release",
    ],
    costFactors: [
      "Whether the web app is already mobile-friendly",
      "Native capabilities required (camera, notifications, files)",
      "Store submission and review requirements",
    ],
    evidence: [
      {
        label: "JNTUH Android shell",
        detail: "The results site packaged for Android with Capacitor.",
        projectId: "mana-jntuh-results",
      },
      {
        label: "Educational ERP (Android)",
        detail: "Java/Android application built with Gradle and Firebase.",
        projectId: "erp-android",
      },
      {
        label: "Telegram Mini App",
        detail: "Mobile web app running inside Telegram's web view with a wallet.",
        projectId: "telegram-mini-app",
      },
    ],
  },
];

/** Compact list used for the homepage summary and schema. */
export const serviceTitles: string[] = services.map((service) => service.title);
