import assert from "node:assert/strict";
import type { LessonCoverageSpec } from "./types";

export const m05p3Coverage: LessonCoverageSpec = {
  lessonId: "m05-p3",
  moduleNumber: 5,
  mdxPath: "content/modules/05-postgresql/m05-p3.mdx",
  topics: [
    {
      topicTitle: "Views",
      anchorId: "m05-p3-topic-views",
      explanationHeadings: ["1. Views: Virtual Query Abstractions, Updatable Views & Security Invoker"],
      exampleTitles: ["Example 2: View vs. Materialized View Concurrent Refresh Simulator (`createMaterializedViewEngine`)"],
      interviewQuestionIds: ["m05-p3-iq-1", "m05-p3-iq-7"],
      exerciseTitles: ["Exercise 1: Exclusion Constraint Overlap Checker (createExclusionConstraintTable)"]
    },
    {
      topicTitle: "Materialized views",
      anchorId: "m05-p3-topic-materialized-views",
      explanationHeadings: ["2. Materialized Views: Persisted Query Snapshots & REFRESH CONCURRENTLY"],
      exampleTitles: ["Example 2: View vs. Materialized View Concurrent Refresh Simulator (`createMaterializedViewEngine`)"],
      interviewQuestionIds: ["m05-p3-iq-1", "m05-p3-iq-8"],
      exerciseTitles: ["Exercise 1: Exclusion Constraint Overlap Checker (createExclusionConstraintTable)"]
    },
    {
      topicTitle: "Functions",
      anchorId: "m05-p3-topic-functions",
      explanationHeadings: ["3. Functions: PL/pgSQL & SQL Functions, Volatility & Transaction Rules"],
      exampleTitles: ["Example 2: View vs. Materialized View Concurrent Refresh Simulator (`createMaterializedViewEngine`)"],
      interviewQuestionIds: ["m05-p3-iq-3", "m05-p3-iq-7"],
      exerciseTitles: ["Exercise 2: BEFORE/AFTER Trigger & Constraint Pipeline (runTriggerPipeline)"]
    },
    {
      topicTitle: "Stored procedures",
      anchorId: "m05-p3-topic-stored-procedures",
      explanationHeadings: ["4. Stored Procedures: CALL, Explicit COMMIT/ROLLBACK & Batch Loops"],
      exampleTitles: ["Example 2: View vs. Materialized View Concurrent Refresh Simulator (`createMaterializedViewEngine`)"],
      interviewQuestionIds: ["m05-p3-iq-3", "m05-p3-iq-8"],
      exerciseTitles: ["Exercise 2: BEFORE/AFTER Trigger & Constraint Pipeline (runTriggerPipeline)"]
    },
    {
      topicTitle: "Triggers",
      anchorId: "m05-p3-topic-triggers",
      explanationHeadings: ["5. Triggers: BEFORE/AFTER, ROW vs. STATEMENT & Audit/Sync Patterns"],
      exampleTitles: ["Example 2: View vs. Materialized View Concurrent Refresh Simulator (`createMaterializedViewEngine`)"],
      interviewQuestionIds: ["m05-p3-iq-4"],
      exerciseTitles: ["Exercise 2: BEFORE/AFTER Trigger & Constraint Pipeline (runTriggerPipeline)"]
    },
    {
      topicTitle: "Constraints",
      anchorId: "m05-p3-topic-constraints",
      explanationHeadings: ["6. Constraints: CHECK, UNIQUE, Exclusion (EXCLUDE USING), Deferrable & NOT VALID"],
      exampleTitles: ["Example 2: View vs. Materialized View Concurrent Refresh Simulator (`createMaterializedViewEngine`)"],
      interviewQuestionIds: ["m05-p3-iq-5", "m05-p3-iq-8"],
      exerciseTitles: ["Exercise 1: Exclusion Constraint Overlap Checker (createExclusionConstraintTable)"]
    },
    {
      topicTitle: "JSON",
      anchorId: "m05-p3-topic-json",
      explanationHeadings: ["7. JSON: Text-Preserving Storage, Key Order & Serialization Semantics"],
      exampleTitles: ["Example 3: JSON vs. JSONB Storage & GIN Containment Index (`createJsonbGinStore`)"],
      interviewQuestionIds: ["m05-p3-iq-2"],
      exerciseTitles: ["Exercise 2: BEFORE/AFTER Trigger & Constraint Pipeline (runTriggerPipeline)"]
    },
    {
      topicTitle: "JSONB",
      anchorId: "m05-p3-topic-jsonb",
      explanationHeadings: ["8. JSONB: Binary Decomposed Storage, GIN Indexes & Containment (@>)"],
      exampleTitles: ["Example 3: JSON vs. JSONB Storage & GIN Containment Index (`createJsonbGinStore`)"],
      interviewQuestionIds: ["m05-p3-iq-2", "m05-p3-iq-6", "m05-p3-iq-8"],
      exerciseTitles: ["Exercise 2: BEFORE/AFTER Trigger & Constraint Pipeline (runTriggerPipeline)"]
    }
  ],
  codeTests: [
    {
      blockIndex: 1,
      label: "Example 2: createMaterializedViewEngine",
      expectedStdoutIncludes: ["Stale MatView:", "Fresh Live View:", "Concurrent Refresh:", "Updated MatView:"],
      minStdoutLines: 4,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`createMaterializedViewEngine({ baseRows: "bad" });`), TypeError);
        assert.throws(
          () => run(`createMaterializedViewEngine({ baseRows: [{ id: 1 }] }).refresh({ concurrently: true });`),
          /UniqueIndexRequired/
        );
        assert.throws(
          () =>
            run(
              `createMaterializedViewEngine({ baseRows: [{ id: 1 }, { id: 1 }], uniqueKey: "id" }).refresh({ concurrently: true });`
            ),
          /UniqueViolation/
        );
      },
      safetyMutations: [
        {
          description: "Removing uniqueKey check lets CONCURRENTLY run without a UNIQUE index",
          mutateCode: (raw) => raw.replace("if (concurrently && !uniqueKey)", "if (false && concurrently && !uniqueKey)"),
          verifyProtection: (run) => {
            assert.throws(
              () => run(`createMaterializedViewEngine({ baseRows: [{ id: 1 }] }).refresh({ concurrently: true });`),
              /UniqueIndexRequired/
            );
          }
        }
      ]
    },
    {
      blockIndex: 2,
      label: "Example 3: createJsonbGinStore",
      expectedStdoutIncludes: ["JSONB @> pro:", '"tier":"pro"'],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`createJsonbGinStore().insert(123);`), TypeError);
        assert.throws(() => run(`createJsonbGinStore().insert("[1,2]");`), TypeError);
        assert.equal(
          run(`const s = createJsonbGinStore(); s.insert('{"a":1,"b":2}'); return s.queryContainment({ a: 1, b: 9 }).length;`),
          0
        );
      },
      safetyMutations: [
        {
          description: "Removing non-object JSON guard allows arrays into JSONB object store",
          mutateCode: (raw) =>
            raw.replace(
              'if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))',
              "if (false)"
            ),
          verifyProtection: (run) => {
            assert.throws(() => run(`createJsonbGinStore().insert("[1,2]");`), TypeError);
          }
        }
      ]
    },
    {
      blockIndex: 3,
      label: "Exercise 1: createExclusionConstraintTable",
      expectedStdoutIncludes: ["Book 1:", "Back-to-back OK:"],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`createExclusionConstraintTable().insert({ roomId: 1, startMs: 20, endMs: 10 });`), TypeError);
        assert.throws(
          () =>
            run(`const t = createExclusionConstraintTable(); t.insert({ roomId: 1, startMs: 10, endMs: 20 }); t.insert({ roomId: 1, startMs: 15, endMs: 25 });`),
          /ExclusionViolation/
        );
      },
      safetyMutations: [
        {
          description: "Removing overlap check permits double-booked room intervals",
          mutateCode: (raw) => raw.replace("if (conflict)", "if (false && conflict)"),
          verifyProtection: (run) => {
            assert.throws(
              () =>
                run(`const t = createExclusionConstraintTable(); t.insert({ roomId: 1, startMs: 10, endMs: 20 }); t.insert({ roomId: 1, startMs: 15, endMs: 25 });`),
              /ExclusionViolation/
            );
          }
        }
      ]
    },
    {
      blockIndex: 4,
      label: "Exercise 2: runTriggerPipeline",
      expectedStdoutIncludes: ["Pipeline:", '"action":"AUDIT_INSERT"', '"email":"ada@example.com"'],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`runTriggerPipeline({ row: null, validateConstraints: () => {} });`), TypeError);
        assert.equal(
          run(`return runTriggerPipeline({ row: { x: 1 }, beforeTrigger: () => null, validateConstraints: () => {} }).committed;`),
          false
        );
      },
      safetyMutations: [
        {
          description: "Running afterTrigger before validateConstraints logs invalid rejected rows",
          mutateCode: (raw) =>
            raw.replace(
              "validateConstraints(nextRow);\n\n  const auditEvents = [];\n  if (typeof afterTrigger === \"function\") {\n    auditEvents.push(afterTrigger({ ...nextRow }));\n  }",
              "const auditEvents = [];\n  if (typeof afterTrigger === \"function\") {\n    auditEvents.push(afterTrigger({ ...nextRow }));\n  }\n  validateConstraints(nextRow);"
            ),
          verifyProtection: (run) => {
            assert.equal(
              run(`let logged = false; try { runTriggerPipeline({ row: { bal: -1 }, validateConstraints: (r) => { if (r.bal < 0) throw new Error("fail"); }, afterTrigger: () => { logged = true; } }); } catch {} return logged;`),
              false
            );
          }
        }
      ]
    }
  ]
};
