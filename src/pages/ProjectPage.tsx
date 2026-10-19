import { ArrowLeft, ArrowRight, Github } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { LiveIndicator } from "../components/LiveIndicator";
import { Reveal } from "../components/Reveal";
import { business } from "../data/business";
import type { Project } from "../types/project";
import type { RouteMeta } from "../seo/meta";
import "./pages.css";

/**
 * Individual project page. Content comes entirely from the curated project
 * record — no invented metrics, outcomes or testimonials. Live links are shown
 * only when the deployment was verified.
 */
export function ProjectPage({ project, meta }: { project: Project; meta: RouteMeta }) {
  return (
    <div className="page">
      <PageHeader
        meta={meta}
        label={project.category}
        title={project.title}
        intro={project.tagline}
      />

      <div className="container">
        <div className="proj__head">
          <LiveIndicator live={project.live} />
          <span className="proj__category">
            {project.repos.length} {project.repos.length === 1 ? "repository" : "repositories"}
          </span>
        </div>

        {project.thumbnail && (
          <Reveal>
            <figure className="proj__media">
              <img
                src={project.thumbnail}
                alt={
                  project.thumbnailIllustrative
                    ? `Illustrative artwork representing ${project.title}`
                    : `Screenshot of the ${project.title} application`
                }
                width={1280}
                height={720}
                loading="eager"
                decoding="async"
              />
              {project.thumbnailIllustrative && (
                <figcaption className="proj__tag">Illustrative artwork — not a product screenshot</figcaption>
              )}
            </figure>
          </Reveal>
        )}

        <Reveal>
          <p className="proj__lead">{project.description}</p>
        </Reveal>

        <Reveal>
          <ul className="proj__stack" aria-label="Technologies used">
            {project.stack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </Reveal>

        <div className="proj__sections">
          <Reveal>
            <section className="proj__block" aria-labelledby="problem-heading">
              <h2 id="problem-heading">The problem</h2>
              <p>{project.detail.problem}</p>
            </section>
          </Reveal>

          <Reveal delay={60}>
            <section className="proj__block" aria-labelledby="approach-heading">
              <h2 id="approach-heading">How it is built</h2>
              <ul>
                {project.detail.approach.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal delay={90}>
            <section className="proj__block" aria-labelledby="features-heading">
              <h2 id="features-heading">Key features</h2>
              <ul>
                {project.features.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal delay={120}>
            <section className="proj__block" aria-labelledby="source-heading">
              <h2 id="source-heading">Repositories</h2>
              <ul className="proj__repos">
                {project.repos.map((repo) => (
                  <li key={repo.url}>
                    <a href={repo.url} target="_blank" rel="noopener noreferrer">
                      <Github size={15} aria-hidden="true" /> {repo.name}
                    </a>
                    <p>
                      {repo.role} · <em>{repo.language}</em>
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        </div>

        {project.detail.notes && <p className="proj__notes">{project.detail.notes}</p>}

        <div className="proj__actions">
          <LiveIndicator live={project.live} />
          <a className="btn btn--ghost" href="/#directory">
            <ArrowLeft size={15} aria-hidden="true" /> Browse all repositories
          </a>
          <a className="btn" href="/contact">
            {business.ctaLabel} <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
