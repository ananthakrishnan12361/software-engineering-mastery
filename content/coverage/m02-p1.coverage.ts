import assert from "node:assert/strict";
import type { LessonCoverageSpec } from "./types";

export const m02p1Coverage: LessonCoverageSpec = {
  lessonId: "m02-p1",
  moduleNumber: 2,
  mdxPath: "content/modules/02-react/m02-p1.mdx",
  topics: [
    {
      topicTitle: "React architecture",
      anchorId: "m02-p1-topic-react-architecture",
      explanationHeadings: [
        "1. React Architecture: Declarative UI, Fiber & Two-Phase Updates",
        "1. React's Trigger &rarr; Render &rarr; Commit Pipeline"
      ],
      exampleTitles: ["Example 2: Virtual DOM Element Factory & `Object.is` State Update Guard"],
      interviewQuestionIds: ["m02-p1-iq-6", "m02-p1-iq-9"],
      exerciseTitles: ["Exercise 1: Immutable State Updater & Snapshot Batcher"]
    },
    {
      topicTitle: "Components",
      anchorId: "m02-p1-topic-components",
      explanationHeadings: ["2. Components: Pure UI Functions & Composition"],
      exampleTitles: ["Example 2: Virtual DOM Element Factory & `Object.is` State Update Guard"],
      interviewQuestionIds: ["m02-p1-iq-7"],
      exerciseTitles: ["Exercise 1: Immutable State Updater & Snapshot Batcher"]
    },
    {
      topicTitle: "Props",
      anchorId: "m02-p1-topic-props",
      explanationHeadings: ["3. Props: Read-Only Inputs & One-Way Data Flow", "1. Props vs. State"],
      exampleTitles: ["Example 2: Virtual DOM Element Factory & `Object.is` State Update Guard"],
      interviewQuestionIds: ["m02-p1-iq-1"],
      exerciseTitles: ["Exercise 2: Safe JSX Attribute & Text Escaper"]
    },
    {
      topicTitle: "State",
      anchorId: "m02-p1-topic-state",
      explanationHeadings: ["4. State: Component-Owned Memory Across Renders", "1. Props vs. State"],
      exampleTitles: ["Example 2: Virtual DOM Element Factory & `Object.is` State Update Guard"],
      interviewQuestionIds: ["m02-p1-iq-1", "m02-p1-iq-3", "m02-p1-iq-5"],
      exerciseTitles: ["Exercise 1: Immutable State Updater & Snapshot Batcher"]
    },
    {
      topicTitle: "Rendering",
      anchorId: "m02-p1-topic-rendering",
      explanationHeadings: ["5. Rendering: Trigger, Render & Commit"],
      exampleTitles: ["Example 2: Virtual DOM Element Factory & `Object.is` State Update Guard"],
      interviewQuestionIds: ["m02-p1-iq-6", "m02-p1-iq-8"],
      exerciseTitles: ["Exercise 1: Immutable State Updater & Snapshot Batcher"]
    },
    {
      topicTitle: "Virtual DOM",
      anchorId: "m02-p1-topic-virtual-dom",
      explanationHeadings: [
        "6. Virtual DOM: Lightweight Element Trees & Reconciliation",
        "2. List Reconciliation: Stable `key` vs. Array Index `key`"
      ],
      exampleTitles: ["Example 3: Keyed List Reconciliation Diff (`mount` / `update` / `unmount`)"],
      interviewQuestionIds: ["m02-p1-iq-4", "m02-p1-iq-7"],
      exerciseTitles: ["Exercise 1: Immutable State Updater & Snapshot Batcher"]
    },
    {
      topicTitle: "JSX",
      anchorId: "m02-p1-topic-jsx",
      explanationHeadings: ["7. JSX: Syntax Sugar for `jsx()` / `React.createElement`"],
      exampleTitles: ["Example 2: Virtual DOM Element Factory & `Object.is` State Update Guard"],
      interviewQuestionIds: ["m02-p1-iq-2"],
      exerciseTitles: ["Exercise 2: Safe JSX Attribute & Text Escaper"]
    },
    {
      topicTitle: "Component lifecycle concepts",
      anchorId: "m02-p1-topic-component-lifecycle-concepts",
      explanationHeadings: ["8. Component Lifecycle Concepts: Mount, Update & Unmount"],
      exampleTitles: ["Example 3: Keyed List Reconciliation Diff (`mount` / `update` / `unmount`)"],
      interviewQuestionIds: ["m02-p1-iq-4", "m02-p1-iq-7"],
      exerciseTitles: ["Exercise 1: Immutable State Updater & Snapshot Batcher"]
    }
  ],
  codeTests: [
    {
      blockIndex: 1,
      label: "Example 2: createVNode & shouldScheduleRender",
      expectedStdoutIncludes: [
        "VNode: li key: inv_1",
        "Mutated same-ref triggers render? false",
        "Immutable copy triggers render? true"
      ],
      minStdoutLines: 3,
      testValidAndInvalidInputs: (run) => {
        assert.equal(run(`return shouldScheduleRender(NaN, NaN).willRender;`), false); // Object.is(NaN, NaN) === true
        assert.equal(run(`return shouldScheduleRender(-0, +0).willRender;`), true); // Object.is(-0, +0) === false
        assert.equal(run(`return shouldScheduleRender(0, (x) => x + 1).nextState;`), 1);
        assert.equal(run(`return createVNode("div", { key: "hack", id: "x" }, 42).key;`), "42");
        assert.equal(run(`return Object.hasOwn(createVNode("div", { key: "hack", id: "x" }, 42).props, "key");`), false);
        assert.equal(run(`const v = createVNode("div", { a: 1 }, undefined); return v.key === null && Object.isFrozen(v) && Object.isFrozen(v.props);`), true);
        assert.throws(() => run(`return createVNode(123);`), TypeError);
        assert.throws(() => run(`return createVNode("   ");`), TypeError);
        assert.throws(() => run(`return createVNode("div", null);`), TypeError);
        assert.throws(() => run(`return createVNode("div", []);`), TypeError);
        assert.throws(() => run(`return createVNode("div", new Date());`), TypeError);
      },
      safetyMutations: [
        {
          description: "Removing VNode type check allows invalid numeric element types",
          mutateCode: (raw) =>
            raw.replace(
              /if \(\(typeof type !== "string" && typeof type !== "function"\) \|\| \(typeof type === "string" && type\.trim\(\)\.length === 0\)\)\s*\{[^}]*\}/,
              "/* guard removed */"
            ),
          verifyProtection: (run) => {
            assert.throws(() => run(`return createVNode(123);`), TypeError);
          }
        }
      ]
    },
    {
      blockIndex: 2,
      label: "Example 3: reconcileKeyedList",
      expectedStdoutIncludes: [
        'Reconcile ops: [{"op":"MOUNT","key":"new"},{"op":"UPDATE","key":"a"},{"op":"UNMOUNT","key":"b"}]'
      ],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.deepEqual(run(`return reconcileKeyedList([{ key: "k", type: "A" }], [{ key: "k", type: "B" }]);`), [
          { op: "REPLACE", key: "k" }
        ]);
        assert.throws(() => run(`return reconcileKeyedList(null, []);`), TypeError);
        assert.throws(() => run(`return reconcileKeyedList([], null);`), TypeError);
        assert.throws(() => run(`return reconcileKeyedList([null], []);`), TypeError);
        assert.throws(() => run(`return reconcileKeyedList([{ key: " ", type: "A" }], []);`), TypeError);
        assert.throws(() => run(`return reconcileKeyedList([], [{ key: "", type: "A" }]);`), TypeError);
        assert.throws(() => run(`return reconcileKeyedList([{ key: "a" }], []);`), TypeError);
        assert.throws(() => run(`return reconcileKeyedList([{ key: "a", type: "A" }, { key: "a", type: "A" }], []);`), RangeError);
        assert.throws(() => run(`return reconcileKeyedList([], [{ key: "a", type: "A" }, { key: "a", type: "A" }]);`), RangeError);
      },
      safetyMutations: [
        {
          description: "Removing duplicate key check in nextItems silently reconciles duplicate keys",
          mutateCode: (raw) =>
            raw.replace(/if \(seenNext\.has\(next\.key\)\) throw new RangeError\(`Duplicate key in nextItems: \$\{next\.key\}`\);/, "/* guard removed */"),
          verifyProtection: (run) => {
            assert.throws(() => run(`return reconcileKeyedList([], [{ key: "a", type: "A" }, { key: "a", type: "A" }]);`), RangeError);
          }
        }
      ]
    },
    {
      blockIndex: 3,
      label: "Exercise 1: applyBatchedUpdates",
      expectedStdoutIncludes: [
        'Snapshot replacement: {"nextState":1,"shouldRender":true}',
        'Functional updaters: {"nextState":3,"shouldRender":true}'
      ],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        assert.deepEqual(run(`return applyBatchedUpdates(5, []);`), { nextState: 5, shouldRender: false });
        assert.deepEqual(run(`return applyBatchedUpdates(NaN, [NaN]);`), { nextState: NaN, shouldRender: false });
        assert.deepEqual(run(`return applyBatchedUpdates(-0, [+0]);`), { nextState: 0, shouldRender: true });
        assert.deepEqual(run(`return applyBatchedUpdates(1, [10, (x) => x + 5]);`), { nextState: 15, shouldRender: true });
        assert.throws(() => run(`return applyBatchedUpdates(0, null);`), TypeError);
        assert.throws(() => run(`return applyBatchedUpdates(0, "bad");`), TypeError);
      },
      safetyMutations: [
        {
          description: "Removing updaters Array.isArray check iterates characters of a string",
          mutateCode: (raw) =>
            raw.replace(/if \(!Array\.isArray\(updaters\)\) throw new TypeError\("updaters must be an array"\);/, "/* guard removed */"),
          verifyProtection: (run) => {
            assert.throws(() => run(`return applyBatchedUpdates(0, "bad");`), TypeError);
          }
        }
      ]
    },
    {
      blockIndex: 4,
      label: "Exercise 2: escapeHtmlText & isSafeHref",
      expectedStdoutIncludes: [
        "Escaped: &lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;",
        "Safe https? true | Safe javascript:? false"
      ],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        assert.equal(run(`return escapeHtmlText(\`a & b < c > "d" 'e'\`);`), "a &amp; b &lt; c &gt; &quot;d&quot; &#39;e&#39;");
        assert.equal(run(`return isSafeHref("/lessons/m01");`), true);
        assert.equal(run(`return isSafeHref("#section-a");`), true);
        assert.equal(run(`return isSafeHref("http:" + "//app.local/ok");`), true);
        assert.equal(run(`return isSafeHref("//evil.com/phish");`), false);
        assert.equal(run(`return isSafeHref("/" + String.fromCharCode(92) + "evil.com");`), false);
        assert.equal(run(`return isSafeHref("/" + String.fromCharCode(9) + "/evil.com");`), false);
        assert.equal(run(`return isSafeHref("  javascript:alert(1)  ");`), false);
        assert.equal(run(`return isSafeHref("vbscript:msgbox(1)");`), false);
        assert.equal(run(`return isSafeHref("data:text/html,<script>");`), false);
        assert.equal(run(`return isSafeHref("   ");`), false);
        assert.equal(run(`return isSafeHref("");`), false);
        assert.throws(() => run(`return escapeHtmlText(null);`), TypeError);
        assert.throws(() => run(`return isSafeHref(123);`), TypeError);
      },
      safetyMutations: [
        {
          description: "Removing protocol check allows javascript: URLs through isSafeHref",
          mutateCode: (raw) =>
            raw.replace(
              /return parsed\.protocol === "https:" \|\| parsed\.protocol === "http:";/,
              "return true;"
            ),
          verifyProtection: (run) => {
            assert.equal(run(`return isSafeHref("javascript:alert(1)");`), false);
          }
        },
        {
          description: "Allowing // protocol-relative paths enables open redirect smuggling",
          mutateCode: (raw) =>
            raw.replace(
              /if \(trimmed\.startsWith\("\/"\) && !trimmed\.startsWith\("\/\/"\) && trimmed\.charCodeAt\(1\) !== 92\) return true;/,
              'if (trimmed.startsWith("/")) return true;'
            ),
          verifyProtection: (run) => {
            assert.equal(run(`return isSafeHref("//evil.com/phish");`), false);
          }
        }
      ]
    }
  ]
};
