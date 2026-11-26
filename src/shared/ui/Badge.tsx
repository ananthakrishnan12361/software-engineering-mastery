import type { ReactNode } from "react";

export type BadgeVariant =
  | "accent"
  | "neutral"
  | "basic"
  | "intermediate"
  | "advanced"
  | "senior-architect"
  | "senior"
  | "architect";

export interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: ReactNode;
}

export function Badge({ variant = "neutral", className = "", children }: BadgeProps) {
  return <span className={`badge badge-${variant} ${className}`.trim()}>{children}</span>;
}
