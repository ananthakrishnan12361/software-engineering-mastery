import { useEffect, useMemo, useState, type ReactNode, type TableHTMLAttributes } from "react";
import type {
  InterviewQuestion,
  LessonRecord,
  MdxComponentsProp
} from "@/entities/handbook";
import { buildPageHash } from "@/shared/lib";
import {
  Badge,
  Button,
  Callout,
  CodeBlock,
  ComparisonTable,
  DiagramCard,
  ExerciseCard,
  GlossaryTerm,
  RichText,
  TopicAnchor,
  TopicSection
} from "@/shared/ui";
import { LessonInterviewBank } from "./LessonInterviewBank";
import { RightToc } from "./RightToc";

export interface LessonPageProps {
  lesson: LessonRecord;
  allLessons: LessonRecord[];
  questions: InterviewQuestion[];
  sectionTarget: string | null;
  isCompleted: boolean;
  isBookmarked: boolean;
  masteryChecks: Record<string, boolean>;
  collapsedSections: Record<string, boolean>;
  onToggleComplete: (lessonId: string) => void;
  onToggleBookmark: (lessonId: string) => void;
  onToggleMastery: (masteryId: string) => void;
  onToggleSection: (sectionId: string) => void;
  onExpandSections: (sectionIds: string[]) => void;
  onCollapseSections: (sectionIds: string[]) => void;
  onNavigateLesson: (lessonId: string, sectionId?: string | null) => void;
}

export function LessonPage({
  lesson,
  allLessons,
  questions,
  sectionTarget,
  isCompleted,
  isBookmarked,
  masteryChecks,
  collapsedSections,
  onToggleComplete,
  onToggleBookmark,
  onToggleMastery,
  onToggleSection,
  onExpandSections,
  onCollapseSections,
  onNavigateLesson
}: LessonPageProps) {
  const [tocDrawerOpen, setTocDrawerOpen] = useState(false);

  const collapsibleIds = useMemo(
    () => lesson.sections.filter((s) => Boolean(s.letter)).map((s) => s.id),
    [lesson.sections]
  );

  const masteryCheckedCount = useMemo(
    () => lesson.masteryItems.filter((item) => Boolean(masteryChecks[item.id])).length,
    [lesson.masteryItems, masteryChecks]
  );

  const prevLesson = useMemo(
    () => (lesson.prevLessonId ? allLessons.find((l) => l.id === lesson.prevLessonId) ?? null : null),
    [lesson.prevLessonId, allLessons]
  );

  const nextLesson = useMemo(
    () => (lesson.nextLessonId ? allLessons.find((l) => l.id === lesson.nextLessonId) ?? null : null),
    [lesson.nextLessonId, allLessons]
  );

  // Auto-expand parent section when jumping to an anchor/question inside it
  useEffect(() => {
    if (!sectionTarget) return;
    const toExpand: string[] = [sectionTarget];
    if (sectionTarget.includes("-iq-")) {
      toExpand.push(`${lesson.id}-sec-mn`);
    } else if (sectionTarget.includes("-topic-")) {
      toExpand.push(`${lesson.id}-sec-b`);
    }
    onExpandSections(toExpand);

    const raf = window.requestAnimationFrame(() => {
      const el = document.getElementById(sectionTarget);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => window.cancelAnimationFrame(raf);
  }, [sectionTarget, lesson.id, onExpandSections]);

  const mdxComponents = useMemo<MdxComponentsProp>(() => {
    const BoundTopicSection = (props: {
      id: string;
      letter: string;
      title: string;
      children: ReactNode;
    }) => (
      <TopicSection
        id={props.id}
        letter={props.letter}
        title={props.title}
        collapsed={Boolean(collapsedSections[props.id])}
        onToggle={onToggleSection}
      >
        {props.children}
      </TopicSection>
    );

    const BoundInterviewSection = () => (
      <LessonInterviewBank questions={questions} forcedOpenId={sectionTarget} />
    );

    const WrappedTable = (props: TableHTMLAttributes<HTMLTableElement>) => (
      <ComparisonTable>
        <table {...props} />
      </ComparisonTable>
    );

    return {
      TopicSection: BoundTopicSection,
      TopicAnchor,
      InterviewSection: BoundInterviewSection,
      Callout,
      CodeBlock,
      ComparisonTable,
      DiagramCard,
      ExerciseCard,
      GlossaryTerm,
      table: WrappedTable
    } as MdxComponentsProp;
  }, [collapsedSections, onToggleSection, questions, sectionTarget]);

  const LessonContent = lesson.Content;

  return (
    <>
      <main id="main-content" className="main-content" tabIndex={-1}>
        <article className="lesson" id={lesson.id} data-lesson-id={lesson.id}>
        <header className="lesson-compact-header">
          <div className="lesson-kicker-row">
            <span>
              Module {String(lesson.moduleNumber).padStart(2, "0")} &middot; {lesson.partLabel} &middot;{" "}
              {lesson.duration}
            </span>
            <Button
              variant="small"
              className="toc-drawer-trigger"
              onClick={() => setTocDrawerOpen(true)}
            >
              On this page
            </Button>
          </div>

          <h1>{lesson.title.replace(/^Part \d+:\s*/, "")}</h1>

          <div className="lesson-action-strip">
            <label className={`complete-toggle ${isCompleted ? "is-done" : ""}`.trim()}>
              <input
                type="checkbox"
                className="lesson-complete-cb"
                checked={isCompleted}
                onChange={() => onToggleComplete(lesson.id)}
              />
              <span>Mark Complete</span>
            </label>
            <Button
              variant="pill"
              aria-pressed={isBookmarked}
              onClick={() => onToggleBookmark(lesson.id)}
            >
              {isBookmarked ? "\u2605 Bookmarked" : "\u2606 Bookmark"}
            </Button>
            <Button variant="small" onClick={() => onExpandSections(collapsibleIds)}>
              Expand All
            </Button>
            <Button variant="small" onClick={() => onCollapseSections(collapsibleIds)}>
              Collapse All
            </Button>
          </div>
        </header>

        <details
          className="objectives-disclosure"
          id={`${lesson.id}-objectives`}
          open={typeof window !== "undefined" ? window.innerWidth >= 1200 : false}
        >
          <summary>Learning Objectives ({lesson.objectives.length})</summary>
          <ul>
            {lesson.objectives.map((obj, idx) => (
              <li key={idx}>
                <RichText text={obj} />
              </li>
            ))}
          </ul>
        </details>

        <LessonContent components={mdxComponents} />

        <section className="mastery-box" id={`${lesson.id}-mastery`}>
          <div className="mastery-header">
            <h3>Mastery Assessment ({lesson.partLabel})</h3>
            <Badge variant="accent">
              {masteryCheckedCount} / {lesson.masteryItems.length} mastered
            </Badge>
          </div>
          <p>Check each item only after you can explain it aloud and code it without looking at notes:</p>
          <ul className="mastery-list">
            {lesson.masteryItems.map((item) => (
              <li className="mastery-item" key={item.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={Boolean(masteryChecks[item.id])}
                    onChange={() => onToggleMastery(item.id)}
                  />
                  <span>
                    <RichText text={item.label} />
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </section>

        <nav className="lesson-prev-next" aria-label="Lesson navigation">
          {prevLesson ? (
            <a
              className="btn-secondary"
              href={buildPageHash("lesson", { lessonId: prevLesson.id })}
              onClick={(e) => {
                e.preventDefault();
                onNavigateLesson(prevLesson.id);
              }}
            >
              &larr; {prevLesson.title}
            </a>
          ) : (
            <span className="muted-note">Start of available lessons</span>
          )}

          {nextLesson ? (
            <a
              className="btn-secondary"
              href={buildPageHash("lesson", { lessonId: nextLesson.id })}
              onClick={(e) => {
                e.preventDefault();
                onNavigateLesson(nextLesson.id);
              }}
            >
              {nextLesson.title} &rarr;
            </a>
          ) : (
            <a
              className="btn-secondary"
              href={buildPageHash("topics")}
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = buildPageHash("topics");
              }}
            >
              Browse All 28 Modules &rarr;
            </a>
          )}
        </nav>
      </article>
      </main>

      <RightToc
        lessonId={lesson.id}
        sections={lesson.sections}
        drawerOpen={tocDrawerOpen}
        onCloseDrawer={() => setTocDrawerOpen(false)}
        onJumpSection={(secId) => onNavigateLesson(lesson.id, secId)}
      />
    </>
  );
}
