import type { InterviewQuestion } from "@/entities/handbook";

export const m05p1Questions: InterviewQuestion[] = [
  {
    id: "m05-p1-iq-1",
    moduleNumber: 5,
    lessonId: "m05-p1",
    number: 1,
    question: "Describe PostgreSQL's process-per-connection architecture and why shared_buffers is usually sized around 25% of RAM.",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Multi-Process Model",
        body: "PostgreSQL runs a supervisor `postmaster` process that forks one OS backend process per client connection, alongside shared memory (`shared_buffers`, `wal_buffers`, lock tables) and background workers (Checkpointer, Background Writer, WAL Writer, Autovacuum)."
      },
      {
        label: "Why ~25% RAM for shared_buffers",
        body: "PostgreSQL relies on the OS filesystem page cache as a second-level cache. Setting `shared_buffers` near 25% of RAM avoids double-buffering the same 8 KB pages in two places and prevents excessive checkpoint flush overhead."
      }
    ]
  },
  {
    id: "m05-p1-iq-2",
    moduleNumber: 5,
    lessonId: "m05-p1",
    number: 2,
    question: "What is an 8 KB slotted page in PostgreSQL, what does ctid represent, and when is TOAST used?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Slotted Page & ctid",
        body: "PostgreSQL stores heap rows in fixed 8 KB (8192-byte) pages: a 24-byte header, 4-byte line pointers growing downward, free space in the middle, and tuple payloads growing upward. A row's `ctid` (e.g., `(42, 3)`) is its exact `(page_number, line_pointer_offset)`."
      },
      {
        label: "TOAST Threshold",
        body: "Because a tuple cannot span multiple 8 KB pages, when variable-length fields (`TEXT`, `JSONB`, `BYTEA`) push a tuple past ~2 KB (`TOAST_TUPLE_THRESHOLD`), PostgreSQL compresses and/or moves them out-of-line into a companion `pg_toast` table."
      }
    ]
  },
  {
    id: "m05-p1-iq-3",
    moduleNumber: 5,
    lessonId: "m05-p1",
    number: 3,
    question: "Walk through the four stages of PostgreSQL's internal query execution pipeline.",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "Parser, Rewriter & Planner",
        body: "First, the **Parser** validates SQL syntax into a parse tree. Next, the **Analyzer/Rewriter** resolves relation/column OIDs from system catalogs and expands `VIEW`s. Then the **Planner** estimates costs using `pg_statistic` histograms to pick scan types (Seq, Index, Bitmap) and join strategies (Nested Loop, Hash, Merge)."
      },
      {
        label: "Volcano-Style Executor",
        body: "Finally, the **Executor** pulls rows demand-driven from child plan nodes (`shared_buffers` -> disk), filtering tuples against the transaction's MVCC snapshot."
      }
    ]
  },
  {
    id: "m05-p1-iq-4",
    moduleNumber: 5,
    lessonId: "m05-p1",
    number: 4,
    question: "What are PostgreSQL relation forks (main, _fsm, _vm), and why does the Visibility Map matter for Index-Only Scans?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "Three Main Forks",
        body: "Every regular table has a **main fork** (the 8 KB data pages), a **Free Space Map (`_fsm`)** tracking available bytes per page so `INSERT`s find space quickly, and a **Visibility Map (`_vm`)** with two bits per page (`all-visible` and `all-frozen`)."
      },
      {
        label: "Index-Only Scan Speedup",
        body: "Because PostgreSQL indexes do not store `xmin`/`xmax` MVCC metadata, an Index-Only Scan must verify visibility in the `_vm` fork. If a page's `all-visible` bit is set (updated by `VACUUM`), PostgreSQL skips fetching the 8 KB heap page completely."
      }
    ]
  },
  {
    id: "m05-p1-iq-5",
    moduleNumber: 5,
    lessonId: "m05-p1",
    number: 5,
    question: "How does a Heap-Only Tuple (HOT) update work, and when does lowering fillfactor improve write throughput?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "Zero Index Writes",
        body: "When an `UPDATE` does not change any indexed column *and* the same 8 KB page has enough free space, PostgreSQL writes the new tuple version on the same page and links `v1 -> v2` via line pointers—requiring **zero B-tree index updates**."
      },
      {
        label: "Tuning fillfactor",
        body: "By default `fillfactor = 100` packs pages completely full on `INSERT`, leaving no room for HOT updates. Lowering `fillfactor` to `75–85` on update-heavy tables preserves in-page headroom for HOT chains and cuts index bloat dramatically."
      }
    ]
  },
  {
    id: "m05-p1-iq-6",
    moduleNumber: 5,
    lessonId: "m05-p1",
    number: 6,
    question: "Why does PostgreSQL enable full_page_writes by default, and how do checkpoints interact with WAL volume?",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Torn-Page Protection",
        body: "PostgreSQL writes 8 KB pages while the OS/disk often flushes 4 KB blocks. If power fails halfway through flushing a dirty 8 KB page, the page is torn and unusable for delta WAL replay. With `full_page_writes = on`, PostgreSQL writes a complete 8 KB Full-Page Image (FPI) into WAL the first time a page is modified after a checkpoint."
      },
      {
        label: "Checkpoint Frequency Trade-Off",
        body: "If checkpoints run too frequently (because `max_wal_size` is too small), pages are re-dirtied after each checkpoint and emit repeated 8 KB FPIs—multiplying WAL generation and disk I/O."
      }
    ]
  },
  {
    id: "m05-p1-iq-7",
    moduleNumber: 5,
    lessonId: "m05-p1",
    number: 7,
    question: "Explain PostgreSQL's 32-bit XID wraparound problem, CLOG (pg_xact), and how VACUUM FREEZE prevents data loss.",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "32-Bit Modular Arithmetic",
        body: "PostgreSQL tags `xmin`/`xmax` with 32-bit Transaction IDs (`~4.29B` values) and tracks commit status in `pg_xact` (CLOG). Using modulo-`2^32` comparison, `2.14B` XIDs are in the past and `2.14B` are in the future—so if `current_xid - xmin` exceeds `2^31`, old live rows would suddenly look 'in the future' and disappear."
      },
      {
        label: "Freezing & Safeguards",
        body: "`VACUUM` (and aggressive autovacuum at `autovacuum_freeze_max_age`, default 200M) marks old committed tuples with `HEAP_XMIN_FROZEN`, making them unconditionally visible forever. If wraparound nears `2B`, PostgreSQL refuses new writes to protect data integrity."
      }
    ]
  },
  {
    id: "m05-p1-iq-8",
    moduleNumber: 5,
    lessonId: "m05-p1",
    number: 8,
    question: "A 4 TB write-heavy PostgreSQL cluster suffers 10-second checkpoint I/O stalls, 45% dead-tuple bloat, and age(datfrozenxid) = 1.6 billion. Walk through your recovery and tuning plan.",
    difficulty: "senior-architect",
    numberedSteps: [
      {
        title: "Verify Backups & Replication Lag First",
        body: "Confirm recent physical base backup + WAL archive health so emergency maintenance has a verified rollback path."
      },
      {
        title: "Check Long-Running Transactions Pinning xmin",
        body: "Query `pg_stat_activity` for `idle in transaction` sessions or stale replication slots (`pg_replication_slots`) blocking `VACUUM` from reclaiming dead tuples."
      },
      {
        title: "Terminate Stuck Blockers Safely",
        body: "Set `idle_in_transaction_session_timeout = '30s'` and terminate orphaned sessions pinning `backend_xmin`."
      },
      {
        title: "Raise max_wal_size & Spread Checkpoints",
        body: "Increase `max_wal_size` (e.g., 32–64 GB) and set `checkpoint_completion_target = 0.9` + `checkpoint_timeout = '15min'` to eliminate FPI bursts and I/O stalls."
      },
      {
        title: "Enable WAL Compression",
        body: "Set `wal_compression = lz4` (or `zstd`) to shrink Full-Page Image size in `pg_wal` during heavy write bursts."
      },
      {
        title: "Accelerate Autovacuum Throughput",
        body: "Lower `autovacuum_vacuum_cost_delay = '2ms'` and raise `autovacuum_vacuum_cost_limit = 2000` + `maintenance_work_mem = '2GB'` so vacuum keeps pace."
      },
      {
        title: "Execute Throttled VACUUM FREEZE",
        body: "Run manual `VACUUM (VERBOSE, FREEZE)` on the oldest `relfrozenxid` tables during off-peak windows to drop `age(datfrozenxid)` well below 200M."
      },
      {
        title: "Reclaim 45% Bloat Without Full Locks",
        body: "After `VACUUM`, use `pg_repack` (or partitioned table swaps) rather than `VACUUM FULL` (`ACCESS EXCLUSIVE` lock) to shrink physical heap size online."
      },
      {
        title: "Tune fillfactor for HOT Updates",
        body: "Set `fillfactor = 80` on update-heavy ledger/status tables so non-indexed column updates stay in-page with zero index writes."
      },
      {
        title: "Monitor Visibility Map & HOT Ratio",
        body: "Track `pg_stat_user_tables` (`n_tup_hot_upd / n_tup_upd` and `n_dead_tup`) plus `pg_stat_bgwriter` / `pg_stat_checkpointer`."
      },
      {
        title: "Enforce Per-Table Autovacuum Overrides",
        body: "Set `autovacuum_vacuum_scale_factor = 0.01` on multi-hundred-GB tables so vacuum triggers after fixed millions of dead rows rather than waiting for 20% bloat."
      },
      {
        title: "Alert Early on XID Age & Checkpoint Sync",
        body: "Add alerts when `age(datfrozenxid) > 400M`, dead-tuple ratio exceeds `10%`, or `checkpoint_sync_time` spikes."
      }
    ]
  }
];
