# Antigravity Model Routing Instructions

## Purpose
Choose an efficient model for each task while building the Software Engineering Mastery Handbook.

## Important: model switching
This file guides model selection; it does not itself switch Antigravity's selected model. Unless your Antigravity setup exposes a supported model-switching action, ask the user to change the model manually. Never claim a switch happened unless confirmed.

## Available model roles
Use only models currently visible in the user's model picker.

| Model | Use |
|---|---|
| Gemini 4 Hydrogen (High) | Default: write lessons, create/edit HTML/CSS/JS, integrate modules, routine testing |
| Gemini 3.8 Flash | Small, straightforward tasks while available |
| Claude Sonnet 4.6 (Thinking) | Difficult technical explanations and focused architecture/content reviews |
| Claude Opus 4.6 (Thinking) | Rare escalation for critical unresolved issues |
| GPT-OSS 120B (Medium) | Secondary review, checklists and straightforward analysis |

## Routing rules
1. Start with Gemini 4 Hydrogen (High) and keep using it for ordinary tasks.
2. Do not switch models just because another model is available.
3. Break large tasks into small, clearly scoped tasks before considering escalation.
4. Use Sonnet for difficult technical reasoning or review when needed.
5. Reserve Opus for high-impact issues that remain unresolved or when the user explicitly requests it.
6. Return to Hydrogen for implementation after a review, if the user can switch models.
7. Never use unsupported UI automation, hidden APIs or guessed commands to change models.

## Task routing
### Gemini 4 Hydrogen
- Generate and update course modules.
- Build HTML, CSS and JavaScript.
- Implement navigation, search, bookmarks, progress tracking and responsive layouts.
- Create examples, exercises and interview questions.
- Integrate files and fix routine issues.

### Claude Sonnet
- Review database internals, query planning, transactions and indexing.
- Compare database choices for a defined workload.
- Review distributed systems, Kafka, queues, caching and consistency.
- Review RAG, embeddings, retrieval and evaluation.
- Review complex system-design explanations.

### Claude Opus
Use only for important, difficult problems after a focused attempt with Hydrogen or Sonnet, or when explicitly requested.

## Token and context efficiency
- Work on one module or feature at a time.
- Read only the project files needed for the current task.
- Do not paste the entire master prompt repeatedly.
- Do not regenerate completed modules or unchanged assets.
- Keep project status and review notes updated.
- Reduce repetition, not essential technical detail.

## Required behaviour when companion files are missing
At project start, check whether these files exist:
- `COURSE_OUTLINE.md`
- `CONTENT_STANDARDS.md`
- `PROJECT_STATUS.md`
- `TECHNICAL_REVIEW_LOG.md`

If any are missing, CREATE them using the companion templates or derive their initial content from the user's approved master prompt and existing project files. Do not stop and ask the user to create them. Do not claim they already existed. If the approved master prompt is not present, ask the user to provide it before inventing the exact syllabus.

## Escalation procedure
If the current model is not suitable:
1. State the exact issue and why deeper reasoning is useful.
2. Identify the relevant file/section and expected outcome.
3. Recommend the least expensive suitable available model.
4. If manual switching is required, tell the user which model to select and provide a focused continuation prompt.
5. Do not claim an automatic switch unless Antigravity confirms it.

## Start-of-task procedure
1. Read this file.
2. Check for the four companion files listed above.
3. Create any missing companion files from the templates or approved project prompt.
4. Read the relevant project status and outline.
5. Select the smallest useful task and use the current model unless escalation is justified.
6. Update `PROJECT_STATUS.md` after completing work.

## Quality requirements
Substantial lessons should cover, where relevant:
- Definition, purpose and problem solved.
- Core concepts and terminology.
- Internal working and step-by-step flow.
- Practical examples and explained code.
- Real-world use cases.
- Performance, security and reliability.
- Common mistakes and best practices.
- Alternatives and trade-offs.
- Basic, intermediate, advanced and senior interview questions with answers.
- Exercises and revision summary.

Do not use placeholders as completed content. Track unfinished topics as pending.

## Accuracy
Distinguish facts from assumptions. Do not invent benchmark results, API behaviour or configuration limits. Verify version-sensitive claims against official documentation when research is available. Record material corrections and unresolved questions in `TECHNICAL_REVIEW_LOG.md`.
