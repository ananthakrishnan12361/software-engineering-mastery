import type { SearchRecord } from "./types";

export interface SearchMatch {
  record: SearchRecord;
  score: number;
  matchIndex: number;
}

export function searchRecords(records: SearchRecord[], query: string, limit = 25): SearchMatch[] {
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];

  const lower = trimmed.toLowerCase();
  const matches: SearchMatch[] = [];

  for (const record of records) {
    const titleHit = record.title.toLowerCase().indexOf(lower);
    const textHit = record.text.toLowerCase().indexOf(lower);
    if (titleHit !== -1 || textHit !== -1) {
      matches.push({
        record,
        score: titleHit !== -1 ? 2 : 1,
        matchIndex: textHit >= 0 ? textHit : 0
      });
    }
  }

  matches.sort((a, b) => b.score - a.score);
  return matches.slice(0, limit);
}
