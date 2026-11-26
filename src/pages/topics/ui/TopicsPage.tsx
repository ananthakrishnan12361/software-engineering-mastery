import { useMemo, useState } from "react";
import {
  sanitizeAvailabilityParam,
  sanitizeBookmarkedParam,
  sanitizeCategoryParam,
  sanitizeCompletionParam,
  type SyllabusModule,
  type SyllabusTopic
} from "@/entities/handbook";
import { CATEGORY_OPTIONS } from "@/shared/config";
import { buildPageHash } from "@/shared/lib";
import { Badge, Button } from "@/shared/ui";

export interface TopicsPageProps {
  syllabusModules: SyllabusModule[];
  completedLessons: Record<string, number>;
  bookmarks: Record<string, number>;
  routeParams: Record<string, string>;
  onUpdateParams: (params: Record<string, string>) => void;
  onOpenTopic: (lessonId: string, anchorId?: string) => void;
}

export function TopicsPage({
  syllabusModules,
  completedLessons,
  bookmarks,
  routeParams,
  onUpdateParams,
  onOpenTopic
}: TopicsPageProps) {
  const category = sanitizeCategoryParam(routeParams.category);
  const availability = sanitizeAvailabilityParam(routeParams.availability);
  const completed = sanitizeCompletionParam(routeParams.completed);
  const bookmarked = sanitizeBookmarkedParam(routeParams.bookmarked);

  const [collapsedModules, setCollapsedModules] = useState<Record<number, boolean>>({});

  function isTopicCompleted(topic: SyllabusTopic): boolean {
    return topic.status === "available" && Boolean(topic.lessonId && completedLessons[topic.lessonId]);
  }

  function isTopicBookmarked(topic: SyllabusTopic): boolean {
    return topic.status === "available" && Boolean(topic.lessonId && bookmarks[topic.lessonId]);
  }

  const filteredModules = useMemo(() => {
    return syllabusModules
      .filter((mod) => category === "all" || mod.category === category)
      .map((mod) => {
        const topics = mod.topics.filter((topic) => {
          if (availability !== "all" && topic.status !== availability) return false;
          const done = isTopicCompleted(topic);
          if (completed === "completed" && !done) return false;
          if (completed === "incomplete" && done) return false;
          const saved = isTopicBookmarked(topic);
          if (bookmarked === "bookmarked" && !saved) return false;
          return true;
        });
        return { mod, topics };
      })
      .filter((entry) => entry.topics.length > 0);
  }, [syllabusModules, category, availability, completed, bookmarked, completedLessons, bookmarks]);

  const totalTopicsCount = useMemo(
    () => syllabusModules.reduce((acc, m) => acc + m.topics.length, 0),
    [syllabusModules]
  );

  const matchedTopicsCount = useMemo(
    () => filteredModules.reduce((acc, entry) => acc + entry.topics.length, 0),
    [filteredModules]
  );

  const activeFilters: Array<{ key: string; label: string }> = [];
  if (category !== "all") {
    const label = CATEGORY_OPTIONS.find((c) => c.value === category)?.label ?? category;
    activeFilters.push({ key: "category", label: `Category: ${label}` });
  }
  if (availability !== "all") {
    activeFilters.push({
      key: "availability",
      label: availability === "available" ? "Status: Available only" : "Status: Not written yet"
    });
  }
  if (completed !== "all") {
    activeFilters.push({
      key: "completed",
      label: completed === "completed" ? "Progress: Lesson completed" : "Progress: Not completed"
    });
  }
  if (bookmarked === "bookmarked") {
    activeFilters.push({ key: "bookmarked", label: "Lesson bookmarked only" });
  }

  function setFilter(key: string, value: string) {
    onUpdateParams({
      category,
      availability,
      completed,
      bookmarked,
      [key]: value
    });
  }

  function clearAll() {
    onUpdateParams({});
  }

  return (
    <main id="main-content" className="main-content" tabIndex={-1}>
      <header className="page-header">
        <h1>All Topics (28 Modules)</h1>
        <p className="page-lead">
          Complete curriculum roadmap. Topics inherit Completed and Bookmarked status from their parent
          lesson; unwritten topics cannot be marked complete or bookmarked.
        </p>
      </header>

      <section className="filter-panel" aria-label="Topic filters">
        <div className="filter-controls-row">
          <div className="filter-field">
            <label htmlFor="topics-category-filter">Category</label>
            <select
              id="topics-category-filter"
              className="toolbar-select"
              value={category}
              onChange={(e) => setFilter("category", e.target.value)}
            >
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-field">
            <label htmlFor="topics-availability-filter">Availability</label>
            <select
              id="topics-availability-filter"
              className="toolbar-select"
              value={availability}
              onChange={(e) => setFilter("availability", e.target.value)}
            >
              <option value="all">All topics</option>
              <option value="available">Available only</option>
              <option value="unwritten">Not written yet</option>
            </select>
          </div>

          <div className="filter-field">
            <label htmlFor="topics-completed-filter">Lesson Progress</label>
            <select
              id="topics-completed-filter"
              className="toolbar-select"
              value={completed}
              onChange={(e) => setFilter("completed", e.target.value)}
            >
              <option value="all">All progress states</option>
              <option value="completed">Lesson completed</option>
              <option value="incomplete">Not completed</option>
            </select>
          </div>

          <div className="filter-field">
            <label htmlFor="topics-bookmarked-filter">Bookmarks</label>
            <select
              id="topics-bookmarked-filter"
              className="toolbar-select"
              value={bookmarked}
              onChange={(e) => setFilter("bookmarked", e.target.value)}
            >
              <option value="all">All topics</option>
              <option value="bookmarked">Lesson bookmarked</option>
            </select>
          </div>
        </div>

        <div className="filter-summary-row">
          <span id="topics-result-count">
            Showing <strong>{matchedTopicsCount}</strong> of {totalTopicsCount} topics across{" "}
            <strong>{filteredModules.length}</strong> modules
          </span>
          {activeFilters.length > 0 ? (
            <Button variant="small" id="topics-clear-all" onClick={clearAll}>
              Clear All
            </Button>
          ) : null}
        </div>

        {activeFilters.length > 0 ? (
          <div className="filter-chips" aria-label="Active filters">
            {activeFilters.map((f) => (
              <Badge key={f.key} variant="accent">
                {f.label}
              </Badge>
            ))}
          </div>
        ) : null}
      </section>

      {filteredModules.length === 0 ? (
        <div className="empty-state" id="topics-empty-state">
          <h2>No matching topics</h2>
          <p>No syllabus topics match the selected filter combination.</p>
          <Button variant="primary" onClick={clearAll}>
            Clear All Filters
          </Button>
        </div>
      ) : (
        filteredModules.map(({ mod, topics }) => {
          const isOpen = !collapsedModules[mod.number];
          const availableCount = topics.filter((t) => t.status === "available").length;
          return (
            <section className="syllabus-module" key={mod.number} id={`syllabus-mod-${mod.number}`}>
              <button
                type="button"
                className="syllabus-module-btn"
                aria-expanded={isOpen}
                onClick={() =>
                  setCollapsedModules((prev) => ({ ...prev, [mod.number]: isOpen }))
                }
              >
                <span className="syllabus-module-title">
                  Module {String(mod.number).padStart(2, "0")}: {mod.title}
                </span>
                <span className="lesson-action-strip">
                  <Badge variant={availableCount > 0 ? "basic" : "unwritten"}>
                    {availableCount > 0
                      ? `${availableCount} available / ${topics.length} shown`
                      : `${topics.length} not written yet`}
                  </Badge>
                  <span aria-hidden="true">{isOpen ? "\u25BE" : "\u25B8"}</span>
                </span>
              </button>

              {isOpen ? (
                <>
                  {mod.notes ? <p className="muted-note">{mod.notes}</p> : null}
                  <ul className="syllabus-topic-list">
                    {topics.map((topic) => {
                      const done = isTopicCompleted(topic);
                      const saved = isTopicBookmarked(topic);
                      return (
                        <li className="syllabus-topic-row" key={topic.id}>
                          <div>
                            {topic.group ? (
                              <span className="muted-note">{topic.group} &rsaquo; </span>
                            ) : null}
                            {topic.status === "available" && topic.lessonId ? (
                              <a
                                className="syllabus-topic-link"
                                href={buildPageHash("lesson", {
                                  lessonId: topic.lessonId,
                                  sectionId: topic.anchorId
                                })}
                                onClick={(e) => {
                                  e.preventDefault();
                                  onOpenTopic(topic.lessonId!, topic.anchorId);
                                }}
                              >
                                {topic.title}
                              </a>
                            ) : (
                              <span>{topic.title}</span>
                            )}
                          </div>

                          <div className="lesson-action-strip">
                            {topic.status === "available" ? (
                              <Badge variant="basic">Available</Badge>
                            ) : (
                              <Badge variant="unwritten">Not written yet</Badge>
                            )}
                            {done ? (
                              <Badge
                                variant="accent"
                                className="inherited-badge"
                              >
                                Lesson completed
                              </Badge>
                            ) : null}
                            {saved ? (
                              <Badge variant="intermediate">Lesson bookmarked</Badge>
                            ) : null}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </>
              ) : null}
            </section>
          );
        })
      )}
    </main>
  );
}
