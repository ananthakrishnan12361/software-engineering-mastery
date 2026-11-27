import type { InterviewQuestion } from "@/entities/handbook";

export const m04p2Questions: InterviewQuestion[] = [
  {
    id: "m04-p2-iq-1",
    moduleNumber: 4,
    lessonId: "m04-p2",
    number: 1,
    question: "What is database normalization, and what three anomalies does it prevent?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Direct Answer",
        body: "Normalization structures relational tables so every fact is stored once without unnecessary redundancy. It prevents **insertion anomalies** (unable to record a product until an order exists), **update anomalies** (updating one duplicated copy leaves stale copies behind), and **deletion anomalies** (deleting an order erases customer/product details)."
      },
      {
        label: "Practical Baseline",
        body: "Most transactional OLTP applications normalize schemas to **3NF** or **BCNF** by default."
      }
    ]
  },
  {
    id: "m04-p2-iq-2",
    moduleNumber: 4,
    lessonId: "m04-p2",
    number: 2,
    question: "What does First Normal Form (1NF) require, and why are comma-separated lists in a column an anti-pattern?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "1NF Rules",
        body: "1NF requires every cell to hold a single **atomic** scalar value, with no repeating column groups (`tag1, tag2, tag3`) and a unique Primary Key identifying each row."
      },
      {
        label: "Why CSV Columns Hurt",
        body: "Storing `\"sql,node,react\"` in one column prevents `FOREIGN KEY` enforcement, breaks B-tree index lookups (forcing `LIKE '%sql%'` scans), and complicates atomic additions or removals—fix it with a normalized child/junction table (`post_tags`)."
      }
    ]
  },
  {
    id: "m04-p2-iq-3",
    moduleNumber: 4,
    lessonId: "m04-p2",
    number: 3,
    question: "What is denormalization, and when is it justified in production?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Direct Answer",
        body: "Denormalization intentionally duplicates derived or joined data (such as caching `like_count` on `posts` or `total_cents` on `orders`) to eliminate expensive `JOIN`s or `COUNT(*)`/`SUM()` scans on hot read paths."
      },
      {
        label: "When It Is Justified",
        body: "Only apply denormalization *after* profiling shows normalized joins/aggregations are a bottleneck, and always pair it with a clear sync mechanism (single DB transaction, trigger, or async outbox/materialized view)."
      }
    ]
  },
  {
    id: "m04-p2-iq-4",
    moduleNumber: 4,
    lessonId: "m04-p2",
    number: 4,
    question: "Explain Second Normal Form (2NF) with a concrete composite-key violation example.",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "No Partial Dependencies",
        body: "A table in 1NF is in **2NF** if every non-key attribute depends on the **entire** Primary Key, not just part of a composite key."
      },
      {
        label: "Concrete Example",
        body: "In `order_items(order_id, product_id, quantity, product_name)`, the PK is `(order_id, product_id)`. Because `product_name` depends only on `product_id` (partial dependency), it violates 2NF and should move into `products(id, name)`."
      }
    ]
  },
  {
    id: "m04-p2-iq-5",
    moduleNumber: 4,
    lessonId: "m04-p2",
    number: 5,
    question: "Explain Third Normal Form (3NF) and how transitive dependencies cause update anomalies.",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "No Transitive Dependencies",
        body: "A table in 2NF is in **3NF** when no non-key column depends on another non-key column (`PK -> A -> B`). Every non-key column must depend directly on the key (*\"the key, the whole key, and nothing but the key\"*)."
      },
      {
        label: "Why It Matters",
        body: "If `orders(id, customer_id, customer_email)` stores `customer_email`, changing a customer's email requires updating every historical order row. Moving `customer_email` to `customers` eliminates the anomaly."
      }
    ]
  },
  {
    id: "m04-p2-iq-6",
    moduleNumber: 4,
    lessonId: "m04-p2",
    number: 6,
    question: "Is storing unit_price_cents on order_items a denormalization violation? Explain why or why not.",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "Temporal Snapshot vs. Redundancy",
        body: "No—`order_items.unit_price_cents` is **not** a duplicate of `products.current_price_cents`. It is a distinct point-in-time historical fact (*\"the price charged when this order was placed\"*)."
      },
      {
        label: "Business Correctness",
        body: "If you omitted `unit_price_cents` and joined `products.current_price_cents`, future catalog price changes would retroactively corrupt every past customer invoice."
      }
    ]
  },
  {
    id: "m04-p2-iq-7",
    moduleNumber: 4,
    lessonId: "m04-p2",
    number: 7,
    question: "What is the exact difference between 3NF and Boyce-Codd Normal Form (BCNF)?",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Superkey Determinant Rule",
        body: "3NF allows a non-trivial functional dependency `X -> Y` if either `X` is a superkey OR `Y` is a prime attribute (part of a candidate key). **BCNF** removes that exception: for every non-trivial `X -> Y`, `X` **must** be a superkey."
      },
      {
        label: "When They Differ",
        body: "They differ only when a table has multiple overlapping composite candidate keys—such as `(student_id, course_id, instructor_id)` where each instructor teaches one course (`instructor_id -> course_id`). Decomposing `(instructor_id, course_id)` and `(student_id, instructor_id)` reaches BCNF."
      }
    ]
  },
  {
    id: "m04-p2-iq-8",
    moduleNumber: 4,
    lessonId: "m04-p2",
    number: 8,
    question: "Compare strategies for keeping denormalized counts or totals consistent in PostgreSQL/MySQL.",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Synchronous Transaction vs. Triggers",
        body: "Updating `orders.cached_total_cents` inside the exact same ACID transaction as `INSERT/UPDATE/DELETE` on `order_items` (or via a DB trigger) guarantees strong consistency, though hot parent rows (`post.like_count`) can experience row-lock contention under extreme concurrency."
      },
      {
        label: "Async Batching & Materialized Views",
        body: "For high-contention counters or complex analytics, use periodic `REFRESH MATERIALIZED VIEW CONCURRENTLY`, outbox/CDC stream workers, or sharded counter buckets summed asynchronously."
      }
    ]
  },
  {
    id: "m04-p2-iq-9",
    moduleNumber: 4,
    lessonId: "m04-p2",
    number: 9,
    question: "How does normalization affect Buffer Pool efficiency, lock contention, and GDPR/PII compliance?",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Buffer Pool & Lock Scope",
        body: "Normalized child tables avoid repeating wide text columns (`customer_address`, `bio`), packing more rows per 8–16 KB page in Buffer Pool RAM. Updating `users.email` locks 1 row in `users` instead of thousands of rows across `orders`."
      },
      {
        label: "PII & Security Hygiene",
        body: "Keeping sensitive PII in one canonical `users` table makes encryption, masking, audit logging, and GDPR right-to-erasure requests reliable without hunting down stale copies."
      }
    ]
  },
  {
    id: "m04-p2-iq-10",
    moduleNumber: 4,
    lessonId: "m04-p2",
    number: 10,
    question: "Design a schema evolution plan migrating a denormalized legacy monolith database into a clean 3NF OLTP core with fast read models.",
    difficulty: "senior-architect",
    numberedSteps: [
      { title: "Audit Functional Dependencies", body: "Map every column in legacy tables to identify repeating CSV lists (1NF), partial composite deps (2NF), and transitive deps (3NF)." },
      { title: "Design Canonical 3NF/BCNF Tables", body: "Create normalized parent/junction tables with surrogate PKs, `FOREIGN KEY`s, `UNIQUE`, and `CHECK` constraints." },
      { title: "Separate Historical Snapshots", body: "Keep immutable point-in-time columns (`unit_price_cents` on `order_items`) distinct from mutable catalog attributes." },
      { title: "Expand-and-Contract Migration", body: "Add new normalized tables alongside legacy tables without breaking live readers (zero-downtime deployment)." },
      { title: "Dual-Write in Transactions", body: "Update application services or DB triggers to write to both legacy and normalized tables inside one ACID transaction." },
      { title: "Idempotent Backfill", body: "Run chunked background backfill scripts with keyset cursors to populate normalized tables from historical rows without locking prod." },
      { title: "Parity Verification", body: "Run shadow read comparisons in production logging any discrepancy between legacy and normalized queries before switching reads." },
      { title: "Cut Over Reads & Benchmark", body: "Switch reads to normalized queries with composite indexes and measure p95/p99 via `EXPLAIN ANALYZE`." },
      { title: "Selective Read Models", body: "For proven heavy aggregations (dashboards, feeds), add indexed Materialized Views or CQRS read projections updated via Outbox/CDC." },
      { title: "Enforce Sync on Caches", body: "Ensure any kept denormalized counters update atomically on `INSERT`, `UPDATE`, and `DELETE`." },
      { title: "Centralize PII Governance", body: "Remove duplicate PII columns from child tables so GDPR erasure and masking apply to one canonical `users` table." },
      { title: "Contract Legacy Columns", body: "Drop legacy redundant columns only after monitoring confirms zero remaining readers or writers." }
    ]
  }
];
