---
title: skill.md-collections
description: 作者自己的 agent skill 收藏，每個 skill 一個資料夾，目前有 heii 與 3d-textbook-lesson 兩個。
repo: workingyuanyuan/skill.md-collections
appliesTo: main 分支的 commit 195e5f3。這個專案沒有任何已標記的發行版。
caveat: README 只說明資料夾配置，沒有列出收錄的 skill；專案根目錄下的資料夾就是 skill，目前有兩個。專案沒有 LICENSE 檔案。README 只有繁體中文版。
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

## 事實

| 欄位 | 內容 |
| --- | --- |
| 類型 | Agent skill 合集 |
| 授權 | 沒有 LICENSE 檔案，GitHub 未偵測到授權 |
| 專案內收錄的 skill | 2 個：`heii` 與 `3d-textbook-lesson` |
| 檔案 | `README.md`、`.gitignore`、`heii/`（`SKILL.md`、`agents/openai.yaml`）、`3d-textbook-lesson/`（`SKILL.md`、`engine/`、`examples/`） |
| 發行版 | 無 |

## Skills

| Skill | 出自其 `SKILL.md` 的說明 |
| --- | --- |
| `heii` | 「在明確呼叫時，以平實清楚的語言溝通。」 |
| `3d-textbook-lesson` | 把教科書 PDF 的一個章節做成教師上課投影用的 3D 互動課本：一個 three.js 靜態網頁，畫面是一本攤開的書，圖表從書頁上浮起，點一下就自動播完整段示範。它所用的引擎放在這個 skill 的 `engine/` 資料夾 |

## 資料夾配置

每個 skill 資料夾放在專案根目錄，資料夾名稱即為 skill 名稱。

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

| 路徑 | 用途 |
| --- | --- |
| `<skill-name>/SKILL.md` | 名稱、用途、何時使用與指示。必要檔案 |
| `<skill-name>/references/` | 補充說明、參考文件與範例 |
| `<skill-name>/scripts/` | Skill 使用的腳本與工具 |
| `<skill-name>/assets/` | 模板、圖片與其他素材 |

## 使用 skill

README 沒有提供安裝指令。將所需的 skill 資料夾複製到 agent 載入 skill 的目錄即可，例如：

```bash
git clone https://github.com/workingyuanyuan/skill.md-collections.git
```

## 新增 skill 的規則

- 資料夾名稱使用小寫字母、數字與連字號，並讓 `SKILL.md` 中的 `name` 與資料夾名稱一致。
- `description` 需說明 skill 的功能與使用時機。
- 在 `SKILL.md` 中使用相對路徑連結詳細參考資料。
- Commit 前先檢查內容，確認沒有密碼、API 金鑰或私密資料。
