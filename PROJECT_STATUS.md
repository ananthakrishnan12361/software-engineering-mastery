# Project Status — Software Engineering Mastery Handbook

## Current objective
Maintain a comfortable, offline-capable React + TypeScript + MDX learning portal built with Feature-Sliced Design v2.1 and bundled into `dist/software_engineering_mastery.html`.

## Overall status
**`M01-P1 Remediation` Completed & Independently Audited (`PASS`) — `M01-P2 Remediation` next before `M01-P3`**

## Current phase
Phase 3 design remains locked in [DESIGN_GUIDE.md](DESIGN_GUIDE.md). Content remediation is active for Module 1 (`M01-P1` remediated & verified with live Chrome SVG `getBBox()` checks; approved `M01-P2 Remediation` next before `M01-P3`).

## Completed
- [x] Phase 1 & 2: Legacy v1 archived in `legacy/`, React 19 + TS + Vite 8 + MDX + `vite-plugin-singlefile` + Steiger setup
- [x] Reading Comfort: Light (`#F7F6F2`), Soft Dark (`#15181E`), Sepia (`#F3EAD8`) themes with WCAG AA tokens, `--border-control`, `color-scheme`, `16–20px` font size control, `72ch` column, `44px` touch targets, reduced motion
- [x] Simple Layout & 7 Hash Pages: Home, All Topics, Lesson, Interviews, Glossary, Bookmarks, Progress
- [x] All Topics & Syllabus: Typed 28-module syllabus (`content/syllabus.ts`, 945 topics) with explicit `TopicAnchor` links verified by `scripts/verify-syllabus.mjs`
- [x] Search: Real-content grouped search (`Ctrl+K` / full-screen mobile) with keyboard navigation and `Not written yet` marking
- [x] Filters: Combined URL-persisted filters on All Topics & Interviews with `Senior/Architect` / `Senior` / `Architect` matching and safe fallback to `"all"`
- [x] Verification: `tsc`, `vite build`, `steiger ./src`, `verify:syllabus`, `verify:parity`, `verify:offline`, and headless Chrome CDP checks at `360`, `390`, `768`, `1024`, `1440` widths across all 3 themes

## Module progress
Use `COURSE_OUTLINE.md` and `CONTENT_CHECKLIST.md` to track module and part status. Currently written: `M01-P1` & `M01-P2` (`13` topics available, `932` not written yet; Module 1 interview totals: `7/10` Basic, `7/10` Intermediate, `6/10` Advanced, `3/5` Senior/Architect = `23/35`).

## Current task
Complete approved `M01-P2 Remediation` (`safeMerge` log/`isPlainObject`, SRP & ISP runnable code, Shallow vs. Deep Copying table, `WeakMap` & `WeakSet`, private field order note) before writing `M01-P3` (`Algorithms, Data structures, Time complexity, Space complexity, Big O, Recursion, Sorting, Searching, Hash maps, Stacks, Queues, Trees, Graph fundamentals`).

## Next actions
1. Run `M01-P2 Remediation` (`PLAN -> WRITE -> CHECK -> AUDIT -> UPDATE -> COMMIT` on `react-fsd`).
2. Proceed to `M01-P3` once `M01-P2 Remediation` passes `npm run quality` and fresh subagent audit.
3. User decides when to approve removing `legacy/`.

## Decisions
1. **Approved UI & Design Lock**: The Phase 3 UI design is approved and documented in `DESIGN_GUIDE.md` (themes, tokens, typography, spacing, reusable components, responsive breakpoints, and filter rules). Do not alter the design in future lesson work without user approval.
2. **Three Reading Themes**: Soft Light (`#F7F6F2`), Soft Dark (`#15181E`), and Sepia (`#F3EAD8`) with dedicated `--border-control` (`#767064`, `#737D8D`, `#7D6E52`) and zero pure `#000`/`#fff`.
3. **FSD v2.1 Layout**: `AppShell` and `SearchOverlay` live in `src/app/` (no `app/ui` segment), 7 route pages live in `src/pages/`, shared domain models & `InterviewQuestionCard` live in `src/entities/handbook/`, persistence lives in `src/entities/progress/`, and stateless props-only primitives live in `src/shared/`. Enforced via `steiger ./src` with zero disabled rules.
4. **Topic Anchors & Inherited Status**: Every written topic has an explicit `<TopicAnchor id="..." />` mapped in `content/syllabus.ts`. Topic completion/bookmark status is explicitly labeled as inherited from its parent lesson; unwritten topics never show completed or bookmarked.
5. **Filter Compatibility**: Old saved `sem_handbook_v1` filters never hide Lesson page content; invalid URL filter params fall back to `"all"`.

## Known issues / blockers
- Legacy v1 files remain in `legacy/` pending user approval to delete.
