import type { InterviewQuestion } from "@/entities/handbook";

export const m07p1Questions: InterviewQuestion[] = [
  {
    id: "m07-p1-iq-1",
    moduleNumber: 7,
    lessonId: "m07-p1",
    number: 1,
    question: "What are SQL Server 8 KB pages and 64 KB extents, and what changed with Uniform vs. Mixed extents in SQL Server 2016?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "8 KB Page & 64 KB Extent",
        body: "SQL Server performs all I/O in **8 KB (8,192-byte) pages** (96-byte header + up to 8,060 in-row bytes + 2-byte slot array). Eight contiguous pages form a **64 KB extent**."
      },
      {
        label: "SQL Server 2016 Uniform Default",
        body: "Before 2016, small objects shared **Mixed extents** tracked by SGAM, causing latch contention. Since SQL Server 2016, user databases default to `MIXED_PAGE_ALLOCATION = OFF`, allocating **Uniform extents** immediately."
      }
    ]
  },
  {
    id: "m07-p1-iq-2",
    moduleNumber: 7,
    lessonId: "m07-p1",
    number: 2,
    question: "Explain the difference between a Heap table, a Clustered Index, and a Non-Clustered Index in SQL Server.",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Heap vs. Clustered Index",
        body: "A **Heap** has no clustered index; rows sit unordered in pages tracked by IAM/PFS. A **Clustered Index** stores the entire table's data rows sorted in its B+Tree leaf pages (at most one per table)."
      },
      {
        label: "Non-Clustered Index",
        body: "A **Non-Clustered Index** is a separate B+Tree storing `(index_keys, row_locator)`—where the locator is either the **clustering key** (if clustered) or an 8-byte **RID** (`File:Page:Slot`, if a heap)."
      }
    ]
  },
  {
    id: "m07-p1-iq-3",
    moduleNumber: 7,
    lessonId: "m07-p1",
    number: 3,
    question: "What does `INCLUDE` do on a SQL Server Non-Clustered Index, and what problem does it solve?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Leaf-Only Columns",
        body: "`CREATE NONCLUSTERED INDEX ... ON tbl (key_col) INCLUDE (col1, col2)` stores `col1` and `col2` in the index **leaf pages only** without adding them to B+Tree navigation keys."
      },
      {
        label: "Eliminating Key Lookups",
        body: "Because all `SELECT` columns are present in the leaf pages, SQL Server satisfies the query with a single covering **Index Seek**, eliminating expensive **Key Lookup** (or **RID Lookup**) probes into the base table."
      }
    ]
  },
  {
    id: "m07-p1-iq-4",
    moduleNumber: 7,
    lessonId: "m07-p1",
    number: 4,
    question: "How do SQL Server DML Triggers differ from row-by-row triggers in other databases?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Statement-Level Execution",
        body: "SQL Server `AFTER` and `INSTEAD OF` triggers fire **once per DML statement**, not once per row—even if an `UPDATE` modifies 10,000 rows."
      },
      {
        label: "inserted & deleted Virtual Tables",
        body: "Modified rows are exposed via the virtual `inserted` and `deleted` tables. Assigning a scalar variable (`SELECT @id = id FROM inserted`) silently drops multi-row changes; triggers must always use set-based joins."
      }
    ]
  },
  {
    id: "m07-p1-iq-5",
    moduleNumber: 7,
    lessonId: "m07-p1",
    number: 5,
    question: "Compare `#Temp` tables, `@Table` variables, and `CTEs` in T-SQL.",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "#Temp Tables vs. @Table Variables",
        body: "`#Temp` tables reside in `tempdb`, maintain full **column statistics**, support multiple non-clustered indexes, and roll back with user transactions. `@Table` variables also use `tempdb` but **survive `ROLLBACK`** and lack column histograms (relying on SQL 2019 deferred row-count compilation)."
      },
      {
        label: "CTEs (Common Table Expressions)",
        body: "A T-SQL **CTE** is never materialized; it is inlined like a subquery. Referencing a CTE three times in one query executes its underlying `SELECT` three times—stage into `#Temp` if reuse is needed."
      }
    ]
  },
  {
    id: "m07-p1-iq-6",
    moduleNumber: 7,
    lessonId: "m07-p1",
    number: 6,
    question: "Why should you prefer Inline Table-Valued Functions (iTVFs) over Scalar UDFs and Multi-Statement TVFs?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "iTVF Plan Expansion",
        body: "An **Inline TVF** (`RETURN (SELECT ...)`) expands directly into the caller's query tree like a parameterized view, letting the optimizer push predicates down, choose index seeks, and run in parallel."
      },
      {
        label: "RBAR & Parallelism Inhibitors",
        body: "Multi-Statement TVFs materialize into a `@table` with poor cardinality estimates, and traditional Scalar UDFs execute **row-by-row (RBAR)** while blocking parallelism (partially mitigated by SQL Server 2019 Scalar UDF Inlining for simple functions)."
      }
    ]
  },
  {
    id: "m07-p1-iq-7",
    moduleNumber: 7,
    lessonId: "m07-p1",
    number: 7,
    question: "What are Heap Forwarding Pointers, and why are Heaps usually avoided for OLTP tables?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "Row Growth & Forwarding",
        body: "Because Heap rows are referenced by physical **RID** (`File:Page:Slot`), if an `UPDATE` widens a row beyond its current page's free space, SQL Server moves the row to a new page and leaves a **Forwarding Pointer** at the original RID so non-clustered indexes don't need updating."
      },
      {
        label: "Extra I/O & Space Bloat",
        body: "Every read hitting a forwarded record pays an extra page hop, and deleted Heap space is often not reclaimed efficiently without `ALTER TABLE ... REBUILD`. OLTP tables should use a NUSE **Clustered Index**."
      }
    ]
  },
  {
    id: "m07-p1-iq-8",
    moduleNumber: 7,
    lessonId: "m07-p1",
    number: 8,
    question: "Why does `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` outperform the default `RANGE` frame in SQL Server Window Functions?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "Default RANGE Frame Spills to tempdb",
        body: "When `ORDER BY` is specified in `OVER (...)` without an explicit frame, SQL Server defaults to `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`, which must group peer ties and therefore uses an **on-disk `tempdb` worktable spool**."
      },
      {
        label: "In-Memory Window Spool with ROWS",
        body: "Explicitly writing `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` processes rows sequentially in an **in-memory window spool**, cutting I/O and elapsed time dramatically on large result sets."
      }
    ]
  },
  {
    id: "m07-p1-iq-9",
    moduleNumber: 7,
    lessonId: "m07-p1",
    number: 9,
    question: "Explain SQL Server's SQLOS cooperative scheduling and how MDF, NDF, LDF, and Buffer Pool interact during writes.",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "SQLOS Cooperative Schedulers",
        body: "SQLOS creates one logical scheduler per CPU core inside the single `sqlservr.exe` process. Worker threads run non-preemptively and yield cooperatively at well-defined wait points (`PAGEIOLATCH`, `WRITELOG`, `LCK_M_*`), avoiding OS thread-thrashing."
      },
      {
        label: "WAL & Buffer Pool Dirty Pages",
        body: "An `UPDATE` modifies the 8 KB page in the **Buffer Pool** (marking it dirty) and writes a log record to the `.ldf` log buffer. On `COMMIT`, `.ldf` must flush to disk before returning; dirty `.mdf`/`.ndf` data pages are flushed later by **Checkpoint** or **Lazy Writer**."
      }
    ],
    subboxes: [
      {
        title: "Storage Layout Best Practice",
        content: "Separate `.ldf` log files (sequential writes) onto dedicated low-latency storage from `.mdf`/`.ndf` data files (random I/O), and size `tempdb` with multiple equal data files."
      }
    ]
  },
  {
    id: "m07-p1-iq-10",
    moduleNumber: 7,
    lessonId: "m07-p1",
    number: 10,
    question: "What happens when a SQL Server table's clustering key is non-unique or uses `NEWID()`, and how do you fix it?",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Hidden 4-Byte Uniquifier",
        body: "If a clustered index is not `UNIQUE`, SQL Server silently adds a 4-byte **`uniquifier`** to duplicate keys—inflating both the clustered B+Tree and every non-clustered index leaf entry that embeds the clustering key."
      },
      {
        label: "Random NEWID() Page Splits",
        body: "Clustering on `NEWID()` scatters inserts across random 8 KB pages, causing 50% page splits, heavy fragmentation, and wasted Buffer Pool RAM. Fix by clustering on a **NUSE** `BIGINT IDENTITY` (or `NEWSEQUENTIALID()` if GUIDs are required)."
      }
    ],
    subboxes: [
      {
        title: "External UUID Exposure",
        content: "Keep `BIGINT IDENTITY` as the internal `CLUSTERED PRIMARY KEY`, and store an external `UNIQUEIDENTIFIER` (`NEWID()`) in a separate `NONCLUSTERED UNIQUE` column for APIs."
      }
    ]
  },
  {
    id: "m07-p1-iq-11",
    moduleNumber: 7,
    lessonId: "m07-p1",
    number: 11,
    question: "How do SQL Server Indexed Views work, what strict requirements do they enforce, and what write overhead do they introduce?",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "SCHEMABINDING & UNIQUE CLUSTERED INDEX",
        body: "Creating a `UNIQUE CLUSTERED INDEX` on a `WITH SCHEMABINDING` view materializes its result set on disk and keeps it **synchronously updated** on every `INSERT`/`UPDATE`/`DELETE` to the base tables."
      },
      {
        label: "Strict Rules & Write Cost",
        body: "Indexed views forbid outer joins, subqueries, `TOP`, `DISTINCT`, `UNION`, and `COUNT(*)` without `COUNT_BIG(*)`, and require deterministic `SET` options (`ANSI_NULLS`, `QUOTED_IDENTIFIER ON`). Every base-table write incurs extra lock and B+Tree maintenance cost."
      }
    ],
    subboxes: [
      {
        title: "Enterprise Edition Matching",
        content: "Enterprise Edition automatically matches base-table queries to Indexed Views; Standard Edition requires the explicit `WITH (NOEXPAND)` table hint."
      }
    ]
  },
  {
    id: "m07-p1-iq-12",
    moduleNumber: 7,
    lessonId: "m07-p1",
    number: 12,
    question: "Explain SQL Server's 8,060-byte row limit, `ROW_OVERFLOW_DATA`, and `LOB_DATA` allocation units.",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "In-Row vs. Row-Overflow",
        body: "An 8 KB page (8,192 bytes) leaves 8,060 bytes for a single in-row record after the 96-byte header and slot entry. When variable-length columns (`VARCHAR(5000)` + `VARCHAR(5000)`) push a row past 8,060 bytes, SQL Server moves the largest variable column to **`ROW_OVERFLOW_DATA`** pages, leaving a 24-byte pointer."
      },
      {
        label: "LOB_DATA Allocation Unit",
        body: "`VARCHAR(MAX)`, `NVARCHAR(MAX)`, and `VARBINARY(MAX)` columns exceeding 8,000 bytes (or when `large value types out of row` is enabled) live in **`LOB_DATA`** B-tree pages, adding extra page reads whenever those columns are selected."
      }
    ],
    subboxes: [
      {
        title: "Vertical Partitioning",
        content: "Split rarely accessed wide text/JSON blobs into a separate 1:1 extension table so hot OLTP `IN_ROW_DATA` pages pack many rows per 8 KB page in the Buffer Pool."
      }
    ]
  },
  {
    id: "m07-p1-iq-13",
    moduleNumber: 7,
    lessonId: "m07-p1",
    number: 13,
    question: "As a senior architect, design the physical storage, indexing, and T-SQL access layer for a 2B-row SQL Server financial ledger.",
    difficulty: "senior-architect",
    numberedSteps: [
      {
        title: "Problem",
        body: "A 2B-row SQL Server ledger suffers from random `NEWID()` page splits, expensive Key Lookups on account history queries, and `tempdb` contention."
      },
      {
        title: "Constraints & Scale",
        body: "30K ledger inserts/sec, 50K account-history reads/sec, strict p99 < 15ms, and zero tolerance for Heap forwarding hops or row-overflow spills."
      },
      {
        title: "NUSE Clustered Primary Key",
        body: "Cluster on `LedgerId BIGINT IDENTITY(1,1)` (8-byte NUSE key) so all inserts append sequentially to the rightmost 8 KB page with ~99% fill density."
      },
      {
        title: "External Correlation Key",
        body: "Store external idempotency `UNIQUEIDENTIFIER` (`BINARY(16)` or `UNIQUEIDENTIFIER`) as a separate `NONCLUSTERED UNIQUE` index rather than the clustering key."
      },
      {
        title: "Covering Non-Clustered INCLUDE",
        body: "Create `IX_Ledger_Account_Date ON dbo.Ledger (AccountId, PostedAt DESC) INCLUDE (AmountCents, Currency, EntryType)` to eliminate all Key Lookups."
      },
      {
        title: "In-Row Page Budget",
        body: "Keep fixed + variable columns well under 150 bytes/row (`IN_ROW_DATA`), moving optional audit metadata JSON to a 1:1 extension table."
      },
      {
        title: "Filegroup & Log Separation",
        body: "Place `.mdf`/`.ndf` data files and `.ldf` sequential transaction log on separate high-IOPS NVMe volumes."
      },
      {
        title: "tempdb Multi-File Striping",
        body: "Configure 8 equal-sized `tempdb` data files (`MIXED_PAGE_ALLOCATION OFF`) to eliminate GAM/PFS allocation latch contention."
      },
      {
        title: "Parameterized Stored Procedures",
        body: "Wrap writes and reads in stored procedures using `sp_executesql` patterns and `GRANT EXECUTE` least-privilege security."
      },
      {
        title: "Inline TVF & Window Framing",
        body: "Use Inline TVFs (`iTVF`) for composable filters and explicit `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` for running balances."
      },
      {
        title: "Trigger Avoidance",
        body: "Perform ledger/balance updates atomically inside stored-procedure transactions rather than row triggers to keep execution explicit and testable."
      },
      {
        title: "Observability",
        body: "Monitor `sys.dm_db_index_physical_stats`, Buffer Pool Page Life Expectancy (PLE), `sys.dm_os_wait_stats` (`PAGEIOLATCH`, `WRITELOG`), and Query Store."
      }
    ]
  },
  {
    id: "m07-p1-iq-14",
    moduleNumber: 7,
    lessonId: "m07-p1",
    number: 14,
    question: "As a senior architect, refactor a legacy SQL Server reporting suite crippled by Scalar UDFs, `@Table` variables, multi-referenced CTEs, and `tempdb` spills.",
    difficulty: "senior-architect",
    numberedSteps: [
      {
        title: "Problem",
        body: "End-of-day reporting procedures take 18 minutes, single-thread on CPU, and spill gigabytes to `tempdb`."
      },
      {
        title: "Baseline Telemetry",
        body: "Capture actual execution plans (`SET STATISTICS IO, TIME ON` and Query Store) to identify RBAR Scalar UDF calls, 1-row `@table` estimates, and `RANGE` window spools."
      },
      {
        title: "Replace Scalar UDFs with Inline TVFs",
        body: "Rewrite row-by-row Scalar UDFs into composable **Inline Table-Valued Functions** invoked via `CROSS APPLY`, unlocking index seeks and parallel execution."
      },
      {
        title: "Swap `@Table` Variables for `#Temp` Tables",
        body: "Replace large `@table` variables with `#Temp` tables and add targeted `CLUSTERED`/`NONCLUSTERED` indexes so the optimizer gets real column histograms."
      },
      {
        title: "Materialize Multi-Referenced CTEs",
        body: "Stage any CTE referenced more than once into a `#Temp` table so expensive joins/aggregations compute once instead of `N` times."
      },
      {
        title: "Switch `RANGE` to `ROWS` in Windows",
        body: "Add explicit `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` to ordered `SUM() OVER` clauses to eliminate `tempdb` worktable spills."
      },
      {
        title: "Add Covering `INCLUDE` Indexes",
        body: "Add non-clustered `INCLUDE` indexes on reporting predicates to convert Key Lookups and Table Scans into Index Seeks."
      },
      {
        title: "Consider Indexed Views for Hot Rollups",
        body: "Materialize high-frequency daily summary rollups into a `WITH SCHEMABINDING` **Indexed View** (measuring OLTP write overhead first)."
      },
      {
        title: "Fix Set-Based Trigger Bugs",
        body: "Audit any reporting-feed triggers to ensure set-based `inserted`/`deleted` joins instead of scalar variable assignments."
      },
      {
        title: "Eliminate Dynamic SQL Concatenation",
        body: "Convert concatenated `EXEC(@sql)` filters to parameterized `sp_executesql` for plan reuse and SQL injection protection."
      },
      {
        title: "Verify `tempdb` & Memory Grants",
        body: "Re-test under realistic concurrency and verify `logical reads`, `tempdb` spills, and memory grants drop by >90%."
      },
      {
        title: "Regression Guardrails",
        body: "Enable **Query Store** to track plan regressions and alert on any procedure exceeding its latency/I/O SLA."
      }
    ]
  }
];
