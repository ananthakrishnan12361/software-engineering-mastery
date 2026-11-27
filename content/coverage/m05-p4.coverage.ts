import assert from "node:assert/strict";
import type { LessonCoverageSpec } from "./types";

export const m05p4Coverage: LessonCoverageSpec = {
  lessonId: "m05-p4",
  moduleNumber: 5,
  mdxPath: "content/modules/05-postgresql/m05-p4.mdx",
  topics: [
    {
      topicTitle: "Locking",
      anchorId: "m05-p4-topic-locking",
      explanationHeadings: ["1. Locking: PostgreSQL Table Locks, Row Locks & Lock Queues"],
      exampleTitles: ["Example 2: Declarative Range Partition Pruning Simulator (`routeAndPrunePartitions`)"],
      interviewQuestionIds: ["m05-p4-iq-5", "m05-p4-iq-8"],
      exerciseTitles: ["Exercise 1: Autovacuum Trigger Evaluator (shouldTriggerAutovacuum)"]
    },
    {
      topicTitle: "Isolation levels",
      anchorId: "m05-p4-topic-isolation-levels",
      explanationHeadings: ["2. Isolation Levels: READ COMMITTED, REPEATABLE READ & SERIALIZABLE (SSI)"],
      exampleTitles: ["Example 2: Declarative Range Partition Pruning Simulator (`routeAndPrunePartitions`)"],
      interviewQuestionIds: ["m05-p4-iq-5"],
      exerciseTitles: ["Exercise 1: Autovacuum Trigger Evaluator (shouldTriggerAutovacuum)"]
    },
    {
      topicTitle: "Partitioning",
      anchorId: "m05-p4-topic-partitioning",
      explanationHeadings: ["3. Partitioning: Declarative Range, List & Hash Partition Pruning"],
      exampleTitles: ["Example 2: Declarative Range Partition Pruning Simulator (`routeAndPrunePartitions`)"],
      interviewQuestionIds: ["m05-p4-iq-7", "m05-p4-iq-8"],
      exerciseTitles: ["Exercise 2: PostgreSQL Index Type Selector (selectPostgresIndexType)"]
    },
    {
      topicTitle: "Replication",
      anchorId: "m05-p4-topic-replication",
      explanationHeadings: ["4. Replication: Physical Streaming, Sync vs. Async & Logical Replication"],
      exampleTitles: ["Example 2: Declarative Range Partition Pruning Simulator (`routeAndPrunePartitions`)"],
      interviewQuestionIds: ["m05-p4-iq-6", "m05-p4-iq-9"],
      exerciseTitles: ["Exercise 1: Autovacuum Trigger Evaluator (shouldTriggerAutovacuum)"]
    },
    {
      topicTitle: "Connection pooling",
      anchorId: "m05-p4-topic-connection-pooling",
      explanationHeadings: ["5. Connection Pooling: PgBouncer Transaction Mode & Prepared Statements"],
      exampleTitles: ["Example 2: Declarative Range Partition Pruning Simulator (`routeAndPrunePartitions`)"],
      interviewQuestionIds: ["m05-p4-iq-8", "m05-p4-iq-9"],
      exerciseTitles: ["Exercise 1: Autovacuum Trigger Evaluator (shouldTriggerAutovacuum)"]
    },
    {
      topicTitle: "EXPLAIN",
      anchorId: "m05-p4-topic-explain",
      explanationHeadings: ["6. EXPLAIN: Reading Cost Units, Plan Nodes & Row Estimates"],
      exampleTitles: ["Example 3: `EXPLAIN (ANALYZE, BUFFERS)` Diagnostic Analyzer (`analyzeExplainNode`)"],
      interviewQuestionIds: ["m05-p4-iq-1"],
      exerciseTitles: ["Exercise 2: PostgreSQL Index Type Selector (selectPostgresIndexType)"]
    },
    {
      topicTitle: "EXPLAIN ANALYZE",
      anchorId: "m05-p4-topic-explain-analyze",
      explanationHeadings: ["7. EXPLAIN ANALYZE: Actual Timing, Loops, Buffers & Disk Spills"],
      exampleTitles: ["Example 3: `EXPLAIN (ANALYZE, BUFFERS)` Diagnostic Analyzer (`analyzeExplainNode`)"],
      interviewQuestionIds: ["m05-p4-iq-1", "m05-p4-iq-8"],
      exerciseTitles: ["Exercise 2: PostgreSQL Index Type Selector (selectPostgresIndexType)"]
    },
    {
      topicTitle: "Query planner",
      anchorId: "m05-p4-topic-query-planner",
      explanationHeadings: ["8. Query Planner: Statistics (pg_statistic), Selectivity & Cost Constants"],
      exampleTitles: ["Example 3: `EXPLAIN (ANALYZE, BUFFERS)` Diagnostic Analyzer (`analyzeExplainNode`)"],
      interviewQuestionIds: ["m05-p4-iq-8"],
      exerciseTitles: ["Exercise 2: PostgreSQL Index Type Selector (selectPostgresIndexType)"]
    },
    {
      topicTitle: "Query optimization",
      anchorId: "m05-p4-topic-query-optimization",
      explanationHeadings: ["9. Query Optimization: SARGable Predicates, Join Order & Eliminating Spills"],
      exampleTitles: ["Example 3: `EXPLAIN (ANALYZE, BUFFERS)` Diagnostic Analyzer (`analyzeExplainNode`)"],
      interviewQuestionIds: ["m05-p4-iq-8"],
      exerciseTitles: ["Exercise 2: PostgreSQL Index Type Selector (selectPostgresIndexType)"]
    },
    {
      topicTitle: "Indexing",
      anchorId: "m05-p4-topic-indexing",
      explanationHeadings: ["10. Indexing: B-Tree, GIN, GiST, BRIN, Partial & Covering (INCLUDE)"],
      exampleTitles: ["Example 3: `EXPLAIN (ANALYZE, BUFFERS)` Diagnostic Analyzer (`analyzeExplainNode`)"],
      interviewQuestionIds: ["m05-p4-iq-3", "m05-p4-iq-7"],
      exerciseTitles: ["Exercise 2: PostgreSQL Index Type Selector (selectPostgresIndexType)"]
    },
    {
      topicTitle: "Performance tuning",
      anchorId: "m05-p4-topic-performance-tuning",
      explanationHeadings: ["11. Performance Tuning: pg_stat_statements, Cache Hit Ratio & I/O"],
      exampleTitles: ["Example 3: `EXPLAIN (ANALYZE, BUFFERS)` Diagnostic Analyzer (`analyzeExplainNode`)"],
      interviewQuestionIds: ["m05-p4-iq-8"],
      exerciseTitles: ["Exercise 1: Autovacuum Trigger Evaluator (shouldTriggerAutovacuum)"]
    },
    {
      topicTitle: "Vacuum",
      anchorId: "m05-p4-topic-vacuum",
      explanationHeadings: ["12. Vacuum: Reclaiming Dead Tuples, Updating FSM/VM & Freezing XIDs"],
      exampleTitles: ["Example 2: Declarative Range Partition Pruning Simulator (`routeAndPrunePartitions`)"],
      interviewQuestionIds: ["m05-p4-iq-2"],
      exerciseTitles: ["Exercise 1: Autovacuum Trigger Evaluator (shouldTriggerAutovacuum)"]
    },
    {
      topicTitle: "Autovacuum",
      anchorId: "m05-p4-topic-autovacuum",
      explanationHeadings: ["13. Autovacuum: Threshold Formulas, Scale Factors & Per-Table Tuning"],
      exampleTitles: ["Example 2: Declarative Range Partition Pruning Simulator (`routeAndPrunePartitions`)"],
      interviewQuestionIds: ["m05-p4-iq-4", "m05-p4-iq-8"],
      exerciseTitles: ["Exercise 1: Autovacuum Trigger Evaluator (shouldTriggerAutovacuum)"]
    },
    {
      topicTitle: "Database maintenance",
      anchorId: "m05-p4-topic-database-maintenance",
      explanationHeadings: ["14. Database Maintenance: ANALYZE, REINDEX CONCURRENTLY & pg_repack"],
      exampleTitles: ["Example 3: `EXPLAIN (ANALYZE, BUFFERS)` Diagnostic Analyzer (`analyzeExplainNode`)"],
      interviewQuestionIds: ["m05-p4-iq-2", "m05-p4-iq-8"],
      exerciseTitles: ["Exercise 1: Autovacuum Trigger Evaluator (shouldTriggerAutovacuum)"]
    },
    {
      topicTitle: "Backup and recovery",
      anchorId: "m05-p4-topic-backup-and-recovery",
      explanationHeadings: ["15. Backup and Recovery: pg_dump, pg_basebackup, WAL Archiving & PITR"],
      exampleTitles: ["Example 2: Declarative Range Partition Pruning Simulator (`routeAndPrunePartitions`)"],
      interviewQuestionIds: ["m05-p4-iq-9"],
      exerciseTitles: ["Exercise 1: Autovacuum Trigger Evaluator (shouldTriggerAutovacuum)"]
    }
  ],
  codeTests: [
    {
      blockIndex: 1,
      label: "Example 2: routeAndPrunePartitions",
      expectedStdoutIncludes: ["Nov query:", '"prunedCount":2'],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`routeAndPrunePartitions({ partitions: [], queryStart: 10, queryEnd: 5 });`), TypeError);
        assert.throws(() => run(`routeAndPrunePartitions({ partitions: [], queryStart: NaN, queryEnd: 5 });`), TypeError);
        assert.deepEqual(
          run(`return routeAndPrunePartitions({ partitions: [{ name: "p1", from: 1, to: 10 }, { name: "p2", from: 10, to: 20 }], queryStart: 10, queryEnd: 15 }).scanned;`),
          ["p2"]
        );
      },
      safetyMutations: [
        {
          description: "Using <= instead of < for upper bound scans adjacent boundary partition unnecessarily",
          mutateCode: (raw) => raw.replace("queryStart < p.to", "queryStart <= p.to"),
          verifyProtection: (run) => {
            assert.deepEqual(
              run(`return routeAndPrunePartitions({ partitions: [{ name: "p1", from: 1, to: 10 }, { name: "p2", from: 10, to: 20 }], queryStart: 10, queryEnd: 15 }).scanned;`),
              ["p2"]
            );
          }
        }
      ]
    },
    {
      blockIndex: 2,
      label: "Example 3: analyzeExplainNode",
      expectedStdoutIncludes: ["Bad plan:", "STALE_STATS:", "WORK_MEM_SPILL:", "Healthy plan:"],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`analyzeExplainNode({ estRows: -1, actualRows: 10, sharedHit: 1, sharedRead: 0 });`), TypeError);
        assert.equal(
          run(`return analyzeExplainNode({ estRows: 50000, actualRows: 10, sharedHit: 100, sharedRead: 0 }).findings.length;`),
          1
        );
      },
      safetyMutations: [
        {
          description: "Removing tempWrittenBlocks > 0 check misses work_mem disk spills",
          mutateCode: (raw) => raw.replace("if (tempWrittenBlocks > 0)", "if (false)"),
          verifyProtection: (run) => {
            assert.equal(
              run(`return analyzeExplainNode({ estRows: 10, actualRows: 10, sharedHit: 100, sharedRead: 0, tempWrittenBlocks: 50 }).findings.length;`),
              1
            );
          }
        }
      ]
    },
    {
      blockIndex: 3,
      label: "Exercise 1: shouldTriggerAutovacuum",
      expectedStdoutIncludes: ["Default 0.20 on 100M rows:", '"triggered":false', "Tuned 0.01 on 100M rows:", '"triggered":true'],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`shouldTriggerAutovacuum({ liveTuples: -1, deadTuples: 0 });`), TypeError);
        assert.throws(() => run(`shouldTriggerAutovacuum({ liveTuples: 100, deadTuples: 0, baseThreshold: -1 });`), TypeError);
        assert.equal(
          run(`return shouldTriggerAutovacuum({ liveTuples: 1000, deadTuples: 250, baseThreshold: 50, scaleFactor: 0.2 }).triggered;`),
          false
        );
      },
      safetyMutations: [
        {
          description: "Using >= instead of > triggers autovacuum at exact boundary",
          mutateCode: (raw) => raw.replace("deadTuples > triggerAt", "deadTuples >= triggerAt"),
          verifyProtection: (run) => {
            assert.equal(
              run(`return shouldTriggerAutovacuum({ liveTuples: 1000, deadTuples: 250, baseThreshold: 50, scaleFactor: 0.2 }).triggered;`),
              false
            );
          }
        }
      ]
    },
    {
      blockIndex: 4,
      label: "Exercise 2: selectPostgresIndexType",
      expectedStdoutIncludes: ["JSONB:", '"indexType":"GIN"', "Logs:", '"indexType":"BRIN"', "Hot queue:", '"indexType":"PARTIAL_BTREE"'],
      minStdoutLines: 3,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`selectPostgresIndexType({ queryPattern: "unknown" });`), TypeError);
        assert.equal(
          run(`return selectPostgresIndexType({ queryPattern: "range_overlap" }).indexType;`),
          "GiST"
        );
      },
      safetyMutations: [
        {
          description: "Removing sortedAppendOnly check wrongly picks BRIN for unsorted tables",
          mutateCode: (raw) => raw.replace('if (queryPattern === "timestamp_scan" && sortedAppendOnly)', 'if (queryPattern === "timestamp_scan")'),
          verifyProtection: (run) => {
            assert.equal(
              run(`return selectPostgresIndexType({ queryPattern: "timestamp_scan", sortedAppendOnly: false }).indexType;`),
              "BTREE"
            );
          }
        }
      ]
    }
  ]
};
