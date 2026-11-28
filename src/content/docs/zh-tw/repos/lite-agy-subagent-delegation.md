---
title: lite-agy-subagent-delegation
description: 讓 Antigravity 委派給 Gemini 4 Neon，並向兩個顧問模型徵詢第二意見的 skill。
repo: workingyuanyuan/lite-agy-subagent-delegation
appliesTo: main 分支的 commit c61bfd2，資料夾 gemini-4-neon。環境為 Antigravity 中的主代理 Gemini 4 Neon。
caveat: 目前的資料夾 gemini-4-neon 是為 Gemini 4 Neon 主代理設計；資料夾 gemini-4-argon 是先前的版本，給 Gemini 4 Argon 主代理使用。必須先安裝並登入 Antigravity CLI agy，而且 Windows 與 WSL 兩個環境要分開各自安裝。README 只有繁體中文版。
effectiveDate: 2026-11-19
lastVerified: 2026-11-22
sources:
  - title: README.md at commit c61bfd2
    url: https://github.com/workingyuanyuan/lite-agy-subagent-delegation/blob/c61bfd270bea8751410fa46541f4a97843cc6e26/README.md
  - title: LICENSE at commit c61bfd2
    url: https://github.com/workingyuanyuan/lite-agy-subagent-delegation/blob/c61bfd270bea8751410fa46541f4a97843cc6e26/LICENSE
---

## 事實

| 欄位 | 內容 |
| --- | --- |
| 類型 | Antigravity 全域 skill，名稱為 `delegate` |
| 授權 | MIT |
| 目前版本資料夾 | `gemini-4-neon` |
| 先前版本資料夾 | `gemini-4-argon`，保留在專案中：Gemini 4 Argon 主代理、Gemini 4 Hydrogen worker，以及單一顧問 Claude Opus 5.5 |
| 需求 | Antigravity CLI `agy`，已登入。`gemini-4-neon` 已驗證 1.5.12，`gemini-4-argon` 已驗證 1.5.3 |
| 平台 | WSL 或 Linux（bash），以及 Windows（PowerShell 5.1 或 7）。呼叫顧問的 PowerShell 寫法尚未在 Windows 上實測 |
| 發行版 | 無 |

## 檔案

```text
gemini-4-neon/
  GEMINI.md
  MODEL-SELECTION.md
  skills/
    delegate/
      SKILL.md
gemini-4-argon/
  GEMINI.md
  MODEL-SELECTION.md
  skills/
    delegate/
      SKILL.md
```

`gemini-4-neon` 內的檔案：

| 檔案 | 用途 | 是否安裝 |
| --- | --- | --- |
| `GEMINI.md` | 要加進全域規則的那一行英文 | 複製其內容 |
| `skills/delegate/SKILL.md` | 英文的委派策略、兩位顧問的策略，以及各自的呼叫方式 | 是 |
| `MODEL-SELECTION.md` | 選模型的依據與測試紀錄 | 否，只在升級 skill 時閱讀 |

## 安裝

把 `gemini-4-neon/skills/delegate` 整個資料夾複製到 Antigravity 的全域 skill 目錄。主代理若是 Gemini 4 Argon，改複製 `gemini-4-argon/skills/delegate`。

| 系統 | 全域 skill 目錄 |
| --- | --- |
| Windows | `%USERPROFILE%\.gemini\config\skills` |
| WSL 與 Linux | `~/.gemini/config/skills` |

在 Linux 上，於 clone 下來的專案目錄內執行：

```bash
mkdir -p ~/.gemini/config/skills
cp -r gemini-4-neon/skills/delegate ~/.gemini/config/skills/
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

## gemini-4-neon 的角色

| 角色 | 模型與呼叫方式 | 用途 |
| --- | --- | --- |
| Worker | `gemini-4-neon-medium`，必要時改用 `-high`，透過 Antigravity 內建的 `swarm` 呼叫 | 主代理拆解問題並設計好介面後，平行處理有明確邊界的任務：程式碼探索、葉節點模組遷移、機械性編輯、樣板測試、高頻檢查，以及圖片、PDF、音訊與影片的抽取 |
| Advisor 1 | `claude-opus-5-5-low`，透過 `agy` CLI 呼叫 | 執行設計、架構變更、要 merge 的程式碼或根因修復的計畫前，徵詢另一個模型家族的第二意見 |
| Advisor 2 | `gemini-4-argon-medium`，透過 `agy` CLI 呼叫，與 Advisor 1 平行執行 | 讀同一份 brief，由較高階的 Gemini 模型提供第二意見 |

## 可預期的行為

- 唯讀 worker 使用 `workspace: "inherit"`，brief 中禁止改檔。平行寫檔的 worker 使用 `workspace: "share"` 建立獨立的 git worktree，並在驗收與合併後以 `swarm(action: "kill")` 清理。
- Neon、Hydrogen 與 Flash 共用同一個配額池，所以 worker 任務遇到 `RESOURCE_EXHAUSTED` 時不會退回 Hydrogen 或 Flash。
- 兩位顧問讀同一份 brief，存放在 `~/.local/state/delegation-log/<project>/`，內容不提及另一位顧問。兩者在同一回合以兩個背景指令啟動，主代理等兩邊都完成才整合。
- `agy` 沒有可靠的唯讀模式。顧問的 brief 會寫明僅供唯讀，在 git 專案中主代理也會比對執行前後的 `git status --porcelain` 與 `git diff`，單邊重試時也一樣。
- 如果其中一位顧問配額用盡（`RESOURCE_EXHAUSTED`）或重試失敗，主代理會回報該顧問無法使用，並以另一位的意見繼續進行。
- 所有結果一律視為未經驗證，主代理會標明每一點來自哪位顧問。顧問與主代理的計畫在影響計畫走向的地方衝突，或兩位顧問在這類地方嚴重分歧時，會把雙方理由回報給使用者。

## 相關

- Claude Code 版本：[lite-claude-subagent-delegation](/zh-tw/repos/lite-claude-subagent-delegation/)。
- Codex 版本：[lite-codex-subagent-delegation](/zh-tw/repos/lite-codex-subagent-delegation/)。
