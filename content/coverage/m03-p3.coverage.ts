import assert from "node:assert/strict";
import type { LessonCoverageSpec } from "./types";

export const m03p3Coverage: LessonCoverageSpec = {
  lessonId: "m03-p3",
  moduleNumber: 3,
  mdxPath: "content/modules/03-nodejs/m03-p3.mdx",
  topics: [
    {
      topicTitle: "Authentication",
      anchorId: "m03-p3-topic-authentication",
      explanationHeadings: ["1. Authentication: Proving Identity & Hashing Passwords Properly"],
      exampleTitles: ["Example 2: Rotating Refresh Token Store With Reuse Detection (`createRefreshTokenStore`)"],
      interviewQuestionIds: ["m03-p3-iq-1", "m03-p3-iq-8"],
      exerciseTitles: ["Exercise 2: Constant-Time Comparator & Control-Char Input Sanitizer (constantTimeEqual, sanitizeInput)"]
    },
    {
      topicTitle: "JWT",
      anchorId: "m03-p3-topic-jwt",
      explanationHeadings: ["2. JWT (JSON Web Tokens): Signed Claims, Not Encrypted Secrets"],
      exampleTitles: ["Example 2: Rotating Refresh Token Store With Reuse Detection (`createRefreshTokenStore`)"],
      interviewQuestionIds: ["m03-p3-iq-1"],
      exerciseTitles: ["Exercise 1: JWT Claims Verifier & RBAC Guard (verifyJwtClaims, hasPermission)"]
    },
    {
      topicTitle: "Refresh tokens",
      anchorId: "m03-p3-topic-refresh-tokens",
      explanationHeadings: [
        "3. Refresh Tokens: Rotation & Reuse Detection",
        "1. Rotating Refresh Token Family & RBAC Authorization Flow"
      ],
      exampleTitles: ["Example 2: Rotating Refresh Token Store With Reuse Detection (`createRefreshTokenStore`)"],
      interviewQuestionIds: ["m03-p3-iq-5"],
      exerciseTitles: ["Exercise 1: JWT Claims Verifier & RBAC Guard (verifyJwtClaims, hasPermission)"]
    },
    {
      topicTitle: "Session management",
      anchorId: "m03-p3-topic-session-management",
      explanationHeadings: ["4. Session Management: Stateful Server Sessions vs. Stateless Tokens"],
      exampleTitles: ["Example 2: Rotating Refresh Token Store With Reuse Detection (`createRefreshTokenStore`)"],
      interviewQuestionIds: ["m03-p3-iq-5", "m03-p3-iq-8"],
      exerciseTitles: ["Exercise 1: JWT Claims Verifier & RBAC Guard (verifyJwtClaims, hasPermission)"]
    },
    {
      topicTitle: "Authorization",
      anchorId: "m03-p3-topic-authorization",
      explanationHeadings: ["5. Authorization: Stopping Broken Object-Level Access (BOLA / IDOR)"],
      exampleTitles: ["Example 4: Parameterized SQL Query Builder & NoSQL Filter Guard (`buildOrderSearchSql`, `sanitizeNoSqlFilter`)"],
      interviewQuestionIds: ["m03-p3-iq-4"],
      exerciseTitles: ["Exercise 1: JWT Claims Verifier & RBAC Guard (verifyJwtClaims, hasPermission)"]
    },
    {
      topicTitle: "RBAC",
      anchorId: "m03-p3-topic-rbac",
      explanationHeadings: ["6. RBAC: Roles, Permissions & Principle of Least Privilege"],
      exampleTitles: ["Example 2: Rotating Refresh Token Store With Reuse Detection (`createRefreshTokenStore`)"],
      interviewQuestionIds: ["m03-p3-iq-4", "m03-p3-iq-8"],
      exerciseTitles: ["Exercise 1: JWT Claims Verifier & RBAC Guard (verifyJwtClaims, hasPermission)"]
    },
    {
      topicTitle: "OAuth fundamentals",
      anchorId: "m03-p3-topic-oauth-fundamentals",
      explanationHeadings: ["7. OAuth Fundamentals: Delegated Authorization, PKCE & OIDC"],
      exampleTitles: ["Example 2: Rotating Refresh Token Store With Reuse Detection (`createRefreshTokenStore`)"],
      interviewQuestionIds: ["m03-p3-iq-6"],
      exerciseTitles: ["Exercise 1: JWT Claims Verifier & RBAC Guard (verifyJwtClaims, hasPermission)"]
    },
    {
      topicTitle: "Rate limiting",
      anchorId: "m03-p3-topic-rate-limiting",
      explanationHeadings: [
        "8. Rate Limiting: Protecting Endpoints From Brute Force & DoS",
        "2. API Security Perimeter: CORS, Rate Limiting & Injection Defense"
      ],
      exampleTitles: ["Example 3: Token-Bucket Rate Limiter & Strict CORS Policy (`createRateLimiter`, `evaluateCors`)"],
      interviewQuestionIds: ["m03-p3-iq-9"],
      exerciseTitles: ["Exercise 2: Constant-Time Comparator & Control-Char Input Sanitizer (constantTimeEqual, sanitizeInput)"]
    },
    {
      topicTitle: "CORS",
      anchorId: "m03-p3-topic-cors",
      explanationHeadings: ["9. CORS: Browser Same-Origin Exceptions Without Wildcard Traps"],
      exampleTitles: ["Example 3: Token-Bucket Rate Limiter & Strict CORS Policy (`createRateLimiter`, `evaluateCors`)"],
      interviewQuestionIds: ["m03-p3-iq-7"],
      exerciseTitles: ["Exercise 2: Constant-Time Comparator & Control-Char Input Sanitizer (constantTimeEqual, sanitizeInput)"]
    },
    {
      topicTitle: "Security",
      anchorId: "m03-p3-topic-security",
      explanationHeadings: ["10. Security: Defense-in-Depth & HTTP Security Headers"],
      exampleTitles: ["Example 3: Token-Bucket Rate Limiter & Strict CORS Policy (`createRateLimiter`, `evaluateCors`)"],
      interviewQuestionIds: ["m03-p3-iq-9"],
      exerciseTitles: ["Exercise 2: Constant-Time Comparator & Control-Char Input Sanitizer (constantTimeEqual, sanitizeInput)"]
    },
    {
      topicTitle: "Input sanitization",
      anchorId: "m03-p3-topic-input-sanitization",
      explanationHeadings: ["11. Input Sanitization: Validation First, Context-Aware Escaping"],
      exampleTitles: ["Example 4: Parameterized SQL Query Builder & NoSQL Filter Guard (`buildOrderSearchSql`, `sanitizeNoSqlFilter`)"],
      interviewQuestionIds: ["m03-p3-iq-9"],
      exerciseTitles: ["Exercise 2: Constant-Time Comparator & Control-Char Input Sanitizer (constantTimeEqual, sanitizeInput)"]
    },
    {
      topicTitle: "SQL injection",
      anchorId: "m03-p3-topic-sql-injection",
      explanationHeadings: ["12. SQL Injection: Parameterized Queries & Identifier Allowlists"],
      exampleTitles: ["Example 4: Parameterized SQL Query Builder & NoSQL Filter Guard (`buildOrderSearchSql`, `sanitizeNoSqlFilter`)"],
      interviewQuestionIds: ["m03-p3-iq-2"],
      exerciseTitles: ["Exercise 2: Constant-Time Comparator & Control-Char Input Sanitizer (constantTimeEqual, sanitizeInput)"]
    },
    {
      topicTitle: "NoSQL injection",
      anchorId: "m03-p3-topic-nosql-injection",
      explanationHeadings: ["13. NoSQL Injection: Blocking Operator Objects & `$where` Execution"],
      exampleTitles: ["Example 4: Parameterized SQL Query Builder & NoSQL Filter Guard (`buildOrderSearchSql`, `sanitizeNoSqlFilter`)"],
      interviewQuestionIds: ["m03-p3-iq-3"],
      exerciseTitles: ["Exercise 2: Constant-Time Comparator & Control-Char Input Sanitizer (constantTimeEqual, sanitizeInput)"]
    },
    {
      topicTitle: "API security",
      anchorId: "m03-p3-topic-api-security",
      explanationHeadings: ["14. API Security: Complete OWASP API Defense Checklist"],
      exampleTitles: ["Example 3: Token-Bucket Rate Limiter & Strict CORS Policy (`createRateLimiter`, `evaluateCors`)"],
      interviewQuestionIds: ["m03-p3-iq-4", "m03-p3-iq-9"],
      exerciseTitles: ["Exercise 1: JWT Claims Verifier & RBAC Guard (verifyJwtClaims, hasPermission)"]
    }
  ],
  codeTests: [
    {
      blockIndex: 1,
      label: "Example 2: createRefreshTokenStore",
      expectedStdoutIncludes: ["Rotated ok? true | Replay blocked? true | Family active? false"],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`createRefreshTokenStore().issueInitial("");`), TypeError);
        assert.equal(run(`return createRefreshTokenStore().rotate("missing").ok;`), false);
        assert.equal(
          run(`const s = createRefreshTokenStore(); const a = s.issueInitial("u"); const b = s.rotate(a.token); s.rotate(a.token); return s.rotate(b.token).ok;`),
          false
        );
      },
      safetyMutations: [
        {
          description: "Removing token reuse revocation allows replayed old tokens and active family",
          mutateCode: (raw) =>
            raw.replace(/revokedFamilies\.add\(record\.familyId\);\s*return \{ ok: false, reason: "Token reuse detected; family revoked" \};/, "/* reuse check removed */"),
          verifyProtection: (run) => {
            assert.equal(
              run(`const s = createRefreshTokenStore(); const a = s.issueInitial("u"); s.rotate(a.token); return s.rotate(a.token).ok;`),
              false
            );
          }
        }
      ]
    },
    {
      blockIndex: 2,
      label: "Example 3: createRateLimiter & evaluateCors",
      expectedStdoutIncludes: ["Req 1: true | Req 2: true | Req 3: false", "CORS null origin blocked? true | Evil blocked? true"],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`createRateLimiter({ capacity: 0, refillPerMs: 1 });`), TypeError);
        assert.throws(() => run(`evaluateCors("null", "bad");`), TypeError);
        assert.equal(run(`const s = new Set(["https:" + "//app.acme.dev"]); return evaluateCors("https:" + "//app.acme.dev", s).allow;`), true);
        assert.equal(run(`const s = new Set(["https:" + "//app.acme.dev"]); return evaluateCors("null", s).allow;`), false);
      },
      safetyMutations: [
        {
          description: "Removing 'null' origin rejection allows sandboxed iframe CORS bypass if allowlisted",
          mutateCode: (raw) => raw.replace(/origin === "null" \|\| /, ""),
          verifyProtection: (run) => {
            assert.equal(run(`const s = new Set(["null"]); return evaluateCors("null", s).allow;`), false);
          }
        }
      ]
    },
    {
      blockIndex: 3,
      label: "Example 4: buildOrderSearchSql & sanitizeNoSqlFilter",
      expectedStdoutIncludes: ["SQL:", "Safe NoSQL:"],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`buildOrderSearchSql({ tenantId: "t1", status: "open", sortBy: "id; DROP TABLE orders" });`), RangeError);
        assert.throws(() => run(`sanitizeNoSqlFilter({ email: { $ne: null } }, ["email"]);`), TypeError);
        assert.equal(run(`return Object.getPrototypeOf(sanitizeNoSqlFilter({ email: "a@b.c" }, ["email"]));`), null);
      },
      safetyMutations: [
        {
          description: "Removing non-primitive check allows MongoDB $ne operator object injection",
          mutateCode: (raw) =>
            raw.replace(/if \(typeof val !== "string" && typeof val !== "number" && typeof val !== "boolean"\)\s*\{[^}]*\}/, "/* check removed */"),
          verifyProtection: (run) => {
            assert.throws(() => run(`sanitizeNoSqlFilter({ email: { $ne: null } }, ["email"]);`), TypeError);
          }
        }
      ]
    },
    {
      blockIndex: 4,
      label: "Exercise 1: verifyJwtClaims & hasPermission",
      expectedStdoutIncludes: ["alg:none blocked? true | RS256 ok? true | Admin write? true"],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`verifyJwtClaims(null, { allowedAlgs: ["RS256"] });`), TypeError);
        assert.equal(
          run(`return verifyJwtClaims({ header: { alg: "RS256" }, payload: { iss: "auth", aud: "api", exp: 500 } }, { allowedAlgs: ["RS256"], issuer: "auth", audience: "api", nowSec: 1000 }).valid;`),
          false
        );
        assert.equal(
          run(`const r = new Map([["viewer", new Set(["orders:read"])]]); return hasPermission(["viewer"], r, "orders:write");`),
          false
        );
      },
      safetyMutations: [
        {
          description: "Removing alg === 'none' check allows unsigned JWT if allowlist is misconfigured",
          mutateCode: (raw) => raw.replace(/alg === "none" \|\| /, ""),
          verifyProtection: (run) => {
            assert.equal(
              run(`return verifyJwtClaims({ header: { alg: "none" }, payload: { iss: "auth", aud: "api", exp: 2000 } }, { allowedAlgs: ["none", "RS256"], issuer: "auth", audience: "api", nowSec: 1000 }).valid;`),
              false
            );
          }
        }
      ]
    },
    {
      blockIndex: 5,
      label: "Exercise 2: constantTimeEqual & sanitizeInput",
      expectedStdoutIncludes: ["Match? true | Mismatch? true", "Sanitized: helloworld"],
      minStdoutLines: 2,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`constantTimeEqual("a", 123);`), TypeError);
        assert.equal(run(`return constantTimeEqual("abc", "abcd");`), false);
        assert.throws(() => run(`sanitizeInput(123);`), TypeError);
        assert.equal(run(`return sanitizeInput("a" + String.fromCharCode(127) + "b");`), "ab");
      },
      safetyMutations: [
        {
          description: "Removing length XOR in constantTimeEqual allows prefix match 'abc' === 'abcd'",
          mutateCode: (raw) => raw.replace(/let diff = a\.length \^ b\.length;/, "let diff = 0;"),
          verifyProtection: (run) => {
            assert.equal(run(`return constantTimeEqual("abc", "abc" + String.fromCharCode(0));`), false);
          }
        }
      ]
    }
  ]
};
