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
│   ├── registry.ts                      # Module/lesson manifest, search index, glossary extraction (loaded only by src/app/)
│   ├── modules/
│   │   └── 01-programming/
│   │       └── m01-p1.mdx               # Migrated Module 1 Part 1 lesson (Sections A–L, O–Q)
│   └── interviews/
│       └── m01-p1.questions.ts          # Typed interview Q&As (Sections M/N)
│
├── src/                                 # Feature-Sliced Design v2.1 (pages-first, no empty folders)
│   ├── app/
│   │   ├── main.tsx                     # Root mount + shared styles import
│   │   └── App.tsx                      # Loads content/registry.ts, manages theme & sem_handbook_v1 persistence
│   ├── pages/
│   │   └── handbook/                    # Pages-first slice: page layout, filters, search, modals, lesson viewer, typed models
│   │       ├── index.ts
│   │       ├── model/
│   │       │   ├── types.ts
│   │       │   └── searchIndex.ts
│   │       └── ui/
│   │           ├── GlossaryModal.tsx
│   │           ├── HandbookPage.tsx
│   │           ├── InterviewBank.tsx
│   │           ├── InterviewQuestionCard.tsx
│   │           ├── LessonViewer.tsx
│   │           ├── ProgressModal.tsx
│   │           ├── RightToc.tsx
│   │           ├── SearchPopover.tsx
│   │           ├── Sidebar.tsx
│   │           └── Topbar.tsx
│   ├── entities/
│   │   └── progress/                    # sem_handbook_v1 schema, localStorage persistence, JSON import/export
│   │       ├── index.ts
│   │       └── model/
│   │           └── progressStorage.ts
│   └── shared/                          # Lowermost layer (zero upward imports, props-only UI)
│       ├── config/                      # Category options, difficulty labels, MDX type declarations
│       ├── lib/                         # hashRouter, storage, highlightCode, runJsSandbox
│       ├── styles/                      # tokens.css, global.css, print.css
│       └── ui/                          # Badge, Button, Callout, CodeBlock, ComparisonTable, DiagramCard, ExerciseCard, GlossaryTerm, Modal, ProgressBar, RichText, TopicSection
│
├── scripts/
│   ├── verify-parity.mjs                # Verifies content counts & runnable demos against legacy v1
│   └── verify-offline.mjs               # Verifies zero external URLs/CDNs & v1 sem_handbook_v1 JSON import
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
