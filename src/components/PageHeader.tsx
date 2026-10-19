import type { ReactNode } from "react";
import type { RouteMeta } from "../seo/meta";
import { Breadcrumbs } from "./Breadcrumbs";

interface PageHeaderProps {
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  meta: RouteMeta;
}

/** Shared top-of-page header: breadcrumbs, section label, single h1, intro. */
export function PageHeader({ label, title, intro, meta }: PageHeaderProps) {
  return (
    <header className="page-hero">
      <div className="container">
        <Breadcrumbs items={meta.breadcrumbs} />
        <p className="section-label">{label}</p>
        <h1 className="page-hero__title">{title}</h1>
        {intro && <p className="page-hero__intro">{intro}</p>}
      </div>
    </header>
  );
}
