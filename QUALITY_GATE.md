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

### Audit Record (`M01-P1`–`M01-P5`, `M02-P1`–`M02-P4`, `M03-P1`–`M03-P4` & `M04-P1` — Audited 2026-11-27)

| Rule | Scope | Status | Evidence (`file:line`) & Findings |
|---|---|---|---|
| **M1** | `M01-P1` explanations & depth | **PASS** | `content/modules/01-programming/m01-p1.mdx:23-66,69-153` — All 4 topics (`Programming fundamentals` incl. Control Flow, `Variables`, `Data types`, `Functions`) include dedicated headings, multi-sentence intuition, memory/IEEE-754 internals + SVGs (`viewBox="0 0 820 310"` and `"0 0 820 190"`), and consistent trade-offs. |
| **M1** | `M01-P2` all 9 topics (`Objects`..`SOLID`) | **PASS** | `content/modules/01-programming/m01-p2.mdx:31-108,359-496,569-609` — All 9 topics have dedicated Section B subsections beneath `<TopicAnchor>`, `WeakMap`/`WeakSet` (`Example 6`), Shallow vs. Deep Copying table, `Example 4` Inheritance (`extends`/`super`/`instanceof`), and `Example 5` (`SRP` + `ISP`). |
| **M1** | `M01-P3` all 13 topics (`Algorithms`..`Graph fundamentals`) | **PASS** | `content/modules/01-programming/m01-p3.mdx:29-132,135-204` — All 13 topics have dedicated Section B subsections beneath `<TopicAnchor>`, plus Big O / Ring-Buffer & BFS/DFS SVG diagrams (`Figure 1.5` & `1.6`). |
| **M1** | `M01-P4` all 16 topics (`JavaScript`..`Garbage collection`) | **PASS** | `content/modules/01-programming/m01-p4.mdx:25-185,187-218` — All 16 topics have dedicated multi-block Section B subsections beneath `<TopicAnchor>`, plus Event Loop & Prototype/GC SVG diagrams (`Figure 1.7` & `1.8`). |
| **M1** | `M01-P5` all 5 topics (`TypeScript fundamentals`..`Type safety`) | **PASS** | `content/modules/01-programming/m01-p5.mdx:25-64,67-129` — All 5 topics have dedicated multi-block Section B subsections beneath `<TopicAnchor>` (incl. Declaration Merging, Structural Typing, Generics, `unknown`/`never`), plus Type Erasure & Discriminated Union SVGs (`Figure 1.9` & `1.10`). |
| **M1** | `M02-P1` all 8 topics (`React architecture`..`Lifecycle`) | **PASS** | `content/modules/02-react/m02-p1.mdx:25-92,94-150` — All 8 topics have dedicated multi-block Section B subsections beneath `<TopicAnchor>`, plus Trigger->Render->Commit & List Reconciliation SVG diagrams (`Figure 2.1` & `2.2`). |
| **M1** | `M02-P2` all 9 topics (`Hooks`..`Custom hooks`) | **PASS** | `content/modules/02-react/m02-p2.mdx:25-97,100-170` — All 9 topics have dedicated multi-block Section B subsections beneath `<TopicAnchor>`, plus Fiber `memoizedState` & `useEffect` Cleanup SVG diagrams (`Figure 2.3` & `2.4`). |
| **M1** | `M02-P3` all 11 topics (`State management`..`Authorization`) | **PASS** | `content/modules/02-react/m02-p3.mdx:25-112,115-185` — All 11 topics have dedicated multi-block Section B subsections beneath `<TopicAnchor>`, plus TanStack Query Cache & Auth Guard/Single-Flight Refresh SVG diagrams (`Figure 2.5` & `2.6`). |
| **M1** | `M02-P4` all 18 topics (`Error boundaries`..`Frontend debugging`) | **PASS** | `content/modules/02-react/m02-p4.mdx:25-167,170-232` — All 18 topics have dedicated multi-block Section B subsections beneath `<TopicAnchor>`, plus Code Splitting/ErrorBoundary & XSS/CSRF SVG diagrams (`Figure 2.7` & `2.8`). |
| **M1** | `M03-P1` all 11 topics (`Node.js architecture`..`File handling`) | **PASS** | `content/modules/03-nodejs/m03-p1.mdx:25-115,118-190` — All 11 topics have dedicated multi-block Section B subsections beneath `<TopicAnchor>`, plus Node Runtime (V8+libuv+Pool+Workers) & Stream Backpressure SVG diagrams (`Figure 3.1` & `3.2`). |
| **M1** | `M03-P2` all 14 topics (`Express`..`Logging`) | **PASS** | `content/modules/03-nodejs/m03-p2.mdx:25-138,140-210` — All 14 topics have dedicated multi-block Section B subsections beneath `<TopicAnchor>` (incl. Node 16+ `res.on("close")` disconnect detection), plus Express Lifecycle & RFC 9457 Problem Details SVG diagrams (`Figure 3.3` & `3.4`). |
| **M1** | `M03-P3` all 14 topics (`Authentication`..`API security`) | **PASS** | `content/modules/03-nodejs/m03-p3.mdx:25-138,140-220` — All 14 topics have dedicated multi-block Section B subsections beneath `<TopicAnchor>`, plus Rotating Refresh Family & API Security Perimeter SVG diagrams (`Figure 3.5` & `3.6`). |
| **M1** | `M03-P4` all 17 topics (`Pagination`..`Performance optimization`) | **PASS** | `content/modules/03-nodejs/m03-p4.mdx:25-165,168-242` — All 17 topics have dedicated multi-block Section B subsections beneath `<TopicAnchor>`, plus Job Queue/DLQ & Modular Monolith/Pool SVG diagrams (`Figure 3.7` & `3.8`). |
| **M1** | `M04-P1` all 14 topics (`What a database is`..`Check constraints`) | **PASS** | `content/modules/04-database-fundamentals/m04-p1.mdx:25-138,140-210` — All 14 topics have dedicated multi-block Section B subsections beneath `<TopicAnchor>`, plus Layered DB Architecture & ER Cardinality/Constraints SVG diagrams (`Figure 4.1` & `4.2`). |
| **M2** | `M01-P1` prose vs. code fidelity | **PASS** | `content/modules/01-programming/m01-p1.mdx:155-278,310-352,442-604` — TDZ `ReferenceError`, `0.1+0.2`, `BigInt`, integer cents, pass-by-sharing mutations, `calculateLineTotalCents`/`createTaxCalculator` finite `0..1` + overflow/`-0` guards, strict plain-object `parseQueryFlags`, `splitAmountCents` `-0`/`parts` cap, `flattenIterative` `maxDepth` + ancestor cycle `Set`, and hardened `composeValidators`/`normalizeSignup` match prose promises. |
| **M2** | `M01-P2` prose vs. code fidelity & edge cases | **PASS** | `content/modules/01-programming/m01-p2.mdx:228-496,635-754` — Pre-charge validation in `CheckoutService.pay`, `MAX_SAFE_INTEGER` overflow check in `LedgerAccount`, `isPlainObject` + `merged.isAdmin` check in `safeMerge`, non-negative integer `limit` in `topPaidOrders`, `WeakMap`/`WeakSet` object guards, and `subtotalCents`/LSP (`0 <= finalCents <= subtotalCents`) checks in `PriceCalculator`. |
| **M2** | `M01-P3` prose vs. code fidelity & edge cases | **PASS** | `content/modules/01-programming/m01-p3.mdx:213-455,560-690` — Sorted/finite guards in `binarySearch` & `lowerBound`, stable iterative `mergeSortIterative`, bounded `sumRecursiveBounded`, `twoSumIndices`, `nextGreaterElements` (Monotonic Stack), `RingQueue`/`TwoStackQueue`, cycle-safe `isValidBST`, `Symbol("root")` `shortestPathBFS`, `isBalancedBrackets`, and 15k-node iterative `hasDirectedCycle`. |
| **M2** | `M01-P4` prose vs. code fidelity & edge cases | **PASS** | `content/modules/01-programming/m01-p4.mdx:221-428,550-675` — `createBoundedCounter` + TDZ check, `createServiceConfig` & `Notifier` whitespace guard, `runEventLoopSimulation` starvation cap, `BoundedCache`, `memoizeBounded`, `once`, `getPrototypeDepth`, and indexed-loop `promiseAllSettledLite`. |
| **M2** | `M01-P5` prose vs. code fidelity & edge cases | **PASS** | `content/modules/01-programming/m01-p5.mdx:135-232,355-415` — TS reference contracts + runtime guards: `parseOrderDTO` (`-0` normalization, strict union), `indexById` (trimmed duplicate check, `Map`), `formatApiResult`, `parsePaymentEvent`, and `createTypedStore` (trimmed `save`/`get` whitespace rejection). |
| **M2** | `M02-P1` prose vs. code fidelity & edge cases | **PASS** | `content/modules/02-react/m02-p1.mdx:155-285,400-465` — TSX `TaskList` reference, `createVNode` (`key` omitted from `props`, plain object & non-empty type), `reconcileKeyedList`, `applyBatchedUpdates`, `escapeHtmlText`, and `isSafeHref` (blocks control chars, `//`, `/\`, `javascript:`). |
| **M2** | `M02-P2` prose vs. code fidelity & edge cases | **PASS** | `content/modules/02-react/m02-p2.mdx:177-340,460-545` — TSX `SearchPanel` (`useDebouncedValue`, `AbortController` + `fetch` cleanup, `useRef`, `useMemo`, `useCallback`, `memo`), `createHookRuntime` (`useState` + `useRef` slot checks), `areDepsEqual` / `arePropsShallowEqual` (`Object.is`), `createEffectRunner`, and `createMemoSelector`. |
| **M2** | `M02-P3` prose vs. code fidelity & edge cases | **PASS** | `content/modules/02-react/m02-p3.mdx:188-460,565-670` — TSX RTK/TanStack Query/React Router reference, `createReduxStore` (re-entrant dispatch guard), `createQueryCache` (deterministic key serialization, deduplication, boundary-safe invalidation), `validateOrderForm` + `canActivateRoute`, `createSliceReducer` (`Object.hasOwn` guard), and `createAuthClient` (single-flight refresh + `//` guard). |
| **M2** | `M02-P4` prose vs. code fidelity & edge cases | **PASS** | `content/modules/02-react/m02-p4.mdx:238-396,505-592` — TSX `PanelErrorBoundary` + `React.lazy` reference, `createLruCache` + `createChunkLoader`, `escapeHtml` + `isSafeLinkHref` (`0x7F`, `//`, `/\`, bare `https://`) + `verifyCsrfRequest` (`trim().length < 16`), `createBoundaryState` (`capture`, `resetOnKeyChange`, `render`), and `paginateItems` with inline assertions. |
| **M2** | `M03-P1` prose vs. code fidelity & edge cases | **PASS** | `content/modules/03-nodejs/m03-p1.mdx:195-405,525-605` — TS `pipeline()` + `resolveSafeFilePath` (`target === normalizedBase` blocked), `createNodeLoopSimulator` (inner `nextTickQueue` starvation cap), `createBoundedStreamPipe` (`highWaterMark` + `drain`), `parseFrameHeader` + `isSafeRelativePath` (`\` normalized + drive-prefix blocked), `createThreadPool` (concurrent `active` slots + FIFO), and `createLineSplitter`. |
| **M2** | `M03-P2` prose vs. code fidelity & edge cases | **PASS** | `content/modules/03-nodejs/m03-p2.mdx:215-415,515-600` — TS Express router + Zod `.strict()` + `SyntaxError` 400 + 500 redaction, `createExpressPipeline` (`fn.length === 4` error short-circuit), `validateOrderPayload` + `toProblemDetails` (mass-assignment & 500 redaction), `classifyMethod` + `parseApiVersion`, and `createApiLogger` (`Object.create(null)` + secret redaction). |
| **M2** | `M03-P3` prose vs. code fidelity & edge cases | **PASS** | `content/modules/03-nodejs/m03-p3.mdx:230-430,535-620` — TS async `scrypt` + `timingSafeEqual` + parameterized `tenant_id` query + strict CORS, `createRefreshTokenStore` (family reuse revocation), `createRateLimiter` + `evaluateCors` (`null` origin blocked), `buildOrderSearchSql` (sort allowlist) + `sanitizeNoSqlFilter`, `verifyJwtClaims` (`alg: none` + finite `nowSec`) + `hasPermission`, and `constantTimeEqual` + `sanitizeInput`. |
| **M2** | `M03-P4` prose vs. code fidelity & edge cases | **PASS** | `content/modules/03-nodejs/m03-p4.mdx:247-445,555-655` — TS `OrderService` (DI + `Number.isFinite` limit + keyset cursor), `buildCursorListSpec`, `createConnectionPool` (exhaustion & unowned release guards), `createJobQueue` (idempotency + backoff + DLQ + safe error string), `validateUpload` (`maxBytes` guard + magic bytes + `storageKey`), and `createContainer` + `createWsTracker`. |
| **M2** | `M04-P1` prose vs. code fidelity & edge cases | **PASS** | `content/modules/04-database-fundamentals/m04-p1.mdx:215-355,465-540` — PostgreSQL DDL (`IDENTITY`, `ON DELETE RESTRICT/CASCADE`, `UNIQUE`, `CHECK`), `createRelationalDb` (PK/UNIQUE/CHECK/FK restrict), `createLsmMemTable` (MemTable + SSTable flush/read probes), `designRelationship` (`1:1`/`1:N`/`M:N`), and non-mutating `applyParentDelete`. |
| **M2** | `M04-P2` prose vs. code fidelity & edge cases | **PASS** | `content/modules/04-database-fundamentals/m04-p2.mdx:142-280,415-485` — PostgreSQL normalized DDL (`customers`, `products`, `product_tags`, `orders`, `order_items`), `classifyTableNormalForm` (1NF/2NF/3NF/BCNF across candidate keys, trivial/superkey FD guards), `createSyncedOrderStore` (transactional vs drifted cache), `normalizeToFirstNf`, and `findTransitiveViolations`. |
| **M2** | `M04-P3` prose vs. code fidelity & edge cases | **PASS** | `content/modules/04-database-fundamentals/m04-p3.mdx:190-445,510-650` — PostgreSQL `REPEATABLE READ` + `FOR UPDATE` + `NOT VALID`/`CONCURRENTLY`, `createMvccEngine` (`committedAtStart` snapshot & First-Committer-Wins), `createDeadlockDetector` (wait-for cycle detection), `createBoundedPool`, and `replayWalForPitr`. |
| **M2** | `M05-P1` prose vs. code fidelity & edge cases | **PASS** | `content/modules/05-postgresql/m05-p1.mdx:156-305,405-495` — PostgreSQL internals SQL, `createSlottedPage` (8 KB slotted page + HOT updates + `fillfactor`), `createWalAndCheckpointEngine` (`full_page_writes` FPI + `CHECKPOINT`), `classifyToastStorage`, and `evaluateXidFreeze` (32-bit XID wraparound). |
| **M3** | `M01-P1`–`M01-P5`, `M02-P1`–`M02-P4`, `M03-P1`–`M03-P4`, `M04-P1`–`M04-P3` & `M05-P1` official version links | **PASS** | `TECHNICAL_REVIEW_LOG.md:62-74,109-141,158-348` — Full `https://` official documentation URLs recorded for Modules 1–4 and `M05-P1` (`postgresql.org/docs/current/` resource config, page layout, `_fsm`/`_vm`, TOAST, HOT, routine vacuuming & WAL config). |
| **M4** | `M01-P1`–`M01-P5`, `M02-P1`–`M02-P4`, `M03-P1`–`M03-P4`, `M04-P1`–`M04-P3` & `M05-P1` inventory & report integrity | **PASS** | `CONTENT_CHECKLIST.md:27-279`, `content/syllabus.ts:69-1050`, `content/registry.ts:120-1315`, `content/interviews/` — 192 available topics (47 M01 + 46 M02 + 56 M03 + 36 M04 + 7 M05), 148 interview Q&As (`35` M01 + `35` M02 + `35` M03 + `35` M04 + `8` M05), 34 SVG diagrams (live Chrome `getBBox()` verified), 86 runnable blocks, and 109 safety mutations verified. |

---

## 4. What Cannot Be Automated

Automated checks catch structural, syntactic, geometric, and encoded-assertion regressions, **not** every form of quality failure. The manual audit remains mandatory for:
1. **Intuition & Simple English Quality (Rule M1):** Word/block counters prove text exists, not that an explanation is clear, well-paced, or free of unexplained jargon.
2. **Conceptual Prose-vs-Code Alignment (Rule M2):** Computers run the assertions engineers encode; they cannot judge whether a prose claim outside assertions matches a code subtlety or diagram label.
3. **External Version Fact-Checking (Rule M3):** Static checks cannot verify whether an author's summary of Node.js release notes or ECMA-262 semantics matches official upstream documentation.
4. **Architectural Reasoning Depth:** Checking `numberedSteps.length === 12` cannot grade whether a Senior/Architect answer addresses genuine failure modes cleanly.
5. **Semantic Topic-to-Exercise Alignment:** Verification confirms a mapped `exerciseTitle` exists in MDX, not that the exercise pedagogically practices that specific topic rather than a neighbor topic.
6. **Aesthetic Readability & Overlap Nuance:** SVG `getBBox()` catches `<text>` clipping outside `viewBox` and DOM `scrollWidth` catches horizontal overflow, while visual hierarchy and spacing clarity still benefit from human visual inspection.
