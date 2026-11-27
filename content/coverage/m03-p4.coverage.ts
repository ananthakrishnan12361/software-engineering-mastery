import assert from "node:assert/strict";
import type { LessonCoverageSpec } from "./types";

export const m03p4Coverage: LessonCoverageSpec = {
  lessonId: "m03-p4",
  moduleNumber: 3,
  mdxPath: "content/modules/03-nodejs/m03-p4.mdx",
  topics: [
    {
      topicTitle: "Pagination",
      anchorId: "m03-p4-topic-pagination",
      explanationHeadings: ["1. Pagination: Offset vs. Keyset (Cursor) Pagination"],
      exampleTitles: ["Example 2: Keyset Cursor Pagination + Allowlisted Filter & Sort Builder (`buildCursorListSpec`)"],
      interviewQuestionIds: ["m03-p4-iq-1"],
      exerciseTitles: ["Exercise 1: Magic-Byte File Upload Validator (validateUpload)"]
    },
    {
      topicTitle: "Filtering",
      anchorId: "m03-p4-topic-filtering",
      explanationHeadings: ["2. Filtering: Allowlisted Predicates & Index-Friendly Bounds"],
      exampleTitles: ["Example 2: Keyset Cursor Pagination + Allowlisted Filter & Sort Builder (`buildCursorListSpec`)"],
      interviewQuestionIds: ["m03-p4-iq-1"],
      exerciseTitles: ["Exercise 1: Magic-Byte File Upload Validator (validateUpload)"]
    },
    {
      topicTitle: "Sorting",
      anchorId: "m03-p4-topic-sorting",
      explanationHeadings: ["3. Sorting: Deterministic Tie-Breakers & SQL Injection Defense"],
      exampleTitles: ["Example 2: Keyset Cursor Pagination + Allowlisted Filter & Sort Builder (`buildCursorListSpec`)"],
      interviewQuestionIds: ["m03-p4-iq-1"],
      exerciseTitles: ["Exercise 1: Magic-Byte File Upload Validator (validateUpload)"]
    },
    {
      topicTitle: "File uploads",
      anchorId: "m03-p4-topic-file-uploads",
      explanationHeadings: ["4. File Uploads: Streaming, Magic Bytes & Direct-to-Object-Storage"],
      exampleTitles: ["Example 2: Keyset Cursor Pagination + Allowlisted Filter & Sort Builder (`buildCursorListSpec`)"],
      interviewQuestionIds: ["m03-p4-iq-4"],
      exerciseTitles: ["Exercise 1: Magic-Byte File Upload Validator (validateUpload)"]
    },
    {
      topicTitle: "Background jobs",
      anchorId: "m03-p4-topic-background-jobs",
      explanationHeadings: [
        "5. Background Jobs: Returning `202 Accepted` & Keeping HTTP Fast",
        "1. Async Background Queue & Dead-Letter Retry Pipeline"
      ],
      exampleTitles: ["Example 4: Background Job Queue With Idempotency, Exponential Backoff & DLQ (`createJobQueue`)"],
      interviewQuestionIds: ["m03-p4-iq-3"],
      exerciseTitles: ["Exercise 1: Magic-Byte File Upload Validator (validateUpload)"]
    },
    {
      topicTitle: "Queue systems",
      anchorId: "m03-p4-topic-queue-systems",
      explanationHeadings: ["6. Queue Systems: Retries, Backoff, Concurrency & Dead-Letter Queues"],
      exampleTitles: ["Example 4: Background Job Queue With Idempotency, Exponential Backoff & DLQ (`createJobQueue`)"],
      interviewQuestionIds: ["m03-p4-iq-3"],
      exerciseTitles: ["Exercise 1: Magic-Byte File Upload Validator (validateUpload)"]
    },
    {
      topicTitle: "WebSockets",
      anchorId: "m03-p4-topic-websockets",
      explanationHeadings: ["7. WebSockets: Full-Duplex Real-Time Connections & Scaling"],
      exampleTitles: ["Example 3: Bounded Database Connection Pool (`createConnectionPool`)"],
      interviewQuestionIds: ["m03-p4-iq-7"],
      exerciseTitles: ["Exercise 2: Lightweight DI Container & WebSocket Heartbeat Tracker (createContainer, createWsTracker)"]
    },
    {
      topicTitle: "Connection pooling",
      anchorId: "m03-p4-topic-connection-pooling",
      explanationHeadings: ["8. Connection Pooling: Reusing Expensive TCP/TLS DB Handshakes"],
      exampleTitles: ["Example 3: Bounded Database Connection Pool (`createConnectionPool`)"],
      interviewQuestionIds: ["m03-p4-iq-2"],
      exerciseTitles: ["Exercise 2: Lightweight DI Container & WebSocket Heartbeat Tracker (createContainer, createWsTracker)"]
    },
    {
      topicTitle: "Microservices",
      anchorId: "m03-p4-topic-microservices",
      explanationHeadings: ["9. Microservices: Independent Deployment vs. Distributed Complexity"],
      exampleTitles: ["Example 4: Background Job Queue With Idempotency, Exponential Backoff & DLQ (`createJobQueue`)"],
      interviewQuestionIds: ["m03-p4-iq-5", "m03-p4-iq-8"],
      exerciseTitles: ["Exercise 2: Lightweight DI Container & WebSocket Heartbeat Tracker (createContainer, createWsTracker)"]
    },
    {
      topicTitle: "Modular monolith",
      anchorId: "m03-p4-topic-modular-monolith",
      explanationHeadings: [
        "10. Modular Monolith: Clean Domain Boundaries Without Network Tax",
        "2. Modular Monolith & Connection Pool Architecture"
      ],
      exampleTitles: ["Example 3: Bounded Database Connection Pool (`createConnectionPool`)"],
      interviewQuestionIds: ["m03-p4-iq-5", "m03-p4-iq-8"],
      exerciseTitles: ["Exercise 2: Lightweight DI Container & WebSocket Heartbeat Tracker (createContainer, createWsTracker)"]
    },
    {
      topicTitle: "Backend design patterns",
      anchorId: "m03-p4-topic-backend-design-patterns",
      explanationHeadings: ["11. Backend Design Patterns: Controller-Service-Repository, Outbox & Circuit Breaker"],
      exampleTitles: ["Example 3: Bounded Database Connection Pool (`createConnectionPool`)"],
      interviewQuestionIds: ["m03-p4-iq-8"],
      exerciseTitles: ["Exercise 2: Lightweight DI Container & WebSocket Heartbeat Tracker (createContainer, createWsTracker)"]
    },
    {
      topicTitle: "Dependency injection",
      anchorId: "m03-p4-topic-dependency-injection",
      explanationHeadings: ["12. Dependency Injection: Decoupling Wiring From Business Logic"],
      exampleTitles: ["Example 3: Bounded Database Connection Pool (`createConnectionPool`)"],
      interviewQuestionIds: ["m03-p4-iq-6"],
      exerciseTitles: ["Exercise 2: Lightweight DI Container & WebSocket Heartbeat Tracker (createContainer, createWsTracker)"]
    },
    {
      topicTitle: "Testing",
      anchorId: "m03-p4-topic-testing",
      explanationHeadings: ["13. Testing: Backend Testing Pyramid & Deterministic Isolation"],
      exampleTitles: ["Example 2: Keyset Cursor Pagination + Allowlisted Filter & Sort Builder (`buildCursorListSpec`)"],
      interviewQuestionIds: ["m03-p4-iq-6"],
      exerciseTitles: ["Exercise 2: Lightweight DI Container & WebSocket Heartbeat Tracker (createContainer, createWsTracker)"]
    },
    {
      topicTitle: "Unit tests",
      anchorId: "m03-p4-topic-unit-tests",
      explanationHeadings: ["14. Unit Tests: Fast Verification of Services, Rules & Edge Cases"],
      exampleTitles: ["Example 2: Keyset Cursor Pagination + Allowlisted Filter & Sort Builder (`buildCursorListSpec`)"],
      interviewQuestionIds: ["m03-p4-iq-6"],
      exerciseTitles: ["Exercise 2: Lightweight DI Container & WebSocket Heartbeat Tracker (createContainer, createWsTracker)"]
    },
    {
      topicTitle: "Integration tests",
      anchorId: "m03-p4-topic-integration-tests",
      explanationHeadings: ["15. Integration Tests: Real Database Queries, Migrations & Constraints"],
      exampleTitles: ["Example 3: Bounded Database Connection Pool (`createConnectionPool`)"],
      interviewQuestionIds: ["m03-p4-iq-6"],
      exerciseTitles: ["Exercise 2: Lightweight DI Container & WebSocket Heartbeat Tracker (createContainer, createWsTracker)"]
    },
    {
      topicTitle: "API tests",
      anchorId: "m03-p4-topic-api-tests",
      explanationHeadings: ["16. API Tests: End-to-End HTTP Contracts, Auth & Error Shapes"],
      exampleTitles: ["Example 2: Keyset Cursor Pagination + Allowlisted Filter & Sort Builder (`buildCursorListSpec`)"],
      interviewQuestionIds: ["m03-p4-iq-6"],
      exerciseTitles: ["Exercise 1: Magic-Byte File Upload Validator (validateUpload)"]
    },
    {
      topicTitle: "Performance optimization",
      anchorId: "m03-p4-topic-performance-optimization",
      explanationHeadings: ["17. Performance Optimization: Profiling, N+1 Elimination & Caching"],
      exampleTitles: ["Example 3: Bounded Database Connection Pool (`createConnectionPool`)"],
      interviewQuestionIds: ["m03-p4-iq-2", "m03-p4-iq-8"],
      exerciseTitles: ["Exercise 2: Lightweight DI Container & WebSocket Heartbeat Tracker (createContainer, createWsTracker)"]
    }
  ],
  codeTests: [
    {
      blockIndex: 1,
      label: "Example 2: buildCursorListSpec",
      expectedStdoutIncludes: ["SQL:", "Params count: 5"],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`buildCursorListSpec({ tenantId: "t1", limit: 101 });`), RangeError);
        assert.throws(() => run(`buildCursorListSpec({ tenantId: "t1", sortBy: "bad; DROP" });`), RangeError);
        assert.throws(() => run(`buildCursorListSpec({ tenantId: "t1", status: "hacked" });`), RangeError);
        assert.equal(
          String(run(`return buildCursorListSpec({ tenantId: "t1", limit: 10 }).sql;`)).includes("id DESC LIMIT"),
          true
        );
      },
      safetyMutations: [
        {
          description: "Removing limit <= 100 cap allows unbounded 100000-row queries",
          mutateCode: (raw) => raw.replace(/\|\| limit > 100/, ""),
          verifyProtection: (run) => {
            assert.throws(() => run(`buildCursorListSpec({ tenantId: "t1", limit: 50000 });`), RangeError);
          }
        }
      ]
    },
    {
      blockIndex: 2,
      label: "Example 3: createConnectionPool",
      expectedStdoutIncludes: ["Reused c1? true | Pool stats:"],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`createConnectionPool(0);`), TypeError);
        assert.throws(() => run(`const p = createConnectionPool(1); p.acquire(); p.acquire();`), /exhausted/);
        assert.throws(() => run(`const p = createConnectionPool(1); p.release({});`), /unowned/);
      },
      safetyMutations: [
        {
          description: "Removing pool exhaustion error allows unbounded connections past maxSize",
          mutateCode: (raw) =>
            raw.replace(/throw new Error\("Pool exhausted \(max=" \+ maxSize \+ "\)"\);/, "return { id: 'leaked' };"),
          verifyProtection: (run) => {
            assert.throws(() => run(`const p = createConnectionPool(1); p.acquire(); p.acquire();`), /exhausted/);
          }
        }
      ]
    },
    {
      blockIndex: 3,
      label: "Example 4: createJobQueue",
      expectedStdoutIncludes: ["Dup blocked? true", "| Step 3:", "| Summary:"],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`createJobQueue(0, 10);`), TypeError);
        assert.throws(() => run(`createJobQueue(2, 10).enqueue("", {});`), TypeError);
        assert.equal(
          run(`const q = createJobQueue(2, 10); q.enqueue("k1", {}); return q.processNext(() => "ok").status;`),
          "completed"
        );
      },
      safetyMutations: [
        {
          description: "Removing seenKeys duplicate check enqueues duplicate idempotent jobs",
          mutateCode: (raw) => raw.replace(/if \(seenKeys\.has\(idempotencyKey\)\) return \{ queued: false, reason: "duplicate" \};/, "/* dedup removed */"),
          verifyProtection: (run) => {
            assert.equal(run(`const q = createJobQueue(2, 10); q.enqueue("k1", {}); return q.enqueue("k1", {}).queued;`), false);
          }
        }
      ]
    },
    {
      blockIndex: 4,
      label: "Exercise 1: validateUpload",
      expectedStdoutIncludes: ["Valid PNG? true | Spoofed blocked? true"],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`validateUpload({ sizeBytes: 10, maxBytes: NaN, magicBytes: new Uint8Array([1,2,3,4]), declaredMime: "image/png" });`), TypeError);
        assert.throws(() => run(`validateUpload({ sizeBytes: 0, magicBytes: new Uint8Array([1,2,3,4]), declaredMime: "image/png" });`), RangeError);
        assert.throws(() => run(`validateUpload({ sizeBytes: 10, magicBytes: "bad", declaredMime: "image/png" });`), TypeError);
        assert.equal(
          String(run(`return validateUpload({ sizeBytes: 10, magicBytes: new Uint8Array([0x25, 0x50, 0x44, 0x46]), declaredMime: "application/pdf" }).storageKey;`)).startsWith("uploads/"),
          true
        );
      },
      safetyMutations: [
        {
          description: "Removing maxBytes check accepts oversized DoS uploads",
          mutateCode: (raw) => raw.replace(/\|\| sizeBytes > maxBytes/, ""),
          verifyProtection: (run) => {
            assert.throws(
              () => run(`validateUpload({ sizeBytes: 99999999, maxBytes: 1000, magicBytes: new Uint8Array([0x89,0x50,0x4e,0x47]), declaredMime: "image/png" });`),
              RangeError
            );
          }
        }
      ]
    },
    {
      blockIndex: 5,
      label: "Exercise 2: createContainer & createWsTracker",
      expectedStdoutIncludes: ["DI wired? true | Pruned at 7000ms:"],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => {
          run(`const d = createContainer(); d.register("a", (x) => x.resolve("b")); d.register("b", (x) => x.resolve("a")); d.resolve("a");`);
        }, /Circular dependency/);
        assert.throws(() => run(`createWsTracker(0);`), TypeError);
      },
      safetyMutations: [
        {
          description: "Removing circular dependency guard causes infinite recursion",
          mutateCode: (raw) => raw.replace(/if \(resolving\.has\(name\)\) throw new Error\("Circular dependency detected: " \+ name\);/, "/* guard removed */"),
          verifyProtection: (run) => {
            assert.throws(() => {
              run(`const d = createContainer(); d.register("a", (x) => x.resolve("b")); d.register("b", (x) => x.resolve("a")); d.resolve("a");`);
            }, /Circular dependency/);
          }
        }
      ]
    }
  ]
};
