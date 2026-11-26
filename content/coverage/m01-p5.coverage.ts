import assert from "node:assert/strict";
import type { LessonCoverageSpec } from "./types";

export const m01p5Coverage: LessonCoverageSpec = {
  lessonId: "m01-p5",
  moduleNumber: 1,
  mdxPath: "content/modules/01-programming/m01-p5.mdx",
  topics: [
    {
      topicTitle: "TypeScript fundamentals",
      anchorId: "m01-p5-topic-typescript-fundamentals",
      explanationHeadings: [
        "1. TypeScript Fundamentals: Compile-Time Checking & Type Erasure",
        "1. TypeScript Compiler Pipeline & Type Erasure Boundary"
      ],
      exampleTitles: ["Example 2: Runtime Type Guard (`unknown` &rarr; Verified `OrderDTO`)"],
      interviewQuestionIds: ["m01-p5-iq-3"],
      exerciseTitles: ["Exercise 1: Strict Discriminated Union Narrower (`parsePaymentEvent`)"]
    },
    {
      topicTitle: "Type systems",
      anchorId: "m01-p5-topic-type-systems",
      explanationHeadings: [
        "2. Type Systems: Structural Typing, Unions & Narrowing",
        "3. Structural Typing (TypeScript) vs. Nominal Typing (Java / C#)"
      ],
      exampleTitles: ["Example 3: Exhaustive Discriminated Union Handler & `indexById` Generic Runtime"],
      interviewQuestionIds: ["m01-p5-iq-2"],
      exerciseTitles: ["Exercise 1: Strict Discriminated Union Narrower (`parsePaymentEvent`)"]
    },
    {
      topicTitle: "Generics",
      anchorId: "m01-p5-topic-generics",
      explanationHeadings: ["3. Generics: Reusable Type-Safe Abstractions"],
      exampleTitles: ["Example 3: Exhaustive Discriminated Union Handler & `indexById` Generic Runtime"],
      interviewQuestionIds: ["m01-p5-iq-2"],
      exerciseTitles: ["Exercise 2: Generic-Style Typed Repository Contract (`createTypedStore`)"]
    },
    {
      topicTitle: "Interfaces",
      anchorId: "m01-p5-topic-interfaces",
      explanationHeadings: [
        "4. Interfaces: Contracts, `type` Aliases & Declaration Merging",
        "2. `interface` vs. `type` Alias"
      ],
      exampleTitles: ["Example 2: Runtime Type Guard (`unknown` &rarr; Verified `OrderDTO`)"],
      interviewQuestionIds: ["m01-p5-iq-2"],
      exerciseTitles: ["Exercise 2: Generic-Style Typed Repository Contract (`createTypedStore`)"]
    },
    {
      topicTitle: "Type safety",
      anchorId: "m01-p5-topic-type-safety",
      explanationHeadings: [
        "5. Type Safety: `strict`, `unknown` vs. `any` & Runtime Boundaries",
        "1. `any` vs. `unknown` vs. `never`"
      ],
      exampleTitles: ["Example 2: Runtime Type Guard (`unknown` &rarr; Verified `OrderDTO`)"],
      interviewQuestionIds: ["m01-p5-iq-1", "m01-p5-iq-3"],
      exerciseTitles: ["Exercise 1: Strict Discriminated Union Narrower (`parsePaymentEvent`)"]
    }
  ],
  codeTests: [
    {
      blockIndex: 1,
      label: "Example 2: Runtime Type Guard (parseOrderDTO)",
      expectedStdoutIncludes: ['Parsed DTO: {"id":"ord_1","totalCents":2500,"currency":"USD"}'],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.deepEqual(run(`return parseOrderDTO({ id: " o1 ", totalCents: -0, currency: "EUR" });`), {
          id: "o1",
          totalCents: 0,
          currency: "EUR"
        });
        assert.equal(Object.is(run(`return parseOrderDTO({ id: "o1", totalCents: -0, currency: "USD" }).totalCents;`), -0), false);
        assert.throws(() => run(`return parseOrderDTO(null);`), TypeError);
        assert.throws(() => run(`return parseOrderDTO(undefined);`), TypeError);
        assert.throws(() => run(`return parseOrderDTO([]);`), TypeError);
        assert.throws(() => run(`return parseOrderDTO({ id: "", totalCents: 100, currency: "USD" });`), TypeError);
        assert.throws(() => run(`return parseOrderDTO({ id: "o1", totalCents: NaN, currency: "USD" });`), RangeError);
        assert.throws(() => run(`return parseOrderDTO({ id: "o1", totalCents: Infinity, currency: "USD" });`), RangeError);
        assert.throws(() => run(`return parseOrderDTO({ id: "o1", totalCents: -1, currency: "USD" });`), RangeError);
        assert.throws(() => run(`return parseOrderDTO({ id: "o1", totalCents: 1.5, currency: "USD" });`), RangeError);
        assert.throws(() => run(`return parseOrderDTO({ id: "o1", totalCents: 100, currency: "GBP" });`), TypeError);
      },
      safetyMutations: [
        {
          description: "Removing isPlainRecord guard allows array payload into property checks",
          mutateCode: (raw) =>
            raw.replace(/if \(!isPlainRecord\(raw\)\)\s*\{[^}]*\}/, "/* guard removed */"),
          verifyProtection: (run) => {
            assert.throws(() => run(`return parseOrderDTO(null);`), TypeError);
            assert.throws(() => run(`const a = []; a.id = "x"; a.totalCents = 1; a.currency = "USD"; return parseOrderDTO(a);`), TypeError);
          }
        },
        {
          description: "Removing totalCents safe-integer guard allows negative cents",
          mutateCode: (raw) =>
            raw.replace(/if \(!Number\.isSafeInteger\(raw\.totalCents\) \|\| raw\.totalCents < 0\)\s*\{[^}]*\}/, "/* guard removed */"),
          verifyProtection: (run) => {
            assert.throws(() => run(`return parseOrderDTO({ id: "o1", totalCents: -50, currency: "USD" });`), RangeError);
          }
        },
        {
          description: "Removing currency union guard allows unsupported currency codes",
          mutateCode: (raw) =>
            raw.replace(
              /if \(raw\.currency !== "USD" && raw\.currency !== "EUR"\)\s*\{[^}]*\}/,
              "/* guard removed */"
            ),
          verifyProtection: (run) => {
            assert.throws(() => run(`return parseOrderDTO({ id: "o1", totalCents: 100, currency: "GBP" });`), TypeError);
          }
        }
      ]
    },
    {
      blockIndex: 2,
      label: "Example 3: indexById & formatApiResult",
      expectedStdoutIncludes: ['Lookup u1: {"id":"u1","role":"admin"}', 'Result: OK: {"count":2}'],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        assert.equal(run(`return formatApiResult({ ok: false, code: "NOT_FOUND", message: "missing" });`), "ERR[NOT_FOUND]: missing");
        // Prototype keys stored safely in Map without collision
        assert.equal(run(`return indexById([{ id: "__proto__" }, { id: "constructor" }]).size;`), 2);
        assert.throws(() => run(`return indexById("not-array");`), TypeError);
        assert.throws(() => run(`return indexById([{ id: "   " }]);`), TypeError);
        assert.throws(() => run(`return indexById([{ id: "a" }, { id: " a " }]);`), RangeError);
        assert.throws(() => run(`return formatApiResult({ ok: true });`), TypeError);
        assert.throws(() => run(`return formatApiResult({ ok: false });`), TypeError);
        assert.throws(() => run(`return formatApiResult({ ok: "maybe" });`), TypeError);
      },
      safetyMutations: [
        {
          description: "Removing non-empty string id guard allows blank id entries",
          mutateCode: (raw) =>
            raw.replace(
              /if \(!item \|\| typeof item !== "object" \|\| typeof item\.id !== "string" \|\| item\.id\.trim\(\)\.length === 0\)\s*\{[^}]*\}/,
              "/* guard removed */"
            ),
          verifyProtection: (run) => {
            assert.throws(() => run(`return indexById([{ id: "   " }]);`), TypeError);
          }
        },
        {
          description: "Removing duplicate id guard silently overwrites earlier entity",
          mutateCode: (raw) =>
            raw.replace(/if \(map\.has\(id\)\) throw new RangeError\(`Duplicate id: \$\{id\}`\);/, "/* guard removed */"),
          verifyProtection: (run) => {
            assert.throws(() => run(`return indexById([{ id: "a" }, { id: " a " }]);`), RangeError);
          }
        }
      ]
    },
    {
      blockIndex: 3,
      label: "Exercise 1: parsePaymentEvent",
      expectedStdoutIncludes: [
        'Paid: {"kind":"paid","amountCents":1999}',
        'Failed: {"kind":"failed","reason":"card_declined"}'
      ],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`return parsePaymentEvent(null);`), TypeError);
        assert.throws(() => run(`return parsePaymentEvent(undefined);`), TypeError);
        assert.throws(() => run(`return parsePaymentEvent({ kind: "paid", amountCents: 0 });`), RangeError);
        assert.throws(() => run(`return parsePaymentEvent({ kind: "paid", amountCents: NaN });`), RangeError);
        assert.throws(() => run(`return parsePaymentEvent({ kind: "failed", reason: "  " });`), TypeError);
        assert.throws(() => run(`return parsePaymentEvent({ kind: "unknown" });`), TypeError);
      },
      safetyMutations: [
        {
          description: "Removing positive safe-integer guard allows zero/negative paid amount",
          mutateCode: (raw) =>
            raw.replace(/if \(!Number\.isSafeInteger\(raw\.amountCents\) \|\| raw\.amountCents <= 0\)\s*\{[^}]*\}/, "/* guard removed */"),
          verifyProtection: (run) => {
            assert.throws(() => run(`return parsePaymentEvent({ kind: "paid", amountCents: -10 });`), RangeError);
          }
        },
        {
          description: "Removing failed reason guard allows blank failure reason",
          mutateCode: (raw) =>
            raw.replace(/if \(typeof raw\.reason !== "string" \|\| raw\.reason\.trim\(\)\.length === 0\)\s*\{[^}]*\}/, "/* guard removed */"),
          verifyProtection: (run) => {
            assert.throws(() => run(`return parsePaymentEvent({ kind: "failed", reason: "   " });`), TypeError);
          }
        }
      ]
    },
    {
      blockIndex: 4,
      label: "Exercise 2: createTypedStore",
      expectedStdoutIncludes: ['Stored users: [{"id":"u_1","name":"Maya"}]'],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.equal(run(`return userStore.get("u_1").name;`), "Maya");
        assert.equal(run(`return userStore.get(" u_1 ").name;`), "Maya");
        assert.equal(run(`return userStore.get("missing");`), undefined);
        assert.throws(() => run(`return createTypedStore("bad");`), TypeError);
        assert.throws(() => run(`return userStore.save({ id: 123, name: "X" });`), TypeError);
        assert.throws(() => run(`return userStore.get("");`), TypeError);
        assert.throws(() => run(`return userStore.get("   ");`), TypeError);
      },
      safetyMutations: [
        {
          description: "Removing empty/whitespace id guard in get() allows blank string lookup",
          mutateCode: (raw) =>
            raw.replace(
              /if \(typeof id !== "string" \|\| id\.trim\(\)\.length === 0\) throw new TypeError\("id must be a non-empty string"\);/,
              "/* guard removed */"
            ),
          verifyProtection: (run) => {
            assert.throws(() => run(`return userStore.get("   ");`), TypeError);
          }
        }
      ]
    }
  ]
};
