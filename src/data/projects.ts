import type { Project } from "../types/project";

const GH = "https://github.com/Bannysukumar";

/**
 * Project catalogue built from repository inspection (README, source tree,
 * GitHub metadata) on 19 Oct 2026. Live URLs marked "verified-live" returned
 * HTTP 200 and rendered during that research session. No metrics, user
 * numbers or outcomes are claimed beyond what the repositories state.
 */
export const projects: Project[] = [
  {
    id: "mana-jntuh-results",
    title: "Mana JNTUH Results",
    category: "Full-stack product",
    tagline: "A results platform for JNTUH students, with web, API and Android layers.",
    description:
      "A portal where Jawaharlal Nehru Technological University Hyderabad students check exam results, backlogs, credits and class rankings. A Next.js frontend sits on a FastAPI service with PostgreSQL, Redis and RabbitMQ, and a Capacitor build wraps the site for Android.",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Firebase",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "RabbitMQ",
      "Docker",
      "Capacitor",
    ],
    repos: [
      {
        name: "jntuh-results-website",
        url: `${GH}/jntuh-results-website`,
        language: "TypeScript",
        role: "Next.js App Router frontend — results, backlog, credit and admin screens",
      },
      {
        name: "jntuh-backend",
        url: `${GH}/jntuh-backend`,
        language: "Python",
        role: "FastAPI service — scrapers, Postgres/Prisma storage, Redis cache, RabbitMQ messaging, Docker Compose, Prometheus",
      },
      {
        name: "jntuh-results-app",
        url: `${GH}/jntuh-results-app`,
        language: "Capacitor / Android",
        role: "Android shell packaging the results site",
      },
    ],
    live: {
      url: "https://manajntuhresults.vercel.app/",
      status: "verified-live",
      note: "HTTP 200 and full page render verified 19 Oct 2026.",
    },
    thumbnail: "/images/projects/jntuh.jpg",
    features: [
      "Academic, all-result, class-result, backlog-report and credit-checker pages",
      "Admin area: dashboard, analytics, feedback, group chat, API-key management",
      "Backend with scrapers, database migrations and subscription modules",
      "Queue-based messaging and caching layer (RabbitMQ + Redis)",
      "Containerised deployment (Dockerfile, docker-compose) with Prometheus config",
      "Android app via Capacitor",
    ],
    detail: {
      problem:
        "University result portals are slow and hard to navigate, especially during result seasons. Students need backlogs, credits and class rankings, not just a mark sheet.",
      approach: [
        "Next.js App Router frontend with per-exam SEO routes and a Tailwind design system",
        "FastAPI backend with dedicated scrapers, API, database, messaging and service modules",
        "PostgreSQL via Prisma for results data, Redis for caching, RabbitMQ for async work",
        "Docker Compose for local/production orchestration plus Prometheus monitoring config",
        "Firebase for auth-adjacent services on the frontend, Capacitor for the Android build",
      ],
      notes:
        "The three repositories form one product: website, backend and Android shell. The backend README documents its own architecture and getting-started steps.",
    },
    featured: true,
  },
  {
    id: "devbrain-ai",
    title: "DevBrain AI",
    category: "AI / developer tooling",
    tagline: "One dashboard for scattered technical knowledge, with RAG-powered answers.",
    description:
      "A dashboard that unifies docs, code repositories, issue trackers and chat data behind semantic search and retrieval-augmented chat. The React client talks to a Python RAG backend (Ragpi) over REST.",
    stack: ["React", "Vite", "TypeScript", "Tailwind CSS", "Firebase", "Python", "RAG"],
    repos: [
      {
        name: "Devbrain-ai-frentend",
        url: `${GH}/Devbrain-ai-frentend`,
        language: "TypeScript",
        role: "Dashboard client — cards, chat, search, settings, health, task monitoring",
      },
      {
        name: "devbrain-ai-backend",
        url: `${GH}/devbrain-ai-backend`,
        language: "Python",
        role: "RAG backend integration (Ragpi-based) for ingestion and answer generation",
      },
    ],
    live: {
      url: "https://devbrain-ai-frentend.vercel.app",
      status: "verified-live",
      note: "HTTP 200 and full page render verified 19 Oct 2026.",
    },
    thumbnail: "/images/projects/devbrain.jpg",
    features: [
      "Semantic search across sources — grouped or combined",
      "RAG chat grounded in the ingested knowledge base with source context",
      "Background ingestion task monitoring (view and terminate jobs)",
      "Backend health status with last-checked time",
      "Demo mode that seeds sample docs, code, issue and chat sources",
    ],
    detail: {
      problem:
        "Technical knowledge is fragmented across documentation, repositories, issue trackers and chat tools. Finding an answer means checking all of them.",
      approach: [
        "Vite + React client with routes for dashboard, cards, chat, search, settings and health",
        "Retrieval-augmented generation via a Ragpi-based Python backend exposed over REST APIs",
        "Per-source and cross-source semantic search with grouped results",
        "Task monitor for ingestion jobs and a demo mode for quick evaluation",
      ],
      notes:
        "Repository docs include a manual test guide, QA modes and a route map — the project is documented for contributors, not just demoed.",
    },
    featured: true,
  },
  {
    id: "devconnect-api",
    title: "DevConnect Social Network API",
    category: "Backend systems",
    tagline: "A Spring Boot social API with end-to-end encrypted chat.",
    description:
      "An independent REST and WebSocket service for a social network: profiles, friendships, one-to-one encrypted messaging with device sessions and prekey distribution — the server never stores message plaintext or private keys.",
    stack: ["Java 17", "Spring Boot", "Spring Security", "WebSockets", "MongoDB", "Docker", "OpenAPI"],
    repos: [
      {
        name: "Developer-Social-Network",
        url: `${GH}/Developer-Social-Network`,
        language: "Java",
        role: "The complete backend service",
      },
    ],
    thumbnail: "/images/projects/art-devconnect.svg",
    thumbnailIllustrative: true,
    features: [
      "Short-lived JWT access tokens with rotating refresh tokens",
      "Argon2id password hashing",
      "Profiles, search, friend requests, friendships and blocks",
      "Cursor-paginated encrypted messages delivered over authenticated WebSockets",
      "Public identity keys, signed prekeys and one-time prekeys for a client-side E2EE protocol",
      "Device sessions, notifications, email verification, password reset",
      "Rate limits, audit events, consistent JSON errors, Actuator health, OpenAPI UI",
    ],
    detail: {
      problem:
        "Social platforms typically process message content server-side. This service is designed so that private conversations stay private, even from the operator of the server.",
      approach: [
        "Spring Boot 3 with layered controllers/services/repositories and DTO-only responses",
        "MongoDB 7 for persistence; Docker for running the stack",
        "E2EE protocol support: clients exchange identity keys, signed prekeys and one-time prekeys; the server relays ciphertext only",
        "WebSocket endpoint /ws/chat for authenticated real-time delivery",
        "Security review documented in the repository (docs/security.md, docs/e2ee.md)",
      ],
      notes:
        "The repository documents its own architecture, security and E2EE design; there is no hosted deployment, so it is presented source-only.",
    },
    featured: true,
  },
  {
    id: "extension-security-inspector",
    title: "Extension Security Inspector",
    category: "Developer tooling",
    tagline: "A VS Code extension that audits installed extensions' metadata and capabilities.",
    description:
      "A VS Code extension that inspects other installed extensions locally — manifest, capabilities, contribution points, dependencies and security-relevant indicators — with auditable findings and exportable reports. It deliberately does not declare anything safe or malicious.",
    stack: ["TypeScript", "VS Code Extension API", "esbuild", "Vitest"],
    repos: [
      {
        name: "Extension-Security-Inspector",
        url: `${GH}/Extension-Security-Inspector`,
        language: "TypeScript",
        role: "The extension: analyzers, commands, tree providers, report service",
      },
    ],
    thumbnail: "/images/projects/art-extension.svg",
    thumbnailIllustrative: true,
    features: [
      "Local scan of installed extension metadata — nothing leaves the machine",
      "Separate analyzers for manifests, capabilities, dependencies and findings",
      "Commands: audit all, audit selected, export report",
      "Tree views for extensions and for security findings",
      "Unit-tested with Vitest; bundled with esbuild; targets VS Code ≥ 1.96",
    ],
    detail: {
      problem:
        "VS Code's extension marketplace shows little about what an extension actually requests or bundles. Auditing manifests by hand is tedious.",
      approach: [
        "Extension host entrypoint delegating to analyzer modules in src/analyzer",
        "Command layer for audit-all / audit-selected / export-report",
        "Tree providers exposing extensions and findings in the sidebar",
        "esbuild bundling and Vitest tests; published as version 0.1.x",
      ],
      notes:
        "The README is explicit about scope: it reports indicators, it does not detect malware or certify safety.",
    },
    featured: true,
  },
  {
    id: "whatsapp-bulk-messenger",
    title: "WhatsApp Bulk Messenger",
    category: "Full-stack web app",
    tagline: "A PHP 8 messaging platform: bulk campaigns, chatbot, autoresponder, web push.",
    description:
      "A CodeIgniter 4 application with modules for bulk WhatsApp messaging, a WhatsApp API layer, chatbot and autoresponder flows, contact and history management, plus account, plan, payment and web-push subsystems.",
    stack: ["PHP 8", "CodeIgniter 4", "Composer", "PHPUnit"],
    repos: [
      {
        name: "whatsapp-Bulk-messenger",
        url: `${GH}/whatsapp-Bulk-messenger`,
        language: "PHP",
        role: "The full application: messaging, chatbot, autoresponder, accounts, payments, web push",
      },
    ],
    live: {
      url: "https://whatsapp-bulk-messenger-two.vercel.app",
      status: "responds-but-unrendered",
      note: "HTTP 200 confirmed 19 Oct 2026; the interactive UI could not be rendered for a screenshot, so an illustrative artwork is used instead.",
    },
    thumbnail: "/images/projects/art-whatsapp.svg",
    thumbnailIllustrative: true,
    features: [
      "Bulk messaging, message templates (button, list, poll) and contact management",
      "Chatbot and autoresponder modules with message history",
      "Account manager with plans, payments and subscriptions",
      "Web-push campaigns with composer, schedules and subscribers",
      "PHPUnit test configuration and Composer-managed PHP 8 dependencies",
    ],
    detail: {
      problem:
        "Running messaging operations from a phone app does not scale: campaigns, templates, contacts, replies and billing need a proper system.",
      approach: [
        "CodeIgniter 4 modular structure under inc/core (Whatsapp_bulk, Whatsapp_api, Whatsapp_chatbot, …)",
        "PHP 8 platform requirement managed through Composer",
        "Separate account, plan, payment and web-push module families",
        "PHPUnit wired via phpunit.xml.dist",
      ],
      notes:
        "The recorded deployment responds, but its interactive UI could not be rendered during research; the card artwork is illustrative rather than a screenshot.",
    },
    featured: true,
  },
  {
    id: "virtual-number",
    title: "Virtual Phone Number System",
    category: "Infrastructure / telephony",
    tagline: "Self-hosted virtual numbers on Asterisk PBX with an admin dashboard.",
    description:
      "A complete self-hosted virtual phone number system: SIP numbers, auto-answer, IVR, call recording, Whisper.cpp voice-to-text transcription, call logging and a web admin dashboard for call-flow management.",
    stack: ["Asterisk PBX", "Shell", "Whisper.cpp", "Web dashboard", "SIP"],
    repos: [
      {
        name: "virtual-number",
        url: `${GH}/virtual-number`,
        language: "Shell",
        role: "Asterisk config, dashboard, missed-call-to-SMS bridge, setup scripts and docs",
      },
    ],
    thumbnail: "/images/projects/art-telephony.svg",
    thumbnailIllustrative: true,
    features: [
      "SIP-based virtual numbers with auto-answer",
      "IVR (Interactive Voice Response) flows",
      "Call recording and analytics logging",
      "Voice-to-text transcription using Whisper.cpp",
      "Web-based admin dashboard for call-flow management",
      "Missed-call-to-SMS bridge; documented as ready for AI voice agents",
    ],
    detail: {
      problem:
        "Commercial virtual-number services are rented. This project runs the same capabilities on infrastructure you control.",
      approach: [
        "Asterisk PBX as the telephony core with hand-written dialplan/config under asterisk/",
        "Whisper.cpp for on-server speech-to-text",
        "A web dashboard plus a missed-call SMS bridge (missed-call-sms-api/)",
        "Setup, deployment, Windows deployment and troubleshooting docs (QUICKSTART, DEPLOY, RUNBOOK-style files)",
      ],
      notes:
        "Source-only: the system runs on your own server, so there is no hosted demo to link.",
    },
    featured: true,
  },

  /* ---------------- Supporting projects ---------------- */
  {
    id: "ip-registry",
    title: "IP Registry dApp",
    category: "Web3 / Solidity",
    tagline: "Register, verify and transfer intellectual property on Ethereum.",
    description:
      "A decentralized app for registering patents, trademarks and copyrights on Ethereum (Sepolia testnet): an IPRegistry contract with registerIP, transferIP, getIP and verifyIP, and a MetaMask-connected frontend with ownership history.",
    stack: ["Solidity", "ethers.js", "MetaMask", "JavaScript"],
    repos: [
      {
        name: "Intellectual-Property",
        url: `${GH}/Intellectual-Property`,
        language: "JavaScript",
        role: "IPRegistry.sol contract and the web3 frontend",
      },
    ],
    live: {
      url: "https://intellectual-property-one.vercel.app",
      status: "verified-live",
      note: "HTTP 200 and page render verified 19 Oct 2026 (title: IP Registry dApp).",
    },
    thumbnail: "/images/projects/ip-registry.jpg",
    features: [
      "Register IP as patent, trademark, copyright or other",
      "View IP details and ownership history by ID",
      "Transfer ownership and verify current owner on-chain",
      "MetaMask wallet integration",
    ],
    detail: {
      problem:
        "Proof of creation and ownership of intellectual property usually depends on institutions; a public ledger gives a timestamped, transferable record.",
      approach: [
        "Solidity IPRegistry contract: registerIP, transferIP, getIP, verifyIP",
        "Deployed to Ethereum Sepolia testnet",
        "Browser frontend wired to the contract with MetaMask",
      ],
    },
    featured: false,
  },
  {
    id: "medmitra",
    title: "MedMitra",
    category: "Healthcare web app",
    tagline: "Medicines, prescriptions and health records in one place.",
    description:
      "A healthcare web application for managing medicines, prescriptions and health records, built on Vite + React with Firebase (Auth, Firestore, Storage, Functions) and Leaflet for location features.",
    stack: ["React", "Vite", "Firebase", "Tailwind CSS", "Leaflet"],
    repos: [
      {
        name: "MedMitra",
        url: `${GH}/MedMitra`,
        language: "JavaScript",
        role: "The full application, Firebase config and security rules",
      },
    ],
    live: {
      url: "https://med-mitra-chi.vercel.app",
      status: "verified-live",
      note: "HTTP 200 and page render verified 19 Oct 2026.",
    },
    thumbnail: "/images/projects/medmitra.jpg",
    features: [
      "Medicine and prescription tracking",
      "Health-record storage on Firebase with security rules",
      "Firestore and Storage rules versioned in the repository",
      "Cloud Functions for server-side logic",
    ],
    detail: {
      problem: "Personal medical records live in drawers and photos; MedMitra keeps them structured and reachable.",
      approach: [
        "React 19 + Vite client with Tailwind styling",
        "Firebase Auth, Firestore and Storage with rules files in-repo",
        "Leaflet for map-based features",
      ],
    },
    featured: false,
  },
  {
    id: "pelli-mandapam",
    title: "PelliMandapam",
    category: "Marketplace platform",
    tagline: "Venue discovery and booking for wedding mandapams.",
    description:
      "A Next.js platform where couples discover wedding venues, compare them side by side and book them, while vendors manage listings and bookings through their own dashboards.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    repos: [
      {
        name: "PelliMandapam-website",
        url: `${GH}/PelliMandapam-website`,
        language: "TypeScript",
        role: "The complete platform: public site, booking flow, vendor and account areas",
      },
    ],
    live: {
      url: "https://pelli-mandapam.vercel.app",
      status: "verified-live",
      note: "HTTP 200 and page render verified 19 Oct 2026.",
    },
    thumbnail: "/images/projects/pellimandapam.jpg",
    features: [
      "Venue browsing, detail and booking pages",
      "Side-by-side venue comparison",
      "Vendor registration and vendor management area",
      "Account area with bookings and favourites",
      "Support section",
    ],
    detail: {
      problem: "Choosing a wedding venue means visiting dozens of sites and making dozens of calls; this puts discovery, comparison and booking in one flow.",
      approach: [
        "Next.js App Router with public, mandapam, vendor and account route groups",
        "Tailwind design system across all surfaces",
        "Booking and comparison flows as first-class pages",
      ],
    },
    featured: false,
  },
  {
    id: "soundspot",
    title: "SoundSpot",
    category: "Web product",
    tagline: "Identify songs in seconds, keep favourites and a listening history.",
    description:
      "A music recognition web app: identify a playing song, save favourites and track listening history, built as a React + Vite client.",
    stack: ["React", "Vite", "JavaScript"],
    repos: [
      {
        name: "SoundSpot-Website",
        url: `${GH}/SoundSpot-Website`,
        language: "JavaScript",
        role: "The recognition web client",
      },
      {
        name: "SoundSpot-App",
        url: `${GH}/SoundSpot-App`,
        language: "TypeScript",
        role: "Companion app code in the same product family",
      },
    ],
    live: {
      url: "https://sound-spot-rust.vercel.app",
      status: "verified-live",
      note: "HTTP 200 and page render verified 19 Oct 2026.",
    },
    thumbnail: "/images/projects/soundspot.jpg",
    features: [
      "Song identification flow",
      "Favourites library",
      "Listening history",
    ],
    detail: {
      problem: "Hearing a song you like and losing it again is a solved problem — until you try to remember it later.",
      approach: ["React + Vite client deployed on Vercel", "Companion TypeScript app repository in the same family"],
    },
    featured: false,
  },
  {
    id: "mana-code-playground",
    title: "Mana Code Playground",
    category: "Developer education",
    tagline: "An in-browser HTML, CSS and JavaScript playground with accounts.",
    description:
      "An interactive code playground and learning platform: write and run HTML, CSS and JavaScript in the browser with a Monaco editor, saved projects and Firebase-backed accounts.",
    stack: ["React 18", "Vite", "Monaco Editor", "Firebase", "React Router"],
    repos: [
      {
        name: "Mana-Code-Play-ground",
        url: `${GH}/Mana-Code-Play-ground`,
        language: "JavaScript",
        role: "The playground application, Firestore rules and PWA manifest",
      },
    ],
    live: {
      url: "https://mana-code-playground.vercel.app",
      status: "verified-live",
      note: "HTTP 200 and page render verified 19 Oct 2026.",
    },
    thumbnail: "/images/projects/manacode.jpg",
    features: [
      "Monaco-powered editor for HTML, CSS and JavaScript",
      "Firebase auth and Firestore persistence with versioned security rules",
      "Routing between playground and learning screens",
      "PWA manifest and service-worker registration",
    ],
    detail: {
      problem: "Learning front-end code shouldn't require a local toolchain; the playground runs entirely in the browser.",
      approach: ["React 18 + Vite client", "Monaco Editor integration", "Firebase for accounts and saved work"],
    },
    featured: false,
  },
  {
    id: "mrecw-results",
    title: "MRECW Results Portal",
    category: "Education platform",
    tagline: "Results, backlogs, credits and rankings for MRECW students.",
    description:
      "A college results portal for Malla Reddy Women's Engineering College: academic results, backlog reports, credits, class rankings and performance analytics without login, with a React/Vite frontend, a backend service and Docker deployment.",
    stack: ["React", "Vite", "TypeScript", "Firebase", "Recharts", "Docker"],
    repos: [
      {
        name: "malla-reddy-women-s-engineering-results-website",
        url: `${GH}/malla-reddy-women-s-engineering-results-website`,
        language: "TypeScript",
        role: "Frontend, backend and deployment configuration (Dockerfile, render.yaml)",
      },
    ],
    live: {
      url: "https://malla-reddy-women-s-engineering-res.vercel.app",
      status: "verified-live",
      note: "HTTP 200 and page render verified 19 Oct 2026.",
    },
    thumbnail: "/images/projects/mrecw.jpg",
    features: [
      "Results, backlogs, credits and class rankings without login",
      "Performance analytics charts (Recharts)",
      "Split frontend/backend structure",
      "Docker image plus render.yaml deployment config",
    ],
    detail: {
      problem: "Students need their academic standing quickly, without an account or a slow college portal.",
      approach: ["React + Vite frontend with Tailwind", "Dedicated backend/ directory with Docker and render.yaml", "Analytics charts via Recharts"],
    },
    featured: false,
  },
  {
    id: "kait-admin",
    title: "KAIT Admin Console",
    category: "Admin dashboard",
    tagline: "KYC, wallets, withdrawals and staking plans in one Next.js console.",
    description:
      "A Next.js + MUI admin application covering users, KYC review, withdrawals, an internal wallet, stake plans and staking contract lists — with Docker deployment.",
    stack: ["Next.js", "React", "TypeScript", "MUI", "Docker"],
    repos: [
      {
        name: "kait.org",
        url: `${GH}/kait.org`,
        language: "TypeScript",
        role: "Admin App Router application (app/admin/…) with Dockerfile",
      },
    ],
    live: {
      url: "https://kait-org.vercel.app",
      status: "verified-live",
      note: "HTTP 200 confirmed 19 Oct 2026.",
    },
    thumbnail: "/images/projects/kait.jpg",
    features: [
      "User management with details and password reset flows",
      "KYC list and review screens",
      "Withdrawal review with pending / approved / rejected states",
      "Wallet states, stake plans and staking contract lists",
      "Club volume and beneficiary views",
    ],
    detail: {
      problem: "Operational teams need one console for identity review, money movement and contract state.",
      approach: ["Next.js App Router admin route groups", "MUI component layer", "Dockerfile for containerised deployment"],
      notes: "The repository contains no Solidity contracts — staking screens are admin views over external contracts.",
    },
    featured: false,
  },
  {
    id: "jntuk-results",
    title: "JNTUK Results Platform",
    category: "Backend + frontend",
    tagline: "The JNTUK sibling platform: FastAPI service plus Next.js frontend.",
    description:
      "A results platform for JNTUK students mirroring the JNTUH architecture: a Next.js site for results, backlogs and calendars, and a FastAPI backend pulling from jntukresults.edu.in with PostgreSQL, Redis, RabbitMQ, tests and deployment docs.",
    stack: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "Redis", "RabbitMQ", "Docker"],
    repos: [
      {
        name: "jntuk-website",
        url: `${GH}/jntuk-website`,
        language: "TypeScript",
        role: "Next.js frontend: results, backlog report, calendars, careers",
      },
      {
        name: "jntuk-backend",
        url: `${GH}/jntuk-backend`,
        language: "Python",
        role: "FastAPI service: scrapers, chatbot, Prisma/Postgres, RabbitMQ, Locust load tests, docs",
      },
    ],
    live: {
      url: "https://jntuk-website.vercel.app",
      status: "deployment-missing",
      note: "The repository records this deployment, but it returned HTTP 404 on 19 Oct 2026 — no live link is offered.",
    },
    thumbnail: "/images/projects/art-results.svg",
    thumbnailIllustrative: true,
    features: [
      "Academic results, backlog reports, calendars and careers pages",
      "FastAPI backend with chatbot module and scrapers",
      "Architecture, security, deployment and runbook docs in-repo",
      "Locust load-testing file and a test suite",
    ],
    detail: {
      problem: "Same problem as the JNTUH platform, for a different university's students.",
      approach: [
        "Next.js App Router frontend with SEO result routes",
        "FastAPI backend with PostgreSQL/Prisma, Redis, RabbitMQ and RabbitMQ-based subscriptions",
        "Load testing with Locust; deployment documented in DEPLOYMENT.md and RUNBOOK.md",
      ],
      notes: "The recorded Vercel deployment was unavailable at research time, so this project is presented with source links only.",
    },
    featured: false,
  },
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    category: "Full-stack product",
    tagline: "Storefront plus a deep admin: orders, coupons, customers, analytics.",
    description:
      "A Next.js e-commerce build with a customer storefront and an extensive admin area — analytics, carousel, categories, contact messages, coupons, customers, featured products, newsletter and orders.",
    stack: ["Next.js", "React", "TypeScript", "Firebase"],
    repos: [
      {
        name: "e-commerce-website-build",
        url: `${GH}/e-commerce-website-build`,
        language: "TypeScript",
        role: "Storefront and admin application with scripts and process config",
      },
    ],
    thumbnail: "/images/projects/art-ecommerce.svg",
    thumbnailIllustrative: true,
    features: [
      "Customer-facing storefront with account area",
      "Admin: analytics, orders, coupons, categories, customers",
      "Carousel and featured-product merchandising",
      "Newsletter and contact-message administration",
    ],
    detail: {
      problem: "Running a shop means both a storefront and a back office; this project builds both sides.",
      approach: ["Next.js App Router pages for public and admin routes", "Firebase as the backend service", "PM2-style process config (ecosystem.config.js)"],
    },
    featured: false,
  },
  {
    id: "telegram-mini-app",
    title: "Telegram Mini App",
    category: "Web3 / mobile web",
    tagline: "A Telegram client with TON Connect wallet integration.",
    description:
      "A React mini app running inside Telegram: home, farming, tasks, a game, news, wallet, invites and profile screens, with TON Connect for wallets and Firebase behind it.",
    stack: ["React", "Firebase", "TON Connect", "Tailwind CSS"],
    repos: [
      {
        name: "Telegram-Mini-App",
        url: `${GH}/Telegram-Mini-App`,
        language: "JavaScript",
        role: "The mini-app client plus admin screens for news and tasks",
      },
    ],
    thumbnail: "/images/projects/art-telegram.svg",
    thumbnailIllustrative: true,
    features: [
      "Telegram Web App integration (telegram-web-app.js)",
      "TON Connect wallet screen (@tonconnect/ui)",
      "Farming, tasks, game, news, invites and profile screens",
      "Admin pages for news and tasks",
    ],
    detail: {
      problem: "Distribution inside Telegram, with a wallet that users already have.",
      approach: ["React client loaded by Telegram's web view", "TON Connect for wallet linking", "Firebase for data and config"],
    },
    featured: false,
  },
  {
    id: "erp-android",
    title: "Educational ERP (Android)",
    category: "Mobile",
    tagline: "An enterprise Android client for a school/college ERP ecosystem.",
    description:
      "An Android application in Java forming the mobile layer of an educational ERP: Firebase-backed, with documented integrations for RFID/IoT, blockchain certificates, AR/VR labs and AI-driven evaluation.",
    stack: ["Java", "Android", "Firebase", "Gradle"],
    repos: [
      {
        name: "ERP-APP",
        url: `${GH}/ERP-APP`,
        language: "Java",
        role: "Android application with Firebase config and integration guides",
      },
    ],
    thumbnail: "/images/projects/art-erp.svg",
    thumbnailIllustrative: true,
    features: [
      "Android client built with Gradle",
      "Firebase integration and configuration scripts",
      "Documented AR/VR and blockchain-certificate integration guides",
    ],
    detail: {
      problem: "Institutions need one mobile surface for academic operations across campuses.",
      approach: ["Java Android app under app/", "Firebase as the backend", "Integration guides (ARVR_INTEGRATION_GUIDE.md, status docs) in the repository"],
    },
    featured: false,
  },
  {
    id: "gridlock-hackathon",
    title: "Gridlock Hackathon 2.0",
    category: "Data science",
    tagline: "Traffic demand prediction for Bengaluru mobility data.",
    description:
      "A competition entry for Flipkart's Gridlock Hackathon 2.0 — predicting traffic demand from Bengaluru mobility data. The repository README records a top leaderboard rank with a perfect R² score on the challenge leaderboard.",
    stack: ["Python", "Jupyter Notebook", "pandas"],
    repos: [
      {
        name: "Gridlock-Hackathon-2.0",
        url: `${GH}/Gridlock-Hackathon-2.0`,
        language: "Jupyter Notebook",
        role: "Dataset, analysis scripts and the source submission",
      },
    ],
    thumbnail: "/images/projects/art-gridlock.svg",
    thumbnailIllustrative: true,
    features: [
      "Competition dataset and preprocessing scripts",
      "Notebook-based modelling workflow",
      "Submission artifacts retained in the repository",
    ],
    detail: {
      problem: "Predict ride demand across a city from historical mobility data.",
      approach: ["Notebook-driven feature engineering and modelling (pandas)", "Reproducible submission artifacts committed to the repo"],
      notes: "The leaderboard result is as recorded in the repository README.",
    },
    featured: false,
  },
];
