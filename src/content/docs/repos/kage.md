---
title: Kage
description: Agent skill that typesets a brief into a dark, screen-only HTML document.
repo: workingyuanyuan/Kage
appliesTo: Commit d5fb072 on branch main. The repository has no tagged release.
caveat: Output is HTML for screens only; native Office files, PDF and light designs need a different deliverable. Screenshot and pixel checks need Chrome or Edge.
effectiveDate: 2026-09-12
lastVerified: 2026-11-18
sources:
  - title: README.md at commit d5fb072
    url: https://github.com/workingyuanyuan/Kage/blob/d5fb0729e3a5728a7332fb9367632fedc24952f2/README.md
  - title: SKILL.md at commit d5fb072
    url: https://github.com/workingyuanyuan/Kage/blob/d5fb0729e3a5728a7332fb9367632fedc24952f2/SKILL.md
  - title: LICENSE at commit d5fb072
    url: https://github.com/workingyuanyuan/Kage/blob/d5fb0729e3a5728a7332fb9367632fedc24952f2/LICENSE
---

## Facts

| Field | Value |
| --- | --- |
| Kind | Agent skill. The entry file is `SKILL.md`, skill name `kage` |
| License | MIT. Bundled fonts are under the OFL |
| Runtime | Node.js, with zero external dependencies. The repository has no `package.json` |
| Browser | Chrome or Edge, used for screenshots and pixel checks |
| Document types | 8: `one-pager`, `long-doc`, `letter`, `portfolio`, `changelog`, `equity-report`, `slides`, `landing-page` |
| Languages | Traditional Chinese (`assets/templates/<type>.html`) and English (`assets/templates/<type>-en.html`), 16 templates in total |
| Releases | None |
| Demo | <https://yuanaruru.com/Kage/index-en.html> |

## Install

```bash
git clone https://github.com/workingyuanyuan/Kage.git
```

Then move the cloned directory into the skill path of your agent. The agent reads `SKILL.md` first and opens the other specs and templates as it needs them.

If Chrome or Edge is not found automatically, set the environment variable `KAGE_CHROME` to the browser executable.

## Use

Ask the agent for Kage, or for a dark analog HTML layout, and describe what the document is for. The agent picks the template, language and length from the request.

```text
Turn these meeting notes into a one-pager for my manager
```

| You want | Say something like |
| --- | --- |
| A proposal or summary on one page | "Write me a proposal, one page only" |
| White paper or technical document | "Turn this into a long technical document" |
| Formal letter | "Draft a formal notice" |
| Portfolio or case studies | "Make a portfolio out of these three projects" |
| Release notes | "Turn these releases into proper release notes" |
| Equity report or investment memo | "Write an equity report, with a target price and the risks" |
| Deck | "Build a deck, about five slides" |
| Product landing page | "Make a product page, with pricing and an FAQ" |
| Traditional Chinese output | Add "in Chinese" to any request |

## Check commands

The scope of each command is documented in `references/production.md` in the repository.

```bash
node scripts/kage.mjs check
node scripts/kage.mjs content <type> <draft.json>
node scripts/kage.mjs placeholders <finished>
node scripts/kage.mjs shot <file.html> --widths 1280,375
node scripts/kage.mjs shot <file.html> --bg-only
node scripts/kage.mjs bg <background.png>
```

| Command | What it checks |
| --- | --- |
| `check` | Shared CSS block, colour tokens, template lint, content contracts |
| `content` | Shape and length limits of a structured draft |
| `placeholders` | Leftover `{{}}` placeholders and marked data gaps |
| `shot` | Screenshots at the given widths. `--frames` gives one frame per screen or slide |
| `bg` | Eight pixel checks on the background layer |

## Limits

- Every company, person and figure in the demo documents is invented.
- When required material is missing, the working document marks it as `[需要資料：…]`.
- The second tone mode, "develop", is used only when asked for by name.
- The architecture follows [Kami](https://github.com/tw93/kami) by tw93: shipping document typesetting as an agent skill.

## Related

- [obsidian-kage-theme](/repos/obsidian-kage-theme/) applies the same visual language to Obsidian.
