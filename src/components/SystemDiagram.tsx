import "./SystemDiagram.css";

/**
 * A hand-built, animated architecture diagram of the Mana JNTUH Results
 * platform — the layers are the real ones from that repository
 * (Next.js frontend → FastAPI service → PostgreSQL / Redis / RabbitMQ).
 * Pure SVG + CSS; honors prefers-reduced-motion via CSS.
 */
export function SystemDiagram() {
  return (
    <figure className="diagram">
      <svg
        viewBox="0 0 460 420"
        className="diagram__svg"
        role="img"
        aria-label="Architecture diagram of the Mana JNTUH Results platform: a Next.js frontend sends requests to a FastAPI service, which uses PostgreSQL, Redis and RabbitMQ."
      >
        <defs>
          <linearGradient id="lineFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f0a24b" stopOpacity="0.7" />
            <stop offset="1" stopColor="#f0a24b" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* connectors */}
        <path id="diag-path-1" d="M230 108 L230 172" stroke="url(#lineFade)" strokeWidth="1.5" fill="none" />
        <path id="diag-path-2" d="M230 256 L230 300" stroke="url(#lineFade)" strokeWidth="1.5" fill="none" />
        <path id="diag-path-3" d="M120 360 L340 360" stroke="#f2efe9" strokeOpacity="0.12" strokeWidth="1.5" fill="none" />

        {/* travelling signals */}
        <circle r="3.5" fill="#ffb964" className="diagram__signal diagram__signal--1">
          <animateMotion dur="2.6s" repeatCount="indefinite" path="M230 108 L230 172" />
        </circle>
        <circle r="3.5" fill="#ffb964" className="diagram__signal diagram__signal--2">
          <animateMotion dur="2.6s" begin="0.9s" repeatCount="indefinite" path="M230 256 L230 300" />
        </circle>
        <circle r="2.5" fill="#8fbf8a" className="diagram__signal diagram__signal--3">
          <animateMotion dur="3.4s" begin="0.4s" repeatCount="indefinite" path="M120 360 L340 360" />
        </circle>

        {/* layer 1 — frontend */}
        <g className="diagram__node">
          <rect x="115" y="44" width="230" height="64" rx="12" />
          <text x="230" y="72" textAnchor="middle" className="diagram__label">
            Next.js · TypeScript
          </text>
          <text x="230" y="93" textAnchor="middle" className="diagram__sub">
            results · backlogs · admin
          </text>
        </g>

        {/* layer 2 — service */}
        <g className="diagram__node">
          <rect x="115" y="172" width="230" height="84" rx="12" />
          <text x="230" y="204" textAnchor="middle" className="diagram__label">
            FastAPI service
          </text>
          <text x="230" y="226" textAnchor="middle" className="diagram__sub">
            scrapers · api · subscriptions
          </text>
          <text x="230" y="245" textAnchor="middle" className="diagram__sub">
            docker · prometheus
          </text>
        </g>

        {/* layer 3 — data */}
        <g className="diagram__node diagram__node--data">
          <rect x="60" y="330" width="120" height="60" rx="12" />
          <text x="120" y="358" textAnchor="middle" className="diagram__label">
            PostgreSQL
          </text>
          <text x="120" y="377" textAnchor="middle" className="diagram__sub">
            prisma
          </text>

          <rect x="190" y="330" width="80" height="60" rx="12" />
          <text x="230" y="364" textAnchor="middle" className="diagram__label">
            Redis
          </text>

          <rect x="280" y="330" width="120" height="60" rx="12" />
          <text x="340" y="358" textAnchor="middle" className="diagram__label">
            RabbitMQ
          </text>
          <text x="340" y="377" textAnchor="middle" className="diagram__sub">
            queue
          </text>
        </g>
      </svg>

      <figcaption className="diagram__caption">
        <span className="diagram__caption-label">Architecture</span>
        Mana JNTUH Results — one of the projects below
      </figcaption>
    </figure>
  );
}
