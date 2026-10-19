import { ArrowRight } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Reveal } from "../components/Reveal";
import { pricing } from "../data/pricing";
import { business } from "../data/business";
import type { RouteMeta } from "../seo/meta";
import "./pages.css";

/**
 * Pricing page. The only figure presented as fact is the confirmed starting
 * price. Unconfirmed figures (typical project value, clients per month) are
 * deliberately absent — see src/data/business.ts.
 */
export function PricingPage({ meta }: { meta: RouteMeta }) {
  return (
    <div className="page">
      <PageHeader
        meta={meta}
        label="Pricing"
        title={
          <>
            Pricing that is <em>agreed before work starts</em>.
          </>
        }
        intro={pricing.statement}
      />

      <div className="container">
        <Reveal>
          <div className="pricing__band pricing__band--flush">
            <p className="pricing__from">
              From <strong>{pricing.startingPriceLabel}</strong>
            </p>
            <p className="pricing__statement">{business.servingLine} {business.modelDetail}</p>
          </div>
        </Reveal>

        <section className="page__section--tight" aria-labelledby="cost-heading">
          <p className="section-label">What moves the number</p>
          <h2 id="cost-heading" className="section-title">
            The factors that <em>change the price</em>.
          </h2>
          <div className="pricing-page__grid">
            {pricing.costFactors.map((factor) => (
              <article className="pricing-page__card" key={factor.label}>
                <h3>{factor.label}</h3>
                <p>{factor.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="page__section--tight" aria-labelledby="included-heading">
          <p className="section-label">In every quote</p>
          <h2 id="included-heading" className="section-title">
            What an estimate <em>includes</em>.
          </h2>
          <ul className="pricing-page__list">
            {pricing.includedInQuote.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="page__section--tight" aria-labelledby="steps-heading">
          <p className="section-label">Process</p>
          <h2 id="steps-heading" className="section-title">
            From first message to <em>a number</em>.
          </h2>
          <ol className="pricing-page__steps">
            {pricing.estimateSteps.map((step) => (
              <li className="pricing-page__step" key={step.title}>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div className="pricing-page__notes">
          <h3>Notes on pricing</h3>
          <ul className="pricing-page__list">
            {pricing.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>

        <p className="cta-row cta-row--spaced">
          <a className="btn" href={pricing.cta.href}>
            {pricing.cta.label} <ArrowRight size={15} aria-hidden="true" />
          </a>
          <a className="btn btn--ghost" href="/services">
            See what is offered
          </a>
        </p>
      </div>
    </div>
  );
}
