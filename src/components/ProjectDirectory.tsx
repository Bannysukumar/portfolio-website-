import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, FolderGit2, RotateCcw, Search, Star, X } from "lucide-react";
import { directory } from "../data/directory";
import { Reveal } from "./Reveal";
import type { DirectoryEntry, LiveStatus } from "../types/project";
import "./ProjectDirectory.css";

/** How many repositories Load More reveals at a time. */
const PAGE_SIZE = 24;
const TOTAL = directory.length;

type SortKey = "updated" | "name" | "stars";
type ForkFilter = "all" | "hide" | "only";

const DATE_OPTS: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" };

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", DATE_OPTS);
}

/** Honest tooltip for a live link, based on how it was verified. */
function liveTitle(status: LiveStatus | undefined): string {
  if (status === "verified-live") return "Deployment verified — page rendered (Oct 2026)";
  return "Deployment responded HTTP 200 (Oct 2026); interactive render not confirmed";
}

// Search across display name, repository slug, description, language, tech line and topics.
function searchHaystack(entry: DirectoryEntry): string {
  const slug = decodeURIComponent(entry.url.split("/").pop() ?? "");
  return [entry.name, slug, entry.description ?? "", entry.language ?? "", entry.tech, (entry.topics ?? []).join(" ")]
    .join(" ")
    .toLowerCase();
}

function DirectoryCard({ entry }: { entry: DirectoryEntry }) {
  const topics = entry.topics ?? [];
  const shownTopics = topics.slice(0, 3);
  const extraTopics = topics.length - shownTopics.length;
  const stars = entry.stars ?? 0;

  return (
    <li className="dcard">
      <div className="dcard__top">
        <h3 className="dcard__name">
          <a href={entry.url} target="_blank" rel="noopener noreferrer">
            {entry.name} <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </h3>
        {entry.fork && <span className="dcard__badge">fork</span>}
        {entry.archived && <span className="dcard__badge">archived</span>}
      </div>

      <p className="dcard__tech">{entry.tech}</p>

      <p className="dcard__desc">
        {entry.description ?? <span className="dcard__desc-none">No description provided.</span>}
      </p>

      {shownTopics.length > 0 && (
        <ul className="dcard__topics">
          {shownTopics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
          {extraTopics > 0 && (
            <li className="dcard__topics-more" aria-label={`${extraTopics} more topics`}>
              +{extraTopics}
            </li>
          )}
        </ul>
      )}

      <div className="dcard__meta">
        {entry.language && <span className="dcard__lang">{entry.language}</span>}
        {stars > 0 && (
          <span className="dcard__stars">
            <Star size={12} aria-hidden="true" /> {stars}
          </span>
        )}
        {entry.updated && <time dateTime={entry.updated}>{formatDate(entry.updated)}</time>}
      </div>

      <div className="dcard__foot">
        {entry.liveUrl ? (
          <a
            className="dcard__live"
            href={entry.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={liveTitle(entry.liveStatus)}
          >
            live demo
          </a>
        ) : entry.note ? (
          <span className="dcard__note">{entry.note}</span>
        ) : (
          <span className="dcard__source">source only</span>
        )}
      </div>
    </li>
  );
}

/**
 * The complete repository directory: every public repository on GitHub,
 * searchable, filterable and sortable. Data comes from the generated
 * src/data/directory.ts — no runtime GitHub API dependency.
 */
export function ProjectDirectory() {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("all");
  const [topic, setTopic] = useState("all");
  const [forkFilter, setForkFilter] = useState<ForkFilter>("all");
  const [sort, setSort] = useState<SortKey>("updated");
  const [visible, setVisible] = useState(PAGE_SIZE);

  // Filter/sort options derived from the data — options without data never render.
  const languageOptions = useMemo(() => {
    const counts = new Map<string, number>();
    for (const entry of directory) {
      if (entry.language) counts.set(entry.language, (counts.get(entry.language) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, []);

  const topicOptions = useMemo(() => {
    const counts = new Map<string, number>();
    for (const entry of directory) {
      for (const t of entry.topics ?? []) counts.set(t, (counts.get(t) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, []);

  const hasForks = useMemo(() => directory.some((entry) => entry.fork), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = directory.filter((entry) => {
      if (language !== "all" && entry.language !== language) return false;
      if (topic !== "all" && !(entry.topics ?? []).includes(topic)) return false;
      if (forkFilter === "only" && !entry.fork) return false;
      if (forkFilter === "hide" && entry.fork) return false;
      if (!q) return true;
      return searchHaystack(entry).includes(q);
    });

    const byUpdated = (a: DirectoryEntry, b: DirectoryEntry) =>
      (b.updated ?? "").localeCompare(a.updated ?? "");
    if (sort === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }) || byUpdated(a, b));
    } else if (sort === "stars") {
      result.sort((a, b) => (b.stars ?? 0) - (a.stars ?? 0) || byUpdated(a, b));
    } else {
      result.sort(byUpdated);
    }
    return result;
  }, [query, language, topic, forkFilter, sort]);

  // Start from the first page whenever the result set changes.
  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [query, language, topic, forkFilter, sort]);

  const filtersActive =
    query.trim() !== "" || language !== "all" || topic !== "all" || forkFilter !== "all" || sort !== "updated";

  const resetAll = () => {
    setQuery("");
    setLanguage("all");
    setTopic("all");
    setForkFilter("all");
    setSort("updated");
  };

  const shown = Math.min(visible, filtered.length);
  const countLabel =
    `Showing ${shown} of ${filtered.length} ${filtered.length === 1 ? "repository" : "repositories"}` +
    (filtered.length !== TOTAL ? ` · filtered from ${TOTAL}` : "");

  return (
    <section id="directory" className="section directory" aria-labelledby="directory-heading">
      <div className="container">
        <Reveal>
          <p className="section-label">Full directory</p>
          <h2 id="directory-heading" className="section-title">
            Every repository, in one searchable place.
          </h2>
          <p className="section-intro">
            The complete public catalogue on GitHub — {TOTAL} repositories, searchable by name, description,
            language and topic.
          </p>
        </Reveal>

        <div className="dir__controls">
          <div className="dir__search">
            <label className="visually-hidden" htmlFor="dir-search">
              Search repositories
            </label>
            <Search size={16} aria-hidden="true" className="dir__search-icon" />
            <input
              id="dir-search"
              type="search"
              placeholder="Search name, description, stack, topics…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              autoComplete="off"
            />
            {query && (
              <button type="button" className="dir__clear" aria-label="Clear search" onClick={() => setQuery("")}>
                <X size={15} aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="dir__select">
            <label htmlFor="dir-lang">Language</label>
            <select id="dir-lang" value={language} onChange={(event) => setLanguage(event.target.value)}>
              <option value="all">All languages</option>
              {languageOptions.map(([value, count]) => (
                <option key={value} value={value}>
                  {value} ({count})
                </option>
              ))}
            </select>
          </div>

          <div className="dir__select">
            <label htmlFor="dir-topic">Topic</label>
            <select id="dir-topic" value={topic} onChange={(event) => setTopic(event.target.value)}>
              <option value="all">All topics</option>
              {topicOptions.map(([value, count]) => (
                <option key={value} value={value}>
                  {value} ({count})
                </option>
              ))}
            </select>
          </div>

          {hasForks && (
            <div className="dir__select">
              <label htmlFor="dir-fork">Repositories</label>
              <select
                id="dir-fork"
                value={forkFilter}
                onChange={(event) => setForkFilter(event.target.value as ForkFilter)}
              >
                <option value="all">All ({TOTAL})</option>
                <option value="hide">Hide forks</option>
                <option value="only">Forks only</option>
              </select>
            </div>
          )}

          <div className="dir__select">
            <label htmlFor="dir-sort">Sort</label>
            <select id="dir-sort" value={sort} onChange={(event) => setSort(event.target.value as SortKey)}>
              <option value="updated">Recently updated</option>
              <option value="name">Name (A–Z)</option>
              <option value="stars">Most stars</option>
            </select>
          </div>

          {filtersActive && (
            <button type="button" className="dir__reset" onClick={resetAll}>
              <RotateCcw size={14} aria-hidden="true" /> Reset
            </button>
          )}
        </div>

        <p className="dir__count" role="status">
          {countLabel}
        </p>

        {filtered.length > 0 && (
          <ul className="dir__grid">
            {filtered.slice(0, visible).map((entry) => (
              <DirectoryCard key={entry.url} entry={entry} />
            ))}
          </ul>
        )}

        {filtered.length === 0 && (
          <div className="dir__empty">
            <FolderGit2 size={28} aria-hidden="true" />
            <p className="dir__empty-title">
              No repositories match {query.trim() ? `“${query.trim()}”` : "these filters"}.
            </p>
            <p className="dir__empty-note">Try a different term, or clear the search and filters to see all {TOTAL}.</p>
            <button type="button" className="btn btn--ghost" onClick={resetAll}>
              Clear search &amp; filters
            </button>
          </div>
        )}

        {visible < filtered.length && (
          <div className="dir__more">
            <button type="button" className="btn btn--ghost" onClick={() => setVisible((value) => value + PAGE_SIZE)}>
              Load {Math.min(PAGE_SIZE, filtered.length - visible)} more
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
