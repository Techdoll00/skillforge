---
name: hermes-agent
description: A drop-in agent that runs your installed skills — one entry point, every skill.
install: hermes skill install Techdoll00/skillforge --skill hermes-agent
---

# Hermes Agent

> One agent, all your skills. Hermes is the entry point that detects what you have installed and routes to the right one.

## What it is

Hermes Agent is a single, drop-in agent configuration that turns your installed skill collection into a working system. Instead of remembering which skill does what and invoking each one manually, you talk to Hermes and it dispatches to the right skill for the job.

## When to use it

- You've installed several skills and want them to work as one coherent tool
- You want to invoke a skill by intent ("grill my launch plan") instead of by name
- You're setting up a fresh environment and want a repeatable agent setup
- You want teammates to share the same skill setup without reading every skill doc

## How it works

1. Install Hermes Agent alongside your other skills
2. It scans the installed skill collection at setup
3. You describe the task; Hermes routes to the matching skill and runs it
4. Unknown requests are surfaced clearly instead of silently doing the wrong thing

## Example

> You've installed grill-me, pre-mortem, and via-negativa. Instead of running them one by one, you tell Hermes: "My launch plan needs a stress test." Hermes picks grill-me and starts the interview — and if you later say "assume it already failed," it hands off to pre-mortem.

---

## Install

```bash
hermes skill install Techdoll00/skillforge --skill hermes-agent
```
