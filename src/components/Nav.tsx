import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { profile } from "../data/profile";
import { navLinks, SECTION_IDS, type NavLink } from "../data/nav";
import { useActiveSection } from "../hooks/useActiveSection";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";
import { useRouter } from "../router/router";
import "./Nav.css";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const activeSection = useActiveSection(SECTION_IDS);
  const { path } = useRouter();
  useLockBodyScroll(open);

  /** A page link is active on its route; a section link only on the homepage. */
  const isActive = (link: NavLink) =>
    link.kind === "page" ? path === link.id : path === "/" && activeSection === link.id;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape and return focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Close the menu after clicking away from it.
  useEffect(() => {
    if (!open) return;
    const onClick = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !toggleRef.current?.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open]);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <nav className="nav__inner container" aria-label="Primary">
        <a className="nav__brand" href="/">
          <span className="nav__mark" aria-hidden="true">
            AS
          </span>
          <span className="nav__name">{profile.name}</span>
        </a>

        <ul className="nav__links">
          {navLinks.map((link) => {
            const active = isActive(link);
            return (
              <li key={link.href}>
                <a href={link.href} className={active ? "is-active" : ""} aria-current={active ? "true" : undefined}>
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="nav__actions">
          <a
            className="nav__github"
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile (opens in a new tab)"
          >
            GitHub <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <button
            ref={toggleRef}
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <div id="mobile-menu" ref={menuRef} className={`nav__mobile ${open ? "is-open" : ""}`} hidden={!open}>
        <ul>
          {navLinks.map((link, index) => (
            <li key={link.href} style={{ transitionDelay: `${60 + index * 40}ms` }}>
              <a href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
          <li style={{ transitionDelay: "300ms" }}>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
              GitHub <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
