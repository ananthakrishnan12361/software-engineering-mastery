# Quality Gate — Software Engineering Mastery Handbook

Every module part must pass **`npm run quality`** plus the Manual Review Audit below before being marked complete in `CONTENT_CHECKLIST.md` or `PROJECT_STATUS.md`.

```bash
npm run quality
```

`npm run quality` executes the full unified pipeline cleanly on every lesson:
1. `npm run typecheck` (`tsc --noEmit`)
2. `npm run build` (`vite build` -> single offline `dist/software_engineering_mastery.html`)
3. `npm run lint:fsd` (`steiger ./src` Feature-Sliced Design v2.1 boundary check)
4. `npm run verify:syllabus` (28 modules, explicit `<TopicAnchor>` links for all available topics)
5. `npm run verify:parity` (`M01-P1` 100% content parity against `legacy/`)
6. `npm run verify:offline` (zero external CDNs, `sem_handbook_v1` compatibility, hash routes & filters)
7. `npm run verify:quality` (`scripts/verify-quality.mjs` — unified per-part coverage, A–Q teaching format, runnable code assertions, safety mutation checks, interview integrity, placeholder scan, SVG cut-off & mobile overflow checks)

---

## 1. Per-Part Coverage Contract (`content/coverage/`)

Every written lesson part in `content/registry.ts` MUST have a typed coverage file `content/coverage/<lessonId>.coverage.ts` exported through `content/coverage/index.ts`.

### Required Per-Topic Mapping (`TopicCoverageEntry`)
Every syllabus topic assigned to the lesson part MUST match `COURSE_modeule_in_detiles.md` (Section 4) and map to:
- `topicTitle`: exact topic name from `COURSE_modeule_in_detiles.md` and `content/syllabus.ts`.
- `anchorId`: explicit `<TopicAnchor id="..." />` present in the MDX lesson.
- `explanationHeadings`: one or more real Markdown headings (`#### ...`) in the MDX file containing substantive multi-block prose (`>= 55` words and `>= 2` non-trivial blocks — **an anchor alone, empty heading, or single bullet never counts as coverage**).
- `exampleTitles` **or** `noCodeReason`: exact heading/exercise title in the MDX containing a `<CodeBlock runnable>`, or an explicit technical justification (`>= 25` chars) if runnable code is unsuitable for that topic.
- `interviewQuestionIds`: one or more valid IDs in `content/interviews/<lessonId>.questions.ts`.
- `exerciseTitles`: one or more valid `<ExerciseCard title="..."` titles in the lesson MDX.

---

## 2. Automated Checks (`scripts/verify-quality.mjs`)

The automated gate **fails immediately** on any violation below:

1. **Missing Topics, Anchors, or Coverage Items:**
   - Written lesson lacks a `.coverage.ts` entry in `content/coverage/index.ts`.
   - Active module's syllabus drops any topic required by `COURSE_modeule_in_detiles.md`.
   - Any topic assigned to the lesson in `content/syllabus.ts` is missing from `coverage.topics`.
   - Any mapped `anchorId`, `explanationHeading`, runnable `exampleTitle`, `interviewQuestionId`, or `exerciseTitle` does not exist in the actual MDX / question bank files, or fails non-stub depth checks.
2. **Sections A–Q Teaching Format Verification:**
   - Every lesson must define `>= 3` Learning Objectives, Study Duration, `>= 3` Mastery Assessment items, and all 16 `<TopicSection>` letters in exact order `A, B, C, D, E, F, G, H, I, J, K, L, M/N, O, P, Q`.
   - Verifies Section `A` covers *what/why/where*, Section `C` includes an architecture diagram or deep-dive, `D` has runnable examples, `E` has `>= 3` walkthrough steps, `F` has `>= 2` real-world scenarios, `G`/`H` have `>= 2` mistakes/best practices, `I`/`J` cover performance and security, `K` includes a comparison table, `L` has `>= 2` memory tips, `M/N` mounts `<InterviewSection />`, `O` has `>= 2` exercises, `P` has challenge `<Callout>` + `<ExerciseCard>`, and `Q` has `>= 2` takeaways.
3. **Code Examples, Invalid Inputs & Safety Mutation Tests (`codeTests`):**
   - Count of `codeTests` entries must match the exact count of `<CodeBlock runnable>` blocks in the MDX.
   - Each snippet runs under `"use strict"` (`new Function`) asserting stdout lines, valid inputs, and invalid/boundary inputs (`TypeError`, `RangeError`, prototype-pollution JSON, non-integer cents, etc.).
   - Security/validation examples include `safetyMutations`: each strips the guard from the extracted MDX snippet and **asserts that the protection test now fails/throws**. If a test still passes without the guard, the quality gate fails.
4. **Interview Question Integrity & Module Totals:**
   - Zero duplicate question IDs or normalized duplicate prompts across the handbook.
   - `basic` / `intermediate` / `advanced` answers require multi-part detail (`>= 2` paragraphs/subboxes and `>= 120` chars).
   - `senior-architect` (and Module 26 `senior`/`architect`) answers require all `12` structured steps (`numberedSteps.length === 12`).
   - Completed modules must meet target counts (`10 Basic, 10 Intermediate, 10 Advanced, 5 Senior/Architect`, or documented Module 26 split); in-progress modules must cover all 4 active levels and track exact progress toward targets.
5. **Placeholders, SVG Cut-Off Text & Mobile Overflow:**
   - Scans `content/` for placeholder strings (`TODO`, `TBD`, `FIXME`, `lorem ipsum`, `coming soon`, `[insert ...]`, `placeholder content`, `to be written`).
   - Opens built `dist/software_engineering_mastery.html` in headless Chrome across every written lesson (with all sections expanded), checking:
     - SVG `<text>` bounding boxes (`getBBox()`) fit cleanly inside each `<svg>` `viewBox` (zero cut-off text) and SVGs do not overflow `.diagram-card`.
     - Live `Run Demo` executes cleanly in DOM.
     - Zero horizontal page overflow (`document.documentElement.scrollWidth <= window.innerWidth`) at `360x740`, `390x844`, and `1440x900`.

---

## 3. Manual Review Rules (Record `PASS` or `FAIL` with `file:line`)

Automated scripts cannot replace engineering judgment on prose, semantics, or external docs. Every lesson review MUST record `PASS` or `FAIL` with exact file and line citations for all four rules:

- **M1 (Clarity, Depth & Consistency):** Explanations use simple English, progress cleanly from fundamentals to internals and trade-offs, and never contradict other sections or code.
- **M2 (Prose-Code Promise Fidelity):** Claims made in text (immutability, validation, `O(n)` behavior, `#private` isolation, pollution defense) match what the lesson's code actually implements.
- **M3 (Version-Specific Documentation Links):** Every version-specific feature, runtime version, or engine claim cites an official documentation URL (`https://...`) in `TECHNICAL_REVIEW_LOG.md`.
- **M4 (Report Integrity):** Every file path, symbol name, count, and check result claimed in status updates exists verbatim in files and tool output.

### Audit Record (`M01-P1` & `M01-P2` — Both Remediated & Audited 2026-11-26)

| Rule | Scope | Status | Evidence (`file:line`) & Findings |
|---|---|---|---|
| **M1** | `M01-P1` explanations & depth | **PASS** | `content/modules/01-programming/m01-p1.mdx:23-66,69-153` — All 4 topics (`Programming fundamentals` incl. Control Flow, `Variables`, `Data types`, `Functions`) include dedicated headings, multi-sentence intuition, memory/IEEE-754 internals + SVGs (`viewBox="0 0 820 310"` and `"0 0 820 190"`), and consistent trade-offs. |
| **M1** | `M01-P2` all 9 topics (`Objects`..`SOLID`) | **PASS** | `content/modules/01-programming/m01-p2.mdx:31-108,359-496,569-609` — All 9 topics have dedicated Section B subsections beneath `<TopicAnchor>`, `WeakMap`/`WeakSet` (`Example 6`), Shallow vs. Deep Copying table, `Example 4` Inheritance (`extends`/`super`/`instanceof`), and `Example 5` (`SRP` + `ISP`). |
| **M2** | `M01-P1` prose vs. code fidelity | **PASS** | `content/modules/01-programming/m01-p1.mdx:155-278,310-352,442-604` — TDZ `ReferenceError`, `0.1+0.2`, `BigInt`, integer cents, pass-by-sharing mutations, `calculateLineTotalCents`/`createTaxCalculator` finite `0..1` + overflow/`-0` guards, strict plain-object `parseQueryFlags`, `splitAmountCents` `-0`/`parts` cap, `flattenIterative` `maxDepth` + ancestor cycle `Set`, and hardened `composeValidators`/`normalizeSignup` match prose promises. |
| **M2** | `M01-P2` prose vs. code fidelity & edge cases | **PASS** | `content/modules/01-programming/m01-p2.mdx:228-496,635-754` — Pre-charge validation in `CheckoutService.pay`, `MAX_SAFE_INTEGER` overflow check in `LedgerAccount`, `isPlainObject` + `merged.isAdmin` check in `safeMerge`, non-negative integer `limit` in `topPaidOrders`, `WeakMap`/`WeakSet` object guards, and `subtotalCents`/LSP (`0 <= finalCents <= subtotalCents`) checks in `PriceCalculator`. |
| **M3** | `M01-P1` & `M01-P2` official version links | **PASS** | `TECHNICAL_REVIEW_LOG.md:62-74,109-141` — Full `https://` official documentation URLs recorded for `JSON.parse` `context.source`, `BigInt`, `Symbol`, `let`/`const`/TDZ, `Number.isSafeInteger`, `Object.is`, `Object.hasOwn`, `toSorted`/`toSpliced`/`with`/`sort`, `structuredClone`, `WeakMap`/`WeakSet`, ECMA-262 Tail Position Calls, `#private`, and V8 JIT/Elements Kinds. |
| **M4** | `M01-P1` & `M01-P2` inventory & report integrity | **PASS** | `CONTENT_CHECKLIST.md:27-50`, `content/syllabus.ts:69-134`, `content/registry.ts:120-253`, `content/interviews/m01-p1.questions.ts`, `content/interviews/m01-p2.questions.ts` — 13 available topics, 23 interview Q&As (`7/7/6/3`), 4 SVG diagrams (live Chrome `getBBox()` verified), 16 runnable blocks, and 27 safety mutations verified. |

---

## 4. What Cannot Be Automated

Automated checks catch structural, syntactic, geometric, and encoded-assertion regressions, **not** every form of quality failure. The manual audit remains mandatory for:
1. **Intuition & Simple English Quality (Rule M1):** Word/block counters prove text exists, not that an explanation is clear, well-paced, or free of unexplained jargon.
2. **Conceptual Prose-vs-Code Alignment (Rule M2):** Computers run the assertions engineers encode; they cannot judge whether a prose claim outside assertions matches a code subtlety or diagram label.
3. **External Version Fact-Checking (Rule M3):** Static checks cannot verify whether an author's summary of Node.js release notes or ECMA-262 semantics matches official upstream documentation.
4. **Architectural Reasoning Depth:** Checking `numberedSteps.length === 12` cannot grade whether a Senior/Architect answer addresses genuine failure modes cleanly.
5. **Semantic Topic-to-Exercise Alignment:** Verification confirms a mapped `exerciseTitle` exists in MDX, not that the exercise pedagogically practices that specific topic rather than a neighbor topic.
6. **Aesthetic Readability & Overlap Nuance:** SVG `getBBox()` catches `<text>` clipping outside `viewBox` and DOM `scrollWidth` catches horizontal overflow, while visual hierarchy and spacing clarity still benefit from human visual inspection.
