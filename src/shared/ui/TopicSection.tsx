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
  function handleToggle() {
    // Preserve scroll position so toggling an accordion never jumps to top
    const scrollY = window.scrollY;
    onToggle?.(id);
    // Restore after the React re-render flush
    requestAnimationFrame(() => {
      window.scrollTo({ top: scrollY, behavior: "instant" });
    });
  }

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
        onClick={handleToggle}
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
