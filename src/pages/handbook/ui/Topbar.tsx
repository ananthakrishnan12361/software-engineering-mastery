import { CATEGORY_OPTIONS, type ThemeMode } from "@/shared/config";
import { Button } from "@/shared/ui";
import type { SearchRecord } from "../model/types";
import { SearchPopover } from "./SearchPopover";

export interface TopbarProps {
  moduleCount: number;
  lessonCount: number;
  bookmarkCount: number;
  progressPct: number;
  theme: ThemeMode;
  category: string;
  difficulty: string;
  bookmarksOnly: boolean;
  sidebarExpanded: boolean;
  searchRecords: SearchRecord[];
  onToggleSidebar: () => void;
  onCategoryChange: (category: string) => void;
  onDifficultyChange: (difficulty: string) => void;
  onToggleBookmarksFilter: () => void;
  onOpenGlossary: () => void;
  onOpenProgress: () => void;
  onToggleTheme: () => void;
  onSelectSearchResult: (lessonId: string, sectionId: string) => void;
}

export function Topbar({
  moduleCount,
  lessonCount,
  bookmarkCount,
  progressPct,
  theme,
  category,
  difficulty,
  bookmarksOnly,
  sidebarExpanded,
  searchRecords,
  onToggleSidebar,
  onCategoryChange,
  onDifficultyChange,
  onToggleBookmarksFilter,
  onOpenGlossary,
  onOpenProgress,
  onToggleTheme,
  onSelectSearchResult
}: TopbarProps) {
  return (
    <header className="topbar" role="banner">
      <div className="topbar-left">
        <Button
          variant="icon"
          id="sidebar-toggle"
          aria-label="Toggle navigation sidebar"
          aria-expanded={sidebarExpanded}
          aria-controls="sidebar"
          onClick={onToggleSidebar}
        >
          <span aria-hidden="true">&#9776;</span>
        </Button>
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            &lt;/&gt;
          </span>
          <div className="brand-text">
            <span className="brand-title">Software Engineering Mastery</span>
            <span className="brand-sub" id="build-meta">
              {moduleCount} {moduleCount === 1 ? "module" : "modules"} &middot; {lessonCount}{" "}
              {lessonCount === 1 ? "lesson" : "lessons"}
            </span>
          </div>
        </div>
      </div>

      <SearchPopover records={searchRecords} onSelectResult={onSelectSearchResult} />

      <div className="topbar-actions">
        <select
          id="category-filter"
          className="toolbar-select"
          aria-label="Filter by category"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          {CATEGORY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <select
          id="difficulty-filter"
          className="toolbar-select"
          aria-label="Filter interview questions by difficulty"
          value={difficulty}
          onChange={(e) => onDifficultyChange(e.target.value)}
        >
          <option value="all">All Difficulties</option>
          <option value="basic">Basic</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
          <option value="senior-architect">Senior / Architect</option>
          <option value="senior">Senior (Mod 26)</option>
          <option value="architect">Architect (Mod 26)</option>
        </select>

        <Button
          variant="pill"
          id="bookmarks-filter-btn"
          aria-pressed={bookmarksOnly}
          title="Show bookmarked lessons only"
          onClick={onToggleBookmarksFilter}
        >
          <span aria-hidden="true">&#9733;</span> <span className="btn-label">Bookmarks</span>{" "}
          <span id="bookmark-count" className="count-badge">
            {bookmarkCount}
          </span>
        </Button>

        <Button variant="pill" id="glossary-btn" title="Open glossary" onClick={onOpenGlossary}>
          <span aria-hidden="true">&#128214;</span> <span className="btn-label">Glossary</span>
        </Button>

        <Button
          variant="pill"
          id="progress-modal-btn"
          title="View progress and backup"
          onClick={onOpenProgress}
        >
          <span id="topbar-progress-pct">{progressPct}%</span>
        </Button>

        <Button
          variant="icon"
          id="theme-toggle"
          aria-label="Toggle dark or light theme"
          title="Toggle theme"
          onClick={onToggleTheme}
        >
          <span id="theme-icon" aria-hidden="true">
            {theme === "dark" ? "\u2604" : "\u263E"}
          </span>
        </Button>
      </div>
    </header>
  );
}
