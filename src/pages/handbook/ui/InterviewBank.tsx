import { useEffect, useMemo, useState } from "react";
import type { DifficultyLevel } from "@/shared/config";
import { Button } from "@/shared/ui";
import type { InterviewQuestion } from "../model/types";
import { InterviewQuestionCard } from "./InterviewQuestionCard";

export interface InterviewBankProps {
  questions: InterviewQuestion[];
  globalDifficulty: string;
  forcedOpenId: string | null;
}

const FILTER_OPTIONS: Array<{ value: "all" | DifficultyLevel; label: string }> = [
  { value: "all", label: "All" },
  { value: "basic", label: "Basic" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "senior-architect", label: "Senior/Architect" }
];

export function InterviewBank({ questions, globalDifficulty, forcedOpenId }: InterviewBankProps) {
  const [localFilter, setLocalFilter] = useState<string>("all");
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (forcedOpenId && questions.some((q) => q.id === forcedOpenId)) {
      setRevealedIds((prev) => ({ ...prev, [forcedOpenId]: true }));
    }
  }, [forcedOpenId, questions]);

  const effectiveDifficulty = globalDifficulty !== "all" ? globalDifficulty : localFilter;

  const visibleQuestions = useMemo(() => {
    if (effectiveDifficulty === "all") return questions;
    return questions.filter((q) => q.difficulty === effectiveDifficulty);
  }, [questions, effectiveDifficulty]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: questions.length };
    for (const q of questions) {
      map[q.difficulty] = (map[q.difficulty] ?? 0) + 1;
    }
    return map;
  }, [questions]);

  function handleToggle(id: string) {
    setRevealedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function handleRevealAll() {
    const next: Record<string, boolean> = { ...revealedIds };
    for (const q of visibleQuestions) {
      next[q.id] = true;
    }
    setRevealedIds(next);
  }

  function handleHideAll() {
    setRevealedIds({});
  }

  return (
    <>
      <div className="iq-toolbar">
        <div className="iq-filter-pills" role="group" aria-label="Filter questions in this lesson">
          {FILTER_OPTIONS.map((opt) => {
            const count = counts[opt.value] ?? 0;
            if (opt.value !== "all" && count === 0) return null;
            const active = effectiveDifficulty === opt.value;
            return (
              <Button
                key={opt.value}
                variant="small"
                className="iq-filter-btn"
                aria-pressed={active}
                onClick={() => setLocalFilter(opt.value)}
              >
                {opt.label} ({count})
              </Button>
            );
          })}
        </div>
        <div className="module-toolbar-actions">
          <Button variant="small" onClick={handleRevealAll}>
            Reveal All
          </Button>
          <Button variant="small" onClick={handleHideAll}>
            Hide All
          </Button>
        </div>
      </div>

      <div className="iq-list">
        {visibleQuestions.length === 0 ? (
          <p className="muted-note">No interview questions match the active difficulty filter.</p>
        ) : (
          visibleQuestions.map((q) => (
            <InterviewQuestionCard
              key={q.id}
              question={q}
              revealed={Boolean(revealedIds[q.id])}
              onToggleReveal={handleToggle}
            />
          ))
        )}
      </div>
    </>
  );
}
