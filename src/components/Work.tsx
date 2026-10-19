import { useState } from "react";
import { ArrowDown, FolderGit2, Github } from "lucide-react";
import { directory } from "../data/directory";
import { projects } from "../data/projects";
import { profile } from "../data/profile";
import { ProjectCard } from "./ProjectCard";
import { ProjectDialog } from "./ProjectDialog";
import { Reveal } from "./Reveal";
import type { Project } from "../types/project";
import "./Work.css";

export function Work() {
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const featured = projects.filter((project) => project.featured);
  const [lead, ...restFeatured] = featured;
  const supporting = projects.filter((project) => !project.featured);

  return (
    <section id="work" className="section work" aria-labelledby="work-heading">
      <div className="container">
        <Reveal>
          <p className="section-label">Selected work</p>
          <h2 id="work-heading" className="section-title">
            Projects I can <em>stand behind</em>.
          </h2>
          <p className="section-intro">
            Every project here maps to public repositories you can read, run and review. Live links were checked
            during the last update of this catalogue; where a deployment is down, the source is offered instead.
          </p>
        </Reveal>

        {/* ---- Lead project ---- */}
        <div className="work__lead">
          <Reveal>
            <ProjectCard project={lead} variant="large" onOpen={setOpenProject} />
          </Reveal>
        </div>

        {/* ---- Remaining featured, two-up ---- */}
        <div className="work__grid work__grid--two">
          {restFeatured.slice(0, 2).map((project, index) => (
            <Reveal key={project.id} delay={index * 90}>
              <ProjectCard project={project} onOpen={setOpenProject} />
            </Reveal>
          ))}
        </div>

        {/* ---- Remaining featured, three-up ---- */}
        <div className="work__grid work__grid--three">
          {restFeatured.slice(2).map((project, index) => (
            <Reveal key={project.id} delay={index * 80}>
              <ProjectCard project={project} onOpen={setOpenProject} />
            </Reveal>
          ))}
        </div>

        {/* ---- Supporting projects ---- */}
        <Reveal>
          <div className="work__subhead">
            <h3 className="work__subhead-title">More shipped products</h3>
            <p className="work__subhead-note">Live links verified 19 Oct 2026 unless noted.</p>
          </div>
        </Reveal>

        <div className="work__grid work__grid--three">
          {supporting.map((project, index) => (
            <Reveal key={project.id} delay={(index % 3) * 70}>
              <ProjectCard project={project} onOpen={setOpenProject} />
            </Reveal>
          ))}
        </div>

        {/* ---- Entry point to the full directory ---- */}
        <Reveal>
          <div className="work__subhead">
            <h3 className="work__subhead-title">
              <FolderGit2 size={20} aria-hidden="true" /> The complete directory
            </h3>
            <p className="work__subhead-note">
              Search, filter and sort every public repository — descriptions, languages, topics and verified
              deployments.
            </p>
          </div>
          <p className="work__cta">
            <a className="btn btn--ghost" href="#directory">
              Explore All Projects — {directory.length} Repositories
              <ArrowDown size={16} aria-hidden="true" />
            </a>
          </p>
        </Reveal>

        <Reveal>
          <p className="work__more">
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              <Github size={16} aria-hidden="true" /> Everything on GitHub — @Bannysukumar
            </a>
          </p>
        </Reveal>
      </div>

      <ProjectDialog project={openProject} onClose={() => setOpenProject(null)} />
    </section>
  );
}
