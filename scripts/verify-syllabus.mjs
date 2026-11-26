import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { createServer } from "vite";

const ROOT = process.cwd();
const MASTER_PROMPT = path.join(ROOT, "COURSE_modeule_in_detiles.md");
const MDX_MOD1 = path.join(ROOT, "content", "modules", "01-programming", "m01-p1.mdx");

const promptText = fs.readFileSync(MASTER_PROMPT, "utf8");
const mdxText = fs.readFileSync(MDX_MOD1, "utf8");

// Extract TopicAnchor and TopicSection IDs from actual written MDX files
const existingAnchors = new Set([
  ...[...mdxText.matchAll(/<TopicAnchor\s+id="([^"]+)"/g)].map((m) => m[1]),
  ...[...mdxText.matchAll(/<TopicSection\s+id="([^"]+)"/g)].map((m) => m[1])
]);

const vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "silent"
});

try {
  const { SYLLABUS_MODULES } = await vite.ssrLoadModule("/content/syllabus.ts");
  assert.equal(SYLLABUS_MODULES.length, 28, "Expected exactly 28 modules in syllabus");

  let totalTopics = 0;
  let availableTopics = 0;
  let unwrittenTopics = 0;
  const perModule = [];

  for (const mod of SYLLABUS_MODULES) {
    assert(mod.topics.length > 0, `Module ${mod.number} has 0 topics`);
    let modAvail = 0;
    for (const topic of mod.topics) {
      totalTopics++;
      if (topic.status === "available") {
        availableTopics++;
        modAvail++;
        assert(topic.lessonId, `Available topic "${topic.title}" missing lessonId`);
        assert(topic.anchorId, `Available topic "${topic.title}" missing anchorId`);
        assert(
          existingAnchors.has(topic.anchorId),
          `Available topic "${topic.title}" points to missing anchor "${topic.anchorId}"`
        );
      } else {
        unwrittenTopics++;
        assert.equal(topic.lessonId, undefined, `Unwritten topic "${topic.title}" must not have lessonId`);
      }
    }
    perModule.push({
      module: mod.number,
      title: mod.title,
      topics: mod.topics.length,
      available: modAvail
    });

    // Verify module heading appears in master prompt
    assert(
      promptText.includes(`# MODULE ${mod.number}:`),
      `Module ${mod.number} heading missing from master prompt`
    );
  }

  console.log("Per-module syllabus counts:");
  console.table(perModule);
  console.log(
    `SYLLABUS CHECK PASSED: 28 modules, ${totalTopics} total topics (${availableTopics} available with verified anchors, ${unwrittenTopics} not written yet).`
  );
} finally {
  await vite.close();
}
