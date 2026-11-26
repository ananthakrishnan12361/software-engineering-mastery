import { useMemo, useState } from "react";
import type { GlossaryEntry } from "@/entities/handbook";
import { buildPageHash } from "@/shared/lib";
import { Button } from "@/shared/ui";

export interface GlossaryPageProps {
  entries: GlossaryEntry[];
  onJumpToSection: (lessonId: string, sectionId: string) => void;
}

export function GlossaryPage({ entries, onJumpToSection }: GlossaryPageProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter(
      (g) => g.term.toLowerCase().includes(q) || g.definition.toLowerCase().includes(q)
    );
  }, [entries, query]);

  return (
    <main id="main-content" className="main-content" tabIndex={-1}>
      <header className="page-header">
        <h1>Engineering Glossary</h1>
        <p className="page-lead">
          Key terms extracted directly from written lessons, linked to their exact explanation section.
        </p>
      </header>

      <div className="filter-panel">
        <div className="filter-field">
          <label htmlFor="glossary-page-search">Filter glossary terms</label>
          <input
            type="search"
            id="glossary-page-search"
            className="text-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search term or definition..."
          />
        </div>
        <div className="filter-summary-row">
          <span>
            Showing <strong>{filtered.length}</strong> of {entries.length} terms
          </span>
          {query ? (
            <Button variant="small" onClick={() => setQuery("")}>
              Clear
            </Button>
          ) : null}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <h2>No matching terms</h2>
          <p>Try a different keyword or clear the glossary search.</p>
          <Button variant="primary" onClick={() => setQuery("")}>
            Show All Terms
          </Button>
        </div>
      ) : (
        filtered.map((entry) => (
          <div className="glossary-entry" key={entry.term}>
            <strong>{entry.term}</strong>
            <p style={{ margin: "4px 0 8px" }}>{entry.definition}</p>
            <a
              className="syllabus-topic-link"
              href={buildPageHash("lesson", {
                lessonId: entry.lessonId,
                sectionId: entry.sectionId
              })}
              onClick={(e) => {
                e.preventDefault();
                onJumpToSection(entry.lessonId, entry.sectionId);
              }}
            >
              Jump to section &rarr;
            </a>
          </div>
        ))
      )}
    </main>
  );
}
