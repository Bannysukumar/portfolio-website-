import { journey } from "../data/journey";
import { Reveal } from "./Reveal";
import "./Journey.css";

export function Journey() {
  return (
    <section id="journey" className="section journey" aria-labelledby="journey-heading">
      <div className="container">
        <Reveal>
          <p className="section-label">Journey</p>
          <h2 id="journey-heading" className="section-title">
            How the work <em>evolved</em>.
          </h2>
          <p className="section-intro">
            Not a résumé — a project history, ordered by when the repositories first appeared on GitHub.
          </p>
        </Reveal>

        <ol className="journey__timeline">
          {journey.map((entry, index) => (
            <Reveal as="li" key={entry.period} delay={index * 80} className="journey__item">
              <p className="journey__period">{entry.period}</p>
              <div className="journey__content">
                <h3 className="journey__title">{entry.title}</h3>
                <p className="journey__body">{entry.body}</p>
              </div>
              <p className="journey__evidence">{entry.evidence}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
