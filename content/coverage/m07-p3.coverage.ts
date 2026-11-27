import assert from "node:assert/strict";
import type { LessonCoverageSpec } from "./types";

export const m07p3Coverage: LessonCoverageSpec = {
  lessonId: "m07-p3",
  moduleNumber: 7,
  mdxPath: "content/modules/07-mssql/m07-p3.mdx",
  topics: [
    {
      topicTitle: "Query execution plans",
      anchorId: "m07-p3-topic-query-execution-plans",
      explanationHeadings: ["1. Query Execution Plans: Estimated vs. Actual Plans & Query Store"],
      exampleTitles: ["Example 1: SQL Server Execution Plan & Parameter Sniffing Analyzer (`analyzeMssqlPlan`)"],
      interviewQuestionIds: ["m07-p3-iq-1", "m07-p3-iq-7"],
      exerciseTitles: ["Exercise 1: SQL Server RANGE RIGHT Partition Router (routeMssqlPartition)"]
    },
    {
      topicTitle: "Query optimization",
      anchorId: "m07-p3-topic-query-optimization",
      explanationHeadings: ["2. Query Optimization: SARGability, Implicit Conversions & Join Choices"],
      exampleTitles: ["Example 1: SQL Server Execution Plan & Parameter Sniffing Analyzer (`analyzeMssqlPlan`)"],
      interviewQuestionIds: ["m07-p3-iq-5", "m07-p3-iq-12"],
      exerciseTitles: ["Exercise 1: SQL Server RANGE RIGHT Partition Router (routeMssqlPartition)"]
    },
    {
      topicTitle: "Statistics",
      anchorId: "m07-p3-topic-statistics",
      explanationHeadings: ["3. Statistics: Histograms, Density Vector & Cardinality Estimation"],
      exampleTitles: ["Example 1: SQL Server Execution Plan & Parameter Sniffing Analyzer (`analyzeMssqlPlan`)"],
      interviewQuestionIds: ["m07-p3-iq-4", "m07-p3-iq-8"],
      exerciseTitles: ["Exercise 1: SQL Server RANGE RIGHT Partition Router (routeMssqlPartition)"]
    },
    {
      topicTitle: "Execution plan analysis",
      anchorId: "m07-p3-topic-execution-plan-analysis",
      explanationHeadings: ["4. Execution Plan Analysis: Warnings, Memory Grants & Operator Costs"],
      exampleTitles: ["Example 1: SQL Server Execution Plan & Parameter Sniffing Analyzer (`analyzeMssqlPlan`)"],
      interviewQuestionIds: ["m07-p3-iq-1", "m07-p3-iq-8"],
      exerciseTitles: ["Exercise 1: SQL Server RANGE RIGHT Partition Router (routeMssqlPartition)"]
    },
    {
      topicTitle: "Index maintenance",
      anchorId: "m07-p3-topic-index-maintenance",
      explanationHeadings: ["5. Index Maintenance: `REORGANIZE` vs. `REBUILD` & Statistics Side Effects"],
      exampleTitles: ["Example 2: SQL Server Index Maintenance & Fragmentation Planner (`planIndexMaintenance`)"],
      interviewQuestionIds: ["m07-p3-iq-2", "m07-p3-iq-12"],
      exerciseTitles: ["Exercise 2: SQL Server Backup Chain & PITR Restore Planner (planMssqlRestoreChain)"]
    },
    {
      topicTitle: "Fragmentation",
      anchorId: "m07-p3-topic-fragmentation",
      explanationHeadings: ["6. Fragmentation: Internal vs. External Page Fragmentation & Thresholds"],
      exampleTitles: ["Example 2: SQL Server Index Maintenance & Fragmentation Planner (`planIndexMaintenance`)"],
      interviewQuestionIds: ["m07-p3-iq-2"],
      exerciseTitles: ["Exercise 2: SQL Server Backup Chain & PITR Restore Planner (planMssqlRestoreChain)"]
    },
    {
      topicTitle: "Parameter sniffing",
      anchorId: "m07-p3-topic-parameter-sniffing",
      explanationHeadings: ["7. Parameter Sniffing: Plan Caching, Skew & Mitigation Options"],
      exampleTitles: ["Challenge: Parameter Sniffing Mitigation Selector (selectSniffingFix)"],
      interviewQuestionIds: ["m07-p3-iq-4", "m07-p3-iq-11"],
      exerciseTitles: ["Exercise 1: SQL Server RANGE RIGHT Partition Router (routeMssqlPartition)"]
    },
    {
      topicTitle: "Query tuning",
      anchorId: "m07-p3-topic-query-tuning",
      explanationHeadings: ["8. Query Tuning: Iterative Measurement, `STATISTICS IO` & Batching"],
      exampleTitles: ["Example 1: SQL Server Execution Plan & Parameter Sniffing Analyzer (`analyzeMssqlPlan`)"],
      interviewQuestionIds: ["m07-p3-iq-5", "m07-p3-iq-12"],
      exerciseTitles: ["Exercise 1: SQL Server RANGE RIGHT Partition Router (routeMssqlPartition)"]
    },
    {
      topicTitle: "Partitioning",
      anchorId: "m07-p3-topic-partitioning",
      explanationHeadings: ["9. Partitioning: Partition Functions, Schemes & `SWITCH` Sliding Windows"],
      exampleTitles: ["Exercise 1: SQL Server `RANGE RIGHT` Partition Router (`routeMssqlPartition`)"],
      interviewQuestionIds: ["m07-p3-iq-6", "m07-p3-iq-12"],
      exerciseTitles: ["Exercise 1: SQL Server RANGE RIGHT Partition Router (routeMssqlPartition)"]
    },
    {
      topicTitle: "SQL Server Agent",
      anchorId: "m07-p3-topic-sql-server-agent",
      explanationHeadings: ["10. SQL Server Agent: Jobs, Schedules, Alerts & Maintenance Automation"],
      exampleTitles: ["Example 2: SQL Server Index Maintenance & Fragmentation Planner (`planIndexMaintenance`)"],
      interviewQuestionIds: ["m07-p3-iq-12", "m07-p3-iq-13"],
      exerciseTitles: ["Exercise 2: SQL Server Backup Chain & PITR Restore Planner (planMssqlRestoreChain)"]
    },
    {
      topicTitle: "Backup and recovery",
      anchorId: "m07-p3-topic-backup-and-recovery",
      explanationHeadings: ["11. Backup and Recovery: Full, Differential, Log (`.trn`) & PITR"],
      exampleTitles: ["Exercise 2: SQL Server Backup Chain & PITR Restore Planner (`planMssqlRestoreChain`)"],
      interviewQuestionIds: ["m07-p3-iq-3", "m07-p3-iq-9", "m07-p3-iq-13"],
      exerciseTitles: ["Exercise 2: SQL Server Backup Chain & PITR Restore Planner (planMssqlRestoreChain)"]
    },
    {
      topicTitle: "Performance monitoring",
      anchorId: "m07-p3-topic-performance-monitoring",
      explanationHeadings: ["12. Performance Monitoring: Wait Stats, DMVs, Query Store & Extended Events"],
      exampleTitles: ["Example 1: SQL Server Execution Plan & Parameter Sniffing Analyzer (`analyzeMssqlPlan`)"],
      interviewQuestionIds: ["m07-p3-iq-7", "m07-p3-iq-10"],
      exerciseTitles: ["Exercise 2: SQL Server Backup Chain & PITR Restore Planner (planMssqlRestoreChain)"]
    }
  ],
  codeTests: [
    {
      blockIndex: 1,
      label: "Example 1: analyzeMssqlPlan — plan & parameter sniffing analyzer",
      expectedStdoutIncludes: ["Sniffed bad plan:", "CARDINALITY_SKEW:", "TEMPDB_SPILL:", "Healthy plan:", '"healthy":true'],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`analyzeMssqlPlan({ estRows: -1, actualRows: 10 });`), TypeError);
        assert.throws(() => run(`analyzeMssqlPlan({ estRows: 10, actualRows: 10, hasImplicitConvert: "yes" });`), TypeError);
        const r = run(`return analyzeMssqlPlan({ estRows: 10, actualRows: 10, hasImplicitConvert: true });`) as {
          healthy: boolean;
          findings: string[];
        };
        assert.equal(r.healthy, false);
        assert.ok(r.findings.some((f) => f.startsWith("CONVERT_IMPLICIT:")));
      },
      safetyMutations: [
        {
          description: "Removing hasImplicitConvert check misses CONVERT_IMPLICIT warning",
          mutateCode: (raw) => raw.replace("if (hasImplicitConvert)", "if (false)"),
          verifyProtection: (run) => {
            assert.equal(
              run(`return analyzeMssqlPlan({ estRows: 10, actualRows: 10, hasImplicitConvert: true }).healthy;`),
              false
            );
          }
        }
      ]
    },
    {
      blockIndex: 2,
      label: "Example 2: planIndexMaintenance — 5/30 fragmentation planner",
      expectedStdoutIncludes: ["Small table:", '"action":"NONE"', "Moderate frag:", '"action":"REORGANIZE"', "Heavy frag:", '"action":"REBUILD"'],
      minStdoutLines: 3,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`planIndexMaintenance({ pageCount: -1, avgFragmentationPct: 10 });`), TypeError);
        assert.throws(() => run(`planIndexMaintenance({ pageCount: 2000, avgFragmentationPct: 150 });`), TypeError);
        const r = run(`return planIndexMaintenance({ pageCount: 5000, avgFragmentationPct: 25 });`) as {
          action: string;
          updatesStats: boolean;
        };
        assert.equal(r.action, "REORGANIZE");
        assert.equal(r.updatesStats, false);
      },
      safetyMutations: [
        {
          description: "Removing pageCount < 1000 guard wrongly rebuilds tiny indexes",
          mutateCode: (raw) => raw.replace("if (pageCount < 1000 || avgFragmentationPct < 5)", "if (avgFragmentationPct < 5)"),
          verifyProtection: (run) => {
            assert.equal(
              run(`return planIndexMaintenance({ pageCount: 200, avgFragmentationPct: 60 }).action;`),
              "NONE"
            );
          }
        }
      ]
    },
    {
      blockIndex: 3,
      label: "Exercise 1: routeMssqlPartition — RANGE RIGHT partition router",
      expectedStdoutIncludes: ['"partitionNumber":1', '"partitionNumber":3', '"partitionNumber":4'],
      minStdoutLines: 3,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`routeMssqlPartition([], 10);`), TypeError);
        assert.throws(() => run(`routeMssqlPartition([20, 10], 15);`), TypeError);
        assert.equal(run(`return routeMssqlPartition([100, 200], 100).partitionNumber;`), 2);
      },
      safetyMutations: [
        {
          description: "Using > instead of >= breaks RANGE RIGHT boundary semantics",
          mutateCode: (raw) => raw.replace("if (value >= b)", "if (value > b)"),
          verifyProtection: (run) => {
            assert.equal(run(`return routeMssqlPartition([100, 200], 100).partitionNumber;`), 2);
          }
        }
      ]
    },
    {
      blockIndex: 4,
      label: "Exercise 2: planMssqlRestoreChain — Full/Diff/Log PITR chain",
      expectedStdoutIncludes: ['"mode":"NORECOVERY"', '"mode":"RECOVERY"', '"stopAt":"2026-11-27T14:22:00"'],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`planMssqlRestoreChain({ fullBackup: "" });`), TypeError);
        assert.throws(() => run(`planMssqlRestoreChain({ fullBackup: "a.bak", stopAt: "2026-01-01" });`), TypeError);
        const steps = run(`return planMssqlRestoreChain({ fullBackup: "f.bak", logBackups: ["l1.trn"] });`) as Array<{
          mode: string;
        }>;
        assert.equal(steps[0].mode, "NORECOVERY");
        assert.equal(steps[1].mode, "RECOVERY");
      },
      safetyMutations: [
        {
          description: "Using RECOVERY on all steps breaks multi-file restore chain",
          mutateCode: (raw) => raw.replace('mode: isLast ? "RECOVERY" : "NORECOVERY"', 'mode: "RECOVERY"'),
          verifyProtection: (run) => {
            const steps = run(`return planMssqlRestoreChain({ fullBackup: "f.bak", logBackups: ["l1.trn"] });`) as Array<{
              mode: string;
            }>;
            assert.equal(steps[0].mode, "NORECOVERY");
          }
        }
      ]
    },
    {
      blockIndex: 5,
      label: "Challenge: selectSniffingFix — parameter sniffing mitigation selector",
      expectedStdoutIncludes: ['"fix":"FIX_IMPLICIT_CONVERT"', '"fix":"PSP_2022"', '"fix":"OPTIMIZE_FOR_UNKNOWN"'],
      minStdoutLines: 3,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`selectSniffingFix({ callsPerSec: -1 });`), TypeError);
        assert.equal(
          run(`return selectSniffingFix({ callsPerSec: 10, severeDataSkew: true }).fix;`),
          "OPTION_RECOMPILE"
        );
      },
      safetyMutations: [
        {
          description: "Ignoring hasImplicitConvert misses structural CONVERT_IMPLICIT fix",
          mutateCode: (raw) => raw.replace("if (hasImplicitConvert)", "if (false)"),
          verifyProtection: (run) => {
            assert.equal(
              run(`return selectSniffingFix({ callsPerSec: 4000, hasImplicitConvert: true }).fix;`),
              "FIX_IMPLICIT_CONVERT"
            );
          }
        }
      ]
    }
  ]
};
