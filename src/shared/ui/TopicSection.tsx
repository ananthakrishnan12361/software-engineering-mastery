import type { ReactNode } from "react";

export interface TopicSectionProps {
  id: string;
  letter: string;
  title: string;
  collapsed?: boolean;
  onToggle?: (id: string) => void;
  children: ReactNode;
}

export function TopicSection({
  id,
  letter,
  title,
  collapsed = false,
  onToggle,
  children
}: TopicSectionProps) {
  return (
    <section
      className="topic-section"
      id={id}
      data-section={letter}
      data-collapsed={collapsed ? "true" : "false"}
    >
      <button
        type="button"
        className="topic-section-header"
        aria-expanded={!collapsed}
        onClick={() => onToggle?.(id)}
      >
        <span className="topic-section-title">
          <span className="section-letter">{letter}</span>
          <span className="topic-section-title-text">{title}</span>
        </span>
        <span className="topic-chevron" aria-hidden="true">
          &#9662;
        </span>
      </button>
      {!collapsed ? <div className="topic-section-body">{children}</div> : null}
    </section>
  );
}
