import type { InterviewQuestion } from "@/entities/handbook";

export const m06p2Questions: InterviewQuestion[] = [
  {
    id: "m06-p2-iq-1",
    moduleNumber: 6,
    lessonId: "m06-p2",
    number: 1,
    question: "What is the difference between a clustered index and a secondary index in InnoDB?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Clustered Index (Primary Key B+Tree)",
        body: "In InnoDB, the table data is stored directly in the leaf pages of the **clustered index** ordered by the `PRIMARY KEY`. Every InnoDB table has exactly one clustered index."
      },
      {
        label: "Secondary Index (Double Lookup)",
        body: "A **secondary index** stores only `(indexed_columns, primary_key)` in its leaf pages. Non-covering queries traverse the secondary B+Tree to find the PK, then probe the clustered B+Tree to fetch the full row."
      }
    ]
  },
  {
    id: "m06-p2-iq-2",
    moduleNumber: 6,
    lessonId: "m06-p2",
    number: 2,
    question: "Why should InnoDB primary keys be compact and sequential rather than random UUIDv4 strings?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Page Splits & Fragmentation",
        body: "Random `UUIDv4` values insert into arbitrary 16 KB clustered pages, causing frequent B+Tree page splits, low page fill (~50%), and poor Buffer Pool cache density compared to sequential `AUTO_INCREMENT BIGINT` or `UUIDv7`."
      },
      {
        label: "Secondary Index Bloat",
        body: "Because every secondary index leaf entry embeds a copy of the `PRIMARY KEY`, a 36-byte `CHAR(36)` UUID bloats every secondary index on the table compared to an 8-byte `BIGINT` or 16-byte `BINARY(16)`."
      }
    ]
  },
  {
    id: "m06-p2-iq-3",
    moduleNumber: 6,
    lessonId: "m06-p2",
    number: 3,
    question: "Explain the leftmost prefix rule for composite indexes in MySQL.",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Lexicographical B+Tree Order",
        body: "A composite index `(a, b, c)` sorts rows by `a`, then `b` within equal `a`, then `c` within equal `(a, b)`. MySQL can use the index for `WHERE a = ?`, `(a, b)`, or `(a, b, c)`."
      },
      {
        label: "Range Stops Further Matching",
        body: "Filtering on `b` alone skips the leftmost column `a` and generally prevents B+Tree index usage. A range predicate (`>`, `BETWEEN`) on `b` also stops equality matching on `c`, so put equality columns first."
      }
    ]
  },
  {
    id: "m06-p2-iq-4",
    moduleNumber: 6,
    lessonId: "m06-p2",
    number: 4,
    question: "What is a covering index, and how does it appear in MySQL EXPLAIN output?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Zero Clustered Table Probes",
        body: "A **covering index** contains every column referenced in `SELECT`, `WHERE`, and `ORDER BY` for a query (including the `PRIMARY KEY`, which InnoDB appends implicitly to secondary leaves)."
      },
      {
        label: "EXPLAIN Indicator",
        body: "MySQL reports **`Using index`** in the `Extra` column of `EXPLAIN`, meaning InnoDB satisfies the entire query from secondary index leaf pages without touching the clustered table."
      }
    ]
  },
  {
    id: "m06-p2-iq-5",
    moduleNumber: 6,
    lessonId: "m06-p2",
    number: 5,
    question: "What do `Using filesort` and `Using temporary` mean in EXPLAIN?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Using filesort",
        body: "`Using filesort` means MySQL could not satisfy `ORDER BY` using the chosen index's B+Tree order and must perform an extra sort pass in `sort_buffer_size` (spilling to disk if exceeded)."
      },
      {
        label: "Using temporary",
        body: "`Using temporary` means MySQL created an internal temporary table (in memory or TempTable/InnoDB on disk) to resolve `GROUP BY`, `DISTINCT`, or `UNION`."
      }
    ]
  },
  {
    id: "m06-p2-iq-6",
    moduleNumber: 6,
    lessonId: "m06-p2",
    number: 6,
    question: "What is the difference between a MySQL View using MERGE vs. TEMPTABLE?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "MERGE Algorithm",
        body: "`MERGE` folds the view's `SELECT` and `WHERE` directly into the outer query so the optimizer can push down predicates and use base-table indexes normally."
      },
      {
        label: "TEMPTABLE Algorithm",
        body: "When a view uses `GROUP BY`, `DISTINCT`, `UNION`, or aggregates, MySQL falls back to `TEMPTABLE`, materializing the view into an internal temporary table before applying outer filters."
      }
    ]
  },
  {
    id: "m06-p2-iq-7",
    moduleNumber: 6,
    lessonId: "m06-p2",
    number: 7,
    question: "Compare `mysqldump` and Percona XtraBackup for MySQL backups.",
    difficulty: "basic",
    paragraphs: [
      {
        label: "mysqldump (Logical)",
        body: "`mysqldump --single-transaction` exports portable SQL statements using an MVCC snapshot. It is great for small databases or cross-version migrations, but slow to restore on large datasets."
      },
      {
        label: "Percona XtraBackup (Physical Hot Backup)",
        body: "XtraBackup copies `.ibd` data pages online while streaming InnoDB redo logs, restoring multi-terabyte databases ~10x faster than SQL replay without blocking reads or writes."
      }
    ]
  },
  {
    id: "m06-p2-iq-8",
    moduleNumber: 6,
    lessonId: "m06-p2",
    number: 8,
    question: "Why did MySQL 8.0 remove the Query Cache, and how does MySQL 8.0 handle query execution instead?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "Global Mutex Contention",
        body: "The legacy Query Cache used a single global mutex and invalidated every cached entry whenever any row in a table changed—causing severe multicore scalability bottlenecks on write-active workloads."
      },
      {
        label: "MySQL 8.0 Execution Improvements",
        body: "MySQL 8.0 relies on the InnoDB Buffer Pool for hot data pages, Volcano-style iterators, **Hash Joins** (8.0.18+) for unindexed equi-joins, and application-side caching (Redis) for hot query results."
      }
    ]
  },
  {
    id: "m06-p2-iq-9",
    moduleNumber: 6,
    lessonId: "m06-p2",
    number: 9,
    question: "How do SARGable predicates and functional indexes work in MySQL 8.0?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "Why Functions Break Standard Indexes",
        body: "Writing `WHERE YEAR(created_at) = 2026` forces MySQL to evaluate `YEAR()` on every row, disabling a standard B+Tree index on `created_at`. Rewriting as `created_at >= '2026-01-01' AND created_at < '2027-01-01'` restores a fast `range` scan."
      },
      {
        label: "MySQL 8.0 Functional Indexes",
        body: "When an expression filter cannot be rewritten (e.g., JSON path extraction or `LOWER(email)`), MySQL 8.0.13+ supports functional key parts like `CREATE INDEX idx_lower_email ON users ((LOWER(email)))`."
      }
    ]
  },
  {
    id: "m06-p2-iq-10",
    moduleNumber: 6,
    lessonId: "m06-p2",
    number: 10,
    question: "Explain keyset pagination vs. OFFSET pagination in MySQL.",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "The OFFSET Cost Trap",
        body: "`SELECT ... ORDER BY created_at DESC, id DESC LIMIT 25 OFFSET 100000` still scans and discards 100,025 entries in the index/table before returning 25 rows, degrading linearly with page depth."
      },
      {
        label: "Keyset (Cursor) Pagination",
        body: "Passing the last seen `(created_at, id)` into `WHERE (created_at, id) < (?, ?) ORDER BY created_at DESC, id DESC LIMIT 25` seeks directly in the composite B+Tree in `O(log n)` constant time regardless of page number."
      }
    ]
  },
  {
    id: "m06-p2-iq-11",
    moduleNumber: 6,
    lessonId: "m06-p2",
    number: 11,
    question: "What are the trade-offs of using Stored Procedures and Triggers in MySQL?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "Stored Procedures",
        body: "Stored procedures (`CALL`) reduce network round-trips for multi-step SQL and support `IN`/`OUT` parameters, but tie business logic to primary database CPU, lack modern unit-testing frameworks, and complicate CI/CD versioning."
      },
      {
        label: "Triggers & Replication",
        body: "Row triggers (`BEFORE`/`AFTER`) add hidden per-row latency, cannot commit/rollback, and complicate online schema tools (`gh-ost` avoids triggers). Under `binlog_format = ROW`, trigger writes are replicated as row events."
      }
    ]
  },
  {
    id: "m06-p2-iq-12",
    moduleNumber: 6,
    lessonId: "m06-p2",
    number: 12,
    question: "How does GTID-based replication simplify MySQL failover compared to legacy binlog file/position replication?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "Global Transaction Identifiers",
        body: "With `gtid_mode = ON`, every committed transaction receives a unique `source_uuid:transaction_id` across the entire topology, rather than relying on host-local binlog filenames and byte offsets."
      },
      {
        label: "Automated Re-Pointing",
        body: "During primary failover, replicas use `SOURCE_AUTO_POSITION = 1` to advertise their executed GTID set; the new primary automatically streams only missing transactions without manual log-position math."
      }
    ]
  },
  {
    id: "m06-p2-iq-13",
    moduleNumber: 6,
    lessonId: "m06-p2",
    number: 13,
    question: "What are the rules and benefits of RANGE partitioning in MySQL?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "Partition Pruning & Instant Retention",
        body: "Queries filtering on the partition key prune irrelevant `.ibd` partitions automatically, and retiring old data via `ALTER TABLE ... DROP PARTITION` frees disk space in milliseconds without `DELETE` undo/replication storms."
      },
      {
        label: "Mandatory Primary Key Rule",
        body: "MySQL requires every `PRIMARY KEY` and `UNIQUE` index on a partitioned table to include all columns used in the partitioning expression (e.g., `PRIMARY KEY (id, created_at)`)."
      }
    ]
  },
  {
    id: "m06-p2-iq-14",
    moduleNumber: 6,
    lessonId: "m06-p2",
    number: 14,
    question: "Why is setting `max_connections = 5000` directly on MySQL dangerous, and how does ProxySQL solve it?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "Thread-per-Connection & Memory Risk",
        body: "MySQL spawns one OS thread per connection, each allocating session buffers (`sort_buffer_size`, `join_buffer_size`). Thousands of active threads cause severe CPU context-switching, InnoDB mutex contention, and OOM risk."
      },
      {
        label: "ProxySQL Multiplexing",
        body: "ProxySQL sits in front of MySQL, accepting thousands of client sockets and multiplexing them onto a small backend thread pool (`~2x vCPU`) while also handling read/write splitting and query caching."
      }
    ]
  },
  {
    id: "m06-p2-iq-15",
    moduleNumber: 6,
    lessonId: "m06-p2",
    number: 15,
    question: "Walk through how to diagnose and fix a query showing `type: ALL`, `Using filesort`, and `Using temporary` in EXPLAIN.",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Diagnose with EXPLAIN ANALYZE",
        body: "Run `EXPLAIN ANALYZE` to inspect actual execution times, row counts vs. estimates, and which iterator (`Filter`, `Sort`, `Aggregate`) dominates cost. Check for non-SARGable predicates or implicit type casts (`VARCHAR` vs `INT`)."
      },
      {
        label: "Fix with Composite Covering Index",
        body: "Create a composite index placing equality `WHERE` columns first, `ORDER BY`/`GROUP BY` columns next (matching sort direction), and trailing `SELECT` columns last to achieve `type: ref`/`range` and `Using index` with zero filesort."
      }
    ],
    subboxes: [
      {
        title: "Verify Statistics",
        content: "If row estimates are skewed, run `ANALYZE TABLE tbl` (or add a MySQL 8.0 histogram on skewed non-indexed columns) so the optimizer picks the new index."
      }
    ]
  },
  {
    id: "m06-p2-iq-16",
    moduleNumber: 6,
    lessonId: "m06-p2",
    number: 16,
    question: "How do you diagnose and resolve persistent replication lag on a MySQL 8.0 read replica?",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Isolate I/O vs. SQL Applier Bottlenecks",
        body: "Check `SHOW REPLICA STATUS\\G`: if `Relay_Log_Space` grows while `Seconds_Behind_Source` rises, the replica's SQL applier is falling behind—often caused by single-threaded apply, large unindexed `UPDATE`/`DELETE` batches, or missing PKs under `ROW` binlog."
      },
      {
        label: "Enable Parallel Workers & Logical Clock",
        body: "Configure `replica_parallel_type = LOGICAL_CLOCK` and `replica_parallel_workers = 8..16` (with `replica_preserve_commit_order = ON` for consistent reads), ensure every table has a PK, and chunk large primary batch writes."
      }
    ],
    subboxes: [
      {
        title: "Lag-Aware App Routing",
        content: "Configure ProxySQL `mysql_servers` max replication lag (`max_replication_lag_ms`) so lagging replicas are temporarily pulled from read rotation automatically."
      }
    ]
  },
  {
    id: "m06-p2-iq-17",
    moduleNumber: 6,
    lessonId: "m06-p2",
    number: 17,
    question: "Explain how MySQL 8.0 Hash Joins work and when the optimizer chooses them over Nested-Loop Joins.",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "When Nested-Loop Fails",
        body: "When joining two large tables on an equi-join condition (`t1.k = t2.k`) without an index on the inner join column, an Index Nested-Loop Join is impossible and a plain nested loop degrades to `O(N * M)`."
      },
      {
        label: "In-Memory & Spill Hash Join (8.0.18+)",
        body: "MySQL builds an in-memory hash table of the smaller build input inside `join_buffer_size` and streams the probe input in `O(N + M)` time, spilling cleanly to temporary chunk files on disk if the build table exceeds `join_buffer_size`."
      }
    ],
    subboxes: [
      {
        title: "Still Prefer Indexes for OLTP",
        content: "Hash Joins shine for analytical scans; high-QPS OLTP queries should still use indexed Nested-Loop (`eq_ref` / `ref`) to read only a few rows rather than scanning full tables."
      }
    ]
  },
  {
    id: "m06-p2-iq-18",
    moduleNumber: 6,
    lessonId: "m06-p2",
    number: 18,
    question: "How do `SQL SECURITY DEFINER` vs. `SQL SECURITY INVOKER` affect MySQL Views and Stored Procedures?",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "DEFINER Privilege Escalation Risk",
        body: "By default, MySQL creates views and routines with `SQL SECURITY DEFINER`, executing them with the creator's privileges. If a DBA creates a view or procedure, low-privilege app accounts could inadvertently read or mutate restricted data."
      },
      {
        label: "Least-Privilege INVOKER Pattern",
        body: "Declare `SQL SECURITY INVOKER` so MySQL enforces the calling user's grants at runtime, or restrict `DEFINER` views strictly to intentional row/column-filtering facades owned by a dedicated least-privilege role."
      }
    ],
    subboxes: [
      {
        title: "Audit Existing Objects",
        content: "Query `information_schema.VIEWS` and `information_schema.ROUTINES` for `SECURITY_TYPE = 'DEFINER'` with privileged `DEFINER` accounts like `root@%`."
      }
    ]
  },
  {
    id: "m06-p2-iq-19",
    moduleNumber: 6,
    lessonId: "m06-p2",
    number: 19,
    question: "Explain how Point-in-Time Recovery (PITR) works with Percona XtraBackup and MySQL binary logs.",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Prepare Consistent Base Snapshot",
        body: "Take a hot XtraBackup full backup, run `xtrabackup --prepare` to replay the captured InnoDB redo log, and read `xtrabackup_binlog_info` to obtain the exact `GTID` / binlog file and position of the snapshot."
      },
      {
        label: "Replay Binary Logs to Target Timestamp",
        body: "Restore the prepared data directory onto a recovery host, then apply archived binary logs from the snapshot's GTID/position up to `--stop-datetime` (or `--exclude-gtids` to skip an accidental `DROP TABLE`) using `mysqlbinlog`."
      }
    ],
    subboxes: [
      {
        title: "ROW Binlog Advantage",
        content: "Keep `binlog_format = ROW` so `mysqlbinlog --verbose` can also inspect exact before/after row images for surgical recovery of accidental `UPDATE`/`DELETE` statements."
      }
    ]
  },
  {
    id: "m06-p2-iq-20",
    moduleNumber: 6,
    lessonId: "m06-p2",
    number: 20,
    question: "How do you identify and eliminate redundant or unused indexes without breaking production queries?",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Measure with sys Schema",
        body: "Query `sys.schema_unused_indexes` (after sufficient uptime covering weekly/monthly jobs) and `sys.schema_redundant_indexes` (e.g., `(a)` is redundant when `(a, b)` already exists)."
      },
      {
        label: "Invisible Indexes Before Dropping",
        body: "In MySQL 8.0, mark candidate indexes invisible first via `ALTER TABLE tbl ALTER INDEX idx INVISIBLE;`—the optimizer stops using them immediately while InnoDB still maintains them, allowing instant rollback before `DROP INDEX`."
      }
    ],
    subboxes: [
      {
        title: "Check Replicas Too",
        content: "Analytical queries on read replicas may use indexes that appear unused on the primary—always check `sys.schema_unused_indexes` across all replicas before dropping."
      }
    ]
  },
  {
    id: "m06-p2-iq-21",
    moduleNumber: 6,
    lessonId: "m06-p2",
    number: 21,
    question: "How do you tune MySQL memory parameters (`innodb_buffer_pool_size`, `sort_buffer_size`, `tmp_table_size`) safely under high concurrency?",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Global vs. Per-Session Allocation",
        body: "Allocate 70–80% of RAM to the shared `innodb_buffer_pool_size` (using multiple `innodb_buffer_pool_instances` on large hosts), while keeping per-connection `sort_buffer_size` and `join_buffer_size` small (e.g., 512 KB–2 MB)."
      },
      {
        label: "Bounding Temp Tables",
        body: "Set `tmp_table_size` and `max_heap_table_size` equally (e.g., 32–64 MB) and monitor `Created_tmp_disk_tables` vs. `Created_tmp_tables`—fix queries causing `Using temporary` with indexes rather than raising global per-thread limits."
      }
    ],
    subboxes: [
      {
        title: "Session-Level Override",
        content: "For rare heavy reporting queries, raise `SET SESSION sort_buffer_size = ...` inside the reporting session only instead of risking OOM across 500 OLTP threads."
      }
    ]
  },
  {
    id: "m06-p2-iq-22",
    moduleNumber: 6,
    lessonId: "m06-p2",
    number: 22,
    question: "As a senior architect, design an indexing, partitioning, and pagination architecture for a 5B-row multi-tenant `events` table on MySQL 8.0.",
    difficulty: "senior-architect",
    numberedSteps: [
      {
        title: "Problem",
        body: "A 5B-row `events` table (~1.8 TB) suffers from slow tenant dashboard queries, multi-hour nightly retention `DELETE`s, and deep `OFFSET` pagination timeouts."
      },
      {
        title: "Constraints & Scale",
        body: "50K inserts/sec, 20K reads/sec per tenant, 90-day hot retention, zero-downtime operation, and strict p99 < 25ms SLA on tenant queries."
      },
      {
        title: "Clustered Primary Key Design",
        body: "Use a sequential `(id BIGINT AUTO_INCREMENT, created_at DATE)` or time-ordered `UUIDv7` so inserts append sequentially to the right edge of the clustered B+Tree with zero random page splits."
      },
      {
        title: "Monthly Range Partitioning",
        body: "Partition `BY RANGE (TO_DAYS(created_at))` by month/week (~15–30 active partitions) so queries with `created_at` filters prune cold `.ibd` partitions automatically."
      },
      {
        title: "Composite Covering Index",
        body: "Create `(tenant_id, event_type, created_at, id, summary_code)` following Equality-First, Range/Sort-Last so tenant dashboards execute as covering index scans (`Using index`, zero filesort)."
      },
      {
        title: "Keyset Cursor Pagination",
        body: "Replace `OFFSET` with `(created_at, id) < (?, ?)` keyset cursors, guaranteeing constant `O(log n)` B+Tree seek time even at page 10,000."
      },
      {
        title: "Instant Retention Pruning",
        body: "Retire partitions older than 90 days via `ALTER TABLE events DROP PARTITION p_old` after exporting cold data to object storage, avoiding `DELETE` undo bloat and replica lag."
      },
      {
        title: "Buffer Pool & Page Sizing",
        body: "Size `innodb_buffer_pool_size` to hold hot current-month index/data pages (~75% RAM) and keep `innodb_io_capacity` tuned to NVMe SSD IOPS."
      },
      {
        title: "Query Plan Verification",
        body: "Enforce `EXPLAIN ANALYZE` checks in CI/staging to catch any query regressing to `type: ALL`, `Using filesort`, or broken partition pruning."
      },
      {
        title: "Replication & Read Offload",
        body: "Stream `ROW` binlogs with `gtid_mode = ON` and `LOGICAL_CLOCK` parallel workers to read replicas for heavy analytical exports."
      },
      {
        title: "Backup & PITR",
        body: "Run daily Percona XtraBackup physical snapshots plus continuous binary log archiving so multi-TB restores meet strict RTO/RPO targets."
      },
      {
        title: "Monitoring & Alerting",
        body: "Track `Innodb_buffer_pool_reads`, `performance_schema` digest p99 latency, partition count, and replica `Seconds_Behind_Source`."
      }
    ]
  },
  {
    id: "m06-p2-iq-23",
    moduleNumber: 6,
    lessonId: "m06-p2",
    number: 23,
    question: "As a senior architect, design a high-availability MySQL 8.0 topology with ProxySQL, automatic failover, and zero-RPO guarantees for a fintech ledger.",
    difficulty: "senior-architect",
    numberedSteps: [
      {
        title: "Problem",
        body: "A single-primary MySQL setup risks minutes of downtime and committed-transaction loss on primary hardware failure, while unpooled app pods exhaust `max_connections`."
      },
      {
        title: "Durability Baseline",
        body: "Enforce `innodb_flush_log_at_trx_commit = 1` and `sync_binlog = 1` with `gtid_mode = ON` and `binlog_format = ROW` on all cluster members."
      },
      {
        title: "Consensus / InnoDB Cluster",
        body: "Deploy 3-node **MySQL InnoDB Cluster** (Group Replication in single-primary mode across 3 AZs) using Paxos consensus so a majority quorum prevents split-brain."
      },
      {
        title: "Zero-RPO Commit & Failover Consistency",
        body: "Group Replication certifies writes via Paxos majority quorum before `COMMIT` succeeds, and `group_replication_consistency = BEFORE_ON_PRIMARY_FAILOVER` holds new queries on a newly elected primary until its replication backlog is applied."
      },
      {
        title: "ProxySQL Connection Multiplexing",
        body: "Deploy redundant ProxySQL instances in front of MySQL to pool 5,000+ app connections down to `~2 * vCPU` active backend threads per node."
      },
      {
        title: "Read/Write Splitting & RYW",
        body: "Route writes and read-your-writes ledger queries to the primary hostgroup, and route read-only reporting queries to secondary members."
      },
      {
        title: "Lag-Aware Health Checks",
        body: "Configure ProxySQL `max_replication_lag_ms` and Group Replication flow control so lagging secondaries are automatically excluded from read traffic."
      },
      {
        title: "Automatic Failover Handling",
        body: "When the primary fails, Group Replication elects a new primary in seconds and MySQL Router / ProxySQL updates hostgroup routing; apps retry transient connection drops with exponential backoff."
      },
      {
        title: "Security & TLS",
        body: "Enforce TLS 1.3 (`REQUIRE SSL`) on client, ProxySQL-to-MySQL, and Group Replication inter-node channels plus KMS-backed keyring table encryption."
      },
      {
        title: "Online Schema Changes",
        body: "Run schema changes via `gh-ost` throttled by `Threads_running` and replication lag so DDL never stalls primary commits or triggers flow-control pauses."
      },
      {
        title: "Physical Hot Backups & PITR",
        body: "Schedule XtraBackup snapshots from a dedicated async replica + archived binary logs for point-in-time recovery against logical corruption."
      },
      {
        title: "Chaos & Failover Drills",
        body: "Run automated quarterly AZ-kill failover tests and monthly PITR restore drills, measuring actual RTO, RPO, and ProxySQL cutover latency."
      }
    ]
  },
  {
    id: "m06-p2-iq-24",
    moduleNumber: 6,
    lessonId: "m06-p2",
    number: 24,
    question: "As a senior architect, design a disaster recovery and Point-in-Time Recovery (PITR) pipeline for a 4 TB MySQL 8.0 database.",
    difficulty: "senior-architect",
    numberedSteps: [
      {
        title: "Problem",
        body: "A 4 TB MySQL database takes 14+ hours to restore from `mysqldump`, violating a 1-hour RTO and 1-minute RPO SLA during accidental `DELETE`/`DROP` incidents."
      },
      {
        title: "RTO & RPO Targets",
        body: "Define strict RTO <= 45 minutes for full cluster recovery and RPO <= 5 seconds via continuous binary log shipping."
      },
      {
        title: "Physical Hot Backups",
        body: "Run daily Percona XtraBackup full snapshots (plus hourly incremental snapshots) from a dedicated backup replica to avoid primary I/O contention."
      },
      {
        title: "Parallel Compression & Streaming",
        body: "Stream XtraBackup with `--parallel=8` and `zstd` compression directly to immutable, KMS-encrypted object storage (Object Lock / WORM) to protect against ransomware."
      },
      {
        title: "Continuous Binary Log Archiving",
        body: "Enable `binlog_format = ROW`, `gtid_mode = ON`, and stream rotated binary logs continuously to encrypted object storage every few seconds."
      },
      {
        title: "Rapid Snapshot Restore",
        body: "Restore the 4 TB physical snapshot onto NVMe-backed recovery hardware in parallel (~20–30 minutes) and run `xtrabackup --prepare`."
      },
      {
        title: "Surgical PITR via GTID / Timestamp",
        body: "Inspect `xtrabackup_binlog_info` for the base GTID set, then use `mysqlbinlog --stop-datetime` (or `--exclude-gtids` for bad transactions) to replay binlogs cleanly."
      },
      {
        title: "Row-Level Undo Extraction",
        body: "For targeted accidental `UPDATE`/`DELETE` errors, decode `ROW` binlog events (`mysqlbinlog -v`) to generate inverse `INSERT`/`UPDATE` patches in minutes without a full 4 TB restore."
      },
      {
        title: "Post-Restore Validation",
        body: "Run `mysqlcheck`, verify critical row counts/checksums, and confirm replication GTID alignment before promoting the recovered node."
      },
      {
        title: "Isolation & Security",
        body: "Separate backup IAM credentials (write-only for backups, read-only for automated restore workers) so compromised DB hosts cannot delete backup history."
      },
      {
        title: "Automated Restore Drills",
        body: "Run weekly automated restore-and-verify pipelines into a sandbox VPC, recording restore duration and checksum pass/fail metrics."
      },
      {
        title: "Runbooks & Alerting",
        body: "Alert on backup age > 25h, binlog shipping lag > 30s, or failed weekly restore drills, with tested step-by-step PITR runbooks."
      }
    ]
  },
  {
    id: "m06-p2-iq-25",
    moduleNumber: 6,
    lessonId: "m06-p2",
    number: 25,
    question: "As a senior architect, design a zero-downtime upgrade and query-tuning migration from MySQL 5.7 to MySQL 8.0 for a legacy SaaS platform.",
    difficulty: "senior-architect",
    numberedSteps: [
      {
        title: "Problem",
        body: "MySQL 5.7 is end-of-life; the platform relies on legacy Query Cache behavior, permissive `sql_mode`, unindexed joins, and `UTF8MB3` collations."
      },
      {
        title: "Pre-Upgrade Compatibility Audit",
        body: "Run MySQL Shell `util.checkForServerUpgrade()` against production schemas to detect reserved keywords, invalid dates, `utf8mb3` issues, and `sql_mode` incompatibilities."
      },
      {
        title: "Strict `sql_mode` & Collation Alignment",
        body: "Fix application queries violating `ONLY_FULL_GROUP_BY` and `NO_ZERO_DATE` in staging first, and plan `utf8mb4_0900_ai_ci` collation alignment cleanly."
      },
      {
        title: "Blue-Green GTID Replica Chain",
        body: "Provision a MySQL 8.0 replica replicating from the 5.7 primary (`binlog_format = ROW`, `gtid_mode = ON`), keeping 5.7 as source during shadow validation."
      },
      {
        title: "Query Cache Removal Mitigation",
        body: "Benchmark read latency without the removed Query Cache; move hot repetitive lookups to Redis and size `innodb_buffer_pool_size` to cover the working set."
      },
      {
        title: "Invisible Index & Plan Verification",
        body: "Capture top digests from `performance_schema`, run `EXPLAIN ANALYZE` on 8.0, add composite covering indexes where needed, and test dropping redundant indexes using `INVISIBLE`."
      },
      {
        title: "Shadow Read Traffic Replay",
        body: "Use ProxySQL mirroring to replay live read traffic onto the 8.0 replica and compare error rates, result shapes, and p99 latency."
      },
      {
        title: "View & Routine Security Audit",
        body: "Audit all Views, Triggers, and Stored Procedures for `DEFINER` privileges and deprecated syntax before cutover."
      },
      {
        title: "Cutover Window & ProxySQL Switch",
        body: "Pause writes briefly (`SET GLOBAL read_only = ON` on 5.7), verify 8.0 replica caught up on GTIDs, and flip ProxySQL primary hostgroup to 8.0."
      },
      {
        title: "Reverse Replication Rollback Safety",
        body: "Keep a standby 5.7/8.0 rollback path or tested PITR snapshot ready during the first 24 hours post-cutover."
      },
      {
        title: "Post-Upgrade Tuning",
        body: "Enable `innodb_redo_log_capacity` dynamic sizing (8.0.30+), `LOGICAL_CLOCK` parallel workers, and histograms on skewed columns."
      },
      {
        title: "Observability & Sign-Off",
        body: "Monitor `performance_schema.events_statements_summary_by_digest`, error logs, `Threads_running`, and app p99 latency for 72 hours."
      }
    ]
  }
];
