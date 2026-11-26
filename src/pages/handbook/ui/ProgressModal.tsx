import { useRef, useState } from "react";
import type { HandbookProgressState } from "@/entities/progress";
import { Button, ComparisonTable, Modal } from "@/shared/ui";

export interface ProgressModalProps {
  open: boolean;
  totalLessons: number;
  state: HandbookProgressState;
  onClose: () => void;
  onImportJson: (jsonText: string) => void;
  onReset: () => void;
}

export function ProgressModal({
  open,
  totalLessons,
  state,
  onClose,
  onImportJson,
  onReset
}: ProgressModalProps) {
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const doneCount = Object.keys(state.completedLessons).length;
  const bookmarkCount = Object.keys(state.bookmarks).length;
  const masteryCount = Object.keys(state.masteryChecks).length;
  const pct = totalLessons > 0 ? Math.round((doneCount / totalLessons) * 100) : 0;

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
        setStatusMsg("Progress imported successfully.");
      } catch {
        setStatusMsg("Invalid JSON progress file.");
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <Modal id="progress-modal" title="Study Progress & Data Backup" open={open} onClose={onClose}>
      <div id="progress-summary-details" className="progress-summary-details">
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
                  {doneCount} / {totalLessons} ({pct}%)
                </td>
              </tr>
              <tr>
                <td>Bookmarked Lessons</td>
                <td>{bookmarkCount}</td>
              </tr>
              <tr>
                <td>Mastery Checks Completed</td>
                <td>{masteryCount}</td>
              </tr>
            </tbody>
          </table>
        </ComparisonTable>
      </div>

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

      <p className="muted-note">
        Progress, bookmarks, theme preference, and mastery checks are saved locally in your browser via{" "}
        <code>localStorage</code> (key <code>sem_handbook_v1</code>).
      </p>
    </Modal>
  );
}
