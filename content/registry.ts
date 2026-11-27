import type {
  GlossaryEntry,
  InterviewQuestion,
  LessonRecord,
  ModuleRecord,
  SearchRecord,
  SyllabusModule
} from "@/entities/handbook";

import M01P1Mdx from "./modules/01-programming/m01-p1.mdx";
import m01p1Raw from "./modules/01-programming/m01-p1.mdx?raw";
import M01P2Mdx from "./modules/01-programming/m01-p2.mdx";
import m01p2Raw from "./modules/01-programming/m01-p2.mdx?raw";
import M01P3Mdx from "./modules/01-programming/m01-p3.mdx";
import m01p3Raw from "./modules/01-programming/m01-p3.mdx?raw";
import M01P4Mdx from "./modules/01-programming/m01-p4.mdx";
import m01p4Raw from "./modules/01-programming/m01-p4.mdx?raw";
import M01P5Mdx from "./modules/01-programming/m01-p5.mdx";
import m01p5Raw from "./modules/01-programming/m01-p5.mdx?raw";
import M02P1Mdx from "./modules/02-react/m02-p1.mdx";
import m02p1Raw from "./modules/02-react/m02-p1.mdx?raw";
import M02P2Mdx from "./modules/02-react/m02-p2.mdx";
import m02p2Raw from "./modules/02-react/m02-p2.mdx?raw";
import M02P3Mdx from "./modules/02-react/m02-p3.mdx";
import m02p3Raw from "./modules/02-react/m02-p3.mdx?raw";
import M02P4Mdx from "./modules/02-react/m02-p4.mdx";
import m02p4Raw from "./modules/02-react/m02-p4.mdx?raw";
import M03P1Mdx from "./modules/03-nodejs/m03-p1.mdx";
import m03p1Raw from "./modules/03-nodejs/m03-p1.mdx?raw";
import M03P2Mdx from "./modules/03-nodejs/m03-p2.mdx";
import m03p2Raw from "./modules/03-nodejs/m03-p2.mdx?raw";
import M03P3Mdx from "./modules/03-nodejs/m03-p3.mdx";
import m03p3Raw from "./modules/03-nodejs/m03-p3.mdx?raw";
import M03P4Mdx from "./modules/03-nodejs/m03-p4.mdx";
import m03p4Raw from "./modules/03-nodejs/m03-p4.mdx?raw";
import M04P1Mdx from "./modules/04-database-fundamentals/m04-p1.mdx";
import m04p1Raw from "./modules/04-database-fundamentals/m04-p1.mdx?raw";
import M04P2Mdx from "./modules/04-database-fundamentals/m04-p2.mdx";
import m04p2Raw from "./modules/04-database-fundamentals/m04-p2.mdx?raw";
import M04P3Mdx from "./modules/04-database-fundamentals/m04-p3.mdx";
import m04p3Raw from "./modules/04-database-fundamentals/m04-p3.mdx?raw";
import M05P1Mdx from "./modules/05-postgresql/m05-p1.mdx";
import m05p1Raw from "./modules/05-postgresql/m05-p1.mdx?raw";
import M05P2Mdx from "./modules/05-postgresql/m05-p2.mdx";
import m05p2Raw from "./modules/05-postgresql/m05-p2.mdx?raw";
import M05P3Mdx from "./modules/05-postgresql/m05-p3.mdx";
import m05p3Raw from "./modules/05-postgresql/m05-p3.mdx?raw";
import M05P4Mdx from "./modules/05-postgresql/m05-p4.mdx";
import m05p4Raw from "./modules/05-postgresql/m05-p4.mdx?raw";
import M06P1Mdx from "./modules/06-mysql/m06-p1.mdx";
import m06p1Raw from "./modules/06-mysql/m06-p1.mdx?raw";
import M06P2Mdx from "./modules/06-mysql/m06-p2.mdx";
import m06p2Raw from "./modules/06-mysql/m06-p2.mdx?raw";
import M07P1Mdx from "./modules/07-mssql/m07-p1.mdx";
import m07p1Raw from "./modules/07-mssql/m07-p1.mdx?raw";
import M07P2Mdx from "./modules/07-mssql/m07-p2.mdx";
import m07p2Raw from "./modules/07-mssql/m07-p2.mdx?raw";
import M07P3Mdx from "./modules/07-mssql/m07-p3.mdx";
import m07p3Raw from "./modules/07-mssql/m07-p3.mdx?raw";
import M08P1Mdx from "./modules/08-indexing/m08-p1.mdx";
import m08p1Raw from "./modules/08-indexing/m08-p1.mdx?raw";
import { m01p1Questions } from "./interviews/m01-p1.questions";
import { m01p2Questions } from "./interviews/m01-p2.questions";
import { m01p3Questions } from "./interviews/m01-p3.questions";
import { m01p4Questions } from "./interviews/m01-p4.questions";
import { m01p5Questions } from "./interviews/m01-p5.questions";
import { m02p1Questions } from "./interviews/m02-p1.questions";
import { m02p2Questions } from "./interviews/m02-p2.questions";
import { m02p3Questions } from "./interviews/m02-p3.questions";
import { m02p4Questions } from "./interviews/m02-p4.questions";
import { m03p1Questions } from "./interviews/m03-p1.questions";
import { m03p2Questions } from "./interviews/m03-p2.questions";
import { m03p3Questions } from "./interviews/m03-p3.questions";
import { m03p4Questions } from "./interviews/m03-p4.questions";
import { m04p1Questions } from "./interviews/m04-p1.questions";
import { m04p2Questions } from "./interviews/m04-p2.questions";
import { m04p3Questions } from "./interviews/m04-p3.questions";
import { m05p1Questions } from "./interviews/m05-p1.questions";
import { m05p2Questions } from "./interviews/m05-p2.questions";
import { m05p3Questions } from "./interviews/m05-p3.questions";
import { m05p4Questions } from "./interviews/m05-p4.questions";
import { m06p1Questions } from "./interviews/m06-p1.questions";
import { m06p2Questions } from "./interviews/m06-p2.questions";
import { m07p1Questions } from "./interviews/m07-p1.questions";
import { m07p2Questions } from "./interviews/m07-p2.questions";
import { m07p3Questions } from "./interviews/m07-p3.questions";
import { m08p1Questions } from "./interviews/m08-p1.questions";
import { SYLLABUS_MODULES } from "./syllabus";

export interface HandbookCatalog {
  modules: ModuleRecord[];
  lessons: LessonRecord[];
  syllabusModules: SyllabusModule[];
  questionsByLesson: Record<string, InterviewQuestion[]>;
  allQuestions: InterviewQuestion[];
  glossaryEntries: GlossaryEntry[];
  searchRecords: SearchRecord[];
}

function extractGlossaryFromMdx(rawMdx: string, lessonId: string): GlossaryEntry[] {
  const entries: GlossaryEntry[] = [];
  const seen = new Set<string>();
  const sectionMatches = [...rawMdx.matchAll(/<TopicSection\s+id="([^"]+)"[^>]*>/g)];

  const dfnRe = /<GlossaryTerm\s+definition="([^"]+)">([\s\S]*?)<\/GlossaryTerm>/g;
  let match: RegExpExecArray | null;
  while ((match = dfnRe.exec(rawMdx)) !== null) {
    const definition = match[1].trim();
    const term = match[2].replace(/\s+/g, " ").trim();
    const pos = match.index;
    let sectionId = `${lessonId}-sec-a`;
    for (const sec of sectionMatches) {
      if ((sec.index ?? 0) <= pos) {
        sectionId = sec[1];
      }
    }
    const key = term.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      entries.push({ term, definition, lessonId, sectionId });
    }
  }
  return entries;
}

function extractSearchRecordsFromMdx(
  rawMdx: string,
  lessonId: string,
  lessonTitle: string,
  moduleNumber: number
): SearchRecord[] {
  const records: SearchRecord[] = [];

  const sectionRe =
    /<TopicSection\s+id="([^"]+)"\s+letter="([^"]+)"\s+title="([^"]+)">([\s\S]*?)<\/TopicSection>/g;
  let match: RegExpExecArray | null;
  while ((match = sectionRe.exec(rawMdx)) !== null) {
    const [, secId, letter, title, body] = match;
    const cleanText = body
      .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\{\`[\s\S]*?\`\}/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    records.push({
      id: `sec:${secId}`,
      type: "Section",
      title: `${lessonTitle} — ${letter}. ${title}`,
      text: `${title} ${cleanText}`,
      available: true,
      moduleNumber,
      lessonId,
      sectionId: secId
    });

    const codeRe = /<CodeBlock\s+lang="([^"]+)"[\s\S]*?code=\{`([\s\S]*?)`\}\s*\/>/g;
    let codeMatch: RegExpExecArray | null;
    let codeIdx = 0;
    while ((codeMatch = codeRe.exec(body)) !== null) {
      codeIdx++;
      records.push({
        id: `code:${secId}:${codeIdx}`,
        type: "Code",
        title: `${lessonTitle} (${codeMatch[1]})`,
        text: codeMatch[2],
        available: true,
        moduleNumber,
        lessonId,
        sectionId: secId
      });
    }
  }

  return records;
}

const modules: ModuleRecord[] = [
  {
    id: "module-1",
    number: 1,
    title: "Programming Fundamentals & JavaScript",
    category: "fundamentals",
    partSummary: "Parts 1–5 of 5 (Complete)",
    scopeSummary:
      "Scope (Parts 1–5): Programming Fundamentals, Variables, Types, Functions, OOP, SOLID, Algorithms, Data Structures, JS Internals, Event Loop, GC & TypeScript",
    lead: "Complete foundation from memory models and JavaScript/V8 internals to OOP, SOLID, algorithms, data structures, async event loop, and TypeScript type safety.",
    lessonIds: ["m01-p1", "m01-p2", "m01-p3", "m01-p4", "m01-p5"]
  },
  {
    id: "module-2",
    number: 2,
    title: "React & Frontend Engineering",
    category: "frontend",
    partSummary: "Parts 1–4 of 4",
    scopeSummary:
      "Scope (Parts 1–4): Complete React & Frontend Engineering — Architecture, Hooks, State, Routing, Forms, Auth, Performance, a11y, Security, Architecture & Testing",
    lead: "Master React's declarative UI model, Fiber internals, Hooks, state management, routing, auth, performance, accessibility, XSS/CSRF security, FSD architecture, and testing.",
    lessonIds: ["m02-p1", "m02-p2", "m02-p3", "m02-p4"]
  },
  {
    id: "module-3",
    number: 3,
    title: "Node.js & Backend Engineering",
    category: "backend",
    partSummary: "Parts 1–4 of 4",
    scopeSummary:
      "Scope (Parts 1–4): Complete Node.js & Backend Engineering — Runtime, Express, REST, Auth/Security, Pagination, Queues, WebSockets, Pooling, Architecture & Testing",
    lead: "Master Node.js runtime internals, Express REST APIs, AuthN/AuthZ & injection defense, cursor pagination, queues, WebSockets, pooling, architecture, and backend testing.",
    lessonIds: ["m03-p1", "m03-p2", "m03-p3", "m03-p4"]
  },
  {
    id: "module-4",
    number: 4,
    title: "Database Fundamentals & Database Architecture",
    category: "databases",
    partSummary: "Parts 1–3 of 3 (Complete)",
    scopeSummary:
      "Scope (Parts 1–3): Complete Database Fundamentals — Engines, ER Modeling, Normalization (1NF–BCNF), ACID Transactions, Isolation, MVCC, Locks, Migrations, Pooling & PITR",
    lead: "Master database internals (Buffer Pool, WAL, B-Tree vs. LSM), ER modeling, 1NF–BCNF normalization, ACID transactions, MVCC, locks, zero-downtime migrations, pooling, and PITR.",
    lessonIds: ["m04-p1", "m04-p2", "m04-p3"]
  },
  {
    id: "module-5",
    number: 5,
    title: "PostgreSQL",
    category: "databases",
    partSummary: "Parts 1–4 of 4 (Complete)",
    scopeSummary:
      "Scope (Parts 1–4): Complete PostgreSQL — Architecture, 8 KB Pages, MVCC, WAL, SQL Mastery, Views/MatViews, Functions, Procedures, Triggers, Constraints, JSONB, Partitioning, Replication, EXPLAIN & Autovacuum",
    lead: "Master PostgreSQL end-to-end: storage internals, SQL/CTEs/windows, views/triggers/JSONB, partitioning, streaming & logical replication, EXPLAIN ANALYZE, indexing, autovacuum, and PITR.",
    lessonIds: ["m05-p1", "m05-p2", "m05-p3", "m05-p4"]
  },
  {
    id: "module-6",
    number: 6,
    title: "MySQL",
    category: "databases",
    partSummary: "Parts 1–2 of 2 (Complete)",
    scopeSummary:
      "Scope (Parts 1–2): Complete MySQL — Architecture, Storage Engines, InnoDB, MVCC, Transactions, ACID, Isolation Levels, Locking, Deadlocks, Indexes, Query Optimization, EXPLAIN, Replication, Partitioning & PITR",
    lead: "Master MySQL InnoDB internals end-to-end: buffer pool, redo/undo logs, MVCC, ACID, isolation levels, locks, deadlocks, clustered/secondary/covering indexes, EXPLAIN, GTID replication, partitioning, ProxySQL, and XtraBackup PITR.",
    lessonIds: ["m06-p1", "m06-p2"]
  },
  {
    id: "module-7",
    number: 7,
    title: "Microsoft SQL Server (MSSQL)",
    category: "databases",
    partSummary: "Parts 1–3 of 3 (Complete)",
    scopeSummary:
      "Scope (Parts 1–3): Complete Microsoft SQL Server — Architecture, SQLOS, 8 KB Pages, 64 KB Extents, Clustered/Non-Clustered/Heap Tables, T-SQL Objects, Transactions, Locking, Isolation Levels, Deadlocks, Execution Plans, Index Maintenance & PITR",
    lead: "Master Microsoft SQL Server end-to-end: SQLOS, 8 KB pages, Heap/Clustered/INCLUDE indexes, T-SQL objects, XACT_ABORT, RCSI/SNAPSHOT, deadlocks, Query Store, parameter sniffing, 5/30 index maintenance, Partition SWITCH, and Full/Diff/Log PITR.",
    lessonIds: ["m07-p1", "m07-p2", "m07-p3"]
  },
  {
    id: "module-8",
    number: 8,
    title: "Database Indexing — Deep Dive",
    category: "databases",
    partSummary: "Parts 1–4 of 4 (Part 1 Complete)",
    scopeSummary:
      "Scope (Parts 1–4): Database Indexing — Why Indexes Exist, B-Tree, B+ Tree, Hash, Clustered, Non-Clustered, Unique, Composite, Covering, Partial, Filtered, Functional, Full-Text, Spatial, Selectivity, Access Patterns, Maintenance & Cross-Database Strategy",
    lead: "Master database indexing from first principles: B+ Tree internals, hash indexes, clustered versus non-clustered lookups, unique constraints, and the cost model behind every index decision.",
    lessonIds: ["m08-p1"]
  }
];

const lessons: LessonRecord[] = [
  {
    id: "m01-p1",
    moduleId: "module-1",
    moduleNumber: 1,
    moduleTitle: "Programming Fundamentals & JavaScript",
    partLabel: "Lesson M01-P1",
    title: "Part 1: Programming Fundamentals, Variables, Data Types & Functions",
    category: "fundamentals",
    duration: "75 min (35m theory · 25m practice · 15m review)",
    objectives: [
      "Trace how source code is parsed, represented in memory (Stack vs. Heap), and executed by a runtime such as V8/Node.js.",
      "Explain the exact difference between variable declaration, initialization, assignment, binding mutability, and the Temporal Dead Zone (`var`, `let`, `const`).",
      "Distinguish all 8 ECMAScript data types, IEEE-754 floating-point precision limits, `BigInt`, and pass-by-value vs. pass-by-sharing semantics.",
      "Design predictable, testable functions using pure transformations, higher-order composition, explicit boundary validation, and stack-safe iteration.",
      "Recognize and prevent production bugs and security vulnerabilities caused by type coercion, 64-bit ID truncation, and unbounded recursion."
    ],
    sections: [
      { id: "m01-p1-objectives", title: "Learning Objectives" },
      { id: "m01-p1-sec-a", letter: "A", title: "Topic Introduction" },
      { id: "m01-p1-sec-b", letter: "B", title: "Fundamentals (Simple Mental Models)" },
      { id: "m01-p1-sec-c", letter: "C", title: "Internal Working & Architecture" },
      { id: "m01-p1-sec-d", letter: "D", title: "Practical Examples (Interactive)" },
      { id: "m01-p1-sec-e", letter: "E", title: "Step-by-Step Walkthrough" },
      { id: "m01-p1-sec-f", letter: "F", title: "Real-World Use Cases" },
      { id: "m01-p1-sec-g", letter: "G", title: "Common Mistakes" },
      { id: "m01-p1-sec-h", letter: "H", title: "Best Practices" },
      { id: "m01-p1-sec-i", letter: "I", title: "Performance & Scalability" },
      { id: "m01-p1-sec-j", letter: "J", title: "Security Considerations" },
      { id: "m01-p1-sec-k", letter: "K", title: "Comparisons & Decision Tables" },
      { id: "m01-p1-sec-l", letter: "L", title: "Tips to Remember (Mnemonics & Mental Models)" },
      { id: "m01-p1-sec-mn", letter: "M/N", title: "Interview Questions & Detailed Answers" },
      { id: "m01-p1-sec-o", letter: "O", title: "Practical Exercises" },
      { id: "m01-p1-sec-p", letter: "P", title: "Advanced Challenge" },
      { id: "m01-p1-sec-q", letter: "Q", title: "Summary & Key Takeaways" },
      { id: "m01-p1-mastery", title: "Mastery Assessment" }
    ],
    masteryItems: [
      {
        id: "m01-p1-m1",
        label: "I can trace Stack vs. Heap state step by step for a function receiving both primitives and objects."
      },
      {
        id: "m01-p1-m2",
        label: "I can explain `var` vs. `let` vs. `const`, including why `let`/`const` hoist into the TDZ."
      },
      {
        id: "m01-p1-m3",
        label: "I can name all 8 JS types and explain why `typeof null === \"object\"` and `NaN !== NaN`."
      },
      {
        id: "m01-p1-m4",
        label: "I can explain IEEE-754 float precision limits and safely model currency and 64-bit IDs in JS/Node.js."
      },
      {
        id: "m01-p1-m5",
        label: "I completed all 3 practical coding exercises and verified outputs using the interactive runner."
      },
      {
        id: "m01-p1-m6",
        label: "I can answer the Basic, Intermediate, Advanced, and Senior/Architect interview questions without notes."
      }
    ],
    prevLessonId: null,
    nextLessonId: "m01-p2",
    Content: M01P1Mdx
  },
  {
    id: "m01-p2",
    moduleId: "module-1",
    moduleNumber: 1,
    moduleTitle: "Programming Fundamentals & JavaScript",
    partLabel: "Lesson M01-P2",
    title: "Part 2: Objects, Arrays, Classes, OOP & SOLID Fundamentals",
    category: "fundamentals",
    duration: "90 min (40m theory · 30m practice · 20m review)",
    objectives: [
      "Model entities safely with JavaScript Objects, property descriptors, prototype lookup vs. Map/Set, and null-prototype dictionaries.",
      "Explain how dense vs. holey Arrays behave at the spec and V8 engine level (`PACKED_SMI`, `DOUBLE`, `HOLEY`) and avoid accidental `O(n)` shifts or mutations.",
      "Write encapsulated ES2022+ Classes using native `#private` fields and methods, avoiding accidental shared mutable state across instances.",
      "Apply the four OOP pillars (`Abstraction`, `Polymorphism`, `Inheritance`, `Encapsulation`) and decide cleanly between composition and inheritance.",
      "Design extensible modules using the five `SOLID` principles pragmatically without overengineering simple business logic."
    ],
    sections: [
      { id: "m01-p2-objectives", title: "Learning Objectives" },
      { id: "m01-p2-sec-a", letter: "A", title: "Topic Introduction" },
      { id: "m01-p2-sec-b", letter: "B", title: "Fundamentals (Simple Mental Models)" },
      { id: "m01-p2-sec-c", letter: "C", title: "Internal Working & Architecture" },
      { id: "m01-p2-sec-d", letter: "D", title: "Practical Examples (Interactive)" },
      { id: "m01-p2-sec-e", letter: "E", title: "Step-by-Step Walkthrough" },
      { id: "m01-p2-sec-f", letter: "F", title: "Real-World Use Cases" },
      { id: "m01-p2-sec-g", letter: "G", title: "Common Mistakes" },
      { id: "m01-p2-sec-h", letter: "H", title: "Best Practices" },
      { id: "m01-p2-sec-i", letter: "I", title: "Performance & Scalability" },
      { id: "m01-p2-sec-j", letter: "J", title: "Security Considerations" },
      { id: "m01-p2-sec-k", letter: "K", title: "Comparisons & Decision Tables" },
      { id: "m01-p2-sec-l", letter: "L", title: "Tips to Remember (Mnemonics & Mental Models)" },
      { id: "m01-p2-sec-mn", letter: "M/N", title: "Interview Questions & Detailed Answers" },
      { id: "m01-p2-sec-o", letter: "O", title: "Practical Exercises" },
      { id: "m01-p2-sec-p", letter: "P", title: "Advanced Challenge" },
      { id: "m01-p2-sec-q", letter: "Q", title: "Summary & Key Takeaways" },
      { id: "m01-p2-mastery", title: "Mastery Assessment" }
    ],
    masteryItems: [
      {
        id: "m01-p2-m1",
        label: "I can explain shallow vs. deep cloning, `Object.hasOwn()`, and prototype pollution defenses."
      },
      {
        id: "m01-p2-m2",
        label: "I can compare `Array`, `Map`, and `Set`, including non-mutating ES2023 transforms and V8 element kind transitions."
      },
      {
        id: "m01-p2-m3",
        label: "I can implement ES2022 `#private` fields and explain Hidden Class stability on object creation."
      },
      {
        id: "m01-p2-m4",
        label: "I can apply Abstraction, Polymorphism, Inheritance, and Encapsulation and choose composition over deep inheritance."
      },
      {
        id: "m01-p2-m5",
        label: "I can apply all 5 SOLID principles cleanly without overengineering."
      },
      {
        id: "m01-p2-m6",
        label: "I completed all 3 M01-P2 coding exercises and can answer Basic, Intermediate, Advanced, and Senior/Architect interview questions without notes."
      }
    ],
    prevLessonId: "m01-p1",
    nextLessonId: "m01-p3",
    Content: M01P2Mdx
  },
  {
    id: "m01-p3",
    moduleId: "module-1",
    moduleNumber: 1,
    moduleTitle: "Programming Fundamentals & JavaScript",
    partLabel: "Lesson M01-P3",
    title: "Part 3: Algorithms, Data Structures, Big O, Trees & Graphs",
    category: "fundamentals",
    duration: "105 min (45m theory · 40m practice · 20m review)",
    objectives: [
      "Analyze algorithm Time and Space Complexity using Big O growth tiers and distinguish worst-case vs. amortized bounds.",
      "Implement Binary Search (including lower bound) and stable O(n log n) Merge Sort iteratively without call-stack overflow.",
      "Use Map/Set hash tables, Stacks, and O(1) Ring-Buffer / Two-Stack Queues instead of O(n) Array.shift() bottlenecks.",
      "Validate Binary Search Tree invariants and traverse Graphs safely with BFS (shortest path) and iterative 3-color DFS (cycle detection).",
      "Defend backend services against algorithmic complexity DoS (HashDoS, O(n^2) loops) and deep-graph recursion crashes."
    ],
    sections: [
      { id: "m01-p3-objectives", title: "Learning Objectives" },
      { id: "m01-p3-sec-a", letter: "A", title: "Topic Introduction" },
      { id: "m01-p3-sec-b", letter: "B", title: "Fundamentals (Simple Mental Models)" },
      { id: "m01-p3-sec-c", letter: "C", title: "Internal Working & Architecture" },
      { id: "m01-p3-sec-d", letter: "D", title: "Practical Examples (Interactive)" },
      { id: "m01-p3-sec-e", letter: "E", title: "Step-by-Step Walkthrough" },
      { id: "m01-p3-sec-f", letter: "F", title: "Real-World Use Cases" },
      { id: "m01-p3-sec-g", letter: "G", title: "Common Mistakes" },
      { id: "m01-p3-sec-h", letter: "H", title: "Best Practices" },
      { id: "m01-p3-sec-i", letter: "I", title: "Performance & Scalability" },
      { id: "m01-p3-sec-j", letter: "J", title: "Security Considerations" },
      { id: "m01-p3-sec-k", letter: "K", title: "Comparisons & Decision Tables" },
      { id: "m01-p3-sec-l", letter: "L", title: "Tips to Remember (Mnemonics & Mental Models)" },
      { id: "m01-p3-sec-mn", letter: "M/N", title: "Interview Questions & Detailed Answers" },
      { id: "m01-p3-sec-o", letter: "O", title: "Practical Exercises" },
      { id: "m01-p3-sec-p", letter: "P", title: "Advanced Challenge" },
      { id: "m01-p3-sec-q", letter: "Q", title: "Summary & Key Takeaways" },
      { id: "m01-p3-mastery", title: "Mastery Assessment" }
    ],
    masteryItems: [
      {
        id: "m01-p3-m1",
        label: "I can compare O(1), O(log n), O(n), O(n log n), and O(n^2) time and auxiliary space complexity."
      },
      {
        id: "m01-p3-m2",
        label: "I can write Binary Search (including lowerBound) and explain why Array.shift() degrades queues to O(n)."
      },
      {
        id: "m01-p3-m3",
        label: "I can implement O(1) Ring-Buffer / Two-Stack Queues and O(n) Hash Map lookups."
      },
      {
        id: "m01-p3-m4",
        label: "I can validate BST invariants and implement iterative Graph BFS shortest path & 3-color cycle detection."
      },
      {
        id: "m01-p3-m5",
        label: "I completed all 3 M01-P3 coding exercises and can answer Basic, Intermediate, Advanced, and Senior/Architect interview questions without notes."
      }
    ],
    prevLessonId: "m01-p2",
    nextLessonId: "m01-p4",
    Content: M01P3Mdx
  },
  {
    id: "m01-p4",
    moduleId: "module-1",
    moduleNumber: 1,
    moduleTitle: "Programming Fundamentals & JavaScript",
    partLabel: "Lesson M01-P4",
    title: "Part 4: JavaScript Internals, Closures, Prototypes, Event Loop & GC",
    category: "fundamentals",
    duration: "110 min (50m theory · 40m practice · 20m review)",
    objectives: [
      "Trace Lexical Scope, Hoisting, TDZ, and Closures across Call Stack and Heap lifetimes.",
      "Predict `this` binding across call sites and arrow functions, and trace `[[Prototype]]` delegation chains.",
      "Schedule concurrent async flows safely with Promises, `async/await`, and Promise combinators without waterfalls or unhandled rejections.",
      "Predict exact Event Loop turn order across Synchronous Stack, Microtasks, and Macrotasks while preventing microtask starvation.",
      "Prevent memory leaks in long-lived Node.js and React apps using bounded caches, `WeakMap`, and V8 reachability-based GC awareness."
    ],
    sections: [
      { id: "m01-p4-objectives", title: "Learning Objectives" },
      { id: "m01-p4-sec-a", letter: "A", title: "Topic Introduction" },
      { id: "m01-p4-sec-b", letter: "B", title: "Fundamentals (Simple Mental Models)" },
      { id: "m01-p4-sec-c", letter: "C", title: "Internal Working & Architecture" },
      { id: "m01-p4-sec-d", letter: "D", title: "Practical Examples (Interactive)" },
      { id: "m01-p4-sec-e", letter: "E", title: "Step-by-Step Walkthrough" },
      { id: "m01-p4-sec-f", letter: "F", title: "Real-World Use Cases" },
      { id: "m01-p4-sec-g", letter: "G", title: "Common Mistakes" },
      { id: "m01-p4-sec-h", letter: "H", title: "Best Practices" },
      { id: "m01-p4-sec-i", letter: "I", title: "Performance & Scalability" },
      { id: "m01-p4-sec-j", letter: "J", title: "Security Considerations" },
      { id: "m01-p4-sec-k", letter: "K", title: "Comparisons & Decision Tables" },
      { id: "m01-p4-sec-l", letter: "L", title: "Tips to Remember (Mnemonics & Mental Models)" },
      { id: "m01-p4-sec-mn", letter: "M/N", title: "Interview Questions & Detailed Answers" },
      { id: "m01-p4-sec-o", letter: "O", title: "Practical Exercises" },
      { id: "m01-p4-sec-p", letter: "P", title: "Advanced Challenge" },
      { id: "m01-p4-sec-q", letter: "Q", title: "Summary & Key Takeaways" },
      { id: "m01-p4-mastery", title: "Mastery Assessment" }
    ],
    masteryItems: [
      {
        id: "m01-p4-m1",
        label: "I can explain lexical scope, hoisting/TDZ, and how closures capture live bindings."
      },
      {
        id: "m01-p4-m2",
        label: "I can trace `[[Prototype]]` delegation and predict `this` for regular vs. arrow functions."
      },
      {
        id: "m01-p4-m3",
        label: "I can predict exact Sync -> Microtask -> Macrotask Event Loop ordering."
      },
      {
        id: "m01-p4-m4",
        label: "I can explain `Promise.all` vs `allSettled` vs `race` vs `any` and prevent memory leaks in V8."
      },
      {
        id: "m01-p4-m5",
        label: "I completed all 3 M01-P4 exercises and can answer the interview questions without notes."
      }
    ],
    prevLessonId: "m01-p3",
    nextLessonId: "m01-p5",
    Content: M01P4Mdx
  },
  {
    id: "m01-p5",
    moduleId: "module-1",
    moduleNumber: 1,
    moduleTitle: "Programming Fundamentals & JavaScript",
    partLabel: "Lesson M01-P5",
    title: "Part 5: TypeScript Fundamentals, Type Systems, Generics, Interfaces & Type Safety",
    category: "fundamentals",
    duration: "75 min (35m theory · 25m practice · 15m review)",
    objectives: [
      "Explain TypeScript's structural type system, compile-time type erasure, and why runtime validation remains mandatory at I/O boundaries.",
      "Design reusable type-safe APIs using constrained Generics, Interfaces, and Discriminated Unions with exhaustive never checks.",
      "Apply strict TypeScript compiler settings and unknown narrowing instead of unsafe any or unverified type assertions."
    ],
    sections: [
      { id: "m01-p5-objectives", title: "Learning Objectives" },
      { id: "m01-p5-sec-a", letter: "A", title: "Topic Introduction" },
      { id: "m01-p5-sec-b", letter: "B", title: "Fundamentals (Simple Mental Models)" },
      { id: "m01-p5-sec-c", letter: "C", title: "Internal Working & Architecture" },
      { id: "m01-p5-sec-d", letter: "D", title: "Practical Examples (Interactive)" },
      { id: "m01-p5-sec-e", letter: "E", title: "Step-by-Step Walkthrough" },
      { id: "m01-p5-sec-f", letter: "F", title: "Real-World Use Cases" },
      { id: "m01-p5-sec-g", letter: "G", title: "Common Mistakes" },
      { id: "m01-p5-sec-h", letter: "H", title: "Best Practices" },
      { id: "m01-p5-sec-i", letter: "I", title: "Performance & Scalability" },
      { id: "m01-p5-sec-j", letter: "J", title: "Security Considerations" },
      { id: "m01-p5-sec-k", letter: "K", title: "Comparisons & Decision Tables" },
      { id: "m01-p5-sec-l", letter: "L", title: "Tips to Remember (Mnemonics & Mental Models)" },
      { id: "m01-p5-sec-mn", letter: "M/N", title: "Interview Questions & Detailed Answers" },
      { id: "m01-p5-sec-o", letter: "O", title: "Practical Exercises" },
      { id: "m01-p5-sec-p", letter: "P", title: "Advanced Challenge" },
      { id: "m01-p5-sec-q", letter: "Q", title: "Summary & Key Takeaways" },
      { id: "m01-p5-mastery", title: "Mastery Assessment" }
    ],
    masteryItems: [
      {
        id: "m01-p5-m1",
        label: "I can explain structural typing, type erasure, and why `as T` is unsafe on external JSON."
      },
      {
        id: "m01-p5-m2",
        label: "I can write constrained Generics, Interfaces, and exhaustive `never` union switches."
      },
      {
        id: "m01-p5-m3",
        label: "I completed the M01-P5 runtime guard exercises and can answer the interview questions without notes."
      }
    ],
    prevLessonId: "m01-p4",
    nextLessonId: "m02-p1",
    Content: M01P5Mdx
  },
  {
    id: "m02-p1",
    moduleId: "module-2",
    moduleNumber: 2,
    moduleTitle: "React & Frontend Engineering",
    partLabel: "Lesson M02-P1",
    title: "Part 1: React Architecture, Components, Props, State, Rendering, Virtual DOM & JSX",
    category: "frontend",
    duration: "90 min (40m theory · 30m practice · 20m review)",
    objectives: [
      "Trace React's Trigger -> Render -> Commit pipeline and Fiber reconciliation model.",
      "Build pure function Components with read-only Props and immutable State updates (`Object.is`).",
      "Use stable unique `key`s in lists to preserve component identity and avoid index-key state corruption.",
      "Explain JSX compilation, automatic XSS text escaping, and mount/update/unmount lifecycle concepts."
    ],
    sections: [
      { id: "m02-p1-objectives", title: "Learning Objectives" },
      { id: "m02-p1-sec-a", letter: "A", title: "Topic Introduction" },
      { id: "m02-p1-sec-b", letter: "B", title: "Fundamentals (Simple Mental Models)" },
      { id: "m02-p1-sec-c", letter: "C", title: "Internal Working & Architecture" },
      { id: "m02-p1-sec-d", letter: "D", title: "Practical Examples (Interactive)" },
      { id: "m02-p1-sec-e", letter: "E", title: "Step-by-Step Walkthrough" },
      { id: "m02-p1-sec-f", letter: "F", title: "Real-World Use Cases" },
      { id: "m02-p1-sec-g", letter: "G", title: "Common Mistakes" },
      { id: "m02-p1-sec-h", letter: "H", title: "Best Practices" },
      { id: "m02-p1-sec-i", letter: "I", title: "Performance & Scalability" },
      { id: "m02-p1-sec-j", letter: "J", title: "Security Considerations" },
      { id: "m02-p1-sec-k", letter: "K", title: "Comparisons & Decision Tables" },
      { id: "m02-p1-sec-l", letter: "L", title: "Tips to Remember (Mnemonics & Mental Models)" },
      { id: "m02-p1-sec-mn", letter: "M/N", title: "Interview Questions & Detailed Answers" },
      { id: "m02-p1-sec-o", letter: "O", title: "Practical Exercises" },
      { id: "m02-p1-sec-p", letter: "P", title: "Advanced Challenge" },
      { id: "m02-p1-sec-q", letter: "Q", title: "Summary & Key Takeaways" },
      { id: "m02-p1-mastery", title: "Mastery Assessment" }
    ],
    masteryItems: [
      {
        id: "m02-p1-m1",
        label: "I can trace Trigger -> Render -> Commit and explain why components must be pure during render."
      },
      {
        id: "m02-p1-m2",
        label: "I can explain `props` vs `state`, `Object.is` bailout, and why mutating arrays/objects breaks re-renders."
      },
      {
        id: "m02-p1-m3",
        label: "I can explain why `key={index}` corrupts dynamic list state and why `Math.random()` remounts subtrees."
      },
      {
        id: "m02-p1-m4",
        label: "I completed the M02-P1 exercises and can answer the interview questions without notes."
      }
    ],
    prevLessonId: "m01-p5",
    nextLessonId: "m02-p2",
    Content: M02P1Mdx
  },
  {
    id: "m02-p2",
    moduleId: "module-2",
    moduleNumber: 2,
    moduleTitle: "React & Frontend Engineering",
    partLabel: "Lesson M02-P2",
    title: "Part 2: React Hooks, Effect Synchronization, Context & Memoization",
    category: "frontend",
    duration: "100 min (45m theory · 35m practice · 20m review)",
    objectives: [
      "Explain the Rules of Hooks and how React stores hook slots by positional call order on Fiber nodes.",
      "Use useState (lazy initializers, functional updaters), useRef, and useContext without stale closures or re-render storms.",
      "Synchronize external systems cleanly with useEffect + AbortController cleanup and avoid derived-state anti-patterns.",
      "Apply useMemo, useCallback, React.memo, and custom hooks intentionally based on shallow Object.is reference checks."
    ],
    sections: [
      { id: "m02-p2-objectives", title: "Learning Objectives" },
      { id: "m02-p2-sec-a", letter: "A", title: "Topic Introduction" },
      { id: "m02-p2-sec-b", letter: "B", title: "Fundamentals (Simple Mental Models)" },
      { id: "m02-p2-sec-c", letter: "C", title: "Internal Working & Architecture" },
      { id: "m02-p2-sec-d", letter: "D", title: "Practical Examples (Interactive)" },
      { id: "m02-p2-sec-e", letter: "E", title: "Step-by-Step Walkthrough" },
      { id: "m02-p2-sec-f", letter: "F", title: "Real-World Use Cases" },
      { id: "m02-p2-sec-g", letter: "G", title: "Common Mistakes" },
      { id: "m02-p2-sec-h", letter: "H", title: "Best Practices" },
      { id: "m02-p2-sec-i", letter: "I", title: "Performance & Scalability" },
      { id: "m02-p2-sec-j", letter: "J", title: "Security Considerations" },
      { id: "m02-p2-sec-k", letter: "K", title: "Comparisons & Decision Tables" },
      { id: "m02-p2-sec-l", letter: "L", title: "Tips to Remember (Mnemonics & Mental Models)" },
      { id: "m02-p2-sec-mn", letter: "M/N", title: "Interview Questions & Detailed Answers" },
      { id: "m02-p2-sec-o", letter: "O", title: "Practical Exercises" },
      { id: "m02-p2-sec-p", letter: "P", title: "Advanced Challenge" },
      { id: "m02-p2-sec-q", letter: "Q", title: "Summary & Key Takeaways" },
      { id: "m02-p2-mastery", title: "Mastery Assessment" }
    ],
    masteryItems: [
      {
        id: "m02-p2-m1",
        label: "I can explain the Rules of Hooks using Fiber positional hook slots."
      },
      {
        id: "m02-p2-m2",
        label: "I can write race-free useEffect hooks with AbortController cleanup and avoid derived-state effects."
      },
      {
        id: "m02-p2-m3",
        label: "I can explain when useMemo, useCallback, and React.memo help vs. when inline props defeat them."
      },
      {
        id: "m02-p2-m4",
        label: "I completed the M02-P2 exercises and can answer the interview questions without notes."
      }
    ],
    prevLessonId: "m02-p1",
    nextLessonId: "m02-p3",
    Content: M02P2Mdx
  },
  {
    id: "m02-p3",
    moduleId: "module-2",
    moduleNumber: 2,
    moduleTitle: "React & Frontend Engineering",
    partLabel: "Lesson M02-P3",
    title: "Part 3: State Management, Routing, Forms, API Integration & Auth",
    category: "frontend",
    duration: "90 min (40m theory · 30m practice · 20m review)",
    objectives: [
      "Classify UI, URL, client workflow, and server cache state to pick the right owner (useState, Context, Redux Toolkit, React Router, TanStack Query).",
      "Implement predictable Redux / Redux Toolkit slices and TanStack Query stale-while-revalidate caching with in-flight deduplication.",
      "Design React Router protected layouts and schema-validated forms (React Hook Form + Zod) with accessible error mapping.",
      "Build typed API clients with AbortSignal timeouts, error normalization, and single-flight 401 refresh while enforcing AuthZ on the server."
    ],
    sections: [
      { id: "m02-p3-objectives", title: "Learning Objectives" },
      { id: "m02-p3-sec-a", letter: "A", title: "Topic Introduction" },
      { id: "m02-p3-sec-b", letter: "B", title: "Fundamentals (Simple Mental Models)" },
      { id: "m02-p3-sec-c", letter: "C", title: "Internal Working & Architecture" },
      { id: "m02-p3-sec-d", letter: "D", title: "Practical Examples (Interactive)" },
      { id: "m02-p3-sec-e", letter: "E", title: "Step-by-Step Walkthrough" },
      { id: "m02-p3-sec-f", letter: "F", title: "Real-World Use Cases" },
      { id: "m02-p3-sec-g", letter: "G", title: "Common Mistakes" },
      { id: "m02-p3-sec-h", letter: "H", title: "Best Practices" },
      { id: "m02-p3-sec-i", letter: "I", title: "Performance & Scalability" },
      { id: "m02-p3-sec-j", letter: "J", title: "Security Considerations" },
      { id: "m02-p3-sec-k", letter: "K", title: "Comparisons & Decision Tables" },
      { id: "m02-p3-sec-l", letter: "L", title: "Tips to Remember (Mnemonics & Mental Models)" },
      { id: "m02-p3-sec-mn", letter: "M/N", title: "Interview Questions & Detailed Answers" },
      { id: "m02-p3-sec-o", letter: "O", title: "Practical Exercises" },
      { id: "m02-p3-sec-p", letter: "P", title: "Advanced Challenge" },
      { id: "m02-p3-sec-q", letter: "Q", title: "Summary & Key Takeaways" },
      { id: "m02-p3-mastery", title: "Mastery Assessment" }
    ],
    masteryItems: [
      {
        id: "m02-p3-m1",
        label: "I can separate client UI state (Context/RTK), URL state (React Router), and server state (TanStack Query)."
      },
      {
        id: "m02-p3-m2",
        label: "I can explain RTK Immer drafts, staleTime vs. gcTime, and in-flight query deduplication."
      },
      {
        id: "m02-p3-m3",
        label: "I can design safe AuthN/AuthZ boundaries using HttpOnly cookies, single-flight refresh, and server-side RBAC."
      },
      {
        id: "m02-p3-m4",
        label: "I completed the M02-P3 exercises and can answer the interview questions without notes."
      }
    ],
    prevLessonId: "m02-p2",
    nextLessonId: "m02-p4",
    Content: M02P3Mdx
  },
  {
    id: "m02-p4",
    moduleId: "module-2",
    moduleNumber: 2,
    moduleTitle: "React & Frontend Engineering",
    partLabel: "Lesson M02-P4",
    title: "Part 4: Performance, Accessibility, Security, Architecture & Testing",
    category: "frontend",
    duration: "95 min (45m theory · 30m practice · 20m review)",
    objectives: [
      "Isolate render crashes and shrink initial bundles using Error Boundaries, React.lazy code splitting, and Suspense boundaries.",
      "Optimize Core Web Vitals (LCP, INP, CLS), push state down, virtualize large lists, and bound client LRU caches.",
      "Build WCAG AA accessible, mobile-first responsive UIs and harden apps against XSS, CSRF, and open redirects.",
      "Structure scalable Feature-Sliced frontends and verify behavior with unit, RTL/MSW integration, and E2E tests."
    ],
    sections: [
      { id: "m02-p4-objectives", title: "Learning Objectives" },
      { id: "m02-p4-sec-a", letter: "A", title: "Topic Introduction" },
      { id: "m02-p4-sec-b", letter: "B", title: "Fundamentals (Simple Mental Models)" },
      { id: "m02-p4-sec-c", letter: "C", title: "Internal Working & Architecture" },
      { id: "m02-p4-sec-d", letter: "D", title: "Practical Examples (Interactive)" },
      { id: "m02-p4-sec-e", letter: "E", title: "Step-by-Step Walkthrough" },
      { id: "m02-p4-sec-f", letter: "F", title: "Real-World Use Cases" },
      { id: "m02-p4-sec-g", letter: "G", title: "Common Mistakes" },
      { id: "m02-p4-sec-h", letter: "H", title: "Best Practices" },
      { id: "m02-p4-sec-i", letter: "I", title: "Performance & Scalability" },
      { id: "m02-p4-sec-j", letter: "J", title: "Security Considerations" },
      { id: "m02-p4-sec-k", letter: "K", title: "Comparisons & Decision Tables" },
      { id: "m02-p4-sec-l", letter: "L", title: "Tips to Remember (Mnemonics & Mental Models)" },
      { id: "m02-p4-sec-mn", letter: "M/N", title: "Interview Questions & Detailed Answers" },
      { id: "m02-p4-sec-o", letter: "O", title: "Practical Exercises" },
      { id: "m02-p4-sec-p", letter: "P", title: "Advanced Challenge" },
      { id: "m02-p4-sec-q", letter: "Q", title: "Summary & Key Takeaways" },
      { id: "m02-p4-mastery", title: "Mastery Assessment" }
    ],
    masteryItems: [
      {
        id: "m02-p4-m1",
        label: "I can design ErrorBoundary + React.lazy + Suspense routes and explain what Error Boundaries do not catch."
      },
      {
        id: "m02-p4-m2",
        label: "I can diagnose LCP/INP/CLS bottlenecks and apply state placement, virtualization, and bounded caching."
      },
      {
        id: "m02-p4-m3",
        label: "I can harden React apps against XSS and CSRF while enforcing semantic accessibility and FSD boundaries."
      },
      {
        id: "m02-p4-m4",
        label: "I completed the M02-P4 exercises and can answer the interview questions without notes."
      }
    ],
    prevLessonId: "m02-p3",
    nextLessonId: "m03-p1",
    Content: M02P4Mdx
  },
  {
    id: "m03-p1",
    moduleId: "module-3",
    moduleNumber: 3,
    moduleTitle: "Node.js & Backend Engineering",
    partLabel: "Lesson M03-P1",
    title: "Part 1: Node.js Runtime, V8, libuv, Event Loop, Streams & Buffers",
    category: "backend",
    duration: "90 min (40m theory · 30m practice · 20m review)",
    objectives: [
      "Trace how Node.js bridges JS code, V8 execution, OS async sockets, libuv's 4-thread pool, and Worker threads.",
      "Predict execution order across sync code, process.nextTick(), Promise microtasks, Timers, Poll, and Check phases.",
      "Design constant-memory streaming pipelines with stream/promises pipeline() and writable highWaterMark backpressure.",
      "Allocate binary Buffers safely (Buffer.alloc vs deprecated new Buffer) and guard file handling against path traversal."
    ],
    sections: [
      { id: "m03-p1-objectives", title: "Learning Objectives" },
      { id: "m03-p1-sec-a", letter: "A", title: "Topic Introduction" },
      { id: "m03-p1-sec-b", letter: "B", title: "Fundamentals (Simple Mental Models)" },
      { id: "m03-p1-sec-c", letter: "C", title: "Internal Working & Architecture" },
      { id: "m03-p1-sec-d", letter: "D", title: "Practical Examples (Interactive)" },
      { id: "m03-p1-sec-e", letter: "E", title: "Step-by-Step Walkthrough" },
      { id: "m03-p1-sec-f", letter: "F", title: "Real-World Use Cases" },
      { id: "m03-p1-sec-g", letter: "G", title: "Common Mistakes" },
      { id: "m03-p1-sec-h", letter: "H", title: "Best Practices" },
      { id: "m03-p1-sec-i", letter: "I", title: "Performance & Scalability" },
      { id: "m03-p1-sec-j", letter: "J", title: "Security Considerations" },
      { id: "m03-p1-sec-k", letter: "K", title: "Comparisons & Decision Tables" },
      { id: "m03-p1-sec-l", letter: "L", title: "Tips to Remember (Mnemonics & Mental Models)" },
      { id: "m03-p1-sec-mn", letter: "M/N", title: "Interview Questions & Detailed Answers" },
      { id: "m03-p1-sec-o", letter: "O", title: "Practical Exercises" },
      { id: "m03-p1-sec-p", letter: "P", title: "Advanced Challenge" },
      { id: "m03-p1-sec-q", letter: "Q", title: "Summary & Key Takeaways" },
      { id: "m03-p1-mastery", title: "Mastery Assessment" }
    ],
    masteryItems: [
      {
        id: "m03-p1-m1",
        label: "I can explain V8 + libuv + thread pool + Worker threads and when each handles a workload."
      },
      {
        id: "m03-p1-m2",
        label: "I can trace process.nextTick(), Promise microtasks, setTimeout(0), and setImmediate()."
      },
      {
        id: "m03-p1-m3",
        label: "I can implement backpressure-safe stream pipelines, safe Buffers, and path traversal checks."
      },
      {
        id: "m03-p1-m4",
        label: "I completed the M03-P1 exercises and can answer the interview questions without notes."
      }
    ],
    prevLessonId: "m02-p4",
    nextLessonId: "m03-p2",
    Content: M03P1Mdx
  },
  {
    id: "m03-p2",
    moduleId: "module-3",
    moduleNumber: 3,
    moduleTitle: "Node.js & Backend Engineering",
    partLabel: "Lesson M03-P2",
    title: "Part 2: Express, Routing, REST APIs, HTTP, Validation, Errors & Logging",
    category: "backend",
    duration: "90 min (40m theory · 30m practice · 20m review)",
    objectives: [
      "Build modular Express 5 routers and middleware pipelines with explicit ordering and next(err) short-circuiting.",
      "Apply HTTP method safety/idempotency, accurate status codes, headers, and URI vs. Accept-header API versioning.",
      "Enforce strict edge schema validation (.strict()) to block mass assignment before service logic runs.",
      "Centralize error handling with redacted RFC 9457 Problem Details and secret-redacting structured JSON logging."
    ],
    sections: [
      { id: "m03-p2-objectives", title: "Learning Objectives" },
      { id: "m03-p2-sec-a", letter: "A", title: "Topic Introduction" },
      { id: "m03-p2-sec-b", letter: "B", title: "Fundamentals (Simple Mental Models)" },
      { id: "m03-p2-sec-c", letter: "C", title: "Internal Working & Architecture" },
      { id: "m03-p2-sec-d", letter: "D", title: "Practical Examples (Interactive)" },
      { id: "m03-p2-sec-e", letter: "E", title: "Step-by-Step Walkthrough" },
      { id: "m03-p2-sec-f", letter: "F", title: "Real-World Use Cases" },
      { id: "m03-p2-sec-g", letter: "G", title: "Common Mistakes" },
      { id: "m03-p2-sec-h", letter: "H", title: "Best Practices" },
      { id: "m03-p2-sec-i", letter: "I", title: "Performance & Scalability" },
      { id: "m03-p2-sec-j", letter: "J", title: "Security Considerations" },
      { id: "m03-p2-sec-k", letter: "K", title: "Comparisons & Decision Tables" },
      { id: "m03-p2-sec-l", letter: "L", title: "Tips to Remember (Mnemonics & Mental Models)" },
      { id: "m03-p2-sec-mn", letter: "M/N", title: "Interview Questions & Detailed Answers" },
      { id: "m03-p2-sec-o", letter: "O", title: "Practical Exercises" },
      { id: "m03-p2-sec-p", letter: "P", title: "Advanced Challenge" },
      { id: "m03-p2-sec-q", letter: "Q", title: "Summary & Key Takeaways" },
      { id: "m03-p2-mastery", title: "Mastery Assessment" }
    ],
    masteryItems: [
      {
        id: "m03-p2-m1",
        label: "I can explain Express middleware ordering, next(err) short-circuiting, and static-before-param routing."
      },
      {
        id: "m03-p2-m2",
        label: "I can choose accurate HTTP methods (safe vs. idempotent) and status codes (201, 400, 401, 403, 422, 500)."
      },
      {
        id: "m03-p2-m3",
        label: "I can implement strict edge validation, redacted Problem Details, and secret-scrubbing structured JSON logs."
      },
      {
        id: "m03-p2-m4",
        label: "I completed the M03-P2 exercises and can answer the interview questions without notes."
      }
    ],
    prevLessonId: "m03-p1",
    nextLessonId: "m03-p3",
    Content: M03P2Mdx
  },
  {
    id: "m03-p3",
    moduleId: "module-3",
    moduleNumber: 3,
    moduleTitle: "Node.js & Backend Engineering",
    partLabel: "Lesson M03-P3",
    title: "Part 3: Backend Auth, JWT, RBAC, OAuth2, Rate Limiting, CORS & Injection Defense",
    category: "backend",
    duration: "95 min (45m theory · 30m practice · 20m review)",
    objectives: [
      "Implement scrypt/Argon2id password hashing, constant-time secret comparison, and strict JWT claim/algorithm verification.",
      "Design rotating refresh token families with reuse detection and enforce RBAC + object ownership to stop BOLA/IDOR.",
      "Apply OAuth 2.0 Authorization Code + PKCE + state, exact-origin CORS allowlists, and Redis token-bucket rate limiting.",
      "Eliminate SQL and NoSQL injection with parameterized queries, identifier allowlists, and strict primitive validation."
    ],
    sections: [
      { id: "m03-p3-objectives", title: "Learning Objectives" },
      { id: "m03-p3-sec-a", letter: "A", title: "Topic Introduction" },
      { id: "m03-p3-sec-b", letter: "B", title: "Fundamentals (Simple Mental Models)" },
      { id: "m03-p3-sec-c", letter: "C", title: "Internal Working & Architecture" },
      { id: "m03-p3-sec-d", letter: "D", title: "Practical Examples (Interactive)" },
      { id: "m03-p3-sec-e", letter: "E", title: "Step-by-Step Walkthrough" },
      { id: "m03-p3-sec-f", letter: "F", title: "Real-World Use Cases" },
      { id: "m03-p3-sec-g", letter: "G", title: "Common Mistakes" },
      { id: "m03-p3-sec-h", letter: "H", title: "Best Practices" },
      { id: "m03-p3-sec-i", letter: "I", title: "Performance & Scalability" },
      { id: "m03-p3-sec-j", letter: "J", title: "Security Considerations" },
      { id: "m03-p3-sec-k", letter: "K", title: "Comparisons & Decision Tables" },
      { id: "m03-p3-sec-l", letter: "L", title: "Tips to Remember (Mnemonics & Mental Models)" },
      { id: "m03-p3-sec-mn", letter: "M/N", title: "Interview Questions & Detailed Answers" },
      { id: "m03-p3-sec-o", letter: "O", title: "Practical Exercises" },
      { id: "m03-p3-sec-p", letter: "P", title: "Advanced Challenge" },
      { id: "m03-p3-sec-q", letter: "Q", title: "Summary & Key Takeaways" },
      { id: "m03-p3-mastery", title: "Mastery Assessment" }
    ],
    masteryItems: [
      {
        id: "m03-p3-m1",
        label: "I can explain scrypt/Argon2id hashing, JWT alg/exp/iss/aud checks, and rotating refresh token families."
      },
      {
        id: "m03-p3-m2",
        label: "I can prevent BOLA/IDOR using RBAC permissions plus tenant/owner DB query scoping."
      },
      {
        id: "m03-p3-m3",
        label: "I can configure exact-origin CORS, token-bucket rate limits, parameterized SQL, and NoSQL operator guards."
      },
      {
        id: "m03-p3-m4",
        label: "I completed the M03-P3 exercises and can answer the interview questions without notes."
      }
    ],
    prevLessonId: "m03-p2",
    nextLessonId: "m03-p4",
    Content: M03P3Mdx
  },
  {
    id: "m03-p4",
    moduleId: "module-3",
    moduleNumber: 3,
    moduleTitle: "Node.js & Backend Engineering",
    partLabel: "Lesson M03-P4",
    title: "Part 4: Pagination, Queues, WebSockets, Pooling, Architecture & Testing",
    category: "backend",
    duration: "95 min (45m theory · 30m practice · 20m review)",
    objectives: [
      "Replace slow OFFSET queries with O(log n) keyset cursor pagination, allowlisted filters, and deterministic tie-breaker sorts.",
      "Design idempotent background job queues (202 Accepted, backoff + jitter, DLQ), magic-byte file uploads, and scaled WebSockets.",
      "Size bounded DB connection pools safely and structure DI-wired Modular Monoliths before adopting Microservices.",
      "Verify backend behavior with Unit, real-DB Integration, and API tests while eliminating N+1 query bottlenecks."
    ],
    sections: [
      { id: "m03-p4-objectives", title: "Learning Objectives" },
      { id: "m03-p4-sec-a", letter: "A", title: "Topic Introduction" },
      { id: "m03-p4-sec-b", letter: "B", title: "Fundamentals (Simple Mental Models)" },
      { id: "m03-p4-sec-c", letter: "C", title: "Internal Working & Architecture" },
      { id: "m03-p4-sec-d", letter: "D", title: "Practical Examples (Interactive)" },
      { id: "m03-p4-sec-e", letter: "E", title: "Step-by-Step Walkthrough" },
      { id: "m03-p4-sec-f", letter: "F", title: "Real-World Use Cases" },
      { id: "m03-p4-sec-g", letter: "G", title: "Common Mistakes" },
      { id: "m03-p4-sec-h", letter: "H", title: "Best Practices" },
      { id: "m03-p4-sec-i", letter: "I", title: "Performance & Scalability" },
      { id: "m03-p4-sec-j", letter: "J", title: "Security Considerations" },
      { id: "m03-p4-sec-k", letter: "K", title: "Comparisons & Decision Tables" },
      { id: "m03-p4-sec-l", letter: "L", title: "Tips to Remember (Mnemonics & Mental Models)" },
      { id: "m03-p4-sec-mn", letter: "M/N", title: "Interview Questions & Detailed Answers" },
      { id: "m03-p4-sec-o", letter: "O", title: "Practical Exercises" },
      { id: "m03-p4-sec-p", letter: "P", title: "Advanced Challenge" },
      { id: "m03-p4-sec-q", letter: "Q", title: "Summary & Key Takeaways" },
      { id: "m03-p4-mastery", title: "Mastery Assessment" }
    ],
    masteryItems: [
      {
        id: "m03-p4-m1",
        label: "I can implement keyset cursor pagination with allowlisted filters/sorts and deterministic tie-breakers."
      },
      {
        id: "m03-p4-m2",
        label: "I can design idempotent background job queues with backoff + DLQ, bounded DB pools, and WebSocket scaling."
      },
      {
        id: "m03-p4-m3",
        label: "I can structure a DI-wired Modular Monolith and build Unit, real-DB Integration, and API tests."
      },
      {
        id: "m03-p4-m4",
        label: "I completed the M03-P4 exercises and can answer the interview questions without notes."
      }
    ],
    prevLessonId: "m03-p3",
    nextLessonId: "m04-p1",
    Content: M03P4Mdx
  },
  {
    id: "m04-p1",
    moduleId: "module-4",
    moduleNumber: 4,
    moduleTitle: "Database Fundamentals & Database Architecture",
    partLabel: "Lesson M04-P1",
    title: "Part 1: Database Architecture, Engines, Data Modeling, ER Diagrams & Constraints",
    category: "databases",
    duration: "90 min (40m theory · 30m practice · 20m review)",
    objectives: [
      "Trace database server architecture from query parsing/planning to Buffer Pool RAM pages and WAL crash durability.",
      "Compare B-Tree (in-place read-optimized) vs. LSM-Tree (MemTable + SSTable write-optimized) storage engines and Relational vs. NoSQL trade-offs.",
      "Design conceptual, logical, and physical ER models resolving 1:1, 1:N, and M:N junction tables with exact column types.",
      "Enforce race-free data integrity using PRIMARY KEY, FOREIGN KEY (RESTRICT/CASCADE/SET NULL), UNIQUE, and CHECK constraints."
    ],
    sections: [
      { id: "m04-p1-objectives", title: "Learning Objectives" },
      { id: "m04-p1-sec-a", letter: "A", title: "Topic Introduction" },
      { id: "m04-p1-sec-b", letter: "B", title: "Fundamentals (Simple Mental Models)" },
      { id: "m04-p1-sec-c", letter: "C", title: "Internal Working & Architecture" },
      { id: "m04-p1-sec-d", letter: "D", title: "Practical Examples (Interactive)" },
      { id: "m04-p1-sec-e", letter: "E", title: "Step-by-Step Walkthrough" },
      { id: "m04-p1-sec-f", letter: "F", title: "Real-World Use Cases" },
      { id: "m04-p1-sec-g", letter: "G", title: "Common Mistakes" },
      { id: "m04-p1-sec-h", letter: "H", title: "Best Practices" },
      { id: "m04-p1-sec-i", letter: "I", title: "Performance & Scalability" },
      { id: "m04-p1-sec-j", letter: "J", title: "Security Considerations" },
      { id: "m04-p1-sec-k", letter: "K", title: "Comparisons & Decision Tables" },
      { id: "m04-p1-sec-l", letter: "L", title: "Tips to Remember (Mnemonics & Mental Models)" },
      { id: "m04-p1-sec-mn", letter: "M/N", title: "Interview Questions & Detailed Answers" },
      { id: "m04-p1-sec-o", letter: "O", title: "Practical Exercises" },
      { id: "m04-p1-sec-p", letter: "P", title: "Advanced Challenge" },
      { id: "m04-p1-sec-q", letter: "Q", title: "Summary & Key Takeaways" },
      { id: "m04-p1-mastery", title: "Mastery Assessment" }
    ],
    masteryItems: [
      {
        id: "m04-p1-m1",
        label: "I can explain Buffer Pool, WAL durability, and B-Tree vs. LSM-Tree storage engine trade-offs."
      },
      {
        id: "m04-p1-m2",
        label: "I can model 1:1, 1:N, and M:N ER relationships with junction tables and exact column types."
      },
      {
        id: "m04-p1-m3",
        label: "I can enforce PRIMARY KEY, FOREIGN KEY (RESTRICT/CASCADE/SET NULL), UNIQUE, and CHECK constraints."
      },
      {
        id: "m04-p1-m4",
        label: "I completed the M04-P1 exercises and can answer the interview questions without notes."
      }
    ],
    prevLessonId: "m03-p4",
    nextLessonId: "m04-p2",
    Content: M04P1Mdx
  },
  {
    id: "m04-p2",
    moduleId: "module-4",
    moduleNumber: 4,
    moduleTitle: "Database Fundamentals & Database Architecture",
    partLabel: "Lesson M04-P2",
    title: "Part 2: Normalization (1NF, 2NF, 3NF, BCNF) & Denormalization",
    category: "databases",
    duration: "80 min (35m theory · 25m practice · 20m review)",
    objectives: [
      "Identify insertion, update, and deletion anomalies caused by redundant relational schemas.",
      "Normalize tables step-by-step through 1NF (atomicity), 2NF (no partial key dependencies), 3NF (no transitive dependencies), and BCNF (superkey determinants).",
      "Distinguish immutable point-in-time snapshots (unit_price_cents) from redundant denormalization.",
      "Apply selective denormalization only for measured read bottlenecks with atomic transaction/trigger/materialized-view synchronization."
    ],
    sections: [
      { id: "m04-p2-objectives", title: "Learning Objectives" },
      { id: "m04-p2-sec-a", letter: "A", title: "Topic Introduction" },
      { id: "m04-p2-sec-b", letter: "B", title: "Fundamentals (Simple Mental Models)" },
      { id: "m04-p2-sec-c", letter: "C", title: "Internal Working & Architecture" },
      { id: "m04-p2-sec-d", letter: "D", title: "Practical Examples (Interactive)" },
      { id: "m04-p2-sec-e", letter: "E", title: "Step-by-Step Walkthrough" },
      { id: "m04-p2-sec-f", letter: "F", title: "Real-World Use Cases" },
      { id: "m04-p2-sec-g", letter: "G", title: "Common Mistakes" },
      { id: "m04-p2-sec-h", letter: "H", title: "Best Practices" },
      { id: "m04-p2-sec-i", letter: "I", title: "Performance & Scalability" },
      { id: "m04-p2-sec-j", letter: "J", title: "Security Considerations" },
      { id: "m04-p2-sec-k", letter: "K", title: "Comparisons & Decision Tables" },
      { id: "m04-p2-sec-l", letter: "L", title: "Tips to Remember (Mnemonics & Mental Models)" },
      { id: "m04-p2-sec-mn", letter: "M/N", title: "Interview Questions & Detailed Answers" },
      { id: "m04-p2-sec-o", letter: "O", title: "Practical Exercises" },
      { id: "m04-p2-sec-p", letter: "P", title: "Advanced Challenge" },
      { id: "m04-p2-sec-q", letter: "Q", title: "Summary & Key Takeaways" },
      { id: "m04-p2-mastery", title: "Mastery Assessment" }
    ],
    masteryItems: [
      {
        id: "m04-p2-m1",
        label: "I can decompose any unnormalized table through 1NF, 2NF, 3NF, and BCNF without losing data."
      },
      {
        id: "m04-p2-m2",
        label: "I can distinguish temporal price snapshots from redundant denormalization."
      },
      {
        id: "m04-p2-m3",
        label: "I can justify selective denormalization and design atomic sync mechanisms to prevent drift."
      },
      {
        id: "m04-p2-m4",
        label: "I completed the M04-P2 exercises and can answer the interview questions without notes."
      }
    ],
    prevLessonId: "m04-p1",
    nextLessonId: "m04-p3",
    Content: M04P2Mdx
  },
  {
    id: "m04-p3",
    moduleId: "module-4",
    moduleNumber: 4,
    moduleTitle: "Database Fundamentals & Database Architecture",
    partLabel: "Lesson M04-P3",
    title: "Part 3: Transactions, ACID, Isolation, MVCC, Locks, Migrations, Pooling & PITR",
    category: "databases",
    duration: "90 min (40m theory · 30m practice · 20m review)",
    objectives: [
      "Explain ACID guarantees and diagnose dirty reads, non-repeatable reads, phantom reads, and write skew across isolation levels.",
      "Trace MVCC tuple visibility (xmin/xmax) and prevent deadlocks via canonical lock ordering and bounded retries.",
      "Execute zero-downtime schema migrations using Expand-and-Contract, NOT VALID + VALIDATE CONSTRAINT, and CREATE INDEX CONCURRENTLY.",
      "Size bounded connection pools and recover databases to exact timestamps using base backups and WAL Point-in-Time Recovery (PITR)."
    ],
    sections: [
      { id: "m04-p3-objectives", title: "Learning Objectives" },
      { id: "m04-p3-sec-a", letter: "A", title: "Topic Introduction" },
      { id: "m04-p3-sec-b", letter: "B", title: "Fundamentals (Simple Mental Models)" },
      { id: "m04-p3-sec-c", letter: "C", title: "Internal Working & Architecture" },
      { id: "m04-p3-sec-d", letter: "D", title: "Practical Examples (Interactive)" },
      { id: "m04-p3-sec-e", letter: "E", title: "Step-by-Step Walkthrough" },
      { id: "m04-p3-sec-f", letter: "F", title: "Real-World Use Cases" },
      { id: "m04-p3-sec-g", letter: "G", title: "Common Mistakes" },
      { id: "m04-p3-sec-h", letter: "H", title: "Best Practices" },
      { id: "m04-p3-sec-i", letter: "I", title: "Performance & Scalability" },
      { id: "m04-p3-sec-j", letter: "J", title: "Security Considerations" },
      { id: "m04-p3-sec-k", letter: "K", title: "Comparisons & Decision Tables" },
      { id: "m04-p3-sec-l", letter: "L", title: "Tips to Remember (Mnemonics & Mental Models)" },
      { id: "m04-p3-sec-mn", letter: "M/N", title: "Interview Questions & Detailed Answers" },
      { id: "m04-p3-sec-o", letter: "O", title: "Practical Exercises" },
      { id: "m04-p3-sec-p", letter: "P", title: "Advanced Challenge" },
      { id: "m04-p3-sec-q", letter: "Q", title: "Summary & Key Takeaways" },
      { id: "m04-p3-mastery", title: "Mastery Assessment" }
    ],
    masteryItems: [
      {
        id: "m04-p3-m1",
        label: "I can select the right isolation level (Read Committed, Repeatable Read, Serializable) and explain MVCC snapshots."
      },
      {
        id: "m04-p3-m2",
        label: "I can prevent deadlocks via canonical lock ordering and handle 40P01/40001 retries cleanly."
      },
      {
        id: "m04-p3-m3",
        label: "I can run zero-downtime Expand-and-Contract migrations, size connection pools, and execute WAL PITR."
      },
      {
        id: "m04-p3-m4",
        label: "I completed the M04-P3 exercises and can answer the interview questions without notes."
      }
    ],
    prevLessonId: "m04-p2",
    nextLessonId: "m05-p1",
    Content: M04P3Mdx
  },
  {
    id: "m05-p1",
    moduleId: "module-5",
    moduleNumber: 5,
    moduleTitle: "PostgreSQL",
    partLabel: "Lesson M05-P1",
    title: "Part 1: PostgreSQL Architecture, Storage, 8 KB Pages, MVCC, WAL & XID Wraparound",
    category: "databases",
    duration: "80 min (35m theory · 25m practice · 20m review)",
    objectives: [
      "Explain PostgreSQL's multi-process architecture (postmaster, per-client backends, shared_buffers, wal_buffers, and background workers).",
      "Trace SQL execution through the Parser, Analyzer/Rewriter, Cost-Based Planner, and Volcano Executor.",
      "Inspect 8 KB slotted pages (line pointers, heap tuples, ctid), relation forks (_fsm, _vm, _init), and TOAST strategies.",
      "Apply HOT updates (fillfactor), WAL full_page_writes, and VACUUM FREEZE to prevent bloat, torn pages, and XID wraparound."
    ],
    sections: [
      { id: "m05-p1-objectives", title: "Learning Objectives" },
      { id: "m05-p1-sec-a", letter: "A", title: "Topic Introduction" },
      { id: "m05-p1-sec-b", letter: "B", title: "Fundamentals (Simple Mental Models)" },
      { id: "m05-p1-sec-c", letter: "C", title: "Internal Working & Architecture" },
      { id: "m05-p1-sec-d", letter: "D", title: "Practical Examples (Interactive)" },
      { id: "m05-p1-sec-e", letter: "E", title: "Step-by-Step Walkthrough" },
      { id: "m05-p1-sec-f", letter: "F", title: "Real-World Use Cases" },
      { id: "m05-p1-sec-g", letter: "G", title: "Common Mistakes" },
      { id: "m05-p1-sec-h", letter: "H", title: "Best Practices" },
      { id: "m05-p1-sec-i", letter: "I", title: "Performance & Scalability" },
      { id: "m05-p1-sec-j", letter: "J", title: "Security Considerations" },
      { id: "m05-p1-sec-k", letter: "K", title: "Comparisons & Decision Tables" },
      { id: "m05-p1-sec-l", letter: "L", title: "Tips to Remember (Mnemonics & Mental Models)" },
      { id: "m05-p1-sec-mn", letter: "M/N", title: "Interview Questions & Detailed Answers" },
      { id: "m05-p1-sec-o", letter: "O", title: "Practical Exercises" },
      { id: "m05-p1-sec-p", letter: "P", title: "Advanced Challenge" },
      { id: "m05-p1-sec-q", letter: "Q", title: "Summary & Key Takeaways" },
      { id: "m05-p1-mastery", title: "Mastery Assessment" }
    ],
    masteryItems: [
      {
        id: "m05-p1-m1",
        label: "I can size shared_buffers vs. work_mem and trace PostgreSQL's four-stage query pipeline."
      },
      {
        id: "m05-p1-m2",
        label: "I can explain 8 KB slotted pages, relation forks (_fsm, _vm), HOT updates, and TOAST storage."
      },
      {
        id: "m05-p1-m3",
        label: "I can explain WAL full_page_writes, checkpoints, and VACUUM FREEZE for 32-bit XID wraparound."
      },
      {
        id: "m05-p1-m4",
        label: "I completed the M05-P1 exercises and can answer the interview questions without notes."
      }
    ],
    prevLessonId: "m04-p3",
    nextLessonId: "m05-p2",
    Content: M05P1Mdx
  },
  {
    id: "m05-p2",
    moduleId: "module-5",
    moduleNumber: 5,
    moduleTitle: "PostgreSQL",
    partLabel: "Lesson M05-P2",
    title: "Part 2: SQL Mastery, DML (ON CONFLICT), JOINs, Subqueries, CTEs & Window Functions",
    category: "databases",
    duration: "90 min (40m theory · 30m practice · 20m review)",
    objectives: [
      "Trace SQL logical execution order (FROM -> WHERE -> GROUP BY -> HAVING -> WINDOW -> SELECT -> ORDER BY -> LIMIT).",
      "Write safe INNER, LEFT, RIGHT, FULL, CROSS, and Self JOINs without falling into the LEFT JOIN + WHERE trap.",
      "Build atomic upserts (INSERT ... ON CONFLICT ... DO UPDATE RETURNING), LATERAL Top-N queries, and cycle-safe WITH RECURSIVE trees.",
      "Compute rankings (ROW_NUMBER, RANK, DENSE_RANK) and ROWS-frame running totals using Window Functions."
    ],
    sections: [
      { id: "m05-p2-objectives", title: "Learning Objectives" },
      { id: "m05-p2-sec-a", letter: "A", title: "Topic Introduction" },
      { id: "m05-p2-sec-b", letter: "B", title: "Fundamentals (Simple Mental Models)" },
      { id: "m05-p2-sec-c", letter: "C", title: "Internal Working & Architecture" },
      { id: "m05-p2-sec-d", letter: "D", title: "Practical Examples (Interactive)" },
      { id: "m05-p2-sec-e", letter: "E", title: "Step-by-Step Walkthrough" },
      { id: "m05-p2-sec-f", letter: "F", title: "Real-World Use Cases" },
      { id: "m05-p2-sec-g", letter: "G", title: "Common Mistakes" },
      { id: "m05-p2-sec-h", letter: "H", title: "Best Practices" },
      { id: "m05-p2-sec-i", letter: "I", title: "Performance & Scalability" },
      { id: "m05-p2-sec-j", letter: "J", title: "Security Considerations" },
      { id: "m05-p2-sec-k", letter: "K", title: "Comparisons & Decision Tables" },
      { id: "m05-p2-sec-l", letter: "L", title: "Tips to Remember (Mnemonics & Mental Models)" },
      { id: "m05-p2-sec-mn", letter: "M/N", title: "Interview Questions & Detailed Answers" },
      { id: "m05-p2-sec-o", letter: "O", title: "Practical Exercises" },
      { id: "m05-p2-sec-p", letter: "P", title: "Advanced Challenge" },
      { id: "m05-p2-sec-q", letter: "Q", title: "Summary & Key Takeaways" },
      { id: "m05-p2-mastery", title: "Mastery Assessment" }
    ],
    masteryItems: [
      {
        id: "m05-p2-m1",
        label: "I can predict alias visibility and outer-join behavior from SQL's logical execution order."
      },
      {
        id: "m05-p2-m2",
        label: "I can write null-safe anti-joins (NOT EXISTS), DISTINCT ON, LATERAL, and ON CONFLICT upserts."
      },
      {
        id: "m05-p2-m3",
        label: "I can traverse trees with cycle-safe WITH RECURSIVE and compute rankings/running totals with OVER()."
      },
      {
        id: "m05-p2-m4",
        label: "I completed the M05-P2 exercises and can answer the interview questions without notes."
      }
    ],
    prevLessonId: "m05-p1",
    nextLessonId: "m05-p3",
    Content: M05P2Mdx
  },
  {
    id: "m05-p3",
    moduleId: "module-5",
    moduleNumber: 5,
    moduleTitle: "PostgreSQL",
    partLabel: "Lesson M05-P3",
    title: "Part 3: Views, Materialized Views, Functions, Procedures, Triggers, Constraints & JSON/JSONB",
    category: "databases",
    duration: "85 min (35m theory · 30m practice · 20m review)",
    objectives: [
      "Differentiate live security_invoker Views from persisted Materialized Views with REFRESH CONCURRENTLY.",
      "Choose between PL/pgSQL Functions (IMMUTABLE/STABLE/VOLATILE) and Stored Procedures (CALL with batched COMMIT).",
      "Design BEFORE/AFTER triggers and storage-level constraints (EXCLUDE USING gist, DEFERRABLE, NOT VALID).",
      "Model semi-structured documents with JSONB and accelerate @> containment queries via GIN (jsonb_path_ops)."
    ],
    sections: [
      { id: "m05-p3-objectives", title: "Learning Objectives" },
      { id: "m05-p3-sec-a", letter: "A", title: "Topic Introduction" },
      { id: "m05-p3-sec-b", letter: "B", title: "Fundamentals (Simple Mental Models)" },
      { id: "m05-p3-sec-c", letter: "C", title: "Internal Working & Architecture" },
      { id: "m05-p3-sec-d", letter: "D", title: "Practical Examples (Interactive)" },
      { id: "m05-p3-sec-e", letter: "E", title: "Step-by-Step Walkthrough" },
      { id: "m05-p3-sec-f", letter: "F", title: "Real-World Use Cases" },
      { id: "m05-p3-sec-g", letter: "G", title: "Common Mistakes" },
      { id: "m05-p3-sec-h", letter: "H", title: "Best Practices" },
      { id: "m05-p3-sec-i", letter: "I", title: "Performance & Scalability" },
      { id: "m05-p3-sec-j", letter: "J", title: "Security Considerations" },
      { id: "m05-p3-sec-k", letter: "K", title: "Comparisons & Decision Tables" },
      { id: "m05-p3-sec-l", letter: "L", title: "Tips to Remember (Mnemonics & Mental Models)" },
      { id: "m05-p3-sec-mn", letter: "M/N", title: "Interview Questions & Detailed Answers" },
      { id: "m05-p3-sec-o", letter: "O", title: "Practical Exercises" },
      { id: "m05-p3-sec-p", letter: "P", title: "Advanced Challenge" },
      { id: "m05-p3-sec-q", letter: "Q", title: "Summary & Key Takeaways" },
      { id: "m05-p3-mastery", title: "Mastery Assessment" }
    ],
    masteryItems: [
      {
        id: "m05-p3-m1",
        label: "I can configure security_invoker views and concurrent materialized views with UNIQUE indexes."
      },
      {
        id: "m05-p3-m2",
        label: "I can choose between Functions and Stored Procedures and design BEFORE/AFTER triggers."
      },
      {
        id: "m05-p3-m3",
        label: "I can enforce EXCLUDE USING gist constraints and index JSONB with GIN (jsonb_path_ops)."
      },
      {
        id: "m05-p3-m4",
        label: "I completed the M05-P3 exercises and can answer the interview questions without notes."
      }
    ],
    prevLessonId: "m05-p2",
    nextLessonId: "m05-p4",
    Content: M05P3Mdx
  },
  {
    id: "m05-p4",
    moduleId: "module-5",
    moduleNumber: 5,
    moduleTitle: "PostgreSQL",
    partLabel: "Lesson M05-P4",
    title: "Part 4: Locking, Partitioning, Replication, EXPLAIN ANALYZE, Indexing, Autovacuum & PITR",
    category: "databases",
    duration: "95 min (40m theory · 35m practice · 20m review)",
    objectives: [
      "Prevent lock-queue outages with lock_timeout and run safe isolation/PgBouncer transaction pooling.",
      "Scale multi-TB tables using declarative Partitioning (Range/List/Hash) and Physical/Logical Replication.",
      "Diagnose slow plans with EXPLAIN (ANALYZE, BUFFERS), pg_statistic, SARGable predicates, and B-Tree/GIN/GiST/BRIN indexes.",
      "Tune per-table Autovacuum thresholds, run pg_repack / REINDEX CONCURRENTLY, and verify PITR backups."
    ],
    sections: [
      { id: "m05-p4-objectives", title: "Learning Objectives" },
      { id: "m05-p4-sec-a", letter: "A", title: "Topic Introduction" },
      { id: "m05-p4-sec-b", letter: "B", title: "Fundamentals (Simple Mental Models)" },
      { id: "m05-p4-sec-c", letter: "C", title: "Internal Working & Architecture" },
      { id: "m05-p4-sec-d", letter: "D", title: "Practical Examples (Interactive)" },
      { id: "m05-p4-sec-e", letter: "E", title: "Step-by-Step Walkthrough" },
      { id: "m05-p4-sec-f", letter: "F", title: "Real-World Use Cases" },
      { id: "m05-p4-sec-g", letter: "G", title: "Common Mistakes" },
      { id: "m05-p4-sec-h", letter: "H", title: "Best Practices" },
      { id: "m05-p4-sec-i", letter: "I", title: "Performance & Scalability" },
      { id: "m05-p4-sec-j", letter: "J", title: "Security Considerations" },
      { id: "m05-p4-sec-k", letter: "K", title: "Comparisons & Decision Tables" },
      { id: "m05-p4-sec-l", letter: "L", title: "Tips to Remember (Mnemonics & Mental Models)" },
      { id: "m05-p4-sec-mn", letter: "M/N", title: "Interview Questions & Detailed Answers" },
      { id: "m05-p4-sec-o", letter: "O", title: "Practical Exercises" },
      { id: "m05-p4-sec-p", letter: "P", title: "Advanced Challenge" },
      { id: "m05-p4-sec-q", letter: "Q", title: "Summary & Key Takeaways" },
      { id: "m05-p4-mastery", title: "Mastery Assessment" }
    ],
    masteryItems: [
      {
        id: "m05-p4-m1",
        label: "I can prevent lock-queue outages, configure PgBouncer transaction pooling, and choose sync/async/logical replication."
      },
      {
        id: "m05-p4-m2",
        label: "I can interpret EXPLAIN (ANALYZE, BUFFERS), fix row-estimate skew, and pick B-Tree, GIN, GiST, or BRIN indexes."
      },
      {
        id: "m05-p4-m3",
        label: "I can partition multi-TB tables, tune per-table Autovacuum thresholds, and run online maintenance + PITR."
      },
      {
        id: "m05-p4-m4",
        label: "I completed the M05-P4 exercises and can answer the interview questions without notes."
      }
    ],
    prevLessonId: "m05-p3",
    nextLessonId: "m06-p1",
    Content: M05P4Mdx
  },
  {
    id: "m06-p1",
    moduleId: "module-6",
    moduleNumber: 6,
    moduleTitle: "MySQL",
    partLabel: "Lesson M06-P1",
    title: "Part 1: MySQL Architecture, InnoDB, Storage Engines, Transactions, ACID, Isolation Levels, Locking & Deadlocks",
    category: "databases",
    duration: "90 min (38m theory · 32m practice · 20m review)",
    objectives: [
      "Describe MySQL's layered architecture (Parser, Optimizer, Storage Engine API, Binary Log) and explain two-phase commit coordination between InnoDB redo log and binlog.",
      "Compare InnoDB, MyISAM, Memory, and CSV storage engines and choose the correct engine for a given workload.",
      "Explain InnoDB's MVCC read-view mechanism, buffer pool, redo/undo logs, and doublewrite buffer.",
      "Distinguish MySQL's four isolation levels and their anomaly profiles, including InnoDB's stronger-than-standard REPEATABLE READ via next-key locking.",
      "Diagnose and prevent InnoDB deadlocks using consistent lock ordering, short transactions, indexes, and application-level retry logic."
    ],
    sections: [
      { id: "m06-p1-objectives", title: "Learning Objectives" },
      { id: "m06-p1-sec-a", letter: "A", title: "Topic Introduction" },
      { id: "m06-p1-sec-b", letter: "B", title: "Fundamentals (Simple Mental Models)" },
      { id: "m06-p1-sec-c", letter: "C", title: "Internal Working & Architecture" },
      { id: "m06-p1-sec-d", letter: "D", title: "Practical Examples (Interactive)" },
      { id: "m06-p1-sec-e", letter: "E", title: "Step-by-Step Walkthrough" },
      { id: "m06-p1-sec-f", letter: "F", title: "Real-World Use Cases" },
      { id: "m06-p1-sec-g", letter: "G", title: "Common Mistakes" },
      { id: "m06-p1-sec-h", letter: "H", title: "Best Practices" },
      { id: "m06-p1-sec-i", letter: "I", title: "Performance & Scalability" },
      { id: "m06-p1-sec-j", letter: "J", title: "Security Considerations" },
      { id: "m06-p1-sec-k", letter: "K", title: "Comparisons & Decision Tables" },
      { id: "m06-p1-sec-l", letter: "L", title: "Tips to Remember (Mnemonics & Mental Models)" },
      { id: "m06-p1-sec-mn", letter: "M/N", title: "Interview Questions & Detailed Answers" },
      { id: "m06-p1-sec-o", letter: "O", title: "Practical Exercises" },
      { id: "m06-p1-sec-p", letter: "P", title: "Advanced Challenge" },
      { id: "m06-p1-sec-q", letter: "Q", title: "Summary & Key Takeaways" },
      { id: "m06-p1-mastery", title: "Mastery Assessment" }
    ],
    masteryItems: [
      {
        id: "m06-p1-m1",
        label: "I can explain MySQL's layered architecture, InnoDB's buffer pool/redo/undo logs, and two-phase commit."
      },
      {
        id: "m06-p1-m2",
        label: "I can compare storage engines, choose the right one, and explain MVCC read views with undo log chains."
      },
      {
        id: "m06-p1-m3",
        label: "I can distinguish all four MySQL isolation levels and explain how InnoDB next-key locks prevent phantoms."
      },
      {
        id: "m06-p1-m4",
        label: "I completed the M06-P1 exercises and can diagnose and prevent InnoDB deadlocks without notes."
      }
    ],
    prevLessonId: "m05-p4",
    nextLessonId: "m06-p2",
    Content: M06P1Mdx
  },
  {
    id: "m06-p2",
    moduleId: "module-6",
    moduleNumber: 6,
    moduleTitle: "MySQL",
    partLabel: "Lesson M06-P2",
    title: "Part 2: Indexes, Query Optimization, EXPLAIN, Stored Programs, Replication, Partitioning & PITR",
    category: "databases",
    duration: "95 min (40m theory · 35m practice · 20m review)",
    objectives: [
      "Design compact sequential primary keys and Equality-First, Range/Sort-Last composite covering indexes (`Using index`).",
      "Interpret `EXPLAIN` / `EXPLAIN ANALYZE` output (`type`, `rows`, `filtered`, `Using filesort`, `Using temporary`) and eliminate full scans.",
      "Evaluate trade-offs for Stored Procedures, Triggers, and `MERGE` vs. `TEMPTABLE` Views (`SQL SECURITY INVOKER`).",
      "Architect GTID replication, `RANGE` partitioning, ProxySQL connection pooling, and Percona XtraBackup + binary log PITR."
    ],
    sections: [
      { id: "m06-p2-objectives", title: "Learning Objectives" },
      { id: "m06-p2-sec-a", letter: "A", title: "Topic Introduction" },
      { id: "m06-p2-sec-b", letter: "B", title: "Fundamentals (Simple Mental Models)" },
      { id: "m06-p2-sec-c", letter: "C", title: "Internal Working & Architecture" },
      { id: "m06-p2-sec-d", letter: "D", title: "Practical Examples (Interactive)" },
      { id: "m06-p2-sec-e", letter: "E", title: "Step-by-Step Walkthrough" },
      { id: "m06-p2-sec-f", letter: "F", title: "Real-World Use Cases" },
      { id: "m06-p2-sec-g", letter: "G", title: "Common Mistakes" },
      { id: "m06-p2-sec-h", letter: "H", title: "Best Practices" },
      { id: "m06-p2-sec-i", letter: "I", title: "Performance & Scalability" },
      { id: "m06-p2-sec-j", letter: "J", title: "Security Considerations" },
      { id: "m06-p2-sec-k", letter: "K", title: "Comparisons & Decision Tables" },
      { id: "m06-p2-sec-l", letter: "L", title: "Tips to Remember (Mnemonics & Mental Models)" },
      { id: "m06-p2-sec-mn", letter: "M/N", title: "Interview Questions & Detailed Answers" },
      { id: "m06-p2-sec-o", letter: "O", title: "Practical Exercises" },
      { id: "m06-p2-sec-p", letter: "P", title: "Advanced Challenge" },
      { id: "m06-p2-sec-q", letter: "Q", title: "Summary & Key Takeaways" },
      { id: "m06-p2-mastery", title: "Mastery Assessment" }
    ],
    masteryItems: [
      {
        id: "m06-p2-m1",
        label: "I can explain InnoDB clustered vs. secondary double lookups and design covering composite indexes."
      },
      {
        id: "m06-p2-m2",
        label: "I can read EXPLAIN / EXPLAIN ANALYZE plans and eliminate ALL scans, filesorts, and deep OFFSETs."
      },
      {
        id: "m06-p2-m3",
        label: "I can configure GTID replication, RANGE partitioning, ProxySQL pooling, and XtraBackup PITR."
      },
      {
        id: "m06-p2-m4",
        label: "I completed all M06-P2 coding exercises and can answer the interview questions without notes."
      }
    ],
    prevLessonId: "m06-p1",
    nextLessonId: "m07-p1",
    Content: M06P2Mdx
  },
  {
    id: "m07-p1",
    moduleId: "module-7",
    moduleNumber: 7,
    moduleTitle: "Microsoft SQL Server (MSSQL)",
    partLabel: "Lesson M07-P1",
    title: "Part 1: SQL Server Architecture, 8 KB Pages, 64 KB Extents, Indexes & T-SQL Objects",
    category: "databases",
    duration: "95 min (40m theory · 35m practice · 20m review)",
    objectives: [
      "Trace SQL Server's 4-layer architecture (SNI, Relational Engine, Storage Engine, SQLOS) and 8 KB page / 64 KB Uniform extent storage.",
      "Compare Heap tables (RID + forwarding pointers), Clustered B+Trees (NUSE keys), and Non-Clustered `INCLUDE` covering indexes.",
      "Choose cleanly among Stored Procedures, Inline TVFs vs. Scalar UDFs, `SCHEMABINDING` Indexed Views, and set-based `inserted`/`deleted` Triggers.",
      "Pick the right intermediate container (`#Temp`, `@Table`, non-materialized `CTE`) and optimize Window Functions with `ROWS` framing."
    ],
    sections: [
      { id: "m07-p1-objectives", title: "Learning Objectives" },
      { id: "m07-p1-sec-a", letter: "A", title: "Topic Introduction" },
      { id: "m07-p1-sec-b", letter: "B", title: "Fundamentals (Simple Mental Models)" },
      { id: "m07-p1-sec-c", letter: "C", title: "Internal Working & Architecture" },
      { id: "m07-p1-sec-d", letter: "D", title: "Practical Examples (Interactive)" },
      { id: "m07-p1-sec-e", letter: "E", title: "Step-by-Step Walkthrough" },
      { id: "m07-p1-sec-f", letter: "F", title: "Real-World Use Cases" },
      { id: "m07-p1-sec-g", letter: "G", title: "Common Mistakes" },
      { id: "m07-p1-sec-h", letter: "H", title: "Best Practices" },
      { id: "m07-p1-sec-i", letter: "I", title: "Performance & Scalability" },
      { id: "m07-p1-sec-j", letter: "J", title: "Security Considerations" },
      { id: "m07-p1-sec-k", letter: "K", title: "Comparisons & Decision Tables" },
      { id: "m07-p1-sec-l", letter: "L", title: "Tips to Remember (Mnemonics & Mental Models)" },
      { id: "m07-p1-sec-mn", letter: "M/N", title: "Interview Questions & Detailed Answers" },
      { id: "m07-p1-sec-o", letter: "O", title: "Practical Exercises" },
      { id: "m07-p1-sec-p", letter: "P", title: "Advanced Challenge" },
      { id: "m07-p1-sec-q", letter: "Q", title: "Summary & Key Takeaways" },
      { id: "m07-p1-mastery", title: "Mastery Assessment" }
    ],
    masteryItems: [
      {
        id: "m07-p1-m1",
        label: "I can explain SQLOS, 8 KB page layout (8,060-byte limit), and 64 KB Uniform vs. Mixed extents."
      },
      {
        id: "m07-p1-m2",
        label: "I can compare Heap tables, NUSE Clustered B+Trees, and Non-Clustered INCLUDE indexes."
      },
      {
        id: "m07-p1-m3",
        label: "I can choose between #Temp tables, @Table variables, CTEs, Inline TVFs, Indexed Views, and set-based Triggers."
      },
      {
        id: "m07-p1-m4",
        label: "I completed all M07-P1 coding exercises and can answer the interview questions without notes."
      }
    ],
    prevLessonId: "m06-p2",
    nextLessonId: "m07-p2",
    Content: M07P1Mdx
  },
  {
    id: "m07-p2",
    moduleId: "module-7",
    moduleNumber: 7,
    moduleTitle: "Microsoft SQL Server (MSSQL)",
    partLabel: "Lesson M07-P2",
    title: "Part 2: Transactions, Locking, Isolation Levels, RCSI & Deadlocks",
    category: "databases",
    duration: "75 min (30m theory · 25m practice · 20m review)",
    objectives: [
      "Write atomic T-SQL transactions with `SET XACT_ABORT ON`, `TRY...CATCH`, and `XACT_STATE()` checks.",
      "Explain SQL Server's lock hierarchy (`KEY`/`RID` → `PAGE` → `OBJECT`), `U` (`UPDLOCK`) locks, `Sch-S`/`Sch-M`, and ~5,000-lock escalation.",
      "Compare pessimistic `READ COMMITTED` vs. `READ_COMMITTED_SNAPSHOT` (RCSI) and `SNAPSHOT` row versioning (Error `3960`).",
      "Diagnose and prevent Error `1205` deadlocks using `UPDLOCK`, consistent lock order, `DEADLOCK_PRIORITY`, and `system_health`."
    ],
    sections: [
      { id: "m07-p2-objectives", title: "Learning Objectives" },
      { id: "m07-p2-sec-a", letter: "A", title: "Topic Introduction" },
      { id: "m07-p2-sec-b", letter: "B", title: "Fundamentals (Simple Mental Models)" },
      { id: "m07-p2-sec-c", letter: "C", title: "Internal Working & Architecture" },
      { id: "m07-p2-sec-d", letter: "D", title: "Practical Examples (Interactive)" },
      { id: "m07-p2-sec-e", letter: "E", title: "Step-by-Step Walkthrough" },
      { id: "m07-p2-sec-f", letter: "F", title: "Real-World Use Cases" },
      { id: "m07-p2-sec-g", letter: "G", title: "Common Mistakes" },
      { id: "m07-p2-sec-h", letter: "H", title: "Best Practices" },
      { id: "m07-p2-sec-i", letter: "I", title: "Performance & Scalability" },
      { id: "m07-p2-sec-j", letter: "J", title: "Security Considerations" },
      { id: "m07-p2-sec-k", letter: "K", title: "Comparisons & Decision Tables" },
      { id: "m07-p2-sec-l", letter: "L", title: "Tips to Remember (Mnemonics & Mental Models)" },
      { id: "m07-p2-sec-mn", letter: "M/N", title: "Interview Questions & Detailed Answers" },
      { id: "m07-p2-sec-o", letter: "O", title: "Practical Exercises" },
      { id: "m07-p2-sec-p", letter: "P", title: "Advanced Challenge" },
      { id: "m07-p2-sec-q", letter: "Q", title: "Summary & Key Takeaways" },
      { id: "m07-p2-mastery", title: "Mastery Assessment" }
    ],
    masteryItems: [
      {
        id: "m07-p2-m1",
        label: "I can write safe T-SQL transactions with SET XACT_ABORT ON and XACT_STATE() in TRY...CATCH."
      },
      {
        id: "m07-p2-m2",
        label: "I can explain SQL Server lock modes (S, U, X, IS, IX, Sch-M) and prevent 5,000-lock escalation."
      },
      {
        id: "m07-p2-m3",
        label: "I can choose between RCSI, SNAPSHOT, and pessimistic isolation without resorting to NOLOCK."
      },
      {
        id: "m07-p2-m4",
        label: "I completed all M07-P2 exercises and can diagnose/prevent Error 1205 conversion deadlocks."
      }
    ],
    prevLessonId: "m07-p1",
    nextLessonId: "m07-p3",
    Content: M07P2Mdx
  },
  {
    id: "m07-p3",
    moduleId: "module-7",
    moduleNumber: 7,
    moduleTitle: "Microsoft SQL Server (MSSQL)",
    partLabel: "Lesson M07-P3",
    title: "Part 3: Execution Plans, Statistics, Parameter Sniffing, Index Maintenance, Partitioning & PITR",
    category: "databases",
    duration: "95 min (40m theory · 35m practice · 20m review)",
    objectives: [
      "Analyze Estimated vs. Actual Execution Plans, Query Store history, statistics histograms, and memory-grant `tempdb` spills.",
      "Resolve `CONVERT_IMPLICIT` scans and parameter sniffing using `INCLUDE`, `OPTION (RECOMPILE)`, `OPTIMIZE FOR UNKNOWN`, and SQL 2022 PSP.",
      "Schedule threshold-driven index maintenance (`5%–30% REORGANIZE` + stats, `>30% REBUILD`) and `RANGE RIGHT` Partition `SWITCH` jobs via SQL Server Agent.",
      "Design `FULL` recovery model Full/Differential/Log (`.trn`) PITR restore chains (`NORECOVERY` -> `RECOVERY, STOPAT`) and wait-stats monitoring."
    ],
    sections: [
      { id: "m07-p3-objectives", title: "Learning Objectives" },
      { id: "m07-p3-sec-a", letter: "A", title: "Topic Introduction" },
      { id: "m07-p3-sec-b", letter: "B", title: "Fundamentals (Simple Mental Models)" },
      { id: "m07-p3-sec-c", letter: "C", title: "Internal Working & Architecture" },
      { id: "m07-p3-sec-d", letter: "D", title: "Practical Examples (Interactive)" },
      { id: "m07-p3-sec-e", letter: "E", title: "Step-by-Step Walkthrough" },
      { id: "m07-p3-sec-f", letter: "F", title: "Real-World Use Cases" },
      { id: "m07-p3-sec-g", letter: "G", title: "Common Mistakes" },
      { id: "m07-p3-sec-h", letter: "H", title: "Best Practices" },
      { id: "m07-p3-sec-i", letter: "I", title: "Performance & Scalability" },
      { id: "m07-p3-sec-j", letter: "J", title: "Security Considerations" },
      { id: "m07-p3-sec-k", letter: "K", title: "Comparisons & Decision Tables" },
      { id: "m07-p3-sec-l", letter: "L", title: "Tips to Remember (Mnemonics & Mental Models)" },
      { id: "m07-p3-sec-mn", letter: "M/N", title: "Interview Questions & Detailed Answers" },
      { id: "m07-p3-sec-o", letter: "O", title: "Practical Exercises" },
      { id: "m07-p3-sec-p", letter: "P", title: "Advanced Challenge" },
      { id: "m07-p3-sec-q", letter: "Q", title: "Summary & Key Takeaways" },
      { id: "m07-p3-mastery", title: "Mastery Assessment" }
    ],
    masteryItems: [
      {
        id: "m07-p3-m1",
        label: "I can interpret Actual Execution Plans, Query Store regressions, CONVERT_IMPLICIT, and tempdb spills."
      },
      {
        id: "m07-p3-m2",
        label: "I can diagnose parameter sniffing and choose between PSP, RECOMPILE, OPTIMIZE FOR UNKNOWN, and plan forcing."
      },
      {
        id: "m07-p3-m3",
        label: "I can apply the 5%/30% index maintenance rule, RANGE RIGHT Partition SWITCH, and Full/Diff/Log PITR restores."
      },
      {
        id: "m07-p3-m4",
        label: "I completed all M07-P3 exercises and can triage SQL Server waits via sys.dm_os_wait_stats."
      }
    ],
    prevLessonId: "m07-p2",
    nextLessonId: "m08-p1",
    Content: M07P3Mdx
  },
  {
    id: "m08-p1",
    moduleId: "module-8",
    moduleNumber: 8,
    moduleTitle: "Database Indexing — Deep Dive",
    partLabel: "Lesson M08-P1",
    title: "Part 1: Index Foundations — Why Indexes Exist, B-Tree, B+ Tree, Hash, Clustered, Non-Clustered & Unique Indexes",
    category: "databases",
    duration: "90 min (38m theory · 32m practice · 20m review)",
    objectives: [
      "Explain why indexes exist, how a sorted index turns a linear scan into a logarithmic seek, and when a sequential scan is still the cheaper plan.",
      "Describe B-Tree and B+ Tree structure (fan-out, leaf chain, copy-up versus move-up splits) and trace a lookup and a range scan.",
      "Choose between B-Tree and hash indexes and state the engine-specific limits of hash indexes in PostgreSQL, MySQL, SQL Server and MongoDB.",
      "Compare clustered and non-clustered indexes, calculate page reads for primary-key, secondary and covering lookups, and pick a good clustering key.",
      "Enforce uniqueness safely with unique indexes, including NULL and collation differences across engines and atomic update behaviour."
    ],
    sections: [
      { id: "m08-p1-objectives", title: "Learning Objectives" },
      { id: "m08-p1-sec-a", letter: "A", title: "Topic Introduction" },
      { id: "m08-p1-sec-b", letter: "B", title: "Fundamentals (Simple Mental Models)" },
      { id: "m08-p1-sec-c", letter: "C", title: "Internal Working & Architecture" },
      { id: "m08-p1-sec-d", letter: "D", title: "Practical Examples (Interactive)" },
      { id: "m08-p1-sec-e", letter: "E", title: "Step-by-Step Walkthrough" },
      { id: "m08-p1-sec-f", letter: "F", title: "Real-World Use Cases" },
      { id: "m08-p1-sec-g", letter: "G", title: "Common Mistakes" },
      { id: "m08-p1-sec-h", letter: "H", title: "Best Practices" },
      { id: "m08-p1-sec-i", letter: "I", title: "Performance & Scalability" },
      { id: "m08-p1-sec-j", letter: "J", title: "Security Considerations" },
      { id: "m08-p1-sec-k", letter: "K", title: "Comparisons & Decision Tables" },
      { id: "m08-p1-sec-l", letter: "L", title: "Tips to Remember (Mnemonics & Mental Models)" },
      { id: "m08-p1-sec-mn", letter: "M/N", title: "Interview Questions & Detailed Answers" },
      { id: "m08-p1-sec-o", letter: "O", title: "Practical Exercises" },
      { id: "m08-p1-sec-p", letter: "P", title: "Advanced Challenge" },
      { id: "m08-p1-sec-q", letter: "Q", title: "Summary & Key Takeaways" },
      { id: "m08-p1-mastery", title: "Mastery Assessment" }
    ],
    masteryItems: [
      {
        id: "m08-p1-m1",
        label: "I can explain why indexes exist and use a page-read cost model to decide between an index seek and a table scan."
      },
      {
        id: "m08-p1-m2",
        label: "I can trace B+ Tree lookups, range scans and leaf splits, and explain why databases prefer B+ Trees over classic B-Trees."
      },
      {
        id: "m08-p1-m3",
        label: "I can compare clustered, non-clustered and hash indexes across PostgreSQL, MySQL, SQL Server and MongoDB."
      },
      {
        id: "m08-p1-m4",
        label: "I completed the M08-P1 exercises and can enforce uniqueness safely, including NULL and atomic-update edge cases."
      }
    ],
    prevLessonId: "m07-p3",
    nextLessonId: null,
    Content: M08P1Mdx
  }
];

const questionsByLesson: Record<string, InterviewQuestion[]> = {
  "m01-p1": m01p1Questions,
  "m01-p2": m01p2Questions,
  "m01-p3": m01p3Questions,
  "m01-p4": m01p4Questions,
  "m01-p5": m01p5Questions,
  "m02-p1": m02p1Questions,
  "m02-p2": m02p2Questions,
  "m02-p3": m02p3Questions,
  "m02-p4": m02p4Questions,
  "m03-p1": m03p1Questions,
  "m03-p2": m03p2Questions,
  "m03-p3": m03p3Questions,
  "m03-p4": m03p4Questions,
  "m04-p1": m04p1Questions,
  "m04-p2": m04p2Questions,
  "m04-p3": m04p3Questions,
  "m05-p1": m05p1Questions,
  "m05-p2": m05p2Questions,
  "m05-p3": m05p3Questions,
  "m05-p4": m05p4Questions,
  "m06-p1": m06p1Questions,
  "m06-p2": m06p2Questions,
  "m07-p1": m07p1Questions,
  "m07-p2": m07p2Questions,
  "m07-p3": m07p3Questions,
  "m08-p1": m08p1Questions
};

const allQuestions: InterviewQuestion[] = [
  ...m01p1Questions,
  ...m01p2Questions,
  ...m01p3Questions,
  ...m01p4Questions,
  ...m01p5Questions,
  ...m02p1Questions,
  ...m02p2Questions,
  ...m02p3Questions,
  ...m02p4Questions,
  ...m03p1Questions,
  ...m03p2Questions,
  ...m03p3Questions,
  ...m03p4Questions,
  ...m04p1Questions,
  ...m04p2Questions,
  ...m04p3Questions,
  ...m05p1Questions,
  ...m05p2Questions,
  ...m05p3Questions,
  ...m05p4Questions,
  ...m06p1Questions,
  ...m06p2Questions,
  ...m07p1Questions,
  ...m07p2Questions,
  ...m07p3Questions,
  ...m08p1Questions
];

function mergeGlossaryEntries(...batches: GlossaryEntry[][]): GlossaryEntry[] {
  const byTerm = new Map<string, GlossaryEntry>();
  for (const batch of batches) {
    for (const entry of batch) {
      const key = entry.term.toLowerCase();
      if (!byTerm.has(key)) {
        byTerm.set(key, entry);
      }
    }
  }
  return [...byTerm.values()].sort((a, b) => a.term.localeCompare(b.term));
}

const glossaryEntries: GlossaryEntry[] = mergeGlossaryEntries(
  extractGlossaryFromMdx(m01p1Raw, "m01-p1"),
  extractGlossaryFromMdx(m01p2Raw, "m01-p2"),
  extractGlossaryFromMdx(m01p3Raw, "m01-p3"),
  extractGlossaryFromMdx(m01p4Raw, "m01-p4"),
  extractGlossaryFromMdx(m01p5Raw, "m01-p5"),
  extractGlossaryFromMdx(m02p1Raw, "m02-p1"),
  extractGlossaryFromMdx(m02p2Raw, "m02-p2"),
  extractGlossaryFromMdx(m02p3Raw, "m02-p3"),
  extractGlossaryFromMdx(m02p4Raw, "m02-p4"),
  extractGlossaryFromMdx(m03p1Raw, "m03-p1"),
  extractGlossaryFromMdx(m03p2Raw, "m03-p2"),
  extractGlossaryFromMdx(m03p3Raw, "m03-p3"),
  extractGlossaryFromMdx(m03p4Raw, "m03-p4"),
  extractGlossaryFromMdx(m04p1Raw, "m04-p1"),
  extractGlossaryFromMdx(m04p2Raw, "m04-p2"),
  extractGlossaryFromMdx(m04p3Raw, "m04-p3"),
  extractGlossaryFromMdx(m05p1Raw, "m05-p1"),
  extractGlossaryFromMdx(m05p2Raw, "m05-p2"),
  extractGlossaryFromMdx(m05p3Raw, "m05-p3"),
  extractGlossaryFromMdx(m05p4Raw, "m05-p4"),
  extractGlossaryFromMdx(m06p1Raw, "m06-p1"),
  extractGlossaryFromMdx(m06p2Raw, "m06-p2"),
  extractGlossaryFromMdx(m07p1Raw, "m07-p1"),
  extractGlossaryFromMdx(m07p2Raw, "m07-p2"),
  extractGlossaryFromMdx(m07p3Raw, "m07-p3"),
  extractGlossaryFromMdx(m08p1Raw, "m08-p1")
);

function buildSearchRecords(): SearchRecord[] {
  const records: SearchRecord[] = [];

  for (const lesson of lessons) {
    records.push({
      id: `lesson:${lesson.id}`,
      type: "Lesson",
      title: lesson.title,
      text: lesson.objectives.join(" "),
      available: true,
      moduleNumber: lesson.moduleNumber,
      lessonId: lesson.id,
      sectionId: lesson.id
    });
  }

  records.push(...extractSearchRecordsFromMdx(m01p1Raw, "m01-p1", lessons[0].title, 1));
  records.push(...extractSearchRecordsFromMdx(m01p2Raw, "m01-p2", lessons[1].title, 1));
  records.push(...extractSearchRecordsFromMdx(m01p3Raw, "m01-p3", lessons[2].title, 1));
  records.push(...extractSearchRecordsFromMdx(m01p4Raw, "m01-p4", lessons[3].title, 1));
  records.push(...extractSearchRecordsFromMdx(m01p5Raw, "m01-p5", lessons[4].title, 1));
  records.push(...extractSearchRecordsFromMdx(m02p1Raw, "m02-p1", lessons[5].title, 2));
  records.push(...extractSearchRecordsFromMdx(m02p2Raw, "m02-p2", lessons[6].title, 2));
  records.push(...extractSearchRecordsFromMdx(m02p3Raw, "m02-p3", lessons[7].title, 2));
  records.push(...extractSearchRecordsFromMdx(m02p4Raw, "m02-p4", lessons[8].title, 2));
  records.push(...extractSearchRecordsFromMdx(m03p1Raw, "m03-p1", lessons[9].title, 3));
  records.push(...extractSearchRecordsFromMdx(m03p2Raw, "m03-p2", lessons[10].title, 3));
  records.push(...extractSearchRecordsFromMdx(m03p3Raw, "m03-p3", lessons[11].title, 3));
  records.push(...extractSearchRecordsFromMdx(m03p4Raw, "m03-p4", lessons[12].title, 3));
  records.push(...extractSearchRecordsFromMdx(m04p1Raw, "m04-p1", lessons[13].title, 4));
  records.push(...extractSearchRecordsFromMdx(m04p2Raw, "m04-p2", lessons[14].title, 4));
  records.push(...extractSearchRecordsFromMdx(m04p3Raw, "m04-p3", lessons[15].title, 4));
  records.push(...extractSearchRecordsFromMdx(m05p1Raw, "m05-p1", lessons[16].title, 5));
  records.push(...extractSearchRecordsFromMdx(m05p2Raw, "m05-p2", lessons[17].title, 5));
  records.push(...extractSearchRecordsFromMdx(m05p3Raw, "m05-p3", lessons[18].title, 5));
  records.push(...extractSearchRecordsFromMdx(m05p4Raw, "m05-p4", lessons[19].title, 5));
  records.push(...extractSearchRecordsFromMdx(m06p1Raw, "m06-p1", lessons[20].title, 6));
  records.push(...extractSearchRecordsFromMdx(m06p2Raw, "m06-p2", lessons[21].title, 6));
  records.push(...extractSearchRecordsFromMdx(m07p1Raw, "m07-p1", lessons[22].title, 7));
  records.push(...extractSearchRecordsFromMdx(m07p2Raw, "m07-p2", lessons[23].title, 7));
  records.push(...extractSearchRecordsFromMdx(m07p3Raw, "m07-p3", lessons[24].title, 7));
  records.push(...extractSearchRecordsFromMdx(m08p1Raw, "m08-p1", lessons[25].title, 8));

  for (const mod of SYLLABUS_MODULES) {
    for (const topic of mod.topics) {
      records.push({
        id: `syllabus:${topic.id}`,
        type: "Syllabus Topic",
        title: `${topic.title} (Module ${mod.number}: ${mod.title})`,
        text: `${topic.group ? `${topic.group} ` : ""}${topic.title} Module ${mod.number} ${mod.title}`,
        available: topic.status === "available",
        moduleNumber: mod.number,
        lessonId: topic.lessonId,
        sectionId: topic.anchorId,
        badgeText: topic.status === "available" ? "Available" : "Not written yet"
      });
    }
  }

  for (const q of allQuestions) {
    const answerText = [
      ...(q.paragraphs?.map((p) => `${p.label ?? ""} ${p.body}`) ?? []),
      ...(q.numberedSteps?.map((s) => `${s.title} ${s.body}`) ?? []),
      ...(q.subboxes?.map((b) => `${b.title} ${b.content}`) ?? [])
    ].join(" ");

    records.push({
      id: `iq:${q.id}`,
      type: "Interview Q&A",
      title: `${q.number}. ${q.question}`,
      text: `${q.question} ${answerText}`,
      available: true,
      moduleNumber: q.moduleNumber,
      lessonId: q.lessonId,
      sectionId: q.id,
      badgeText: q.difficulty
    });
  }

  for (const g of glossaryEntries) {
    records.push({
      id: `glossary:${g.term.toLowerCase()}`,
      type: "Glossary",
      title: g.term,
      text: `${g.term}: ${g.definition}`,
      available: true,
      lessonId: g.lessonId,
      sectionId: g.sectionId
    });
  }

  return records;
}

export const handbookCatalog: HandbookCatalog = {
  modules,
  lessons,
  syllabusModules: SYLLABUS_MODULES,
  questionsByLesson,
  allQuestions,
  glossaryEntries,
  searchRecords: buildSearchRecords()
};
