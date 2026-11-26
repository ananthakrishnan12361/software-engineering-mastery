# Content Checklist — Software Engineering Mastery Handbook

This checklist is derived directly from `COURSE_modeule_in_detiles.md` (the approved master prompt) and reconciled with `COURSE_OUTLINE.md` and `structure.md`.

**Legend:**
- `[ ]` Not started
- `[~]` In progress
- `[x]` Completed, built, and verified

---

## Foundation & Portal Requirements

- [x] `index.html`, `package.json`, `tsconfig.json`, `vite.config.ts`, `steiger.config.ts`, `.gitignore` — React 19 + TypeScript + Vite 8 + MDX + `vite-plugin-singlefile` + Steiger setup
- [x] `src/shared/` — Tokens/styles (`tokens.css`, `global.css`, `print.css`), pure libs (`hashRouter`, `storage`, `highlightCode`, `runJsSandbox`), config, stateless props-driven UI (`TopicSection`, `CodeBlock`, `ExerciseCard`, `DiagramCard`, `ComparisonTable`, `Modal`, `GlossaryTerm`, etc.)
- [x] `src/entities/progress/` — `sem_handbook_v1` `localStorage` persistence + JSON export/import/reset compatibility
- [x] `src/pages/handbook/` — Strict "pages first" UI (`Topbar`, `Sidebar`, `LessonViewer`, `RightToc`, `InterviewBank`, `SearchPopover`, `GlossaryModal`, `ProgressModal`)
- [x] `src/app/` — Root mount, theme/progress state, exclusive loader of `content/registry.ts`
- [x] `content/` — `content/modules/01-programming/m01-p1.mdx`, `content/interviews/m01-p1.questions.ts`, `content/registry.ts`
- [x] `dist/software_engineering_mastery.html` — Standalone offline singlefile bundle verified (`tsc`, `vite build`, `steiger ./src`, parity & offline checks)
- [x] `legacy/` — v1 vanilla source archived pending user removal approval

---

## Module Split Plan & Topic Checklists

### Module 1: Programming Fundamentals & JavaScript (`modules/01-programming.html`)
Split into 5 parts:
- **M01-P1**: Programming fundamentals, variables, data types, functions
- **M01-P2**: Objects, arrays, classes, OOP, SOLID fundamentals
- **M01-P3**: Algorithms, data structures, complexity, recursion, sorting, searching, hash maps, stacks, queues, trees, graphs
- **M01-P4**: JavaScript internals (ES6+, closures, scope, hoisting, prototype, `this`, arrow functions, promises, async/await, event loop, micro/macrotasks, memory & GC)
- **M01-P5**: TypeScript fundamentals (type systems, generics, interfaces, type safety)

#### M01-P1 Topics
- [x] Programming fundamentals
- [x] Variables
- [x] Data types
- [x] Functions

#### M01-P2 Topics
- [x] Objects
- [x] Arrays
- [x] Classes
- [x] OOP
- [x] Encapsulation
- [x] Inheritance
- [x] Polymorphism
- [x] Abstraction
- [x] SOLID fundamentals

#### M01-P3 Topics
- [x] Algorithms
- [x] Data structures
- [x] Time complexity
- [x] Space complexity
- [x] Big O
- [x] Recursion
- [x] Sorting
- [x] Searching
- [x] Hash maps
- [x] Stacks
- [x] Queues
- [x] Trees
- [x] Graph fundamentals

#### M01-P4 Topics
- [x] JavaScript
- [x] ES6+
- [x] Closures
- [x] Scope
- [x] Hoisting
- [x] Prototype
- [x] Prototypal inheritance
- [x] `this`
- [x] Arrow functions
- [x] Promises
- [x] Async/await
- [x] Event loop
- [x] Microtasks
- [x] Macrotasks
- [x] Memory management
- [x] Garbage collection

#### M01-P5 Topics
- [x] TypeScript fundamentals
- [x] Type systems
- [x] Generics
- [x] Interfaces
- [x] Type safety

---

### Module 2: React & Frontend Engineering (`modules/02-react.html`)
Split into 4 parts:
- **M02-P1**: React architecture, components, props, state, rendering, Virtual DOM, JSX, component lifecycle concepts
- **M02-P2**: Hooks (`useState`, `useEffect`, `useRef`, `useContext`, `useMemo`, `useCallback`), `React.memo`, custom hooks
- **M02-P3**: State management (Context API, Redux, Redux Toolkit, React Query / TanStack Query), React Router, forms, validation, API integration, authentication, authorization
- **M02-P4**: Error boundaries, lazy loading, code splitting, performance & rendering optimization, memoization, frontend caching, accessibility, responsive design, security (XSS, CSRF), large frontend architecture, component design patterns, testing (unit, integration), frontend debugging

#### Topics
- [x] React architecture
- [x] Components
- [x] Props
- [x] State
- [x] Rendering
- [x] Virtual DOM
- [x] JSX
- [x] Hooks
- [x] `useState`
- [x] `useEffect`
- [x] `useRef`
- [x] `useContext`
- [x] `useMemo`
- [x] `useCallback`
- [x] `React.memo`
- [x] Custom hooks
- [x] Component lifecycle concepts
- [x] State management
- [x] Context API
- [x] Redux
- [x] Redux Toolkit
- [x] React Query / TanStack Query
- [x] React Router
- [x] Forms
- [x] Validation
- [x] API integration
- [x] Authentication
- [x] Authorization
- [ ] Error boundaries
- [ ] Lazy loading
- [ ] Code splitting
- [ ] Performance optimization
- [ ] Rendering optimization
- [ ] Memoization
- [ ] Frontend caching
- [ ] Accessibility
- [ ] Responsive design
- [ ] Security
- [ ] XSS
- [ ] CSRF
- [ ] Large frontend architecture
- [ ] Component design patterns
- [ ] Testing
- [ ] Unit testing
- [ ] Integration testing
- [ ] Frontend debugging

---

### Module 3: Node.js & Backend Engineering (`modules/03-nodejs.html`)
Split into 4 parts:
- **M03-P1**: Node.js runtime internals (architecture, V8, libuv, event loop, thread pool, worker threads, process vs thread, async I/O, streams, buffers, file handling)
- **M03-P2**: Express & HTTP API engineering (Express, middleware, routing, REST API, API design, HTTP, methods, status codes, headers, request lifecycle, versioning, validation, error handling, logging)
- **M03-P3**: Backend Auth & Security (authentication, JWT, refresh tokens, session management, authorization, RBAC, OAuth fundamentals, rate limiting, CORS, security, input sanitization, SQL injection, NoSQL injection, API security)
- **M03-P4**: Production Backend Patterns (pagination, filtering, sorting, file uploads, background jobs, queue systems, WebSockets, connection pooling, microservices, modular monolith, backend design patterns, dependency injection, testing — unit/integration/API tests, performance optimization)

#### Topics
- [ ] Node.js architecture
- [ ] V8
- [ ] libuv
- [ ] Event loop
- [ ] Thread pool
- [ ] Worker threads
- [ ] Process vs thread
- [ ] Async I/O
- [ ] Streams
- [ ] Buffers
- [ ] File handling
- [ ] Express
- [ ] Middleware
- [ ] Routing
- [ ] REST API
- [ ] API design
- [ ] HTTP
- [ ] HTTP methods
- [ ] Status codes
- [ ] Headers
- [ ] Request lifecycle
- [ ] API versioning
- [ ] API validation
- [ ] Error handling
- [ ] Logging
- [ ] Authentication
- [ ] JWT
- [ ] Refresh tokens
- [ ] Session management
- [ ] Authorization
- [ ] RBAC
- [ ] OAuth fundamentals
- [ ] Rate limiting
- [ ] CORS
- [ ] Security
- [ ] Input sanitization
- [ ] SQL injection
- [ ] NoSQL injection
- [ ] API security
- [ ] Pagination
- [ ] Filtering
- [ ] Sorting
- [ ] File uploads
- [ ] Background jobs
- [ ] Queue systems
- [ ] WebSockets
- [ ] Connection pooling
- [ ] Microservices
- [ ] Modular monolith
- [ ] Backend design patterns
- [ ] Dependency injection
- [ ] Testing
- [ ] Unit tests
- [ ] Integration tests
- [ ] API tests
- [ ] Performance optimization

---

### Module 4: Database Fundamentals & Database Architecture (`modules/04-database-fundamentals.html`)
Split into 3 parts:
- **M04-P1**: Core database architecture, engines, relational vs NoSQL, data modeling, ER diagrams, tables, rows, columns, keys & constraints
- **M04-P2**: Normalization (1NF, 2NF, 3NF, BCNF overview) and denormalization
- **M04-P3**: Transactions, ACID, isolation levels, read anomalies (dirty, non-repeatable, phantom), locks, deadlocks, MVCC, concurrency, consistency, data integrity, schema migrations, connection pooling, backups & recovery

#### Topics
- [ ] What a database is
- [ ] Database architecture
- [ ] Database engines
- [ ] Relational databases
- [ ] NoSQL databases
- [ ] Data modeling
- [ ] ER diagrams
- [ ] Tables
- [ ] Rows
- [ ] Columns
- [ ] Primary keys
- [ ] Foreign keys
- [ ] Unique constraints
- [ ] Check constraints
- [ ] Normalization
- [ ] Denormalization
- [ ] 1NF
- [ ] 2NF
- [ ] 3NF
- [ ] BCNF overview
- [ ] Transactions
- [ ] ACID
- [ ] Isolation levels
- [ ] Dirty reads
- [ ] Non-repeatable reads
- [ ] Phantom reads
- [ ] Locks
- [ ] Deadlocks
- [ ] MVCC
- [ ] Concurrency
- [ ] Database consistency
- [ ] Data integrity
- [ ] Schema migrations
- [ ] Connection pooling
- [ ] Database backups
- [ ] Recovery

---

### Module 5: PostgreSQL (`modules/05-postgresql.html`)
Split into 4 parts:
- **M05-P1**: PostgreSQL architecture & internals (storage, pages and tuples, MVCC, WAL, transactions)
- **M05-P2**: SQL mastery (SELECT, INSERT, UPDATE, DELETE, JOINs — INNER, LEFT, RIGHT, FULL, CROSS, self joins, subqueries, CTEs, recursive CTEs, window functions)
- **M05-P3**: Schema objects & semi-structured data (views, materialized views, functions, stored procedures, triggers, constraints, JSON, JSONB)
- **M05-P4**: Concurrency, scaling & tuning (transactions, locking, isolation levels, partitioning, replication, connection pooling, EXPLAIN, EXPLAIN ANALYZE, query planner, query optimization, indexing, performance tuning, vacuum, autovacuum, maintenance, backup and recovery)

#### Topics
- [ ] PostgreSQL architecture
- [ ] PostgreSQL internals
- [ ] Database storage
- [ ] Pages and tuples
- [ ] MVCC
- [ ] WAL
- [ ] Transactions
- [ ] SQL
- [ ] SELECT
- [ ] INSERT
- [ ] UPDATE
- [ ] DELETE
- [ ] JOIN
- [ ] INNER JOIN
- [ ] LEFT JOIN
- [ ] RIGHT JOIN
- [ ] FULL JOIN
- [ ] CROSS JOIN
- [ ] Self joins
- [ ] Subqueries
- [ ] CTEs
- [ ] Recursive CTEs
- [ ] Window functions
- [ ] Views
- [ ] Materialized views
- [ ] Functions
- [ ] Stored procedures
- [ ] Triggers
- [ ] Constraints
- [ ] JSON
- [ ] JSONB
- [ ] Locking
- [ ] Isolation levels
- [ ] Partitioning
- [ ] Replication
- [ ] Connection pooling
- [ ] EXPLAIN
- [ ] EXPLAIN ANALYZE
- [ ] Query planner
- [ ] Query optimization
- [ ] Indexing
- [ ] Performance tuning
- [ ] Vacuum
- [ ] Autovacuum
- [ ] Database maintenance
- [ ] Backup and recovery

---

### Module 6: MySQL (`modules/06-mysql.html`)
Split into 2 parts:
- **M06-P1**: Architecture, storage engines (InnoDB, MyISAM overview), SQL, transactions, ACID, isolation levels, locking, deadlocks
- **M06-P2**: Indexes (composite, clustered, secondary), query optimization, EXPLAIN, query execution, stored procedures, triggers, views, replication, partitioning, performance tuning, connection management, backup and recovery

#### Topics
- [ ] MySQL architecture
- [ ] Storage engines
- [ ] InnoDB
- [ ] MyISAM overview
- [ ] SQL
- [ ] Transactions
- [ ] ACID
- [ ] Isolation levels
- [ ] Locking
- [ ] Deadlocks
- [ ] Indexes
- [ ] Composite indexes
- [ ] Clustered indexes
- [ ] Secondary indexes
- [ ] Query optimization
- [ ] EXPLAIN
- [ ] Query execution
- [ ] Stored procedures
- [ ] Triggers
- [ ] Views
- [ ] Replication
- [ ] Partitioning
- [ ] Performance tuning
- [ ] Connection management
- [ ] Backup and recovery

---

### Module 7: Microsoft SQL Server (MSSQL) (`modules/07-mssql.html`)
Split into 3 parts:
- **M07-P1**: Architecture, engine, storage (pages, extents), tables, indexes (clustered, non-clustered, heap tables), T-SQL objects (stored procedures, functions, views, triggers, CTEs, window functions, temp tables, table variables)
- **M07-P2**: Transactions, locking, isolation levels, deadlocks
- **M07-P3**: Query execution plans, optimization, statistics, execution plan analysis, index maintenance, fragmentation, parameter sniffing, query tuning, partitioning, SQL Server Agent, backup & recovery, performance monitoring

#### Topics
- [ ] SQL Server architecture
- [ ] SQL Server engine
- [ ] Storage
- [ ] Pages
- [ ] Extents
- [ ] Tables
- [ ] Indexes
- [ ] Clustered indexes
- [ ] Non-clustered indexes
- [ ] Heap tables
- [ ] Stored procedures
- [ ] Functions
- [ ] Views
- [ ] Triggers
- [ ] Transactions
- [ ] Locking
- [ ] Isolation levels
- [ ] Deadlocks
- [ ] Query execution plans
- [ ] Query optimization
- [ ] Statistics
- [ ] Execution plan analysis
- [ ] Index maintenance
- [ ] Fragmentation
- [ ] Parameter sniffing
- [ ] Query tuning
- [ ] Temp tables
- [ ] Table variables
- [ ] CTEs
- [ ] Window functions
- [ ] Partitioning
- [ ] SQL Server Agent
- [ ] Backup and recovery
- [ ] Performance monitoring

---

### Module 8: Database Indexing — Deep Dive (`modules/08-indexing.html`)
Split into 4 parts:
- **M08-P1**: Index foundations & data structures (why/how indexes work, B-Tree, B+ Tree, Hash indexes, clustered vs non-clustered, unique)
- **M08-P2**: Specialized index types (composite, covering, partial, filtered, functional, expression, full-text, spatial) & selectivity, cardinality, statistics
- **M08-P3**: Query access patterns & optimization (index scans, seeks, lookups, table scans, sequential scans, composite column order, leftmost-prefix principle, sorting/filtering/JOIN/GROUP BY/ORDER BY optimization, index-only scans)
- **M08-P4**: Maintenance, trade-offs & cross-DB strategy (fragmentation, write/storage overhead, over-indexing, under-indexing, index selection for millions of rows, PostgreSQL vs MySQL vs MSSQL vs MongoDB comparison, realistic slow query -> wrong index -> better index -> plan -> benchmark comparison -> production strategy)

#### Topics
- [ ] Why indexes exist
- [ ] How indexes work
- [ ] B-Tree
- [ ] B+ Tree
- [ ] Hash indexes
- [ ] Clustered indexes
- [ ] Non-clustered indexes
- [ ] Composite indexes
- [ ] Covering indexes
- [ ] Unique indexes
- [ ] Partial indexes
- [ ] Filtered indexes
- [ ] Functional indexes
- [ ] Expression indexes
- [ ] Full-text indexes
- [ ] Spatial indexes
- [ ] Index selectivity
- [ ] Cardinality
- [ ] Index statistics
- [ ] Index scans
- [ ] Index seeks
- [ ] Index lookups
- [ ] Table scans
- [ ] Sequential scans
- [ ] Composite index column order
- [ ] Leftmost-prefix principle
- [ ] Sorting using indexes
- [ ] Filtering using indexes
- [ ] JOIN optimization using indexes
- [ ] GROUP BY optimization
- [ ] ORDER BY optimization
- [ ] Index-only scans
- [ ] Index maintenance
- [ ] Fragmentation
- [ ] Write overhead
- [ ] Storage overhead
- [ ] Over-indexing
- [ ] Under-indexing
- [ ] Index selection
- [ ] Index design for millions of records
- [ ] Cross-DB comparison (PostgreSQL, MySQL, MSSQL, MongoDB)
- [ ] Realistic slow query + incorrect index + better index + execution plan + performance comparison + production strategy

---

### Module 9: Database Query Optimization (`modules/09-query-optimization.html`)
Split into 3 parts:
- **M09-P1**: Investigation methodology (identifying slow queries, profiling, execution plans, query cost, CPU, memory, disk I/O, network, locks, wait events)
- **M09-P2**: Query & access optimization (query rewriting, JOIN optimization, subquery optimization, N+1 problem, pagination — offset, cursor, keyset, large dataset pagination)
- **M09-P3**: Batch operations & scaling (bulk inserts, bulk updates, connection pooling, bottlenecks, monitoring, query caching, data partitioning, read replicas, horizontal & vertical scaling — with 1M / 10M / 100M row examples)

#### Topics
- [ ] Identifying slow queries
- [ ] Query profiling
- [ ] Query execution plans
- [ ] Query cost
- [ ] CPU
- [ ] Memory
- [ ] Disk I/O
- [ ] Network
- [ ] Locks
- [ ] Wait events
- [ ] Query rewriting
- [ ] JOIN optimization
- [ ] Subquery optimization
- [ ] N+1 problem
- [ ] Pagination
- [ ] Offset pagination
- [ ] Cursor pagination
- [ ] Keyset pagination
- [ ] Large dataset pagination
- [ ] Batch operations
- [ ] Bulk inserts
- [ ] Bulk updates
- [ ] Connection pooling
- [ ] Database bottlenecks
- [ ] Database monitoring
- [ ] Query caching
- [ ] Data partitioning
- [ ] Read replicas
- [ ] Horizontal scaling
- [ ] Vertical scaling
- [ ] Practical 1M / 10M / 100M record investigation examples

---

### Module 10: MongoDB (`modules/10-mongodb.html`)
Split into 3 parts:
- **M10-P1**: Architecture, BSON, documents, collections, CRUD, schema design (flexible schemas, embedding, referencing, data modeling, schema evolution, SQL comparisons)
- **M10-P2**: Aggregation pipelines (`$match`, `$project`, `$group`, `$sort`, `$lookup`, `$unwind`, `$facet`, `$limit`, `$skip`, `$addFields`, `$set`, `$replaceRoot`) and indexing (compound, unique, TTL, text, geospatial, partial, multikey, index selection, explain plans, query optimization)
- **M10-P3**: Distributed & production operations (transactions, replication, replica sets, sharding, shard keys, read concern, write concern, read preference, connection pooling, performance, security, backup)

#### Topics
- [ ] MongoDB architecture
- [ ] BSON
- [ ] Documents
- [ ] Collections
- [ ] CRUD
- [ ] Schema design
- [ ] Flexible schemas
- [ ] Embedding
- [ ] Referencing
- [ ] Data modeling
- [ ] Aggregation
- [ ] Aggregation pipelines
- [ ] `$match`
- [ ] `$project`
- [ ] `$group`
- [ ] `$sort`
- [ ] `$lookup`
- [ ] `$unwind`
- [ ] `$facet`
- [ ] `$limit`
- [ ] `$skip`
- [ ] `$addFields`
- [ ] `$set`
- [ ] `$replaceRoot`
- [ ] Indexes
- [ ] Compound indexes
- [ ] Unique indexes
- [ ] TTL indexes
- [ ] Text indexes
- [ ] Geospatial indexes
- [ ] Partial indexes
- [ ] Multikey indexes
- [ ] Index selection
- [ ] Explain plans
- [ ] Query optimization
- [ ] Transactions
- [ ] Replication
- [ ] Replica sets
- [ ] Sharding
- [ ] Shard keys
- [ ] Read concern
- [ ] Write concern
- [ ] Read preference
- [ ] Connection pooling
- [ ] MongoDB performance
- [ ] MongoDB security
- [ ] MongoDB backup
- [ ] MongoDB schema evolution
- [ ] SQL comparisons

---

### Module 11: Cassandra (`modules/11-cassandra.html`)
Split into 2 parts:
- **M11-P1**: Architecture, distributed fundamentals, wide-column model, nodes, clusters, data centers, replication, partition keys, clustering keys, query-driven data modeling, CAP theorem & consistency levels
- **M11-P2**: Storage & write/read path (commit log, memtable, SSTables, compaction, tombstones, TTL), secondary indexes & limitations, failure handling, scaling, repair, monitoring, optimization, use cases & anti-patterns

#### Topics
- [ ] Cassandra architecture
- [ ] Distributed database fundamentals
- [ ] Wide-column model
- [ ] Nodes
- [ ] Clusters
- [ ] Data centers
- [ ] Replication
- [ ] Partition keys
- [ ] Clustering keys
- [ ] Data modeling
- [ ] Query-driven design
- [ ] Consistency levels
- [ ] CAP theorem
- [ ] Distributed writes
- [ ] Write path
- [ ] Commit log
- [ ] Memtable
- [ ] SSTables
- [ ] Compaction
- [ ] Tombstones
- [ ] TTL
- [ ] Secondary indexes
- [ ] Cassandra indexing limitations
- [ ] Failure handling
- [ ] Scaling
- [ ] Repair
- [ ] Monitoring
- [ ] Performance optimization
- [ ] Cassandra use cases
- [ ] When Cassandra should not be used

---

### Module 12: Redis (`modules/12-redis.html`)
Split into 3 parts:
- **M12-P1**: Architecture, in-memory storage, data structures (Strings, Hashes, Lists, Sets, Sorted Sets, Streams), Pub/Sub, TTL & expiration
- **M12-P2**: Caching patterns (cache-aside, write-through, write-behind, read-through), cache invalidation, stampede, penetration, avalanche, distributed locks, rate limiting, queues
- **M12-P3**: Persistence (RDB, AOF), replication, Sentinel, Cluster, eviction policies, memory optimization, performance, security, monitoring

#### Topics
- [ ] Redis architecture
- [ ] In-memory databases
- [ ] Key/value storage
- [ ] Strings
- [ ] Hashes
- [ ] Lists
- [ ] Sets
- [ ] Sorted sets
- [ ] Streams
- [ ] Pub/Sub
- [ ] TTL
- [ ] Expiration
- [ ] Caching
- [ ] Cache-aside
- [ ] Write-through
- [ ] Write-behind
- [ ] Read-through
- [ ] Cache invalidation
- [ ] Cache stampede
- [ ] Cache penetration
- [ ] Cache avalanche
- [ ] Distributed locks
- [ ] Rate limiting
- [ ] Redis queues
- [ ] Redis persistence
- [ ] RDB
- [ ] AOF
- [ ] Replication
- [ ] Redis Sentinel
- [ ] Redis Cluster
- [ ] Eviction policies
- [ ] Memory optimization
- [ ] Redis performance
- [ ] Redis security
- [ ] Redis monitoring

---

### Module 13: GraphQL (`modules/13-graphql.html`)
Split into 2 parts:
- **M13-P1**: Fundamentals, GraphQL vs REST, schema, types (scalar, object, input, interfaces, unions), queries, mutations, subscriptions, resolvers, Node.js implementation
- **M13-P2**: Production GraphQL (authentication, authorization, cursor pagination, DataLoader & N+1 problem, query complexity, query depth, rate limiting, caching, error handling, security, architecture)

#### Topics
- [ ] GraphQL fundamentals
- [ ] GraphQL vs REST
- [ ] Schema
- [ ] Types
- [ ] Queries
- [ ] Mutations
- [ ] Subscriptions
- [ ] Resolvers
- [ ] Scalar types
- [ ] Object types
- [ ] Input types
- [ ] Interfaces
- [ ] Unions
- [ ] Authentication
- [ ] Authorization
- [ ] Pagination
- [ ] Cursor pagination
- [ ] DataLoader
- [ ] N+1 problem
- [ ] Query complexity
- [ ] Query depth
- [ ] Rate limiting
- [ ] Caching
- [ ] Error handling
- [ ] GraphQL security
- [ ] GraphQL architecture
- [ ] Node.js implementation

---

### Module 14: Software Engineering & Design Patterns (`modules/14-design-patterns.html`)
Split into 3 parts:
- **M14-P1**: Core principles (SOLID, Clean Code, DRY, KISS, YAGNI, dependency injection, separation of concerns, coupling, cohesion)
- **M14-P2**: GoF & enterprise design patterns (Factory, Strategy, Observer, Singleton, Adapter, Decorator, Repository, Builder, Facade, Command, Chain of Responsibility)
- **M14-P3**: Architectural styles & engineering hygiene (Layered, Clean, Hexagonal, Domain-Driven Design, Modular Monolith, technical debt, refactoring, code review, testing strategies, avoiding overengineering)

#### Topics
- [ ] SOLID
- [ ] Clean code
- [ ] DRY
- [ ] KISS
- [ ] YAGNI
- [ ] Dependency injection
- [ ] Design patterns
- [ ] Factory
- [ ] Strategy
- [ ] Observer
- [ ] Singleton
- [ ] Adapter
- [ ] Decorator
- [ ] Repository
- [ ] Builder
- [ ] Facade
- [ ] Command
- [ ] Chain of responsibility
- [ ] Layered architecture
- [ ] Clean architecture
- [ ] Hexagonal architecture
- [ ] Domain-driven design
- [ ] Modular monolith
- [ ] Separation of concerns
- [ ] Coupling
- [ ] Cohesion
- [ ] Technical debt
- [ ] Refactoring
- [ ] Code review
- [ ] Testing strategies
- [ ] Avoiding overengineering

---

### Module 15: System Design (`modules/15-system-design.html`)
Split into 6 parts:
- **M15-P1**: Requirements analysis & capacity estimation
- **M15-P2**: Core architecture & database architecture decisions
- **M15-P3**: Distributed systems foundations & architecture decision framework
- **M15-P4**: Worked System Designs 1–5 (URL shortener, E-commerce, Chat, Notification, File storage)
- **M15-P5**: Worked System Designs 6–10 (Video streaming, Ride-sharing, Food delivery, Online examination, Report generation)
- **M15-P6**: Worked System Designs 11–15 (Multi-tenant SaaS, AI document processing, RAG educational platform, Real-time monitoring, CCTV object detection)

#### M15-P1 Topics
- [ ] Functional requirements
- [ ] Non-functional requirements
- [ ] Constraints
- [ ] User roles
- [ ] User journeys
- [ ] API requirements
- [ ] Data requirements
- [ ] Security requirements
- [ ] Scalability requirements
- [ ] Availability requirements
- [ ] Performance requirements
- [ ] SLA / SLO / SLIs
- [ ] Capacity estimation (users, RPS, concurrent users, peak traffic, storage, bandwidth, DB growth, cache size, memory, CPU, file storage, cost estimation)

#### M15-P2 Topics
- [ ] Monolith / Modular monolith / Microservices / Event-driven / Serverless / Distributed architecture
- [ ] Service boundaries
- [ ] API gateways / Load balancers / Reverse proxies
- [ ] Horizontal vs vertical scaling
- [ ] Stateless vs stateful services
- [ ] Database choice process (PostgreSQL, MySQL, MSSQL, MongoDB, Cassandra, Redis, Vector DBs, Graph DBs)

#### M15-P3 Topics
- [ ] CAP & PACELC
- [ ] Consistency, Availability, Partition tolerance, Eventual vs Strong consistency
- [ ] Distributed transactions, Sagas, Outbox pattern
- [ ] Idempotency, Retries, Circuit breakers, Rate limiting
- [ ] Message queues, Kafka, RabbitMQ, Dead-letter queues
- [ ] Distributed locks, Event-driven systems, Observability
- [ ] Fault tolerance, Resilience, Disaster recovery
- [ ] Architecture decision framework (choices, rejections, trade-offs, cost, complexity, scaling, security, failure handling, maintenance, migration, evolution)

#### M15-P4–P6 Worked Designs (each with 16 required items)
- [ ] Design 1: URL shortener
- [ ] Design 2: E-commerce system
- [ ] Design 3: Chat application
- [ ] Design 4: Notification system
- [ ] Design 5: File storage system
- [ ] Design 6: Video streaming platform
- [ ] Design 7: Ride-sharing system
- [ ] Design 8: Food delivery system
- [ ] Design 9: Online examination platform
- [ ] Design 10: Report generation platform
- [ ] Design 11: Multi-tenant SaaS
- [ ] Design 12: AI document processing system
- [ ] Design 13: RAG-based educational platform
- [ ] Design 14: Real-time monitoring platform
- [ ] Design 15: CCTV object detection platform

---

### Module 16: Distributed Systems & Message Queues (`modules/16-distributed-systems.html`)
Split into 3 parts:
- **M16-P1**: Distributed systems fundamentals (communication, network failures, latency, reliability, consistency, fault tolerance, event-driven architecture)
- **M16-P2**: Messaging, Kafka & RabbitMQ (producers, consumers, topics, partitions, consumer groups, offsets, ordering, retries, DLQs, idempotency, duplicate messages, delivery guarantees: at-most-once, at-least-once, exactly-once & limitations)
- **M16-P3**: Advanced patterns & implementation (event sourcing, CQRS, outbox pattern, sagas, backpressure, distributed locks, observability, implementation examples)

#### Topics
- [ ] Distributed systems
- [ ] Communication
- [ ] Network failures
- [ ] Latency
- [ ] Reliability
- [ ] Consistency
- [ ] Fault tolerance
- [ ] Event-driven architecture
- [ ] Messaging
- [ ] Kafka
- [ ] RabbitMQ
- [ ] Producers
- [ ] Consumers
- [ ] Topics
- [ ] Partitions
- [ ] Consumer groups
- [ ] Offsets
- [ ] Ordering
- [ ] Retries
- [ ] Dead-letter queues
- [ ] Idempotency
- [ ] Duplicate messages
- [ ] Delivery guarantees
- [ ] At-most-once
- [ ] At-least-once
- [ ] Exactly-once semantics and limitations
- [ ] Event sourcing
- [ ] CQRS
- [ ] Outbox pattern
- [ ] Sagas
- [ ] Backpressure
- [ ] Distributed locks
- [ ] Observability

---

### Module 17: AI & LLM Engineering (`modules/17-ai-engineering.html`)
Split into 3 parts:
- **M17-P1**: Foundations & internals (AI, ML, deep learning, LLMs, transformers, attention, tokens, tokenization, context windows, parameters, temperature, sampling, embeddings)
- **M17-P2**: Application engineering (prompt engineering, system prompts, structured outputs, function calling, tool calling, agents, API integration)
- **M17-P3**: Production, evaluation & safety (model selection, evaluation, hallucination, safety, AI security, prompt injection, cost optimization, latency optimization, AI observability, production architecture, model limitations)

#### Topics
- [ ] AI
- [ ] Machine learning
- [ ] Deep learning
- [ ] LLMs
- [ ] Transformers
- [ ] Attention
- [ ] Tokens
- [ ] Tokenization
- [ ] Context windows
- [ ] Model parameters
- [ ] Temperature
- [ ] Sampling
- [ ] Embeddings
- [ ] Prompt engineering
- [ ] System prompts
- [ ] Structured outputs
- [ ] Function calling
- [ ] Tool calling
- [ ] Agents
- [ ] Model selection
- [ ] Model evaluation
- [ ] Hallucination
- [ ] Safety
- [ ] AI security
- [ ] Prompt injection
- [ ] API integration
- [ ] Cost optimization
- [ ] Latency optimization
- [ ] AI observability
- [ ] AI production architecture
- [ ] Model limitations

---

### Module 18: RAG (`modules/18-rag.html`)
Split into 3 parts:
- **M18-P1**: RAG fundamentals & ingestion (why RAG, RAG vs fine-tuning, RAG pipeline, document ingestion, text extraction, OCR, PDF, Word docs, images, tables, chunking, embeddings, vector search, retrieval, context construction, prompt generation, LLM generation)
- **M18-P2**: Advanced chunking, embeddings & retrieval (fixed, semantic, recursive, overlapping chunks, metadata & filtering, embedding models & dimensions, cosine/dot/Euclidean, ANN vs exact, hybrid search, BM25, cross-encoder reranking, query rewriting, multi-query retrieval, context compression)
- **M18-P3**: Evaluation, security & production RAG (precision, recall, MRR, NDCG, groundedness, hallucination reduction, observability, security, prompt injection in documents, multi-tenant RAG, scalability, cost/latency optimization, caching, failure handling, complete end-to-end RAG pipeline examples)

#### Topics
- [ ] RAG & why RAG
- [ ] RAG vs fine-tuning
- [ ] RAG pipeline
- [ ] Document ingestion
- [ ] Text extraction / OCR / PDF / Word / Images / Tables
- [ ] Chunking (fixed, semantic, recursive, overlapping)
- [ ] Metadata & metadata filtering
- [ ] Embeddings, models, dimensions
- [ ] Cosine similarity, Dot product, Euclidean distance
- [ ] ANN vs Exact search
- [ ] Hybrid search & BM25
- [ ] Reranking & cross-encoder reranking
- [ ] Query rewriting & multi-query retrieval
- [ ] Context construction & context compression
- [ ] Prompt generation & LLM generation
- [ ] Retrieval evaluation (Precision, Recall, MRR, NDCG, Groundedness)
- [ ] Hallucination reduction
- [ ] RAG observability
- [ ] RAG security & prompt injection in documents
- [ ] Multi-tenant RAG
- [ ] Scalability, cost optimization, latency optimization, caching, failure handling
- [ ] Complete RAG pipeline examples

---

### Module 19: Vector Databases (`modules/19-vector-databases.html`)
Split into 2 parts:
- **M19-P1**: Vector storage & indexing internals (embeddings, similarity, vector storage, ANN vs exact search, HNSW, IVF, IVF-PQ, quantization, vector indexing, metadata filtering, hybrid search, reranking)
- **M19-P2**: Operations, benchmarking & selection (performance, memory, storage, scaling, benchmarking, comparison of pgvector, Qdrant, Milvus, Pinecone, Weaviate, MongoDB Atlas Vector Search, Redis Vector Search; decision framework: when PostgreSQL is enough vs dedicated vector DB)

#### Topics
- [ ] Vector databases
- [ ] Embeddings & similarity
- [ ] Vector storage
- [ ] ANN vs Exact search
- [ ] HNSW
- [ ] IVF & IVF-PQ
- [ ] Quantization
- [ ] Vector indexing
- [ ] Metadata filtering
- [ ] Hybrid search & reranking
- [ ] Vector performance, memory, storage, scaling, benchmarking
- [ ] Compare pgvector, Qdrant, Milvus, Pinecone, Weaviate, MongoDB Atlas Vector Search, Redis Vector Search
- [ ] Decision criteria (cost, scaling, complexity, performance, trade-offs, PostgreSQL vs dedicated vector DB)

---

### Module 20: DevOps & CI/CD (`modules/20-devops-cicd.html`)
Split into 3 parts:
- **M20-P1**: Git & Containers (Git, branching, workflows, GitHub, GitLab, Docker, images, containers, Docker Compose, networking, volumes, container security, Kubernetes fundamentals)
- **M20-P2**: CI/CD Pipelines (CI, CD, continuous deployment vs delivery, GitHub Actions, Jenkins, GitLab CI, automated tests, build pipelines, code quality, security scans, secrets & environment management)
- **M20-P3**: IaC & Deployment Strategies (Infrastructure as Code, Terraform, blue-green, canary, rollbacks, zero-downtime deployment, complete pipeline examples)

#### Topics
- [ ] Git, branching, workflows, GitHub, GitLab
- [ ] Docker, images, containers, Docker Compose, networking, volumes, container security
- [ ] Kubernetes fundamentals
- [ ] CI / CD (continuous deployment vs delivery)
- [ ] GitHub Actions, Jenkins, GitLab CI
- [ ] Automated tests, build pipelines, code quality, security scans
- [ ] Secrets management & environment management
- [ ] Infrastructure as Code & Terraform
- [ ] Deployment strategies (blue-green, canary, rollbacks, zero-downtime)
- [ ] Complete pipeline examples

---

### Module 21: Cloud & AWS (`modules/21-aws.html`)
Split into 3 parts:
- **M21-P1**: Cloud fundamentals, compute & storage (AWS, EC2, ECS, EKS overview, Lambda, S3)
- **M21-P2**: Databases, messaging & networking (RDS, DynamoDB overview, SQS, SNS, API Gateway, VPC, networking, load balancing, auto scaling)
- **M21-P3**: Security, operations & architecture (IAM, Secrets Manager, CloudWatch, cloud deployment, cloud architecture, security, cost optimization, disaster recovery, realistic deployment architecture examples)

#### Topics
- [ ] Cloud fundamentals & AWS
- [ ] EC2, ECS, EKS overview, Lambda
- [ ] S3
- [ ] RDS & DynamoDB overview
- [ ] SQS, SNS, API Gateway
- [ ] CloudWatch
- [ ] IAM & Secrets Manager
- [ ] VPC, networking, load balancing, auto scaling
- [ ] Cloud deployment & cloud architecture
- [ ] Security, cost optimization, disaster recovery
- [ ] Realistic deployment architecture examples

---

### Module 22: Observability & Production Engineering (`modules/22-observability.html`)
Split into 2 parts:
- **M22-P1**: Telemetry & monitoring (logging, metrics, tracing, distributed tracing, OpenTelemetry, monitoring, alerting, dashboards, error tracking, performance monitoring, health checks)
- **M22-P2**: SRE & reliability (SLI, SLO, SLA, incident response, root cause analysis, postmortems, production debugging, capacity planning, reliability engineering, chaos testing, load testing, stress testing, scalability testing)

#### Topics
- [ ] Logging, metrics, tracing, distributed tracing, OpenTelemetry
- [ ] Monitoring, alerting, dashboards, error tracking, performance monitoring, health checks
- [ ] SLI, SLO, SLA
- [ ] Incident response, root cause analysis, postmortems, production debugging
- [ ] Capacity planning & reliability engineering
- [ ] Chaos, load, stress, scalability testing

---

### Module 23: Security (`modules/23-security.html`)
Split into 3 parts:
- **M23-P1**: Identity, auth & cryptography (authentication, authorization, JWT, OAuth, session management, RBAC, password hashing, encryption, HTTPS, TLS)
- **M23-P2**: Application & API vulnerabilities (SQL injection, NoSQL injection, XSS, CSRF, SSRF, CORS, rate limiting, API security, OWASP Top 10, secure coding)
- **M23-P3**: Data, cloud & AI security (database security, secrets management, cloud security, AI security, RAG prompt injection, data privacy, least privilege, threat modeling)

#### Topics
- [ ] Authentication, authorization, JWT, OAuth, session management, RBAC
- [ ] Password hashing, encryption, HTTPS, TLS
- [ ] SQL injection, NoSQL injection, XSS, CSRF, SSRF, CORS
- [ ] Rate limiting, API security, OWASP Top 10, secure coding
- [ ] Database security, secrets management, cloud security
- [ ] AI security & RAG prompt injection
- [ ] Data privacy, least privilege, threat modeling

---

### Module 24: Testing (`modules/24-testing.html`)
Split into 2 parts:
- **M24-P1**: Software testing pyramid & practices (unit, integration, end-to-end, API, component testing, mocking, test doubles, regression testing, test strategy, test coverage)
- **M24-P2**: Non-functional, CI, distributed & AI testing (load, performance, stress, security, CI testing, testing distributed systems, testing AI and RAG systems, evaluation datasets, AI response evaluation)

#### Topics
- [ ] Unit, integration, E2E, API, component testing
- [ ] Mocking & test doubles
- [ ] Regression, load, performance, stress, security, CI testing
- [ ] Test strategy & test coverage
- [ ] Testing distributed systems
- [ ] Testing AI and RAG systems, evaluation datasets, AI response evaluation

---

### Module 25: Real-World Projects (`modules/25-projects.html`)
Split into 5 parts (2 projects per part, each project covering all 12 required elements: Requirements, Architecture, Design, Database schema, API, Implementation steps, Code examples, Testing, Deployment, Optimization, Interview questions, Advanced extensions):
- **M25-P1**: Project 1 (MERN CRUD) & Project 2 (Auth & RBAC)
- **M25-P2**: Project 3 (Large dataset + DB optimization) & Project 4 (Redis caching + background processing)
- **M25-P3**: Project 5 (GraphQL app) & Project 6 (Distributed app with Kafka/RabbitMQ)
- **M25-P4**: Project 7 (AI app using LLM APIs) & Project 8 (RAG app with PDF/text/images/vector search)
- **M25-P5**: Project 9 (Multi-tenant AI educational platform) & Project 10 (Production SaaS platform full stack)

#### Projects
- [ ] Project 1: MERN CRUD application
- [ ] Project 2: Authentication and RBAC application
- [ ] Project 3: Large dataset application with database optimization
- [ ] Project 4: Redis caching and background processing
- [ ] Project 5: GraphQL application
- [ ] Project 6: Distributed application with Kafka or RabbitMQ
- [ ] Project 7: AI application using LLM APIs
- [ ] Project 8: RAG application with PDF, text, images and vector search
- [ ] Project 9: Multi-tenant AI educational platform
- [ ] Project 10: Production-grade SaaS platform

---

### Module 26: Senior & Architect Interview Training (`modules/26-interviews.html`)
*Note: Uses 5 separate difficulty levels: Basic, Intermediate, Advanced, Senior, Architect.*
Split into 4 parts:
- **M26-P1**: Interview communication strategy, 12-step architectural answering framework, and Frontend/JS/React/Node/Backend/MERN banks
- **M26-P2**: SQL/PostgreSQL/MySQL/MSSQL/MongoDB/Cassandra/Redis/GraphQL interview banks
- **M26-P3**: System Design, Distributed Systems, Architecture & Cloud/DevOps/Security interview banks
- **M26-P4**: AI, RAG & Vector Databases Senior/Architect scenario banks

#### Topics
- [ ] Interview communication guide & 12-step architectural framework
- [ ] MERN / React / JavaScript / Node.js / Backend
- [ ] SQL / PostgreSQL / MySQL / MSSQL / MongoDB / Cassandra / Redis / GraphQL
- [ ] System design / Distributed systems / Architecture
- [ ] AI / RAG / Vector databases
- [ ] DevOps / Cloud / Security
- [ ] All 5 levels (Basic, Intermediate, Advanced, Senior, Architect) with scenarios, answers, diagrams, follow-ups

---

### Module 27: Memory & Revision System (`modules/27-revision.html`)
Split into 3 parts:
- **M27-P1**: Spaced repetition strategy (Day 1, 3, 7, 14, 30) & interactive Revision Dashboard + Flashcards/Quizzes engine
- **M27-P2**: One-minute summaries, five-minute revisions, key concepts, terminology, memory tricks & traps for Modules 1–13
- **M27-P3**: One-minute summaries, five-minute revisions, key concepts, terminology, memory tricks, comparison tables, flashcards, quizzes & checklists for Modules 14–26

#### Topics
- [ ] Spaced repetition strategy (Day 1, 3, 7, 14, 30)
- [ ] Interactive revision dashboard
- [ ] Per-topic 1-min summary, 5-min revision, key concepts, terminology, memory tricks, interview traps, comparison tables, flashcards, quick quizzes, practice questions, revision checklist

---

### Module 28: Personal Learning Roadmap (`modules/28-learning-roadmap.html`)
Split into 1 part:
- **M28-P1**: Adaptive learning schedule (30 min min, 1 hr target, 2 hr max, weekend practicals), interactive progress & readiness tracker (completed lessons, total/module progress, weak topics, revision due, project progress, interview readiness)

#### Topics
- [ ] Adaptive daily/weekend pacing planner (30m / 1h / 2h + weekend)
- [ ] Per-lesson structure integration (study duration, objective, theory, practical, interview, revision, task, mastery assessment)
- [ ] Interactive tracking dashboard (completed lessons, total progress, module progress, weak topics, revision due, practical project progress, interview readiness)
