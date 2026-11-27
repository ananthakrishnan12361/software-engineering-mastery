import type { InterviewQuestion } from "@/entities/handbook";

export const m07p2Questions: InterviewQuestion[] = [
  {
    id: "m07-p2-iq-1",
    moduleNumber: 7,
    lessonId: "m07-p2",
    number: 1,
    question: "Why should T-SQL stored procedures using explicit transactions always include `SET XACT_ABORT ON` and check `XACT_STATE()`?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Partial Rollback Trap",
        body: "By default (`XACT_ABORT OFF`), many T-SQL runtime errors abort only the failing statement while leaving the outer explicit transaction open—risking orphaned locks or partially committed work."
      },
      {
        label: "XACT_ABORT ON + XACT_STATE()",
        body: "`SET XACT_ABORT ON` marks the transaction uncommittable on any runtime error (`XACT_STATE() = -1`), so the `CATCH` block cleanly checks `IF XACT_STATE() <> 0 ROLLBACK TRANSACTION;`."
      }
    ]
  },
  {
    id: "m07-p2-iq-2",
    moduleNumber: 7,
    lessonId: "m07-p2",
    number: 2,
    question: "What is SQL Server Lock Escalation, when does it trigger, and how do you prevent it?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "The ~5,000-Lock Threshold",
        body: "When a single statement acquires ~5,000 or more row (`KEY`/`RID`) or `PAGE` locks on one table/HoBT, SQL Server converts them into a single table-level `X` or `S` lock to save lock-manager memory."
      },
      {
        label: "Mitigation Strategies",
        body: "Batch large `DELETE`/`UPDATE` jobs into chunks of 2,000–4,000 rows per transaction, add selective indexes so fewer rows are locked, or set `LOCK_ESCALATION = AUTO` on partitioned tables to escalate to the partition level."
      }
    ]
  },
  {
    id: "m07-p2-iq-3",
    moduleNumber: 7,
    lessonId: "m07-p2",
    number: 3,
    question: "Why is `WITH (NOLOCK)` dangerous in SQL Server, and what should you use instead?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Dirty Reads & Allocation-Order Scans",
        body: "`WITH (NOLOCK)` (`READ UNCOMMITTED`) reads uncommitted dirty data that may roll back and can skip or double-count committed rows if a concurrent `INSERT` splits a B+Tree page during an allocation-order scan."
      },
      {
        label: "Use READ_COMMITTED_SNAPSHOT (RCSI)",
        body: "Enabling `ALTER DATABASE db SET READ_COMMITTED_SNAPSHOT ON` provides non-blocking, snapshot-consistent statement reads via the `tempdb` (or ADR) version store without dirty reads or missing rows."
      }
    ]
  },
  {
    id: "m07-p2-iq-4",
    moduleNumber: 7,
    lessonId: "m07-p2",
    number: 4,
    question: "Compare `READ_COMMITTED_SNAPSHOT` (RCSI) and `SNAPSHOT` isolation in SQL Server.",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "RCSI (Statement-Level MVCC)",
        body: "`READ_COMMITTED_SNAPSHOT ON` is a database-wide setting that makes standard `READ COMMITTED` queries read row versions committed as of the start of each **statement**—requiring zero application code changes."
      },
      {
        label: "SNAPSHOT (Transaction-Level MVCC & Error 3960)",
        body: "`ALLOW_SNAPSHOT_ISOLATION ON` + `SET TRANSACTION ISOLATION LEVEL SNAPSHOT` gives a **transaction-wide** consistent snapshot, preventing non-repeatable and phantom reads, and raising **Error `3960`** on concurrent write-write conflicts."
      }
    ]
  },
  {
    id: "m07-p2-iq-5",
    moduleNumber: 7,
    lessonId: "m07-p2",
    number: 5,
    question: "Explain how an Update (`U`) lock prevents conversion deadlocks in SQL Server.",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "The S → X Conversion Deadlock",
        body: "Under `REPEATABLE READ` (or `HOLDLOCK`), if two sessions read the same row with `S` locks and then both attempt to `UPDATE` it (requesting `X`), neither can upgrade because `X` conflicts with the other's `S` lock—causing Error `1205`."
      },
      {
        label: "How UPDLOCK (`U`) Serializes Cleanly",
        body: "`U` is compatible with `S` (regular readers aren't blocked) but **incompatible with another `U` or `X`**. The second session waits on `U` immediately during its `SELECT`, letting the first session convert `U → X` and commit without deadlock."
      }
    ]
  },
  {
    id: "m07-p2-iq-6",
    moduleNumber: 7,
    lessonId: "m07-p2",
    number: 6,
    question: "How does SQL Server's Lock Monitor choose a deadlock victim, and how do you capture and resolve production Error `1205` deadlocks?",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Victim Selection & Extended Events",
        body: "SQL Server's Lock Monitor detects cycles and picks the session with the lowest **`DEADLOCK_PRIORITY`** (`LOW`=-5, `NORMAL`=0, `HIGH`=5), breaking ties by choosing the transaction that has written fewer transaction log bytes (cheapest rollback). Capture the full XML deadlock graph from the built-in **`system_health`** Extended Events session."
      },
      {
        label: "Structural Resolution & Retry",
        body: "Fix the root cause by enforcing consistent lock-acquisition order across stored procedures, adding `WITH (UPDLOCK)` on read-then-write lookups, adding covering `INCLUDE` indexes to shrink key-range lock footprints, and wrapping callers in bounded Error `1205` retry logic."
      }
    ],
    subboxes: [
      {
        title: "Key-Range Locks in SERIALIZABLE",
        content: "Missing indexes under `SERIALIZABLE` force `RangeS-S` / `RangeX-X` locks across large portions of the table—an `INCLUDE` covering index often eliminates those deadlocks immediately."
      }
    ]
  },
  {
    id: "m07-p2-iq-7",
    moduleNumber: 7,
    lessonId: "m07-p2",
    number: 7,
    question: "Explain `Sch-S` and `Sch-M` locks and how an unguarded `ALTER TABLE` can cause a cluster-wide outage in SQL Server.",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Schema Stability vs. Schema Modification",
        body: "Every compiling or executing query holds a **`Sch-S`** (Schema Stability) lock. DDL statements (`ALTER TABLE`, `TRUNCATE`, index `SWITCH`) require a **`Sch-M`** (Schema Modification) lock, which is incompatible with `Sch-S` and every other lock mode."
      },
      {
        label: "The Waiting Queue Outage",
        body: "If a 5-minute analytical `SELECT` holds `Sch-S` and an `ALTER TABLE` requests `Sch-M`, the `ALTER` blocks—and every *new* incoming `SELECT` needing `Sch-S` queues behind the waiting `Sch-M`, halting all app traffic! Guard migrations with `WAIT_AT_LOW_PRIORITY (MAX_DURATION = 1 MINUTES, ABORT_AFTER_WAIT = SELF)` or `SET LOCK_TIMEOUT`."
      }
    ],
    subboxes: [
      {
        title: "Online Index Operations",
        content: "Use `WITH (ONLINE = ON, WAIT_AT_LOW_PRIORITY (...))` on Enterprise/Azure SQL so index builds only need a brief `Sch-M` at the final metadata switch."
      }
    ]
  },
  {
    id: "m07-p2-iq-8",
    moduleNumber: 7,
    lessonId: "m07-p2",
    number: 8,
    question: "As a senior architect, migrate a high-contention SQL Server OLTP database from pessimistic locking and `NOLOCK` hints to safe row versioning (`RCSI`/`ADR`) with zero blocking outages.",
    difficulty: "senior-architect",
    numberedSteps: [
      {
        title: "Problem",
        body: "A high-traffic SQL Server database suffers from `LCK_M_S` reader/writer blocking, `NOLOCK` dirty-read defects, Error `1205` deadlocks, and `tempdb` version-store spikes."
      },
      {
        title: "Audit Current Isolation & Hints",
        body: "Scan stored procedures and ORM queries for `WITH (NOLOCK)`, `SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED`, and missing `SET XACT_ABORT ON`."
      },
      {
        title: "Enable Accelerated Database Recovery (ADR)",
        body: "On SQL Server 2019+, enable `ACCELERATED_DATABASE_RECOVERY = ON` so row versions live in the database's Persistent Version Store (PVS) with instant transaction rollback."
      },
      {
        title: "Size tempdb & Log Throughput",
        body: "Ensure `tempdb` has multiple equal data files and low-latency NVMe storage if on pre-2019 SQL Server, monitoring `sys.dm_tran_version_store_space_usage`."
      },
      {
        title: "Enable READ_COMMITTED_SNAPSHOT (RCSI)",
        body: "Run `ALTER DATABASE AppDb SET READ_COMMITTED_SNAPSHOT ON WITH ROLLBACK IMMEDIATE` during a controlled cutover so `READ COMMITTED` reads become non-blocking."
      },
      {
        title: "Remove Unsafe NOLOCK Hints",
        body: "Systematically strip `WITH (NOLOCK)` from reporting and API queries now that RCSI provides non-blocking, consistent reads."
      },
      {
        title: "Protect Read-Modify-Write Paths",
        body: "Audit inventory/balance updates and enforce `WITH (UPDLOCK, ROWLOCK)` (or `SNAPSHOT` + Error `3960` retry) because RCSI alone does not prevent lost updates on read-then-write."
      },
      {
        title: "Eliminate Lock Escalation",
        body: "Refactor large batch jobs into 2,000–4,000 row chunks and set `LOCK_ESCALATION = AUTO` on partitioned tables."
      },
      {
        title: "Guard DDL with Low-Priority Locks",
        body: "Enforce `SET LOCK_TIMEOUT` and `WAIT_AT_LOW_PRIORITY` on schema migrations so `Sch-M` requests never stall production `Sch-S` traffic."
      },
      {
        title: "Standardize Error Handling & Retries",
        body: "Enforce `SET XACT_ABORT ON` + `XACT_STATE()` in all procedures and bounded exponential-backoff retry for Errors `1205` and `3960` in app services."
      },
      {
        title: "Load Test & Verify Deadlock Reduction",
        body: "Replay concurrent checkout and reporting workloads in staging, inspecting `sys.dm_os_wait_stats` (`LCK_M_S` drop) and `system_health` deadlock graphs."
      },
      {
        title: "Production Observability",
        body: "Alert on `LCK_M_*` wait spikes, longest active transaction age (`sys.dm_tran_active_transactions`), PVS/`tempdb` version-store size, and Error `1205`/`3960` rates."
      }
    ]
  }
];
