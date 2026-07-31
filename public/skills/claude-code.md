---
name: claude-code
description: Claude Code integration conventions and hooks — opinionated defaults so every project starts consistent.
install: hermes skill install Techdoll00/skillforge --skill claude-code
---

# Claude Code

> A Claude Code project should start consistent, not start from scratch. This skill ships the conventions and hooks that make every session behave.

## What it is

Claude Code is a set of opinionated conventions — a CLAUDE.md skeleton, command patterns, and git hooks — that you drop into a project so Claude Code sessions follow the same rules from day one. It turns "how should we use Claude Code here?" into a checked-in answer.

## When to use it

- Starting a new project and you want Claude Code to have sensible defaults immediately
- Multiple people use Claude Code in one repo and the sessions drift in style
- You want quality gates (lint, typecheck, tests) to run automatically on agent changes
- You want a documented, reviewable answer for "what are the rules"

## How it works

1. Install the skill into the project
2. It scaffolds a CLAUDE.md with project conventions and command patterns
3. Hooks are configured to run the quality gates at the right moments
4. Every session reads the same rules, so the agent's behavior is reproducible

## Example

> A repo gets the skill applied: CLAUDE.md now defines "run `bun run typecheck` before marking a task done" and a pre-commit hook enforces lint. A new teammate opens Claude Code for the first time and the agent already behaves like the rest of the team — no onboarding lecture required.

---

## Install

```bash
hermes skill install Techdoll00/skillforge --skill claude-code
```
