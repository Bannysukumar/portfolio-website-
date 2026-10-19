import { ArrowRight } from "lucide-react";
import { pricing } from "../data/pricing";
import { Reveal } from "./Reveal";
import "./Pricing.css";

/** Homepage pricing band — the confirmed starting price and the CTA. */
export function PricingSection() {
  return (
    <section id="pricing" className="section pricing" aria-labelledby="pricing-heading">
      <div className="container">
        <Reveal>
          <p className="section-label">Pricing</p>
          <h2 id="pricing-heading" className="section-title">
            Honest pricing, <em>agreed up front</em>.
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div className="pricing__band">
            <p className="pricing__from">
              From <strong>{pricing.startingPriceLabel}</strong>
            </p>
            <p className="pricing__statement">{pricing.statement}</p>
            <p className="cta-row">
              <a className="btn" href={pricing.cta.href}>
                {pricing.cta.label} <ArrowRight size={15} aria-hidden="true" />
              </a>
              <a className="btn btn--ghost" href="/pricing">
                How pricing works
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
