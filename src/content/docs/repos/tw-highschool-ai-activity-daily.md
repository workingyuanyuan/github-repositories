---
title: tw-highschool-ai-activity-daily
description: Prompts an AI agent runs daily to report AI competitions open to high school students in Taiwan.
repo: workingyuanyuan/tw-highschool-ai-activity-daily
appliesTo: Commit 608cca9 on branch master. The repository has no tagged release.
caveat: It contains no program code. An AI tool with web reading and file parsing must run the prompts. The repository has no LICENSE file. All documents and reports are in Traditional Chinese.
effectiveDate: 2026-08-18
lastVerified: 2026-11-18
sources:
  - title: README.md at commit 608cca9
    url: https://github.com/workingyuanyuan/tw-highschool-ai-activity-daily/blob/608cca9cc484cabb12fb4b58d91526de666043be/README.md
---

## Facts

| Field | Value |
| --- | --- |
| Kind | Prompt-driven workflow, run by an AI agent such as Antigravity, Claude Code or Codex |
| License | No LICENSE file. GitHub detects no license |
| Requires | No language runtime or package. An AI tool that can read the web and parse attachments such as PDF and DOC |
| Output | `activities/activities-YYYY-MM-DD.md`, one report per day |
| Sample output | `activities/activities-2026-08-17.md` in the repository |
| Default branch | `master` |
| Releases | None |

## Get it

```bash
git clone https://github.com/workingyuanyuan/tw-highschool-ai-activity-daily.git
```

## Run

Open an AI tool with file system access in the project directory and give it this instruction. The README gives the prompt in Chinese. It means: "Read prompts/daily-collection.md and complete today's activity report."

```text
請讀取 prompts/daily-collection.md 並完成今天的活動日報。
```

The agent reads the sources in `SOURCES.md` in order, parses attached guidelines, applies the filter rules and writes the report for the day.

To run it every day, ask the tool to schedule it. The README gives the prompt in Chinese. It means: "Set a schedule: every day at 08:00, read prompts/daily-collection.md and complete that day's activity report."

```text
請設定排程：每天早上 08:00 自動讀取 prompts/daily-collection.md 並完成當天的活動日報。
```

In a web chat without a file system, paste the full text of `prompts/daily-collection-standalone.md` into the chat. The report is then printed in the conversation.

## Filter rules

| Grade | Rule |
| --- | --- |
| A, recommended | Open to senior and vocational high school students across Taiwan, lets the student use AI tools and show AI ability, and has a real work product such as a project, app, video or poster |
| B, supplementary | The activity forbids generative AI, is limited to one city, county or school, has no student category, or is pure literary writing or clearly beyond high school level |
| Excluded | Registration already closed, college level and above only, or workshops and camps without a work product |

## Files

| File | Content | Updated when |
| --- | --- | --- |
| `PROJECT.md` | Filter criteria, classification logic, field specification | The filter principles change |
| `SOURCES.md` | Tracked sources: school notice pages, competition sections, platform status | A source is added or its status changes |
| `CALIBRATION.md` | Calibration samples of grade A and grade B activities | Reviewed every school year |
| `OPERATIONS.md` | How each source site reads and its format problems | A site is redesigned or reading fails |
| `LOG.md` | Run log | After every run |
| `prompts/` | The prompts the agent executes | The filter principles change |

When the criteria change, edit `PROJECT.md` first and then bring the prompts in `prompts/` into line.
