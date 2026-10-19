import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import { profile } from "../data/profile";
import { SystemDiagram } from "./SystemDiagram";
import "./Hero.css";

export function Hero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .from(".hero__kicker", { y: 18, opacity: 0, duration: 0.6 })
        .from(".hero__line > span", { yPercent: 110, duration: 0.9, stagger: 0.12 }, "-=0.25")
        .from(".hero__accent", { opacity: 0.15, duration: 1.2 }, "<0.15")
        .from(".hero__summary", { y: 20, opacity: 0, duration: 0.7 }, "-=0.5")
        .from(".hero__cta > *", { y: 16, opacity: 0, duration: 0.55, stagger: 0.09 }, "-=0.4")
        .from(".hero__diagram", { y: 28, opacity: 0, duration: 0.9 }, "-=0.85")
        .from(".hero__meta", { opacity: 0, duration: 0.6 }, "-=0.4");
    },
    { scope },
  );

  return (
    <section id="top" className="hero" ref={scope} aria-labelledby="hero-heading">
      <div className="hero__glow" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__kicker">
            <span className="hero__pulse" aria-hidden="true" />
            {profile.hero.kicker}
          </p>

          <h1 id="hero-heading" className="hero__headline">
            <span className="hero__line">
              <span>{profile.hero.headlineLead}</span>
            </span>
            <span className="hero__line">
              <span className="hero__accent">{profile.hero.headlineAccent}</span>
            </span>
            <span className="hero__line">
              <span>{profile.hero.headlineTail}</span>
            </span>
          </h1>

          <p className="hero__summary">{profile.hero.summary}</p>

          <div className="hero__cta">
            <a className="btn" href="/#work">
              Explore my work <ArrowDown size={16} aria-hidden="true" />
            </a>
            <a className="btn btn--ghost" href="/#contact">
              <Mail size={16} aria-hidden="true" /> Get in touch
            </a>
          </div>

          <dl className="hero__meta">
            <div>
              <dt>Public repositories</dt>
              <dd>~100</dd>
            </div>
            <div>
              <dt>Live deployments</dt>
              <dd>15+</dd>
            </div>
            <div>
              <dt>Core stack</dt>
              <dd>React · FastAPI · Solidity</dd>
            </div>
          </dl>
        </div>

        <div className="hero__diagram">
          <SystemDiagram />
          <a
            className="hero__diagram-link"
            href="https://manajntuhresults.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            See it live <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
