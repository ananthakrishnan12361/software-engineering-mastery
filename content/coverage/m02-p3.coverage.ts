import assert from "node:assert/strict";
import type { LessonCoverageSpec } from "./types";

export const m02p3Coverage: LessonCoverageSpec = {
  lessonId: "m02-p3",
  moduleNumber: 2,
  mdxPath: "content/modules/02-react/m02-p3.mdx",
  topics: [
    {
      topicTitle: "State management",
      anchorId: "m02-p3-topic-state-management",
      explanationHeadings: ["1. State Management: Local, Shared Client, URL, and Server State"],
      exampleTitles: ["Example 2: Redux Store Core (`createStore`, Immutable Reducer, Re-Entrant Dispatch Guard)"],
      interviewQuestionIds: ["m02-p3-iq-1", "m02-p3-iq-9"],
      exerciseTitles: ["Exercise 1: Mini RTK Slice Reducer Builder (createSliceReducer)"]
    },
    {
      topicTitle: "Context API",
      anchorId: "m02-p3-topic-context-api",
      explanationHeadings: ["2. Context API: Dependency Injection Across the Component Tree"],
      exampleTitles: ["Example 2: Redux Store Core (`createStore`, Immutable Reducer, Re-Entrant Dispatch Guard)"],
      interviewQuestionIds: ["m02-p3-iq-1", "m02-p3-iq-2"],
      exerciseTitles: ["Exercise 1: Mini RTK Slice Reducer Builder (createSliceReducer)"]
    },
    {
      topicTitle: "Redux",
      anchorId: "m02-p3-topic-redux",
      explanationHeadings: ["3. Redux: Predictable Single Store, Actions & Pure Reducers"],
      exampleTitles: ["Example 2: Redux Store Core (`createStore`, Immutable Reducer, Re-Entrant Dispatch Guard)"],
      interviewQuestionIds: ["m02-p3-iq-1"],
      exerciseTitles: ["Exercise 1: Mini RTK Slice Reducer Builder (createSliceReducer)"]
    },
    {
      topicTitle: "Redux Toolkit",
      anchorId: "m02-p3-topic-redux-toolkit",
      explanationHeadings: ["4. Redux Toolkit (RTK): Modern Standard Redux Without Boilerplate"],
      exampleTitles: ["Example 2: Redux Store Core (`createStore`, Immutable Reducer, Re-Entrant Dispatch Guard)"],
      interviewQuestionIds: ["m02-p3-iq-4"],
      exerciseTitles: ["Exercise 1: Mini RTK Slice Reducer Builder (createSliceReducer)"]
    },
    {
      topicTitle: "React Query / TanStack Query",
      anchorId: "m02-p3-topic-tanstack-query",
      explanationHeadings: [
        "5. React Query / TanStack Query: Server State Caching & Synchronization",
        "1. Server State Cache Architecture (TanStack Query Stale-While-Revalidate)"
      ],
      exampleTitles: ["Example 3: TanStack Query Cache & In-Flight Request Deduplicator (`createQueryCache`)"],
      interviewQuestionIds: ["m02-p3-iq-1", "m02-p3-iq-5", "m02-p3-iq-9"],
      exerciseTitles: ["Exercise 2: Single-Flight Auth Token Refresh Client (createAuthClient)"]
    },
    {
      topicTitle: "React Router",
      anchorId: "m02-p3-topic-react-router",
      explanationHeadings: ["6. React Router: Declarative Routes, Params, Loaders & Protected Layouts"],
      exampleTitles: ["Example 4: Schema Form Validator & Route RBAC Guard (`validateOrderForm`, `canActivateRoute`)"],
      interviewQuestionIds: ["m02-p3-iq-8"],
      exerciseTitles: ["Exercise 2: Single-Flight Auth Token Refresh Client (createAuthClient)"]
    },
    {
      topicTitle: "Forms",
      anchorId: "m02-p3-topic-forms",
      explanationHeadings: ["7. Forms: Controlled, Uncontrolled & Schema-Driven Submissions"],
      exampleTitles: ["Example 4: Schema Form Validator & Route RBAC Guard (`validateOrderForm`, `canActivateRoute`)"],
      interviewQuestionIds: ["m02-p3-iq-6"],
      exerciseTitles: ["Exercise 1: Mini RTK Slice Reducer Builder (createSliceReducer)"]
    },
    {
      topicTitle: "Validation",
      anchorId: "m02-p3-topic-validation",
      explanationHeadings: ["8. Validation: Client UX + Authoritative Server Contracts"],
      exampleTitles: ["Example 4: Schema Form Validator & Route RBAC Guard (`validateOrderForm`, `canActivateRoute`)"],
      interviewQuestionIds: ["m02-p3-iq-6"],
      exerciseTitles: ["Exercise 1: Mini RTK Slice Reducer Builder (createSliceReducer)"]
    },
    {
      topicTitle: "API integration",
      anchorId: "m02-p3-topic-api-integration",
      explanationHeadings: ["9. API Integration: Typed Clients, Timeouts, Retries & Error Normalization"],
      exampleTitles: ["Example 3: TanStack Query Cache & In-Flight Request Deduplicator (`createQueryCache`)"],
      interviewQuestionIds: ["m02-p3-iq-5", "m02-p3-iq-7"],
      exerciseTitles: ["Exercise 2: Single-Flight Auth Token Refresh Client (createAuthClient)"]
    },
    {
      topicTitle: "Authentication",
      anchorId: "m02-p3-topic-authentication",
      explanationHeadings: [
        "10. Authentication: Verifying Identity & Managing Session Tokens Safely",
        "2. Frontend Route Guard, Single-Flight Refresh & Server Authorization"
      ],
      exampleTitles: ["Example 4: Schema Form Validator & Route RBAC Guard (`validateOrderForm`, `canActivateRoute`)"],
      interviewQuestionIds: ["m02-p3-iq-3", "m02-p3-iq-7"],
      exerciseTitles: ["Exercise 2: Single-Flight Auth Token Refresh Client (createAuthClient)"]
    },
    {
      topicTitle: "Authorization",
      anchorId: "m02-p3-topic-authorization",
      explanationHeadings: ["11. Authorization: Enforcing Roles & Permissions Beyond Hidden Buttons"],
      exampleTitles: ["Example 4: Schema Form Validator & Route RBAC Guard (`validateOrderForm`, `canActivateRoute`)"],
      interviewQuestionIds: ["m02-p3-iq-3", "m02-p3-iq-8"],
      exerciseTitles: ["Exercise 2: Single-Flight Auth Token Refresh Client (createAuthClient)"]
    }
  ],
  codeTests: [
    {
      blockIndex: 1,
      label: "Example 2: createReduxStore",
      expectedStdoutIncludes: ["Final count: 6 | Notifications: 2"],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`createReduxStore("bad");`), TypeError);
        assert.throws(() => run(`const s = createReduxStore((x = 0) => x); s.dispatch({ type: "" });`), TypeError);
        assert.throws(() => {
          run(`const s = createReduxStore((x = 0) => { s.getState(); return x; });`);
        }, Error);
      },
      safetyMutations: [
        {
          description: "Removing re-entrant dispatch guard allows nested reducer dispatch",
          mutateCode: (raw) =>
            raw.replace(/if \(isDispatching\) throw new Error\("Reducers may not dispatch actions"\);/, "/* guard removed */"),
          verifyProtection: (run) => {
            assert.throws(() => {
              run(`let st; st = createReduxStore((s = 0, a) => { if (a.type === "go") st.dispatch({ type: "nested" }); return s; }); st.dispatch({ type: "go" });`);
            }, /dispatch/);
          }
        }
      ]
    },
    {
      blockIndex: 2,
      label: "Example 3: createQueryCache",
      expectedStdoutIncludes: ["Keys match: true | Network calls: 1"],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.equal(
          run(`return serializeQueryKey(["k", { b: 2, a: 1 }]) === serializeQueryKey(["k", { a: 1, b: 2 }]);`),
          true
        );
        assert.throws(() => run(`serializeQueryKey([]);`), TypeError);
      },
      safetyMutations: [
        {
          description: "Removing empty queryKey guard allows ambiguous empty cache keys",
          mutateCode: (raw) =>
            raw.replace(/if \(!Array\.isArray\(queryKey\) \|\| queryKey\.length === 0\)\s*\{[^}]*\}/, "/* guard removed */"),
          verifyProtection: (run) => {
            assert.throws(() => run(`serializeQueryKey([]);`), TypeError);
          }
        }
      ]
    },
    {
      blockIndex: 3,
      label: "Example 4: validateOrderForm & canActivateRoute",
      expectedStdoutIncludes: [
        "Valid form: true",
        "Anon user:",
        "Viewer:"
      ],
      minStdoutLines: 4,
      testValidAndInvalidInputs: (run) => {
        assert.equal(run(`return validateOrderForm({ email: "a@b.co", quantity: 100 }).valid;`), true);
        assert.equal(run(`return validateOrderForm({ email: "a@b.co", quantity: 101 }).valid;`), false);
        assert.throws(() => run(`validateOrderForm(null);`), TypeError);
        assert.equal(run(`return canActivateRoute({ permissions: ["orders:write"] }, "orders:write").allow;`), true);
        assert.throws(() => run(`canActivateRoute(null, "");`), TypeError);
      },
      safetyMutations: [
        {
          description: "Removing quantity upper bound allows arbitrary order quantities",
          mutateCode: (raw) => raw.replace(/\|\| qty > 100/, ""),
          verifyProtection: (run) => {
            assert.equal(run(`return validateOrderForm({ email: "a@b.co", quantity: 9999 }).valid;`), false);
          }
        }
      ]
    },
    {
      blockIndex: 4,
      label: "Exercise 1: createSliceReducer",
      expectedStdoutIncludes: ["State 1:", "State 2:"],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`createSliceReducer("", {}, {});`), TypeError);
        assert.equal(
          run(`const f = createSliceReducer("a", { n: 1 }, { inc: (s) => ({ n: s.n + 1 }) }); return f.reducer(undefined, { type: "other/inc" }).n;`),
          1
        );
      },
      safetyMutations: [
        {
          description: "Removing empty slice name check allows colliding /action types",
          mutateCode: (raw) =>
            raw.replace(/if \(typeof name !== "string" \|\| !name\.trim\(\)\) throw new TypeError\("name must be a non-empty string"\);/, "/* guard removed */"),
          verifyProtection: (run) => {
            assert.throws(() => run(`createSliceReducer("   ", {}, {});`), TypeError);
          }
        }
      ]
    },
    {
      blockIndex: 5,
      label: "Exercise 2: createAuthClient",
      expectedStdoutIncludes: ["Auth client ready | Refresh calls queued: 0"],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`createAuthClient({ request: "bad", refresh: () => {} });`), TypeError);
        assert.throws(() => run(`createAuthClient({ request: () => {}, refresh: () => {} })("bad");`), TypeError);
      },
      safetyMutations: [
        {
          description: "Removing path leading-slash guard permits arbitrary URL targets",
          mutateCode: (raw) =>
            raw.replace(/if \(typeof path !== "string" \|\| !path\.startsWith\("\/"\) \|\| path\.startsWith\("\/\/"\)\)\s*\{[^}]*\}/, "/* guard removed */"),
          verifyProtection: (run) => {
            assert.throws(() => {
              run(`createAuthClient({ request: () => ({ status: 200 }), refresh: () => "t" })("//evil.example");`);
            }, TypeError);
          }
        }
      ]
    }
  ]
};
