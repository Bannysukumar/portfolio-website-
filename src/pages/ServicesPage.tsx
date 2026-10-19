import { ArrowRight } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { ServiceList } from "../components/ServiceList";
import { Reveal } from "../components/Reveal";
import { services } from "../data/services";
import { business } from "../data/business";
import type { RouteMeta } from "../seo/meta";
import "./pages.css";

/**
 * Services page. Every service is evidenced by a project in the public
 * catalogue; the service-area block describes where clients are served
 * (remote/direct), not a claim of a physical office.
 */
export function ServicesPage({ meta }: { meta: RouteMeta }) {
  return (
    <div className="page">
      <PageHeader
        meta={meta}
        label="Services"
        title={
          <>
            Freelance software development, <em>end to end</em>.
          </>
        }
        intro={
          <>
            {services.length} services, each backed by real projects you can inspect — from a business website to a
            platform with accounts, admin screens and a backend. {business.servingLine}
          </>
        }
      />

      <div className="container">
        <Reveal>
          <ServiceList />
        </Reveal>

        <Reveal>
          <section className="region-block" aria-labelledby="regions-heading">
            <h2 id="regions-heading">Service areas</h2>
            <p>
              I work with clients across South India, remotely and directly. These are service areas, not physical
              offices — collaboration happens over calls, shared repositories and regular check-ins.
            </p>
            <div className="region-grid">
              {business.serviceAreas.map((area) => (
                <div className="region-card" key={area.id}>
                  <h3>{area.name}</h3>
                  <p>{area.phrase}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <p className="cta-row cta-row--spaced">
            <a className="btn" href="/contact">
              {business.ctaLabel} <ArrowRight size={15} aria-hidden="true" />
            </a>
            <a className="btn btn--ghost" href="/pricing">
              See pricing
            </a>
          </p>
        </Reveal>
      </div>
    </div>
  );
}
