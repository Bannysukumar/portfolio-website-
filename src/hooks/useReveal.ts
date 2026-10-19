import { useEffect } from "react";

/**
 * Observes `.reveal` elements inside the given root and adds `is-visible`
 * once they enter the viewport. Pure IntersectionObserver — no scroll
 * handlers, so it stays cheap during scroll.
 */
export function useReveal(rootRef: React.RefObject<HTMLElement | null>, routeKey?: string): void {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>(".reveal"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [rootRef, routeKey]);
}
