import assert from "node:assert/strict";
import type { LessonCoverageSpec } from "./types";

const EX_BPLUS = "Example 1: B+ Tree Index Simulator (createBPlusTree)";
const EX_COST = "Example 2: Index Seek vs Table Scan Cost Model (estimateAccessCost)";
const EX_HASH = "Exercise 1: Hash Index Bucket Simulator (createHashIndex)";
const EX_READS = "Exercise 2: Clustered vs Non-Clustered Page Reads (countPageReads)";
const EX_PREDICT = "Exercise 3: Predict the B+ Tree Split and the Scan Break-Even";
const EX_UNIQUE = "Challenge: Unique Index Manager (createUniqueIndex)";

export const m08p1Coverage: LessonCoverageSpec = {
  lessonId: "m08-p1",
  moduleNumber: 8,
  mdxPath: "content/modules/08-indexing/m08-p1.mdx",
  topics: [
    {
      topicTitle: "Why indexes exist",
      anchorId: "m08-p1-topic-why-indexes-exist",
      explanationHeadings: ["1. Why Indexes Exist: Avoiding Full Scans"],
      exampleTitles: [EX_COST],
      interviewQuestionIds: ["m08-p1-iq-1", "m08-p1-iq-5"],
      exerciseTitles: [EX_PREDICT]
    },
    {
      topicTitle: "How indexes work",
      anchorId: "m08-p1-topic-how-indexes-work",
      explanationHeadings: ["2. How Indexes Work: Sorted Keys, Pointers and Seeks"],
      exampleTitles: [EX_BPLUS, EX_COST],
      interviewQuestionIds: ["m08-p1-iq-1", "m08-p1-iq-5"],
      exerciseTitles: [EX_PREDICT]
    },
    {
      topicTitle: "B-Tree",
      anchorId: "m08-p1-topic-b-tree",
      explanationHeadings: ["3. B-Tree: Balanced, Wide, Shallow Search Trees"],
      exampleTitles: [EX_BPLUS],
      interviewQuestionIds: ["m08-p1-iq-4", "m08-p1-iq-9"],
      exerciseTitles: [EX_PREDICT]
    },
    {
      topicTitle: "B+ Tree",
      anchorId: "m08-p1-topic-b-plus-tree",
      explanationHeadings: ["4. B+ Tree: Data in Leaves, Linked for Range Scans"],
      exampleTitles: [EX_BPLUS],
      interviewQuestionIds: ["m08-p1-iq-4", "m08-p1-iq-9"],
      exerciseTitles: [EX_PREDICT]
    },
    {
      topicTitle: "Hash indexes",
      anchorId: "m08-p1-topic-hash-indexes",
      explanationHeadings: ["5. Hash Indexes: O(1) Equality, Nothing Else"],
      exampleTitles: [EX_HASH],
      interviewQuestionIds: ["m08-p1-iq-3"],
      exerciseTitles: [EX_HASH]
    },
    {
      topicTitle: "Clustered indexes",
      anchorId: "m08-p1-topic-clustered-indexes",
      explanationHeadings: ["6. Clustered Indexes: The Table Is the Index"],
      exampleTitles: [EX_READS],
      interviewQuestionIds: ["m08-p1-iq-2", "m08-p1-iq-7", "m08-p1-iq-10"],
      exerciseTitles: [EX_READS]
    },
    {
      topicTitle: "Non-clustered indexes",
      anchorId: "m08-p1-topic-non-clustered-indexes",
      explanationHeadings: ["7. Non-Clustered (Secondary) Indexes: A Second Tree Pointing Back"],
      exampleTitles: [EX_READS],
      interviewQuestionIds: ["m08-p1-iq-2", "m08-p1-iq-8"],
      exerciseTitles: [EX_READS]
    },
    {
      topicTitle: "Unique indexes",
      anchorId: "m08-p1-topic-unique-indexes",
      explanationHeadings: ["8. Unique Indexes: Constraints Enforced by the Tree"],
      exampleTitles: [EX_UNIQUE],
      interviewQuestionIds: ["m08-p1-iq-6"],
      exerciseTitles: [EX_UNIQUE]
    }
  ],
  codeTests: [
    {
      blockIndex: 1,
      label: "Example 1: createBPlusTree — B+ Tree index simulator",
      expectedStdoutIncludes: ["size: 40 height: 4", 'levels after 10,20,30,40: [["30"],["10,20","30,40"]]', '"found":true', "Error: TypeError key must be a finite number"],
      minStdoutLines: 8,
      testValidAndInvalidInputs: (run) => {
        const result = run(`return (() => {
          const tree = createBPlusTree(4);
          const keys = [];
          let seed = 12345;
          for (let i = 1; i <= 200; i++) keys.push(i);
          for (let i = keys.length - 1; i > 0; i--) {
            seed = (seed * 1103515245 + 12345) % 2147483648;
            const j = seed % (i + 1);
            const t = keys[i]; keys[i] = keys[j]; keys[j] = t;
          }
          for (const k of keys) tree.insert(k, "v" + k);
          const allFound = Array.from({ length: 200 }, (_, i) => tree.search(i + 1).found).every(Boolean);
          const miss = tree.search(500).found;
          const rng = tree.range(50, 60).keys;
          const full = tree.range(1, 200);
          const upsert = tree.insert(10, "changed");
          return { size: tree.size(), allFound, miss, rng, fullLen: full.keys.length, sorted: full.keys.every((k, i) => i === 0 || full.keys[i - 1] < k), upsert, value: tree.search(10).value, sizeAfter: tree.size(), height: tree.height() };
        })();`) as {
          size: number; allFound: boolean; miss: boolean; rng: number[]; fullLen: number; sorted: boolean;
          upsert: boolean; value: string; sizeAfter: number; height: number;
        };
        assert.equal(result.size, 200);
        assert.equal(result.allFound, true, "every shuffled key is searchable");
        assert.equal(result.miss, false);
        assert.deepEqual(result.rng, [50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60]);
        assert.equal(result.fullLen, 200, "range follows the whole leaf chain");
        assert.equal(result.sorted, true);
        assert.equal(result.upsert, false, "re-inserting an existing key is an upsert, not a new entry");
        assert.equal(result.value, "changed");
        assert.equal(result.sizeAfter, 200);
        assert.ok(result.height >= 3 && result.height <= 9, "height stays logarithmic");

        const wide = run(`return (() => {
          const t = createBPlusTree(128);
          for (let i = 0; i < 10000; i++) t.insert(i, i);
          return t.height();
        })();`) as number;
        assert.ok(wide <= 3, "order 128 with 10,000 keys needs at most 3 levels");

        assert.equal(
          run(`return (() => { const t = createBPlusTree(3); t.insert(-0, "z"); return t.search(0).found; })();`),
          true,
          "-0 is normalised to 0"
        );
        assert.deepEqual(run(`return createBPlusTree(4).range(1, 5).keys;`), []);

        assert.deepEqual(
          run(`return (() => { const t = createBPlusTree(4); for (const k of [10, 20, 30, 40]) t.insert(k, k); return t.levels(); })();`),
          [["30"], ["10,20", "30,40"]],
          "a leaf split COPIES the separator up: 30 is in the root and still in the right leaf"
        );
        const structure = run(`return (() => {
          const out = [];
          for (const order of [3, 4, 5, 7]) {
            const t = createBPlusTree(order);
            let seed = 99 + order;
            for (let i = 0; i < 300; i++) {
              seed = (seed * 1103515245 + 12345) % 2147483648;
              t.insert(seed % 1000, i);
            }
            const lv = t.levels();
            const internal = lv.slice(0, -1).flat().flatMap((s) => s.split(",")).filter((s) => s.length > 0);
            const leafKeys = new Set(lv[lv.length - 1].flatMap((s) => s.split(",")));
            out.push({ unique: new Set(internal).size === internal.length, allInLeaves: internal.every((k) => leafKeys.has(k)), depth: lv.length === t.height() });
          }
          return out;
        })();`) as Array<{ unique: boolean; allInLeaves: boolean; depth: boolean }>;
        for (const s of structure) {
          assert.equal(s.unique, true, "an internal split MOVES the middle key up: separators appear once across internal levels");
          assert.equal(s.allInLeaves, true, "every separator is also a leaf key (copy-up)");
          assert.equal(s.depth, true, "levels() depth equals height()");
        }

        for (const bad of ["NaN", "Infinity", '"5"', "null", "undefined"]) {
          assert.throws(
            () => run(`createBPlusTree(4).insert(${bad}, "x");`),
            /key must be a finite number/,
            "invalid key " + bad
          );
        }
        for (const badOrder of ["2", "129", "3.5", "NaN", '"4"']) {
          assert.throws(() => run(`createBPlusTree(${badOrder});`), /order must be an integer between 3 and 128/);
        }
        assert.throws(() => run(`createBPlusTree(4).range(9, 1);`), /lo must be <= hi/);
        assert.throws(() => run(`createBPlusTree(4).search(NaN);`), /key must be a finite number/);
      },
      safetyMutations: [
        {
          description: "Remove finite-number key guard — insert(NaN) must throw",
          mutateCode: (raw) =>
            raw.replace(
              `    if (typeof key !== "number" || !Number.isFinite(key)) throw new TypeError("key must be a finite number");\n`,
              ``
            ),
          verifyProtection: (run) => {
            assert.throws(() => run(`createBPlusTree(4).insert(NaN, "x");`), /key must be a finite number/);
          }
        },
        {
          description: "Remove order guard — createBPlusTree(2) must throw",
          mutateCode: (raw) =>
            raw.replace(
              `  if (!Number.isInteger(order) || order < 3 || order > 128) {\n    throw new RangeError("order must be an integer between 3 and 128");\n  }\n`,
              ``
            ),
          verifyProtection: (run) => {
            assert.throws(() => run(`createBPlusTree(2);`), /order must be an integer between 3 and 128/);
          }
        },
        {
          description: "Stop copying the separator up on a leaf split — separators must remain real leaf keys",
          mutateCode: (raw) => raw.replace(`let upKey = right.keys[0];`, `let upKey = right.keys[0] - 0.5;`),
          verifyProtection: (run) => {
            const lv = run(`return (() => { const t = createBPlusTree(4); for (const k of [10, 20, 30, 40]) t.insert(k, k); return t.levels(); })();`);
            assert.deepEqual(lv, [["30"], ["10,20", "30,40"]]);
          }
        },
        {
          description: "Keep the promoted key inside the split internal node — an internal split must MOVE the key up",
          mutateCode: (raw) => raw.replace(`      step.node.keys.splice(m, 1);\n`, ``),
          verifyProtection: (run) => {
            const ok = run(`return (() => {
              const t = createBPlusTree(3);
              for (let i = 1; i <= 9; i++) t.insert(i, i);
              const lv = t.levels();
              const internal = lv.slice(0, -1).flat().flatMap((s) => s.split(","));
              return new Set(internal).size === internal.length;
            })();`);
            assert.equal(ok, true, "separators appear exactly once across internal levels");
          }
        },
        {
          description: "Remove lo <= hi guard — an inverted range must throw",
          mutateCode: (raw) => raw.replace(`    if (lo > hi) throw new RangeError("lo must be <= hi");\n`, ``),
          verifyProtection: (run) => {
            assert.throws(() => run(`createBPlusTree(4).range(9, 1);`), /lo must be <= hi/);
          }
        },
        {
          description: "Break the leaf sibling link — a range scan must still reach every leaf",
          mutateCode: (raw) => raw.replace(`    leaf.next = right;\n`, `    leaf.next = null;\n`),
          verifyProtection: (run) => {
            const n = run(`return (() => {
              const t = createBPlusTree(4);
              for (let i = 1; i <= 50; i++) t.insert(i, i);
              return t.range(1, 50).keys.length;
            })();`) as number;
            assert.equal(n, 50, "range scan walks every leaf through the chain");
          }
        }
      ]
    },
    {
      blockIndex: 2,
      label: "Example 2: estimateAccessCost — index seek vs table scan",
      expectedStdoutIncludes: ['"choice":"index"', '"choice":"seq-scan"', "Error: RangeError"],
      minStdoutLines: 6,
      testValidAndInvalidInputs: (run) => {
        const point = run(
          `return estimateAccessCost({ totalRows: 10000000, rowsPerPage: 100, matchingRows: 1, fanout: 200 });`
        ) as { choice: string; height: number; tablePages: number; seqScanCost: number; indexCost: number };
        assert.equal(point.choice, "index");
        assert.equal(point.height, 4);
        assert.equal(point.tablePages, 100000);
        assert.equal(point.seqScanCost, 100000);
        assert.equal(point.indexCost, 24);
        assert.equal((run(`return estimateAccessCost({ totalRows: 10000000, rowsPerPage: 100, matchingRows: 1, fanout: 200 });`) as { speedup: number }).speedup, 4166.7, "about 4,000x faster for a point lookup");

        const h = (rows: number, fan: number) =>
          (run(`return estimateAccessCost({ totalRows: ${rows}, rowsPerPage: 5, matchingRows: 0, fanout: ${fan} }).height;`) as number);
        assert.equal(h(125, 5), 3, "exactly fanout^3 rows fit in 3 levels (no floating-point overshoot)");
        assert.equal(h(126, 5), 4);
        assert.equal(h(1, 2), 1);
        assert.equal(h(5, 5), 1);
        assert.equal(h(6, 5), 2);

        const choiceAt = (m: number) =>
          (run(`return estimateAccessCost({ totalRows: 10000000, rowsPerPage: 100, matchingRows: ${m}, fanout: 200 }).choice;`) as string);
        assert.equal(choiceAt(24870), "index", "Exercise 3(b): index still wins at 24,870 matches");
        assert.equal(choiceAt(24871), "seq-scan", "Exercise 3(b): the scan wins from 24,871 matches");

        const half = run(
          `return estimateAccessCost({ totalRows: 10000000, rowsPerPage: 100, matchingRows: 5000000, fanout: 200 });`
        ) as { choice: string };
        assert.equal(half.choice, "seq-scan", "a non-selective predicate loses to a sequential scan");

        const covering = run(
          `return estimateAccessCost({ totalRows: 10000000, rowsPerPage: 100, matchingRows: 20000, fanout: 200, covering: true });`
        ) as { indexCost: number };
        const plain = run(
          `return estimateAccessCost({ totalRows: 10000000, rowsPerPage: 100, matchingRows: 20000, fanout: 200 });`
        ) as { indexCost: number };
        assert.ok(covering.indexCost * 100 < plain.indexCost, "a covering index removes the heap fetches");

        const none = run(
          `return estimateAccessCost({ totalRows: 1000, rowsPerPage: 10, matchingRows: 0, fanout: 50 });`
        ) as { choice: string };
        assert.equal(none.choice, "index", "zero matches only costs the descent");

        assert.throws(() => run(`estimateAccessCost(null);`), /input must be a non-null object/);
        assert.throws(() => run(`estimateAccessCost([]);`), /input must be a non-null object/);
        assert.throws(
          () => run(`estimateAccessCost({ totalRows: 10, rowsPerPage: 5, matchingRows: 11, fanout: 4 });`),
          /matchingRows must be an integer between 0 and totalRows/
        );
        assert.throws(
          () => run(`estimateAccessCost({ totalRows: 10, rowsPerPage: 5, matchingRows: -1, fanout: 4 });`),
          /matchingRows must be an integer between 0 and totalRows/
        );
        assert.throws(
          () => run(`estimateAccessCost({ totalRows: 0, rowsPerPage: 5, matchingRows: 0, fanout: 4 });`),
          /totalRows must be a positive integer/
        );
        assert.throws(
          () => run(`estimateAccessCost({ totalRows: NaN, rowsPerPage: 5, matchingRows: 0, fanout: 4 });`),
          /totalRows must be a positive integer/
        );
        assert.throws(
          () => run(`estimateAccessCost({ totalRows: 10, rowsPerPage: 5, matchingRows: 1, fanout: 1 });`),
          /fanout must be at least 2/
        );
        assert.throws(
          () => run(`estimateAccessCost({ totalRows: 10, rowsPerPage: 5, matchingRows: 1, fanout: 4, covering: "yes" });`),
          /covering must be a boolean/
        );
        assert.throws(
          () => run(`estimateAccessCost({ totalRows: 10, rowsPerPage: 5, matchingRows: 1, fanout: 4, randomCostFactor: 0.5 });`),
          /randomCostFactor must be a finite number >= 1/
        );
      },
      safetyMutations: [
        {
          description: "Remove matchingRows <= totalRows guard — matching more rows than exist must throw",
          mutateCode: (raw) => raw.replace(`|| matchingRows > totalRows`, ``),
          verifyProtection: (run) => {
            assert.throws(
              () => run(`estimateAccessCost({ totalRows: 10, rowsPerPage: 5, matchingRows: 11, fanout: 4 });`),
              /matchingRows must be an integer between 0 and totalRows/
            );
          }
        },
        {
          description: "Remove covering boolean guard — a truthy string must not be accepted as covering",
          mutateCode: (raw) =>
            raw.replace(`  if (typeof covering !== "boolean") throw new TypeError("covering must be a boolean");\n`, ``),
          verifyProtection: (run) => {
            assert.throws(
              () => run(`estimateAccessCost({ totalRows: 10, rowsPerPage: 5, matchingRows: 1, fanout: 4, covering: "yes" });`),
              /covering must be a boolean/
            );
          }
        },
        {
          description: "Remove fanout >= 2 guard — fanout 1 would make log(N)/log(1) infinite",
          mutateCode: (raw) => raw.replace(`  if (fanout < 2) throw new RangeError("fanout must be at least 2");\n`, ``),
          verifyProtection: (run) => {
            assert.throws(
              () => run(`estimateAccessCost({ totalRows: 10, rowsPerPage: 5, matchingRows: 1, fanout: 1 });`),
              /fanout must be at least 2/
            );
          }
        }
      ]
    },
    {
      blockIndex: 3,
      label: "Exercise 1: createHashIndex — equality-only hash index",
      expectedStdoutIncludes: ['"loadFactor"', "[[100],[200]]", "equality lookups only"],
      minStdoutLines: 6,
      testValidAndInvalidInputs: (run) => {
        const basic = run(`return (() => {
          const idx = createHashIndex(1);
          idx.put("a", 1); idx.put("b", 2); idx.put("a", 3); idx.put("a", 3);
          const copy = idx.get("a"); copy.push(999);
          return { a: idx.get("a"), b: idx.get("b"), missing: idx.get("zzz"), numVsStr: [idx.get(1), idx.get("1")] };
        })();`) as { a: number[]; b: number[]; missing: number[]; numVsStr: number[][] };
        assert.deepEqual(basic.a, [1, 3], "duplicate rowIds are not repeated and get() returns a copy");
        assert.deepEqual(basic.b, [2]);
        assert.deepEqual(basic.missing, []);
        assert.deepEqual(basic.numVsStr, [[], []]);

        const distinct = run(`return (() => {
          const idx = createHashIndex(4);
          idx.put(1, 100); idx.put("1", 200); idx.put(-0, 300);
          return [idx.get(1), idx.get("1"), idx.get(0)];
        })();`) as number[][];
        assert.deepEqual(distinct, [[100], [200], [300]], "number 1 and string '1' are different keys; -0 equals 0");

        const grown = run(`return (() => {
          const idx = createHashIndex(2);
          for (let i = 0; i < 500; i++) idx.put("key-" + i, i);
          return idx.stats();
        })();`) as { buckets: number; entries: number; loadFactor: number; longestChain: number };
        assert.equal(grown.entries, 500);
        assert.ok(grown.loadFactor <= 0.75, "the table grows to keep the load factor at or below 0.75");
        assert.ok(grown.buckets > 2);
        const allReachable = run(`return (() => {
          const idx = createHashIndex(2);
          for (let i = 0; i < 500; i++) idx.put("key-" + i, i);
          return Array.from({ length: 500 }, (_, i) => idx.get("key-" + i)[0] === i).every(Boolean);
        })();`);
        assert.equal(allReachable, true, "every key stays reachable after repeated rehashing");

        const proto = run(`return (() => {
          const idx = createHashIndex(4);
          const before = idx.get("__proto__");
          idx.put("__proto__", 5);
          return [before, idx.get("__proto__"), idx.get("constructor")];
        })();`) as number[][];
        assert.deepEqual(proto, [[], [5], []], "prototype-looking keys are ordinary keys");

        assert.throws(() => run(`createHashIndex(2).range("a", "z");`), /equality lookups only/);
        for (const bad of ["NaN", "Infinity", "null", "undefined", "{}", "[]", "true"]) {
          assert.throws(() => run(`createHashIndex(2).put(${bad}, 1);`), /key must be a string or finite number/, "key " + bad);
          assert.throws(() => run(`createHashIndex(2).get(${bad});`), /key must be a string or finite number/, "get " + bad);
        }
        for (const badRow of ["-1", "1.5", "NaN", '"1"']) {
          assert.throws(() => run(`createHashIndex(2).put("k", ${badRow});`), /rowId must be a non-negative integer/);
        }
        for (const badBuckets of ["0", "1.5", "2000000", "NaN"]) {
          assert.throws(() => run(`createHashIndex(${badBuckets});`), /initialBuckets must be an integer between 1 and 1048576/);
        }
      },
      safetyMutations: [
        {
          description: "Remove key type guard — put(NaN, ...) must throw a clear TypeError",
          mutateCode: (raw) =>
            raw.replace(`    throw new TypeError("key must be a string or finite number");\n`, ``),
          verifyProtection: (run) => {
            assert.throws(() => run(`createHashIndex(2).put(NaN, 1);`), /key must be a string or finite number/);
          }
        },
        {
          description: "Remove load-factor resize — the table must keep growing",
          mutateCode: (raw) => raw.replace(`    if (entries / buckets.length > 0.75) grow();\n`, ``),
          verifyProtection: (run) => {
            const lf = run(`return (() => {
              const idx = createHashIndex(2);
              for (let i = 0; i < 200; i++) idx.put("k" + i, i);
              return idx.stats().loadFactor;
            })();`) as number;
            assert.ok(lf <= 0.75, "load factor must stay bounded");
          }
        },
        {
          description: "Corrupt the rehash — keys must stay reachable after the table grows",
          mutateCode: (raw) => raw.replace(`buckets[hash(entry.k) % buckets.length].push(entry)`, `buckets[0].push(entry)`),
          verifyProtection: (run) => {
            const ok = run(`return (() => {
              const idx = createHashIndex(2);
              for (let i = 0; i < 100; i++) idx.put("key-" + i, i);
              return Array.from({ length: 100 }, (_, i) => idx.get("key-" + i)[0] === i).every(Boolean);
            })();`);
            assert.equal(ok, true, "all keys reachable after growth");
          }
        },
        {
          description: "Remove rowId guard — put('k', -1) must throw",
          mutateCode: (raw) =>
            raw.replace(
              `    if (!Number.isSafeInteger(rowId) || rowId < 0) throw new RangeError("rowId must be a non-negative integer");\n`,
              ``
            ),
          verifyProtection: (run) => {
            assert.throws(() => run(`createHashIndex(2).put("k", -1);`), /rowId must be a non-negative integer/);
          }
        }
      ]
    },
    {
      blockIndex: 4,
      label: "Exercise 2: countPageReads — clustered vs heap lookups",
      expectedStdoutIncludes: ['"pageReads":153', '"pageReads":53', "Error: TypeError"],
      minStdoutLines: 7,
      testValidAndInvalidInputs: (run) => {
        const reads = (plan: string) => (run(`return countPageReads(${plan}).pageReads;`) as number);
        assert.equal(reads(`{ storage: "clustered", access: "primary-key", indexHeight: 3, clusteredHeight: 3 }`), 3);
        assert.equal(
          reads(`{ storage: "clustered", access: "secondary", indexHeight: 3, clusteredHeight: 3, matches: 50 }`),
          153,
          "3 + 50 * 3"
        );
        assert.equal(
          reads(`{ storage: "clustered", access: "covering-secondary", indexHeight: 3, clusteredHeight: 3, matches: 50 }`),
          3,
          "covering skips the clustered hop"
        );
        assert.equal(reads(`{ storage: "heap", access: "secondary", indexHeight: 3, matches: 50 }`), 53);
        assert.equal(reads(`{ storage: "heap", access: "primary-key", indexHeight: 3 }`), 4, "PK index plus one heap read");
        assert.equal(reads(`{ storage: "heap", access: "primary-key", indexHeight: 3, matches: 0 }`), 3, "no match, no heap read");
        assert.equal(
          reads(`{ storage: "clustered", access: "secondary", indexHeight: 3, clusteredHeight: 4, matches: 0 }`),
          3
        );

        assert.throws(
          () => run(`countPageReads({ storage: "clustered", access: "secondary", indexHeight: 3, clusteredHeight: 3, matches: ${2 ** 52} });`),
          /page read count exceeds the safe integer range/,
          "huge match counts must not silently return an imprecise number"
        );
        assert.throws(() => run(`countPageReads(null);`), /plan must be a non-null object/);
        assert.throws(() => run(`countPageReads([]);`), /plan must be a non-null object/);
        assert.throws(
          () => run(`countPageReads({ storage: "columnar", access: "primary-key", indexHeight: 3 });`),
          /storage must be "clustered" or "heap"/
        );
        assert.throws(
          () => run(`countPageReads({ storage: "heap", access: "scan", indexHeight: 3 });`),
          /access must be one of/
        );
        assert.throws(
          () => run(`countPageReads({ storage: "heap", access: "secondary", indexHeight: 0 });`),
          /indexHeight must be a positive integer/
        );
        assert.throws(
          () => run(`countPageReads({ storage: "heap", access: "secondary", indexHeight: NaN });`),
          /indexHeight must be a positive integer/
        );
        assert.throws(
          () => run(`countPageReads({ storage: "heap", access: "secondary", indexHeight: 3, matches: -1 });`),
          /matches must be a non-negative integer/
        );
        assert.throws(
          () => run(`countPageReads({ storage: "clustered", access: "secondary", indexHeight: 3 });`),
          /clusteredHeight must be a positive integer for clustered storage/
        );
      },
      safetyMutations: [
        {
          description: "Remove clusteredHeight guard — clustered secondary lookups need a clustered tree height",
          mutateCode: (raw) =>
            raw.replace(
              `  if (storage === "clustered" && (!Number.isSafeInteger(clusteredHeight) || clusteredHeight < 1)) {\n    throw new RangeError("clusteredHeight must be a positive integer for clustered storage");\n  }\n`,
              ``
            ),
          verifyProtection: (run) => {
            assert.throws(
              () => run(`countPageReads({ storage: "clustered", access: "secondary", indexHeight: 3 });`),
              /clusteredHeight must be a positive integer for clustered storage/
            );
          }
        },
        {
          description: "Remove safe-integer overflow guard — an imprecise page-read total must be rejected",
          mutateCode: (raw) =>
            raw.replace(`    if (!Number.isSafeInteger(reads)) throw new RangeError("page read count exceeds the safe integer range");\n`, ``),
          verifyProtection: (run) => {
            assert.throws(
              () => run(`countPageReads({ storage: "clustered", access: "secondary", indexHeight: 3, clusteredHeight: 3, matches: ${2 ** 52} });`),
              /page read count exceeds the safe integer range/
            );
          }
        },
        {
          description: "Remove access allow-list — unknown access kinds must be rejected",
          mutateCode: (raw) =>
            raw.replace(`  if (!ACCESS.includes(access)) throw new TypeError("access must be one of: " + ACCESS.join(", "));\n`, ``),
          verifyProtection: (run) => {
            assert.throws(
              () => run(`countPageReads({ storage: "heap", access: "scan", indexHeight: 3 });`),
              /access must be one of/
            );
          }
        },
        {
          description: "Remove matches guard — negative match counts must be rejected",
          mutateCode: (raw) =>
            raw.replace(
              `  if (!Number.isSafeInteger(matches) || matches < 0) throw new RangeError("matches must be a non-negative integer");\n`,
              ``
            ),
          verifyProtection: (run) => {
            assert.throws(
              () => run(`countPageReads({ storage: "heap", access: "secondary", indexHeight: 3, matches: -1 });`),
              /matches must be a non-negative integer/
            );
          }
        }
      ]
    },
    {
      blockIndex: 5,
      label: "Advanced Challenge: createUniqueIndex — NULL semantics, atomic update, composite keys",
      expectedStdoutIncludes: ["DuplicateKeyError:", "SQL Server style: DuplicateKeyError", "composite size: 2"],
      minStdoutLines: 8,
      testValidAndInvalidInputs: (run) => {
        const flow = run(`return (() => {
          const idx = createUniqueIndex({ columns: ["email"] });
          idx.insert(1, { email: "a" });
          idx.insert(2, { email: "b" });
          let dup = null;
          try { idx.update(2, { email: "a" }); } catch (e) { dup = e.name; }
          const afterFailedUpdate = [idx.lookup({ email: "a" }), idx.lookup({ email: "b" })];
          idx.update(2, { email: "b" });
          idx.update(1, { email: "c" });
          idx.insert(3, { email: "a" });
          const removed = idx.remove(3);
          const removedAgain = idx.remove(3);
          idx.insert(4, { email: "a" });
          return { dup, afterFailedUpdate, removed, removedAgain, size: idx.size(), lookupC: idx.lookup({ email: "c" }) };
        })();`) as {
          dup: string; afterFailedUpdate: number[]; removed: boolean; removedAgain: boolean; size: number; lookupC: number;
        };
        assert.equal(flow.dup, "DuplicateKeyError");
        assert.deepEqual(flow.afterFailedUpdate, [1, 2], "a rejected update changes nothing (atomic)");
        assert.equal(flow.removed, true);
        assert.equal(flow.removedAgain, false);
        assert.equal(flow.size, 3);
        assert.equal(flow.lookupC, 1);

        const nulls = run(`return (() => {
          const pg = createUniqueIndex({ columns: ["email"] });
          pg.insert(1, { email: null }); pg.insert(2, { email: null });
          const sql = createUniqueIndex({ columns: ["email"], nullsDistinct: false });
          sql.insert(1, { email: null });
          let second = null;
          try { sql.insert(2, { email: null }); } catch (e) { second = e.name; }
          const comp = createUniqueIndex({ columns: ["tenant", "slug"] });
          comp.insert(1, { tenant: "t1", slug: "home" });
          comp.insert(2, { tenant: "t2", slug: "home" });
          comp.insert(3, { tenant: "t1", slug: null });
          comp.insert(4, { tenant: "t1", slug: null });
          let compDup = null;
          try { comp.insert(5, { tenant: "t1", slug: "home" }); } catch (e) { compDup = e.name; }
          return { pgSize: pg.size(), second, compSize: comp.size(), compDup };
        })();`) as { pgSize: number; second: string; compSize: number; compDup: string };
        assert.equal(nulls.pgSize, 2, "PostgreSQL/MySQL style: multiple NULLs allowed");
        assert.equal(nulls.second, "DuplicateKeyError", "SQL Server style: a second NULL is a duplicate");
        assert.equal(nulls.compSize, 4);
        assert.equal(nulls.compDup, "DuplicateKeyError");

        assert.equal(
          run(`return (() => { const i = createUniqueIndex({ columns: ["n"] }); i.insert(1, { n: -0 }); return i.lookup({ n: 0 }); })();`),
          1,
          "-0 and 0 are the same key"
        );

        for (const bad of ["NaN", "Infinity", "undefined", "true", "{}", "[]"]) {
          assert.throws(
            () => run(`createUniqueIndex({ columns: ["email"] }).insert(1, { email: ${bad} });`),
            /indexed values must be string, finite number or null/,
            "value " + bad
          );
        }
        assert.throws(
          () => run(`createUniqueIndex({ columns: ["a", "b"] }).insert(1, { a: "x" });`),
          /row is missing indexed column: b/
        );
        assert.throws(
          () => run(`createUniqueIndex({ columns: ["email"] }).insert(1, Object.create({ email: "inherited" }));`),
          /row is missing indexed column: email/,
          "inherited properties do not count"
        );
        assert.throws(() => run(`createUniqueIndex({ columns: ["e"] }).insert(1, []);`), /row must be a plain object/);
        assert.throws(() => run(`createUniqueIndex({ columns: ["e"] }).insert(1, null);`), /row must be a plain object/);
        assert.throws(
          () => run(`(() => { const i = createUniqueIndex({ columns: ["e"] }); i.insert(1, { e: "x" }); i.insert(1, { e: "y" }); })();`),
          /rowId already indexed: 1/
        );
        assert.throws(
          () => run(`createUniqueIndex({ columns: ["e"] }).update(9, { e: "x" });`),
          /rowId is not indexed: 9/
        );
        for (const badId of ["-1", "1.5", "NaN", '"1"']) {
          assert.throws(
            () => run(`createUniqueIndex({ columns: ["e"] }).insert(${badId}, { e: "x" });`),
            /rowId must be a non-negative integer/
          );
        }
        const copied = run(`return (() => {
          const cols = ["email"];
          const idx = createUniqueIndex({ columns: cols });
          cols.push("tenant");
          idx.insert(1, { email: "a" });
          return idx.size();
        })();`);
        assert.equal(copied, 1, "mutating the caller's columns array later does not change the index definition");
        assert.throws(() => run(`createUniqueIndex(null);`), /options must be a non-null object/);
        assert.throws(() => run(`createUniqueIndex({ columns: [] });`), /columns must be a non-empty array/);
        assert.throws(() => run(`createUniqueIndex({ columns: [" "] });`), /column names must be non-empty strings/);
        assert.throws(() => run(`createUniqueIndex({ columns: ["__proto__"] });`), /column name is not allowed/);
        assert.throws(() => run(`createUniqueIndex({ columns: ["a", "a"] });`), /duplicate column in index definition: a/);
        assert.throws(
          () => run(`createUniqueIndex({ columns: ["a"], nullsDistinct: "yes" });`),
          /nullsDistinct must be a boolean/
        );
      },
      safetyMutations: [
        {
          description: "Remove duplicate probe on insert — a second identical key must be rejected",
          mutateCode: (raw) =>
            raw.replace(`    if (key !== null && byKey.has(key)) throw duplicateError();\n`, ``),
          verifyProtection: (run) => {
            assert.throws(
              () => run(`(() => { const i = createUniqueIndex({ columns: ["e"] }); i.insert(1, { e: "x" }); i.insert(2, { e: "x" }); })();`),
              /Duplicate entry for unique index/
            );
          }
        },
        {
          description: "Remove ownership check in update — updating onto another row's key must be rejected atomically",
          mutateCode: (raw) =>
            raw.replace(`    if (owner !== undefined && owner !== rowId) throw duplicateError(); // nothing changed: the update is atomic\n`, ``),
          verifyProtection: (run) => {
            assert.throws(
              () =>
                run(`(() => {
                  const i = createUniqueIndex({ columns: ["e"] });
                  i.insert(1, { e: "x" });
                  i.insert(2, { e: "y" });
                  i.update(2, { e: "x" });
                })();`),
              /Duplicate entry for unique index/
            );
          }
        },
        {
          description: "Ignore nullsDistinct — PostgreSQL/MySQL style indexes must allow multiple NULLs",
          mutateCode: (raw) => raw.replace(`    return hasNull && nullsDistinct ? null : JSON.stringify(tuple);\n`, `    return JSON.stringify(tuple);\n`),
          verifyProtection: (run) => {
            const size = run(`return (() => {
              const i = createUniqueIndex({ columns: ["email"] });
              i.insert(1, { email: null });
              i.insert(2, { email: null });
              return i.size();
            })();`);
            assert.equal(size, 2, "two NULLs are distinct when nullsDistinct is true");
          }
        },
        {
          description: "Remove own-property check — inherited values must not count as indexed columns",
          mutateCode: (raw) =>
            raw.replace(
              `      if (!Object.hasOwn(row, column)) throw new TypeError("row is missing indexed column: " + column);\n`,
              ``
            ),
          verifyProtection: (run) => {
            assert.throws(
              () => run(`createUniqueIndex({ columns: ["email"] }).insert(1, Object.create({ email: "inherited" }));`),
              /row is missing indexed column: email/
            );
          }
        },
        {
          description: "Remove finite-number validation — NaN must not be indexable",
          mutateCode: (raw) =>
            raw.replace(
              `      if (typeof value === "number" && Number.isFinite(value)) return Object.is(value, -0) ? 0 : value;\n      throw new TypeError("indexed values must be string, finite number or null");\n`,
              `      return value;\n`
            ),
          verifyProtection: (run) => {
            assert.throws(
              () => run(`createUniqueIndex({ columns: ["n"] }).insert(1, { n: NaN });`),
              /indexed values must be string, finite number or null/
            );
          }
        }
      ]
    }
  ]
};
