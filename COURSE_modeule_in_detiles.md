
# Master Prompt: Create a Complete Software Engineering Mastery HTML Handbook

Act as a senior software architect, full-stack engineer, database specialist, AI engineer, DevOps engineer, technical educator and senior-level interview coach.

I want you to create a **complete, standalone HTML course handbook** covering every topic listed below. This must be a comprehensive learning document that teaches me from fundamental concepts to advanced and expert-level engineering knowledge.

I have approximately 5 years of software development experience. I have exposure to MERN, Python, Java, AI, RAG, vector databases and various production systems, but I want to systematically strengthen my fundamentals, internals, optimization skills, architectural decision-making and interview confidence.

The goal is to make me capable of independently designing, building, debugging, optimizing, scaling and explaining production-grade software systems.

---

# 1. PRIMARY OUTPUT REQUIREMENT

Create a complete, professionally designed, standalone HTML file named:

`software_engineering_mastery.html`

The HTML document must contain the entire course, explanations, examples, diagrams, exercises, interview questions, answers, tips, projects and learning resources.

## HTML Requirements

- One complete HTML file.
- HTML, CSS and JavaScript must be embedded inside the file.
- No dependency on a backend.
- The document must work locally by opening it in a browser.
- Avoid dependencies on external libraries whenever possible.
- Responsive design for desktop, tablet and mobile.
- Modern professional UI.
- Dark/light theme toggle.
- Sidebar navigation.
- Search functionality across the course.
- Expandable and collapsible sections.
- Table of contents.
- Progress tracking for lessons.
- Checkbox-based completion tracking.
- Bookmark important topics if possible.
- Copy code buttons.
- Interactive code demonstrations wherever practical.
- Interview question reveal/hide answers.
- Filter interview questions by difficulty.
- Filter topics by category.
- Practical exercises and solution reveal.
- Glossary.
- Revision section.
- Architecture diagrams.
- Tables for comparisons.
- Visual explanations of important concepts.
- Local browser progress persistence using localStorage.

If the content is too large to generate in a single response, generate the HTML in multiple stages, but ultimately combine all content into one complete, functional HTML file. Never silently omit modules because of output limitations.

The final HTML must contain actual educational content. Do not create an empty template with placeholder text such as "Add content here", "Coming soon", "Insert explanation", or "This section will be covered later".

---

# 2. TEACHING FORMAT FOR EVERY TOPIC

For every topic and subtopic, use the following structure wherever applicable.

### A. Topic introduction

- What is this?
- Why does it exist?
- What problem does it solve?
- Where is it used in real-world software?

### B. Fundamentals

Explain the concept in simple English, assuming I may have forgotten the fundamentals.

### C. Internal working

Explain how the technology works internally, including relevant architecture, execution flow, data structures and algorithms.

### D. Practical examples

Provide practical code examples.

Use appropriate technologies:

- JavaScript
- TypeScript
- Node.js
- React
- Express
- PostgreSQL
- MySQL
- Microsoft SQL Server
- MongoDB
- Redis
- Python
- Docker
- AWS

### E. Step-by-step walkthrough

Explain how the example works line by line or step by step.

### F. Real-world use cases

Explain at least two realistic business or production scenarios wherever applicable.

### G. Common mistakes

Explain common mistakes developers make.

### H. Best practices

Explain engineering best practices.

### I. Performance and scalability

Explain optimization, scalability and production considerations.

### J. Security

Explain security risks and mitigation techniques where relevant.

### K. Comparison

Compare related concepts and alternatives.

### L. Tips to remember

Include:

- Mnemonics
- Mental models
- Simple analogies
- Memory tricks
- Quick revision notes
- Key rules to remember

### M. Interview questions

Provide questions at multiple difficulty levels.

### N. Interview answers

Provide detailed answers, not just short definitions.

### O. Practical exercises

Give me hands-on tasks.

### P. Advanced challenge

Include a senior-level or architecture-level challenge where appropriate.

### Q. Summary

End the topic with key takeaways.

---

# 3. INTERVIEW QUESTION DIFFICULTY LEVELS

For every major topic, create interview questions organized into four levels.

### Level 1 — Low / Basic

Questions suitable for junior or foundational interviews.

Examples:

- What is an index?
- What is Node.js?
- What is React?
- What is a primary key?
- What is caching?

Include answers, simple examples and tips.

### Level 2 — Medium / Intermediate

Questions involving practical implementation and problem-solving.

Examples:

- Why is my API slow?
- How do composite indexes work?
- How do you prevent unnecessary React renders?
- What is the difference between a JOIN and a subquery?
- How do you handle JWT refresh tokens?

Include detailed answers and practical code or examples.

### Level 3 — High / Advanced

Questions involving internals, optimization, scalability and trade-offs.

Examples:

- How does a database query planner choose an index?
- How would you optimize a query against 10 million rows?
- How does Node.js handle concurrent requests?
- How would you design a distributed cache?
- How would you optimize a large RAG pipeline?

Include deep technical answers.

### Level 4 — Expert / Senior / Architect

Questions involving architectural decisions, system design, failure scenarios and large-scale systems.

Examples:

- Design a multi-tenant SaaS platform with 10 million users.
- Design an AI-powered document processing platform.
- How would you design a system supporting 50,000 concurrent users?
- How would you handle a database bottleneck across multiple microservices?
- How would you design a scalable RAG system with millions of documents?
- How would you design a resilient event-driven architecture?
- How would you migrate a monolithic system to microservices without downtime?

Include:

1. How to analyze the problem.
2. Requirements.
3. Architecture.
4. Database design.
5. API design.
6. Technology choices.
7. Scaling.
8. Security.
9. Failure handling.
10. Trade-offs.
11. A sample senior-level answer.
12. Follow-up interview questions.

Do not just list questions. Include their answers and explain why the answer is correct.

For every major module, aim for:

- 10 basic questions.
- 10 intermediate questions.
- 10 advanced questions.
- 5 architect-level scenarios.

Where the topic is too small for this quantity, use a reasonable number without artificially repeating questions.

---

# 4. COMPLETE COURSE CONTENT

Do not omit any topic or subtopic listed below. Create a detailed course section for each.

# MODULE 1: PROGRAMMING FUNDAMENTALS & JAVASCRIPT

Cover:

- Programming fundamentals.
- Variables.
- Data types.
- Functions.
- Objects.
- Arrays.
- Classes.
- OOP.
- Encapsulation.
- Inheritance.
- Polymorphism.
- Abstraction.
- SOLID fundamentals.
- Algorithms.
- Data structures.
- Time complexity.
- Space complexity.
- Big O.
- Recursion.
- Sorting.
- Searching.
- Hash maps.
- Stacks.
- Queues.
- Trees.
- Graph fundamentals.
- JavaScript.
- ES6+.
- Closures.
- Scope.
- Hoisting.
- Prototype.
- Prototypal inheritance.
- this.
- Arrow functions.
- Promises.
- Async/await.
- Event loop.
- Microtasks.
- Macrotasks.
- Memory management.
- Garbage collection.
- TypeScript fundamentals.
- Type systems.
- Generics.
- Interfaces.
- Type safety.

# MODULE 2: REACT & FRONTEND ENGINEERING

Cover:

- React architecture.
- Components.
- Props.
- State.
- Rendering.
- Virtual DOM.
- JSX.
- Hooks.
- useState.
- useEffect.
- useRef.
- useContext.
- useMemo.
- useCallback.
- React.memo.
- Custom hooks.
- Component lifecycle concepts.
- State management.
- Context API.
- Redux.
- Redux Toolkit.
- React Query / TanStack Query.
- React Router.
- Forms.
- Validation.
- API integration.
- Authentication.
- Authorization.
- Error boundaries.
- Lazy loading.
- Code splitting.
- Performance optimization.
- Rendering optimization.
- Memoization.
- Frontend caching.
- Accessibility.
- Responsive design.
- Security.
- XSS.
- CSRF.
- Large frontend architecture.
- Component design patterns.
- Testing.
- Unit testing.
- Integration testing.
- Frontend debugging.

Include real React code and optimization examples.

# MODULE 3: NODE.JS & BACKEND ENGINEERING

Cover:

- Node.js architecture.
- V8.
- libuv.
- Event loop.
- Thread pool.
- Worker threads.
- Process vs thread.
- Async I/O.
- Streams.
- Buffers.
- File handling.
- Express.
- Middleware.
- Routing.
- REST API.
- API design.
- HTTP.
- HTTP methods.
- Status codes.
- Headers.
- Request lifecycle.
- API versioning.
- API validation.
- Error handling.
- Logging.
- Authentication.
- JWT.
- Refresh tokens.
- Session management.
- Authorization.
- RBAC.
- OAuth fundamentals.
- Rate limiting.
- CORS.
- Security.
- Input sanitization.
- SQL injection.
- NoSQL injection.
- API security.
- Pagination.
- Filtering.
- Sorting.
- File uploads.
- Background jobs.
- Queue systems.
- WebSockets.
- Connection pooling.
- Microservices.
- Modular monolith.
- Backend design patterns.
- Dependency injection.
- Testing.
- Unit tests.
- Integration tests.
- API tests.
- Performance optimization.

# MODULE 4: DATABASE FUNDAMENTALS & DATABASE ARCHITECTURE

Cover:

- What a database is.
- Database architecture.
- Database engines.
- Relational databases.
- NoSQL databases.
- Data modeling.
- ER diagrams.
- Tables.
- Rows.
- Columns.
- Primary keys.
- Foreign keys.
- Unique constraints.
- Check constraints.
- Normalization.
- Denormalization.
- 1NF.
- 2NF.
- 3NF.
- BCNF overview.
- Transactions.
- ACID.
- Isolation levels.
- Dirty reads.
- Non-repeatable reads.
- Phantom reads.
- Locks.
- Deadlocks.
- MVCC.
- Concurrency.
- Database consistency.
- Data integrity.
- Schema migrations.
- Connection pooling.
- Database backups.
- Recovery.

# MODULE 5: POSTGRESQL

Cover:

- PostgreSQL architecture.
- PostgreSQL internals.
- Database storage.
- Pages and tuples.
- MVCC.
- WAL.
- Transactions.
- SQL.
- SELECT.
- INSERT.
- UPDATE.
- DELETE.
- JOIN.
- INNER JOIN.
- LEFT JOIN.
- RIGHT JOIN.
- FULL JOIN.
- CROSS JOIN.
- Self joins.
- Subqueries.
- CTEs.
- Recursive CTEs.
- Window functions.
- Views.
- Materialized views.
- Functions.
- Stored procedures.
- Triggers.
- Constraints.
- JSON.
- JSONB.
- Transactions.
- Locking.
- Isolation levels.
- Partitioning.
- Replication.
- Connection pooling.
- EXPLAIN.
- EXPLAIN ANALYZE.
- Query planner.
- Query optimization.
- Indexing.
- Performance tuning.
- Vacuum.
- Autovacuum.
- Database maintenance.
- Backup and recovery.

# MODULE 6: MYSQL

Cover:

- MySQL architecture.
- Storage engines.
- InnoDB.
- MyISAM overview.
- SQL.
- Transactions.
- ACID.
- Isolation levels.
- Locking.
- Deadlocks.
- Indexes.
- Composite indexes.
- Clustered indexes.
- Secondary indexes.
- Query optimization.
- EXPLAIN.
- Query execution.
- Stored procedures.
- Triggers.
- Views.
- Replication.
- Partitioning.
- Performance tuning.
- Connection management.
- Backup and recovery.

# MODULE 7: MICROSOFT SQL SERVER (MSSQL)

Cover:

- SQL Server architecture.
- SQL Server engine.
- Storage.
- Pages.
- Extents.
- Tables.
- Indexes.
- Clustered indexes.
- Non-clustered indexes.
- Heap tables.
- Stored procedures.
- Functions.
- Views.
- Triggers.
- Transactions.
- Locking.
- Isolation levels.
- Deadlocks.
- Query execution plans.
- Query optimization.
- Statistics.
- Execution plan analysis.
- Index maintenance.
- Fragmentation.
- Parameter sniffing.
- Query tuning.
- Temp tables.
- Table variables.
- CTEs.
- Window functions.
- Partitioning.
- SQL Server Agent.
- Backup and recovery.
- Performance monitoring.

# MODULE 8: DATABASE INDEXING — DEEP DIVE

This must be a particularly detailed module.

Cover:

- Why indexes exist.
- How indexes work.
- B-Tree.
- B+ Tree.
- Hash indexes.
- Clustered indexes.
- Non-clustered indexes.
- Composite indexes.
- Covering indexes.
- Unique indexes.
- Partial indexes.
- Filtered indexes.
- Functional indexes.
- Expression indexes.
- Full-text indexes.
- Spatial indexes.
- Index selectivity.
- Cardinality.
- Index statistics.
- Index scans.
- Index seeks.
- Index lookups.
- Table scans.
- Sequential scans.
- Composite index column order.
- Leftmost-prefix principle.
- Sorting using indexes.
- Filtering using indexes.
- JOIN optimization using indexes.
- GROUP BY optimization.
- ORDER BY optimization.
- Index-only scans.
- Index maintenance.
- Fragmentation.
- Write overhead.
- Storage overhead.
- Over-indexing.
- Under-indexing.
- Index selection.
- Index design for millions of records.

Compare indexing strategies in PostgreSQL, MySQL, MSSQL and MongoDB.

Provide realistic examples of:

- A slow query.
- An incorrect index.
- A better index.
- An execution plan.
- A performance comparison.
- A production index strategy.

# MODULE 9: DATABASE QUERY OPTIMIZATION

Cover:

- Identifying slow queries.
- Query profiling.
- Query execution plans.
- Query cost.
- CPU.
- Memory.
- Disk I/O.
- Network.
- Locks.
- Wait events.
- Query rewriting.
- JOIN optimization.
- Subquery optimization.
- N+1 problem.
- Pagination.
- Offset pagination.
- Cursor pagination.
- Keyset pagination.
- Large dataset pagination.
- Batch operations.
- Bulk inserts.
- Bulk updates.
- Connection pooling.
- Database bottlenecks.
- Database monitoring.
- Query caching.
- Data partitioning.
- Read replicas.
- Horizontal scaling.
- Vertical scaling.

Use practical examples involving 1 million, 10 million and 100 million records.

Teach me how to investigate, not just which optimization to apply.

# MODULE 10: MONGODB

Cover:

- MongoDB architecture.
- BSON.
- Documents.
- Collections.
- CRUD.
- Schema design.
- Flexible schemas.
- Embedding.
- Referencing.
- Data modeling.
- Aggregation.
- Aggregation pipelines.
- $match.
- $project.
- $group.
- $sort.
- $lookup.
- $unwind.
- $facet.
- $limit.
- $skip.
- $addFields.
- $set.
- $replaceRoot.
- Indexes.
- Compound indexes.
- Unique indexes.
- TTL indexes.
- Text indexes.
- Geospatial indexes.
- Partial indexes.
- Multikey indexes.
- Index selection.
- Explain plans.
- Query optimization.
- Transactions.
- Replication.
- Replica sets.
- Sharding.
- Shard keys.
- Read concern.
- Write concern.
- Read preference.
- Connection pooling.
- MongoDB performance.
- MongoDB security.
- MongoDB backup.
- MongoDB schema evolution.

Include examples and comparisons against SQL databases.

# MODULE 11: CASSANDRA

Cover:

- Cassandra architecture.
- Distributed database fundamentals.
- Wide-column model.
- Nodes.
- Clusters.
- Data centers.
- Replication.
- Partition keys.
- Clustering keys.
- Data modeling.
- Query-driven design.
- Consistency levels.
- CAP theorem.
- Distributed writes.
- Write path.
- Commit log.
- Memtable.
- SSTables.
- Compaction.
- Tombstones.
- TTL.
- Secondary indexes.
- Cassandra indexing limitations.
- Failure handling.
- Scaling.
- Repair.
- Monitoring.
- Performance optimization.
- Cassandra use cases.
- When Cassandra should not be used.

# MODULE 12: REDIS

Cover:

- Redis architecture.
- In-memory databases.
- Key/value storage.
- Strings.
- Hashes.
- Lists.
- Sets.
- Sorted sets.
- Streams.
- Pub/Sub.
- TTL.
- Expiration.
- Caching.
- Cache-aside.
- Write-through.
- Write-behind.
- Read-through.
- Cache invalidation.
- Cache stampede.
- Cache penetration.
- Cache avalanche.
- Distributed locks.
- Rate limiting.
- Redis queues.
- Redis persistence.
- RDB.
- AOF.
- Replication.
- Redis Sentinel.
- Redis Cluster.
- Eviction policies.
- Memory optimization.
- Redis performance.
- Redis security.
- Redis monitoring.

Include practical Redis examples.

# MODULE 13: GRAPHQL

Cover:

- GraphQL fundamentals.
- GraphQL vs REST.
- Schema.
- Types.
- Queries.
- Mutations.
- Subscriptions.
- Resolvers.
- Scalar types.
- Object types.
- Input types.
- Interfaces.
- Unions.
- Authentication.
- Authorization.
- Pagination.
- Cursor pagination.
- DataLoader.
- N+1 problem.
- Query complexity.
- Query depth.
- Rate limiting.
- Caching.
- Error handling.
- GraphQL security.
- GraphQL architecture.
- Node.js implementation.

# MODULE 14: SOFTWARE ENGINEERING & DESIGN PATTERNS

Cover:

- SOLID.
- Clean code.
- DRY.
- KISS.
- YAGNI.
- Dependency injection.
- Design patterns.
- Factory.
- Strategy.
- Observer.
- Singleton.
- Adapter.
- Decorator.
- Repository.
- Builder.
- Facade.
- Command.
- Chain of responsibility.
- Layered architecture.
- Clean architecture.
- Hexagonal architecture.
- Domain-driven design.
- Modular monolith.
- Separation of concerns.
- Coupling.
- Cohesion.
- Technical debt.
- Refactoring.
- Code review.
- Testing strategies.

Explain how to avoid overengineering.

# MODULE 15: SYSTEM DESIGN

This must be one of the most detailed sections.

Teach the entire system design process from scratch.

## Requirements analysis

- Functional requirements.
- Non-functional requirements.
- Constraints.
- User roles.
- User journeys.
- API requirements.
- Data requirements.
- Security requirements.
- Scalability requirements.
- Availability requirements.
- Performance requirements.
- SLA.
- SLO.
- SLIs.

## Capacity estimation

- Users.
- Requests per second.
- Concurrent users.
- Peak traffic.
- Storage.
- Bandwidth.
- Database growth.
- Cache size.
- Memory.
- CPU.
- File storage.
- Cost estimation.

## Architecture

- Monolith.
- Modular monolith.
- Microservices.
- Event-driven architecture.
- Serverless.
- Distributed architecture.
- Service boundaries.
- API gateways.
- Load balancers.
- Reverse proxies.
- Horizontal scaling.
- Vertical scaling.
- Stateless vs stateful services.

## Database architecture decisions

Teach how to choose:

- PostgreSQL.
- MySQL.
- MSSQL.
- MongoDB.
- Cassandra.
- Redis.
- Vector databases.
- Graph databases.

Explain the decision process, not just the characteristics.

## Distributed systems

- CAP.
- PACELC.
- Consistency.
- Availability.
- Partition tolerance.
- Eventual consistency.
- Strong consistency.
- Distributed transactions.
- Sagas.
- Outbox pattern.
- Idempotency.
- Retries.
- Circuit breakers.
- Rate limiting.
- Message queues.
- Kafka.
- RabbitMQ.
- Dead-letter queues.
- Distributed locks.
- Event-driven systems.
- Observability.
- Fault tolerance.
- Resilience.
- Disaster recovery.

## Architecture decision framework

For every design, explain:

- Why a technology was chosen.
- Why alternatives were rejected.
- Trade-offs.
- Cost.
- Complexity.
- Scaling.
- Security.
- Failure handling.
- Maintenance.
- Migration.
- Future evolution.

Don't recommend Kafka, Redis, Kubernetes or microservices unless the requirements justify them.

## System design practice

Include complete worked system design examples:

- URL shortener.
- E-commerce system.
- Chat application.
- Notification system.
- File storage system.
- Video streaming platform.
- Ride-sharing system.
- Food delivery system.
- Online examination platform.
- Report generation platform.
- Multi-tenant SaaS.
- AI document processing system.
- RAG-based educational platform.
- Real-time monitoring platform.
- CCTV object detection platform.

For each, include:

1. Requirements.
2. Scope.
3. Traffic estimates.
4. Architecture diagram.
5. API design.
6. Database schema.
7. Index strategy.
8. Cache strategy.
9. Queue strategy.
10. Storage.
11. Security.
12. Scaling.
13. Failure handling.
14. Bottlenecks.
15. Trade-offs.
16. Interview presentation format.

# MODULE 16: DISTRIBUTED SYSTEMS & MESSAGE QUEUES

Cover:

- Distributed systems.
- Communication.
- Network failures.
- Latency.
- Reliability.
- Consistency.
- Fault tolerance.
- Event-driven architecture.
- Messaging.
- Kafka.
- RabbitMQ.
- Producers.
- Consumers.
- Topics.
- Partitions.
- Consumer groups.
- Offsets.
- Ordering.
- Retries.
- Dead-letter queues.
- Idempotency.
- Duplicate messages.
- Delivery guarantees.
- At-most-once.
- At-least-once.
- Exactly-once semantics and their limitations.
- Event sourcing.
- CQRS.
- Outbox pattern.
- Sagas.
- Backpressure.
- Distributed locks.
- Observability.

Include implementation examples.

# MODULE 17: AI & LLM ENGINEERING

Cover:

- AI.
- Machine learning.
- Deep learning.
- LLMs.
- Transformers.
- Attention.
- Tokens.
- Tokenization.
- Context windows.
- Model parameters.
- Temperature.
- Sampling.
- Embeddings.
- Prompt engineering.
- System prompts.
- Structured outputs.
- Function calling.
- Tool calling.
- Agents.
- Model selection.
- Model evaluation.
- Hallucination.
- Safety.
- AI security.
- Prompt injection.
- API integration.
- Cost optimization.
- Latency optimization.
- AI observability.
- AI production architecture.
- Model limitations.

# MODULE 18: RAG

Cover RAG from basic to production architecture.

## Fundamentals

- RAG.
- Why RAG.
- RAG vs fine-tuning.
- RAG pipeline.
- Document ingestion.
- Text extraction.
- OCR.
- PDF.
- Word documents.
- Images.
- Tables.
- Chunking.
- Embeddings.
- Vector search.
- Retrieval.
- Context construction.
- Prompt generation.
- LLM generation.

## Advanced RAG

- Chunking strategies.
- Fixed chunking.
- Semantic chunking.
- Recursive chunking.
- Overlapping chunks.
- Metadata.
- Metadata filtering.
- Embedding models.
- Embedding dimensions.
- Cosine similarity.
- Dot product.
- Euclidean distance.
- ANN.
- Exact search.
- Hybrid search.
- BM25.
- Reranking.
- Cross-encoder reranking.
- Query rewriting.
- Multi-query retrieval.
- Context compression.
- Retrieval evaluation.
- Precision.
- Recall.
- MRR.
- NDCG.
- Groundedness.
- Hallucination reduction.
- RAG observability.
- RAG security.
- Prompt injection in documents.
- Multi-tenant RAG.
- RAG scalability.
- RAG cost optimization.
- RAG latency optimization.
- RAG caching.
- RAG failure handling.

Include complete examples of a RAG pipeline.

# MODULE 19: VECTOR DATABASES

Cover:

- Vector databases.
- Embeddings.
- Similarity.
- Vector storage.
- ANN.
- Exact search.
- HNSW.
- IVF.
- IVF-PQ.
- Quantization.
- Vector indexing.
- Metadata filtering.
- Hybrid search.
- Reranking.
- Vector performance.
- Vector memory.
- Vector storage.
- Vector scaling.
- Vector database benchmarking.

Compare:

- PostgreSQL pgvector.
- Qdrant.
- Milvus.
- Pinecone.
- Weaviate.
- MongoDB Atlas Vector Search.
- Redis Vector Search.

Explain:

- When to choose each.
- Cost.
- Scaling.
- Complexity.
- Performance.
- Trade-offs.
- When PostgreSQL is enough.
- When a dedicated vector database is justified.

# MODULE 20: DEVOPS & CI/CD

Cover:

- Git.
- Git branching.
- Git workflows.
- GitHub.
- GitLab.
- Docker.
- Docker images.
- Containers.
- Docker Compose.
- Networking.
- Volumes.
- Container security.
- Kubernetes fundamentals.
- CI.
- CD.
- Continuous deployment.
- Continuous delivery.
- GitHub Actions.
- Jenkins.
- GitLab CI.
- Automated tests.
- Build pipelines.
- Code quality.
- Security scans.
- Secrets management.
- Environment management.
- Infrastructure as Code.
- Terraform.
- Deployment strategies.
- Blue-green deployment.
- Canary deployment.
- Rollbacks.
- Zero-downtime deployment.

Include complete pipeline examples.

# MODULE 21: CLOUD & AWS

Cover:

- Cloud fundamentals.
- AWS.
- EC2.
- ECS.
- EKS overview.
- Lambda.
- S3.
- RDS.
- DynamoDB overview.
- SQS.
- SNS.
- API Gateway.
- CloudWatch.
- IAM.
- Secrets Manager.
- VPC.
- Networking.
- Load balancing.
- Auto scaling.
- Cloud deployment.
- Cloud architecture.
- Security.
- Cost optimization.
- Disaster recovery.

Include realistic deployment architecture examples.

# MODULE 22: OBSERVABILITY & PRODUCTION ENGINEERING

Cover:

- Logging.
- Metrics.
- Tracing.
- Distributed tracing.
- OpenTelemetry.
- Monitoring.
- Alerting.
- Dashboards.
- Error tracking.
- Performance monitoring.
- Health checks.
- SLI.
- SLO.
- SLA.
- Incident response.
- Root cause analysis.
- Postmortems.
- Production debugging.
- Capacity planning.
- Reliability engineering.
- Chaos testing.
- Load testing.
- Stress testing.
- Scalability testing.

# MODULE 23: SECURITY

Cover:

- Authentication.
- Authorization.
- JWT.
- OAuth.
- Session management.
- RBAC.
- Password hashing.
- Encryption.
- HTTPS.
- TLS.
- SQL injection.
- NoSQL injection.
- XSS.
- CSRF.
- SSRF.
- CORS.
- Rate limiting.
- API security.
- Database security.
- Secrets management.
- Cloud security.
- OWASP Top 10.
- Secure coding.
- AI security.
- RAG prompt injection.
- Data privacy.
- Least privilege.
- Threat modeling.

# MODULE 24: TESTING

Cover:

- Unit testing.
- Integration testing.
- End-to-end testing.
- API testing.
- Component testing.
- Mocking.
- Test doubles.
- Regression testing.
- Load testing.
- Performance testing.
- Stress testing.
- Security testing.
- CI testing.
- Test strategy.
- Test coverage.
- Testing distributed systems.
- Testing AI and RAG systems.
- Evaluation datasets.
- AI response evaluation.

# MODULE 25: REAL-WORLD PROJECTS

Include complete progressive projects.

### Project 1

MERN CRUD application.

### Project 2

Authentication and RBAC application.

### Project 3

Large dataset application with database optimization.

### Project 4

Redis caching and background processing.

### Project 5

GraphQL application.

### Project 6

Distributed application with Kafka or RabbitMQ.

### Project 7

AI application using LLM APIs.

### Project 8

RAG application with PDF, text, images and vector search.

### Project 9

Multi-tenant AI educational platform.

### Project 10

Production-grade SaaS platform with:

- React.
- Node.js.
- PostgreSQL.
- MongoDB where justified.
- Redis.
- AI.
- RAG.
- Vector search.
- Docker.
- CI/CD.
- Cloud.
- Monitoring.
- Security.
- Testing.
- Load testing.

For each project, include:

- Requirements.
- Architecture.
- Design.
- Database schema.
- API.
- Implementation steps.
- Code examples.
- Testing.
- Deployment.
- Optimization.
- Interview questions.
- Advanced extensions.

# MODULE 26: SENIOR & ARCHITECT INTERVIEW TRAINING

Create an extensive interview section.

Include:

- MERN.
- React.
- JavaScript.
- Node.js.
- Backend.
- SQL.
- PostgreSQL.
- MySQL.
- MSSQL.
- MongoDB.
- Cassandra.
- Redis.
- GraphQL.
- System design.
- Distributed systems.
- AI.
- RAG.
- Vector databases.
- DevOps.
- Cloud.
- Security.
- Architecture.

Include question levels:

- Basic.
- Intermediate.
- Advanced.
- Senior.
- Architect.

Include scenario-based questions, answers, diagrams and follow-up questions.

Teach how to communicate answers in interviews.

For architectural questions, provide a structured answering framework:

1. Clarify requirements.
2. Identify constraints.
3. Estimate capacity.
4. Define APIs.
5. Design data.
6. Design architecture.
7. Explain trade-offs.
8. Discuss scaling.
9. Discuss failure handling.
10. Discuss security.
11. Discuss monitoring.
12. Discuss future improvements.

# MODULE 27: MEMORY & REVISION SYSTEM

Create a comprehensive revision system.

For every topic include:

- One-minute summary.
- Five-minute revision.
- Key concepts.
- Important terminology.
- Memory tricks.
- Common interview traps.
- Comparison tables.
- Flashcards.
- Quick quizzes.
- Practice questions.
- Revision checklist.

Create a spaced repetition strategy:

- Day 1.
- Day 3.
- Day 7.
- Day 14.
- Day 30.

Include a revision dashboard in the HTML if possible.

# MODULE 28: PERSONAL LEARNING ROADMAP

I can study:

- Minimum: 30 minutes per day.
- Maximum: 2 hours per day.
- Typical target: 1 hour per day.
- Weekends may allow longer practical sessions.

Create an adaptive learning structure.

For every lesson:

- Estimate study duration.
- Explain the learning objective.
- Provide a theory section.
- Provide a practical section.
- Provide an interview section.
- Provide revision.
- Provide a task.
- Provide a mastery assessment.

Track:

- Completed lessons.
- Total progress.
- Module progress.
- Weak topics.
- Revision due.
- Practical project progress.
- Interview readiness.

Don't force a fixed pace. Adapt based on my available time.

---

# 5. HTML UI DESIGN

Create a professional engineering learning portal inside the HTML file.

## Sidebar

Organize all modules in a searchable navigation sidebar.

## Main content

Show:

- Module.
- Lesson.
- Concepts.
- Code.
- Diagrams.
- Exercises.
- Interview questions.
- Answers.
- Revision.
- Progress.

## Interview UI

Each interview question should include:

- Difficulty.
- Question.
- Reveal answer.
- Explanation.
- Example.
- Follow-up questions.
- Interview tips.

Use visual indicators for difficulty:

- Basic.
- Intermediate.
- Advanced.
- Senior/Architect.

Allow filtering by difficulty.

## Code UI

For every code snippet:

- Use syntax-highlighted presentation if possible.
- Include a copy button.
- Explain the code.
- Show expected output where applicable.

## Architecture diagrams

Use embedded SVG, CSS diagrams or Mermaid only if the diagram can be rendered locally without requiring external dependencies.

Include diagrams for:

- Node.js architecture.
- React rendering.
- Database internals.
- Indexes.
- Redis.
- MongoDB.
- Cassandra.
- GraphQL.
- System architecture.
- Distributed systems.
- Kafka.
- RAG.
- Vector databases.
- CI/CD.
- AWS.

## Progress

Include:

- Course completion percentage.
- Module completion.
- Lesson completion.
- Checklist.
- Revision progress.

Save progress in localStorage.

## Search

Provide a global search that can search:

- Topics.
- Definitions.
- Code.
- Interview questions.
- Answers.
- Glossary.

---

# 6. CONTENT QUALITY RULES

1. Do not skip any topic in the syllabus.
2. Do not replace explanations with brief bullet points.
3. Do not assume knowledge of advanced concepts.
4. Explain fundamental concepts before advanced concepts.
5. Explain how technologies work internally.
6. Include practical code.
7. Include real-world architecture.
8. Include database examples.
9. Include performance analysis.
10. Include security.
11. Include interview answers.
12. Include memory tips.
13. Include exercises.
14. Include architecture decision scenarios.
15. Include diagrams wherever helpful.
16. Explain technology trade-offs.
17. Avoid unnecessary repetition.
18. Avoid artificial complexity.
19. Distinguish between theoretical knowledge and practical engineering.
20. Do not invent incorrect technical details.
21. Clearly identify limitations, assumptions and version-sensitive details.
22. Ensure the content is useful for a senior software engineer interview.
23. Ensure that examples are realistic.
24. Ensure that code examples are internally consistent.
25. Do not leave modules incomplete.

The HTML must be a genuine educational handbook, not merely a navigation shell or collection of links.

---

# 7. FINAL OUTPUT

Generate the actual complete HTML file.

Do not merely provide the HTML outline.

Do not simply explain how I can create it.

Do not return only a small sample.

Create the complete standalone HTML handbook containing the actual course material, explanations, examples, diagrams, questions, answers, tips, exercises and revision system.

If the complete course cannot fit in one generation, generate it in manageable parts, preserve all content and merge them into the final standalone HTML file.

Before finishing, validate:

- All requested modules are included.
- All major topics are covered.
- HTML structure is valid.
- JavaScript functionality works.
- Navigation works.
- Search works.
- Progress tracking works.
- Answers can be revealed.
- Code can be copied.
- Layout is responsive.
- The file can be opened locally.
- No major topic is represented by placeholder content.

My goal is to use this single HTML document as my long-term software engineering learning handbook, revision resource and interview preparation portal.

Create it with the depth and quality of a professional technical training course designed to take an experienced developer toward senior engineering and software architecture expertise.
