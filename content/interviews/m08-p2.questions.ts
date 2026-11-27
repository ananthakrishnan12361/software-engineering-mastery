import type { InterviewQuestion } from "@/entities/handbook";

export const m08p2Questions: InterviewQuestion[] = [
  {
    id: "m08-p2-iq-1",
    moduleNumber: 8,
    lessonId: "m08-p2",
    number: 1,
    question: "What is a composite index, and how does the order of its columns change which queries it can serve?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "What a composite index stores",
        body: "A **composite (multi-column) index** stores a tuple such as `(tenant_id, status, created_at)` as its key, sorted by the first column, then the second within equal first values, then the third. It is like a phone book sorted by last name then first name: you can find a last name, or a last-and-first pair, but not everyone with one first name."
      },
      {
        label: "Why order matters",
        body: "Equality on the **leading columns** lets the engine seek to one contiguous run of entries, and the column right after that equality prefix can still bound a range. If a leading column is skipped, matching entries are scattered, so the engine must scan the index and filter. Put equality columns first, then the sort column, then the range column (once a column is compared with a range, later columns cannot provide sorted output), and confirm with `EXPLAIN`."
      }
    ]
  },
  {
    id: "m08-p2-iq-2",
    moduleNumber: 8,
    lessonId: "m08-p2",
    number: 2,
    question: "What are index selectivity and cardinality, and why do they matter to the query planner?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Definitions",
        body: "**Selectivity** measures how much a column or predicate narrows the table: for a column it is often `distinct values / non-NULL rows` (1.0 for a primary key), and for a predicate it is the fraction of rows returned. **Cardinality** is the number of **distinct values** in a column or index, and also the planner's **estimated row count** for each plan operator (`rows=` in `EXPLAIN`)."
      },
      {
        label: "Why the planner cares",
        body: "The planner compares the cost of an index probe plus a lookup per match against a sequential scan. A predicate that returns a small fraction of rows favours the index; a low-selectivity predicate such as a boolean favours the scan. Estimation errors **compound through joins**, so wrong cardinality estimates are a leading cause of slow plans."
      }
    ]
  },
  {
    id: "m08-p2-iq-3",
    moduleNumber: 8,
    lessonId: "m08-p2",
    number: 3,
    question: "What is a covering index, and how does it make a query faster?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "How it works",
        body: "An index **covers** a query when it contains every column the query reads (select list, `WHERE`, `ORDER BY`), so the engine answers from the index alone and never visits the table. This removes the extra hop per matching row that dominates secondary-index lookups. SQL Server and PostgreSQL 11+ use `INCLUDE` columns; MySQL adds the columns to the key; InnoDB secondary entries already contain the primary key."
      },
      {
        label: "Costs and how to verify",
        body: "A covering index is wider, so it uses more space and cache and must be updated when an included column changes. In PostgreSQL an **index-only scan** also needs a current visibility map, otherwise `Heap Fetches` remain. Verify with `Index Only Scan` (PostgreSQL), `Using index` (MySQL), or no `Key Lookup` (SQL Server)."
      }
    ]
  },
  {
    id: "m08-p2-iq-4",
    moduleNumber: 8,
    lessonId: "m08-p2",
    number: 4,
    question: "How do partial indexes (PostgreSQL) and filtered indexes (SQL Server) differ, and what pitfalls make the planner ignore them?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "Same idea, different rules",
        body: "Both index only the rows matching a `WHERE` predicate, so they are smaller and cheaper to write. PostgreSQL's partial indexes accept any immutable predicate; SQL Server's filtered indexes allow only simple comparison logic (no function calls or computed columns), need specific `SET` options, and can keep **filtered statistics**. Either supports the soft-delete unique pattern (`WHERE deleted_at IS NULL`), and a filtered unique index also allows many NULLs in SQL Server."
      },
      {
        label: "Why the index is not used",
        body: "The planner uses the index only if it can prove the query's `WHERE` **implies** the index predicate. A literal `status = 'pending'` qualifies, but a parameter (`$1`, `@status`) usually does not, because a generic plan must work for every value (SQL Server may need `OPTION (RECOMPILE)`). MySQL has no partial indexes; a generated column that is NULL outside the condition is the common workaround."
      }
    ]
  },
  {
    id: "m08-p2-iq-5",
    moduleNumber: 8,
    lessonId: "m08-p2",
    number: 5,
    question: "What are functional and expression indexes, and why must the query repeat the same expression?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "What they store",
        body: "A functional or expression index stores the **result** of a deterministic expression, computed once at write time: `lower(email)`, `price * quantity`, `payload ->> 'type'`. A predicate such as `WHERE lower(email) = ?` becomes an ordinary seek instead of evaluating the function for every row. PostgreSQL has expression indexes (functions must be `IMMUTABLE`), MySQL 8.0.13+ has functional key parts with double parentheses, SQL Server indexes a deterministic computed column, and MongoDB has none."
      },
      {
        label: "Why the match must be exact",
        body: "The index holds only the stored result, so the planner can use it only when the predicate applies the same expression. `WHERE email = ?` or `lower(trim(email)) = ?` cannot use an index on `lower(email)`. Expressions are recomputed on every relevant write, so non-deterministic functions (`now()`, `random()`) and session-dependent conversions are rejected or give wrong results."
      }
    ]
  },
  {
    id: "m08-p2-iq-6",
    moduleNumber: 8,
    lessonId: "m08-p2",
    number: 6,
    question: "How does the planner use index statistics, and what happens when they go stale?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "What statistics contain and how they are used",
        body: "Statistics hold the row count, NULL fraction, distinct count, a list of **most common values** with frequencies and an **equi-height histogram**. For an equality on a common value the planner reads the MCV frequency; for a rare value it spreads the remaining rows over the remaining distinct values; for a range it counts histogram buckets. PostgreSQL exposes them in `pg_stats`, SQL Server in `DBCC SHOW_STATISTICS` (up to 200 histogram steps), MySQL 8.0 through optional histograms."
      },
      {
        label: "Stale statistics and remedies",
        body: "After bulk loads, mass deletes or distribution shifts the snapshot no longer matches the data, so row estimates are wrong and the planner may scan when an index is ideal or nested-loop millions of rows. Refresh with `ANALYZE`, `ANALYZE TABLE` or `UPDATE STATISTICS`, raise the statistics target for skewed columns, and add extended statistics for correlated columns. Compare estimated and actual rows in `EXPLAIN ANALYZE` to detect the problem."
      }
    ]
  },
  {
    id: "m08-p2-iq-7",
    moduleNumber: 8,
    lessonId: "m08-p2",
    number: 7,
    question: "How do full-text indexes work, and how do they differ from a B-Tree for text search across PostgreSQL, MySQL, SQL Server and MongoDB?",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Inverted index mechanics",
        body: "A B-Tree can serve a prefix `LIKE 'abc%'` but not `LIKE '%abc%'`. A full-text index is an **inverted index**: text is tokenised, lower-cased, stop words are removed and terms are often stemmed; each term maps to a **posting list** of documents with frequencies or positions. Multi-word queries intersect or union posting lists, and a ranking function such as TF-IDF or BM25 orders results by relevance."
      },
      {
        label: "Engine implementations and trade-offs",
        body: "PostgreSQL uses `tsvector` with **GIN** (`@@ plainto_tsquery`), and `pg_trgm` for substring matching. MySQL InnoDB has `FULLTEXT` with `MATCH ... AGAINST` and an `ngram` parser for languages without spaces. SQL Server uses a separate full-text catalog requiring a unique single-column key, populated asynchronously so results can lag writes. MongoDB allows one text index per collection. Writes are slower and indexes larger than B-Trees; relevance tuning beyond the basics usually moves to a dedicated search engine."
      }
    ]
  },
  {
    id: "m08-p2-iq-8",
    moduleNumber: 8,
    lessonId: "m08-p2",
    number: 8,
    question: "Which spatial index types exist across engines, and how do they answer a within-radius query?",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Why a B-Tree is not enough and how spatial trees work",
        body: "A single sort order cannot bound a two-dimensional region: sorting by latitude leaves every longitude to scan. **R-Tree** style indexes group nearby objects into **minimum bounding rectangles** arranged in a tree, so the search skips regions whose rectangle misses the query. Queries run in two phases: a **filter** step uses the index to find candidates whose rectangle intersects the search area, and a **refine** step tests the exact geometry on those candidates."
      },
      {
        label: "Engine choices",
        body: "PostgreSQL with PostGIS uses **GiST** (or SP-GiST) with `ST_DWithin` and the KNN operator `<->`. MySQL has `SPATIAL` indexes (R-Tree) on `NOT NULL` geometry columns, supported by InnoDB since 5.7. SQL Server builds a B-tree over a multi-level grid tessellation for `geometry` and `geography`. MongoDB offers `2dsphere` (S2 cells) for `$near` and `$geoWithin`. When only B-Trees exist, **geohash** or **H3** cell ids convert proximity into prefix or equality lookups, at the cost of boundary handling."
      }
    ]
  },
  {
    id: "m08-p2-iq-9",
    moduleNumber: 8,
    lessonId: "m08-p2",
    number: 9,
    question: "Cardinality estimates are far off for a query on correlated, skewed columns. How do you diagnose it and fix it?",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Diagnosis",
        body: "Compare **estimated and actual rows** per plan node (`EXPLAIN (ANALYZE)`, actual execution plans). A 10x or larger gap at a scan or join marks the culprit. Typical causes are stale statistics, skewed values missing from the MCV list or histogram, **correlated columns** (`city = 'Paris' AND country = 'France'`) whose selectivities the planner multiplies as if independent, and parameters whose generic plan ignores the actual value."
      },
      {
        label: "Fixes",
        body: "Refresh statistics, then raise the statistics target on the skewed column (`ALTER TABLE ... ALTER COLUMN ... SET STATISTICS`), add **extended statistics** (`CREATE STATISTICS ... (dependencies, ndistinct, mcv)` in PostgreSQL; SQL Server multi-column statistics hold density only; MySQL has none), build a partial or filtered index for the rare values with filtered statistics, or restructure the query so each predicate is estimated separately. Re-check the plan after each change rather than guessing."
      }
    ]
  },
  {
    id: "m08-p2-iq-10",
    moduleNumber: 8,
    lessonId: "m08-p2",
    number: 10,
    question: "As a senior architect, design the index set for a multi-tenant product catalogue with soft deletes, text search and store-locator queries across PostgreSQL, MySQL and SQL Server.",
    difficulty: "senior-architect",
    numberedSteps: [
      {
        title: "Problem",
        body: "A multi-tenant `products` table must serve tenant-scoped listings by category and price, case-insensitive SKU lookups, soft deletes with unique SKUs, free-text search, and a store locator, while keeping write latency stable during bulk imports."
      },
      {
        title: "Constraints & Scale",
        body: "50 million product rows, 2,000 tenants with heavy skew (the largest holds 20 percent), 90 percent of rows live and 10 percent soft-deleted, p99 read latency under 100 ms, nightly bulk imports of several million rows, and a mix of PostgreSQL, MySQL 8.0 and SQL Server deployments."
      },
      {
        title: "Query Inventory",
        body: "List real queries first: listing by `(tenant_id, category_id)` ordered by price, lookup by `(tenant_id, lower(sku))`, active-only filters, keyword search, nearest stores, and admin reports. Each index must be justified by at least one hot query and one explain plan."
      },
      {
        title: "Composite Listing Index",
        body: "Create `(tenant_id, category_id, price)` so equality columns come first and price serves the sort; add `INCLUDE (name)` in PostgreSQL 11+ and SQL Server, or append the column in MySQL, only if the listing query reads it and an index-only scan or no key lookup is confirmed."
      },
      {
        title: "Soft-Delete Uniqueness",
        body: "Enforce unique live SKUs per tenant on the normalised value, `(tenant_id, lower(sku))`, with a partial unique index in PostgreSQL (`WHERE deleted_at IS NULL`), a filtered unique index on a computed column in SQL Server, and a generated column that is NULL when deleted plus a unique index in MySQL. Queries must repeat the literal `deleted_at IS NULL` so the planner can prove the predicate."
      },
      {
        title: "Case-Insensitive SKU Lookup",
        body: "Index `lower(sku)` as an expression index (PostgreSQL), a functional key part (MySQL 8.0.13+) or an indexed computed column (SQL Server), and route all SKU lookups through one repository function so queries always repeat the same expression."
      },
      {
        title: "Full-Text Search",
        body: "Use a GIN index on `to_tsvector` in PostgreSQL, an InnoDB `FULLTEXT` index in MySQL, and a full-text index in SQL Server (accepting asynchronous population). Bound result limits, and plan a dedicated search service if relevance, faceting or typo tolerance outgrow the database."
      },
      {
        title: "Store Locator",
        body: "Add a GiST index on the geometry (PostGIS), a `SPATIAL` index on a `NOT NULL` geometry column in MySQL, and a spatial index on `geography` in SQL Server (MySQL spatial columns should carry an SRID), using a bounding-box or `ST_DWithin` filter plus an exact distance refine, with a hard radius and result cap."
      },
      {
        title: "Statistics Plan",
        body: "Raise the statistics target on `tenant_id` and `category_id` for skew, add extended statistics for correlated columns (PostgreSQL), schedule `ANALYZE` or `UPDATE STATISTICS` after every bulk import, and for MySQL create histograms on skewed columns."
      },
      {
        title: "Write-Cost Budget",
        body: "Count indexes per table (for example six), measure import throughput with all of them, and drop imports into staging tables or build indexes after load if needed. Partial and filtered indexes help here because soft-deleted rows cost nothing to maintain."
      },
      {
        title: "Validation Plan",
        body: "Load a production-sized copy with realistic skew, replay the query mix, and compare estimated and actual rows, buffers or logical reads, index sizes and import duration for each candidate set. Reject any index that no plan uses."
      },
      {
        title: "Rollout & Monitoring",
        body: "Create indexes online or concurrently (`CREATE INDEX CONCURRENTLY`, online index operations, `ALGORITHM=INPLACE`), deploy behind feature flags, monitor index usage views, plan regressions and statistics freshness, and keep rollback scripts so a bad index or plan change can be reverted without downtime."
      }
    ]
  }
];
