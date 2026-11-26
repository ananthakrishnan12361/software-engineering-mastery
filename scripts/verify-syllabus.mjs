import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { createServer } from "vite";

const ROOT = process.cwd();
const MASTER_PROMPT = path.join(ROOT, "COURSE_modeule_in_detiles.md");
const MODULES_DIR = path.join(ROOT, "content", "modules");

function collectMdxFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectMdxFiles(full));
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      results.push(full);
    }
  }
  return results;
}

const promptText = fs.readFileSync(MASTER_PROMPT, "utf8");
const existingAnchors = new Set();
for (const mdxFile of collectMdxFiles(MODULES_DIR)) {
  const mdxText = fs.readFileSync(mdxFile, "utf8");
  for (const m of mdxText.matchAll(/<TopicAnchor\s+id="([^"]+)"/g)) {
    existingAnchors.add(m[1]);
  }
  for (const m of mdxText.matchAll(/<TopicSection\s+id="([^"]+)"/g)) {
    existingAnchors.add(m[1]);
  }
}

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
