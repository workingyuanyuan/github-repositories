---
title: lite-claude-subagent-delegation
description: 讓 Claude Code 把工作委派給 Codex CLI、Antigravity CLI 與 Claude 子代理的 skill。
repo: workingyuanyuan/lite-claude-subagent-delegation
appliesTo: main 分支的 commit 582b0ea，資料夾 claude-fable-5-2-opus-5-5。主代理為 Claude Fable 5.2 或 Claude Opus 5.5。
caveat: 模型名單只適用於這兩種主代理。Codex CLI 與 Antigravity CLI 都必須已安裝並登入。README 只有繁體中文版。
effectiveDate: 2026-11-19
lastVerified: 2026-11-22
sources:
  - title: README.md at commit 582b0ea
    url: https://github.com/workingyuanyuan/lite-claude-subagent-delegation/blob/582b0ea7ecb66b1de784c3e578383c1ccd961b75/README.md
  - title: CLAUDE.md at commit 582b0ea
    url: https://github.com/workingyuanyuan/lite-claude-subagent-delegation/blob/582b0ea7ecb66b1de784c3e578383c1ccd961b75/claude-fable-5-2-opus-5-5/CLAUDE.md
  - title: LICENSE at commit 582b0ea
    url: https://github.com/workingyuanyuan/lite-claude-subagent-delegation/blob/582b0ea7ecb66b1de784c3e578383c1ccd961b75/LICENSE
---

## 事實

| 欄位 | 內容 |
| --- | --- |
| 類型 | Claude Code 個人 skill，名稱為 `delegate` |
| 授權 | MIT |
| 目前版本的資料夾 | `claude-fable-5-2-opus-5-5` |
| 前一版的資料夾 | `claude-opus-5-5`，保留作為紀錄，只支援 Claude Opus 5.5 當主代理 |
| 需求 | Codex CLI（已驗證 0.163）與 Antigravity CLI `agy`（已驗證 1.4.7），皆已登入 |
| 平台 | Windows（PowerShell 或 Git Bash），以及 WSL 或 Linux（bash） |
| 發行版 | 無 |

## 檔案

```text
claude-fable-5-2-opus-5-5/
  CLAUDE.md
  MODEL-SELECTION.md
  skills/
    delegate/
      SKILL.md
claude-opus-5-5/
```

| 檔案 | 用途 | 是否安裝 |
| --- | --- | --- |
| `CLAUDE.md` | 要加進全域指令的那一行英文 | 複製其內容 |
| `skills/delegate/SKILL.md` | 英文的委派策略與各 worker 的呼叫方式 | 是 |
| `MODEL-SELECTION.md` | 選模型的依據、實測紀錄與分數快照 | 否，只在升級 skill 時閱讀 |

## 安裝

把 `claude-fable-5-2-opus-5-5/skills/delegate` 整個資料夾複製到個人 skill 目錄。

| 系統 | 個人 skill 目錄 |
| --- | --- |
| Windows | `%USERPROFILE%\.claude\skills` |
| macOS 與 Linux | `~/.claude/skills` |

在 Linux 上，於 clone 下來的專案目錄內執行：

```bash
mkdir -p ~/.claude/skills
cp -r claude-fable-5-2-opus-5-5/skills/delegate ~/.claude/skills/
```

完成後應該存在 `~/.claude/skills/delegate/SKILL.md`。接著在 `~/.claude/CLAUDE.md`（Windows 為 `%USERPROFILE%\.claude\CLAUDE.md`）加入下面這一行。如果檔案裡已有其他委派 skill 的入口句，就把它換成這一行。

```patch title="~/.claude/CLAUDE.md"
+Before delivering a design or merge-bound code, and whenever delegating would save your context or improve quality, read and follow the delegate skill and proactively delegate suitable tasks.
```

## 確認已載入

開啟新對話，確認可用 skill 清單中出現 `delegate`，再明確呼叫它：

```text
/delegate 請說明你讀取的 SKILL.md 路徑，以及各模型適合的任務。
```

## 委派名單

| 模型 | Effort | 負責的工作 |
| --- | --- | --- |
| Opus（透過 Agent tool） | `high` | 要 merge、但大到會占滿主代理 context 的程式碼，其餘由主代理自己寫 |
| Fable（透過 Agent tool，僅限主代理為 Opus 時） | `medium` | 搭建前與 Astra、Neon 並行的第三份設計意見，不接實作 |
| `gpt-6.2-sol` | `medium` | 審查主代理寫的程式碼（含大型或高風險的 diff），以及不會 merge 的後端工作 |
| `gpt-6.2-astra` | `medium` | 搭建前的設計討論與第二意見，以及根因假設，不接實作 |
| `gemini-4-neon-medium` | 寫在模型 ID 內 | 與 Astra 並行的設計意見，圖片、PDF、影音的抽取與判斷，以及機械性的程式任務 |

## 可預期的行為

- 只有在能節省主代理的 context 或提升品質，而且驗證結果的成本低於自己做的時候，才會委派。
- 新專案、新功能或改版開始搭建之前，主代理會平行且唯讀地詢問所有顧問，把採納的重點與分歧回報給使用者，等使用者決定分歧後才動工。
- 會寫檔的委派直接執行，不先詢問。唯讀的委派可以平行執行。平行寫檔時各自使用獨立的 git worktree。
- 每次委派的 brief 與輸出都存放在 `~/.local/state/delegation-log/<project>/`。
- 所有委派結果一律視為未經驗證，由主代理做最後檢查。

## 相關

- 同一構想的 Codex 版本是 [lite-codex-subagent-delegation](https://github.com/workingyuanyuan/lite-codex-subagent-delegation)。
