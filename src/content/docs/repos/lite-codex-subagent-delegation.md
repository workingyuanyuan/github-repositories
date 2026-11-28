---
title: lite-codex-subagent-delegation
description: Codex skill that delegates independent, verifiable subtasks to subagents, in two versions by main agent.
repo: workingyuanyuan/lite-codex-subagent-delegation
appliesTo: Commit 1387235 on branch main, folders gpt-6.2-astra and gpt-6-astra. Main agent GPT-6.2 Astra or GPT-6 Astra in Codex.
caveat: The repository has no LICENSE file. Each folder is designed for one main agent, gpt-6.2-astra for GPT-6.2 Astra and gpt-6-astra for GPT-6 Astra, and the two use different subagents. The README's install example is the gpt-6-astra one. Which models and tools are available depends on your Codex client and account. The README is in Traditional Chinese only.
effectiveDate: 2026-11-19
lastVerified: 2026-11-22
sources:
  - title: README.md at commit 1387235
    url: https://github.com/workingyuanyuan/lite-codex-subagent-delegation/blob/13872352881eceb04f2041c6ab1573dd7a2430d7/README.md
  - title: gpt-6.2-astra/skills/delegate/SKILL.md at commit 1387235
    url: https://github.com/workingyuanyuan/lite-codex-subagent-delegation/blob/13872352881eceb04f2041c6ab1573dd7a2430d7/gpt-6.2-astra/skills/delegate/SKILL.md
  - title: gpt-6.2-astra/AGENTS.md at commit 1387235
    url: https://github.com/workingyuanyuan/lite-codex-subagent-delegation/blob/13872352881eceb04f2041c6ab1573dd7a2430d7/gpt-6.2-astra/AGENTS.md
---

## Facts

| Field | Value |
| --- | --- |
| Kind | Codex personal skill, name `delegate` |
| License | No LICENSE file. GitHub detects no license |
| Version folders | `gpt-6.2-astra` and `gpt-6-astra` |
| Releases | None |

## Files

Both folders have the same layout:

```text
gpt-6.2-astra/
  AGENTS.md
  skills/
    delegate/
      SKILL.md
      references/
        benchmarks.md
gpt-6-astra/
  AGENTS.md
  skills/
    delegate/
      SKILL.md
      references/
        benchmarks.md
```

| File | Purpose |
| --- | --- |
| `AGENTS.md` | The one English line to add to your global instructions |
| `skills/delegate/SKILL.md` | Delegation policy and collaboration rules, in English |
| `skills/delegate/references/benchmarks.md` | Model comparison data behind the routing |

## Install

Copy the folder `skills/delegate` of your version into your personal skills directory: `gpt-6.2-astra/skills/delegate` or `gpt-6-astra/skills/delegate`.

| System | Personal skills directory |
| --- | --- |
| Windows | `%USERPROFILE%\.agents\skills` |
| macOS and Linux | `~/.agents/skills` |

On Linux, from a clone of the repository, for `gpt-6-astra`:

```bash
mkdir -p ~/.agents/skills
cp -r gpt-6-astra/skills/delegate ~/.agents/skills/
```

The result must contain:

```text
~/.agents/skills/delegate/SKILL.md
~/.agents/skills/delegate/references/benchmarks.md
```

If your client lists skills from the Codex home instead, for example `~/.codex/skills`, install there. Keep a single installed copy of `delegate`.

Then add this line, which is the same in both versions, to the delegation section of `AGENTS.md` in the Codex home. The default is `~/.codex/AGENTS.md`, or `%USERPROFILE%\.codex\AGENTS.md` on Windows. When `CODEX_HOME` is set, use the file in that directory. If an `AGENTS.override.md` is in effect there, add the line to that file instead.

```patch title="~/.codex/AGENTS.md"
+When delegating independent, verifiable work would improve efficiency or quality, read and follow the delegate skill and proactively delegate suitable tasks.
```

## Confirm it loaded

Open a new conversation, select the main agent of your version, and check that `delegate` appears in the skill picker. If it does not, restart Codex and check the folder levels and the `SKILL.md` file name. Then call it. The README gives the prompt for `gpt-6-astra`, in Chinese. It means: "Tell me the path of the SKILL.md you read and the three subagent configurations." With `gpt-6.2-astra` the answer names two configurations.

```text
$delegate 請說明你讀取的 SKILL.md 路徑，以及三種子代理配置。
```

## Subagent configurations in gpt-6-astra

| Subagent model ID | Effort | Work it gets |
| --- | --- | --- |
| `gpt-6-luna` | `max` | Narrow, clearly specified, easily checked search, extraction, tidying and local edits |
| `gpt-6.1-sol` | `medium` | The default for general subtasks: multi-step implementation, tests and cross-file investigation |
| `gpt-6.1-sol` | `high` | Complex debugging, dependency analysis, hypothesis testing and deep review |

The main agent and subagents may both delegate further, choosing from the three configurations.

## Subagent configurations in gpt-6.2-astra

| Subagent model ID | Effort | Work it gets |
| --- | --- | --- |
| `gpt-6.2-sol` | `medium` | The default: multi-step implementation, testing, debugging and cross-file investigation |
| `gpt-6.1-terra` | `medium` | Bounded work with clear acceptance checks, including extraction, visual inspection and scoped edits |

Effort stays at `medium` for first assignments, retries and nested delegation. When a result falls short, the main agent names the failed check and clarifies the assignment or takes the work over. When a worker is unavailable, it uses the other one if that fits the task, or does the work itself.

## Behaviour to expect

- Quality comes first, then total usage and completion time.
- The skill sets the model and effort explicitly when it spawns a subagent.
- The main agent does the final acceptance and integration. User instructions take priority over the skill.

## Related

- Claude Code version: [lite-claude-subagent-delegation](/repos/lite-claude-subagent-delegation/).
- Antigravity version: [lite-agy-subagent-delegation](/repos/lite-agy-subagent-delegation/).
