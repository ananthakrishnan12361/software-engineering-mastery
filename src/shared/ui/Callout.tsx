import type { ReactNode } from "react";

export interface CalloutProps {
  variant?: "info" | "tip" | "warn" | "danger";
  title?: string;
  children: ReactNode;
}

export function Callout({ variant = "info", title, children }: CalloutProps) {
  return (
    <div className={`callout callout-${variant}`}>
      {title ? <div className="callout-title">{title}</div> : null}
      {children}
    </div>
  );
}
