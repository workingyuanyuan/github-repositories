---
title: codex-gemini-orchestrator
description: Codex skill for Windows 11 that delegates work to Gemini 3.8 Flash through the Antigravity CLI.
repo: workingyuanyuan/codex-gemini-orchestrator
appliesTo: Commit 4dedfcf on branch main, version 6.1-sol-gemini3.8flash. Windows 11 with PowerShell 7.
caveat: Windows 11 only. The runner's -AutoApprove lets Antigravity run tools without asking, and a separate working directory is not a file system sandbox. Designed against Codex CLI 0.158.0-alpha.2.1 and Antigravity CLI 1.2.11.
effectiveDate: 2026-10-04
lastVerified: 2026-11-18
sources:
  - title: README.md at commit 4dedfcf
    url: https://github.com/workingyuanyuan/codex-gemini-orchestrator/blob/4dedfcff78272c556715c04c8505d53a37215f59/README.md
  - title: LICENSE at commit 4dedfcf
    url: https://github.com/workingyuanyuan/codex-gemini-orchestrator/blob/4dedfcff78272c556715c04c8505d53a37215f59/LICENSE
---

## Facts

| Field | Value |
| --- | --- |
| Kind | Codex skill named `model-routing-and-delegation-agy`, with a PowerShell runner and installer |
| License | MIT |
| Current version | `6.1-sol-gemini3.8flash` |
| Older versions kept in `versions/` | `6-sol-gemini3.8flash`, `6-gemini3.8flash`, `5.6`, `5.6-gemini3.5flash`, `5.6-gemini3.6flash`, `5.6-gemini3.7flash`, `5.6-gemini3.8flash` |
| Requires | Windows 11, PowerShell 7, Git, Codex with native subagents, and the official Antigravity CLI `agy.exe` logged in to a subscription account |
| Install location | `$env:CODEX_HOME`, or `$HOME\.codex` when it is not set |
| Releases | None |

## Install

From the project root:

```powershell
./install.ps1 -InstallDelegationTrigger
```

`-InstallDelegationTrigger` merges one sentence about when to delegate into a dedicated block of `AGENTS.md` and keeps the text outside that block. If you already have your own trigger, run `./install.ps1` alone to install the skill and the runner.

To update files that already exist:

```powershell
./install.ps1 -InstallDelegationTrigger -Force
```

`-Force` replaces the package files of the same name and the dedicated instruction block. Back up personal changes first. Open a new Codex conversation after installing.

If the project came from a GitHub ZIP and PowerShell blocks the script under the `RemoteSigned` policy, unblock it after confirming the source:

```powershell
Unblock-File -LiteralPath ./install.ps1
```

| Parameter | Purpose |
| --- | --- |
| `-Version <folder name>` | Installs another version from `versions/` |
| `-DestinationRoot <directory>` | Installs somewhere other than the Codex home |

When upgrading from an earlier version, check for and remove retired delegation rules and `gpt-5-6-*.toml` files so that they do not conflict with the new routing.

## Use

Ask for the skill by name. The README gives the prompt in Chinese. It means: "Use $model-routing-and-delegation-agy and delegate the independently verifiable parts of this work."

```text
使用 $model-routing-and-delegation-agy，將這項工作中可獨立驗收的部分委派出去。
```

| Work | Daily default | When to raise effort |
| --- | --- | --- |
| Research, analysis, implementation or review that can be handed off completely and done with Antigravity's tools | Gemini 3.8 Flash Medium | High: deep reasoning, knowledge integration or more uncertainty |
| Evidence gathering and clear edits that need native Codex tools or context and are easy to check | GPT-6 Luna High | Max: bounded judgment where a subtle error would cost the main agent much rework |
| Multi-step work with a clear path that needs native Codex tools or context | GPT-6.1 Sol Medium | High: complex debugging and cross-module tracing. xHigh: hard subtasks with several hypotheses or conflicting evidence |

The main agent keeps the model and effort the user selected, and does architecture, integration and final acceptance.

## Call Gemini

```powershell
$codexRoot = if ($env:CODEX_HOME) { $env:CODEX_HOME } else { Join-Path $HOME '.codex' }
$runner = Join-Path $codexRoot 'scripts/Invoke-AntigravityAgent.ps1'
& $runner -WorkingDirectory $worktree -PromptFile $contract -Model gemini-3.8-flash-medium -AutoApprove
```

- `$worktree` is the root of a clean, dedicated linked Git worktree.
- `$contract` is a UTF-8 task file outside that worktree.
- For high effort, pass `-Model gemini-3.8-flash-high`.
- The runner returns compact JSON. Full results and diagnostics are stored in a local directory per run.

## Layout

```text
versions/6.1-sol-gemini3.8flash/
  AGENTS.md
  scripts/Invoke-AntigravityAgent.ps1
  skills/model-routing-and-delegation-agy/
    SKILL.md
    agents/openai.yaml
    references/
      models.md
      benchmarks.md
      antigravity.md
```

## Test

```powershell
pwsh -NoProfile -File ./tests/Invoke-AntigravityAgent.Tests.ps1
pwsh -NoProfile -File ./tests/Install.Tests.ps1
```

The runner tests use a local fake executable and a temporary Git project. The install tests use a temporary destination.
