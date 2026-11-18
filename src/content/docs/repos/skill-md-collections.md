---
title: skill.md-collections
description: Collection of the author's agent skills, one folder per skill. It holds one skill so far, heii.
repo: workingyuanyuan/skill.md-collections
appliesTo: Commit b40e727 on branch main. The repository has no tagged release.
caveat: It holds a single skill so far. The repository has no LICENSE file. The README is in Traditional Chinese only.
effectiveDate: 2026-10-04
lastVerified: 2026-11-18
sources:
  - title: README.md at commit b40e727
    url: https://github.com/workingyuanyuan/skill.md-collections/blob/b40e72770bb821dd6f9ba3701bd34cc6fbd38153/README.md
  - title: heii/SKILL.md at commit b40e727
    url: https://github.com/workingyuanyuan/skill.md-collections/blob/b40e72770bb821dd6f9ba3701bd34cc6fbd38153/heii/SKILL.md
---

## Facts

| Field | Value |
| --- | --- |
| Kind | Collection of agent skills |
| License | No LICENSE file. GitHub detects no license |
| Skills in the repository | 1: `heii` |
| Files | `README.md`, `.gitignore`, `heii/SKILL.md`, `heii/agents/openai.yaml` |
| Releases | None |

## Skills

| Skill | Description from its `SKILL.md` |
| --- | --- |
| `heii` | "Communicate clearly in plain language when explicitly invoked." |

## Folder layout

Each skill folder sits at the repository root, and the folder name is the skill name.

```text
skill.md-collections/
  README.md
  skill-name/
    SKILL.md
    references/
    scripts/
    assets/
  another-skill/
    SKILL.md
```

| Path | Purpose |
| --- | --- |
| `<skill-name>/SKILL.md` | Name, purpose, when to use, and instructions. Required |
| `<skill-name>/references/` | Extra explanation, reference documents and examples |
| `<skill-name>/scripts/` | Scripts and tools the skill uses |
| `<skill-name>/assets/` | Templates, images and other material |

## Use a skill

The README gives no install command. Copy the skill folder you want into the directory where your agent loads skills, for example:

```bash
git clone https://github.com/workingyuanyuan/skill.md-collections.git
```

## Rules for adding a skill

- Name the folder in lowercase letters, digits and hyphens, and keep `name` in `SKILL.md` identical to the folder name.
- `description` says what the skill does and when to use it.
- Link detailed reference material from `SKILL.md` with relative paths.
- Check that the content has no passwords, API keys or private data before committing.
