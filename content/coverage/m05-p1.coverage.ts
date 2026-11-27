import assert from "node:assert/strict";
import type { LessonCoverageSpec } from "./types";

export const m05p1Coverage: LessonCoverageSpec = {
  lessonId: "m05-p1",
  moduleNumber: 5,
  mdxPath: "content/modules/05-postgresql/m05-p1.mdx",
  topics: [
    {
      topicTitle: "PostgreSQL architecture",
      anchorId: "m05-p1-topic-postgresql-architecture",
      explanationHeadings: ["1. PostgreSQL Architecture: Postmaster, Backends, Shared Buffers & Background Workers"],
      exampleTitles: ["Example 2: 8 KB Slotted Heap Page & HOT Update Simulator (`createSlottedPage`)"],
      interviewQuestionIds: ["m05-p1-iq-1", "m05-p1-iq-8"],
      exerciseTitles: ["Exercise 1: TOAST Storage Decision Classifier (classifyToastStorage)"]
    },
    {
      topicTitle: "PostgreSQL internals",
      anchorId: "m05-p1-topic-postgresql-internals",
      explanationHeadings: ["2. PostgreSQL Internals: Query Pipeline (Parser, Rewriter, Planner, Executor)"],
      exampleTitles: ["Example 2: 8 KB Slotted Heap Page & HOT Update Simulator (`createSlottedPage`)"],
      interviewQuestionIds: ["m05-p1-iq-3"],
      exerciseTitles: ["Exercise 1: TOAST Storage Decision Classifier (classifyToastStorage)"]
    },
    {
      topicTitle: "Database storage",
      anchorId: "m05-p1-topic-database-storage",
      explanationHeadings: ["3. Database Storage: Clusters, Tablespaces, Relations, Forks & 1 GB Segments"],
      exampleTitles: ["Example 2: 8 KB Slotted Heap Page & HOT Update Simulator (`createSlottedPage`)"],
      interviewQuestionIds: ["m05-p1-iq-4"],
      exerciseTitles: ["Exercise 1: TOAST Storage Decision Classifier (classifyToastStorage)"]
    },
    {
      topicTitle: "Pages and tuples",
      anchorId: "m05-p1-topic-pages-and-tuples",
      explanationHeadings: ["4. Pages and Tuples: 8 KB Slotted Pages, Line Pointers, Heap Tuples & TOAST"],
      exampleTitles: ["Example 2: 8 KB Slotted Heap Page & HOT Update Simulator (`createSlottedPage`)"],
      interviewQuestionIds: ["m05-p1-iq-2"],
      exerciseTitles: ["Exercise 1: TOAST Storage Decision Classifier (classifyToastStorage)"]
    },
    {
      topicTitle: "MVCC",
      anchorId: "m05-p1-topic-mvcc",
      explanationHeadings: ["5. MVCC: Tuple Headers (xmin/xmax), HOT Updates & Visibility Maps"],
      exampleTitles: ["Example 2: 8 KB Slotted Heap Page & HOT Update Simulator (`createSlottedPage`)"],
      interviewQuestionIds: ["m05-p1-iq-5", "m05-p1-iq-8"],
      exerciseTitles: ["Exercise 2: XID Wraparound & Freeze Evaluator (evaluateXidFreeze)"]
    },
    {
      topicTitle: "WAL",
      anchorId: "m05-p1-topic-wal",
      explanationHeadings: ["6. WAL (Write-Ahead Logging): 16 MB Segments, Full-Page Writes & Checkpoints"],
      exampleTitles: ["Example 3: WAL Full-Page Writes & Checkpoint Engine (`createWalAndCheckpointEngine`)"],
      interviewQuestionIds: ["m05-p1-iq-6", "m05-p1-iq-8"],
      exerciseTitles: ["Exercise 2: XID Wraparound & Freeze Evaluator (evaluateXidFreeze)"]
    },
    {
      topicTitle: "Transactions",
      anchorId: "m05-p1-topic-transactions",
      explanationHeadings: ["7. Transactions: XIDs, CLOG (`pg_xact`), Wraparound & Freeze"],
      exampleTitles: ["Example 3: WAL Full-Page Writes & Checkpoint Engine (`createWalAndCheckpointEngine`)"],
      interviewQuestionIds: ["m05-p1-iq-7", "m05-p1-iq-8"],
      exerciseTitles: ["Exercise 2: XID Wraparound & Freeze Evaluator (evaluateXidFreeze)"]
    }
  ],
  codeTests: [
    {
      blockIndex: 1,
      label: "Example 2: createSlottedPage",
      expectedStdoutIncludes: ["Insert:", "HOT update (0 index writes):", '"hot":true', '"indexWrites":0', "Indexed update:", '"indexWrites":1'],
      minStdoutLines: 3,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`createSlottedPage({ pageSize: 100 });`), TypeError);
        assert.throws(() => run(`createSlottedPage({ fillfactor: 5 });`), TypeError);
        assert.equal(
          run(`const p = createSlottedPage({ fillfactor: 50 }); p.insert(1, 3000); return p.insert(2, 3000).inserted;`),
          false
        );
      },
      safetyMutations: [
        {
          description: "Removing indexedColumnChanged check wrongly marks indexed updates as HOT",
          mutateCode: (raw) => raw.replace("if (indexedColumnChanged)", "if (false && indexedColumnChanged)"),
          verifyProtection: (run) => {
            assert.equal(
              run(`const p = createSlottedPage(); p.insert(1, 100); return p.update(1, 2, 100, true).hot;`),
              false
            );
          }
        }
      ]
    },
    {
      blockIndex: 2,
      label: "Example 3: createWalAndCheckpointEngine",
      expectedStdoutIncludes: ["1st touch page 7:", '"fpiLogged":true', "2nd touch page 7:", '"fpiLogged":false', "Checkpoint:", "Post-ckpt touch page 7:"],
      minStdoutLines: 4,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`createWalAndCheckpointEngine({ fullPageWrites: "yes" });`), TypeError);
        assert.throws(() => run(`createWalAndCheckpointEngine().modifyPage(-1, 1, "x");`), TypeError);
        assert.equal(
          run(`const w = createWalAndCheckpointEngine(); w.modifyPage(1, 1, "a"); w.checkpoint(); return w.modifyPage(1, 2, "b").fpiLogged;`),
          true
        );
      },
      safetyMutations: [
        {
          description: "Not clearing dirtySinceCheckpoint on checkpoint skips post-checkpoint FPI",
          mutateCode: (raw) => raw.replace("dirtySinceCheckpoint.clear();", "/* clear skipped */"),
          verifyProtection: (run) => {
            assert.equal(
              run(`const w = createWalAndCheckpointEngine(); w.modifyPage(1, 1, "a"); w.checkpoint(); return w.modifyPage(1, 2, "b").fpiLogged;`),
              true
            );
          }
        }
      ]
    },
    {
      blockIndex: 3,
      label: "Exercise 1: classifyToastStorage",
      expectedStdoutIncludes: ["Small row:", '"toasted":false', "Large JSONB:", '"toasted":true', "Blob EXTERNAL:"],
      minStdoutLines: 3,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`classifyToastStorage({ tupleBytes: 0, hasVarlena: true });`), TypeError);
        assert.throws(() => run(`classifyToastStorage({ tupleBytes: 9000, hasVarlena: true, strategy: "PLAIN" });`), /RowTooLargeForPage/);
      },
      safetyMutations: [
        {
          description: "Removing PLAIN overflow guard silently accepts >8 KB inline row",
          mutateCode: (raw) => raw.replace('if (strategy === "PLAIN" && tupleBytes > 8160)', "if (false)"),
          verifyProtection: (run) => {
            assert.throws(
              () => run(`classifyToastStorage({ tupleBytes: 9000, hasVarlena: true, strategy: "PLAIN" });`),
              /RowTooLargeForPage/
            );
          }
        }
      ]
    },
    {
      blockIndex: 4,
      label: "Exercise 2: evaluateXidFreeze",
      expectedStdoutIncludes: ["Freeze report:", '"maxAge":240000000', '"aggressiveAutovacuumRequired":true'],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`evaluateXidFreeze({ currentXid: 1, tuples: [] });`), TypeError);
        assert.equal(
          run(`return evaluateXidFreeze({ currentXid: 1000, tuples: [{ id: 1, xmin: 10, frozen: true }] }).toFreeze.length;`),
          0
        );
      },
      safetyMutations: [
        {
          description: "Removing frozen skip re-freezes already-frozen tuples",
          mutateCode: (raw) => raw.replace("if (t.frozen) continue;", "/* frozen skip removed */"),
          verifyProtection: (run) => {
            assert.equal(
              run(`return evaluateXidFreeze({ currentXid: 250000000, tuples: [{ id: 1, xmin: 10, frozen: true }] }).toFreeze.length;`),
              0
            );
          }
        }
      ]
    }
  ]
};
