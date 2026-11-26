import type { InterviewQuestion } from "@/entities/handbook";

export const m01p2Questions: InterviewQuestion[] = [
  {
    id: "m01-p2-iq-1",
    lessonId: "m01-p2",
    moduleNumber: 1,
    number: 1,
    difficulty: "basic",
    question: "What are the four pillars of Object-Oriented Programming (OOP)?",
    paragraphs: [
      {
        label: "Explanation:",
        body: "The four OOP pillars are **Encapsulation** (bundling data and methods together while hiding internal state behind a controlled API), **Abstraction** (exposing only essential behavior while hiding implementation details), **Inheritance** (creating a specialized type that reuses or extends a base type's contract), and **Polymorphism** (allowing different types to respond to the same method or interface in their own way)."
      }
    ],
    subboxes: [
      {
        title: "Example",
        content: "`class LedgerAccount { #balance = 0; deposit(c) { ... } }` (Encapsulation) | `gateway.charge(cents)` across `StripeGateway` and `MockGateway` (Abstraction + Polymorphism)",
        isCode: true
      },
      {
        title: "Mnemonic & Tip",
        content: "**A-P-I-E** (Abstraction, Polymorphism, Inheritance, Encapsulation). Always pair each pillar with a concrete JavaScript/TypeScript example rather than reciting dictionary definitions."
      }
    ]
  },
  {
    id: "m01-p2-iq-2",
    lessonId: "m01-p2",
    moduleNumber: 1,
    number: 2,
    difficulty: "basic",
    question: "What is the difference between shallow copying and deep copying an object or array in JavaScript?",
    paragraphs: [
      {
        label: "Explanation:",
        body: "A **shallow copy** (`{ ...obj }`, `Object.assign({}, obj)`, `[...arr]`, `arr.slice()`) creates a new top-level container, but nested objects and arrays inside it still point to the **same** heap references as the original. Mutating a nested property in the copy mutates the original. A **deep copy** (`structuredClone(obj)` in Node.js v17+ and modern browsers) recursively duplicates nested objects and arrays so changes are completely isolated."
      }
    ],
    subboxes: [
      {
        title: "Trap",
        content: "`JSON.parse(JSON.stringify(obj))` drops `undefined`, functions, `Symbol`, `Map`/`Set`, converts `Date` to strings, and throws on `BigInt` or circular references. `structuredClone` handles circular references, `Date`, `Map`, and `Set`, though it throws on functions and symbols."
      },
      {
        title: "Follow-up & Tip",
        content: "React state updates typically use shallow structural sharing (`{ ...user, address: { ...user.address, city } }`) instead of deep-cloning huge trees on every keystroke. Mention `structuredClone` vs. structural sharing trade-offs in interviews."
      }
    ]
  },
  {
    id: "m01-p2-iq-3",
    lessonId: "m01-p2",
    moduleNumber: 1,
    number: 3,
    difficulty: "intermediate",
    question: "Why is `Object.hasOwn(obj, key)` safer than `key in obj` or `obj.hasOwnProperty(key)`?",
    paragraphs: [
      {
        label: "Explanation:",
        body: "The `in` operator checks both the object's own properties **and** every object up its prototype chain (so `\"toString\" in {}` is `true`). Calling `obj.hasOwnProperty(key)` checks only own properties, but fails if the object was created with `Object.create(null)` (no `Object.prototype`) or if an attacker/payload defines a property named `hasOwnProperty`. `Object.hasOwn(obj, key)` (ES2022) safely checks own properties directly as a static method regardless of prototype or property shadowing."
      }
    ],
    subboxes: [
      {
        title: "Example",
        content: "`Object.hasOwn(Object.create(null), \"id\")` works safely, whereas `Object.create(null).hasOwnProperty(\"id\")` throws `TypeError`.",
        isCode: true
      },
      {
        title: "Interview Tip",
        content: "Connect this to dictionary lookups: for dynamic user-supplied keys (like word counts or caches), `new Map()` avoids prototype key collisions entirely."
      }
    ]
  },
  {
    id: "m01-p2-iq-4",
    lessonId: "m01-p2",
    moduleNumber: 1,
    number: 4,
    difficulty: "intermediate",
    question: "Explain why `[10, 2, 1].sort()` returns `[1, 10, 2]` and mutates the array, and how modern JavaScript fixes both.",
    paragraphs: [
      {
        label: "Explanation:",
        body: "By default, `Array.prototype.sort()` converts elements to UTF-16 strings (`\"10\" < \"2\"`) and sorts **in place**, mutating the original array. Always supply a numeric comparator `(a, b) => a - b` for numbers. To avoid mutating caller or React state arrays, copy first (`[...arr].sort(cmp)`) or use the ES2023 non-mutating copy-on-write method `arr.toSorted(cmp)`."
      }
    ],
    subboxes: [
      {
        title: "Version Note",
        content: "`Array.prototype.sort()` stability (preserving relative order of equal keys) has been guaranteed by the ECMAScript spec since **ES2019**. `toSorted()`, `toReversed()`, `toSpliced()`, and `with()` arrived in **ES2023**."
      },
      {
        title: "Follow-up",
        content: "When does `(a, b) => a - b` break? If the array contains `Infinity` or `-Infinity`, `Infinity - Infinity` evaluates to `NaN` (not `0`), breaking comparator ordering. Use `(a < b ? -1 : a > b ? 1 : 0)` for extreme floats."
      }
    ]
  },
  {
    id: "m01-p2-iq-5",
    lessonId: "m01-p2",
    moduleNumber: 1,
    number: 5,
    difficulty: "advanced",
    question: "How do V8 Hidden Classes (Maps) and Array Elements Kinds affect production performance?",
    paragraphs: [
      {
        label: "Explanation:",
        body: "Unlike C++/Java structs with compile-time fixed offsets, JS objects can add/delete properties dynamically. V8 internally assigns objects sharing the same property layout a **Hidden Class (Map)** so property reads compile to fast fixed-offset memory loads (Inline Caches). Adding properties in different orders or conditionally after construction forks Hidden Classes and forces slower polymorphic/megamorphic lookups. Similarly, V8 tracks array **Elements Kinds** (`PACKED_SMI_ELEMENTS` → `PACKED_DOUBLE_ELEMENTS` → `PACKED_ELEMENTS` → `HOLEY_*`). Mixing types or leaving holes (via `delete arr[i]` or `arr[1000] = x`) causes a **one-way** downgrade where missing slots must check `Array.prototype`."
      }
    ],
    subboxes: [
      {
        title: "Best Practices",
        content: "Initialize all object fields in the same order in constructors/factories; keep numeric arrays dense and homogeneous; use `splice`/`filter` instead of `delete arr[i]`."
      },
      {
        title: "Interview Tip",
        content: "Clarify that Hidden Classes and Elements Kinds are V8 implementation optimizations, not ECMAScript specification guarantees."
      }
    ]
  },
  {
    id: "m01-p2-iq-6",
    lessonId: "m01-p2",
    moduleNumber: 1,
    number: 6,
    difficulty: "advanced",
    question: "How does Prototype Pollution happen in JavaScript object utilities, and how do you defend against it?",
    paragraphs: [
      {
        label: "Explanation:",
        body: "Prototype Pollution occurs when an attacker supplies JSON containing `__proto__`, `constructor`, or `prototype` keys to an unsafe recursive `merge(target, source)` or `setByPath(obj, path, val)` function. Writing `target[\"__proto__\"][\"isAdmin\"] = true` mutates `Object.prototype`, injecting `isAdmin: true` onto **every** plain object in the Node.js process and potentially bypassing authorization checks or triggering gadget chains."
      },
      {
        label: "Defenses:",
        body: "(1) Explicitly block `__proto__`, `constructor`, and `prototype` keys during merges and path writes; (2) check `Object.hasOwn(source, key)` instead of trusting inherited properties; (3) validate inputs with strict schemas (Zod/Ajv `additionalProperties: false`); (4) store arbitrary user-keyed maps in `new Map()` or `Object.create(null)`."
      }
    ],
    subboxes: [
      {
        title: "Follow-up",
        content: "Does `JSON.parse('{\"__proto__\":{\"admin\":true}}')` immediately pollute `Object.prototype`? No—`JSON.parse` creates an own property literally named `\"__proto__\"`. Pollution happens only when an unsafe recursive merge copies that key via `target[key]`."
      },
      {
        title: "Interview Tip",
        content: "Mention `Object.freeze(Object.prototype)` as a defense-in-depth hardening measure, while noting primary protection must live at input validation and merge helpers."
      }
    ]
  },
  {
    id: "m01-p2-iq-7",
    lessonId: "m01-p2",
    moduleNumber: 1,
    number: 7,
    difficulty: "senior-architect",
    question: "Design an extensible notification and billing rules engine in Node.js/TypeScript using OOP and SOLID principles without overengineering a rigid inheritance tree.",
    numberedSteps: [
      {
        title: "How to analyze the problem:",
        body: "Identify what changes frequently (new notification channels like Email/SMS/Webhook, new discount/tax rules) versus what stays stable (dispatch orchestration, audit logging, retry/idempotency). Avoid deep inheritance chains like `RetryableAsyncEmailNotifier extends AsyncNotifier extends BaseNotifier`."
      },
      {
        title: "Requirements:",
        body: "Support multiple channels and pricing rules; add new channels without editing existing core dispatcher code (OCP); enforce encapsulated domain invariants (non-negative totals); safe against untrusted rule payloads."
      },
      {
        title: "Architecture:",
        body: "Use **Composition + Strategy Pattern** aligned with SOLID: a thin `NotificationService` (SRP) depends on a small `NotificationChannel` interface (ISP/DIP) and composes independent `Channel` implementations plus a `RetryPolicy`."
      },
      {
        title: "Database design:",
        body: "Store `notifications` (`id`, `channel`, `recipient`, `payload_json`, `status`, `attempts`, `idempotency_key`) and `pricing_rules` (`id`, `rule_type`, `config_json`, `priority`) in PostgreSQL."
      },
      {
        title: "API design:",
        body: "Expose typed DTO boundaries (`POST /notifications/send`, `POST /invoices/quote`) validated against strict schemas before instantiating domain objects."
      },
      {
        title: "Technology choices:",
        body: "TypeScript interfaces for contracts (`NotificationChannel`, `DiscountRule`), ES2022 `#private` fields inside domain entities (e.g., `Invoice` protecting `#lineItems` and `#totalCents`), and a `Map<string, NotificationChannel>` registry instead of a growing `switch` statement."
      },
      {
        title: "Scaling:",
        body: "Keep channel strategy instances stateless so workers scale horizontally behind a queue (BullMQ/SQS) without shared mutable state."
      },
      {
        title: "Security:",
        body: "Protect config hydration from Prototype Pollution by explicitly blocking `__proto__`, `constructor`, and `prototype` keys alongside `Object.hasOwn` (since `JSON.parse` creates `__proto__` as an own property), using `Map` lookup for channel names instead of `channels[userInput]`, and hiding internal secrets with `#private` fields and explicit `toJSON()` serializers."
      },
      {
        title: "Failure handling:",
        body: "Liskov Substitution (LSP): every `NotificationChannel` implementation honors the same result contract (`{ sent: true } | { sent: false, retryable: boolean }`) rather than some throwing raw HTTP errors and others returning `false`."
      },
      {
        title: "Trade-offs:",
        body: "Composition + small interfaces add a tiny bit of wiring boilerplate vs. a single `if/else` function, so apply Strategy/DIP only at genuine extension axes (channels/rules), not for one-off helpers (avoid YAGNI violations)."
      },
      {
        title: "Sample senior answer:",
        body: "\"Instead of modeling channels with deep inheritance, I compose small, single-responsibility capabilities around narrow interfaces. `NotificationService` depends on a `NotificationChannel` abstraction (DIP) looked up via a `Map` registry, so adding WhatsApp or Slack later requires zero edits to core dispatch logic (OCP). Domain objects like `Invoice` use `#private` fields to enforce invariants, and every channel honors a uniform return contract (LSP) so retry middleware handles failures predictably.\""
      },
      {
        title: "Follow-up questions:",
        body: "When would you refactor a simple `switch` into Strategy + DIP? Only when at least 2–3 concrete variants exist or external plugins/teams own separate implementations."
      }
    ]
  },
  {
    id: "m01-p2-iq-8",
    lessonId: "m01-p2",
    moduleNumber: 1,
    number: 8,
    difficulty: "basic",
    question: "How do ES2015+ classes and ES2022 `#private` fields differ from plain objects and TypeScript's `private` keyword?",
    paragraphs: [
      {
        label: "Explanation:",
        body: "A `class` attaches shared methods once on `ClassName.prototype`, runs its body in strict mode automatically, and throws a `TypeError` if invoked without `new`. TypeScript's `private` keyword is erased at compile time—compiled JavaScript still stores a normal public property that external code or `JSON.stringify` can read. By contrast, ES2022 `#private` fields and methods are enforced at **runtime** by the JavaScript engine: external access (`obj.#secret`) fails at parse time with a `SyntaxError`, and private slots are excluded from `Object.keys()` and `JSON.stringify()`."
      }
    ],
    subboxes: [
      {
        title: "Example",
        content: "`class Vault { #token; constructor(t) { this.#token = t; } }` — `Object.keys(new Vault('x'))` is `[]`, and `v.#token` outside is a `SyntaxError`.",
        isCode: true
      },
      {
        title: "Interview Tip",
        content: "Also note that subclasses cannot access a parent class's `#private` fields directly; expose a controlled public method or getter when subclass cooperation is intended."
      }
    ]
  },
  {
    id: "m01-p2-iq-9",
    lessonId: "m01-p2",
    moduleNumber: 1,
    number: 9,
    difficulty: "intermediate",
    question: "When should you use class inheritance (`extends`) versus composition, and how does the Liskov Substitution Principle (LSP) catch bad hierarchies?",
    paragraphs: [
      {
        label: "Explanation:",
        body: "Use `extends` only for shallow, genuine **\"is-a\"** taxonomies (for example, `RateLimitError extends AppError` where every `RateLimitError` truly is an `AppError`). For sharing capabilities across services—like retries, logging, or payment gateways—use **composition** (\"has-a\") by injecting small collaborators into the constructor, because JavaScript only supports single inheritance and deep `extends` chains couple subclasses tightly to parent internals (**Fragile Base Class**)."
      },
      {
        label: "LSP Check:",
        body: "The **Liskov Substitution Principle** states that any subclass or strategy must be safely usable wherever the base type is expected. Classic violation: `Square extends Rectangle` breaks callers assuming `rect.setWidth(5); rect.setHeight(4)` yields area `20`, or a subclass throws `NotImplementedError` on an inherited method."
      }
    ],
    subboxes: [
      {
        title: "Example",
        content: "`class RateLimitError extends AppError` preserves `toClientPayload()` shape while adding `retryAfterSec` via `super.toClientPayload()`.",
        isCode: true
      },
      {
        title: "Follow-up & Tip",
        content: "In TypeScript/Node.js backends, prefer small interfaces (`PaymentGateway`, `Clock`) + constructor injection (DIP) over base classes like `BaseService`."
      }
    ]
  }
];
