---
title: agents.md-collections
description: 依模型收藏的 AGENTS.md 與設計筆記，目前只有 gpt-6-astra。
repo: workingyuanyuan/agents.md-collections
appliesTo: main 分支的 commit 5e58faf。這個專案沒有任何已標記的發行版。
caveat: 目前只收錄單一模型。專案沒有 LICENSE 檔案。README 只有繁體中文版。模型行為可能會隨模型版本、工具與環境而改變。
effectiveDate: 2026-09-23
lastVerified: 2026-11-18
sources:
  - title: README.md at commit 5e58faf
    url: https://github.com/workingyuanyuan/agents.md-collections/blob/5e58faf271ea36448dacaa7abfe1b53d3e9948e8/README.md
---

## 事實

| 欄位 | 內容 |
| --- | --- |
| 類型 | 附帶設計筆記的 `AGENTS.md` 檔案合集 |
| 授權 | 沒有 LICENSE 檔案，GitHub 未偵測到授權 |
| 收錄模型 | 1 個：`gpt-6-astra`，紀錄狀態為「Output Discipline」 |
| 發行版 | 無 |

## 目錄結構

每個模型都有一個以完整模型 ID 命名的頂層資料夾。

```text
.
  README.md
  _template/
    AGENTS.md
    readme.md
  gpt-6-astra/
    AGENTS.md
    readme.md
```

| 檔案 | 用途 |
| --- | --- |
| `<model-id>/AGENTS.md` | 實際給模型的指令 |
| `<model-id>/readme.md` | 為何這樣寫、觀察到什麼，以及如何驗證 |
| `_template/` | 新增模型時用來複製的範本 |

## 使用檔案

把你所用模型的 `AGENTS.md` 複製到 agent 讀取的位置。以 `gpt-6-astra` 為例：

```bash
git clone https://github.com/workingyuanyuan/agents.md-collections.git
```

檔案位於 `agents.md-collections/gpt-6-astra/AGENTS.md`。測試環境請閱讀 `gpt-6-astra/readme.md`。

## 資料夾命名

如果模型 ID 包含無法作為資料夾名稱的字元，請改用百分比編碼，並在該資料夾的 `readme.md` 記下原始 ID。

| 字元 | 寫法 |
| --- | --- |
| `/` | `%2F` |
| `:` | `%3A` |
| `%` | `%25` |

## 新增紀錄

1. 複製 `_template/` 並將資料夾改名為模型 ID。
2. 把實際使用的指令放進 `AGENTS.md`。
3. 在 `readme.md` 填寫環境、設計推論與驗證結果。
4. 每次修改指令時，同步更新筆記並 commit。
