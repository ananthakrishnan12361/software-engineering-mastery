import type { LessonRecord } from "@/entities/handbook";
import { buildPageHash } from "@/shared/lib";
import { Badge, Button } from "@/shared/ui";

export interface BookmarksPageProps {
  lessons: LessonRecord[];
  bookmarks: Record<string, number>;
  completedLessons: Record<string, number>;
  onOpenLesson: (lessonId: string) => void;
  onRemoveBookmark: (lessonId: string) => void;
  onBrowseTopics: () => void;
}

export function BookmarksPage({
  lessons,
  bookmarks,
  completedLessons,
  onOpenLesson,
  onRemoveBookmark,
  onBrowseTopics
}: BookmarksPageProps) {
  const bookmarkedLessons = lessons.filter((l) => Boolean(bookmarks[l.id]));

  return (
    <main id="main-content" className="main-content" tabIndex={-1}>
      <header className="page-header">
        <h1>Bookmarks</h1>
        <p className="page-lead">
          Saved lessons for quick revision. Unwritten topics cannot be bookmarked.
        </p>
      </header>

      {bookmarkedLessons.length === 0 ? (
        <div className="empty-state">
          <h2>No bookmarked lessons yet</h2>
          <p>Open any lesson and click Bookmark to save it here for quick review.</p>
          <Button variant="primary" onClick={onBrowseTopics}>
            Browse All Topics
          </Button>
        </div>
      ) : (
        bookmarkedLessons.map((lesson) => (
          <div className="syllabus-topic-row" key={lesson.id} style={{ borderBottom: "1px solid var(--border)", padding: "12px 4px" }}>
            <div>
              <div className="muted-note">
                Module {String(lesson.moduleNumber).padStart(2, "0")} &middot; {lesson.duration}
              </div>
              <a
                className="syllabus-topic-link"
                href={buildPageHash("lesson", { lessonId: lesson.id })}
                onClick={(e) => {
                  e.preventDefault();
                  onOpenLesson(lesson.id);
                }}
              >
                {lesson.title}
              </a>
            </div>
            <div className="lesson-action-strip">
              {completedLessons[lesson.id] ? <Badge variant="basic">Completed</Badge> : null}
              <Button variant="small" onClick={() => onRemoveBookmark(lesson.id)}>
                Remove Bookmark
              </Button>
            </div>
          </div>
        ))
      )}
    </main>
  );
}
