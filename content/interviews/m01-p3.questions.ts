import type { InterviewQuestion } from "@/entities/handbook";

export const m01p3Questions: InterviewQuestion[] = [
  {
    id: "m01-p3-iq-1",
    lessonId: "m01-p3",
    moduleNumber: 1,
    number: 1,
    difficulty: "basic",
    question: "What is Big O notation, and why does `O(log n)` scale so much better than `O(n)`?",
    paragraphs: [
      {
        label: "Explanation:",
        body: "**Big O** describes the upper-bound growth rate of an algorithm's runtime or memory relative to input size `n` as `n` grows large, dropping constant factors and lower-order terms. An `O(n)` algorithm inspects up to `n` elements (doubling `n` doubles work), whereas an `O(log n)` algorithm halves the remaining problem on every step (like Binary Search)."
      },
      {
        label: "Scale Proof:",
        body: "For `n = 1,000,000`, `O(n)` takes up to `1,000,000` operations, while `O(log2 n)` takes only `~20` comparisons. Even if `n` grows to `1,000,000,000`, `O(log2 n)` only increases from `20` to `~30` steps."
      }
    ],
    subboxes: [
      {
        title: "Example",
        content: "Finding a user ID in 1M sorted IDs: Linear scan = up to 1,000,000 checks; Binary Search = at most 20 checks.",
        isCode: false
      },
      {
        title: "Interview Tip",
        content: "Always distinguish **Time Complexity** (operations) from **Auxiliary Space Complexity** (extra heap + call-stack memory beyond the input)."
      }
    ]
  },
  {
    id: "m01-p3-iq-2",
    lessonId: "m01-p3",
    moduleNumber: 1,
    number: 2,
    difficulty: "intermediate",
    question: "Why is using a JavaScript array with `.push()` and `.shift()` a performance bug for large queues, and how do you fix it?",
    paragraphs: [
      {
        label: "Explanation:",
        body: "While `Array.prototype.push()` at the tail is amortized `O(1)`, `Array.prototype.shift()` removes index `0` and must shift every remaining element left by one index (`O(n)`). Draining a queue of `100,000` items with `.shift()` performs `~5 billion` element moves (`O(n^2)` total), blocking the single-threaded Node.js event loop."
      },
      {
        label: "Solutions:",
        body: "Use a **Circular Ring Buffer** (fixed-capacity array with `head` and `tail` modulo indices) for strict `O(1)` enqueue/dequeue with zero allocations, or a **Two-Stack Queue** / **head-index pointer** (increment `head++` and slice only when dead prefix exceeds half the buffer) for amortized `O(1)` unbounded queues."
      }
    ],
    subboxes: [
      {
        title: "Code Sketch",
        content: "`this.#head = (this.#head + 1) % this.#cap; this.#size--; // O(1) ring-buffer dequeue`",
        isCode: true
      },
      {
        title: "Follow-up",
        content: "When does `Array` work fine as a stack? `.push()` and `.pop()` both operate at the tail in amortized `O(1)` without shifting elements."
      }
    ]
  },
  {
    id: "m01-p3-iq-3",
    lessonId: "m01-p3",
    moduleNumber: 1,
    number: 3,
    difficulty: "advanced",
    question: "Compare Merge Sort, Quicksort, and V8's `Array.prototype.sort()` (Timsort) in terms of worst-case time, space, stability, and cache locality.",
    paragraphs: [
      {
        label: "Comparison:",
        body: "**Merge Sort** guarantees `O(n log n)` worst-case time and **stability** (equal keys retain original order), but requires `O(n)` auxiliary buffer space. **Quicksort** sorts in-place (`O(log n)` average stack space) with superior CPU cache locality, but is unstable and degrades to `O(n^2)` on adversarial/already-sorted inputs unless randomized or 3-way partitioned."
      },
      {
        label: "V8 Reality:",
        body: "Since ES2019, ECMAScript requires `Array.prototype.sort()` to be **stable**. V8 implements **Timsort**—a hybrid of Merge Sort and Insertion Sort that detects already-sorted runs in real-world data, achieving `O(n)` best-case on nearly sorted arrays and `O(n log n)` worst-case with `O(n)` temporary run storage."
      }
    ],
    subboxes: [
      {
        title: "Security Note",
        content: "Deterministic Quicksort (fixed first/last pivot) is vulnerable to algorithmic complexity DoS if an attacker sends pre-crafted arrays; randomized pivots or Timsort/Merge Sort eliminate that `O(n^2)` cliff."
      },
      {
        title: "Interview Tip",
        content: "Remember `Array.prototype.sort()` mutates in place; use ES2023 `toSorted()` when preserving caller immutability."
      }
    ]
  },
  {
    id: "m01-p3-iq-4",
    lessonId: "m01-p3",
    moduleNumber: 1,
    number: 4,
    difficulty: "advanced",
    question: "How do Hash Maps achieve `O(1)` average lookup, what causes them to degrade to `O(n)`, and how do you defend against HashDoS?",
    paragraphs: [
      {
        label: "Internals:",
        body: "A Hash Map computes `bucket = hash(key) % capacity` to jump directly to a slot. Collisions (two keys landing in the same bucket) are resolved via chaining or open addressing, and when the **load factor** (`size / capacity`) crosses a threshold (e.g., `0.75`), the table resizes and rehashes (`O(n)` amortized). In the worst case—if every key collides into one bucket—every lookup degrades to `O(n)`."
      },
      {
        label: "HashDoS & JS Specifics:",
        body: "In **HashDoS**, an attacker sends thousands of HTTP form/JSON keys engineered to collide under a predictable hash function, pinning CPU at `O(n^2)` parsing time. Modern runtimes mitigate this using **randomized per-process hash seeds** (e.g., SipHash) and bounded request sizes/key counts. In JS, always use `new Map()` rather than plain `{}` for untrusted keys so `\"__proto__\"` or `\"constructor\"` cannot collide with `Object.prototype`."
      }
    ],
    subboxes: [
      {
        title: "Follow-up",
        content: "Why does V8's `Map` preserve insertion order while remaining `O(1)`? It stores entries in a dense `OrderedHashTable` array and chains bucket indices through parallel index slots."
      },
      {
        title: "Interview Tip",
        content: "Mention both runtime defenses (randomized hash seeds) and application-level limits (max JSON keys / payload size)."
      }
    ]
  },
  {
    id: "m01-p3-iq-5",
    lessonId: "m01-p3",
    moduleNumber: 1,
    number: 5,
    difficulty: "senior-architect",
    question: "Design a dependency-resolution and job-scheduling engine for a CI/CD platform supporting 50,000 task nodes, cycle detection, and bounded-memory execution.",
    numberedSteps: [
      {
        title: "How to analyze the problem:",
        body: "Model tasks as vertices and `dependsOn` edges in a directed graph `G = (V, E)`. Identify the two hard requirements: (1) reject invalid cyclic dependencies before running anything, and (2) schedule ready tasks in valid topological order with bounded memory and `O(V + E)` complexity."
      },
      {
        title: "Requirements:",
        body: "Validate 50,000-node DAGs in <100ms without JS call-stack overflow; detect and report the exact cycle path; enqueue ready tasks in `O(1)` without `Array.shift()`; support priority/concurrency limits."
      },
      {
        title: "Architecture:",
        body: "Graph Validator (iterative Kahn's topological sort / 3-color DFS) -> Ready Queue (`RingBuffer` / min-heap by priority) -> Worker Pool -> Execution State Store."
      },
      {
        title: "Database design:",
        body: "Store `pipeline_jobs(id, pipeline_id, status, in_degree)` and `job_edges(pipeline_id, from_job_id, to_job_id)` with composite index `(pipeline_id, from_job_id)` for fast adjacency loading."
      },
      {
        title: "API design:",
        body: "`POST /pipelines/validate` returns `{ valid: true, executionWaves }` or `422` with `{ error: \"CYCLE_DETECTED\", cyclePath: [...] }`. Rejects self-loops and missing node references upfront."
      },
      {
        title: "Technology choices:",
        body: "Represent the graph as an adjacency list `Map<string, string[]>` + `inDegree` `Map<string, number>` (`O(V + E)` space instead of `O(V^2)` matrix). Use iterative Kahn's algorithm with a head-index queue (`O(1)` dequeue) so 50k-deep chains never overflow V8's ~10k call-stack limit."
      },
      {
        title: "Scaling:",
        body: "Partition execution per `pipeline_id`; cache compiled DAG adjacency lists in Redis; emit ready downstream jobs via message queue once `in_degree` decrements atomically to `0`."
      },
      {
        title: "Security:",
        body: "Cap max nodes (`<= 50,000`) and edges per pipeline to prevent graph-bomb DoS; use `Map` instead of plain `{}` so task names like `\"__proto__\"` or `\"constructor\"` cannot pollute prototypes."
      },
      {
        title: "Failure handling:",
        body: "If Kahn's algorithm processes fewer than `V` nodes, a cycle exists—run iterative 3-color DFS (`unvisited / visiting / visited`) to extract the exact offending cycle for user feedback. Mark downstream dependents `SKIPPED` when an upstream task fails."
      },
      {
        title: "Trade-offs:",
        body: "Kahn's BFS naturally groups parallelizable waves (great for CI workers), whereas recursive DFS is simpler to write but crashes at ~10k depth in Node.js without converting to an explicit heap stack."
      },
      {
        title: "Sample senior answer:",
        body: "\"I model the CI pipeline as a directed adjacency list in `Map` (`O(V + E)` memory) and run iterative Kahn's topological sort using an `O(1)` head-index queue. That avoids V8's ~10k recursion stack limit, runs in linear `O(V + E)` time, naturally surfaces parallel execution waves, and catches cycles immediately whenever `processedCount < nodeCount`.\""
      },
      {
        title: "Follow-up questions:",
        body: "How would you schedule critical-path jobs first? Replace the FIFO ready queue with a Binary Max-Heap (Priority Queue, `O(log V)` push/pop) keyed by longest downstream path duration."
      }
    ]
  }
];
