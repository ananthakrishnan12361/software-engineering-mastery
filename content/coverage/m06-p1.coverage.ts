import assert from "node:assert/strict";
import type { LessonCoverageSpec } from "./types";

export const m06p1Coverage: LessonCoverageSpec = {
  lessonId: "m06-p1",
  moduleNumber: 6,
  mdxPath: "content/modules/06-mysql/m06-p1.mdx",
  topics: [
    {
      topicTitle: "MySQL architecture",
      anchorId: "m06-p1-topic-mysql-architecture",
      explanationHeadings: ["1. MySQL Architecture: Parser, Optimizer, Storage Engine API"],
      exampleTitles: ["Example 1: MySQL InnoDB Storage Engine Simulator (`createInnodbMvccEngine`)"],
      interviewQuestionIds: ["m06-p1-iq-8", "m06-p1-iq-9"],
      exerciseTitles: ["Exercise 2: MySQL Storage Engine Selector (selectMysqlEngine)"]
    },
    {
      topicTitle: "Storage engines",
      anchorId: "m06-p1-topic-storage-engines",
      explanationHeadings: ["2. Storage Engines: Pluggable Architecture & the handlerton API"],
      exampleTitles: ["Exercise 2: MySQL Storage Engine Selector (selectMysqlEngine)"],
      interviewQuestionIds: ["m06-p1-iq-1"],
      exerciseTitles: ["Exercise 2: MySQL Storage Engine Selector (selectMysqlEngine)"]
    },
    {
      topicTitle: "InnoDB",
      anchorId: "m06-p1-topic-innodb",
      explanationHeadings: ["3. InnoDB: Buffer Pool, Redo Log, Undo Log & Doublewrite Buffer"],
      exampleTitles: ["Example 1: MySQL InnoDB Storage Engine Simulator (`createInnodbMvccEngine`)"],
      interviewQuestionIds: ["m06-p1-iq-3", "m06-p1-iq-6", "m06-p1-iq-8"],
      exerciseTitles: ["Exercise 1: InnoDB Deadlock Detector (detectDeadlock)"]
    },
    {
      topicTitle: "MyISAM overview",
      anchorId: "m06-p1-topic-myisam-overview",
      explanationHeadings: ["4. MyISAM Overview: Table-Level Locking, No Transactions & Full-Text Search"],
      exampleTitles: ["Exercise 2: MySQL Storage Engine Selector (selectMysqlEngine)"],
      interviewQuestionIds: ["m06-p1-iq-1"],
      exerciseTitles: ["Exercise 2: MySQL Storage Engine Selector (selectMysqlEngine)"]
    },
    {
      topicTitle: "SQL",
      anchorId: "m06-p1-topic-sql",
      explanationHeadings: ["5. SQL in MySQL: Dialect Differences, Strict Mode & NO_ENGINE_SUBSTITUTION"],
      exampleTitles: ["Example 2: MySQL Isolation Level Conflict Detector (`evaluateIsolationLevel`)"],
      interviewQuestionIds: ["m06-p1-iq-2"],
      exerciseTitles: ["Exercise 2: MySQL Storage Engine Selector (selectMysqlEngine)"]
    },
    {
      topicTitle: "Transactions",
      anchorId: "m06-p1-topic-transactions",
      explanationHeadings: ["6. Transactions: BEGIN / COMMIT / ROLLBACK & SAVEPOINT"],
      exampleTitles: ["Example 1: MySQL InnoDB Storage Engine Simulator (`createInnodbMvccEngine`)"],
      interviewQuestionIds: ["m06-p1-iq-2", "m06-p1-iq-3"],
      exerciseTitles: ["Exercise 1: InnoDB Deadlock Detector (detectDeadlock)"]
    },
    {
      topicTitle: "ACID",
      anchorId: "m06-p1-topic-acid",
      explanationHeadings: ["7. ACID: Atomicity, Consistency, Isolation & Durability in InnoDB"],
      exampleTitles: ["Example 1: MySQL InnoDB Storage Engine Simulator (`createInnodbMvccEngine`)"],
      interviewQuestionIds: ["m06-p1-iq-3"],
      exerciseTitles: ["Exercise 1: InnoDB Deadlock Detector (detectDeadlock)"]
    },
    {
      topicTitle: "Isolation levels",
      anchorId: "m06-p1-topic-isolation-levels",
      explanationHeadings: ["8. Isolation Levels: READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ & SERIALIZABLE"],
      exampleTitles: ["Example 2: MySQL Isolation Level Conflict Detector (`evaluateIsolationLevel`)"],
      interviewQuestionIds: ["m06-p1-iq-4"],
      exerciseTitles: ["Exercise 1: InnoDB Deadlock Detector (detectDeadlock)"]
    },
    {
      topicTitle: "Locking",
      anchorId: "m06-p1-topic-locking",
      explanationHeadings: ["9. Locking: Row Locks, Gap Locks & Next-Key Locks"],
      exampleTitles: ["Challenge: Transaction-Aware InnoDB Lock Conflict Simulator"],
      interviewQuestionIds: ["m06-p1-iq-5", "m06-p1-iq-7"],
      exerciseTitles: ["Exercise 1: InnoDB Deadlock Detector (detectDeadlock)"]
    },
    {
      topicTitle: "Deadlocks",
      anchorId: "m06-p1-topic-deadlocks",
      explanationHeadings: ["10. Deadlocks: Detection, Automatic Resolution & Prevention"],
      exampleTitles: ["Exercise 1: InnoDB Deadlock Detector (detectDeadlock)"],
      interviewQuestionIds: ["m06-p1-iq-7"],
      exerciseTitles: ["Exercise 1: InnoDB Deadlock Detector (detectDeadlock)"]
    }
  ],
  codeTests: [
    {
      blockIndex: 1,
      label: "Example 1: createInnodbMvccEngine — MVCC read-view isolation",
      expectedStdoutIncludes: ['{"total":100}', '{"total":200}'],
      minStdoutLines: 3,
      testValidAndInvalidInputs: (run) => {
        assert.deepEqual(
          run(`return (() => {
            const eng = createInnodbMvccEngine();
            const a = eng.beginTransaction();
            eng.write(a, "row:1", { v: 100 });
            eng.commit(a);
            const b = eng.beginTransaction();
            eng.write(b, "row:1", { v: 200 });
            const c = eng.beginTransaction();
            const beforeCommit = eng.read("row:1", c.id);
            eng.commit(b);
            const afterCommit = eng.read("row:1", c.id);
            return [beforeCommit, afterCommit];
          })();`),
          [{ v: 100 }, { v: 100 }],
          "T3 snapshot sees T1 version both before and after concurrent T2 commits (Repeatable Read)"
        );

        assert.deepEqual(
          run(`return (() => {
            const eng = createInnodbMvccEngine();
            const a = eng.beginTransaction();
            eng.write(a, "row:A", { v: 42 });
            eng.commit(a);
            const b = eng.beginTransaction();
            eng.write(b, "row:A", { v: 99 });
            eng.commit(b);
            const c = eng.beginTransaction();
            return eng.read("row:A", c.id);
          })();`),
          { v: 99 },
          "New transaction after both commits sees latest version"
        );

        assert.equal(
          run(`return (() => {
            const eng = createInnodbMvccEngine();
            const a = eng.beginTransaction();
            eng.write(a, "row:del", { v: 1 });
            eng.commit(a);
            const b = eng.beginTransaction();
            eng.remove(b, "row:del");
            eng.commit(b);
            const c = eng.beginTransaction();
            return eng.read("row:del", c.id);
          })();`),
          null,
          "Deleted + committed row returns null"
        );

        assert.throws(
          () =>
            run(`(() => {
              const eng = createInnodbMvccEngine();
              const a = eng.beginTransaction();
              eng.write(a, "", { v: 1 });
            })();`),
          /rowId must be non-empty string/
        );

        assert.throws(
          () =>
            run(`(() => {
              const eng = createInnodbMvccEngine();
              eng.read("row:x", NaN);
            })();`),
          /snapshotTrxId must be a positive integer/
        );
      },
      safetyMutations: [
        {
          description: "Remove empty rowId guard in write() — write('') should throw",
          mutateCode: (raw) =>
            raw.replace(
              `if (typeof rowId !== "string" || rowId.length === 0) throw new Error("rowId must be non-empty string");`,
              `// guard removed`
            ),
          verifyProtection: (run) => {
            assert.throws(
              () =>
                run(`(() => {
                  const eng = createInnodbMvccEngine();
                  const a = eng.beginTransaction();
                  eng.write(a, "", { v: 1 });
                })();`),
              /rowId must be non-empty string/
            );
          }
        },
        {
          description: "Remove !Number.isInteger guard on snapshotTrxId — read('row:1', NaN) should throw",
          mutateCode: (raw) =>
            raw.replace(
              `if (!Number.isInteger(snapshotTrxId) || snapshotTrxId < 1 || !snapshots.has(snapshotTrxId)) {`,
              `if (false) {`
            ),
          verifyProtection: (run) => {
            assert.throws(
              () =>
                run(`(() => {
                  const eng = createInnodbMvccEngine();
                  eng.read("row:1", NaN);
                })();`),
              /snapshotTrxId must be a positive integer/
            );
          }
        },
        {
          description: "Bypass Read View activeAtStart check — concurrent commit leaks into existing snapshot",
          mutateCode: (raw) =>
            raw.replace(
              `(committed.has(v.trxId) && v.trxId < snap.maxTrxId && !snap.activeAtStart.has(v.trxId))`,
              `(committed.has(v.trxId) && v.trxId < snap.maxTrxId)`
            ),
          verifyProtection: (run) => {
            assert.deepEqual(
              run(`return (() => {
                const eng = createInnodbMvccEngine();
                const a = eng.beginTransaction();
                eng.write(a, "row:1", { v: 100 });
                eng.commit(a);
                const b = eng.beginTransaction();
                eng.write(b, "row:1", { v: 200 });
                const c = eng.beginTransaction();
                eng.commit(b);
                return eng.read("row:1", c.id);
              })();`),
              { v: 100 }
            );
          }
        }
      ]
    },
    {
      blockIndex: 2,
      label: "Example 2: evaluateIsolationLevel — isolation level anomaly matrix",
      expectedStdoutIncludes: ['"level": "READ_UNCOMMITTED"', '"safe": true', '"level": "READ_COMMITTED"'],
      minStdoutLines: 4,
      testValidAndInvalidInputs: (run) => {
        const ru = run(`return evaluateIsolationLevel("READ UNCOMMITTED");`) as {
          level: string;
          anomalies: string[];
          safe: boolean;
        };
        assert.equal(ru.level, "READ_UNCOMMITTED");
        assert.equal(ru.safe, false);
        assert.ok(ru.anomalies.includes("dirtyRead"), "READ_UNCOMMITTED allows dirty reads");

        const rr = run(`return evaluateIsolationLevel("REPEATABLE_READ");`) as { safe: boolean; anomalies: string[] };
        assert.equal(rr.safe, true, "REPEATABLE_READ is safe");
        assert.equal(rr.anomalies.length, 0);

        const rc = run(`return evaluateIsolationLevel("read-committed");`) as { level: string };
        assert.equal(rc.level, "READ_COMMITTED");

        assert.throws(() => run(`evaluateIsolationLevel("");`), /must be a non-empty string/);
        assert.throws(() => run(`evaluateIsolationLevel("SNAPSHOT");`), /Unknown isolation level/);
      },
      safetyMutations: [
        {
          description: "Remove empty-string guard — empty input should throw 'must be a non-empty string'",
          mutateCode: (raw) =>
            raw.replace(
              `  if (typeof level !== "string" || level.trim().length === 0) {\n    throw new Error("level must be a non-empty string");\n  }`,
              `  // guard removed`
            ),
          verifyProtection: (run) => {
            assert.throws(() => run(`evaluateIsolationLevel("");`), /must be a non-empty string/);
          }
        }
      ]
    },
    {
      blockIndex: 3,
      label: "Exercise 1: detectDeadlock — cycle detection in lock-wait graph",
      expectedStdoutIncludes: ['{"hasDeadlock":false,"cycle":null}', "true"],
      minStdoutLines: 3,
      testValidAndInvalidInputs: (run) => {
        const gChain = run(`return detectDeadlock(new Map([[1, 2], [2, 3]]));`) as {
          hasDeadlock: boolean;
          cycle: null;
        };
        assert.equal(gChain.hasDeadlock, false);
        assert.equal(gChain.cycle, null);

        const gCycle = run(`return detectDeadlock(new Map([[1, 2], [2, 3], [3, 1]]));`) as {
          hasDeadlock: boolean;
          cycle: string[];
        };
        assert.equal(gCycle.hasDeadlock, true);
        assert.ok(Array.isArray(gCycle.cycle) && gCycle.cycle.length >= 3);

        const empty = run(`return detectDeadlock(new Map());`) as { hasDeadlock: boolean };
        assert.equal(empty.hasDeadlock, false);

        assert.throws(() => run(`detectDeadlock({});`), /waitGraph must be a Map/);
      },
      safetyMutations: [
        {
          description: "Remove Map instanceof guard — non-Map input must throw 'waitGraph must be a Map'",
          mutateCode: (raw) =>
            raw.replace(
              `  if (!(waitGraph instanceof Map)) throw new Error("waitGraph must be a Map");`,
              `  // guard removed`
            ),
          verifyProtection: (run) => {
            assert.throws(() => run(`detectDeadlock({});`), /waitGraph must be a Map/);
          }
        }
      ]
    },
    {
      blockIndex: 4,
      label: "Exercise 2: selectMysqlEngine — MySQL storage engine selector",
      expectedStdoutIncludes: ['"engine":"InnoDB"', '"engine":"MEMORY"', '"engine":"MyISAM"'],
      minStdoutLines: 4,
      testValidAndInvalidInputs: (run) => {
        const tx = run(`return selectMysqlEngine({ needsTransactions: true });`) as { engine: string };
        assert.equal(tx.engine, "InnoDB");

        const mem = run(`return selectMysqlEngine({ tempInMemory: true, readOnly: true });`) as { engine: string };
        assert.equal(mem.engine, "MEMORY");

        const myisam = run(`return selectMysqlEngine({ readOnly: true });`) as { engine: string };
        assert.equal(myisam.engine, "MyISAM");

        assert.throws(() => run(`selectMysqlEngine(null);`), /requirements must be a non-null object/);
        assert.throws(() => run(`selectMysqlEngine([]);`), /requirements must be a non-null object/);
      },
      safetyMutations: [
        {
          description: "Remove Array.isArray guard — array input should be rejected",
          mutateCode: (raw) =>
            raw.replace(
              `  if (requirements == null || typeof requirements !== "object" || Array.isArray(requirements)) {`,
              `  if (requirements == null || typeof requirements !== "object") {`
            ),
          verifyProtection: (run) => {
            assert.throws(() => run(`selectMysqlEngine([]);`), /requirements must be a non-null object/);
          }
        }
      ]
    },
    {
      blockIndex: 5,
      label: "Advanced Challenge: createLockManager — InnoDB row-level lock conflict simulation",
      expectedStdoutIncludes: ['"granted":true', '"granted":false', "Unblocked:"],
      minStdoutLines: 4,
      testValidAndInvalidInputs: (run) => {
        const ss = run(`return (() => {
          const mgr = createLockManager();
          const r1 = mgr.acquireLock(1, "row:1", "S");
          const r2 = mgr.acquireLock(2, "row:1", "S");
          return [r1.granted, r2.granted];
        })();`) as [boolean, boolean];
        assert.equal(ss[0], true, "First S lock granted");
        assert.equal(ss[1], true, "S+S compatible");

        const sx = run(`return (() => {
          const mgr = createLockManager();
          mgr.acquireLock(1, "row:1", "S");
          return mgr.acquireLock(2, "row:1", "X");
        })();`) as { granted: boolean; waitingFor: number };
        assert.equal(sx.granted, false, "X conflicts with S");
        assert.equal(sx.waitingFor, 1);

        const freed = run(`return (() => {
          const mgr = createLockManager();
          mgr.acquireLock(1, "row:1", "X");
          mgr.acquireLock(2, "row:1", "X");
          return [...mgr.releaseLocks(1)];
        })();`) as number[];
        assert.ok(freed.includes(2), "T2 unblocked after T1 releases");

        // Waiting S lock cannot jump ahead of queued X waiter, and rolled-back waiter is cleaned from queue
        const fairness = run(`return (() => {
          const mgr = createLockManager();
          mgr.acquireLock(1, "row:9", "S");
          const xWait = mgr.acquireLock(2, "row:9", "X");
          const sWait = mgr.acquireLock(3, "row:9", "S");
          mgr.releaseLocks(2); // T2 rolled back while waiting
          const sAfterVictim = mgr.acquireLock(4, "row:9", "S");
          return [xWait.granted, sWait.granted, sAfterVictim.granted];
        })();`) as [boolean, boolean, boolean];
        assert.deepEqual(fairness, [false, false, false], "S waits behind queued X; victim cleanup keeps S3 in queue");

        assert.throws(
          () => run(`(() => { const mgr = createLockManager(); mgr.acquireLock(NaN, "row:1", "X"); })();`),
          /trxId must be a finite number/
        );
        assert.throws(
          () => run(`(() => { const mgr = createLockManager(); mgr.acquireLock(1, "", "X"); })();`),
          /rowKey must be non-empty string/
        );
        assert.throws(
          () => run(`(() => { const mgr = createLockManager(); mgr.acquireLock(1, "row:1", "INVALID"); })();`),
          /mode must be "S" or "X"/
        );
      },
      safetyMutations: [
        {
          description: "Remove NaN guard on trxId — acquireLock(NaN, ...) should throw",
          mutateCode: (raw) =>
            raw.replace(
              `    if (typeof trxId !== "number" || !Number.isFinite(trxId)) throw new Error("trxId must be a finite number");`,
              `    // guard removed`
            ),
          verifyProtection: (run) => {
            assert.throws(
              () => run(`(() => { const mgr = createLockManager(); mgr.acquireLock(NaN, "row:1", "X"); })();`),
              /trxId must be a finite number/
            );
          }
        }
      ]
    }
  ]
};
