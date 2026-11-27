import assert from "node:assert/strict";
import type { LessonCoverageSpec } from "./types";

export const m04p2Coverage: LessonCoverageSpec = {
  lessonId: "m04-p2",
  moduleNumber: 4,
  mdxPath: "content/modules/04-database-fundamentals/m04-p2.mdx",
  topics: [
    {
      topicTitle: "Normalization",
      anchorId: "m04-p2-topic-normalization",
      explanationHeadings: [
        "1. Normalization: Eliminating Redundancy & Data Anomalies",
        "1. Normal Form Progression (`1NF -> 2NF -> 3NF -> BCNF`)"
      ],
      exampleTitles: ["Example 2: Functional Dependency & Normal Form Classifier (`classifyTableNormalForm`)"],
      interviewQuestionIds: ["m04-p2-iq-1", "m04-p2-iq-9", "m04-p2-iq-10"],
      exerciseTitles: ["Exercise 1: 1NF Repeating-Group Splitter (normalizeToFirstNf)"]
    },
    {
      topicTitle: "Denormalization",
      anchorId: "m04-p2-topic-denormalization",
      explanationHeadings: [
        "2. Denormalization: Intentional Read Speed vs. Write Complexity",
        "2. Normalized Write Integrity vs. Selective Denormalization"
      ],
      exampleTitles: ["Example 3: Normalized vs. Denormalized Cache Sync Simulator (`createSyncedOrderStore`)"],
      interviewQuestionIds: ["m04-p2-iq-3", "m04-p2-iq-8", "m04-p2-iq-10"],
      exerciseTitles: ["Exercise 2: 3NF Transitive Dependency Detector (findTransitiveViolations)"]
    },
    {
      topicTitle: "1NF",
      anchorId: "m04-p2-topic-1nf",
      explanationHeadings: ["3. 1NF (First Normal Form): Atomic Values & No Repeating Groups"],
      exampleTitles: ["Example 2: Functional Dependency & Normal Form Classifier (`classifyTableNormalForm`)"],
      interviewQuestionIds: ["m04-p2-iq-2"],
      exerciseTitles: ["Exercise 1: 1NF Repeating-Group Splitter (normalizeToFirstNf)"]
    },
    {
      topicTitle: "2NF",
      anchorId: "m04-p2-topic-2nf",
      explanationHeadings: ["4. 2NF (Second Normal Form): Eliminating Partial Dependencies"],
      exampleTitles: ["Example 2: Functional Dependency & Normal Form Classifier (`classifyTableNormalForm`)"],
      interviewQuestionIds: ["m04-p2-iq-4"],
      exerciseTitles: ["Exercise 1: 1NF Repeating-Group Splitter (normalizeToFirstNf)"]
    },
    {
      topicTitle: "3NF",
      anchorId: "m04-p2-topic-3nf",
      explanationHeadings: ["5. 3NF (Third Normal Form): Eliminating Transitive Dependencies"],
      exampleTitles: ["Example 2: Functional Dependency & Normal Form Classifier (`classifyTableNormalForm`)"],
      interviewQuestionIds: ["m04-p2-iq-5", "m04-p2-iq-6"],
      exerciseTitles: ["Exercise 2: 3NF Transitive Dependency Detector (findTransitiveViolations)"]
    },
    {
      topicTitle: "BCNF overview",
      anchorId: "m04-p2-topic-bcnf-overview",
      explanationHeadings: ["6. BCNF Overview (Boyce-Codd Normal Form): Every Determinant Is a Candidate Key"],
      exampleTitles: ["Example 2: Functional Dependency & Normal Form Classifier (`classifyTableNormalForm`)"],
      interviewQuestionIds: ["m04-p2-iq-7"],
      exerciseTitles: ["Exercise 2: 3NF Transitive Dependency Detector (findTransitiveViolations)"]
    }
  ],
  codeTests: [
    {
      blockIndex: 1,
      label: "Example 2: classifyTableNormalForm",
      expectedStdoutIncludes: ["CSV tags:", "Partial dep:", "Transitive dep:", "Clean 3NF/BCNF:"],
      minStdoutLines: 4,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`classifyTableNormalForm({ hasAtomicColumns: "yes", primaryKey: ["id"], dependencies: [] });`), TypeError);
        assert.throws(() => run(`classifyTableNormalForm({ hasAtomicColumns: true, primaryKey: [], dependencies: [] });`), TypeError);
        assert.equal(
          run(`return classifyTableNormalForm({ hasAtomicColumns: true, primaryKey: ["student", "course"], candidateKeys: [["student", "course"]], dependencies: [{ lhs: ["instructor"], rhs: "course" }] }).highestForm;`),
          "3NF"
        );
        assert.equal(
          run(`return classifyTableNormalForm({ hasAtomicColumns: true, primaryKey: ["id"], dependencies: [{ lhs: ["id", "extra_col"], rhs: "name" }] }).highestForm;`),
          "BCNF"
        );
        assert.equal(
          run(`return classifyTableNormalForm({ hasAtomicColumns: true, primaryKey: ["a", "b"], candidateKeys: [["a", "b"], ["c", "d"]], dependencies: [{ lhs: ["c"], rhs: "e" }] }).highestForm;`),
          "1NF"
        );
        assert.equal(
          run(`return classifyTableNormalForm({ hasAtomicColumns: true, primaryKey: ["a", "b"], dependencies: [{ lhs: ["a"], rhs: "a" }] }).highestForm;`),
          "BCNF"
        );
      },
      safetyMutations: [
        {
          description: "Removing 1NF atomicity check treats CSV repeating groups as BCNF",
          mutateCode: (raw) =>
            raw.replace(/if \(!hasAtomicColumns\) return \{ highestForm: "UNF"[^}]*\};/, "/* 1NF check removed */"),
          verifyProtection: (run) => {
            assert.equal(
              run(`return classifyTableNormalForm({ hasAtomicColumns: false, primaryKey: ["id"], dependencies: [] }).highestForm;`),
              "UNF"
            );
          }
        },
        {
          description: "Removing 2NF partial dependency check misclassifies composite partial key dep",
          mutateCode: (raw) => raw.replace(/if \(rhsIsNonKey && lhsStrictSubsetOfCandidateKey\)\s*\{[^}]*\}/, "/* 2NF removed */"),
          verifyProtection: (run) => {
            assert.equal(
              run(`return classifyTableNormalForm({ hasAtomicColumns: true, primaryKey: ["a", "b"], dependencies: [{ lhs: ["a"], rhs: "c" }] }).highestForm;`),
              "1NF"
            );
          }
        }
      ]
    },
    {
      blockIndex: 2,
      label: "Example 3: createSyncedOrderStore",
      expectedStdoutIncludes: ["Synced:", '"inSync":true', "Drifted:", '"inSync":false'],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`createSyncedOrderStore().createOrder(0);`), TypeError);
        assert.throws(() => run(`const s = createSyncedOrderStore(); s.createOrder(1); s.addItem(1, { qty: 0, unitPriceCents: 10 });`), TypeError);
        assert.equal(
          run(`const s = createSyncedOrderStore(); s.createOrder(1); s.addItem(1, { qty: 3, unitPriceCents: 200 }); return s.inspect(1).normalizedSum;`),
          600
        );
      },
      safetyMutations: [
        {
          description: "Removing positive qty/price validation allows negative item quantities",
          mutateCode: (raw) =>
            raw.replace(/if \(!Number\.isInteger\(qty\) \|\| qty < 1 \|\| !Number\.isInteger\(unitPriceCents\) \|\| unitPriceCents < 0\)\s*\{[^}]*\}/, "/* check removed */"),
          verifyProtection: (run) => {
            assert.throws(() => run(`const s = createSyncedOrderStore(); s.createOrder(1); s.addItem(1, { qty: -2, unitPriceCents: 100 });`), TypeError);
          }
        }
      ]
    },
    {
      blockIndex: 3,
      label: "Exercise 1: normalizeToFirstNf",
      expectedStdoutIncludes: ["1NF rows:"],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`normalizeToFirstNf("bad");`), TypeError);
        assert.deepEqual(
          run(`return normalizeToFirstNf([{ id: 1, tagsCsv: "A, a, , b" }]);`),
          [{ id: 1, tag: "a" }, { id: 1, tag: "b" }]
        );
      },
      safetyMutations: [
        {
          description: "Removing per-row deduplication emits duplicate 1NF rows",
          mutateCode: (raw) => raw.replace(/if \(tag && !seen\.has\(tag\)\)/, "if (tag)"),
          verifyProtection: (run) => {
            assert.equal(run(`return normalizeToFirstNf([{ id: 1, tagsCsv: "x, x" }]).length;`), 1);
          }
        }
      ]
    },
    {
      blockIndex: 4,
      label: "Exercise 2: findTransitiveViolations",
      expectedStdoutIncludes: ["Violations:"],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`findTransitiveViolations({ keyColumns: [], dependencies: [] });`), TypeError);
        assert.deepEqual(
          run(`return findTransitiveViolations({ keyColumns: ["id"], dependencies: [{ from: "id", to: "dept_id" }, { from: "dept_id", to: "dept_name" }] });`),
          [{ via: "dept_id", target: "dept_name" }]
        );
      },
      safetyMutations: [
        {
          description: "Removing non-key from check flags direct PK dependencies as 3NF violations",
          mutateCode: (raw) => raw.replace(/if \(!keys\.has\(dep\.from\) && !keys\.has\(dep\.to\)\)/, "if (!keys.has(dep.to))"),
          verifyProtection: (run) => {
            assert.equal(
              run(`return findTransitiveViolations({ keyColumns: ["id"], dependencies: [{ from: "id", to: "name" }] }).length;`),
              0
            );
          }
        }
      ]
    }
  ]
};
