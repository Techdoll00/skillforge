---
name: book-to-skill
description: Turn any book into a reusable agent skill — extract the frameworks, package them, share them.
install: hermes skill install Techdoll00/skillforge --skill book-to-skill
---

# Book to Skill

> Great books contain transferable frameworks. Book to Skill extracts them and packages them as a skill anyone can install.

## What it is

Book to Skill reads a book, isolates its reusable mental models and workflows, and packages them into a standalone skill document. Instead of "I read a book and it was good," you get a working artifact — a skill that encodes the book's method.

## When to use it

- You just finished a non-fiction book that changed how you think
- You keep re-explaining a book's framework to people
- You want a book's ideas to actually shape how your agent works
- You want to share a valuable framework with a team or community

## How it works

1. Pick a book with transferable ideas (frameworks, checklists, heuristics)
2. Extract the core method — what does the book tell you to *do*?
3. Distill it into a skill doc: when to use it, how it works, an example
4. Package it with a name and install command so others can pull it in

## Example

> After reading *The Design of Everyday Things*, you extract its usability heuristics into a "UX Heuristic Review" skill — a checklist that any agent can run against a screen before you call a design done.

---

## Install

```bash
hermes skill install Techdoll00/skillforge --skill book-to-skill
```
