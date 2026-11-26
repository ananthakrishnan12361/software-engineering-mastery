import assert from "node:assert/strict";
import type { LessonCoverageSpec } from "./types";

export const m02p4Coverage: LessonCoverageSpec = {
  lessonId: "m02-p4",
  moduleNumber: 2,
  mdxPath: "content/modules/02-react/m02-p4.mdx",
  topics: [
    {
      topicTitle: "Error boundaries",
      anchorId: "m02-p4-topic-error-boundaries",
      explanationHeadings: [
        "1. Error Boundaries: Isolating Render Crashes Gracefully",
        "1. Route-Level Code Splitting, Suspense & Error Boundary Isolation"
      ],
      exampleTitles: ["Example 2: Bounded LRU Frontend Cache & Lazy Chunk Deduplicator"],
      interviewQuestionIds: ["m02-p4-iq-1"],
      exerciseTitles: ["Exercise 1: Error Boundary State Machine With Reset Key (createBoundaryState)"]
    },
    {
      topicTitle: "Lazy loading",
      anchorId: "m02-p4-topic-lazy-loading",
      explanationHeadings: ["2. Lazy Loading: Deferring Non-Critical Code & Media"],
      exampleTitles: ["Example 2: Bounded LRU Frontend Cache & Lazy Chunk Deduplicator"],
      interviewQuestionIds: ["m02-p4-iq-2"],
      exerciseTitles: ["Exercise 1: Error Boundary State Machine With Reset Key (createBoundaryState)"]
    },
    {
      topicTitle: "Code splitting",
      anchorId: "m02-p4-topic-code-splitting",
      explanationHeadings: ["3. Code Splitting: Breaking One Giant Bundle Into Route & Feature Chunks"],
      exampleTitles: ["Example 2: Bounded LRU Frontend Cache & Lazy Chunk Deduplicator"],
      interviewQuestionIds: ["m02-p4-iq-2", "m02-p4-iq-7"],
      exerciseTitles: ["Exercise 1: Error Boundary State Machine With Reset Key (createBoundaryState)"]
    },
    {
      topicTitle: "Performance optimization",
      anchorId: "m02-p4-topic-performance-optimization",
      explanationHeadings: ["4. Performance Optimization: Measuring Core Web Vitals First"],
      exampleTitles: ["Example 2: Bounded LRU Frontend Cache & Lazy Chunk Deduplicator"],
      interviewQuestionIds: ["m02-p4-iq-7"],
      exerciseTitles: ["Exercise 2: Accessible Pagination Helper & Mini Unit Test Suite (paginateItems)"]
    },
    {
      topicTitle: "Rendering optimization",
      anchorId: "m02-p4-topic-rendering-optimization",
      explanationHeadings: ["5. Rendering Optimization: Minimizing Wasted Work in React Trees"],
      exampleTitles: ["Example 2: Bounded LRU Frontend Cache & Lazy Chunk Deduplicator"],
      interviewQuestionIds: ["m02-p4-iq-7"],
      exerciseTitles: ["Exercise 2: Accessible Pagination Helper & Mini Unit Test Suite (paginateItems)"]
    },
    {
      topicTitle: "Memoization",
      anchorId: "m02-p4-topic-memoization",
      explanationHeadings: ["6. Memoization: Targeted Caching of Values, Callbacks & Components"],
      exampleTitles: ["Example 2: Bounded LRU Frontend Cache & Lazy Chunk Deduplicator"],
      interviewQuestionIds: ["m02-p4-iq-7"],
      exerciseTitles: ["Exercise 2: Accessible Pagination Helper & Mini Unit Test Suite (paginateItems)"]
    },
    {
      topicTitle: "Frontend caching",
      anchorId: "m02-p4-topic-frontend-caching",
      explanationHeadings: ["7. Frontend Caching: Browser HTTP Cache, Memory Cache & Stale-While-Revalidate"],
      exampleTitles: ["Example 2: Bounded LRU Frontend Cache & Lazy Chunk Deduplicator"],
      interviewQuestionIds: ["m02-p4-iq-7"],
      exerciseTitles: ["Exercise 2: Accessible Pagination Helper & Mini Unit Test Suite (paginateItems)"]
    },
    {
      topicTitle: "Accessibility",
      anchorId: "m02-p4-topic-accessibility",
      explanationHeadings: ["8. Accessibility (a11y): Semantic HTML, Keyboard Navigation & ARIA"],
      exampleTitles: ["Example 3: XSS Output Escaping, Safe URL Allowlist & CSRF Token Verification"],
      interviewQuestionIds: ["m02-p4-iq-4", "m02-p4-iq-8"],
      exerciseTitles: ["Exercise 2: Accessible Pagination Helper & Mini Unit Test Suite (paginateItems)"]
    },
    {
      topicTitle: "Responsive design",
      anchorId: "m02-p4-topic-responsive-design",
      explanationHeadings: ["9. Responsive Design: Mobile-First Fluid Layouts & Container Queries"],
      exampleTitles: ["Example 3: XSS Output Escaping, Safe URL Allowlist & CSRF Token Verification"],
      interviewQuestionIds: ["m02-p4-iq-8"],
      exerciseTitles: ["Exercise 2: Accessible Pagination Helper & Mini Unit Test Suite (paginateItems)"]
    },
    {
      topicTitle: "Security",
      anchorId: "m02-p4-topic-security",
      explanationHeadings: [
        "10. Security: Defense-in-Depth in the Browser",
        "2. Browser Security Boundaries: Defending Against XSS & CSRF Together"
      ],
      exampleTitles: ["Example 3: XSS Output Escaping, Safe URL Allowlist & CSRF Token Verification"],
      interviewQuestionIds: ["m02-p4-iq-3", "m02-p4-iq-8"],
      exerciseTitles: ["Exercise 1: Error Boundary State Machine With Reset Key (createBoundaryState)"]
    },
    {
      topicTitle: "XSS",
      anchorId: "m02-p4-topic-xss",
      explanationHeadings: ["11. XSS (Cross-Site Scripting): Output Encoding & Safe DOM Sinks"],
      exampleTitles: ["Example 3: XSS Output Escaping, Safe URL Allowlist & CSRF Token Verification"],
      interviewQuestionIds: ["m02-p4-iq-3"],
      exerciseTitles: ["Exercise 1: Error Boundary State Machine With Reset Key (createBoundaryState)"]
    },
    {
      topicTitle: "CSRF",
      anchorId: "m02-p4-topic-csrf",
      explanationHeadings: ["12. CSRF (Cross-Site Request Forgery): SameSite Cookies & Anti-CSRF Tokens"],
      exampleTitles: ["Example 3: XSS Output Escaping, Safe URL Allowlist & CSRF Token Verification"],
      interviewQuestionIds: ["m02-p4-iq-3"],
      exerciseTitles: ["Exercise 1: Error Boundary State Machine With Reset Key (createBoundaryState)"]
    },
    {
      topicTitle: "Large frontend architecture",
      anchorId: "m02-p4-topic-large-frontend-architecture",
      explanationHeadings: ["13. Large Frontend Architecture: Feature-Sliced Design & Unidirectional Imports"],
      exampleTitles: ["Example 2: Bounded LRU Frontend Cache & Lazy Chunk Deduplicator"],
      interviewQuestionIds: ["m02-p4-iq-6", "m02-p4-iq-8"],
      exerciseTitles: ["Exercise 1: Error Boundary State Machine With Reset Key (createBoundaryState)"]
    },
    {
      topicTitle: "Component design patterns",
      anchorId: "m02-p4-topic-component-design-patterns",
      explanationHeadings: ["14. Component Design Patterns: Composition, Compound Components & Headless Hooks"],
      exampleTitles: ["Example 2: Bounded LRU Frontend Cache & Lazy Chunk Deduplicator"],
      interviewQuestionIds: ["m02-p4-iq-6"],
      exerciseTitles: ["Exercise 1: Error Boundary State Machine With Reset Key (createBoundaryState)"]
    },
    {
      topicTitle: "Testing",
      anchorId: "m02-p4-topic-testing",
      explanationHeadings: ["15. Testing: Testing Behavior Over Implementation Details"],
      exampleTitles: ["Example 3: XSS Output Escaping, Safe URL Allowlist & CSRF Token Verification"],
      interviewQuestionIds: ["m02-p4-iq-5"],
      exerciseTitles: ["Exercise 2: Accessible Pagination Helper & Mini Unit Test Suite (paginateItems)"]
    },
    {
      topicTitle: "Unit testing",
      anchorId: "m02-p4-topic-unit-testing",
      explanationHeadings: ["16. Unit Testing: Pure Functions, Reducers, Validators & Edge Cases"],
      exampleTitles: ["Example 3: XSS Output Escaping, Safe URL Allowlist & CSRF Token Verification"],
      interviewQuestionIds: ["m02-p4-iq-5"],
      exerciseTitles: ["Exercise 2: Accessible Pagination Helper & Mini Unit Test Suite (paginateItems)"]
    },
    {
      topicTitle: "Integration testing",
      anchorId: "m02-p4-topic-integration-testing",
      explanationHeadings: ["17. Integration Testing: Multi-Component Flows with Mocked APIs"],
      exampleTitles: ["Example 3: XSS Output Escaping, Safe URL Allowlist & CSRF Token Verification"],
      interviewQuestionIds: ["m02-p4-iq-5"],
      exerciseTitles: ["Exercise 2: Accessible Pagination Helper & Mini Unit Test Suite (paginateItems)"]
    },
    {
      topicTitle: "Frontend debugging",
      anchorId: "m02-p4-topic-frontend-debugging",
      explanationHeadings: ["18. Frontend Debugging: Systematic Root-Cause Isolation"],
      exampleTitles: ["Example 2: Bounded LRU Frontend Cache & Lazy Chunk Deduplicator"],
      interviewQuestionIds: ["m02-p4-iq-7", "m02-p4-iq-8"],
      exerciseTitles: ["Exercise 1: Error Boundary State Machine With Reset Key (createBoundaryState)"]
    }
  ],
  codeTests: [
    {
      blockIndex: 1,
      label: "Example 2: createLruCache & createChunkLoader",
      expectedStdoutIncludes: ["LRU keys remaining:", "| Same chunk promise? true"],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.deepEqual(
          run(`const c = createLruCache(2); c.set("a", 1); c.set("b", 2); c.get("a"); c.set("c", 3); return c.keys();`),
          ["a", "c"]
        );
        assert.throws(() => run(`createLruCache(0);`), TypeError);
        assert.throws(() => run(`createLruCache(2).set("", 1);`), TypeError);
        assert.throws(() => run(`createChunkLoader("bad");`), TypeError);
        assert.throws(() => run(`createChunkLoader(() => 1)("");`), TypeError);
      },
      safetyMutations: [
        {
          description: "Removing LRU eviction allows cache to grow past maxEntries",
          mutateCode: (raw) =>
            raw.replace(/if \(map\.size > maxEntries\)\s*\{[^}]*\}/, "/* eviction removed */"),
          verifyProtection: (run) => {
            assert.equal(run(`const c = createLruCache(2); c.set("a", 1); c.set("b", 2); c.set("c", 3); return c.keys().length;`), 2);
          }
        }
      ]
    },
    {
      blockIndex: 2,
      label: "Example 3: XSS & CSRF Guards",
      expectedStdoutIncludes: [
        "Escaped XSS: &lt;img src=x onerror=alert(1)&gt;",
        "javascript: blocked? true",
        "CSRF POST valid? true"
      ],
      minStdoutLines: 3,
      testValidAndInvalidInputs: (run) => {
        assert.equal(run(`return isSafeLinkHref("//evil.example");`), false);
        assert.equal(run(`return isSafeLinkHref("/\\\\evil.example");`), false);
        assert.equal(run(`return isSafeLinkHref("javascript:alert(1)");`), false);
        assert.equal(run(`return isSafeLinkHref("https:" + "//example.com/docs");`), true);
        assert.equal(run(`return isSafeLinkHref("https:" + "//");`), false);
        assert.equal(run(`return isSafeLinkHref("/dashboard?tab=1");`), true);
        assert.equal(run(`return verifyCsrfRequest({ method: "GET" }).ok;`), true);
        assert.equal(run(`return verifyCsrfRequest({ method: "POST", cookieToken: "short", headerToken: "short" }).ok;`), false);
        assert.equal(run(`return verifyCsrfRequest({ method: "POST", cookieToken: "                ", headerToken: "                " }).ok;`), false);
        assert.equal(run(`return verifyCsrfRequest({ method: "POST", cookieToken: "tok_1234567890abcd", headerToken: "wrong" }).ok;`), false);
        assert.throws(() => run(`verifyCsrfRequest(null);`), TypeError);
        assert.throws(() => run(`escapeHtml(123);`), TypeError);
      },
      safetyMutations: [
        {
          description: "Removing // guard in isSafeLinkHref allows protocol-relative open redirect",
          mutateCode: (raw) => raw.replace(/&& !trimmed\.startsWith\("\/\/"\)/, ""),
          verifyProtection: (run) => {
            assert.equal(run(`return isSafeLinkHref("//evil.example");`), false);
          }
        },
        {
          description: "Removing < escaping in escapeHtml allows raw script tag injection",
          mutateCode: (raw) => raw.replace(/\.replaceAll\("<", "&lt;"\)/, ""),
          verifyProtection: (run) => {
            assert.equal(String(run(`return escapeHtml("<script>");`)).includes("<"), false);
          }
        },
        {
          description: "Removing CSRF token equality check accepts forged mismatched POST header",
          mutateCode: (raw) => raw.replace(/if \(cookieToken !== headerToken\)\s*\{[^}]*\}/, "/* check removed */"),
          verifyProtection: (run) => {
            assert.equal(
              run(`return verifyCsrfRequest({ method: "POST", cookieToken: "tok_1234567890abcd", headerToken: "mismatch" }).ok;`),
              false
            );
          }
        }
      ]
    },
    {
      blockIndex: 3,
      label: "Exercise 1: createBoundaryState",
      expectedStdoutIncludes: ["R1: Fallback: Widget boom | R2: Healthy Tab B"],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`createBoundaryState().render("bad", () => {});`), TypeError);
        assert.equal(
          run(`const b = createBoundaryState("k1"); b.capture(new Error("manual")); return b.render(() => "ok", (e) => e.message);`),
          "manual"
        );
        assert.equal(
          run(`const b = createBoundaryState("k1"); b.render(() => { throw new Error("e"); }, () => "fb"); return b.render(() => "ok", () => "still-fb");`),
          "still-fb"
        );
      },
      safetyMutations: [
        {
          description: "Removing resetOnKeyChange error clearing leaves boundary stuck in fallback",
          mutateCode: (raw) => raw.replace(/hasError = false;\s*lastError = null;/, "/* reset removed */"),
          verifyProtection: (run) => {
            assert.equal(
              run(`const b = createBoundaryState("a"); b.render(() => { throw new Error("e"); }, () => "fb"); b.resetOnKeyChange("b"); return b.render(() => "ok", () => "fb");`),
              "ok"
            );
          }
        }
      ]
    },
    {
      blockIndex: 4,
      label: "Exercise 2: paginateItems",
      expectedStdoutIncludes: ["Page 2:", "| totalPages: 3 | hasNext: true"],
      minStdoutLines: 1,
      testValidAndInvalidInputs: (run) => {
        assert.throws(() => run(`paginateItems("bad", 1, 5);`), TypeError);
        assert.throws(() => run(`paginateItems([], 0, 5);`), RangeError);
        assert.equal(run(`return paginateItems(["a", "b"], 99, 5).page;`), 1);
      },
      safetyMutations: [
        {
          description: "Removing page >= 1 guard allows negative slice offsets",
          mutateCode: (raw) =>
            raw.replace(/if \(!Number\.isInteger\(page\) \|\| page < 1\) throw new RangeError\("page must be an integer >= 1"\);/, "/* guard removed */"),
          verifyProtection: (run) => {
            assert.throws(() => run(`paginateItems(["a"], 0, 5);`), RangeError);
          }
        }
      ]
    }
  ]
};
