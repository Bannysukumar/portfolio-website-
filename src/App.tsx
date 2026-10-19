import { useMemo, useRef, type ReactElement } from "react";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { RouterProvider, useRouter } from "./router/router";
import { getMeta, notFoundMeta, type RouteMeta } from "./seo/meta";
import { useSeo } from "./seo/useSeo";
import { useReveal } from "./hooks/useReveal";
import { projects } from "./data/projects";
import { Home } from "./pages/Home";
import { ServicesPage } from "./pages/ServicesPage";
import { PricingPage } from "./pages/PricingPage";
import { FaqPage } from "./pages/FaqPage";
import { ContactPage } from "./pages/ContactPage";
import { ProjectPage } from "./pages/ProjectPage";
import { NotFound } from "./pages/NotFound";

interface Resolved {
  meta: RouteMeta;
  element: ReactElement;
}

/** Maps a normalised route path to its page element and metadata. */
function resolveRoute(path: string): Resolved {
  if (path === "/") return { meta: getMeta("/"), element: <Home /> };
  if (path === "/services") {
    const meta = getMeta("/services");
    return { meta, element: <ServicesPage meta={meta} /> };
  }
  if (path === "/pricing") {
    const meta = getMeta("/pricing");
    return { meta, element: <PricingPage meta={meta} /> };
  }
  if (path === "/faq") {
    const meta = getMeta("/faq");
    return { meta, element: <FaqPage meta={meta} /> };
  }
  if (path === "/contact") {
    const meta = getMeta("/contact");
    return { meta, element: <ContactPage meta={meta} /> };
  }
  if (path.startsWith("/projects/")) {
    const project = projects.find((item) => `/projects/${item.id}` === path);
    if (project) {
      const meta = getMeta(path);
      return { meta, element: <ProjectPage project={project} meta={meta} /> };
    }
  }
  return { meta: notFoundMeta(path), element: <NotFound /> };
}

function Shell() {
  const { path } = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  useReveal(rootRef, path);

  const route = useMemo(() => resolveRoute(path), [path]);
  useSeo(route.meta);

  return (
    <div ref={rootRef}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main" tabIndex={-1}>
        {route.element}
      </main>
      <Footer />
    </div>
  );
}

/**
 * Application root. `initialPath` is supplied by the client entry (from
 * window.location) and by the prerenderer (one render per route).
 */
export function App({ initialPath = "/" }: { initialPath?: string }) {
  return (
    <RouterProvider initialPath={initialPath}>
      <Shell />
    </RouterProvider>
  );
}

export default App;
