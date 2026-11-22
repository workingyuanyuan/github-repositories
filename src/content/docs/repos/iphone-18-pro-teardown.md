---
title: iphone-18-pro-teardown
description: Interactive 3D web page that takes an iPhone 18 Pro apart layer by layer, for education.
repo: workingyuanyuan/iphone-18-pro-teardown
appliesTo: Commit 172752d on branch main. The repository has no tagged release.
caveat: The repository has no LICENSE file. Specifications come from one teardown video by WekiHome. Thickness and hidden parts in the 3D model are estimates.
effectiveDate: 2026-11-21
lastVerified: 2026-11-22
sources:
  - title: README.md at commit 172752d
    url: https://github.com/workingyuanyuan/iphone-18-pro-teardown/blob/172752deaf099cd818935c9cf537abe31591745c/README.md
---

## Facts

| Field | Value |
| --- | --- |
| Kind | Static web app built with Vite, TypeScript and three.js |
| Live site | <https://yuanaruru.com/iphone-18-pro-teardown/> |
| License | No LICENSE file. GitHub detects no license |
| Content source | WekiHome teardown video, <https://youtu.be/BLKegH19KGI>, dated 2026-09-20 |
| Removable parts | 18, numbered in teardown order |
| Deployment | A push to `main` builds and deploys through GitHub Actions |
| Interface language | Traditional Chinese |
| Releases | None |

## Develop

```bash
npm install
npm run dev
npm test
npm run build
```

| Command | Result |
| --- | --- |
| `npm run dev` | Dev server at `http://localhost:5173` |
| `npm test` | Unit tests for assembly logic and part data |
| `npm run build` | Type check, then a static site in `dist/` that any static host can serve |
| `npm run build:models` | Regenerates the 3D models with Blender scripts from the measurement data |

## What it does

- Free teardown with layer limits: only exposed parts can be removed. A blocked part shows what blocks it.
- Reassembly, with undo and "reassemble all".
- A guided "next step" mode that follows the order of the video.
- Camera: free orbit, four preset views, part close-up, an X-ray mode and an exploded-view slider.
- Part cards with a plain explanation, specifications and findings. Each item links to a timestamp in the video.
- Keyboard: Esc to leave, Delete to remove, Ctrl+Z to undo, N for the next step.

## Layout

```text
src/
  core/        Pure logic, no three.js dependency, unit tested
  engine/      three.js stage, viewer and tweening
  builders/    Shared procedural geometry, materials and canvas textures
  data/phones/iphone-18-pro/   Part list, guide order and model loading
  ui/          DOM interface and controllers
```

## Data accuracy

- Specifications and trivia come from the teardown video and carry timestamps.
- The outside of the 3D model follows Apple's official dimension drawing. Inner parts are measured from teardown images.
- Measurement sources are in `docs/measurements.md` and the deviation table in `docs/deviation.md` in the repository.
