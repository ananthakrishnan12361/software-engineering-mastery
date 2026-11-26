import type { ReactNode } from "react";

export interface DiagramCardProps {
  caption: string;
  children: ReactNode;
}

export function DiagramCard({ caption, children }: DiagramCardProps) {
  return (
    <figure className="diagram-card">
      {children}
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
