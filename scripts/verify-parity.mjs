import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const ROOT = process.cwd();
const LEGACY_MOD1 = path.join(ROOT, "legacy", "modules", "01-programming.html");
const MDX_MOD1 = path.join(ROOT, "content", "modules", "01-programming", "m01-p1.mdx");
const IQ_MOD1 = path.join(ROOT, "content", "interviews", "m01-p1.questions.ts");
const REGISTRY = path.join(ROOT, "content", "registry.ts");

const legacyHtml = fs.readFileSync(LEGACY_MOD1, "utf8");
const mdxText = fs.readFileSync(MDX_MOD1, "utf8");
const iqText = fs.readFileSync(IQ_MOD1, "utf8");
const regText = fs.readFileSync(REGISTRY, "utf8");

// Baseline counts from legacy/modules/01-programming.html
const legacyCounts = {
  sections: (legacyHtml.match(/class="topic-section"/g) || []).length,
  objectives: (legacyHtml.match(/<div class="lesson-objectives"[\s\S]*?<\/div>/)[0].match(/<li>/g) || []).length,
  diagrams: (legacyHtml.match(/<svg\b/g) || []).length,
  tables: (legacyHtml.match(/<table\b/g) || []).length,
  runnableDemos: (legacyHtml.match(/data-runnable="true"/g) || []).length,
  iqTotal: (legacyHtml.match(/class="iq-card"/g) || []).length,
  iqBasic: (legacyHtml.match(/data-difficulty="basic"/g) || []).length,
  iqIntermediate: (legacyHtml.match(/data-difficulty="intermediate"/g) || []).length,
  iqAdvanced: (legacyHtml.match(/data-difficulty="advanced"/g) || []).length,
  iqSeniorArch: (legacyHtml.match(/data-difficulty="senior-architect"/g) || []).length,
  glossaryTerms: (legacyHtml.match(/<dfn\s+data-definition=/g) || []).length,
  exercises: (legacyHtml.match(/class="exercise-card"/g) || []).length,
  masteryItems: (legacyHtml.match(/data-mastery-id="/g) || []).length
};

// New MDX + typed data counts
const objectivesBlock = regText.match(/objectives:\s*\[([\s\S]*?)\]/)[1];
const newCounts = {
  sections: (mdxText.match(/<TopicSection\b/g) || []).length,
  objectives: (objectivesBlock.match(/^\s*"/gm) || []).length,
  diagrams: (mdxText.match(/<DiagramCard\b/g) || []).length,
  tables: (mdxText.match(/^\| --- \|/gm) || []).length,
  runnableDemos: (mdxText.match(/<CodeBlock[\s\S]*?\brunnable\b/g) || []).length,
  iqTotal: (iqText.match(/id:\s*"m01-p1-iq-/g) || []).length,
  iqBasic: (iqText.match(/difficulty:\s*"basic"/g) || []).length,
  iqIntermediate: (iqText.match(/difficulty:\s*"intermediate"/g) || []).length,
  iqAdvanced: (iqText.match(/difficulty:\s*"advanced"/g) || []).length,
  iqSeniorArch: (iqText.match(/difficulty:\s*"senior-architect"/g) || []).length,
  glossaryTerms: (mdxText.match(/<GlossaryTerm\b/g) || []).length,
  exercises: (mdxText.match(/<ExerciseCard\b/g) || []).length,
  masteryItems: (regText.match(/id:\s*"m01-p1-m\d+"/g) || []).length
};

console.log("Legacy counts:", legacyCounts);
console.log("New counts:   ", newCounts);

for (const [key, expected] of Object.entries(legacyCounts)) {
  assert.equal(newCounts[key], expected, `Parity mismatch for ${key}: expected ${expected}, got ${newCounts[key]}`);
}

// Verify all section letters A-Q appear in order
const expectedLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M/N", "O", "P", "Q"];
const actualLetters = [...mdxText.matchAll(/<TopicSection\b[^>]*letter="([^"]+)"/g)].map((m) => m[1]);
assert.deepEqual(actualLetters, expectedLetters, "TopicSection letter sequence mismatch");

// Execute all 7 runnable JS demos extracted from MDX to confirm valid runnable code
const codeRe = /<CodeBlock\s+lang="javascript"\s+runnable\s+code=\{`([\s\S]*?)`\}\s*\/>/g;
let match;
let idx = 0;
while ((match = codeRe.exec(mdxText)) !== null) {
  idx++;
  const code = match[1].replace(/\\`/g, "`").replace(/\\\$/g, "$");
  const logs = [];
  const fakeConsole = {
    log: (...args) => logs.push(args.map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" "))
  };
  const fn = new Function("console", `"use strict";\n${code}`);
  fn(fakeConsole);
  assert(logs.length > 0, `MDX runnable demo #${idx} produced no output`);
}
assert.equal(idx, legacyCounts.runnableDemos, "Runnable demo execution count mismatch");

console.log(`PARITY CHECK PASSED: All 13 content metrics match legacy (100%), ${idx} runnable JS demos executed.`);
