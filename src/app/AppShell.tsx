import { useEffect, useRef, useState, type ReactNode } from "react";
import type { LessonRecord, SearchRecord } from "@/entities/handbook";
import {
  FONT_SIZE_OPTIONS,
  THEME_LABELS,
  type FontSizePx,
  type PageId,
  type ThemeMode
} from "@/shared/config";
import { buildPageHash } from "@/shared/lib";
import { Button, ProgressBar } from "@/shared/ui";
import { SearchOverlay } from "./SearchOverlay";

export interface AppShellProps {
  activePage: PageId;
  activeLessonId: string | null;
  hasToc: boolean;
  lessons: LessonRecord[];
  completedLessons: Record<string, number>;
  bookmarks: Record<string, number>;
  searchRecords: SearchRecord[];
  theme: ThemeMode;
  fontSize: FontSizePx;
  onCycleTheme: () => void;
  onSelectFontSize: (size: FontSizePx) => void;
  onSelectSearchResult: (record: SearchRecord) => void;
  onNavigate: (page: PageId, lessonId?: string | null, sectionId?: string | null) => void;
  children: ReactNode;
}

const NAV_PAGES: Array<{ id: PageId; label: string }> = [
  { id: "home", label: "Home" },
  { id: "topics", label: "All Topics (28)" },
  { id: "interviews", label: "Interviews" },
  { id: "glossary", label: "Glossary" },
  { id: "bookmarks", label: "Bookmarks" },
  { id: "progress", label: "Progress" }
];

export function AppShell({
  activePage,
  activeLessonId,
  hasToc,
  lessons,
  completedLessons,
  bookmarks,
  searchRecords,
  theme,
  fontSize,
  onCycleTheme,
  onSelectFontSize,
  onSelectSearchResult,
  onNavigate,
  children
}: AppShellProps) {
  const [sidebarCollapsedDesktop, setSidebarCollapsedDesktop] = useState(false);
  const [sidebarOpenMobile, setSidebarOpenMobile] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  const completedCount = lessons.filter((l) => Boolean(completedLessons[l.id])).length;
  const bookmarkCount = lessons.filter((l) => Boolean(bookmarks[l.id])).length;
  const pct = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === "Escape") {
        setMoreOpen(false);
        setSidebarOpenMobile(false);
      }
    };
    const onClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onClickOutside);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onClickOutside);
    };
  }, []);

  function handleToggleSidebar() {
    if (window.innerWidth < 1200) {
      setSidebarOpenMobile((prev) => !prev);
    } else {
      setSidebarCollapsedDesktop((prev) => !prev);
    }
  }

  function handleNavClick(page: PageId, lessonId?: string | null) {
    setSidebarOpenMobile(false);
    setMoreOpen(false);
    onNavigate(page, lessonId);
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      {sidebarOpenMobile ? (
        <div className="drawer-backdrop" onClick={() => setSidebarOpenMobile(false)} />
      ) : null}

      <header className="topbar" role="banner">
        <div className="topbar-left">
          <Button
            variant="icon"
            id="sidebar-toggle"
            aria-label="Toggle navigation menu"
            aria-expanded={window.innerWidth < 1200 ? sidebarOpenMobile : !sidebarCollapsedDesktop}
            aria-controls="sidebar"
            onClick={handleToggleSidebar}
          >
            <span aria-hidden="true">&#9776;</span>
          </Button>

          <a
            href={buildPageHash("home")}
            className="brand-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("home");
            }}
          >
            <span className="brand-mark" aria-hidden="true">
              &lt;/&gt;
            </span>
            <span className="brand-title">SE Mastery</span>
          </a>
        </div>

        <div className="topbar-search-trigger">
          <button
            type="button"
            id="open-search-btn"
            className="search-trigger-btn"
            aria-label="Search handbook (Ctrl+K)"
            onClick={() => setSearchOpen(true)}
          >
            <span>
              <span aria-hidden="true">&#128269;</span>{" "}
              <span className="search-placeholder-long">Search topics, code, Q&amp;A...</span>
            </span>
            <kbd className="search-kbd">Ctrl+K</kbd>
          </button>
        </div>

        <div className="topbar-actions">
          <Button
            variant="pill"
            id="theme-toggle"
            aria-label={`Switch theme (current: ${THEME_LABELS[theme]})`}
            onClick={onCycleTheme}
          >
            <span aria-hidden="true">
              {theme === "dark" ? "\u263E" : theme === "sepia" ? "\u25D0" : "\u2600"}
            </span>
            <span className="theme-label">{THEME_LABELS[theme]}</span>
          </Button>

          <div className="more-menu-wrap" ref={moreRef}>
            <Button
              variant="icon"
              id="more-menu-btn"
              aria-label="More reading and tool options"
              aria-expanded={moreOpen}
              onClick={() => setMoreOpen((prev) => !prev)}
            >
              &middot;&middot;&middot;
            </Button>

            {moreOpen ? (
              <div className="more-menu-panel" role="menu" aria-label="More options">
                <div className="more-menu-label">Font Size ({fontSize}px)</div>
                <div className="font-size-group" role="group" aria-label="Reading font size">
                  {FONT_SIZE_OPTIONS.map((sz) => (
                    <Button
                      key={sz}
                      variant="small"
                      aria-pressed={fontSize === sz}
                      onClick={() => onSelectFontSize(sz)}
                    >
                      {sz}
                    </Button>
                  ))}
                </div>

                <div className="more-menu-divider" />

                <a
                  href={buildPageHash("progress")}
                  className="more-menu-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("progress");
                  }}
                >
                  Progress &amp; Backup ({pct}%)
                </a>
                <a
                  href={buildPageHash("glossary")}
                  className="more-menu-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("glossary");
                  }}
                >
                  Glossary
                </a>
                <a
                  href={buildPageHash("bookmarks")}
                  className="more-menu-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("bookmarks");
                  }}
                >
                  Bookmarks ({bookmarkCount})
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <div
        className={`portal-layout ${hasToc ? "has-toc" : ""} ${
          sidebarCollapsedDesktop ? "sidebar-hidden" : ""
        }`.trim()}
      >
        <aside
          id="sidebar"
          className={`sidebar ${sidebarCollapsedDesktop ? "collapsed-desktop" : ""} ${
            sidebarOpenMobile ? "open-mobile" : ""
          }`.trim()}
          aria-label="Handbook navigation"
        >
          <nav className="sidebar-pages" aria-label="Pages">
            {NAV_PAGES.map((p) => {
              const countHint = p.id === "bookmarks" && bookmarkCount > 0 ? ` (${bookmarkCount})` : "";
              return (
                <a
                  key={p.id}
                  href={buildPageHash(p.id)}
                  className={`sidebar-page-link ${activePage === p.id ? "active" : ""}`.trim()}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(p.id);
                  }}
                >
                  <span>{p.label + countHint}</span>
                </a>
              );
            })}
          </nav>

          <div className="sidebar-progress-line">
            <div className="progress-row">
              <span>Written Progress</span>
              <strong>
                {completedCount}/{lessons.length}
              </strong>
            </div>
            <ProgressBar percent={pct} label="Written lesson progress" />
          </div>

          <div className="sidebar-section-title">Available Lessons</div>
          <nav className="nav-module-group" aria-label="Available lessons">
            {lessons.map((lesson) => {
              const isDone = Boolean(completedLessons[lesson.id]);
              const isSaved = Boolean(bookmarks[lesson.id]);
              const isActive = activePage === "lesson" && activeLessonId === lesson.id;
              return (
                <a
                  key={lesson.id}
                  href={buildPageHash("lesson", { lessonId: lesson.id })}
                  className={`nav-lesson-link ${isActive ? "active" : ""}`.trim()}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("lesson", lesson.id);
                  }}
                >
                  <span>
                    M{String(lesson.moduleNumber).padStart(2, "0")}: {lesson.title}
                  </span>
                  <span>
                    {isSaved ? <span className="status-bookmark">&#9733; </span> : null}
                    {isDone ? <span className="status-done">&#10003;</span> : null}
                  </span>
                </a>
              );
            })}
          </nav>
        </aside>

        {children}
      </div>

      <SearchOverlay
        open={searchOpen}
        records={searchRecords}
        onClose={() => setSearchOpen(false)}
        onSelectResult={onSelectSearchResult}
      />
    </>
  );
}
