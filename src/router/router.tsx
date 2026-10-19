import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

/**
 * Minimal client-side router for a prerendered multi-page site.
 *
 * - Real, crawlable <a href> links are used everywhere; this only intercepts
 *   same-origin clicks to avoid a full page load.
 * - Same-page hash links are left to the browser, so anchor focus behaviour
 *   (including the skip link) is native.
 * - Hash and query strings are ignored when matching routes.
 * - SSR-safe: nothing touches `window` at module scope or during render.
 */

interface RouterValue {
  /** Current route path, e.g. "/services". */
  path: string;
  /** Current hash without "#", or "". */
  hash: string;
  navigate: (to: string, options?: { replace?: boolean }) => void;
}

const RouterContext = createContext<RouterValue | null>(null);

export function normalizePath(input: string): string {
  let path = (input || "/").split("#")[0].split("?")[0];
  if (!path.startsWith("/")) path = `/${path}`;
  path = path.replace(/\/{2,}/g, "/");
  if (path.length > 1) path = path.replace(/\/+$/, "");
  return path || "/";
}

export function parseHash(input: string): string {
  const index = input.indexOf("#");
  return index >= 0 ? input.slice(index + 1) : "";
}

export function RouterProvider({ initialPath = "/", children }: { initialPath?: string; children: ReactNode }) {
  const [path, setPath] = useState(() => normalizePath(initialPath));
  const [hash, setHash] = useState(() => parseHash(initialPath));
  // Bumped on every navigation so the scroll effect re-runs even for the same route.
  const [nonce, setNonce] = useState(0);

  const pathRef = useRef(path);
  pathRef.current = path;

  const navigate = useCallback((to: string, options?: { replace?: boolean }) => {
    const nextPath = normalizePath(to);
    const nextHash = parseHash(to);
    const nextUrl = nextPath + (nextHash ? `#${nextHash}` : "");

    if (typeof window !== "undefined") {
      const current = window.location.pathname + window.location.hash;
      if (options?.replace || current === nextUrl) {
        window.history.replaceState(null, "", nextUrl);
      } else {
        window.history.pushState(null, "", nextUrl);
      }
    }

    setPath(nextPath);
    setHash(nextHash);
    setNonce((value) => value + 1);
  }, []);

  // Keep state in sync with browser back/forward.
  useEffect(() => {
    const sync = () => {
      setPath(normalizePath(window.location.pathname));
      setHash(parseHash(window.location.hash));
      setNonce((value) => value + 1);
    };
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  // Intercept same-origin link clicks for in-app navigation.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      if (/^(mailto:|tel:|sms:|javascript:)/i.test(href)) return;
      if (anchor.hasAttribute("download")) return;
      const target = anchor.getAttribute("target");
      if (target && target !== "_self") return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;

      const nextPath = normalizePath(url.pathname);
      const currentPath = normalizePath(window.location.pathname);

      if (nextPath === currentPath) {
        // Deep link to a hash on this page: let the browser scroll and move focus.
        if (url.hash) return;
        event.preventDefault();
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        window.history.replaceState(null, "", nextPath);
        return;
      }

      event.preventDefault();
      navigate(nextPath + (url.hash || ""));
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [navigate]);

  // Scroll to the hash target, or to the top on a route change.
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (hash) {
      const target = document.getElementById(hash);
      if (target) {
        target.scrollIntoView({ block: "start", behavior: "auto" });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [path, hash, nonce]);

  const value = useMemo<RouterValue>(() => ({ path, hash, navigate }), [path, hash, navigate]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter(): RouterValue {
  const context = useContext(RouterContext);
  if (!context) throw new Error("useRouter must be used inside <RouterProvider>");
  return context;
}
