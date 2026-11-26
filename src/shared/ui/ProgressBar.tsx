export interface ProgressBarProps {
  percent: number;
  label?: string;
}

export function ProgressBar({ percent, label = "Progress" }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(percent)));
  return (
    <div
      className="progress-track"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
    >
      <div className="progress-fill" style={{ width: `${clamped}%` }} />
    </div>
  );
}
