---
name: handbook-next
description: Resume and advance the Software Engineering Mastery HTML Handbook one part at a time under QUALITY_GATE.md, CONTENT_STANDARDS.md, DESIGN_GUIDE.md, and PIPELINE_STATE.md.
---

# Handbook Next — Resumable Part-by-Part Authoring & Remediation Skill

Use this skill whenever the user asks to continue, fix, or write the next part of the Software Engineering Mastery HTML Handbook.

## Non-Negotiable Rules
- **Reuse existing quality infrastructure:** Reuse `QUALITY_GATE.md`, `npm run quality`, `scripts/verify-quality.mjs`, and `content/coverage/`. **Never recreate or weaken** any check, threshold, or rule.
- **Design lock:** Follow `DESIGN_GUIDE.md` strictly. Do not alter UI components, theme tokens, layout, or filters without explicit user approval.
- **No unauthorized deletions or pushes:** Never delete `legacy/` or other files without explicit approval. Commit only locally on branch `react-fsd` when Step 6 passes; **never push**.

---

## Start of Every Run
1. Read `PIPELINE_STATE.md`, `QUALITY_GATE.md`, `PROJECT_STATUS.md`, and run `git status`.
2. Check for any unfinished part or open remediation recorded in `PIPELINE_STATE.md`.
3. Resume at the saved step. Inspect partial files first (`content/modules/...`, `content/interviews/...`, `content/coverage/...`). Never duplicate completed work.
4. Read only the files needed for the current part (plus the relevant module section of `COURSE_modeule_in_detiles.md`, `CONTENT_CHECKLIST.md`, `CONTENT_STANDARDS.md`, and `DESIGN_GUIDE.md` as needed).

---

## Run Modes & Part Limit
- **Default (`/handbook-next`):** Complete **1 part** per run, then stop and report.
- **Explicit count (e.g., `2` or `3`):** Complete up to the requested count (max `3` unless `all` is specified).
- **Continuous mode (`/handbook-next all`):** Continue **part by part** in strict sequence until all pending work and course parts in `CONTENT_CHECKLIST.md` are complete, or a stop rule triggers.
  - Every single part MUST still execute all steps (`PLAN` -> `WRITE` -> `CHECK` -> `AUDIT` -> `UPDATE` -> `COMMIT`), save `PIPELINE_STATE.md` after every step/section, pass `npm run quality` and a fresh subagent audit, and create a separate local commit on `react-fsd`. **Never push.**

---

## Steps for Each Part

### Step 1 — PLAN
- Check `PIPELINE_STATE.md` first for any approved pending fixes (e.g., `M01-P1`/`M01-P2` open issues) before starting a new part.
- Otherwise, pick the next pending part from `CONTENT_CHECKLIST.md` and verify every required topic against `COURSE_modeule_in_detiles.md` (Section 4) and `content/syllabus.ts`.
- Split large parts into manageable sub-parts if needed (record any split rationale in `PIPELINE_STATE.md`).
- Update `PIPELINE_STATE.md` (`Step: PLAN` -> `WRITE`).

### Step 2 — WRITE
- Follow `COURSE_modeule_in_detiles.md` (master prompt), `CONTENT_STANDARDS.md`, `DESIGN_GUIDE.md`, and `QUALITY_GATE.md`:
  - All 16 `<TopicSection>` blocks in exact order `A` through `Q` (`A, B, C, D, E, F, G, H, I, J, K, L, M/N, O, P, Q`).
  - Explicit `<TopicAnchor id="..." />` immediately preceding a dedicated primary heading (`#### ...`) for every syllabus topic in the part.
  - Runnable `<CodeBlock lang="javascript" runnable>` examples with strict boundary validation and error handling.
  - Inline `<svg>` diagrams inside `<DiagramCard>` where helpful, with all text safely inside `viewBox` (no clipping or overlap).
  - Interview questions in `content/interviews/<lessonId>.questions.ts` (`basic`, `intermediate`, `advanced`, and 12-step `senior-architect`).
  - Typed coverage & safety mutation tests in `content/coverage/<lessonId>.coverage.ts` exported via `content/coverage/index.ts`.
  - Wire lesson, objectives, duration, mastery items, and syllabus anchors in `content/registry.ts` and `content/syllabus.ts`.
- **Save section by section** (e.g., A–C, D–H, I–L, O–Q, interviews, coverage/wiring) and update `PIPELINE_STATE.md` after **every saved section**.

### Step 3 — CHECK
- Run `npm run quality`.
- Fix any failures and rerun, up to **3 rounds** max.
- Note: Watch for any script caveats recorded in `PIPELINE_STATE.md` (such as SVG `getBBox()` verification or `verify-parity.mjs` constraints on `M01-P1`).
- Update `PIPELINE_STATE.md` with exact command output and counts.

### Step 4 — AUDIT
- Launch a **fresh subagent** (`invoke_subagent`) acting as a **strict reviewer**. **Do not trust earlier reports** or self-checks.
- Review the current part's lesson content, code examples, interview questions, and tests/coverage against `COURSE_modeule_in_detiles.md` (master prompt) and `QUALITY_GATE.md` (Rules `M1`–`M4`):
  - Technical accuracy, version-specific claims, and official `https://` documentation links (`M3`)
  - Bugs and edge cases in every runnable code snippet (`null`, `undefined`, `NaN`, `Infinity`, negatives, empty strings, prototype pollution, overflow, cycles)
  - Topic depth, missing topics/subtopics, and prose-vs-code fidelity (`M1`, `M2`)
  - Interview question rigor (non-duplicate, deep reasoning, 12 steps for `senior-architect`)
  - Weak tests or ineffective `safetyMutations`
  - Visual/SVG clipping and false claims in logs/status (`M4`)
- **Boundary rule:** If a bug is in shared UI code (`src/`) or an unrelated lesson, **do not change it**—report it to the user, ask before changing it, save `PIPELINE_STATE.md`, and **STOP** if unresolved.
- If a subagent is unavailable (tool/quota/environment block), perform a strict self-review, explicitly label it **`"not independently audited"`**, save `PIPELINE_STATE.md`, and **STOP** (do not commit).
- Update `PIPELINE_STATE.md` with the exact audit findings.

### Step 5 — UPDATE
- Fix confirmed problems in the **current part's** lesson, code examples, interview questions, tests/coverage, and directly related files (`content/registry.ts`, `content/syllabus.ts`). Add a test assertion or `safetyMutation` check for each fixed problem where possible.
- If a confirmed bug is in shared UI code (`src/`) or an unrelated lesson, report it and ask the user before changing it; save `PIPELINE_STATE.md` and **STOP**.
- Rerun `npm run quality`, then **audit again with a fresh reviewer subagent** (repeating the fix -> check -> fresh-audit loop up to **3 rounds** max).
- Once `npm run quality` and the fresh audit **PASS** with zero important unverified items, update `TECHNICAL_REVIEW_LOG.md` (with `https://` official doc URLs), `QUALITY_GATE.md` (Audit Record), `CONTENT_CHECKLIST.md`, `PROJECT_STATUS.md`, and `PIPELINE_STATE.md`.
- If problems remain after 3 rounds or an important item stays unverified, save `PIPELINE_STATE.md` and **STOP**.

### Step 6 — COMMIT
- Commit **only** after a `PASS` from both `npm run quality` and the fresh reviewer audit with **no important unverified item**. Otherwise save `PIPELINE_STATE.md` and **STOP**.
- Commit relevant changed files locally on branch `react-fsd` with a clear commit message. **Never push.**
- Update `PIPELINE_STATE.md` marking the part complete and recording the next pending part.

---

## State Discipline (`PIPELINE_STATE.md`)
Quota can end without warning. Update `PIPELINE_STATE.md` after **every step and every saved section** with:
- Current part
- Current step (`PLAN | WRITE | CHECK | AUDIT | UPDATE | COMMIT | DONE`)
- Completed sections
- Files changed
- Command & audit results
- Unresolved items
- Exact next action

---

## Limits & Stop Conditions
- **Part limit:** Default **1 part per run**; up to **3 parts** if requested; **`/handbook-next all`** loops part by part until the course is complete or any stop rule below applies (never skipping checks, audit, state saving, or per-part local commits, and **never pushing**).
- **Stop immediately** on:
  - Repeated failure (more than 3 check/fix rounds)
  - A failed or unavailable audit (`"not independently audited"` cannot be committed)
  - Any tool or quota error
  - Any need to change `DESIGN_GUIDE.md`, delete files, weaken checks, or edit unrelated lessons without approval
- **Never claim to know remaining quota.**
- **Final report format:** Always end with:
  1. Parts done
  2. `PASS` or `FAIL`
  3. Unverified items
  4. Next action
