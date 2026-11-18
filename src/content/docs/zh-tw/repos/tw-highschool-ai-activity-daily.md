---
title: tw-highschool-ai-activity-daily
description: 供 AI agent 每日執行的提示詞，產出全臺高中職學生可參加的 AI 競賽與活動日報。
repo: workingyuanyuan/tw-highschool-ai-activity-daily
appliesTo: master 分支的 commit 608cca9。這個專案沒有任何已標記的發行版。
caveat: 專案內不含任何程式碼，必須由具備網頁讀取與檔案解析能力的 AI 工具執行提示詞。專案沒有 LICENSE 檔案。所有文件與報告皆為繁體中文。
effectiveDate: 2026-08-18
lastVerified: 2026-11-18
sources:
  - title: README.md at commit 608cca9
    url: https://github.com/workingyuanyuan/tw-highschool-ai-activity-daily/blob/608cca9cc484cabb12fb4b58d91526de666043be/README.md
---

## 事實

| 欄位 | 內容 |
| --- | --- |
| 類型 | 提示詞驅動的工作流程，由 Antigravity、Claude Code 或 Codex 等 AI agent 執行 |
| 授權 | 沒有 LICENSE 檔案，GitHub 未偵測到授權 |
| 需求 | 不需程式語言執行環境或套件。需要能讀取網頁並解析 PDF、DOC 等附件的 AI 工具 |
| 輸出 | `activities/activities-YYYY-MM-DD.md`，每天一份報告 |
| 範例輸出 | 專案內的 `activities/activities-2026-08-17.md` |
| 預設分支 | `master` |
| 發行版 | 無 |

## 取得

```bash
git clone https://github.com/workingyuanyuan/tw-highschool-ai-activity-daily.git
```

## 執行

在專案目錄中開啟具備檔案系統存取權限的 AI 工具，並給予以下指示：

```text
請讀取 prompts/daily-collection.md 並完成今天的活動日報。
```

Agent 會依序讀取 `SOURCES.md` 中的來源、解析隨附簡章、套用篩選規則，並寫出當天的報告。

若要每天執行，請要求工具設定排程：

```text
請設定排程：每天早上 08:00 自動讀取 prompts/daily-collection.md 並完成當天的活動日報。
```

在沒有檔案系統存取能力的網頁對話中，將 `prompts/daily-collection-standalone.md` 的全文貼入對話框，報告就會直接輸出在對話中。

## 篩選規則

| 分級 | 規則 |
| --- | --- |
| A，主推 | 開放全台灣高中職學生參加、能讓學生使用 AI 工具並展現 AI 能力，且有專題、應用程式、影片或海報等實作產出 |
| B，補充 | 活動禁止使用生成式 AI、僅限單一縣市或學校、未設學生組別，或屬於純文學寫作或明顯超出高中程度 |
| 排除 | 已截止報名、僅限大專以上，或沒有實作產出的研習與營隊 |

## 檔案

| 檔案 | 內容 | 更新時機 |
| --- | --- | --- |
| `PROJECT.md` | 篩選標準、分類邏輯、欄位規格 | 篩選原則變更時 |
| `SOURCES.md` | 追蹤來源：學校公告頁、競賽專區、平台狀態 | 新增來源或來源狀態變更時 |
| `CALIBRATION.md` | A 級與 B 級活動的校準範例 | 每學年檢視一次 |
| `OPERATIONS.md` | 各來源網站的讀取方式與格式問題 | 網站改版或讀取失敗時 |
| `LOG.md` | 執行紀錄 | 每次執行後 |
| `prompts/` | Agent 執行的提示詞 | 篩選原則變更時 |

調整標準時，請先編輯 `PROJECT.md`，再同步更新 `prompts/` 中的提示詞。
