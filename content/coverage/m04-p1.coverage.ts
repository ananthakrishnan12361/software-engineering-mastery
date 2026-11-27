import assert from "node:assert/strict";
import type { LessonCoverageSpec } from "./types";

export const m04p1Coverage: LessonCoverageSpec = {
  lessonId: "m04-p1",
  moduleNumber: 4,
  mdxPath: "content/modules/04-database-fundamentals/m04-p1.mdx",
  topics: [
    {
      topicTitle: "What a database is",
      anchorId: "m04-p1-topic-what-a-database-is",
      explanationHeadings: ["1. What a Database Is: Durable, Queryable, Concurrent State"],
      exampleTitles: ["Example 2: Mini Relational Constraint Engine (`createRelationalDb` — PK, UNIQUE, CHECK & FK)"],
      interviewQuestionIds: ["m04-p1-iq-1"],
      exerciseTitles: ["Exercise 1: ER Cardinality & Junction Table Validator (designRelationship)"]
    },
    {
      topicTitle: "Database architecture",
      anchorId: "m04-p1-topic-database-architecture",
      explanationHeadings: [
        "2. Database Architecture: Transport, Query Engine, Buffer Pool & Disk",
        "1. Layered Database Server Architecture (Query Engine -> Buffer Pool -> WAL & Storage)"
      ],
      exampleTitles: ["Example 3: B-Tree vs. LSM-Tree Storage Engine Write & Read Cost Simulator (`simulateEngine`)"],
      interviewQuestionIds: ["m04-p1-iq-8"],
      exerciseTitles: ["Exercise 1: ER Cardinality & Junction Table Validator (designRelationship)"]
    },
    {
      topicTitle: "Database engines",
      anchorId: "m04-p1-topic-database-engines",
      explanationHeadings: ["3. Database Engines: B-Tree (Read-Optimized) vs. LSM-Tree (Write-Optimized)"],
      exampleTitles: ["Example 3: B-Tree vs. LSM-Tree Storage Engine Write & Read Cost Simulator (`simulateEngine`)"],
      interviewQuestionIds: ["m04-p1-iq-9", "m04-p1-iq-12"],
      exerciseTitles: ["Exercise 2: Foreign Key Cascade vs. Restrict Simulator (applyParentDelete)"]
    },
    {
      topicTitle: "Relational databases",
      anchorId: "m04-p1-topic-relational-databases",
      explanationHeadings: ["4. Relational Databases: Set Theory, Strict Schemas & Joins"],
      exampleTitles: ["Example 2: Mini Relational Constraint Engine (`createRelationalDb` — PK, UNIQUE, CHECK & FK)"],
      interviewQuestionIds: ["m04-p1-iq-7"],
      exerciseTitles: ["Exercise 2: Foreign Key Cascade vs. Restrict Simulator (applyParentDelete)"]
    },
    {
      topicTitle: "NoSQL databases",
      anchorId: "m04-p1-topic-nosql-databases",
      explanationHeadings: ["5. NoSQL Databases: Document, Key-Value, Wide-Column & Graph"],
      exampleTitles: ["Example 3: B-Tree vs. LSM-Tree Storage Engine Write & Read Cost Simulator (`simulateEngine`)"],
      interviewQuestionIds: ["m04-p1-iq-7", "m04-p1-iq-12"],
      exerciseTitles: ["Exercise 1: ER Cardinality & Junction Table Validator (designRelationship)"]
    },
    {
      topicTitle: "Data modeling",
      anchorId: "m04-p1-topic-data-modeling",
      explanationHeadings: ["6. Data Modeling: Conceptual, Logical & Physical Design"],
      exampleTitles: ["Example 2: Mini Relational Constraint Engine (`createRelationalDb` — PK, UNIQUE, CHECK & FK)"],
      interviewQuestionIds: ["m04-p1-iq-11"],
      exerciseTitles: ["Exercise 1: ER Cardinality & Junction Table Validator (designRelationship)"]
    },
    {
      topicTitle: "ER diagrams",
      anchorId: "m04-p1-topic-er-diagrams",
      explanationHeadings: [
        "7. ER Diagrams: Entities, Attributes & Cardinalities (`1:1`, `1:N`, `M:N`)",
        "2. ER Cardinality & Constraint Relationships (`1:N` and `M:N` Junction Table)"
      ],
      exampleTitles: ["Example 2: Mini Relational Constraint Engine (`createRelationalDb` — PK, UNIQUE, CHECK & FK)"],
      interviewQuestionIds: ["m04-p1-iq-3"],
      exerciseTitles: ["Exercise 1: ER Cardinality & Junction Table Validator (designRelationship)"]
    },
    {
      topicTitle: "Tables",
      anchorId: "m04-p1-topic-tables",
      explanationHeadings: ["8. Tables: Named Collections of Uniform Records"],
      exampleTitles: ["Example 2: Mini Relational Constraint Engine (`createRelationalDb` — PK, UNIQUE, CHECK & FK)"],
      interviewQuestionIds: ["m04-p1-iq-3"],
      exerciseTitles: ["Exercise 1: ER Cardinality & Junction Table Validator (designRelationship)"]
    },
    {
      topicTitle: "Rows",
      anchorId: "m04-p1-topic-rows",
      explanationHeadings: ["9. Rows: Individual Entity Instances (Tuples)"],
      exampleTitles: ["Example 2: Mini Relational Constraint Engine (`createRelationalDb` — PK, UNIQUE, CHECK & FK)"],
      interviewQuestionIds: ["m04-p1-iq-2"],
      exerciseTitles: ["Exercise 2: Foreign Key Cascade vs. Restrict Simulator (applyParentDelete)"]
    },
    {
      topicTitle: "Columns",
      anchorId: "m04-p1-topic-columns",
      explanationHeadings: ["10. Columns: Strict Types, Nullability & Precision"],
      exampleTitles: ["Example 2: Mini Relational Constraint Engine (`createRelationalDb` — PK, UNIQUE, CHECK & FK)"],
      interviewQuestionIds: ["m04-p1-iq-4"],
      exerciseTitles: ["Exercise 1: ER Cardinality & Junction Table Validator (designRelationship)"]
    },
    {
      topicTitle: "Primary keys",
      anchorId: "m04-p1-topic-primary-keys",
      explanationHeadings: ["11. Primary Keys: Unique Non-Null Row Identity"],
      exampleTitles: ["Example 2: Mini Relational Constraint Engine (`createRelationalDb` — PK, UNIQUE, CHECK & FK)"],
      interviewQuestionIds: ["m04-p1-iq-2", "m04-p1-iq-6"],
      exerciseTitles: ["Exercise 1: ER Cardinality & Junction Table Validator (designRelationship)"]
    },
    {
      topicTitle: "Foreign keys",
      anchorId: "m04-p1-topic-foreign-keys",
      explanationHeadings: ["12. Foreign Keys: Enforcing Referential Integrity Across Tables"],
      exampleTitles: ["Example 2: Mini Relational Constraint Engine (`createRelationalDb` — PK, UNIQUE, CHECK & FK)"],
      interviewQuestionIds: ["m04-p1-iq-2", "m04-p1-iq-10"],
      exerciseTitles: ["Exercise 2: Foreign Key Cascade vs. Restrict Simulator (applyParentDelete)"]
    },
    {
      topicTitle: "Unique constraints",
      anchorId: "m04-p1-topic-unique-constraints",
      explanationHeadings: ["13. Unique Constraints: Race-Free Uniqueness at the Storage Layer"],
      exampleTitles: ["Example 2: Mini Relational Constraint Engine (`createRelationalDb` — PK, UNIQUE, CHECK & FK)"],
      interviewQuestionIds: ["m04-p1-iq-2", "m04-p1-iq-5"],
      exerciseTitles: ["Exercise 2: Foreign Key Cascade vs. Restrict Simulator (applyParentDelete)"]
    },
    {
      topicTitle: "Check constraints",
      anchorId: "m04-p1-topic-check-constraints",
      explanationHeadings: ["14. Check Constraints: Enforcing Domain Invariants Inside the Engine"],
      exampleTitles: ["Example 2: Mini Relational Constraint Engine (`createRelationalDb` — PK, UNIQUE, CHECK & FK)"],
      interviewQuestionIds: ["m04-p1-iq-2"],
      exerciseTitles: ["Exercise 2: Foreign Key Cascade vs. Restrict Simulator (applyParentDelete)"]
    }
  ],
  codeTests: [
    {
      blockIndex: 1,
      label: "Example 2: createRelationalDb",
      expectedStdoutIncludes: ["User inserted & FK delete blocked? true"],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`const d = createRelationalDb(); d.insertUser({ id: 1, email: "a@b.c" }); d.insertUser({ id: 2, email: "A@B.C" });`), /UNIQUE/);
        assert.throws(() => run(`createRelationalDb().insertOrder({ id: 1, userId: 99, totalCents: 10 });`), /FOREIGN KEY/);
        assert.throws(() => run(`const d = createRelationalDb(); d.insertUser({ id: 1, email: "a@b.c" }); d.insertOrder({ id: 1, userId: 1, totalCents: -1 });`), /CHECK/);
      },
      safetyMutations: [
        {
          description: "Removing UNIQUE email check allows case-insensitive duplicate emails",
          mutateCode: (raw) =>
            raw.replace(/if \(emails\.has\(normEmail\)\) throw new Error\("UNIQUE violation: duplicate email " \+ normEmail\);/, "/* unique removed */"),
          verifyProtection: (run) => {
            assert.throws(() => run(`const d = createRelationalDb(); d.insertUser({ id: 1, email: "a@b.c" }); d.insertUser({ id: 2, email: "a@b.c" });`), /UNIQUE/);
          }
        },
        {
          description: "Removing CHECK totalCents >= 0 allows negative order totals",
          mutateCode: (raw) =>
            raw.replace(/if \(!Number\.isInteger\(totalCents\) \|\| totalCents < 0\)\s*\{[^}]*\}/, "/* check removed */"),
          verifyProtection: (run) => {
            assert.throws(() => run(`const d = createRelationalDb(); d.insertUser({ id: 1, email: "a@b.c" }); d.insertOrder({ id: 1, userId: 1, totalCents: -50 });`), /CHECK/);
          }
        }
      ]
    },
    {
      blockIndex: 2,
      label: "Example 3: createLsmMemTable",
      expectedStdoutIncludes: ["Read k3:", "| Read k1:", "| Stats:"],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`createLsmMemTable(0);`), TypeError);
        assert.throws(() => run(`createLsmMemTable(2).put("", "v");`), TypeError);
        assert.equal(run(`const m = createLsmMemTable(2); m.put("a", 1); m.put("b", 2); m.put("a", 9); return m.get("a").value;`), 9);
      },
      safetyMutations: [
        {
          description: "Removing flushThreshold validation accepts 0 and fails",
          mutateCode: (raw) =>
            raw.replace(/if \(!Number\.isInteger\(flushThreshold\) \|\| flushThreshold < 1\)\s*\{[^}]*\}/, "/* guard removed */"),
          verifyProtection: (run) => {
            assert.throws(() => run(`createLsmMemTable(0);`), TypeError);
          }
        }
      ]
    },
    {
      blockIndex: 3,
      label: "Exercise 1: designRelationship",
      expectedStdoutIncludes: ["1:N:", "M:N:", "orders_products"],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`designRelationship({ leftEntity: "", rightEntity: "b", cardinality: "1:N" });`), TypeError);
        assert.throws(() => run(`designRelationship({ leftEntity: "a", rightEntity: "b", cardinality: "bad" });`), RangeError);
        assert.equal(run(`return designRelationship({ leftEntity: "users", rightEntity: "profiles", cardinality: "1:1" }).uniqueFk;`), true);
      },
      safetyMutations: [
        {
          description: "Removing cardinality validation accepts invalid relation types",
          mutateCode: (raw) =>
            raw.replace(/throw new RangeError\("Unsupported cardinality: " \+ cardinality\);/, "return null;"),
          verifyProtection: (run) => {
            assert.throws(() => run(`designRelationship({ leftEntity: "a", rightEntity: "b", cardinality: "N:0" });`), RangeError);
          }
        }
      ]
    },
    {
      blockIndex: 4,
      label: "Exercise 2: applyParentDelete",
      expectedStdoutIncludes: ["CASCADE:", "SET_NULL:"],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`applyParentDelete({ parentId: 1, childRows: "bad", onDelete: "CASCADE" });`), TypeError);
        assert.throws(() => run(`applyParentDelete({ parentId: 1, childRows: [{ id: 1, parentId: 1 }], onDelete: "RESTRICT" });`), /RESTRICT/);
        assert.equal(
          run(`const rows = [{ id: 1, parentId: 5 }]; applyParentDelete({ parentId: 5, childRows: rows, onDelete: "SET_NULL" }); return rows[0].parentId;`),
          5
        );
      },
      safetyMutations: [
        {
          description: "Removing RESTRICT child check allows orphan child rows",
          mutateCode: (raw) =>
            raw.replace(/if \(hasChildren\) throw new Error\("FOREIGN KEY RESTRICT: child rows exist"\);/, "/* check removed */"),
          verifyProtection: (run) => {
            assert.throws(() => run(`applyParentDelete({ parentId: 1, childRows: [{ id: 1, parentId: 1 }], onDelete: "RESTRICT" });`), /RESTRICT/);
          }
        }
      ]
    }
  ]
};
