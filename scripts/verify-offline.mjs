import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { createServer } from "vite";

const ROOT = process.cwd();
const DIST_HTML = path.join(ROOT, "dist", "software_engineering_mastery.html");

assert(fs.existsSync(DIST_HTML), `Missing build output: ${DIST_HTML}`);
const html = fs.readFileSync(DIST_HTML, "utf8");
const sizeKb = (Buffer.byteLength(html, "utf8") / 1024).toFixed(1);

// 1. Offline / zero-CDN checks
assert(!/<link[^>]+rel=["']stylesheet["']/i.test(html), "External stylesheet link found in dist HTML");
assert(!/<script[^>]+src=["'][^"']+["']/i.test(html), "External script src found in dist HTML");
assert(!/@import\s+url\(/i.test(html), "External CSS @import found in dist HTML");

const urls = html.match(/https?:\/\/[^\s"'<>\\)`]+/gi) || [];
const unexpectedUrls = urls.filter(
  (u) =>
    !u.startsWith("http://www.w3.org/") &&
    !u.startsWith("https://www.w3.org/") &&
    !u.startsWith("https://react.dev/errors/")
);
assert.equal(unexpectedUrls.length, 0, `Unexpected external URLs: ${unexpectedUrls.join(", ")}`);

assert(html.includes("<style"), "Missing inlined <style> in dist HTML");
assert(html.includes("<script"), "Missing inlined <script> in dist HTML");
assert(html.includes("sem_handbook_v1"), "Missing localStorage key sem_handbook_v1 in dist bundle");

// 2. Test sem_handbook_v1 compatibility, hash router, difficulty rules, and filter sanitizers
const vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "silent"
});
try {
  const progressMod = await vite.ssrLoadModule("/src/entities/progress/index.ts");
  const handbookMod = await vite.ssrLoadModule("/src/entities/handbook/index.ts");
  const routerMod = await vite.ssrLoadModule("/src/shared/lib/hashRouter.ts");
  const catalogMod = await vite.ssrLoadModule("/content/registry.ts");

  assert.equal(progressMod.STORAGE_KEY, "sem_handbook_v1");

  // Import old v1 progress export (with theme, completedLessons, bookmarks, masteryChecks, collapsedSections, filters)
  const v1Export = JSON.stringify({
    theme: "light",
    completedLessons: { "m01-p1": 1732610000000 },
    bookmarks: { "m01-p1": 1732610005000 },
    masteryChecks: { "m01-p1-m1": true, "m01-p1-m4": true },
    collapsedSections: { "m01-p1-sec-b": true },
    filters: { category: "databases", difficulty: "advanced", bookmarksOnly: true }
  });

  const parsed = progressMod.parseImportedProgressJson(v1Export);
  assert.equal(parsed.theme, "light");
  assert.equal(parsed.fontSize, 16);
  assert.equal(parsed.completedLessons["m01-p1"], 1732610000000);
  assert.equal(parsed.bookmarks["m01-p1"], 1732610005000);
  assert.equal(parsed.masteryChecks["m01-p1-m1"], true);
  assert.equal(parsed.collapsedSections["m01-p1-sec-b"], true);

  // Sepia theme support
  const sepiaParsed = progressMod.parseImportedProgressJson(JSON.stringify({ theme: "sepia", fontSize: 20 }));
  assert.equal(sepiaParsed.theme, "sepia");
  assert.equal(sepiaParsed.fontSize, 20);

  // Invalid URL params fall back to "all"
  assert.equal(handbookMod.sanitizeCategoryParam("invalid_cat"), "all");
  assert.equal(handbookMod.sanitizeDifficultyParam("bogus"), "all");
  assert.equal(handbookMod.sanitizeAvailabilityParam("maybe"), "all");
  assert.equal(handbookMod.sanitizeCompletionParam("unknown"), "all");
  assert.equal(handbookMod.sanitizeBookmarkedParam("nope"), "all");
  assert.equal(handbookMod.sanitizeModuleParam("999"), "all");
  assert.equal(handbookMod.sanitizeModuleParam("15"), "15");

  // Senior/Architect, Senior, Architect matching rules
  assert.equal(handbookMod.matchesDifficultyFilter("senior-architect", "senior-architect"), true);
  assert.equal(handbookMod.matchesDifficultyFilter("senior", "senior-architect"), true);
  assert.equal(handbookMod.matchesDifficultyFilter("architect", "senior-architect"), true);
  assert.equal(handbookMod.matchesDifficultyFilter("senior", "senior"), true);
  assert.equal(handbookMod.matchesDifficultyFilter("senior-architect", "senior"), true);
  assert.equal(handbookMod.matchesDifficultyFilter("architect", "senior"), false);
  assert.equal(handbookMod.matchesDifficultyFilter("architect", "architect"), true);
  assert.equal(handbookMod.matchesDifficultyFilter("senior-architect", "architect"), true);
  assert.equal(handbookMod.matchesDifficultyFilter("senior", "architect"), false);
  assert.equal(handbookMod.matchesDifficultyFilter("basic", "basic"), true);
  assert.equal(handbookMod.matchesDifficultyFilter("basic", "intermediate"), false);

  // Hash routing + query params + section anchors inside hash
  const r1 = routerMod.parseHashRoute("#/topics?category=databases&availability=unwritten");
  assert.equal(r1.page, "topics");
  assert.equal(r1.params.category, "databases");
  assert.equal(r1.params.availability, "unwritten");

  const r2 = routerMod.parseHashRoute("#/lesson/m01-p1?section=m01-p1-topic-variables");
  assert.equal(r2.page, "lesson");
  assert.equal(r2.lessonId, "m01-p1");
  assert.equal(r2.sectionId, "m01-p1-topic-variables");

  const r3 = routerMod.parseHashRoute("#/lesson/m01-p2?section=m01-p2-topic-solid");
  assert.equal(r3.page, "lesson");
  assert.equal(r3.lessonId, "m01-p2");
  assert.equal(r3.sectionId, "m01-p2-topic-solid");

  const r4 = routerMod.parseHashRoute("#/lesson/m01-p3?section=m01-p3-topic-big-o");
  assert.equal(r4.page, "lesson");
  assert.equal(r4.lessonId, "m01-p3");
  assert.equal(r4.sectionId, "m01-p3-topic-big-o");

  // Search index generated from real content covers syllabus, lesson prose, code, IQs, glossary
  const records = catalogMod.handbookCatalog.searchRecords;
  assert(records.some((r) => r.type === "Syllabus Topic" && !r.available && r.title.includes("Kafka")));
  assert(records.some((r) => r.type === "Syllabus Topic" && r.available && r.sectionId === "m01-p1-topic-variables"));
  assert(records.some((r) => r.type === "Syllabus Topic" && r.available && r.sectionId === "m01-p2-topic-solid"));
  assert(records.some((r) => r.type === "Syllabus Topic" && r.available && r.sectionId === "m01-p3-topic-big-o"));
  assert(records.some((r) => r.type === "Code" && r.text.includes("calculateLineTotalCents")));
  assert(records.some((r) => r.type === "Code" && r.lessonId === "m01-p2" && r.text.includes("LedgerAccount")));
  assert(records.some((r) => r.type === "Code" && r.lessonId === "m01-p3" && r.text.includes("binarySearch")));
  assert(records.some((r) => r.type === "Interview Q&A" && r.text.includes("Snowflake")));
  assert(records.some((r) => r.type === "Interview Q&A" && r.lessonId === "m01-p2" && r.text.includes("Liskov")));
  assert(records.some((r) => r.type === "Interview Q&A" && r.lessonId === "m01-p3" && r.text.includes("Timsort")));
  assert(records.some((r) => r.type === "Glossary" && r.title === "TDZ"));
  assert(records.some((r) => r.type === "Glossary" && r.title === "Hidden Classes"));
  assert(records.some((r) => r.type === "Glossary" && r.title === "Big O"));

  // Combined filter logic tests across Topics & Interviews
  const { syllabusModules, allQuestions } = catalogMod.handbookCatalog;
  const comboTopics = syllabusModules
    .filter((m) => m.category === "fundamentals")
    .flatMap((m) => m.topics)
    .filter((t) => t.status === "available" && Boolean(t.lessonId && parsed.completedLessons[t.lessonId]));
  assert.equal(comboTopics.length, 4);

  const availMod1Topics = syllabusModules
    .filter((m) => m.category === "fundamentals")
    .flatMap((m) => m.topics)
    .filter((t) => t.status === "available");
  assert.equal(availMod1Topics.length, 47);

  const emptyComboTopics = syllabusModules
    .filter((m) => m.category === "databases")
    .flatMap((m) => m.topics)
    .filter((t) => t.status === "available");
  assert.equal(emptyComboTopics.length, 0);

  const iqAdvMod1 = allQuestions.filter(
    (q) => handbookMod.matchesDifficultyFilter(q.difficulty, "advanced") && q.moduleNumber === 1
  );
  assert.equal(iqAdvMod1.length, 10);

  const iqMod2 = allQuestions.filter((q) => q.moduleNumber === 2);
  assert.equal(iqMod2.length, 0);
} finally {
  await vite.close();
}

console.log(
  `OFFLINE, FILTERS & COMPAT CHECK PASSED: dist/software_engineering_mastery.html (${sizeKb} KB), 0 external CDNs, all filter combinations & v1 import verified.`
);
