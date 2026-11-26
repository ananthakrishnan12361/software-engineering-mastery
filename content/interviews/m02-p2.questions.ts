import type { InterviewQuestion } from "@/entities/handbook";

export const m02p2Questions: InterviewQuestion[] = [
  {
    id: "m02-p2-iq-1",
    lessonId: "m02-p2",
    moduleNumber: 2,
    number: 1,
    difficulty: "basic",
    question: "What are the Rules of Hooks, and why can't you call `useState` or `useEffect` inside an `if` statement?",
    paragraphs: [
      {
        label: "Explanation:",
        body: "React does not identify hooks by variable name—it stores each component's hooks as a linked list on its Fiber node (`fiber.memoizedState`) and matches them by **call-order index** (`slot 0`, `slot 1`, `slot 2`)."
      },
      {
        label: "Why Conditional Hooks Break:",
        body: "If a hook is inside an `if` condition that flips from `true` to `false` between renders, every subsequent hook shifts to the wrong slot index, reading mismatched state or crashing React. Always call hooks at the **top level** of React function components or custom hooks."
      }
    ],
    subboxes: [
      {
        title: "Tip",
        content: "Put the `if` condition *inside* `useEffect(() => { if (ready) { ... } }, [ready])`, never around `useEffect(...)` itself."
      }
    ]
  },
  {
    id: "m02-p2-iq-2",
    lessonId: "m02-p2",
    moduleNumber: 2,
    number: 2,
    difficulty: "basic",
    question: "What is the difference between `useState` and `useRef`?",
    paragraphs: [
      {
        label: "Explanation:",
        body: "`useState` holds UI state: calling its setter schedules a re-render and provides a fresh snapshot value on the next render. `useRef` returns a persistent mutable object `{ current: initialValue }`: mutating `ref.current` happens immediately and **never** triggers a re-render."
      }
    ],
    subboxes: [
      {
        title: "When to Use Which",
        content: "Use `useState` for anything rendered in JSX; use `useRef` for DOM element references (`inputRef.current?.focus()`), timer/interval IDs, or mutable flags."
      }
    ]
  },
  {
    id: "m02-p2-iq-3",
    lessonId: "m02-p2",
    moduleNumber: 2,
    number: 3,
    difficulty: "intermediate",
    question: "How does `useEffect` cleanup work, and how do you prevent race conditions when fetching data on prop/query changes?",
    paragraphs: [
      {
        label: "Cleanup Lifecycle:",
        body: "When a dependency changes, React commits the new DOM, runs the **previous** render's cleanup function (`return () => ...`), and then runs the new effect. It also runs the final cleanup when the component unmounts."
      },
      {
        label: "Race-Condition Prevention:",
        body: "Fast-typed queries can resolve out of order (`\"re\"` finishing after `\"react\"`). Create an `AbortController` inside `useEffect`, pass `controller.signal` to `fetch`, and call `controller.abort()` in the cleanup (or track a `let ignore = false` flag) so stale responses never call `setState`."
      }
    ],
    subboxes: [
      {
        title: "Code Sketch",
        content: "`useEffect(() => { const c = new AbortController(); fetch(url, { signal: c.signal }).then(...); return () => c.abort(); }, [url]);`",
        isCode: true
      }
    ]
  },
  {
    id: "m02-p2-iq-4",
    lessonId: "m02-p2",
    moduleNumber: 2,
    number: 4,
    difficulty: "intermediate",
    question: "When should you use `useMemo`, `useCallback`, and `React.memo`, and how can inline props defeat `React.memo`?",
    paragraphs: [
      {
        label: "Roles:",
        body: "`useMemo` caches an expensive computed value (or keeps an object/array reference stable); `useCallback` caches a function reference; `React.memo` wraps a component to skip re-rendering when all props are shallowly equal (`Object.is`)."
      },
      {
        label: "The Inline Prop Trap:",
        body: "If a parent renders `<MemoRow style={{ color: 'red' }} onClick={() => select(id)} />`, a brand-new `style` object and `onClick` function are allocated on every parent render. `React.memo`'s `Object.is` check fails every time, paying comparison cost with zero bailout benefit."
      }
    ],
    subboxes: [
      {
        title: "Best Practice",
        content: "Pair `React.memo` with `useCallback` / `useMemo` (or module-level constants) only where profiling shows a slow subtree."
      }
    ]
  },
  {
    id: "m02-p2-iq-5",
    lessonId: "m02-p2",
    moduleNumber: 2,
    number: 5,
    difficulty: "intermediate",
    question: "Why should you avoid using `useEffect` to compute derived state or respond to user button clicks?",
    paragraphs: [
      {
        label: "Derived State Problem:",
        body: "If you store `items` in state and use `useEffect(() => setFiltered(items.filter(...)), [items])`, React renders **twice** on every change (once with stale `filtered`, then again after the effect commits) and risks temporary UI flicker."
      },
      {
        label: "Correct Pattern:",
        body: "Compute derived values directly during render (`const filtered = items.filter(...)` or `useMemo` if expensive), and trigger actions/POST requests directly inside event handlers (`onClick`/`onSubmit`)."
      }
    ],
    subboxes: [
      {
        title: "Rule of Thumb",
        content: "Reserve `useEffect` strictly for synchronizing with external systems (subscriptions, timers, DOM APIs, or external stores)."
      }
    ]
  },
  {
    id: "m02-p2-iq-6",
    lessonId: "m02-p2",
    moduleNumber: 2,
    number: 6,
    difficulty: "advanced",
    question: "What causes stale closures in `useEffect` or `useCallback`, and what are the cleanest ways to fix them without lying to the dependency array?",
    paragraphs: [
      {
        label: "Root Cause:",
        body: "Every render creates a fresh closure over that render's `props` and `state`. If `useEffect(() => { const id = setInterval(() => setCount(count + 1), 1000); return () => clearInterval(id); }, [])` omits `count` from `[]`, the interval callback forever reads `count === 0` from mount."
      },
      {
        label: "Clean Fixes:",
        body: "(1) Use functional state updates (`setCount((c) => c + 1)`) so the callback needs no `count` dependency; (2) include all reactive values in `[deps]` honestly; (3) for callbacks that need the latest value without restarting an effect, store the latest value in a `useRef` updated during commit/effect (or `useEffectEvent` in newer React)."
      }
    ],
    subboxes: [
      {
        title: "Anti-Pattern",
        content: "Never disable `react-hooks/exhaustive-deps` to silence a warning—it hides real stale-closure bugs."
      }
    ]
  },
  {
    id: "m02-p2-iq-7",
    lessonId: "m02-p2",
    moduleNumber: 2,
    number: 7,
    difficulty: "advanced",
    question: "Why does `useContext` cause performance issues when a Provider passes an unmemoized object or mixes fast- and slow-changing state?",
    paragraphs: [
      {
        label: "Propagation Mechanism:",
        body: "Whenever a Context Provider's `value` prop changes by `Object.is`, React schedules a re-render for **every** descendant calling `useContext(ThatContext)`—even if that descendant only uses one unchanged field (`logout`) and is wrapped in `React.memo`."
      },
      {
        label: "Mitigations:",
        body: "Memoize the provider value (`useMemo(() => ({ user, login }), [user, login])`), split high-frequency state (e.g., `SearchQueryContext`) from low-frequency state (`AuthContext`) or stable dispatch functions (`DispatchContext`), or use an external store selector (`useSyncExternalStore` / Zustand) for fine-grained subscriptions."
      }
    ],
    subboxes: [
      {
        title: "Interview Tip",
        content: "Clarify that `React.memo` on a parent blocks prop-driven re-renders, NOT `useContext` subscriptions inside a child."
      }
    ]
  },
  {
    id: "m02-p2-iq-8",
    lessonId: "m02-p2",
    moduleNumber: 2,
    number: 8,
    difficulty: "advanced",
    question: "How do Custom Hooks share stateful logic without sharing state across component instances, and how do you test them?",
    paragraphs: [
      {
        label: "Isolation Mechanism:",
        body: "A custom hook (`useDebouncedValue`, `usePagination`) is just a JavaScript function that delegates to built-in hooks (`useState`, `useEffect`). When Component A and Component B both call `useDebouncedValue`, each component executes the function in its own render context and stores its own slots on its own Fiber node."
      },
      {
        label: "Testing Strategy:",
        body: "Test custom hooks via `@testing-library/react`'s `renderHook` (or a small test host component) asserting state transitions, debounced timers with fake timers, and `AbortController` cleanup on unmount."
      }
    ],
    subboxes: [
      {
        title: "Follow-up",
        content: "If two components DO need to share live state, lift state to a common parent, use Context, or use a store/query cache—don't expect a custom hook alone to share state."
      }
    ]
  },
  {
    id: "m02-p2-iq-9",
    lessonId: "m02-p2",
    moduleNumber: 2,
    number: 9,
    difficulty: "senior-architect",
    question: "Design a reusable `useAsyncResource` / data-fetching hook and component optimization strategy for a multi-widget analytics dashboard that avoids race conditions, memory leaks, and unnecessary re-renders.",
    numberedSteps: [
      {
        title: "How to analyze the problem:",
        body: "Identify the three failure modes in hook-heavy dashboards: (1) out-of-order async responses overwriting newer filters, (2) uncancelled timers/fetches leaking or warning on unmount, and (3) root context/callback churn re-rendering heavy charts."
      },
      {
        title: "Requirements:",
        body: "Automatic cancellation on filter change or unmount; explicit `loading | success | error` states; isolated chart re-renders; clean TypeScript generics."
      },
      {
        title: "Architecture:",
        body: "Custom hook `useAsyncResource<T>(fetcher, deps)` managing `AbortController` + request sequence token -> Memoized chart widgets (`React.memo`) -> Split `FilterContext` & `ActionsContext`."
      },
      {
        title: "Database design:",
        body: "Backend analytics tables use pre-aggregated rollups / indexed `(tenant_id, metric_date)` queries so aborted/re-triggered dashboard queries stay fast."
      },
      {
        title: "API design:",
        body: "Accept query params (`from`, `to`, `granularity`), support HTTP `ETag`/`Cache-Control`, and return typed JSON envelopes."
      },
      {
        title: "Technology choices:",
        body: "For production apps, prefer TanStack Query (which handles caching, deduping, retries, and cancellation out of the box); when building lightweight custom hooks, use `AbortController` + `useEffect` cleanup + `useMemo`/`useCallback` at chart boundaries."
      },
      {
        title: "Scaling:",
        body: "Debounce rapid filter changes (`useDebouncedValue`), memoize expensive series transforms with `useMemo`, and keep chart callbacks stable with `useCallback`."
      },
      {
        title: "Security:",
        body: "Clear cached user/tenant state on tenant switch or logout; abort in-flight requests in cleanup so stale tenant responses never commit."
      },
      {
        title: "Failure handling:",
        body: "Distinguish `AbortError` (expected cancellation, ignore silently) from real network/HTTP errors (surface retry UI)."
      },
      {
        title: "Trade-offs:",
        body: "A custom `useEffect` fetch hook is ~40 lines with zero bundle cost, but lacks cross-component request deduplication and stale-while-revalidate caching compared to TanStack Query."
      },
      {
        title: "Sample senior answer:",
        body: "\"In a custom `useAsyncResource` hook, I create an `AbortController` inside `useEffect` and abort it in the cleanup so stale responses never win a race or leak after unmount, ignoring `AbortError`. To keep charts fast, I split fast-changing filter state from stable action callbacks, memoize derived series with `useMemo`, and wrap chart leaves in `React.memo`—while noting that for full caching/deduping I'd adopt TanStack Query.\""
      },
      {
        title: "Follow-up questions:",
        body: "Why does `useEffect` run twice in React 18/19 `<StrictMode>` dev? To verify your cleanup function (`controller.abort()`) properly tears down and re-establishes external synchronization."
      }
    ]
  }
];
