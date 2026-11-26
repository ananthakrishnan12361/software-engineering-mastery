import assert from "node:assert/strict";
import type { LessonCoverageSpec } from "./types";

export const m01p1Coverage: LessonCoverageSpec = {
  lessonId: "m01-p1",
  moduleNumber: 1,
  mdxPath: "content/modules/01-programming/m01-p1.mdx",
  topics: [
    {
      topicTitle: "Programming fundamentals",
      anchorId: "m01-p1-topic-fundamentals",
      explanationHeadings: [
        "1. Programming Fundamentals: Expressions, Statements & Control Flow",
        "1. How a JS Engine Parses and Executes Code",
        "2. Stack vs. Heap Memory & Call Stack Frames"
      ],
      exampleTitles: [
        "Example 3: Pass-by-Sharing, Pure Functions & Higher-Order Composition",
        "Exercise 2: Stack-Safe Iterative Array Flattener"
      ],
      interviewQuestionIds: ["m01-p1-iq-1", "m01-p1-iq-6", "m01-p1-iq-11"],
      exerciseTitles: ["Exercise 2: Stack-Safe Iterative Array Flattener"]
    },
    {
      topicTitle: "Variables",
      anchorId: "m01-p1-topic-variables",
      explanationHeadings: [
        "2. Variables: Labels, Not Boxes",
        "1. Variable Declarations: `var` vs. `let` vs. `const`"
      ],
      exampleTitles: ["Example 1: Variable Bindings, TDZ, and Reference vs. Reassignment"],
      interviewQuestionIds: ["m01-p1-iq-2", "m01-p1-iq-7"],
      exerciseTitles: ["Exercise 3: Pure Request Normalizer & Higher-Order Pipeline"]
    },
    {
      topicTitle: "Data types",
      anchorId: "m01-p1-topic-data-types",
      explanationHeadings: [
        "3. Data Types: The 8 ECMAScript Types",
        "3. IEEE-754 Double-Precision Floating Point & Tagged Values",
        "2. Primitive Types vs. Reference Types (Objects)"
      ],
      exampleTitles: [
        "Example 2: Data Types, IEEE-754 Precision, BigInt, and Coercion",
        "Scenario 2: Node.js / Express Request Boundary Normalization"
      ],
      interviewQuestionIds: [
        "m01-p1-iq-1",
        "m01-p1-iq-3",
        "m01-p1-iq-4",
        "m01-p1-iq-5",
        "m01-p1-iq-9",
        "m01-p1-iq-10",
        "m01-p1-iq-12",
        "m01-p1-iq-13",
        "m01-p1-iq-14"
      ],
      exerciseTitles: ["Exercise 1: Precision-Safe Invoice Splitter"]
    },
    {
      topicTitle: "Functions",
      anchorId: "m01-p1-topic-functions",
      explanationHeadings: [
        "4. Functions: Inputs, Scope, Return Values & First-Class Citizenship",
        "3. Function Declaration vs. Expression vs. Arrow Function (Fundamentals)"
      ],
      exampleTitles: ["Example 3: Pass-by-Sharing, Pure Functions & Higher-Order Composition"],
      interviewQuestionIds: ["m01-p1-iq-6", "m01-p1-iq-8", "m01-p1-iq-11"],
      exerciseTitles: ["Exercise 3: Pure Request Normalizer & Higher-Order Pipeline"]
    }
  ],
  codeTests: [
    {
      blockIndex: 1,
      label: "Example 1: Variable Bindings, TDZ, and Reference vs. Reassignment",
      expectedStdoutIncludes: [
        "Mutated config:",
        "Inside block: only inside block",
        "Outside block (var): leaks out of block",
        "typeof blockScoped outside: undefined",
        "TDZ caught: ReferenceError",
        "After declaration: 15"
      ],
      minStdoutLines: 6,
      testValidAndInvalidInputs: (run) => {
        const res = run(`return { tdz: testTdz(), cfg: config, fnVar: functionScoped };`) as {
          tdz: number;
          cfg: { retries: number };
          fnVar: string;
        };
        assert.equal(res.tdz, 15);
        assert.equal(res.cfg.retries, 5);
        assert.equal(res.fnVar, "leaks out of block");

        // Invalid reassignment of const throws TypeError under strict mode
        assert.throws(() => {
          run(`const x = { a: 1 }; x = { a: 2 };`);
        }, TypeError);
      }
    },
    {
      blockIndex: 2,
      label: "Example 2: Data Types, IEEE-754 Precision, BigInt, and Coercion",
      expectedStdoutIncludes: [
        "0.1 + 0.2 = 0.30000000000000004 | === 0.3? false",
        "Cents sum: 30 => $0.30",
        "Unsafe Number equality: true",
        "BigInt exact equality: false",
        "typeof null: object",
        "isNaN('abc'): true | Number.isNaN('abc'): false"
      ],
      minStdoutLines: 8,
      testValidAndInvalidInputs: (run) => {
        const res = run(`return { centsSum, safeEq: 9007199254740992n === 9007199254740993n };`) as {
          centsSum: number;
          safeEq: boolean;
        };
        assert.equal(res.centsSum, 30);
        assert.equal(res.safeEq, false);
        assert.equal(run(`return Number.isNaN("not-a-number");`), false);
      }
    },
    {
      blockIndex: 3,
      label: "Example 3: Pass-by-Sharing, Pure Functions & Higher-Order Composition",
      expectedStdoutIncludes: [
        "Caller payload:",
        "Caller count: 5",
        "Subtotal cents: 3598 | With 20% VAT: 4318"
      ],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        assert.equal(run(`return calculateLineTotalCents(1999, 2, 0.1);`), 3598);
        assert.equal(run(`return calculateLineTotalCents(1000, 1, 0);`), 1000);
        assert.equal(run(`return calculateLineTotalCents(1000, 1, 1);`), 0);
        assert.equal(run(`return Object.is(calculateLineTotalCents(-0, 1), 0);`), true);
        assert.equal(run(`return createTaxCalculator(0.2)(3598);`), 4318);
        assert.equal(run(`return createTaxCalculator(0)(3598);`), 3598);
        assert.equal(run(`return Object.is(createTaxCalculator(0.2)(-0), 0);`), true);
        assert.throws(() => run(`return calculateLineTotalCents(Number.MAX_SAFE_INTEGER, 2);`), RangeError);
        assert.throws(() => run(`return createTaxCalculator(0.5)(Number.MAX_SAFE_INTEGER);`), RangeError);
        assert.throws(() => run(`return calculateLineTotalCents(19.99, 1);`), TypeError);
        assert.throws(() => run(`return calculateLineTotalCents(-50, 1);`), TypeError);
        assert.throws(() => run(`return calculateLineTotalCents(100, -1);`), TypeError);
        assert.throws(() => run(`return calculateLineTotalCents(100, 1, -0.5);`), RangeError);
        assert.throws(() => run(`return calculateLineTotalCents(100, 1, 2);`), RangeError);
        assert.throws(() => run(`return calculateLineTotalCents(100, 1, NaN);`), TypeError);
        assert.throws(() => run(`return calculateLineTotalCents(100, 1, Infinity);`), TypeError);
        assert.throws(() => run(`return calculateLineTotalCents(100, 1, "0.1");`), TypeError);
        assert.throws(() => run(`return createTaxCalculator(-0.1);`), RangeError);
        assert.throws(() => run(`return createTaxCalculator(1.5);`), RangeError);
        assert.throws(() => run(`return createTaxCalculator(NaN);`), TypeError);
        assert.throws(() => run(`return createTaxCalculator("0.2");`), TypeError);
        assert.throws(() => run(`return createTaxCalculator(0.2)(-100);`), TypeError);
        assert.throws(() => run(`return createTaxCalculator(0.2)(19.99);`), TypeError);
        assert.throws(() => run(`return createTaxCalculator(0.2)(NaN);`), TypeError);
      },
      safetyMutations: [
        {
          description: "Removing integer/non-negative guard in calculateLineTotalCents allows invalid negative input",
          mutateCode: (raw) =>
            raw.replace(
              /if \(!Number\.isSafeInteger\(unitPriceCents\) \|\| unitPriceCents < 0\)\s*\{[^}]*\}/,
              "/* guard removed */"
            ),
          verifyProtection: (run) => {
            assert.throws(() => run(`return calculateLineTotalCents(-100, 2);`), TypeError);
          }
        },
        {
          description: "Removing discountRate range check allows negative/inflated discount totals",
          mutateCode: (raw) =>
            raw.replace(/if \(discountRate < 0 \|\| discountRate > 1\)\s*\{[^}]*\}/, "/* discount range removed */"),
          verifyProtection: (run) => {
            assert.throws(() => run(`return calculateLineTotalCents(1000, 1, 2);`), RangeError);
          }
        },
        {
          description: "Removing taxRate validation in createTaxCalculator allows negative/invalid tax rate",
          mutateCode: (raw) =>
            raw.replace(/if \(taxRate < 0 \|\| taxRate > 1\)\s*\{[^}]*\}/, "/* tax range removed */"),
          verifyProtection: (run) => {
            assert.throws(() => run(`return createTaxCalculator(-0.5);`), RangeError);
          }
        }
      ]
    },
    {
      blockIndex: 4,
      label: "Scenario 2: Node.js / Express Request Boundary Normalization",
      expectedStdoutIncludes: ['"page":3', '"active":false'],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.deepEqual(run(`return parseQueryFlags({ page: "1", active: "true" });`), { page: 1, active: true });
        assert.deepEqual(run(`return parseQueryFlags({ page: 5 });`), { page: 5, active: null });
        assert.deepEqual(run(`return parseQueryFlags(Object.assign(Object.create(null), { page: "2" }));`), {
          page: 2,
          active: null
        });
        assert.deepEqual(run(`return parseQueryFlags({});`), { page: 1, active: null });
        assert.throws(() => run(`return parseQueryFlags(null);`), TypeError);
        assert.throws(() => run(`return parseQueryFlags(undefined);`), TypeError);
        assert.throws(() => run(`return parseQueryFlags([]);`), TypeError);
        assert.throws(() => run(`return parseQueryFlags(new Date());`), TypeError);
        assert.throws(() => run(`return parseQueryFlags("page=1");`), TypeError);
        assert.throws(() => run(`return parseQueryFlags({ page: null });`), TypeError);
        assert.throws(() => run(`return parseQueryFlags({ page: true });`), TypeError);
        assert.throws(() => run(`return parseQueryFlags({ page: [2] });`), TypeError);
        assert.throws(() => run(`return parseQueryFlags({ page: "1e2" });`), TypeError);
        assert.throws(() => run(`return parseQueryFlags({ page: "abc" });`), TypeError);
        assert.throws(() => run(`return parseQueryFlags({ page: "" });`), TypeError);
        assert.throws(() => run(`return parseQueryFlags({ page: 1.5 });`), TypeError);
        assert.throws(() => run(`return parseQueryFlags({ page: "0" });`), RangeError);
        assert.throws(() => run(`return parseQueryFlags({ page: "-3" });`), RangeError);
        assert.throws(() => run(`return parseQueryFlags({ page: "99999" });`), RangeError);
        assert.throws(() => run(`return parseQueryFlags({ active: "yes" });`), TypeError);
      },
      safetyMutations: [
        {
          description: "Removing plain-object prototype guard accepts arrays and Date objects instead of throwing TypeError",
          mutateCode: (raw) =>
            raw
              .replace(
                /if \(query === null \|\| typeof query !== "object" \|\| Array\.isArray\(query\)\)\s*\{[^}]*\}/,
                "/* query guard removed */"
              )
              .replace(/if \(proto !== Object\.prototype && proto !== null\)\s*\{[^}]*\}/, "/* proto guard removed */"),
          verifyProtection: (run) => {
            assert.throws(() => run(`return parseQueryFlags([]);`), TypeError);
          }
        },
        {
          description: "Removing strict integer page check allows boolean/scientific-notation coercion",
          mutateCode: (raw) =>
            raw.replace(
              /else if \(typeof rawPage === "string" && \/\^\-\?\[0-9\]\+\$\/\.test\(rawPage\.trim\(\)\)\)\s*\{[^}]*\}\s*else\s*\{[^}]*\}/,
              "else { page = Number(rawPage); }"
            ),
          verifyProtection: (run) => {
            assert.throws(() => run(`return parseQueryFlags({ page: true });`), TypeError);
          }
        },
        {
          description: "Removing page bounds validation allows invalid page=0/negative page",
          mutateCode: (raw) =>
            raw.replace(
              /if \(!Number\.isSafeInteger\(page\) \|\| page < 1 \|\| page > 10000\)\s*\{[^}]*\}/,
              "/* guard removed */"
            ),
          verifyProtection: (run) => {
            assert.throws(() => run(`return parseQueryFlags({ page: "0" });`), RangeError);
          }
        }
      ]
    },
    {
      blockIndex: 5,
      label: "Exercise 1: Precision-Safe Invoice Splitter",
      expectedStdoutIncludes: ["$10.00 / 3:", "[334,333,333]"],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.deepEqual(run(`return splitAmountCents(1000, 3);`), [334, 333, 333]);
        assert.deepEqual(run(`return splitAmountCents(0, 3);`), [0, 0, 0]);
        assert.equal(run(`return splitAmountCents(-0, 2).every((v) => Object.is(v, 0));`), true);
        assert.throws(() => run(`return splitAmountCents(10.5, 2);`), TypeError);
        assert.throws(() => run(`return splitAmountCents(-1, 2);`), TypeError);
        assert.throws(() => run(`return splitAmountCents(100, 0);`), TypeError);
        assert.throws(() => run(`return splitAmountCents(100, Number.MAX_SAFE_INTEGER);`), RangeError);
      },
      safetyMutations: [
        {
          description: "Removing safe-integer guard allows negative/fractional cents in invoice splitting",
          mutateCode: (raw) =>
            raw.replace(
              /if \(!Number\.isSafeInteger\(totalCents\) \|\| totalCents < 0\)\s*\{[^}]*\}/,
              "/* guard removed */"
            ),
          verifyProtection: (run) => {
            assert.throws(() => run(`return splitAmountCents(-100, 2);`), TypeError);
          }
        }
      ]
    },
    {
      blockIndex: 6,
      label: "Exercise 2: Stack-Safe Iterative Array Flattener",
      expectedStdoutIncludes: ["[1,2,3,4,5]"],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.deepEqual(run(`return flattenIterative([1, [2, [3, 4]], 5]);`), [1, 2, 3, 4, 5]);
        // Shared non-cyclic references (DAG) must flatten cleanly without false cycle errors
        assert.deepEqual(run(`const shared = [1, 2]; return flattenIterative([shared, shared]);`), [1, 2, 1, 2]);
        // Deep 2000-level nesting succeeds without JS call stack overflow when maxDepth allows it
        assert.deepEqual(
          run(`let a = [42]; for (let i = 0; i < 2000; i++) a = [a]; return flattenIterative(a, 2500);`),
          [42]
        );
        assert.throws(() => run(`return flattenIterative("not-array");`), TypeError);
        assert.throws(() => run(`return flattenIterative([1], NaN);`), TypeError);
        assert.throws(() => run(`return flattenIterative([1], Infinity);`), TypeError);
        assert.throws(() => run(`return flattenIterative([1], 1.5);`), TypeError);
        assert.throws(() => run(`return flattenIterative([1], "2");`), TypeError);
        assert.throws(() => run(`return flattenIterative([1], 0);`), RangeError);
        assert.throws(() => run(`return flattenIterative([1], -1);`), RangeError);
        assert.throws(() => run(`return flattenIterative([[[1]]], 2);`), RangeError);
        assert.throws(() => {
          run(`const cyc = []; cyc.push(cyc); return flattenIterative(cyc);`);
        }, TypeError);
        assert.throws(() => {
          run(`const a = []; const b = [a]; a.push(b); return flattenIterative(a);`);
        }, TypeError);
      },
      safetyMutations: [
        {
          description: "Removing maxDepth type/integer guard allows NaN/Infinity to bypass depth limiting",
          mutateCode: (raw) =>
            raw.replace(
              /if \(typeof maxDepth !== "number" \|\| !Number\.isSafeInteger\(maxDepth\)\)\s*\{[^}]*\}/,
              "/* maxDepth type guard removed */"
            ),
          verifyProtection: (run) => {
            assert.throws(() => run(`return flattenIterative([1], NaN);`), TypeError);
          }
        },
        {
          description: "Removing maxDepth guard allows unbounded nesting past configured limit",
          mutateCode: (raw) => raw.replace(/if \(depth >= maxDepth\)\s*\{[^}]*\}/, "/* guard removed */"),
          verifyProtection: (run) => {
            assert.throws(() => run(`return flattenIterative([[[1]]], 2);`), RangeError);
          }
        },
        {
          description: "Removing ancestor cycle guard turns cyclic array into depth-error instead of cycle TypeError",
          mutateCode: (raw) => raw.replace(/if \(active\.has\(value\)\)\s*\{[^}]*\}/, "/* cycle guard removed */"),
          verifyProtection: (run) => {
            assert.throws(
              () => run(`const cyc = []; cyc.push(cyc); return flattenIterative(cyc);`),
              /Cyclic array reference/
            );
          }
        }
      ]
    },
    {
      blockIndex: 7,
      label: "Exercise 3: Pure Request Normalizer & Higher-Order Pipeline",
      expectedStdoutIncludes: ['"email":"alice@example.com"', '"age":25', '"email":"  Alice@Example.COM "'],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        const res = run(`const src = { email: "  BOB@DEV.IO ", age: "30" }; return { out: normalizeSignup(src), src };`) as {
          out: { email: string; age: number };
          src: { email: string; age: string };
        };
        assert.equal(res.out.email, "bob@dev.io");
        assert.equal(res.out.age, 30);
        assert.equal(res.src.age, "30"); // Input unmutated
        assert.deepEqual(run(`return normalizeSignup(Object.assign(Object.create(null), { email: "A@B.COM", age: 21 }));`), {
          email: "a@b.com",
          age: 21
        });
        assert.throws(() => run(`return composeValidators("not-a-fn");`), TypeError);
        assert.throws(() => run(`return composeValidators((u) => u)([]);`), TypeError);
        assert.throws(() => run(`return normalizeSignup(null);`), TypeError);
        assert.throws(() => run(`return normalizeSignup(undefined);`), TypeError);
        assert.throws(() => run(`return normalizeSignup([]);`), TypeError);
        assert.throws(() => run(`return normalizeSignup("abc");`), TypeError);
        assert.throws(() => run(`return normalizeSignup(new Date());`), TypeError);
        assert.throws(() => run(`return normalizeSignup({ age: 25 });`), TypeError);
        assert.throws(() => run(`return normalizeSignup({ email: "   ", age: 25 });`), TypeError);
        assert.throws(() => run(`return normalizeSignup({ email: { a: 1 }, age: 25 });`), TypeError);
        assert.throws(() => run(`return normalizeSignup({ email: "a@b.com", age: [25] });`), TypeError);
        assert.throws(() => run(`return normalizeSignup({ email: "a@b.com", age: "1e2" });`), TypeError);
        assert.throws(() => run(`return normalizeSignup({ email: "a@b.com", age: "0x19" });`), TypeError);
        assert.throws(() => run(`return normalizeSignup({ email: "a@b.com", age: { valueOf: () => 25 } });`), TypeError);
        assert.throws(() => run(`return normalizeSignup({ email: "a@b.com", age: 9007199254740992 });`), TypeError);
        assert.throws(() => run(`return normalizeSignup({ email: "a@b.com", age: "17" });`), RangeError);
        assert.throws(() => run(`return normalizeSignup({ email: "a@b.com", age: 150 });`), RangeError);
        assert.throws(() => run(`return normalizeSignup({ email: "a@b.com", age: "abc" });`), TypeError);
      },
      safetyMutations: [
        {
          description: "Removing plain-object guard in runPipeline allows arrays to spread silently",
          mutateCode: (raw) =>
            raw
              .replace(
                /if \(initialInput === null \|\| typeof initialInput !== "object" \|\| Array\.isArray\(initialInput\)\)\s*\{[^}]*\}/,
                "/* input guard removed */"
              )
              .replace(/if \(proto !== Object\.prototype && proto !== null\)\s*\{[^}]*\}/, "/* proto guard removed */"),
          verifyProtection: (run) => {
            assert.throws(() => run(`return composeValidators((u) => u)([]);`), TypeError);
          }
        },
        {
          description: "Removing email string validation allows non-string objects to coerce to [object object]",
          mutateCode: (raw) =>
            raw.replace(
              /if \(typeof rawEmail !== "string" \|\| rawEmail\.trim\(\)\.length === 0\)\s*\{[^}]*\}\s*return \{ \.\.\.u, email: rawEmail\.trim\(\)\.toLowerCase\(\) \};/,
              'return { ...u, email: String(rawEmail ?? "").trim().toLowerCase() };'
            ),
          verifyProtection: (run) => {
            assert.throws(() => run(`return normalizeSignup({ email: { a: 1 }, age: 25 });`), TypeError);
          }
        },
        {
          description: "Removing strict age type check allows array coercion ([25]) through requireAge",
          mutateCode: (raw) =>
            raw.replace(
              /else if \(typeof rawAge === "string" && \/\^\-\?\[0-9\]\+\$\/\.test\(rawAge\.trim\(\)\)\)\s*\{[^}]*\}\s*else\s*\{[^}]*\}/,
              "else { age = Number(rawAge); }"
            ),
          verifyProtection: (run) => {
            assert.throws(() => run(`return normalizeSignup({ email: "a@b.com", age: [25] });`), TypeError);
          }
        },
        {
          description: "Removing minimum-age check allows underage signup through pipeline",
          mutateCode: (raw) =>
            raw.replace(
              /if \(!Number\.isSafeInteger\(age\) \|\| age < 18 \|\| age > 130\)\s*\{[^}]*\}/,
              "/* guard removed */"
            ),
          verifyProtection: (run) => {
            assert.throws(() => run(`return normalizeSignup({ email: "a@b.com", age: "12" });`), RangeError);
          }
        }
      ]
    }
  ]
};
