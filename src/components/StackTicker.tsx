import "./StackTicker.css";

const ITEMS = [
  "React",
  "Next.js",
  "TypeScript",
  "FastAPI",
  "Spring Boot",
  "Node.js",
  "Solidity",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "RabbitMQ",
  "Firebase",
  "Docker",
  "Android",
  "Hardhat",
  "Asterisk PBX",
];

/**
 * A restrained marquee of the core stack. Pure CSS animation; becomes a
 * static wrapped list under prefers-reduced-motion.
 */
export function StackTicker() {
  const row = (ariaHidden: boolean) => (
    <ul className="ticker__row" aria-hidden={ariaHidden || undefined}>
      {ITEMS.map((item) => (
        <li key={item}>
          {item}
          <span className="ticker__dot" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="ticker" role="img" aria-label={`Core technologies: ${ITEMS.join(", ")}`}>
      <div className="ticker__track">{row(false)}</div>
      <div className="ticker__track" aria-hidden="true">
        {row(true)}
      </div>
    </div>
  );
}
