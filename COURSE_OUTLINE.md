# Course Outline — Software Engineering Mastery

## Purpose
This is the syllabus source of truth for the handbook, reconciled with `COURSE_modeule_in_detiles.md` (the approved master prompt) and `CONTENT_CHECKLIST.md`.

## Modules (28 Total)
Each module's prose lives as MDX parts under `content/modules/<module>/` with typed interview banks under `content/interviews/`, loaded via `content/registry.ts` and bundled into `dist/software_engineering_mastery.html` by Vite (`vite-plugin-singlefile`).

| # | Module | Source Content Directory | Parts | Status | Notes |
|---|---|---|---|---|---|
| 01 | Programming Fundamentals & JavaScript | `content/modules/01-programming/` | 5 parts (`M01-P1`..`P5`) | In progress (`M01-P1` & `M01-P2` completed & verified; `M01-P3` next) | Covers fundamentals, OOP/SOLID, DSA, JS internals, TypeScript |
| 02 | React & Frontend Engineering | `content/modules/02-react/` | 4 parts (`M02-P1`..`P4`) | Not started | Includes hooks, state management, optimization, security, testing |
| 03 | Node.js & Backend Engineering | `content/modules/03-nodejs/` | 4 parts (`M03-P1`..`P4`) | Not started | Covers V8/libuv, Express, auth/RBAC/OAuth, queues, patterns, testing |
| 04 | Database Fundamentals & Database Architecture | `content/modules/04-database-fundamentals/` | 3 parts (`M04-P1`..`P3`) | Not started | Data modeling, normalization, ACID, isolation, locks, MVCC, backups |
| 05 | PostgreSQL | `content/modules/05-postgresql/` | 4 parts (`M05-P1`..`P4`) | Not started | Internals, WAL/MVCC, SQL, CTEs/windows, JSONB, EXPLAIN, vacuum |
| 06 | MySQL | `content/modules/06-mysql/` | 2 parts (`M06-P1`..`P2`) | Not started | InnoDB, locking, clustered/secondary indexes, EXPLAIN, replication |
| 07 | Microsoft SQL Server (MSSQL) | `content/modules/07-mssql/` | 3 parts (`M07-P1`..`P3`) | Not started | Pages/extents, heaps, parameter sniffing, execution plans, Agent |
| 08 | Database Indexing — Deep Dive | `content/modules/08-indexing/` | 4 parts (`M08-P1`..`P4`) | Not started | B/B+Tree, composite/covering/partial, scans vs seeks, 4-DB comparison |
| 09 | Database Query Optimization | `content/modules/09-query-optimization/` | 3 parts (`M09-P1`..`P3`) | Not started | Investigation flow, N+1, keyset pagination, 1M/10M/100M row tuning |
| 10 | MongoDB | `content/modules/10-mongodb/` | 3 parts (`M10-P1`..`P3`) | Not started | BSON, embedding vs referencing, aggregation, sharding, SQL comparison |
| 11 | Cassandra | `content/modules/11-cassandra/` | 2 parts (`M11-P1`..`P2`) | Not started | Wide-column, query-driven design, commit log/memtable/SSTables, CAP |
| 12 | Redis | `content/modules/12-redis/` | 3 parts (`M12-P1`..`P3`) | Not started | Data structures, Streams, caching patterns, stampede/locks, RDB/AOF |
| 13 | GraphQL | `content/modules/13-graphql/` | 2 parts (`M13-P1`..`P2`) | Not started | Schema, resolvers, DataLoader/N+1, complexity/depth limits, security |
| 14 | Software Engineering & Design Patterns | `content/modules/14-design-patterns/` | 3 parts (`M14-P1`..`P3`) | Not started | SOLID, GoF patterns, Clean/Hexagonal/DDD, avoiding overengineering |
| 15 | System Design | `content/modules/15-system-design/` | 6 parts (`M15-P1`..`P6`) | Not started | Requirements, capacity, DB choice, CAP/PACELC, 15 worked designs |
| 16 | Distributed Systems & Message Queues | `content/modules/16-distributed-systems/` | 3 parts (`M16-P1`..`P3`) | Not started | Kafka, RabbitMQ, delivery guarantees, outbox, sagas, CQRS, locks |
| 17 | AI & LLM Engineering | `content/modules/17-ai-engineering/` | 3 parts (`M17-P1`..`P3`) | Not started | Transformers, tokens, prompting, tool calling, agents, eval, security |
| 18 | RAG | `content/modules/18-rag/` | 3 parts (`M18-P1`..`P3`) | Not started | Ingestion, chunking, hybrid/BM25, reranking, eval metrics, multi-tenant |
| 19 | Vector Databases | `content/modules/19-vector-databases/` | 2 parts (`M19-P1`..`P2`) | Not started | HNSW, IVF-PQ, quantization, 7-DB comparison, pgvector vs dedicated |
| 20 | DevOps & CI/CD | `content/modules/20-devops-cicd/` | 3 parts (`M20-P1`..`P3`) | Not started | Git, Docker, K8s fundamentals, GitHub Actions/GitLab/Jenkins, Terraform |
| 21 | Cloud & AWS | `content/modules/21-aws/` | 3 parts (`M21-P1`..`P3`) | Not started | EC2/ECS/EKS/Lambda, S3/RDS/DynamoDB, SQS/SNS, IAM/VPC, cost & DR |
| 22 | Observability & Production Engineering | `content/modules/22-observability/` | 2 parts (`M22-P1`..`P2`) | Not started | Logs/metrics/traces, OpenTelemetry, SLI/SLO/SLA, postmortems, chaos/load |
| 23 | Security | `content/modules/23-security/` | 3 parts (`M23-P1`..`P3`) | Not started | Auth/JWT/OAuth, OWASP Top 10, TLS, secrets, AI/RAG security, threat model |
| 24 | Testing | `content/modules/24-testing/` | 2 parts (`M24-P1`..`P2`) | Not started | Unit/integration/E2E, doubles, load/security testing, AI/RAG evaluation |
| 25 | Real-World Projects | `content/modules/25-projects/` | 5 parts (`M25-P1`..`P5`) | Not started | 10 progressive projects with 12 deliverables each |
| 26 | Senior & Architect Interview Training | `content/modules/26-interviews/` | 4 parts (`M26-P1`..`P4`) | Not started | 5 levels (Basic, Intermediate, Advanced, Senior, Architect) + 12-step framework |
| 27 | Memory & Revision System | `content/modules/27-revision/` | 3 parts (`M27-P1`..`P3`) | Not started | Spaced repetition (1/3/7/14/30), flashcards, quizzes, summaries, traps |
| 28 | Personal Learning Roadmap | `content/modules/28-learning-roadmap/` | 1 part (`M28-P1`) | Not started | Adaptive 30m–2h daily + weekend plan & progress/readiness tracking |

## Scope Rules
- Do not silently remove a topic from the approved master prompt.
- Cross-module topics (e.g., SOLID in Mod 1 & 14; Security in Mod 2/3/23; Testing in Mod 2/3/14/24) are taught in context and cross-referenced to their deep-dive module to avoid shallow duplication.
- Split large modules into manageable parts (`MXX-PY`) so every part can be written completely without placeholders.
- Mark a module complete only after all its parts are written, built, and checked against `CONTENT_CHECKLIST.md`.
