# Project Status — Software Engineering Mastery Handbook

## Current objective
Maintain a comfortable, offline-capable React + TypeScript + MDX learning portal built with Feature-Sliced Design v2.1 and bundled into `dist/software_engineering_mastery.html`.

## Overall status
**Modules 1–7 Complete & Audited (`PASS`) + Module 8 Parts 1–2 Complete — `M08-P3` next**

## Current phase
Phase 3 design remains locked in [DESIGN_GUIDE.md](DESIGN_GUIDE.md). Modules 1–7 plus Module 8 Parts 1–2 (`309/951` topics across 27 lessons, `265` IQs) are complete & verified (`M08-P3` next).

## Completed
- [x] Phase 1 & 2: Legacy v1 archived in `legacy/`, React 19 + TS + Vite 8 + MDX + `vite-plugin-singlefile` + Steiger setup
- [x] Reading Comfort: Light (`#F7F6F2`), Soft Dark (`#15181E`), Sepia (`#F3EAD8`) themes with WCAG AA tokens, `--border-control`, `color-scheme`, `16–20px` font size control, `72ch` column, `44px` touch targets, reduced motion
- [x] Simple Layout & 7 Hash Pages: Home, All Topics, Lesson, Interviews, Glossary, Bookmarks, Progress
- [x] All Topics & Syllabus: Typed 28-module syllabus (`content/syllabus.ts`, 951 topics) with explicit `TopicAnchor` links verified by `scripts/verify-syllabus.mjs`
- [x] Search: Real-content grouped search (`Ctrl+K` / full-screen mobile) with keyboard navigation and `Not written yet` marking
- [x] Filters: Combined URL-persisted filters on All Topics & Interviews with `Senior/Architect` / `Senior` / `Architect` matching and safe fallback to `"all"`
- [x] Verification: `tsc`, `vite build`, `steiger ./src`, `verify:syllabus`, `verify:parity`, `verify:offline`, and headless Chrome CDP checks at `360`, `390`, `768`, `1024`, `1440` widths across all 3 themes

## Module progress
Use `COURSE_OUTLINE.md` and `CONTENT_CHECKLIST.md` to track module and part status. Currently written: Module 1 complete (`47/47` topics, `35/35` IQs) + Module 2 complete (`46/46` topics, `35/35` IQs) + Module 3 complete (`56/56` topics, `35/35` IQs) + Module 4 complete (`36/36` topics, `35/35` IQs) + Module 5 complete (`46/46` topics, `35/35` IQs) + Module 6 complete (`25/25` topics, `35/35` IQs) + Module 7 complete (`34/34` topics, `35/35` IQs: `10` Basic, `10` Intermediate, `10` Advanced, `5` Senior/Architect) + Module 8 in progress (Parts 1–2 of 4: `19/40` topics plus 6 example topics for Part 4, `20/35` IQs) = `309` topics available, `642` not written yet.

## Current task
Module 8 Parts 1–2 complete (`M08-P1` and `M08-P2` audited `PASS` and committed locally on `react-fsd`; diagram colour bug fixed across Modules 1–4 and 6–8 and a quality check added for undefined diagram colour variables). Next part: `M08-P3` (Query access patterns: index scans, seeks, lookups, table and sequential scans, composite column order, leftmost-prefix principle, sorting, filtering, JOIN, GROUP BY, ORDER BY optimization, index-only scans).

## Next actions
1. Proceed to `M08-P3` (`PLAN -> WRITE -> CHECK -> AUDIT -> UPDATE -> COMMIT` on `react-fsd`).
2. User decides when to approve removing `legacy/`.

## Decisions
1. **Approved UI & Design Lock**: The Phase 3 UI design is approved and documented in `DESIGN_GUIDE.md` (themes, tokens, typography, spacing, reusable components, responsive breakpoints, and filter rules). Do not alter the design in future lesson work without user approval.
2. **Three Reading Themes**: Soft Light (`#F7F6F2`), Soft Dark (`#15181E`), and Sepia (`#F3EAD8`) with dedicated `--border-control` (`#767064`, `#737D8D`, `#7D6E52`) and zero pure `#000`/`#fff`.
3. **FSD v2.1 Layout**: `AppShell` and `SearchOverlay` live in `src/app/` (no `app/ui` segment), 7 route pages live in `src/pages/`, shared domain models & `InterviewQuestionCard` live in `src/entities/handbook/`, persistence lives in `src/entities/progress/`, and stateless props-only primitives live in `src/shared/`. Enforced via `steiger ./src` with zero disabled rules.
4. **Topic Anchors & Inherited Status**: Every written topic has an explicit `<TopicAnchor id="..." />` mapped in `content/syllabus.ts`. Topic completion/bookmark status is explicitly labeled as inherited from its parent lesson; unwritten topics never show completed or bookmarked.
5. **Filter Compatibility**: Old saved `sem_handbook_v1` filters never hide Lesson page content; invalid URL filter params fall back to `"all"`.

## Known issues / blockers
- Legacy v1 files remain in `legacy/` pending user approval to delete.
