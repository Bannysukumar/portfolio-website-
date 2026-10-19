import { profile } from "../data/profile";
import { Reveal } from "./Reveal";
import "./About.css";

export function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-heading">
      <div className="container about__inner">
        <div className="about__aside">
          <Reveal>
            <p className="section-label">About</p>
            <h2 id="about-heading" className="section-title">
              Full-stack, <em>literally</em>.
            </h2>
          </Reveal>

          <Reveal delay={90}>
            <ul className="about__focus" aria-label="Areas of focus">
              {profile.about.focusList.map((focus) => (
                <li key={focus}>{focus}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={60}>
          <div className="about__body">
            <p className="about__lead">{profile.about.intro}</p>
            {profile.about.body.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
            <p className="about__signoff">
              The work speaks for itself — <a href="#work">start with the projects</a>, or{" "}
              <a href="#contact">skip to a conversation</a>.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
