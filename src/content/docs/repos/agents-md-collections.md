---
title: agents.md-collections
description: Collection of AGENTS.md files by model, with design notes. It covers one model so far, gpt-6-astra.
repo: workingyuanyuan/agents.md-collections
appliesTo: Commit 5e58faf on branch main. The repository has no tagged release.
caveat: It covers a single model so far. The repository has no LICENSE file. The README is in Traditional Chinese only. Model behaviour may change with model version, tools and environment.
effectiveDate: 2026-09-23
lastVerified: 2026-11-18
sources:
  - title: README.md at commit 5e58faf
    url: https://github.com/workingyuanyuan/agents.md-collections/blob/5e58faf271ea36448dacaa7abfe1b53d3e9948e8/README.md
---

## Facts

| Field | Value |
| --- | --- |
| Kind | Collection of `AGENTS.md` files with design notes |
| License | No LICENSE file. GitHub detects no license |
| Models covered | 1: `gpt-6-astra`, status "Output Discipline" recorded |
| Releases | None |

## Layout

Each model has a top-level folder named with its full model ID.

```text
.
  README.md
  _template/
    AGENTS.md
    readme.md
  gpt-6-astra/
    AGENTS.md
    readme.md
```

| File | Purpose |
| --- | --- |
| `<model-id>/AGENTS.md` | The instructions actually given to the model |
| `<model-id>/readme.md` | Why they are written that way, what was observed, and how it was verified |
| `_template/` | Template to copy when adding a model |

## Use a file

Copy the `AGENTS.md` of the model you use into the place your agent reads it from. For `gpt-6-astra`:

```bash
git clone https://github.com/workingyuanyuan/agents.md-collections.git
```

The file is then at `agents.md-collections/gpt-6-astra/AGENTS.md`. Read `gpt-6-astra/readme.md` for the environment it was tested in.

## Folder naming

If a model ID contains characters that cannot be part of a folder name, percent-encode them and record the original ID in that folder's `readme.md`.

| Character | Written as |
| --- | --- |
| `/` | `%2F` |
| `:` | `%3A` |
| `%` | `%25` |

## Add a record

1. Copy `_template/` and rename the folder to the model ID.
2. Put the instructions in use into `AGENTS.md`.
3. Fill `readme.md` with the environment, the design reasoning and the verification results.
4. On every change to the instructions, update the notes and commit.
