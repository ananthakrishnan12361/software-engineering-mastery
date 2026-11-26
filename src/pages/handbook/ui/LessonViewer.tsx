import { useMemo } from "react";
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
  TopicSection
} from "@/shared/ui";
import type {
  InterviewQuestion,
  LessonRecord,
  MdxComponentsProp,
  ModuleRecord
} from "../model/types";
import { InterviewBank } from "./InterviewBank";

export interface LessonViewerProps {
  moduleRecord: ModuleRecord;
  lesson: LessonRecord;
  questions: InterviewQuestion[];
  isCompleted: boolean;
  isBookmarked: boolean;
  masteryChecks: Record<string, boolean>;
  collapsedSections: Record<string, boolean>;
  globalDifficulty: string;
  forcedOpenId: string | null;
  onToggleComplete: (lessonId: string) => void;
  onToggleBookmark: (lessonId: string) => void;
  onToggleMastery: (masteryId: string) => void;
  onToggleSection: (sectionId: string) => void;
  onExpandAllSections: (sectionIds: string[]) => void;
  onCollapseAllSections: (sectionIds: string[]) => void;
}

export function LessonViewer({
  moduleRecord,
  lesson,
  questions,
  isCompleted,
  isBookmarked,
  masteryChecks,
  collapsedSections,
  globalDifficulty,
  forcedOpenId,
  onToggleComplete,
  onToggleBookmark,
  onToggleMastery,
  onToggleSection,
  onExpandAllSections,
  onCollapseAllSections
}: LessonViewerProps) {
  const collapsibleIds = useMemo(
    () => lesson.sections.filter((s) => Boolean(s.letter)).map((s) => s.id),
    [lesson.sections]
  );

  const masteryCheckedCount = useMemo(
    () => lesson.masteryItems.filter((item) => Boolean(masteryChecks[item.id])).length,
    [lesson.masteryItems, masteryChecks]
  );

  const mdxComponents = useMemo<MdxComponentsProp>(() => {
    const BoundTopicSection = (props: {
      id: string;
      letter: string;
      title: string;
      children: React.ReactNode;
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
      <InterviewBank
        questions={questions}
        globalDifficulty={globalDifficulty}
        forcedOpenId={forcedOpenId}
      />
    );

    const WrappedTable = (props: React.TableHTMLAttributes<HTMLTableElement>) => (
      <ComparisonTable>
        <table {...props} />
      </ComparisonTable>
    );

    return {
      TopicSection: BoundTopicSection,
      InterviewSection: BoundInterviewSection,
      Callout,
      CodeBlock,
      ComparisonTable,
      DiagramCard,
      ExerciseCard,
      GlossaryTerm,
      table: WrappedTable
    } as MdxComponentsProp;
  }, [collapsedSections, onToggleSection, questions, globalDifficulty, forcedOpenId]);

  const LessonContent = lesson.Content;

  return (
    <section
      className="module"
      id={moduleRecord.id}
      data-module-number={moduleRecord.number}
      data-module-title={moduleRecord.title}
      data-category={moduleRecord.category}
    >
      <header className="module-header">
        <div className="module-kicker">
          <Badge variant="accent">Module {String(moduleRecord.number).padStart(2, "0")}</Badge>
          <Badge variant="neutral">Category: Fundamentals &amp; Languages</Badge>
          <Badge variant="neutral">{moduleRecord.partSummary}</Badge>
        </div>
        <h1>
          Module {moduleRecord.number}: {moduleRecord.title}
        </h1>
        <p className="module-lead">{moduleRecord.lead}</p>
        <div className="module-toolbar">
          <Badge variant="neutral">{moduleRecord.scopeSummary}</Badge>
          <div className="module-toolbar-actions">
            <Button variant="small" onClick={() => onExpandAllSections(collapsibleIds)}>
              Expand All Sections
            </Button>
            <Button variant="small" onClick={() => onCollapseAllSections(collapsibleIds)}>
              Collapse All Sections
            </Button>
          </div>
        </div>
      </header>

      <article
        className="lesson"
        id={lesson.id}
        data-lesson-id={lesson.id}
        data-lesson-title={lesson.title}
        data-category={lesson.category}
        data-duration={lesson.duration}
      >
        <header className="lesson-header">
          <div className="lesson-title-wrap">
            <div className="lesson-meta-row">
              <Badge variant="accent">{lesson.partLabel}</Badge>
              <Badge variant="neutral">Estimated Study Time: {lesson.duration}</Badge>
            </div>
            <h2>{lesson.title.replace(/^Part \d+:\s*/, "")}</h2>
          </div>

          <div className="lesson-actions">
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
              className="lesson-bookmark-btn"
              aria-pressed={isBookmarked}
              onClick={() => onToggleBookmark(lesson.id)}
            >
              {isBookmarked ? "\u2605 Bookmarked" : "\u2606 Bookmark"}
            </Button>
          </div>
        </header>

        <div className="lesson-objectives" id={`${lesson.id}-objectives`}>
          <h3>Learning Objectives</h3>
          <ul>
            {lesson.objectives.map((obj, idx) => (
              <li key={idx}>
                <RichText text={obj} />
              </li>
            ))}
          </ul>
        </div>

        <LessonContent components={mdxComponents} />

        <section className="mastery-box" id={`${lesson.id}-mastery`}>
          <div className="mastery-header">
            <h3>Mastery Assessment &amp; Practical Task ({lesson.partLabel})</h3>
            <Badge variant="accent" className="mastery-score">
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
      </article>
    </section>
  );
}
