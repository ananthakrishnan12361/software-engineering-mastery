import { CATEGORY_OPTIONS, DIFFICULTY_LABELS, type DifficultyLevel } from "@/shared/config";
import type { SearchRecord, SearchRecordType } from "./types";

const VALID_CATEGORIES = new Set<string>(CATEGORY_OPTIONS.map((c) => c.value));
const VALID_DIFFICULTIES = new Set<string>(["all", ...Object.keys(DIFFICULTY_LABELS)]);

export function sanitizeCategoryParam(val: string | undefined): string {
  return val && VALID_CATEGORIES.has(val) ? val : "all";
}

export function sanitizeDifficultyParam(val: string | undefined): string {
  return val && VALID_DIFFICULTIES.has(val) ? val : "all";
}

export function sanitizeAvailabilityParam(val: string | undefined): "all" | "available" | "unwritten" {
  return val === "available" || val === "unwritten" ? val : "all";
}

export function sanitizeCompletionParam(val: string | undefined): "all" | "completed" | "incomplete" {
  return val === "completed" || val === "incomplete" ? val : "all";
}

export function sanitizeBookmarkedParam(val: string | undefined): "all" | "bookmarked" {
  return val === "bookmarked" ? "bookmarked" : "all";
}

export function sanitizeModuleParam(val: string | undefined): string {
  if (!val || val === "all") return "all";
  const num = Number(val);
  return Number.isInteger(num) && num >= 1 && num <= 28 ? String(num) : "all";
}

/**
 * Matches interview question difficulty against selected filter:
 * - basic / intermediate / advanced: exact match
 * - senior-architect: matches senior-architect, senior, and architect
 * - senior: matches senior and senior-architect
 * - architect: matches architect and senior-architect
 */
export function matchesDifficultyFilter(questionDiff: DifficultyLevel, filterDiff: string): boolean {
  if (filterDiff === "all") return true;
  if (filterDiff === "senior-architect") {
    return (
      questionDiff === "senior-architect" ||
      questionDiff === "senior" ||
      questionDiff === "architect"
    );
  }
  if (filterDiff === "senior") {
    return questionDiff === "senior" || questionDiff === "senior-architect";
  }
  if (filterDiff === "architect") {
    return questionDiff === "architect" || questionDiff === "senior-architect";
  }
  return questionDiff === filterDiff;
}

export interface SearchMatch {
  record: SearchRecord;
  score: number;
  matchIndex: number;
}

export const SEARCH_GROUP_ORDER: SearchRecordType[] = [
  "Lesson",
  "Section",
  "Syllabus Topic",
  "Interview Q&A",
  "Code",
  "Glossary"
];

export function searchHandbookRecords(
  records: SearchRecord[],
  query: string,
  limit = 40
): SearchMatch[] {
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];

  const lower = trimmed.toLowerCase();
  const matches: SearchMatch[] = [];

  for (const record of records) {
    const titleHit = record.title.toLowerCase().indexOf(lower);
    const textHit = record.text.toLowerCase().indexOf(lower);
    if (titleHit !== -1 || textHit !== -1) {
      let score = titleHit !== -1 ? 3 : 1;
      if (record.available) score += 0.5;
      matches.push({
        record,
        score,
        matchIndex: textHit >= 0 ? textHit : 0
      });
    }
  }

  matches.sort((a, b) => b.score - a.score);
  return matches.slice(0, limit);
}
