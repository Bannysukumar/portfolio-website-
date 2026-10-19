import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { InquiryForm } from "../components/InquiryForm";
import { profile } from "../data/profile";
import { business } from "../data/business";
import type { RouteMeta } from "../seo/meta";
import "./pages.css";

/** Contact page: the enquiry form plus direct contact details and service areas. */
export function ContactPage({ meta }: { meta: RouteMeta }) {
  return (
    <div className="page">
      <PageHeader
        meta={meta}
        label="Contact"
        title={
          <>
            Tell me what you need <em>built</em>.
          </>
        }
        intro="Share the project type, the features that matter, a rough budget and your timeline. You will get an honest read on scope and price — usually within a day."
      />

      <div className="container">
        <div className="contact-page__grid">
          <section aria-labelledby="form-heading">
            <h2 id="form-heading" className="section-title">
              Project <em>enquiry</em>
            </h2>
            <InquiryForm />
          </section>

          <aside className="contact-page__aside" aria-label="Direct contact details">
            <div className="contact-page__row">
              <a className="contact-page__link" href={`mailto:${profile.email}`}>
                <Mail size={18} aria-hidden="true" />
                <span>
                  <small>Email</small>
                  <strong>{profile.email}</strong>
                </span>
              </a>
              <a className="contact-page__link" href={`tel:${profile.phoneHref}`}>
                <Phone size={18} aria-hidden="true" />
                <span>
                  <small>Phone</small>
                  <strong>{profile.phone}</strong>
                </span>
              </a>
              <a className="contact-page__link" href={profile.github} target="_blank" rel="noopener noreferrer">
                <Github size={18} aria-hidden="true" />
                <span>
                  <small>GitHub</small>
                  <strong>@{profile.handle}</strong>
                </span>
              </a>
              <a className="contact-page__link" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin size={18} aria-hidden="true" />
                <span>
                  <small>LinkedIn</small>
                  <strong>Adepu Sukumar</strong>
                </span>
              </a>
            </div>

            <div className="region-block">
              <h2>Service areas</h2>
              <p>Remote, direct collaboration for clients across:</p>
              <ul className="pricing-page__list">
                {business.serviceAreas.map((area) => (
                  <li key={area.id}>
                    {area.name}
                    {area.parent ? `, ${area.parent}` : ""}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
