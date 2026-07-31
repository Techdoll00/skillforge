---
name: grill-me
description: A relentless interview to sharpen a plan or design before you build.
install: hermes skill install Techdoll00/skillforge --skill grill-me
---

# Grill Me

> Don't start building yet. Let a relentless interview poke holes in your plan until you actually know why you're doing this.

## What it is

Grill Me is an interrogation-style session. Before you commit to an idea, it asks you question after question — like an interviewer who refuses to let you hand-wave — until the weak spots in your plan, design, and assumptions are out in the open.

## When to use it

- You just drafted a plan and want to stress-test it before writing code
- A design "feels about right" but you can't say why something is off
- The team all agrees on something — too easily, which is suspicious
- You are unusually confident about your idea, and confidence like that deserves a challenge

## How it works

1. Paste your plan, design, or idea into the session
2. The skill asks a round of hard questions: What's the actual goal? Why now? What's the cost of *not* doing it? What's the worst case?
3. You answer — it keeps digging until nothing new surfaces
4. The exposed weak points become your action items

## Example

> Plan: "I'm building a desktop-style browser for AI agent skills."
>
> Grill: "Who is it for?" — "What moment does someone open it, and what are they trying to do?" — "Why a fake desktop instead of a plain website?" — "How does a first-time visitor know it's worth their time in ten seconds?" — "If nobody uses it after a month, is that a product failure or a marketing failure?"

---

## Install

```bash
hermes skill install Techdoll00/skillforge --skill grill-me
```
