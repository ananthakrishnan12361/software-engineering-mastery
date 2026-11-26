# Course Outline — Software Engineering Mastery

## Purpose
This is the syllabus source of truth for the handbook, reconciled with `COURSE_modeule_in_detiles.md` (the approved master prompt) and `CONTENT_CHECKLIST.md`.

## Modules (28 Total)
Each module maps to a fragment file in `modules/` and is merged into `dist/software_engineering_mastery.html` by `build.js`.

| # | Module | Source File | Parts | Status | Notes |
|---|---|---|---|---|---|
| 01 | Programming Fundamentals & JavaScript | `modules/01-programming.html` | 5 parts (`M01-P1`..`P5`) | In progress (`M01-P1` written, `M01-P2` next) | Covers fundamentals, OOP/SOLID, DSA, JS internals, TypeScript |
| 02 | React & Frontend Engineering | `modules/02-react.html` | 4 parts (`M02-P1`..`P4`) | Not started | Includes hooks, state management, optimization, security, testing |
| 03 | Node.js & Backend Engineering | `modules/03-nodejs.html` | 4 parts (`M03-P1`..`P4`) | Not started | Covers V8/libuv, Express, auth/RBAC/OAuth, queues, patterns, testing |
| 04 | Database Fundamentals & Database Architecture | `modules/04-database-fundamentals.html` | 3 parts (`M04-P1`..`P3`) | Not started | Data modeling, normalization, ACID, isolation, locks, MVCC, backups |
| 05 | PostgreSQL | `modules/05-postgresql.html` | 4 parts (`M05-P1`..`P4`) | Not started | Internals, WAL/MVCC, SQL, CTEs/windows, JSONB, EXPLAIN, vacuum |
| 06 | MySQL | `modules/06-mysql.html` | 2 parts (`M06-P1`..`P2`) | Not started | InnoDB, locking, clustered/secondary indexes, EXPLAIN, replication |
| 07 | Microsoft SQL Server (MSSQL) | `modules/07-mssql.html` | 3 parts (`M07-P1`..`P3`) | Not started | Pages/extents, heaps, parameter sniffing, execution plans, Agent |
| 08 | Database Indexing — Deep Dive | `modules/08-indexing.html` | 4 parts (`M08-P1`..`P4`) | Not started | B/B+Tree, composite/covering/partial, scans vs seeks, 4-DB comparison |
| 09 | Database Query Optimization | `modules/09-query-optimization.html` | 3 parts (`M09-P1`..`P3`) | Not started | Investigation flow, N+1, keyset pagination, 1M/10M/100M row tuning |
| 10 | MongoDB | `modules/10-mongodb.html` | 3 parts (`M10-P1`..`P3`) | Not started | BSON, embedding vs referencing, aggregation, sharding, SQL comparison |
| 11 | Cassandra | `modules/11-cassandra.html` | 2 parts (`M11-P1`..`P2`) | Not started | Wide-column, query-driven design, commit log/memtable/SSTables, CAP |
| 12 | Redis | `modules/12-redis.html` | 3 parts (`M12-P1`..`P3`) | Not started | Data structures, Streams, caching patterns, stampede/locks, RDB/AOF |
| 13 | GraphQL | `modules/13-graphql.html` | 2 parts (`M13-P1`..`P2`) | Not started | Schema, resolvers, DataLoader/N+1, complexity/depth limits, security |
| 14 | Software Engineering & Design Patterns | `modules/14-design-patterns.html` | 3 parts (`M14-P1`..`P3`) | Not started | SOLID, GoF patterns, Clean/Hexagonal/DDD, avoiding overengineering |
| 15 | System Design | `modules/15-system-design.html` | 6 parts (`M15-P1`..`P6`) | Not started | Requirements, capacity, DB choice, CAP/PACELC, 15 worked designs |
| 16 | Distributed Systems & Message Queues | `modules/16-distributed-systems.html` | 3 parts (`M16-P1`..`P3`) | Not started | Kafka, RabbitMQ, delivery guarantees, outbox, sagas, CQRS, locks |
| 17 | AI & LLM Engineering | `modules/17-ai-engineering.html` | 3 parts (`M17-P1`..`P3`) | Not started | Transformers, tokens, prompting, tool calling, agents, eval, security |
| 18 | RAG | `modules/18-rag.html` | 3 parts (`M18-P1`..`P3`) | Not started | Ingestion, chunking, hybrid/BM25, reranking, eval metrics, multi-tenant |
| 19 | Vector Databases | `modules/19-vector-databases.html` | 2 parts (`M19-P1`..`P2`) | Not started | HNSW, IVF-PQ, quantization, 7-DB comparison, pgvector vs dedicated |
| 20 | DevOps & CI/CD | `modules/20-devops-cicd.html` | 3 parts (`M20-P1`..`P3`) | Not started | Git, Docker, K8s fundamentals, GitHub Actions/GitLab/Jenkins, Terraform |
| 21 | Cloud & AWS | `modules/21-aws.html` | 3 parts (`M21-P1`..`P3`) | Not started | EC2/ECS/EKS/Lambda, S3/RDS/DynamoDB, SQS/SNS, IAM/VPC, cost & DR |
| 22 | Observability & Production Engineering | `modules/22-observability.html` | 2 parts (`M22-P1`..`P2`) | Not started | Logs/metrics/traces, OpenTelemetry, SLI/SLO/SLA, postmortems, chaos/load |
| 23 | Security | `modules/23-security.html` | 3 parts (`M23-P1`..`P3`) | Not started | Auth/JWT/OAuth, OWASP Top 10, TLS, secrets, AI/RAG security, threat model |
| 24 | Testing | `modules/24-testing.html` | 2 parts (`M24-P1`..`P2`) | Not started | Unit/integration/E2E, doubles, load/security testing, AI/RAG evaluation |
| 25 | Real-World Projects | `modules/25-projects.html` | 5 parts (`M25-P1`..`P5`) | Not started | 10 progressive projects with 12 deliverables each |
| 26 | Senior & Architect Interview Training | `modules/26-interviews.html` | 4 parts (`M26-P1`..`P4`) | Not started | 5 levels (Basic, Intermediate, Advanced, Senior, Architect) + 12-step framework |
| 27 | Memory & Revision System | `modules/27-revision.html` | 3 parts (`M27-P1`..`P3`) | Not started | Spaced repetition (1/3/7/14/30), flashcards, quizzes, summaries, traps |
| 28 | Personal Learning Roadmap | `modules/28-learning-roadmap.html` | 1 part (`M28-P1`) | Not started | Adaptive 30m–2h daily + weekend plan & progress/readiness tracking |

## Scope Rules
- Do not silently remove a topic from the approved master prompt.
- Cross-module topics (e.g., SOLID in Mod 1 & 14; Security in Mod 2/3/23; Testing in Mod 2/3/14/24) are taught in context and cross-referenced to their deep-dive module to avoid shallow duplication.
- Split large modules into manageable parts (`MXX-PY`) so every part can be written completely without placeholders.
- Mark a module complete only after all its parts are written, built, and checked against `CONTENT_CHECKLIST.md`.
