import type { LessonRecord, SyllabusModule } from "@/entities/handbook";
import type { PageId } from "@/shared/config";
import { buildPageHash } from "@/shared/lib";
import { Badge, ProgressBar } from "@/shared/ui";

export interface HomePageProps {
  lessons: LessonRecord[];
  syllabusModules: SyllabusModule[];
  totalQuestions: number;
  lastLessonId?: string;
  completedLessons: Record<string, number>;
  bookmarks: Record<string, number>;
  onNavigate: (page: PageId, lessonId?: string | null) => void;
}

export function HomePage({
  lessons,
  syllabusModules,
  totalQuestions,
  lastLessonId,
  completedLessons,
  bookmarks,
  onNavigate
}: HomePageProps) {
  const resumeLesson =
    (lastLessonId ? lessons.find((l) => l.id === lastLessonId) : undefined) ?? lessons[0];

  const completedCount = lessons.filter((l) => Boolean(completedLessons[l.id])).length;
  const bookmarkCount = lessons.filter((l) => Boolean(bookmarks[l.id])).length;
  const pct = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;

  const totalSyllabusTopics = syllabusModules.reduce((acc, m) => acc + m.topics.length, 0);
  const availableTopics = syllabusModules.reduce(
    (acc, m) => acc + m.topics.filter((t) => t.status === "available").length,
    0
  );

  return (
    <main id="main-content" className="main-content" tabIndex={-1}>
      <header className="page-header">
        <h1>Software Engineering Mastery</h1>
        <p className="page-lead">
          Focused offline handbook from programming fundamentals to distributed architecture and AI/RAG
          systems.
        </p>
      </header>

      {resumeLesson ? (
        <section className="home-continue" aria-label="Continue learning">
          <div>
            <div className="lesson-kicker-row">
              <span>
                {lastLessonId ? "Continue Learning" : "Start Here"} &middot; Module{" "}
                {String(resumeLesson.moduleNumber).padStart(2, "0")} &middot; {resumeLesson.duration}
              </span>
              {completedLessons[resumeLesson.id] ? <Badge variant="basic">Completed</Badge> : null}
            </div>
            <strong>{resumeLesson.title}</strong>
          </div>
          <a
            href={buildPageHash("lesson", { lessonId: resumeLesson.id })}
            className="btn-primary"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("lesson", resumeLesson.id);
            }}
          >
            {lastLessonId ? "Resume Lesson" : "Open Lesson"} &rarr;
          </a>
        </section>
      ) : null}

      <section className="home-stats-row" aria-label="Progress overview">
        <div className="home-stat">
          <div className="home-stat-value">
            {completedCount} / {lessons.length}
          </div>
          <div className="home-stat-label">Written lessons ({pct}%)</div>
          <ProgressBar percent={pct} label="Written lessons completed" />
        </div>
        <div className="home-stat">
          <div className="home-stat-value">
            {availableTopics} / {totalSyllabusTopics}
          </div>
          <div className="home-stat-label">Syllabus topics written</div>
        </div>
        <div className="home-stat">
          <div className="home-stat-value">{totalQuestions}</div>
          <div className="home-stat-label">Interview Q&amp;As</div>
        </div>
        <div className="home-stat">
          <div className="home-stat-value">{bookmarkCount}</div>
          <div className="home-stat-label">Bookmarked lessons</div>
        </div>
      </section>

      <nav className="home-nav-grid" aria-label="Quick links">
        <a
          href={buildPageHash("topics")}
          className="home-nav-item"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("topics");
          }}
        >
          <strong>All Topics (28 Modules)</strong>
          <span className="muted-note">Browse every syllabus topic and availability status.</span>
        </a>
        <a
          href={buildPageHash("interviews")}
          className="home-nav-item"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("interviews");
          }}
        >
          <strong>Interview Questions</strong>
          <span className="muted-note">Filter by difficulty and module with revealable answers.</span>
        </a>
        <a
          href={buildPageHash("glossary")}
          className="home-nav-item"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("glossary");
          }}
        >
          <strong>Glossary</strong>
          <span className="muted-note">Look up definitions and jump directly to lesson sections.</span>
        </a>
        <a
          href={buildPageHash("progress")}
          className="home-nav-item"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("progress");
          }}
        >
          <strong>Progress &amp; Backup</strong>
          <span className="muted-note">Inspect mastery checks and export or import JSON backups.</span>
        </a>
      </nav>
    </main>
  );
}
