import { ArrowRight } from "lucide-react";
import { featuredFaqs } from "../data/faq";
import { FaqList } from "./FaqList";
import { Reveal } from "./Reveal";

/** Homepage teaser for the FAQ — a few real questions, linking to the full page. */
export function FaqSection() {
  return (
    <section id="faq" className="section faq-section" aria-labelledby="faq-heading">
      <div className="container">
        <Reveal>
          <p className="section-label">FAQ</p>
          <h2 id="faq-heading" className="section-title">
            Questions clients <em>actually ask</em>.
          </h2>
          <p className="section-intro">
            Short, straight answers about services, pricing and how work is arranged.
          </p>
        </Reveal>

        <Reveal delay={70}>
          <FaqList items={featuredFaqs} idPrefix="home-faq" />
        </Reveal>

        <Reveal>
          <p className="cta-row cta-row--spaced">
            <a className="btn btn--ghost" href="/faq">
              Read all questions <ArrowRight size={15} aria-hidden="true" />
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
