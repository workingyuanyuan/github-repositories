---
title: lite-agy-subagent-delegation
description: Antigravity skill that delegates to Gemini 4 Neon workers and asks two advisor models for second opinions.
repo: workingyuanyuan/lite-agy-subagent-delegation
appliesTo: Commit c61bfd2 on branch main, folder gemini-4-neon. Main agent Gemini 4 Neon in Antigravity.
caveat: The current folder, gemini-4-neon, is designed for a Gemini 4 Neon main agent. The folder gemini-4-argon is the earlier version, for a Gemini 4 Argon main agent. Antigravity CLI agy must be installed and logged in. Install it once in each environment you use, Windows and WSL separately. The README is in Traditional Chinese only.
effectiveDate: 2026-11-19
lastVerified: 2026-11-22
sources:
  - title: README.md at commit c61bfd2
    url: https://github.com/workingyuanyuan/lite-agy-subagent-delegation/blob/c61bfd270bea8751410fa46541f4a97843cc6e26/README.md
  - title: LICENSE at commit c61bfd2
    url: https://github.com/workingyuanyuan/lite-agy-subagent-delegation/blob/c61bfd270bea8751410fa46541f4a97843cc6e26/LICENSE
---

## Facts

| Field | Value |
| --- | --- |
| Kind | Antigravity global skill, name `delegate` |
| License | MIT |
| Current version folder | `gemini-4-neon` |
| Previous version folder | `gemini-4-argon`, kept in the repository: Gemini 4 Argon main agent, Gemini 4 Hydrogen workers and one advisor, Claude Opus 5.5 |
| Requires | Antigravity CLI `agy`, logged in. `gemini-4-neon` is verified with 1.5.12, `gemini-4-argon` with 1.5.3 |
| Platforms | WSL or Linux with bash, and Windows with PowerShell 5.1 or 7. The PowerShell form of the advisor call is not yet tested on Windows |
| Releases | None |

## Files

```text
gemini-4-neon/
  GEMINI.md
  MODEL-SELECTION.md
  skills/
    delegate/
      SKILL.md
gemini-4-argon/
  GEMINI.md
  MODEL-SELECTION.md
  skills/
    delegate/
      SKILL.md
```

The files of `gemini-4-neon`:

| File | Purpose | Installed |
| --- | --- | --- |
| `GEMINI.md` | The one English line to add to your global rules | Its content is copied |
| `skills/delegate/SKILL.md` | Delegation policy, the policy for the two advisors, and how to call each, in English | Yes |
| `MODEL-SELECTION.md` | Reasons for the model choices and test records | No. Read it only when upgrading the skill |

## Install

Copy the folder `gemini-4-neon/skills/delegate` into Antigravity's global skills directory. With a Gemini 4 Argon main agent, copy `gemini-4-argon/skills/delegate` instead.

| System | Global skills directory |
| --- | --- |
| Windows | `%USERPROFILE%\.gemini\config\skills` |
| WSL and Linux | `~/.gemini/config/skills` |

On Linux, from a clone of the repository:

```bash
mkdir -p ~/.gemini/config/skills
cp -r gemini-4-neon/skills/delegate ~/.gemini/config/skills/
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

## Roles in gemini-4-neon

| Role | Model and call | Use |
| --- | --- | --- |
| Worker | `gemini-4-neon-medium`, or `-high` when needed, through Antigravity's built-in `swarm` | Well-scoped tasks in parallel, after the main agent has split the problem and designed the interfaces: code exploration, leaf module migration, mechanical edits, boilerplate tests, frequent checks, and extraction from images, PDFs, audio and video |
| Advisor 1 | `claude-opus-5-5-low` through the `agy` CLI | A second opinion from another model family before executing a plan for a design, architecture change, merge-bound code or root-cause fix |
| Advisor 2 | `gemini-4-argon-medium` through the `agy` CLI, in parallel with advisor 1 | A second opinion on the same brief from a higher Gemini model |

## Behaviour to expect

- Read-only workers use `workspace: "inherit"`, and their brief forbids changing files. Parallel writers use `workspace: "share"`, which creates a separate git worktree, and are cleaned up with `swarm(action: "kill")` after acceptance and merge.
- Neon, Hydrogen and Flash share one quota pool, so on `RESOURCE_EXHAUSTED` a worker task does not fall back to Hydrogen or Flash.
- The two advisors read one brief, saved under `~/.local/state/delegation-log/<project>/`, that does not mention the other advisor. They start in the same turn as two background commands, and the main agent waits for both before it integrates.
- `agy` has no reliable read-only mode. The advisors' brief states read-only, and in a git project the main agent compares `git status --porcelain` and `git diff` before and after, also around a retry of one advisor.
- If one advisor's quota is exhausted (`RESOURCE_EXHAUSTED`) or its retry fails, the main agent reports that this advisor is unavailable and continues with the other.
- Every result is treated as unverified, and the main agent marks which advisor each point came from. A conflict between an advisor and the main agent's plan on a point that changes the plan, or a serious disagreement between the two advisors on such a point, is reported to the user with both sides' reasons.

## Related

- Claude Code version: [lite-claude-subagent-delegation](/repos/lite-claude-subagent-delegation/).
- Codex version: [lite-codex-subagent-delegation](/repos/lite-codex-subagent-delegation/).
