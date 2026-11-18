---
title: lite-codex-subagent-delegation
description: 讓 Codex 把可獨立驗證的子任務委派給子代理的 skill，有三種固定配置。
repo: workingyuanyuan/lite-codex-subagent-delegation
appliesTo: main 分支的 commit 7ecf8a8，資料夾 gpt-6-astra。環境為 Codex 中的主代理 GPT-6 Astra。
caveat: 專案沒有 LICENSE 檔案。這組配置是為 GPT-6 Astra 主代理設計。實際可用的模型與工具取決於你的 Codex 用戶端與帳號。README 只有繁體中文版。
effectiveDate: 2026-11-03
lastVerified: 2026-11-18
sources:
  - title: README.md at commit 7ecf8a8
    url: https://github.com/workingyuanyuan/lite-codex-subagent-delegation/blob/7ecf8a82563ae3642929edae7c94ec24fbf3ebce/README.md
---

## 事實

| 欄位 | 內容 |
| --- | --- |
| 類型 | Codex 個人 skill，名稱為 `delegate` |
| 授權 | 沒有 LICENSE 檔案，GitHub 未偵測到授權 |
| 版本資料夾 | `gpt-6-astra` |
| 發行版 | 無 |

## 檔案

```text
gpt-6-astra/
  AGENTS.md
  skills/
    delegate/
      SKILL.md
      references/
        benchmarks.md
```

| 檔案 | 用途 |
| --- | --- |
| `AGENTS.md` | 要加進全域指令的那一行英文 |
| `skills/delegate/SKILL.md` | 英文的委派策略與協作規則 |
| `skills/delegate/references/benchmarks.md` | 路由背後所依據的模型比較資料 |

## 安裝

把 `gpt-6-astra/skills/delegate` 整個資料夾複製到個人 skill 目錄。

| 系統 | 個人 skill 目錄 |
| --- | --- |
| Windows | `%USERPROFILE%\.agents\skills` |
| macOS 與 Linux | `~/.agents/skills` |

在 Linux 上，於 clone 下來的專案目錄內執行：

```bash
mkdir -p ~/.agents/skills
cp -r gpt-6-astra/skills/delegate ~/.agents/skills/
```

完成後應該包含：

```text
~/.agents/skills/delegate/SKILL.md
~/.agents/skills/delegate/references/benchmarks.md
```

如果你的用戶端改從 Codex 家目錄列出 skill（例如 `~/.codex/skills`），就改裝到該處。請只保留一份已安裝的 `delegate`。

接著在 Codex 家目錄的 `AGENTS.md` 委派區塊加入下面這一行。預設路徑為 `~/.codex/AGENTS.md`（Windows 為 `%USERPROFILE%\.codex\AGENTS.md`）。若有設定 `CODEX_HOME`，就改用該目錄下的檔案。若該處已有 `AGENTS.override.md` 生效，則改加進該檔案。

```patch title="~/.codex/AGENTS.md"
+When delegating independent, verifiable work would improve efficiency or quality, read and follow the delegate skill and proactively delegate suitable tasks.
```

## 確認已載入

開啟新對話、選擇 GPT-6 Astra，並確認 skill 選擇器中出現 `delegate`。如果沒有出現，請重開 Codex 並檢查資料夾層級與 `SKILL.md` 檔名，接著呼叫它：

```text
$delegate 請說明你讀取的 SKILL.md 路徑，以及三種子代理配置。
```

## 子代理配置

| 子代理模型 ID | Effort | 負責的工作 |
| --- | --- | --- |
| `gpt-6-luna` | `max` | 範圍窄、規格明確且易於檢查的搜尋、抽取、整理與局部編輯 |
| `gpt-6.1-sol` | `medium` | 一般子任務的預設選擇：多步驟實作、測試與跨檔案調查 |
| `gpt-6.1-sol` | `high` | 複雜除錯、相依性分析、假設驗證與深度審查 |

## 可預期的行為

- 品質優先，其次才是總用量與完成時間。
- 主代理與子代理皆可再往下委派，並從這三種配置中擇一使用。
- Skill 會在啟動子代理時明確指定模型與 effort。
- 主代理負責最終驗收與整合。使用者指示優先於 skill。

## 相關

- Claude Code 版本：[lite-claude-subagent-delegation](/zh-tw/repos/lite-claude-subagent-delegation/)。
- Antigravity 版本：[lite-agy-subagent-delegation](/zh-tw/repos/lite-agy-subagent-delegation/)。
