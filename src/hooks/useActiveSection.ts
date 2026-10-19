import { useEffect, useState } from "react";

/** Tracks which section id is currently in view, for nav highlighting. */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (!sections.length || !("IntersectionObserver" in window)) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });
        let best = "";
        let ratio = 0;
        visible.forEach((value, key) => {
          if (value > ratio) {
            ratio = value;
            best = key;
          }
        });
        if (best) setActive(best);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.15, 0.4, 0.75] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
