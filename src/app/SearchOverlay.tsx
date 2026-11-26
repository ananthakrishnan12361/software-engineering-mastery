import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import {
  SEARCH_GROUP_ORDER,
  searchHandbookRecords,
  type SearchMatch,
  type SearchRecord,
  type SearchRecordType
} from "@/entities/handbook";
import { Badge, Button } from "@/shared/ui";

export interface SearchOverlayProps {
  open: boolean;
  records: SearchRecord[];
  onClose: () => void;
  onSelectResult: (record: SearchRecord) => void;
}

function HighlightSnippet({ text, query }: { text: string; query: string }) {
  const q = query.trim();
  if (!q) return <>{text}</>;
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(${escaped})`, "ig");
  const parts = text.split(re);
  return (
    <>
      {parts.map((part, idx) =>
        part.toLowerCase() === q.toLowerCase() ? (
          <mark key={idx}>{part}</mark>
        ) : (
          <Fragment key={idx}>{part}</Fragment>
        )
      )}
    </>
  );
}

export function SearchOverlay({ open, records, onClose, onSelectResult }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setSelectedIndex(0);
      window.setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  const matches = useMemo(() => searchHandbookRecords(records, query, 40), [records, query]);

  const grouped = useMemo(() => {
    const map = new Map<SearchRecordType, SearchMatch[]>();
    for (const type of SEARCH_GROUP_ORDER) map.set(type, []);
    for (const m of matches) {
      map.get(m.record.type)?.push(m);
    }
    return SEARCH_GROUP_ORDER.map((type) => ({
      type,
      items: map.get(type) ?? []
    })).filter((g) => g.items.length > 0);
  }, [matches]);

  const flatOrdered = useMemo(() => grouped.flatMap((g) => g.items), [grouped]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!open) return null;

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (flatOrdered.length > 0) {
        setSelectedIndex((prev) => (prev + 1) % flatOrdered.length);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (flatOrdered.length > 0) {
        setSelectedIndex((prev) => (prev - 1 + flatOrdered.length) % flatOrdered.length);
      }
    } else if (e.key === "Enter") {
      const active = flatOrdered[selectedIndex];
      if (active) {
        e.preventDefault();
        onSelectResult(active.record);
        onClose();
      }
    }
  }

  let runningIdx = -1;

  return (
    <div
      className="search-overlay-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Search handbook"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="search-overlay-card">
        <div className="search-overlay-input-row">
          <input
            ref={inputRef}
            type="search"
            id="global-search-input"
            className="search-overlay-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search all 28 modules, lessons, code, interview Q&A, glossary..."
            aria-label="Search handbook content"
          />
          <Button variant="small" onClick={onClose} aria-label="Close search">
            Esc
          </Button>
        </div>

        <div className="search-overlay-results" role="region" aria-label="Search results">
          {query.trim().length < 2 ? (
            <p className="muted-note">
              Type at least 2 characters. Use &uarr;/&darr; to move, Enter to open, Esc to close.
            </p>
          ) : flatOrdered.length === 0 ? (
            <p className="muted-note">No matches found for &ldquo;{query.trim()}&rdquo;.</p>
          ) : (
            grouped.map((group) => (
              <div key={group.type}>
                <div className="search-group-title">
                  {group.type} ({group.items.length})
                </div>
                {group.items.map(({ record, matchIndex }) => {
                  runningIdx++;
                  const idx = runningIdx;
                  const isSelected = idx === selectedIndex;
                  const start = Math.max(0, matchIndex - 35);
                  const snippet = record.text.replace(/\s+/g, " ").slice(start, start + 125);
                  return (
                    <button
                      key={record.id}
                      type="button"
                      className={`search-result-item ${isSelected ? "is-selected" : ""}`.trim()}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      onClick={() => {
                        onSelectResult(record);
                        onClose();
                      }}
                    >
                      <div className="search-result-title">
                        <span>{record.title}</span>
                        {!record.available ? (
                          <Badge variant="unwritten">Not written yet</Badge>
                        ) : record.badgeText ? (
                          <Badge variant="neutral">{record.badgeText}</Badge>
                        ) : null}
                      </div>
                      <div className="search-result-snippet">
                        <HighlightSnippet text={snippet} query={query} />
                        ...
                      </div>
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
