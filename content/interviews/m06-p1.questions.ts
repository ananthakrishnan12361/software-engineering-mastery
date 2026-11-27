import type { InterviewQuestion } from "@/entities/handbook";

export const m06p1Questions: InterviewQuestion[] = [
  {
    id: "m06-p1-iq-1",
    moduleNumber: 6,
    lessonId: "m06-p1",
    number: 1,
    question: "What is the difference between InnoDB and MyISAM in MySQL?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "InnoDB: ACID & Row-Level Locking",
        body: "InnoDB provides **ACID-compliant transactions**, **row-level locking**, **foreign key constraints**, and **crash recovery** via redo/undo logs. It is the correct engine for all transactional workloads."
      },
      {
        label: "MyISAM: Table Locks, No Transactions",
        body: "MyISAM uses **table-level locking**, has **no transaction support**, and requires `REPAIR TABLE` after a crash. Its only surviving use case is legacy full-text search in databases predating MySQL 5.6's InnoDB FULLTEXT support."
      }
    ]
  },
  {
    id: "m06-p1-iq-2",
    moduleNumber: 6,
    lessonId: "m06-p1",
    number: 2,
    question: "What does MySQL's `autocommit` mode do, and when must you use an explicit `START TRANSACTION`?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "autocommit = ON (default)",
        body: "With `autocommit = ON`, each individual DML statement (`INSERT`, `UPDATE`, `DELETE`) is wrapped in its own implicit transaction and committed immediately. There is no way to roll back a single statement once it completes."
      },
      {
        label: "Explicit Transaction for Multi-Step Operations",
        body: "Use `START TRANSACTION` (or `BEGIN`) whenever two or more DML statements must succeed or fail atomically—e.g., debiting one account and crediting another. Without an explicit transaction, a failure between statements leaves data in an inconsistent state."
      }
    ]
  },
  {
    id: "m06-p1-iq-3",
    moduleNumber: 6,
    lessonId: "m06-p1",
    number: 3,
    question: "Explain the four ACID properties and how InnoDB implements each one.",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Atomicity & Consistency",
        body: "**Atomicity**: InnoDB writes before-images to the **undo log** so any `ROLLBACK` or crash recovery can restore the original state. **Consistency**: `NOT NULL`, `FOREIGN KEY`, `UNIQUE`, and `CHECK` constraints are enforced within the transaction before `COMMIT`."
      },
      {
        label: "Isolation & Durability",
        body: "**Isolation**: MVCC read views and row-level locks (record, gap, next-key) prevent concurrent transactions from seeing each other's uncommitted data. **Durability**: `innodb_flush_log_at_trx_commit = 1` forces an `fsync()` of the redo log at every `COMMIT`, guaranteeing zero committed-data loss on crash."
      }
    ]
  },
  {
    id: "m06-p1-iq-4",
    moduleNumber: 6,
    lessonId: "m06-p1",
    number: 4,
    question: "Compare MySQL's four isolation levels: which anomalies does each prevent?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "READ UNCOMMITTED vs. READ COMMITTED",
        body: "`READ UNCOMMITTED` allows dirty reads (seeing uncommitted data)—never use in production. `READ COMMITTED` prevents dirty reads by giving each statement a fresh MVCC snapshot, but non-repeatable reads and phantom reads remain possible."
      },
      {
        label: "REPEATABLE READ vs. SERIALIZABLE",
        body: "`REPEATABLE READ` (MySQL default) gives the transaction a single consistent read view. InnoDB additionally uses **next-key locks** to prevent phantom reads—stronger than the SQL standard. `SERIALIZABLE` converts all `SELECT`s to `SELECT ... FOR SHARE`, providing maximum isolation at the cost of lowest concurrency."
      }
    ]
  },
  {
    id: "m06-p1-iq-5",
    moduleNumber: 6,
    lessonId: "m06-p1",
    number: 5,
    question: "What are record locks, gap locks, and next-key locks in InnoDB, and why do gap locks exist?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "Three Lock Granularities",
        body: "A **record lock** locks a single index record. A **gap lock** locks the gap *before* an index record—preventing `INSERT` into a range even when no matching row exists. A **next-key lock** combines both: it locks the index record plus the gap before it."
      },
      {
        label: "Why Gap Locks Exist",
        body: "Gap locks are InnoDB's mechanism for preventing **phantom reads** in `REPEATABLE READ`. Without gap locks, a second `SELECT ... WHERE id BETWEEN 10 AND 20` in the same transaction could see a row inserted by a concurrent transaction after the first read—violating snapshot consistency."
      }
    ]
  },
  {
    id: "m06-p1-iq-6",
    moduleNumber: 6,
    lessonId: "m06-p1",
    number: 6,
    question: "How does InnoDB's MVCC prevent blocking between readers and writers?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "Read View Snapshot",
        body: "When a transaction reads, InnoDB creates a **read view**: a snapshot of the set of active (uncommitted) transaction IDs at that moment. For each row, if the row's `DB_TRX_ID` is in the active set or newer than the snapshot, InnoDB traverses the **undo log chain** (`DB_ROLL_PTR`) backward to find the last committed version visible to this transaction."
      },
      {
        label: "Readers Never Block Writers",
        body: "Because readers use undo log versions instead of locking the live row, a concurrent `UPDATE` can modify the same row while a `SELECT` reads the old version simultaneously. This non-blocking property is what allows InnoDB to deliver high read concurrency on write-heavy tables."
      }
    ]
  },
  {
    id: "m06-p1-iq-7",
    moduleNumber: 6,
    lessonId: "m06-p1",
    number: 7,
    question: "A production MySQL system is experiencing frequent deadlocks. Walk through how you would diagnose and resolve them.",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Capture & Diagnose the Lock-Wait Cycle",
        body: "Run `SHOW ENGINE INNODB STATUS\\G` and inspect `LATEST DETECTED DEADLOCK`, and enable `innodb_print_all_deadlocks = ON` to log every deadlock to the MySQL error log. Identify the two colliding transactions, the locks each held, and the locks each requested."
      },
      {
        label: "Eliminate Cycles & Shrink Lock Scope",
        body: "Rewrite colliding code paths to acquire locks in the **same canonical order** (e.g., ascending primary key), keep transactions short, and add proper indexes so `REPEATABLE READ` queries lock only targeted index records instead of scanning and locking every gap."
      }
    ],
    subboxes: [
      {
        title: "Mandatory Application-Level Retry",
        content: "InnoDB automatically rolls back the lighter transaction and returns `ERROR 1213` (SQLSTATE `40001`). Always catch `1213` in application code and retry the transaction with bounded exponential backoff + jitter."
      }
    ]
  },
  {
    id: "m06-p1-iq-8",
    moduleNumber: 6,
    lessonId: "m06-p1",
    number: 8,
    question: "What is InnoDB's two-phase commit protocol and why is it necessary for consistent replication?",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "The Coordination Problem",
        body: "MySQL's binary log lives in the server layer while InnoDB's redo log lives in the storage engine. Without coordination, a crash between writing one and the other leaves the replica with a different view of committed data than the primary."
      },
      {
        label: "Two-Phase Commit Protocol",
        body: "On every `COMMIT`: (1) InnoDB writes a **prepare record** to the redo log with the XID. (2) The MySQL server writes the XID to the **binary log** and flushes it (`sync_binlog = 1`). (3) InnoDB writes the **commit record** to the redo log. On crash recovery, InnoDB cross-references prepared XA transactions against the binary log—if the XID is in the binlog, it commits; otherwise, it rolls back. This guarantees the redo log and binlog are always consistent."
      }
    ]
  },
  {
    id: "m06-p1-iq-9",
    moduleNumber: 6,
    lessonId: "m06-p1",
    number: 9,
    question: "Design a high-availability MySQL architecture for a 100K req/s SaaS application, explaining your choices for engine, isolation level, connection management, and replication.",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Engine & Isolation Level",
        body: "**InnoDB** everywhere with `REPEATABLE READ` for transactional writes (order placement, payments) and `READ COMMITTED` explicitly for high-volume read-heavy paths (product listing) to avoid gap-lock contention on insert-heavy tables. All `innodb_flush_log_at_trx_commit = 1`, `sync_binlog = 1`."
      },
      {
        label: "Connection Management & HA",
        body: "Use **ProxySQL** in front of a primary + 2–3 read replicas: ProxySQL's hostgroup rules route writes to the primary and reads to replicas, with connection pooling keeping backend thread count at `2 × vCPU`. Use **semi-synchronous replication** (or `rpl_semi_sync`) for the primary→replica pair used for critical reads to bound replica lag. Use **InnoDB Cluster** (Group Replication + MySQL Router) for automatic primary failover."
      }
    ],
    subboxes: [
      {
        title: "Monitoring",
        content: "Track `Innodb_buffer_pool_read_requests` hit ratio > 99%, `Threads_running` < 2×CPU, `Seconds_Behind_Source` < 1s, and deadlock rate from `performance_schema.events_errors_summary_global_by_error_name`."
      }
    ]
  },
  {
    id: "m06-p1-iq-10",
    moduleNumber: 6,
    lessonId: "m06-p1",
    number: 10,
    question: "As a senior architect, design a MySQL schema migration strategy for a zero-downtime ALTER TABLE on a 500M-row InnoDB table.",
    difficulty: "senior-architect",
    numberedSteps: [
      {
        title: "Problem",
        body: "Native `ALTER TABLE` causes an implicit `COMMIT` and acquires a metadata lock (`MDL`) that blocks concurrent reads/writes if a long transaction is open or if the operation requires a full table copy on a 500M-row InnoDB table."
      },
      {
        title: "Constraints & Scale",
        body: "500M rows (~200 GB `.ibd`), 10K+ writes/sec, strict replica lag SLA (< 1s), zero maintenance window allowed, and bounded disk headroom (~250 GB free on primary)."
      },
      {
        title: "InnoDB Online DDL Check",
        body: "First verify whether `ALGORITHM=INSTANT` (MySQL 8.0+ adding trailing nullable columns or metadata-only changes) or `ALGORITHM=INPLACE, LOCK=NONE` applies—if so, no external tool is needed."
      },
      {
        title: "External Tool Selection (gh-ost vs. pt-osc)",
        body: "For table-rebuilding `ALTER`s (e.g., changing column type or dropping columns), choose `gh-ost` (triggerless binlog-streamed shadow copy) over `pt-online-schema-change` to avoid trigger write amplification on high-write primaries."
      },
      {
        title: "Metadata Lock (MDL) Guardrails",
        body: "Set `lock_wait_timeout` low (e.g., 2–5s) on DDL and cutover sessions so a waiting metadata lock never queues every incoming `SELECT` behind a long-running analytical query."
      },
      {
        title: "Shadow Table & Chunked Backfill",
        body: "Create the `_gho` shadow table with the target schema and backfill primary-key ranges in small chunks (e.g., 1,000 rows) while concurrently replaying row-based binlog events (`binlog_format=ROW`)."
      },
      {
        title: "Replica-Lag & Load Throttling",
        body: "Configure `--max-lag-millis=500` and `Threads_running` thresholds so `gh-ost` automatically pauses chunk copying whenever replica lag or primary CPU spikes."
      },
      {
        title: "Dry-Run on Production Replica",
        body: "Execute the full migration on an isolated replica or snapshot first to measure total runtime, disk usage, and verify the resulting `SHOW CREATE TABLE` and index definitions."
      },
      {
        title: "Atomic Cutover Swap",
        body: "Coordinate the final atomic `RENAME TABLE tbl TO _old, _gho TO tbl` during low traffic with `gh-ost`'s cutover lock handshake, keeping app pause to sub-second."
      },
      {
        title: "Data Integrity Verification",
        body: "Compare row counts and sample/checksum (`pt-table-checksum` or sampled `CHECKSUM TABLE` on quiescent replica) between the new table and the preserved `_old` table."
      },
      {
        title: "Rollback & Retention Plan",
        body: "Keep the `_old` shadow table (or reverse-binlog replay window) for 24 hours before `DROP TABLE` so emergency schema rollback or missed-row recovery remains possible."
      },
      {
        title: "Monitoring & Alerting",
        body: "Alert on `Seconds_Behind_Source`, `Threads_running`, InnoDB buffer pool hit ratio, undo tablespace growth, and `performance_schema` metadata lock waits throughout the migration."
      }
    ]
  }
];
