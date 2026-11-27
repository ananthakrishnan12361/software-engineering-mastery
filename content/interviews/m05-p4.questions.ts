import type { InterviewQuestion } from "@/entities/handbook";

export const m05p4Questions: InterviewQuestion[] = [
  {
    id: "m05-p4-iq-1",
    moduleNumber: 5,
    lessonId: "m05-p4",
    number: 1,
    question: "What is the difference between EXPLAIN and EXPLAIN (ANALYZE, BUFFERS) in PostgreSQL?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Estimated vs. Executed",
        body: "`EXPLAIN` asks the Query Planner for its estimated execution plan and costs without running the query. `EXPLAIN (ANALYZE, BUFFERS)` actually executes the query, reporting real `actual time`, `rows`, `loops`, and shared/temp buffer I/O."
      },
      {
        label: "Safety Rule for Mutations",
        body: "Because `EXPLAIN ANALYZE` executes writes, always wrap `INSERT`, `UPDATE`, or `DELETE` diagnostics inside `BEGIN; EXPLAIN (ANALYZE, BUFFERS) ...; ROLLBACK;`."
      }
    ]
  },
  {
    id: "m05-p4-iq-2",
    moduleNumber: 5,
    lessonId: "m05-p4",
    number: 2,
    question: "Why does VACUUM differ from VACUUM FULL, and why is VACUUM FULL dangerous in production?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Online vs. Exclusive Rewrite",
        body: "Plain `VACUUM` runs online (`SHARE UPDATE EXCLUSIVE`), marking dead tuple space reusable in the Free Space Map (`_fsm`), updating the Visibility Map (`_vm`), and freezing old XIDs without blocking reads or writes."
      },
      {
        label: "Why Avoid VACUUM FULL",
        body: "`VACUUM FULL` rewrites the entire table and all indexes into a new file while holding an **`ACCESS EXCLUSIVE` lock**—blocking all `SELECT`s and writes for minutes or hours. Use `pg_repack` to shrink bloated tables online."
      }
    ]
  },
  {
    id: "m05-p4-iq-3",
    moduleNumber: 5,
    lessonId: "m05-p4",
    number: 3,
    question: "Compare PostgreSQL's B-Tree, GIN, GiST, and BRIN indexes with a concrete use case for each.",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Four Core Index Types",
        body: "**B-Tree** handles scalar `=`, `<`, `>`, and `ORDER BY` (PKs, FKs). **GIN** indexes composite values like `JSONB` (`@>`), arrays, and full-text `tsvector`. **GiST** supports overlapping ranges (`EXCLUDE USING gist`) and geospatial queries."
      },
      {
        label: "When BRIN Shines",
        body: "**BRIN** (Block Range Index) stores only min/max values per 128-page block range—making it ~1,000x smaller than a B-Tree on multi-terabyte append-only `created_at` tables."
      }
    ]
  },
  {
    id: "m05-p4-iq-4",
    moduleNumber: 5,
    lessonId: "m05-p4",
    number: 4,
    question: "How does PostgreSQL's Autovacuum threshold formula work, and why do default settings fail on 100M+ row tables?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "Threshold Formula",
        body: "Autovacuum triggers when `n_dead_tup > autovacuum_vacuum_threshold + autovacuum_vacuum_scale_factor * reltuples` (defaults: `50 + 0.20 * rows`)."
      },
      {
        label: "Per-Table Tuning",
        body: "On a 200M-row table, `20%` waits for **40 million dead tuples** before vacuuming—causing severe bloat and long vacuum bursts. Setting `autovacuum_vacuum_scale_factor = 0.01` per table keeps dead tuples small and steady."
      }
    ]
  },
  {
    id: "m05-p4-iq-5",
    moduleNumber: 5,
    lessonId: "m05-p4",
    number: 5,
    question: "Explain how an unguarded ALTER TABLE can cause a lock-queue outage in PostgreSQL even if the DDL itself takes 5 milliseconds.",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "The Lock Queue Effect",
        body: "`ALTER TABLE` requests an `ACCESS EXCLUSIVE` lock, which conflicts with `ACCESS SHARE` (`SELECT`). If a slow 3-minute reporting `SELECT` is running, the `ALTER TABLE` waits in the lock queue—and **every new incoming `SELECT` queues behind the waiting `ALTER TABLE`**, halting the entire app."
      },
      {
        label: "Mitigation",
        body: "Always set `SET lock_timeout = '1500ms'` inside a retry loop for migrations so a blocked DDL aborts cleanly instead of piling up production reads."
      }
    ]
  },
  {
    id: "m05-p4-iq-6",
    moduleNumber: 5,
    lessonId: "m05-p4",
    number: 6,
    question: "Compare Physical Streaming Replication vs. Logical Replication in PostgreSQL.",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Byte-Level vs. Row-Level",
        body: "**Physical streaming replication** ships raw WAL bytes, creating an exact cluster-wide replica (same major version, all databases) ideal for HA failover and read replicas. **Logical replication** decodes WAL into table-level `INSERT`/`UPDATE`/`DELETE` streams."
      },
      {
        label: "When to Pick Logical",
        body: "Choose logical replication for **zero-downtime major version upgrades** (e.g., PG 14 -> 17), replicating a subset of tables, or streaming CDC changes to analytics sinks—noting that DDL changes are not automatically replicated."
      }
    ]
  },
  {
    id: "m05-p4-iq-7",
    moduleNumber: 5,
    lessonId: "m05-p4",
    number: 7,
    question: "How do declarative Range Partitioning and Covering Indexes (INCLUDE) improve both query speed and retention cleanup?",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Partition Pruning & Instant Drops",
        body: "Declarative `PARTITION BY RANGE (created_at)` lets the planner prune irrelevant monthly child tables at plan/execution time, keeping hot indexes small in RAM. Retiring old data uses `DETACH PARTITION CONCURRENTLY` + `DROP TABLE` in milliseconds with zero `VACUUM` bloat."
      },
      {
        label: "Covering Index-Only Scans",
        body: "Adding `INCLUDE (total_cents)` to `(tenant_id, created_at)` allows PostgreSQL to answer queries directly from the index (when `_vm` marks pages all-visible) without random heap page fetches."
      }
    ]
  },
  {
    id: "m05-p4-iq-8",
    moduleNumber: 5,
    lessonId: "m05-p4",
    number: 8,
    question: "A 3 TB PostgreSQL 15 primary hits 100% disk I/O with 400x EXPLAIN row-estimate skew, temp_written spills, and a stalled ALTER TABLE. Walk through your triage and fix.",
    difficulty: "senior-architect",
    numberedSteps: [
      {
        title: "Unblock Production Lock Queue Immediately",
        body: "Check `pg_stat_activity` for `wait_event_type = 'Lock'` and cancel the blocked `ALTER TABLE` first so queued `SELECT`s drain immediately."
      },
      {
        title: "Identify Top I/O Offenders via pg_stat_statements",
        body: "Sort `pg_stat_statements` by `total_exec_time` and `shared_blks_read` + `temp_blks_written` to isolate the worst queries."
      },
      {
        title: "Fix 400x Row-Estimate Skew",
        body: "Run `ANALYZE` on affected tables and add `CREATE STATISTICS` for correlated predicate columns so the planner picks Hash/Index plans instead of bad Nested Loops."
      },
      {
        title: "Eliminate temp_written Disk Spills",
        body: "Add composite indexes matching `WHERE` + `ORDER BY` to remove giant sorts, and tune `work_mem` safely (avoiding OOM under concurrency)."
      },
      {
        title: "Add Partial & Covering Indexes Online",
        body: "Build targeted `CREATE INDEX CONCURRENTLY ... INCLUDE (...) WHERE ...` indexes to turn heap scans into Index-Only Scans."
      },
      {
        title: "Verify SSD Planner Cost Constants",
        body: "Set `random_page_cost = 1.1` and `effective_cache_size` (~75% RAM) on NVMe storage so the planner favors index scans appropriately."
      },
      {
        title: "Deploy PgBouncer Transaction Pooling",
        body: "Cap active PostgreSQL backends near `(2 * cores) + spindles` to stop context-switch thrashing during traffic spikes."
      },
      {
        title: "Tune Per-Table Autovacuum",
        body: "Lower `autovacuum_vacuum_scale_factor = 0.01` and `autovacuum_analyze_scale_factor = 0.005` on hot multi-hundred-GB tables."
      },
      {
        title: "Reclaim Existing Bloat Online",
        body: "Run `REINDEX INDEX CONCURRENTLY` and `pg_repack` during low-traffic windows instead of `VACUUM FULL`."
      },
      {
        title: "Partition the 3 TB Table by Range",
        body: "Migrate the monolithic table to monthly `PARTITION BY RANGE (created_at)` so queries prune cold partitions and old months drop via `DETACH CONCURRENTLY`."
      },
      {
        title: "Enforce Migration Lock Guardrails",
        body: "Require `SET lock_timeout = '1500ms'` with retries, `NOT VALID` constraints, and `CONCURRENTLY` indexes in CI migration checks."
      },
      {
        title: "Verify Continuous Backups & PITR",
        body: "Confirm `pg_basebackup` + WAL archiving health and run an automated staging PITR restore test."
      }
    ]
  },
  {
    id: "m05-p4-iq-9",
    moduleNumber: 5,
    lessonId: "m05-p4",
    number: 9,
    question: "Design a zero-downtime PostgreSQL major version upgrade (PG 14 -> PG 17) with streaming/logical replication, PgBouncer cutover, and rollback safety.",
    difficulty: "senior-architect",
    numberedSteps: [
      {
        title: "Audit Extensions & Schema Compatibility",
        body: "Verify all extensions, collations, and deprecated features on PG 17 in staging before touching production."
      },
      {
        title: "Provision Target PG 17 Cluster",
        body: "Provision PG 17 with matching hardware, `shared_buffers` (~25% RAM), `random_page_cost = 1.1`, and encrypted WAL archiving."
      },
      {
        title: "Apply Base Schema on PG 17",
        body: "Export schema-only (`pg_dump --schema-only`) and apply tables, constraints, and indexes to PG 17 (deferring non-unique secondary indexes if desired for faster initial copy)."
      },
      {
        title: "Ensure Every Table Has a Replica Identity",
        body: "Confirm every replicated table has a `PRIMARY KEY` (or `REPLICA IDENTITY FULL`) required by logical replication `UPDATE`/`DELETE`."
      },
      {
        title: "Create Publication & Subscription",
        body: "Create `PUBLICATION` on PG 14 and `SUBSCRIPTION` on PG 17; monitor initial table sync and `pg_stat_subscription` lag until caught up."
      },
      {
        title: "Run ANALYZE & Warm Buffers on PG 17",
        body: "Run `ANALYZE` across all synced tables on PG 17 and replay read-only shadow traffic to warm `shared_buffers` and verify plans."
      },
      {
        title: "Set Up Reverse Logical Replication (Rollback Path)",
        body: "Prepare a disabled reverse publication/subscription from PG 17 -> PG 14 (plus fresh `pg_basebackup`) in case post-cutover rollback is needed."
      },
      {
        title: "Sync Sequences Right Before Cutover",
        body: "Pause writes briefly via PgBouncer (`PAUSE`), wait for logical lag = 0, and copy current `SEQUENCE` values (`setval`) to PG 17."
      },
      {
        title: "Switch PgBouncer Upstream to PG 17",
        body: "Update PgBouncer config to point to PG 17, reload (`RELOAD`), and `RESUME` client traffic—achieving sub-second write cutover."
      },
      {
        title: "Enable Reverse Sync & Monitor Errors",
        body: "Watch `pg_stat_statements`, error rates, lock waits, and replication lag on PG 17 during peak traffic."
      },
      {
        title: "Verify PITR & Backups on PG 17",
        body: "Take an immediate PG 17 `pg_basebackup` and confirm WAL archiving succeeds."
      },
      {
        title: "Decommission PG 14 After Soak Window",
        body: "Keep PG 14 warm for 24–72 hours before dropping old replication slots and retiring the old cluster."
      }
    ]
  }
];
