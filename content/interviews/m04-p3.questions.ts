import type { InterviewQuestion } from "@/entities/handbook";

export const m04p3Questions: InterviewQuestion[] = [
  {
    id: "m04-p3-iq-1",
    moduleNumber: 4,
    lessonId: "m04-p3",
    number: 1,
    question: "What does ACID stand for in relational databases, and how does each property protect data?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Four Guarantees",
        body: "**Atomicity** ensures all operations in a transaction commit together or roll back cleanly. **Consistency** enforces schema invariants (`CHECK`, `UNIQUE`, `FOREIGN KEY`) across every committed state. **Isolation** prevents concurrent transactions from corrupting each other's intermediate work. **Durability** flushes committed changes to non-volatile Write-Ahead Logs (`fsync`) so crashes cannot erase them."
      },
      {
        label: "Practical Example",
        body: "In a bank transfer, atomicity prevents debiting Alice without crediting Bob, consistency blocks negative balances via `CHECK (balance_cents >= 0)`, isolation hides in-flight balances, and durability survives power loss right after `COMMIT`."
      }
    ]
  },
  {
    id: "m04-p3-iq-2",
    moduleNumber: 4,
    lessonId: "m04-p3",
    number: 2,
    question: "Explain dirty reads, non-repeatable reads, and phantom reads with a quick example of each.",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Three Read Anomalies",
        body: "A **dirty read** reads another transaction's uncommitted change that may still roll back. A **non-repeatable read** reads the same row twice in one transaction and gets different values because another transaction committed an `UPDATE` in between. A **phantom read** runs a range query twice and sees newly committed `INSERT`ed rows matching the `WHERE` filter."
      },
      {
        label: "PostgreSQL Baseline",
        body: "PostgreSQL's default `READ COMMITTED` prevents dirty reads, while `REPEATABLE READ` freezes one transaction snapshot and prevents both non-repeatable reads and phantom reads."
      }
    ]
  },
  {
    id: "m04-p3-iq-3",
    moduleNumber: 4,
    lessonId: "m04-p3",
    number: 3,
    question: "What is the difference between logical backups (pg_dump) and physical backups with WAL archiving?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Logical vs. Physical",
        body: "**Logical backups** (`pg_dump`) export SQL `CREATE` + `COPY` statements, making them portable across major PostgreSQL versions and ideal for single-table restores, though slow on large datasets. **Physical backups** (`pg_basebackup` or disk snapshots) copy raw binary data pages at block speed."
      },
      {
        label: "Why Combine with WAL",
        body: "Pairing a physical base backup with continuous **WAL archiving** enables **Point-in-Time Recovery (PITR)** so you can restore to an exact timestamp seconds before an accidental `DELETE` or `DROP`."
      }
    ]
  },
  {
    id: "m04-p3-iq-4",
    moduleNumber: 4,
    lessonId: "m04-p3",
    number: 4,
    question: "How do PostgreSQL's READ COMMITTED and REPEATABLE READ isolation levels behave differently under concurrent updates?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "Snapshot Scope",
        body: "Under `READ COMMITTED`, every SQL statement receives a fresh snapshot at statement start, so a second `SELECT` in the same transaction sees rows committed by other sessions in between. Under `REPEATABLE READ`, the entire transaction uses a single snapshot captured at its first query."
      },
      {
        label: "Write Conflict Behavior",
        body: "If two `REPEATABLE READ` transactions try to `UPDATE` the same row, the second transaction waits for the first to finish and then aborts with a serialization error (`40001: could not serialize access due to concurrent update`) instead of silently overwriting the first writer's update."
      }
    ]
  },
  {
    id: "m04-p3-iq-5",
    moduleNumber: 4,
    lessonId: "m04-p3",
    number: 5,
    question: "When should you use SELECT ... FOR UPDATE vs. FOR UPDATE SKIP LOCKED?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "Waiting vs. Skipping",
        body: "`SELECT ... FOR UPDATE` acquires an exclusive row lock and **blocks** other transactions trying to lock the same row until `COMMIT` or `ROLLBACK`. `FOR UPDATE SKIP LOCKED` immediately skips any row currently locked by another worker."
      },
      {
        label: "Production Use Cases",
        body: "Use `FOR UPDATE` for financial balances or inventory where you must serialize access to a specific row. Use `FOR UPDATE SKIP LOCKED` for database-backed job queues so parallel workers claim distinct unclaimed jobs without queueing behind each other."
      }
    ]
  },
  {
    id: "m04-p3-iq-6",
    moduleNumber: 4,
    lessonId: "m04-p3",
    number: 6,
    question: "Why do database deadlocks happen, how does the database resolve them, and how do you prevent them?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "Circular Wait & Victim Abort",
        body: "A deadlock occurs when Tx A holds Row 1 and waits for Row 2, while Tx B holds Row 2 and waits for Row 1. The engine's deadlock detector finds the cycle in the wait-for graph and aborts one **victim** transaction (`SQLSTATE 40P01`) so the other can commit."
      },
      {
        label: "Prevention Strategy",
        body: "Acquire multi-row locks in a **canonical global order** (e.g., `ORDER BY id ASC FOR UPDATE`), keep transactions short, set `lock_timeout`, and wrap transactional callers with bounded retries on `40P01`."
      }
    ]
  },
  {
    id: "m04-p3-iq-7",
    moduleNumber: 4,
    lessonId: "m04-p3",
    number: 7,
    question: "Why is connection pooling critical for PostgreSQL, and when should you choose transaction pooling over session pooling?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "Process & Lock Overhead",
        body: "Each PostgreSQL backend process consumes ~5–10 MB of RAM and adds lock-table and context-switch overhead. Thousands of direct app or serverless connections degrade throughput sharply and risk OOM crashes."
      },
      {
        label: "Pooling Modes",
        body: "**Session pooling** assigns a server connection for the client's entire lifetime, whereas **transaction pooling** (e.g., PgBouncer) returns the backend connection to the pool on every `COMMIT`/`ROLLBACK`—multiplying concurrency by 10x+, provided apps avoid session-level `SET` or `LISTEN/NOTIFY` state."
      }
    ]
  },
  {
    id: "m04-p3-iq-8",
    moduleNumber: 4,
    lessonId: "m04-p3",
    number: 8,
    question: "How does MVCC work internally in PostgreSQL (xmin/xmax), and what is the operational cost of long-running transactions?",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Tuple Versioning",
        body: "Instead of overwriting rows in place, PostgreSQL writes a new tuple version with `xmin = current_xid` and stamps the old version with `xmax = current_xid`. Readers compare tuple `xmin`/`xmax` against their snapshot so readers never block writers and writers never block readers."
      },
      {
        label: "Long-Transaction Bloat",
        body: "Because `VACUUM` cannot remove dead row versions still visible to any open snapshot, a single `idle in transaction` session left open for hours pins the oldest `xmin` horizon, causing table/index bloat and slowing queries across the entire cluster."
      }
    ]
  },
  {
    id: "m04-p3-iq-9",
    moduleNumber: 4,
    lessonId: "m04-p3",
    number: 9,
    question: "Compare Pessimistic Locking, Optimistic Concurrency Control (OCC), and SERIALIZABLE (SSI) with concrete trade-offs.",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Mechanism Comparison",
        body: "**Pessimistic locking** (`FOR UPDATE`) blocks conflicting writers upfront. **OCC** (`UPDATE ... SET version = version + 1 WHERE id = $1 AND version = $2`) avoids locks and detects conflicts via affected row count (`0` rows = retry). **SERIALIZABLE (SSI)** runs snapshot reads and aborts (`40001`) only when a dangerous read/write dependency cycle (write skew) forms."
      },
      {
        label: "When to Pick Each",
        body: "Choose pessimistic locking on hot single rows where OCC would thrash retries, OCC when transactions span user think-time or multi-step UI edits, and `SERIALIZABLE` when cross-row invariants (e.g., minimum on-call doctor count) cannot be enforced by a single-row lock."
      }
    ]
  },
  {
    id: "m04-p3-iq-10",
    moduleNumber: 4,
    lessonId: "m04-p3",
    number: 10,
    question: "How do you run zero-downtime schema migrations on a 100M-row PostgreSQL table under live traffic?",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Avoiding Lock Queues",
        body: "Never run `CREATE INDEX` without `CONCURRENTLY`, and never add a validated `CHECK`/`FOREIGN KEY` constraint directly (which holds `ACCESS EXCLUSIVE` or `SHARE ROW EXCLUSIVE` while scanning the whole table). Even fast metadata DDL can pile up behind one slow analytics `SELECT` and stall all app queries."
      },
      {
        label: "Expand-and-Contract Playbook",
        body: "Set a short `lock_timeout` with retries, add nullable columns, add constraints as `NOT VALID` followed by `VALIDATE CONSTRAINT` (allowing concurrent reads/writes), backfill in throttled batches, deploy dual-write/read code, and drop legacy columns only after old replicas drain."
      }
    ]
  },
  {
    id: "m04-p3-iq-11",
    moduleNumber: 4,
    lessonId: "m04-p3",
    number: 11,
    question: "How do database constraints and idempotency keys work together to guarantee end-to-end data integrity?",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Database-Enforced Invariants",
        body: "`PRIMARY KEY`, `FOREIGN KEY`, `UNIQUE`, and `CHECK` constraints enforce entity, referential, and domain integrity at commit time—catching bugs even when multiple microservices or manual scripts touch the database."
      },
      {
        label: "Idempotent Writes",
        body: "Because network timeouts cause clients to retry `POST /payments`, storing a `UNIQUE (idempotency_key)` record inside the **same ACID transaction** as the balance update guarantees a retry either returns the original result or fails cleanly—never double-charging."
      }
    ]
  },
  {
    id: "m04-p3-iq-12",
    moduleNumber: 4,
    lessonId: "m04-p3",
    number: 12,
    question: "Design a zero-data-loss payment ledger with ACID transactions, deadlock-free lock ordering, idempotency, WAL durability, and PITR recovery.",
    difficulty: "senior-architect",
    numberedSteps: [
      {
        title: "Immutable Double-Entry Schema",
        body: "Model `accounts(id, balance_cents CHECK (balance_cents >= 0))` and append-only `ledger_entries(id, from_id, to_id, amount_cents CHECK (amount_cents > 0), idempotency_key UNIQUE)`."
      },
      {
        title: "Idempotency Inside the Same Transaction",
        body: "Insert into `idempotency_keys` (or `ledger_entries` with `ON CONFLICT DO NOTHING`) inside the exact same `BEGIN ... COMMIT` block as the balance updates."
      },
      {
        title: "Canonical Lock Ordering",
        body: "Always lock involved accounts in ascending `id` order (`WHERE id IN ($1, $2) ORDER BY id ASC FOR UPDATE`) so circular wait-for cycles cannot form."
      },
      {
        title: "Atomic Conditional Debit",
        body: "Execute `UPDATE accounts SET balance_cents = balance_cents - $amt WHERE id = $from AND balance_cents >= $amt` and roll back immediately if `rowCount === 0`."
      },
      {
        title: "Bounded Timeouts & Retries",
        body: "Set `lock_timeout = '2s'` and `statement_timeout = '5s'`; retry transient `40P01` (deadlock) or `40001` (serialization) errors with jittered exponential backoff."
      },
      {
        title: "Strict WAL Durability",
        body: "Keep `synchronous_commit = on` (or `remote_apply` with a sync standby) so `COMMIT` never acknowledges until WAL records are `fsync`ed to durable storage."
      },
      {
        title: "No External I/O Inside Transactions",
        body: "Keep payment gateway HTTP calls outside DB transactions; persist an `outbox` event inside the ACID commit and dispatch asynchronously."
      },
      {
        title: "Bounded Transaction Pooling",
        body: "Place PgBouncer in transaction pooling mode sized near `(2 * cores) + spindles` active backend connections to prevent lock-manager thrashing."
      },
      {
        title: "Continuous WAL Archiving & Base Backups",
        body: "Schedule daily `pg_basebackup` snapshots and continuous encrypted WAL segment shipping to object storage (`archive_command` / `pgBackRest`)."
      },
      {
        title: "Point-in-Time Recovery (PITR) Runbook",
        body: "Maintain automated scripts to spin up a clone from base backup + WAL archive replayed to an exact `recovery_target_time` or LSN."
      },
      {
        title: "Monthly Restore & Reconciliation Drills",
        body: "Automatically restore backups into staging monthly and assert `SUM(credits) == SUM(debits)` across all ledger accounts."
      },
      {
        title: "Observability & Bloat Guardrails",
        body: "Alert on `idle_in_transaction` sessions, dead tuple ratio, WAL archive lag, and `40P01`/`40001` retry spikes before they impact checkout."
      }
    ]
  },
  {
    id: "m04-p3-iq-13",
    moduleNumber: 4,
    lessonId: "m04-p3",
    number: 13,
    question: "You need to migrate a 2 TB multi-tenant PostgreSQL orders table with zero downtime while eliminating connection-pool saturation and hot-row lock contention.",
    difficulty: "senior-architect",
    numberedSteps: [
      {
        title: "Diagnose Lock & Pool Bottlenecks First",
        body: "Inspect `pg_stat_activity` and `pg_locks` to separate `Lock` waits (hot parent rows, queued DDL) from `ClientRead` / `idle in transaction` pool exhaustion."
      },
      {
        title: "Enforce Session & Lock Guardrails",
        body: "Set `idle_in_transaction_session_timeout = '30s'` and `lock_timeout = '1500ms'` on migration sessions so DDL never silently queues production traffic."
      },
      {
        title: "Deploy PgBouncer Transaction Pooling",
        body: "Move microservice pods behind PgBouncer in transaction pooling mode, shrinking 1,500 direct connections down to ~60 active PostgreSQL backends."
      },
      {
        title: "Remove External I/O from Transactions",
        body: "Audit order-creation handlers and move webhook/email calls out of `BEGIN ... COMMIT` via a transactional outbox table."
      },
      {
        title: "Phase 1 Expand: Add Nullable Columns",
        body: "Add new columns as nullable with no table rewrite (`ALTER TABLE orders ADD COLUMN ...`) under a `lock_timeout` retry loop."
      },
      {
        title: "Phase 2 Non-Blocking Indexes & Constraints",
        body: "Create supporting indexes with `CREATE INDEX CONCURRENTLY` and add constraints with `NOT VALID` followed by `VALIDATE CONSTRAINT`."
      },
      {
        title: "Phase 3 Throttled Keyset Backfill",
        body: "Backfill historical 2 TB rows in small keyset-paginated batches (`1,000–5,000` rows/tx) pausing when replication lag or IOPS exceeds threshold."
      },
      {
        title: "Eliminate Hot-Row Contention",
        body: "Replace single-row counter updates with `FOR UPDATE SKIP LOCKED` queue workers or sharded/batched counter flushes."
      },
      {
        title: "Tune Autovacuum on High-Churn Tables",
        body: "Lower `autovacuum_vacuum_scale_factor` (e.g., `0.02`) on `orders` so MVCC dead tuples from backfill and updates are reclaimed continuously."
      },
      {
        title: "Dual-Write & Shadow Read Verification",
        body: "Roll out application code writing both old and new columns, then compare read parity in shadow/dark-read metrics before switching reads."
      },
      {
        title: "Phase 4 Contract Safely",
        body: "Only after old app instances drain and a verified PITR base backup completes, drop legacy columns/constraints."
      },
      {
        title: "Post-Cutover Load & Failover Validation",
        body: "Verify p99 query latency, zero `deadlock_detected` (`40P01`) bursts, healthy replication lag, and clean WAL archiving."
      }
    ]
  }
];
