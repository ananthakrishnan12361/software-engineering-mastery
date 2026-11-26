import { useCallback, useEffect, useState } from "react";
import { handbookCatalog } from "@content/registry";
import type { SearchRecord } from "@/entities/handbook";
import {
  clearProgressState,
  createDefaultProgressState,
  loadProgressState,
  parseImportedProgressJson,
  saveProgressState,
  type HandbookProgressState
} from "@/entities/progress";
import { BookmarksPage } from "@/pages/bookmarks";
import { GlossaryPage } from "@/pages/glossary";
import { HomePage } from "@/pages/home";
import { InterviewsPage } from "@/pages/interviews";
import { LessonPage } from "@/pages/lesson";
import { ProgressPage } from "@/pages/progress";
import { TopicsPage } from "@/pages/topics";
import type { FontSizePx, PageId, ThemeMode } from "@/shared/config";
import { navigateHash, useAppRoute } from "@/shared/lib";
import { AppShell } from "./AppShell";

function resolveTheme(savedTheme: ThemeMode | null): ThemeMode {
  if (savedTheme === "light" || savedTheme === "dark" || savedTheme === "sepia") return savedTheme;
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
    return "light";
  }
  return "dark";
}

const THEME_CYCLE: ThemeMode[] = ["light", "dark", "sepia"];

export function App() {
  const [progress, setProgress] = useState<HandbookProgressState>(() => loadProgressState());
  const route = useAppRoute();
  const activeTheme = resolveTheme(progress.theme);
  const activeFontSize = progress.fontSize ?? 16;

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", activeTheme);
  }, [activeTheme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-font-size", String(activeFontSize));
    document.documentElement.style.setProperty("--body-font-size", `${activeFontSize}px`);
  }, [activeFontSize]);

  useEffect(() => {
    saveProgressState(progress);
  }, [progress]);

  useEffect(() => {
    if (route.page === "lesson" && route.lessonId) {
      const exists = handbookCatalog.lessons.some((l) => l.id === route.lessonId);
      if (exists && progress.lastLessonId !== route.lessonId) {
        setProgress((prev) => ({ ...prev, lastLessonId: route.lessonId ?? undefined }));
      }
    }
  }, [route.page, route.lessonId, progress.lastLessonId]);

  const handleCycleTheme = useCallback(() => {
    setProgress((prev) => {
      const current = resolveTheme(prev.theme);
      const next = THEME_CYCLE[(THEME_CYCLE.indexOf(current) + 1) % THEME_CYCLE.length];
      return { ...prev, theme: next };
    });
  }, []);

  const handleSelectFontSize = useCallback((fontSize: FontSizePx) => {
    setProgress((prev) => ({ ...prev, fontSize }));
  }, []);

  const handleToggleComplete = useCallback((lessonId: string) => {
    setProgress((prev) => {
      const next = { ...prev.completedLessons };
      if (next[lessonId]) delete next[lessonId];
      else next[lessonId] = Date.now();
      return { ...prev, completedLessons: next };
    });
  }, []);

  const handleToggleBookmark = useCallback((lessonId: string) => {
    setProgress((prev) => {
      const next = { ...prev.bookmarks };
      if (next[lessonId]) delete next[lessonId];
      else next[lessonId] = Date.now();
      return { ...prev, bookmarks: next };
    });
  }, []);

  const handleToggleMastery = useCallback((masteryId: string) => {
    setProgress((prev) => {
      const next = { ...prev.masteryChecks };
      if (next[masteryId]) delete next[masteryId];
      else next[masteryId] = true;
      return { ...prev, masteryChecks: next };
    });
  }, []);

  const handleToggleSection = useCallback((sectionId: string) => {
    setProgress((prev) => {
      const next = { ...prev.collapsedSections };
      if (next[sectionId]) delete next[sectionId];
      else next[sectionId] = true;
      return { ...prev, collapsedSections: next };
    });
  }, []);

  const handleExpandSections = useCallback((sectionIds: string[]) => {
    setProgress((prev) => {
      let changed = false;
      const next = { ...prev.collapsedSections };
      for (const id of sectionIds) {
        if (next[id]) {
          delete next[id];
          changed = true;
        }
      }
      return changed ? { ...prev, collapsedSections: next } : prev;
    });
  }, []);

  const handleCollapseSections = useCallback((sectionIds: string[]) => {
    setProgress((prev) => {
      const next = { ...prev.collapsedSections };
      for (const id of sectionIds) next[id] = true;
      return { ...prev, collapsedSections: next };
    });
  }, []);

  const handleImportProgress = useCallback((jsonText: string) => {
    const imported = parseImportedProgressJson(jsonText);
    setProgress(imported);
  }, []);

  const handleResetProgress = useCallback(() => {
    clearProgressState();
    setProgress(createDefaultProgressState());
  }, []);

  const handleNavigate = useCallback(
    (page: PageId, lessonId?: string | null, sectionId?: string | null) => {
      const targetLesson =
        page === "lesson" ? lessonId || progress.lastLessonId || handbookCatalog.lessons[0]?.id : null;
      navigateHash(page, { lessonId: targetLesson, sectionId });
    },
    [progress.lastLessonId]
  );

  const handleSelectSearchResult = useCallback((record: SearchRecord) => {
    if (record.available && record.lessonId) {
      navigateHash("lesson", { lessonId: record.lessonId, sectionId: record.sectionId });
    } else if (record.moduleNumber) {
      navigateHash("topics", { params: { availability: "unwritten" } });
      window.requestAnimationFrame(() => {
        const el = document.getElementById(`syllabus-mod-${record.moduleNumber}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } else {
      navigateHash("topics");
    }
  }, []);

  const activeLesson =
    handbookCatalog.lessons.find((l) => l.id === route.lessonId) ?? handbookCatalog.lessons[0];

  function renderPage() {
    switch (route.page) {
      case "home":
        return (
          <HomePage
            lessons={handbookCatalog.lessons}
            syllabusModules={handbookCatalog.syllabusModules}
            totalQuestions={handbookCatalog.allQuestions.length}
            lastLessonId={progress.lastLessonId}
            completedLessons={progress.completedLessons}
            bookmarks={progress.bookmarks}
            onNavigate={(page, lid) => handleNavigate(page, lid)}
          />
        );
      case "topics":
        return (
          <TopicsPage
            syllabusModules={handbookCatalog.syllabusModules}
            completedLessons={progress.completedLessons}
            bookmarks={progress.bookmarks}
            routeParams={route.params}
            onUpdateParams={(params) => navigateHash("topics", { params })}
            onOpenTopic={(lessonId, anchorId) =>
              navigateHash("lesson", { lessonId, sectionId: anchorId })
            }
          />
        );
      case "interviews":
        return (
          <InterviewsPage
            questions={handbookCatalog.allQuestions}
            syllabusModules={handbookCatalog.syllabusModules}
            routeParams={route.params}
            onUpdateParams={(params) => navigateHash("interviews", { params })}
            onOpenQuestionInLesson={(lessonId, questionId) =>
              navigateHash("lesson", { lessonId, sectionId: questionId })
            }
          />
        );
      case "glossary":
        return (
          <GlossaryPage
            entries={handbookCatalog.glossaryEntries}
            onJumpToSection={(lessonId, sectionId) =>
              navigateHash("lesson", { lessonId, sectionId })
            }
          />
        );
      case "bookmarks":
        return (
          <BookmarksPage
            lessons={handbookCatalog.lessons}
            bookmarks={progress.bookmarks}
            completedLessons={progress.completedLessons}
            onOpenLesson={(lessonId) => navigateHash("lesson", { lessonId })}
            onRemoveBookmark={handleToggleBookmark}
            onBrowseTopics={() => navigateHash("topics")}
          />
        );
      case "progress":
        return (
          <ProgressPage
            lessons={handbookCatalog.lessons}
            state={progress}
            onOpenLesson={(lessonId) => navigateHash("lesson", { lessonId })}
            onImportJson={handleImportProgress}
            onReset={handleResetProgress}
          />
        );
      case "lesson":
      default:
        return (
          <LessonPage
            lesson={activeLesson}
            allLessons={handbookCatalog.lessons}
            questions={handbookCatalog.questionsByLesson[activeLesson.id] ?? []}
            sectionTarget={route.sectionId}
            isCompleted={Boolean(progress.completedLessons[activeLesson.id])}
            isBookmarked={Boolean(progress.bookmarks[activeLesson.id])}
            masteryChecks={progress.masteryChecks}
            collapsedSections={progress.collapsedSections}
            onToggleComplete={handleToggleComplete}
            onToggleBookmark={handleToggleBookmark}
            onToggleMastery={handleToggleMastery}
            onToggleSection={handleToggleSection}
            onExpandSections={handleExpandSections}
            onCollapseSections={handleCollapseSections}
            onNavigateLesson={(lid, sid) =>
              navigateHash("lesson", { lessonId: lid, sectionId: sid })
            }
          />
        );
    }
  }

  return (
    <AppShell
      activePage={route.page}
      activeLessonId={route.page === "lesson" ? activeLesson.id : null}
      hasToc={route.page === "lesson"}
      lessons={handbookCatalog.lessons}
      completedLessons={progress.completedLessons}
      bookmarks={progress.bookmarks}
      searchRecords={handbookCatalog.searchRecords}
      theme={activeTheme}
      fontSize={activeFontSize}
      onCycleTheme={handleCycleTheme}
      onSelectFontSize={handleSelectFontSize}
      onSelectSearchResult={handleSelectSearchResult}
      onNavigate={handleNavigate}
    >
      {renderPage()}
    </AppShell>
  );
}
