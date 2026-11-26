import { useEffect, useState } from "react";
import type { TocSectionMeta } from "@/entities/handbook";
import { buildPageHash } from "@/shared/lib";
import { Button } from "@/shared/ui";

export interface RightTocProps {
  lessonId: string;
  sections: TocSectionMeta[];
  drawerOpen: boolean;
  onCloseDrawer: () => void;
  onJumpSection: (sectionId: string) => void;
}

export function RightToc({
  lessonId,
  sections,
  drawerOpen,
  onCloseDrawer,
  onJumpSection
}: RightTocProps) {
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
    <>
      {drawerOpen ? <div className="drawer-backdrop" onClick={onCloseDrawer} /> : null}
      <aside
        id="toc-aside"
        className={`toc-aside ${drawerOpen ? "open-drawer" : ""}`.trim()}
        aria-label="On this page"
      >
        <div className="toc-sticky">
          <div className="toc-header">
            <span>On This Page</span>
            {drawerOpen ? (
              <Button variant="icon" aria-label="Close table of contents" onClick={onCloseDrawer}>
                &times;
              </Button>
            ) : null}
          </div>
          <nav id="toc-nav" className="toc-nav">
            {sections.map((sec) => {
              const label = sec.letter ? `${sec.letter}. ${sec.title}` : sec.title;
              return (
                <a
                  key={sec.id}
                  href={buildPageHash("lesson", { lessonId, sectionId: sec.id })}
                  className={`toc-link ${activeId === sec.id ? "active" : ""}`.trim()}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveId(sec.id);
                    onCloseDrawer();
                    onJumpSection(sec.id);
                  }}
                >
                  {label}
                </a>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
