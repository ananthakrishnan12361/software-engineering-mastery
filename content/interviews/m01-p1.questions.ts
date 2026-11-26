import type { InterviewQuestion } from "@/pages/handbook";

export const m01p1Questions: InterviewQuestion[] = [
  {
    id: "m01-p1-iq-1",
    lessonId: "m01-p1",
    number: 1,
    difficulty: "basic",
    question: "What is the difference between `null` and `undefined` in JavaScript?",
    paragraphs: [
      {
        label: "Explanation:",
        body: "`undefined` means a variable has been declared, a property is missing, or a function has no explicit `return`—the runtime supplies it automatically as \"not yet assigned.\" `null` is an explicit assignment value representing the intentional absence of an object or value."
      },
      {
        label: "Trap:",
        body: "`typeof undefined === \"undefined\"`, while `typeof null === \"object\"` (a legacy 1995 bit-tag quirk). Also `null == undefined` is `true`, whereas `null === undefined` is `false`."
      }
    ],
    subboxes: [
      {
        title: "Example",
        content: "`let a; // undefined` | `let b = null; // explicitly empty`",
        isCode: true
      },
      {
        title: "Follow-up & Tip",
        content: "*Follow-up:* How does JSON handle both? `JSON.stringify` keeps `null` properties and drops `undefined` object properties."
      }
    ]
  },
  {
    id: "m01-p1-iq-2",
    lessonId: "m01-p1",
    number: 2,
    difficulty: "basic",
    question: "What is the difference between `var`, `let`, and `const`?",
    paragraphs: [
      {
        label: "Explanation:",
        body: "`var` is function-scoped, allows redeclaration, and is hoisted with an initial value of `undefined`. `let` and `const` are block-scoped, forbid redeclaration in the same scope, and remain uninitialized in the Temporal Dead Zone (TDZ) until their declaration line executes. `const` additionally forbids reassigning the variable binding, though objects referenced by a `const` binding can still be mutated."
      }
    ],
    subboxes: [
      {
        title: "Follow-up Question",
        content: "Does `const arr = [1, 2]; arr.push(3);` throw an error? No—`arr` still points to the same array reference."
      },
      {
        title: "Interview Tip",
        content: "Emphasize that `const` guarantees binding immutability, not deep data immutability (`Object.freeze` handles shallow property freezing)."
      }
    ]
  },
  {
    id: "m01-p1-iq-3",
    lessonId: "m01-p1",
    number: 3,
    difficulty: "basic",
    question: "What are the data types in JavaScript, and how do primitives differ from objects?",
    paragraphs: [
      {
        label: "Explanation:",
        body: "JavaScript has 8 data types: 7 primitives (`string`, `number`, `bigint`, `boolean`, `undefined`, `null`, `symbol`) and 1 reference type (`object`, which includes arrays and functions). Primitives are immutable and compared/copied by value; objects are mutable and compared/copied by reference."
      }
    ],
    subboxes: [
      {
        title: "Example",
        content: "`\"abc\".toUpperCase()` returns a new string; the original string cannot be altered in place."
      },
      {
        title: "Interview Tip",
        content: "Remember `BigInt` (ES2020) and `Symbol` (ES2015)—many candidates forget them and say \"6 types.\""
      }
    ]
  },
  {
    id: "m01-p1-iq-4",
    lessonId: "m01-p1",
    number: 4,
    difficulty: "basic",
    question: "What is the difference between `==` and `===`?",
    paragraphs: [
      {
        label: "Explanation:",
        body: "`===` (strict equality) checks both type and value without type coercion (returning `false` immediately if types differ). `==` (abstract equality) performs multi-step implicit type coercion when operands have different types (e.g., converting strings/booleans to numbers), producing counterintuitive results like `\"\" == 0` or `[] == false`."
      }
    ],
    subboxes: [
      {
        title: "Follow-up Question",
        content: "How does `Object.is(a, b)` differ from `===`? `Object.is(NaN, NaN)` is `true` and `Object.is(+0, -0)` is `false`."
      },
      {
        title: "Interview Tip",
        content: "Always recommend `===` by default in production codebases enforced via ESLint (`eqeqeq`)."
      }
    ]
  },
  {
    id: "m01-p1-iq-5",
    lessonId: "m01-p1",
    number: 5,
    difficulty: "intermediate",
    question: "Why does `0.1 + 0.2 !== 0.3` in JavaScript, and how do you handle money safely?",
    paragraphs: [
      {
        label: "Explanation:",
        body: "JavaScript numbers are 64-bit IEEE-754 binary floats. Just as `1/3` cannot be represented finitely in base-10, `0.1` (`1/10`) and `0.2` (`1/5`) are infinite repeating fractions in base-2. Rounding to 53 mantissa bits produces `0.30000000000000004` when added."
      },
      {
        label: "Practical Solutions:",
        body: "(1) Store money in integer minor units (cents) and compute using integers; (2) for arbitrary-precision decimals (tax rates, crypto, FX), use a decimal library such as `decimal.js` or `big.js`; (3) for scientific float comparisons, compare `Math.abs(a - b) < Number.EPSILON` (scaled by magnitude)."
      }
    ],
    subboxes: [
      {
        title: "Follow-up",
        content: "How do you round currency at tax time? Use integer arithmetic with deterministic rounding (e.g., half-even / banker's rounding when required by accounting rules)."
      },
      {
        title: "Interview Tip",
        content: "Mention that this is not a \"JS bug\"—Python, Java `double`, and Go `float64` behave identically under IEEE-754."
      }
    ]
  },
  {
    id: "m01-p1-iq-6",
    lessonId: "m01-p1",
    number: 6,
    difficulty: "intermediate",
    question: "Is JavaScript pass-by-value or pass-by-reference? Explain with an example.",
    paragraphs: [
      {
        label: "Explanation:",
        body: "Strictly speaking, JavaScript is always **pass-by-value**, often termed **pass-by-sharing** for objects. For primitives, the value itself is copied into the parameter. For objects, the *reference value (pointer)* is copied into the parameter. Therefore, mutating a property (`param.x = 2`) affects the caller's object because both pointers target the same heap object, whereas reassigning the parameter (`param = { x: 2 }`) only rebinds the local parameter and leaves the caller unchanged."
      }
    ],
    subboxes: [
      {
        title: "Follow-up",
        content: "How do you prevent a function from mutating caller data? Clone at the boundary (`structuredClone` or shallow spread `{ ...obj }` for flat updates)."
      },
      {
        title: "Interview Tip",
        content: "Contrasting true pass-by-reference (like C++ `int& x` where reassigning `x` changes the caller variable) proves deep clarity."
      }
    ]
  },
  {
    id: "m01-p1-iq-7",
    lessonId: "m01-p1",
    number: 7,
    difficulty: "intermediate",
    question: "Explain the Temporal Dead Zone (TDZ) and why `let`/`const` still hoist.",
    paragraphs: [
      {
        label: "Explanation:",
        body: "Both `let` and `const` are hoisted to the top of their enclosing block during scope creation—meaning the engine knows the identifier exists in that block and shadows any outer variable of the same name. However, unlike `var` (initialized to `undefined`), `let`/`const` remain *uninitialized* in the TDZ until execution reaches their declaration statement. Reading them in the TDZ throws a `ReferenceError`—even `typeof x` throws inside the TDZ!"
      }
    ],
    subboxes: [
      {
        title: "Code Proof",
        content: "`let x = 1; { console.log(x); let x = 2; } // ReferenceError, NOT 1!`",
        isCode: true
      },
      {
        title: "Interview Tip",
        content: "Point out that the inner `let x` shadows the outer `x` from the start of the block—proving `let` is hoisted."
      }
    ]
  },
  {
    id: "m01-p1-iq-8",
    lessonId: "m01-p1",
    number: 8,
    difficulty: "intermediate",
    question: "What is a pure function, and why do React and backend pipelines care about purity?",
    paragraphs: [
      {
        label: "Explanation:",
        body: "A pure function (1) always returns the same output for the same inputs (deterministic) and (2) causes no observable side effects (no mutating inputs/globals, no network/disk I/O, no `Date.now()`/`Math.random()`). Purity enables trivial unit testing without mocks, safe concurrency, memoization (caching by input), and predictable React rendering where shallow reference checks detect state updates."
      }
    ],
    subboxes: [
      {
        title: "Follow-up",
        content: "Can an entire app be pure? No—real apps need DB writes and HTTP calls. Push side effects to thin I/O shells around a pure core (\"Functional Core, Imperative Shell\")."
      },
      {
        title: "Interview Tip",
        content: "Give a concrete example: `Array.prototype.sort()` mutates in place (impure), whereas `toSorted()` returns a new array (pure)."
      }
    ]
  },
  {
    id: "m01-p1-iq-9",
    lessonId: "m01-p1",
    number: 9,
    difficulty: "advanced",
    question: "How does V8 internally represent numbers vs. objects, and why can mixing types slow down a hot function?",
    paragraphs: [
      {
        label: "Explanation:",
        body: "V8 uses pointer tagging to avoid heap-allocating every small integer. Small signed integers (Smi) are encoded directly in the pointer word with a tag bit, while floats and integers outside the Smi range are heap-allocated as `HeapNumber` objects. Similarly, objects share internal Hidden Classes (Maps) describing property offsets. When TurboFan JIT compiles a hot function, it specializes machine code for the observed Smi/object shapes (monomorphic). If later calls pass a string or differently shaped object, the type guard fails, causing deoptimization back to Ignition bytecode and megamorphic slow-path lookups."
      }
    ],
    subboxes: [
      {
        title: "Follow-up",
        content: "How do you keep shapes consistent? Initialize all object properties in the same order in constructors/factories instead of adding properties dynamically later."
      },
      {
        title: "Interview Tip",
        content: "Note clearly that Smi/Hidden Class details are V8 engine optimizations—not guarantees of the ECMAScript specification."
      }
    ]
  },
  {
    id: "m01-p1-iq-10",
    lessonId: "m01-p1",
    number: 10,
    difficulty: "advanced",
    question: "Why does `Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2` evaluate to `true`, and how does this break distributed systems?",
    paragraphs: [
      {
        label: "Explanation:",
        body: "IEEE-754 double precision has 53 bits of significand precision (`2^53 - 1 = 9,007,199,254,740,991`). At `2^53`, the spacing between representable floats jumps from `1` to `2`, so odd numbers like `2^53 + 1` cannot be represented and round to `2^53`. In distributed systems using 64-bit Snowflake IDs (Twitter/Discord style) or PostgreSQL `BIGINT` sequences, `JSON.parse` converts numeric literals into JS `Number`, silently corrupting IDs—two distinct records collide to the same ID."
      }
    ],
    subboxes: [
      {
        title: "Mitigation",
        content: "Serialize 64-bit IDs as JSON strings (`\"id\": \"9007199254740993\"`) or use `BigInt` internally with custom JSON revivers/serializers."
      },
      {
        title: "Interview Tip",
        content: "Mention `Number.isSafeInteger(val)` as an essential validation guard on numeric IDs."
      }
    ]
  },
  {
    id: "m01-p1-iq-11",
    lessonId: "m01-p1",
    number: 11,
    difficulty: "advanced",
    question: "Does JavaScript support Proper Tail Calls (TCO) in production, and how do you avoid call-stack overflow on deep data?",
    paragraphs: [
      {
        label: "Explanation:",
        body: "Although ES2015 specified Proper Tail Calls in strict mode, major engines diverged: JavaScriptCore (Safari) implemented it, whereas V8 (Chrome/Node.js) and SpiderMonkey (Firefox) did not enable it due to stack-trace debugging concerns and low real-world ROI. Therefore, you **cannot** rely on tail recursion for unbounded inputs in Node.js or cross-browser apps—at ~10k+ depth, the call stack throws `RangeError`."
      },
      {
        label: "Production Alternatives:",
        body: "Rewrite recursion into an iterative loop with an explicit heap-allocated array stack/queue (`while (stack.length)`), or use a trampoline pattern (returning thunks) when recursive style is needed."
      }
    ],
    subboxes: [
      {
        title: "Follow-up",
        content: "Why is an explicit heap stack safer than the call stack? Heap capacity scales to hundreds of MBs/GBs, whereas the call stack is typically a few MBs."
      },
      {
        title: "Interview Tip",
        content: "Calling out the spec vs. V8 reality is a classic senior differentiator."
      }
    ]
  },
  {
    id: "m01-p1-iq-12",
    lessonId: "m01-p1",
    number: 12,
    difficulty: "advanced",
    question: "Explain how JavaScript's abstract type coercion (`ToPrimitive`, `ToNumber`, `ToBoolean`) leads to subtle bugs and security flaws.",
    paragraphs: [
      {
        label: "Explanation:",
        body: "When operators like `+`, `==`, or relational `<` encounter mismatched types, the spec invokes internal abstract operations: `ToPrimitive` calls `[Symbol.toPrimitive]`, `valueOf()`, then `toString()`. Meanwhile `+` prefers string concatenation if either operand becomes a string, whereas `-`/`*`/`<` convert to numbers (e.g., `[] + {} === \"[object Object]\"`, `Number([]) === 0`, `Number(null) === 0`, `Number(undefined) === NaN`). If an auth or rate-limit check relies on `if (limit > 0)` or loose equality against unvalidated JSON/query parameters, unexpected arrays or empty strings silently coerce to `0` or `true`."
      }
    ],
    subboxes: [
      {
        title: "Defense",
        content: "Validate exact runtime types at ingress using strict schemas (e.g., Zod) and disable implicit coercion via `===` + TypeScript strict mode."
      },
      {
        title: "Follow-up",
        content: "What does `null >= 0` vs `null == 0` evaluate to? `null >= 0` is `true` (`ToNumber(null) === 0`), while `null == 0` is `false` (special spec rule for `null`/`undefined`)."
      }
    ]
  },
  {
    id: "m01-p1-iq-13",
    lessonId: "m01-p1",
    number: 13,
    difficulty: "senior-architect",
    question: "Your multi-service Node.js + PostgreSQL + React platform is experiencing 1-cent billing discrepancies and occasional cross-account mix-ups on newly migrated 64-bit Snowflake IDs. Diagnose and design the fix end-to-end.",
    numberedSteps: [
      {
        title: "How to analyze the problem:",
        body: "Trace data types across every boundary: DB column type → Node DB driver → JSON serializer → HTTP response → Browser `JSON.parse` → React state. Identify where 64-bit integers exceed `2^53 - 1` and where decimal amounts hit IEEE-754 floats."
      },
      {
        title: "Requirements:",
        body: "Zero precision loss for money (multi-currency) and 64-bit IDs; zero downtime during migration; backward compatibility for existing API clients."
      },
      {
        title: "Architecture:",
        body: "Enforce a canonical Domain Boundary Layer in Node.js (converting DB `BIGINT` to string IDs and storing money as integer minor units + ISO-4217 currency code)."
      },
      {
        title: "Database design:",
        body: "Store monetary amounts in PostgreSQL as `BIGINT` minor units (or `NUMERIC(19, 4)` for fractional FX rates) alongside `currency CHAR(3)`; keep primary/foreign keys as `BIGINT`."
      },
      {
        title: "API design:",
        body: "Return IDs as JSON strings (`\"orderId\": \"728194827193847291\"`) and money as structured objects (`{ \"amountMinor\": 1999, \"currency\": \"USD\" }`). Add a short deprecation window if legacy numeric fields exist."
      },
      {
        title: "Technology choices:",
        body: "Configure `pg` driver type parsers (OID 20 for `int8` returns strings by default in `node-postgres`—ensure no unsafe `Number(row.id)` casts exist); use Zod boundary schemas; use integer math or `decimal.js` for FX/tax."
      },
      {
        title: "Scaling:",
        body: "Integer minor-unit math is CPU-cheap and avoids object allocation overhead of decimal libraries on high-throughput invoice aggregation."
      },
      {
        title: "Security:",
        body: "Prevent IDOR/cross-account leakage caused by rounded 64-bit IDs colliding; reject non-string IDs and negative/non-integer minor units at API ingress."
      },
      {
        title: "Failure handling:",
        body: "Add reconciliation checks verifying `sum(line_items) === invoice_total` inside DB transactions; fail closed on currency mismatches."
      },
      {
        title: "Trade-offs:",
        body: "String IDs slightly increase JSON payload bytes (~2 bytes/ID) vs. numbers, and integer minor units require currency-exponent metadata (e.g., JPY has 0 decimals, USD 2, KWD 3)."
      },
      {
        title: "Sample senior answer:",
        body: "\"Two foundational JS limits explain both bugs: IEEE-754 binary floats cannot represent base-10 fractions like `0.1` accurately, and `Number` loses integer precision above `2^53 - 1`. I would keep `BIGINT` in Postgres, forbid casting 64-bit IDs to JS `Number` anywhere in the Node/React pipeline by treating IDs as opaque strings in JSON, and migrate billing math to integer minor units paired with currency metadata and DB-level reconciliation assertions.\""
      },
      {
        title: "Follow-up questions:",
        body: "How do you handle currencies with 3 decimal places (BHD/KWD) or sub-cent ad impressions? Use `NUMERIC(19,4)` in DB and scaled integer micro-units (e.g., 1e-6) or `BigInt` + decimal library for calculation before rounding at settlement."
      }
    ]
  },
  {
    id: "m01-p1-iq-14",
    lessonId: "m01-p1",
    number: 14,
    difficulty: "senior-architect",
    question: "Design a defensive API validation and transformation pipeline for a high-throughput Node.js gateway handling untrusted nested JSON payloads.",
    numberedSteps: [
      {
        title: "How to analyze the problem:",
        body: "Identify the attack and bug surface of dynamic JS types: oversized payloads, deeply nested JSON causing recursive parser/validator stack overflow, prototype-polluting keys (`__proto__`), and type coercion flaws."
      },
      {
        title: "Requirements:",
        body: "Sub-2ms p99 validation overhead at 10k RPS; strict runtime type guarantees; clear 400 validation errors; crash immunity against malformed inputs."
      },
      {
        title: "Architecture:",
        body: "Edge Gateway / Reverse Proxy (size & timeout limits) → Express/Fastify body parser → Compiled Schema Validator (Ajv/Zod) → Pure Domain Normalizer → Service Core."
      },
      {
        title: "Database design:",
        body: "Downstream DB queries receive strictly typed primitives/DTOs only—never raw `req.body` objects (prevents NoSQL operator injection like `{ \"$gt\": \"\" }`)."
      },
      {
        title: "API design:",
        body: "Strict JSON schemas with `additionalProperties: false`, explicit string max-lengths, integer bounds, and depth limits."
      },
      {
        title: "Technology choices:",
        body: "Fastify + Ajv (pre-compiled JSON Schema validators run much faster than dynamic uncompiled checks and keep V8 object shapes predictable/monomorphic)."
      },
      {
        title: "Scaling:",
        body: "Pre-compile schemas once at startup rather than per request; keep validation functions stateless and pure for horizontal scaling across worker processes."
      },
      {
        title: "Security:",
        body: "Enforce body byte limit (e.g., 100 KB), iterative depth guard before recursive traversal, strip/reject `__proto__`/`constructor` keys, never use `eval` or loose `==`."
      },
      {
        title: "Failure handling:",
        body: "Return structured RFC-9457 / problem-details `400 Bad Request` without leaking internal stack traces; circuit-break or rate-limit repeat offenders."
      },
      {
        title: "Trade-offs:",
        body: "Strict schemas (`additionalProperties: false`) catch typos and injection early, at the cost of requiring coordinated API versioning when adding new fields."
      },
      {
        title: "Sample senior answer:",
        body: "\"Because JavaScript is dynamically typed, internal services shouldn't defensively re-check `typeof` everywhere. Instead, I establish a hard trust boundary at the gateway using pre-compiled schemas, bounded payload sizes, and iterative depth checks, producing normalized pure DTOs so downstream business functions operate on guaranteed, monomorphic shapes.\""
      },
      {
        title: "Follow-up questions:",
        body: "How do you share those runtime type contracts with a React frontend? Generate TypeScript types and client validators from a single OpenAPI or Zod contract package."
      }
    ]
  }
];
