import { skillGroups } from "../data/skills";
import { Reveal } from "./Reveal";
import "./Skills.css";

export function Skills() {
  return (
    <section id="skills" className="section skills" aria-labelledby="skills-heading">
      <div className="container">
        <Reveal>
          <p className="section-label">Capabilities</p>
          <h2 id="skills-heading" className="section-title">
            Tools I actually <em>ship with</em>.
          </h2>
          <p className="section-intro">
            Grouped by where they run in a real system. Every technology below appears in at least one public
            repository — the hint on each row names where to look.
          </p>
        </Reveal>

        <div className="skills__grid">
          {skillGroups.map((group, groupIndex) => (
            <Reveal key={group.id} delay={groupIndex * 70}>
              <div className="skills__group">
                <h3 className="skills__group-title">{group.label}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item.name} className="skills__item">
                      <span className="skills__name">{item.name}</span>
                      {item.proof && <span className="skills__proof">{item.proof}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
