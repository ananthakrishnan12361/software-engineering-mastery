import assert from "node:assert/strict";
import type { LessonCoverageSpec } from "./types";

export const m07p2Coverage: LessonCoverageSpec = {
  lessonId: "m07-p2",
  moduleNumber: 7,
  mdxPath: "content/modules/07-mssql/m07-p2.mdx",
  topics: [
    {
      topicTitle: "Transactions",
      anchorId: "m07-p2-topic-transactions",
      explanationHeadings: ["1. Transactions: `BEGIN TRAN`, `XACT_ABORT ON`, `XACT_STATE()` & ADR"],
      exampleTitles: ["Exercise 1: SQL Server Deadlock Victim & Retry Planner (resolveMssqlDeadlock)"],
      interviewQuestionIds: ["m07-p2-iq-1", "m07-p2-iq-8"],
      exerciseTitles: ["Exercise 1: SQL Server Deadlock Victim & Retry Planner (resolveMssqlDeadlock)"]
    },
    {
      topicTitle: "Locking",
      anchorId: "m07-p2-topic-locking",
      explanationHeadings: ["2. Locking: Granularity, Modes (`S`, `U`, `X`, `IS`, `IX`, `Sch-M`) & Escalation"],
      exampleTitles: ["Example 1: SQL Server Lock Compatibility & Escalation Simulator (`createMssqlLockManager`)"],
      interviewQuestionIds: ["m07-p2-iq-2", "m07-p2-iq-5", "m07-p2-iq-7"],
      exerciseTitles: ["Exercise 2: SQL Server Isolation & Concurrency Advisor (selectMssqlIsolation)"]
    },
    {
      topicTitle: "Isolation levels",
      anchorId: "m07-p2-topic-isolation-levels",
      explanationHeadings: ["3. Isolation Levels: Pessimistic (`S` Locks) vs. Row Versioning (`RCSI` & `SNAPSHOT`)"],
      exampleTitles: ["Example 2: SQL Server Isolation Level & RCSI Evaluator (`evaluateMssqlIsolation`)"],
      interviewQuestionIds: ["m07-p2-iq-3", "m07-p2-iq-4", "m07-p2-iq-8"],
      exerciseTitles: ["Exercise 2: SQL Server Isolation & Concurrency Advisor (selectMssqlIsolation)"]
    },
    {
      topicTitle: "Deadlocks",
      anchorId: "m07-p2-topic-deadlocks",
      explanationHeadings: ["4. Deadlocks: Error `1205`, Conversion Deadlocks, `DEADLOCK_PRIORITY` & Prevention"],
      exampleTitles: ["Exercise 1: SQL Server Deadlock Victim & Retry Planner (resolveMssqlDeadlock)"],
      interviewQuestionIds: ["m07-p2-iq-5", "m07-p2-iq-6"],
      exerciseTitles: ["Exercise 1: SQL Server Deadlock Victim & Retry Planner (resolveMssqlDeadlock)"]
    }
  ],
  codeTests: [
    {
      blockIndex: 1,
      label: "Example 1: createMssqlLockManager — lock matrix & escalation",
      expectedStdoutIncludes: ["S1 reads:", "S2 UPDLOCK:", '"blockedBySpid":52', '"escalated":true'],
      minStdoutLines: 4,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`(() => { const mgr = createMssqlLockManager(); mgr.acquire(0, "r", "S"); })();`), TypeError);
        assert.throws(() => run(`(() => { const mgr = createMssqlLockManager(); mgr.acquire(1, "r", "BAD"); })();`), TypeError);
        const res = run(`return (() => {
          const mgr = createMssqlLockManager();
          const a = mgr.acquire(1, "k1", "S");
          const b = mgr.acquire(2, "k1", "U");
          const c = mgr.acquire(3, "k1", "U");
          return [a.granted, b.granted, c.granted];
        })();`) as [boolean, boolean, boolean];
        assert.deepEqual(res, [true, true, false]);
      },
      safetyMutations: [
        {
          description: "Making U compatible with U breaks UPDLOCK serialization",
          mutateCode: (raw) => raw.replace("U:  { IS: true, IX: false, S: true, U: false, X: false }", "U:  { IS: true, IX: false, S: true, U: true, X: false }"),
          verifyProtection: (run) => {
            assert.equal(
              run(`return (() => {
                const mgr = createMssqlLockManager();
                mgr.acquire(1, "k1", "U");
                return mgr.acquire(2, "k1", "U").granted;
              })();`),
              false
            );
          }
        }
      ]
    },
    {
      blockIndex: 2,
      label: "Example 2: evaluateMssqlIsolation — RCSI & SNAPSHOT evaluator",
      expectedStdoutIncludes: ["Default RC:", '"readersBlockWriters":true', "RCSI RC:", '"usesRowVersioning":true', '"error3960Possible":true'],
      minStdoutLines: 3,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`evaluateMssqlIsolation({ level: "INVALID" });`), TypeError);
        assert.throws(() => run(`evaluateMssqlIsolation({ level: "SNAPSHOT", rcsiEnabled: "yes" });`), TypeError);
        const rc = run(`return evaluateMssqlIsolation({ level: "READ COMMITTED", rcsiEnabled: true });`) as {
          usesRowVersioning: boolean;
          readersBlockWriters: boolean;
        };
        assert.equal(rc.usesRowVersioning, true);
        assert.equal(rc.readersBlockWriters, false);
      },
      safetyMutations: [
        {
          description: "Ignoring rcsiEnabled wrongly reports readersBlockWriters=true under RCSI",
          mutateCode: (raw) => raw.replace('if (norm === "READ_COMMITTED" && rcsiEnabled)', "if (false)"),
          verifyProtection: (run) => {
            assert.equal(
              run(`return evaluateMssqlIsolation({ level: "READ COMMITTED", rcsiEnabled: true }).readersBlockWriters;`),
              false
            );
          }
        }
      ]
    },
    {
      blockIndex: 3,
      label: "Exercise 1: resolveMssqlDeadlock — victim selection & Error 1205",
      expectedStdoutIncludes: ['"victimSpid":52', '"victimSpid":60', '"errorNumber":1205'],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`resolveMssqlDeadlock({ spid: 1, priority: 0, logBytesWritten: 10 }, { spid: 1, priority: 0, logBytesWritten: 10 });`), TypeError);
        assert.throws(() => run(`resolveMssqlDeadlock({ spid: 1, priority: 99, logBytesWritten: 10 }, { spid: 2, priority: 0, logBytesWritten: 10 });`), TypeError);
        const res = run(`return resolveMssqlDeadlock({ spid: 10, priority: -5, logBytesWritten: 9999 }, { spid: 11, priority: 0, logBytesWritten: 100 });`) as {
          victimSpid: number;
          errorNumber: number;
        };
        assert.equal(res.victimSpid, 10);
        assert.equal(res.errorNumber, 1205);
      },
      safetyMutations: [
        {
          description: "Using > instead of < on priority picks the higher-priority transaction as victim",
          mutateCode: (raw) => raw.replace("if (txB.priority < txA.priority)", "if (txB.priority > txA.priority)"),
          verifyProtection: (run) => {
            assert.equal(
              run(`return resolveMssqlDeadlock({ spid: 10, priority: 5, logBytesWritten: 100 }, { spid: 11, priority: -5, logBytesWritten: 9999 }).victimSpid;`),
              11
            );
          }
        }
      ]
    },
    {
      blockIndex: 4,
      label: "Exercise 2: selectMssqlIsolation — concurrency strategy advisor",
      expectedStdoutIncludes: ['"strategy":"READ_COMMITTED_SNAPSHOT (RCSI)"', '"strategy":"READ_COMMITTED + UPDLOCK"', '"strategy":"SNAPSHOT"'],
      minStdoutLines: 3,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`selectMssqlIsolation({ nonBlockingReads: "yes" });`), TypeError);
        assert.equal(
          run(`return selectMssqlIsolation({ readModifyWrite: true }).strategy;`),
          "READ_COMMITTED + UPDLOCK"
        );
      },
      safetyMutations: [
        {
          description: "Removing readModifyWrite check misses UPDLOCK advice",
          mutateCode: (raw) => raw.replace("if (readModifyWrite)", "if (false)"),
          verifyProtection: (run) => {
            assert.equal(
              run(`return selectMssqlIsolation({ readModifyWrite: true }).strategy;`),
              "READ_COMMITTED + UPDLOCK"
            );
          }
        }
      ]
    },
    {
      blockIndex: 5,
      label: "Challenge: simulateUpdateLockFlow — conversion deadlock vs UPDLOCK",
      expectedStdoutIncludes: ['"deadlock1205":true', '"deadlock1205":false'],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`simulateUpdateLockFlow({ useUpdlock: "no" });`), TypeError);
        assert.equal(run(`return simulateUpdateLockFlow({ useUpdlock: false }).deadlock1205;`), true);
        assert.equal(run(`return simulateUpdateLockFlow({ useUpdlock: true }).deadlock1205;`), false);
      },
      safetyMutations: [
        {
          description: "Negating !useUpdlock inverts deadlock behavior",
          mutateCode: (raw) => raw.replace("if (!useUpdlock)", "if (useUpdlock)"),
          verifyProtection: (run) => {
            assert.equal(run(`return simulateUpdateLockFlow({ useUpdlock: true }).deadlock1205;`), false);
          }
        }
      ]
    }
  ]
};
