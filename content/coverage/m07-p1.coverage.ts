import assert from "node:assert/strict";
import type { LessonCoverageSpec } from "./types";

export const m07p1Coverage: LessonCoverageSpec = {
  lessonId: "m07-p1",
  moduleNumber: 7,
  mdxPath: "content/modules/07-mssql/m07-p1.mdx",
  topics: [
    {
      topicTitle: "SQL Server architecture",
      anchorId: "m07-p1-topic-sql-server-architecture",
      explanationHeadings: ["1. SQL Server Architecture: SNI, Relational Engine, Storage Engine & SQLOS"],
      exampleTitles: ["Example 1: SQL Server 8 KB Page & 64 KB Extent Allocator (`allocateMssqlExtent`)"],
      interviewQuestionIds: ["m07-p1-iq-9", "m07-p1-iq-13"],
      exerciseTitles: ["Exercise 2: T-SQL Function & View Object Advisor (selectMssqlObjectType)"]
    },
    {
      topicTitle: "SQL Server engine",
      anchorId: "m07-p1-topic-sql-server-engine",
      explanationHeadings: ["2. SQL Server Engine: Query Compilation, Plan Cache & Execution"],
      exampleTitles: ["Example 2: Clustered vs. Non-Clustered (`INCLUDE`) vs. Heap Lookup Simulator (`simulateMssqlLookup`)"],
      interviewQuestionIds: ["m07-p1-iq-9", "m07-p1-iq-14"],
      exerciseTitles: ["Exercise 1: SQL Server Temp Table vs. Table Variable Selector (selectMssqlTempContainer)"]
    },
    {
      topicTitle: "Storage",
      anchorId: "m07-p1-topic-storage",
      explanationHeadings: ["3. Storage: MDF, NDF, LDF Files, Filegroups & Buffer Pool"],
      exampleTitles: ["Example 1: SQL Server 8 KB Page & 64 KB Extent Allocator (`allocateMssqlExtent`)"],
      interviewQuestionIds: ["m07-p1-iq-1", "m07-p1-iq-9"],
      exerciseTitles: ["Exercise 1: SQL Server Temp Table vs. Table Variable Selector (selectMssqlTempContainer)"]
    },
    {
      topicTitle: "Pages",
      anchorId: "m07-p1-topic-pages",
      explanationHeadings: ["4. Pages: 8 KB Structure, 96-Byte Header, Slot Array & Row-Overflow"],
      exampleTitles: ["Example 1: SQL Server 8 KB Page & 64 KB Extent Allocator (`allocateMssqlExtent`)"],
      interviewQuestionIds: ["m07-p1-iq-1", "m07-p1-iq-12"],
      exerciseTitles: ["Exercise 1: SQL Server Temp Table vs. Table Variable Selector (selectMssqlTempContainer)"]
    },
    {
      topicTitle: "Extents",
      anchorId: "m07-p1-topic-extents",
      explanationHeadings: ["5. Extents: 64 KB Groups, Uniform vs. Mixed & Allocation Bitmaps"],
      exampleTitles: ["Example 1: SQL Server 8 KB Page & 64 KB Extent Allocator (`allocateMssqlExtent`)"],
      interviewQuestionIds: ["m07-p1-iq-1"],
      exerciseTitles: ["Exercise 1: SQL Server Temp Table vs. Table Variable Selector (selectMssqlTempContainer)"]
    },
    {
      topicTitle: "Tables",
      anchorId: "m07-p1-topic-tables",
      explanationHeadings: ["6. Tables: Relational Schemas, Constraints & Physical Organization"],
      exampleTitles: ["Example 2: Clustered vs. Non-Clustered (`INCLUDE`) vs. Heap Lookup Simulator (`simulateMssqlLookup`)"],
      interviewQuestionIds: ["m07-p1-iq-2", "m07-p1-iq-12"],
      exerciseTitles: ["Exercise 1: SQL Server Temp Table vs. Table Variable Selector (selectMssqlTempContainer)"]
    },
    {
      topicTitle: "Indexes",
      anchorId: "m07-p1-topic-indexes",
      explanationHeadings: ["7. Indexes: B+Tree Navigation, Seek vs. Scan & Columnstore Overview"],
      exampleTitles: ["Example 2: Clustered vs. Non-Clustered (`INCLUDE`) vs. Heap Lookup Simulator (`simulateMssqlLookup`)"],
      interviewQuestionIds: ["m07-p1-iq-2", "m07-p1-iq-3"],
      exerciseTitles: ["Exercise 1: SQL Server Temp Table vs. Table Variable Selector (selectMssqlTempContainer)"]
    },
    {
      topicTitle: "Clustered indexes",
      anchorId: "m07-p1-topic-clustered-indexes",
      explanationHeadings: ["8. Clustered Indexes: Physical Row Order, Uniquifier & Key Design"],
      exampleTitles: ["Example 2: Clustered vs. Non-Clustered (`INCLUDE`) vs. Heap Lookup Simulator (`simulateMssqlLookup`)"],
      interviewQuestionIds: ["m07-p1-iq-2", "m07-p1-iq-10", "m07-p1-iq-13"],
      exerciseTitles: ["Exercise 2: T-SQL Function & View Object Advisor (selectMssqlObjectType)"]
    },
    {
      topicTitle: "Non-clustered indexes",
      anchorId: "m07-p1-topic-non-clustered-indexes",
      explanationHeadings: ["9. Non-Clustered Indexes: Row Locators, Key Lookups & `INCLUDE`"],
      exampleTitles: ["Example 2: Clustered vs. Non-Clustered (`INCLUDE`) vs. Heap Lookup Simulator (`simulateMssqlLookup`)"],
      interviewQuestionIds: ["m07-p1-iq-2", "m07-p1-iq-3"],
      exerciseTitles: ["Exercise 2: T-SQL Function & View Object Advisor (selectMssqlObjectType)"]
    },
    {
      topicTitle: "Heap tables",
      anchorId: "m07-p1-topic-heap-tables",
      explanationHeadings: ["10. Heap Tables: Unordered Pages, IAM Chains & Forwarding Pointers"],
      exampleTitles: ["Example 2: Clustered vs. Non-Clustered (`INCLUDE`) vs. Heap Lookup Simulator (`simulateMssqlLookup`)"],
      interviewQuestionIds: ["m07-p1-iq-2", "m07-p1-iq-7"],
      exerciseTitles: ["Exercise 1: SQL Server Temp Table vs. Table Variable Selector (selectMssqlTempContainer)"]
    },
    {
      topicTitle: "Stored procedures",
      anchorId: "m07-p1-topic-stored-procedures",
      explanationHeadings: ["11. Stored Procedures: Compiled T-SQL, Parameters & Plan Reuse"],
      exampleTitles: ["Exercise 2: T-SQL Function & View Object Advisor (selectMssqlObjectType)"],
      interviewQuestionIds: ["m07-p1-iq-13"],
      exerciseTitles: ["Exercise 2: T-SQL Function & View Object Advisor (selectMssqlObjectType)"]
    },
    {
      topicTitle: "Functions",
      anchorId: "m07-p1-topic-functions",
      explanationHeadings: ["12. Functions: Scalar UDFs vs. Inline TVFs vs. Multi-Statement TVFs"],
      exampleTitles: ["Exercise 2: T-SQL Function & View Object Advisor (selectMssqlObjectType)"],
      interviewQuestionIds: ["m07-p1-iq-6", "m07-p1-iq-14"],
      exerciseTitles: ["Exercise 2: T-SQL Function & View Object Advisor (selectMssqlObjectType)"]
    },
    {
      topicTitle: "Views",
      anchorId: "m07-p1-topic-views",
      explanationHeadings: ["13. Views: Virtual Tables, `SCHEMABINDING` & Indexed Views"],
      exampleTitles: ["Exercise 2: T-SQL Function & View Object Advisor (selectMssqlObjectType)"],
      interviewQuestionIds: ["m07-p1-iq-11"],
      exerciseTitles: ["Exercise 2: T-SQL Function & View Object Advisor (selectMssqlObjectType)"]
    },
    {
      topicTitle: "Triggers",
      anchorId: "m07-p1-topic-triggers",
      explanationHeadings: ["14. Triggers: `inserted`/`deleted` Pseudo-Tables & Set-Based Logic"],
      exampleTitles: ["Exercise 2: T-SQL Function & View Object Advisor (selectMssqlObjectType)"],
      interviewQuestionIds: ["m07-p1-iq-4"],
      exerciseTitles: ["Exercise 2: T-SQL Function & View Object Advisor (selectMssqlObjectType)"]
    },
    {
      topicTitle: "Temp tables",
      anchorId: "m07-p1-topic-temp-tables",
      explanationHeadings: ["15. Temp Tables: `#Local`, `##Global`, Statistics & `tempdb`"],
      exampleTitles: ["Exercise 1: SQL Server Temp Table vs. Table Variable Selector (selectMssqlTempContainer)"],
      interviewQuestionIds: ["m07-p1-iq-5", "m07-p1-iq-14"],
      exerciseTitles: ["Exercise 1: SQL Server Temp Table vs. Table Variable Selector (selectMssqlTempContainer)"]
    },
    {
      topicTitle: "Table variables",
      anchorId: "m07-p1-topic-table-variables",
      explanationHeadings: ["16. Table Variables: `@tbl`, Transaction Scope & Cardinality Limits"],
      exampleTitles: ["Exercise 1: SQL Server Temp Table vs. Table Variable Selector (selectMssqlTempContainer)"],
      interviewQuestionIds: ["m07-p1-iq-5", "m07-p1-iq-14"],
      exerciseTitles: ["Exercise 1: SQL Server Temp Table vs. Table Variable Selector (selectMssqlTempContainer)"]
    },
    {
      topicTitle: "CTEs",
      anchorId: "m07-p1-topic-ctes",
      explanationHeadings: ["17. CTEs: Non-Materialized Expressions & `WITH` Recursive Queries"],
      exampleTitles: ["Exercise 1: SQL Server Temp Table vs. Table Variable Selector (selectMssqlTempContainer)"],
      interviewQuestionIds: ["m07-p1-iq-5", "m07-p1-iq-14"],
      exerciseTitles: ["Exercise 1: SQL Server Temp Table vs. Table Variable Selector (selectMssqlTempContainer)"]
    },
    {
      topicTitle: "Window functions",
      anchorId: "m07-p1-topic-window-functions",
      explanationHeadings: ["18. Window Functions: `OVER`, Ranking, `LAG`/`LEAD` & Framing"],
      exampleTitles: ["Exercise 2: T-SQL Function & View Object Advisor (selectMssqlObjectType)"],
      interviewQuestionIds: ["m07-p1-iq-8"],
      exerciseTitles: ["Exercise 2: T-SQL Function & View Object Advisor (selectMssqlObjectType)"]
    }
  ],
  codeTests: [
    {
      blockIndex: 1,
      label: "Example 1: allocateMssqlExtent — 8 KB page & 64 KB extent",
      expectedStdoutIncludes: ["Standard OLTP:", '"extentType":"UNIFORM_EXTENT"', "Row overflow:", '"usesRowOverflow":true'],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`allocateMssqlExtent({ rowBytes: 0, rowCount: 10 });`), TypeError);
        assert.throws(() => run(`allocateMssqlExtent({ rowBytes: 100, rowCount: 0 });`), TypeError);
        const r = run(`return allocateMssqlExtent({ rowBytes: 9000, rowCount: 10 });`) as {
          usesRowOverflow: boolean;
          allocatedKb: number;
        };
        assert.equal(r.usesRowOverflow, true);
        assert.equal(r.allocatedKb, 64);
      },
      safetyMutations: [
        {
          description: "Using >= instead of > on 8060-byte limit wrongly flags exact 8060-byte row as overflow",
          mutateCode: (raw) => raw.replace("rowBytes > MAX_IN_ROW_BYTES", "rowBytes >= MAX_IN_ROW_BYTES"),
          verifyProtection: (run) => {
            assert.equal(
              run(`return allocateMssqlExtent({ rowBytes: 8060, rowCount: 1 }).usesRowOverflow;`),
              false
            );
          }
        }
      ]
    },
    {
      blockIndex: 2,
      label: "Example 2: simulateMssqlLookup — Heap RID vs Key Lookup vs INCLUDE",
      expectedStdoutIncludes: ["Covering INCLUDE:", '"lookupType":"COVERING_NO_LOOKUP"', "Key Lookup:", "Heap RID + Forward:"],
      minStdoutLines: 3,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`simulateMssqlLookup({ tableOrg: "invalid" });`), TypeError);
        assert.throws(() => run(`simulateMssqlLookup({ tableOrg: "heap", forwardedRatio: 2 });`), TypeError);
        const cov = run(`return simulateMssqlLookup({ tableOrg: "clustered", hasCoveringInclude: true, matchedRows: 100 });`) as {
          lookupType: string;
          logicalReads: number;
        };
        assert.equal(cov.lookupType, "COVERING_NO_LOOKUP");
        assert.ok(cov.logicalReads < 10);
      },
      safetyMutations: [
        {
          description: "Removing hasCoveringInclude shortcut forces Key Lookup on covering index",
          mutateCode: (raw) => raw.replace("if (hasCoveringInclude)", "if (false)"),
          verifyProtection: (run) => {
            assert.equal(
              run(`return simulateMssqlLookup({ tableOrg: "clustered", hasCoveringInclude: true, matchedRows: 50 }).lookupType;`),
              "COVERING_NO_LOOKUP"
            );
          }
        }
      ]
    },
    {
      blockIndex: 3,
      label: "Exercise 1: selectMssqlTempContainer — #Temp vs @Table vs CTE",
      expectedStdoutIncludes: ["Large set:", '"choice":"#TempTable"', "Audit log:", '"choice":"@TableVariable"', '"choice":"CTE"'],
      minStdoutLines: 3,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`selectMssqlTempContainer({ estimatedRows: -1 });`), TypeError);
        assert.equal(
          run(`return selectMssqlTempContainer({ estimatedRows: 10, mustSurviveRollback: true }).choice;`),
          "@TableVariable"
        );
        assert.equal(
          run(`return selectMssqlTempContainer({ estimatedRows: 5000 }).choice;`),
          "#TempTable"
        );
      },
      safetyMutations: [
        {
          description: "Ignoring mustSurviveRollback wrongly picks CTE instead of @TableVariable",
          mutateCode: (raw) => raw.replace("if (mustSurviveRollback)", "if (false)"),
          verifyProtection: (run) => {
            assert.equal(
              run(`return selectMssqlTempContainer({ estimatedRows: 10, mustSurviveRollback: true }).choice;`),
              "@TableVariable"
            );
          }
        }
      ]
    },
    {
      blockIndex: 4,
      label: "Exercise 2: selectMssqlObjectType — Proc vs IndexedView vs iTVF",
      expectedStdoutIncludes: ['"objectType":"StoredProcedure"', '"objectType":"IndexedView"', '"objectType":"InlineTVF"'],
      minStdoutLines: 3,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`selectMssqlObjectType({ returnsTable: "yes" });`), TypeError);
        assert.equal(
          run(`return selectMssqlObjectType({ returnsTable: true, singleSelectExpression: true }).objectType;`),
          "InlineTVF"
        );
      },
      safetyMutations: [
        {
          description: "Removing needsTransactions check wrongly returns View instead of StoredProcedure",
          mutateCode: (raw) => raw.replace("if (needsTransactions)", "if (false)"),
          verifyProtection: (run) => {
            assert.equal(
              run(`return selectMssqlObjectType({ needsTransactions: true }).objectType;`),
              "StoredProcedure"
            );
          }
        }
      ]
    },
    {
      blockIndex: 5,
      label: "Challenge: planMssqlPageFit — 8,060-byte limit & NUSE key check",
      expectedStdoutIncludes: ['"storageUnit":"IN_ROW_DATA"', '"storageUnit":"ROW_OVERFLOW_DATA"', '"nuseCompliant":false'],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`planMssqlPageFit({ fixedBytes: 0, clusteringKeyType: "bigint_identity" });`), TypeError);
        assert.throws(() => run(`planMssqlPageFit({ fixedBytes: 20, clusteringKeyType: "bad_key" });`), TypeError);
        const r = run(`return planMssqlPageFit({ fixedBytes: 64, varBytes: 100, clusteringKeyType: "bigint_identity" });`) as {
          fitsInRow: boolean;
          nuseCompliant: boolean;
        };
        assert.equal(r.fitsInRow, true);
        assert.equal(r.nuseCompliant, true);
      },
      safetyMutations: [
        {
          description: "Treating random_uuid as NUSE-compliant misses page-split warning",
          mutateCode: (raw) =>
            raw.replace(
              'const nuseCompliant = clusteringKeyType === "bigint_identity" || clusteringKeyType === "int_identity";',
              "const nuseCompliant = true;"
            ),
          verifyProtection: (run) => {
            assert.equal(
              run(`return planMssqlPageFit({ fixedBytes: 64, varBytes: 100, clusteringKeyType: "random_uuid" }).nuseCompliant;`),
              false
            );
          }
        }
      ]
    }
  ]
};
