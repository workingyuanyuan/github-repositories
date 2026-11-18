---
title: lite-agy-subagent-delegation
description: Antigravity skill that delegates to Gemini 4 Hydrogen workers and asks Claude Opus 5.5 for a second opinion.
repo: workingyuanyuan/lite-agy-subagent-delegation
appliesTo: Commit 0ebea3c on branch main, folder gemini-4-argon. Main agent Gemini 4 Argon in Antigravity.
caveat: The roster is designed for a Gemini 4 Argon main agent. Antigravity CLI agy must be installed and logged in. Install it once in each environment you use, Windows and WSL separately. The README is in Traditional Chinese only.
effectiveDate: 2026-11-15
lastVerified: 2026-11-18
sources:
  - title: README.md at commit 0ebea3c
    url: https://github.com/workingyuanyuan/lite-agy-subagent-delegation/blob/0ebea3cf25b575082e09b42be17d11b43b3e134e/README.md
  - title: LICENSE at commit 0ebea3c
    url: https://github.com/workingyuanyuan/lite-agy-subagent-delegation/blob/0ebea3cf25b575082e09b42be17d11b43b3e134e/LICENSE
---

## Facts

| Field | Value |
| --- | --- |
| Kind | Antigravity global skill, name `delegate` |
| License | MIT |
| Version folder | `gemini-4-argon` |
| Requires | Antigravity CLI `agy`, verified with 1.5.3, logged in |
| Platforms | Windows with PowerShell 5.1 or 7, and WSL or Linux with bash |
| Releases | None |

## Files

```text
gemini-4-argon/
  GEMINI.md
  MODEL-SELECTION.md
  skills/
    delegate/
      SKILL.md
```

| File | Purpose | Installed |
| --- | --- | --- |
| `GEMINI.md` | The one English line to add to your global rules | Its content is copied |
| `skills/delegate/SKILL.md` | Delegation and advisor policy, and how to call each, in English | Yes |
| `MODEL-SELECTION.md` | Reasons for the model choices and test records | No. Read it only when upgrading the skill |

## Install

Copy the folder `gemini-4-argon/skills/delegate` into Antigravity's global skills directory.

| System | Global skills directory |
| --- | --- |
| Windows | `%USERPROFILE%\.gemini\config\skills` |
| WSL and Linux | `~/.gemini/config/skills` |

On Linux, from a clone of the repository:

```bash
mkdir -p ~/.gemini/config/skills
cp -r gemini-4-argon/skills/delegate ~/.gemini/config/skills/
```

The result must be `~/.gemini/config/skills/delegate/SKILL.md`. Then add this line to `~/.gemini/GEMINI.md`, or to `%USERPROFILE%\.gemini\GEMINI.md` on Windows. If the file already has an entry line for another delegation skill, replace that line.

```patch title="~/.gemini/GEMINI.md"
+Before executing a plan for a design, architecture change, merge-bound code, or root-cause fix, and whenever delegating would save your context or improve quality, read and follow the delegate skill.
```

## Confirm it loaded

Open a new conversation, check that `delegate` appears under Skills & Customizations, then ask. The README gives the prompt in Chinese. It means: "Read the delegate skill and tell me the path of the SKILL.md you read, who you delegate to, and when you ask the advisor."

```text
請讀取 delegate skill，說明你讀取的 SKILL.md 路徑、委派對象，以及何時詢問 advisor。
```

## Roles

| Role | Model and call | Use |
| --- | --- | --- |
| Worker | `gemini-4-hydrogen-medium`, or `-high` when needed, through Antigravity's built-in `swarm` | Well-scoped tasks in parallel: code exploration, leaf module migration, mechanical edits, boilerplate tests, frequent checks, and extraction from images, PDFs, audio and video |
| Advisor | `claude-opus-5-5-low` through the `agy` CLI | A second opinion before executing a plan for a design, architecture change, merge-bound code or root-cause fix |

## Behaviour to expect

- Read-only workers use `workspace: "inherit"`. Parallel writers use `workspace: "share"`, which creates a separate git worktree, and are cleaned up with `swarm(action: "kill")` after merge.
- `agy` has no reliable read-only mode. The advisor's brief states read-only, and in a git project the main agent compares `git status --porcelain` and `git diff` before and after.
- Advisor briefs are saved under `~/.local/state/delegation-log/<project>/`.
- If the advisor's quota is exhausted (`RESOURCE_EXHAUSTED`), the main agent reports that the opinion is unavailable and continues.
- Every result is treated as unverified. A conflict between the advisor and the main agent's plan is reported to the user.

## Related

- Claude Code version: [lite-claude-subagent-delegation](/repos/lite-claude-subagent-delegation/).
- Codex version: [lite-codex-subagent-delegation](/repos/lite-codex-subagent-delegation/).
