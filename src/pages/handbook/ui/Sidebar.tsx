import { useState } from "react";
import { buildHashHref } from "@/shared/lib";
import { ProgressBar } from "@/shared/ui";
import type { LessonRecord, ModuleRecord } from "../model/types";

export interface SidebarProps {
  modules: ModuleRecord[];
  lessonsById: Record<string, LessonRecord>;
  activeLessonId: string;
  completedLessons: Record<string, number>;
  bookmarks: Record<string, number>;
  collapsedDesktop: boolean;
  openMobile: boolean;
  onSelectLesson: (lessonId: string) => void;
}

export function Sidebar({
  modules,
  lessonsById,
  activeLessonId,
  completedLessons,
  bookmarks,
  collapsedDesktop,
  openMobile,
  onSelectLesson
}: SidebarProps) {
  const [query, setQuery] = useState("");
  const [closedModules, setClosedModules] = useState<Record<string, boolean>>({});

  const totalLessons = Object.keys(lessonsById).length;
  const completedCount = Object.keys(lessonsById).filter((id) => Boolean(completedLessons[id])).length;
  const bookmarkedCount = Object.keys(lessonsById).filter((id) => Boolean(bookmarks[id])).length;
  const pct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const lowerQuery = query.trim().toLowerCase();

  return (
    <aside
      id="sidebar"
      className={`sidebar ${collapsedDesktop ? "collapsed-desktop" : ""} ${openMobile ? "open-mobile" : ""}`.trim()}
      aria-label="Course modules navigation"
    >
      <div className="sidebar-progress-card">
        <div className="progress-row">
          <span className="progress-label">Course Progress</span>
          <strong id="sidebar-progress-text">
            {completedCount} / {totalLessons} lessons
          </strong>
        </div>
        <ProgressBar percent={pct} label="Course completion progress" />
        <div className="sidebar-stats">
          <span id="sidebar-pct-label">{pct}% complete</span>
          <span id="sidebar-bookmarks-label">{bookmarkedCount} bookmarked</span>
        </div>
      </div>

      <div className="sidebar-filter-wrap">
        <input
          type="search"
          id="sidebar-filter"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter modules or lessons..."
          aria-label="Filter sidebar navigation"
        />
      </div>

      <nav id="sidebar-nav" className="sidebar-nav" aria-label="Module list">
        {modules.map((mod) => {
          const modLessons = mod.lessonIds
            .map((id) => lessonsById[id])
            .filter((l): l is LessonRecord => Boolean(l));

          const modTitleMatch = !lowerQuery || `${mod.number}. ${mod.title}`.toLowerCase().includes(lowerQuery);
          const visibleLessons = modTitleMatch
            ? modLessons
            : modLessons.filter((l) => l.title.toLowerCase().includes(lowerQuery));

          if (!modTitleMatch && visibleLessons.length === 0) return null;

          const modDone = modLessons.filter((l) => Boolean(completedLessons[l.id])).length;
          const isOpen = !closedModules[mod.id];

          return (
            <div className="nav-module" key={mod.id}>
              <button
                type="button"
                className="nav-module-header"
                aria-expanded={isOpen}
                onClick={() => setClosedModules((prev) => ({ ...prev, [mod.id]: isOpen }))}
              >
                <span>
                  {mod.number}. {mod.title}
                </span>
                <span className="nav-module-meta">
                  {modDone}/{modLessons.length}
                </span>
              </button>

              {isOpen ? (
                <div className="nav-lesson-list">
                  {visibleLessons.map((lesson) => {
                    const isDone = Boolean(completedLessons[lesson.id]);
                    const isSaved = Boolean(bookmarks[lesson.id]);
                    const isActive = lesson.id === activeLessonId;
                    return (
                      <a
                        key={lesson.id}
                        href={buildHashHref(lesson.id)}
                        className={`nav-lesson-link ${isActive ? "active" : ""}`.trim()}
                        onClick={(e) => {
                          e.preventDefault();
                          onSelectLesson(lesson.id);
                        }}
                      >
                        <span>{lesson.title}</span>
                        <span className="nav-lesson-status">
                          {isSaved ? (
                            <span className="status-bookmark" title="Bookmarked">
                              &#9733;
                            </span>
                          ) : null}
                          {isDone ? (
                            <span className="status-done" title="Completed">
                              &#10003;
                            </span>
                          ) : null}
                        </span>
                      </a>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
