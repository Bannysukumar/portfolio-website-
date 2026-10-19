import { ArrowRight } from "lucide-react";
import { projects } from "../data/projects";
import "./pages.css";

/**
 * Not-found page. Prerendered to dist/404.html (served by static hosts for
 * unknown paths) and rendered in-app for client-side navigation to a route
 * that does not resolve. Marked noindex in its metadata.
 */
export function NotFound() {
  const suggestions = projects.filter((project) => project.featured).slice(0, 4);

  return (
    <div className="page nf">
      <div className="container">
        <p className="nf__code">Error 404</p>
        <h1 className="nf__title">
          That page <em>does not exist</em>.
        </h1>
        <p className="nf__text">
          The link may be old or mistyped. Everything on this site is reachable from the homepage, the project
          directory and the services page.
        </p>

        <div className="nf__links">
          <a className="btn" href="/">
            Back to homepage <ArrowRight size={15} aria-hidden="true" />
          </a>
          <a className="btn btn--ghost" href="/#directory">
            Project directory
          </a>
          <a className="btn btn--ghost" href="/services">
            Services
          </a>
        </div>

        <div className="nf__links" aria-label="Popular projects">
          {suggestions.map((project) => (
            <a className="btn btn--ghost" key={project.id} href={`/projects/${project.id}`}>
              {project.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
