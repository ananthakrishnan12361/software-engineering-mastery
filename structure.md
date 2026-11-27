software-engineering-mastery/
│
├── index.html                           # Vite root entry HTML
├── package.json                         # React 19, TypeScript, Vite 8, MDX, vite-plugin-singlefile, Steiger
├── tsconfig.json
├── vite.config.ts                       # Singlefile + MDX + remark-gfm build -> dist/software_engineering_mastery.html
├── steiger.config.ts                    # Official FSD v2.1 boundary linter config
├── .gitignore                           # Excludes node_modules/, dist/, caches
│
├── content/                             # Course data only (type-only imports from public APIs)
│   ├── syllabus.ts                      # Typed 28-module syllabus (951 topics, explicit anchor map)
│   ├── registry.ts                      # Generated search index, glossary extraction, lesson manifest (loaded only by src/app/)
│   ├── modules/
│   │   └── 01-programming/
│   │       └── m01-p1.mdx               # Migrated Module 1 Part 1 lesson (Sections A–L, O–Q, TopicAnchors)
│   └── interviews/
│       └── m01-p1.questions.ts          # Typed interview Q&As (Sections M/N)
│
├── src/                                 # Feature-Sliced Design v2.1 (pages-first, no empty folders)
│   ├── app/
│   │   ├── main.tsx                     # Root mount + shared styles import
│   │   ├── App.tsx                      # Loads content/registry.ts, manages theme/fontSize/sem_handbook_v1 & 7 page routes
│   │   ├── AppShell.tsx                 # Header (menu, short title, search trigger, theme, More menu) & Sidebar/Drawer
│   │   └── SearchOverlay.tsx            # Ctrl+K / full-screen mobile grouped search with keyboard nav
│   ├── pages/
│   │   ├── home/                        # Continue learning, stats, quick navigation
│   │   ├── topics/                      # All 28 modules & 951 topics with URL-persisted filters & status badges
│   │   ├── lesson/                      # Compact lesson header, collapsible A-Q, Prev/Next, RightToc + drawer
│   │   ├── interviews/                  # Cross-course interviews with URL-persisted difficulty & module filters
│   │   ├── glossary/                    # Searchable glossary with jump-to-section links
│   │   ├── bookmarks/                   # Saved lessons & unbookmark actions
│   │   └── progress/                    # Completion & mastery breakdown + sem_handbook_v1 JSON export/import/reset
│   ├── entities/
│   │   ├── handbook/                    # Shared domain types, InterviewQuestionCard, difficulty & filter helpers
│   │   └── progress/                    # sem_handbook_v1 schema, localStorage persistence, JSON import/export
│   └── shared/                          # Lowermost layer (zero upward imports, props-only UI)
│       ├── config/                      # ThemeMode (light/dark/sepia), FontSizePx, PageId, categories, MDX types
│       ├── lib/                         # hashRouter (multi-page + query params), storage, highlightCode, runJsSandbox
│       ├── styles/                      # tokens.css (Light/Soft Dark/Sepia + --border-control), global.css, print.css
│       └── ui/                          # Badge, Button, Callout, CodeBlock, ComparisonTable, DiagramCard, ExerciseCard, GlossaryTerm, Modal, ProgressBar, RichText, TopicAnchor, TopicSection
│
├── scripts/
│   ├── verify-syllabus.mjs              # Verifies 28 modules & explicit anchors against COURSE_modeule_in_detiles.md
│   ├── verify-parity.mjs                # Verifies content counts & runnable demos against legacy v1
│   └── verify-offline.mjs               # Verifies zero CDNs, filters, difficulty rules & v1 sem_handbook_v1 import
│
├── dist/
│   └── software_engineering_mastery.html # Standalone offline single-file build output
│
└── legacy/                              # Archived v1 vanilla HTML/CSS/JS source (kept until user approves removal)
    ├── index.html
    ├── build.js
    ├── software_engineering_mastery_v1.html
    ├── assets/
    └── modules/
