import assert from "node:assert/strict";
import type { LessonCoverageSpec } from "./types";

export const m01p2Coverage: LessonCoverageSpec = {
  lessonId: "m01-p2",
  moduleNumber: 1,
  mdxPath: "content/modules/01-programming/m01-p2.mdx",
  topics: [
    {
      topicTitle: "Objects",
      anchorId: "m01-p2-topic-objects",
      explanationHeadings: [
        "1. Objects: Key-Value Records, Prototypes & Property Descriptors",
        "1. V8 Hidden Classes (Maps) & Inline Caches for Objects",
        "1. Plain `Object` vs. `Map` vs. `Set` vs. `WeakMap` / `WeakSet`",
        "2. Shallow vs. Deep Copying Strategies"
      ],
      exampleTitles: [
        "Example 1: Objects, `Object.hasOwn`, Property Descriptors & `structuredClone`",
        "Example 6: `WeakMap` & `WeakSet` for Leak-Free Object Metadata"
      ],
      interviewQuestionIds: ["m01-p2-iq-2", "m01-p2-iq-3", "m01-p2-iq-5", "m01-p2-iq-6"],
      exerciseTitles: ["Exercise 1: Prototype-Pollution-Safe Config Merger"]
    },
    {
      topicTitle: "Arrays",
      anchorId: "m01-p2-topic-arrays",
      explanationHeadings: [
        "2. Arrays: Ordered Lists, Mutation Traps & Non-Mutating Methods",
        "2. V8 Array Elements Kinds (Packed vs. Holey Transitions)"
      ],
      exampleTitles: [
        "Example 2: Arrays — Default `.sort()` Trap, `toSorted()` (ES2023), and Avoiding Holes"
      ],
      interviewQuestionIds: ["m01-p2-iq-4", "m01-p2-iq-5"],
      exerciseTitles: ["Exercise 2: Non-Mutating Array Analytics Pipeline"]
    },
    {
      topicTitle: "Classes",
      anchorId: "m01-p2-topic-classes",
      explanationHeadings: [
        "3. Classes: Blueprints, Constructors, Accessors & Static Members",
        "3. How ES2015+ Classes & ES2022 `#private` Fields Work"
      ],
      exampleTitles: ["Example 3: Classes, `#private` Encapsulation, Polymorphism & SOLID in Action"],
      interviewQuestionIds: ["m01-p2-iq-8", "m01-p2-iq-1"],
      exerciseTitles: ["Exercise 3: Refactoring Switch Logic to SOLID (OCP + DIP)"]
    },
    {
      topicTitle: "OOP",
      anchorId: "m01-p2-topic-oop",
      explanationHeadings: [
        "4. OOP: Modeling Domains Around Collaborating Objects",
        "3. Composition vs. Inheritance"
      ],
      exampleTitles: ["Example 3: Classes, `#private` Encapsulation, Polymorphism & SOLID in Action"],
      interviewQuestionIds: ["m01-p2-iq-1", "m01-p2-iq-7"],
      exerciseTitles: ["Exercise 3: Refactoring Switch Logic to SOLID (OCP + DIP)"]
    },
    {
      topicTitle: "Encapsulation",
      anchorId: "m01-p2-topic-encapsulation",
      explanationHeadings: [
        "5. Encapsulation: Protecting Invariants with `#private` State",
        "3. How ES2015+ Classes & ES2022 `#private` Fields Work"
      ],
      exampleTitles: ["Example 3: Classes, `#private` Encapsulation, Polymorphism & SOLID in Action"],
      interviewQuestionIds: ["m01-p2-iq-1", "m01-p2-iq-8"],
      exerciseTitles: ["Exercise 3: Refactoring Switch Logic to SOLID (OCP + DIP)"]
    },
    {
      topicTitle: "Abstraction",
      anchorId: "m01-p2-topic-abstraction",
      explanationHeadings: [
        "6. Abstraction: Minimal Public Contracts Over Complex Internals",
        "4. Dependency Inversion & Composition Flow"
      ],
      exampleTitles: ["Example 3: Classes, `#private` Encapsulation, Polymorphism & SOLID in Action"],
      interviewQuestionIds: ["m01-p2-iq-1", "m01-p2-iq-7"],
      exerciseTitles: ["Exercise 3: Refactoring Switch Logic to SOLID (OCP + DIP)"]
    },
    {
      topicTitle: "Inheritance",
      anchorId: "m01-p2-topic-inheritance",
      explanationHeadings: [
        "7. Inheritance: Shallow `extends` Taxonomies vs. Composition",
        "3. Composition vs. Inheritance"
      ],
      exampleTitles: ["Example 4: Inheritance (`extends`, `super`), `#private` Isolation & Liskov Substitution"],
      interviewQuestionIds: ["m01-p2-iq-1", "m01-p2-iq-9"],
      exerciseTitles: ["Exercise 3: Refactoring Switch Logic to SOLID (OCP + DIP)"]
    },
    {
      topicTitle: "Polymorphism",
      anchorId: "m01-p2-topic-polymorphism",
      explanationHeadings: [
        "8. Polymorphism: Uniform Dispatch Across Interchangeable Types",
        "Scenario 1: Multi-Gateway Billing Service (Abstraction, Polymorphism, OCP & DIP)"
      ],
      exampleTitles: ["Example 3: Classes, `#private` Encapsulation, Polymorphism & SOLID in Action"],
      interviewQuestionIds: ["m01-p2-iq-1", "m01-p2-iq-7"],
      exerciseTitles: ["Exercise 3: Refactoring Switch Logic to SOLID (OCP + DIP)"]
    },
    {
      topicTitle: "SOLID fundamentals",
      anchorId: "m01-p2-topic-solid",
      explanationHeadings: [
        "9. SOLID Fundamentals: Five Guidelines for Modular Change",
        "4. SOLID Principles Quick Decision Guide"
      ],
      exampleTitles: [
        "Example 3: Classes, `#private` Encapsulation, Polymorphism & SOLID in Action",
        "Example 5: SOLID — Single Responsibility (SRP) & Interface Segregation (ISP)"
      ],
      interviewQuestionIds: ["m01-p2-iq-7", "m01-p2-iq-9"],
      exerciseTitles: ["Exercise 3: Refactoring Switch Logic to SOLID (OCP + DIP)"]
    }
  ],
  codeTests: [
    {
      blockIndex: 1,
      label: "Example 1: Objects, Object.hasOwn, Property Descriptors & structuredClone",
      expectedStdoutIncludes: [
        "Object.hasOwn on null-proto: true",
        "toString in plain {}: true | Object.hasOwn: false",
        '"writable":false',
        "Original affected by shallow copy: dark",
        "Original isolated after structuredClone: dark | Deep: light"
      ],
      minStdoutLines: 5,
      testValidAndInvalidInputs: (run) => {
        const res = run(`
          const sym = Symbol("id");
          const withSym = { [sym]: 99 };
          return {
            ownRole: Object.hasOwn(dict, "role"),
            hasProto: "toString" in dict,
            ownSym: Object.hasOwn(withSym, sym),
            frozenWritable: Object.getOwnPropertyDescriptor(frozenCfg, "env")?.writable,
            deepIsolated: deep.prefs !== original.prefs
          };
        `) as {
          ownRole: boolean;
          hasProto: boolean;
          ownSym: boolean;
          frozenWritable: boolean;
          deepIsolated: boolean;
        };
        assert.equal(res.ownRole, true);
        assert.equal(res.hasProto, false);
        assert.equal(res.ownSym, true);
        assert.equal(res.frozenWritable, false);
        assert.equal(res.deepIsolated, true);

        // Edge cases: Object.hasOwn(null, ...) throws TypeError; structuredClone throws on functions
        assert.throws(() => run(`return Object.hasOwn(null, "a");`), TypeError);
        assert.throws(() => run(`return structuredClone({ fn: () => 1 });`));
      }
    },
    {
      blockIndex: 2,
      label: "Example 2: Arrays — Default .sort() Trap, toSorted() (ES2023), and Avoiding Holes",
      expectedStdoutIncludes: [
        "Lexicographic bug: [10,2,25,4]",
        "Numeric toSorted: [2,4,10,25]",
        "Original scores intact: [10,2,25,4]",
        "length: 3 1 in? false",
        'Dense filtered: ["job1","job3"] length: 2'
      ],
      minStdoutLines: 5,
      testValidAndInvalidInputs: (run) => {
        const res = run(
          `return { cleanSorted, scores, holeExists: 1 in queue, denseIdx1: 1 in dense };`
        ) as { cleanSorted: number[]; scores: number[]; holeExists: boolean; denseIdx1: boolean };
        assert.deepEqual(res.cleanSorted, [2, 4, 10, 25]);
        assert.deepEqual(res.scores, [10, 2, 25, 4]);
        assert.equal(res.holeExists, false);
        assert.equal(res.denseIdx1, true);
        assert.deepEqual(run(`return [].toSorted((a, b) => a - b);`), []);
        assert.deepEqual(run(`return [-10, 2, -30, 0].toSorted((a, b) => a - b);`), [-30, -10, 0, 2]);
      }
    },
    {
      blockIndex: 3,
      label: "Example 3: Classes, #private Encapsulation, Polymorphism & SOLID in Action",
      expectedStdoutIncludes: ['"provider":"mock"', '"balanceCents":1700', '"count":1'],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        assert.equal(run(`return acct.balanceCents;`), 1700);
        const json = JSON.parse(String(run(`return JSON.stringify(acct);`)));
        assert.equal(Object.hasOwn(json, "#balanceCents"), false);
        assert.equal(run(`return Object.keys(acct).includes("#balanceCents");`), false);
        assert.equal(run(`return new CheckoutService(new StripeGateway()).pay(acct, 300).provider;`), "stripe");

        // Edge cases: invalid owner, invalid constructor/deposit cents, MAX_SAFE_INTEGER overflow
        assert.throws(() => run(`return new LedgerAccount("", 0);`), TypeError);
        assert.throws(() => run(`return new LedgerAccount(null, 0);`), TypeError);
        assert.throws(() => run(`return new LedgerAccount("Bad", -1);`), RangeError);
        assert.throws(() => run(`return new LedgerAccount("Bad", 1.5);`), RangeError);
        assert.throws(() => run(`acct.deposit(0);`), RangeError);
        assert.throws(() => run(`acct.deposit(-100);`), RangeError);
        assert.throws(() => {
          run(`const maxAcct = new LedgerAccount("Max", Number.MAX_SAFE_INTEGER); maxAcct.deposit(1);`);
        }, RangeError);

        // CheckoutService validates gateway, account, and amount BEFORE charging the gateway
        assert.throws(() => run(`return new CheckoutService(null);`), TypeError);
        assert.throws(() => run(`return new CheckoutService({});`), TypeError);
        const preChargeCheck = run(`
          let charged = false;
          const spyGateway = { charge(c) { charged = true; return { ok: true, chargedCents: c }; } };
          const svc = new CheckoutService(spyGateway);
          let threw = false;
          try { svc.pay(acct, -500); } catch (e) { threw = e instanceof RangeError; }
          let threwBadAcct = false;
          try { svc.pay({}, 100); } catch (e) { threwBadAcct = e instanceof TypeError; }
          return { charged, threw, threwBadAcct };
        `) as { charged: boolean; threw: boolean; threwBadAcct: boolean };
        assert.equal(preChargeCheck.threw, true);
        assert.equal(preChargeCheck.threwBadAcct, true);
        assert.equal(preChargeCheck.charged, false);
      },
      safetyMutations: [
        {
          description: "Removing deposit validation in LedgerAccount allows zero/negative credit corruption",
          mutateCode: (raw) =>
            raw.replace(
              /if \(!Number\.isSafeInteger\(cents\) \|\| cents <= 0\)\s*\{[^}]*\}/,
              "/* guard removed */"
            ),
          verifyProtection: (run) => {
            assert.throws(() => run(`acct.deposit(-500);`), RangeError);
          }
        },
        {
          description: "Removing safe-integer overflow check in deposit allows silent MAX_SAFE_INTEGER precision loss",
          mutateCode: (raw) =>
            raw.replace(
              /if \(!Number\.isSafeInteger\(this\.#balanceCents \+ cents\)\)\s*\{[^}]*\}/,
              "/* overflow guard removed */"
            ),
          verifyProtection: (run) => {
            assert.throws(
              () => run(`const maxAcct = new LedgerAccount("Max", Number.MAX_SAFE_INTEGER); maxAcct.deposit(1);`),
              RangeError
            );
          }
        },
        {
          description: "Removing pre-charge amountCents guard in CheckoutService.pay charges gateway on invalid negative amount",
          mutateCode: (raw) =>
            raw.replace(
              /if \(!Number\.isSafeInteger\(amountCents\) \|\| amountCents <= 0\)\s*\{[^}]*\}/,
              "/* pre-charge guard removed */"
            ),
          verifyProtection: (run) => {
            const charged = run(`
              let called = false;
              const svc = new CheckoutService({ charge() { called = true; return { ok: true }; } });
              try { svc.pay(acct, -500); } catch {}
              return called;
            `);
            assert.equal(charged, false);
          }
        }
      ]
    },
    {
      blockIndex: 4,
      label: "Example 4: Inheritance (extends, super), #private Isolation & Liskov Substitution",
      expectedStdoutIncludes: [
        "instanceof AppError & Error: true true",
        '"error":"RateLimitError"',
        '"status":429',
        '"retryable":true',
        '"retryAfterSec":30'
      ],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        const res = run(`
          const base = new AppError("Upstream failed", 502);
          const rl = new RateLimitError(15);
          return {
            basePayload: base.toClientPayload(),
            rlPayload: rl.toClientPayload(),
            isAppErr: rl instanceof AppError,
            isErr: rl instanceof Error,
            status: rl.httpStatus
          };
        `) as {
          basePayload: { error: string; status: number; retryable: boolean };
          rlPayload: { error: string; status: number; retryable: boolean; retryAfterSec: number };
          isAppErr: boolean;
          isErr: boolean;
          status: number;
        };
        assert.equal(res.basePayload.error, "AppError");
        assert.equal(res.basePayload.status, 502);
        assert.equal(res.basePayload.retryable, false);
        assert.equal(res.rlPayload.error, "RateLimitError");
        assert.equal(res.rlPayload.status, 429);
        assert.equal(res.rlPayload.retryable, true);
        assert.equal(res.rlPayload.retryAfterSec, 15);
        assert.equal(res.isAppErr, true);
        assert.equal(res.isErr, true);
        assert.equal(res.status, 429);

        // Edge cases: invalid message, invalid HTTP status, invalid retryAfterSec, #private external access
        assert.throws(() => run(`return new AppError("", 500);`), TypeError);
        assert.throws(() => run(`return new AppError("ok", 200);`), RangeError);
        assert.throws(() => run(`return new AppError("ok", 600);`), RangeError);
        assert.throws(() => run(`return new RateLimitError(0);`), RangeError);
        assert.throws(() => run(`return new RateLimitError(-5);`), RangeError);
        assert.throws(() => run(`return new RateLimitError(1.5);`), RangeError);
        assert.throws(() => run(`new Function("e", "return e.#httpStatus;")(err);`), SyntaxError);
      },
      safetyMutations: [
        {
          description: "Removing HTTP 4xx/5xx status range validation in AppError allows 200 OK error status",
          mutateCode: (raw) =>
            raw.replace(
              /if \(!Number\.isInteger\(httpStatus\) \|\| httpStatus < 400 \|\| httpStatus > 599\)\s*\{[^}]*\}/,
              "/* status guard removed */"
            ),
          verifyProtection: (run) => {
            assert.throws(() => run(`return new AppError("Invalid ok status", 200);`), RangeError);
          }
        }
      ]
    },
    {
      blockIndex: 5,
      label: "Example 5: SOLID — Single Responsibility (SRP) & Interface Segregation (ISP)",
      expectedStdoutIncludes: ["Invoice INV-101: $30.00", 'ISP read-only snapshot: {"balanceCents":3000}'],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        assert.equal(run(`return calc.subtotalCents([{ unitCents: 100, qty: 3 }]);`), 300);
        assert.equal(run(`return fmt.toSummaryText("INV-9", 50);`), "Invoice INV-9: $0.50");
        assert.deepEqual(run(`return createReadOnlyAuditView({ getBalanceCents: () => 42 }).snapshot();`), {
          balanceCents: 42
        });
        assert.throws(() => run(`return calc.subtotalCents([]);`), TypeError);
        assert.throws(() => run(`return calc.subtotalCents([{ unitCents: -1, qty: 1 }]);`), TypeError);
        assert.throws(() => run(`return calc.subtotalCents([{ unitCents: 100, qty: 0 }]);`), TypeError);
        assert.throws(() => run(`return fmt.toSummaryText("", 100);`), TypeError);
        assert.throws(() => run(`return fmt.toSummaryText("INV-1", -1);`), RangeError);
        assert.throws(() => run(`return createReadOnlyAuditView({});`), TypeError);
      },
      safetyMutations: [
        {
          description: "Removing empty-items guard in InvoiceCalculator.subtotalCents allows empty invoice total 0",
          mutateCode: (raw) =>
            raw.replace(/if \(!Array\.isArray\(items\) \|\| items\.length === 0\)\s*\{[^}]*\}/, "/* guard removed */"),
          verifyProtection: (run) => {
            assert.throws(() => run(`return calc.subtotalCents([]);`), TypeError);
          }
        },
        {
          description: "Removing ISP interface check in createReadOnlyAuditView defers failure until snapshot()",
          mutateCode: (raw) =>
            raw.replace(
              /if \(!ledgerReader \|\| typeof ledgerReader\.getBalanceCents !== "function"\)\s*\{[^}]*\}/,
              "/* guard removed */"
            ),
          verifyProtection: (run) => {
            assert.throws(() => run(`return createReadOnlyAuditView({});`), TypeError);
          }
        }
      ]
    },
    {
      blockIndex: 6,
      label: "Example 6: WeakMap & WeakSet for Leak-Free Object Metadata",
      expectedStdoutIncludes: [
        'Timing tagged: {"startedAtMs":120}',
        "First process: true | Duplicate process: false"
      ],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        const res = run(`
          const r = { id: 1 };
          return {
            tag: tagRequest(r, 55),
            first: markProcessedOnce(r),
            second: markProcessedOnce(r)
          };
        `) as { tag: { startedAtMs: number }; first: boolean; second: boolean };
        assert.deepEqual(res.tag, { startedAtMs: 55 });
        assert.equal(res.first, true);
        assert.equal(res.second, false);

        assert.throws(() => run(`return tagRequest("primitive", 10);`), TypeError);
        assert.throws(() => run(`return tagRequest(null, 10);`), TypeError);
        assert.throws(() => run(`return tagRequest({}, -1);`), RangeError);
        assert.throws(() => run(`return markProcessedOnce(42);`), TypeError);
      },
      safetyMutations: [
        {
          description: "Removing negative startedAtMs guard allows invalid timing metadata",
          mutateCode: (raw) =>
            raw.replace(/if \(!Number\.isFinite\(startedAtMs\) \|\| startedAtMs < 0\)\s*\{[^}]*\}/, "/* guard removed */"),
          verifyProtection: (run) => {
            assert.throws(() => run(`return tagRequest({}, -5);`), RangeError);
          }
        }
      ]
    },
    {
      blockIndex: 7,
      label: "Exercise 1: Prototype-Pollution-Safe Config Merger",
      expectedStdoutIncludes: ['"theme":"dark"', '"timeoutMs":3000', "Prototype polluted? false"],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        const res = run(`
          const proto = { inheritedSecret: "leak" };
          const withProto = Object.create(proto);
          withProto.safeKey = 42;
          const nullProto = Object.assign(Object.create(null), { fromNullProto: true });
          const evil = JSON.parse('{"__proto__":{"pwned":true},"constructor":{"bad":1},"prototype":{"bad":2},"ok":true}');
          const baseEvil = JSON.parse('{"__proto__":{"fromBase":true},"baseOnly":1}');
          const m = safeMerge(baseEvil, evil);
          const m2 = safeMerge(nullProto, withProto);
          return {
            ok: m.ok,
            baseOnly: m.baseOnly,
            hasOwnCtor: Object.hasOwn(m, "constructor"),
            hasOwnProto: Object.hasOwn(m, "__proto__"),
            pwned: m.pwned === true || ({}).pwned === true,
            fromBase: m.fromBase === true,
            m2Safe: m2.safeKey,
            m2NullProto: m2.fromNullProto,
            m2Leaked: Object.hasOwn(m2, "inheritedSecret")
          };
        `) as Record<string, unknown>;
        assert.equal(res.ok, true);
        assert.equal(res.baseOnly, 1);
        assert.equal(res.hasOwnCtor, false);
        assert.equal(res.hasOwnProto, false);
        assert.equal(res.pwned, false);
        assert.equal(res.fromBase, false);
        assert.equal(res.m2Safe, 42);
        assert.equal(res.m2NullProto, true);
        assert.equal(res.m2Leaked, false);

        // Edge cases: null, primitives, arrays, Date, RegExp rejected symmetrically
        assert.throws(() => run(`return safeMerge(null, { a: 1 });`), TypeError);
        assert.throws(() => run(`return safeMerge({ a: 1 }, null);`), TypeError);
        assert.throws(() => run(`return safeMerge({}, "abc");`), TypeError);
        assert.throws(() => run(`return safeMerge([], {});`), TypeError);
        assert.throws(() => run(`return safeMerge(new Date(), {});`), TypeError);
        assert.throws(() => run(`return safeMerge({}, /abc/);`), TypeError);
      },
      safetyMutations: [
        {
          description: "Removing FORBIDDEN_KEYS filter lets constructor/__proto__ pollute result prototype or keys",
          mutateCode: (raw) => raw.replace(/if \(FORBIDDEN_KEYS\.has\(key\)\) continue;/, "/* guard removed */"),
          verifyProtection: (run) => {
            const out = run(`
              const m = safeMerge({}, JSON.parse('{"__proto__":{"pwned":true},"constructor":{"bad":1}}'));
              return Object.hasOwn(m, "constructor") || m.pwned === true;
            `);
            assert.equal(out, false);
          }
        },
        {
          description: "Removing Object.hasOwn guard leaks inherited prototype properties into merged object",
          mutateCode: (raw) => raw.replace(/if \(!Object\.hasOwn\(src, key\)\) continue;/, "/* hasOwn removed */"),
          verifyProtection: (run) => {
            const leaked = run(`
              const obj = Object.create({ inheritedSecret: "leak" });
              obj.ok = 1;
              const m = safeMerge({}, obj);
              return Object.hasOwn(m, "inheritedSecret");
            `);
            assert.equal(leaked, false);
          }
        }
      ]
    },
    {
      blockIndex: 8,
      label: "Exercise 2: Non-Mutating Array Analytics Pipeline",
      expectedStdoutIncludes: ['"id":"o3"', '"id":"o4"', "Original first item untouched: o1"],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        const top = run(`return topPaidOrders(orders, 2);`) as Array<{ id: string; amountCents: number }>;
        assert.deepEqual(
          top.map((o) => o.id),
          ["o3", "o4"]
        );
        assert.deepEqual(run(`return topPaidOrders([], 5);`), []);
        assert.deepEqual(run(`return topPaidOrders(orders, 0);`), []);

        // Edge cases: negative limit, NaN limit, fractional limit, non-array orders, NaN amountCents
        assert.throws(() => run(`return topPaidOrders(orders, -1);`), RangeError);
        assert.throws(() => run(`return topPaidOrders(orders, NaN);`), RangeError);
        assert.throws(() => run(`return topPaidOrders(orders, 1.5);`), RangeError);
        assert.throws(() => run(`return topPaidOrders(null, 2);`), TypeError);
        assert.throws(() => run(`return topPaidOrders([{ id: "x", status: "PAID", amountCents: NaN }], 2);`), TypeError);
      },
      safetyMutations: [
        {
          description: "Removing non-negative integer limit guard allows negative slice(-1) bug",
          mutateCode: (raw) =>
            raw.replace(/if \(!Number\.isInteger\(limit\) \|\| limit < 0\)\s*\{[^}]*\}/, "/* limit guard removed */"),
          verifyProtection: (run) => {
            assert.throws(() => run(`return topPaidOrders(orders, -1);`), RangeError);
          }
        }
      ]
    },
    {
      blockIndex: 9,
      label: "Exercise 3: Refactoring Switch Logic to SOLID (OCP + DIP)",
      expectedStdoutIncludes: ["FLAT500 on 3000: 2500", "PCT10 on 3000: 2700"],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        assert.equal(run(`return calc.apply("FLAT500", 3000);`), 2500);
        assert.equal(run(`return calc.apply("PCT10", 3000);`), 2700);
        assert.equal(run(`return calc.apply("FLAT500", 200);`), 0);
        assert.throws(() => run(`return calc.apply("", 1000);`), TypeError);
        assert.throws(() => run(`return calc.apply(123, 1000);`), TypeError);
        assert.throws(() => run(`return calc.apply("UNKNOWN", 1000);`), /Unknown discount code/);
        // Prototype property keys like "constructor" or "toString" safely reject instead of running Object.prototype functions
        assert.throws(() => run(`return calc.apply("toString", 1000);`), /Unknown discount code/);

        // Edge cases: negative/NaN/fractional subtotal, invalid register args, LSP postcondition violations
        assert.throws(() => run(`return calc.apply("PCT10", -500);`), RangeError);
        assert.throws(() => run(`return calc.apply("FLAT500", NaN);`), RangeError);
        assert.throws(() => run(`return calc.apply("PCT10", 19.99);`), RangeError);
        assert.throws(() => run(`calc.register("", () => 0);`), TypeError);
        assert.throws(() => run(`calc.register("BAD", "not-fn");`), TypeError);
        assert.throws(() => {
          run(`calc.register("LSP_BROKEN", () => -10); return calc.apply("LSP_BROKEN", 100);`);
        }, RangeError);
        assert.throws(() => {
          run(`calc.register("LSP_INFLATE", (c) => c + 50); return calc.apply("LSP_INFLATE", 100);`);
        }, RangeError);
      },
      safetyMutations: [
        {
          description: "Removing unknown-strategy check produces cryptic TypeError instead of explicit validation error",
          mutateCode: (raw) =>
            raw.replace(
              /if \(!strategy\) throw new Error\([^)]+\);/,
              "/* guard removed */"
            ),
          verifyProtection: (run) => {
            assert.throws(() => run(`return calc.apply("MISSING_CODE", 1000);`), /Unknown discount code/);
          }
        },
        {
          description: "Removing subtotalCents safe-integer guard allows negative subtotal in FLAT500",
          mutateCode: (raw) =>
            raw.replace(
              /if \(!Number\.isSafeInteger\(subtotalCents\) \|\| subtotalCents < 0\)\s*\{[^}]*\}/,
              "/* subtotal guard removed */"
            ),
          verifyProtection: (run) => {
            assert.throws(
              () => run(`return calc.apply("FLAT500", -500);`),
              /subtotalCents must be a non-negative safe integer/
            );
          }
        },
        {
          description: "Removing LSP postcondition guard allows strategy returning negative or inflated cents",
          mutateCode: (raw) =>
            raw.replace(
              /if \(!Number\.isSafeInteger\(finalCents\) \|\| finalCents < 0 \|\| finalCents > subtotalCents\)\s*\{[^}]*\}/,
              "/* LSP output guard removed */"
            ),
          verifyProtection: (run) => {
            assert.throws(
              () => run(`calc.register("LSP_BROKEN", () => -10); return calc.apply("LSP_BROKEN", 100);`),
              RangeError
            );
            assert.throws(
              () => run(`calc.register("LSP_INFLATE", (c) => c + 50); return calc.apply("LSP_INFLATE", 100);`),
              RangeError
            );
          }
        }
      ]
    }
  ]
};
