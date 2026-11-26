# Pipeline State — Software Engineering Mastery Handbook

> Resumable state file for `.agents/skills/handbook-next/SKILL.md`.
> Update after every step and every saved section.

## Current Run Status
- **Branch:** `react-fsd`
- **Current Part:** `M01-P2 Remediation` — **DONE** (ready for local commit on `react-fsd`; next part: `M01-P3`)
- **Current Step:** `COMMIT`
- **Parts Limit:** Default 1 part per run (up to 3 if requested, or continuous part-by-part via `/handbook-next all`)
- **Split Rationale:** Completed `M01-P2 Remediation` as Part 1 of this run (`M01-P3` is Part 2).
- **Completed Sections (current work):** All steps (`PLAN`, `WRITE`, `CHECK`, `AUDIT`, `UPDATE`, `COMMIT`) complete for `M01-P2 Remediation`.
- **Files Changed (M01-P2 Remediation):**
  - `content/modules/01-programming/m01-p2.mdx` (`WeakMap`/`WeakSet` in Sections B, D `Example 6`, I, K; Shallow vs. Deep Copying table in Section K; `SRP` + `ISP` runnable `Example 5`; hardened `safeMerge` `isPlainObject` + inline check and `PriceCalculator.apply` `finalCents <= subtotalCents` postcondition)
  - `content/coverage/m01-p2.coverage.ts` (updated topic mappings, added `Example 5` & `Example 6` `codeTests` + `safetyMutations`, strengthened `safeMerge` & `PriceCalculator` tests -> 9 runnable blocks, 13 safety mutations)
  - `TECHNICAL_REVIEW_LOG.md` (added `WeakMap`, `WeakSet`, `Array.prototype.toSpliced`, `Array.prototype.with` official MDN `https://` URLs)
  - `QUALITY_GATE.md` (updated Audit Record for `M01-P1` & `M01-P2`)
  - `PROJECT_STATUS.md` (updated status for `M01-P3`)
  - `PIPELINE_STATE.md` (updated)
- **Step 5/6 Quality & Audit Results (`M01-P2 Remediation` — 2026-11-26):**
  - `npm run quality` (after last code/content edit): **PASS** (`typecheck`, `vite build` `590.45 kB`, `steiger ./src` `0` problems, `verify:syllabus` `28/945/13/932`, `verify:parity` `13/13` metrics + `7` demos, `verify:offline` `576.6 KB` `0` CDNs, `verify:quality` `2` lessons, `13` mapped topics, `16` runnable blocks, `27` safety mutation checks, `23` interview Q&As `{"basic":7,"intermediate":7,"advanced":6,"senior-architect":3}`, `16` live Run Demos, `4` SVGs checked with live `getBBox()`, `0` horizontal overflow at `360/390/768/1024/1440`).
  - **Fresh Audit Round 1 (`11b64a8b`):** `FAIL` (`M1`, `M2`, `M4` PASS; 1 MAJOR `M3` missing `WeakMap`/`WeakSet` URLs in `TECHNICAL_REVIEW_LOG.md` + 1 MINOR stale `QUALITY_GATE.md` note) — fixed.
  - **Fresh Audit Round 2 (`925178cf`):** `PASS` (`0 CRITICAL`, `0 MAJOR`; all M1–M4 rules and counts verified).

---

## Latest Quality & Audit Results (Verified 2026-11-26)

### 1. `npm run quality` Result on `04fcf00` — **PASS (with 1 script bug caveat)**
- `npm run typecheck` (`tsc --noEmit`): **PASS**
- `npm run build` (`vite build`): **PASS** (`dist/index.html` / `dist/software_engineering_mastery.html` 565.42 kB)
- `npm run lint:fsd` (`steiger ./src`): **PASS** (`0` problems)
- `npm run verify:syllabus`: **PASS** (`28` modules, `945` total topics, `13` available with verified anchors, `932` not written yet)
- `npm run verify:parity`: **PASS** (`M01-P1` 13/13 legacy metrics match, `7` runnable JS demos executed)
- `npm run verify:offline`: **PASS** (`dist/software_engineering_mastery.html` `552.2 KB`, `0` external CDNs, filters & `sem_handbook_v1` import verified)
- `npm run verify:quality`: **PASS** (`2` lessons, `13` mapped topics, `14` runnable blocks, `15` safety mutation checks, `23` interview Q&As `{"basic":7,"intermediate":7,"advanced":6,"senior-architect":3}`, `14` live browser Run Demos, `4` SVGs checked, `0` horizontal overflow at `360/390/768/1024/1440`)
- **CRITICAL SCRIPT BUG DISCOVERED:** In `scripts/verify-quality.mjs:274`, `split(/\s+/)` sits inside a JS template literal ``evalJs(`...`)``, so Node evaluates `\s` as literal `s` (`split(/s+/)`). Consequently `vb.length === 1` (not `4`), so `if (vb.length === 4)` at line 280 never executes and SVG text clipping/overlap checks were silently skipped! Direct headless Chrome `getBBox()` measurement confirmed `M01-P1` Figure 1.2 overflows its `viewBox`.

### 2. Earlier Recorded Audit (`QUALITY_GATE.md:74-84`, `TECHNICAL_REVIEW_LOG.md:126-136`)
- `QUALITY_GATE.md` recorded `M01-P1` & `M01-P2` as `PASS` on Rules `M1`–`M4` (`2026-11-26`), **but** independent verification of the 12 reported `M01-P1`/`M01-P2` items below found **7 unfixed** and **3 partially fixed / caveat** items that must be remediated before `M01-P3`.

---

## M01-P1 / M01-P2 Problem Verification (12 Items Checked)

| # | Item | Status | Observed Evidence (`file:line`) |
|---|---|---|---|
| 1 | **Checkout charging before validation** | **FIXED** | `m01-p2.mdx:337-350` validates `account instanceof LedgerAccount`, positive safe-integer `amountCents`, and `MAX_SAFE_INTEGER` overflow before `this.#gateway.charge(amountCents)`. Verified by spy-gateway test & safety mutation in `m01-p2.coverage.ts:202-215,243-258`. |
| 2 | **Ineffective `safeMerge` test** | **PARTIALLY FIXED (OPEN FOR `M01-P2`)** | `m01-p2.coverage.ts:371` safety mutation now checks `Object.hasOwn(m, "constructor") || m.pwned === true` (catches shallow prototype replacement on `m`). **Open:** `m01-p2.mdx:559` inline demo log still checks `({}).isAdmin === true` instead of `merged.isAdmin === true`, `m01-p2.coverage.ts:343` checks `({}).pwned === true`, and `isPlainObject` (`m01-p2.mdx:537-539`) accepts non-plain objects like `Date` or `RegExp`. |
| 3 | **Private field order** | **NO BUG OBSERVED (VERIFY INTENT)** | All `#private` fields (`#balanceCents`, `#entries`, `#gateway`, `#httpStatus`, `#strategies`) are declared at the top of each class (`m01-p2.mdx:282-283,330,366,616`), and `AppError extends Error` calls `super(message)` before `this.#httpStatus = httpStatus` (`m01-p2.mdx:374-376`). (Minor note: `#entries = []` initializes before `LedgerAccount` constructor guards, and `this.owner` is set before `this.#balanceCents`.) |
| 4 | **Query parser input checks** | **FIXED (`M01-P1` 2026-11-26)** | `m01-p1.mdx:313-349` (`parseQueryFlags`) now rejects `null`, `undefined`, arrays, non-plain objects, non-integer strings (`"1e2"`, `""`, `"abc"`), booleans, and unsafe integers; reads via `Object.hasOwn`. Verified by 19 test cases and 3 safety mutations in `m01-p1.coverage.ts:190-247`. |
| 5 | **Flattener depth** | **FIXED (`M01-P1` 2026-11-26)** | `m01-p1.mdx:492-532` (`flattenIterative`) validates `maxDepth` (positive safe integer) and tracks active ancestors via `Set` with `"enter"`/`"exit"` frames (catches cycles while allowing shared DAG arrays). Verified by tests and 3 safety mutations in `m01-p1.coverage.ts:289-341`. |
| 6 | **Discount validation** | **FIXED IN `M01-P1` (POSTCONDITION CHECK OPEN IN `M01-P2`)** | **Fixed in `M01-P1`:** `calculateLineTotalCents` & `createTaxCalculator` (`m01-p1.mdx:220-259`) validate `unitPriceCents`, `quantity`, `discountRate` (`0..1`), `taxRate` (`0..1`), `subtotalCents`, overflow, and `-0` normalization. Verified in `m01-p1.coverage.ts:132-182`. **Open in `M01-P2`:** `PriceCalculator.apply` allows `finalCents > subtotalCents`. |
| 7 | **Cut-off diagram** | **FIXED (`M01-P1` 2026-11-26)** | `m01-p1.mdx:132-150` (Figure 1.2, `viewBox="0 0 820 190"`) splits bottom text into 2 lines inside `x=28..554` and `y=128..150`. `scripts/verify-quality.mjs:274-328` now runs live Chrome `getBBox()` clipping/overlap checks on all 4 SVGs (`PASS`). |
| 8 | **Missing inheritance** | **FIXED** | Covered in `m01-p2.mdx:79-85` (Section B #7 under `<TopicAnchor id="m01-p2-topic-inheritance" />`), `m01-p2.mdx:359-403` (`Example 4`: `AppError extends Error`, `RateLimitError extends AppError`, `super()`, `super.toClientPayload()`, `instanceof`), and `m01-p2-iq-9`. |
| 9 | **SOLID examples** | **PARTIALLY FIXED (OPEN FOR `M01-P2`)** | `OCP`, `DIP`, and `LSP` have runnable code in `m01-p2.mdx` Example 3 (`CheckoutService`), Example 4 (`RateLimitError`), and Exercise 3 (`PriceCalculator`). **Open:** `SRP` and `ISP` are only described in prose/tables/IQs without dedicated runnable code examples. |
| 10 | **Copying table** | **NOT FIXED (OPEN FOR `M01-P2`)** | `m01-p2.mdx:475-506` (Section K) has 3 tables (`Object` vs `Map` vs `Set`, `Composition` vs `Inheritance`, `SOLID`), with **no comparison table** for shallow vs. deep copying (`{ ...obj }` / `Object.assign` / `[...arr]` vs `JSON.parse(JSON.stringify())` vs `structuredClone()`). |
| 11 | **Weak collections** | **NOT FIXED (OPEN FOR `M01-P2`)** | `WeakMap` and `WeakSet` do not appear anywhere in `content/` (`m01-p1` or `m01-p2`). |
| 12 | **Control flow** | **FIXED (`M01-P1` 2026-11-26)** | `m01-p1.mdx:25-37` Section B #1 now teaches Expressions vs. Statements and Control Flow (`if/else if/else`, `switch`, `?:`, `for`/`while`/`do...while`/`for...of`, `break`/`continue`, early returns, `try/catch/finally`). |

---

## Unresolved Items & Approved First Pending Work
Completed: **`M01-P1 Remediation`** + **`scripts/verify-quality.mjs` SVG `getBBox()` check fix** (`PASS` via `npm run quality` and Round 2 fresh subagent audit).
Remaining approved work before `M01-P3`:
1. **`M01-P2 Remediation` (Next Part):**
   - `content/modules/01-programming/m01-p2.mdx`, `content/coverage/m01-p2.coverage.ts`, `content/interviews/m01-p2.questions.ts` (if needed):
     - Strengthen `safeMerge` demo assertion (`m01-p2.mdx:559` check `merged.isAdmin === true || ({}).isAdmin === true`), coverage assertion (`m.pwned`), and `isPlainObject` prototype check; guard `PriceCalculator.apply` postcondition `finalCents <= subtotalCents`.
     - Add dedicated runnable code examples (or expand Section D) covering **SRP** and **ISP** alongside OCP/DIP/LSP.
     - Add a **Shallow vs. Deep Copying** comparison table in Section K.
     - Add **`WeakMap` & `WeakSet`** explanation, memory/GC trade-off, comparison/example, and coverage.
     - Clarify/confirm `private field order` if user had a specific convention in mind (e.g., `#entries = []` allocation order or `this.#balanceCents` assignment order).
2. **Next New Content Part (after `M01-P2 Remediation` passes & commits):**
   - **`M01-P3`**: `Algorithms, Data structures, Time complexity, Space complexity, Big O, Recursion, Sorting, Searching, Hash maps, Stacks, Queues, Trees, Graph fundamentals`.

## Next Action
On the next run, resume at **Step 1 (`PLAN`)** for **`M01-P2 Remediation`**, followed by `npm run quality`, a fresh subagent audit, log updates, and local commit on `react-fsd` before starting `M01-P3`.
