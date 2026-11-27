---
name: handbook-next
description: Resume and advance the Software Engineering Mastery HTML Handbook one part at a time. Wrapper that delegates to the shared .agents skill.
---

# Handbook Next (Claude Code wrapper)

Read `.agents/skills/handbook-next/SKILL.md` and follow it exactly. It is the single source of truth shared with Antigravity; do not copy or restate its steps here.

Claude-specific overrides:
- Ignore the model instructions in `ANTIGRAVITY_MODEL_ROUTING.md`.
- Use a fresh Claude subagent (Agent tool) for the audit step.
