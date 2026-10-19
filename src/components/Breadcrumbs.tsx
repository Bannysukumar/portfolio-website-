import type { RouteMeta } from "../seo/meta";
import "./Breadcrumbs.css";

/** Visible breadcrumb trail that mirrors the BreadcrumbList structured data. */
export function Breadcrumbs({ items }: { items: RouteMeta["breadcrumbs"] }) {
  if (!items || items.length === 0) return null;

  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.path}-${item.name}`}>
              {isLast ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <a href={item.path}>{item.name}</a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
