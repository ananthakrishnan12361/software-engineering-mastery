import { useCallback, useEffect, useState } from "react";
import { handbookCatalog } from "@content/registry";
import {
  clearProgressState,
  createDefaultProgressState,
  loadProgressState,
  parseImportedProgressJson,
  saveProgressState,
  type HandbookProgressState
} from "@/entities/progress";
import { HandbookPage } from "@/pages/handbook";
import type { ThemeMode } from "@/shared/config";

function resolveTheme(savedTheme: ThemeMode | null): ThemeMode {
  if (savedTheme === "dark" || savedTheme === "light") return savedTheme;
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
    return "light";
  }
  return "dark";
}

export function App() {
  const [progress, setProgress] = useState<HandbookProgressState>(() => loadProgressState());
  const activeTheme = resolveTheme(progress.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", activeTheme);
  }, [activeTheme]);

  useEffect(() => {
    saveProgressState(progress);
  }, [progress]);

  const handleToggleTheme = useCallback(() => {
    setProgress((prev) => {
      const current = resolveTheme(prev.theme);
      return { ...prev, theme: current === "dark" ? "light" : "dark" };
    });
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
      for (const id of sectionIds) {
        next[id] = true;
      }
      return { ...prev, collapsedSections: next };
    });
  }, []);

  const handleSetCategory = useCallback((category: string) => {
    setProgress((prev) => ({
      ...prev,
      filters: { ...prev.filters, category }
    }));
  }, []);

  const handleSetDifficulty = useCallback((difficulty: string) => {
    setProgress((prev) => ({
      ...prev,
      filters: { ...prev.filters, difficulty }
    }));
  }, []);

  const handleToggleBookmarksOnly = useCallback(() => {
    setProgress((prev) => ({
      ...prev,
      filters: { ...prev.filters, bookmarksOnly: !prev.filters.bookmarksOnly }
    }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setProgress((prev) => ({
      ...prev,
      filters: { category: "all", difficulty: "all", bookmarksOnly: false }
    }));
  }, []);

  const handleImportProgress = useCallback((jsonText: string) => {
    const imported = parseImportedProgressJson(jsonText);
    setProgress(imported);
  }, []);

  const handleResetProgress = useCallback(() => {
    clearProgressState();
    setProgress(createDefaultProgressState());
  }, []);

  return (
    <HandbookPage
      modules={handbookCatalog.modules}
      lessons={handbookCatalog.lessons}
      questionsByLesson={handbookCatalog.questionsByLesson}
      glossaryEntries={handbookCatalog.glossaryEntries}
      searchRecords={handbookCatalog.searchRecords}
      progress={progress}
      theme={activeTheme}
      onToggleTheme={handleToggleTheme}
      onToggleComplete={handleToggleComplete}
      onToggleBookmark={handleToggleBookmark}
      onToggleMastery={handleToggleMastery}
      onToggleSection={handleToggleSection}
      onExpandSections={handleExpandSections}
      onCollapseSections={handleCollapseSections}
      onSetCategory={handleSetCategory}
      onSetDifficulty={handleSetDifficulty}
      onToggleBookmarksOnly={handleToggleBookmarksOnly}
      onResetFilters={handleResetFilters}
      onImportProgress={handleImportProgress}
      onResetProgress={handleResetProgress}
    />
  );
}
