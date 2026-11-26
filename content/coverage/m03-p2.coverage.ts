import assert from "node:assert/strict";
import type { LessonCoverageSpec } from "./types";

export const m03p2Coverage: LessonCoverageSpec = {
  lessonId: "m03-p2",
  moduleNumber: 3,
  mdxPath: "content/modules/03-nodejs/m03-p2.mdx",
  topics: [
    {
      topicTitle: "Express",
      anchorId: "m03-p2-topic-express",
      explanationHeadings: ["1. Express: Minimalist HTTP Application & Router Framework"],
      exampleTitles: ["Example 2: Express-Style Middleware & `next(err)` Pipeline Simulator (`createExpressPipeline`)"],
      interviewQuestionIds: ["m03-p2-iq-1", "m03-p2-iq-9"],
      exerciseTitles: ["Exercise 1: HTTP Method Safety & Accept-Header Version Parser (classifyMethod, parseApiVersion)"]
    },
    {
      topicTitle: "Middleware",
      anchorId: "m03-p2-topic-middleware",
      explanationHeadings: [
        "2. Middleware: Composable Pipeline Stages (`next()` & `next(err)`)",
        "1. Express Request Lifecycle & Middleware Error Short-Circuiting"
      ],
      exampleTitles: ["Example 2: Express-Style Middleware & `next(err)` Pipeline Simulator (`createExpressPipeline`)"],
      interviewQuestionIds: ["m03-p2-iq-1"],
      exerciseTitles: ["Exercise 1: HTTP Method Safety & Accept-Header Version Parser (classifyMethod, parseApiVersion)"]
    },
    {
      topicTitle: "Routing",
      anchorId: "m03-p2-topic-routing",
      explanationHeadings: ["3. Routing: Path Matching, Params, Query Strings & Modular Routers"],
      exampleTitles: ["Example 2: Express-Style Middleware & `next(err)` Pipeline Simulator (`createExpressPipeline`)"],
      interviewQuestionIds: ["m03-p2-iq-3"],
      exerciseTitles: ["Exercise 1: HTTP Method Safety & Accept-Header Version Parser (classifyMethod, parseApiVersion)"]
    },
    {
      topicTitle: "REST API",
      anchorId: "m03-p2-topic-rest-api",
      explanationHeadings: ["4. REST API: Resource-Oriented Design & Statelessness"],
      exampleTitles: ["Example 3: Strict API Validator & Problem Details Normalizer (`validateOrderPayload`, `toProblemDetails`)"],
      interviewQuestionIds: ["m03-p2-iq-4"],
      exerciseTitles: ["Exercise 1: HTTP Method Safety & Accept-Header Version Parser (classifyMethod, parseApiVersion)"]
    },
    {
      topicTitle: "API design",
      anchorId: "m03-p2-topic-api-design",
      explanationHeadings: ["5. API Design: Predictable Contracts, Envelopes & Pagination"],
      exampleTitles: ["Example 3: Strict API Validator & Problem Details Normalizer (`validateOrderPayload`, `toProblemDetails`)"],
      interviewQuestionIds: ["m03-p2-iq-5", "m03-p2-iq-9"],
      exerciseTitles: ["Exercise 1: HTTP Method Safety & Accept-Header Version Parser (classifyMethod, parseApiVersion)"]
    },
    {
      topicTitle: "HTTP",
      anchorId: "m03-p2-topic-http",
      explanationHeadings: ["6. HTTP: Request/Response Wire Model, Keep-Alive & TLS"],
      exampleTitles: ["Example 2: Express-Style Middleware & `next(err)` Pipeline Simulator (`createExpressPipeline`)"],
      interviewQuestionIds: ["m03-p2-iq-2"],
      exerciseTitles: ["Exercise 1: HTTP Method Safety & Accept-Header Version Parser (classifyMethod, parseApiVersion)"]
    },
    {
      topicTitle: "HTTP methods",
      anchorId: "m03-p2-topic-http-methods",
      explanationHeadings: ["7. HTTP Methods: Safety & Idempotency Guarantees"],
      exampleTitles: ["Example 2: Express-Style Middleware & `next(err)` Pipeline Simulator (`createExpressPipeline`)"],
      interviewQuestionIds: ["m03-p2-iq-4"],
      exerciseTitles: ["Exercise 1: HTTP Method Safety & Accept-Header Version Parser (classifyMethod, parseApiVersion)"]
    },
    {
      topicTitle: "Status codes",
      anchorId: "m03-p2-topic-status-codes",
      explanationHeadings: ["8. Status Codes: Communicating Exact Outcomes to Clients"],
      exampleTitles: ["Example 3: Strict API Validator & Problem Details Normalizer (`validateOrderPayload`, `toProblemDetails`)"],
      interviewQuestionIds: ["m03-p2-iq-2"],
      exerciseTitles: ["Exercise 2: Structured JSON Logger With Secret Redaction (createApiLogger)"]
    },
    {
      topicTitle: "Headers",
      anchorId: "m03-p2-topic-headers",
      explanationHeadings: ["9. Headers: Content Negotiation, Caching, Correlation & Security"],
      exampleTitles: ["Example 2: Express-Style Middleware & `next(err)` Pipeline Simulator (`createExpressPipeline`)"],
      interviewQuestionIds: ["m03-p2-iq-6", "m03-p2-iq-7"],
      exerciseTitles: ["Exercise 1: HTTP Method Safety & Accept-Header Version Parser (classifyMethod, parseApiVersion)"]
    },
    {
      topicTitle: "Request lifecycle",
      anchorId: "m03-p2-topic-request-lifecycle",
      explanationHeadings: ["10. Request Lifecycle: End-to-End Flow & Timeout Hygiene"],
      exampleTitles: ["Example 2: Express-Style Middleware & `next(err)` Pipeline Simulator (`createExpressPipeline`)"],
      interviewQuestionIds: ["m03-p2-iq-8"],
      exerciseTitles: ["Exercise 2: Structured JSON Logger With Secret Redaction (createApiLogger)"]
    },
    {
      topicTitle: "API versioning",
      anchorId: "m03-p2-topic-api-versioning",
      explanationHeadings: ["11. API Versioning: Evolving Contracts Without Breaking Clients"],
      exampleTitles: ["Example 2: Express-Style Middleware & `next(err)` Pipeline Simulator (`createExpressPipeline`)"],
      interviewQuestionIds: ["m03-p2-iq-6"],
      exerciseTitles: ["Exercise 1: HTTP Method Safety & Accept-Header Version Parser (classifyMethod, parseApiVersion)"]
    },
    {
      topicTitle: "API validation",
      anchorId: "m03-p2-topic-api-validation",
      explanationHeadings: [
        "12. API Validation: Fail-Fast Schema Parsing at the Edge",
        "2. API Validation & RFC 9457 Problem Details Boundary"
      ],
      exampleTitles: ["Example 3: Strict API Validator & Problem Details Normalizer (`validateOrderPayload`, `toProblemDetails`)"],
      interviewQuestionIds: ["m03-p2-iq-5"],
      exerciseTitles: ["Exercise 2: Structured JSON Logger With Secret Redaction (createApiLogger)"]
    },
    {
      topicTitle: "Error handling",
      anchorId: "m03-p2-topic-error-handling",
      explanationHeadings: ["13. Error Handling: Centralized 4-Arg Handler & Safe Redaction"],
      exampleTitles: ["Example 3: Strict API Validator & Problem Details Normalizer (`validateOrderPayload`, `toProblemDetails`)"],
      interviewQuestionIds: ["m03-p2-iq-1", "m03-p2-iq-5"],
      exerciseTitles: ["Exercise 2: Structured JSON Logger With Secret Redaction (createApiLogger)"]
    },
    {
      topicTitle: "Logging",
      anchorId: "m03-p2-topic-logging",
      explanationHeadings: ["14. Logging: Structured JSON, Correlation IDs & PII Redaction"],
      exampleTitles: ["Example 3: Strict API Validator & Problem Details Normalizer (`validateOrderPayload`, `toProblemDetails`)"],
      interviewQuestionIds: ["m03-p2-iq-7"],
      exerciseTitles: ["Exercise 2: Structured JSON Logger With Secret Redaction (createApiLogger)"]
    }
  ],
  codeTests: [
    {
      blockIndex: 1,
      label: "Example 2: createExpressPipeline",
      expectedStdoutIncludes: ["Trace:", "| Res: 400"],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`createExpressPipeline().use("bad");`), TypeError);
        assert.throws(() => run(`createExpressPipeline().handle(null);`), TypeError);
        assert.equal(run(`const p = createExpressPipeline(); return p.handle({ path: "/missing" }).statusCode;`), 404);
      },
      safetyMutations: [
        {
          description: "Removing error handler length === 4 filter sends errors to regular middleware",
          mutateCode: (raw) => raw.replace(/if \(err && !isErrorHandler\) continue;/, "/* skip removed */"),
          verifyProtection: (run) => {
            assert.equal(
              run(`const p = createExpressPipeline(); p.use((_q, _s, n) => n(new Error("boom"))); p.use((_q, s, n) => { s.status(200).json({ ok: true }); n(); }); p.use((e, _q, s, _n) => s.status(400).json({ err: e.message })); return p.handle({ path: "/" }).statusCode;`),
              400
            );
          }
        }
      ]
    },
    {
      blockIndex: 2,
      label: "Example 3: validateOrderPayload & toProblemDetails",
      expectedStdoutIncludes: ["Valid:", "Mass-assign blocked:", "Redacted 500:"],
      minStdoutLines: 3,
      testValidAndInvalidInputs: (run) => {
        assert.equal(run(`return validateOrderPayload({ sku: "AB", quantity: 100 }).ok;`), true);
        assert.equal(run(`return validateOrderPayload({ sku: "AB", quantity: 101 }).status;`), 422);
        assert.equal(run(`return validateOrderPayload(null).status;`), 400);
        assert.throws(() => run(`toProblemDetails({ statusCode: 200 });`), RangeError);
        assert.equal(
          run(`return toProblemDetails({ statusCode: 500, detail: "DB_PASS", isOperational: false }).detail;`),
          "Internal server error"
        );
      },
      safetyMutations: [
        {
          description: "Removing unknown field check allows mass assignment of role",
          mutateCode: (raw) =>
            raw.replace(/if \(!allowed\.has\(key\)\) errors\.push\(\{ field: key, message: "Unknown field rejected" \}\);/, "/* allowed check removed */"),
          verifyProtection: (run) => {
            assert.equal(run(`return validateOrderPayload({ sku: "AB", quantity: 1, role: "admin" }).ok;`), false);
          }
        },
        {
          description: "Removing isOperational check leaks internal 500 error details",
          mutateCode: (raw) =>
            raw.replace(/isOperational \? String\(detail \|\| "Request failed"\) : "Internal server error"/, 'String(detail || "Request failed")'),
          verifyProtection: (run) => {
            assert.equal(
              run(`return toProblemDetails({ statusCode: 500, detail: "SECRET_SQL", isOperational: false }).detail;`),
              "Internal server error"
            );
          }
        }
      ]
    },
    {
      blockIndex: 3,
      label: "Exercise 1: classifyMethod & parseApiVersion",
      expectedStdoutIncludes: ["PUT:", "| POST:", "Version: 2"],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`classifyMethod("");`), TypeError);
        assert.throws(() => run(`classifyMethod("FOO");`), RangeError);
        assert.equal(run(`return parseApiVersion("");`), 1);
        assert.throws(() => run(`parseApiVersion("application/vnd.acme.v0+json");`), RangeError);
      },
      safetyMutations: [
        {
          description: "Removing non-positive API version check accepts v0",
          mutateCode: (raw) =>
            raw.replace(/if \(!Number\.isInteger\(ver\) \|\| ver < 1\) throw new RangeError\("Invalid API version"\);/, "/* guard removed */"),
          verifyProtection: (run) => {
            assert.throws(() => run(`parseApiVersion("application/vnd.acme.v0+json");`), RangeError);
          }
        }
      ]
    },
    {
      blockIndex: 4,
      label: "Exercise 2: createApiLogger",
      expectedStdoutIncludes: ["Log:", "[REDACTED]"],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`createApiLogger().formatEntry({ requestId: "" });`), TypeError);
        assert.equal(
          String(run(`return createApiLogger().formatEntry({ requestId: "r1", headers: { Cookie: "sid=abc" } });`)).includes("sid=abc"),
          false
        );
      },
      safetyMutations: [
        {
          description: "Removing case-insensitive header redaction logs raw Authorization secret",
          mutateCode: (raw) =>
            raw.replace(/sensitive\.has\(k\.toLowerCase\(\)\) \? "\[REDACTED\]" : v/, "v"),
          verifyProtection: (run) => {
            assert.equal(
              String(run(`return createApiLogger().formatEntry({ requestId: "r1", headers: { Authorization: "Bearer topsecret" } });`)).includes("topsecret"),
              false
            );
          }
        }
      ]
    }
  ]
};
