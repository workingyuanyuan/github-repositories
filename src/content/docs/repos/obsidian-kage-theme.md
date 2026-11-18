---
title: obsidian-kage-theme
description: Obsidian theme with a dark mode and a paper mode, listed in the community themes as Kage.
repo: workingyuanyuan/obsidian-kage-theme
appliesTo: Release 1.0.4, commit 2cbc371 on branch main
caveat: The installer version must be 1.4.5 or newer, otherwise highlight backgrounds turn transparent. The accent colour picker in Obsidian has no effect on this theme, by design.
effectiveDate: 2026-08-09
lastVerified: 2026-11-18
sources:
  - title: README.md at commit 2cbc371
    url: https://github.com/workingyuanyuan/obsidian-kage-theme/blob/2cbc371a46a04c2170b53215066415fdfacc0e17/README.md
  - title: manifest.json at commit 2cbc371
    url: https://github.com/workingyuanyuan/obsidian-kage-theme/blob/2cbc371a46a04c2170b53215066415fdfacc0e17/manifest.json
  - title: Release 1.0.4
    url: https://github.com/workingyuanyuan/obsidian-kage-theme/releases/tag/1.0.4
  - title: Obsidian community theme list
    url: https://github.com/obsidianmd/obsidian-releases/blob/master/community-css-themes.json
---

## Facts

| Field | Value |
| --- | --- |
| Kind | Obsidian theme, listed in the community themes as `Kage` |
| License | MIT |
| Latest release | 1.0.4, published 2026-08-09 |
| Release files | `manifest.json`, `theme.css` |
| Minimum Obsidian version | 1.5.0, from `manifest.json` |
| Minimum installer version | 1.4.5 |
| Modes | Dark, the default, and paper, which is the light mode |
| Optional plugin | [Style Settings](https://github.com/mgmeyers/obsidian-style-settings) |

## Install from community themes

In Obsidian, open Settings, then Appearance, then Themes, then Manage, and search for `Kage`.

## Install by hand

Put `theme.css` and `manifest.json` from the release into the folder below, then pick Kage under Settings, Appearance, Themes. The folder name must be exactly `Kage`.

```text
<vault>/.obsidian/themes/Kage/
```

On Linux or macOS, with the two files downloaded from release 1.0.4 into the current directory:

```bash
mkdir -p "<vault>/.obsidian/themes/Kage"
cp theme.css manifest.json "<vault>/.obsidian/themes/Kage/"
```

## Requirements and known problem

- Obsidian 1.5.0 or newer.
- Installer version 1.4.5 or newer. Find it under Settings, About, Installer version.
- On an older installer, the built-in browser engine does not understand the colour-mixing syntax the theme uses, and highlight backgrounds turn transparent. Downloading and running the Obsidian installer again fixes it. The vault is not touched.

## Modes

Paper mode follows Obsidian's own Base color scheme setting, which can be Light, Dark or System. The theme adds no switch of its own.

## Style Settings

With the Style Settings plugin installed, these can be changed. Without the plugin the theme runs at its defaults.

| Setting | Default | Alternatives |
| --- | --- | --- |
| Composition strength, leak or yellowing | C, reading | A narrative, B structural |
| Grain strength | 0.10 | 0.085, 0.12 |
| Composition line | on | off |
| Composition shape | arc | thin line |
| Full three lines on note pages | off | on |
| Scratches | off | on |
| Dust | off | on |

## Limits

- The theme uses one accent colour family. The accent colour wheel under Appearance has no effect.
- The design language, colour tokens, grain asset and part of the measurement code are ported from kage-visual-kit, by the same author, under MIT. The details are in `NOTICE.md` in the repository.

## Related

- [Kage](/repos/kage/) is the agent skill that produces HTML documents in the same visual language.
