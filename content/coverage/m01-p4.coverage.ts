import assert from "node:assert/strict";
import type { LessonCoverageSpec } from "./types";

export const m01p4Coverage: LessonCoverageSpec = {
  lessonId: "m01-p4",
  moduleNumber: 1,
  mdxPath: "content/modules/01-programming/m01-p4.mdx",
  topics: [
    {
      topicTitle: "JavaScript",
      anchorId: "m01-p4-topic-javascript",
      explanationHeadings: ["1. JavaScript: Single-Threaded, Event-Driven, Multi-Paradigm"],
      exampleTitles: ["Example 3: Event Loop Priority Simulator & Promise State Machine"],
      interviewQuestionIds: ["m01-p4-iq-3"],
      exerciseTitles: ["Exercise 1: Memoize with Bounded Cache & Explicit `this` Preservation"]
    },
    {
      topicTitle: "ES6+",
      anchorId: "m01-p4-topic-es6",
      explanationHeadings: [
        "2. ES6+ (ES2015–Modern ECMAScript): Ergonomics & Safety",
        "1. `var` vs. `let` vs. `const` & Hoisting Behavior"
      ],
      exampleTitles: ["Example 1: Scope, Hoisting, TDZ & Closure Encapsulation"],
      interviewQuestionIds: ["m01-p4-iq-1"],
      exerciseTitles: ["Exercise 1: Memoize with Bounded Cache & Explicit `this` Preservation"]
    },
    {
      topicTitle: "Scope",
      anchorId: "m01-p4-topic-scope",
      explanationHeadings: ["3. Scope: Lexical Environments & the Scope Chain"],
      exampleTitles: ["Example 1: Scope, Hoisting, TDZ & Closure Encapsulation"],
      interviewQuestionIds: ["m01-p4-iq-1"],
      exerciseTitles: ["Exercise 2: `once(fn)` Closure Guard & Safe Prototype-Chain Inspector"]
    },
    {
      topicTitle: "Hoisting",
      anchorId: "m01-p4-topic-hoisting",
      explanationHeadings: ["4. Hoisting: Creation Phase Registration & TDZ"],
      exampleTitles: ["Example 1: Scope, Hoisting, TDZ & Closure Encapsulation"],
      interviewQuestionIds: ["m01-p4-iq-1"],
      exerciseTitles: ["Exercise 2: `once(fn)` Closure Guard & Safe Prototype-Chain Inspector"]
    },
    {
      topicTitle: "Closures",
      anchorId: "m01-p4-topic-closures",
      explanationHeadings: ["5. Closures: Functions That Remember Their Birth Scope"],
      exampleTitles: ["Example 1: Scope, Hoisting, TDZ & Closure Encapsulation"],
      interviewQuestionIds: ["m01-p4-iq-1", "m01-p4-iq-4"],
      exerciseTitles: ["Exercise 2: `once(fn)` Closure Guard & Safe Prototype-Chain Inspector"]
    },
    {
      topicTitle: "Prototype",
      anchorId: "m01-p4-topic-prototype",
      explanationHeadings: [
        "6. Prototype: The `[[Prototype]]` Delegation Link",
        "2. Prototype Chain Delegation & GC Reachability"
      ],
      exampleTitles: ["Example 2: Prototype Chain, `Object.create` & `this` vs. Arrow Functions"],
      interviewQuestionIds: ["m01-p4-iq-2"],
      exerciseTitles: ["Exercise 2: `once(fn)` Closure Guard & Safe Prototype-Chain Inspector"]
    },
    {
      topicTitle: "Prototypal inheritance",
      anchorId: "m01-p4-topic-prototypal-inheritance",
      explanationHeadings: ["7. Prototypal Inheritance: Behavior Sharing via Delegation"],
      exampleTitles: ["Example 2: Prototype Chain, `Object.create` & `this` vs. Arrow Functions"],
      interviewQuestionIds: ["m01-p4-iq-2"],
      exerciseTitles: ["Exercise 2: `once(fn)` Closure Guard & Safe Prototype-Chain Inspector"]
    },
    {
      topicTitle: "this",
      anchorId: "m01-p4-topic-this",
      explanationHeadings: ["8. `this`: Dynamic Call-Site Binding Rules"],
      exampleTitles: ["Example 2: Prototype Chain, `Object.create` & `this` vs. Arrow Functions"],
      interviewQuestionIds: ["m01-p4-iq-2"],
      exerciseTitles: ["Exercise 1: Memoize with Bounded Cache & Explicit `this` Preservation"]
    },
    {
      topicTitle: "Arrow functions",
      anchorId: "m01-p4-topic-arrow-functions",
      explanationHeadings: ["9. Arrow Functions: Lexical `this` & Callback Safety"],
      exampleTitles: ["Example 2: Prototype Chain, `Object.create` & `this` vs. Arrow Functions"],
      interviewQuestionIds: ["m01-p4-iq-2"],
      exerciseTitles: ["Exercise 1: Memoize with Bounded Cache & Explicit `this` Preservation"]
    },
    {
      topicTitle: "Promises",
      anchorId: "m01-p4-topic-promises",
      explanationHeadings: [
        "10. Promises: Composable Asynchronous State Machines",
        "2. Promise Combinators Comparison"
      ],
      exampleTitles: ["Example 4: Bounded Memory Cache & `async` Promise Builder"],
      interviewQuestionIds: ["m01-p4-iq-3"],
      exerciseTitles: ["Exercise 3: Combinator Polyfill — `promiseAllSettledLite(items)`"]
    },
    {
      topicTitle: "Async/await",
      anchorId: "m01-p4-topic-async-await",
      explanationHeadings: ["11. Async/Await: Syntactic Sugar Over Promises"],
      exampleTitles: ["Example 4: Bounded Memory Cache & `async` Promise Builder"],
      interviewQuestionIds: ["m01-p4-iq-3"],
      exerciseTitles: ["Exercise 3: Combinator Polyfill — `promiseAllSettledLite(items)`"]
    },
    {
      topicTitle: "Event loop",
      anchorId: "m01-p4-topic-event-loop",
      explanationHeadings: [
        "12. Event Loop: Orchestrating Sync Stack & Async Queues",
        "1. Event Loop Turn Order: Call Stack &rarr; Microtask Queue &rarr; Macrotask Queue"
      ],
      exampleTitles: ["Example 3: Event Loop Priority Simulator & Promise State Machine"],
      interviewQuestionIds: ["m01-p4-iq-3", "m01-p4-iq-4"],
      exerciseTitles: ["Exercise 3: Combinator Polyfill — `promiseAllSettledLite(items)`"]
    },
    {
      topicTitle: "Microtasks",
      anchorId: "m01-p4-topic-microtasks",
      explanationHeadings: ["13. Microtasks: High-Priority Promise Continuations", "3. Microtasks vs. Macrotasks"],
      exampleTitles: ["Example 3: Event Loop Priority Simulator & Promise State Machine"],
      interviewQuestionIds: ["m01-p4-iq-3"],
      exerciseTitles: ["Exercise 3: Combinator Polyfill — `promiseAllSettledLite(items)`"]
    },
    {
      topicTitle: "Macrotasks",
      anchorId: "m01-p4-topic-macrotasks",
      explanationHeadings: ["14. Macrotasks: Timers, I/O & UI Events", "3. Microtasks vs. Macrotasks"],
      exampleTitles: ["Example 3: Event Loop Priority Simulator & Promise State Machine"],
      interviewQuestionIds: ["m01-p4-iq-3"],
      exerciseTitles: ["Exercise 3: Combinator Polyfill — `promiseAllSettledLite(items)`"]
    },
    {
      topicTitle: "Memory management",
      anchorId: "m01-p4-topic-memory-management",
      explanationHeadings: ["15. Memory Management: Allocation, Reachability & Leaks"],
      exampleTitles: ["Example 4: Bounded Memory Cache & `async` Promise Builder"],
      interviewQuestionIds: ["m01-p4-iq-4"],
      exerciseTitles: ["Exercise 1: Memoize with Bounded Cache & Explicit `this` Preservation"]
    },
    {
      topicTitle: "Garbage collection",
      anchorId: "m01-p4-topic-garbage-collection",
      explanationHeadings: ["16. Garbage Collection: Mark-and-Sweep & Generational Heaps"],
      exampleTitles: ["Example 4: Bounded Memory Cache & `async` Promise Builder"],
      interviewQuestionIds: ["m01-p4-iq-4"],
      exerciseTitles: ["Exercise 1: Memoize with Bounded Cache & Explicit `this` Preservation"]
    }
  ],
  codeTests: [
    {
      blockIndex: 1,
      label: "Example 1: Scope, Hoisting & Closure Encapsulation",
      expectedStdoutIncludes: ["Counter: 2 5 | TDZ caught? true", "var loop captures: [3,3,3]", "let loop captures: [0,1,2]"],
      minStdoutLines: 3,
      testValidAndInvalidInputs: (run) => {
        assert.equal(run(`const c = createBoundedCounter(3); c.increment(2); return c.value();`), 2);
        assert.throws(() => run(`return createBoundedCounter(0);`), RangeError);
        assert.throws(() => run(`return createBoundedCounter(NaN);`), RangeError);
        assert.throws(() => run(`const c = createBoundedCounter(2); c.increment(3);`), RangeError);
        assert.throws(() => run(`const c = createBoundedCounter(2); c.increment(0);`), RangeError);
      },
      safetyMutations: [
        {
          description: "Removing max limit guard in createBoundedCounter allows counter to exceed max",
          mutateCode: (raw) =>
            raw.replace(/if \(count \+ step > max\) throw new RangeError\("Counter limit exceeded"\);/, "/* guard removed */"),
          verifyProtection: (run) => {
            assert.throws(() => run(`const c = createBoundedCounter(2); c.increment(3);`), RangeError);
          }
        }
      ]
    },
    {
      blockIndex: 2,
      label: "Example 2: Prototype Chain & this vs. Arrow Functions",
      expectedStdoutIncludes: [
        "Proto describe: billing (retries=2) | Own describe? false",
        'Detached this threw? true | Arrow formatAll: ["[ALERT] db","[ALERT] cache"]'
      ],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        assert.equal(run(`return createServiceConfig("auth", 0).describe();`), "auth (retries=0)");
        assert.throws(() => run(`return createServiceConfig("");`), TypeError);
        assert.throws(() => run(`return createServiceConfig("api", -1);`), RangeError);
        assert.throws(() => run(`return new Notifier("");`), TypeError);
        assert.throws(() => run(`return new Notifier("   ");`), TypeError);
        assert.throws(() => run(`return new Notifier("X").formatAll("bad");`), TypeError);
      },
      safetyMutations: [
        {
          description: "Removing retries validation allows negative retry configuration",
          mutateCode: (raw) =>
            raw.replace(/if \(!Number\.isSafeInteger\(retries\) \|\| retries < 0\)\s*\{[^}]*\}/, "/* guard removed */"),
          verifyProtection: (run) => {
            assert.throws(() => run(`return createServiceConfig("api", -1);`), RangeError);
          }
        }
      ]
    },
    {
      blockIndex: 3,
      label: "Example 3: Event Loop Priority Simulator",
      expectedStdoutIncludes: [
        'Execution order: ["sync:start","sync:end","sync:micro-1","sync:micro-chained","sync:macro-1","sync:micro-inside-macro"]'
      ],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`return runEventLoopSimulation("not-fn");`), TypeError);
        assert.throws(() => run(`return runEventLoopSimulation(() => {}, 0);`), RangeError);
        assert.throws(() => {
          run(`return runEventLoopSimulation((rt) => { function loop(m) { m.queueMicrotask(loop); } rt.queueMicrotask(loop); }, 5);`);
        }, RangeError);
      },
      safetyMutations: [
        {
          description: "Removing microtask starvation cap allows infinite microtask loop",
          mutateCode: (raw) =>
            raw.replace(/if \(\+\+drained > maxMicrotasks\)\s*\{\s*throw new RangeError\("Microtask starvation detected"\);\s*\}/, "/* guard removed */"),
          verifyProtection: (run) => {
            assert.throws(() => {
              run(`return runEventLoopSimulation((rt) => { let n = 0; function loop(m) { if (++n < 20) m.queueMicrotask(loop); } rt.queueMicrotask(loop); }, 5);`);
            }, RangeError);
          }
        }
      ]
    },
    {
      blockIndex: 4,
      label: "Example 4: Bounded Memory Cache & Async Builder",
      expectedStdoutIncludes: ["Cache size: 2 | u2 evicted? true", "async fn returns Promise? true"],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        assert.equal(run(`const c = new BoundedCache(1); c.set("a", 1); c.set("b", 2); return c.get("a") === undefined && c.get("b") === 2;`), true);
        assert.throws(() => run(`return new BoundedCache(0);`), RangeError);
        assert.throws(() => run(`new BoundedCache(2).set("", 1);`), TypeError);
        assert.equal(run(`return fetchUserProfile("u_1") instanceof Promise;`), true);
      },
      safetyMutations: [
        {
          description: "Removing maxEntries validation allows 0-capacity cache",
          mutateCode: (raw) =>
            raw.replace(/if \(!Number\.isSafeInteger\(maxEntries\) \|\| maxEntries < 1\)\s*\{[^}]*\}/, "/* guard removed */"),
          verifyProtection: (run) => {
            assert.throws(() => run(`return new BoundedCache(0);`), RangeError);
          }
        }
      ]
    },
    {
      blockIndex: 5,
      label: "Exercise 1: Memoize with Bounded Cache",
      expectedStdoutIncludes: ["First: 30 | Cached: 30 | Calls: 1"],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.equal(
          run(`let n = 0; const m = memoizeBounded((x) => { n++; return x * 2; }, 2); m(1); m(2); m(1); m(3); m(1); return n;`),
          4
        );
        assert.throws(() => run(`return memoizeBounded("bad");`), TypeError);
        assert.throws(() => run(`return memoizeBounded(() => 1, 0);`), RangeError);
      },
      safetyMutations: [
        {
          description: "Removing fn type check defers failure until memoized function call",
          mutateCode: (raw) =>
            raw.replace(/if \(typeof fn !== "function"\) throw new TypeError\("fn must be a function"\);/, "/* guard removed */"),
          verifyProtection: (run) => {
            assert.throws(() => run(`return memoizeBounded("bad");`), TypeError);
          }
        }
      ]
    },
    {
      blockIndex: 6,
      label: "Exercise 2: once(fn) & Prototype Depth",
      expectedStdoutIncludes: ["Once same ref? true", "Proto depth {} vs null-proto: 1 0"],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        assert.equal(run(`let n = 0; const f = once(() => ++n); f(); f(); return n;`), 1);
        assert.equal(run(`return getPrototypeDepth([]);`), 2);
        assert.throws(() => run(`return once(123);`), TypeError);
        assert.throws(() => run(`return getPrototypeDepth(null);`), TypeError);
        assert.throws(() => run(`return getPrototypeDepth("str");`), TypeError);
      },
      safetyMutations: [
        {
          description: "Removing primitive guard in getPrototypeDepth silently auto-boxes strings instead of throwing TypeError",
          mutateCode: (raw) =>
            raw.replace(
              /if \(obj === null \|\| \(typeof obj !== "object" && typeof obj !== "function"\)\)\s*\{[^}]*\}/,
              "/* guard removed */"
            ),
          verifyProtection: (run) => {
            assert.throws(() => run(`return getPrototypeDepth("str");`), TypeError);
          }
        }
      ]
    },
    {
      blockIndex: 7,
      label: "Exercise 3: promiseAllSettledLite",
      expectedStdoutIncludes: ["Returns Promise? true"],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.equal(run(`return promiseAllSettledLite([]) instanceof Promise;`), true);
        // Sparse array [1, , 3] uses indexed loop without hanging; Promise.resolve(item).then settles asynchronously
        assert.equal(run(`return promiseAllSettledLite([1, , 3]) instanceof Promise;`), true);
        assert.equal(run(`const p = promiseAllSettledLite(null); p.catch(() => {}); return p instanceof Promise;`), true);
      },
      safetyMutations: [
        {
          description: "Removing Array.isArray guard crashes synchronously on null instead of returning a rejected Promise",
          mutateCode: (raw) =>
            raw.replace(
              /if \(!Array\.isArray\(items\)\)\s*\{\s*return Promise\.reject\(new TypeError\("items must be an array"\)\);\s*\}/,
              "/* guard removed */"
            ),
          verifyProtection: (run) => {
            assert.equal(run(`const p = promiseAllSettledLite(null); p.catch(() => {}); return p instanceof Promise;`), true);
          }
        }
      ]
    }
  ]
};
