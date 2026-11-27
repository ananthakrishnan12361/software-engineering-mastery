import type { InterviewQuestion } from "@/entities/handbook";

export const m07p3Questions: InterviewQuestion[] = [
  {
    id: "m07-p3-iq-1",
    moduleNumber: 7,
    lessonId: "m07-p3",
    number: 1,
    question: "What is the difference between an Estimated Execution Plan and an Actual Execution Plan in SQL Server?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Estimated Plan (Compile Only)",
        body: "An **Estimated Execution Plan** compiles the query using statistics and displays the optimizer's predicted operators and row estimates without executing the query."
      },
      {
        label: "Actual Plan (Executed + Runtime Telemetry)",
        body: "An **Actual Execution Plan** executes the query and includes **Actual Number of Rows**, actual executions, memory-grant usage, wait stats, and runtime warnings (`tempdb` spills)."
      }
    ]
  },
  {
    id: "m07-p3-iq-2",
    moduleNumber: 7,
    lessonId: "m07-p3",
    number: 2,
    question: "What are SQL Server's index fragmentation thresholds (`REORGANIZE` vs. `REBUILD`), and how do they affect statistics?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "The 5% / 30% Rule (>= 1,000 Pages)",
        body: "For indexes with >= 1,000 pages, ignore fragmentation `< 5%`; run `ALTER INDEX ... REORGANIZE` (online, minimally logged) for `5%–30%`; and run `ALTER INDEX ... REBUILD` (prefer `ONLINE = ON`) for `> 30%`."
      },
      {
        label: "Statistics Side Effects",
        body: "`REBUILD` automatically updates index statistics with a full-scan equivalent, whereas **`REORGANIZE` does not update statistics**—so always follow `REORGANIZE` with `UPDATE STATISTICS` when needed."
      }
    ]
  },
  {
    id: "m07-p3-iq-3",
    moduleNumber: 7,
    lessonId: "m07-p3",
    number: 3,
    question: "Compare `SIMPLE`, `FULL`, and `BULK_LOGGED` recovery models in SQL Server.",
    difficulty: "basic",
    paragraphs: [
      {
        label: "SIMPLE vs. FULL",
        body: "`SIMPLE` automatically truncates inactive `.ldf` log records on checkpoint, preventing transaction log backups and Point-in-Time Recovery (PITR). **`FULL`** preserves every log record until `BACKUP LOG` runs, enabling PITR (`STOPAT`) to any second."
      },
      {
        label: "BULK_LOGGED",
        body: "`BULK_LOGGED` minimally logs bulk operations (`BULK INSERT`, index rebuilds) to reduce `.ldf` growth while still allowing log backups, though PITR cannot stop mid-bulk-operation."
      }
    ]
  },
  {
    id: "m07-p3-iq-4",
    moduleNumber: 7,
    lessonId: "m07-p3",
    number: 4,
    question: "What is Parameter Sniffing in SQL Server, and when does it hurt performance?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "First-Call Plan Caching",
        body: "When a stored procedure compiles for the first time, SQL Server sniffs the incoming parameter values against the 200-step statistics histogram and caches the resulting plan for reuse."
      },
      {
        label: "Skewed Distribution Failure",
        body: "If the first call is an atypical small tenant (`5` rows → `Nested Loops + Key Lookup`), a later call for a `2,000,000`-row tenant reuses that same plan—causing millions of Key Lookups and `tempdb` Sort/Hash spills."
      }
    ]
  },
  {
    id: "m07-p3-iq-5",
    moduleNumber: 7,
    lessonId: "m07-p3",
    number: 5,
    question: "How does `CONVERT_IMPLICIT` degrade SQL Server execution plans, and how do you fix it?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "Data Type Precedence Trap",
        body: "When a query compares a lower-precedence column (e.g. `VARCHAR(50)`) against a higher-precedence parameter (`NVARCHAR(50)` from `.NET`), SQL Server wraps the *column* in `CONVERT_IMPLICIT(nvarchar, col)`."
      },
      {
        label: "Restoring Index Seeks",
        body: "Because the indexed column is wrapped in a conversion function, the predicate is no longer SARGable and degrades from `Index Seek` to `Index Scan`. Fix by matching parameter types (`SqlDbType.VarChar`) to the column definition."
      }
    ]
  },
  {
    id: "m07-p3-iq-6",
    moduleNumber: 7,
    lessonId: "m07-p3",
    number: 6,
    question: "Explain SQL Server Table Partitioning (`RANGE RIGHT` vs. `RANGE LEFT`) and how `ALTER TABLE ... SWITCH` enables instant archiving.",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "RANGE RIGHT for Date Boundaries",
        body: "`RANGE RIGHT` places the exact boundary value (e.g., `'2026-11-01 00:00:00'`) as the **first** value in the next partition, which aligns naturally with monthly/daily `DATETIME2` ranges."
      },
      {
        label: "Metadata-Only SWITCH",
        body: "`ALTER TABLE dbo.Events SWITCH PARTITION 2 TO dbo.Events_Archive` swaps partition ownership in milliseconds via a `Sch-M` metadata update—avoiding hours of row-by-row `DELETE` log generation."
      }
    ]
  },
  {
    id: "m07-p3-iq-7",
    moduleNumber: 7,
    lessonId: "m07-p3",
    number: 7,
    question: "How does SQL Server's Query Store help diagnose and resolve plan regressions?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "Persistent Plan & Runtime History",
        body: "Query Store (default ON in SQL Server 2022) persists compiled plans, runtime `logical_reads`/CPU stats, and wait categories inside the user database across restarts—unlike the volatile Plan Cache."
      },
      {
        label: "One-Click Plan Forcing",
        body: "Using `sys.query_store_runtime_stats` or SSMS Regressed Queries, DBAs can spot a sudden plan flip after a statistics update and force the previous healthy plan (`sp_query_store_force_plan`) immediately."
      }
    ]
  },
  {
    id: "m07-p3-iq-8",
    moduleNumber: 7,
    lessonId: "m07-p3",
    number: 8,
    question: "Explain how SQL Server memory grants work and why stale statistics or parameter sniffing cause `tempdb` spills.",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Upfront Memory Grant Reservation",
        body: "Operators like `Sort` and `Hash Match` reserve memory upfront based on the optimizer's **Estimated Number of Rows** and **Estimated Row Size** before execution begins."
      },
      {
        label: "Under-Grant Spills vs. Over-Grant Pressure",
        body: "If stale statistics or parameter sniffing estimate `10` rows when `500,000` actually arrive, the tiny memory grant overflows and spills to **`tempdb`** (`Sort`/`Hash` warnings). Conversely, huge over-estimates waste RAM and cause `RESOURCE_SEMAPHORE` waits."
      }
    ],
    subboxes: [
      {
        title: "SQL Server 2017–2022 Memory Grant Feedback",
        content: "Enterprise/compat-140+ Intelligent Query Processing adjusts subsequent memory grants automatically after observing actual row counts, and SQL Server 2022 persists those adjustments in Query Store."
      }
    ]
  },
  {
    id: "m07-p3-iq-9",
    moduleNumber: 7,
    lessonId: "m07-p3",
    number: 9,
    question: "Walk through a complete Point-in-Time Recovery (PITR) restore sequence using Full, Differential, and Transaction Log backups.",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Step-by-Step NORECOVERY Chain",
        body: "Confirm the database is in `FULL` recovery model and capture a tail-log backup (`BACKUP LOG ... WITH NORECOVERY`) if the `.mdf` is damaged. Restore: (1) latest Full `.bak` `WITH NORECOVERY`, (2) latest Differential `.bak` `WITH NORECOVERY`, and (3) every `.trn` log backup since the Diff in LSN order `WITH NORECOVERY`."
      },
      {
        label: "Final RECOVERY & STOPAT",
        body: "On the final `.trn` containing the incident timestamp, execute `RESTORE LOG db FROM DISK = '...' WITH RECOVERY, STOPAT = '2026-11-27T14:22:00'` to bring the database online at the exact second before the accidental write."
      }
    ],
    subboxes: [
      {
        title: "Verification",
        content: "Always run `RESTORE VERIFYONLY` after backups, keep `WITH CHECKSUM` enabled, and run automated restore + `DBCC CHECKDB` drills."
      }
    ]
  },
  {
    id: "m07-p3-iq-10",
    moduleNumber: 7,
    lessonId: "m07-p3",
    number: 10,
    question: "How do you triage SQL Server performance bottlenecks using the 'Waits and Queues' methodology (`sys.dm_os_wait_stats`)?",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Filter Benign Idle Waits & Take Deltas",
        body: "Sample `sys.dm_os_wait_stats` over a 5–15 minute window (ignoring benign idle waits like `SLEEP_TASK`, `BROKER_TASK_STOP`, `LAZYWRITER_SLEEP`) to rank the top active wait types."
      },
      {
        label: "Map Wait Types to Root Causes",
        body: "`PAGEIOLATCH_SH` points to missing indexes or insufficient Buffer Pool RAM; `WRITELOG` points to `.ldf` storage latency or unbatched commits; `LCK_M_*` points to blocking/missing `RCSI`; `SOS_SCHEDULER_YIELD` points to CPU pressure or excessive recompiles; `RESOURCE_SEMAPHORE` points to excessive memory grants."
      }
    ],
    subboxes: [
      {
        title: "Correlate with Query Store",
        content: "Cross-reference top wait categories in Query Store (`sys.query_store_wait_stats`) to pinpoint the exact stored procedure or query driving the wait."
      }
    ]
  },
  {
    id: "m07-p3-iq-11",
    moduleNumber: 7,
    lessonId: "m07-p3",
    number: 11,
    question: "Compare `OPTION (RECOMPILE)`, `OPTIMIZE FOR UNKNOWN`, Query Store plan forcing, and SQL Server 2022 PSP for fixing parameter sniffing.",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "RECOMPILE vs. OPTIMIZE FOR UNKNOWN",
        body: "`OPTION (RECOMPILE)` compiles an optimal plan per call—ideal for low-frequency skewed reports, but dangerous CPU overhead on 4,000 QPS OLTP procs. `OPTIMIZE FOR UNKNOWN` uses average density-vector estimates, stabilizing plans without recompile CPU, though extreme skew outliers may still suffer."
      },
      {
        label: "Query Store & SQL 2022 PSP",
        body: "Query Store plan forcing pins one good plan immediately with zero code deploy. **SQL Server 2022 Parameter Sensitive Plan (PSP)** optimization automatically generates and caches multiple plans per parameter-skew variant."
      }
    ],
    subboxes: [
      {
        title: "Fix Root Cause First",
        content: "Before adding hints, eliminate `CONVERT_IMPLICIT` and add `INCLUDE` covering indexes—a covering Index Seek is often fast across both small and large parameter values."
      }
    ]
  },
  {
    id: "m07-p3-iq-12",
    moduleNumber: 7,
    lessonId: "m07-p3",
    number: 12,
    question: "As a senior architect, design an end-to-end SQL Server query tuning, index maintenance, and Query Store governance strategy for a 3 TB enterprise OLTP platform.",
    difficulty: "senior-architect",
    numberedSteps: [
      {
        title: "Problem",
        body: "A 3 TB SQL Server OLTP platform suffers from sudden plan regressions, nightly index-rebuild log storms, `CONVERT_IMPLICIT` scans, and unmonitored `tempdb` spills."
      },
      {
        title: "Wait-Stats Baseline",
        body: "Collect `sys.dm_os_wait_stats` deltas (`PAGEIOLATCH`, `WRITELOG`, `LCK_M_*`, `SOS_SCHEDULER_YIELD`) and `SET STATISTICS IO, TIME ON` for top-CPU endpoints."
      },
      {
        title: "Enable Query Store Everywhere",
        body: "Enable `QUERY_STORE = ON` (`READ_WRITE`) with wait-stat capture so every plan flip and memory-grant spill is persisted across restarts."
      },
      {
        title: "Fix Data Types & SARGability",
        body: "Audit `.NET`/ORM parameter bindings (`VarChar` vs `NVarChar`) to eliminate `CONVERT_IMPLICIT` scans and rewrite non-SARGable function predicates."
      },
      {
        title: "Covering INCLUDE Indexes",
        body: "Replace high-row Key Lookups identified in Actual Plans with targeted `NONCLUSTERED INCLUDE` indexes while pruning unused indexes via `sys.dm_db_index_usage_stats`."
      },
      {
        title: "Parameter Sniffing Strategy",
        body: "Adopt SQL Server 2022 PSP optimization where available, `OPTIMIZE FOR UNKNOWN` for high-QPS procs, and `OPTION (RECOMPILE)` only for low-frequency analytical reports."
      },
      {
        title: "Threshold-Based Index Maintenance",
        body: "Deploy Ola Hallengren via SQL Server Agent: skip `< 5%` or `< 1,000` pages, `REORGANIZE` + `UPDATE STATISTICS` for `5%–30%`, `REBUILD WITH (ONLINE = ON, SORT_IN_TEMPDB = ON)` for `> 30%`."
      },
      {
        title: "Sliding-Window Partitioning",
        body: "Partition multi-billion-row append tables `BY RANGE RIGHT` on date and schedule monthly `ALTER TABLE ... SWITCH` archiving jobs."
      },
      {
        title: "Memory & tempdb Hygiene",
        body: "Monitor `tempdb` spills (`spillPages`) and memory-grant waits (`RESOURCE_SEMAPHORE`), leveraging Memory Grant Feedback in compat 140+/160."
      },
      {
        title: "Automated Corruption Checks",
        body: "Schedule weekly `DBCC CHECKDB` (offloaded to a restored backup or replica where possible) via SQL Server Agent."
      },
      {
        title: "CI Plan Regression Gate",
        body: "Enforce execution-plan & `STATISTICS IO` checks in staging CI before deploying schema or stored-procedure changes."
      },
      {
        title: "Observability & Alerting",
        body: "Alert on Query Store regressed queries, `tempdb` spill spikes, `PAGEIOLATCH`/`WRITELOG` thresholds, and Agent job failures."
      }
    ]
  },
  {
    id: "m07-p3-iq-13",
    moduleNumber: 7,
    lessonId: "m07-p3",
    number: 13,
    question: "As a senior architect, design an enterprise SQL Server Agent backup, encryption, and automated PITR disaster-recovery pipeline meeting RPO <= 5 minutes and RTO <= 30 minutes.",
    difficulty: "senior-architect",
    numberedSteps: [
      {
        title: "Problem",
        body: "Manual backups and untested restore scripts threaten compliance, while missed `.trn` log backups risk hours of data loss and disk-full `.ldf` outages."
      },
      {
        title: "Enforce FULL Recovery Model",
        body: "Set `ALTER DATABASE ... SET RECOVERY FULL` on all production databases so continuous transaction log backups enable second-level PITR."
      },
      {
        title: "SQL Server Agent Backup Schedule",
        body: "Schedule weekly/daily Full backups, 6-hour Differential backups, and 5-minute Transaction Log (`.trn`) backups via Ola Hallengren + SQL Server Agent."
      },
      {
        title: "Backup Compression & Checksums",
        body: "Enable `WITH COMPRESSION, CHECKSUM` on all backups to shrink storage/network transfer and detect page/media corruption immediately."
      },
      {
        title: "Backup Encryption & Immutability",
        body: "Encrypt backups (`AES_256` with backed-up server certificates or TDE) and ship copies off-host to immutable WORM object storage."
      },
      {
        title: "Automated `RESTORE VERIFYONLY`",
        body: "Validate backup header and checksum integrity immediately after every Full and Diff backup completes."
      },
      {
        title: "Tail-Log & NORECOVERY Runbook",
        body: "Document exact `BACKUP LOG ... WITH NORECOVERY` (tail-log), Full `NORECOVERY`, Diff `NORECOVERY`, and `.trn` `NORECOVERY` → final `RECOVERY, STOPAT` scripts."
      },
      {
        title: "Automated Weekly PITR Drill",
        body: "Run a scheduled restore job into an isolated sandbox instance weekly, verifying `STOPAT` point-in-time accuracy and `DBCC CHECKDB` pass."
      },
      {
        title: "Log Growth & Disk Guardrails",
        body: "Alert via SQL Server Agent if `.ldf` free space drops or `log_reuse_wait_desc` stays stuck on `LOG_BACKUP` / `ACTIVE_TRANSACTION`."
      },
      {
        title: "Always On AG Backup Offload",
        body: "Offload Full/Diff/Log backups to a secondary Always On Availability Group replica where supported to protect primary I/O."
      },
      {
        title: "Least-Privilege Agent Proxies",
        body: "Run external OS/PowerShell backup-shipping steps under scoped SQL Server Agent Proxy accounts rather than `sysadmin`."
      },
      {
        title: "SLA Telemetry & Auditing",
        body: "Track actual backup age, `.trn` ship lag, and weekly drill RTO duration against the 5-min RPO / 30-min RTO targets."
      }
    ]
  }
];
