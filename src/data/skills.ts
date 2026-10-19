export interface SkillGroup {
  id: string;
  label: string;
  items: { name: string; proof?: string }[];
}

/** Every entry is backed by at least one public repository. */
export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    items: [
      { name: "React", proof: "DevBrain, MedMitra, SoundSpot, 20+ repos" },
      { name: "Next.js", proof: "JNTUH/JNTUK portals, KAIT, e-commerce" },
      { name: "TypeScript", proof: "JNTUH portal, KAIT, Extension Inspector" },
      { name: "Tailwind CSS", proof: "JNTUH portal, PelliMandapam, DevBrain" },
      { name: "MUI", proof: "KAIT admin console" },
      { name: "Monaco Editor", proof: "Mana Code Playground" },
    ],
  },
  {
    id: "backend",
    label: "Backend & APIs",
    items: [
      { name: "FastAPI", proof: "JNTUH & JNTUK result backends" },
      { name: "Spring Boot", proof: "DevConnect social API" },
      { name: "Node.js", proof: "Telugu Earning Hub API, Telegram bot" },
      { name: "PHP 8 · CodeIgniter 4", proof: "WhatsApp Bulk Messenger" },
      { name: "Python", proof: "Backends, scraping, notebooks" },
      { name: "Java", proof: "Spring services, Android apps" },
    ],
  },
  {
    id: "data",
    label: "Data & messaging",
    items: [
      { name: "PostgreSQL", proof: "JNTUH & JNTUK backends" },
      { name: "MongoDB", proof: "DevConnect API" },
      { name: "Firebase · Firestore", proof: "MedMitra, e-commerce, MLM platforms" },
      { name: "Redis", proof: "Result backends (caching)" },
      { name: "RabbitMQ", proof: "Result backends (messaging)" },
      { name: "Prisma", proof: "Backends" },
    ],
  },
  {
    id: "web3",
    label: "Blockchain & Web3",
    items: [
      { name: "Solidity", proof: "Marketplaces, staking, IP registry" },
      { name: "Hardhat", proof: "OpenSea clone, contracts tooling" },
      { name: "OpenZeppelin", proof: "Contract base library usage" },
      { name: "ethers.js · web3.js", proof: "dApp frontends" },
      { name: "Chainlink VRF", proof: "Lucky Draw" },
      { name: "TON Connect", proof: "Telegram Mini App" },
    ],
  },
  {
    id: "platform",
    label: "Cloud, mobile & tooling",
    items: [
      { name: "Docker", proof: "Backends, KAIT, MRECW portal" },
      { name: "Vercel · Firebase Hosting", proof: "15+ live deployments" },
      { name: "Android · Gradle", proof: "ERP, Smart News, PMTv, TrueBond" },
      { name: "Capacitor", proof: "JNTUH Android shell" },
      { name: "esbuild · Vitest", proof: "Extension Security Inspector" },
      { name: "pnpm workspaces", proof: "Telugu Earning Hub monorepo" },
      { name: "Asterisk PBX", proof: "Virtual number system" },
    ],
  },
];
