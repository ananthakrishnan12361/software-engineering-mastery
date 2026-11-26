import { useEffect, useState } from "react";
import { buildHashHref } from "@/shared/lib";
import type { TocSectionMeta } from "../model/types";

export interface RightTocProps {
  lessonId: string;
  sections: TocSectionMeta[];
  onJumpSection: (lessonId: string, sectionId: string) => void;
}

export function RightToc({ lessonId, sections, onJumpSection }: RightTocProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    setActiveId(sections[0]?.id ?? "");
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target.id) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));

    for (const el of els) observer.observe(el);
    return () => observer.disconnect();
  }, [lessonId, sections]);

  return (
    <aside id="toc-aside" className="toc-aside" aria-label="On this page">
      <div className="toc-sticky">
        <div className="toc-header">On This Page</div>
        <nav id="toc-nav" className="toc-nav">
          {sections.map((sec) => {
            const label = sec.letter ? `${sec.letter}. ${sec.title}` : sec.title;
            return (
              <a
                key={sec.id}
                href={buildHashHref(lessonId, sec.id)}
                className={`toc-link ${activeId === sec.id ? "active" : ""}`.trim()}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveId(sec.id);
                  onJumpSection(lessonId, sec.id);
                }}
              >
                {label}
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
