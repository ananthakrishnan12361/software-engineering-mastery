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
import { m01p1Questions } from "./interviews/m01-p1.questions";
import { m01p2Questions } from "./interviews/m01-p2.questions";
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
    partSummary: "Parts 1–2 of 5",
    scopeSummary:
      "Scope (Parts 1–2): Programming Fundamentals, Variables, Data Types, Functions, Objects, Arrays, Classes, OOP & SOLID Fundamentals",
    lead: "Build rock-solid engineering mental models from how source code executes in memory to production JavaScript internals, object/array layouts, OOP encapsulation, SOLID boundaries, and senior interview trade-offs.",
    lessonIds: ["m01-p1", "m01-p2"]
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
    nextLessonId: null,
    Content: M01P2Mdx
  }
];

const questionsByLesson: Record<string, InterviewQuestion[]> = {
  "m01-p1": m01p1Questions,
  "m01-p2": m01p2Questions
};

const allQuestions: InterviewQuestion[] = [...m01p1Questions, ...m01p2Questions];

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
  extractGlossaryFromMdx(m01p2Raw, "m01-p2")
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
