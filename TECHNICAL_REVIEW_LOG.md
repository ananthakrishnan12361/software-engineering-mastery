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
- **Files/sections reviewed:** `content/modules/01-programming/m01-p1.mdx` (Sections A–Q), `content/interviews/m01-p1.questions.ts`, `content/coverage/m01-p1.coverage.ts`
- **Review scope:** Runtime behavior, ECMAScript vs. V8 engine specifics, code edge cases, and version-sensitive API claims.
- **Findings:**
  1. **V8 Engine Internals (Smi / Ignition / TurboFan / Sparkplug / Maglev / Hidden Classes):** Described explicitly as V8 implementation details, not ECMAScript specification guarantees.
  2. **Proper Tail Calls (PTC):** Noted that while ES2015 specified PTC in strict mode, V8/Node.js and SpiderMonkey do not enable it in production, so iterative stacks are required to prevent stack overflow.
  3. **Call Stack Depth (~10k frames):** Varies by runtime, OS stack limit, and local variable count per frame; noted as approximate.
  4. **`JSON.parse` `context.source`:** Corrected initial draft reference from `ES2022+` to "newer V8/Node.js runtimes" since JSON.parse source text access is a post-ES2022 addition.
  5. **Falsy values count:** Fixed count mismatch in Sections G and L to state 8 core falsy values (`false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`) plus legacy browser `document.all`.
  6. **M01-P1 Remediation Pass (2026-11-26):** Fixed Figure 1.2 SVG text overflow (`viewBox="0 0 820 190"`), expanded Section B #1 with Control Flow (`if/else`, `switch`, loops, `break`/`continue`, early returns, `try/catch/finally`), tightened input/range/overflow/`-0`/cycle validation in `calculateLineTotalCents`, `createTaxCalculator`, `parseQueryFlags`, `splitAmountCents`, `flattenIterative`, and `composeValidators`/`normalizeSignup`, and expanded `m01-p1.coverage.ts` tests and safety mutations.
- **Corrections made:** Updated `content/modules/01-programming/m01-p1.mdx`, `content/coverage/m01-p1.coverage.ts`, and `scripts/verify-quality.mjs`.
- **Unresolved questions:** None.
- **Sources checked:**
  - `JSON.parse()` `reviver` `context.source`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
  - `BigInt` (ES2020): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
  - `Symbol` (ES2015): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
  - `let` & `const` / Temporal Dead Zone (ES2015): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
  - `Number.isSafeInteger` / `MAX_SAFE_INTEGER` (ES2015): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger
  - `Object.is` (ES2015): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
  - `Object.hasOwn` (ES2022): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn
  - `Array.prototype.toSorted` (ES2023): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted
  - `structuredClone` (Node.js v17+): https://nodejs.org/api/globals.html#structuredclonevalue-options
  - ECMAScript Tail Position Calls (ES2015+): https://262.ecma-international.org
  - V8 JIT Pipeline (Ignition / Sparkplug / Maglev / TurboFan) & Elements Kinds: https://v8.dev/blog and https://v8.dev/blog/elements-kinds
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

### 2026-11-26 — Phase 3 UI Redesign, 28-Module Syllabus Audit & Multi-Viewport Checks
- **Reviewer/model:** Gemini 4 Hydrogen (High)
- **Files/sections reviewed:** `content/syllabus.ts`, `content/registry.ts`, `src/shared/styles/*`, `src/app/*`, `src/pages/*`, `src/entities/*`, `scripts/*`
- **Review scope:** Syllabus separation (real topics vs. instruction bullets), explicit topic anchors, filter & search rules, Steiger FSD rules, contrast tokens, and 5-width x 3-theme Chrome rendering.
- **Findings:**
  1. **Syllabus Duplicate & Instruction Audit (`COURSE_modeule_in_detiles.md`):**
     - Module 5 lists `Transactions` twice (lines 467 and 492); `content/syllabus.ts` keeps 46 unique topics.
     - Module 19 lists `Vector storage` twice (lines 1179 and 1192); `content/syllabus.ts` keeps 27 unique topics and places the 6 generic evaluation criteria (`When to choose each`, `Cost`, `Scaling`, `Complexity`, `Performance`, `Trade-offs`) in module notes.
     - Modules 8, 15, 25, 26, 27, 28 instruction bullets (`Compare...`, `For every design, explain...`, `For each project, include...`, `For every topic include...`, `For every lesson...`, study-time constraints, difficulty level lists) were separated into `module.notes` rather than fake topic entries.
  2. **Steiger Rule (`fsd/no-ui-in-app`):** Initial `src/app/ui/` directory triggered `fsd/no-ui-in-app`; moved `AppShell.tsx` and `SearchOverlay.tsx` to `src/app/`. `steiger ./src` passes with 0 errors and 0 disabled rules.
  3. **360px Header & Badge Wrapping Polish:** Visual screenshot inspection of `lesson-360-light.png` and `interviews-1440-sepia.png` caught slight topbar crowding at `360px` and wrapping inside `Senior / Architect` pill badges. Fixed via `@media (max-width: 440px)` compact theme icon + `white-space: nowrap` on `.badge`.
- **Corrections made:** Updated `global.css`, `AppShell.tsx`, `content/syllabus.ts`, and verification scripts.
- **Unresolved questions:** None blocking; manual mouse/keyboard feel across physical mobile devices remains for user inspection.
- **Sources checked:** `COURSE_modeule_in_detiles.md`, headless Chrome screenshots across 360/390/768/1024/1440px in Light/Dark/Sepia.
- **Status:** Corrected


---

## Module 01 Part 2 (`M01-P2`) Technical Review Log — 2026-11-26

1. **ES2022 `#private` Class Fields & Methods**
   - **Verified Claim:** JavaScript native `#private` class fields/methods are strictly scoped to the declaring class body (`SyntaxError` at parse time if accessed outside or from subclasses), providing hard runtime encapsulation rather than TypeScript compile-time-only `private`.
   - **Official Reference:** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_elements
   - **Status:** Verified

2. **`Object.hasOwn()` (ES2022) vs. `Object.prototype.hasOwnProperty()`**
   - **Verified Claim:** `Object.hasOwn(obj, prop)` works safely on `Object.create(null)` dictionaries (which lack `Object.prototype`) and objects with shadowed `hasOwnProperty` properties; throws `TypeError` if `obj` is `null` or `undefined`.
   - **Official Reference:** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn
   - **Status:** Verified

3. **`Array.prototype.toSorted()`, `toReversed()`, `toSpliced()`, `with()` (ES2023) + Array `sort()` Stability (ES2019)**
   - **Verified Claim:** ES2023 `toSorted()`, `toReversed()`, `toSpliced()`, and `with()` return new copies without mutating the source array; `Array.prototype.sort()` is guaranteed stable since ES2019 (ECMA-262).
   - **Official References:** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/with, and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
   - **Status:** Verified

4. **`structuredClone()` Deep Cloning**
   - **Verified Claim:** Standardized global `structuredClone()` is available in Node.js since `v17.0.0` and modern browsers; preserves cycles/Dates/Maps/Sets while throwing `DataCloneError` (`DOMException`) for functions/symbols/DOM nodes.
   - **Official References:** https://nodejs.org/api/globals.html#structuredclonevalue-options and https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone
   - **Status:** Verified

5. **V8 Hidden Classes (Maps) & Elements Kinds**
   - **Verified Claim:** V8 optimizes objects via shared Hidden Classes (property insertion order) and transitions array elements kinds along a one-way lattice (`PACKED_SMI_ELEMENTS` -> `PACKED_DOUBLE_ELEMENTS` -> `PACKED_ELEMENTS` and `HOLEY_*` variants); holey arrays incur prototype chain checks on `undefined`/missing slots. Explicitly documented in `M01-P2` as V8 engine behavior rather than ECMAScript language semantics.
   - **Official Reference:** https://v8.dev/blog/elements-kinds
   - **Status:** Verified

6. **`WeakMap` & `WeakSet` (ES2015 + ES2023 Non-Registered `Symbol` Keys)**
   - **Verified Claim:** `WeakMap` and `WeakSet` hold weak references to object keys (and non-registered `Symbol`s since ES2023), allowing Garbage Collection when no other strong references remain, and are intentionally non-enumerable (no `.size` or iteration).
   - **Official References:** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet
   - **Status:** Verified

### 2026-11-26 — Strict Audit & Edge-Case Remediation of `M01-P2`
- **Reviewer/model:** Gemini 4 Hydrogen (High)
- **Files/sections reviewed:** `content/modules/01-programming/m01-p2.mdx`, `content/interviews/m01-p2.questions.ts`, `content/coverage/m01-p2.coverage.ts`, `scripts/verify-quality.mjs`, `QUALITY_GATE.md`, `TECHNICAL_REVIEW_LOG.md`
- **Review scope:** Full audit against `COURSE_modeule_in_detiles.md` and `QUALITY_GATE.md`, edge-case fuzzing of runnable snippets, interview question rigor, and verification script false-positive hunting.
- **Findings:**
  1. **OOP Subtopic Stubs & Missing Inheritance Code (`M1`):** Section B placed `<TopicAnchor>` over 1-bullet items under `4. OOP`, `3. Classes` was a 1-sentence stub, `1. Objects` promised "Property Descriptors" without explaining them, and `Inheritance` mapped to `Example 3` which had zero `extends`/`super`.
  2. **Edge-Case Bugs in `M01-P2` Code:** `CheckoutService.pay(acct, -500)` charged the gateway before `account.deposit()` rejected negative cents; `LedgerAccount.deposit()` allowed silent `MAX_SAFE_INTEGER` overflow; `safeMerge` accepted strings/arrays/`null` `base` and copied forbidden keys from `base`; `topPaidOrders(orders, -1)` returned `slice(0, -1)` items; `PriceCalculator.apply("PCT10", -500)` returned `-450`.
  3. **Weak Quality Gate Checks:** `scripts/verify-quality.mjs` checked `.demo-error` instead of `.demo-output.is-error`, only clicked Block 1 in DOM, didn't open `<ExerciseCard>` solutions in Chrome, allowed shared primary headings across topics, and didn't verify Rule M3 `https://` doc links.
  4. **Interview Question Gaps & M3 URLs:** `m01-p2-iq-4` follow-up was vague about comparator failure (`Infinity - Infinity === NaN`), `iq-7` Step 8 omitted explicit `__proto__`/`constructor`/`prototype` blocklist alongside `Object.hasOwn`, and `Classes` / `Composition vs. Inheritance & LSP` lacked dedicated Basic/Intermediate questions.
- **Corrections made:** Expanded all 9 topics in `m01-p2.mdx` Section B into standalone subsections, added `Example 4` (`AppError` -> `RateLimitError` with `extends`/`super`/`instanceof`), `Example 5` (SRP + ISP), `Example 6` (`WeakMap`/`WeakSet`), Shallow vs. Deep Copying table, fixed `safeMerge` (`isPlainObject` + inline check) & `PriceCalculator.apply` (`finalCents <= subtotalCents`), added `iq-8` & `iq-9`, tightened `m01-p2.coverage.ts` (9 runnable blocks, 13 safety mutations) + `scripts/verify-quality.mjs`, and added full `https://` official documentation links above.
- **Status:** Corrected


---

## Module 01 Part 3 (`M01-P3`) Technical Review Log — 2026-11-26

1. **ES2019 `Array.prototype.sort()` Stability, ES2023 `toSorted()`, & Timsort in V8**
   - **Verified Claim:** `Array.prototype.sort()` is guaranteed stable in ECMAScript since ES2019, `Array.prototype.toSorted()` (ES2023) returns a sorted copy without mutating the source array, and V8 implements Timsort (`O(n log n)` worst-case, `O(n)` on nearly sorted runs).
   - **Official References:** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted, and https://v8.dev/blog/array-sort
   - **Status:** Verified

2. **`Map` & `Set` Insertion-Order & Average `O(1)` Lookup**
   - **Verified Claim:** ECMAScript `Map` and `Set` preserve insertion order and are specified to run in sublinear time on average (implemented via hash tables such as V8's `OrderedHashTable`).
   - **Official References:** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
   - **Status:** Verified

3. **ECMAScript Tail Position Calls vs. V8 Stack Limits**
   - **Verified Claim:** Although ES2015 specified Proper Tail Calls in strict mode, V8/Node.js does not enable TCO in production; deep graph/tree traversals require explicit heap-allocated stacks/queues to avoid `RangeError: Maximum call stack size exceeded`.
   - **Official Reference:** https://tc39.es/ecma262/#sec-tail-position-calls
   - **Status:** Verified


---

## Module 01 Part 4 (`M01-P4`) Technical Review Log — 2026-11-26

1. **Event Loop, Microtasks & `queueMicrotask`**
   - **Verified Claim:** Microtasks (`Promise.then/.catch/.finally`, `await` continuations, `queueMicrotask`) drain completely after each synchronous task and macrotask before the next macrotask or render.
   - **Official References:** https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide and https://developer.mozilla.org/en-US/docs/Web/API/Window/queueMicrotask
   - **Status:** Verified

2. **`Promise.allSettled` (ES2020) & `Promise.any` (ES2021)**
   - **Verified Claim:** `Promise.allSettled` waits for all promises to settle without short-circuiting; `Promise.any` resolves on the first fulfillment or rejects with `AggregateError` if all reject.
   - **Official References:** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any
   - **Status:** Verified

3. **V8 Orinoco Garbage Collector (Reachability & Generational Heaps)**
   - **Verified Claim:** V8 uses reachability-based Mark-and-Sweep (collecting isolated reference cycles) across Young Generation (Scavenger) and Old Generation (Mark-Sweep-Compact) heaps.
   - **Official Reference:** https://v8.dev/blog/trash-talk
   - **Status:** Verified

4. **`AbortSignal.timeout()` & Node.js `perf_hooks.monitorEventLoopDelay()`**
   - **Verified Claim:** `AbortSignal.timeout(ms)` creates an automatically aborting signal after `ms` milliseconds for bounding outbound I/O; `perf_hooks.monitorEventLoopDelay()` tracks Node.js Event Loop lag percentiles.
   - **Official References:** https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout_static and https://nodejs.org/api/perf_hooks.html#perf_hooksmonitoreventloopdelayoptions
   - **Status:** Verified


---

## Module 01 Part 5 (`M01-P5`) Technical Review Log — 2026-11-26

1. **TypeScript Structural Typing, Generics, Narrowing, `strict` Mode & `interface` vs `type`**
   - **Verified Claim:** TypeScript uses structural type compatibility, erases type annotations during compilation to JS, narrows `unknown` via control-flow guards, enforces exhaustiveness via `never`, and enforces `strictNullChecks`/`noImplicitAny`/`strictFunctionTypes` under `"strict": true`.
   - **Official References:** https://www.typescriptlang.org/docs/handbook/type-compatibility.html, https://www.typescriptlang.org/docs/handbook/2/generics.html, https://www.typescriptlang.org/docs/handbook/2/narrowing.html, https://www.typescriptlang.org/docs/handbook/2/everyday-types.html, and https://www.typescriptlang.org/tsconfig/#strict
   - **Status:** Verified


---

## Module 02 Part 1 (`M02-P1`) Technical Review Log — 2026-11-26

1. **React Render & Commit, State as a Snapshot, Automatic Batching, Reconciliation Keys, Concurrent Rendering & JSX**
   - **Verified Claim:** React separates pure Render from DOM Commit, compares state updates with `Object.is`, batches state updates automatically in React 18+ (`flushSync` opts out), supports concurrent `startTransition` & `<StrictMode>` dev checks, escapes JSX text automatically (unlike `dangerouslySetInnerHTML`), and uses `key` + `type` for list reconciliation.
   - **Official References:** https://react.dev/learn/render-and-commit, https://react.dev/learn/state-as-a-snapshot, https://react.dev/learn/queueing-a-series-of-state-updates, https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key, https://react.dev/blog/2022/03/29/react-v18#new-feature-automatic-batching, https://react.dev/reference/react-dom/flushSync, https://react.dev/reference/react/StrictMode, https://react.dev/reference/react/startTransition, https://react.dev/learn/writing-markup-with-jsx, and https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html
   - **Status:** Verified


---

## Module 02 Part 2 (`M02-P2`) Technical Review Log — 2026-11-26

1. **React Rules of Hooks, Built-in Hooks & `React.memo`**
   - **Verified Claim:** Hooks must be called unconditionally at the top level (`rules-of-hooks`); `useEffect` runs post-commit with cleanup before re-runs/unmount; `useMemo`/`useCallback`/`React.memo` rely on `Object.is` shallow reference checks.
   - **Official References:** https://react.dev/reference/rules/rules-of-hooks, https://react.dev/reference/react/useState, https://react.dev/reference/react/useEffect, https://react.dev/reference/react/useRef, https://react.dev/reference/react/useContext, https://react.dev/reference/react/useMemo, https://react.dev/reference/react/useCallback, https://react.dev/reference/react/memo, and https://react.dev/learn/reusing-logic-with-custom-hooks
   - **Status:** Verified

---

### Module 02 Part 3 (M02-P3) Technical Review Log — 2026-11-26

- **Scope:** State management, Context API, Redux, Redux Toolkit, React Query / TanStack Query, React Router, Forms, Validation, API integration, Authentication, Authorization.
- **Official Documentation Verified (`M3`):**
  - React Context (`createContext`, `useContext`, React 19 `<Context value={...}>`): `https://react.dev/reference/react/createContext` and `https://react.dev/learn/passing-data-deeply-with-context`
  - Redux & Redux Toolkit (`createSlice`, `configureStore`, Immer immutable updates): `https://redux-toolkit.js.org/api/createSlice` and `https://redux-toolkit.js.org/usage/immer-reducers`
  - TanStack Query (`useQuery`, `staleTime`, `gcTime`, request deduplication, `invalidateQueries`): `https://tanstack.com/query/latest/docs/framework/react/guides/caching`
  - React Router (Routes, `<Outlet />`, `useSearchParams`, `<Navigate>`): `https://reactrouter.com/start/library/routing`
  - OWASP Frontend Auth / Token Storage & Open Redirect Prevention: `https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html`
- **Verification Scope:** `npm run quality` + fresh Round 1/2 `research` subagent audit covering `m02-p3.mdx`, `m02-p3.questions.ts`, and `m02-p3.coverage.ts`.

---

### Module 02 Part 4 (M02-P4) Technical Review Log — 2026-11-26

- **Scope:** Error boundaries, Lazy loading, Code splitting, Performance optimization, Rendering optimization, Memoization, Frontend caching, Accessibility, Responsive design, Security, XSS, CSRF, Large frontend architecture, Component design patterns, Testing, Unit testing, Integration testing, Frontend debugging.
- **Official Documentation Verified (`M3`):**
  - React Error Boundaries (`getDerivedStateFromError`, `componentDidCatch`), React Compiler (React 19) & `lazy` + `Suspense`: `https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary`, `https://react.dev/learn/react-compiler`, and `https://react.dev/reference/react/lazy`
  - Core Web Vitals (`LCP`, `INP`, `CLS`): `https://web.dev/articles/vitals`
  - WAI-ARIA / WCAG 2.2 Accessibility & Semantic HTML: `https://www.w3.org/WAI/standards-guidelines/wcag/`
  - OWASP XSS Prevention & CSRF Prevention Cheat Sheets: `https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html` and `https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html`
  - Feature-Sliced Design (FSD v2.1) & React Testing Library: `https://feature-sliced.design/docs/get-started/overview` and `https://testing-library.com/docs/react-testing-library/intro/`
- **Verification Scope:** `npm run quality` + fresh `research` subagent audit covering `m02-p4.mdx`, `m02-p4.questions.ts`, and `m02-p4.coverage.ts`.

---

### Module 03 Part 1 (M03-P1) Technical Review Log — 2026-11-26

- **Scope:** Node.js architecture, V8, libuv, Event loop, Thread pool, Worker threads, Process vs thread, Async I/O, Streams, Buffers, File handling.
- **Official Documentation Verified (`M3`):**
  - Node.js Event Loop, Timers & `process.nextTick()`: `https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick`
  - Node.js Don't Block the Event Loop (Worker Pool & Worker Threads): `https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop` and `https://nodejs.org/api/worker_threads.html`
  - Node.js Streams, Backpressure & `stream/promises` `pipeline()`: `https://nodejs.org/en/learn/modules/backpressuring-in-streams` and `https://nodejs.org/api/stream.html#streampipelinesource-transforms-destination-options`
  - Node.js `Buffer` (`Buffer.alloc` vs deprecated `new Buffer`) & `node:fs/promises`: `https://nodejs.org/api/buffer.html` and `https://nodejs.org/api/fs.html`
  - V8 Blog (Elements Kinds / Hidden Classes / Ignition & TurboFan): `https://v8.dev/blog`
- **Verification Scope:** `npm run quality` + fresh `research` subagent audit covering `m03-p1.mdx`, `m03-p1.questions.ts`, and `m03-p1.coverage.ts`.

---

### Module 03 Part 2 (M03-P2) Technical Review Log — 2026-11-26

- **Scope:** Express, Middleware, Routing, REST API, API design, HTTP, HTTP methods, Status codes, Headers, Request lifecycle, API versioning, API validation, Error handling, Logging.
- **Official Documentation Verified (`M3`):**
  - Express 5 Routing, Middleware & Error Handling: `https://expressjs.com/en/guide/error-handling.html` and `https://expressjs.com/en/5x/api.html`
  - HTTP Semantics (RFC 9110 — Safe & Idempotent Methods, Status Codes, Headers): `https://www.rfc-editor.org/rfc/rfc9110.html`
  - Problem Details for HTTP APIs (RFC 9457): `https://www.rfc-editor.org/rfc/rfc9457.html`
  - Node.js HTTP Server Timeouts (`headersTimeout`, `requestTimeout`): `https://nodejs.org/api/http.html`
- **Verification Scope:** `npm run quality` + fresh `research` subagent audit covering `m03-p2.mdx`, `m03-p2.questions.ts`, and `m03-p2.coverage.ts`.

---

### Module 03 Part 3 (M03-P3) Technical Review Log — 2026-11-27

- **Scope:** Authentication, JWT, Refresh tokens, Session management, Authorization, RBAC, OAuth fundamentals, Rate limiting, CORS, Security, Input sanitization, SQL injection, NoSQL injection, API security.
- **Official Documentation Verified (`M3`):**
  - OWASP API Security Top 10 (API1 BOLA) & SQL Injection Prevention Cheat Sheet: `https://owasp.org/API-Security/` and `https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html`
  - OAuth 2.0 Security Best Current Practice (Authorization Code + PKCE) & RFC 7519 (JWT): `https://datatracker.ietf.org/doc/html/rfc9700` and `https://datatracker.ietf.org/doc/html/rfc7519`
  - Node.js `node:crypto` (`scryptSync`, `timingSafeEqual`): `https://nodejs.org/api/crypto.html`
  - Fetch Standard / MDN CORS (`Access-Control-Allow-Origin`, `Vary`, `Origin: null`): `https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS`
- **Verification Scope:** `npm run quality` + fresh `research` subagent audit covering `m03-p3.mdx`, `m03-p3.questions.ts`, and `m03-p3.coverage.ts`.

---

### Module 03 Part 4 (M03-P4) Technical Review Log — 2026-11-27

- **Scope:** Pagination, Filtering, Sorting, File uploads, Background jobs, Queue systems, WebSockets, Connection pooling, Microservices, Modular monolith, Backend design patterns, Dependency injection, Testing, Unit tests, Integration tests, API tests, Performance optimization.
- **Official Documentation Verified (`M3`):**
  - PostgreSQL Keyset Pagination & Composite Indexes: `https://www.postgresql.org/docs/current/indexes-multicolumn.html`
  - node-postgres (`pg.Pool`) Connection Pooling: `https://node-postgres.com/features/pooling`
  - BullMQ Retries, Backoff & Dead-Letter Patterns: `https://docs.bullmq.io/guide/retrying-failing-jobs`
  - AWS S3 Presigned Upload URLs & OWASP File Upload Cheat Sheet: `https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html` and `https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html`
  - Node.js Performance & `monitorEventLoopDelay`: `https://nodejs.org/api/perf_hooks.html`
- **Verification Scope:** `npm run quality` + fresh `research` subagent audit covering `m03-p4.mdx`, `m03-p4.questions.ts`, and `m03-p4.coverage.ts`.

---

### Module 04 Part 1 (M04-P1) Technical Review Log — 2026-11-27

- **Scope:** What a database is, Database architecture, Database engines, Relational databases, NoSQL databases, Data modeling, ER diagrams, Tables, Rows, Columns, Primary keys, Foreign keys, Unique constraints, Check constraints.
- **Official Documentation Verified (`M3`):**
  - PostgreSQL Table Constraints (`PRIMARY KEY`, `FOREIGN KEY`, `UNIQUE`, `CHECK`) & Numeric/Date Types: `https://www.postgresql.org/docs/current/ddl-constraints.html` and `https://www.postgresql.org/docs/current/datatype.html`
  - PostgreSQL Write-Ahead Logging (WAL) & Buffer Manager: `https://www.postgresql.org/docs/current/wal-intro.html`
  - RocksDB / LSM-Tree Storage Engine Architecture: `https://github.com/facebook/rocksdb/wiki/RocksDB-Overview`
  - MySQL InnoDB Architecture (Buffer Pool & Clustered B-Tree Index): `https://dev.mysql.com/doc/refman/8.4/en/innodb-architecture.html`
- **Verification Scope:** `npm run quality` + fresh `research` subagent audit covering `m04-p1.mdx`, `m04-p1.questions.ts`, and `m04-p1.coverage.ts`.

---

### Module 04 Part 2 (M04-P2) Technical Review Log — 2026-11-27

- **Scope:** Normalization, Denormalization, 1NF, 2NF, 3NF, BCNF overview.
- **Official Documentation Verified (`M3`):**
  - PostgreSQL Materialized Views (`REFRESH MATERIALIZED VIEW CONCURRENTLY`): `https://www.postgresql.org/docs/current/rules-materializedviews.html`
  - PostgreSQL Triggers & Generated Columns (Derived Cache Synchronization): `https://www.postgresql.org/docs/current/ddl-generated-columns.html` and `https://www.postgresql.org/docs/current/sql-createtrigger.html`
- **Verification Scope:** `npm run quality` + fresh `research` subagent audit covering `m04-p2.mdx`, `m04-p2.questions.ts`, and `m04-p2.coverage.ts`.

---

### Module 04 Part 3 (M04-P3) Technical Review Log — 2026-11-27

- **Scope:** Transactions, ACID, Isolation levels, Dirty reads, Non-repeatable reads, Phantom reads, Locks, Deadlocks, MVCC, Concurrency, Database consistency, Data integrity, Schema migrations, Connection pooling, Database backups, Recovery.
- **Official Documentation Verified (`M3`):**
  - PostgreSQL Transaction Isolation (`READ COMMITTED`, `REPEATABLE READ`, `SERIALIZABLE` SSI): `https://www.postgresql.org/docs/current/transaction-iso.html`
  - PostgreSQL Explicit Locking & Deadlocks (`FOR UPDATE`, `SKIP LOCKED`, `SQLSTATE 40P01`): `https://www.postgresql.org/docs/current/explicit-locking.html`
  - PostgreSQL `CREATE INDEX CONCURRENTLY` & `ALTER TABLE ... NOT VALID / VALIDATE CONSTRAINT`: `https://www.postgresql.org/docs/current/sql-createindex.html` and `https://www.postgresql.org/docs/current/sql-altertable.html`
  - PostgreSQL Continuous Archiving & Point-in-Time Recovery (PITR) & `pg_dump`: `https://www.postgresql.org/docs/current/continuous-archiving.html` and `https://www.postgresql.org/docs/current/backup.html`
- **Verification Scope:** `npm run quality` + fresh `research` subagent audit covering `m04-p3.mdx`, `m04-p3.questions.ts`, and `m04-p3.coverage.ts`.

---

### Module 05 Part 1 (M05-P1) Technical Review Log — 2026-11-27

- **Scope:** PostgreSQL architecture, PostgreSQL internals, Database storage, Pages and tuples, MVCC, WAL, Transactions.
- **Official Documentation Verified (`M3`):**
  - PostgreSQL Server Architecture & Memory (`shared_buffers`, `work_mem`, background processes): `https://www.postgresql.org/docs/current/runtime-config-resource.html`
  - PostgreSQL Database Page Layout, Relation Forks (`_fsm`, `_vm`), & TOAST: `https://www.postgresql.org/docs/current/storage-page-layout.html`, `https://www.postgresql.org/docs/current/storage-fsm.html`, `https://www.postgresql.org/docs/current/storage-vm.html`, and `https://www.postgresql.org/docs/current/storage-toast.html`
  - PostgreSQL HOT Updates & `VACUUM FREEZE` / Transaction ID Wraparound: `https://www.postgresql.org/docs/current/storage-hot.html` and `https://www.postgresql.org/docs/current/routine-vacuuming.html#VACUUM-FOR-WRAPAROUND`
  - PostgreSQL Write-Ahead Logging (WAL), `full_page_writes`, & Checkpoints: `https://www.postgresql.org/docs/current/wal-configuration.html`
- **Verification Scope:** `npm run quality` + fresh `research` subagent audit covering `m05-p1.mdx`, `m05-p1.questions.ts`, and `m05-p1.coverage.ts`.

---

### Module 05 Part 2 (M05-P2) Technical Review Log — 2026-11-27

- **Scope:** SQL, SELECT, INSERT, UPDATE, DELETE, JOIN, INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL JOIN, CROSS JOIN, Self joins, Subqueries, CTEs, Recursive CTEs, Window functions.
- **Official Documentation Verified (`M3`):**
  - PostgreSQL `SELECT` (`DISTINCT ON`, `LATERAL`, Joins) & `INSERT ... ON CONFLICT`: `https://www.postgresql.org/docs/current/sql-select.html` and `https://www.postgresql.org/docs/current/sql-insert.html`
  - PostgreSQL `UPDATE`, `DELETE`, & `TRUNCATE`: `https://www.postgresql.org/docs/current/sql-update.html`, `https://www.postgresql.org/docs/current/sql-delete.html`, and `https://www.postgresql.org/docs/current/sql-truncate.html`
  - PostgreSQL `WITH` Queries (CTEs, `MATERIALIZED`, `WITH RECURSIVE`, `CYCLE`): `https://www.postgresql.org/docs/current/queries-with.html`
  - PostgreSQL Window Functions (`OVER`, `PARTITION BY`, `ROWS` vs `RANGE` frames): `https://www.postgresql.org/docs/current/tutorial-window.html` and `https://www.postgresql.org/docs/current/sql-expressions.html#SYNTAX-WINDOW-FUNCTIONS`
- **Verification Scope:** `npm run quality` + fresh `research` subagent audit covering `m05-p2.mdx`, `m05-p2.questions.ts`, and `m05-p2.coverage.ts`.

---

### Module 05 Part 3 (M05-P3) Technical Review Log — 2026-11-27

- **Scope:** Views, Materialized views, Functions, Stored procedures, Triggers, Constraints, JSON, JSONB.
- **Official Documentation Verified (`M3`):**
  - PostgreSQL `CREATE VIEW` (`security_invoker`) & Materialized Views (`REFRESH MATERIALIZED VIEW CONCURRENTLY`): `https://www.postgresql.org/docs/current/sql-createview.html` and `https://www.postgresql.org/docs/current/rules-materializedviews.html`
  - PostgreSQL Functions (Volatility), `CREATE PROCEDURE` (`COMMIT`/`ROLLBACK`), & Triggers (`BEFORE`/`AFTER`, `REFERENCING NEW TABLE`): `https://www.postgresql.org/docs/current/xfunc-volatility.html`, `https://www.postgresql.org/docs/current/sql-createprocedure.html`, and `https://www.postgresql.org/docs/current/trigger-definition.html`
  - PostgreSQL Constraints (`EXCLUDE USING`, `DEFERRABLE`, `NOT VALID`): `https://www.postgresql.org/docs/current/ddl-constraints.html`
  - PostgreSQL `JSON` / `JSONB` Types & `GIN` Indexing (`jsonb_ops`, `jsonb_path_ops`): `https://www.postgresql.org/docs/current/datatype-json.html`
- **Verification Scope:** `npm run quality` + fresh `research` subagent audit covering `m05-p3.mdx`, `m05-p3.questions.ts`, and `m05-p3.coverage.ts`.

---

### Module 05 Part 4 (M05-P4) Technical Review Log — 2026-11-27

- **Scope:** Locking, Isolation levels, Partitioning, Replication, Connection pooling, EXPLAIN, EXPLAIN ANALYZE, Query planner, Query optimization, Indexing, Performance tuning, Vacuum, Autovacuum, Database maintenance, Backup and recovery.
- **Official Documentation Verified (`M3`):**
  - PostgreSQL Table Partitioning (`PARTITION BY RANGE/LIST/HASH` & Pruning): `https://www.postgresql.org/docs/current/ddl-partitioning.html`
  - PostgreSQL Physical Streaming & Logical Replication: `https://www.postgresql.org/docs/current/high-availability.html` and `https://www.postgresql.org/docs/current/logical-replication.html`
  - PostgreSQL `EXPLAIN (ANALYZE, BUFFERS)`, Planner Statistics, `pg_stat_statements`, `CREATE STATISTICS`, & Index Types (`B-Tree`, `GIN`, `GiST`, `BRIN`, `INCLUDE`): `https://www.postgresql.org/docs/current/using-explain.html`, `https://www.postgresql.org/docs/current/pgstatstatements.html`, `https://www.postgresql.org/docs/current/sql-createstatistics.html`, and `https://www.postgresql.org/docs/current/indexes-types.html`
  - PgBouncer Connection Pooling Configuration: `https://www.pgbouncer.org/config.html`
  - PostgreSQL Routine Vacuuming, Autovacuum Thresholds, `REINDEX CONCURRENTLY`, & PITR: `https://www.postgresql.org/docs/current/routine-vacuuming.html`, `https://www.postgresql.org/docs/current/sql-reindex.html`, and `https://www.postgresql.org/docs/current/continuous-archiving.html`
- **Verification Scope:** `npm run quality` + fresh `research` subagent audit covering `m05-p4.mdx`, `m05-p4.questions.ts`, and `m05-p4.coverage.ts`.

---

### Module 06 Part 1 (M06-P1) Technical Review Log — 2026-11-27

- **Scope:** MySQL architecture, Storage engines, InnoDB, MyISAM overview, SQL, Transactions, ACID, Isolation levels, Locking, Deadlocks.
- **Official Documentation Verified (`M3`):**
  - MySQL 8.0 Pluggable Storage Engine Architecture & InnoDB Architecture: `https://dev.mysql.com/doc/refman/8.0/en/pluggable-storage-overview.html` and `https://dev.mysql.com/doc/refman/8.0/en/innodb-architecture.html`
  - MySQL 8.0 MyISAM Storage Engine & Server SQL Modes (`STRICT_TRANS_TABLES`, `NO_ENGINE_SUBSTITUTION`): `https://dev.mysql.com/doc/refman/8.0/en/myisam-storage-engine.html` and `https://dev.mysql.com/doc/refman/8.0/en/sql-mode.html`
  - MySQL 8.0 InnoDB Locking, Transaction Model, MVCC, Isolation Levels & Deadlocks: `https://dev.mysql.com/doc/refman/8.0/en/innodb-locking.html`, `https://dev.mysql.com/doc/refman/8.0/en/innodb-transaction-isolation-levels.html`, `https://dev.mysql.com/doc/refman/8.0/en/innodb-multi-versioning.html`, and `https://dev.mysql.com/doc/refman/8.0/en/innodb-deadlocks.html`
  - MySQL 8.0 Two-Phase Commit (`sync_binlog`, `innodb_flush_log_at_trx_commit`): `https://dev.mysql.com/doc/refman/8.0/en/innodb-parameters.html#sysvar_innodb_flush_log_at_trx_commit`
- **Verification Scope:** `npm run quality` + fresh `research` subagent audit covering `m06-p1.mdx`, `m06-p1.questions.ts`, and `m06-p1.coverage.ts`.

---

### Module 06 Part 2 (M06-P2) Technical Review Log — 2026-11-27

- **Scope:** Indexes, Composite indexes, Clustered indexes, Secondary indexes, Query optimization, EXPLAIN, Query execution, Stored procedures, Triggers, Views, Replication, Partitioning, Performance tuning, Connection management, Backup and recovery.
- **Official Documentation Verified (`M3`):**
  - MySQL 8.0 Clustered & Secondary Indexes, Multiple-Column Indexes & `EXPLAIN` / `EXPLAIN ANALYZE`: `https://dev.mysql.com/doc/refman/8.0/en/innodb-index-types.html`, `https://dev.mysql.com/doc/refman/8.0/en/multiple-column-indexes.html`, and `https://dev.mysql.com/doc/refman/8.0/en/explain-output.html`
  - MySQL 8.0 Hash Joins, Functional Indexes & Invisible Indexes: `https://dev.mysql.com/doc/refman/8.0/en/hash-joins.html`, `https://dev.mysql.com/doc/refman/8.0/en/create-index.html#create-index-functional-key-parts`, and `https://dev.mysql.com/doc/refman/8.0/en/invisible-indexes.html`
  - MySQL 8.0 Stored Programs, Triggers & Views (`MERGE`/`TEMPTABLE`, `SQL SECURITY INVOKER`): `https://dev.mysql.com/doc/refman/8.0/en/stored-programs-views.html`
  - MySQL 8.0 GTID Replication, Parallel Workers & Partitioning: `https://dev.mysql.com/doc/refman/8.0/en/replication-gtids.html` and `https://dev.mysql.com/doc/refman/8.0/en/partitioning-range.html`
  - MySQL 8.0 Connection Management, Backup & Point-in-Time Recovery (`mysqldump`, MySQL Shell, `mysqlbinlog`, Percona XtraBackup): `https://dev.mysql.com/doc/refman/8.0/en/point-in-time-recovery.html` and `https://docs.percona.com/percona-xtrabackup/8.0/`
- **Verification Scope:** `npm run quality` + fresh `research` subagent audit covering `m06-p2.mdx`, `m06-p2.questions.ts`, and `m06-p2.coverage.ts`.

---

### Module 07 Part 1 (M07-P1) Technical Review Log — 2026-11-27

- **Scope:** SQL Server architecture, SQL Server engine, Storage, Pages, Extents, Tables, Indexes, Clustered indexes, Non-clustered indexes, Heap tables, Stored procedures, Functions, Views, Triggers, Temp tables, Table variables, CTEs, Window functions.
- **Official Documentation Verified (`M3`):**
  - SQL Server Architecture, SQLOS & Query Processing: `https://learn.microsoft.com/en-us/sql/relational-databases/sql-server-guides` and `https://learn.microsoft.com/en-us/sql/relational-databases/query-processing-architecture-guide`
  - SQL Server Pages & Extents Architecture (8 KB Pages, 64 KB Uniform/Mixed Extents, Row-Overflow): `https://learn.microsoft.com/en-us/sql/relational-databases/pages-and-extents-architecture-guide`
  - SQL Server Clustered, Non-Clustered (`INCLUDE`) & Heap Index Design: `https://learn.microsoft.com/en-us/sql/relational-databases/sql-server-index-design-guide` and `https://learn.microsoft.com/en-us/sql/relational-databases/indexes/heaps-tables-without-clustered-indexes`
  - T-SQL Stored Procedures, Inline TVFs, Indexed Views (`SCHEMABINDING`), DML Triggers (`inserted`/`deleted`), `#Temp` vs. `@Table` (Deferred Compilation), CTEs & Window Functions (`ROWS` vs. `RANGE`): `https://learn.microsoft.com/en-us/sql/t-sql/statements/create-view-transact-sql`, `https://learn.microsoft.com/en-us/sql/relational-databases/user-defined-functions/scalar-udf-inlining`, and `https://learn.microsoft.com/en-us/sql/t-sql/queries/select-over-clause-transact-sql`
- **Verification Scope:** `npm run quality` + fresh `research` subagent audit covering `m07-p1.mdx`, `m07-p1.questions.ts`, and `m07-p1.coverage.ts`.

---

### Module 07 Part 2 (M07-P2) Technical Review Log — 2026-11-27

- **Scope:** Transactions, Locking, Isolation levels, Deadlocks.
- **Official Documentation Verified (`M3`):**
  - SQL Server Transactions, `SET XACT_ABORT`, `XACT_STATE()` & Accelerated Database Recovery (ADR): `https://learn.microsoft.com/en-us/sql/t-sql/statements/set-xact-abort-transact-sql` and `https://learn.microsoft.com/en-us/sql/relational-databases/accelerated-database-recovery-concepts`
  - SQL Server Transaction Locking, Row Versioning (`RCSI` / `SNAPSHOT`), & Lock Escalation: `https://learn.microsoft.com/en-us/sql/relational-databases/sql-server-transaction-locking-and-row-versioning-guide`
  - SQL Server Deadlocks Guide (`Error 1205`, `DEADLOCK_PRIORITY`, `system_health`): `https://learn.microsoft.com/en-us/sql/relational-databases/sql-server-deadlocks-guide`
- **Verification Scope:** `npm run quality` + fresh `research` subagent audit covering `m07-p2.mdx`, `m07-p2.questions.ts`, and `m07-p2.coverage.ts`.

---

### Module 07 Part 3 (M07-P3) Technical Review Log — 2026-11-27

- **Scope:** Query execution plans, Query optimization, Statistics, Execution plan analysis, Index maintenance, Fragmentation, Parameter sniffing, Query tuning, Partitioning, SQL Server Agent, Backup and recovery, Performance monitoring.
- **Official Documentation Verified (`M3`):**
  - SQL Server Query Store, Execution Plans, Statistics & Parameter Sensitive Plan (PSP) Optimization: `https://learn.microsoft.com/en-us/sql/relational-databases/performance/monitoring-performance-by-using-the-query-store`, `https://learn.microsoft.com/en-us/sql/relational-databases/statistics/statistics`, and `https://learn.microsoft.com/en-us/sql/relational-databases/performance/parameter-sensitive-plan-optimization`
  - SQL Server Index Maintenance (`REORGANIZE` vs. `REBUILD`, 5%/30% Fragmentation) & Partitioning (`RANGE RIGHT`, `SWITCH`): `https://learn.microsoft.com/en-us/sql/relational-databases/indexes/reorganize-and-rebuild-indexes` and `https://learn.microsoft.com/en-us/sql/relational-databases/partitions/partitioned-tables-and-indexes`
  - SQL Server Agent, Recovery Models, PITR (`NORECOVERY`/`STOPAT`), & Wait Stats (`sys.dm_os_wait_stats`): `https://learn.microsoft.com/en-us/sql/ssms/agent/sql-server-agent`, `https://learn.microsoft.com/en-us/sql/relational-databases/backup-restore/restore-a-sql-server-database-to-a-point-in-time-full-recovery-model`, and `https://learn.microsoft.com/en-us/sql/relational-databases/system-dynamic-management-views/sys-dm-os-wait-stats-transact-sql`
- **Verification Scope:** `npm run quality` + fresh `research` subagent audit covering `m07-p3.mdx`, `m07-p3.questions.ts`, and `m07-p3.coverage.ts`.
