# Design Guide — Software Engineering Mastery Handbook

This document locks the approved UI system for all future module and lesson work. Reuse these tokens, components, breakpoints, and filter rules as-is; do not change the design without explicit user approval.

---

## 1. Themes & Color Tokens (`src/shared/styles/tokens.css`)

- **No pure `#000000` or `#FFFFFF`** in any theme.
- **Native scrollbars:** `color-scheme: light` (Light, Sepia) and `color-scheme: dark` (Soft Dark) set on `html[data-theme]`, paired with `scrollbar-color: var(--border-control) var(--bg-page)`.
- **Border distinction:** `--border` is for decorative dividers/containers; `--border-control` is for interactive controls (inputs, selects, buttons, checkboxes).

| Token | Light (`data-theme="light"`) | Soft Dark (`data-theme="dark"`) | Sepia (`data-theme="sepia"`) |
|---|---|---|---|
| `--bg-page` | `#F7F6F2` | `#15181E` | `#F3EAD8` |
| `--bg-surface` | `#EFECE6` | `#1C2028` | `#EAE0CA` |
| `--bg-elevated` | `#E6E2DA` | `#242A34` | `#E1D5BC` |
| `--bg-subtle` | `#F2F0EB` | `#191D24` | `#EEE4D0` |
| `--bg-code` | `#ECEAE3` | `#12151A` | `#E7DEC8` |
| `--border` | `#D6D1C7` | `#2C333F` | `#CFC2A8` |
| `--border-control` | `#767064` | `#737D8D` | `#7D6E52` |
| `--text-primary` | `#1E242B` | `#E1E5EB` | `#2F261D` |
| `--text-secondary` | `#434C56` | `#B1BAC6` | `#524436` |
| `--text-muted` | `#5C6670` | `#8E98A6` | `#695949` |
| `--accent` | `#255899` | `#74A8E8` | `#7A4B23` |
| `--accent-strong` | `#1B4479` | `#9AC2F2` | `#5E3818` |
| `--accent-contrast` | `#F7F6F2` | `#15181E` | `#F3EAD8` |
| `--success` | `#166530` | `#56D364` | `#1E5E32` |
| `--warning` | `#7A4F00` | `#E3B341` | `#754900` |
| `--danger` | `#B31D28` | `#FF7B72` | `#9E1F28` |
| `--purple` | `#5E35B1` | `#D2A8FF` | `#5D338F` |

Syntax tokens (`--tok-kw`, `--tok-str`, `--tok-num`, `--tok-com`, `--tok-fn`, `--tok-bi`) are tuned in `tokens.css` for WCAG AA contrast on `--bg-code` in all three themes.

---

## 2. Typography, Reading Measure & Spacing

- **Fonts:** System stacks only (`--font-sans`, `--font-mono`). No external fonts or CDNs.
- **Body size & rhythm:** `--body-font-size` defaults to `16px` (`16`, `17`, `18`, `20` selectable in header `"More"` menu; saved in `sem_handbook_v1`), `--body-line-height: 1.7`.
- **Reading measure:** `--measure: 72ch`; `.main-content` uses `max-width: min(calc(var(--measure) + 64px), 100%)` with `min-width: 0`.
- **Layout rhythm & first-screen rule:**
  - Keep headers compact (`--header-h: 56px`) and avoid large stacked outer cards around lesson content.
  - On the Lesson page, keep the compact single header + `<details class="objectives-disclosure">` so Section A lesson prose appears on the first screen at both `360px` and `1440px`.
  - Use flat `.topic-section` blocks separated by subtle `--border` dividers (`padding: 6px 0 14px`, `margin-bottom: 10px`).
- **Accessibility & motion:**
  - `:focus-visible` uses `2px solid var(--accent)` with `outline-offset: 2px`.
  - `@media (prefers-reduced-motion: reduce)` disables smooth scrolling and transitions.
  - Primary interactive controls maintain `>= 44px` touch target height (`min-height: 44px`; `.btn-small` scales to `44px` below `1200px`).

---

## 3. Reusable Components

All shared primitives live in `src/shared/ui/` (stateless/props-driven, zero upward imports):

- `Badge` (`accent`, `neutral`, `unwritten`, `basic`, `intermediate`, `advanced`, `senior-architect`, `senior`, `architect`) — `white-space: nowrap; flex-shrink: 0;`
- `Button` (`small`, `primary`, `secondary`, `danger`, `pill`, `icon`)
- `Callout` (`info`, `tip`, `warn`, `danger`)
- `CodeBlock` (offline syntax highlighter, Copy button, optional editable `runnable` JS sandbox)
- `ComparisonTable` (`.table-wrap` horizontal overflow container)
- `DiagramCard` (themed inline `<svg>` wrapper with `<figcaption>` and internal scroll)
- `ExerciseCard` (expandable solution/approach toggle)
- `GlossaryTerm` (`<dfn data-definition="..." title="...">`)
- `Modal` (accessible Escape/backdrop dialog)
- `ProgressBar`
- `RichText` (safe inline `` `code` ``, `**bold**`, `*italic*` renderer)
- `TopicAnchor` (`<span id="..." className="topic-anchor" />` for explicit syllabus topic links)
- `TopicSection` (collapsible A–Q section controlled via `collapsed` and `onToggle` props)

Shared domain card in `src/entities/handbook/ui/`:
- `InterviewQuestionCard` (reused by Lesson page `LessonInterviewBank` and `InterviewsPage`)

---

## 4. Responsive Breakpoints

- **Mobile (`360px – 767px`):** Single-column layout, slide-out Sidebar drawer, slide-out `"On this page"` TOC drawer, full-screen Search overlay, compact topbar (`<= 440px` hides `.brand-mark` and `.theme-label` so all `44px` controls fit at `360px` without overlap). Code blocks, tables, and SVG diagrams scroll inside their own containers with zero page-level horizontal scroll.
- **Tablet (`768px – 1199px`, portrait & landscape):** Single centered `72ch` column (`padding: 16px 24px 56px`); Sidebar and `"On this page"` open as drawers.
- **Desktop (`>= 1200px`):** 2-column (`256px` Sidebar + centered `72ch` Main) or 3-column on Lesson page (`256px` Sidebar + `72ch` Main + `224px` sticky Right TOC).
- **Large font drawer threshold (`<= 1360px` at `18px`/`20px` font):** Right TOC automatically collapses to the `"On this page"` drawer so the `72ch` column stays comfortable without horizontal crowding.

---

## 5. Hash Routing & Filter Behavior

- **Header:** Menu toggle, short title (`SE Mastery`), Search (`Ctrl+K` / mobile full-screen), Theme toggle, `"More"` menu. No filter dropdowns in the header.
- **All Topics (`#/topics`):** Supports combined `AND` filters persisted in the hash URL: `category`, `availability` (`all | available | unwritten`), `completed` (`all | completed | incomplete`), and `bookmarked` (`all | bookmarked`). Topics inherit `Completed` and `Bookmarked` status from their parent lesson (explicitly labeled); unwritten topics are never completed or bookmarked.
- **Interviews (`#/interviews`):** Supports combined `difficulty` and `module` filters persisted in the hash URL.
  - `senior-architect` matches `senior-architect`, `senior`, and `architect`.
  - `senior` matches `senior` and `senior-architect`.
  - `architect` matches `architect` and `senior-architect`.
- **Resilience:** Invalid URL filter parameters fall back to `"all"`. Every filtered view shows live result counts, active filter chips, `Clear All`, and an empty state. Old saved `sem_handbook_v1` filters never hide Lesson page content.
