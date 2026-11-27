import type { InterviewQuestion } from "@/entities/handbook";

export const m05p2Questions: InterviewQuestion[] = [
  {
    id: "m05-p2-iq-1",
    moduleNumber: 5,
    lessonId: "m05-p2",
    number: 1,
    question: "What is the logical execution order of a SQL SELECT query, and why can't you reference a SELECT column alias in WHERE?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Logical Pipeline",
        body: "SQL evaluates clauses logically in this sequence: `FROM` / `JOIN` -> `WHERE` -> `GROUP BY` -> `HAVING` -> `WINDOW` -> `SELECT` -> `DISTINCT` -> `ORDER BY` -> `LIMIT`/`OFFSET`."
      },
      {
        label: "Alias Visibility",
        body: "Because `WHERE` runs before `SELECT`, any alias created in `SELECT` (like `price * qty AS total`) does not exist yet during `WHERE` evaluation, whereas `ORDER BY` runs after `SELECT` and can reference the alias."
      }
    ]
  },
  {
    id: "m05-p2-iq-2",
    moduleNumber: 5,
    lessonId: "m05-p2",
    number: 2,
    question: "Explain the difference between INNER, LEFT, RIGHT, FULL, and CROSS JOIN, and identify the classic LEFT JOIN + WHERE trap.",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Join Semantics",
        body: "`INNER JOIN` keeps only matching pairs. `LEFT JOIN` keeps all left rows (`NULL`-padding unmatched right columns), `RIGHT JOIN` mirrors it for right rows, `FULL JOIN` keeps unmatched rows from both sides, and `CROSS JOIN` emits the full Cartesian product."
      },
      {
        label: "The WHERE Trap",
        body: "Filtering a right-table column in `WHERE` (e.g., `LEFT JOIN orders o ON o.user_id = u.id WHERE o.status = 'paid'`) eliminates `NULL`-padded rows and silently turns the `LEFT JOIN` into an `INNER JOIN`; move optional filters into the `ON` clause instead."
      }
    ]
  },
  {
    id: "m05-p2-iq-3",
    moduleNumber: 5,
    lessonId: "m05-p2",
    number: 3,
    question: "How does DELETE differ from TRUNCATE in PostgreSQL regarding MVCC, WAL, locks, and RETURNING?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Row-Level DELETE",
        body: "`DELETE` scans matching rows, stamps `xmax` on each tuple (creating dead MVCC tuples for `VACUUM`), logs every row deletion to WAL, supports `WHERE` and `RETURNING`, and takes a row-level lock (`ROW EXCLUSIVE` on table)."
      },
      {
        label: "Page-Level TRUNCATE",
        body: "`TRUNCATE` drops all rows in the entire table by unlinking/resetting relation files in minimal WAL without leaving dead tuples, but it cannot filter with `WHERE`, has no `RETURNING`, and requires an `ACCESS EXCLUSIVE` table lock."
      }
    ]
  },
  {
    id: "m05-p2-iq-4",
    moduleNumber: 5,
    lessonId: "m05-p2",
    number: 4,
    question: "Compare ROW_NUMBER(), RANK(), and DENSE_RANK(), and explain how Window Functions differ from GROUP BY.",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "Preserving Granularity",
        body: "`GROUP BY` collapses multiple input rows into one summary row per group, whereas a Window Function (`OVER (PARTITION BY ... ORDER BY ...)`) computes values across a partition while preserving every original row."
      },
      {
        label: "Tie Behavior (180, 180, 150)",
        body: "`ROW_NUMBER()` assigns `1, 2, 3` (unique sequential numbers), `RANK()` assigns `1, 1, 3` (leaving a gap after ties), and `DENSE_RANK()` assigns `1, 1, 2` (no gaps—ideal for Top-N distinct tiers)."
      }
    ]
  },
  {
    id: "m05-p2-iq-5",
    moduleNumber: 5,
    lessonId: "m05-p2",
    number: 5,
    question: "Why should you prefer NOT EXISTS over NOT IN in SQL subqueries?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "Three-Valued Logic NULL Trap",
        body: "In SQL, `x NOT IN (1, 2, NULL)` expands to `x <> 1 AND x <> 2 AND x <> NULL`. Because `x <> NULL` evaluates to `UNKNOWN`, the entire `AND` chain evaluates to `UNKNOWN`—causing `NOT IN` to return **zero rows** whenever the subquery returns even one `NULL`."
      },
      {
        label: "Why NOT EXISTS Is Safe",
        body: "`NOT EXISTS` tests only whether a correlated subquery emits at least one row (`TRUE`/`FALSE`), never collapsing to `UNKNOWN` on `NULL`s, and can short-circuit immediately on the first match using an index."
      }
    ]
  },
  {
    id: "m05-p2-iq-6",
    moduleNumber: 5,
    lessonId: "m05-p2",
    number: 6,
    question: "How does PostgreSQL's INSERT ... ON CONFLICT ... DO UPDATE (Upsert) prevent race conditions, and what does EXCLUDED refer to?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "Atomic Conflict Resolution",
        body: "Doing a `SELECT` followed by `INSERT` or `UPDATE` in application code races when two requests insert the same key simultaneously. `INSERT ... ON CONFLICT (key) DO UPDATE` resolves unique-index conflicts atomically inside the storage engine."
      },
      {
        label: "EXCLUDED Pseudo-Table",
        body: "Inside `DO UPDATE SET ...`, `EXCLUDED` holds the proposed row values that failed to insert (e.g., `SET hits = daily_metrics.hits + EXCLUDED.hits`), and `RETURNING` returns the final persisted row in the same round-trip."
      }
    ]
  },
  {
    id: "m05-p2-iq-7",
    moduleNumber: 5,
    lessonId: "m05-p2",
    number: 7,
    question: "When would you choose CROSS JOIN LATERAL or DISTINCT ON over a correlated subquery or GROUP BY?",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "LATERAL for Multi-Column Top-N",
        body: "A scalar subquery in `SELECT` can return only one column and one row. `CROSS JOIN LATERAL (SELECT ... WHERE o.customer_id = c.id ORDER BY o.created_at DESC LIMIT 3)` lets you return multiple columns and up to `N` rows per outer row, leveraging an index on `(customer_id, created_at DESC)`."
      },
      {
        label: "DISTINCT ON for Top-1 Per Group",
        body: "PostgreSQL's `SELECT DISTINCT ON (customer_id) ... ORDER BY customer_id, created_at DESC` cleanly grabs the single latest record per group without needing a window-function subquery wrapper."
      }
    ]
  },
  {
    id: "m05-p2-iq-8",
    moduleNumber: 5,
    lessonId: "m05-p2",
    number: 8,
    question: "How did PostgreSQL 12 change CTE materialization, and what are writable CTEs used for?",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Inlining vs. Optimization Fence",
        body: "Before PostgreSQL 12, every CTE acted as a materialized optimization fence, blocking outer `WHERE` pushdowns and index usage. Since PG 12, non-recursive, side-effect-free CTEs referenced once are **inlined (`NOT MATERIALIZED`)** by default; you can still force `AS MATERIALIZED` when caching an expensive multi-referenced subquery."
      },
      {
        label: "Writable CTEs",
        body: "PostgreSQL allows `WITH moved AS (DELETE FROM queue WHERE ... RETURNING *) INSERT INTO archive SELECT * FROM moved;`—executing both mutations atomically under a single snapshot."
      }
    ]
  },
  {
    id: "m05-p2-iq-9",
    moduleNumber: 5,
    lessonId: "m05-p2",
    number: 9,
    question: "How does WITH RECURSIVE execute internally, and how do you prevent infinite loops on cyclic graph data?",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Working-Table Iteration",
        body: "PostgreSQL evaluates the non-recursive anchor term first, places its rows in a working table and result set, then repeatedly runs the recursive term against the working table (`UNION ALL`) until an iteration produces zero new rows."
      },
      {
        label: "Cycle & Depth Guards",
        body: "If edges can form a cycle (`A -> B -> A`), track an ancestor array (`ARRAY[id] AS path`) and filter `WHERE NOT (e.id = ANY(t.path)) AND t.depth < 20`, or use PostgreSQL 14+'s built-in `CYCLE id SET is_cycle USING path` clause."
      }
    ]
  },
  {
    id: "m05-p2-iq-10",
    moduleNumber: 5,
    lessonId: "m05-p2",
    number: 10,
    question: "Refactor a broken PostgreSQL reporting and hierarchy query layer that drops zero-invoice tenants, returns 0 rows on exclusions, and stalls CPU on cyclic folders.",
    difficulty: "senior-architect",
    numberedSteps: [
      {
        title: "Diagnose the Three Root Causes",
        body: "Identify the `LEFT JOIN` + `WHERE` filter dropping zero-invoice tenants, `NOT IN` failing on `NULL` values, and an unguarded `WITH RECURSIVE` spinning on cyclic folder links."
      },
      {
        title: "Build a Complete Tenant × Month Grid",
        body: "Use `tenants CROSS JOIN generate_series(...)` as the driving left side before `LEFT JOIN`ing invoices so every tenant-month appears even with `$0` revenue."
      },
      {
        title: "Move Optional Filters Into ON Clauses",
        body: "Relocate `AND i.status = 'paid'` from `WHERE` into `LEFT JOIN invoices i ON i.tenant_id = t.id AND i.status = 'paid'` to preserve zero-invoice rows."
      },
      {
        title: "Replace NOT IN With NOT EXISTS",
        body: "Rewrite `WHERE t.id NOT IN (SELECT tenant_id FROM suspended)` to `WHERE NOT EXISTS (SELECT 1 FROM suspended s WHERE s.tenant_id = t.id)` for `NULL`-safety and index anti-join."
      },
      {
        title: "Add Cycle & Depth Guards to Recursive CTEs",
        body: "Track `ARRAY[id] AS path` with `WHERE NOT (f.id = ANY(tree.path)) AND tree.depth < 25` (or PG 14+ `CYCLE` clause) plus `statement_timeout`."
      },
      {
        title: "Use LATERAL or DENSE_RANK for Top-N",
        body: "Compute top 3 invoices per tenant via `DENSE_RANK() OVER (PARTITION BY tenant_id ORDER BY amount_cents DESC)` or `CROSS JOIN LATERAL (... LIMIT 3)`."
      },
      {
        title: "Specify ROWS Frames on Running Totals",
        body: "Use `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` with deterministic `ORDER BY (created_at, id)` so tied timestamps never lump together."
      },
      {
        title: "Replace App Upsert Races With ON CONFLICT",
        body: "Aggregate daily rollups using `INSERT ... ON CONFLICT (tenant_id, day) DO UPDATE SET total_cents = rollups.total_cents + EXCLUDED.total_cents RETURNING *`."
      },
      {
        title: "Control CTE Materialization Intentionally",
        body: "Allow PG 12+ `NOT MATERIALIZED` inlining for single-use CTEs, and tag `AS MATERIALIZED` only where a complex subquery is reused multiple times."
      },
      {
        title: "Replace Deep OFFSET With Keyset Cursors",
        body: "Paginate report exports with `WHERE (created_at, id) < ($1, $2) ORDER BY created_at DESC, id DESC LIMIT 100`."
      },
      {
        title: "Add Covering Composite Indexes",
        body: "Index `(tenant_id, created_at DESC, id DESC)` and `(parent_id, id)` so `LATERAL`, `NOT EXISTS`, and recursive steps avoid sequential scans."
      },
      {
        title: "Verify Plans With EXPLAIN (ANALYZE, BUFFERS)",
        body: "Confirm Hash/Index Anti-Joins, bounded recursive loops, and zero `Sort` disk spills before deploying."
      }
    ]
  }
];
