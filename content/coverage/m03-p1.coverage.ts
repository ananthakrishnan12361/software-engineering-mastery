import assert from "node:assert/strict";
import type { LessonCoverageSpec } from "./types";

export const m03p1Coverage: LessonCoverageSpec = {
  lessonId: "m03-p1",
  moduleNumber: 3,
  mdxPath: "content/modules/03-nodejs/m03-p1.mdx",
  topics: [
    {
      topicTitle: "Node.js architecture",
      anchorId: "m03-p1-topic-nodejs-architecture",
      explanationHeadings: [
        "1. Node.js Architecture: V8 + Bindings + libuv",
        "1. Node.js Runtime Architecture (V8 + libuv + Thread Pool + Worker Threads)"
      ],
      exampleTitles: ["Example 2: Node Event Loop Phase & Microtask Priority Simulator (`createNodeLoopSimulator`)"],
      interviewQuestionIds: ["m03-p1-iq-1", "m03-p1-iq-9"],
      exerciseTitles: ["Exercise 1: Bounded libuv-Style Thread Pool Queue (createThreadPool)"]
    },
    {
      topicTitle: "V8",
      anchorId: "m03-p1-topic-v8",
      explanationHeadings: ["2. V8: JIT Compilation, Hidden Classes & Garbage Collection"],
      exampleTitles: ["Example 2: Node Event Loop Phase & Microtask Priority Simulator (`createNodeLoopSimulator`)"],
      interviewQuestionIds: ["m03-p1-iq-8"],
      exerciseTitles: ["Exercise 1: Bounded libuv-Style Thread Pool Queue (createThreadPool)"]
    },
    {
      topicTitle: "libuv",
      anchorId: "m03-p1-topic-libuv",
      explanationHeadings: ["3. libuv: Cross-Platform Event Loop & Async Abstraction"],
      exampleTitles: ["Example 2: Node Event Loop Phase & Microtask Priority Simulator (`createNodeLoopSimulator`)"],
      interviewQuestionIds: ["m03-p1-iq-5"],
      exerciseTitles: ["Exercise 1: Bounded libuv-Style Thread Pool Queue (createThreadPool)"]
    },
    {
      topicTitle: "Event loop",
      anchorId: "m03-p1-topic-event-loop",
      explanationHeadings: ["4. Event Loop: Macrotask Phases & Microtask Draining"],
      exampleTitles: ["Example 2: Node Event Loop Phase & Microtask Priority Simulator (`createNodeLoopSimulator`)"],
      interviewQuestionIds: ["m03-p1-iq-4"],
      exerciseTitles: ["Exercise 1: Bounded libuv-Style Thread Pool Queue (createThreadPool)"]
    },
    {
      topicTitle: "Thread pool",
      anchorId: "m03-p1-topic-thread-pool",
      explanationHeadings: ["5. Thread Pool: `UV_THREADPOOL_SIZE` & Hidden Bottlenecks"],
      exampleTitles: ["Example 2: Node Event Loop Phase & Microtask Priority Simulator (`createNodeLoopSimulator`)"],
      interviewQuestionIds: ["m03-p1-iq-5"],
      exerciseTitles: ["Exercise 1: Bounded libuv-Style Thread Pool Queue (createThreadPool)"]
    },
    {
      topicTitle: "Worker threads",
      anchorId: "m03-p1-topic-worker-threads",
      explanationHeadings: ["6. Worker Threads: Parallel CPU Execution Inside One Process"],
      exampleTitles: ["Example 2: Node Event Loop Phase & Microtask Priority Simulator (`createNodeLoopSimulator`)"],
      interviewQuestionIds: ["m03-p1-iq-7"],
      exerciseTitles: ["Exercise 1: Bounded libuv-Style Thread Pool Queue (createThreadPool)"]
    },
    {
      topicTitle: "Process vs thread",
      anchorId: "m03-p1-topic-process-vs-thread",
      explanationHeadings: ["7. Process vs. Thread: Isolation, Memory & Crash Boundaries"],
      exampleTitles: ["Example 2: Node Event Loop Phase & Microtask Priority Simulator (`createNodeLoopSimulator`)"],
      interviewQuestionIds: ["m03-p1-iq-7"],
      exerciseTitles: ["Exercise 1: Bounded libuv-Style Thread Pool Queue (createThreadPool)"]
    },
    {
      topicTitle: "Async I/O",
      anchorId: "m03-p1-topic-async-io",
      explanationHeadings: ["8. Async I/O: Non-Blocking Sockets vs. Event-Loop Starvation"],
      exampleTitles: ["Example 3: Stream Backpressure Simulator (`createBoundedStreamPipe`)"],
      interviewQuestionIds: ["m03-p1-iq-1"],
      exerciseTitles: ["Exercise 2: Streaming NDJSON Chunk Line Splitter (createLineSplitter)"]
    },
    {
      topicTitle: "Streams",
      anchorId: "m03-p1-topic-streams",
      explanationHeadings: [
        "9. Streams: Constant-Memory Pipelines & Backpressure",
        "2. Stream Backpressure & `highWaterMark` Flow Control"
      ],
      exampleTitles: ["Example 3: Stream Backpressure Simulator (`createBoundedStreamPipe`)"],
      interviewQuestionIds: ["m03-p1-iq-3", "m03-p1-iq-6"],
      exerciseTitles: ["Exercise 2: Streaming NDJSON Chunk Line Splitter (createLineSplitter)"]
    },
    {
      topicTitle: "Buffers",
      anchorId: "m03-p1-topic-buffers",
      explanationHeadings: ["10. Buffers: Fixed-Length Binary Memory Outside V8 Strings"],
      exampleTitles: ["Example 4: Binary Buffer Frame Parser & Path Traversal Guard (`parseFrameHeader`, `isSafeRelativePath`)"],
      interviewQuestionIds: ["m03-p1-iq-2"],
      exerciseTitles: ["Exercise 2: Streaming NDJSON Chunk Line Splitter (createLineSplitter)"]
    },
    {
      topicTitle: "File handling",
      anchorId: "m03-p1-topic-file-handling",
      explanationHeadings: ["11. File Handling: `fs/promises`, Streaming & Path Traversal Defense"],
      exampleTitles: ["Example 4: Binary Buffer Frame Parser & Path Traversal Guard (`parseFrameHeader`, `isSafeRelativePath`)"],
      interviewQuestionIds: ["m03-p1-iq-3", "m03-p1-iq-9"],
      exerciseTitles: ["Exercise 2: Streaming NDJSON Chunk Line Splitter (createLineSplitter)"]
    }
  ],
  codeTests: [
    {
      blockIndex: 1,
      label: "Example 2: createNodeLoopSimulator",
      expectedStdoutIncludes: ["Order:"],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.deepEqual(
          run(`const l = createNodeLoopSimulator(); l.setImmediate(() => l.log("imm")); l.setTimeout0(() => l.log("t0")); l.queueMicrotask(() => l.log("p")); l.nextTick(() => l.log("nt")); l.log("sync"); return l.run();`),
          ["sync", "nt", "p", "t0", "imm"]
        );
        assert.throws(() => run(`createNodeLoopSimulator().nextTick("bad");`), TypeError);
      },
      safetyMutations: [
        {
          description: "Removing microtask starvation cap allows infinite nextTick loop",
          mutateCode: (raw) => raw.replaceAll('if (++steps > 1000) throw new Error("Microtask starvation detected");', "/* cap removed */"),
          verifyProtection: (run) => {
            assert.throws(() => {
              run(`const l = createNodeLoopSimulator(); let n = 0; function spin() { if (++n < 1005) l.nextTick(spin); } l.nextTick(spin); l.run();`);
            }, /starvation/);
          }
        }
      ]
    },
    {
      blockIndex: 2,
      label: "Example 3: createBoundedStreamPipe",
      expectedStdoutIncludes: ["Write 60B continue? true", "Write 60B continue? false", "Stats after flush:"],
      minStdoutLines: 3,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`createBoundedStreamPipe(0);`), TypeError);
        assert.throws(() => run(`createBoundedStreamPipe(10).write(-1);`), TypeError);
        assert.equal(run(`const p = createBoundedStreamPipe(10); p.write(12); p.flushOne(); return p.stats().drainCount;`), 1);
      },
      safetyMutations: [
        {
          description: "Removing positive highWaterMarkBytes check allows 0-byte threshold",
          mutateCode: (raw) =>
            raw.replace(/if \(!Number\.isInteger\(highWaterMarkBytes\) \|\| highWaterMarkBytes < 1\)\s*\{[^}]*\}/, "/* guard removed */"),
          verifyProtection: (run) => {
            assert.throws(() => run(`createBoundedStreamPipe(0);`), TypeError);
          }
        }
      ]
    },
    {
      blockIndex: 3,
      label: "Example 4: parseFrameHeader & isSafeRelativePath",
      expectedStdoutIncludes: ["Parsed frame:", "Safe path logs/app.log? true | Traversal blocked? true"],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`parseFrameHeader("bad");`), TypeError);
        assert.throws(() => run(`parseFrameHeader(new Uint8Array([1, 0, 0, 5, 1]));`), RangeError);
        assert.equal(run(`return isSafeRelativePath("a/../b/c.txt");`), true);
        assert.equal(run(`return isSafeRelativePath("a/../../etc/passwd");`), false);
        assert.equal(run(`return isSafeRelativePath("/etc/passwd");`), false);
        assert.equal(run(`return isSafeRelativePath(String.fromCharCode(92) + "etc" + String.fromCharCode(92) + "passwd");`), false);
        assert.equal(run(`return isSafeRelativePath("C:/Windows/System32");`), false);
      },
      safetyMutations: [
        {
          description: "Removing truncated payload length check allows out-of-bounds slice",
          mutateCode: (raw) =>
            raw.replace(/if \(bytes\.length < 4 \+ payloadLength\)\s*\{[^}]*\}/, "/* bounds removed */"),
          verifyProtection: (run) => {
            assert.throws(() => run(`parseFrameHeader(new Uint8Array([1, 0, 0, 10, 65]));`), RangeError);
          }
        },
        {
          description: "Removing root slash check in isSafeRelativePath allows /etc/passwd",
          mutateCode: (raw) => raw.replace(/if \(normalized\.startsWith\("\/"\)\) return false;/, "/* root check removed */"),
          verifyProtection: (run) => {
            assert.equal(run(`return isSafeRelativePath("/etc/passwd");`), false);
          }
        }
      ]
    },
    {
      blockIndex: 4,
      label: "Exercise 1: createThreadPool",
      expectedStdoutIncludes: ["Pool stats:", "| FIFO:"],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`createThreadPool(0);`), TypeError);
        assert.throws(() => run(`createThreadPool(2).enqueue("bad");`), TypeError);
        assert.deepEqual(
          run(`const p = createThreadPool(2); const out = []; p.enqueue(() => out.push("a")); p.enqueue(() => out.push("b")); p.enqueue(() => out.push("c")); const mid = p.stats(); while (p.completeOne()) {} return { mid, end: p.stats(), out };`),
          { mid: { active: 2, queued: 1, completed: 0, peakActive: 2 }, end: { active: 0, queued: 0, completed: 3, peakActive: 2 }, out: ["a", "b", "c"] }
        );
      },
      safetyMutations: [
        {
          description: "Removing pool size guard accepts 0 threads and loops/drops tasks",
          mutateCode: (raw) =>
            raw.replace(/if \(!Number\.isInteger\(size\) \|\| size < 1\)\s*\{[^}]*\}/, "/* guard removed */"),
          verifyProtection: (run) => {
            assert.throws(() => run(`createThreadPool(0);`), TypeError);
          }
        }
      ]
    },
    {
      blockIndex: 5,
      label: "Exercise 2: createLineSplitter",
      expectedStdoutIncludes: ["Out 1:", "| Out 2:"],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`createLineSplitter().push(123);`), TypeError);
        assert.deepEqual(
          run(`const s = createLineSplitter(); s.push("hel"); return [...s.push("lo" + String.fromCharCode(10) + "end"), ...s.flush()];`),
          ["hello", "end"]
        );
      },
      safetyMutations: [
        {
          description: "Removing non-string chunk check coerces numbers/objects silently",
          mutateCode: (raw) =>
            raw.replace(/if \(typeof chunk !== "string"\) throw new TypeError\("chunk must be a string"\);/, "/* guard removed */"),
          verifyProtection: (run) => {
            assert.throws(() => run(`createLineSplitter().push(null);`), TypeError);
          }
        }
      ]
    }
  ]
};
