import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { Badge } from "@/shared/ui";
import { searchRecords } from "../model/searchIndex";
import type { SearchRecord } from "../model/types";

export interface SearchPopoverProps {
  records: SearchRecord[];
  onSelectResult: (lessonId: string, sectionId: string) => void;
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

export function SearchPopover({ records, onSelectResult }: SearchPopoverProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const matches = useMemo(() => searchRecords(records, query, 25), [records, query]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onClickOutside);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onClickOutside);
    };
  }, []);

  return (
    <div className="topbar-search" ref={containerRef}>
      <div className="search-box">
        <span className="search-icon" aria-hidden="true">
          &#128269;
        </span>
        <input
          ref={inputRef}
          type="search"
          id="global-search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(e.target.value.trim().length >= 2);
          }}
          onFocus={() => {
            if (query.trim().length >= 2) setOpen(true);
          }}
          placeholder="Search topics, code, interview Q&A, glossary... (Ctrl+K)"
          aria-label="Search across the entire handbook"
          autoComplete="off"
        />
        {query ? (
          <button
            type="button"
            id="search-clear"
            className="search-clear"
            aria-label="Clear search"
            onClick={() => {
              setQuery("");
              setOpen(false);
              inputRef.current?.focus();
            }}
          >
            &times;
          </button>
        ) : null}
      </div>

      {open && query.trim().length >= 2 ? (
        <div id="search-results" className="search-results" role="region" aria-label="Search results">
          {matches.length === 0 ? (
            <div className="search-empty">No matches for &ldquo;{query.trim()}&rdquo;</div>
          ) : (
            matches.map(({ record, matchIndex }) => {
              const start = Math.max(0, matchIndex - 40);
              const snippet = record.text.replace(/\s+/g, " ").slice(start, start + 130);
              return (
                <button
                  key={record.id}
                  type="button"
                  className="search-result-item"
                  onClick={() => {
                    setOpen(false);
                    onSelectResult(record.lessonId, record.sectionId);
                  }}
                >
                  <div className="search-result-meta">
                    <Badge variant="neutral">{record.type}</Badge>
                  </div>
                  <div className="search-result-title">{record.title}</div>
                  <div className="search-result-snippet">
                    <HighlightSnippet text={snippet} query={query} />
                    ...
                  </div>
                </button>
              );
            })
          )}
        </div>
      ) : null}
    </div>
  );
}
