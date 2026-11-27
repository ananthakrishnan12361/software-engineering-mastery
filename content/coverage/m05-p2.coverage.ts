import assert from "node:assert/strict";
import type { LessonCoverageSpec } from "./types";

export const m05p2Coverage: LessonCoverageSpec = {
  lessonId: "m05-p2",
  moduleNumber: 5,
  mdxPath: "content/modules/05-postgresql/m05-p2.mdx",
  topics: [
    {
      topicTitle: "SQL",
      anchorId: "m05-p2-topic-sql",
      explanationHeadings: ["1. SQL: Logical Query Execution Order & PostgreSQL Dialect"],
      exampleTitles: ["Example 2: Relational JOIN Simulator (`executeJoin`)"],
      interviewQuestionIds: ["m05-p2-iq-1"],
      exerciseTitles: ["Exercise 1: Cycle-Safe Recursive Hierarchy Traversal (traverseRecursiveHierarchy)"]
    },
    {
      topicTitle: "SELECT",
      anchorId: "m05-p2-topic-select",
      explanationHeadings: ["2. SELECT: Projection, Filtering, DISTINCT ON, Grouping & Sorting"],
      exampleTitles: ["Example 3: Window Ranking & Running Total Evaluator (`evaluateWindowFunctions`)"],
      interviewQuestionIds: ["m05-p2-iq-1", "m05-p2-iq-7"],
      exerciseTitles: ["Exercise 1: Cycle-Safe Recursive Hierarchy Traversal (traverseRecursiveHierarchy)"]
    },
    {
      topicTitle: "INSERT",
      anchorId: "m05-p2-topic-insert",
      explanationHeadings: ["3. INSERT: Multi-Row Inserts, RETURNING & Upserts (ON CONFLICT)"],
      exampleTitles: ["Example 2: Relational JOIN Simulator (`executeJoin`)"],
      interviewQuestionIds: ["m05-p2-iq-6"],
      exerciseTitles: ["Exercise 2: Atomic Upsert Batch Simulator (applyUpsertBatch)"]
    },
    {
      topicTitle: "UPDATE",
      anchorId: "m05-p2-topic-update",
      explanationHeadings: ["4. UPDATE: Conditional Updates, FROM Joins & RETURNING"],
      exampleTitles: ["Example 2: Relational JOIN Simulator (`executeJoin`)"],
      interviewQuestionIds: ["m05-p2-iq-6"],
      exerciseTitles: ["Exercise 2: Atomic Upsert Batch Simulator (applyUpsertBatch)"]
    },
    {
      topicTitle: "DELETE",
      anchorId: "m05-p2-topic-delete",
      explanationHeadings: ["5. DELETE: Filtered Deletes, USING Joins & TRUNCATE vs. DELETE"],
      exampleTitles: ["Example 2: Relational JOIN Simulator (`executeJoin`)"],
      interviewQuestionIds: ["m05-p2-iq-3"],
      exerciseTitles: ["Exercise 2: Atomic Upsert Batch Simulator (applyUpsertBatch)"]
    },
    {
      topicTitle: "JOIN",
      anchorId: "m05-p2-topic-join",
      explanationHeadings: ["6. JOIN: Relational Combination & Physical Join Algorithms"],
      exampleTitles: ["Example 2: Relational JOIN Simulator (`executeJoin`)"],
      interviewQuestionIds: ["m05-p2-iq-2"],
      exerciseTitles: ["Exercise 1: Cycle-Safe Recursive Hierarchy Traversal (traverseRecursiveHierarchy)"]
    },
    {
      topicTitle: "INNER JOIN",
      anchorId: "m05-p2-topic-inner-join",
      explanationHeadings: ["7. INNER JOIN: Intersection of Matching Rows"],
      exampleTitles: ["Example 2: Relational JOIN Simulator (`executeJoin`)"],
      interviewQuestionIds: ["m05-p2-iq-2"],
      exerciseTitles: ["Exercise 1: Cycle-Safe Recursive Hierarchy Traversal (traverseRecursiveHierarchy)"]
    },
    {
      topicTitle: "LEFT JOIN",
      anchorId: "m05-p2-topic-left-join",
      explanationHeadings: ["8. LEFT JOIN: Preserving Left Rows & Avoiding WHERE Trap"],
      exampleTitles: ["Example 2: Relational JOIN Simulator (`executeJoin`)"],
      interviewQuestionIds: ["m05-p2-iq-2", "m05-p2-iq-10"],
      exerciseTitles: ["Exercise 1: Cycle-Safe Recursive Hierarchy Traversal (traverseRecursiveHierarchy)"]
    },
    {
      topicTitle: "RIGHT JOIN",
      anchorId: "m05-p2-topic-right-join",
      explanationHeadings: ["9. RIGHT JOIN: Preserving Right Rows (and Rewriting as LEFT JOIN)"],
      exampleTitles: ["Example 2: Relational JOIN Simulator (`executeJoin`)"],
      interviewQuestionIds: ["m05-p2-iq-2"],
      exerciseTitles: ["Exercise 1: Cycle-Safe Recursive Hierarchy Traversal (traverseRecursiveHierarchy)"]
    },
    {
      topicTitle: "FULL JOIN",
      anchorId: "m05-p2-topic-full-join",
      explanationHeadings: ["10. FULL JOIN: Retaining Unmatched Rows From Both Sides"],
      exampleTitles: ["Example 2: Relational JOIN Simulator (`executeJoin`)"],
      interviewQuestionIds: ["m05-p2-iq-2"],
      exerciseTitles: ["Exercise 1: Cycle-Safe Recursive Hierarchy Traversal (traverseRecursiveHierarchy)"]
    },
    {
      topicTitle: "CROSS JOIN",
      anchorId: "m05-p2-topic-cross-join",
      explanationHeadings: ["11. CROSS JOIN: Cartesian Product & Generating Series/Grids"],
      exampleTitles: ["Example 2: Relational JOIN Simulator (`executeJoin`)"],
      interviewQuestionIds: ["m05-p2-iq-2", "m05-p2-iq-10"],
      exerciseTitles: ["Exercise 1: Cycle-Safe Recursive Hierarchy Traversal (traverseRecursiveHierarchy)"]
    },
    {
      topicTitle: "Self joins",
      anchorId: "m05-p2-topic-self-joins",
      explanationHeadings: ["12. Self Joins: Comparing Rows Within the Same Table"],
      exampleTitles: ["Example 2: Relational JOIN Simulator (`executeJoin`)"],
      interviewQuestionIds: ["m05-p2-iq-9"],
      exerciseTitles: ["Exercise 1: Cycle-Safe Recursive Hierarchy Traversal (traverseRecursiveHierarchy)"]
    },
    {
      topicTitle: "Subqueries",
      anchorId: "m05-p2-topic-subqueries",
      explanationHeadings: ["13. Subqueries: Scalar, IN/EXISTS, Correlated & LATERAL"],
      exampleTitles: ["Example 3: Window Ranking & Running Total Evaluator (`evaluateWindowFunctions`)"],
      interviewQuestionIds: ["m05-p2-iq-5", "m05-p2-iq-7"],
      exerciseTitles: ["Exercise 2: Atomic Upsert Batch Simulator (applyUpsertBatch)"]
    },
    {
      topicTitle: "CTEs",
      anchorId: "m05-p2-topic-ctes",
      explanationHeadings: ["14. CTEs (Common Table Expressions): Readability, Materialization & Writable CTEs"],
      exampleTitles: ["Example 3: Window Ranking & Running Total Evaluator (`evaluateWindowFunctions`)"],
      interviewQuestionIds: ["m05-p2-iq-8"],
      exerciseTitles: ["Exercise 2: Atomic Upsert Batch Simulator (applyUpsertBatch)"]
    },
    {
      topicTitle: "Recursive CTEs",
      anchorId: "m05-p2-topic-recursive-ctes",
      explanationHeadings: ["15. Recursive CTEs: Traversing Trees, Org Charts & Graphs Safely"],
      exampleTitles: ["Example 3: Window Ranking & Running Total Evaluator (`evaluateWindowFunctions`)"],
      interviewQuestionIds: ["m05-p2-iq-9", "m05-p2-iq-10"],
      exerciseTitles: ["Exercise 1: Cycle-Safe Recursive Hierarchy Traversal (traverseRecursiveHierarchy)"]
    },
    {
      topicTitle: "Window functions",
      anchorId: "m05-p2-topic-window-functions",
      explanationHeadings: ["16. Window Functions: OVER (PARTITION BY ... ORDER BY ...) & Frame Clauses"],
      exampleTitles: ["Example 3: Window Ranking & Running Total Evaluator (`evaluateWindowFunctions`)"],
      interviewQuestionIds: ["m05-p2-iq-4", "m05-p2-iq-10"],
      exerciseTitles: ["Exercise 1: Cycle-Safe Recursive Hierarchy Traversal (traverseRecursiveHierarchy)"]
    }
  ],
  codeTests: [
    {
      blockIndex: 1,
      label: "Example 2: executeJoin",
      expectedStdoutIncludes: ["INNER:", "LEFT:", "FULL:"],
      minStdoutLines: 3,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`executeJoin({ leftRows: [], rightRows: [], type: "ANTI" });`), TypeError);
        assert.equal(
          run(`return executeJoin({ leftRows: [{ id: null }], rightRows: [{ id: null }], type: "INNER", leftKey: "id", rightKey: "id" }).length;`),
          0
        );
        assert.equal(
          run(`return executeJoin({ leftRows: [{ a: 1 }, { a: 2 }], rightRows: [{ b: 3 }, { b: 4 }], type: "CROSS" }).length;`),
          4
        );
      },
      safetyMutations: [
        {
          description: "Removing NULL key guard wrongly joins NULL === NULL rows",
          mutateCode: (raw) =>
            raw.replace(
              "if (l[leftKey] !== null && l[leftKey] !== undefined && l[leftKey] === r[rightKey])",
              "if (l[leftKey] === r[rightKey])"
            ),
          verifyProtection: (run) => {
            assert.equal(
              run(`return executeJoin({ leftRows: [{ id: null }], rightRows: [{ id: null }], type: "INNER", leftKey: "id", rightKey: "id" }).length;`),
              0
            );
          }
        }
      ]
    },
    {
      blockIndex: 2,
      label: "Example 3: evaluateWindowFunctions",
      expectedStdoutIncludes: ["Windowed:", '"denseRank":2', '"runningTotal":510'],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`evaluateWindowFunctions("bad");`), TypeError);
        assert.deepEqual(
          run(`return evaluateWindowFunctions([{ name: "A", dept: "x", salary: 10 }, { name: "B", dept: "x", salary: 10 }]).map((r) => [r.rank, r.denseRank]);`),
          [[1, 1], [1, 1]]
        );
      },
      safetyMutations: [
        {
          description: "Incrementing denseRank on ties breaks tie-ranking semantics",
          mutateCode: (raw) => raw.replace("if (idx > 0 && row.salary < group[idx - 1].salary)", "if (idx > 0)"),
          verifyProtection: (run) => {
            assert.equal(
              run(`return evaluateWindowFunctions([{ name: "A", dept: "x", salary: 10 }, { name: "B", dept: "x", salary: 10 }])[1].denseRank;`),
              1
            );
          }
        }
      ]
    },
    {
      blockIndex: 3,
      label: "Exercise 1: traverseRecursiveHierarchy",
      expectedStdoutIncludes: ["Org tree:", '"depth":2'],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`traverseRecursiveHierarchy({ nodes: [], rootId: 1, maxDepth: -1 });`), TypeError);
        assert.equal(
          run(`return traverseRecursiveHierarchy({ nodes: [{ id: 1, parentId: 2, name: "A" }, { id: 2, parentId: 1, name: "B" }], rootId: 1 }).length;`),
          2
        );
      },
      safetyMutations: [
        {
          description: "Removing path cycle guard causes infinite loop / duplicate traversal",
          mutateCode: (raw) => raw.replace("if (path.has(child.id)) continue;", "/* cycle guard removed */"),
          verifyProtection: (run) => {
            assert.equal(
              run(`return traverseRecursiveHierarchy({ nodes: [{ id: 1, parentId: 2, name: "A" }, { id: 2, parentId: 1, name: "B" }], rootId: 1, maxDepth: 4 }).length;`),
              2
            );
          }
        }
      ]
    },
    {
      blockIndex: 4,
      label: "Exercise 2: applyUpsertBatch",
      expectedStdoutIncludes: ["Upsert:", '"action":"UPDATE"', '"action":"INSERT"'],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`applyUpsertBatch({ existingRows: [], incomingRows: [{ id: "x", hits: -1 }] });`), TypeError);
        assert.equal(
          run(`return applyUpsertBatch({ existingRows: [{ id: "k", hits: 3 }], incomingRows: [{ id: "k", hits: 4 }] }).rows[0].hits;`),
          7
        );
      },
      safetyMutations: [
        {
          description: "Overwriting hits instead of adding EXCLUDED.hits loses accumulated count",
          mutateCode: (raw) => raw.replace("hits: prev.hits + inc.hits", "hits: inc.hits"),
          verifyProtection: (run) => {
            assert.equal(
              run(`return applyUpsertBatch({ existingRows: [{ id: "k", hits: 3 }], incomingRows: [{ id: "k", hits: 4 }] }).rows[0].hits;`),
              7
            );
          }
        }
      ]
    }
  ]
};
