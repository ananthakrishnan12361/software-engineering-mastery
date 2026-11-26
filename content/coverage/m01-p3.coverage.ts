import assert from "node:assert/strict";
import type { LessonCoverageSpec } from "./types";

export const m01p3Coverage: LessonCoverageSpec = {
  lessonId: "m01-p3",
  moduleNumber: 1,
  mdxPath: "content/modules/01-programming/m01-p3.mdx",
  topics: [
    {
      topicTitle: "Algorithms",
      anchorId: "m01-p3-topic-algorithms",
      explanationHeadings: ["1. Algorithms: Correctness, Termination & Invariants"],
      exampleTitles: ["Example 1: Binary Search (`O(log n)`) vs. Linear Scan (`O(n)`) with Strict Sorted Validation"],
      interviewQuestionIds: ["m01-p3-iq-1", "m01-p3-iq-3"],
      exerciseTitles: ["Exercise 1: Binary Search Lower Bound (First Index >= Target)"]
    },
    {
      topicTitle: "Data structures",
      anchorId: "m01-p3-topic-data-structures",
      explanationHeadings: [
        "2. Data Structures: Organizing Memory for Access Patterns",
        "2. Core Data Structures: Time & Space Trade-Offs"
      ],
      exampleTitles: ["Example 3: Hash Map Two-Sum (`O(n)`), Monotonic Stack & `O(1)` Ring-Buffer Queue"],
      interviewQuestionIds: ["m01-p3-iq-2", "m01-p3-iq-4"],
      exerciseTitles: ["Exercise 2: Balanced Brackets (Stack) & O(1) Two-Stack Queue"]
    },
    {
      topicTitle: "Time complexity",
      anchorId: "m01-p3-topic-time-complexity",
      explanationHeadings: ["3. Time Complexity: Counting Dominant Operations"],
      exampleTitles: ["Example 1: Binary Search (`O(log n)`) vs. Linear Scan (`O(n)`) with Strict Sorted Validation"],
      interviewQuestionIds: ["m01-p3-iq-1", "m01-p3-iq-2"],
      exerciseTitles: ["Exercise 1: Binary Search Lower Bound (First Index >= Target)"]
    },
    {
      topicTitle: "Space complexity",
      anchorId: "m01-p3-topic-space-complexity",
      explanationHeadings: ["4. Space Complexity: Auxiliary Memory & Call Stack Cost"],
      exampleTitles: ["Example 2: Bottom-Up Merge Sort (`O(n log n)`) & Recursion vs. Stack-Safe Iteration"],
      interviewQuestionIds: ["m01-p3-iq-1", "m01-p3-iq-3"],
      exerciseTitles: ["Exercise 3: Directed Graph Cycle Detection (Iterative 3-Color DFS)"]
    },
    {
      topicTitle: "Big O",
      anchorId: "m01-p3-topic-big-o",
      explanationHeadings: [
        "5. Big O: Asymptotic Upper Bounds & Growth Tiers",
        "1. Big O Complexity Tiers (Practical Scale at `n = 1,000,000`)"
      ],
      exampleTitles: ["Example 1: Binary Search (`O(log n)`) vs. Linear Scan (`O(n)`) with Strict Sorted Validation"],
      interviewQuestionIds: ["m01-p3-iq-1"],
      exerciseTitles: ["Exercise 1: Binary Search Lower Bound (First Index >= Target)"]
    },
    {
      topicTitle: "Recursion",
      anchorId: "m01-p3-topic-recursion",
      explanationHeadings: ["6. Recursion: Base Cases, Progress & Stack Limits"],
      exampleTitles: ["Example 2: Bottom-Up Merge Sort (`O(n log n)`) & Recursion vs. Stack-Safe Iteration"],
      interviewQuestionIds: ["m01-p3-iq-5"],
      exerciseTitles: ["Exercise 3: Directed Graph Cycle Detection (Iterative 3-Color DFS)"]
    },
    {
      topicTitle: "Sorting",
      anchorId: "m01-p3-topic-sorting",
      explanationHeadings: [
        "7. Sorting: Comparison Bounds, Stability & `O(n log n)`",
        "3. Sorting & Searching Decision Guide"
      ],
      exampleTitles: ["Example 2: Bottom-Up Merge Sort (`O(n log n)`) & Recursion vs. Stack-Safe Iteration"],
      interviewQuestionIds: ["m01-p3-iq-3"],
      exerciseTitles: ["Exercise 1: Binary Search Lower Bound (First Index >= Target)"]
    },
    {
      topicTitle: "Searching",
      anchorId: "m01-p3-topic-searching",
      explanationHeadings: ["8. Searching: Linear Scan vs. Binary Search"],
      exampleTitles: ["Example 1: Binary Search (`O(log n)`) vs. Linear Scan (`O(n)`) with Strict Sorted Validation"],
      interviewQuestionIds: ["m01-p3-iq-1"],
      exerciseTitles: ["Exercise 1: Binary Search Lower Bound (First Index >= Target)"]
    },
    {
      topicTitle: "Hash maps",
      anchorId: "m01-p3-topic-hash-maps",
      explanationHeadings: ["9. Hash Maps: `O(1)` Average Lookups & Collisions"],
      exampleTitles: ["Example 3: Hash Map Two-Sum (`O(n)`), Monotonic Stack & `O(1)` Ring-Buffer Queue"],
      interviewQuestionIds: ["m01-p3-iq-4"],
      exerciseTitles: ["Exercise 2: Balanced Brackets (Stack) & O(1) Two-Stack Queue"]
    },
    {
      topicTitle: "Stacks",
      anchorId: "m01-p3-topic-stacks",
      explanationHeadings: ["10. Stacks: LIFO Ordering & Monotonic Patterns"],
      exampleTitles: ["Example 4: Binary Search Tree Validation & Graph BFS Shortest Path"],
      interviewQuestionIds: ["m01-p3-iq-2", "m01-p3-iq-5"],
      exerciseTitles: ["Exercise 2: Balanced Brackets (Stack) & O(1) Two-Stack Queue"]
    },
    {
      topicTitle: "Queues",
      anchorId: "m01-p3-topic-queues",
      explanationHeadings: ["11. Queues: FIFO Ordering & Why `Array.shift()` Fails at Scale"],
      exampleTitles: ["Example 3: Hash Map Two-Sum (`O(n)`), Monotonic Stack & `O(1)` Ring-Buffer Queue"],
      interviewQuestionIds: ["m01-p3-iq-2"],
      exerciseTitles: ["Exercise 2: Balanced Brackets (Stack) & O(1) Two-Stack Queue"]
    },
    {
      topicTitle: "Trees",
      anchorId: "m01-p3-topic-trees",
      explanationHeadings: ["12. Trees: Hierarchies, BST Invariants & Traversals"],
      exampleTitles: ["Example 4: Binary Search Tree Validation & Graph BFS Shortest Path"],
      interviewQuestionIds: ["m01-p3-iq-5"],
      exerciseTitles: ["Exercise 3: Directed Graph Cycle Detection (Iterative 3-Color DFS)"]
    },
    {
      topicTitle: "Graph fundamentals",
      anchorId: "m01-p3-topic-graph-fundamentals",
      explanationHeadings: [
        "13. Graph Fundamentals: Vertices, Edges, Cycles & BFS/DFS",
        "2. Tree & Graph Traversals: BFS (Queue) vs. DFS (Stack + Visited Set)"
      ],
      exampleTitles: ["Example 4: Binary Search Tree Validation & Graph BFS Shortest Path"],
      interviewQuestionIds: ["m01-p3-iq-5"],
      exerciseTitles: ["Exercise 3: Directed Graph Cycle Detection (Iterative 3-Color DFS)"]
    }
  ],
  codeTests: [
    {
      blockIndex: 1,
      label: "Example 1: Binary Search vs. Linear Scan",
      expectedStdoutIncludes: ["Index of 550: 4", "Index of 999 (missing): -1"],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        assert.equal(run(`return binarySearch([10, 20, 30], 10);`), 0);
        assert.equal(run(`return binarySearch([10, 20, 30], 30);`), 2);
        assert.equal(run(`return binarySearch([], 5);`), -1);
        assert.throws(() => run(`return binarySearch("not-array", 5);`), TypeError);
        assert.throws(() => run(`return binarySearch([1, NaN, 3], 3);`), TypeError);
        assert.throws(() => run(`return binarySearch([1, 2, 3], Infinity);`), TypeError);
        assert.throws(() => run(`return binarySearch([3, 1, 2], 2);`), RangeError);
      },
      safetyMutations: [
        {
          description: "Removing sorted-order guard allows binarySearch to return wrong -1 on unsorted array",
          mutateCode: (raw) =>
            raw.replace(/if \(sortedNums\[i\] < sortedNums\[i - 1\]\)\s*\{[^}]*\}/, "/* sort guard removed */"),
          verifyProtection: (run) => {
            assert.throws(() => run(`return binarySearch([10, 1, 2], 10);`), RangeError);
          }
        }
      ]
    },
    {
      blockIndex: 2,
      label: "Example 2: Bottom-Up Merge Sort & Bounded Recursion",
      expectedStdoutIncludes: ["Merge sorted: [3,9,10,27,38,43,82]", "Bounded recursive sum(10): 55"],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        assert.deepEqual(run(`return mergeSortIterative([]);`), []);
        assert.deepEqual(run(`return mergeSortIterative([5, -1, 5, 0]);`), [-1, 0, 5, 5]);
        assert.deepEqual(run(`const src = [3, 1, 2]; mergeSortIterative(src); return src;`), [3, 1, 2]);
        assert.equal(run(`return sumRecursiveBounded(0);`), 0);
        assert.throws(() => run(`return mergeSortIterative(null);`), TypeError);
        assert.throws(() => run(`return mergeSortIterative([1, NaN]);`), TypeError);
        assert.throws(() => run(`return mergeSortIterative([1, Infinity]);`), TypeError);
        assert.throws(() => run(`return sumRecursiveBounded(-1);`), RangeError);
        assert.throws(() => run(`return sumRecursiveBounded(5001);`), RangeError);
        assert.throws(() => run(`return sumRecursiveBounded(NaN);`), RangeError);
        assert.throws(() => run(`return sumRecursiveBounded(Infinity);`), RangeError);
        assert.throws(() => run(`return sumRecursiveBounded(2.5);`), RangeError);
      },
      safetyMutations: [
        {
          description: "Removing recursion upper-bound guard allows unbounded stack overflow input",
          mutateCode: (raw) =>
            raw.replace(
              /if \(!Number\.isSafeInteger\(n\) \|\| n < 0 \|\| n > 5000\)\s*\{[^}]*\}/,
              "/* bound guard removed */"
            ),
          verifyProtection: (run) => {
            assert.throws(() => run(`return sumRecursiveBounded(6000);`), RangeError);
          }
        }
      ]
    },
    {
      blockIndex: 3,
      label: "Example 3: Hash Map Two-Sum, Monotonic Stack & RingQueue",
      expectedStdoutIncludes: [
        "Two-sum [2,7,11,15] -> 9: [0,1]",
        "Next greater [2,1,5,3]: [5,5,-1,-1]",
        "Dequeued: job-1 | Remaining size: 1"
      ],
      minStdoutLines: 3,
      testValidAndInvalidInputs: (run) => {
        assert.deepEqual(run(`return twoSumIndices([3, 3], 6);`), [0, 1]);
        assert.equal(run(`return twoSumIndices([1, 2, 3], 99);`), null);
        assert.throws(() => run(`return twoSumIndices(null, 5);`), TypeError);
        assert.throws(() => run(`return twoSumIndices([1, 2], NaN);`), TypeError);
        assert.throws(() => run(`return twoSumIndices([1, Infinity], 5);`), TypeError);

        assert.deepEqual(run(`return nextGreaterElements([]);`), []);
        assert.deepEqual(run(`return nextGreaterElements([4, 3, 2, 1]);`), [-1, -1, -1, -1]);
        assert.deepEqual(run(`return nextGreaterElements([1, 3, 2, 4]);`), [3, 4, 4, -1]);
        assert.throws(() => run(`return nextGreaterElements(null);`), TypeError);
        assert.throws(() => run(`return nextGreaterElements([1, NaN]);`), TypeError);

        assert.throws(() => run(`return new RingQueue(0);`), RangeError);
        assert.throws(() => {
          run(`const rq = new RingQueue(1); rq.enqueue(1); rq.enqueue(2);`);
        }, RangeError);
        assert.deepEqual(
          run(`const rq = new RingQueue(2); rq.enqueue("a"); rq.enqueue("b"); const x = rq.dequeue(); rq.enqueue("c"); return [x, rq.dequeue(), rq.dequeue(), rq.dequeue()];`),
          ["a", "b", "c", undefined]
        );
      },
      safetyMutations: [
        {
          description: "Removing RingQueue full-capacity guard silently overwrites unread head element",
          mutateCode: (raw) =>
            raw.replace(/if \(this\.#size === this\.#cap\) throw new RangeError\("Queue is full"\);/, "/* guard removed */"),
          verifyProtection: (run) => {
            assert.throws(() => run(`const rq = new RingQueue(1); rq.enqueue(1); rq.enqueue(2);`), RangeError);
          }
        },
        {
          description: "Removing finite-number guard in nextGreaterElements allows NaN through without TypeError",
          mutateCode: (raw) =>
            raw.replace(
              /if \(typeof val !== "number" \|\| !Number\.isFinite\(val\)\)\s*\{\s*throw new TypeError\("nums elements must be finite numbers"\);\s*\}/g,
              "/* guard removed */"
            ),
          verifyProtection: (run) => {
            assert.throws(() => run(`return nextGreaterElements([1, NaN]);`), TypeError);
          }
        }
      ]
    },
    {
      blockIndex: 4,
      label: "Example 4: BST Validation & Graph BFS Shortest Path",
      expectedStdoutIncludes: ["Valid BST? true", 'Shortest A -> E: ["A","C","E"]'],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        // Classic trap: right subtree has value smaller than root (5 < 10) -> MUST be false!
        assert.equal(
          run(
            `return isValidBST({ val: 10, left: null, right: { val: 15, left: { val: 5, left: null, right: null }, right: null } });`
          ),
          false
        );
        // Duplicate key violates strict BST invariant
        assert.equal(
          run(`return isValidBST({ val: 10, left: { val: 10, left: null, right: null }, right: null });`),
          false
        );
        assert.equal(run(`return isValidBST(null);`), true);
        assert.throws(() => run(`return isValidBST(123);`), TypeError);
        assert.throws(() => run(`return isValidBST({ val: NaN, left: null, right: null });`), TypeError);
        assert.throws(() => {
          run(`const n = { val: 1, left: null, right: null }; n.left = n; return isValidBST(n);`);
        }, RangeError);

        assert.deepEqual(run(`return shortestPathBFS(graph, "A", "A");`), ["A"]);
        assert.equal(run(`return shortestPathBFS(graph, "E", "A");`), null);
        // Cyclic graph with unreachable goal terminates cleanly and handles prototype keys safely
        assert.equal(
          run(`const cg = new Map([["__proto__", ["constructor"]], ["constructor", ["__proto__"]], ["Z", []]]); return shortestPathBFS(cg, "__proto__", "Z");`),
          null
        );
        assert.deepEqual(
          run(`const ng = new Map([[null, ["ok"]], ["ok", []]]); return shortestPathBFS(ng, null, "ok");`),
          [null, "ok"]
        );
        assert.throws(() => run(`return shortestPathBFS({}, "A", "E");`), TypeError);
      },
      safetyMutations: [
        {
          description: "Removing tree cycle guard fails to throw RangeError on cyclic node",
          mutateCode: (raw) =>
            raw.replace(/if \(visited\.has\(node\)\) throw new RangeError\("Cycle detected in tree"\);/, "/* guard removed */"),
          verifyProtection: (run) => {
            assert.throws(() => {
              run(`const n = { val: 1, left: null, right: null }; n.left = n; return isValidBST(n);`);
            }, RangeError);
          }
        }
      ]
    },
    {
      blockIndex: 5,
      label: "Exercise 1: Binary Search Lower Bound",
      expectedStdoutIncludes: ["Lower bound of 4 in [1,2,4,4,4,9]: 2", "Lower bound of 10: 6"],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        assert.equal(run(`return lowerBound([], 5);`), 0);
        assert.equal(run(`return lowerBound([2, 4, 6], 1);`), 0);
        assert.throws(() => run(`return lowerBound([3, 1], 2);`), RangeError);
        assert.throws(() => run(`return lowerBound([1, 2], NaN);`), TypeError);
      },
      safetyMutations: [
        {
          description: "Removing unsorted check in lowerBound silently returns wrong index",
          mutateCode: (raw) =>
            raw.replace(/if \(i > 0 && sortedNums\[i\] < sortedNums\[i - 1\]\)\s*\{[^}]*\}/, "/* guard removed */"),
          verifyProtection: (run) => {
            assert.throws(() => run(`return lowerBound([5, 1, 2], 5);`), RangeError);
          }
        }
      ]
    },
    {
      blockIndex: 6,
      label: "Exercise 2: Balanced Brackets & TwoStackQueue",
      expectedStdoutIncludes: ["Balanced '{[()]}'? true", "Balanced '([)]'? false", "TwoStackQueue dequeue: a | size: 1"],
      minStdoutLines: 3,
      testValidAndInvalidInputs: (run) => {
        assert.equal(run(`return isBalancedBrackets("fn(a[0])");`), true);
        assert.equal(run(`return isBalancedBrackets("(");`), false);
        assert.equal(run(`return isBalancedBrackets(")");`), false);
        assert.throws(() => run(`return isBalancedBrackets(null);`), TypeError);
        assert.throws(() => run(`return isBalancedBrackets(["(", ")"]);`), TypeError);
        assert.equal(run(`const q = new TwoStackQueue(); q.enqueue(1); q.enqueue(2); const a = q.dequeue(); q.enqueue(3); return [a, q.dequeue(), q.dequeue(), q.dequeue()].join(",");`), "1,2,3,");
      },
      safetyMutations: [
        {
          description: "Removing non-string check in isBalancedBrackets silently accepts iterable arrays",
          mutateCode: (raw) =>
            raw.replace(/if \(typeof expr !== "string"\) throw new TypeError\("expr must be a string"\);/, "/* guard removed */"),
          verifyProtection: (run) => {
            assert.throws(() => run(`return isBalancedBrackets(["(", ")"]);`), TypeError);
          }
        }
      ]
    },
    {
      blockIndex: 7,
      label: "Exercise 3: Directed Graph Cycle Detection",
      expectedStdoutIncludes: ["DAG has cycle? false", "Cyclic graph has cycle? true"],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        assert.equal(run(`return hasDirectedCycle(new Map([["A", ["B", "C"]], ["B", ["D"]], ["C", ["D"]], ["D", []]]));`), false);
        assert.equal(run(`return hasDirectedCycle(new Map([["X", ["X"]]]));`), true);
        // Deep 15,000-node DAG succeeds without V8 call-stack overflow
        assert.equal(
          run(`const g = new Map(); for (let i = 0; i < 15000; i++) g.set(i, i + 1 < 15000 ? [i + 1] : []); return hasDirectedCycle(g);`),
          false
        );
        assert.throws(() => run(`return hasDirectedCycle({});`), TypeError);
      },
      safetyMutations: [
        {
          description: "Removing Map instance guard allows plain object to throw cryptic TypeError on .keys()",
          mutateCode: (raw) =>
            raw.replace(/if \(!\(adjList instanceof Map\)\) throw new TypeError\("adjList must be a Map"\);/, "/* guard removed */"),
          verifyProtection: (run) => {
            assert.throws(() => run(`return hasDirectedCycle({ keys: () => [] });`), TypeError);
          }
        }
      ]
    }
  ]
};
