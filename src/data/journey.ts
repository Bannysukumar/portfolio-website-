export interface JourneyEntry {
  period: string;
  title: string;
  body: string;
  evidence: string;
}

/**
 * Ordered by repository creation dates on github.com/Bannysukumar.
 * This is a project journey, not an employment history — no roles,
 * employers or dates beyond repository history are claimed.
 */
export const journey: JourneyEntry[] = [
  {
    period: "2024",
    title: "Foundations: Java, Android & first contracts",
    body:
      "Android applications in Java and the first Solidity exercises — ERC-20, upgradeable contract patterns and EIP-712 work collected in a coursework repository.",
    evidence: "Typing-Master, Dotnet-Learning, solidity-home-works repositories (created 2024)",
  },
  {
    period: "2025",
    title: "Web3: marketplaces, staking & on-chain systems",
    body:
      "A run of decentralized applications: an OpenSea-style NFT marketplace with Hardhat and OpenZeppelin, staking platforms, token swaps, an IP-registry dApp on Sepolia, and a Chainlink VRF lucky draw.",
    evidence: "open-sea-clone, Intellectual-Property, decentralized-staking, lucky-draw repositories (created 2025)",
  },
  {
    period: "2025 — 2026",
    title: "Product engineering: portals & platforms",
    body:
      "Full-stack products for real users: the JNTUH results platform, an e-commerce build with a deep admin area, PelliMandapam's venue marketplace, MedMitra's health records app and Mana Code Playground.",
    evidence: "jntuh-results-website, e-commerce-website-build, PelliMandapam-website, MedMitra, Mana-Code-Play-ground",
  },
  {
    period: "2026",
    title: "Backend, platform & developer tooling",
    body:
      "Depth work on the server side: FastAPI result backends with PostgreSQL, Redis and RabbitMQ; a Spring Boot social API with end-to-end encrypted chat; a VS Code security-inspection extension; a self-hosted Asterisk telephony system; and the DevBrain AI knowledge dashboard.",
    evidence: "jntuh-backend, jntuk-backend, Developer-Social-Network, Extension-Security-Inspector, virtual-number, Devbrain repositories (created 2026)",
  },
];
