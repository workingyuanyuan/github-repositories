---
title: Frontier-Model-Doh-Choo-choo
description: 比較前沿大語言模型能力與成本的評測看板，資料來自公開評測快照。
repo: workingyuanyuan/Frontier-Model-Doh-Choo-choo
appliesTo: main 分支的 commit 3c19776。這個專案沒有任何已標記的發行版。
caveat: 專案沒有 LICENSE 檔案。評測分數版權屬於原發布方。儀表板顯示的是建置當下的資料版本，而非即時資料。
effectiveDate: 2026-11-18
lastVerified: 2026-11-18
sources:
  - title: README.md at commit 3c19776
    url: https://github.com/workingyuanyuan/Frontier-Model-Doh-Choo-choo/blob/3c19776e7ed72446f0d82104fa7a4c5167039363/README.md
---

## 事實

| 欄位 | 內容 |
| --- | --- |
| 類型 | 評測儀表板，簡稱 FM-DCC。位於 Turborepo 與 pnpm workspace 中的 Next.js 靜態前端 |
| 線上儀表板 | <https://yuanaruru.com/Frontier-Model-Doh-Choo-choo/> |
| 授權 | 沒有 LICENSE 檔案，GitHub 未偵測到授權 |
| 需求 | Node.js 24.0.0 以上、pnpm 11.0.0 以上 |
| 評分維度 | 五項：reasoning、knowledge、code、agents、language。模型會依 reasoning effort 分開比較 |
| 發布的資料檔 | `data/product/current.json` |
| 發行版 | 無 |

## 檢視頁面

| 頁面 | 顯示內容 |
| --- | --- |
| Leaderboard | 每個模型的總分、五項維度分數、reasoning effort 與發布日期，支援排序與詳情抽屜 |
| Quality vs. Cost | 分數對正規化任務成本的關係。以美元計價的原始來源成本列在詳情檢視中 |
| Five Dimensions | 疊加顯示多個所選模型的雷達圖 |
| Developer Mode | 因缺少評測項目而未列入主榜單的模型，以及它們缺少哪些項目 |

## 本機執行

```bash
git clone https://github.com/workingyuanyuan/Frontier-Model-Doh-Choo-choo.git
cd Frontier-Model-Doh-Choo-choo
pnpm install --frozen-lockfile
pnpm --filter @llm-bench/benchmark-data build
pnpm dev
```

接著開啟 `http://localhost:3000`。

專案內有一個審查腳本會執行相同步驟並於 port 4000 提供服務。在 Linux 或 WSL 上：

```bash
./start-bench-review.sh
```

傳入連接埠編號即可改用其他 port，例如 `./start-bench-review.sh 4001`。在 Windows 上，請於專案根目錄執行 `start-bench-review.cmd`。

## 目錄結構

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

## 更新資料

匯入或重新物化來源快照，接著執行：

```bash
pnpm data:release
```

這個指令會檢查來源與證據、重新產生前沿集合、重建產物、檢查可重現性、建置靜態網站並執行端對端測試，同時在 `artifacts/releases/<run-id>/` 底下寫入 `receipt.json` 與 `report.md`。

機械性檢查通過後，仍須撰寫更新審查報告並由使用者審閱。只有在使用者明確指示後，才會將 `data/product/current.json` commit 並部署。完整流程記載於專案內的 `docs/OPERATIONS.md`。

## 限制

- 專案會記錄每筆結果的來源網址、收集時間與原始快照以便追溯。
- 專案不會繞過登入、付費牆或存取限制。
