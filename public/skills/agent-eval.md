---
name: agent-eval
description: Score and compare agent runs against rubrics — replace fuzzy impressions with numbers you can argue about.
install: hermes skill install Techdoll00/skillforge --skill agent-eval
---

# Agent Eval

> "It felt better" is not an evaluation. Agent Eval turns agent runs into scored rubrics so you can compare versions, prompts, and models on the same terms.

## What it is

Agent Eval scores an agent run against a rubric you define — correctness, faithfulness, helpfulness, latency, whatever matters for the task — and produces a structured result you can compare across runs. It's the difference between vibes and a repeatable measurement.

## When to use it

- After changing a prompt, model, or tool config and you need to know if it's better
- Before shipping an agent that users will depend on
- When two approaches "both seem fine" and you need a tiebreaker
- When you want a shared yardstick for a team that keeps disagreeing about quality

## How it works

1. Define the rubric: what dimensions matter for this task, and what does a 1–5 mean on each
2. Run the agent on a fixed set of cases
3. Score each run against the rubric
4. Compare — across versions, prompts, or models — and keep the winner with receipts

## Example

> Two prompt versions answer a support question differently. Version A is more detailed, version B is faster. The rubric — accuracy, completeness, verbosity — scores A higher on accuracy and completeness but lower on verbosity. Now the decision isn't "which felt better," it's "we optimize for accuracy, so A ships."

---

## Install

```bash
hermes skill install Techdoll00/skillforge --skill agent-eval
```
