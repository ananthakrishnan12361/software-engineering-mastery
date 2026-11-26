import { useMemo, useState } from "react";
import { Button, Modal } from "@/shared/ui";
import type { GlossaryEntry } from "../model/types";

export interface GlossaryModalProps {
  open: boolean;
  entries: GlossaryEntry[];
  onClose: () => void;
  onJump: (lessonId: string, sectionId: string) => void;
}

export function GlossaryModal({ open, entries, onClose, onJump }: GlossaryModalProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter(
      (g) => g.term.toLowerCase().includes(q) || g.definition.toLowerCase().includes(q)
    );
  }, [entries, query]);

  return (
    <Modal id="glossary-modal" title="Engineering Glossary" open={open} onClose={onClose}>
      <input
        type="search"
        id="glossary-search"
        className="modal-search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Filter glossary terms..."
        aria-label="Filter glossary terms"
      />
      <div id="glossary-list" className="glossary-list">
        {filtered.length === 0 ? (
          <p className="muted-note">No glossary terms match &ldquo;{query.trim()}&rdquo;.</p>
        ) : (
          filtered.map((g) => (
            <div className="glossary-entry" key={g.term}>
              <strong>{g.term}</strong>
              <p style={{ margin: "4px 0 6px" }}>{g.definition}</p>
              <Button
                variant="small"
                onClick={() => {
                  onClose();
                  onJump(g.lessonId, g.sectionId);
                }}
              >
                Jump to section
              </Button>
            </div>
          ))
        )}
      </div>
    </Modal>
  );
}
