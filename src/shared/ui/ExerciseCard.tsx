import { useState, type ReactNode } from "react";
import { Button } from "./Button";

export interface ExerciseCardProps {
  title: string;
  prompt: ReactNode;
  buttonLabel?: string;
  hideLabel?: string;
  children: ReactNode;
}

export function ExerciseCard({
  title,
  prompt,
  buttonLabel = "Reveal Solution",
  hideLabel = "Hide Solution",
  children
}: ExerciseCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="exercise-card">
      <h4>{title}</h4>
      {prompt}
      <Button
        variant="small"
        className="exercise-toggle-btn"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? hideLabel : buttonLabel}
      </Button>
      {open ? <div className="exercise-solution">{children}</div> : null}
    </div>
  );
}
