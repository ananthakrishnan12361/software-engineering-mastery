import { useMemo, useState } from "react";
import {
  InterviewQuestionCard,
  matchesDifficultyFilter,
  sanitizeDifficultyParam,
  sanitizeModuleParam,
  type InterviewQuestion,
  type SyllabusModule
} from "@/entities/handbook";
import { DIFFICULTY_LABELS, type DifficultyLevel } from "@/shared/config";
import { buildPageHash } from "@/shared/lib";
import { Badge, Button } from "@/shared/ui";

export interface InterviewsPageProps {
  questions: InterviewQuestion[];
  syllabusModules: SyllabusModule[];
  routeParams: Record<string, string>;
  onUpdateParams: (params: Record<string, string>) => void;
  onOpenQuestionInLesson: (lessonId: string, questionId: string) => void;
}

const DIFFICULTY_OPTIONS: Array<{ value: "all" | DifficultyLevel; label: string }> = [
  { value: "all", label: "All Difficulties" },
  { value: "basic", label: "Basic" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "senior-architect", label: "Senior / Architect" },
  { value: "senior", label: "Senior (Mod 26)" },
  { value: "architect", label: "Architect (Mod 26)" }
];

export function InterviewsPage({
  questions,
  syllabusModules,
  routeParams,
  onUpdateParams,
  onOpenQuestionInLesson
}: InterviewsPageProps) {
  const difficulty = sanitizeDifficultyParam(routeParams.difficulty);
  const moduleFilter = sanitizeModuleParam(routeParams.module);
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});

  const visibleQuestions = useMemo(() => {
    return questions.filter((q) => {
      const diffOk = matchesDifficultyFilter(q.difficulty, difficulty);
      const modOk = moduleFilter === "all" || String(q.moduleNumber) === moduleFilter;
      return diffOk && modOk;
    });
  }, [questions, difficulty, moduleFilter]);

  const activeFilters: Array<{ key: string; label: string }> = [];
  if (difficulty !== "all") {
    const label = DIFFICULTY_LABELS[difficulty as DifficultyLevel] ?? difficulty;
    activeFilters.push({ key: "difficulty", label: `Difficulty: ${label}` });
  }
  if (moduleFilter !== "all") {
    const mod = syllabusModules.find((m) => String(m.number) === moduleFilter);
    activeFilters.push({
      key: "module",
      label: mod ? `Module ${mod.number}: ${mod.title}` : `Module ${moduleFilter}`
    });
  }

  function setFilter(key: string, value: string) {
    onUpdateParams({
      difficulty,
      module: moduleFilter,
      [key]: value
    });
  }

  function clearAll() {
    onUpdateParams({});
  }

  function handleRevealAll() {
    const next: Record<string, boolean> = { ...revealedIds };
    for (const q of visibleQuestions) next[q.id] = true;
    setRevealedIds(next);
  }

  return (
    <main id="main-content" className="main-content" tabIndex={-1}>
      <header className="page-header">
        <h1>Interview Questions</h1>
        <p className="page-lead">
          Practice questions and detailed senior-level answers across available modules.{" "}
          <em>
            Matching rule: Senior/Architect shows Senior/Architect, Senior, and Architect items; Senior
            or Architect each include combined Senior/Architect items.
          </em>
        </p>
      </header>

      <section className="filter-panel" aria-label="Interview question filters">
        <div className="filter-controls-row">
          <div className="filter-field">
            <label htmlFor="interviews-difficulty-filter">Difficulty</label>
            <select
              id="interviews-difficulty-filter"
              className="toolbar-select"
              value={difficulty}
              onChange={(e) => setFilter("difficulty", e.target.value)}
            >
              {DIFFICULTY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-field">
            <label htmlFor="interviews-module-filter">Module</label>
            <select
              id="interviews-module-filter"
              className="toolbar-select"
              value={moduleFilter}
              onChange={(e) => setFilter("module", e.target.value)}
            >
              <option value="all">All Modules</option>
              {syllabusModules.map((mod) => {
                const count = questions.filter((q) => q.moduleNumber === mod.number).length;
                return (
                  <option key={mod.number} value={String(mod.number)}>
                    M{String(mod.number).padStart(2, "0")}: {mod.title} ({count})
                  </option>
                );
              })}
            </select>
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

        <div className="filter-summary-row">
          <span id="interviews-result-count">
            Showing <strong>{visibleQuestions.length}</strong> of {questions.length} available
            questions
          </span>
          {activeFilters.length > 0 ? (
            <Button variant="small" id="interviews-clear-all" onClick={clearAll}>
              Clear All
            </Button>
          ) : null}
        </div>

        {activeFilters.length > 0 ? (
          <div className="filter-chips" aria-label="Active interview filters">
            {activeFilters.map((f) => (
              <Badge key={f.key} variant="accent">
                {f.label}
              </Badge>
            ))}
          </div>
        ) : null}
      </section>

      {visibleQuestions.length === 0 ? (
        <div className="empty-state" id="interviews-empty-state">
          <h2>No matching interview questions</h2>
          <p>
            No written questions match the active difficulty and module filter combination yet.
          </p>
          <Button variant="primary" onClick={clearAll}>
            Clear All Filters
          </Button>
        </div>
      ) : (
        visibleQuestions.map((q) => (
          <div key={q.id}>
            <div className="lesson-kicker-row">
              <span>Module {String(q.moduleNumber).padStart(2, "0")}</span>
              <a
                href={buildPageHash("lesson", { lessonId: q.lessonId, sectionId: q.id })}
                className="syllabus-topic-link"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenQuestionInLesson(q.lessonId, q.id);
                }}
              >
                Open in lesson &rarr;
              </a>
            </div>
            <InterviewQuestionCard
              question={q}
              revealed={Boolean(revealedIds[q.id])}
              onToggleReveal={(id) => setRevealedIds((prev) => ({ ...prev, [id]: !prev[id] }))}
            />
          </div>
        ))
      )}
    </main>
  );
}
