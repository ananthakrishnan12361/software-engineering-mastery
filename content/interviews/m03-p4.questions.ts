import type { InterviewQuestion } from "@/entities/handbook";

export const m03p4Questions: InterviewQuestion[] = [
  {
    id: "m03-p4-iq-1",
    moduleNumber: 3,
    lessonId: "m03-p4",
    number: 1,
    question: "Why does OFFSET pagination get slow on large tables, and how does keyset (cursor) pagination fix it?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "The OFFSET Problem",
        body: "`LIMIT 20 OFFSET 100000` forces the database to locate, sort, and discard the first 100,000 matching rows before returning 20—so latency grows linearly with page depth, and concurrent inserts can shift rows causing duplicates or skips."
      },
      {
        label: "Keyset (Cursor) Solution",
        body: "Keyset pagination filters directly past the last seen item (`WHERE (created_at, id) < ($1, $2) ORDER BY created_at DESC, id DESC LIMIT 20`), using a composite B-tree index seek in `O(log n)` regardless of how deep the user scrolls."
      }
    ]
  },
  {
    id: "m03-p4-iq-2",
    moduleNumber: 3,
    lessonId: "m03-p4",
    number: 2,
    question: "Why should backend services use a bounded Database Connection Pool instead of opening a connection per HTTP request?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Direct Answer",
        body: "Creating a new TCP + TLS + Postgres authentication handshake on every request adds tens of milliseconds of latency and quickly exhausts the database server's `max_connections` limit under concurrent traffic."
      },
      {
        label: "Pool Hygiene",
        body: "A connection pool reuses warm sockets, queues bursts up to a timeout, and caps active connections (`instances * poolMax <= dbMaxConnections`). Always release acquired connections in a `finally` block so exceptions never leak slots."
      }
    ]
  },
  {
    id: "m03-p4-iq-3",
    moduleNumber: 3,
    lessonId: "m03-p4",
    number: 3,
    question: "How do you design a background job queue for at-least-once delivery, retries, and poison-pill failures?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "Idempotency First",
        body: "Because distributed queues (BullMQ, SQS) guarantee at-least-once delivery, a worker crashing right after sending an email or charging a card can re-run the job. Every handler must be idempotent via an `idempotencyKey` or DB unique constraint."
      },
      {
        label: "Backoff & DLQ",
        body: "Retry transient errors with exponential backoff plus random jitter (to prevent thundering herds), and move jobs exceeding `maxAttempts` into a Dead-Letter Queue (DLQ) with alerting so poison pills do not block healthy jobs."
      }
    ]
  },
  {
    id: "m03-p4-iq-4",
    moduleNumber: 3,
    lessonId: "m03-p4",
    number: 4,
    question: "What is the safest and most scalable way to handle large file uploads in a Node.js backend?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "Pre-Signed Direct Uploads",
        body: "Have the Node API authenticate/authorize the user and return a short-lived pre-signed S3/GCS URL so the browser uploads gigabytes directly to object storage without consuming Node memory or event-loop bandwidth."
      },
      {
        label: "Validation When Proxying",
        body: "When files must pass through Node, stream them with strict byte limits, inspect binary **magic bytes** rather than trusting file extensions or `Content-Type`, rename to generated UUIDs, and serve downloads with `Content-Disposition: attachment`."
      }
    ]
  },
  {
    id: "m03-p4-iq-5",
    moduleNumber: 3,
    lessonId: "m03-p4",
    number: 5,
    question: "Compare a Modular Monolith vs. Microservices—when should a team choose each?",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Modular Monolith",
        body: "A Modular Monolith runs in one deployable unit while enforcing strict module boundaries (`orders/`, `billing/`) with public interfaces and isolated tables. It preserves fast in-process calls, single-DB ACID transactions, and simple debugging."
      },
      {
        label: "Microservices Trade-Offs",
        body: "Microservices solve organizational independence (many teams deploying separately) and heterogeneous resource scaling, at the cost of network latency, distributed tracing, partial failures, and eventual consistency (Sagas/Outbox). Start with a Modular Monolith and extract only proven bottlenecks."
      }
    ]
  },
  {
    id: "m03-p4-iq-6",
    moduleNumber: 3,
    lessonId: "m03-p4",
    number: 6,
    question: "How do Dependency Injection and the Testing Pyramid (Unit, Integration, API tests) work together in Node.js?",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Constructor/Factory DI",
        body: "Injecting repositories, queues, and clocks into service constructors decouples business logic from concrete Postgres or Redis clients—allowing millisecond unit tests with in-memory fakes."
      },
      {
        label: "Real DB Integration & API Tests",
        body: "Pair unit tests with integration tests running real SQL migrations and constraints against ephemeral Postgres/Redis containers (Testcontainers), plus API tests verifying Express middleware, auth (`401`/`403`), Zod validation (`422`), and error shapes."
      }
    ]
  },
  {
    id: "m03-p4-iq-7",
    moduleNumber: 3,
    lessonId: "m03-p4",
    number: 7,
    question: "How do you scale WebSockets horizontally across multiple Node.js instances and keep connections healthy?",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Cross-Instance Fan-Out",
        body: "Because a WebSocket TCP connection terminates on one specific Node process, broadcasting a room message across 10 pods requires a shared pub/sub backplane (such as Redis Pub/Sub or Kafka) so every pod forwards messages to its local connected clients."
      },
      {
        label: "Health & Abuse Controls",
        body: "Authenticate the HTTP upgrade handshake, send periodic ping/pong heartbeats to prune dead half-open sockets, and enforce per-socket payload size limits and message rate limits."
      }
    ]
  },
  {
    id: "m03-p4-iq-8",
    moduleNumber: 3,
    lessonId: "m03-p4",
    number: 8,
    question: "Architect a high-performance, resilient Node.js backend for an order-processing and real-time notification platform.",
    difficulty: "senior-architect",
    numberedSteps: [
      { title: "Modular Monolith Core", body: "Start with a Modular Monolith (`orders`, `billing`, `notifications`) using explicit public APIs and constructor Dependency Injection." },
      { title: "Bounded DB Pools", body: "Configure per-pod PostgreSQL connection pools (`instances * max <= dbMaxConnections`) with `try/finally` releases and PgBouncer if needed." },
      { title: "Cursor Pagination & Indexes", body: "Serve list endpoints via `(created_at, id)` keyset pagination, allowlisted filters/sorts, and composite tenant indexes." },
      { title: "Transactional Outbox", body: "Write the order row and an outbox event in one ACID database transaction so state and async events never drift apart." },
      { title: "Idempotent Job Queues", body: "Process receipts, webhooks, and PDFs in BullMQ/SQS workers using idempotency keys, exponential backoff + jitter, and a DLQ." },
      { title: "Pre-Signed File Uploads", body: "Issue short-lived pre-signed S3 URLs for attachments so large binaries bypass Node.js memory and event loop." },
      { title: "Scaled WebSockets", body: "Push live order updates over WebSockets backed by Redis Pub/Sub across pods, with heartbeat pruning and per-socket rate limits." },
      { title: "Resilient Outbound Calls", body: "Wrap external payment/shipping APIs with `AbortSignal.timeout()`, bounded retries on safe calls, and Circuit Breakers." },
      { title: "Eliminate N+1 & Cache", body: "Batch DB reads (`WHERE id = ANY($1)`), cache hot reference data in Redis, and verify hot queries with `EXPLAIN ANALYZE`." },
      { title: "Event Loop Protection", body: "Keep all routes non-blocking, offload heavy CPU work to `worker_threads`, and alert on `monitorEventLoopDelay()` p99 spikes." },
      { title: "3-Layer Test Suite", body: "Run fast DI unit tests, Testcontainers Postgres/Redis integration tests, and Supertest HTTP API contract tests in CI." },
      { title: "Graceful Shutdown", body: "On `SIGTERM`, stop HTTP/WS accepts, drain in-flight requests and worker jobs, and close DB pools cleanly." }
    ]
  }
];
