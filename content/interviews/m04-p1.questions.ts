import type { InterviewQuestion } from "@/entities/handbook";

export const m04p1Questions: InterviewQuestion[] = [
  {
    id: "m04-p1-iq-1",
    moduleNumber: 4,
    lessonId: "m04-p1",
    number: 1,
    question: "What is a database, and why can't a production backend just store data in JSON or CSV files on disk?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Direct Answer",
        body: "A database (DBMS) persists data on disk while providing indexed fast queries, multi-user concurrency control, crash recovery via a Write-Ahead Log (WAL), and enforced integrity constraints."
      },
      {
        label: "Why Files Fail",
        body: "Plain JSON/CSV files suffer lost updates under concurrent writes, risk partial corruption on power loss, and require scanning the entire file (`O(n)`) for simple lookups."
      }
    ]
  },
  {
    id: "m04-p1-iq-2",
    moduleNumber: 4,
    lessonId: "m04-p1",
    number: 2,
    question: "What is the difference between a Primary Key, a Foreign Key, a Unique constraint, and a Check constraint?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Identity & Uniqueness",
        body: "A `PRIMARY KEY` uniquely identifies every row in a table (`UNIQUE + NOT NULL`). A `UNIQUE` constraint prevents duplicate values in a column or column tuple (like `email` or `(tenant_id, slug)`), though SQL allows multiple `NULL`s unless specified otherwise."
      },
      {
        label: "Relationships & Invariants",
        body: "A `FOREIGN KEY` enforces referential integrity by requiring child values to match an existing parent key. A `CHECK` constraint enforces arbitrary boolean row invariants (such as `quantity > 0` or `total_cents >= 0`) on every `INSERT` and `UPDATE`."
      }
    ]
  },
  {
    id: "m04-p1-iq-3",
    moduleNumber: 4,
    lessonId: "m04-p1",
    number: 3,
    question: "In an ER diagram, how do you model 1:1, 1:N, and M:N relationships in relational tables?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "1:1 and 1:N",
        body: "For `1:N` (`users` -> `orders`), place the `FOREIGN KEY` (`user_id`) on the `N` (child) side. For `1:1` (`users` -> `profiles`), place the `FOREIGN KEY` on the dependent table with a `UNIQUE` constraint on that FK."
      },
      {
        label: "M:N Junction Tables",
        body: "For `M:N` (`orders` <-> `products`), create a **junction (join) table** (`order_items`) containing foreign keys to both parents (`order_id`, `product_id`) and a composite `PRIMARY KEY (order_id, product_id)`."
      }
    ]
  },
  {
    id: "m04-p1-iq-4",
    moduleNumber: 4,
    lessonId: "m04-p1",
    number: 4,
    question: "Why should monetary values never use FLOAT/DOUBLE columns, and why should timestamps use TIMESTAMPTZ?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Exact Money Representation",
        body: "`FLOAT` and `DOUBLE` use binary IEEE-754 floating-point arithmetic, where decimal fractions like `0.1 + 0.2` introduce rounding errors. Store money as exact integer minor units (`BIGINT` cents) or fixed-precision `NUMERIC(12, 2)`."
      },
      {
        label: "Timezone-Safe Dates",
        body: "`TIMESTAMPTZ` (timestamp with time zone) normalizes values to UTC on storage so server timezone changes or multi-region clients never misinterpret historical timestamps."
      }
    ]
  },
  {
    id: "m04-p1-iq-5",
    moduleNumber: 4,
    lessonId: "m04-p1",
    number: 5,
    question: "Why is checking uniqueness with SELECT + INSERT in application code unsafe compared to a database UNIQUE constraint?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "TOCTOU Race Condition",
        body: "If two concurrent requests both run `SELECT id FROM users WHERE email = $1` at the same millisecond, both see `0 rows` and both proceed to `INSERT`—creating duplicate accounts."
      },
      {
        label: "Atomic Engine Enforcement",
        body: "A database `UNIQUE` index acquires internal index-page latches/locks atomically, guaranteeing at most one transaction succeeds while the other fails cleanly with a unique-violation error (`23505`)."
      }
    ]
  },
  {
    id: "m04-p1-iq-6",
    moduleNumber: 4,
    lessonId: "m04-p1",
    number: 6,
    question: "Compare Surrogate Keys (BIGINT identity / UUIDv7) vs. Natural Keys vs. random UUIDv4 as Primary Keys.",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "Surrogate vs. Natural Keys",
        body: "Natural keys (`email`, `ssn`) carry business meaning, can change over time (forcing cascading FK updates), and risk leaking PII in URLs. Surrogate keys (`id`) stay immutable."
      },
      {
        label: "UUIDv4 vs. Sequential BIGINT / UUIDv7",
        body: "Random `UUIDv4` inserts jump across random B-tree leaf pages, causing page splits, cache misses, and write amplification at millions of rows. Sequential `BIGINT` or time-ordered `UUIDv7` keys append cleanly to the rightmost B-tree page."
      }
    ]
  },
  {
    id: "m04-p1-iq-7",
    moduleNumber: 4,
    lessonId: "m04-p1",
    number: 7,
    question: "Explain the trade-offs between Relational (SQL) and NoSQL databases—when should you pick each?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "When Relational Wins",
        body: "Choose an RDBMS (PostgreSQL, MySQL) when entities have many relationships, strict ACID/referential invariants, or evolving ad-hoc queries—such as e-commerce orders, banking ledgers, and multi-tenant SaaS."
      },
      {
        label: "When NoSQL Fits",
        body: "Choose specialized NoSQL stores when access patterns are fixed and match the engine's strength: Redis for sub-ms key-value caching, Cassandra for massive write-heavy time-series partitioning, or MongoDB for self-contained hierarchical documents."
      }
    ]
  },
  {
    id: "m04-p1-iq-8",
    moduleNumber: 4,
    lessonId: "m04-p1",
    number: 8,
    question: "Walk through the internal architecture of a database server from receiving a SQL query to persisting bytes on disk.",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Connection & Query Pipeline",
        body: "The Connection Manager authenticates the client socket; the Parser builds an AST; the Query Optimizer estimates costs using table statistics to pick index scans and join strategies; and the Execution Engine streams tuples."
      },
      {
        label: "Buffer Pool & WAL Durability",
        body: "Reads and writes operate on 8–16 KB pages cached in the RAM **Buffer Pool**. Before modified dirty pages are flushed to main table files, the engine appends changes sequentially to the **Write-Ahead Log (WAL)** and `fsync`s it so committed transactions survive crashes."
      }
    ]
  },
  {
    id: "m04-p1-iq-9",
    moduleNumber: 4,
    lessonId: "m04-p1",
    number: 9,
    question: "Compare B-Tree vs. LSM-Tree storage engines in terms of write amplification, read amplification, and compaction.",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "B-Tree Trade-Offs",
        body: "B-Tree engines (PostgreSQL indexes, InnoDB) update fixed-size pages in place. Point reads and range scans are fast and predictable (`O(log n)`), but random writes dirty entire 8–16 KB pages even for small updates."
      },
      {
        label: "LSM-Tree Trade-Offs",
        body: "LSM-Tree engines (RocksDB, Cassandra) buffer writes in a RAM **MemTable** + sequential WAL and flush immutable sorted **SSTables**—yielding very high write throughput. However, reads may probe multiple SSTables (mitigated by Bloom filters) and background compaction consumes CPU and disk I/O."
      }
    ]
  },
  {
    id: "m04-p1-iq-10",
    moduleNumber: 4,
    lessonId: "m04-p1",
    number: 10,
    question: "How do Foreign Key ON DELETE actions (RESTRICT, CASCADE, SET NULL) and missing FK indexes impact production systems?",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Choosing Safe Delete Semantics",
        body: "Use `ON DELETE RESTRICT` on business-critical histories (`users -> orders`) so accidental user deletion fails instead of wiping financial records. Reserve `ON DELETE CASCADE` for tightly owned sub-records (`orders -> order_items`) and `SET NULL` for optional references."
      },
      {
        label: "Missing Child FK Index Trap",
        body: "PostgreSQL does not automatically create an index on a child `FOREIGN KEY` column. Without an index on `orders(user_id)`, deleting or updating a parent `users` row triggers a full sequential scan of `orders` while holding locks."
      }
    ]
  },
  {
    id: "m04-p1-iq-11",
    moduleNumber: 4,
    lessonId: "m04-p1",
    number: 11,
    question: "Design a conceptual, logical, and physical data model for a multi-tenant B2B SaaS invoicing and payments system.",
    difficulty: "senior-architect",
    numberedSteps: [
      { title: "Conceptual Entities", body: "Identify core entities: `tenants`, `users`, `customers`, `invoices`, `invoice_items`, `products`, and `payments`." },
      { title: "ER Cardinalities", body: "Model `tenants (1:N)` to all resources, `invoices (M:N) products` via `invoice_items`, and `invoices (1:N) payments` (supporting partial payments)." },
      { title: "Surrogate Primary Keys", body: "Use `BIGINT GENERATED ALWAYS AS IDENTITY` or time-sorted `UUIDv7` primary keys to avoid B-tree page-split fragmentation." },
      { title: "Exact Monetary & Time Types", body: "Store all amounts as `BIGINT` minor units (`total_cents`) with `currency CHAR(3)` and all dates as UTC `TIMESTAMPTZ`." },
      { title: "Tenant-Scoped Uniqueness", body: "Enforce composite `UNIQUE (tenant_id, invoice_number)` so each tenant maintains independent invoice numbering." },
      { title: "Referential Integrity", body: "Apply `ON DELETE RESTRICT` on `invoices -> payments` and `customers -> invoices`, reserving `CASCADE` only for draft `invoice_items`." },
      { title: "Engine Check Constraints", body: "Enforce `CHECK (quantity > 0)`, `CHECK (amount_cents > 0)`, and `CHECK (due_at >= issued_at)` directly in DDL." },
      { title: "Index Child Foreign Keys", body: "Create composite indexes starting with `tenant_id` on every child FK (`(tenant_id, customer_id)`, `(tenant_id, invoice_id)`)." },
      { title: "Row-Oriented OLTP Engine", body: "Choose a relational B-Tree engine (PostgreSQL) for ACID transactions, multi-table joins, and strict constraint enforcement." },
      { title: "Audit & Soft-Delete Policy", body: "Protect financial rows from hard deletion using `RESTRICT` + immutable ledger entries or `voided_at` timestamps." },
      { title: "Least-Privilege Roles", body: "Separate DDL migration credentials from runtime API roles so application bugs cannot alter or drop constraints." },
      { title: "Migration Verification", body: "Test schema migrations, FK constraints, and unique-violation handling against a real containerized database in CI." }
    ]
  },
  {
    id: "m04-p1-iq-12",
    moduleNumber: 4,
    lessonId: "m04-p1",
    number: 12,
    question: "Architect a polyglot persistence strategy for a platform handling both strict financial orders and high-volume IoT telemetry.",
    difficulty: "senior-architect",
    numberedSteps: [
      { title: "Separate Workload Profiles", body: "Classify workloads into low-latency transactional OLTP (orders, billing) vs. massive append-only time-series telemetry." },
      { title: "Relational Core for OLTP", body: "Place `users`, `orders`, `order_items`, and `payments` in a B-Tree relational DB (PostgreSQL) for joins, `FOREIGN KEY`s, and ACID guarantees." },
      { title: "LSM Engine for Telemetry", body: "Route 100k+ writes/sec sensor readings to an LSM-Tree wide-column or time-series store (Cassandra / Timescale) optimized for sequential writes." },
      { title: "Avoid Premature Polyglot", body: "Keep data in one RDBMS until measured write IOPS, table size, or partition throughput proves a second engine is justified." },
      { title: "Size Buffer Pool & Pages", body: "Keep OLTP column types compact (`INTEGER`/`BIGINT`) so active working sets stay warm in Buffer Pool RAM." },
      { title: "Prevent LSM Read Spikes", body: "Configure Bloom filters and time-windowed compaction/partitioning on the telemetry store to bound SSTable read probes." },
      { title: "Define Source of Truth", body: "Assign each entity exactly one owning database so cross-store copies never create split-brain truth." },
      { title: "Outbox Event Bridge", body: "Use a Transactional Outbox in PostgreSQL when order events must asynchronously sync summary metrics to analytics/search." },
      { title: "Retention & TTL Policies", body: "Attach automatic time-based partition drops or TTLs to telemetry tables so storage never grows unboundedly." },
      { title: "Backup & PITR Parity", body: "Ensure WAL-based Point-in-Time Recovery (PITR) for the relational core and automated snapshots for telemetry nodes." },
      { title: "Monitor Engine Metrics", body: "Track Buffer Pool hit ratio, WAL fsync latency, and LSM compaction backlog separately per engine." },
      { title: "Document Access Contracts", body: "Expose each store behind clear repository/service interfaces so downstream consumers stay decoupled from storage internals." }
    ]
  }
];
