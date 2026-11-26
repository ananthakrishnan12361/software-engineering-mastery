# Technical Review Log

## Purpose
Record important technical reviews, corrections, version-sensitive claims and unresolved questions in the handbook.

## Review entry template
For each review, add:

### YYYY-MM-DD — Topic or module
- **Reviewer/model:** 
- **Files/sections reviewed:**
- **Review scope:**
- **Findings:**
- **Corrections made:**
- **Unresolved questions:**
- **Sources checked:** Include official documentation links where applicable.
- **Status:** Pending / Corrected / Accepted with caveat

## Review principles
- Prioritize correctness of technical explanations, code samples, architecture trade-offs and security guidance.
- Check version-specific claims against official documentation when possible.
- Do not treat a model's confident answer as proof.
- Distinguish factual errors from alternative but valid design choices.
- Record material corrections; do not log every minor wording change.

## Review history

### 2026-11-26 — Initial Specification Reconciliation (Step 1)
- **Reviewer/model:** Gemini 4 Hydrogen (High)
- **Files/sections reviewed:** `COURSE_modeule_in_detiles.md`, `PROJECT_RULS.md`, `ANTIGRAVITY_MODEL_ROUTING.md`, `CONTENT_STANDARDS.md`, `COURSE_OUTLINE.md`, `PROJECT_STATUS.md`, `TECHNICAL_REVIEW_LOG.md`, `structure.md`
- **Review scope:** Cross-file consistency check before building portal foundation.
- **Findings:**
  1. `structure.md` listed 27 modules (`01`–`27`), omitting Module 28 (`Personal Learning Roadmap`) required by `COURSE_modeule_in_detiles.md` and `COURSE_OUTLINE.md`.
  2. `COURSE_modeule_in_detiles.md` asks for a single standalone `software_engineering_mastery.html` in the root, whereas `structure.md` specifies modular source files (`index.html`, `assets/`, `modules/`).
  3. `CONTENT_STANDARDS.md` lists lesson sections 1–15, whereas `COURSE_modeule_in_detiles.md` specifies sections A–Q plus Module 28's duration, objectives, task, and mastery assessment.
  4. `COURSE_modeule_in_detiles.md` Section 3 defines 4 interview difficulty levels (`Basic`, `Intermediate`, `Advanced`, `Senior/Architect`), whereas Module 26 specifies 5 (`Basic`, `Intermediate`, `Advanced`, `Senior`, `Architect`).
  5. Cross-module topic overlaps exist (e.g., `SOLID` in Modules 1 & 14; `Security` across Modules 2, 3, 10, 12, 13, 17, 18, 20, 21, and 23; `Testing` across Modules 2, 3, 14, and 24).
  6. `COURSE_OUTLINE.md` titles differ slightly from `COURSE_modeule_in_detiles.md` headings (e.g., Module 8 `Indexing and database internals` vs `Database Indexing — Deep Dive`).
- **Corrections made:** Applied user Step 2 decisions in `PROJECT_STATUS.md`, `COURSE_OUTLINE.md`, and `CONTENT_CHECKLIST.md`:
  - Added `modules/28-learning-roadmap.html`.
  - Adopted modular source files merged via `build.js` into `dist/software_engineering_mastery.html`.
  - Standardized lesson format to A–Q + Learning Objectives, Study Duration, and Mastery Assessment.
  - Standardized 4 difficulty levels everywhere except Module 26 (5 levels).
  - Reconciled module titles in `COURSE_OUTLINE.md` with `COURSE_modeule_in_detiles.md` and noted cross-module cross-referencing policy.
- **Unresolved questions:** None blocking.
- **Sources checked:** Local project specification files.
- **Status:** Corrected

### 2026-11-26 — Module 1 Part 1 (`M01-P1`) Technical & Version-Sensitive Notes
- **Reviewer/model:** Gemini 4 Hydrogen (High)
- **Files/sections reviewed:** `modules/01-programming.html` (Sections C, D, G, I, J, M/N, P)
- **Review scope:** Runtime behavior, ECMAScript vs. V8 engine specifics, and version-sensitive API claims.
- **Findings:**
  1. **V8 Engine Internals (Smi / Ignition / TurboFan / Hidden Classes):** Described explicitly as V8 implementation details, not ECMAScript specification guarantees (newer V8 releases also include baseline/mid-tier compilers Sparkplug and Maglev).
  2. **Proper Tail Calls (PTC):** Noted that while ES2015 specified PTC in strict mode, V8/Node.js and SpiderMonkey do not enable it in production, so iterative stacks are required to prevent stack overflow.
  3. **Call Stack Depth (~10k frames):** Varies by runtime, OS stack limit, and local variable count per frame; noted as approximate.
  4. **`JSON.parse` `context.source`:** Corrected initial draft reference from `ES2022+` to "newer V8/Node.js runtimes" since JSON.parse source text access is a post-ES2022 addition (ES2025 / recent V8/Node.js).
  5. **Falsy values count:** Fixed count mismatch in Sections G and L to state 8 core falsy values (`false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`) plus legacy browser `document.all`.
- **Corrections made:** Updated `modules/01-programming.html` Sections G, L, and P.
- **Unresolved questions:** None.
- **Sources checked:** ECMAScript specification concepts and runtime behavior verified via Node.js v20 execution where applicable.
- **Status:** Corrected

### 2026-11-26 — React 19 + Vite 8 + MDX + FSD v2.1 Migration
- **Reviewer/model:** Gemini 4 Hydrogen (High)
- **Files/sections reviewed:** `package.json`, `vite.config.ts`, `steiger.config.ts`, `src/**`, `content/**`, `scripts/**`
- **Review scope:** Package compatibility, FSD v2.1 Steiger enforcement, `sem_handbook_v1` compatibility, and `M01-P1` content parity.
- **Findings:**
  1. **Package Compatibility (Node v24.14.0, npm 11.9.0):** Verified against npm registry without `--force`, `--legacy-peer-deps`, or `overrides`: `vite@^8.3.8`, `@vitejs/plugin-react@^6.3.0`, `vite-plugin-singlefile@^2.3.4`, `@mdx-js/rollup@^3.1.1`, `@mdx-js/react@^3.1.1`, `remark-gfm@^4.0.1`, `react@^19.3.1`, `react-dom@^19.3.1`, `typescript@^7.0.2`, `steiger@^0.10.0`, `@feature-sliced/steiger-plugin@^0.8.2`.
  2. **Steiger FSD v2.1 Enforcement:** Initial slice split (`entities/lesson`, `entities/interview`, `shared/types`, `shared/styles` missing barrel) raised 4 Steiger errors (`insignificant-slice`, `public-api`, `segments-by-purpose`). Fixed structurally by consolidating single-use handbook UI/models into `pages/handbook/`, renaming `shared/types` to `shared/config`, and adding `shared/styles/index.ts`. Zero rules disabled.
  3. **Vite 8 `lightningcss` build transient:** One initial build invocation reported missing `lightningcss.win32-x64-msvc.node` despite the binary existing in `node_modules`; subsequent direct and `npm run check` builds succeeded cleanly in ~0.3s.
  4. **MDX / Content Parity Fix:** Converted HTML attributes (`class` -> `className`, SVG `font-size` -> `fontSize`, etc.) and escaped JSX braces inside SVG `<text>` and prose code blocks; preserved all 16 sections (`A`–`Q`), 5 objectives, 2 SVGs, 3 tables, 7 runnable demos, 14 interview Q&As, 14 glossary terms, 4 exercise cards, and 6 mastery items with zero prose truncation.
- **Corrections made:** Refactored FSD slices to pass `steiger ./src` with 0 issues; added `scripts/verify-parity.mjs` and `scripts/verify-offline.mjs`.
- **Unresolved questions:** Live interactive GUI clicks in a desktop browser remain for user verification before deleting `legacy/`.
- **Sources checked:** npm registry (`npm view`), Vite 8 / `@vitejs/plugin-react` / `vite-plugin-singlefile` / MDX v3 / `remark-gfm` / Steiger documentation.
- **Status:** Accepted with caveat
