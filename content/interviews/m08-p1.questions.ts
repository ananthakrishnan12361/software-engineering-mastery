import type { InterviewQuestion } from "@/entities/handbook";

export const m08p1Questions: InterviewQuestion[] = [
  {
    id: "m08-p1-iq-1",
    moduleNumber: 8,
    lessonId: "m08-p1",
    number: 1,
    question: "Why do databases use indexes, and what are the trade-offs of adding one?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "What an index buys you",
        body: "Without an index the engine must run a **full table scan**: read every page and test every row, so cost grows linearly with table size. An index is a sorted structure (normally a **B+ Tree**) that maps key values to row locations, so a lookup costs one page read per tree level, usually 3 or 4 even for hundreds of millions of rows. It also provides sorted output and cheap uniqueness checks."
      },
      {
        label: "What an index costs you",
        body: "Every index consumes **disk space and buffer pool memory**, and every `INSERT`, `DELETE` and indexed-column `UPDATE` must also modify each index (**write amplification**). A predicate that matches a large share of the table is often faster as a sequential scan, so an index is not automatically used. Add indexes for measured query patterns and verify them with `EXPLAIN`."
      }
    ]
  },
  {
    id: "m08-p1-iq-2",
    moduleNumber: 8,
    lessonId: "m08-p1",
    number: 2,
    question: "What is the difference between a clustered and a non-clustered index?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Clustered: the table is the index",
        body: "A **clustered index** stores the full rows in the leaf level of the B+ Tree, ordered by the clustering key, so there can be only one per table. InnoDB always clusters on the primary key; SQL Server clusters on the primary key by default but lets you choose another column. PostgreSQL has no maintained clustered index because its tables are heaps."
      },
      {
        label: "Non-clustered: a second tree that points back",
        body: "A **non-clustered (secondary) index** is a separate B+ Tree whose leaves hold the indexed columns plus a row locator: the primary key in InnoDB, the clustering key or row id in SQL Server, a TID in PostgreSQL. Lookups cost an extra hop per matching row unless the index covers the query, and a table can have many of them."
      }
    ]
  },
  {
    id: "m08-p1-iq-3",
    moduleNumber: 8,
    lessonId: "m08-p1",
    number: 3,
    question: "When would you choose a hash index over a B-Tree index, and what can a hash index not do?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Where hash indexes fit",
        body: "A hash index maps a key through a hash function to a bucket, so an **equality** lookup is O(1) on average regardless of table size. It suits lookups that are always `column = value`, such as session tokens or idempotency keys, on engines with good support: PostgreSQL (`USING hash`, crash-safe since version 10), the MySQL MEMORY engine, SQL Server memory-optimized tables, and MongoDB hashed indexes."
      },
      {
        label: "What hashing gives up",
        body: "Hashing destroys ordering, so a hash index cannot serve ranges, `BETWEEN`, prefix `LIKE`, `ORDER BY` or partial composite keys, and PostgreSQL hash indexes cannot enforce uniqueness. InnoDB ignores `USING HASH` and builds a B-Tree. Because a B-Tree handles equality almost as cheaply and also supports ranges and ordering, it is the safe default."
      }
    ]
  },
  {
    id: "m08-p1-iq-4",
    moduleNumber: 8,
    lessonId: "m08-p1",
    number: 4,
    question: "Why do relational databases implement B+ Trees instead of classic B-Trees for indexes?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "Higher fan-out and predictable cost",
        body: "In a B+ Tree the internal nodes hold only routing keys and child pointers; row locators live only in the leaves. More keys fit per page, so the **fan-out is higher** and the tree is shallower (fewer page reads). Every lookup, hit or miss, descends to a leaf, so latency is uniform instead of varying with where the key happens to sit."
      },
      {
        label: "Sequential range scans",
        body: "Leaves are linked by sibling pointers, so a range query seeks once to the lower bound and then reads leaves in order, with no climbing back up the tree. A classic B-Tree needs an in-order traversal across levels. The only B-Tree advantage, finding a key in an internal node slightly earlier, is outweighed by these gains, which is why InnoDB, SQL Server and PostgreSQL's `btree` are all B+ Tree variants."
      }
    ]
  },
  {
    id: "m08-p1-iq-5",
    moduleNumber: 8,
    lessonId: "m08-p1",
    number: 5,
    question: "A column is indexed, yet EXPLAIN shows a sequential scan. Why might the planner ignore the index?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "Cost and statistics reasons",
        body: "The planner picks the cheapest plan by estimated cost. If the predicate matches a **large share of the table**, the index probes and row fetches (random I/O) cost more than one sequential pass, so a scan wins. Tiny tables fit in a few pages and are cheaper to scan. **Stale statistics** make the planner misjudge selectivity, so run `ANALYZE` (PostgreSQL), `ANALYZE TABLE` (MySQL) or update statistics (SQL Server)."
      },
      {
        label: "Predicate-shape reasons and fixes",
        body: "The index cannot be used when the column is wrapped in a function (`WHERE LOWER(email) = ...`), compared with an implicit type conversion, or matched with a leading wildcard (`LIKE '%abc'`). Fixes: rewrite the predicate so the bare column is compared (**sargable**), build an expression index, align types, or, on SSDs, lower PostgreSQL's `random_page_cost` from its default of 4 so the cost model reflects the hardware."
      }
    ]
  },
  {
    id: "m08-p1-iq-6",
    moduleNumber: 8,
    lessonId: "m08-p1",
    number: 6,
    question: "How do unique indexes treat NULLs in PostgreSQL, MySQL and SQL Server, and how do you enforce uniqueness safely under concurrency?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "NULL and collation semantics",
        body: "PostgreSQL and MySQL treat NULLs as distinct, so a unique index allows many NULLs (PostgreSQL 15 adds `NULLS NOT DISTINCT` to change that). SQL Server treats NULLs as equal, so a unique index allows only one NULL (use a filtered unique index to allow many). Collation also matters: MySQL's default case-insensitive collation makes `Ann` and `ann` duplicates, while PostgreSQL's default does not, so normalise values or use an expression index."
      },
      {
        label: "Race-free enforcement",
        body: "An application check of the form select-then-insert has a race window where two sessions both see no row. A `UNIQUE` constraint or index makes the probe and the write atomic: the second inserter blocks until the first commits (then fails with MySQL `1062`, PostgreSQL `23505`, SQL Server `2601`/`2627`) or rolls back (then succeeds). Handle the error, return `409 Conflict`, and use `INSERT ... ON CONFLICT` or `MERGE` carefully for upserts."
      }
    ]
  },
  {
    id: "m08-p1-iq-7",
    moduleNumber: 8,
    lessonId: "m08-p1",
    number: 7,
    question: "How do random UUID primary keys affect a clustered table in InnoDB compared with a PostgreSQL heap?",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "InnoDB and SQL Server: the table itself fragments",
        body: "In a clustered engine the primary key orders the table's physical B+ Tree, so UUIDv4 values insert at random positions: constant **page splits**, pages around 70 percent full, a larger working set in the buffer pool, and slower inserts. The primary key is also copied into every secondary index entry, so a 16-byte binary or 36-character text UUID inflates all of them. SQL Server behaves the same with a clustered `NEWID()` key."
      },
      {
        label: "PostgreSQL: only the key index suffers",
        body: "A PostgreSQL heap appends rows wherever free space exists, so the table stays compact; only the primary-key B-Tree sees random inserts and some bloat. Mitigations across engines: use an ascending `BIGINT` surrogate key and keep the UUID as a unique secondary column (`BINARY(16)` in MySQL), or use time-ordered UUIDs such as UUIDv7 (RFC 9562), MySQL's `UUID_TO_BIN(UUID(), 1)` swap flag, or SQL Server `NEWSEQUENTIALID()`."
      }
    ]
  },
  {
    id: "m08-p1-iq-8",
    moduleNumber: 8,
    lessonId: "m08-p1",
    number: 8,
    question: "Trace a secondary-index lookup in InnoDB, SQL Server and PostgreSQL. How does the row locator change the cost and the index design?",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Three locator designs",
        body: "InnoDB's secondary leaf stores the **primary key value**, so each match requires a seek in the clustered tree: about `secondaryHeight + matches * clusteredHeight` page reads. SQL Server stores the **clustering key** (a key lookup) or, for a heap, an 8-byte **RID** pointing straight at the page and slot. PostgreSQL stores a **TID** (heap block and offset), so each match costs one heap fetch plus an MVCC visibility check, and an index-only scan also needs the visibility map to be current."
      },
      {
        label: "Design consequences",
        body: "Because a key lookup per match dominates cost, queries that return many rows through a secondary index are good candidates for a **covering index**: `INCLUDE` columns in SQL Server and PostgreSQL 11+, extra key columns in MySQL. The locator also sizes the index: a wide primary key makes every InnoDB or SQL Server secondary index larger, while PostgreSQL's fixed 6-byte TID is unaffected by key width. Row movement matters too: a PostgreSQL update that moves a row normally needs new entries in every index unless it is a HOT update."
      }
    ]
  },
  {
    id: "m08-p1-iq-9",
    moduleNumber: 8,
    lessonId: "m08-p1",
    number: 9,
    question: "Walk through a B+ Tree leaf split and explain its effect on write amplification, fill factor and fragmentation.",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Mechanics of a split",
        body: "When an insert targets a full leaf, the engine allocates a new page, moves about half of the entries into it, links it into the sibling chain, and **copies** the first key of the new page up to the parent as a separator. If the parent is full it splits too, but an internal split **moves** the middle key up; a root split adds a level. Each split writes at least three pages (old leaf, new leaf, parent) plus log records."
      },
      {
        label: "Fill factor and fragmentation",
        body: "Random inserts leave pages about 70 percent full on average, wasting space and cache, while ascending inserts fill pages almost completely (engines optimise the rightmost split so the old page stays dense). A lower **fill factor** (PostgreSQL B-Tree default 90, `innodb_fill_factor`, SQL Server `FILLFACTOR`) reserves room for future inserts and updates, trading space for fewer splits. Splits scatter logically adjacent pages across the file, hurting scan read-ahead until the index is rebuilt or reorganised."
      }
    ]
  },
  {
    id: "m08-p1-iq-10",
    moduleNumber: 8,
    lessonId: "m08-p1",
    number: 10,
    question: "As a senior architect, choose the primary key and clustering strategy for a multi-tenant events table growing to 2 billion rows across MySQL, SQL Server and PostgreSQL.",
    difficulty: "senior-architect",
    numberedSteps: [
      {
        title: "Problem",
        body: "A multi-tenant `events` table ingests append-heavy data, is queried mostly by tenant and time range, and must enforce an idempotency key. The primary key and clustering decision will shape insert speed, index size and query latency for years."
      },
      {
        title: "Constraints & Scale",
        body: "2 billion rows today, tens of thousands of inserts per second at peak, a few very large tenants (hot tenants), p99 read latency under 50 ms, 13-month retention, and an engine mix of MySQL/InnoDB, SQL Server and PostgreSQL with different physical storage models."
      },
      {
        title: "Access Pattern Inventory",
        body: "List the real queries first: lookup by `(tenant_id, event_id)`, range scans by `(tenant_id, occurred_at)`, idempotent insert by `(tenant_id, idempotency_key)`, and rare cross-tenant analytics. Indexes follow these patterns, not the schema diagram."
      },
      {
        title: "Separate Identity from Clustering",
        body: "Use a compact, ascending surrogate (an 8-byte `BIGINT` identity or Snowflake-style id, or a 16-byte time-ordered UUIDv7 stored as `BINARY(16)`) as the row identity. Avoid UUIDv4 as the clustering key because random inserts cause page splits and fragmentation in clustered engines."
      },
      {
        title: "InnoDB and SQL Server Clustering Choice",
        body: "Cluster on `(tenant_id, event_id)` so each tenant's rows are physically adjacent and tenant range scans are sequential, accepting that every secondary index carries both columns. Keep the key narrow (two compact columns, for example two 8-byte integers) because it is copied into all secondary entries."
      },
      {
        title: "PostgreSQL Heap Choice",
        body: "PostgreSQL has no maintained clustered index, so keep an ascending primary key B-Tree plus a `(tenant_id, occurred_at)` B-Tree for range queries. For very large append-only time-ordered data, consider a BRIN index on `occurred_at` and partitioning for retention."
      },
      {
        title: "Uniqueness Rules",
        body: "Enforce idempotency with a unique index on `(tenant_id, idempotency_key)` and handle the duplicate-key error as success for retries. Decide NULL semantics up front: SQL Server allows only one NULL in a unique index, so make the column `NOT NULL` or use a filtered unique index."
      },
      {
        title: "Index Budget",
        body: "Cap secondary indexes (for example three) because each one multiplies write cost and buffer pool use at this insert rate. Make hot-path indexes covering where a key lookup per match would dominate, and review `pg_stat_user_indexes` or `sys.dm_db_index_usage_stats` quarterly for unused indexes."
      },
      {
        title: "Hot-Spot and Skew Risks",
        body: "With a tenant-first clustering key each tenant has its own hot right edge, and a single giant tenant can concentrate inserts on one leaf and cause latch contention at extreme rates; a purely ascending key would instead hammer one global rightmost leaf. Mitigate with partitioning, hash-bucketed or per-tenant sharding, and batch inserts."
      },
      {
        title: "Validation Plan",
        body: "Load a production-sized copy, replay the real query mix, and compare `EXPLAIN (ANALYZE, BUFFERS)`, `EXPLAIN ANALYZE` or actual execution plans with `STATISTICS IO` for reads per query, plus insert throughput and index size for each candidate key design."
      },
      {
        title: "Rollout & Migration",
        body: "Changing a clustering key rewrites the table, so deploy it on new partitions or a new table with dual writes and a backfill (gh-ost or pt-online-schema-change for MySQL, online index operations for SQL Server, logical replication or partition swap for PostgreSQL) and cut over behind a flag."
      },
      {
        title: "Monitoring & Rollback",
        body: "Track insert latency, page splits per second, index and table size growth, buffer pool hit ratio, replication lag and p99 query latency per tenant tier. Keep the old table or partition for a retention window so the cutover can be reversed without data loss."
      }
    ]
  }
];
