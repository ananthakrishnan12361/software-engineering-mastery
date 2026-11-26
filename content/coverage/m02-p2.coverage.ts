import assert from "node:assert/strict";
import type { LessonCoverageSpec } from "./types";

export const m02p2Coverage: LessonCoverageSpec = {
  lessonId: "m02-p2",
  moduleNumber: 2,
  mdxPath: "content/modules/02-react/m02-p2.mdx",
  topics: [
    {
      topicTitle: "Hooks",
      anchorId: "m02-p2-topic-hooks",
      explanationHeadings: [
        "1. Hooks: Rules of Hooks & Fiber Slot Ordering",
        "1. How React Stores Hooks as a Linked List on Fiber Nodes"
      ],
      exampleTitles: ["Example 2: Hook Slot Order Enforcer (Why Conditional Hooks Break)"],
      interviewQuestionIds: ["m02-p2-iq-1"],
      exerciseTitles: ["Exercise 1: Effect Lifecycle & Stale-Request Guard Simulator"]
    },
    {
      topicTitle: "useState",
      anchorId: "m02-p2-topic-usestate",
      explanationHeadings: ["2. `useState`: Snapshot State, Lazy Init & Functional Updaters", "1. `useState` vs. `useRef`"],
      exampleTitles: ["Example 2: Hook Slot Order Enforcer (Why Conditional Hooks Break)"],
      interviewQuestionIds: ["m02-p2-iq-1", "m02-p2-iq-2"],
      exerciseTitles: ["Exercise 1: Effect Lifecycle & Stale-Request Guard Simulator"]
    },
    {
      topicTitle: "useEffect",
      anchorId: "m02-p2-topic-useeffect",
      explanationHeadings: [
        "3. `useEffect`: Synchronizing with External Systems (Not Business Logic)",
        "2. `useEffect` Cleanup Timing & Stale Race Prevention"
      ],
      exampleTitles: ["Example 3: Dependency Array Diffing (`Object.is`) & `React.memo` Shallow Props Bailout"],
      interviewQuestionIds: ["m02-p2-iq-3", "m02-p2-iq-5", "m02-p2-iq-6"],
      exerciseTitles: ["Exercise 1: Effect Lifecycle & Stale-Request Guard Simulator"]
    },
    {
      topicTitle: "useRef",
      anchorId: "m02-p2-topic-useref",
      explanationHeadings: ["4. `useRef`: Mutable Escape Hatch Without Re-Renders", "1. `useState` vs. `useRef`"],
      exampleTitles: ["Example 2: Hook Slot Order Enforcer (Why Conditional Hooks Break)"],
      interviewQuestionIds: ["m02-p2-iq-2", "m02-p2-iq-6"],
      exerciseTitles: ["Exercise 1: Effect Lifecycle & Stale-Request Guard Simulator"]
    },
    {
      topicTitle: "useContext",
      anchorId: "m02-p2-topic-usecontext",
      explanationHeadings: ["5. `useContext`: Reading Shared Tree Values Without Prop Drilling"],
      exampleTitles: ["Example 3: Dependency Array Diffing (`Object.is`) & `React.memo` Shallow Props Bailout"],
      interviewQuestionIds: ["m02-p2-iq-7"],
      exerciseTitles: ["Exercise 2: Memoized Selector (createMemoSelector) Modeling useMemo"]
    },
    {
      topicTitle: "useMemo",
      anchorId: "m02-p2-topic-usememo",
      explanationHeadings: [
        "6. `useMemo`: Caching Expensive Calculations & Reference Identity",
        "2. `useMemo` vs. `useCallback` vs. `React.memo`"
      ],
      exampleTitles: ["Example 3: Dependency Array Diffing (`Object.is`) & `React.memo` Shallow Props Bailout"],
      interviewQuestionIds: ["m02-p2-iq-4"],
      exerciseTitles: ["Exercise 2: Memoized Selector (createMemoSelector) Modeling useMemo"]
    },
    {
      topicTitle: "useCallback",
      anchorId: "m02-p2-topic-usecallback",
      explanationHeadings: [
        "7. `useCallback`: Stabilizing Function References",
        "2. `useMemo` vs. `useCallback` vs. `React.memo`"
      ],
      exampleTitles: ["Example 3: Dependency Array Diffing (`Object.is`) & `React.memo` Shallow Props Bailout"],
      interviewQuestionIds: ["m02-p2-iq-4"],
      exerciseTitles: ["Exercise 2: Memoized Selector (createMemoSelector) Modeling useMemo"]
    },
    {
      topicTitle: "React.memo",
      anchorId: "m02-p2-topic-reactmemo",
      explanationHeadings: [
        "8. `React.memo`: Skipping Child Re-Renders on Unchanged Props",
        "2. `useMemo` vs. `useCallback` vs. `React.memo`"
      ],
      exampleTitles: ["Example 3: Dependency Array Diffing (`Object.is`) & `React.memo` Shallow Props Bailout"],
      interviewQuestionIds: ["m02-p2-iq-4", "m02-p2-iq-7"],
      exerciseTitles: ["Exercise 2: Memoized Selector (createMemoSelector) Modeling useMemo"]
    },
    {
      topicTitle: "Custom hooks",
      anchorId: "m02-p2-topic-custom-hooks",
      explanationHeadings: ["9. Custom Hooks: Composing Reusable Stateful Logic"],
      exampleTitles: ["Example 2: Hook Slot Order Enforcer (Why Conditional Hooks Break)"],
      interviewQuestionIds: ["m02-p2-iq-8", "m02-p2-iq-9"],
      exerciseTitles: ["Exercise 1: Effect Lifecycle & Stale-Request Guard Simulator"]
    }
  ],
  codeTests: [
    {
      blockIndex: 1,
      label: "Example 2: Hook Slot Order Enforcer",
      expectedStdoutIncludes: ["State preserved across render: Ava -> Liam"],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => {
          run(`const r = createHookRuntime(); r.beginRender(); r.useState(1); r.useState(2); r.endRender(); r.beginRender(); r.useState(1); r.endRender();`);
        }, /fewer hooks/);
        assert.throws(() => {
          run(`const r = createHookRuntime(); r.beginRender(); r.useState(1); r.endRender(); r.beginRender(); r.useState(1); r.useState(2); r.endRender();`);
        }, /more\/different hooks/);
      },
      safetyMutations: [
        {
          description: "Removing fewer-hooks check allows conditional hook skip silently",
          mutateCode: (raw) =>
            raw.replace(/else if \(cursor !== slots\.length\)\s*\{[^}]*\}/, "/* guard removed */"),
          verifyProtection: (run) => {
            assert.throws(() => {
              run(`const r = createHookRuntime(); r.beginRender(); r.useState(1); r.useState(2); r.endRender(); r.beginRender(); r.useState(1); r.endRender();`);
            }, /fewer hooks/);
          }
        }
      ]
    },
    {
      blockIndex: 2,
      label: "Example 3: Dependency Array Diffing & Shallow Props",
      expectedStdoutIncludes: [
        "Memo skips with stable props? true",
        "Memo skips with new inline fn? false",
        "Deps equal [NaN] vs [NaN]? true"
      ],
      minStdoutLines: 3,
      testValidAndInvalidInputs: (run) => {
        assert.equal(run(`return areDepsEqual([1, "a"], [1, "a"]);`), true);
        assert.equal(run(`return areDepsEqual([-0], [+0]);`), false);
        assert.equal(run(`return areDepsEqual([1], [1, 2]);`), false);
        assert.throws(() => run(`return areDepsEqual(null, []);`), TypeError);
        assert.equal(run(`return arePropsShallowEqual({ a: 1 }, { a: 1, b: 2 });`), false);
        assert.throws(() => run(`return arePropsShallowEqual(null, {});`), TypeError);
      },
      safetyMutations: [
        {
          description: "Removing non-array deps check allows null/non-array deps",
          mutateCode: (raw) =>
            raw.replace(/if \(!Array\.isArray\(prevDeps\) \|\| !Array\.isArray\(nextDeps\)\)\s*\{[^}]*\}/, "/* guard removed */"),
          verifyProtection: (run) => {
            assert.throws(() => run(`return areDepsEqual("ab", "cd");`), TypeError);
          }
        }
      ]
    },
    {
      blockIndex: 3,
      label: "Exercise 1: createEffectRunner",
      expectedStdoutIncludes: ['Effect trace: ["sub:1","unsub:1","sub:2","unsub:2"]'],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.equal(run(`const r = createEffectRunner(); return r.commit(() => {}, [NaN]) && !r.commit(() => {}, [NaN]);`), true);
        assert.throws(() => run(`createEffectRunner().commit("bad", []);`), TypeError);
        assert.throws(() => run(`createEffectRunner().commit(() => {}, "bad");`), TypeError);
      },
      safetyMutations: [
        {
          description: "Removing previous cleanup invocation leaks prior subscription on update",
          mutateCode: (raw) => raw.replace(/if \(typeof cleanup === "function"\) cleanup\(\);/, "/* cleanup skipped */"),
          verifyProtection: (run) => {
            const cleaned = run(`
              const trace = [];
              const r = createEffectRunner();
              r.commit(() => () => trace.push("cleaned"), [1]);
              r.commit(() => {}, [2]);
              return trace[0];
            `);
            assert.equal(cleaned, "cleaned");
          }
        }
      ]
    },
    {
      blockIndex: 4,
      label: "Exercise 2: createMemoSelector",
      expectedStdoutIncludes: ["Call 1: 15 | Call 2 (hit): 15 | Runs: 1"],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.equal(run(`let n = 0; const s = createMemoSelector((x) => { n++; return x * 2; }); s([3]); s([3]); s([4]); return n;`), 2);
        assert.throws(() => run(`return createMemoSelector("bad");`), TypeError);
        assert.throws(() => run(`createMemoSelector(() => 1)("bad");`), TypeError);
      },
      safetyMutations: [
        {
          description: "Removing computeFn type guard defers error until selector invocation",
          mutateCode: (raw) =>
            raw.replace(/if \(typeof computeFn !== "function"\) throw new TypeError\("computeFn must be a function"\);/, "/* guard removed */"),
          verifyProtection: (run) => {
            assert.throws(() => run(`return createMemoSelector("bad");`), TypeError);
          }
        }
      ]
    }
  ]
};
