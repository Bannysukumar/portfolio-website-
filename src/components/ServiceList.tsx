import { ArrowRight } from "lucide-react";
import { services } from "../data/services";

/** The full service catalogue, one detailed block per service. */
export function ServiceList() {
  return (
    <div className="svc-list">
      {services.map((service) => (
        <article className="svc" id={service.id} key={service.id}>
          <header className="svc__head">
            <h2 className="svc__title">{service.title}</h2>
            <p className="svc__tagline">{service.tagline}</p>
            <p className="svc__summary">{service.summary}</p>
          </header>

          <div className="svc__grid">
            <div className="svc__block">
              <h3>What it includes</h3>
              <ul>
                {service.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="svc__block">
              <h3>Problems it solves</h3>
              <ul>
                {service.problems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="svc__block">
              <h3>What you provide</h3>
              <ul>
                {service.clientProvides.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="svc__block">
              <h3>What affects cost &amp; time</h3>
              <ul>
                {service.costFactors.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="svc__evidence">
            <h3>Examples from the portfolio</h3>
            <ul>
              {service.evidence.map((item) => (
                <li key={item.label}>
                  <strong>{item.label}</strong>
                  <span> — {item.detail}</span>
                  {item.projectId && (
                    <>
                      {" "}
                      <a href={`/projects/${item.projectId}`}>
                        View project <ArrowRight size={12} aria-hidden="true" />
                      </a>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <p className="svc__cta">
            <a className="btn" href="/contact">
              Discuss this project <ArrowRight size={15} aria-hidden="true" />
            </a>
          </p>
        </article>
      ))}
    </div>
  );
}
