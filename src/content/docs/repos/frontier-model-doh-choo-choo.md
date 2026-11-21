---
title: Frontier-Model-Doh-Choo-choo
description: Dashboard that compares frontier language models on capability and cost, from public benchmark snapshots.
repo: workingyuanyuan/Frontier-Model-Doh-Choo-choo
appliesTo: Commit 3c19776 on branch main. The repository has no tagged release.
caveat: The repository has no LICENSE file. Benchmark scores belong to their original publishers. The dashboard shows the data version from build time, not live data.
effectiveDate: 2026-11-18
lastVerified: 2026-11-18
sources:
  - title: README.md at commit 3c19776
    url: https://github.com/workingyuanyuan/Frontier-Model-Doh-Choo-choo/blob/3c19776e7ed72446f0d82104fa7a4c5167039363/README.md
---

## Facts

| Field | Value |
| --- | --- |
| Kind | Benchmark dashboard, short name FM-DCC. A Next.js static front end in a Turborepo and pnpm workspace |
| Live dashboard | <https://yuanaruru.com/Frontier-Model-Doh-Choo-choo/> |
| License | No LICENSE file. GitHub detects no license |
| Requires | Node.js 24.0.0 or newer, pnpm 11.0.0 or newer |
| Dimensions scored | Five: reasoning, knowledge, code, agents, language. Models are compared separately per reasoning effort |
| Published data file | `data/product/current.json` |
| Releases | None |

## Views

| View | What it shows |
| --- | --- |
| Leaderboard | Overall score, five dimension scores, reasoning effort and release date per model, with sorting and a detail drawer |
| Quality vs. Cost | Score against a normalised task cost. Source cost in US dollars is in the detail view |
| Five Dimensions | Radar chart that overlays several selected models |
| Developer Mode | Models left off the main board because benchmark items are missing, and which items they lack |

## Run locally

```bash
git clone https://github.com/workingyuanyuan/Frontier-Model-Doh-Choo-choo.git
cd Frontier-Model-Doh-Choo-choo
pnpm install --frozen-lockfile
pnpm --filter @llm-bench/benchmark-data build
pnpm dev
```

Then open `http://localhost:3000`.

A review script does the same steps and serves on port 4000. On Linux or WSL:

```bash
./start-bench-review.sh
```

Pass a port to use another one, for example `./start-bench-review.sh 4001`. On Windows, run `start-bench-review.cmd` from the project root.

## Layout

```text
apps/bench/                 Next.js static dashboard
packages/benchmark-data/    Data formats, scoring and product build
packages/acquisition/       Source fetching, cost calculation, snapshot validation
data/mappings/              Model settings, dimension mapping, display thresholds
data/derived/               Generated frontier sets and audit
data/sources/               Source snapshot lists, validation records, raw data
data/product/current.json   Published merged data file
docs/                       Design specs, data methodology, operations
```

## Update the data

Import or re-materialise the source snapshots, then run:

```bash
pnpm data:release
```

The command checks sources and evidence, regenerates the frontier sets, rebuilds the product, checks reproducibility, builds the static site and runs the end-to-end tests. It writes `receipt.json` and `report.md` under `artifacts/releases/<run-id>/`.

After the mechanical checks pass, a refresh review report must still be written and reviewed by the user. `data/product/current.json` is committed and deployed only after the user's explicit instruction. The full procedure is in `docs/OPERATIONS.md` in the repository.

## Limits

- The project records the source URL, collection time and raw snapshot of each result so that it can be traced.
- The project does not bypass logins, paywalls or access restrictions.
