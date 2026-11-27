import type { SyllabusModule, SyllabusTopic } from "@/entities/handbook";
import type { CategoryId } from "@/shared/config";

type TopicDef =
  | string
  | {
      title: string;
      group?: string;
      lessonId: string;
      anchorId: string;
    }
  | [group: string, title: string];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildTopics(moduleNumber: number, defs: TopicDef[]): SyllabusTopic[] {
  return defs.map((def, idx) => {
    if (typeof def === "string") {
      return {
        id: `m${String(moduleNumber).padStart(2, "0")}-t${idx + 1}-${slugify(def)}`,
        moduleNumber,
        title: def,
        status: "unwritten"
      };
    }
    if (Array.isArray(def)) {
      return {
        id: `m${String(moduleNumber).padStart(2, "0")}-t${idx + 1}-${slugify(def[1])}`,
        moduleNumber,
        group: def[0],
        title: def[1],
        status: "unwritten"
      };
    }
    return {
      id: `m${String(moduleNumber).padStart(2, "0")}-t${idx + 1}-${slugify(def.title)}`,
      moduleNumber,
      group: def.group,
      title: def.title,
      status: "available",
      lessonId: def.lessonId,
      anchorId: def.anchorId
    };
  });
}

function defineModule(
  number: number,
  title: string,
  category: CategoryId,
  defs: TopicDef[],
  notes?: string
): SyllabusModule {
  return {
    number,
    title,
    category,
    topics: buildTopics(number, defs),
    notes
  };
}

export const SYLLABUS_MODULES: SyllabusModule[] = [
  defineModule(1, "Programming Fundamentals & JavaScript", "fundamentals", [
    {
      title: "Programming fundamentals",
      lessonId: "m01-p1",
      anchorId: "m01-p1-topic-fundamentals"
    },
    {
      title: "Variables",
      lessonId: "m01-p1",
      anchorId: "m01-p1-topic-variables"
    },
    {
      title: "Data types",
      lessonId: "m01-p1",
      anchorId: "m01-p1-topic-data-types"
    },
    {
      title: "Functions",
      lessonId: "m01-p1",
      anchorId: "m01-p1-topic-functions"
    },
    {
      title: "Objects",
      lessonId: "m01-p2",
      anchorId: "m01-p2-topic-objects"
    },
    {
      title: "Arrays",
      lessonId: "m01-p2",
      anchorId: "m01-p2-topic-arrays"
    },
    {
      title: "Classes",
      lessonId: "m01-p2",
      anchorId: "m01-p2-topic-classes"
    },
    {
      title: "OOP",
      lessonId: "m01-p2",
      anchorId: "m01-p2-topic-oop"
    },
    {
      title: "Encapsulation",
      lessonId: "m01-p2",
      anchorId: "m01-p2-topic-encapsulation"
    },
    {
      title: "Inheritance",
      lessonId: "m01-p2",
      anchorId: "m01-p2-topic-inheritance"
    },
    {
      title: "Polymorphism",
      lessonId: "m01-p2",
      anchorId: "m01-p2-topic-polymorphism"
    },
    {
      title: "Abstraction",
      lessonId: "m01-p2",
      anchorId: "m01-p2-topic-abstraction"
    },
    {
      title: "SOLID fundamentals",
      lessonId: "m01-p2",
      anchorId: "m01-p2-topic-solid"
    },
    {
      title: "Algorithms",
      lessonId: "m01-p3",
      anchorId: "m01-p3-topic-algorithms"
    },
    {
      title: "Data structures",
      lessonId: "m01-p3",
      anchorId: "m01-p3-topic-data-structures"
    },
    {
      title: "Time complexity",
      lessonId: "m01-p3",
      anchorId: "m01-p3-topic-time-complexity"
    },
    {
      title: "Space complexity",
      lessonId: "m01-p3",
      anchorId: "m01-p3-topic-space-complexity"
    },
    {
      title: "Big O",
      lessonId: "m01-p3",
      anchorId: "m01-p3-topic-big-o"
    },
    {
      title: "Recursion",
      lessonId: "m01-p3",
      anchorId: "m01-p3-topic-recursion"
    },
    {
      title: "Sorting",
      lessonId: "m01-p3",
      anchorId: "m01-p3-topic-sorting"
    },
    {
      title: "Searching",
      lessonId: "m01-p3",
      anchorId: "m01-p3-topic-searching"
    },
    {
      title: "Hash maps",
      lessonId: "m01-p3",
      anchorId: "m01-p3-topic-hash-maps"
    },
    {
      title: "Stacks",
      lessonId: "m01-p3",
      anchorId: "m01-p3-topic-stacks"
    },
    {
      title: "Queues",
      lessonId: "m01-p3",
      anchorId: "m01-p3-topic-queues"
    },
    {
      title: "Trees",
      lessonId: "m01-p3",
      anchorId: "m01-p3-topic-trees"
    },
    {
      title: "Graph fundamentals",
      lessonId: "m01-p3",
      anchorId: "m01-p3-topic-graph-fundamentals"
    },
    {
      title: "JavaScript",
      lessonId: "m01-p4",
      anchorId: "m01-p4-topic-javascript"
    },
    {
      title: "ES6+",
      lessonId: "m01-p4",
      anchorId: "m01-p4-topic-es6"
    },
    {
      title: "Closures",
      lessonId: "m01-p4",
      anchorId: "m01-p4-topic-closures"
    },
    {
      title: "Scope",
      lessonId: "m01-p4",
      anchorId: "m01-p4-topic-scope"
    },
    {
      title: "Hoisting",
      lessonId: "m01-p4",
      anchorId: "m01-p4-topic-hoisting"
    },
    {
      title: "Prototype",
      lessonId: "m01-p4",
      anchorId: "m01-p4-topic-prototype"
    },
    {
      title: "Prototypal inheritance",
      lessonId: "m01-p4",
      anchorId: "m01-p4-topic-prototypal-inheritance"
    },
    {
      title: "this",
      lessonId: "m01-p4",
      anchorId: "m01-p4-topic-this"
    },
    {
      title: "Arrow functions",
      lessonId: "m01-p4",
      anchorId: "m01-p4-topic-arrow-functions"
    },
    {
      title: "Promises",
      lessonId: "m01-p4",
      anchorId: "m01-p4-topic-promises"
    },
    {
      title: "Async/await",
      lessonId: "m01-p4",
      anchorId: "m01-p4-topic-async-await"
    },
    {
      title: "Event loop",
      lessonId: "m01-p4",
      anchorId: "m01-p4-topic-event-loop"
    },
    {
      title: "Microtasks",
      lessonId: "m01-p4",
      anchorId: "m01-p4-topic-microtasks"
    },
    {
      title: "Macrotasks",
      lessonId: "m01-p4",
      anchorId: "m01-p4-topic-macrotasks"
    },
    {
      title: "Memory management",
      lessonId: "m01-p4",
      anchorId: "m01-p4-topic-memory-management"
    },
    {
      title: "Garbage collection",
      lessonId: "m01-p4",
      anchorId: "m01-p4-topic-garbage-collection"
    },
    {
      title: "TypeScript fundamentals",
      lessonId: "m01-p5",
      anchorId: "m01-p5-topic-typescript-fundamentals"
    },
    {
      title: "Type systems",
      lessonId: "m01-p5",
      anchorId: "m01-p5-topic-type-systems"
    },
    {
      title: "Generics",
      lessonId: "m01-p5",
      anchorId: "m01-p5-topic-generics"
    },
    {
      title: "Interfaces",
      lessonId: "m01-p5",
      anchorId: "m01-p5-topic-interfaces"
    },
    {
      title: "Type safety",
      lessonId: "m01-p5",
      anchorId: "m01-p5-topic-type-safety"
    }
  ]),

  defineModule(
    2,
    "React & Frontend Engineering",
    "frontend",
    [
      {
        title: "React architecture",
        lessonId: "m02-p1",
        anchorId: "m02-p1-topic-react-architecture"
      },
      {
        title: "Components",
        lessonId: "m02-p1",
        anchorId: "m02-p1-topic-components"
      },
      {
        title: "Props",
        lessonId: "m02-p1",
        anchorId: "m02-p1-topic-props"
      },
      {
        title: "State",
        lessonId: "m02-p1",
        anchorId: "m02-p1-topic-state"
      },
      {
        title: "Rendering",
        lessonId: "m02-p1",
        anchorId: "m02-p1-topic-rendering"
      },
      {
        title: "Virtual DOM",
        lessonId: "m02-p1",
        anchorId: "m02-p1-topic-virtual-dom"
      },
      {
        title: "JSX",
        lessonId: "m02-p1",
        anchorId: "m02-p1-topic-jsx"
      },
      {
        title: "Hooks",
        lessonId: "m02-p2",
        anchorId: "m02-p2-topic-hooks"
      },
      {
        title: "useState",
        lessonId: "m02-p2",
        anchorId: "m02-p2-topic-usestate"
      },
      {
        title: "useEffect",
        lessonId: "m02-p2",
        anchorId: "m02-p2-topic-useeffect"
      },
      {
        title: "useRef",
        lessonId: "m02-p2",
        anchorId: "m02-p2-topic-useref"
      },
      {
        title: "useContext",
        lessonId: "m02-p2",
        anchorId: "m02-p2-topic-usecontext"
      },
      {
        title: "useMemo",
        lessonId: "m02-p2",
        anchorId: "m02-p2-topic-usememo"
      },
      {
        title: "useCallback",
        lessonId: "m02-p2",
        anchorId: "m02-p2-topic-usecallback"
      },
      {
        title: "React.memo",
        lessonId: "m02-p2",
        anchorId: "m02-p2-topic-reactmemo"
      },
      {
        title: "Custom hooks",
        lessonId: "m02-p2",
        anchorId: "m02-p2-topic-custom-hooks"
      },
      {
        title: "Component lifecycle concepts",
        lessonId: "m02-p1",
        anchorId: "m02-p1-topic-component-lifecycle-concepts"
      },
      {
        title: "State management",
        lessonId: "m02-p3",
        anchorId: "m02-p3-topic-state-management"
      },
      {
        title: "Context API",
        lessonId: "m02-p3",
        anchorId: "m02-p3-topic-context-api"
      },
      {
        title: "Redux",
        lessonId: "m02-p3",
        anchorId: "m02-p3-topic-redux"
      },
      {
        title: "Redux Toolkit",
        lessonId: "m02-p3",
        anchorId: "m02-p3-topic-redux-toolkit"
      },
      {
        title: "React Query / TanStack Query",
        lessonId: "m02-p3",
        anchorId: "m02-p3-topic-tanstack-query"
      },
      {
        title: "React Router",
        lessonId: "m02-p3",
        anchorId: "m02-p3-topic-react-router"
      },
      {
        title: "Forms",
        lessonId: "m02-p3",
        anchorId: "m02-p3-topic-forms"
      },
      {
        title: "Validation",
        lessonId: "m02-p3",
        anchorId: "m02-p3-topic-validation"
      },
      {
        title: "API integration",
        lessonId: "m02-p3",
        anchorId: "m02-p3-topic-api-integration"
      },
      {
        title: "Authentication",
        lessonId: "m02-p3",
        anchorId: "m02-p3-topic-authentication"
      },
      {
        title: "Authorization",
        lessonId: "m02-p3",
        anchorId: "m02-p3-topic-authorization"
      },
      {
        title: "Error boundaries",
        lessonId: "m02-p4",
        anchorId: "m02-p4-topic-error-boundaries"
      },
      {
        title: "Lazy loading",
        lessonId: "m02-p4",
        anchorId: "m02-p4-topic-lazy-loading"
      },
      {
        title: "Code splitting",
        lessonId: "m02-p4",
        anchorId: "m02-p4-topic-code-splitting"
      },
      {
        title: "Performance optimization",
        lessonId: "m02-p4",
        anchorId: "m02-p4-topic-performance-optimization"
      },
      {
        title: "Rendering optimization",
        lessonId: "m02-p4",
        anchorId: "m02-p4-topic-rendering-optimization"
      },
      {
        title: "Memoization",
        lessonId: "m02-p4",
        anchorId: "m02-p4-topic-memoization"
      },
      {
        title: "Frontend caching",
        lessonId: "m02-p4",
        anchorId: "m02-p4-topic-frontend-caching"
      },
      {
        title: "Accessibility",
        lessonId: "m02-p4",
        anchorId: "m02-p4-topic-accessibility"
      },
      {
        title: "Responsive design",
        lessonId: "m02-p4",
        anchorId: "m02-p4-topic-responsive-design"
      },
      {
        title: "Security",
        lessonId: "m02-p4",
        anchorId: "m02-p4-topic-security"
      },
      {
        title: "XSS",
        lessonId: "m02-p4",
        anchorId: "m02-p4-topic-xss"
      },
      {
        title: "CSRF",
        lessonId: "m02-p4",
        anchorId: "m02-p4-topic-csrf"
      },
      {
        title: "Large frontend architecture",
        lessonId: "m02-p4",
        anchorId: "m02-p4-topic-large-frontend-architecture"
      },
      {
        title: "Component design patterns",
        lessonId: "m02-p4",
        anchorId: "m02-p4-topic-component-design-patterns"
      },
      {
        title: "Testing",
        lessonId: "m02-p4",
        anchorId: "m02-p4-topic-testing"
      },
      {
        title: "Unit testing",
        lessonId: "m02-p4",
        anchorId: "m02-p4-topic-unit-testing"
      },
      {
        title: "Integration testing",
        lessonId: "m02-p4",
        anchorId: "m02-p4-topic-integration-testing"
      },
      {
        title: "Frontend debugging",
        lessonId: "m02-p4",
        anchorId: "m02-p4-topic-frontend-debugging"
      }
    ],
    "Includes real React code and optimization examples."
  ),

  defineModule(3, "Node.js & Backend Engineering", "backend", [
    {
      title: "Node.js architecture",
      lessonId: "m03-p1",
      anchorId: "m03-p1-topic-nodejs-architecture"
    },
    {
      title: "V8",
      lessonId: "m03-p1",
      anchorId: "m03-p1-topic-v8"
    },
    {
      title: "libuv",
      lessonId: "m03-p1",
      anchorId: "m03-p1-topic-libuv"
    },
    {
      title: "Event loop",
      lessonId: "m03-p1",
      anchorId: "m03-p1-topic-event-loop"
    },
    {
      title: "Thread pool",
      lessonId: "m03-p1",
      anchorId: "m03-p1-topic-thread-pool"
    },
    {
      title: "Worker threads",
      lessonId: "m03-p1",
      anchorId: "m03-p1-topic-worker-threads"
    },
    {
      title: "Process vs thread",
      lessonId: "m03-p1",
      anchorId: "m03-p1-topic-process-vs-thread"
    },
    {
      title: "Async I/O",
      lessonId: "m03-p1",
      anchorId: "m03-p1-topic-async-io"
    },
    {
      title: "Streams",
      lessonId: "m03-p1",
      anchorId: "m03-p1-topic-streams"
    },
    {
      title: "Buffers",
      lessonId: "m03-p1",
      anchorId: "m03-p1-topic-buffers"
    },
    {
      title: "File handling",
      lessonId: "m03-p1",
      anchorId: "m03-p1-topic-file-handling"
    },
    {
      title: "Express",
      lessonId: "m03-p2",
      anchorId: "m03-p2-topic-express"
    },
    {
      title: "Middleware",
      lessonId: "m03-p2",
      anchorId: "m03-p2-topic-middleware"
    },
    {
      title: "Routing",
      lessonId: "m03-p2",
      anchorId: "m03-p2-topic-routing"
    },
    {
      title: "REST API",
      lessonId: "m03-p2",
      anchorId: "m03-p2-topic-rest-api"
    },
    {
      title: "API design",
      lessonId: "m03-p2",
      anchorId: "m03-p2-topic-api-design"
    },
    {
      title: "HTTP",
      lessonId: "m03-p2",
      anchorId: "m03-p2-topic-http"
    },
    {
      title: "HTTP methods",
      lessonId: "m03-p2",
      anchorId: "m03-p2-topic-http-methods"
    },
    {
      title: "Status codes",
      lessonId: "m03-p2",
      anchorId: "m03-p2-topic-status-codes"
    },
    {
      title: "Headers",
      lessonId: "m03-p2",
      anchorId: "m03-p2-topic-headers"
    },
    {
      title: "Request lifecycle",
      lessonId: "m03-p2",
      anchorId: "m03-p2-topic-request-lifecycle"
    },
    {
      title: "API versioning",
      lessonId: "m03-p2",
      anchorId: "m03-p2-topic-api-versioning"
    },
    {
      title: "API validation",
      lessonId: "m03-p2",
      anchorId: "m03-p2-topic-api-validation"
    },
    {
      title: "Error handling",
      lessonId: "m03-p2",
      anchorId: "m03-p2-topic-error-handling"
    },
    {
      title: "Logging",
      lessonId: "m03-p2",
      anchorId: "m03-p2-topic-logging"
    },
    {
      title: "Authentication",
      lessonId: "m03-p3",
      anchorId: "m03-p3-topic-authentication"
    },
    {
      title: "JWT",
      lessonId: "m03-p3",
      anchorId: "m03-p3-topic-jwt"
    },
    {
      title: "Refresh tokens",
      lessonId: "m03-p3",
      anchorId: "m03-p3-topic-refresh-tokens"
    },
    {
      title: "Session management",
      lessonId: "m03-p3",
      anchorId: "m03-p3-topic-session-management"
    },
    {
      title: "Authorization",
      lessonId: "m03-p3",
      anchorId: "m03-p3-topic-authorization"
    },
    {
      title: "RBAC",
      lessonId: "m03-p3",
      anchorId: "m03-p3-topic-rbac"
    },
    {
      title: "OAuth fundamentals",
      lessonId: "m03-p3",
      anchorId: "m03-p3-topic-oauth-fundamentals"
    },
    {
      title: "Rate limiting",
      lessonId: "m03-p3",
      anchorId: "m03-p3-topic-rate-limiting"
    },
    {
      title: "CORS",
      lessonId: "m03-p3",
      anchorId: "m03-p3-topic-cors"
    },
    {
      title: "Security",
      lessonId: "m03-p3",
      anchorId: "m03-p3-topic-security"
    },
    {
      title: "Input sanitization",
      lessonId: "m03-p3",
      anchorId: "m03-p3-topic-input-sanitization"
    },
    {
      title: "SQL injection",
      lessonId: "m03-p3",
      anchorId: "m03-p3-topic-sql-injection"
    },
    {
      title: "NoSQL injection",
      lessonId: "m03-p3",
      anchorId: "m03-p3-topic-nosql-injection"
    },
    {
      title: "API security",
      lessonId: "m03-p3",
      anchorId: "m03-p3-topic-api-security"
    },
    {
      title: "Pagination",
      lessonId: "m03-p4",
      anchorId: "m03-p4-topic-pagination"
    },
    {
      title: "Filtering",
      lessonId: "m03-p4",
      anchorId: "m03-p4-topic-filtering"
    },
    {
      title: "Sorting",
      lessonId: "m03-p4",
      anchorId: "m03-p4-topic-sorting"
    },
    {
      title: "File uploads",
      lessonId: "m03-p4",
      anchorId: "m03-p4-topic-file-uploads"
    },
    {
      title: "Background jobs",
      lessonId: "m03-p4",
      anchorId: "m03-p4-topic-background-jobs"
    },
    {
      title: "Queue systems",
      lessonId: "m03-p4",
      anchorId: "m03-p4-topic-queue-systems"
    },
    {
      title: "WebSockets",
      lessonId: "m03-p4",
      anchorId: "m03-p4-topic-websockets"
    },
    {
      title: "Connection pooling",
      lessonId: "m03-p4",
      anchorId: "m03-p4-topic-connection-pooling"
    },
    {
      title: "Microservices",
      lessonId: "m03-p4",
      anchorId: "m03-p4-topic-microservices"
    },
    {
      title: "Modular monolith",
      lessonId: "m03-p4",
      anchorId: "m03-p4-topic-modular-monolith"
    },
    {
      title: "Backend design patterns",
      lessonId: "m03-p4",
      anchorId: "m03-p4-topic-backend-design-patterns"
    },
    {
      title: "Dependency injection",
      lessonId: "m03-p4",
      anchorId: "m03-p4-topic-dependency-injection"
    },
    {
      title: "Testing",
      lessonId: "m03-p4",
      anchorId: "m03-p4-topic-testing"
    },
    {
      title: "Unit tests",
      lessonId: "m03-p4",
      anchorId: "m03-p4-topic-unit-tests"
    },
    {
      title: "Integration tests",
      lessonId: "m03-p4",
      anchorId: "m03-p4-topic-integration-tests"
    },
    {
      title: "API tests",
      lessonId: "m03-p4",
      anchorId: "m03-p4-topic-api-tests"
    },
    {
      title: "Performance optimization",
      lessonId: "m03-p4",
      anchorId: "m03-p4-topic-performance-optimization"
    }
  ]),

  defineModule(4, "Database Fundamentals & Database Architecture", "databases", [
    {
      title: "What a database is",
      lessonId: "m04-p1",
      anchorId: "m04-p1-topic-what-a-database-is"
    },
    {
      title: "Database architecture",
      lessonId: "m04-p1",
      anchorId: "m04-p1-topic-database-architecture"
    },
    {
      title: "Database engines",
      lessonId: "m04-p1",
      anchorId: "m04-p1-topic-database-engines"
    },
    {
      title: "Relational databases",
      lessonId: "m04-p1",
      anchorId: "m04-p1-topic-relational-databases"
    },
    {
      title: "NoSQL databases",
      lessonId: "m04-p1",
      anchorId: "m04-p1-topic-nosql-databases"
    },
    {
      title: "Data modeling",
      lessonId: "m04-p1",
      anchorId: "m04-p1-topic-data-modeling"
    },
    {
      title: "ER diagrams",
      lessonId: "m04-p1",
      anchorId: "m04-p1-topic-er-diagrams"
    },
    {
      title: "Tables",
      lessonId: "m04-p1",
      anchorId: "m04-p1-topic-tables"
    },
    {
      title: "Rows",
      lessonId: "m04-p1",
      anchorId: "m04-p1-topic-rows"
    },
    {
      title: "Columns",
      lessonId: "m04-p1",
      anchorId: "m04-p1-topic-columns"
    },
    {
      title: "Primary keys",
      lessonId: "m04-p1",
      anchorId: "m04-p1-topic-primary-keys"
    },
    {
      title: "Foreign keys",
      lessonId: "m04-p1",
      anchorId: "m04-p1-topic-foreign-keys"
    },
    {
      title: "Unique constraints",
      lessonId: "m04-p1",
      anchorId: "m04-p1-topic-unique-constraints"
    },
    {
      title: "Check constraints",
      lessonId: "m04-p1",
      anchorId: "m04-p1-topic-check-constraints"
    },
    {
      title: "Normalization",
      lessonId: "m04-p2",
      anchorId: "m04-p2-topic-normalization"
    },
    {
      title: "Denormalization",
      lessonId: "m04-p2",
      anchorId: "m04-p2-topic-denormalization"
    },
    {
      title: "1NF",
      lessonId: "m04-p2",
      anchorId: "m04-p2-topic-1nf"
    },
    {
      title: "2NF",
      lessonId: "m04-p2",
      anchorId: "m04-p2-topic-2nf"
    },
    {
      title: "3NF",
      lessonId: "m04-p2",
      anchorId: "m04-p2-topic-3nf"
    },
    {
      title: "BCNF overview",
      lessonId: "m04-p2",
      anchorId: "m04-p2-topic-bcnf-overview"
    },
    "Transactions",
    "ACID",
    "Isolation levels",
    "Dirty reads",
    "Non-repeatable reads",
    "Phantom reads",
    "Locks",
    "Deadlocks",
    "MVCC",
    "Concurrency",
    "Database consistency",
    "Data integrity",
    "Schema migrations",
    "Connection pooling",
    "Database backups",
    "Recovery"
  ]),

  defineModule(5, "PostgreSQL", "databases", [
    "PostgreSQL architecture",
    "PostgreSQL internals",
    "Database storage",
    "Pages and tuples",
    "MVCC",
    "WAL",
    "Transactions",
    "SQL",
    "SELECT",
    "INSERT",
    "UPDATE",
    "DELETE",
    "JOIN",
    "INNER JOIN",
    "LEFT JOIN",
    "RIGHT JOIN",
    "FULL JOIN",
    "CROSS JOIN",
    "Self joins",
    "Subqueries",
    "CTEs",
    "Recursive CTEs",
    "Window functions",
    "Views",
    "Materialized views",
    "Functions",
    "Stored procedures",
    "Triggers",
    "Constraints",
    "JSON",
    "JSONB",
    "Locking",
    "Isolation levels",
    "Partitioning",
    "Replication",
    "Connection pooling",
    "EXPLAIN",
    "EXPLAIN ANALYZE",
    "Query planner",
    "Query optimization",
    "Indexing",
    "Performance tuning",
    "Vacuum",
    "Autovacuum",
    "Database maintenance",
    "Backup and recovery"
  ]),

  defineModule(6, "MySQL", "databases", [
    "MySQL architecture",
    "Storage engines",
    "InnoDB",
    "MyISAM overview",
    "SQL",
    "Transactions",
    "ACID",
    "Isolation levels",
    "Locking",
    "Deadlocks",
    "Indexes",
    "Composite indexes",
    "Clustered indexes",
    "Secondary indexes",
    "Query optimization",
    "EXPLAIN",
    "Query execution",
    "Stored procedures",
    "Triggers",
    "Views",
    "Replication",
    "Partitioning",
    "Performance tuning",
    "Connection management",
    "Backup and recovery"
  ]),

  defineModule(7, "Microsoft SQL Server (MSSQL)", "databases", [
    "SQL Server architecture",
    "SQL Server engine",
    "Storage",
    "Pages",
    "Extents",
    "Tables",
    "Indexes",
    "Clustered indexes",
    "Non-clustered indexes",
    "Heap tables",
    "Stored procedures",
    "Functions",
    "Views",
    "Triggers",
    "Transactions",
    "Locking",
    "Isolation levels",
    "Deadlocks",
    "Query execution plans",
    "Query optimization",
    "Statistics",
    "Execution plan analysis",
    "Index maintenance",
    "Fragmentation",
    "Parameter sniffing",
    "Query tuning",
    "Temp tables",
    "Table variables",
    "CTEs",
    "Window functions",
    "Partitioning",
    "SQL Server Agent",
    "Backup and recovery",
    "Performance monitoring"
  ]),

  defineModule(
    8,
    "Database Indexing — Deep Dive",
    "databases",
    [
      "Why indexes exist",
      "How indexes work",
      "B-Tree",
      "B+ Tree",
      "Hash indexes",
      "Clustered indexes",
      "Non-clustered indexes",
      "Composite indexes",
      "Covering indexes",
      "Unique indexes",
      "Partial indexes",
      "Filtered indexes",
      "Functional indexes",
      "Expression indexes",
      "Full-text indexes",
      "Spatial indexes",
      "Index selectivity",
      "Cardinality",
      "Index statistics",
      "Index scans",
      "Index seeks",
      "Index lookups",
      "Table scans",
      "Sequential scans",
      "Composite index column order",
      "Leftmost-prefix principle",
      "Sorting using indexes",
      "Filtering using indexes",
      "JOIN optimization using indexes",
      "GROUP BY optimization",
      "ORDER BY optimization",
      "Index-only scans",
      "Index maintenance",
      "Fragmentation",
      "Write overhead",
      "Storage overhead",
      "Over-indexing",
      "Under-indexing",
      "Index selection",
      "Index design for millions of records"
    ],
    "Instructions: Compare indexing strategies across PostgreSQL, MySQL, MSSQL, and MongoDB; include realistic examples of slow query, incorrect index, better index, execution plan, performance comparison, and production index strategy."
  ),

  defineModule(
    9,
    "Database Query Optimization",
    "databases",
    [
      "Identifying slow queries",
      "Query profiling",
      "Query execution plans",
      "Query cost",
      "CPU",
      "Memory",
      "Disk I/O",
      "Network",
      "Locks",
      "Wait events",
      "Query rewriting",
      "JOIN optimization",
      "Subquery optimization",
      "N+1 problem",
      "Pagination",
      "Offset pagination",
      "Cursor pagination",
      "Keyset pagination",
      "Large dataset pagination",
      "Batch operations",
      "Bulk inserts",
      "Bulk updates",
      "Connection pooling",
      "Database bottlenecks",
      "Database monitoring",
      "Query caching",
      "Data partitioning",
      "Read replicas",
      "Horizontal scaling",
      "Vertical scaling"
    ],
    "Instructions: Practical examples at 1M, 10M, and 100M records; teach investigation methodology."
  ),

  defineModule(
    10,
    "MongoDB",
    "databases",
    [
      "MongoDB architecture",
      "BSON",
      "Documents",
      "Collections",
      "CRUD",
      "Schema design",
      "Flexible schemas",
      "Embedding",
      "Referencing",
      "Data modeling",
      "Aggregation",
      "Aggregation pipelines",
      "$match",
      "$project",
      "$group",
      "$sort",
      "$lookup",
      "$unwind",
      "$facet",
      "$limit",
      "$skip",
      "$addFields",
      "$set",
      "$replaceRoot",
      "Indexes",
      "Compound indexes",
      "Unique indexes",
      "TTL indexes",
      "Text indexes",
      "Geospatial indexes",
      "Partial indexes",
      "Multikey indexes",
      "Index selection",
      "Explain plans",
      "Query optimization",
      "Transactions",
      "Replication",
      "Replica sets",
      "Sharding",
      "Shard keys",
      "Read concern",
      "Write concern",
      "Read preference",
      "Connection pooling",
      "MongoDB performance",
      "MongoDB security",
      "MongoDB backup",
      "MongoDB schema evolution"
    ],
    "Includes examples and comparisons against SQL databases."
  ),

  defineModule(11, "Cassandra", "databases", [
    "Cassandra architecture",
    "Distributed database fundamentals",
    "Wide-column model",
    "Nodes",
    "Clusters",
    "Data centers",
    "Replication",
    "Partition keys",
    "Clustering keys",
    "Data modeling",
    "Query-driven design",
    "Consistency levels",
    "CAP theorem",
    "Distributed writes",
    "Write path",
    "Commit log",
    "Memtable",
    "SSTables",
    "Compaction",
    "Tombstones",
    "TTL",
    "Secondary indexes",
    "Cassandra indexing limitations",
    "Failure handling",
    "Scaling",
    "Repair",
    "Monitoring",
    "Performance optimization",
    "Cassandra use cases",
    "When Cassandra should not be used"
  ]),

  defineModule(
    12,
    "Redis",
    "databases",
    [
      "Redis architecture",
      "In-memory databases",
      "Key/value storage",
      "Strings",
      "Hashes",
      "Lists",
      "Sets",
      "Sorted sets",
      "Streams",
      "Pub/Sub",
      "TTL",
      "Expiration",
      "Caching",
      "Cache-aside",
      "Write-through",
      "Write-behind",
      "Read-through",
      "Cache invalidation",
      "Cache stampede",
      "Cache penetration",
      "Cache avalanche",
      "Distributed locks",
      "Rate limiting",
      "Redis queues",
      "Redis persistence",
      "RDB",
      "AOF",
      "Replication",
      "Redis Sentinel",
      "Redis Cluster",
      "Eviction policies",
      "Memory optimization",
      "Redis performance",
      "Redis security",
      "Redis monitoring"
    ],
    "Includes practical Redis examples."
  ),

  defineModule(13, "GraphQL", "backend", [
    "GraphQL fundamentals",
    "GraphQL vs REST",
    "Schema",
    "Types",
    "Queries",
    "Mutations",
    "Subscriptions",
    "Resolvers",
    "Scalar types",
    "Object types",
    "Input types",
    "Interfaces",
    "Unions",
    "Authentication",
    "Authorization",
    "Pagination",
    "Cursor pagination",
    "DataLoader",
    "N+1 problem",
    "Query complexity",
    "Query depth",
    "Rate limiting",
    "Caching",
    "Error handling",
    "GraphQL security",
    "GraphQL architecture",
    "Node.js implementation"
  ]),

  defineModule(
    14,
    "Software Engineering & Design Patterns",
    "architecture",
    [
      "SOLID",
      "Clean code",
      "DRY",
      "KISS",
      "YAGNI",
      "Dependency injection",
      "Design patterns",
      "Factory",
      "Strategy",
      "Observer",
      "Singleton",
      "Adapter",
      "Decorator",
      "Repository",
      "Builder",
      "Facade",
      "Command",
      "Chain of responsibility",
      "Layered architecture",
      "Clean architecture",
      "Hexagonal architecture",
      "Domain-driven design",
      "Modular monolith",
      "Separation of concerns",
      "Coupling",
      "Cohesion",
      "Technical debt",
      "Refactoring",
      "Code review",
      "Testing strategies"
    ],
    "Includes guidance on avoiding overengineering."
  ),

  defineModule(
    15,
    "System Design",
    "architecture",
    [
      ["Requirements analysis", "Functional requirements"],
      ["Requirements analysis", "Non-functional requirements"],
      ["Requirements analysis", "Constraints"],
      ["Requirements analysis", "User roles"],
      ["Requirements analysis", "User journeys"],
      ["Requirements analysis", "API requirements"],
      ["Requirements analysis", "Data requirements"],
      ["Requirements analysis", "Security requirements"],
      ["Requirements analysis", "Scalability requirements"],
      ["Requirements analysis", "Availability requirements"],
      ["Requirements analysis", "Performance requirements"],
      ["Requirements analysis", "SLA"],
      ["Requirements analysis", "SLO"],
      ["Requirements analysis", "SLIs"],
      ["Capacity estimation", "Users"],
      ["Capacity estimation", "Requests per second"],
      ["Capacity estimation", "Concurrent users"],
      ["Capacity estimation", "Peak traffic"],
      ["Capacity estimation", "Storage"],
      ["Capacity estimation", "Bandwidth"],
      ["Capacity estimation", "Database growth"],
      ["Capacity estimation", "Cache size"],
      ["Capacity estimation", "Memory"],
      ["Capacity estimation", "CPU"],
      ["Capacity estimation", "File storage"],
      ["Capacity estimation", "Cost estimation"],
      ["Architecture", "Monolith"],
      ["Architecture", "Modular monolith"],
      ["Architecture", "Microservices"],
      ["Architecture", "Event-driven architecture"],
      ["Architecture", "Serverless"],
      ["Architecture", "Distributed architecture"],
      ["Architecture", "Service boundaries"],
      ["Architecture", "API gateways"],
      ["Architecture", "Load balancers"],
      ["Architecture", "Reverse proxies"],
      ["Architecture", "Horizontal scaling"],
      ["Architecture", "Vertical scaling"],
      ["Architecture", "Stateless vs stateful services"],
      ["Database architecture decisions", "PostgreSQL"],
      ["Database architecture decisions", "MySQL"],
      ["Database architecture decisions", "MSSQL"],
      ["Database architecture decisions", "MongoDB"],
      ["Database architecture decisions", "Cassandra"],
      ["Database architecture decisions", "Redis"],
      ["Database architecture decisions", "Vector databases"],
      ["Database architecture decisions", "Graph databases"],
      ["Distributed systems", "CAP"],
      ["Distributed systems", "PACELC"],
      ["Distributed systems", "Consistency"],
      ["Distributed systems", "Availability"],
      ["Distributed systems", "Partition tolerance"],
      ["Distributed systems", "Eventual consistency"],
      ["Distributed systems", "Strong consistency"],
      ["Distributed systems", "Distributed transactions"],
      ["Distributed systems", "Sagas"],
      ["Distributed systems", "Outbox pattern"],
      ["Distributed systems", "Idempotency"],
      ["Distributed systems", "Retries"],
      ["Distributed systems", "Circuit breakers"],
      ["Distributed systems", "Rate limiting"],
      ["Distributed systems", "Message queues"],
      ["Distributed systems", "Kafka"],
      ["Distributed systems", "RabbitMQ"],
      ["Distributed systems", "Dead-letter queues"],
      ["Distributed systems", "Distributed locks"],
      ["Distributed systems", "Event-driven systems"],
      ["Distributed systems", "Observability"],
      ["Distributed systems", "Fault tolerance"],
      ["Distributed systems", "Resilience"],
      ["Distributed systems", "Disaster recovery"],
      ["Architecture decision framework", "Architecture decision framework"],
      ["System design practice", "URL shortener"],
      ["System design practice", "E-commerce system"],
      ["System design practice", "Chat application"],
      ["System design practice", "Notification system"],
      ["System design practice", "File storage system"],
      ["System design practice", "Video streaming platform"],
      ["System design practice", "Ride-sharing system"],
      ["System design practice", "Food delivery system"],
      ["System design practice", "Online examination platform"],
      ["System design practice", "Report generation platform"],
      ["System design practice", "Multi-tenant SaaS"],
      ["System design practice", "AI document processing system"],
      ["System design practice", "RAG-based educational platform"],
      ["System design practice", "Real-time monitoring platform"],
      ["System design practice", "CCTV object detection platform"]
    ],
    "Framework dimensions (11): technology choice, rejected alternatives, trade-offs, cost, complexity, scaling, security, failure handling, maintenance, migration, future evolution. Each worked design includes 16 deliverables."
  ),

  defineModule(
    16,
    "Distributed Systems & Message Queues",
    "architecture",
    [
      "Distributed systems",
      "Communication",
      "Network failures",
      "Latency",
      "Reliability",
      "Consistency",
      "Fault tolerance",
      "Event-driven architecture",
      "Messaging",
      "Kafka",
      "RabbitMQ",
      "Producers",
      "Consumers",
      "Topics",
      "Partitions",
      "Consumer groups",
      "Offsets",
      "Ordering",
      "Retries",
      "Dead-letter queues",
      "Idempotency",
      "Duplicate messages",
      "Delivery guarantees",
      "At-most-once",
      "At-least-once",
      "Exactly-once semantics and their limitations",
      "Event sourcing",
      "CQRS",
      "Outbox pattern",
      "Sagas",
      "Backpressure",
      "Distributed locks",
      "Observability"
    ],
    "Includes implementation examples."
  ),

  defineModule(17, "AI & LLM Engineering", "ai", [
    "AI",
    "Machine learning",
    "Deep learning",
    "LLMs",
    "Transformers",
    "Attention",
    "Tokens",
    "Tokenization",
    "Context windows",
    "Model parameters",
    "Temperature",
    "Sampling",
    "Embeddings",
    "Prompt engineering",
    "System prompts",
    "Structured outputs",
    "Function calling",
    "Tool calling",
    "Agents",
    "Model selection",
    "Model evaluation",
    "Hallucination",
    "Safety",
    "AI security",
    "Prompt injection",
    "API integration",
    "Cost optimization",
    "Latency optimization",
    "AI observability",
    "AI production architecture",
    "Model limitations"
  ]),

  defineModule(
    18,
    "RAG",
    "ai",
    [
      ["Fundamentals", "RAG"],
      ["Fundamentals", "Why RAG"],
      ["Fundamentals", "RAG vs fine-tuning"],
      ["Fundamentals", "RAG pipeline"],
      ["Fundamentals", "Document ingestion"],
      ["Fundamentals", "Text extraction"],
      ["Fundamentals", "OCR"],
      ["Fundamentals", "PDF"],
      ["Fundamentals", "Word documents"],
      ["Fundamentals", "Images"],
      ["Fundamentals", "Tables"],
      ["Fundamentals", "Chunking"],
      ["Fundamentals", "Embeddings"],
      ["Fundamentals", "Vector search"],
      ["Fundamentals", "Retrieval"],
      ["Fundamentals", "Context construction"],
      ["Fundamentals", "Prompt generation"],
      ["Fundamentals", "LLM generation"],
      ["Advanced RAG", "Chunking strategies"],
      ["Advanced RAG", "Fixed chunking"],
      ["Advanced RAG", "Semantic chunking"],
      ["Advanced RAG", "Recursive chunking"],
      ["Advanced RAG", "Overlapping chunks"],
      ["Advanced RAG", "Metadata"],
      ["Advanced RAG", "Metadata filtering"],
      ["Advanced RAG", "Embedding models"],
      ["Advanced RAG", "Embedding dimensions"],
      ["Advanced RAG", "Cosine similarity"],
      ["Advanced RAG", "Dot product"],
      ["Advanced RAG", "Euclidean distance"],
      ["Advanced RAG", "ANN"],
      ["Advanced RAG", "Exact search"],
      ["Advanced RAG", "Hybrid search"],
      ["Advanced RAG", "BM25"],
      ["Advanced RAG", "Reranking"],
      ["Advanced RAG", "Cross-encoder reranking"],
      ["Advanced RAG", "Query rewriting"],
      ["Advanced RAG", "Multi-query retrieval"],
      ["Advanced RAG", "Context compression"],
      ["Advanced RAG", "Retrieval evaluation"],
      ["Advanced RAG", "Precision"],
      ["Advanced RAG", "Recall"],
      ["Advanced RAG", "MRR"],
      ["Advanced RAG", "NDCG"],
      ["Advanced RAG", "Groundedness"],
      ["Advanced RAG", "Hallucination reduction"],
      ["Advanced RAG", "RAG observability"],
      ["Advanced RAG", "RAG security"],
      ["Advanced RAG", "Prompt injection in documents"],
      ["Advanced RAG", "Multi-tenant RAG"],
      ["Advanced RAG", "RAG scalability"],
      ["Advanced RAG", "RAG cost optimization"],
      ["Advanced RAG", "RAG latency optimization"],
      ["Advanced RAG", "RAG caching"],
      ["Advanced RAG", "RAG failure handling"]
    ],
    "Includes complete examples of a RAG pipeline."
  ),

  defineModule(
    19,
    "Vector Databases",
    "ai",
    [
      "Vector databases",
      "Embeddings",
      "Similarity",
      "Vector storage",
      "ANN",
      "Exact search",
      "HNSW",
      "IVF",
      "IVF-PQ",
      "Quantization",
      "Vector indexing",
      "Metadata filtering",
      "Hybrid search",
      "Reranking",
      "Vector performance",
      "Vector memory",
      "Vector scaling",
      "Vector database benchmarking",
      ["Databases Compared", "PostgreSQL pgvector"],
      ["Databases Compared", "Qdrant"],
      ["Databases Compared", "Milvus"],
      ["Databases Compared", "Pinecone"],
      ["Databases Compared", "Weaviate"],
      ["Databases Compared", "MongoDB Atlas Vector Search"],
      ["Databases Compared", "Redis Vector Search"],
      ["Selection Criteria", "When PostgreSQL is enough"],
      ["Selection Criteria", "When a dedicated vector database is justified"]
    ],
    "Master prompt lists 'Vector storage' twice and asks to compare all 7 databases across choice, cost, scaling, complexity, performance, and trade-offs."
  ),

  defineModule(
    20,
    "DevOps & CI/CD",
    "devops",
    [
      "Git",
      "Git branching",
      "Git workflows",
      "GitHub",
      "GitLab",
      "Docker",
      "Docker images",
      "Containers",
      "Docker Compose",
      "Networking",
      "Volumes",
      "Container security",
      "Kubernetes fundamentals",
      "CI",
      "CD",
      "Continuous deployment",
      "Continuous delivery",
      "GitHub Actions",
      "Jenkins",
      "GitLab CI",
      "Automated tests",
      "Build pipelines",
      "Code quality",
      "Security scans",
      "Secrets management",
      "Environment management",
      "Infrastructure as Code",
      "Terraform",
      "Deployment strategies",
      "Blue-green deployment",
      "Canary deployment",
      "Rollbacks",
      "Zero-downtime deployment"
    ],
    "Includes complete pipeline examples."
  ),

  defineModule(
    21,
    "Cloud & AWS",
    "devops",
    [
      "Cloud fundamentals",
      "AWS",
      "EC2",
      "ECS",
      "EKS overview",
      "Lambda",
      "S3",
      "RDS",
      "DynamoDB overview",
      "SQS",
      "SNS",
      "API Gateway",
      "CloudWatch",
      "IAM",
      "Secrets Manager",
      "VPC",
      "Networking",
      "Load balancing",
      "Auto scaling",
      "Cloud deployment",
      "Cloud architecture",
      "Security",
      "Cost optimization",
      "Disaster recovery"
    ],
    "Includes realistic deployment architecture examples."
  ),

  defineModule(22, "Observability & Production Engineering", "devops", [
    "Logging",
    "Metrics",
    "Tracing",
    "Distributed tracing",
    "OpenTelemetry",
    "Monitoring",
    "Alerting",
    "Dashboards",
    "Error tracking",
    "Performance monitoring",
    "Health checks",
    "SLI",
    "SLO",
    "SLA",
    "Incident response",
    "Root cause analysis",
    "Postmortems",
    "Production debugging",
    "Capacity planning",
    "Reliability engineering",
    "Chaos testing",
    "Load testing",
    "Stress testing",
    "Scalability testing"
  ]),

  defineModule(23, "Security", "quality", [
    "Authentication",
    "Authorization",
    "JWT",
    "OAuth",
    "Session management",
    "RBAC",
    "Password hashing",
    "Encryption",
    "HTTPS",
    "TLS",
    "SQL injection",
    "NoSQL injection",
    "XSS",
    "CSRF",
    "SSRF",
    "CORS",
    "Rate limiting",
    "API security",
    "Database security",
    "Secrets management",
    "Cloud security",
    "OWASP Top 10",
    "Secure coding",
    "AI security",
    "RAG prompt injection",
    "Data privacy",
    "Least privilege",
    "Threat modeling"
  ]),

  defineModule(24, "Testing", "quality", [
    "Unit testing",
    "Integration testing",
    "End-to-end testing",
    "API testing",
    "Component testing",
    "Mocking",
    "Test doubles",
    "Regression testing",
    "Load testing",
    "Performance testing",
    "Stress testing",
    "Security testing",
    "CI testing",
    "Test strategy",
    "Test coverage",
    "Testing distributed systems",
    "Testing AI and RAG systems",
    "Evaluation datasets",
    "AI response evaluation"
  ]),

  defineModule(
    25,
    "Real-World Projects",
    "career",
    [
      "Project 1: MERN CRUD application",
      "Project 2: Authentication and RBAC application",
      "Project 3: Large dataset application with database optimization",
      "Project 4: Redis caching and background processing",
      "Project 5: GraphQL application",
      "Project 6: Distributed application with Kafka or RabbitMQ",
      "Project 7: AI application using LLM APIs",
      "Project 8: RAG application with PDF, text, images and vector search",
      "Project 9: Multi-tenant AI educational platform",
      "Project 10: Production-grade SaaS platform"
    ],
    "Project 10 requires 15 technologies (React, Node.js, PostgreSQL, MongoDB, Redis, AI, RAG, Vector search, Docker, CI/CD, Cloud, Monitoring, Security, Testing, Load testing). Each project includes 12 deliverables."
  ),

  defineModule(
    26,
    "Senior & Architect Interview Training",
    "career",
    [
      "MERN",
      "React",
      "JavaScript",
      "Node.js",
      "Backend",
      "SQL",
      "PostgreSQL",
      "MySQL",
      "MSSQL",
      "MongoDB",
      "Cassandra",
      "Redis",
      "GraphQL",
      "System design",
      "Distributed systems",
      "AI",
      "RAG",
      "Vector databases",
      "DevOps",
      "Cloud",
      "Security",
      "Architecture",
      "Interview communication & 12-step architectural answering framework"
    ],
    "Uses 5 difficulty levels (Basic, Intermediate, Advanced, Senior, Architect) with scenario-based Q&As, diagrams, and follow-up questions."
  ),

  defineModule(
    27,
    "Memory & Revision System",
    "career",
    [
      "One-minute summary",
      "Five-minute revision",
      "Key concepts",
      "Important terminology",
      "Memory tricks",
      "Common interview traps",
      "Comparison tables",
      "Flashcards",
      "Quick quizzes",
      "Practice questions",
      "Revision checklist",
      "Spaced repetition strategy (Day 1, Day 3, Day 7, Day 14, Day 30)",
      "Interactive revision dashboard"
    ],
    "Note: In the master prompt, the 11 revision artifacts appear under 'For every topic include' as module-wide revision deliverables."
  ),

  defineModule(
    28,
    "Personal Learning Roadmap",
    "career",
    [
      "Adaptive learning structure (30m min / 1h target / 2h max + weekend sessions)",
      "Track: Completed lessons",
      "Track: Total progress",
      "Track: Module progress",
      "Track: Weak topics",
      "Track: Revision due",
      "Track: Practical project progress",
      "Track: Interview readiness"
    ],
    "Per-lesson contract (8 items: duration, objective, theory, practical, interview, revision, task, mastery assessment) applies across all modules; pace adapts to available time."
  )
];
