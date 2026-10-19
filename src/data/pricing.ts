import { business } from "./business";

/**
 * Pricing page content. The only figure presented as a fact is the confirmed
 * starting price. Figures the owner has not yet confirmed (typical project
 * value, clients per month) are intentionally not rendered — see
 * `business.typicalProjectValueINR.confirmed` and `business.clientsPerMonth`.
 */

export interface CostFactor {
  label: string;
  detail: string;
}

export const pricing = {
  /** Headline for the pricing section and page. */
  headline: "Straightforward pricing, agreed before work starts",
  /** The exact pricing statement supplied by the owner. */
  statement: business.pricingStatement,
  startingPriceINR: business.startingPriceINR,
  /** Formatted for display. */
  startingPriceLabel: "₹20,000",
  cta: { label: business.ctaLabel, href: "/contact" },

  /** What actually moves the number. */
  costFactors: [
    {
      label: "Features & screens",
      detail: "The number of distinct screens and the behaviour behind each one — more states (empty, loading, error, role-specific) means more work.",
    },
    {
      label: "Complexity",
      detail: "How intricate the logic is: permissions, workflows, real-time updates, background processing, encryption.",
    },
    {
      label: "Integrations",
      detail: "Every external service added — payments, messaging, maps, cloud storage, wallets — brings its own complexity and access requirements.",
    },
    {
      label: "Design requirements",
      detail: "A supplied design system is quicker than designing from scratch, while custom illustration and animation add time.",
    },
    {
      label: "Delivery scope",
      detail: "Whether the work stops at a working build or continues through content, deployment, store submission and handover.",
    },
  ] satisfies CostFactor[],

  /** What a quote always includes, so there are no surprises. */
  includedInQuote: [
    "A defined scope in writing — what is being built and what is not",
    "The price, and whether it is fixed or staged across milestones",
    "An agreed delivery order, so useful work lands early",
    "Deployment to your hosting, or setup instructions if you prefer to deploy",
    "Documentation for the parts you will need to run and maintain",
  ],

  /** How to get from a first message to a number. */
  estimateSteps: [
    {
      title: "Describe the project",
      detail: "Use the enquiry form or email. What should the software do, who will use it, and what must it connect to?",
    },
    {
      title: "Scope conversation",
      detail: "A short discussion to clarify the workflow, the users and anything that has not been decided yet.",
    },
    {
      title: "Written estimate",
      detail: "A scope and price in writing — fixed where the requirements allow, staged where they do not.",
    },
    {
      title: "Build and check in",
      detail: "Work proceeds in visible stages so progress can be reviewed before the next piece begins.",
    },
  ],

  /** Honest notes about what pricing is not. */
  notes: [
    "Prices are quoted in Indian Rupees (INR).",
    "The starting price is a floor for a defined piece of custom work, not a fixed rate for every project.",
    "No figure other than the starting price is presented as a fact until a specific project has been scoped.",
  ],
};
