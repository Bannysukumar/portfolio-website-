import { ArrowUpRight } from "lucide-react";
import type { LiveLink } from "../types/project";
import "./LiveIndicator.css";

const LABELS: Record<NonNullable<LiveLink>["status"], string> = {
  "verified-live": "Live · verified",
  "responds-but-unrendered": "Live · partially verified",
  "deployment-missing": "Deployment offline",
  "source-only": "Source only",
};

/**
 * Honest link affordance: a real anchor when a working deployment exists,
 * a plain status label when it does not. Status is never conveyed by color
 * alone — each state carries its own text.
 */
export function LiveIndicator({ live }: { live?: LiveLink }) {
  if (!live) {
    return (
      <span className="status-chip">
        <span className="dot" aria-hidden="true" />
        Source only
      </span>
    );
  }

  const works = live.status === "verified-live" || live.status === "responds-but-unrendered";

  if (!works) {
    return (
      <span className="status-chip" title={live.note}>
        <span className="dot" aria-hidden="true" />
        {LABELS[live.status]}
      </span>
    );
  }

  return (
    <a
      className={`status-chip status-chip--live status-chip--link`}
      href={live.url}
      target="_blank"
      rel="noopener noreferrer"
      title={live.note}
    >
      <span className="dot" aria-hidden="true" />
      {LABELS[live.status]} <ArrowUpRight size={12} aria-hidden="true" />
    </a>
  );
}
