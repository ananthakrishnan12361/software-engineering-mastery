import type { InterviewQuestion } from "@/entities/handbook";

export const m05p3Questions: InterviewQuestion[] = [
  {
    id: "m05-p3-iq-1",
    moduleNumber: 5,
    lessonId: "m05-p3",
    number: 1,
    question: "What is the difference between a standard VIEW and a MATERIALIZED VIEW in PostgreSQL, and what is required to refresh without blocking readers?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Virtual vs. Persisted",
        body: "A standard `VIEW` stores only the SQL query definition and executes dynamically against base tables on every `SELECT` (always live, no own storage). A `MATERIALIZED VIEW` stores the query result physically on disk like a table, allowing its own indexes and instant reads at the cost of staleness until refreshed."
      },
      {
        label: "Non-Blocking Refresh",
        body: "Plain `REFRESH MATERIALIZED VIEW` takes an `ACCESS EXCLUSIVE` lock, blocking all readers. Creating at least one `UNIQUE` index (with no `WHERE` clause) allows **`REFRESH MATERIALIZED VIEW CONCURRENTLY`**, which computes a diff and lets concurrent `SELECT`s continue."
      }
    ]
  },
  {
    id: "m05-p3-iq-2",
    moduleNumber: 5,
    lessonId: "m05-p3",
    number: 2,
    question: "When should you use JSONB instead of JSON in PostgreSQL?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Decomposed Binary vs. Exact Text",
        body: "`JSONB` parses input into a decomposed binary format on write, stripping whitespace, sorting keys, and deduplicating keys (last key wins). `JSON` stores the exact raw UTF-8 string, preserving whitespace, key order, and duplicate keys."
      },
      {
        label: "Querying & Indexing",
        body: "Default to **`JSONB`** for almost all application data because it avoids reparsing on every read and supports **GIN** indexes for fast `@>` containment queries. Use `JSON` only when legal/audit archival requires preserving exact raw formatting."
      }
    ]
  },
  {
    id: "m05-p3-iq-3",
    moduleNumber: 5,
    lessonId: "m05-p3",
    number: 3,
    question: "Compare PostgreSQL Functions (CREATE FUNCTION) and Stored Procedures (CREATE PROCEDURE), including volatility categories.",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "Transaction Control",
        body: "Functions run via `SELECT` inside the caller's single transaction and cannot issue `COMMIT` or `ROLLBACK`. Stored procedures (PG 11+) are invoked via `CALL` and can `COMMIT`/`ROLLBACK` inside loops—making them ideal for batched multi-million-row backfills."
      },
      {
        label: "Function Volatility",
        body: "Tag functions accurately as `IMMUTABLE` (deterministic, required for expression indexes), `STABLE` (constant within one query/snapshot), or `VOLATILE` (default, allows side effects or varying results like `random()`)."
      }
    ]
  },
  {
    id: "m05-p3-iq-4",
    moduleNumber: 5,
    lessonId: "m05-p3",
    number: 4,
    question: "Explain BEFORE vs. AFTER triggers and FOR EACH ROW vs. FOR EACH STATEMENT in PostgreSQL.",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "BEFORE vs. AFTER",
        body: "`BEFORE` row triggers run before table constraints and can normalize/modify `NEW` (e.g., `NEW.updated_at := now()`) or return `NULL` to skip the operation. `AFTER` triggers run only after constraints pass, making them safe for immutable audit logging."
      },
      {
        label: "ROW vs. STATEMENT",
        body: "`FOR EACH ROW` fires once per affected tuple, whereas `FOR EACH STATEMENT` fires once per SQL statement and can read `REFERENCING NEW TABLE AS ...` transition tables—dramatically reducing overhead on bulk updates."
      }
    ]
  },
  {
    id: "m05-p3-iq-5",
    moduleNumber: 5,
    lessonId: "m05-p3",
    number: 5,
    question: "How does an Exclusion Constraint (EXCLUDE USING gist) work, and when do you use DEFERRABLE constraints?",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Range Overlap Prevention",
        body: "`UNIQUE` only checks equality (`=`), which cannot stop overlapping `[start, end)` calendar bookings. `EXCLUDE USING gist (room_id WITH =, during WITH &&)` uses a GiST index to reject any new row whose `during` range overlaps (`&&`) an existing row for the same `room_id`—atomically preventing double-bookings."
      },
      {
        label: "Deferrable Constraints",
        body: "Marking a `UNIQUE` or `FOREIGN KEY` constraint `DEFERRABLE INITIALLY DEFERRED` postpones validation until `COMMIT`, allowing temporary intermediate swaps (like renumbering `position = 1 <-> 2`) inside a single transaction."
      }
    ]
  },
  {
    id: "m05-p3-iq-6",
    moduleNumber: 5,
    lessonId: "m05-p3",
    number: 6,
    question: "Compare GIN jsonb_ops vs. jsonb_path_ops vs. B-tree expression indexes for JSONB queries.",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "GIN Operator Classes",
        body: "Default `GIN (payload)` (`jsonb_ops`) indexes every key and value independently, supporting `?`, `?&`, `?|`, and `@>`. `GIN (payload jsonb_path_ops)` hashes full root-to-leaf paths, shrinking index size by ~30–50% and accelerating `@>` containment queries."
      },
      {
        label: "B-Tree Expression Index",
        body: "If queries filter or sort on one known scalar field (e.g., `payload->>'tenant_id'` or `(payload->>'created_ts')::timestamptz`), a targeted B-tree expression index is far smaller and supports range (`>`, `<`) and `ORDER BY`."
      }
    ]
  },
  {
    id: "m05-p3-iq-7",
    moduleNumber: 5,
    lessonId: "m05-p3",
    number: 7,
    question: "Why did PostgreSQL 15 introduce security_invoker = true on Views, and how do you harden SECURITY DEFINER functions?",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "View RLS Bypass Risk",
        body: "Historically, PostgreSQL views accessed base tables using the view *owner's* permissions, which could silently bypass Row-Level Security (RLS) policies intended for the calling role. Setting `WITH (security_invoker = true)` checks permissions and RLS as the **invoking user**."
      },
      {
        label: "Hardening SECURITY DEFINER",
        body: "For privileged `SECURITY DEFINER` functions, always pin `SET search_path = pg_catalog, public` (or explicit schema) to block search-path shadowing attacks, and `REVOKE ALL ON FUNCTION ... FROM PUBLIC`."
      }
    ]
  },
  {
    id: "m05-p3-iq-8",
    moduleNumber: 5,
    lessonId: "m05-p3",
    number: 8,
    question: "Design a multi-tenant PostgreSQL event & booking platform combining JSONB + GIN, Exclusion Constraints, security_invoker views, concurrent MatViews, and batched Procedures.",
    difficulty: "senior-architect",
    numberedSteps: [
      {
        title: "Model Bookings With TSTZRANGE & Exclusion",
        body: "Store `during TSTZRANGE NOT NULL` on `bookings` and enforce `EXCLUDE USING gist (tenant_id WITH =, room_id WITH =, during WITH &&)` via `btree_gist` to block double-bookings atomically."
      },
      {
        title: "Store Flexible Payloads in JSONB",
        body: "Use `JSONB NOT NULL` on `webhook_events` so duplicate keys are collapsed and binary traversal avoids text reparsing."
      },
      {
        title: "Index Containment With jsonb_path_ops",
        body: "Create `CREATE INDEX CONCURRENTLY idx_events_gin ON webhook_events USING GIN (payload jsonb_path_ops)` for compact, fast `@>` filtering."
      },
      {
        title: "Add B-Tree Expression Indexes for Hot Keys",
        body: "Add targeted B-tree expression indexes on `(payload->>'event_type')` where range or `ORDER BY` queries target fixed fields."
      },
      {
        title: "Enforce Tenant Isolation via RLS + security_invoker",
        body: "Enable Row-Level Security on base tables and define tenant-facing views `WITH (security_invoker = true)` so caller policies are never bypassed."
      },
      {
        title: "Add Lightweight BEFORE/AFTER Triggers",
        body: "Use a `BEFORE UPDATE` trigger to stamp `updated_at` and an `AFTER` statement trigger (`REFERENCING NEW TABLE`) for bulk-friendly audit logs."
      },
      {
        title: "Build Dashboard Rollups as Materialized Views",
        body: "Pre-aggregate `mv_tenant_daily_stats` as a Materialized View with a `UNIQUE (tenant_id, day)` index."
      },
      {
        title: "Schedule Non-Blocking Concurrent Refreshes",
        body: "Run `REFRESH MATERIALIZED VIEW CONCURRENTLY mv_tenant_daily_stats` on a cadence so dashboard readers never hit `ACCESS EXCLUSIVE` locks."
      },
      {
        title: "Implement Batched Backfills as Procedures",
        body: "Use `CREATE PROCEDURE backfill_events(...)` with keyset pagination (`5,000` rows/batch) and explicit `COMMIT` per iteration."
      },
      {
        title: "Roll Out New Constraints With NOT VALID",
        body: "Add new `CHECK` or `FOREIGN KEY` rules with `NOT VALID` followed by `VALIDATE CONSTRAINT` to avoid blocking live booking traffic."
      },
      {
        title: "Harden Any Privileged Functions",
        body: "Pin `SET search_path = pg_catalog, public` and least-privilege `EXECUTE` grants on all `SECURITY DEFINER` helpers."
      },
      {
        title: "Monitor Index Size, Refresh Time & Vacuum",
        body: "Track GIN pending-list cleanup (`gin_pending_list_limit`), `mv` refresh duration, and dead-tuple bloat on high-churn booking tables."
      }
    ]
  }
];
