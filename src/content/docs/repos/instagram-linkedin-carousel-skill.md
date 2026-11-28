---
title: instagram-linkedin-carousel-skill
description: Agent skill that turns long-form text into an Instagram or LinkedIn carousel, exported as PNG and PDF.
repo: workingyuanyuan/instagram-linkedin-carousel-skill
appliesTo: Commit 6b03630 on branch main. The repository has no tagged release.
caveat: Rendering starts only after the user explicitly approves the slide copy. It needs Node.js 20 or newer, npm and a Chromium-compatible browser. The repository has no LICENSE file.
effectiveDate: 2026-09-12
lastVerified: 2026-11-18
sources:
  - title: README.md at commit 6b03630
    url: https://github.com/workingyuanyuan/instagram-linkedin-carousel-skill/blob/6b036305cf4b38f4ae04b2fdc273cde0468ee86a/README.md
  - title: SKILL.md at commit 6b03630
    url: https://github.com/workingyuanyuan/instagram-linkedin-carousel-skill/blob/6b036305cf4b38f4ae04b2fdc273cde0468ee86a/SKILL.md
---

## Facts

| Field | Value |
| --- | --- |
| Kind | Agent skill. The entry file is `SKILL.md`, skill name `instagram-linkedin-carousel` |
| License | No LICENSE file. GitHub detects no license |
| Requires | Node.js 20 or newer, npm, a Chromium-compatible browser |
| Input | Plain long-form text |
| Output | PNG and PDF, exported from a browser preview. The showcase images are 1080 × 1350 |
| Page types | 5: Cover, Editorial, Process, List, Conclusion |
| Surfaces | Dark or Paper, three grain levels, one fixed orange-brown accent palette |
| Languages shown in the showcase | English and Chinese |
| Releases | None |

## Use

Invoke `$instagram-linkedin-carousel` and provide:

```text
Platform: Instagram or LinkedIn
Goals: ...
Audience: ...
Brand Voice: ...

[paste the complete source text]
```

Then ask for an outline, a copy draft, a preview or exported files.

| Input | Required |
| --- | --- |
| Platform | Yes: Instagram or LinkedIn |
| Source text | Yes, complete |
| Goals, Audience | Can be inferred from the request |
| Brand Voice | Optional |

## Approval gate

The skill writes the slide copy first. Review it and approve it explicitly. Preview and export happen only after that approval.

## Install

The repository is a skill folder with `SKILL.md` at its root, so place a clone of it where your agent loads skills:

```bash
git clone https://github.com/workingyuanyuan/instagram-linkedin-carousel-skill.git
```

## Attribution

The narrative framework draws on `marketingskills/skills/social/references` in <https://github.com/coreyhaines31/marketingskills> by coreyhaines31.
