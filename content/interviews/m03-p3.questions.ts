import type { InterviewQuestion } from "@/entities/handbook";

export const m03p3Questions: InterviewQuestion[] = [
  {
    id: "m03-p3-iq-1",
    moduleNumber: 3,
    lessonId: "m03-p3",
    number: 1,
    question: "Why should JWTs never store sensitive secrets or passwords in their payload, and which claims must be validated?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Signed, Not Encrypted",
        body: "Standard JWS JWTs (`header.payload.signature`) are only Base64Url-encoded and cryptographically signed—not encrypted. Anyone who sees the token can decode and read every claim in plaintext."
      },
      {
        label: "Mandatory Verification",
        body: "Always verify the signature against an explicit algorithm allowlist (e.g., `[\"RS256\"]`, rejecting `alg: \"none\"`), and check `exp` (expiration), `iss` (issuer), and `aud` (audience) on every request."
      }
    ]
  },
  {
    id: "m03-p3-iq-2",
    moduleNumber: 3,
    lessonId: "m03-p3",
    number: 2,
    question: "What is SQL Injection and why do parameterized queries stop it while dynamic ORDER BY columns still need an allowlist?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Parameterized Queries",
        body: "SQL injection happens when untrusted strings are concatenated into SQL commands. Parameterized queries (`SELECT ... WHERE email = $1`, `[email]`) transmit SQL syntax and parameter data separately so the database engine never parses user data as SQL."
      },
      {
        label: "Identifiers Need Allowlists",
        body: "SQL placeholders (`$1`) only bind *values*, not table or column identifiers. For dynamic sorting (`ORDER BY`), map `req.query.sort` through an explicit `Map` or `Set` of approved column names before interpolating."
      }
    ]
  },
  {
    id: "m03-p3-iq-3",
    moduleNumber: 3,
    lessonId: "m03-p3",
    number: 3,
    question: "How does NoSQL Injection work in MongoDB/Node.js, and how do you prevent it?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "Operator Injection",
        body: "Express JSON and query parsers convert nested objects into JS objects. If an attacker sends `{ \"email\": { \"$ne\": null }, \"password\": { \"$ne\": null } }` to a naive `db.users.findOne({ email: req.body.email, password: ... })`, MongoDB evaluates `$ne` as a query operator and logs them in."
      },
      {
        label: "Defenses",
        body: "Validate every user input with a strict schema (e.g. `z.string()`) rejecting objects where primitives are expected, strip keys starting with `$` or containing `.`, and disable `$where` server-side JS execution."
      }
    ]
  },
  {
    id: "m03-p3-iq-4",
    moduleNumber: 3,
    lessonId: "m03-p3",
    number: 4,
    question: "What is Broken Object-Level Authorization (BOLA / IDOR), and how do you prevent it in REST APIs?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "The Vulnerability",
        body: "BOLA (OWASP API #1) occurs when an endpoint authenticates the user (`401` check) and checks role (`admin`/`user`), yet fetches `GET /orders/:id` using only `:id` without verifying that the authenticated caller owns that specific order or tenant."
      },
      {
        label: "Prevention Pattern",
        body: "Derive `userId` and `tenantId` exclusively from the verified server session or JWT—never from `req.body` or `req.query`—and scope every DB read/update/delete query with `WHERE id = $1 AND tenant_id = $2`."
      }
    ]
  },
  {
    id: "m03-p3-iq-5",
    moduleNumber: 3,
    lessonId: "m03-p3",
    number: 5,
    question: "How does Refresh Token Rotation with Reuse Detection mitigate stolen refresh tokens?",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Single-Use Rotation",
        body: "Every `/auth/refresh` call marks the presented refresh token as consumed in Redis/DB and issues a new refresh token belonging to the same **token family** inside an `HttpOnly; Secure; SameSite` cookie."
      },
      {
        label: "Automatic Family Revocation",
        body: "If either the attacker or legitimate client later replays an already-consumed token from that family, the server detects reuse, revokes the entire token family immediately, and forces fresh authentication."
      }
    ]
  },
  {
    id: "m03-p3-iq-6",
    moduleNumber: 3,
    lessonId: "m03-p3",
    number: 6,
    question: "Why is OAuth 2.0 Authorization Code Flow with PKCE + state required for modern web/mobile apps instead of Implicit Flow?",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "PKCE Protects the Code",
        body: "With PKCE (`code_verifier` + `S256` `code_challenge`), even if a malicious browser extension or mobile deep-link handler intercepts the authorization `code`, it cannot exchange it for tokens without the original `code_verifier`."
      },
      {
        label: "Why Implicit Flow Is Deprecated & Why state Matters",
        body: "Implicit Flow (`response_type=token`) exposes access tokens directly in browser URL fragments/history. Additionally, validating a cryptographic `state` parameter on callback prevents login CSRF attacks."
      }
    ]
  },
  {
    id: "m03-p3-iq-7",
    moduleNumber: 3,
    lessonId: "m03-p3",
    number: 7,
    question: "Explain CORS pitfalls in Node/Express: why * + credentials fails, why arbitrary Origin reflection is dangerous, and why Origin: null must be rejected.",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Wildcard & Arbitrary Reflection",
        body: "Browsers forbid `Access-Control-Allow-Origin: *` alongside `Access-Control-Allow-Credentials: true`. Working around this by blindly echoing `req.headers.origin` back disables Same-Origin protection completely, allowing any malicious site to read authenticated responses."
      },
      {
        label: "Exact Allowlist & Vary",
        body: "Check `req.get(\"origin\")` against an exact `Set` of trusted origins, reject `\"null\"` (sent by sandboxed iframes/redirects), emit `Vary: Origin` for caches, and remember CORS is only a browser control—server-side AuthN/AuthZ still protects against `curl`."
      }
    ]
  },
  {
    id: "m03-p3-iq-8",
    moduleNumber: 3,
    lessonId: "m03-p3",
    number: 8,
    question: "Design an end-to-end authentication, session, and RBAC/ABAC authorization architecture for a multi-tenant Node.js API.",
    difficulty: "senior-architect",
    numberedSteps: [
      { title: "Password & Secret Hygiene", body: "Hash passwords with `Argon2id` or `scrypt` + per-user salt, and compare secrets/HMACs with `crypto.timingSafeEqual`." },
      { title: "Short-Lived Access JWTs", body: "Issue 5–15 minute `EdDSA`/`RS256` access tokens containing `sub`, `tenantId`, `roles`, `iss`, `aud`, and `exp`." },
      { title: "Rotating Refresh Families", body: "Store hashed opaque refresh tokens in Redis/DB inside `HttpOnly; Secure; SameSite=Lax` cookies and revoke the whole family on reuse." },
      { title: "Session & Password Reset", body: "Regenerate session/token families on login and invalidate all active families when a user resets or changes their password." },
      { title: "Explicit JWT Verification", body: "Enforce algorithm allowlisting (blocking `alg: \"none\"`), clock-skew tolerance, and `iss`/`aud`/`exp` validation in AuthN middleware." },
      { title: "Permission-Based RBAC", body: "Map roles to granular permissions (`invoice:read`, `invoice:approve`) via `requirePermission(...)` middleware rather than hardcoded role checks." },
      { title: "Object-Level ABAC (BOLA)", body: "Scope every DB query with `WHERE id = $1 AND tenant_id = $2` using `req.user.tenantId` from the verified token." },
      { title: "OAuth2 / OIDC PKCE", body: "Use Authorization Code + PKCE (`S256`) + cryptographic `state` validation for SSO/social login." },
      { title: "Strict CORS Policy", body: "Match `Origin` against an exact allowlist `Set` (rejecting `\"null\"`), emit `Vary: Origin`, and pair cookie auth with CSRF tokens." },
      { title: "Distributed Rate Limits", body: "Enforce Redis token-bucket limits (`429` + `Retry-After`) per IP and per account on login, refresh, and expensive routes." },
      { title: "Least-Privilege Auditing", body: "Log AuthN failures, `403` denials, and token-reuse revocations with `requestId` while redacting all tokens and passwords." },
      { title: "Automated Security Tests", body: "Verify `alg: none` rejection, BOLA cross-tenant isolation, and refresh reuse revocation in CI integration tests." }
    ]
  },
  {
    id: "m03-p3-iq-9",
    moduleNumber: 3,
    lessonId: "m03-p3",
    number: 9,
    question: "Architect a defense-in-depth API security perimeter against injection, DoS, and abuse for a public Express backend.",
    difficulty: "senior-architect",
    numberedSteps: [
      { title: "TLS & Security Headers", body: "Terminate TLS 1.2/1.3 at the edge and apply `helmet` headers (`HSTS`, `X-Content-Type-Options: nosniff`, strict `CSP`)." },
      { title: "Payload & Timeout Caps", body: "Bound `express.json({ limit: '64kb' })` and configure strict `headersTimeout` / `requestTimeout` against Slowloris DoS." },
      { title: "Gateway & Redis Rate Limits", body: "Deploy tiered token-bucket rate limits per IP, API key, and tenant backed by atomic Redis scripts." },
      { title: "Strict Schema Validation", body: "Parse `body`, `params`, and `query` with `.strict()` schemas before business logic runs, rejecting unknown keys (anti-mass-assignment)." },
      { title: "SQL Injection Defense", body: "Use parameterized queries (`$1, $2`) exclusively and validate dynamic `ORDER BY` / filter identifiers against a `Map`/`Set` allowlist." },
      { title: "NoSQL Injection Defense", body: "Enforce primitive types (`string`/`number`) on filter fields, strip `$`/`.` keys, and disable `$where` JavaScript execution." },
      { title: "Safe Input Sanitization", body: "Strip ASCII control chars and null bytes without ReDoS-prone nested regexes; use DOMPurify only if rich HTML is unavoidable." },
      { title: "CORS & CSRF Hardening", body: "Enforce exact-origin CORS allowlists and require `SameSite=Lax` + `X-CSRF-Token` on cookie-authenticated mutations." },
      { title: "Least-Privilege DB Role", body: "Connect the API with a non-superuser DB role restricted to required tables and operations." },
      { title: "Secret & Log Hygiene", body: "Load secrets from a secret manager, never log `Authorization`/`Cookie`/`password` fields, and redact `500` error responses." },
      { title: "Dependency & Image Scanning", body: "Run `npm audit`, lockfile integrity checks, and non-root minimal container builds in CI." },
      { title: "Anomaly Alerting", body: "Alert on sudden spikes in `401`, `403`, `429`, and `500` responses by route and tenant without exposing PII." }
    ]
  }
];
