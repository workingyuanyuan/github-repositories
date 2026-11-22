---
title: lite-claude-subagent-delegation
description: Claude Code skill that delegates work to Codex CLI, Antigravity CLI and Claude subagents.
repo: workingyuanyuan/lite-claude-subagent-delegation
appliesTo: Commit 582b0ea on branch main, folder claude-fable-5-2-opus-5-5. Main agent Claude Fable 5.2 or Claude Opus 5.5.
caveat: The model roster is fixed to those two main agents. Codex CLI and Antigravity CLI must both be installed and logged in. The README is in Traditional Chinese only.
effectiveDate: 2026-11-19
lastVerified: 2026-11-22
sources:
  - title: README.md at commit 582b0ea
    url: https://github.com/workingyuanyuan/lite-claude-subagent-delegation/blob/582b0ea7ecb66b1de784c3e578383c1ccd961b75/README.md
  - title: CLAUDE.md at commit 582b0ea
    url: https://github.com/workingyuanyuan/lite-claude-subagent-delegation/blob/582b0ea7ecb66b1de784c3e578383c1ccd961b75/claude-fable-5-2-opus-5-5/CLAUDE.md
  - title: LICENSE at commit 582b0ea
    url: https://github.com/workingyuanyuan/lite-claude-subagent-delegation/blob/582b0ea7ecb66b1de784c3e578383c1ccd961b75/LICENSE
---

## Facts

| Field | Value |
| --- | --- |
| Kind | Claude Code personal skill, name `delegate` |
| License | MIT |
| Current version folder | `claude-fable-5-2-opus-5-5` |
| Previous version folder | `claude-opus-5-5`, kept as a record. It supports Claude Opus 5.5 as the main agent only |
| Requires | Codex CLI, verified with 0.163, and Antigravity CLI `agy`, verified with 1.4.7, both logged in |
| Platforms | Windows with PowerShell or Git Bash, and WSL or Linux with bash |
| Releases | None |

## Files

```text
claude-fable-5-2-opus-5-5/
  CLAUDE.md
  MODEL-SELECTION.md
  skills/
    delegate/
      SKILL.md
claude-opus-5-5/
```

| File | Purpose | Installed |
| --- | --- | --- |
| `CLAUDE.md` | The one English line to add to your global instructions | Its content is copied |
| `skills/delegate/SKILL.md` | Delegation policy and how to call each worker, in English | Yes |
| `MODEL-SELECTION.md` | Reasons for the model choices, test records and score snapshot | No. Read it only when upgrading the skill |

## Install

Copy the folder `claude-fable-5-2-opus-5-5/skills/delegate` into your personal skills directory.

| System | Personal skills directory |
| --- | --- |
| Windows | `%USERPROFILE%\.claude\skills` |
| macOS and Linux | `~/.claude/skills` |

On Linux, from a clone of the repository:

```bash
mkdir -p ~/.claude/skills
cp -r claude-fable-5-2-opus-5-5/skills/delegate ~/.claude/skills/
```

The result must be `~/.claude/skills/delegate/SKILL.md`. Then add this line to `~/.claude/CLAUDE.md`, or to `%USERPROFILE%\.claude\CLAUDE.md` on Windows. If the file already has an entry line for another delegation skill, replace that line.

```patch title="~/.claude/CLAUDE.md"
+Before delivering a design or merge-bound code, and whenever delegating would save your context or improve quality, read and follow the delegate skill and proactively delegate suitable tasks.
```

## Confirm it loaded

Open a new conversation, check that `delegate` appears in the list of available skills, then call it. The README gives the prompt in Chinese. It means: "Tell me the path of the SKILL.md you read and which tasks suit each model."

```text
/delegate 請說明你讀取的 SKILL.md 路徑，以及各模型適合的任務。
```

## Delegation roster

| Model | Effort | Work it gets |
| --- | --- | --- |
| Opus, through the Agent tool | `high` | Merge-bound code too large for the main agent's context. The main agent writes the rest itself |
| Fable, through the Agent tool, only when the main agent is Opus | `medium` | A third design opinion before building, alongside Astra and Neon. No implementation |
| `gpt-6.2-sol` | `medium` | Review of code the main agent wrote, including large or risky diffs, and backend work that will not be merged |
| `gpt-6.2-astra` | `medium` | Design discussion and second opinions before building, and root-cause hypotheses. No implementation |
| `gemini-4-neon-medium` | In the model ID | Design opinions alongside Astra, extraction from and judgment on images, PDFs, audio and video, and mechanical code tasks |

## Behaviour to expect

- The skill delegates only when that saves the main agent's context or improves quality, and when checking the result costs less than doing the work.
- Before a new project, feature or redesign is built, the main agent asks all advisors in parallel and read-only, reports adopted points and disagreements to the user, and builds after the user decides the disagreements.
- Delegations that write files run without asking. Read-only delegations may run in parallel. Parallel writers use separate git worktrees.
- Each brief and output is saved under `~/.local/state/delegation-log/<project>/`.
- Every delegated result is treated as unverified. The main agent does the final check.

## Related

- The Codex version of the same idea is [lite-codex-subagent-delegation](https://github.com/workingyuanyuan/lite-codex-subagent-delegation).
