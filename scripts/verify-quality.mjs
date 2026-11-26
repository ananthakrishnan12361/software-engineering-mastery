import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createServer } from "vite";

const ROOT = process.cwd();
const MASTER_PROMPT = path.join(ROOT, "COURSE_modeule_in_detiles.md");
const DIST_HTML = path.join(ROOT, "dist", "software_engineering_mastery.html");
const DEFAULT_CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const EXPECTED_SECTION_LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M/N", "O", "P", "Q"];

const FORBIDDEN_PLACEHOLDERS = [
  { label: "TODO marker", re: /\bTODO\b(?::|\s+-)/i },
  { label: "TBD marker", re: /\bTBD\b/i },
  { label: "FIXME marker", re: /\bFIXME\b/i },
  { label: "lorem ipsum", re: /lorem ipsum/i },
  { label: "coming soon", re: /\bcoming soon\b/i },
  { label: "insert stub", re: /\[insert\s+[^\]]+\]/i },
  { label: "placeholder marker", re: /\b(?:placeholder content|to be written|example goes here)\b/i }
];

function extractMasterPromptModuleTopics(promptText, moduleNumber) {
  const startRe = new RegExp(`^#\\s+MODULE\\s+${moduleNumber}\\s*:.*$`, "m");
  const startMatch = promptText.match(startRe);
  assert(startMatch && startMatch.index !== undefined, `Could not find "# MODULE ${moduleNumber}:" in master prompt`);

  const afterStart = promptText.slice(startMatch.index + startMatch[0].length);
  const nextHeading = afterStart.match(/^#\s+(?:MODULE\s+\d+|5\.|6\.|7\.|8\.)/m);
  const sectionBody = nextHeading && nextHeading.index !== undefined ? afterStart.slice(0, nextHeading.index) : afterStart;

  return [...sectionBody.matchAll(/^\s*-\s+(.+)$/gm)]
    .map((m) => m[1].replace(/\.$/, "").trim())
    .filter((line) => line.length > 0);
}

function collectMdxFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...collectMdxFiles(full));
    else if (entry.isFile() && entry.name.endsWith(".mdx")) results.push(full);
  }
  return results;
}

function countSentences(text) {
  const clean = text
    .replace(/`[^`]*`/g, "code")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const sentences = clean.split(/[.!?]+/).filter((s) => s.trim().length >= 12);
  return sentences.length;
}

function extractHeadingBody(mdxText, headingText) {
  const lines = mdxText.split(/\r?\n/);
  const headingLineRe = /^(#{2,4})\s+(.+?)\s*$/;
  let foundIdx = -1;
  let foundLevel = 4;

  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(headingLineRe);
    if (m && m[2].trim() === headingText.trim()) {
      foundIdx = i;
      foundLevel = m[1].length;
      break;
    }
  }
  if (foundIdx === -1) return null;

  const collected = [];
  for (let i = foundIdx + 1; i < lines.length; i++) {
    const line = lines[i];
    if (/^<\/TopicSection>/.test(line.trim())) break;
    const nextHeading = line.match(headingLineRe);
    if (nextHeading && nextHeading[1].length <= foundLevel) break;
    collected.push(line);
  }
  return collected.join("\n").trim();
}

function extractTopicSections(mdxText) {
  const sections = [];
  const re = /<TopicSection\s+id="([^"]+)"\s+letter="([^"]+)"\s+title="([^"]+)">([\s\S]*?)<\/TopicSection>/g;
  for (const m of mdxText.matchAll(re)) {
    sections.push({ id: m[1], letter: m[2], title: m[3], body: m[4].trim() });
  }
  return sections;
}

function extractRunnableCodeBlocks(mdxText) {
  const parts = mdxText.split("<CodeBlock").slice(1);
  const blocks = [];
  for (const chunk of parts) {
    const endIdx = chunk.indexOf("\n/>");
    const blockText = endIdx === -1 ? chunk : chunk.slice(0, endIdx);
    if (!/\brunnable\b/.test(blockText)) continue;
    const codeMatch = blockText.match(/code=\{\`([\s\S]*?)\`\}/);
    assert(codeMatch, "Failed to extract code template literal from <CodeBlock runnable>");
    const rawCode = codeMatch[1].replace(/\\`/g, "`").replace(/\\\$\{/g, "${");
    blocks.push(rawCode);
  }
  return blocks;
}

function compileAndRunSnippet(rawCode, extraJs = "") {
  const logs = [];
  const fakeConsole = {
    log: (...args) =>
      logs.push(args.map((a) => (typeof a === "object" && a !== null ? JSON.stringify(a) : String(a))).join(" ")),
    warn: (...args) => fakeConsole.log("[WARN]", ...args),
    error: (...args) => fakeConsole.log("[ERR]", ...args),
    info: (...args) => fakeConsole.log(...args),
    table: (d) => logs.push(JSON.stringify(d))
  };
  const fn = new Function("console", `"use strict";\n${rawCode}\n${extraJs}`);
  const returnValue = fn(fakeConsole);
  return { stdout: logs.join("\n"), lines: logs, returnValue };
}

function checkPlaceholders(filePath, content) {
  const lines = content.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    for (const rule of FORBIDDEN_PLACEHOLDERS) {
      assert(!rule.re.test(lines[i]), `Forbidden ${rule.label} found in ${filePath}:${i + 1}: ${lines[i].trim()}`);
    }
  }
}

async function runBrowserLayoutAndSvgAudit(lessons) {
  const chromePath = process.env.CHROME_BIN || DEFAULT_CHROME;
  assert(fs.existsSync(chromePath), `Chrome executable not found for quality check: ${chromePath}`);
  assert(fs.existsSync(DIST_HTML), `Built file missing: ${DIST_HTML}`);

  const profDir = fs.mkdtempSync(path.join(os.tmpdir(), "sem_quality_chrome_"));
  const distFileUrl = `file:///${DIST_HTML.replace(/\\/g, "/").replace(/ /g, "%20")}#/home`;

  const proc = spawn(
    chromePath,
    [
      "--headless=new",
      "--no-sandbox",
      "--disable-gpu",
      "--remote-debugging-pipe",
      `--user-data-dir=${profDir}`,
      "--no-first-run",
      "--no-default-browser-check",
      distFileUrl
    ],
    { stdio: ["ignore", "pipe", "pipe", "pipe", "pipe"] }
  );

  const writer = proc.stdio[3];
  const reader = proc.stdio[4];
  let buf = Buffer.alloc(0);
  let nextId = 1;
  const pending = new Map();

  reader.on("data", (chunk) => {
    buf = Buffer.concat([buf, chunk]);
    let idx;
    while ((idx = buf.indexOf(0)) !== -1) {
      const raw = buf.subarray(0, idx).toString("utf8");
      buf = buf.subarray(idx + 1);
      const msg = JSON.parse(raw);
      if (msg.id && pending.has(msg.id)) {
        const { resolve, reject } = pending.get(msg.id);
        pending.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
      }
    }
  });

  function send(method, params = {}, sessionId = undefined) {
    const id = nextId++;
    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject });
      const payload = sessionId ? { id, method, params, sessionId } : { id, method, params };
      writer.write(JSON.stringify(payload) + "\0");
    });
  }

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  try {
    let pageTargetId = null;
    for (let i = 0; i < 40; i++) {
      const { targetInfos } = await send("Target.getTargets");
      const target = targetInfos.find((t) => t.type === "page" && t.url.includes("software_engineering_mastery.html"));
      if (target) {
        pageTargetId = target.targetId;
        break;
      }
      await sleep(150);
    }
    assert(pageTargetId, "Headless Chrome did not open software_engineering_mastery.html");

    const { sessionId } = await send("Target.attachToTarget", { targetId: pageTargetId, flatten: true });
    await send("Page.enable", {}, sessionId);
    await send("Runtime.enable", {}, sessionId);

    const evalJs = async (expression) => {
      const res = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true }, sessionId);
      if (res.exceptionDetails) {
        throw new Error(`Browser JS error: ${JSON.stringify(res.exceptionDetails)}`);
      }
      return res.result?.value;
    };

    const setViewport = async (width, height) => {
      await send(
        "Emulation.setDeviceMetricsOverride",
        { width, height, deviceScaleFactor: 1, mobile: width < 768 },
        sessionId
      );
      await sleep(100);
    };

    const assertNoHorizontalOverflow = async (label, viewports) => {
      for (const [w, h] of viewports) {
        await setViewport(w, h);
        const overflow = await evalJs(`(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
          overflowing: document.documentElement.scrollWidth > window.innerWidth
        }))()`);
        assert.equal(
          overflow.overflowing,
          false,
          `Horizontal overflow on ${label} at ${w}x${h}: scrollWidth=${overflow.scrollWidth} > innerWidth=${overflow.innerWidth}`
        );
      }
    };

    // Wait for React boot
    for (let i = 0; i < 30; i++) {
      if (await evalJs("Boolean(document.querySelector('#main-content'))")) break;
      await sleep(100);
    }

    let totalSvgsChecked = 0;
    let totalDomDemosChecked = 0;

    for (const lesson of lessons) {
      await evalJs(`window.location.hash = '#/lesson/${lesson.id}'`);
      for (let i = 0; i < 30; i++) {
        if (await evalJs(`Boolean(document.getElementById('${lesson.id}-sec-a'))`)) break;
        await sleep(100);
      }

      // Expand all collapsible sections and all ExerciseCard solutions so all diagrams, code, tables, and IQs are rendered
      await evalJs(`(() => {
        const expandBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent?.trim() === 'Expand All');
        if (expandBtn) expandBtn.click();
      })()`);
      await sleep(150);
      await evalJs(`(() => {
        for (const btn of document.querySelectorAll('.exercise-toggle-btn')) {
          if (btn.getAttribute('aria-expanded') === 'false') btn.click();
        }
      })()`);
      await sleep(120);

      // Check SVG diagram bounding boxes at desktop width (unclipped SVG viewBox, zero text overlap, non-zero rendering)
      await setViewport(1440, 900);
      const svgReport = await evalJs(`(() => {
        const svgs = Array.from(document.querySelectorAll('.diagram-card svg'));
        return svgs.map((svg, idx) => {
          const vb = (svg.getAttribute('viewBox') || '').trim().split(/\s+/).map(Number);
          const rect = svg.getBoundingClientRect();
          const parentRect = svg.parentElement.getBoundingClientRect();
          const clipped = [];
          const overlaps = [];
          const textBoxes = [];
          if (vb.length === 4) {
            const [minX, minY, vbW, vbH] = vb;
            for (const el of svg.querySelectorAll('text')) {
              const txt = el.textContent?.trim();
              if (!txt) continue;
              const box = el.getBBox();
              if (box.width === 0 || box.height === 0) continue;
              if (box.x < minX - 2 || box.x + box.width > minX + vbW + 2 || box.y < minY - 2 || box.y + box.height > minY + vbH + 2) {
                clipped.push({ text: txt, box: { x: box.x, y: box.y, w: box.width, h: box.height }, vb });
              }
              textBoxes.push({ text: txt, x1: box.x, y1: box.y, x2: box.x + box.width, y2: box.y + box.height });
            }
            for (let i = 0; i < textBoxes.length; i++) {
              for (let j = i + 1; j < textBoxes.length; j++) {
                const a = textBoxes[i], b = textBoxes[j];
                const ox = Math.min(a.x2, b.x2) - Math.max(a.x1, b.x1);
                const oy = Math.min(a.y2, b.y2) - Math.max(a.y1, b.y1);
                if (ox > 4 && oy > 4) {
                  overlaps.push({ a: a.text, b: b.text, ox: Math.round(ox), oy: Math.round(oy) });
                }
              }
            }
          }
          return {
            idx,
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            parentWidth: Math.round(parentRect.width),
            overflowParent: rect.width > parentRect.width + 2,
            clipped,
            overlaps
          };
        });
      })()`);

      assert(svgReport.length > 0, `No rendered SVG diagrams inspected in lesson ${lesson.id}`);
      for (const item of svgReport) {
        totalSvgsChecked++;
        assert(
          item.width >= 100 && item.height >= 40,
          `SVG #${item.idx + 1} in ${lesson.id} collapsed or failed to render (${item.width}x${item.height})`
        );
        assert.equal(
          item.overflowParent,
          false,
          `SVG #${item.idx + 1} in ${lesson.id} overflows card container (${item.width}px > ${item.parentWidth}px)`
        );
        assert.equal(
          item.clipped.length,
          0,
          `SVG #${item.idx + 1} text cut off / outside viewBox in ${lesson.id}: ${JSON.stringify(item.clipped)}`
        );
        assert.equal(
          item.overlaps.length,
          0,
          `SVG #${item.idx + 1} has overlapping text in ${lesson.id}: ${JSON.stringify(item.overlaps)}`
        );
      }

      // Check EVERY Run Demo button works live in DOM (matches CodeBlock.tsx .demo-output.is-error)
      const demoResult = await evalJs(`(() => {
        const runBtns = Array.from(document.querySelectorAll('.code-toolbar-actions button'))
          .filter(b => b.textContent?.trim() === 'Run Demo');
        for (const btn of runBtns) btn.click();
        return { clicked: runBtns.length };
      })()`);
      await sleep(100);
      const domOutcome = await evalJs(`(() => ({
        outputs: document.querySelectorAll('.demo-output').length,
        errors: Array.from(document.querySelectorAll('.demo-output.is-error')).map(el => el.textContent)
      }))()`);
      assert(demoResult.clicked > 0, `No Run Demo buttons clicked in ${lesson.id}`);
      assert.equal(
        domOutcome.outputs,
        demoResult.clicked,
        `Expected ${demoResult.clicked} .demo-output blocks in ${lesson.id}, got ${domOutcome.outputs}`
      );
      assert.equal(
        domOutcome.errors.length,
        0,
        `Live browser Run Demo threw error in ${lesson.id}: ${JSON.stringify(domOutcome.errors)}`
      );
      totalDomDemosChecked += demoResult.clicked;

      // Mobile, tablet & desktop overflow checks
      await assertNoHorizontalOverflow(`lesson ${lesson.id}`, [
        [360, 740],
        [390, 844],
        [768, 1024],
        [1024, 768],
        [1440, 900]
      ]);
    }

    // Also verify Topics and Interviews routes have zero overflow at mobile & desktop
    for (const route of ["#/topics", "#/interviews"]) {
      await evalJs(`window.location.hash = '${route}'`);
      await sleep(150);
      await assertNoHorizontalOverflow(`route ${route}`, [
        [360, 740],
        [1440, 900]
      ]);
    }

    console.log(
      `Browser quality checks passed: ${lessons.length} lessons expanded, ${totalDomDemosChecked} live Run Demos passed, ${totalSvgsChecked} SVG diagrams checked (clipping + overlap + size), 360px/390px/768px/1024px/1440px overflow = 0.`
    );
  } finally {
    proc.kill();
    await new Promise((r) => setTimeout(r, 150));
    try {
      fs.rmSync(profDir, { recursive: true, force: true });
    } catch {
      /* Ignore transient Windows file lock on headless Chrome temp profile */
    }
  }
}

// ======================= MAIN QUALITY GATE EXECUTION =======================
const promptText = fs.readFileSync(MASTER_PROMPT, "utf8");

// 1. Placeholder scan across content/
for (const dir of ["content/modules", "content/interviews", "content/coverage"]) {
  const fullDir = path.join(ROOT, dir);
  for (const entry of fs.readdirSync(fullDir, { recursive: true })) {
    const p = path.join(fullDir, String(entry));
    if (fs.statSync(p).isFile() && /\.(mdx|ts)$/.test(p)) {
      checkPlaceholders(path.relative(ROOT, p), fs.readFileSync(p, "utf8"));
    }
  }
}

const vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "silent"
});

try {
  const { handbookCatalog } = await vite.ssrLoadModule("/content/registry.ts");
  const { LESSON_COVERAGE_SPECS, MODULE_INTERVIEW_TARGETS } = await vite.ssrLoadModule("/content/coverage/index.ts");

  const coverageByLesson = new Map(LESSON_COVERAGE_SPECS.map((c) => [c.lessonId, c]));

  // Check every active module in syllabus matches master prompt topic list
  for (const mod of handbookCatalog.modules) {
    const promptTopics = extractMasterPromptModuleTopics(promptText, mod.number);
    const sylMod = handbookCatalog.syllabusModules.find((s) => s.number === mod.number);
    assert(sylMod, `Syllabus module ${mod.number} missing`);
    const sylTitles = sylMod.topics.map((t) => t.title);
    for (const reqTopic of promptTopics) {
      assert(
        sylTitles.includes(reqTopic),
        `Module ${mod.number} topic "${reqTopic}" from COURSE_modeule_in_detiles.md is missing in content/syllabus.ts`
      );
    }
  }

  let totalTopicsVerified = 0;
  let totalCodeBlocksVerified = 0;
  let totalSafetyMutationsVerified = 0;

  for (const lesson of handbookCatalog.lessons) {
    const spec = coverageByLesson.get(lesson.id);
    assert(spec, `Missing coverage specification file in content/coverage/ for lesson "${lesson.id}"`);

    const mdxFullPath = path.join(ROOT, spec.mdxPath);
    assert(fs.existsSync(mdxFullPath), `Missing MDX file for ${lesson.id}: ${spec.mdxPath}`);
    const mdxText = fs.readFileSync(mdxFullPath, "utf8");

    // 2. Check syllabus topics assigned to this lesson vs coverage file (1-to-1)
    const sylMod = handbookCatalog.syllabusModules.find((s) => s.number === lesson.moduleNumber);
    assert(sylMod, `Missing syllabus module ${lesson.moduleNumber}`);
    const assignedTopics = sylMod.topics.filter((t) => t.lessonId === lesson.id);
    assert(assignedTopics.length > 0, `Lesson ${lesson.id} has 0 assigned topics in syllabus.ts`);

    const coveredMap = new Map(spec.topics.map((t) => [t.topicTitle, t]));
    for (const sylTopic of assignedTopics) {
      assert(
        coveredMap.has(sylTopic.title),
        `Topic "${sylTopic.title}" (${lesson.id}) is missing from coverage file ${lesson.id}.coverage.ts`
      );
    }
    assert.equal(
      spec.topics.length,
      assignedTopics.length,
      `Coverage topic count mismatch in ${lesson.id}: coverage has ${spec.topics.length}, syllabus has ${assignedTopics.length}`
    );

    const promptTopics = new Set(extractMasterPromptModuleTopics(promptText, lesson.moduleNumber));
    const mdxAnchors = new Set([...mdxText.matchAll(/<TopicAnchor\s+id="([^"]+)"/g)].map((m) => m[1]));
    const mdxExercises = [...mdxText.matchAll(/<ExerciseCard[\s\S]*?title="([^"]+)"/g)].map((m) => m[1]);
    const lessonQuestions = handbookCatalog.questionsByLesson[lesson.id] || [];
    const lessonQuestionIds = new Set(lessonQuestions.map((q) => q.id));
    const seenPrimaryHeadings = new Set();

    for (const topicCov of spec.topics) {
      totalTopicsVerified++;
      assert(
        promptTopics.has(topicCov.topicTitle),
        `Topic "${topicCov.topicTitle}" in ${lesson.id}.coverage.ts not found in COURSE_modeule_in_detiles.md Module ${lesson.moduleNumber}`
      );
      assert(
        mdxAnchors.has(topicCov.anchorId),
        `Missing <TopicAnchor id="${topicCov.anchorId}" /> in ${spec.mdxPath} for topic "${topicCov.topicTitle}"`
      );

      // Explanation depth check: headings + substantive content (reject anchor-only, heading-only, or single-bullet stubs)
      assert(
        topicCov.explanationHeadings.length > 0,
        `Topic "${topicCov.topicTitle}" has no explanationHeadings mapped`
      );
      const primaryHeading = topicCov.explanationHeadings[0].trim();
      assert(
        !seenPrimaryHeadings.has(primaryHeading),
        `Topic "${topicCov.topicTitle}" shares primary heading "${primaryHeading}" with another topic in ${lesson.id}`
      );
      seenPrimaryHeadings.add(primaryHeading);

      // Verify TopicAnchor sits immediately above its primary heading (not dangling over a single bullet)
      const anchorPattern = new RegExp(
        `<TopicAnchor\\s+id="${topicCov.anchorId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"\\s*\\/>\\s*(?:#{2,4}\\s+${primaryHeading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`
      );
      assert(
        anchorPattern.test(mdxText),
        `Topic "${topicCov.topicTitle}" anchor "${topicCov.anchorId}" must directly precede dedicated heading "${primaryHeading}" in ${spec.mdxPath}`
      );

      let combinedWords = 0;
      let combinedBlocks = 0;
      let combinedSentences = 0;
      let nonBulletBlocks = 0;

      for (const heading of topicCov.explanationHeadings) {
        const body = extractHeadingBody(mdxText, heading);
        assert(body !== null && body.length > 0, `Heading "${heading}" missing or empty in ${spec.mdxPath}`);
        const cleanedLines = body
          .split(/\r?\n/)
          .map((l) => l.trim())
          .filter((l) => l.length > 0 && !/^<TopicAnchor\b/.test(l));
        const words = cleanedLines.join(" ").split(/\s+/).filter(Boolean).length;
        const sentences = countSentences(cleanedLines.join(" "));
        nonBulletBlocks += cleanedLines.filter((l) => !/^-\s+/.test(l)).length;
        assert(
          words >= 35 && cleanedLines.length >= 1,
          `Heading "${heading}" in ${spec.mdxPath} is too thin (${words} words < 35) to count as explanation`
        );
        combinedWords += words;
        combinedBlocks += cleanedLines.length;
        combinedSentences += sentences;
      }

      assert(
        combinedWords >= 55 && combinedBlocks >= 2 && (combinedSentences >= 2 || nonBulletBlocks >= 1),
        `Topic "${topicCov.topicTitle}" fails non-stub depth check (words=${combinedWords}, blocks=${combinedBlocks}, sentences=${combinedSentences}); single heading/anchor/bullet is insufficient.`
      );

      // Runnable example or noCodeReason
      const hasExample = (topicCov.exampleTitles?.length ?? 0) > 0;
      const hasNoCodeReason = Boolean(topicCov.noCodeReason && topicCov.noCodeReason.trim().length >= 25);
      assert(
        hasExample || hasNoCodeReason,
        `Topic "${topicCov.topicTitle}" must map to at least 1 runnable example or explain noCodeReason (>=25 chars)`
      );
      for (const exTitle of topicCov.exampleTitles ?? []) {
        const headingBody = extractHeadingBody(mdxText, exTitle);
        const cardMatch = mdxText.match(
          new RegExp(`<ExerciseCard[^>]*title="${exTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[\\s\\S]*?<\\/ExerciseCard>`)
        );
        const container = headingBody ?? (cardMatch ? cardMatch[0] : "");
        assert(
          container.includes("<CodeBlock") && /\brunnable\b/.test(container),
          `Mapped example "${exTitle}" for "${topicCov.topicTitle}" has no <CodeBlock runnable> in ${spec.mdxPath}`
        );
      }

      // Interview Q&As & Exercises
      assert(
        topicCov.interviewQuestionIds.length > 0,
        `Topic "${topicCov.topicTitle}" has 0 interviewQuestionIds mapped`
      );
      for (const qId of topicCov.interviewQuestionIds) {
        assert(lessonQuestionIds.has(qId), `Mapped question "${qId}" missing in ${lesson.id} question bank`);
      }

      assert(topicCov.exerciseTitles.length > 0, `Topic "${topicCov.topicTitle}" has 0 exerciseTitles mapped`);
      for (const exerciseTitle of topicCov.exerciseTitles) {
        assert(
          mdxExercises.includes(exerciseTitle),
          `Mapped exercise "${exerciseTitle}" missing in ${spec.mdxPath}`
        );
      }
    }

    // 3. Sections A-Q teaching format check
    assert(lesson.objectives.length >= 3, `${lesson.id} needs >= 3 Learning Objectives`);
    assert(lesson.duration.trim().length > 0, `${lesson.id} missing Study Duration`);
    assert(lesson.masteryItems.length >= 3, `${lesson.id} needs >= 3 Mastery Assessment items`);

    const sections = extractTopicSections(mdxText);
    assert.deepEqual(
      sections.map((s) => s.letter),
      EXPECTED_SECTION_LETTERS,
      `${lesson.id} sections A-Q sequence mismatch`
    );

    const byLetter = new Map(sections.map((s) => [s.letter, s.body]));
    assert(/what is this\?/i.test(byLetter.get("A")), `${lesson.id} Section A missing "What is this?"`);
    assert(/why does it exist/i.test(byLetter.get("A")), `${lesson.id} Section A missing "Why does it exist"`);
    assert(/where is it used/i.test(byLetter.get("A")), `${lesson.id} Section A missing "Where is it used"`);
    assert((byLetter.get("B").match(/<TopicAnchor\b/g) || []).length >= 1, `${lesson.id} Section B missing TopicAnchor`);
    assert(
      byLetter.get("C").includes("<DiagramCard") || byLetter.get("C").split(/\s+/).length >= 80,
      `${lesson.id} Section C lacks architecture diagram or internal deep-dive`
    );
    assert((byLetter.get("D").match(/<CodeBlock[\s\S]*?\brunnable\b/g) || []).length >= 1, `${lesson.id} Section D needs runnable code`);
    assert((byLetter.get("E").match(/^\d+\./gm) || []).length >= 3, `${lesson.id} Section E needs >= 3 step-by-step walkthrough steps`);
    assert((byLetter.get("F").match(/^####\s+/gm) || []).length >= 2, `${lesson.id} Section F needs >= 2 real-world scenarios`);
    assert((byLetter.get("G").match(/^-\s+/gm) || []).length >= 2, `${lesson.id} Section G needs >= 2 common mistakes`);
    assert((byLetter.get("H").match(/^-\s+/gm) || []).length >= 2, `${lesson.id} Section H needs >= 2 best practices`);
    assert(byLetter.get("I").split(/\s+/).length >= 30, `${lesson.id} Section I too short`);
    assert(byLetter.get("J").split(/\s+/).length >= 30, `${lesson.id} Section J too short`);
    assert(byLetter.get("K").includes("| --- |"), `${lesson.id} Section K needs comparison table`);
    assert((byLetter.get("L").match(/^-\s+/gm) || []).length >= 2, `${lesson.id} Section L needs >= 2 memory tips`);
    assert(byLetter.get("M/N").includes("<InterviewSection"), `${lesson.id} Section M/N missing <InterviewSection />`);
    assert((byLetter.get("O").match(/<ExerciseCard\b/g) || []).length >= 2, `${lesson.id} Section O needs >= 2 <ExerciseCard> tasks`);
    assert(
      byLetter.get("P").includes("<Callout") && byLetter.get("P").includes("<ExerciseCard"),
      `${lesson.id} Section P needs Challenge <Callout> and <ExerciseCard>`
    );
    assert((byLetter.get("Q").match(/^-\s+/gm) || []).length >= 2, `${lesson.id} Section Q needs >= 2 takeaway bullets`);

    // 4. Execute & test EVERY runnable code block + valid/invalid + safety mutations
    const rawBlocks = extractRunnableCodeBlocks(mdxText);
    assert.equal(
      spec.codeTests.length,
      rawBlocks.length,
      `${lesson.id}: codeTests count (${spec.codeTests.length}) must match runnable <CodeBlock> count (${rawBlocks.length})`
    );

    for (const codeTest of spec.codeTests) {
      totalCodeBlocksVerified++;
      const rawSnippet = rawBlocks[codeTest.blockIndex - 1];
      assert(rawSnippet, `${lesson.id}: Missing runnable block #${codeTest.blockIndex}`);

      const runResult = compileAndRunSnippet(rawSnippet);
      assert(
        runResult.lines.length >= codeTest.minStdoutLines,
        `${lesson.id} Block #${codeTest.blockIndex} (${codeTest.label}): expected >= ${codeTest.minStdoutLines} log lines, got ${runResult.lines.length}`
      );
      for (const expectedPart of codeTest.expectedStdoutIncludes) {
        assert(
          runResult.stdout.includes(expectedPart),
          `${lesson.id} Block #${codeTest.blockIndex} (${codeTest.label}) stdout missing "${expectedPart}". Actual:\n${runResult.stdout}`
        );
      }

      const evalWithOrig = (extraJs) => compileAndRunSnippet(rawSnippet, extraJs).returnValue;
      codeTest.testValidAndInvalidInputs(evalWithOrig);

      for (const mut of codeTest.safetyMutations ?? []) {
        totalSafetyMutationsVerified++;
        const mutatedSnippet = mut.mutateCode(rawSnippet);
        assert.notEqual(
          mutatedSnippet,
          rawSnippet,
          `${lesson.id} safety mutation "${mut.description}" did not modify code snippet (stale regex?)`
        );

        // Must pass on intact code
        mut.verifyProtection(evalWithOrig);

        // Must FAIL when protection is removed
        let failedAsExpected = false;
        try {
          mut.verifyProtection((extraJs) => compileAndRunSnippet(mutatedSnippet, extraJs).returnValue);
        } catch {
          failedAsExpected = true;
        }
        assert.equal(
          failedAsExpected,
          true,
          `${lesson.id} safety mutation "${mut.description}" STILL PASSED after removing protection!`
        );
      }
    }
  }

  // 5. Interview Question Integrity & Module Totals
  const seenIds = new Set();
  const seenPrompts = new Map();
  const moduleCounts = new Map();

  for (const q of handbookCatalog.allQuestions) {
    assert(!seenIds.has(q.id), `Duplicate interview question ID: ${q.id}`);
    seenIds.add(q.id);

    const normPrompt = q.question.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    assert(
      !seenPrompts.has(normPrompt),
      `Duplicate interview question prompt between "${q.id}" and "${seenPrompts.get(normPrompt)}": ${q.question}`
    );
    seenPrompts.set(normPrompt, q.id);

    if (q.difficulty === "senior-architect" || q.difficulty === "senior" || q.difficulty === "architect") {
      assert(
        Array.isArray(q.numberedSteps) && q.numberedSteps.length === 12,
        `Question ${q.id} (${q.difficulty}) must have 12-step architect answer template, got ${q.numberedSteps?.length ?? 0}`
      );
      for (const step of q.numberedSteps) {
        assert(step.title.trim().length >= 3 && step.body.trim().length >= 15, `Thin step in ${q.id}: ${step.title}`);
      }
    } else {
      const partCount = (q.paragraphs?.length ?? 0) + (q.subboxes?.length ?? 0);
      const totalChars =
        (q.paragraphs ?? []).reduce((sum, p) => sum + p.body.trim().length, 0) +
        (q.subboxes ?? []).reduce((sum, b) => sum + b.content.trim().length, 0);
      assert(
        partCount >= 2 && totalChars >= 120,
        `Question ${q.id} (${q.difficulty}) lacks detailed multi-part answer (parts=${partCount}, chars=${totalChars})`
      );
    }

    if (!moduleCounts.has(q.moduleNumber)) {
      moduleCounts.set(q.moduleNumber, { basic: 0, intermediate: 0, advanced: 0, "senior-architect": 0 });
    }
    const tally = moduleCounts.get(q.moduleNumber);
    tally[q.difficulty] = (tally[q.difficulty] ?? 0) + 1;
  }

  for (const target of MODULE_INTERVIEW_TARGETS) {
    const actual = moduleCounts.get(target.moduleNumber) ?? {};
    for (const [level, goal] of Object.entries(target.targets)) {
      const count = actual[level] ?? 0;
      if (target.complete) {
        assert.equal(
          count,
          goal,
          `Module ${target.moduleNumber} is marked complete so ${level} questions must equal ${goal} (found ${count})`
        );
      } else {
        assert(count > 0, `In-progress Module ${target.moduleNumber} has 0 "${level}" questions`);
        assert(count <= goal, `Module ${target.moduleNumber} "${level}" exceeded target ${goal} (${count})`);
      }
    }
    console.log(
      `Module ${target.moduleNumber} IQ totals (${target.complete ? "complete" : "in-progress"}): ${JSON.stringify(actual)} vs target ${JSON.stringify(target.targets)}`
    );
  }

  // 5b. Verify Rule M3: TECHNICAL_REVIEW_LOG.md includes official https:// doc URLs for every written lesson
  const reviewLogText = fs.readFileSync(path.join(ROOT, "TECHNICAL_REVIEW_LOG.md"), "utf8");
  for (const lesson of handbookCatalog.lessons) {
    const tag = lesson.id.toUpperCase();
    const sectionRe = new RegExp(`^#{2,3}[^\\n]*${tag}[\\s\\S]*?(?=\\r?\\n#{2,3}\\s|(?![\\s\\S]))`, "gm");
    const matches = [...reviewLogText.matchAll(sectionRe)].map((m) => m[0]);
    assert(
      matches.some((sec) => /https:\/\/[^\s)]+/.test(sec)),
      `TECHNICAL_REVIEW_LOG.md lacks an official https:// documentation URL in a section for ${tag} (QUALITY_GATE.md Rule M3)`
    );
  }

  console.log(
    `Content, A-Q format, code & safety checks passed: ${handbookCatalog.lessons.length} lessons, ${totalTopicsVerified} mapped topics, ${totalCodeBlocksVerified} runnable blocks, ${totalSafetyMutationsVerified} safety mutation checks, ${handbookCatalog.allQuestions.length} interview Q&As.`
  );

  // 6. Browser SVG cut-off & mobile overflow checks
  await runBrowserLayoutAndSvgAudit(handbookCatalog.lessons);
} finally {
  await vite.close();
}
