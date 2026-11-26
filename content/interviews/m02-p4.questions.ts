import type { InterviewQuestion } from "@/entities/handbook";

export const m02p4Questions: InterviewQuestion[] = [
  {
    id: "m02-p4-iq-1",
    moduleNumber: 2,
    lessonId: "m02-p4",
    number: 1,
    question: "What errors do React Error Boundaries catch, and what do they NOT catch?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Direct Answer",
        body: "Error Boundaries catch JavaScript errors thrown during rendering, in lifecycle methods, and in constructors of child components below them (`getDerivedStateFromError` + `componentDidCatch`)."
      },
      {
        label: "What They Miss",
        body: "They do NOT catch errors in event handlers (`onClick`), asynchronous code (`setTimeout`, `fetch` promises), server-side rendering, or errors thrown inside the Error Boundary itself. Handle those with `try/catch` or query error states."
      }
    ]
  },
  {
    id: "m02-p4-iq-2",
    moduleNumber: 2,
    lessonId: "m02-p4",
    number: 2,
    question: "How do React.lazy, Suspense, and code splitting improve initial page load?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Direct Answer",
        body: "`React.lazy(() => import('./AdminPage'))` creates a dynamic `import()` split point so the bundler emits a separate JavaScript chunk instead of bundling every page into the initial entry file. `<Suspense fallback={<Skeleton />}>` renders a loading placeholder while that chunk downloads."
      },
      {
        label: "Why It Matters",
        body: "Smaller initial bundles download, parse, and compile faster on mobile CPUs, directly improving Largest Contentful Paint (LCP) and Interaction to Next Paint (INP)."
      }
    ]
  },
  {
    id: "m02-p4-iq-3",
    moduleNumber: 2,
    lessonId: "m02-p4",
    number: 3,
    question: "Explain the difference between XSS and CSRF and how React apps defend against each.",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "XSS (Cross-Site Scripting)",
        body: "XSS executes attacker JavaScript inside your own origin. React's JSX text escaping blocks basic HTML injection, but you must still avoid `dangerouslySetInnerHTML` (or sanitize with DOMPurify), allowlist `https:`/`/` URLs on `href` to block `javascript:`, and enforce a strict Content Security Policy (CSP)."
      },
      {
        label: "CSRF (Cross-Site Request Forgery)",
        body: "CSRF tricks a logged-in user's browser into sending ambient cookies from another site to your API. Defend with `SameSite=Lax` (or `Strict`) session cookies, anti-CSRF tokens (`X-CSRF-Token` header), and server-side `Origin` checks."
      }
    ]
  },
  {
    id: "m02-p4-iq-4",
    moduleNumber: 2,
    lessonId: "m02-p4",
    number: 4,
    question: "What makes a React component accessible (a11y) beyond adding aria-label attributes?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "Semantic Foundation",
        body: "Start with native HTML elements (`<button>`, `<a href>`, `<label htmlFor>`, `<main>`, `<nav>`) which provide built-in keyboard activation (`Enter`/`Space`), focusability, and screen reader roles automatically—never replace `<button>` with `<div onClick>`."
      },
      {
        label: "Focus, Contrast & Live Regions",
        body: "Ensure visible `:focus-visible` outlines, WCAG AA contrast (`>= 4.5:1`), `44x44px` touch targets, focus trapping/restoration for modals, and `aria-live=\"polite\"` announcements for dynamic async status updates."
      }
    ]
  },
  {
    id: "m02-p4-iq-5",
    moduleNumber: 2,
    lessonId: "m02-p4",
    number: 5,
    question: "How do you decide between unit tests, React Testing Library integration tests (with MSW), and Playwright E2E tests?",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Testing Trophy Balance",
        body: "Use fast unit tests for pure domain logic (reducers, validators, formatters, pagination). Use React Testing Library + MSW integration tests for multi-component user flows (form validation + API error/success rendering + routing) queried by accessible role (`getByRole`)."
      },
      {
        label: "E2E Scope",
        body: "Reserve slower Playwright E2E tests for critical end-to-end journeys (login cookies, checkout, real browser responsive layout) where real browser networking and CSS rendering matter."
      }
    ]
  },
  {
    id: "m02-p4-iq-6",
    moduleNumber: 2,
    lessonId: "m02-p4",
    number: 6,
    question: "How do Feature-Sliced Design (FSD) and composition patterns prevent large React codebases from becoming unmaintainable?",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Unidirectional Layer Boundaries",
        body: "FSD organizes code into hierarchical layers (`app -> pages -> widgets -> features -> entities -> shared`) where modules may only import from lower layers via public `index.ts` entry points, preventing circular dependencies and spaghetti cross-feature coupling."
      },
      {
        label: "Composition Over Boolean Props",
        body: "Pairing FSD with composition (`children`), Compound Components, and headless hooks keeps `shared/ui` primitives decoupled from business domains and prevents prop-explosion monoliths."
      }
    ]
  },
  {
    id: "m02-p4-iq-7",
    moduleNumber: 2,
    lessonId: "m02-p4",
    number: 7,
    question: "Design a frontend performance and Core Web Vitals optimization plan for a slow, re-render-heavy React dashboard.",
    difficulty: "senior-architect",
    numberedSteps: [
      { title: "Measure Real Metrics", body: "Baseline LCP, INP, CLS, and bundle sizes in Lighthouse, Chrome Performance, and React Profiler before touching code." },
      { title: "Route Code Splitting", body: "Split heavy routes and rarely used charts/editors with `React.lazy` + `<Suspense>` and enforce CI bundle budgets." },
      { title: "Push State Down", body: "Move high-frequency typing/hover state into leaf components and pass static subtrees via `props.children`." },
      { title: "Virtualize Large Lists", body: "Replace 1,000+ DOM row tables with windowing (`@tanstack/react-virtual`) to keep DOM nodes and layout work minimal." },
      { title: "Targeted Memoization", body: "Apply `React.memo`, `useMemo`, and `useCallback` strictly on profiled hot rows and context provider values." },
      { title: "Eliminate Waterfalls", body: "Preload route queries in parallel or route loaders and tune TanStack Query `staleTime` to avoid redundant refetches." },
      { title: "Reserve Layout Space", body: "Set explicit `aspect-ratio` / skeleton dimensions on async media and cards to hold CLS near `0`." },
      { title: "Optimize HTTP Caching", body: "Serve hashed JS/CSS chunks with `Cache-Control: immutable` and keep `index.html` at `no-cache`." },
      { title: "Bound Client Memory", body: "Configure `gcTime` and bounded LRU caches so long-lived browser tabs do not leak memory." },
      { title: "Offload Heavy Work", body: "Move CPU-heavy parsing or CSV export into Web Workers so the main thread stays responsive (`INP <= 200ms`)." },
      { title: "Add Error Isolation", body: "Wrap split widgets in `<ErrorBoundary>` so partial failures degrade gracefully without crashing the dashboard." },
      { title: "Continuous RUM Regression", body: "Track Core Web Vitals in production Real User Monitoring (RUM) and gate PRs with automated bundle/perf checks." }
    ]
  },
  {
    id: "m02-p4-iq-8",
    moduleNumber: 2,
    lessonId: "m02-p4",
    number: 8,
    question: "Architect a secure, accessible, and maintainable frontend platform for a multi-team React application.",
    difficulty: "senior-architect",
    numberedSteps: [
      { title: "Define Layer Architecture", body: "Adopt Feature-Sliced Design (`app/pages/widgets/features/entities/shared`) enforced automatically in CI with Steiger." },
      { title: "Stateless Design System", body: "Build `shared/ui` primitives with semantic HTML, WCAG AA contrast, `44px` touch targets, and compound composition APIs." },
      { title: "Accessible Focus & ARIA", body: "Enforce keyboard navigation, focus restoration in dialogs, and automated `axe` checks on interactive components." },
      { title: "Responsive Breakpoints", body: "Design mobile-first (`360px` to `1440px+`) with fluid grids, zero horizontal overflow, and `prefers-reduced-motion`." },
      { title: "XSS Prevention Layer", body: "Rely on JSX escaping, ban raw `dangerouslySetInnerHTML` without DOMPurify, and validate all user URLs (`https:` / relative `/`)." },
      { title: "CSRF & Session Hardening", body: "Use `HttpOnly; Secure; SameSite=Lax` BFF cookies paired with `X-CSRF-Token` headers and zero secrets in `VITE_*` env vars." },
      { title: "Strict CSP & SRI", body: "Deploy a strict `Content-Security-Policy` blocking inline scripts and audit third-party npm packages in CI." },
      { title: "ErrorBoundary + Telemetry", body: "Place `<ErrorBoundary>` at route and widget boundaries, reporting sanitized component stacks to observability." },
      { title: "Testing Trophy Strategy", body: "Combine TypeScript strictness, Vitest unit tests, React Testing Library + MSW integration tests, and Playwright E2E." },
      { title: "Deterministic Debugging", body: "Ship hidden/internal source maps to error tracking and preserve reproducible state/network traces." },
      { title: "Performance Budgets", body: "Gate PRs on bundle size limits, chunk splitting health, and zero Steiger/typecheck regressions." },
      { title: "Clear Team Ownership", body: "Assign codeowners per feature slice with documented `index.ts` public APIs so teams ship independently." }
    ]
  }
];
