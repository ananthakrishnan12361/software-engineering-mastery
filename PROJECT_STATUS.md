# Project Status — Software Engineering Mastery Handbook

## Current objective
Maintain a complete, technically accurate, offline-capable React + TypeScript + MDX learning portal structured with Feature-Sliced Design v2.1 and bundled into `dist/software_engineering_mastery.html`.

## Overall status
**Phase 2 (React + TypeScript + Vite 8 + FSD v2.1 Migration) complete — awaiting user verification before removing `legacy/`**

## Current phase
Phase 2 complete: Legacy v1 files archived in `legacy/`; new React 19 + TypeScript + Vite 8 + MDX + `vite-plugin-singlefile` application built under strict FSD v2.1 ("pages first") with zero Steiger findings; Module 1 Part 1 (`M01-P1`) migrated with 100% parity.

## Completed
- [x] Read and analyze all 8 specification and companion `.md` files
- [x] Confirm approved master prompt (`COURSE_modeule_in_detiles.md`) and resolve conflicts
- [x] Reconcile `COURSE_OUTLINE.md` (28 modules) and create `CONTENT_CHECKLIST.md`
- [x] Phase 1: Build and verify vanilla HTML/CSS/JS v1 portal + `M01-P1` (now archived in `legacy/`)
- [x] Archive v1 source (`index.html`, `assets/`, `modules/`, `build.js`, `software_engineering_mastery_v1.html`) into `legacy/`
- [x] Scaffold Vite 8 + React 19 + TypeScript + `@mdx-js/rollup` + `remark-gfm` + `vite-plugin-singlefile` + Steiger (`@feature-sliced/steiger-plugin`)
- [x] Implement FSD v2.1 architecture (`src/app`, `src/pages/handbook`, `src/entities/progress`, `src/shared`)
- [x] Migrate `M01-P1` prose to `content/modules/01-programming/m01-p1.mdx` and 14 interview Q&As to `content/interviews/m01-p1.questions.ts`
- [x] Verify `tsc --noEmit`, `vite build`, `steiger ./src`, content parity, offline bundle, and `sem_handbook_v1` JSON import

## Module progress
Use `COURSE_OUTLINE.md` and `CONTENT_CHECKLIST.md` to track module and part status. Currently complete: `M01-P1` (migrated to MDX + typed Q&A).

## Current task
STOP after Phase 2 migration verification and await user approval to remove `legacy/` and begin writing Module 1 Part 2 (`M01-P2`).

## Next actions
1. User verifies `dist/software_engineering_mastery.html` in a browser and approves removing `legacy/`.
2. Upon approval, begin authoring `M01-P2` (`content/modules/01-programming/m01-p2.mdx` + `content/interviews/m01-p2.questions.ts`).

## Decisions
1. **Master Prompt Precedence**: `COURSE_modeule_in_detiles.md` is the authoritative syllabus source of truth, updated with Section 8 ("Approved Changes").
2. **React + Vite 8 + Singlefile Build**: React 19 (`^19.3.1`), TypeScript (`^7.0.2`), Vite 8 (`^8.3.8`), `@vitejs/plugin-react` (`^6.3.0`), `@mdx-js/rollup` + `@mdx-js/react` (`^3.1.1`), `remark-gfm` (`^4.0.1`), and `vite-plugin-singlefile` (`^2.3.4`) emit a single offline bundle `dist/software_engineering_mastery.html`.
3. **FSD v2.1 (Pages First)**: Strictly follows `app -> pages -> widgets -> features -> entities -> shared`. Single-use UI/domain logic lives in `src/pages/handbook/`; `src/entities/progress/` is shared between `app` and `pages/handbook`; `src/shared/` holds stateless props-driven UI, styles, pure libs, and config with zero upward imports. Enforced with Steiger (`steiger ./src`) with zero disabled rules.
4. **Content Isolation**: Course MDX and typed interview banks reside only in root `content/`, using type-only imports from `@/pages/handbook`. Only `src/app/App.tsx` loads `content/registry.ts` and passes data down.
5. **Routing & Persistence**: Uses hash routing (`#/lesson/<lessonId>?section=<sectionId>`) and preserves `localStorage` compatibility under `sem_handbook_v1`.
6. **Lesson Format & Difficulty Levels**: Sections A–Q + Learning Objectives, Estimated Study Duration, and Mastery Assessment; 4 difficulty levels everywhere except Module 26 (5 levels).

## Known issues / blockers
- Legacy v1 files remain in `legacy/` pending user verification and removal approval.

## Working rules
- Do not mark work complete unless files exist and have been checked.
- Do not overwrite completed work without a reason.
- Record blockers, conflicts, and version-sensitive claims in `TECHNICAL_REVIEW_LOG.md`.
