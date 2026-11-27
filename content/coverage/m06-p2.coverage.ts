import assert from "node:assert/strict";
import type { LessonCoverageSpec } from "./types";

export const m06p2Coverage: LessonCoverageSpec = {
  lessonId: "m06-p2",
  moduleNumber: 6,
  mdxPath: "content/modules/06-mysql/m06-p2.mdx",
  topics: [
    {
      topicTitle: "Indexes",
      anchorId: "m06-p2-topic-indexes",
      explanationHeadings: ["1. Indexes: B+Tree Structure, Selectivity & Write Amplification"],
      exampleTitles: ["Example 1: InnoDB Clustered & Secondary Index Lookup Simulator (`createInnoDbIndexSimulator`)"],
      interviewQuestionIds: ["m06-p2-iq-1", "m06-p2-iq-20"],
      exerciseTitles: ["Exercise 1: MySQL Composite Index Prefix Matcher (evaluateCompositeIndexUsage)"]
    },
    {
      topicTitle: "Composite indexes",
      anchorId: "m06-p2-topic-composite-indexes",
      explanationHeadings: ["2. Composite Indexes: Leftmost Prefix Rule & Covering Indexes"],
      exampleTitles: ["Exercise 1: MySQL Composite Index Prefix Matcher (evaluateCompositeIndexUsage)"],
      interviewQuestionIds: ["m06-p2-iq-3", "m06-p2-iq-4"],
      exerciseTitles: ["Exercise 1: MySQL Composite Index Prefix Matcher (evaluateCompositeIndexUsage)"]
    },
    {
      topicTitle: "Clustered indexes",
      anchorId: "m06-p2-topic-clustered-indexes",
      explanationHeadings: ["3. Clustered Indexes: InnoDB Primary Key Organization"],
      exampleTitles: ["Example 1: InnoDB Clustered & Secondary Index Lookup Simulator (`createInnoDbIndexSimulator`)"],
      interviewQuestionIds: ["m06-p2-iq-1", "m06-p2-iq-2"],
      exerciseTitles: ["Exercise 1: MySQL Composite Index Prefix Matcher (evaluateCompositeIndexUsage)"]
    },
    {
      topicTitle: "Secondary indexes",
      anchorId: "m06-p2-topic-secondary-indexes",
      explanationHeadings: ["4. Secondary Indexes: PK Pointer & Double Lookup Cost"],
      exampleTitles: ["Example 1: InnoDB Clustered & Secondary Index Lookup Simulator (`createInnoDbIndexSimulator`)"],
      interviewQuestionIds: ["m06-p2-iq-1", "m06-p2-iq-4"],
      exerciseTitles: ["Exercise 1: MySQL Composite Index Prefix Matcher (evaluateCompositeIndexUsage)"]
    },
    {
      topicTitle: "Query optimization",
      anchorId: "m06-p2-topic-query-optimization",
      explanationHeadings: ["5. Query Optimization: SARGable Predicates, Keyset Pagination & Join Order"],
      exampleTitles: ["Example 2: MySQL `EXPLAIN` & Composite Index Access Analyzer (`analyzeMysqlExplain`)"],
      interviewQuestionIds: ["m06-p2-iq-9", "m06-p2-iq-10", "m06-p2-iq-15"],
      exerciseTitles: ["Exercise 1: MySQL Composite Index Prefix Matcher (evaluateCompositeIndexUsage)"]
    },
    {
      topicTitle: "EXPLAIN",
      anchorId: "m06-p2-topic-explain",
      explanationHeadings: ["6. EXPLAIN: Reading Access Types, Key Selection & Extra Flags"],
      exampleTitles: ["Example 2: MySQL `EXPLAIN` & Composite Index Access Analyzer (`analyzeMysqlExplain`)"],
      interviewQuestionIds: ["m06-p2-iq-4", "m06-p2-iq-5", "m06-p2-iq-15"],
      exerciseTitles: ["Exercise 1: MySQL Composite Index Prefix Matcher (evaluateCompositeIndexUsage)"]
    },
    {
      topicTitle: "Query execution",
      anchorId: "m06-p2-topic-query-execution",
      explanationHeadings: ["7. Query Execution: Parser, Optimizer, Volcano Iterators & Joins"],
      exampleTitles: ["Example 2: MySQL `EXPLAIN` & Composite Index Access Analyzer (`analyzeMysqlExplain`)"],
      interviewQuestionIds: ["m06-p2-iq-8", "m06-p2-iq-17"],
      exerciseTitles: ["Exercise 2: MySQL Connection Pool & Memory Budget Calculator (planMysqlConnections)"]
    },
    {
      topicTitle: "Stored procedures",
      anchorId: "m06-p2-topic-stored-procedures",
      explanationHeadings: ["8. Stored Procedures: Routines, IN/OUT Parameters & Trade-Offs"],
      exampleTitles: ["Example 2: MySQL `EXPLAIN` & Composite Index Access Analyzer (`analyzeMysqlExplain`)"],
      interviewQuestionIds: ["m06-p2-iq-11", "m06-p2-iq-18"],
      exerciseTitles: ["Exercise 2: MySQL Connection Pool & Memory Budget Calculator (planMysqlConnections)"]
    },
    {
      topicTitle: "Triggers",
      anchorId: "m06-p2-topic-triggers",
      explanationHeadings: ["9. Triggers: BEFORE/AFTER Row Hooks & Replication Caveats"],
      exampleTitles: ["Example 2: MySQL `EXPLAIN` & Composite Index Access Analyzer (`analyzeMysqlExplain`)"],
      interviewQuestionIds: ["m06-p2-iq-11"],
      exerciseTitles: ["Exercise 2: MySQL Connection Pool & Memory Budget Calculator (planMysqlConnections)"]
    },
    {
      topicTitle: "Views",
      anchorId: "m06-p2-topic-views",
      explanationHeadings: ["10. Views: Virtual Tables, MERGE vs. TEMPTABLE & Security"],
      exampleTitles: ["Example 2: MySQL `EXPLAIN` & Composite Index Access Analyzer (`analyzeMysqlExplain`)"],
      interviewQuestionIds: ["m06-p2-iq-6", "m06-p2-iq-18"],
      exerciseTitles: ["Exercise 1: MySQL Composite Index Prefix Matcher (evaluateCompositeIndexUsage)"]
    },
    {
      topicTitle: "Replication",
      anchorId: "m06-p2-topic-replication",
      explanationHeadings: ["11. Replication: Binary Logs, GTIDs, Async vs. Semi-Sync & Group Replication"],
      exampleTitles: ["Challenge: MySQL Partition Pruning & Replica Lag Router (routeReplicaAndPartition)"],
      interviewQuestionIds: ["m06-p2-iq-12", "m06-p2-iq-16", "m06-p2-iq-23"],
      exerciseTitles: ["Exercise 2: MySQL Connection Pool & Memory Budget Calculator (planMysqlConnections)"]
    },
    {
      topicTitle: "Partitioning",
      anchorId: "m06-p2-topic-partitioning",
      explanationHeadings: ["12. Partitioning: RANGE, LIST, HASH & Pruning Mechanics"],
      exampleTitles: ["Challenge: MySQL Partition Pruning & Replica Lag Router (routeReplicaAndPartition)"],
      interviewQuestionIds: ["m06-p2-iq-13", "m06-p2-iq-22"],
      exerciseTitles: ["Exercise 1: MySQL Composite Index Prefix Matcher (evaluateCompositeIndexUsage)"]
    },
    {
      topicTitle: "Performance tuning",
      anchorId: "m06-p2-topic-performance-tuning",
      explanationHeadings: ["13. Performance Tuning: Slow Query Log, Performance Schema & Memory Buffers"],
      exampleTitles: ["Exercise 2: MySQL Connection Pool & Memory Budget Calculator (planMysqlConnections)"],
      interviewQuestionIds: ["m06-p2-iq-21", "m06-p2-iq-25"],
      exerciseTitles: ["Exercise 2: MySQL Connection Pool & Memory Budget Calculator (planMysqlConnections)"]
    },
    {
      topicTitle: "Connection management",
      anchorId: "m06-p2-topic-connection-management",
      explanationHeadings: ["14. Connection Management: Thread-per-Connection, Thread Cache & ProxySQL"],
      exampleTitles: ["Exercise 2: MySQL Connection Pool & Memory Budget Calculator (planMysqlConnections)"],
      interviewQuestionIds: ["m06-p2-iq-14", "m06-p2-iq-23"],
      exerciseTitles: ["Exercise 2: MySQL Connection Pool & Memory Budget Calculator (planMysqlConnections)"]
    },
    {
      topicTitle: "Backup and recovery",
      anchorId: "m06-p2-topic-backup-and-recovery",
      explanationHeadings: ["15. Backup and Recovery: mysqldump, MySQL Shell Dump, XtraBackup & PITR"],
      exampleTitles: ["Challenge: MySQL Partition Pruning & Replica Lag Router (routeReplicaAndPartition)"],
      interviewQuestionIds: ["m06-p2-iq-7", "m06-p2-iq-19", "m06-p2-iq-24"],
      exerciseTitles: ["Exercise 2: MySQL Connection Pool & Memory Budget Calculator (planMysqlConnections)"]
    }
  ],
  codeTests: [
    {
      blockIndex: 1,
      label: "Example 1: createInnoDbIndexSimulator — clustered vs secondary lookup",
      expectedStdoutIncludes: ["Covering lookup:", '"clusteredReads":0', "Double lookup:", '"clusteredReads":1', '"accessType":"ALL"'],
      minStdoutLines: 3,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`(() => { const sim = createInnoDbIndexSimulator(); sim.insertRow(0, { a: 1 }); })();`), TypeError);
        assert.throws(() => run(`(() => { const sim = createInnoDbIndexSimulator(); sim.insertRow(1, []); })();`), TypeError);
        const res = run(`return (() => {
          const sim = createInnoDbIndexSimulator();
          sim.insertRow(1, { email: "x@y.com", total: 10, note: "hi" });
          sim.createSecondaryIndex("idx_e_t", ["email", "total"]);
          return [
            sim.queryBySecondary("idx_e_t", "email", "x@y.com", ["id", "total"]).clusteredReads,
            sim.queryBySecondary("idx_e_t", "email", "x@y.com", ["id", "note"]).clusteredReads
          ];
        })();`) as [number, number];
        assert.deepEqual(res, [0, 1]);
      },
      safetyMutations: [
        {
          description: "Removing leftmost prefix check wrongly reports ref instead of ALL",
          mutateCode: (raw) => raw.replace("if (idx.cols[0] !== filterCol)", "if (false)"),
          verifyProtection: (run) => {
            assert.equal(
              run(`return (() => {
                const sim = createInnoDbIndexSimulator();
                sim.insertRow(1, { email: "x@y.com", total: 10 });
                sim.createSecondaryIndex("idx_e_t", ["email", "total"]);
                return sim.queryBySecondary("idx_e_t", "total", 10, ["id"]).accessType;
              })();`),
              "ALL"
            );
          }
        }
      ]
    },
    {
      blockIndex: 2,
      label: "Example 2: analyzeMysqlExplain — EXPLAIN plan analyzer",
      expectedStdoutIncludes: ["Slow plan:", "FULL_TABLE_SCAN:", "FILESORT:", "Optimal plan:", '"healthy":true'],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`analyzeMysqlExplain({ type: "BAD", rows: 10 });`), TypeError);
        assert.throws(() => run(`analyzeMysqlExplain({ type: "ALL", rows: -1 });`), TypeError);
        const r = run(`return analyzeMysqlExplain({ type: "ref", rows: 10, filtered: 100, extra: "Using index" });`) as {
          covering: boolean;
          healthy: boolean;
        };
        assert.equal(r.covering, true);
        assert.equal(r.healthy, true);
      },
      safetyMutations: [
        {
          description: "Removing Using filesort check misses FILESORT warning",
          mutateCode: (raw) => raw.replace('if (extra.includes("Using filesort"))', "if (false)"),
          verifyProtection: (run) => {
            assert.ok(
              (run(`return analyzeMysqlExplain({ type: "ref", rows: 100, filtered: 100, extra: "Using filesort" }).findings;`) as string[]).some(
                (f) => f.startsWith("FILESORT:")
              )
            );
          }
        }
      ]
    },
    {
      blockIndex: 3,
      label: "Exercise 1: evaluateCompositeIndexUsage — leftmost prefix & covering",
      expectedStdoutIncludes: ["Optimal:", '"covering":true', '"filesortAvoided":true', "Broken prefix:", '"usedIndex":false'],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`evaluateCompositeIndexUsage({ indexCols: [] });`), TypeError);
        const res = run(`return evaluateCompositeIndexUsage({
          indexCols: ["a", "b", "c"],
          eqCols: ["a"],
          rangeCol: "b",
          selectCols: ["a", "b"],
          orderByCols: ["b"]
        });`) as { matchedPrefix: string[]; covering: boolean; filesortAvoided: boolean };
        assert.deepEqual(res.matchedPrefix, ["a", "b"]);
        assert.equal(res.covering, true);
        assert.equal(res.filesortAvoided, true);
      },
      safetyMutations: [
        {
          description: "Allowing range column to continue equality matching wrongly includes trailing columns",
          mutateCode: (raw) => raw.replace("if (eqSet.has(col) && !hitRange)", "if (eqSet.has(col))"),
          verifyProtection: (run) => {
            assert.deepEqual(
              run(`return evaluateCompositeIndexUsage({
                indexCols: ["a", "b", "c"],
                eqCols: ["a", "c"],
                rangeCol: "b"
              }).matchedPrefix;`),
              ["a", "b"]
            );
          }
        }
      ]
    },
    {
      blockIndex: 4,
      label: "Exercise 2: planMysqlConnections — memory & ProxySQL budget",
      expectedStdoutIncludes: ["High conn risk:", '"needsProxySql":true', "Pooled:", '"needsProxySql":false'],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`planMysqlConnections({ hostRamGb: 0, cpuCores: 4, maxConnections: 100 });`), TypeError);
        assert.throws(() => run(`planMysqlConnections({ hostRamGb: 16, cpuCores: 0, maxConnections: 100 });`), TypeError);
        const p = run(`return planMysqlConnections({ hostRamGb: 32, cpuCores: 8, maxConnections: 32, perThreadMb: 8 });`) as {
          bufferPoolGb: number;
          recommendedPoolSize: number;
          needsProxySql: boolean;
        };
        assert.equal(p.bufferPoolGb, 24);
        assert.equal(p.recommendedPoolSize, 16);
        assert.equal(p.needsProxySql, false);
      },
      safetyMutations: [
        {
          description: "Removing maxConnections <= 0 check allows negative connections",
          mutateCode: (raw) =>
            raw.replace(
              `if (!Number.isInteger(maxConnections) || maxConnections < 1) throw new TypeError("maxConnections must be >= 1");`,
              `// guard removed`
            ),
          verifyProtection: (run) => {
            assert.throws(
              () => run(`planMysqlConnections({ hostRamGb: 16, cpuCores: 4, maxConnections: 0 });`),
              /maxConnections must be >= 1/
            );
          }
        }
      ]
    },
    {
      blockIndex: 5,
      label: "Challenge: routeReplicaAndPartition — partition pruning & lag routing",
      expectedStdoutIncludes: ["Replica route:", '"targetNode":"replica-2"', "Fallback primary:", '"targetNode":"primary"'],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`routeReplicaAndPartition({ partitions: [], queryDay: 1, replicas: [] });`), TypeError);
        const r = run(`return routeReplicaAndPartition({
          partitions: [{ name: "p1", minDay: 1, maxDay: 10 }, { name: "p2", minDay: 10, maxDay: 20 }],
          queryDay: 10,
          replicas: [{ id: "r1", lagMs: 100 }],
          readYourWrites: true
        });`) as { targetNode: string; scannedPartitions: string[] };
        assert.equal(r.targetNode, "primary");
        assert.deepEqual(r.scannedPartitions, ["p2"]);
      },
      safetyMutations: [
        {
          description: "Ignoring readYourWrites routes stale replica reads instead of primary",
          mutateCode: (raw) => raw.replace("if (!readYourWrites) {", "if (true) {"),
          verifyProtection: (run) => {
            assert.equal(
              run(`return routeReplicaAndPartition({
                partitions: [{ name: "p1", minDay: 1, maxDay: 10 }],
                queryDay: 5,
                replicas: [{ id: "r1", lagMs: 10 }],
                readYourWrites: true
              }).targetNode;`),
              "primary"
            );
          }
        }
      ]
    }
  ]
};
