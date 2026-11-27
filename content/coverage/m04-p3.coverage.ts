import assert from "node:assert/strict";
import type { LessonCoverageSpec } from "./types";

export const m04p3Coverage: LessonCoverageSpec = {
  lessonId: "m04-p3",
  moduleNumber: 4,
  mdxPath: "content/modules/04-database-fundamentals/m04-p3.mdx",
  topics: [
    {
      topicTitle: "Transactions",
      anchorId: "m04-p3-topic-transactions",
      explanationHeadings: ["1. Transactions: All-or-Nothing Units of Work"],
      exampleTitles: ["Example 2: MVCC Snapshot Isolation Simulator (`createMvccEngine`)"],
      interviewQuestionIds: ["m04-p3-iq-1", "m04-p3-iq-12"],
      exerciseTitles: ["Exercise 1: Bounded Connection Pool (createBoundedPool)"]
    },
    {
      topicTitle: "ACID",
      anchorId: "m04-p3-topic-acid",
      explanationHeadings: ["2. ACID: Atomicity, Consistency, Isolation, Durability"],
      exampleTitles: ["Example 2: MVCC Snapshot Isolation Simulator (`createMvccEngine`)"],
      interviewQuestionIds: ["m04-p3-iq-1", "m04-p3-iq-12"],
      exerciseTitles: ["Exercise 2: WAL Point-in-Time Recovery Replay (replayWalForPitr)"]
    },
    {
      topicTitle: "Isolation levels",
      anchorId: "m04-p3-topic-isolation-levels",
      explanationHeadings: ["3. Isolation Levels: Trading Concurrency Against Anomalies"],
      exampleTitles: ["Example 2: MVCC Snapshot Isolation Simulator (`createMvccEngine`)"],
      interviewQuestionIds: ["m04-p3-iq-4", "m04-p3-iq-9"],
      exerciseTitles: ["Exercise 1: Bounded Connection Pool (createBoundedPool)"]
    },
    {
      topicTitle: "Dirty reads",
      anchorId: "m04-p3-topic-dirty-reads",
      explanationHeadings: ["4. Dirty Reads: Reading Uncommitted State"],
      exampleTitles: ["Example 2: MVCC Snapshot Isolation Simulator (`createMvccEngine`)"],
      interviewQuestionIds: ["m04-p3-iq-2"],
      exerciseTitles: ["Exercise 2: WAL Point-in-Time Recovery Replay (replayWalForPitr)"]
    },
    {
      topicTitle: "Non-repeatable reads",
      anchorId: "m04-p3-topic-non-repeatable-reads",
      explanationHeadings: ["5. Non-Repeatable Reads: Same Row Changing Mid-Transaction"],
      exampleTitles: ["Example 2: MVCC Snapshot Isolation Simulator (`createMvccEngine`)"],
      interviewQuestionIds: ["m04-p3-iq-2", "m04-p3-iq-4"],
      exerciseTitles: ["Exercise 2: WAL Point-in-Time Recovery Replay (replayWalForPitr)"]
    },
    {
      topicTitle: "Phantom reads",
      anchorId: "m04-p3-topic-phantom-reads",
      explanationHeadings: ["6. Phantom Reads: Range Queries Seeing Newly Committed Rows"],
      exampleTitles: ["Example 2: MVCC Snapshot Isolation Simulator (`createMvccEngine`)"],
      interviewQuestionIds: ["m04-p3-iq-2", "m04-p3-iq-4"],
      exerciseTitles: ["Exercise 1: Bounded Connection Pool (createBoundedPool)"]
    },
    {
      topicTitle: "Locks",
      anchorId: "m04-p3-topic-locks",
      explanationHeadings: ["7. Locks: Shared, Exclusive, Row-Level & Table-Level Coordination"],
      exampleTitles: ["Example 3: Wait-For Deadlock Detector & Victim Abort (`createDeadlockDetector`)"],
      interviewQuestionIds: ["m04-p3-iq-5", "m04-p3-iq-13"],
      exerciseTitles: ["Exercise 1: Bounded Connection Pool (createBoundedPool)"]
    },
    {
      topicTitle: "Deadlocks",
      anchorId: "m04-p3-topic-deadlocks",
      explanationHeadings: ["8. Deadlocks: Circular Wait Cycles & Victim Rollback"],
      exampleTitles: ["Example 3: Wait-For Deadlock Detector & Victim Abort (`createDeadlockDetector`)"],
      interviewQuestionIds: ["m04-p3-iq-6", "m04-p3-iq-12"],
      exerciseTitles: ["Exercise 1: Bounded Connection Pool (createBoundedPool)"]
    },
    {
      topicTitle: "MVCC",
      anchorId: "m04-p3-topic-mvcc",
      explanationHeadings: ["9. MVCC (Multi-Version Concurrency Control): Readers Never Block Writers"],
      exampleTitles: ["Example 2: MVCC Snapshot Isolation Simulator (`createMvccEngine`)"],
      interviewQuestionIds: ["m04-p3-iq-8"],
      exerciseTitles: ["Exercise 2: WAL Point-in-Time Recovery Replay (replayWalForPitr)"]
    },
    {
      topicTitle: "Concurrency",
      anchorId: "m04-p3-topic-concurrency",
      explanationHeadings: ["10. Concurrency: Optimistic vs. Pessimistic Control"],
      exampleTitles: ["Example 3: Wait-For Deadlock Detector & Victim Abort (`createDeadlockDetector`)"],
      interviewQuestionIds: ["m04-p3-iq-9", "m04-p3-iq-13"],
      exerciseTitles: ["Exercise 1: Bounded Connection Pool (createBoundedPool)"]
    },
    {
      topicTitle: "Database consistency",
      anchorId: "m04-p3-topic-database-consistency",
      explanationHeadings: ["11. Database Consistency: Invariants, Constraints & Valid State Transitions"],
      exampleTitles: ["Example 2: MVCC Snapshot Isolation Simulator (`createMvccEngine`)"],
      interviewQuestionIds: ["m04-p3-iq-11", "m04-p3-iq-12"],
      exerciseTitles: ["Exercise 2: WAL Point-in-Time Recovery Replay (replayWalForPitr)"]
    },
    {
      topicTitle: "Data integrity",
      anchorId: "m04-p3-topic-data-integrity",
      explanationHeadings: ["12. Data Integrity: Entity, Referential, Domain & Idempotency Guards"],
      exampleTitles: ["Example 2: MVCC Snapshot Isolation Simulator (`createMvccEngine`)"],
      interviewQuestionIds: ["m04-p3-iq-11", "m04-p3-iq-12"],
      exerciseTitles: ["Exercise 2: WAL Point-in-Time Recovery Replay (replayWalForPitr)"]
    },
    {
      topicTitle: "Schema migrations",
      anchorId: "m04-p3-topic-schema-migrations",
      explanationHeadings: ["13. Schema Migrations: Zero-Downtime Expand-and-Contract"],
      exampleTitles: ["Example 2: MVCC Snapshot Isolation Simulator (`createMvccEngine`)"],
      interviewQuestionIds: ["m04-p3-iq-10", "m04-p3-iq-13"],
      exerciseTitles: ["Exercise 1: Bounded Connection Pool (createBoundedPool)"]
    },
    {
      topicTitle: "Connection pooling",
      anchorId: "m04-p3-topic-connection-pooling",
      explanationHeadings: ["14. Connection Pooling: Bounding Database Processes & Queue Wait"],
      exampleTitles: ["Example 3: Wait-For Deadlock Detector & Victim Abort (`createDeadlockDetector`)"],
      interviewQuestionIds: ["m04-p3-iq-7", "m04-p3-iq-13"],
      exerciseTitles: ["Exercise 1: Bounded Connection Pool (createBoundedPool)"]
    },
    {
      topicTitle: "Database backups",
      anchorId: "m04-p3-topic-database-backups",
      explanationHeadings: ["15. Database Backups: Logical (`pg_dump`) vs. Physical Base Backups"],
      exampleTitles: ["Example 2: MVCC Snapshot Isolation Simulator (`createMvccEngine`)"],
      interviewQuestionIds: ["m04-p3-iq-3", "m04-p3-iq-12"],
      exerciseTitles: ["Exercise 2: WAL Point-in-Time Recovery Replay (replayWalForPitr)"]
    },
    {
      topicTitle: "Recovery",
      anchorId: "m04-p3-topic-recovery",
      explanationHeadings: ["16. Recovery: WAL Replay, Checkpoints & Point-in-Time Recovery (PITR)"],
      exampleTitles: ["Example 2: MVCC Snapshot Isolation Simulator (`createMvccEngine`)"],
      interviewQuestionIds: ["m04-p3-iq-3", "m04-p3-iq-12"],
      exerciseTitles: ["Exercise 2: WAL Point-in-Time Recovery Replay (replayWalForPitr)"]
    }
  ],
  codeTests: [
    {
      blockIndex: 1,
      label: "Example 2: createMvccEngine",
      expectedStdoutIncludes: ["RC non-repeatable: 500 -> 300", "RR snapshot stable: 500 -> 500"],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`createMvccEngine({}).begin("SERIALIZABLE");`), TypeError);
        assert.throws(
          () =>
            run(`
              const testDb = createMvccEngine({ k: 1 });
              const t1 = testDb.begin("REPEATABLE_READ");
              const t2 = testDb.begin("REPEATABLE_READ");
              t1.write("k", 2);
              t2.write("k", 3);
              t1.commit();
              t2.commit();
            `),
          /SerializationFailure/
        );
        assert.equal(
          run(`const testDb = createMvccEngine({ k: 10 }); const t = testDb.begin(); t.write("k", 99); t.rollback(); return testDb.begin().read("k");`),
          10
        );
      },
      safetyMutations: [
        {
          description: "Removing REPEATABLE_READ write-write conflict check causes silent lost updates",
          mutateCode: (raw) =>
            raw.replace(
              /if \(isolation === "REPEATABLE_READ" && latestCommitted && !txSnapshot\.committedAtStart\.has\(latestCommitted\.xmin\)\)\s*\{[^}]*\}/,
              "/* conflict check removed */"
            ),
          verifyProtection: (run) => {
            assert.throws(
              () =>
                run(`
                  const testDb = createMvccEngine({ k: 1 });
                  const t1 = testDb.begin("REPEATABLE_READ");
                  const t2 = testDb.begin("REPEATABLE_READ");
                  t1.write("k", 2);
                  t2.write("k", 3);
                  t1.commit();
                  t2.commit();
                `),
              /SerializationFailure/
            );
          }
        }
      ]
    },
    {
      blockIndex: 2,
      label: "Example 3: createDeadlockDetector",
      expectedStdoutIncludes: ["TxA lock R1:", "TxB lock R2:", "TxA wait R2:", "TxB wait R1:", '"deadlock":true'],
      minStdoutLines: 4,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`createDeadlockDetector().acquire("", "R1");`), TypeError);
        assert.equal(
          run(`const d = createDeadlockDetector(); d.acquire("A", "R1"); d.releaseAll("A"); return d.acquire("B", "R1").granted;`),
          true
        );
      },
      safetyMutations: [
        {
          description: "Removing cycle detection fails to flag circular deadlock waits",
          mutateCode: (raw) => raw.replace("if (findCycleFrom(txId))", "if (false && findCycleFrom(txId))"),
          verifyProtection: (run) => {
            assert.equal(
              run(`const d = createDeadlockDetector(); d.acquire("A", "R1"); d.acquire("B", "R2"); d.acquire("A", "R2"); return d.acquire("B", "R1").deadlock;`),
              true
            );
          }
        }
      ]
    },
    {
      blockIndex: 3,
      label: "Exercise 1: createBoundedPool",
      expectedStdoutIncludes: ["Pool saturated:", "Release c1:"],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`createBoundedPool({ maxConnections: 0 });`), TypeError);
        assert.throws(() => run(`const p = createBoundedPool({ maxConnections: 1, maxQueue: 0 }); p.acquire("a"); p.acquire("b");`), /PoolExhausted/);
        assert.throws(() => run(`createBoundedPool({ maxConnections: 1 }).release("conn-99");`), /Unknown or already-idle/);
      },
      safetyMutations: [
        {
          description: "Removing maxQueue check lets queue grow unbounded",
          mutateCode: (raw) => raw.replace(/if \(queue\.length >= maxQueue\)\s*\{[^}]*\}/, "/* queue bound removed */"),
          verifyProtection: (run) => {
            assert.throws(
              () => run(`const p = createBoundedPool({ maxConnections: 1, maxQueue: 0 }); p.acquire("a"); p.acquire("b");`),
              /PoolExhausted/
            );
          }
        }
      ]
    },
    {
      blockIndex: 4,
      label: "Exercise 2: replayWalForPitr",
      expectedStdoutIncludes: ["PITR state at LSN 13:", '"alice":80', '"bob":120'],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`replayWalForPitr({ baseBackup: null, walRecords: [], targetLsn: 1 });`), TypeError);
        assert.deepEqual(
          run(`return replayWalForPitr({ baseBackup: { a: 1 }, walRecords: [{ lsn: 1, txId: "t1", op: "SET", key: "a", value: 9 }, { lsn: 2, txId: "t1", op: "ROLLBACK" }], targetLsn: 5 });`),
          { a: 1 }
        );
      },
      safetyMutations: [
        {
          description: "Applying uncommitted SET records corrupts PITR state with dirty writes",
          mutateCode: (raw) => raw.replace(/if \(rec\.op === "SET" && committedTxs\.has\(rec\.txId\)\)/, 'if (rec.op === "SET")'),
          verifyProtection: (run) => {
            assert.deepEqual(
              run(`return replayWalForPitr({ baseBackup: { a: 1 }, walRecords: [{ lsn: 1, txId: "t1", op: "SET", key: "a", value: 9 }], targetLsn: 5 });`),
              { a: 1 }
            );
          }
        }
      ]
    }
  ]
};
