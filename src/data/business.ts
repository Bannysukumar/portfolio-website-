/**
 * Business identity, service areas and pricing policy — the single source of
 * truth for "freelance developer" positioning used across pages and JSON-LD.
 *
 * Rules applied here:
 * - Only information supplied or verified by the site owner is stored.
 * - Claims that still need owner confirmation carry `confirmed: false` and are
 *   never rendered by any component until they are confirmed.
 * - Service areas describe where clients are served (remote/direct
 *   collaboration), not a claim of physical presence or an office address.
 */

export interface ServiceArea {
  id: string;
  name: string;
  /** Parent region, when the area is a city inside a state. */
  parent?: string;
  country: string;
  /** Natural-language phrase used in copy and headings. */
  phrase: string;
  /** Schema.org areaServed type. */
  schemaType: "State" | "City";
}

export interface UnconfirmedClaim {
  value: number;
  confirmed: boolean;
  /** Shown in the report / README, never on the page while unconfirmed. */
  note: string;
}

export const business = {
  /** Positioning line — matches the professional description supplied by the owner. */
  positioning: "Independent freelance software developer",
  experienceYears: 3,
  /**
   * How work is acquired. Stated by the owner: direct client relationships,
   * without third-party freelancing marketplaces.
   */
  model: "Direct relationships with clients",
  modelDetail: "I work directly with clients — no third-party freelancing marketplaces.",
  directClientsOnly: true,

  /** Starting price for a custom project, in INR. */
  startingPriceINR: 20000,
  /** Exact pricing sentence supplied by the owner. */
  pricingStatement:
    "Custom software development projects start at ₹20,000. Final pricing depends on features, complexity, integrations, design requirements, and delivery scope.",
  /** Call to action used next to every pricing reference. */
  ctaLabel: "Discuss Your Project",

  /**
   * Supplied by the owner but NOT yet confirmed as an accurate historical
   * average / current pattern. Kept out of the UI and schema while
   * `confirmed` is false.
   */
  typicalProjectValueINR: {
    value: 46000,
    confirmed: false,
    note: "Typical value of a completed project — display only after the owner confirms it reflects recent work.",
  } satisfies UnconfirmedClaim,
  clientsPerMonth: {
    value: 2,
    confirmed: false,
    note: "Clients per month — display only after the owner confirms it reflects a current, established pattern.",
  } satisfies UnconfirmedClaim,

  /** Service areas the owner serves. Remote/direct collaboration. */
  serviceAreas: [
    {
      id: "telangana",
      name: "Telangana",
      country: "India",
      phrase: "Freelance software developer in Telangana",
      schemaType: "State",
    },
    {
      id: "andhra-pradesh",
      name: "Andhra Pradesh",
      country: "India",
      phrase: "Freelance software developer in Andhra Pradesh",
      schemaType: "State",
    },
    {
      id: "tamil-nadu",
      name: "Tamil Nadu",
      country: "India",
      phrase: "Website and application development in Tamil Nadu",
      schemaType: "State",
    },
    {
      id: "chennai",
      name: "Chennai",
      parent: "Tamil Nadu",
      country: "India",
      phrase: "Freelance web developer serving Chennai",
      schemaType: "City",
    },
  ] satisfies ServiceArea[],

  /** Regional summary sentence, written to read naturally. */
  servingLine: "Custom software development for businesses across South India.",
} as const;

/**
 * All confirmed service areas joined into one natural sentence.
 * States are listed first, then cities as "including …", so that a city inside
 * a listed state (Chennai, in Tamil Nadu) does not read as a separate place.
 */
export function serviceAreasSentence(): string {
  const states = business.serviceAreas.filter((area) => area.schemaType === "State").map((area) => area.name);
  const cities = business.serviceAreas.filter((area) => area.schemaType === "City").map((area) => area.name);
  const statesPart = `${states.slice(0, -1).join(", ")} and ${states[states.length - 1]}`;
  return cities.length > 0 ? `${statesPart}, including ${cities.join(", ")}` : statesPart;
}
