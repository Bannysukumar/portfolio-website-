import { ArrowRight, ArrowUpRight, Github, Linkedin, Mail, Phone } from "lucide-react";
import { profile } from "../data/profile";
import { business } from "../data/business";
import { InquiryForm } from "./InquiryForm";
import { Reveal } from "./Reveal";
import "./Contact.css";

export function Contact() {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-heading">
      <div className="container">
        <Reveal>
          <p className="section-label">Contact</p>
          <h2 id="contact-heading" className="section-title contact__title">
            Have a project <em>in mind?</em>
          </h2>
          <p className="section-intro">
            Whether it's a full-stack product, a backend that needs to hold up, or a smart contract to review — my
            inbox is open. I usually reply within a day.
          </p>
        </Reveal>

        <div className="contact__grid">
          <Reveal>
            <a className="contact__card contact__card--primary" href={`mailto:${profile.email}`}>
              <span className="contact__card-icon" aria-hidden="true">
                <Mail size={22} />
              </span>
              <span className="contact__card-body">
                <span className="contact__card-label">Email</span>
                <span className="contact__card-value">{profile.email}</span>
              </span>
              <ArrowUpRight className="contact__card-arrow" size={20} aria-hidden="true" />
            </a>
          </Reveal>

          <Reveal delay={70}>
            <a className="contact__card" href={`tel:${profile.phoneHref}`}>
              <span className="contact__card-icon" aria-hidden="true">
                <Phone size={22} />
              </span>
              <span className="contact__card-body">
                <span className="contact__card-label">Phone</span>
                <span className="contact__card-value">{profile.phone}</span>
              </span>
              <ArrowUpRight className="contact__card-arrow" size={20} aria-hidden="true" />
            </a>
          </Reveal>

          <Reveal delay={140}>
            <a
              className="contact__card"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile (opens in a new tab)"
            >
              <span className="contact__card-icon" aria-hidden="true">
                <Github size={22} />
              </span>
              <span className="contact__card-body">
                <span className="contact__card-label">GitHub</span>
                <span className="contact__card-value">@{profile.handle}</span>
              </span>
              <ArrowUpRight className="contact__card-arrow" size={20} aria-hidden="true" />
            </a>
          </Reveal>

          <Reveal delay={210}>
            <a
              className="contact__card"
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile (opens in a new tab)"
            >
              <span className="contact__card-icon" aria-hidden="true">
                <Linkedin size={22} />
              </span>
              <span className="contact__card-body">
                <span className="contact__card-label">LinkedIn</span>
                <span className="contact__card-value">Adepu Sukumar</span>
              </span>
              <ArrowUpRight className="contact__card-arrow" size={20} aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        <div className="contact__form">
          <Reveal>
            <h3 className="contact__form-title">
              Send a <em>project enquiry</em>
            </h3>
            <p className="contact__form-intro">
              {business.servingLine} Share what needs to be built and you will get an honest read on scope and price.
            </p>
          </Reveal>
          <Reveal delay={60}>
            <InquiryForm />
          </Reveal>
          <Reveal>
            <p className="cta-row cta-row--spaced">
              <a className="btn btn--ghost" href="/contact">
                Contact page &amp; direct details <ArrowRight size={15} aria-hidden="true" />
              </a>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
