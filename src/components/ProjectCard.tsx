import { ArrowUpRight, Github, Maximize2 } from "lucide-react";
import type { Project } from "../types/project";
import { LiveIndicator } from "./LiveIndicator";

interface ProjectCardProps {
  project: Project;
  variant?: "large" | "standard";
  onOpen: (project: Project) => void;
}

export function ProjectCard({ project, variant = "standard", onOpen }: ProjectCardProps) {
  const repo = project.repos[0];

  return (
    <article className={`pcard pcard--${variant}`}>
      <button
        className="pcard__media"
        onClick={() => onOpen(project)}
        aria-label={
          project.thumbnailIllustrative
            ? `Illustrative artwork for ${project.title} — open project details`
            : `Open details for ${project.title}`
        }
      >
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={
              project.thumbnailIllustrative
                ? `Illustrative artwork representing ${project.title}`
                : `Screenshot of the ${project.title} application`
            }
            loading="lazy"
            width={1200}
            height={750}
          />
        ) : (
          <div className="pcard__placeholder" aria-hidden="true" />
        )}
        {project.thumbnailIllustrative && <span className="pcard__tag">Illustrative</span>}
        <span className="pcard__zoom" aria-hidden="true">
          <Maximize2 size={15} />
        </span>
      </button>

      <div className="pcard__body">
        <div className="pcard__head">
          <p className="pcard__category">{project.category}</p>
          <LiveIndicator live={project.live} />
        </div>

        {/* Real anchor so crawlers can discover the dedicated project page; the
            media button and "Details" still open the quick-view dialog. */}
        <h3 className="pcard__title">
          <a href={`/projects/${project.id}`}>{project.title}</a>
        </h3>
        <p className="pcard__tagline">{project.tagline}</p>

        {variant === "large" && <p className="pcard__description">{project.description}</p>}

        <ul className="pcard__stack" aria-label={`Technologies used in ${project.title}`}>
          {project.stack.slice(0, variant === "large" ? 8 : 5).map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
          {variant !== "large" && project.stack.length > 5 && (
            <li className="pcard__stack-more">+{project.stack.length - 5}</li>
          )}
        </ul>

        <div className="pcard__links">
          <button className="pcard__details" onClick={() => onOpen(project)}>
            Details
          </button>
          {project.live &&
            (project.live.status === "verified-live" || project.live.status === "responds-but-unrendered") && (
              <a href={project.live.url} target="_blank" rel="noopener noreferrer">
                Live <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            )}
          <a href={repo.url} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} source on GitHub`}>
            <Github size={14} aria-hidden="true" /> Source
          </a>
        </div>
      </div>
    </article>
  );
}
