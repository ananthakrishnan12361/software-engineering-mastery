import type { InterviewQuestion } from "@/entities/handbook";

export const m03p2Questions: InterviewQuestion[] = [
  {
    id: "m03-p2-iq-1",
    moduleNumber: 3,
    lessonId: "m03-p2",
    number: 1,
    question: "How does Express distinguish regular middleware from error-handling middleware?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Direct Answer",
        body: "Express inspects `fn.length` (the function's declared parameter count). Regular middleware takes 3 parameters `(req, res, next)`, whereas error-handling middleware must declare 4 parameters `(err, req, res, next)`."
      },
      {
        label: "Routing Behavior",
        body: "When any middleware calls `next(err)` (or throws synchronously, or rejects in Express 5), Express skips all remaining 3-argument middleware and route handlers and jumps straight to the next 4-argument error handler."
      }
    ]
  },
  {
    id: "m03-p2-iq-2",
    moduleNumber: 3,
    lessonId: "m03-p2",
    number: 2,
    question: "Why should you never return HTTP 200 OK for API errors, and when do you use 400 vs 422 vs 401 vs 403?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Accurate Status Codes",
        body: "Returning `200 OK` with `{ error: ... }` breaks HTTP clients, retry logic, CDN caching, and automated uptime monitoring. Use `400 Bad Request` for malformed JSON/syntax, `422 Unprocessable Content` for valid JSON failing semantic/field validation, `401 Unauthorized` for missing/invalid authentication, and `403 Forbidden` for insufficient permissions."
      },
      {
        label: "Server Failures",
        body: "Use `500 Internal Server Error` for unexpected bugs (with stack traces redacted from the response) and `503 Service Unavailable` when an upstream dependency is temporarily overloaded."
      }
    ]
  },
  {
    id: "m03-p2-iq-3",
    moduleNumber: 3,
    lessonId: "m03-p2",
    number: 3,
    question: "Why does route registration order matter in Express (e.g. /orders/export vs /orders/:id)?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Direct Answer",
        body: "Express evaluates middleware and routes sequentially in the exact order they are registered. If `/orders/:id` is registered before `/orders/export`, a `GET /orders/export` request matches `:id = \"export\"` and never reaches the export handler."
      },
      {
        label: "Rule of Thumb",
        body: "Always register specific static paths before dynamic `:param` paths, mount 404 catch-all handlers after all routes, and mount centralized 4-arg error middleware at the very end."
      }
    ]
  },
  {
    id: "m03-p2-iq-4",
    moduleNumber: 3,
    lessonId: "m03-p2",
    number: 4,
    question: "Explain HTTP method safety vs. idempotency and why they matter for retries and caching.",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "Safety vs. Idempotency",
        body: "A **safe** method (`GET`, `HEAD`, `OPTIONS`) does not modify server state. An **idempotent** method (`GET`, `HEAD`, `PUT`, `DELETE`) produces the same server state whether executed once or multiple times with the same request."
      },
      {
        label: "Practical Impact",
        body: "Proxies and clients can safely retry timed-out `GET`/`PUT`/`DELETE` calls, whereas retrying a `POST /orders` without an `Idempotency-Key` header risks creating duplicate orders or double charges."
      }
    ]
  },
  {
    id: "m03-p2-iq-5",
    moduleNumber: 3,
    lessonId: "m03-p2",
    number: 5,
    question: "How do you structure API validation and centralized error handling to prevent mass assignment and stack leaks?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "Edge Validation",
        body: "Validate `req.body`, `req.params`, and `req.query` at the route boundary using a strict schema (e.g. `z.object(...).strict()`), rejecting unknown fields so callers cannot inject `{ role: \"admin\" }`."
      },
      {
        label: "Operational vs. Programmer Errors",
        body: "Throw typed `AppError` instances for operational `4xx` cases, and let a single 4-arg Express error middleware format RFC 9457 Problem Details—returning safe `4xx` messages while logging full `5xx` stacks internally and returning a generic `\"Internal server error\"`."
      }
    ]
  },
  {
    id: "m03-p2-iq-6",
    moduleNumber: 3,
    lessonId: "m03-p2",
    number: 6,
    question: "Compare URI path versioning (/v1/orders) vs. Header versioning (Accept: application/vnd.acme.v2+json).",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "URI Path Versioning",
        body: "Putting `/v1/` or `/v2/` in the URL path is explicit, easy to route in Express/gateways, simple to test in curl/browsers, and naturally separated in CDN caches."
      },
      {
        label: "Header Versioning",
        body: "Media-type or custom-header versioning keeps resource URIs clean and REST-pure, but requires `Vary: Accept` for caching and extra tooling to test. Regardless of style, prefer backward-compatible additive changes first and emit `Deprecation`/`Sunset` headers before retiring versions."
      }
    ]
  },
  {
    id: "m03-p2-iq-7",
    moduleNumber: 3,
    lessonId: "m03-p2",
    number: 7,
    question: "How do you design production structured logging and request correlation across an Express microservice?",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Correlation & Lifecycle Timing",
        body: "Read an incoming `X-Request-Id` header (or generate a UUID if missing), echo it on the response, store it in `AsyncLocalStorage` / `res.locals`, and emit a single-line JSON log on `res.on(\"finish\")` with `method`, `path`, `statusCode`, and `durationMs`."
      },
      {
        label: "Security & Performance",
        body: "Use a fast async JSON logger (`pino`), configure serializer redaction for `authorization`, `cookie`, `set-cookie`, `password`, and tokens, and strip newlines from user-controlled strings to prevent log injection."
      }
    ]
  },
  {
    id: "m03-p2-iq-8",
    moduleNumber: 3,
    lessonId: "m03-p2",
    number: 8,
    question: "What happens in an Express request lifecycle when a client disconnects mid-request, and how do you avoid wasted DB/API work?",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Client Abort Detection",
        body: "If a mobile client cancels a slow search or closes the tab before the response finishes, Node fires `close` on the response (`res.on(\"close\")`) while `res.writableEnded` is still `false`. (Avoid `req.on(\"close\")` in Node 16+, which fires as soon as the request body finishes reading.)"
      },
      {
        label: "Propagating Cancellation",
        body: "Create a per-request `AbortController` in middleware, abort it when `res.on(\"close\")` fires before `res.writableEnded`, and pass `signal` into downstream `fetch()`, worker tasks, and database query cancellations to free resources immediately."
      }
    ]
  },
  {
    id: "m03-p2-iq-9",
    moduleNumber: 3,
    lessonId: "m03-p2",
    number: 9,
    question: "Design a production-ready Express REST API platform template for a multi-team backend.",
    difficulty: "senior-architect",
    numberedSteps: [
      { title: "HTTP Server Timeouts", body: "Configure `headersTimeout`, `requestTimeout`, and `keepAliveTimeout` cleanly behind the load balancer to prevent Slowloris and 502 races." },
      { title: "Request Correlation", body: "Attach `X-Request-Id` and `AsyncLocalStorage` context at the very first middleware so every log and downstream call shares one trace ID." },
      { title: "Structured JSON Logging", body: "Log `res.on('finish')` metrics via `pino` with automatic redaction of `authorization`, `cookie`, and `password` fields." },
      { title: "Bounded Body Parsing", body: "Enforce strict payload limits (`express.json({ limit: '64kb' })`) to block memory exhaustion attacks." },
      { title: "Modular Domain Routers", body: "Mount versioned `express.Router()` modules (`/v1/orders`, `/v1/users`) with static routes ordered before `:param` routes." },
      { title: "Strict Edge Validation", body: "Validate `body`, `params`, and `query` with `.strict()` Zod schemas before business logic runs, rejecting unknown properties." },
      { title: "REST & Idempotency", body: "Enforce accurate HTTP methods (`GET`/`PUT`/`DELETE` idempotent) and `Idempotency-Key` support on critical `POST` mutations." },
      { title: "Client Abort Propagation", body: "Wire a per-request `AbortController` to downstream `fetch` and DB queries when clients disconnect early." },
      { title: "Centralized Error Boundary", body: "Use Express 5 async error forwarding into one 4-arg `(err, req, res, next)` handler returning RFC 9457 Problem Details." },
      { title: "Safe 500 Redaction", body: "Log full stack traces internally with `requestId` while returning generic redacted error messages to external callers." },
      { title: "Contract & Versioning Policy", body: "Prefer additive backward-compatible fields, and use `/v2` + `Deprecation`/`Sunset` headers for breaking changes." },
      { title: "Automated API Testing", body: "Gate CI with integration tests verifying status codes, Problem Details shapes, unknown-field rejection, and secret redaction." }
    ]
  }
];
