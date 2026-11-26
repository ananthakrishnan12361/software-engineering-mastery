import { useEffect, useState } from "react";
import type { PageId } from "@/shared/config";

export interface AppRoute {
  page: PageId;
  lessonId: string | null;
  sectionId: string | null;
  params: Record<string, string>;
}

const VALID_PAGES = new Set<PageId>([
  "home",
  "topics",
  "lesson",
  "interviews",
  "glossary",
  "bookmarks",
  "progress"
]);

export function parseHashRoute(hash: string): AppRoute {
  const cleaned = hash.replace(/^#/, "");
  if (!cleaned || cleaned === "/" || cleaned === "/home") {
    return { page: "home", lessonId: null, sectionId: null, params: {} };
  }

  const [rawPath, rawQuery] = cleaned.split("?");
  const searchParams = new URLSearchParams(rawQuery || "");
  const params: Record<string, string> = {};
  for (const [k, v] of searchParams.entries()) {
    params[k] = v;
  }

  // Legacy lesson anchor fallback (#m01-p1 or #m01-p1-sec-c)
  if (!rawPath.startsWith("/")) {
    const matchLesson = rawPath.match(/^(m\d+-p\d+)/i);
    if (matchLesson) {
      const lessonId = matchLesson[1].toLowerCase();
      const sectionId = rawPath.toLowerCase() === lessonId ? null : rawPath;
      return { page: "lesson", lessonId, sectionId, params };
    }
    return { page: "home", lessonId: null, sectionId: null, params };
  }

  const parts = rawPath.split("/").filter(Boolean);
  const head = (parts[0] || "home") as PageId;

  if (head === "lesson") {
    const lessonId = parts[1] ? decodeURIComponent(parts[1]) : null;
    const sectionId = params.section?.trim() || null;
    return { page: "lesson", lessonId, sectionId, params };
  }

  if (VALID_PAGES.has(head)) {
    return { page: head, lessonId: null, sectionId: null, params };
  }

  return { page: "home", lessonId: null, sectionId: null, params };
}

export function buildPageHash(
  page: PageId,
  options?: { lessonId?: string | null; sectionId?: string | null; params?: Record<string, string> }
): string {
  const basePath =
    page === "lesson" && options?.lessonId
      ? `/lesson/${encodeURIComponent(options.lessonId)}`
      : `/${page}`;

  const sp = new URLSearchParams();
  if (options?.sectionId) {
    sp.set("section", options.sectionId);
  }
  if (options?.params) {
    for (const [k, v] of Object.entries(options.params)) {
      if (v && v !== "all") sp.set(k, v);
    }
  }
  const qs = sp.toString();
  return `#${basePath}${qs ? `?${qs}` : ""}`;
}

export function navigateHash(
  page: PageId,
  options?: { lessonId?: string | null; sectionId?: string | null; params?: Record<string, string> }
): void {
  const next = buildPageHash(page, options);
  if (window.location.hash !== next) {
    window.location.hash = next;
  } else {
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }
}

export function useAppRoute(): AppRoute {
  const [route, setRoute] = useState<AppRoute>(() => parseHashRoute(window.location.hash));

  useEffect(() => {
    const onHashChange = () => setRoute(parseHashRoute(window.location.hash));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return route;
}
