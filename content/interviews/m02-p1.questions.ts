import type { InterviewQuestion } from "@/entities/handbook";

export const m02p1Questions: InterviewQuestion[] = [
  {
    id: "m02-p1-iq-1",
    lessonId: "m02-p1",
    moduleNumber: 2,
    number: 1,
    difficulty: "basic",
    question: "What is the difference between `props` and `state` in React?",
    paragraphs: [
      {
        label: "Explanation:",
        body: "`props` are read-only inputs passed from a parent component to configure a child component (enforcing one-way data flow). A child must never mutate its `props`. `state` is mutable snapshot data owned internally by a component instance across renders; updating state via its setter schedules a re-render."
      }
    ],
    subboxes: [
      {
        title: "Example",
        content: "`<OrderRow order={order} onDelete={handleDelete} />` passes `order` & callback down via `props`, while `const [isOpen, setIsOpen] = useState(false)` tracks local `state`.",
        isCode: true
      },
      {
        title: "Interview Tip",
        content: "Mention that derived values (like `items.length` or `firstName + lastName`) should be computed during render from props/state rather than stored in duplicate state."
      }
    ]
  },
  {
    id: "m02-p1-iq-2",
    lessonId: "m02-p1",
    moduleNumber: 2,
    number: 2,
    difficulty: "basic",
    question: "What is JSX, and how does React turn it into DOM elements?",
    paragraphs: [
      {
        label: "Explanation:",
        body: "**JSX** is a syntax extension for JavaScript that looks like HTML (`<Button kind=\"primary\">Save</Button>`). Compilers like Babel, SWC, or TypeScript transform JSX into plain JS function calls (`jsx(Button, { kind: \"primary\", children: \"Save\" })`), which return lightweight React Element objects."
      },
      {
        label: "Security & Rules:",
        body: "Because JSX compiles to JS, expressions go inside `{ ... }`, attributes use camelCase (`className`, `onClick`), and React automatically escapes text values inside `{userInput}` to help protect against XSS."
      }
    ],
    subboxes: [
      {
        title: "Follow-up",
        content: "Why must a component return a single root element or Fragment (`<>...</>`)? Because a JS function can only return one value."
      }
    ]
  },
  {
    id: "m02-p1-iq-3",
    lessonId: "m02-p1",
    moduleNumber: 2,
    number: 3,
    difficulty: "basic",
    question: "Why should you never mutate React state objects or arrays directly (e.g., `items.push(x)`)?",
    paragraphs: [
      {
        label: "Explanation:",
        body: "React checks whether state changed using `Object.is(prevState, nextState)` (shallow reference equality for objects/arrays). If you mutate `items.push(x)` and call `setItems(items)`, the array reference is identical (`Object.is(items, items) === true`), so React bails out and skips re-rendering."
      },
      {
        label: "Fix:",
        body: "Always pass a new reference (`setItems([...items, x])` or `setUser({ ...user, name })`), which also enables predictable `React.memo` comparisons and time-travel debugging."
      }
    ],
    subboxes: [
      {
        title: "Example",
        content: "Use `.map()`, `.filter()`, `.toSorted()`, or spread `[...items, next]` instead of `.push()`, `.splice()`, or `.sort()`.",
        isCode: false
      }
    ]
  },
  {
    id: "m02-p1-iq-4",
    lessonId: "m02-p1",
    moduleNumber: 2,
    number: 4,
    difficulty: "intermediate",
    question: "Why is using array `index` as a `key` problematic in dynamic lists, and why is `Math.random()` even worse?",
    paragraphs: [
      {
        label: "Index Key Bug:",
        body: "React identifies list items across renders by `key`. When you prepend, delete, or sort items with `key={index}`, the item at index `0` keeps `key={0}` even though it now represents a different record—causing React to reuse the old component instance and DOM state (like `<input>` text or checkboxes) on the wrong row."
      },
      {
        label: "`Math.random()` Bug:",
        body: "Generating `key={Math.random()}` during render gives every item a brand-new key on every single render, forcing React to **unmount and remount** every DOM node and lose all local state and focus."
      }
    ],
    subboxes: [
      {
        title: "Rule",
        content: "Use a stable, unique ID from your data (`key={item.id}`). `key={index}` is only safe for static lists that are never reordered, filtered, or inserted into."
      }
    ]
  },
  {
    id: "m02-p1-iq-5",
    lessonId: "m02-p1",
    moduleNumber: 2,
    number: 5,
    difficulty: "intermediate",
    question: "Explain why calling `setCount(count + 1)` three times in one click handler only increments `count` by 1, and how to fix it.",
    paragraphs: [
      {
        label: "State as a Snapshot:",
        body: "Within a single render, `count` is a fixed constant snapshot (say `0`). Calling `setCount(count + 1)` three times queues `setCount(0 + 1)` three times, and React batches all three updates before the next render—resulting in `count === 1`."
      },
      {
        label: "Functional Updater Fix:",
        body: "Passing an updater function `setCount((prev) => prev + 1)` tells React to queue transformations that receive the latest pending state (`0 -> 1 -> 2 -> 3`) during the batch."
      }
    ],
    subboxes: [
      {
        title: "Code Proof",
        content: "`setCount(c => c + 1); setCount(c => c + 1); // increments by 2 in one render`",
        isCode: true
      }
    ]
  },
  {
    id: "m02-p1-iq-6",
    lessonId: "m02-p1",
    moduleNumber: 2,
    number: 6,
    difficulty: "advanced",
    question: "Explain React's Render phase vs. Commit phase and how Fiber enables concurrent rendering.",
    paragraphs: [
      {
        label: "Two-Phase Architecture:",
        body: "During the **Render phase**, React calls component functions to build a `workInProgress` Fiber tree and compute what changed compared to the `current` tree—producing zero DOM mutations. During the **Commit phase**, React applies the computed mutations synchronously to the browser DOM and schedules effects."
      },
      {
        label: "Why Fiber Matters:",
        body: "Before Fiber (React 15 Stack Reconciler), rendering was a synchronous recursive call stack that could not pause. Fiber splits work into linked-list units (`child`, `sibling`, `return`) so concurrent features (`startTransition`) can pause low-priority renders for urgent user input, and restart if needed—which is why render functions must be pure."
      }
    ],
    subboxes: [
      {
        title: "Follow-up",
        content: "Why does `<StrictMode>` double-invoke component functions in development? To surface impure side effects during the Render phase before concurrent rendering hits production."
      }
    ]
  },
  {
    id: "m02-p1-iq-7",
    lessonId: "m02-p1",
    moduleNumber: 2,
    number: 7,
    difficulty: "advanced",
    question: "What happens internally during Virtual DOM reconciliation when an element's `type` changes vs. when only its `props` change?",
    paragraphs: [
      {
        label: "Same `type` & Same `key`:",
        body: "React keeps the existing Fiber and underlying DOM node, updates only the changed attributes/properties (e.g., `className`, `value`), and recursively reconciles its children—preserving local state and focus."
      },
      {
        label: "Different `type` (or Changed `key`):",
        body: "React tears down the entire old subtree (running unmount cleanups and destroying DOM nodes and state) and mounts a brand-new subtree from scratch. This is why defining a child component function *inside* a parent component destroys child state on every parent render (each render creates a new function `type` reference!)."
      }
    ],
    subboxes: [
      {
        title: "Anti-Pattern",
        content: "`function Parent() { function Child() { return <input />; } return <Child />; } // Child remounts every render!`",
        isCode: true
      }
    ]
  },
  {
    id: "m02-p1-iq-8",
    lessonId: "m02-p1",
    moduleNumber: 2,
    number: 8,
    difficulty: "advanced",
    question: "How does React 18+ Automatic Batching work, and when would you intentionally opt out with `flushSync`?",
    paragraphs: [
      {
        label: "Automatic Batching:",
        body: "In React 17, state updates were batched only inside React DOM event handlers, not inside `fetch().then(...)` or `setTimeout`. Since React 18, all state updates—regardless of origin (events, promises, timeouts, native listeners)—are automatically batched into a single render + commit pass."
      },
      {
        label: "`flushSync` Trade-off:",
        body: "If you need the DOM to update synchronously before the next line reads layout (e.g., scrolling immediately after appending a chat message), wrap the state update in `flushSync(() => setMessages(...))`—sparingly, since it forces an immediate synchronous render."
      }
    ],
    subboxes: [
      {
        title: "Interview Tip",
        content: "Note that automatic batching reduces unnecessary intermediate renders without requiring manual boilerplate."
      }
    ]
  },
  {
    id: "m02-p1-iq-9",
    lessonId: "m02-p1",
    moduleNumber: 2,
    number: 9,
    difficulty: "senior-architect",
    question: "Design the frontend component and state architecture for a real-time collaborative order-management dashboard rendering 5,000 live rows with inline editing.",
    numberedSteps: [
      {
        title: "How to analyze the problem:",
        body: "Identify the bottlenecks: rendering 5,000 DOM rows on every WebSocket tick or keystroke saturates the main thread; poor `key` choices or lifted keystroke state cause focus loss and full-tree re-renders."
      },
      {
        title: "Requirements:",
        body: "Sub-16ms keystroke responsiveness; live row updates without losing inline edit focus; zero stale derived totals; XSS-safe rendering of user notes."
      },
      {
        title: "Architecture:",
        body: "Virtualize visible rows (windowing ~30 DOM rows) + colocate draft edit state inside leaf `<EditableCell />` + store normalized row map in parent/store."
      },
      {
        title: "Database design:",
        body: "Backend stores `orders(id, status, amount_cents, updated_at, version)` with optimistic-locking `version` and cursor pagination so client only loads needed slices."
      },
      {
        title: "API design:",
        body: "WebSocket emits delta events `{ id, patch, version }` rather than resending all 5,000 rows; `PATCH /orders/:id` validates inputs and returns updated row."
      },
      {
        title: "Technology choices:",
        body: "React 19 with stable `key={row.id}`, module-scope component definitions, automatic batching of WebSocket bursts, and a list virtualizer (e.g., `@tanstack/react-virtual`)."
      },
      {
        title: "Scaling:",
        body: "Windowing keeps DOM node count O(viewport) instead of O(5,000); immutable updates by row ID allow `React.memo` rows whose data didn't change to bail out."
      },
      {
        title: "Security:",
        body: "Rely on JSX auto-escaping for all user strings (forbid `dangerouslySetInnerHTML`), validate external links (`https:`/`http:` only), and enforce authorization on backend `PATCH`."
      },
      {
        title: "Failure handling:",
        body: "Handle offline/stale `version` conflicts by showing per-row inline conflict banners instead of overwriting user drafts silently."
      },
      {
        title: "Trade-offs:",
        body: "Virtualization adds slight scroll/accessibility setup complexity vs. rendering all 5,000 rows, but is essential once DOM nodes exceed a few hundred."
      },
      {
        title: "Sample senior answer:",
        body: "\"I'd keep DOM size bounded via list virtualization, key every row by its immutable `row.id` so live updates never scramble inline edits, colocate draft input state inside leaf cells so keystrokes don't re-render the grid, and derive summary totals during render rather than duplicating state.\""
      },
      {
        title: "Follow-up questions:",
        body: "What if a user sorts the table while editing a row? Because `key={row.id}` tracks identity across array positions, the Fiber and DOM `<input>` move with the row without losing focus."
      }
    ]
  }
];
