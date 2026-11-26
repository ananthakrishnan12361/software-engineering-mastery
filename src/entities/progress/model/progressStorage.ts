import type { ThemeMode } from "@/shared/config";
import { readStorageJson, writeStorageJson, removeStorageKey } from "@/shared/lib";

export const STORAGE_KEY = "sem_handbook_v1";

export interface HandbookFilters {
  category: string;
  difficulty: string;
  bookmarksOnly: boolean;
}

export interface HandbookProgressState {
  theme: ThemeMode | null;
  completedLessons: Record<string, number>;
  bookmarks: Record<string, number>;
  masteryChecks: Record<string, boolean>;
  collapsedSections: Record<string, boolean>;
  filters: HandbookFilters;
}

export function createDefaultProgressState(): HandbookProgressState {
  return {
    theme: null,
    completedLessons: {},
    bookmarks: {},
    masteryChecks: {},
    collapsedSections: {},
    filters: {
      category: "all",
      difficulty: "all",
      bookmarksOnly: false
    }
  };
}

function isPlainRecord(val: unknown): val is Record<string, unknown> {
  return typeof val === "object" && val !== null && !Array.isArray(val);
}

export function normalizeProgressState(raw: unknown): HandbookProgressState {
  const defaults = createDefaultProgressState();
  if (!isPlainRecord(raw)) return defaults;

  const theme = raw.theme === "dark" || raw.theme === "light" ? raw.theme : null;

  const completedLessons: Record<string, number> = {};
  if (isPlainRecord(raw.completedLessons)) {
    for (const [k, v] of Object.entries(raw.completedLessons)) {
      if (typeof v === "number" && Number.isFinite(v)) completedLessons[k] = v;
    }
  }

  const bookmarks: Record<string, number> = {};
  if (isPlainRecord(raw.bookmarks)) {
    for (const [k, v] of Object.entries(raw.bookmarks)) {
      if (typeof v === "number" && Number.isFinite(v)) bookmarks[k] = v;
    }
  }

  const masteryChecks: Record<string, boolean> = {};
  if (isPlainRecord(raw.masteryChecks)) {
    for (const [k, v] of Object.entries(raw.masteryChecks)) {
      if (typeof v === "boolean") masteryChecks[k] = v;
    }
  }

  const collapsedSections: Record<string, boolean> = {};
  if (isPlainRecord(raw.collapsedSections)) {
    for (const [k, v] of Object.entries(raw.collapsedSections)) {
      if (typeof v === "boolean" && v) collapsedSections[k] = true;
    }
  }

  const rawFilters = isPlainRecord(raw.filters) ? raw.filters : {};
  const filters: HandbookFilters = {
    category: typeof rawFilters.category === "string" ? rawFilters.category : "all",
    difficulty: typeof rawFilters.difficulty === "string" ? rawFilters.difficulty : "all",
    bookmarksOnly: Boolean(rawFilters.bookmarksOnly)
  };

  return {
    theme,
    completedLessons,
    bookmarks,
    masteryChecks,
    collapsedSections,
    filters
  };
}

export function loadProgressState(): HandbookProgressState {
  const raw = readStorageJson<unknown>(STORAGE_KEY, null);
  return normalizeProgressState(raw);
}

export function saveProgressState(state: HandbookProgressState): void {
  writeStorageJson(STORAGE_KEY, state);
}

export function clearProgressState(): void {
  removeStorageKey(STORAGE_KEY);
}

export function parseImportedProgressJson(jsonText: string): HandbookProgressState {
  const parsed = JSON.parse(jsonText) as unknown;
  if (!isPlainRecord(parsed)) {
    throw new Error("Invalid progress JSON structure.");
  }
  return normalizeProgressState(parsed);
}
