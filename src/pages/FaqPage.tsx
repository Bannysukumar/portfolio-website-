import { ArrowRight } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { FaqList } from "../components/FaqList";
import { Reveal } from "../components/Reveal";
import { faqs } from "../data/faq";
import { business } from "../data/business";
import type { RouteMeta } from "../seo/meta";
import "./pages.css";

/** Full FAQ page. The same data feeds the FAQPage structured data. */
export function FaqPage({ meta }: { meta: RouteMeta }) {
  return (
    <div className="page">
      <PageHeader
        meta={meta}
        label="FAQ"
        title={
          <>
            Straight answers, <em>no padding</em>.
          </>
        }
        intro="What clients ask before starting a project — services, pricing, how work is arranged, and how to get an estimate."
      />

      <div className="container">
        <Reveal>
          <FaqList items={faqs} idPrefix="faq" />
        </Reveal>

        <Reveal>
          <p className="cta-row cta-row--spaced">
            <a className="btn" href="/contact">
              {business.ctaLabel} <ArrowRight size={15} aria-hidden="true" />
            </a>
            <a className="btn btn--ghost" href="/services">
              Explore services
            </a>
          </p>
        </Reveal>
      </div>
    </div>
  );
}
