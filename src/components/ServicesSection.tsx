import { ArrowRight } from "lucide-react";
import { services } from "../data/services";
import { business } from "../data/business";
import { Reveal } from "./Reveal";
import "./Services.css";

/** Homepage summary of the services, linking into the full services page. */
export function ServicesSection() {
  return (
    <section id="services" className="section services" aria-labelledby="services-heading">
      <div className="container">
        <Reveal>
          <p className="section-label">Services</p>
          <h2 id="services-heading" className="section-title">
            What I can <em>build for you</em>.
          </h2>
          <p className="section-intro">
            Freelance software development for businesses across South India — websites, web applications and the
            backends behind them. {business.pricingStatement}
          </p>
        </Reveal>

        <div className="services__grid">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={(index % 3) * 60}>
              <article className="svc-card">
                <h3 className="svc-card__title">{service.title}</h3>
                <p className="svc-card__tagline">{service.tagline}</p>
                <a className="svc-card__link" href={`/services#${service.id}`}>
                  What it includes <ArrowRight size={13} aria-hidden="true" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="cta-row">
            <a className="btn" href="/services">
              All services in detail <ArrowRight size={15} aria-hidden="true" />
            </a>
            <a className="btn btn--ghost" href="/pricing">
              See pricing
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
