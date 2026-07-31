---
name: obsidian
description: Search, create, and manage notes in an Obsidian vault with wikilinks and index notes.
install: hermes skill install Techdoll00/skillforge --skill obsidian
---

# Obsidian

> Your vault is a graph, not a folder tree. Obsidian helps you search it, link it, and keep it organized without fighting the tool.

## What it is

Obsidian is a skill for working with an Obsidian vault: finding notes fast, creating well-formed new notes, and connecting ideas with `[[wikilinks]]` and index notes. It follows vault conventions so new notes fit the existing system instead of breaking it.

## When to use it

- You need to find a note and can't remember its exact name
- You're creating a note and want it to follow the vault's conventions
- You want to discover related notes through backlinks and index notes
- You're organizing a growing vault before it turns into a pile of files

## How it works

1. Search by filename or content — grep-style, fast, on the vault path
2. Create notes with title-case names, a single unit of learning, and `[[wikilinks]]` to related notes at the bottom
3. Find related notes by searching for the `[[Note Title]]` backlink
4. Use index notes as entry points that aggregate a topic with a list of links

## Example

> You're researching a topic and want to add a note. You search — nothing exists yet — so you create `Agent Evals Index.md`, link the three notes you already have about evals, and add a backlink from each. Next time the topic comes up, one search finds the whole cluster.

---

## Install

```bash
hermes skill install Techdoll00/skillforge --skill obsidian
```
