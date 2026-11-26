import { useRef, useState } from "react";
import type { LessonRecord } from "@/entities/handbook";
import type { HandbookProgressState } from "@/entities/progress";
import { buildPageHash } from "@/shared/lib";
import { Button, ComparisonTable, ProgressBar } from "@/shared/ui";

export interface ProgressPageProps {
  lessons: LessonRecord[];
  state: HandbookProgressState;
  onOpenLesson: (lessonId: string) => void;
  onImportJson: (jsonText: string) => void;
  onReset: () => void;
}

export function ProgressPage({
  lessons,
  state,
  onOpenLesson,
  onImportJson,
  onReset
}: ProgressPageProps) {
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const doneCount = lessons.filter((l) => Boolean(state.completedLessons[l.id])).length;
  const bookmarkCount = lessons.filter((l) => Boolean(state.bookmarks[l.id])).length;
  const totalMastery = lessons.reduce((acc, l) => acc + l.masteryItems.length, 0);
  const doneMastery = lessons.reduce(
    (acc, l) => acc + l.masteryItems.filter((m) => Boolean(state.masteryChecks[m.id])).length,
    0
  );
  const pct = lessons.length > 0 ? Math.round((doneCount / lessons.length) * 100) : 0;

  function handleExport() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "software-engineering-mastery-progress.json";
    a.click();
    URL.revokeObjectURL(url);
    setStatusMsg("Progress exported as JSON.");
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        onImportJson(String(reader.result));
        setStatusMsg("Progress imported successfully (sem_handbook_v1 compatible).");
      } catch {
        setStatusMsg("Invalid JSON progress file.");
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <main id="main-content" className="main-content" tabIndex={-1}>
      <header className="page-header">
        <h1>Progress &amp; Backup</h1>
        <p className="page-lead">
          All completions, bookmarks, collapsed sections, theme, font size, and mastery checks are saved
          locally under <code>sem_handbook_v1</code>.
        </p>
      </header>

      <div style={{ marginBottom: "18px" }}>
        <div className="progress-row">
          <span>Overall Written Lessons</span>
          <strong>
            {doneCount} / {lessons.length} ({pct}%)
          </strong>
        </div>
        <ProgressBar percent={pct} label="Overall written lesson completion" />
      </div>

      <ComparisonTable>
        <table>
          <thead>
            <tr>
              <th>Metric</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lessons Completed</td>
              <td>
                {doneCount} / {lessons.length} ({pct}%)
              </td>
            </tr>
            <tr>
              <td>Mastery Checklist Items</td>
              <td>
                {doneMastery} / {totalMastery}
              </td>
            </tr>
            <tr>
              <td>Bookmarked Lessons</td>
              <td>{bookmarkCount}</td>
            </tr>
            <tr>
              <td>Saved Collapsed Sections</td>
              <td>{Object.keys(state.collapsedSections).length}</td>
            </tr>
          </tbody>
        </table>
      </ComparisonTable>

      <div className="backup-actions">
        <Button variant="primary" id="export-progress-btn" onClick={handleExport}>
          Export Progress (JSON)
        </Button>
        <label className="btn-secondary file-import-label">
          Import Progress (JSON)
          <input
            ref={fileInputRef}
            type="file"
            id="import-progress-input"
            accept="application/json,.json"
            hidden
            onChange={handleFileChange}
          />
        </label>
        <Button
          variant="danger"
          id="reset-progress-btn"
          onClick={() => {
            if (window.confirm("Reset all lesson completions, bookmarks, and mastery checks?")) {
              onReset();
              setStatusMsg("Progress reset.");
            }
          }}
        >
          Reset All Progress
        </Button>
      </div>

      {statusMsg ? <p className="muted-note">{statusMsg}</p> : null}

      <h2 style={{ marginTop: "24px" }}>Written Lessons</h2>
      <ComparisonTable>
        <table>
          <thead>
            <tr>
              <th>Lesson</th>
              <th>Status</th>
              <th>Mastery</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((l) => {
              const mDone = l.masteryItems.filter((m) => Boolean(state.masteryChecks[m.id])).length;
              return (
                <tr key={l.id}>
                  <td>
                    <a
                      className="syllabus-topic-link"
                      href={buildPageHash("lesson", { lessonId: l.id })}
                      onClick={(e) => {
                        e.preventDefault();
                        onOpenLesson(l.id);
                      }}
                    >
                      M{String(l.moduleNumber).padStart(2, "0")}: {l.title}
                    </a>
                  </td>
                  <td>{state.completedLessons[l.id] ? "Completed" : "In progress / Not started"}</td>
                  <td>
                    {mDone} / {l.masteryItems.length}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </ComparisonTable>
    </main>
  );
}
