# Project Status — Software Engineering Mastery Handbook

## Current objective
Maintain a comfortable, offline-capable React + TypeScript + MDX learning portal built with Feature-Sliced Design v2.1 and bundled into `dist/software_engineering_mastery.html`.

## Overall status
**Phase 3 (Reading-Comfort Redesign, 28-Module Syllabus & Multi-Page Hash Portal) complete — awaiting user verification**

## Current phase
Phase 3 complete: Implemented Light / Soft Dark / Sepia themes (`--border-control`, `color-scheme`, `16–20px` font control, `1.7` line-height, `72ch` column), compact Lesson & Home layouts, All Topics page (28 modules, 945 topics), grouped `Ctrl+K` / mobile full-screen Search, combined URL-persisted Filters, and 7 hash-routed pages.

## Completed
- [x] Phase 1 & 2: Legacy v1 archived in `legacy/`, React 19 + TS + Vite 8 + MDX + `vite-plugin-singlefile` + Steiger setup
- [x] Reading Comfort: Light (`#F7F6F2`), Soft Dark (`#15181E`), Sepia (`#F3EAD8`) themes with WCAG AA tokens, `--border-control`, `color-scheme`, `16–20px` font size control, `72ch` column, `44px` touch targets, reduced motion
- [x] Simple Layout & 7 Hash Pages: Home, All Topics, Lesson, Interviews, Glossary, Bookmarks, Progress
- [x] All Topics & Syllabus: Typed 28-module syllabus (`content/syllabus.ts`, 945 topics) with explicit `TopicAnchor` links verified by `scripts/verify-syllabus.mjs`
- [x] Search: Real-content grouped search (`Ctrl+K` / full-screen mobile) with keyboard navigation and `Not written yet` marking
- [x] Filters: Combined URL-persisted filters on All Topics & Interviews with `Senior/Architect` / `Senior` / `Architect` matching and safe fallback to `"all"`
- [x] Verification: `tsc`, `vite build`, `steiger ./src`, `verify:syllabus`, `verify:parity`, `verify:offline`, and headless Chrome CDP checks at `360`, `390`, `768`, `1024`, `1440` widths across all 3 themes

## Module progress
Use `COURSE_OUTLINE.md` and `CONTENT_CHECKLIST.md` to track module and part status. Currently written: `M01-P1` (`4` topics available, `941` not written yet).

## Current task
STOP after Phase 3 verification and await user review before removing `legacy/` or writing `M01-P2`.

## Next actions
1. User inspects `dist/software_engineering_mastery.html` across themes/devices and approves removing `legacy/`.
2. Upon approval, begin authoring `M01-P2` (`content/modules/01-programming/m01-p2.mdx` + `content/interviews/m01-p2.questions.ts`) and mapping its `TopicAnchor`s in `content/syllabus.ts`.

## Decisions
1. **Three Reading Themes**: Soft Light (`#F7F6F2`), Soft Dark (`#15181E`), and Sepia (`#F3EAD8`) with dedicated `--border-control` (`#767064`, `#737D8D`, `#7D6E52`) and zero pure `#000`/`#fff`.
2. **FSD v2.1 Layout**: `AppShell` and `SearchOverlay` live in `src/app/` (no `app/ui` segment), 7 route pages live in `src/pages/`, shared domain models & `InterviewQuestionCard` live in `src/entities/handbook/`, persistence lives in `src/entities/progress/`, and stateless props-only primitives live in `src/shared/`. Enforced via `steiger ./src` with zero disabled rules.
3. **Topic Anchors & Inherited Status**: Every written topic has an explicit `<TopicAnchor id="..." />` mapped in `content/syllabus.ts`. Topic completion/bookmark status is explicitly labeled as inherited from its parent lesson; unwritten topics never show completed or bookmarked.
4. **Filter Compatibility**: Old saved `sem_handbook_v1` filters never hide Lesson page content; invalid URL filter params fall back to `"all"`.

## Known issues / blockers
- Legacy v1 files remain in `legacy/` pending user approval to delete.
