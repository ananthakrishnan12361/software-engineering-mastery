import type { InterviewQuestion } from "@/entities/handbook";

export const m01p4Questions: InterviewQuestion[] = [
  {
    id: "m01-p4-iq-1",
    lessonId: "m01-p4",
    moduleNumber: 1,
    number: 1,
    difficulty: "basic",
    question: "What is a closure in JavaScript, and why is it useful in real applications?",
    paragraphs: [
      {
        label: "Explanation:",
        body: "A **closure** is a function bundled with references to its enclosing lexical environment. Even after the outer function finishes executing and its Call Stack frame pops, the inner function retains live access to the outer function's variables on the heap."
      },
      {
        label: "Real-World Uses:",
        body: "Closures power private state encapsulation (before/alongside `#private`), factory functions (`createRateLimiter(limit)`), memoization caches, debouncers, and React hooks (`useState`/`useEffect` capturing render-scope values)."
      }
    ],
    subboxes: [
      {
        title: "Example",
        content: "`function makeCounter() { let n = 0; return () => ++n; } // n stays alive per counter`",
        isCode: true
      },
      {
        title: "Trap & Tip",
        content: "Closures capture variable **bindings**, not frozen snapshots—using `var i` in a `for` loop shares one `i` across all callbacks, whereas `let i` creates a fresh binding per iteration."
      }
    ]
  },
  {
    id: "m01-p4-iq-2",
    lessonId: "m01-p4",
    moduleNumber: 1,
    number: 2,
    difficulty: "intermediate",
    question: "How does `this` differ between a regular function and an arrow function, and why do detached class methods lose `this`?",
    paragraphs: [
      {
        label: "Explanation:",
        body: "In a regular function, `this` is bound **dynamically at the call site**: `obj.fn()` sets `this = obj`, `new Fn()` sets `this = newInstance`, `.call(ctx)` sets `this = ctx`, and a bare `fn()` call sets `this = undefined` in strict mode (which includes ES modules and `class` bodies). When you pass `const handler = service.handle; handler();`, the `service.` receiver is lost, so `this` becomes `undefined`."
      },
      {
        label: "Arrow Functions:",
        body: "Arrow functions have **no** own `this` binding; they capture `this` lexically from their enclosing scope when created. That makes arrow callbacks (`items.map(x => this.format(x))`) safe inside methods, while `fn.bind(service)` or arrow class fields fix detached callbacks."
      }
    ],
    subboxes: [
      {
        title: "Code Proof",
        content: "`setTimeout(() => this.flush(), 100)` preserves `this`, whereas `setTimeout(this.flush, 100)` detaches `this`.",
        isCode: true
      },
      {
        title: "Interview Tip",
        content: "Mention that `.call`/`.bind` cannot override an arrow function's lexical `this`."
      }
    ]
  },
  {
    id: "m01-p4-iq-3",
    lessonId: "m01-p4",
    moduleNumber: 1,
    number: 3,
    difficulty: "advanced",
    question: "Explain the exact execution order of synchronous code, microtasks, and macrotasks in the Event Loop, and how microtask starvation happens.",
    paragraphs: [
      {
        label: "Execution Order:",
        body: "1. The active Call Stack runs synchronous code to completion. 2. Immediately before yielding to the next macrotask or browser repaint, the engine drains the **entire** Microtask Queue (`Promise.then/.catch/.finally`, `await` continuations, `queueMicrotask`), including any new microtasks scheduled during that drain. 3. The Event Loop picks **one** macrotask (`setTimeout`, I/O, UI event), runs it, and drains microtasks again."
      },
      {
        label: "Microtask Starvation:",
        body: "Because microtasks must reach zero before any timer, I/O poll, or frame render can run, a recursive `queueMicrotask(loop)` or self-resolving `Promise.resolve().then(loop)` locks the Event Loop at 100% CPU—freezing UI repaints in browsers and starving HTTP/DB sockets in Node.js."
      }
    ],
    subboxes: [
      {
        title: "Follow-up",
        content: "Does `await Promise.resolve(1)` run the next line synchronously? No—even for an already-resolved Promise, `await` always suspends and schedules the continuation as a microtask."
      },
      {
        title: "Interview Tip",
        content: "To yield cooperatively during heavy CPU batches without starving I/O, chunk work via macrotasks (`setTimeout(..., 0)` / `setImmediate` in Node.js)."
      }
    ]
  },
  {
    id: "m01-p4-iq-4",
    lessonId: "m01-p4",
    moduleNumber: 1,
    number: 4,
    difficulty: "senior-architect",
    question: "A long-running Node.js API service suffers intermittent p99 latency spikes and steady RSS memory growth over 48 hours until OOM-killed. Diagnose and design the fix.",
    numberedSteps: [
      {
        title: "How to analyze the problem:",
        body: "Separate two coupled failure modes: (1) heap retention (unreleased closures, unbounded `Map` caches, uncleaned listeners/timers) forcing Old Generation Mark-Sweep-Compact GC pauses, and (2) microtask/CPU starvation blocking the Event Loop."
      },
      {
        title: "Requirements:",
        body: "Stable RSS memory over weeks; p99 latency <50ms without GC stop-the-world spikes; bounded caches; zero unhandled Promise rejections."
      },
      {
        title: "Architecture:",
        body: "Bounded LRU/TTL cache + `WeakMap` for request-scoped metadata + `AbortController` timeouts on all outbound I/O + Event Loop lag monitoring."
      },
      {
        title: "Database design:",
        body: "Stream large result sets with cursors rather than buffering 100k rows into a single heap array inside an async closure."
      },
      {
        title: "API design:",
        body: "Enforce request timeouts (`AbortSignal.timeout(ms)`) and payload caps so stalled requests do not keep closures and buffers pinned in memory."
      },
      {
        title: "Technology choices:",
        body: "Capture heap snapshots (`--heapsnapshot-signal` / `v8.writeHeapSnapshot`) across two time points to diff retained constructors; measure Event Loop delay with `perf_hooks.monitorEventLoopDelay()`."
      },
      {
        title: "Scaling:",
        body: "Offload heavy CPU parsing/compression to Worker Threads so the main Event Loop stays responsive; scale stateless instances horizontally behind a load balancer."
      },
      {
        title: "Security:",
        body: "Prevent unbounded per-tenant cache growth (memory exhaustion DoS) by capping cache entries and validating keys with `Map` rather than plain `{}`."
      },
      {
        title: "Failure handling:",
        body: "Attach `.catch` / `try-catch` around every `await` and use `Promise.allSettled` for partial-failure fan-outs; clean up `clearTimeout` / listeners in `finally` blocks."
      },
      {
        title: "Trade-offs:",
        body: "Bounded LRU caches trade a small cache-miss rate for guaranteed memory ceilings; Worker Threads add serialization cost so use them only for multi-millisecond CPU tasks."
      },
      {
        title: "Sample senior answer:",
        body: "\"Steady RSS growth plus p99 spikes in Node.js almost always means objects are surviving Young-Gen Scavenge into Old-Gen via an accidental strong reference—like an unbounded `Map`, unremoved listener, or closure holding a large buffer—causing long Mark-Sweep-Compact pauses. I'd diff two heap snapshots to find the retainer, replace unbounded caches with bounded LRU + `WeakMap` for per-object metadata, enforce `AbortController` cleanup in `finally`, and track `monitorEventLoopDelay`.\""
      },
      {
        title: "Follow-up questions:",
        body: "Why doesn't a circular reference (`a.b = b; b.a = a`) leak in V8? Because V8 uses reachability-based Mark-and-Sweep from GC Roots, not naive reference counting."
      }
    ]
  }
];
