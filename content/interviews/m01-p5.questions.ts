import type { InterviewQuestion } from "@/entities/handbook";

export const m01p5Questions: InterviewQuestion[] = [
  {
    id: "m01-p5-iq-1",
    lessonId: "m01-p5",
    moduleNumber: 1,
    number: 1,
    difficulty: "basic",
    question: "What is the difference between `any`, `unknown`, and `never` in TypeScript?",
    paragraphs: [
      {
        label: "Explanation:",
        body: "`any` disables TypeScript's type checker entirely—you can read any property or call it as a function without errors, allowing bugs to spread. `unknown` is the **type-safe** top type: any value can be assigned to `unknown`, but TypeScript forbids reading properties or calling methods until you narrow it (`typeof`, `Array.isArray`, or a type guard)."
      },
      {
        label: "Never:",
        body: "`never` represents an impossible value or a function that never returns normally (e.g., always throws). It is most commonly used in the `default` branch of a `switch` over a discriminated union to guarantee exhaustiveness at compile time."
      }
    ],
    subboxes: [
      {
        title: "Example",
        content: "`catch (err: unknown) { if (err instanceof Error) console.log(err.message); }`",
        isCode: true
      },
      {
        title: "Interview Tip",
        content: "Always recommend `unknown` over `any` for `JSON.parse`, `catch` blocks, and HTTP request bodies."
      }
    ]
  },
  {
    id: "m01-p5-iq-2",
    lessonId: "m01-p5",
    moduleNumber: 1,
    number: 2,
    difficulty: "intermediate",
    question: "How do Generics and `interface` vs. `type` work in TypeScript's structural type system?",
    paragraphs: [
      {
        label: "Structural Typing & Generics:",
        body: "TypeScript uses **structural typing**: two types are compatible if their member shapes match, even without sharing an explicit `extends`/`implements` name. **Generics** (`<T extends { id: string }>`) parameterize functions, classes, and interfaces so callers preserve exact input/output types without duplicating code or falling back to `any`."
      },
      {
        label: "`interface` vs. `type`:",
        body: "Both can describe object shapes, but `interface` supports declaration merging and faster `tsc` hierarchy caching with `extends`, whereas `type` can express unions (`\"ok\" | \"err\"`), tuples, primitives, and mapped/conditional utility types."
      }
    ],
    subboxes: [
      {
        title: "Example",
        content: "`function getProp<T, K extends keyof T>(obj: T, key: K): T[K] { return obj[key]; }`",
        isCode: true
      },
      {
        title: "Follow-up",
        content: "How can you add nominal-like safety to prevent swapping `UserId` and `OrderId` strings? Use a branded type (`string & { readonly __brand: \"UserId\" }`)."
      }
    ]
  },
  {
    id: "m01-p5-iq-3",
    lessonId: "m01-p5",
    moduleNumber: 1,
    number: 3,
    difficulty: "advanced",
    question: "Why does `const dto = JSON.parse(body) as UserDTO` fail to provide runtime type safety, and how do you achieve end-to-end safety in TypeScript?",
    paragraphs: [
      {
        label: "Type Erasure Reality:",
        body: "TypeScript performs static checking only during compilation and **erases all types** (`interface`, `type`, `as UserDTO`) when emitting JavaScript. An `as UserDTO` assertion does not generate any runtime check—if an external client sends `{ totalCents: \"free\" }` or omits `id`, the JS runtime executes with invalid data and crashes downstream."
      },
      {
        label: "End-to-End Solution:",
        body: "Treat all external inputs (`req.body`, `fetch().json()`, `localStorage`, env vars) as `unknown`, parse them at the I/O boundary using a runtime schema validator (Zod/Ajv) or explicit type-predicate function (`raw is UserDTO`), and derive the static TypeScript type from that single schema (`z.infer<typeof UserSchema>`) so compile-time and runtime contracts never drift."
      }
    ],
    subboxes: [
      {
        title: "Performance Note",
        content: "Types add zero bytes and zero CPU cost at runtime; validate once at the system boundary so internal domain functions operate on trusted, monomorphic shapes."
      },
      {
        title: "Interview Tip",
        content: "Distinguish **compile-time soundness** (`strict: true`, `noUncheckedIndexedAccess`) from **runtime boundary validation**."
      }
    ]
  }
];
