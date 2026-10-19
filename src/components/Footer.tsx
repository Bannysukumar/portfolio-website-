import { ArrowUp } from "lucide-react";
import { profile } from "../data/profile";
import { footerLinks } from "../data/nav";
import { business, serviceAreasSentence } from "../data/business";
import "./Footer.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__mark" aria-hidden="true">
            AS
          </span>
          <div>
            <p className="footer__name">{profile.name}</p>
            <p className="footer__role">{profile.role}</p>
          </div>
        </div>

        <nav aria-label="Footer">
          <ul className="footer__links">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__end">
          <ul className="footer__social">
            <li>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`}>Email</a>
            </li>
          </ul>
          <a className="footer__top" href="/#top" aria-label="Back to top">
            <ArrowUp size={16} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="container footer__legal">
        <p>
          © <span id="copyright-year">{year}</span> {profile.name}. {business.positioning} — {business.servingLine}{" "}
          Working with clients in {serviceAreasSentence()}.
        </p>
        <p>
          Designed and built by me with React, TypeScript, Vite and GSAP. Every project shown links to its public
          source.
        </p>
      </div>
    </footer>
  );
}
