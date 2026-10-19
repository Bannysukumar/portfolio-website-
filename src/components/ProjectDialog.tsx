import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, Github, X } from "lucide-react";
import type { Project } from "../types/project";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";
import { LiveIndicator } from "./LiveIndicator";
import "./ProjectDialog.css";

interface ProjectDialogProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useLockBodyScroll(project !== null);

  // Move focus into the dialog on open; restore on close.
  useEffect(() => {
    if (!project) return;
    closeRef.current?.focus();
    const previouslyFocused = document.activeElement as HTMLElement | null;
    return () => previouslyFocused?.focus();
  }, [project]);

  // Escape closes; Tab is kept inside the dialog.
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return createPortal(
    <div className="dialog" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div
        className="dialog__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        ref={panelRef}
      >
        <button ref={closeRef} className="dialog__close" onClick={onClose} aria-label="Close project details">
          <X size={18} aria-hidden="true" />
        </button>

        {project.thumbnail && (
          <div className="dialog__media">
            <img
              src={project.thumbnail}
              alt={
                project.thumbnailIllustrative
                  ? `Illustrative artwork for ${project.title}`
                  : `Screenshot of ${project.title}`
              }
              loading="lazy"
              width={1200}
              height={750}
            />
            {project.thumbnailIllustrative && <span className="dialog__media-tag">Illustrative artwork</span>}
          </div>
        )}

        <div className="dialog__body">
          <p className="dialog__category">{project.category}</p>
          <h3 id="dialog-title" className="dialog__title">
            {project.title}
          </h3>
          <p className="dialog__lead">{project.description}</p>

          <div className="dialog__grid">
            <section aria-labelledby={`problem-${project.id}`}>
              <h4 id={`problem-${project.id}`}>The problem</h4>
              <p>{project.detail.problem}</p>
            </section>

            <section aria-labelledby={`approach-${project.id}`}>
              <h4 id={`approach-${project.id}`}>How it is built</h4>
              <ul className="dialog__list">
                {project.detail.approach.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section aria-labelledby={`features-${project.id}`}>
              <h4 id={`features-${project.id}`}>Key features</h4>
              <ul className="dialog__list">
                {project.features.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section aria-labelledby={`repos-${project.id}`}>
              <h4 id={`repos-${project.id}`}>Repositories</h4>
              <ul className="dialog__repos">
                {project.repos.map((repo) => (
                  <li key={repo.url}>
                    <a href={repo.url} target="_blank" rel="noopener noreferrer">
                      <Github size={15} aria-hidden="true" /> {repo.name}
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </a>
                    <span>{repo.role}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {project.detail.notes && (
            <p className="dialog__notes">
              <strong>Notes from the repository:</strong> {project.detail.notes}
            </p>
          )}

          <div className="dialog__footer">
            <ul className="dialog__stack" aria-label="Technology stack">
              {project.stack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
            <div className="dialog__links">
              <a className="btn btn--ghost" href={`/projects/${project.id}`}>
                Open full project page
              </a>
              <LiveIndicator live={project.live} />
              {project.live && project.live.status !== "deployment-missing" && (
                <a className="btn" href={project.live.url} target="_blank" rel="noopener noreferrer">
                  Visit project <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              )}
              <a className="btn btn--ghost" href={project.repos[0].url} target="_blank" rel="noopener noreferrer">
                <Github size={15} aria-hidden="true" /> Source
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
