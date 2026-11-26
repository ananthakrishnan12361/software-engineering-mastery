import { useEffect, useMemo, useState } from "react";
import {
  InterviewQuestionCard,
  matchesDifficultyFilter,
  type InterviewQuestion
} from "@/entities/handbook";
import type { DifficultyLevel } from "@/shared/config";
import { Button } from "@/shared/ui";

export interface LessonInterviewBankProps {
  questions: InterviewQuestion[];
  forcedOpenId: string | null;
}

const FILTER_OPTIONS: Array<{ value: "all" | DifficultyLevel; label: string }> = [
  { value: "all", label: "All" },
  { value: "basic", label: "Basic" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "senior-architect", label: "Senior / Architect" }
];

export function LessonInterviewBank({ questions, forcedOpenId }: LessonInterviewBankProps) {
  const [difficulty, setDifficulty] = useState<string>("all");
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (forcedOpenId && questions.some((q) => q.id === forcedOpenId)) {
      setRevealedIds((prev) => ({ ...prev, [forcedOpenId]: true }));
    }
  }, [forcedOpenId, questions]);

  const visibleQuestions = useMemo(
    () => questions.filter((q) => matchesDifficultyFilter(q.difficulty, difficulty)),
    [questions, difficulty]
  );

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: questions.length };
    for (const opt of FILTER_OPTIONS) {
      if (opt.value !== "all") {
        map[opt.value] = questions.filter((q) => matchesDifficultyFilter(q.difficulty, opt.value)).length;
      }
    }
    return map;
  }, [questions]);

  function handleToggle(id: string) {
    setRevealedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function handleRevealAll() {
    const next: Record<string, boolean> = { ...revealedIds };
    for (const q of visibleQuestions) next[q.id] = true;
    setRevealedIds(next);
  }

  return (
    <>
      <div className="iq-toolbar">
        <div className="iq-filter-pills" role="group" aria-label="Filter questions in this lesson">
          {FILTER_OPTIONS.map((opt) => {
            const count = counts[opt.value] ?? 0;
            if (opt.value !== "all" && count === 0) return null;
            return (
              <Button
                key={opt.value}
                variant="small"
                aria-pressed={difficulty === opt.value}
                onClick={() => setDifficulty(opt.value)}
              >
                {opt.label} ({count})
              </Button>
            );
          })}
        </div>
        <div className="lesson-action-strip">
          <Button variant="small" onClick={handleRevealAll}>
            Reveal All
          </Button>
          <Button variant="small" onClick={() => setRevealedIds({})}>
            Hide All
          </Button>
        </div>
      </div>

      <div className="iq-list">
        {visibleQuestions.length === 0 ? (
          <p className="muted-note">No interview questions match this difficulty filter.</p>
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
