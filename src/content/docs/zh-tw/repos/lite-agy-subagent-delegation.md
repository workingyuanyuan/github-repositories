---
title: lite-agy-subagent-delegation
description: 讓 Antigravity 委派給 Gemini 4 Hydrogen，並向 Claude Opus 5.5 徵詢第二意見的 skill。
repo: workingyuanyuan/lite-agy-subagent-delegation
appliesTo: main 分支的 commit 0ebea3c，資料夾 gemini-4-argon。環境為 Antigravity 中的主代理 Gemini 4 Argon。
caveat: 模型名單是為 Gemini 4 Argon 主代理設計。必須先安裝並登入 Antigravity CLI agy，而且 Windows 與 WSL 兩個環境要分開各自安裝。README 只有繁體中文版。
effectiveDate: 2026-11-15
lastVerified: 2026-11-18
sources:
  - title: README.md at commit 0ebea3c
    url: https://github.com/workingyuanyuan/lite-agy-subagent-delegation/blob/0ebea3cf25b575082e09b42be17d11b43b3e134e/README.md
  - title: LICENSE at commit 0ebea3c
    url: https://github.com/workingyuanyuan/lite-agy-subagent-delegation/blob/0ebea3cf25b575082e09b42be17d11b43b3e134e/LICENSE
---

## 事實

| 欄位 | 內容 |
| --- | --- |
| 類型 | Antigravity 全域 skill，名稱為 `delegate` |
| 授權 | MIT |
| 版本資料夾 | `gemini-4-argon` |
| 需求 | Antigravity CLI `agy`（已驗證 1.5.3），已登入 |
| 平台 | Windows（PowerShell 5.1 或 7），以及 WSL 或 Linux（bash） |
| 發行版 | 無 |

## 檔案

```text
gemini-4-argon/
  GEMINI.md
  MODEL-SELECTION.md
  skills/
    delegate/
      SKILL.md
```

| 檔案 | 用途 | 是否安裝 |
| --- | --- | --- |
| `GEMINI.md` | 要加進全域規則的那一行英文 | 複製其內容 |
| `skills/delegate/SKILL.md` | 英文的委派與顧問策略，以及兩者的呼叫方式 | 是 |
| `MODEL-SELECTION.md` | 選模型的依據與測試紀錄 | 否，只在升級 skill 時閱讀 |

## 安裝

把 `gemini-4-argon/skills/delegate` 整個資料夾複製到 Antigravity 的全域 skill 目錄。

| 系統 | 全域 skill 目錄 |
| --- | --- |
| Windows | `%USERPROFILE%\.gemini\config\skills` |
| WSL 與 Linux | `~/.gemini/config/skills` |

在 Linux 上，於 clone 下來的專案目錄內執行：

```bash
mkdir -p ~/.gemini/config/skills
cp -r gemini-4-argon/skills/delegate ~/.gemini/config/skills/
```

完成後應該存在 `~/.gemini/config/skills/delegate/SKILL.md`。接著在 `~/.gemini/GEMINI.md`（Windows 為 `%USERPROFILE%\.gemini\GEMINI.md`）加入下面這一行。如果檔案裡已有其他委派 skill 的入口句，就把它換成這一行。

```patch title="~/.gemini/GEMINI.md"
+Before executing a plan for a design, architecture change, merge-bound code, or root-cause fix, and whenever delegating would save your context or improve quality, read and follow the delegate skill.
```

## 確認已載入

開啟新對話，確認 Skills & Customizations 底下出現 `delegate`，再提問：

```text
請讀取 delegate skill，說明你讀取的 SKILL.md 路徑、委派對象，以及何時詢問 advisor。
```

## 角色

| 角色 | 模型與呼叫方式 | 用途 |
| --- | --- | --- |
| Worker | `gemini-4-hydrogen-medium`，必要時改用 `-high`，透過 Antigravity 內建的 `swarm` 呼叫 | 平行處理有明確邊界的任務：程式碼探索、葉節點模組遷移、機械性編輯、樣板測試、高頻檢查，以及圖片、PDF、音訊與影片的抽取 |
| Advisor | `claude-opus-5-5-low`，透過 `agy` CLI 呼叫 | 執行設計、架構變更、要 merge 的程式碼或根因修復的計畫前，徵詢第二意見 |

## 可預期的行為

- 唯讀 worker 使用 `workspace: "inherit"`。平行寫檔的 worker 使用 `workspace: "share"` 建立獨立的 git worktree，並在合併後以 `swarm(action: "kill")` 清理。
- `agy` 沒有可靠的唯讀模式。顧問的 brief 會寫明僅供唯讀，在 git 專案中主代理也會比對執行前後的 `git status --porcelain` 與 `git diff`。
- 顧問 brief 會存放在 `~/.local/state/delegation-log/<project>/`。
- 如果顧問配額用盡（`RESOURCE_EXHAUSTED`），主代理會回報無法取得該意見並繼續進行。
- 所有結果一律視為未經驗證。若顧問與主代理的計畫有所衝突，會回報給使用者決定。

## 相關

- Claude Code 版本：[lite-claude-subagent-delegation](/zh-tw/repos/lite-claude-subagent-delegation/)。
- Codex 版本：[lite-codex-subagent-delegation](/zh-tw/repos/lite-codex-subagent-delegation/)。
