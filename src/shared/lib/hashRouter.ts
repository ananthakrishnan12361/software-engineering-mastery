import { useEffect, useState } from "react";

export interface HashRoute {
  lessonId: string | null;
  sectionId: string | null;
}

export function parseHashRoute(hash: string): HashRoute {
  const cleaned = hash.replace(/^#/, "");
  if (!cleaned) return { lessonId: null, sectionId: null };

  // Support #/lesson/<lessonId>?section=<sectionId>
  if (cleaned.startsWith("/lesson/")) {
    const [pathPart, queryPart] = cleaned.split("?");
    const lessonId = decodeURIComponent(pathPart.slice("/lesson/".length).split("/")[0] || "").trim() || null;
    const params = new URLSearchParams(queryPart || "");
    const sectionId = params.get("section")?.trim() || null;
    return { lessonId, sectionId };
  }

  // Fallback for legacy anchor links like #m01-p1-sec-c or #m01-p1
  const matchLesson = cleaned.match(/^(m\d+-p\d+)/i);
  if (matchLesson) {
    return {
      lessonId: matchLesson[1].toLowerCase(),
      sectionId: cleaned.toLowerCase() === matchLesson[1].toLowerCase() ? null : cleaned
    };
  }

  return { lessonId: null, sectionId: cleaned };
}

export function buildHashHref(lessonId: string, sectionId?: string | null): string {
  const base = `#/lesson/${encodeURIComponent(lessonId)}`;
  if (sectionId) {
    return `${base}?section=${encodeURIComponent(sectionId)}`;
  }
  return base;
}

export function navigateToHash(lessonId: string, sectionId?: string | null): void {
  const next = buildHashHref(lessonId, sectionId);
  if (window.location.hash !== next) {
    window.location.hash = next;
  } else if (sectionId) {
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }
}

export function useHashRoute(): HashRoute {
  const [route, setRoute] = useState<HashRoute>(() => parseHashRoute(window.location.hash));

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseHashRoute(window.location.hash));
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return route;
}
