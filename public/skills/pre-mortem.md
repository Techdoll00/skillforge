---
name: pre-mortem
description: Assume the plan already failed — work backward to find out why, before it actually does.
install: hermes skill install Techdoll00/skillforge --skill pre-mortem
---

# Pre-Mortem

> Imagine it's six months from now and your project is a failure. Work backward from that failure and fix the causes — while you still can.

## What it is

A pre-mortem is a risk exercise performed before a project starts. Instead of asking "what could go wrong?", you assume the project has already failed and ask "why did it fail?" — which surfaces real risks that planning-mode optimism hides.

## When to use it

- Before a big launch, migration, or bet
- When morale is high and nobody wants to bring up problems
- When a plan is long on upside and short on failure scenarios
- At the start of a risky quarter, not at the post-mortem after it

## How it works

1. Set the frame: "It's six months later. The project failed. Write down why."
2. Brainstorm every plausible cause — technical, market, people, timing
3. Cluster and rank the causes by likelihood and impact
4. Turn the top causes into specific mitigations on the plan

## Example

> "It's six months later and our launch failed." — Because we launched to an empty channel, the first-time experience took 90 seconds to understand, and we had no retention loop. Now the plan changes: fix onboarding, define a retention moment, and line up distribution before day one.

---

## Install

```bash
hermes skill install Techdoll00/skillforge --skill pre-mortem
```
