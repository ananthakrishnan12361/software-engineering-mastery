import { useEffect, useMemo, useState } from "react";
import type { HandbookProgressState } from "@/entities/progress";
import { navigateToHash, useHashRoute } from "@/shared/lib";
import type { ThemeMode } from "@/shared/config";
import { Button } from "@/shared/ui";
import type {
  GlossaryEntry,
  InterviewQuestion,
  LessonRecord,
  ModuleRecord,
  SearchRecord
} from "../model/types";
import { GlossaryModal } from "./GlossaryModal";
import { LessonViewer } from "./LessonViewer";
import { ProgressModal } from "./ProgressModal";
import { RightToc } from "./RightToc";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export interface HandbookPageProps {
  modules: ModuleRecord[];
  lessons: LessonRecord[];
  questionsByLesson: Record<string, InterviewQuestion[]>;
  glossaryEntries: GlossaryEntry[];
  searchRecords: SearchRecord[];
  progress: HandbookProgressState;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onToggleComplete: (lessonId: string) => void;
  onToggleBookmark: (lessonId: string) => void;
  onToggleMastery: (masteryId: string) => void;
  onToggleSection: (sectionId: string) => void;
  onExpandSections: (sectionIds: string[]) => void;
  onCollapseSections: (sectionIds: string[]) => void;
  onSetCategory: (category: string) => void;
  onSetDifficulty: (difficulty: string) => void;
  onToggleBookmarksOnly: () => void;
  onResetFilters: () => void;
  onImportProgress: (jsonText: string) => void;
  onResetProgress: () => void;
}

export function HandbookPage({
  modules,
  lessons,
  questionsByLesson,
  glossaryEntries,
  searchRecords,
  progress,
  theme,
  onToggleTheme,
  onToggleComplete,
  onToggleBookmark,
  onToggleMastery,
  onToggleSection,
  onExpandSections,
  onCollapseSections,
  onSetCategory,
  onSetDifficulty,
  onToggleBookmarksOnly,
  onResetFilters,
  onImportProgress,
  onResetProgress
}: HandbookPageProps) {
  const route = useHashRoute();
  const [sidebarCollapsedDesktop, setSidebarCollapsedDesktop] = useState(false);
  const [sidebarOpenMobile, setSidebarOpenMobile] = useState(false);
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [progressOpen, setProgressOpen] = useState(false);
  const [pendingScrollTarget, setPendingScrollTarget] = useState<string | null>(null);

  const lessonsById = useMemo(() => {
    const map: Record<string, LessonRecord> = {};
    for (const l of lessons) map[l.id] = l;
    return map;
  }, [lessons]);

  const modulesById = useMemo(() => {
    const map: Record<string, ModuleRecord> = {};
    for (const m of modules) map[m.id] = m;
    return map;
  }, [modules]);

  const filteredLessons = useMemo(() => {
    return lessons.filter((l) => {
      const catOk = progress.filters.category === "all" || l.category === progress.filters.category;
      const bmOk = !progress.filters.bookmarksOnly || Boolean(progress.bookmarks[l.id]);
      return catOk && bmOk;
    });
  }, [lessons, progress.filters.category, progress.filters.bookmarksOnly, progress.bookmarks]);

  const activeLesson = useMemo(() => {
    if (route.lessonId && lessonsById[route.lessonId]) {
      const target = lessonsById[route.lessonId];
      if (filteredLessons.some((l) => l.id === target.id)) {
        return target;
      }
    }
    return filteredLessons[0] ?? null;
  }, [route.lessonId, lessonsById, filteredLessons]);

  const completedCount = useMemo(
    () => lessons.filter((l) => Boolean(progress.completedLessons[l.id])).length,
    [lessons, progress.completedLessons]
  );
  const bookmarkCount = useMemo(
    () => lessons.filter((l) => Boolean(progress.bookmarks[l.id])).length,
    [lessons, progress.bookmarks]
  );
  const progressPct = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;

  // Handle hash-routed section jumps (auto-expand section & scroll)
  useEffect(() => {
    if (!route.sectionId) return;

    // If sectionId is an IQ card, ensure Section M/N is expanded too
    const sectionPrefix = route.lessonId ?? activeLesson?.id;
    const toExpand: string[] = [route.sectionId];
    if (sectionPrefix && route.sectionId.includes("-iq-")) {
      toExpand.push(`${sectionPrefix}-sec-mn`);
    }
    onExpandSections(toExpand);
    setPendingScrollTarget(route.sectionId);
  }, [route.lessonId, route.sectionId, activeLesson?.id, onExpandSections]);

  useEffect(() => {
    if (!pendingScrollTarget) return;
    const raf = window.requestAnimationFrame(() => {
      const el = document.getElementById(pendingScrollTarget);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setPendingScrollTarget(null);
    });
    return () => window.cancelAnimationFrame(raf);
  }, [pendingScrollTarget, activeLesson?.id]);

  function handleToggleSidebar() {
    if (window.innerWidth <= 900) {
      setSidebarOpenMobile((prev) => !prev);
    } else {
      setSidebarCollapsedDesktop((prev) => !prev);
    }
  }

  function handleJumpToTarget(lessonId: string, sectionId?: string | null) {
    const target = lessonsById[lessonId];
    if (target && !filteredLessons.some((l) => l.id === target.id)) {
      onResetFilters();
    }
    setSidebarOpenMobile(false);
    navigateToHash(lessonId, sectionId);
  }

  const activeFilterParts: string[] = [];
  if (progress.filters.category !== "all") activeFilterParts.push(`Category: ${progress.filters.category}`);
  if (progress.filters.difficulty !== "all")
    activeFilterParts.push(`Interview difficulty: ${progress.filters.difficulty}`);
  if (progress.filters.bookmarksOnly) activeFilterParts.push("Bookmarks only");

  const activeModule = activeLesson ? modulesById[activeLesson.moduleId] : undefined;

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      {sidebarOpenMobile ? (
        <div
          id="sidebar-backdrop"
          className="sidebar-backdrop visible"
          onClick={() => setSidebarOpenMobile(false)}
        />
      ) : null}

      <Topbar
        moduleCount={modules.length}
        lessonCount={lessons.length}
        bookmarkCount={bookmarkCount}
        progressPct={progressPct}
        theme={theme}
        category={progress.filters.category}
        difficulty={progress.filters.difficulty}
        bookmarksOnly={progress.filters.bookmarksOnly}
        sidebarExpanded={window.innerWidth <= 900 ? sidebarOpenMobile : !sidebarCollapsedDesktop}
        searchRecords={searchRecords}
        onToggleSidebar={handleToggleSidebar}
        onCategoryChange={onSetCategory}
        onDifficultyChange={onSetDifficulty}
        onToggleBookmarksFilter={onToggleBookmarksOnly}
        onOpenGlossary={() => setGlossaryOpen(true)}
        onOpenProgress={() => setProgressOpen(true)}
        onToggleTheme={onToggleTheme}
        onSelectSearchResult={(lid, sid) => handleJumpToTarget(lid, sid)}
      />

      <div className={`portal-layout ${sidebarCollapsedDesktop ? "sidebar-hidden" : ""}`.trim()}>
        <Sidebar
          modules={modules}
          lessonsById={lessonsById}
          activeLessonId={activeLesson?.id ?? ""}
          completedLessons={progress.completedLessons}
          bookmarks={progress.bookmarks}
          collapsedDesktop={sidebarCollapsedDesktop}
          openMobile={sidebarOpenMobile}
          onSelectLesson={(lid) => handleJumpToTarget(lid)}
        />

        <main id="main-content" className="main-content" tabIndex={-1}>
          {activeFilterParts.length > 0 ? (
            <div id="active-filter-bar" className="active-filter-bar">
              <span id="active-filter-summary">
                Active filters &mdash; {activeFilterParts.join(" · ")}
              </span>
              <Button variant="small" id="clear-filters-btn" onClick={onResetFilters}>
                Reset Filters
              </Button>
            </div>
          ) : null}

          <div id="handbook-content">
            {activeLesson && activeModule ? (
              <LessonViewer
                moduleRecord={activeModule}
                lesson={activeLesson}
                questions={questionsByLesson[activeLesson.id] ?? []}
                isCompleted={Boolean(progress.completedLessons[activeLesson.id])}
                isBookmarked={Boolean(progress.bookmarks[activeLesson.id])}
                masteryChecks={progress.masteryChecks}
                collapsedSections={progress.collapsedSections}
                globalDifficulty={progress.filters.difficulty}
                forcedOpenId={route.sectionId}
                onToggleComplete={onToggleComplete}
                onToggleBookmark={onToggleBookmark}
                onToggleMastery={onToggleMastery}
                onToggleSection={onToggleSection}
                onExpandAllSections={onExpandSections}
                onCollapseAllSections={onCollapseSections}
              />
            ) : (
              <div id="empty-filter-state" className="empty-state">
                <h2>No matching lessons found</h2>
                <p>Try clearing the category, bookmark, or search filter to see available modules.</p>
                <Button variant="primary" id="empty-reset-btn" onClick={onResetFilters}>
                  Show All Content
                </Button>
              </div>
            )}
          </div>
        </main>

        {activeLesson ? (
          <RightToc
            lessonId={activeLesson.id}
            sections={activeLesson.sections}
            onJumpSection={(lid, sid) => handleJumpToTarget(lid, sid)}
          />
        ) : null}
      </div>

      <GlossaryModal
        open={glossaryOpen}
        entries={glossaryEntries}
        onClose={() => setGlossaryOpen(false)}
        onJump={(lid, sid) => handleJumpToTarget(lid, sid)}
      />

      <ProgressModal
        open={progressOpen}
        totalLessons={lessons.length}
        state={progress}
        onClose={() => setProgressOpen(false)}
        onImportJson={onImportProgress}
        onReset={onResetProgress}
      />
    </>
  );
}
