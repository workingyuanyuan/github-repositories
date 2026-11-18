---
title: antigravity-subagent-delegation
description: 讓 Antigravity 把有界任務委派給原生子代理的 skill，預設使用 Gemini Flash。
repo: workingyuanyuan/antigravity-subagent-delegation
appliesTo: master 分支的 commit ab7937c，版本資料夾 agy-subagents-gemini3.8flash。
caveat: README 只說明 Gemini 3.8 Flash 版本。Gemini 3.6 Flash 與 3.7 Flash 的舊資料夾保留在 versions/。README 只有繁體中文版。
effectiveDate: 2026-09-05
lastVerified: 2026-11-18
sources:
  - title: README.md at commit ab7937c
    url: https://github.com/workingyuanyuan/antigravity-subagent-delegation/blob/ab7937cd03d1c8b0c72dbb4eeedbc7a131c977db/README.md
  - title: LICENSE at commit ab7937c
    url: https://github.com/workingyuanyuan/antigravity-subagent-delegation/blob/ab7937cd03d1c8b0c72dbb4eeedbc7a131c977db/LICENSE
---

## 事實

| 欄位 | 內容 |
| --- | --- |
| 類型 | Antigravity skill，名稱為 `subagent-delegation-agy` |
| 授權 | MIT |
| 版本資料夾 | `versions/agy-subagents-gemini3.8flash`、`versions/agy-subagents-gemini3.7flash`、`versions/agy-subagents-gemini3.6flash` |
| 預設分支 | `master` |
| 發行版 | 無 |

## 安裝

1. 把 `versions/agy-subagents-gemini3.8flash/GEMINI.md` 的內容作為委派區塊放進 `~/.gemini/GEMINI.md`。
2. 把 `versions/agy-subagents-gemini3.8flash/skills/subagent-delegation-agy/SKILL.md` 安裝到 `~/.gemini/config/skills/subagent-delegation-agy/SKILL.md`。
3. 在目標專案開啟新對話。

在 Linux 上，於 clone 下來的專案目錄內執行步驟 2：

```bash
mkdir -p ~/.gemini/config/skills/subagent-delegation-agy
cp versions/agy-subagents-gemini3.8flash/skills/subagent-delegation-agy/SKILL.md ~/.gemini/config/skills/subagent-delegation-agy/
```

## 路由方式

| 工作 | 處理方式 |
| --- | --- |
| 簡單，或與目前 context 緊密耦合 | 主代理直接執行 |
| 可獨立調查、實作或驗證 | 原生子代理，預設使用 Flash |
| 有特定需求或能力不足以支撐升級 | Pro |

主代理負責拆分與整合工作。子代理完成後，主代理會收到通知、審查變更並執行適當的驗收檢查。

## 設計文件

| 文件 | 專案內路徑 |
| --- | --- |
| 路由策略 | `versions/agy-subagents-gemini3.8flash/docs/routing-policy.md` |
| 行為情境 | `versions/agy-subagents-gemini3.8flash/tests/test_scenarios.md` |

## 相關

- [lite-agy-subagent-delegation](/zh-tw/repos/lite-agy-subagent-delegation/) 是另一個專為 Gemini 4 Argon 主代理設計的 Antigravity 委派 skill。
