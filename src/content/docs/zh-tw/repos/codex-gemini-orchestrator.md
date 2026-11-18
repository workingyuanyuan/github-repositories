---
title: codex-gemini-orchestrator
description: Windows 11 上的 Codex skill，透過 Antigravity CLI 把工作委派給 Gemini 3.8 Flash。
repo: workingyuanyuan/codex-gemini-orchestrator
appliesTo: main 分支的 commit 4dedfcf，版本 6.1-sol-gemini3.8flash。環境為 Windows 11 搭配 PowerShell 7。
caveat: 僅限 Windows 11。執行器的 -AutoApprove 會讓 Antigravity 不經詢問直接執行工具，而獨立的工作目錄並非檔案系統沙盒。設計時針對 Codex CLI 0.158.0-alpha.2.1 與 Antigravity CLI 1.2.11。
effectiveDate: 2026-10-04
lastVerified: 2026-11-18
sources:
  - title: README.md at commit 4dedfcf
    url: https://github.com/workingyuanyuan/codex-gemini-orchestrator/blob/4dedfcff78272c556715c04c8505d53a37215f59/README.md
  - title: LICENSE at commit 4dedfcf
    url: https://github.com/workingyuanyuan/codex-gemini-orchestrator/blob/4dedfcff78272c556715c04c8505d53a37215f59/LICENSE
---

## 事實

| 欄位 | 內容 |
| --- | --- |
| 類型 | 名為 `model-routing-and-delegation-agy` 的 Codex skill，附帶 PowerShell 執行器與安裝腳本 |
| 授權 | MIT |
| 目前版本 | `6.1-sol-gemini3.8flash` |
| 保留於 `versions/` 的舊版 | `6-sol-gemini3.8flash`、`6-gemini3.8flash`、`5.6`、`5.6-gemini3.5flash`、`5.6-gemini3.6flash`、`5.6-gemini3.7flash`、`5.6-gemini3.8flash` |
| 需求 | Windows 11、PowerShell 7、Git、啟用原生子代理的 Codex，以及已登入訂閱帳號的官方 Antigravity CLI `agy.exe` |
| 安裝位置 | `$env:CODEX_HOME`，若未設定則為 `$HOME\.codex` |
| 發行版 | 無 |

## 安裝

於專案根目錄執行：

```powershell
./install.ps1 -InstallDelegationTrigger
```

`-InstallDelegationTrigger` 會把一段說明何時委派的句子合併進 `AGENTS.md` 的專屬區塊，並保留該區塊以外的文字。若你已有自己的觸發語句，單獨執行 `./install.ps1` 即可安裝 skill 與執行器。

更新既有的檔案：

```powershell
./install.ps1 -InstallDelegationTrigger -Force
```

`-Force` 會覆蓋同名的套件檔案與專屬指令區塊，請先備份個人修改。安裝後開啟新的 Codex 對話。

若專案是從 GitHub ZIP 下載且 PowerShell 依 `RemoteSigned` 原則封鎖腳本，請在確認來源後解除封鎖：

```powershell
Unblock-File -LiteralPath ./install.ps1
```

| 參數 | 用途 |
| --- | --- |
| `-Version <folder name>` | 安裝 `versions/` 中的其他版本 |
| `-DestinationRoot <directory>` | 安裝到 Codex 家目錄以外的位置 |

從較舊版本升級時，請檢查並移除已退役的委派規則與 `gpt-5-6-*.toml` 檔案，避免與新的路由衝突。

## 使用

以名稱要求使用這個 skill：

```text
使用 $model-routing-and-delegation-agy，將這項工作中可獨立驗收的部分委派出去。
```

| 工作 | 日常預設 | 何時提高 effort |
| --- | --- | --- |
| 可完整交辦且能以 Antigravity 工具完成的研究、分析、實作或審查 | Gemini 3.8 Flash Medium | High：需要深度推理、知識整合或面對較高不確定性 |
| 需要原生 Codex 工具或 context、且易於檢查的證據收集與明確編輯 | GPT-6 Luna High | Max：有邊界的判斷任務，細微錯誤會讓主代理付出大量重工 |
| 需要原生 Codex 工具或 context、且路徑明確的多步驟工作 | GPT-6.1 Sol Medium | High：複雜除錯與跨模組追蹤。xHigh：包含多個假設或相互矛盾證據的困難子任務 |

主代理會保留使用者選定的模型與 effort，負責架構、整合與最終驗收。

## 呼叫 Gemini

```powershell
$codexRoot = if ($env:CODEX_HOME) { $env:CODEX_HOME } else { Join-Path $HOME '.codex' }
$runner = Join-Path $codexRoot 'scripts/Invoke-AntigravityAgent.ps1'
& $runner -WorkingDirectory $worktree -PromptFile $contract -Model gemini-3.8-flash-medium -AutoApprove
```

- `$worktree` 是乾淨且獨立的 linked Git worktree 根目錄。
- `$contract` 是位於該 worktree 之外的 UTF-8 任務檔。
- 若需 high effort，請傳入 `-Model gemini-3.8-flash-high`。
- 執行器會回傳精簡 JSON，完整結果與診斷資訊則按次存放在本機目錄。

## 目錄結構

```text
versions/6.1-sol-gemini3.8flash/
  AGENTS.md
  scripts/Invoke-AntigravityAgent.ps1
  skills/model-routing-and-delegation-agy/
    SKILL.md
    agents/openai.yaml
    references/
      models.md
      benchmarks.md
      antigravity.md
```

## 測試

```powershell
pwsh -NoProfile -File ./tests/Invoke-AntigravityAgent.Tests.ps1
pwsh -NoProfile -File ./tests/Install.Tests.ps1
```

執行器測試使用本機假執行檔與暫存 Git 專案，安裝測試則使用暫存目標目錄。
