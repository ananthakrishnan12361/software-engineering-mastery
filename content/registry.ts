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
    partSummary: "Parts 1–2 of 4",
    scopeSummary:
      "Scope (Parts 1–2): Node.js Architecture, V8, libuv, Event Loop, Streams, Buffers, Express, Middleware, Routing, REST, HTTP, Validation, Errors & Logging",
    lead: "Master Node.js runtime internals, V8 + libuv concurrency, streams/buffers, Express middleware pipelines, REST API design, validation, and structured logging.",
    lessonIds: ["m03-p1", "m03-p2"]
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
    nextLessonId: null,
    Content: M03P2Mdx
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
  "m03-p2": m03p2Questions
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
  ...m03p2Questions
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
  extractGlossaryFromMdx(m03p2Raw, "m03-p2")
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
