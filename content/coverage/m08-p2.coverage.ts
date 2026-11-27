import assert from "node:assert/strict";
import type { LessonCoverageSpec } from "./types";

const EX_COMPOSITE = "Example 1: Composite Index Simulator (createCompositeIndex)";
const EX_STATS = "Example 2: Column Statistics and Row Estimator (buildColumnStatistics)";
const EX_COVER = "Exercise 1: Covering Index Checker (planCoveringIndex)";
const EX_PARTIAL = "Exercise 2: Partial Index with Predicate Implication (createPartialIndex)";
const EX_EXPR = "Exercise 3: Expression Index Matching (createExpressionIndex)";
const EX_HAND = "Exercise 4: Estimate Selectivity by Hand and Choose a Spatial Index";
const EX_FTS = "Challenge: Full-Text Inverted Index (createFullTextIndex)";

export const m08p2Coverage: LessonCoverageSpec = {
  lessonId: "m08-p2",
  moduleNumber: 8,
  mdxPath: "content/modules/08-indexing/m08-p2.mdx",
  topics: [
    {
      topicTitle: "Composite indexes",
      anchorId: "m08-p2-topic-composite-indexes",
      explanationHeadings: ["1. Composite Indexes: Multi-Column Keys and Tuple Order"],
      exampleTitles: [EX_COMPOSITE],
      interviewQuestionIds: ["m08-p2-iq-1", "m08-p2-iq-10"],
      exerciseTitles: [EX_COVER]
    },
    {
      topicTitle: "Covering indexes",
      anchorId: "m08-p2-topic-covering-indexes",
      explanationHeadings: ["2. Covering Indexes: Answering Queries from the Index Alone"],
      exampleTitles: [EX_COVER],
      interviewQuestionIds: ["m08-p2-iq-3", "m08-p2-iq-10"],
      exerciseTitles: [EX_COVER]
    },
    {
      topicTitle: "Partial indexes",
      anchorId: "m08-p2-topic-partial-indexes",
      explanationHeadings: ["3. Partial Indexes: Indexing Only the Rows You Query"],
      exampleTitles: [EX_PARTIAL],
      interviewQuestionIds: ["m08-p2-iq-4", "m08-p2-iq-10"],
      exerciseTitles: [EX_PARTIAL]
    },
    {
      topicTitle: "Filtered indexes",
      anchorId: "m08-p2-topic-filtered-indexes",
      explanationHeadings: ["4. Filtered Indexes: SQL Server's WHERE-Clause Indexes"],
      exampleTitles: [EX_PARTIAL],
      interviewQuestionIds: ["m08-p2-iq-4"],
      exerciseTitles: [EX_PARTIAL]
    },
    {
      topicTitle: "Functional indexes",
      anchorId: "m08-p2-topic-functional-indexes",
      explanationHeadings: ["5. Functional Indexes: Indexing the Result of a Function"],
      exampleTitles: [EX_EXPR],
      interviewQuestionIds: ["m08-p2-iq-5", "m08-p2-iq-10"],
      exerciseTitles: [EX_EXPR]
    },
    {
      topicTitle: "Expression indexes",
      anchorId: "m08-p2-topic-expression-indexes",
      explanationHeadings: ["6. Expression Indexes: Any Deterministic Expression"],
      exampleTitles: [EX_EXPR],
      interviewQuestionIds: ["m08-p2-iq-5"],
      exerciseTitles: [EX_EXPR]
    },
    {
      topicTitle: "Full-text indexes",
      anchorId: "m08-p2-topic-full-text-indexes",
      explanationHeadings: ["7. Full-Text Indexes: Inverted Indexes for Text Search"],
      exampleTitles: [EX_FTS],
      interviewQuestionIds: ["m08-p2-iq-7", "m08-p2-iq-10"],
      exerciseTitles: [EX_FTS]
    },
    {
      topicTitle: "Spatial indexes",
      anchorId: "m08-p2-topic-spatial-indexes",
      explanationHeadings: ["8. Spatial Indexes: R-Trees, GiST and Geospatial Search"],
      noCodeReason:
        "A faithful spatial index needs geometry predicates over planar or spherical reference systems (SRIDs, geography versus geometry, great-circle distance) and the engines' R-Tree, GiST or S2 structures; a planar bounding-box demo would omit SRIDs, spheres and the engines' operators, so the topic is taught with engine SQL, the prose on bounding-rectangle filter-then-refine, Figure 8.3 and the hand-worked Exercise 4.",
      interviewQuestionIds: ["m08-p2-iq-8", "m08-p2-iq-10"],
      exerciseTitles: [EX_HAND]
    },
    {
      topicTitle: "Index selectivity",
      anchorId: "m08-p2-topic-index-selectivity",
      explanationHeadings: ["9. Index Selectivity: How Much of the Table a Predicate Selects"],
      exampleTitles: [EX_STATS],
      interviewQuestionIds: ["m08-p2-iq-2", "m08-p2-iq-9"],
      exerciseTitles: [EX_HAND]
    },
    {
      topicTitle: "Cardinality",
      anchorId: "m08-p2-topic-cardinality",
      explanationHeadings: ["10. Cardinality: Distinct Values and Row-Count Estimates"],
      exampleTitles: [EX_STATS],
      interviewQuestionIds: ["m08-p2-iq-2", "m08-p2-iq-9"],
      exerciseTitles: [EX_HAND]
    },
    {
      topicTitle: "Index statistics",
      anchorId: "m08-p2-topic-index-statistics",
      explanationHeadings: ["11. Index Statistics: Histograms, MCVs and Keeping Them Fresh"],
      exampleTitles: [EX_STATS],
      interviewQuestionIds: ["m08-p2-iq-6", "m08-p2-iq-9"],
      exerciseTitles: [EX_HAND]
    }
  ],
  codeTests: [
    {
      blockIndex: 1,
      label: "Example 1: createCompositeIndex — equality prefix, range column and scan counts",
      expectedStdoutIncludes: [
        "tenant+status+range: 20 rows, 20 entries scanned",
        "status only (gap in prefix): 300 rows, 900 entries scanned",
        "Error: RangeError columns must be an array of 2 to 8 column names"
      ],
      minStdoutLines: 7,
      testValidAndInvalidInputs: (run) => {
        const result = run(`return (() => {
          const idx = createCompositeIndex(["a", "b", "c"]);
          const rows = [];
          for (let i = 0; i < 300; i++) rows.push({ a: i % 5, b: (i * 3) % 7, c: (i * 7) % 11 });
          const order = rows.map((_, i) => i).sort((x, y) => ((x * 37) % 301) - ((y * 37) % 301)); // unsorted insertion order
          for (const i of order) idx.insert(i, rows[i]);
          function brute(eq, range) {
            return rows.map((r, i) => i).filter((i) => {
              const r = rows[i];
              for (const k of Object.keys(eq)) if (r[k] !== eq[k]) return false;
              if (range) {
                if (range.min !== undefined && r[range.column] < range.min) return false;
                if (range.max !== undefined && r[range.column] > range.max) return false;
              }
              return true;
            }).sort((x, y) => x - y);
          }
          const cases = [
            [{ a: 2, b: 3 }, null],
            [{ a: 2 }, null],
            [{ b: 3 }, null],
            [{ a: 2, c: 4 }, null],
            [{ a: 2, b: 3 }, { column: "c", min: 2, max: 5 }],
            [{ a: 2 }, { column: "c", min: 2, max: 5 }],
            [{}, { column: "a", min: 1, max: 3 }],
            [{ a: 9 }, null],
            [{ a: 1, b: 2, c: 3 }, null]
          ];
          const out = [];
          for (const [eq, range] of cases) {
            const res = idx.query(eq, range);
            out.push({ same: JSON.stringify(res.rowIds.slice().sort((x, y) => x - y)) === JSON.stringify(brute(eq, range)), scanned: res.entriesScanned, returned: res.rowIds.length, seek: res.seekColumns, filter: res.filterColumns });
          }
          return { out, total: idx.size() };
        })();`) as {
          out: Array<{ same: boolean; scanned: number; returned: number; seek: string[]; filter: string[] }>;
          total: number;
        };
        assert.equal(result.total, 300);
        for (const [i, o] of result.out.entries()) assert.equal(o.same, true, "case " + i + " matches brute force");
        assert.deepEqual(result.out[0].seek, ["a", "b"]);
        assert.equal(result.out[0].scanned, result.out[0].returned, "an exact equality prefix scans only matching entries");
        assert.deepEqual(result.out[2].seek, [], "skipping the leading column cannot seek");
        assert.equal(result.out[2].scanned, 300, "a gap in the prefix scans every entry");
        assert.deepEqual(result.out[3].seek, ["a"]);
        assert.deepEqual(result.out[3].filter, ["c"], "the column after a gap is only a filter");
        assert.deepEqual(result.out[4].seek, ["a", "b", "c"]);
        assert.equal(result.out[4].scanned, result.out[4].returned, "equality prefix plus range on the next column scans only the range");
        assert.deepEqual(result.out[5].seek, ["a"], "range on a non-adjacent column cannot bound the seek");
        assert.deepEqual(result.out[5].filter, ["c"]);
        assert.deepEqual(result.out[6].seek, ["a"], "a range on the first column seeks");
        assert.equal(result.out[7].returned, 0);

        const dedupe = run(`return (() => {
          const i = createCompositeIndex(["a", "b", "c"]);
          i.insert(1, { a: 1, b: 1, c: 4 });
          i.insert(2, { a: 1, b: 2, c: 9 });
          return i.query({ a: 1, c: 4 }, { column: "c", min: 1 }).filterColumns;
        })();`);
        assert.deepEqual(dedupe, ["c"], "a column that is both an equality and the range column is listed once");
        assert.throws(
          () => run(`createCompositeIndex(["a", "b"]).query({ a: 1 }, { column: "a", min: 0 });`),
          /range column is already fixed by an equality/
        );
        assert.throws(() => run(`createCompositeIndex(["a", "b"]).query({ zzz: 1 });`), /unknown column: zzz/);
        assert.throws(
          () => run(`createCompositeIndex(["a", "b"]).query({}, { column: "b", min: 9, max: 1 });`),
          /range.min must be <= range.max/
        );
        assert.throws(() => run(`createCompositeIndex(["a", "b"]).query({}, { column: "q" });`), /range.column must be an indexed column/);
        assert.throws(() => run(`createCompositeIndex(["a", "b"]).query([]);`), /eq must be a plain object/);
        for (const bad of ["[]", '["a"]', '["a","a"]', '["a",""]', "[1,2]", '["a","b","c","d","e","f","g","h","i"]', "null"]) {
          assert.throws(() => run(`createCompositeIndex(${bad});`), /columns must be|column names must be|duplicate column/, "columns " + bad);
        }
        assert.throws(
          () => run(`createCompositeIndex(["a", "b"]).insert(1, { a: 1 });`),
          /row is missing column: b/
        );
        for (const badValue of ["NaN", "Infinity", "undefined", "null", "true", "{}"]) {
          assert.throws(
            () => run(`createCompositeIndex(["a", "b"]).insert(1, { a: ${badValue}, b: 1 });`),
            /column values must be strings or finite numbers/,
            "value " + badValue
          );
        }
        assert.throws(
          () => run(`(() => { const i = createCompositeIndex(["a", "b"]); i.insert(1, { a: "x", b: 1 }); i.insert(2, { a: 5, b: 1 }); })();`),
          /column a mixes value types/
        );
        assert.throws(() => run(`createCompositeIndex(["a", "b"]).insert(1, []);`), /row must be a plain object/);

        // query values are validated exactly like insert values
        const seeded = `(() => { const i = createCompositeIndex(["a", "b"]); i.insert(1, { a: "x", b: 1 }); return i; })()`;
        for (const bad of ["undefined", "NaN", "null", "5", "{}"]) {
          assert.throws(
            () => run(`${seeded}.query({ a: ${bad} });`),
            /eq.a must be a string or finite number|eq.a does not match the column type/,
            "eq value " + bad
          );
        }
        assert.throws(() => run(`${seeded}.query({ a: "x" }, { column: "b", min: "z" });`), /range.min does not match the column type/);
        assert.throws(() => run(`${seeded}.query({}, { column: "b", max: NaN });`), /range.max must be a string or finite number/);
        assert.throws(
          () => run(`(() => { const i = createCompositeIndex(["a", "b"]); i.insert(1, { a: "x", b: 1 }); i.insert(1, { a: "y", b: 2 }); })();`),
          /rowId already indexed: 1/
        );
        for (const badId of ["-1", "1.5", "NaN", '"1"']) {
          assert.throws(
            () => run(`createCompositeIndex(["a", "b"]).insert(${badId}, { a: 1, b: 1 });`),
            /rowId must be a non-negative integer/
          );
        }
      },
      safetyMutations: [
        {
          description: "Remove the equality-prefix gap break — a skipped leading column must end the seek prefix",
          mutateCode: (raw) =>
            raw.replace(`      if (!Object.hasOwn(eq, name)) break; // the first gap ends the usable equality prefix\n`, ``),
          verifyProtection: (run) => {
            const r = run(`return (() => {
              const i = createCompositeIndex(["a", "b"]);
              for (let n = 0; n < 20; n++) i.insert(n, { a: n % 4, b: n % 5 });
              const q = i.query({ b: 3 });
              return { seek: q.seekColumns, scanned: q.entriesScanned, returned: q.rowIds.length };
            })();`) as { seek: string[]; scanned: number; returned: number };
            assert.deepEqual(r.seek, []);
            assert.equal(r.scanned, 20);
            assert.equal(r.returned, 4);
          }
        },
        {
          description: "Remove unknown-column validation — a typo in the equality object must throw",
          mutateCode: (raw) =>
            raw.replace(`      if (!known.has(name)) throw new TypeError("unknown column: " + name);\n`, ``),
          verifyProtection: (run) => {
            assert.throws(() => run(`createCompositeIndex(["a", "b"]).query({ zzz: 1 });`), /unknown column: zzz/);
          }
        },
        {
          description: "Remove the range-column-fixed guard — a range on an equality column must be rejected",
          mutateCode: (raw) =>
            raw.replace(`      if (rangeIdx < prefix.length) throw new RangeError("range column is already fixed by an equality");\n`, ``),
          verifyProtection: (run) => {
            assert.throws(
              () => run(`createCompositeIndex(["a", "b"]).query({ a: 1 }, { column: "a", min: 0 });`),
              /range column is already fixed by an equality/
            );
          }
        },
        {
          description: "Remove mixed-type guard — a column cannot mix strings and numbers",
          mutateCode: (raw) =>
            raw.replace(`      if (types[i] !== null && types[i] !== typeof v) throw new TypeError("column " + name + " mixes value types");\n`, ``),
          verifyProtection: (run) => {
            assert.throws(
              () => run(`(() => { const i = createCompositeIndex(["a", "b"]); i.insert(1, { a: "x", b: 1 }); i.insert(2, { a: 5, b: 1 }); })();`),
              /column a mixes value types/
            );
          }
        },
        {
          description: "Remove query value validation — an undefined or NaN equality value must not silently match everything",
          mutateCode: (raw) =>
            raw.replace(`    for (const name of Object.keys(eq)) checkQueryValue("eq." + name, cols.indexOf(name), eq[name]);\n`, ``),
          verifyProtection: (run) => {
            assert.throws(
              () => run(`(() => { const i = createCompositeIndex(["a", "b"]); i.insert(1, { a: "x", b: 1 }); i.query({ a: NaN }); })();`),
              /eq.a must be a string or finite number/
            );
          }
        },
        {
          description: "Remove duplicate rowId rejection — the same rowId must not be indexed twice",
          mutateCode: (raw) =>
            raw.replace(`    if (seenRowIds.has(rowId)) throw new Error("rowId already indexed: " + rowId);\n`, ``),
          verifyProtection: (run) => {
            assert.throws(
              () => run(`(() => { const i = createCompositeIndex(["a", "b"]); i.insert(1, { a: "x", b: 1 }); i.insert(1, { a: "y", b: 2 }); })();`),
              /rowId already indexed: 1/
            );
          }
        },
        {
          description: "Append instead of inserting in sorted order — seeks must still find every match",
          mutateCode: (raw) => raw.replace(`    entries.splice(pos, 0, { key, rowId });\n`, `    entries.push({ key, rowId });\n`),
          verifyProtection: (run) => {
            const n = run(`return (() => {
              const i = createCompositeIndex(["a", "b"]);
              const ids = [];
              for (let n = 0; n < 40; n++) ids.push(n);
              ids.sort((x, y) => ((x * 17) % 41) - ((y * 17) % 41));
              for (const id of ids) i.insert(id, { a: id % 4, b: id % 5 });
              return i.query({ a: 1, b: 2 }).rowIds.length;
            })();`) as number;
            assert.equal(n, 2, "rows with a=1 and b=2 among 0..39 are 17 and 37");
          }
        }
      ]
    },
    {
      blockIndex: 2,
      label: "Example 2: buildColumnStatistics and estimateRows — cardinality, MCV and histogram estimates",
      expectedStdoutIncludes: [
        "cardinality: 7",
        "= active: 700",
        "amount < 250: 249",
        "Error: TypeError values must all have the same type"
      ],
      minStdoutLines: 7,
      testValidAndInvalidInputs: (run) => {
        const skew = run(`return (() => {
          const v = [];
          for (let i = 0; i < 700; i++) v.push("active");
          for (let i = 0; i < 250; i++) v.push("pending");
          for (const r of ["suspended", "banned", "archived", "deleted", "locked"]) v.push(r);
          for (let i = 0; i < 45; i++) v.push(null);
          const s = buildColumnStatistics(v, { buckets: 2, mcvCount: 2 });
          return { s, active: estimateRows(s, "=", "active"), pending: estimateRows(s, "=", "pending"), banned: estimateRows(s, "=", "banned"), unknown: estimateRows(s, "=", "unknown") };
        })();`) as {
          s: { rowCount: number; cardinality: number; nullFraction: number; selectivity: number; mostCommon: Array<{ value: string; frequency: number }>; histogramBounds: string[] };
          active: number; pending: number; banned: number; unknown: number;
        };
        assert.equal(skew.s.rowCount, 1000);
        assert.equal(skew.s.cardinality, 7);
        assert.equal(skew.s.nullFraction, 0.045);
        assert.ok(Math.abs(skew.s.selectivity - 7 / 955) < 1e-12);
        assert.deepEqual(skew.s.mostCommon, [
          { value: "active", frequency: 0.7 },
          { value: "pending", frequency: 0.25 }
        ]);
        assert.equal(skew.active, 700);
        assert.equal(skew.pending, 250);
        assert.equal(skew.banned, 1, "a rare value gets restFraction / restDistinct rows");
        assert.equal(skew.unknown, 1);

        const uniform = run(`return (() => {
          const v = [];
          for (let i = 1; i <= 1000; i++) v.push(i);
          const s = buildColumnStatistics(v, { buckets: 10, mcvCount: 0 });
          return { sel: s.selectivity, bounds: s.histogramBounds.length, lt250: estimateRows(s, "<", 250), ge900: estimateRows(s, ">=", 900), le1000: estimateRows(s, "<=", 1000), lt1: estimateRows(s, "<", 1), gt1000: estimateRows(s, ">", 1000), eq: estimateRows(s, "=", 500), mcv: s.mostCommon.length };
        })();`) as Record<string, number>;
        assert.equal(uniform.sel, 1, "a unique column has selectivity 1");
        assert.equal(uniform.bounds, 11);
        assert.equal(uniform.lt250, 249);
        assert.equal(uniform.ge900, 100); // a histogram estimate; the exact count of values 900..1000 is 101
        assert.equal(uniform.le1000, 1000);
        assert.equal(uniform.lt1, 0);
        assert.equal(uniform.gt1000, 0);
        assert.equal(uniform.eq, 1);
        assert.equal(uniform.mcv, 0, "a value seen once is never a most-common value");

        const edge = run(`return (() => {
          const allNull = buildColumnStatistics([null, null]);
          const empty = buildColumnStatistics([]);
          const same = buildColumnStatistics([5, 5, 5]);
          const strings = buildColumnStatistics(["b", "a", "d", "c", "e", "f", "g"], { buckets: 3, mcvCount: 0 });
          return {
            allNull: { c: allNull.cardinality, s: allNull.selectivity, n: allNull.nullFraction, e: estimateRows(allNull, "=", "x") },
            empty: { n: empty.nullFraction, e: estimateRows(empty, "=", 1) },
            same: { eq: estimateRows(same, "=", 5), lt: estimateRows(same, "<", 6), gt: estimateRows(same, ">", 5) },
            strings: estimateRows(strings, "<", "d")
          };
        })();`) as { allNull: { c: number; s: number; n: number; e: number }; empty: { n: number; e: number }; same: { eq: number; lt: number; gt: number }; strings: number };
        assert.deepEqual(edge.allNull, { c: 0, s: 0, n: 1, e: 0 });
        assert.deepEqual(edge.empty, { n: 0, e: 0 });
        assert.deepEqual(edge.same, { eq: 3, lt: 3, gt: 0 });
        assert.ok(edge.strings >= 0 && edge.strings <= 7, "string histograms estimate without throwing");

        assert.throws(() => run(`buildColumnStatistics("x");`), /values must be an array/);
        assert.throws(() => run(`buildColumnStatistics([1], null);`), /options must be a plain object/);
        for (const b of ["0", "101", "1.5", "NaN"]) {
          assert.throws(() => run(`buildColumnStatistics([1], { buckets: ${b} });`), /buckets must be an integer between 1 and 100/);
        }
        for (const m of ["-1", "21", "1.5"]) {
          assert.throws(() => run(`buildColumnStatistics([1], { mcvCount: ${m} });`), /mcvCount must be an integer between 0 and 20/);
        }
        for (const bad of ["NaN", "Infinity", "undefined", "{}", "true"]) {
          assert.throws(() => run(`buildColumnStatistics([1, ${bad}]);`), /values must be null, strings or finite numbers/, "value " + bad);
        }
        assert.throws(() => run(`buildColumnStatistics([1, "2"]);`), /values must all have the same type/);
        assert.throws(() => run(`estimateRows(null, "=", 1);`), /stats must come from buildColumnStatistics/);
        assert.throws(() => run(`estimateRows({}, "=", 1);`), /stats must come from buildColumnStatistics/);
        assert.throws(() => run(`estimateRows(buildColumnStatistics([1, 2]), "<", "abc");`), /value type does not match the column statistics/);
        assert.throws(() => run(`estimateRows(buildColumnStatistics(["a", "b"]), "=", 1);`), /value type does not match the column statistics/);
        assert.throws(
          () => run(`estimateRows(buildColumnStatistics([1, 2]), "LIKE", 1);`),
          /op must be one of =, <, <=, >, >=/
        );
        for (const v of ["NaN", "null", "undefined", "{}"]) {
          assert.throws(
            () => run(`estimateRows(buildColumnStatistics([1, 2]), "=", ${v});`),
            /value must be a string or finite number/,
            "estimate value " + v
          );
        }
      },
      safetyMutations: [
        {
          description: "Remove the single-type guard — mixing numbers and strings must be rejected",
          mutateCode: (raw) =>
            raw.replace(`    if (kind !== null && kind !== typeof v) throw new TypeError("values must all have the same type");\n`, ``),
          verifyProtection: (run) => {
            assert.throws(() => run(`buildColumnStatistics([1, "2"]);`), /values must all have the same type/);
          }
        },
        {
          description: "Remove the buckets guard — buckets: 0 must be rejected",
          mutateCode: (raw) =>
            raw.replace(
              `  if (!Number.isInteger(buckets) || buckets < 1 || buckets > 100) throw new RangeError("buckets must be an integer between 1 and 100");\n`,
              ``
            ),
          verifyProtection: (run) => {
            assert.throws(() => run(`buildColumnStatistics([1, 2, 3], { buckets: 0 });`), /buckets must be an integer between 1 and 100/);
          }
        },
        {
          description: "Remove the 'seen more than once' filter — unique values must not become most-common values",
          mutateCode: (raw) => raw.replace(`    .filter(([, n]) => n > 1) // a value seen once is not "common"\n`, ``),
          verifyProtection: (run) => {
            const n = run(`return buildColumnStatistics([1, 2, 3, 4, 5, 6], { mcvCount: 2 }).mostCommon.length;`) as number;
            assert.equal(n, 0);
          }
        },
        {
          description: "Skip the even-spread formula — a rare value must be estimated from the remaining rows and distinct values",
          mutateCode: (raw) =>
            raw.replace(`restDistinct > 0 ? restFraction / restDistinct : 0`, `restFraction`),
          verifyProtection: (run) => {
            const rows = run(`return (() => {
              const v = [];
              for (let i = 0; i < 90; i++) v.push("a");
              for (const r of ["b", "c", "d", "e", "f", "g", "h", "i", "j", "k"]) v.push(r);
              const s = buildColumnStatistics(v, { buckets: 2, mcvCount: 1 });
              return estimateRows(s, "=", "c");
            })();`) as number;
            assert.equal(rows, 1, "10 remaining rows over 10 rare values is 1 row each");
          }
        },
        {
          description: "Remove the value-kind check — a string must not be estimated against numeric statistics",
          mutateCode: (raw) =>
            raw.replace(`  if (stats.kind !== null && typeof value !== stats.kind) throw new TypeError("value type does not match the column statistics");\n`, ``),
          verifyProtection: (run) => {
            assert.throws(
              () => run(`estimateRows(buildColumnStatistics([1, 2]), "<", "abc");`),
              /value type does not match the column statistics/
            );
          }
        },
        {
          description: "Remove the op allow-list — an unsupported operator must be rejected",
          mutateCode: (raw) =>
            raw.replace(`  if (!["=", "<", "<=", ">", ">="].includes(op)) throw new TypeError("op must be one of =, <, <=, >, >=");\n`, ``),
          verifyProtection: (run) => {
            assert.throws(
              () => run(`estimateRows(buildColumnStatistics([1, 2]), "LIKE", 1);`),
              /op must be one of =, <, <=, >, >=/
            );
          }
        }
      ]
    },
    {
      blockIndex: 3,
      label: "Exercise 1: planCoveringIndex — covering, seek columns, ORDER BY and entry size",
      expectedStdoutIncludes: ['"covering":true', '"covering":false', "Error: RangeError"],
      minStdoutLines: 5,
      testValidAndInvalidInputs: (run) => {
        const plan = (q: string, i: string, w?: string) =>
          run(`return planCoveringIndex(${q}, ${i}${w ? ", " + w : ""});`) as {
            covering: boolean; missingColumns: string[]; seekColumns: string[]; orderServedByIndex: boolean; estimatedEntryBytes: number | null; advice: string;
          };
        const q = `{ select: ["id", "total"], where: ["customer_id", "status"], orderBy: ["created_at"] }`;
        const narrow = plan(q, `{ keyColumns: ["customer_id", "status"], implicitColumns: ["id"] }`);
        assert.equal(narrow.covering, false);
        assert.deepEqual(narrow.missingColumns, ["created_at", "total"]);
        assert.deepEqual(narrow.seekColumns, ["customer_id", "status"]);
        assert.equal(narrow.orderServedByIndex, false);
        assert.equal(narrow.estimatedEntryBytes, null);
        assert.match(narrow.advice, /INCLUDE/);

        const covering = plan(
          q,
          `{ keyColumns: ["customer_id", "status", "created_at"], includeColumns: ["total"], implicitColumns: ["id"] }`,
          `{ customer_id: 8, status: 1, created_at: 8, total: 8 }`
        );
        assert.equal(covering.covering, true);
        assert.deepEqual(covering.missingColumns, []);
        assert.equal(covering.orderServedByIndex, true);
        assert.equal(covering.estimatedEntryBytes, 33);
        assert.match(covering.advice, /Index-only scan/);

        assert.equal(plan(`{ where: [], orderBy: ["created_at"] }`, `{ keyColumns: ["created_at"] }`).orderServedByIndex, true);
        assert.equal(plan(`{ where: [], orderBy: ["x"] }`, `{ keyColumns: ["created_at"] }`).orderServedByIndex, false);
        assert.equal(plan(`{ where: ["a"] }`, `{ keyColumns: ["a"] }`).orderServedByIndex, false, "no ORDER BY means nothing is served");
        const includeOnly = plan(`{ select: ["b"], where: ["b"] }`, `{ keyColumns: ["a"], includeColumns: ["b"] }`);
        assert.equal(includeOnly.covering, true);
        assert.deepEqual(includeOnly.seekColumns, [], "INCLUDE columns cannot seek");
        assert.deepEqual(plan(`{ select: ["a", "a"], where: ["a"] }`, `{ keyColumns: ["a"] }`).missingColumns, []);
        assert.equal(plan(`{}`, `{ keyColumns: ["a"] }`).covering, true, "a query reading nothing is trivially covered");

        // equality, then sort, then range (ESR)
        const esr = plan(`{ select: ["id"], where: ["a"], range: ["b"], orderBy: ["c"] }`, `{ keyColumns: ["a", "b", "c"], implicitColumns: ["id"] }`);
        assert.deepEqual(esr.seekColumns, ["a", "b"], "equality columns then one range column seek");
        assert.equal(esr.orderServedByIndex, false, "a range on b ends the usable ordering for c");
        assert.equal(plan(`{ where: ["a"], range: ["b"], orderBy: ["b"] }`, `{ keyColumns: ["a", "b", "c"] }`).orderServedByIndex, true);
        assert.equal(plan(`{ where: ["a", "b"], orderBy: ["c"] }`, `{ keyColumns: ["a", "b", "c"] }`).orderServedByIndex, true, "equality on a and b leaves c sorted");
        assert.equal(plan(`{ where: ["a"], orderBy: ["a"] }`, `{ keyColumns: ["a", "b"] }`).orderServedByIndex, true, "ordering by a column fixed by equality is trivial");
        assert.deepEqual(plan(`{ range: ["a"] }`, `{ keyColumns: ["a", "b"] }`).seekColumns, ["a"], "a range on the first key column seeks");
        assert.deepEqual(plan(`{ range: ["b"] }`, `{ keyColumns: ["a", "b"] }`).seekColumns, [], "a range on a later column cannot seek");
        assert.deepEqual(plan(`{ range: ["x"] }`, `{ keyColumns: ["a"] }`).missingColumns, ["x"], "range columns count as needed columns");
        assert.throws(() => run(`planCoveringIndex({ range: "b" }, { keyColumns: ["a"] });`), /query.range must be an array/);
        assert.equal(
          plan(`{ where: ["status"], orderBy: ["customer", "created"] }`, `{ keyColumns: ["customer", "status", "created"] }`).orderServedByIndex,
          true,
          "an equality column inside the key drops out of the ordering"
        );
        assert.throws(
          () => run(`planCoveringIndex({}, { keyColumns: ["a", "b"] }, { a: 1000000, b: 2 ** 40 });`),
          /widths.b must be a positive integer up to 1000000/
        );

        assert.throws(() => run(`planCoveringIndex(null, { keyColumns: ["a"] });`), /query must be a plain object/);
        assert.throws(() => run(`planCoveringIndex([], { keyColumns: ["a"] });`), /query must be a plain object/);
        assert.throws(() => run(`planCoveringIndex({}, null);`), /index must be a plain object/);
        assert.throws(() => run(`planCoveringIndex({}, { keyColumns: [] });`), /index.keyColumns must not be empty/);
        assert.throws(() => run(`planCoveringIndex({}, {});`), /index.keyColumns must not be empty/);
        assert.throws(
          () => run(`planCoveringIndex({}, { keyColumns: ["a"], includeColumns: ["a"] });`),
          /a column cannot be both key and include/
        );
        assert.throws(() => run(`planCoveringIndex({ select: "id" }, { keyColumns: ["a"] });`), /query.select must be an array/);
        assert.throws(() => run(`planCoveringIndex({ select: [""] }, { keyColumns: ["a"] });`), /query.select must contain non-empty strings/);
        assert.throws(() => run(`planCoveringIndex({}, { keyColumns: ["a"] }, []);`), /widths must be a plain object/);
        for (const w of ["{}", "{ a: 0 }", "{ a: -1 }", "{ a: 1.5 }", "{ a: NaN }"]) {
          assert.throws(
            () => run(`planCoveringIndex({}, { keyColumns: ["a"] }, ${w});`),
            /widths.a must be a positive integer/,
            "widths " + w
          );
        }
      },
      safetyMutations: [
        {
          description: "Remove the key/include overlap guard — one column cannot be both key and include",
          mutateCode: (raw) =>
            raw.replace(
              `  if (includeColumns.some((c) => keyColumns.includes(c))) throw new TypeError("a column cannot be both key and include");\n`,
              ``
            ),
          verifyProtection: (run) => {
            assert.throws(
              () => run(`planCoveringIndex({}, { keyColumns: ["a"], includeColumns: ["a"] });`),
              /a column cannot be both key and include/
            );
          }
        },
        {
          description: "Remove the empty key guard — an index needs at least one key column",
          mutateCode: (raw) =>
            raw.replace(`  if (keyColumns.length === 0) throw new RangeError("index.keyColumns must not be empty");\n`, ``),
          verifyProtection: (run) => {
            assert.throws(() => run(`planCoveringIndex({}, { keyColumns: [] });`), /index.keyColumns must not be empty/);
          }
        },
        {
          description: "Remove the width guard — a zero or missing column width must be rejected",
          mutateCode: (raw) =>
            raw.replace(
              `      if (!Number.isSafeInteger(w) || w < 1 || w > 1000000) throw new RangeError("widths." + column + " must be a positive integer up to 1000000");\n`,
              ``
            ),
          verifyProtection: (run) => {
            assert.throws(
              () => run(`planCoveringIndex({}, { keyColumns: ["a"] }, { a: 0 });`),
              /widths.a must be a positive integer/
            );
          }
        },
        {
          description: "Skip the range column when computing sort order — a range on b must end the ordering for c",
          mutateCode: (raw) =>
            raw.replace(
              `  const afterEquality = keyColumns.slice(seekLength).filter(`,
              `  const afterEquality = keyColumns.slice(seekLength + (rangeColumn === null ? 0 : 1)).filter(`
            ),
          verifyProtection: (run) => {
            const r = run(`return planCoveringIndex({ where: ["a"], range: ["b"], orderBy: ["c"] }, { keyColumns: ["a", "b", "c"] });`) as { orderServedByIndex: boolean };
            assert.equal(r.orderServedByIndex, false);
          }
        },
        {
          description: "Ignore range columns when seeking — a range on the first key column can bound the scan",
          mutateCode: (raw) =>
            raw.replace(
              `  const rangeColumn = seekLength < keyColumns.length && range.includes(keyColumns[seekLength]) ? keyColumns[seekLength] : null;`,
              `  const rangeColumn = null;`
            ),
          verifyProtection: (run) => {
            const r = run(`return planCoveringIndex({ range: ["a"] }, { keyColumns: ["a", "b"] });`) as { seekColumns: string[] };
            assert.deepEqual(r.seekColumns, ["a"]);
          }
        },
        {
          description: "Report no missing columns — a query reading an unindexed column must not be called covered",
          mutateCode: (raw) =>
            raw.replace(`const missingColumns = needed.filter((c) => !available.has(c)).sort();`, `const missingColumns = [];`),
          verifyProtection: (run) => {
            const r = run(`return planCoveringIndex({ select: ["total"] }, { keyColumns: ["a"] });`) as { covering: boolean };
            assert.equal(r.covering, false);
          }
        },
        {
          description: "Ignore implicit columns — the InnoDB primary key must count as available",
          mutateCode: (raw) =>
            raw.replace(`const available = new Set([...keyColumns, ...includeColumns, ...implicitColumns]);`, `const available = new Set([...keyColumns, ...includeColumns]);`),
          verifyProtection: (run) => {
            const r = run(`return planCoveringIndex({ select: ["id"] }, { keyColumns: ["a"], implicitColumns: ["id"] });`) as { covering: boolean };
            assert.equal(r.covering, true);
          }
        }
      ]
    },
    {
      blockIndex: 4,
      label: "Exercise 2: createPartialIndex — predicate implication, soft-delete uniqueness, atomic update",
      expectedStdoutIncludes: ['"usedIndex":true', "DuplicateKeyError:", "parameter blocks it: false"],
      minStdoutLines: 7,
      testValidAndInvalidInputs: (run) => {
        const soft = run(`return (() => {
          const idx = createPartialIndex({ keyColumn: "email", predicate: { column: "deleted_at", op: "IS NULL" }, unique: true });
          const live = [{ column: "deleted_at", op: "IS NULL" }];
          idx.insert(1, { email: "ann", deleted_at: null });
          idx.insert(2, { email: "bob", deleted_at: null });
          idx.insert(3, { email: "bob", deleted_at: "2024-01-01" });
          const names = [];
          try { idx.update(2, { email: "ann", deleted_at: null }); } catch (e) { names.push(e.name); }
          const bobStill = idx.lookup("bob", live).rowIds;
          idx.update(1, { email: "ann", deleted_at: "2024-02-02" });
          const annGone = idx.lookup("ann", live).rowIds;
          idx.insert(4, { email: "ann", deleted_at: null });
          try { idx.update(1, { email: "ann", deleted_at: null }); } catch (e) { names.push(e.name); }
          const annNow = idx.lookup("ann", live).rowIds;
          idx.update(4, { email: "ann", deleted_at: null });
          const noPred = idx.lookup("ann", []);
          return { names, bobStill, annGone, annNow, selfUpdate: idx.lookup("ann", live).rowIds, noPred, stats: idx.stats() };
        })();`) as {
          names: string[]; bobStill: number[]; annGone: number[]; annNow: number[]; selfUpdate: number[];
          noPred: { usedIndex: boolean; rowIds: number[] | null }; stats: { indexedRows: number; totalRows: number };
        };
        assert.deepEqual(soft.names, ["DuplicateKeyError", "DuplicateKeyError"]);
        assert.deepEqual(soft.bobStill, [2], "a rejected update changes nothing");
        assert.deepEqual(soft.annGone, [], "a row that leaves the predicate leaves the index");
        assert.deepEqual(soft.annNow, [4], "a rejected re-entry leaves the index unchanged");
        assert.deepEqual(soft.selfUpdate, [4], "updating a row to its own key is not a duplicate");
        assert.equal(soft.noPred.usedIndex, false);
        assert.equal(soft.noPred.rowIds, null);
        assert.deepEqual(soft.stats, { indexedRows: 2, totalRows: 4 });

        const nonUnique = run(`return (() => {
          const idx = createPartialIndex({ keyColumn: "customer", predicate: { column: "status", op: "=", value: "open" } });
          idx.insert(1, { customer: "c1", status: "open" });
          idx.insert(2, { customer: "c1", status: "open" });
          idx.insert(3, { customer: "c1", status: "closed" });
          const open = [{ column: "status", op: "=", value: "open" }];
          return {
            rows: idx.lookup("c1", open).rowIds,
            other: idx.canServe([{ column: "status", op: "=", value: "closed" }]),
            param: idx.canServe([{ column: "status", op: "=", value: "open", parameter: true }]),
            wrongColumn: idx.canServe([{ column: "kind", op: "=", value: "open" }]),
            wrongOp: idx.canServe([{ column: "status", op: "IS NULL" }]),
            empty: idx.canServe([]),
            nullEntry: idx.canServe([null])
          };
        })();`) as Record<string, unknown>;
        assert.deepEqual(nonUnique.rows, [1, 2], "non-unique partial index returns every indexed match");
        assert.equal(nonUnique.other, false);
        assert.equal(nonUnique.param, false, "a parameterised value is not proof");
        assert.equal(nonUnique.wrongColumn, false);
        assert.equal(nonUnique.wrongOp, false);
        assert.equal(nonUnique.empty, false);
        assert.equal(nonUnique.nullEntry, false);

        const notNull = run(`return (() => {
          const idx = createPartialIndex({ keyColumn: "email", predicate: { column: "email", op: "IS NOT NULL" }, unique: true });
          idx.insert(1, { email: "x" });
          return idx.canServe([{ column: "email", op: "IS NOT NULL" }]);
        })();`);
        assert.equal(notNull, true);

        assert.throws(() => run(`createPartialIndex(null);`), /options must be a plain object/);
        assert.throws(() => run(`createPartialIndex({ keyColumn: "", predicate: { column: "a", op: "IS NULL" } });`), /keyColumn must be a non-empty string/);
        assert.throws(() => run(`createPartialIndex({ keyColumn: "a" });`), /predicate.column must be a non-empty string/);
        assert.throws(() => run(`createPartialIndex({ keyColumn: "a", predicate: { column: "b", op: "LIKE" } });`), /predicate.op must be one of/);
        for (const v of ["undefined", "NaN", "{}", "null"]) {
          assert.throws(
            () => run(`createPartialIndex({ keyColumn: "a", predicate: { column: "b", op: "=", value: ${v} } });`),
            /predicate.value must be a string or finite number/,
            "value " + v
          );
        }
        assert.throws(
          () => run(`createPartialIndex({ keyColumn: "a", predicate: { column: "b", op: "IS NULL" }, unique: "yes" });`),
          /unique must be a boolean/
        );
        const mk = `createPartialIndex({ keyColumn: "a", predicate: { column: "b", op: "IS NULL" } })`;
        assert.throws(() => run(`${mk}.insert(1, { a: "x" });`), /row is missing column: b/);
        assert.throws(() => run(`${mk}.insert(1, []);`), /row must be a plain object/);
        assert.throws(
          () => run(`${mk}.insert(1, { a: "x", b: undefined });`),
          /row.b must not be undefined \(use null for NULL\)/,
          "undefined is neither NULL nor NOT NULL"
        );
        assert.throws(() => run(`${mk}.insert(1, { a: NaN, b: null });`), /key values must be strings or finite numbers/);
        assert.throws(() => run(`${mk}.insert(-1, { a: "x", b: null });`), /rowId must be a non-negative integer/);
        assert.throws(() => run(`(() => { const i = ${mk}; i.insert(1, { a: "x", b: null }); i.insert(1, { a: "y", b: null }); })();`), /rowId already exists: 1/);
        assert.throws(() => run(`${mk}.update(9, { a: "x", b: null });`), /rowId does not exist: 9/);
        assert.throws(() => run(`${mk}.canServe("x");`), /conditions must be an array/);
      },
      safetyMutations: [
        {
          description: "Remove the unique probe — a second live row with the same key must be rejected",
          mutateCode: (raw) =>
            raw.replace(`    if (unique && holders && [...holders].some((id) => id !== ignoreRow)) throw duplicate();\n`, ``),
          verifyProtection: (run) => {
            assert.throws(
              () =>
                run(`(() => {
                  const i = createPartialIndex({ keyColumn: "email", predicate: { column: "deleted_at", op: "IS NULL" }, unique: true });
                  i.insert(1, { email: "x", deleted_at: null });
                  i.insert(2, { email: "x", deleted_at: null });
                })();`),
              /Duplicate entry for partial unique index/
            );
          }
        },
        {
          description: "Accept parameterised equality as proof — a parameter must not imply the predicate",
          mutateCode: (raw) => raw.replace(`(c.parameter !== true && c.value === predicate.value)`, `(c.value === predicate.value)`),
          verifyProtection: (run) => {
            const r = run(`return createPartialIndex({ keyColumn: "a", predicate: { column: "s", op: "=", value: "open" } }).canServe([{ column: "s", op: "=", value: "open", parameter: true }]);`);
            assert.equal(r, false);
          }
        },
        {
          description: "Index rows outside the predicate — soft-deleted duplicates must not collide",
          mutateCode: (raw) => raw.replace(`    if (!matches(row)) return undefined;\n`, ``),
          verifyProtection: (run) => {
            assert.doesNotThrow(() =>
              run(`(() => {
                const i = createPartialIndex({ keyColumn: "email", predicate: { column: "deleted_at", op: "IS NULL" }, unique: true });
                i.insert(1, { email: "x", deleted_at: null });
                i.insert(2, { email: "x", deleted_at: "2024-01-01" });
              })();`)
            );
          }
        },
        {
          description: "Remove the undefined guard — undefined must not silently bypass an IS NULL partial unique index",
          mutateCode: (raw) =>
            raw.replace(
              `    if (row[predicate.column] === undefined) throw new TypeError("row." + predicate.column + " must not be undefined (use null for NULL)");\n`,
              ``
            ),
          verifyProtection: (run) => {
            assert.throws(
              () =>
                run(`(() => {
                  const i = createPartialIndex({ keyColumn: "email", predicate: { column: "deleted_at", op: "IS NULL" }, unique: true });
                  i.insert(1, { email: "x", deleted_at: undefined });
                })();`),
              /must not be undefined/
            );
          }
        },
        {
          description: "Count a row as its own duplicate — updating a row to its own key must succeed",
          mutateCode: (raw) => raw.replace(`id !== ignoreRow`, `true`),
          verifyProtection: (run) => {
            assert.doesNotThrow(() =>
              run(`(() => {
                const i = createPartialIndex({ keyColumn: "email", predicate: { column: "deleted_at", op: "IS NULL" }, unique: true });
                i.insert(1, { email: "x", deleted_at: null });
                i.update(1, { email: "x", deleted_at: null });
              })();`)
            );
          }
        }
      ]
    },
    {
      blockIndex: 5,
      label: "Exercise 3: createExpressionIndex — deterministic expressions and exact-match lookups",
      expectedStdoutIncludes: ['"usedIndex":true', '"usedIndex":false', "DuplicateKeyError:"],
      minStdoutLines: 8,
      testValidAndInvalidInputs: (run) => {
        const r = run(`return (() => {
          const idx = createExpressionIndex("lower");
          idx.insert(1, "Ann@Example.com");
          idx.insert(2, "bob@example.com");
          idx.insert(3, "ANN@EXAMPLE.COM");
          const hit = idx.lookup("lower", "ann@EXAMPLE.com");
          const miss = idx.lookup("none", "ann@example.com");
          const removed = idx.remove(1);
          const removedAgain = idx.remove(1);
          const after = idx.lookup("lower", "ann@example.com").rowIds;
          idx.remove(3);
          const empty = idx.lookup("lower", "ann@example.com").rowIds;
          const trim = createExpressionIndex("trim"); trim.insert(1, "  x  ");
          const upper = createExpressionIndex("upper"); upper.insert(1, "abc");
          const domain = createExpressionIndex("emailDomain"); domain.insert(1, "u@Sales.Example.com");
          const day = createExpressionIndex("dateOnly"); day.insert(1, "2024-05-06T10:00:00Z"); day.insert(2, "2024-05-06 23:59:59"); day.insert(3, "2024-05-07");
          return {
            hit: hit.rowIds, miss, removed, removedAgain, after, empty, size: idx.size(),
            trim: trim.lookup("trim", "x").rowIds, upper: upper.lookup("upper", "ABC").rowIds,
            domain: domain.lookup("emailDomain", "z@sales.example.com").rowIds,
            day: day.lookup("dateOnly", "2024-05-06").rowIds
          };
        })();`) as {
          hit: number[]; miss: { usedIndex: boolean; rowIds: null }; removed: boolean; removedAgain: boolean;
          after: number[]; empty: number[]; size: number; trim: number[]; upper: number[]; domain: number[]; day: number[];
        };
        assert.deepEqual(r.hit, [1, 3], "both spellings collapse to one expression value");
        assert.equal(r.miss.usedIndex, false);
        assert.equal(r.miss.rowIds, null);
        assert.equal(r.removed, true);
        assert.equal(r.removedAgain, false);
        assert.deepEqual(r.after, [3]);
        assert.deepEqual(r.empty, []);
        assert.equal(r.size, 1);
        assert.deepEqual(r.trim, [1]);
        assert.deepEqual(r.upper, [1]);
        assert.deepEqual(r.domain, [1]);
        assert.deepEqual(r.day, [1, 2]);

        const dup = run(`return (() => {
          const idx = createExpressionIndex("lower", { unique: true });
          idx.insert(1, "Ann@Example.com");
          let name = null;
          try { idx.insert(2, "ann@example.com"); } catch (e) { name = e.name; }
          idx.insert(3, "other@example.com");
          return { name, size: idx.size() };
        })();`) as { name: string; size: number };
        assert.equal(dup.name, "DuplicateKeyError");
        assert.equal(dup.size, 2, "a rejected insert leaves the index unchanged");

        for (const bad of ['"random"', '"now"', '"constructor"', '"__proto__"', '"toString"', "5", "undefined", "null"]) {
          assert.throws(() => run(`createExpressionIndex(${bad});`), /unsupported or non-deterministic expression/, "name " + bad);
        }
        assert.throws(() => run(`createExpressionIndex("lower", null);`), /options must be a plain object/);
        assert.throws(() => run(`createExpressionIndex("lower", { unique: "yes" });`), /unique must be a boolean/);
        assert.throws(() => run(`createExpressionIndex("lower").insert(1, 5);`), /value must be a string/);
        assert.throws(() => run(`createExpressionIndex("lower").lookup("lower", 5);`), /value must be a string/);
        assert.throws(() => run(`createExpressionIndex("emailDomain").insert(1, "not-an-email");`), /value is not an email address/);
        assert.throws(() => run(`createExpressionIndex("emailDomain").insert(1, "a@");`), /value is not an email address/);
        assert.throws(() => run(`createExpressionIndex("dateOnly").insert(1, "05/06/2024");`), /value must start with YYYY-MM-DD/);
        for (const badDate of ["2024-99-99", "2024-02-30", "2023-02-29", "2024-00-10", "2024-13-01"]) {
          assert.throws(
            () => run(`createExpressionIndex("dateOnly").insert(1, "${badDate}");`),
            /value is not a valid calendar date/,
            "date " + badDate
          );
        }
        assert.deepEqual(
          run(`return (() => { const i = createExpressionIndex("dateOnly"); i.insert(1, "2024-02-29"); return i.lookup("dateOnly", "2024-02-29T01:00:00Z").rowIds; })();`),
          [1],
          "a leap day is a valid date"
        );
        for (const id of ["-1", "1.5", "NaN"]) {
          assert.throws(() => run(`createExpressionIndex("lower").insert(${id}, "a");`), /rowId must be a non-negative integer/);
        }
        assert.throws(
          () => run(`(() => { const i = createExpressionIndex("lower"); i.insert(1, "a"); i.insert(1, "b"); })();`),
          /rowId already indexed: 1/
        );
      },
      safetyMutations: [
        {
          description: "Remove the own-property allow-list check — inherited names like constructor must be rejected",
          mutateCode: (raw) =>
            raw.replace(
              `typeof expressionName !== "string" || !Object.hasOwn(EXPRESSIONS, expressionName)`,
              `typeof expressionName !== "string"`
            ),
          verifyProtection: (run) => {
            assert.throws(() => run(`createExpressionIndex("constructor");`), /unsupported or non-deterministic expression/);
          }
        },
        {
          description: "Use the index for any predicate — a bare-column predicate must not claim the expression index",
          mutateCode: (raw) => raw.replace(`    if (queryExpression !== expressionName) {`, `    if (false) {`),
          verifyProtection: (run) => {
            const r = run(`return (() => { const i = createExpressionIndex("lower"); i.insert(1, "A"); return i.lookup("none", "a").usedIndex; })();`);
            assert.equal(r, false);
          }
        },
        {
          description: "Remove the unique check — two values with the same expression result must collide",
          mutateCode: (raw) => raw.replace(`    if (unique && byKey.has(key)) {`, `    if (false) {`),
          verifyProtection: (run) => {
            assert.throws(
              () => run(`(() => { const i = createExpressionIndex("lower", { unique: true }); i.insert(1, "A"); i.insert(2, "a"); })();`),
              /Duplicate entry for unique expression index/
            );
          }
        },
        {
          description: "Remove the calendar check — 2024-99-99 must not be accepted as a date",
          mutateCode: (raw) =>
            raw.replace(
              `    if (check.getUTCFullYear() !== year || check.getUTCMonth() !== month - 1 || check.getUTCDate() !== day) {\n      throw new RangeError("value is not a valid calendar date");\n    }\n`,
              ``
            ),
          verifyProtection: (run) => {
            assert.throws(() => run(`createExpressionIndex("dateOnly").insert(1, "2024-99-99");`), /value is not a valid calendar date/);
          }
        },
        {
          description: "Remove the string value guard — non-string values must be rejected with a clear error",
          mutateCode: (raw) => raw.replace(`    if (typeof value !== "string") throw new TypeError("value must be a string");\n`, ``),
          verifyProtection: (run) => {
            assert.throws(() => run(`createExpressionIndex("lower").insert(1, 5);`), /value must be a string/);
          }
        }
      ]
    },
    {
      blockIndex: 6,
      label: "Advanced Challenge: createFullTextIndex — tokenisation, posting lists, TF-IDF ranking",
      expectedStdoutIncludes: [
        "AND full search:",
        "removed d3: true again: false",
        "Error: Error query contains no searchable terms"
      ],
      minStdoutLines: 8,
      testValidAndInvalidInputs: (run) => {
        const base = `const f = createFullTextIndex();
          f.addDocument("d1", "Postgres GIN indexes make full text search fast");
          f.addDocument("d2", "A B-Tree index cannot speed up a LIKE '%search%' query");
          f.addDocument("d3", "Full text search ranks documents by relevance");
          f.addDocument("d4", "The inverted index maps each term to the documents containing it");
          f.addDocument("d5", "Full moon tonight");`;
        const s = run(`return (() => {
          ${base}
          const andIds = f.search("FULL search").map((h) => h.id);
          const orIds = f.search("index", { mode: "OR" }).map((h) => h.id);
          const limited = f.search("full", { mode: "OR", limit: 1 }).length;
          f.addDocument("d1", "vacuum removes dead tuples");
          const afterReindex = f.search("full search").map((h) => h.id);
          const docs = f.documentCount();
          return { andIds, orIds, limited, afterReindex, docs, r1: f.removeDocument("d3"), r2: f.removeDocument("d3"), after: f.search("full", { mode: "OR" }).map((h) => h.id) };
        })();`) as { andIds: string[]; orIds: string[]; limited: number; afterReindex: string[]; docs: number; r1: boolean; r2: boolean; after: string[] };
        assert.deepEqual(s.andIds, ["d1", "d3"], "AND requires every term; case is ignored");
        assert.deepEqual(s.orIds, ["d2", "d4"]);
        assert.equal(s.limited, 1);
        assert.deepEqual(s.afterReindex, ["d3"], "re-indexing replaces the old postings");
        assert.equal(s.docs, 5);
        assert.equal(s.r1, true);
        assert.equal(s.r2, false);
        assert.deepEqual(s.after, ["d5"]);

        const rank = run(`return (() => {
          const f = createFullTextIndex();
          f.addDocument("x1", "cat cat cat dog");
          f.addDocument("x2", "cat dog");
          const tf = f.search("cat").map((h) => h.id);
          const g = createFullTextIndex();
          g.addDocument("r1", "alpha beta");
          g.addDocument("r2", "beta gamma");
          g.addDocument("r3", "beta delta");
          const idf = g.search("alpha beta", { mode: "OR" }).map((h) => h.id);
          return { tf, idf };
        })();`) as { tf: string[]; idf: string[] };
        assert.deepEqual(rank.tf, ["x1", "x2"], "higher term frequency ranks first");
        assert.equal(rank.idf[0], "r1", "a rare term outweighs a common one");

        const clean = run(`return (() => {
          const f = createFullTextIndex();
          f.addDocument("a", "alpha beta");
          f.addDocument("b", "beta gamma");
          const terms = f.termCount();
          f.removeDocument("a"); f.removeDocument("b");
          return { terms, left: f.termCount(), docs: f.documentCount() };
        })();`) as { terms: number; left: number; docs: number };
        assert.deepEqual(clean, { terms: 3, left: 0, docs: 0 });

        const opts = run(`return (() => {
          const strict = createFullTextIndex({ minTokenLength: 4 });
          strict.addDocument("a", "go to the market square");
          const noStop = createFullTextIndex({ stopWords: [] });
          noStop.addDocument("a", "the cat");
          let name = null;
          try { strict.search("go"); } catch (e) { name = e.message; }
          return { strict: strict.search("market").length, name, noStop: noStop.search("the").length };
        })();`) as { strict: number; name: string; noStop: number };
        assert.equal(opts.strict, 1);
        assert.equal(opts.name, "query contains no searchable terms");
        assert.equal(opts.noStop, 1, "with no stop words, 'the' is searchable");

        for (const bad of ['"the of and"', '""', '"!!! ---"']) {
          assert.throws(() => run(`createFullTextIndex().search(${bad});`), /query contains no searchable terms/, "query " + bad);
        }
        assert.throws(() => run(`createFullTextIndex().search(5);`), /query must be a string/);
        assert.throws(() => run(`createFullTextIndex().search("x", []);`), /searchOptions must be a plain object/);
        assert.throws(() => run(`createFullTextIndex().search("xx", { mode: "XOR" });`), /mode must be "AND" or "OR"/);
        for (const l of ["0", "101", "1.5", "NaN"]) {
          assert.throws(() => run(`createFullTextIndex().search("xx", { limit: ${l} });`), /limit must be an integer between 1 and 100/);
        }
        for (const id of ['""', "5", "null"]) {
          assert.throws(() => run(`createFullTextIndex().addDocument(${id}, "text");`), /document id must be a non-empty string/);
        }
        assert.throws(() => run(`createFullTextIndex().addDocument("a", 5);`), /text must be a string/);
        assert.throws(() => run(`createFullTextIndex(null);`), /options must be a plain object/);
        assert.throws(() => run(`createFullTextIndex({ stopWords: "the" });`), /stopWords must be an array of strings/);
        assert.throws(() => run(`createFullTextIndex({ stopWords: [1] });`), /stopWords must be an array of strings/);
        for (const m of ["0", "11", "1.5"]) {
          assert.throws(() => run(`createFullTextIndex({ minTokenLength: ${m} });`), /minTokenLength must be an integer between 1 and 10/);
        }
      },
      safetyMutations: [
        {
          description: "Remove the empty-query guard — a query with no searchable terms must throw",
          mutateCode: (raw) =>
            raw.replace(`    if (terms.length === 0) throw new Error("query contains no searchable terms");\n`, ``),
          verifyProtection: (run) => {
            assert.throws(() => run(`createFullTextIndex().search("the of and");`), /query contains no searchable terms/);
          }
        },
        {
          description: "Remove the limit guard — an unbounded or zero limit must be rejected",
          mutateCode: (raw) =>
            raw.replace(
              `    if (!Number.isInteger(limit) || limit < 1 || limit > 100) throw new RangeError("limit must be an integer between 1 and 100");\n`,
              ``
            ),
          verifyProtection: (run) => {
            assert.throws(() => run(`createFullTextIndex().search("xx", { limit: 0 });`), /limit must be an integer between 1 and 100/);
          }
        },
        {
          description: "Do not replace old postings on re-index — stale terms must disappear",
          mutateCode: (raw) => raw.replace(`    removeDocument(id); // re-indexing replaces the old postings\n`, ``),
          verifyProtection: (run) => {
            const ids = run(`return (() => {
              const f = createFullTextIndex();
              f.addDocument("d1", "full moon");
              f.addDocument("d1", "vacuum tuples");
              return f.search("full", { mode: "OR" }).map((h) => h.id);
            })();`) as string[];
            assert.deepEqual(ids, []);
          }
        },
        {
          description: "Treat AND as OR — documents missing a term must not match an AND query",
          mutateCode: (raw) => raw.replace(`.filter(([id]) => mode === "OR" || hits.get(id) === terms.length)`, `.filter(() => true)`),
          verifyProtection: (run) => {
            const ids = run(`return (() => {
              const f = createFullTextIndex();
              f.addDocument("a", "full moon");
              f.addDocument("b", "full search");
              return f.search("full search").map((h) => h.id);
            })();`) as string[];
            assert.deepEqual(ids, ["b"]);
          }
        },
        {
          description: "Stop removing stop words — 'the of and' must not be searchable",
          mutateCode: (raw) => raw.replace(`.filter((t) => t.length >= minTokenLength && !stop.has(t));`, `.filter((t) => t.length >= minTokenLength);`),
          verifyProtection: (run) => {
            assert.throws(() => run(`createFullTextIndex().search("the and");`), /query contains no searchable terms/);
          }
        },
        {
          description: "Remove the mode allow-list — an unknown mode must be rejected",
          mutateCode: (raw) =>
            raw.replace(`    if (mode !== "AND" && mode !== "OR") throw new TypeError('mode must be "AND" or "OR"');\n`, ``),
          verifyProtection: (run) => {
            assert.throws(() => run(`createFullTextIndex().search("xx", { mode: "XOR" });`), /mode must be "AND" or "OR"/);
          }
        }
      ]
    }
  ]
};
