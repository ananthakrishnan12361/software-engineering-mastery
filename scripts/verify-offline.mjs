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
assert.equal(
  unexpectedUrls.length,
  0,
  `Unexpected external URLs found in dist HTML: ${unexpectedUrls.join(", ")}`
);

// 2. Verify inline CSS & JS exist in singlefile bundle
assert(html.includes("<style"), "Missing inlined <style> in dist HTML");
assert(html.includes("<script"), "Missing inlined <script> in dist HTML");
assert(html.includes("sem_handbook_v1"), "Missing localStorage key sem_handbook_v1 in dist bundle");
assert(html.includes("Programming Fundamentals"), "Missing Module 1 content in dist bundle");

// 3. Verify importing a v1 sem_handbook_v1 progress JSON export
const vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "silent"
});
try {
  const progressMod = await vite.ssrLoadModule("/src/entities/progress/index.ts");
  assert.equal(progressMod.STORAGE_KEY, "sem_handbook_v1");

  const v1Export = JSON.stringify({
    theme: "light",
    completedLessons: { "m01-p1": 1732610000000 },
    bookmarks: { "m01-p1": 1732610005000 },
    masteryChecks: { "m01-p1-m1": true, "m01-p1-m4": true },
    collapsedSections: { "m01-p1-sec-b": true },
    filters: { category: "fundamentals", difficulty: "advanced", bookmarksOnly: false }
  });

  const parsed = progressMod.parseImportedProgressJson(v1Export);
  assert.equal(parsed.theme, "light");
  assert.equal(parsed.completedLessons["m01-p1"], 1732610000000);
  assert.equal(parsed.bookmarks["m01-p1"], 1732610005000);
  assert.equal(parsed.masteryChecks["m01-p1-m1"], true);
  assert.equal(parsed.collapsedSections["m01-p1-sec-b"], true);
  assert.equal(parsed.filters.category, "fundamentals");
  assert.equal(parsed.filters.difficulty, "advanced");
  assert.equal(parsed.filters.bookmarksOnly, false);

  const partialParsed = progressMod.parseImportedProgressJson(
    JSON.stringify({ completedLessons: { "m01-p1": 123 } })
  );
  assert.equal(partialParsed.filters.category, "all");
  assert.equal(partialParsed.theme, null);
} finally {
  await vite.close();
}

console.log(
  `OFFLINE & COMPAT CHECK PASSED: dist/software_engineering_mastery.html (${sizeKb} KB), 0 external assets/CDNs, v1 sem_handbook_v1 JSON import verified.`
);
