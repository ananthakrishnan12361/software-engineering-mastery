import type { InterviewQuestion } from "@/entities/handbook";

export const m02p3Questions: InterviewQuestion[] = [
  {
    id: "m02-p3-iq-1",
    moduleNumber: 2,
    lessonId: "m02-p3",
    number: 1,
    question: "How do you decide between useState, Context API, Redux Toolkit, and TanStack Query in a React app?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Direct Answer",
        body: "Choose based on state ownership: use `useState` for local component UI, Context API for low-frequency tree-wide dependencies (theme, locale, auth user), Redux Toolkit for complex shared client workflows, React Router for URL/filter state, and TanStack Query for asynchronous server state."
      },
      {
        label: "Why It Matters",
        body: "Putting fetched API data into Redux forces you to re-implement caching, deduplication, stale-while-revalidate, and garbage collection manually, whereas TanStack Query handles those lifecycle concerns out of the box."
      }
    ]
  },
  {
    id: "m02-p3-iq-2",
    moduleNumber: 2,
    lessonId: "m02-p3",
    number: 2,
    question: "Why does Context API cause unnecessary re-renders at scale, and how do you mitigate it?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Direct Answer",
        body: "Every component calling `useContext(Ctx)` subscribes to the entire provider `value` by `Object.is` reference—there is no built-in selector bailout. Whenever the provider passes a new inline object or any field in that object updates, all consumers re-render."
      },
      {
        label: "Mitigations",
        body: "Memoize the provider value with `useMemo`, stabilize action callbacks with `useCallback`, split fast-changing state from rarely changing dispatch/config contexts, or move high-frequency shared state to Redux Toolkit / Zustand with selector subscriptions."
      }
    ]
  },
  {
    id: "m02-p3-iq-3",
    moduleNumber: 2,
    lessonId: "m02-p3",
    number: 3,
    question: "What is the difference between authentication (AuthN) and authorization (AuthZ) in a React SPA?",
    difficulty: "basic",
    paragraphs: [
      {
        label: "Direct Answer",
        body: "Authentication verifies who the user is (login, OAuth2/OIDC, session cookies, returning HTTP `401 Unauthorized` when missing/expired). Authorization verifies what an authenticated user is permitted to access or mutate (RBAC/ABAC, returning HTTP `403 Forbidden`)."
      },
      {
        label: "Security Rule",
        body: "React Router guards and hidden buttons only improve user experience; an attacker can bypass client JS entirely, so the backend API must enforce authorization on every request."
      }
    ]
  },
  {
    id: "m02-p3-iq-4",
    moduleNumber: 2,
    lessonId: "m02-p3",
    number: 4,
    question: "How does Redux Toolkit's createSlice allow 'mutating' syntax while keeping reducers pure and immutable?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "Direct Answer",
        body: "Redux Toolkit wraps `createSlice` reducers with Immer. Inside a reducer, you mutate a temporary `Draft` proxy (`state.items.push(item)`), and Immer records the touched paths to produce a new frozen state object using structural sharing without mutating the original state."
      },
      {
        label: "Important Caveat",
        body: "Either mutate the draft OR return a brand-new state value—never mutate the draft AND return a new object from the same reducer case, as Immer throws an error."
      }
    ]
  },
  {
    id: "m02-p3-iq-5",
    moduleNumber: 2,
    lessonId: "m02-p3",
    number: 5,
    question: "In TanStack Query, what is the difference between staleTime and gcTime (cacheTime)?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "Direct Answer",
        body: "`staleTime` (default `0ms`) controls how long cached data is considered fresh and served without triggering a background refetch on mount or window focus. `gcTime` (default `5 minutes`) controls how long *inactive* cache entries (zero mounted observers) stay in memory before garbage collection."
      },
      {
        label: "Practical Tuning",
        body: "Increase `staleTime` (e.g., `60_000` ms) for reference data like countries or permissions to cut redundant network calls, and invalidate specific keys via `queryClient.invalidateQueries` immediately after mutations."
      }
    ]
  },
  {
    id: "m02-p3-iq-6",
    moduleNumber: 2,
    lessonId: "m02-p3",
    number: 6,
    question: "When should you choose uncontrolled forms (React Hook Form) over React controlled inputs, and how should validation work?",
    difficulty: "intermediate",
    paragraphs: [
      {
        label: "Direct Answer",
        body: "Use controlled inputs for small forms or inputs requiring instant per-keystroke formatting/cross-field UI updates. Use uncontrolled `ref`-based forms (such as React Hook Form) for large 30+ field forms to avoid re-rendering the entire component tree on every keystroke."
      },
      {
        label: "Validation Contract",
        body: "Run schema validation (e.g., Zod) on the client for immediate accessible feedback (`aria-invalid`), and run the authoritative validation on the backend API, mapping any `422` field errors back into the form."
      }
    ]
  },
  {
    id: "m02-p3-iq-7",
    moduleNumber: 2,
    lessonId: "m02-p3",
    number: 7,
    question: "Why should SPAs avoid storing JWTs in localStorage, and how do you handle 401 token refresh without a refresh storm?",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Token Security",
        body: "Any JavaScript executing on the origin (including a compromised dependency or XSS payload) can read `localStorage` and exfiltrate the JWT. Storing session tokens in `HttpOnly; Secure; SameSite` cookies via a Backend-for-Frontend (BFF)—or keeping short-lived access tokens strictly in memory—prevents direct JS token theft."
      },
      {
        label: "Single-Flight Refresh",
        body: "If multiple concurrent API calls fail with `401`, coordinate a single shared `refreshInFlight` promise inside the HTTP client so only one `/auth/refresh` request executes and all queued callers await and retry with the new session."
      }
    ]
  },
  {
    id: "m02-p3-iq-8",
    moduleNumber: 2,
    lessonId: "m02-p3",
    number: 8,
    question: "How do you prevent open-redirect vulnerabilities and flash-of-unauthorized-content in React Router protected routes?",
    difficulty: "advanced",
    paragraphs: [
      {
        label: "Flash Prevention",
        body: "Wait for the initial session/auth bootstrap state (`status === 'loading'`) to resolve before deciding to render `<Outlet />` or `<Navigate to='/login' />`, preventing a brief flash of protected layout or premature redirect on hard reload."
      },
      {
        label: "Safe Post-Login Redirects",
        body: "Before redirecting back to `location.state?.from` or a `?next=` query parameter, validate that it is a relative in-app path starting with a single `/` (rejecting `https://`, `//`, and `/\\`) so attackers cannot weaponize your login page as an open redirect."
      }
    ]
  },
  {
    id: "m02-p3-iq-9",
    moduleNumber: 2,
    lessonId: "m02-p3",
    number: 9,
    question: "Architect the state, caching, routing, and auth layer for a multi-tenant B2B React dashboard.",
    difficulty: "senior-architect",
    numberedSteps: [
      { title: "Clarify Requirements", body: "Separate fast-changing client UI state, shareable URL filter state, multi-tenant server cache, and strict AuthN/AuthZ boundaries." },
      { title: "Tenant-Scoped URLs", body: "Encode `:tenantId` and list filters in React Router params/searchParams so deep links and Back/Forward navigation stay consistent." },
      { title: "Tenant-Keyed Server Cache", body: "Prefix every TanStack Query key with `tenantId` (`[tenantId, 'orders', filters]`) so cached data never bleeds across tenants." },
      { title: "Cache Clear on Switch/Logout", body: "Call `queryClient.clear()` and reset client slices synchronously whenever the active tenant or authenticated user changes." },
      { title: "Minimal Client Store", body: "Keep only cross-page client workflow state (e.g., bulk selection drawer, sidebar collapse) in Redux Toolkit or split Contexts." },
      { title: "Typed API Boundary", body: "Centralize `fetch` in an API client with `AbortSignal.timeout()`, `res.ok` checks, normalized typed errors, and idempotency keys on `POST` mutations." },
      { title: "BFF Cookie Auth", body: "Prefer `HttpOnly; Secure; SameSite=Lax` cookies managed by a BFF (plus CSRF token on state-changing requests) over `localStorage` tokens." },
      { title: "Single-Flight Refresh", body: "Share a single `refreshInFlight` promise on `401` responses so concurrent widget fetches do not trigger rotating-token revocation." },
      { title: "Client Route Guards", body: "Use nested `<RequireAuth>` and `<RequirePermission>` layout routes for clean UX and loading-state gating before child queries fire." },
      { title: "Server-Side AuthZ", body: "Enforce RBAC/ABAC and tenant ownership checks on every backend endpoint and database query, treating frontend checks purely as UX." },
      { title: "Schema Forms & Errors", body: "Use React Hook Form + shared Zod schemas for instant client feedback and map server `422` field errors cleanly back to controls." },
      { title: "Observability & Audits", body: "Track `401`/`403` spikes, refresh failures, and slow query keys in telemetry without logging PII or auth tokens." }
    ]
  }
];
