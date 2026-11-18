---
title: antigravity-subagent-delegation
description: Antigravity skill that delegates bounded tasks to native subagents, Gemini Flash by default.
repo: workingyuanyuan/antigravity-subagent-delegation
appliesTo: Commit ab7937c on branch master, version folder agy-subagents-gemini3.8flash.
caveat: The README documents the Gemini 3.8 Flash version only. Older folders for Gemini 3.6 Flash and 3.7 Flash are kept in versions/. The README is in Traditional Chinese only.
effectiveDate: 2026-09-05
lastVerified: 2026-11-18
sources:
  - title: README.md at commit ab7937c
    url: https://github.com/workingyuanyuan/antigravity-subagent-delegation/blob/ab7937cd03d1c8b0c72dbb4eeedbc7a131c977db/README.md
  - title: LICENSE at commit ab7937c
    url: https://github.com/workingyuanyuan/antigravity-subagent-delegation/blob/ab7937cd03d1c8b0c72dbb4eeedbc7a131c977db/LICENSE
---

## Facts

| Field | Value |
| --- | --- |
| Kind | Antigravity skill, name `subagent-delegation-agy` |
| License | MIT |
| Version folders | `versions/agy-subagents-gemini3.8flash`, `versions/agy-subagents-gemini3.7flash`, `versions/agy-subagents-gemini3.6flash` |
| Default branch | `master` |
| Releases | None |

## Install

1. Put the content of `versions/agy-subagents-gemini3.8flash/GEMINI.md` into `~/.gemini/GEMINI.md` as the delegation block.
2. Install `versions/agy-subagents-gemini3.8flash/skills/subagent-delegation-agy/SKILL.md` to `~/.gemini/config/skills/subagent-delegation-agy/SKILL.md`.
3. Open a new conversation in the target project.

On Linux, from a clone of the repository, step 2 is:

```bash
mkdir -p ~/.gemini/config/skills/subagent-delegation-agy
cp versions/agy-subagents-gemini3.8flash/skills/subagent-delegation-agy/SKILL.md ~/.gemini/config/skills/subagent-delegation-agy/
```

## Routing

| Work | Handling |
| --- | --- |
| Simple, or tightly coupled to the current context | The main agent does it directly |
| Can be investigated, implemented or verified independently | A native subagent, Flash by default |
| A specific requirement or a capability failure supports an upgrade | Pro |

The main agent splits and integrates the work. When a subagent finishes, the main agent receives a notice, reviews the changes and runs suitable acceptance checks.

## Design documents

| Document | Path in the repository |
| --- | --- |
| Routing policy | `versions/agy-subagents-gemini3.8flash/docs/routing-policy.md` |
| Behaviour scenarios | `versions/agy-subagents-gemini3.8flash/tests/test_scenarios.md` |

## Related

- [lite-agy-subagent-delegation](/repos/lite-agy-subagent-delegation/) is a separate Antigravity delegation skill designed for a Gemini 4 Argon main agent.
