---
title: skill.md-collections
description: Collection of the author's agent skills, one folder per skill. It holds two, heii and 3d-textbook-lesson.
repo: workingyuanyuan/skill.md-collections
appliesTo: Commit 195e5f3 on branch main. The repository has no tagged release.
caveat: The skills are the folders at the repository root, two so far. The repository has no LICENSE file. The README is in Traditional Chinese only.
effectiveDate: 2026-11-21
lastVerified: 2026-11-22
sources:
  - title: README.md at commit 195e5f3
    url: https://github.com/workingyuanyuan/skill.md-collections/blob/195e5f343c53657988b8c833ef099b974f9e921d/README.md
  - title: heii/SKILL.md at commit 195e5f3
    url: https://github.com/workingyuanyuan/skill.md-collections/blob/195e5f343c53657988b8c833ef099b974f9e921d/heii/SKILL.md
  - title: 3d-textbook-lesson/SKILL.md at commit 195e5f3
    url: https://github.com/workingyuanyuan/skill.md-collections/blob/195e5f343c53657988b8c833ef099b974f9e921d/3d-textbook-lesson/SKILL.md
---

## Facts

| Field | Value |
| --- | --- |
| Kind | Collection of agent skills |
| License | No LICENSE file. GitHub detects no license |
| Skills in the repository | 2: `heii` and `3d-textbook-lesson` |
| Files | `README.md`, `.gitignore`, `heii/` (`SKILL.md`, `agents/openai.yaml`), `3d-textbook-lesson/` (`SKILL.md`, `engine/`, `examples/`) |
| Releases | None |

## Skills

| Skill | Description |
| --- | --- |
| `heii` | "Communicate clearly in plain language when explicitly invoked." |
| `3d-textbook-lesson` | Written in Chinese. It turns one chapter of a textbook PDF into a 3D interactive textbook for a teacher to project in class: a static three.js web page that shows an open book whose figures rise from the page, each with a demonstration that plays by itself after one click. The engine it builds on is in the skill's `engine/` folder |

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

Copy the skill folder you want into the directory where your agent loads skills, for example:

```bash
git clone https://github.com/workingyuanyuan/skill.md-collections.git
```

## Rules for adding a skill

- Name the folder in lowercase letters, digits and hyphens, and keep `name` in `SKILL.md` identical to the folder name.
- `description` says what the skill does and when to use it.
- Link detailed reference material from `SKILL.md` with relative paths.
- Check that the content has no passwords, API keys or private data before committing.
