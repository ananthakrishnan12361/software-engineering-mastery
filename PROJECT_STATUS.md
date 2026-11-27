# Project Status — Software Engineering Mastery Handbook

## Current objective
Maintain a comfortable, offline-capable React + TypeScript + MDX learning portal built with Feature-Sliced Design v2.1 and bundled into `dist/software_engineering_mastery.html`.

## Overall status
**Modules 1–4 Complete + `M05-P1`–`M05-P2` Audited (`PASS`) — `M05-P3` next**

## Current phase
Phase 3 design remains locked in [DESIGN_GUIDE.md](DESIGN_GUIDE.md). Modules 1–4 (`185/185`) and `M05-P1`–`M05-P2` (`23/46`) are complete & verified (`208/945` topics across 18 lessons, `158` IQs; `M05-P3` next).

## Completed
- [x] Phase 1 & 2: Legacy v1 archived in `legacy/`, React 19 + TS + Vite 8 + MDX + `vite-plugin-singlefile` + Steiger setup
- [x] Reading Comfort: Light (`#F7F6F2`), Soft Dark (`#15181E`), Sepia (`#F3EAD8`) themes with WCAG AA tokens, `--border-control`, `color-scheme`, `16–20px` font size control, `72ch` column, `44px` touch targets, reduced motion
- [x] Simple Layout & 7 Hash Pages: Home, All Topics, Lesson, Interviews, Glossary, Bookmarks, Progress
- [x] All Topics & Syllabus: Typed 28-module syllabus (`content/syllabus.ts`, 945 topics) with explicit `TopicAnchor` links verified by `scripts/verify-syllabus.mjs`
- [x] Search: Real-content grouped search (`Ctrl+K` / full-screen mobile) with keyboard navigation and `Not written yet` marking
- [x] Filters: Combined URL-persisted filters on All Topics & Interviews with `Senior/Architect` / `Senior` / `Architect` matching and safe fallback to `"all"`
- [x] Verification: `tsc`, `vite build`, `steiger ./src`, `verify:syllabus`, `verify:parity`, `verify:offline`, and headless Chrome CDP checks at `360`, `390`, `768`, `1024`, `1440` widths across all 3 themes

## Module progress
Use `COURSE_OUTLINE.md` and `CONTENT_CHECKLIST.md` to track module and part status. Currently written: Module 1 complete (`47/47` topics, `35/35` IQs) + Module 2 complete (`46/46` topics, `35/35` IQs) + Module 3 complete (`56/56` topics, `35/35` IQs) + Module 4 complete (`36/36` topics, `35/35` IQs) + `M05-P1`–`M05-P2` (`23/46` topics, `18/35` IQs: `5` Basic, `6` Intermediate, `5` Advanced, `2` Senior/Architect) = `208` topics available, `737` not written yet.

## Current task
`M05-P2` completed, audited (`PASS`), and committed locally on `react-fsd`. Next part: `M05-P3` (Views, Materialized views, Functions, Stored procedures, Triggers, Constraints, JSON, JSONB).

## Next actions
1. Proceed to `M05-P3` (`PLAN -> WRITE -> CHECK -> AUDIT -> UPDATE -> COMMIT` on `react-fsd`).
2. User decides when to approve removing `legacy/`.

## Decisions
1. **Approved UI & Design Lock**: The Phase 3 UI design is approved and documented in `DESIGN_GUIDE.md` (themes, tokens, typography, spacing, reusable components, responsive breakpoints, and filter rules). Do not alter the design in future lesson work without user approval.
2. **Three Reading Themes**: Soft Light (`#F7F6F2`), Soft Dark (`#15181E`), and Sepia (`#F3EAD8`) with dedicated `--border-control` (`#767064`, `#737D8D`, `#7D6E52`) and zero pure `#000`/`#fff`.
3. **FSD v2.1 Layout**: `AppShell` and `SearchOverlay` live in `src/app/` (no `app/ui` segment), 7 route pages live in `src/pages/`, shared domain models & `InterviewQuestionCard` live in `src/entities/handbook/`, persistence lives in `src/entities/progress/`, and stateless props-only primitives live in `src/shared/`. Enforced via `steiger ./src` with zero disabled rules.
4. **Topic Anchors & Inherited Status**: Every written topic has an explicit `<TopicAnchor id="..." />` mapped in `content/syllabus.ts`. Topic completion/bookmark status is explicitly labeled as inherited from its parent lesson; unwritten topics never show completed or bookmarked.
5. **Filter Compatibility**: Old saved `sem_handbook_v1` filters never hide Lesson page content; invalid URL filter params fall back to `"all"`.

## Known issues / blockers
- Legacy v1 files remain in `legacy/` pending user approval to delete.
