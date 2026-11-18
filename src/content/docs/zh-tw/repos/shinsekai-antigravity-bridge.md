---
title: shinsekai-antigravity-bridge
description: 本機的 OpenAI 相容伺服器，讓 Shinsekai 免 API 金鑰使用已登入的 Antigravity CLI。
repo: workingyuanyuan/shinsekai-antigravity-bridge
appliesTo: main 分支的 commit 0461c0c。環境為 Windows，已安裝並登入 Antigravity CLI agy。
caveat: 每則回覆約需 10 到 20 秒，因為每次呼叫 agy 都會夾帶約 20k tokens 的 agent 提示詞。請關閉 Shinsekai 內所有的工具組與外掛。README 寫明採 MIT 授權，但專案沒有 LICENSE 檔案。
effectiveDate: 2026-09-08
lastVerified: 2026-11-18
sources:
  - title: README.md at commit 0461c0c
    url: https://github.com/workingyuanyuan/shinsekai-antigravity-bridge/blob/0461c0c7ecb5d01598a2d3f6646bafbcdf58d7d4/README.md
---

## 事實

| 欄位 | 內容 |
| --- | --- |
| 類型 | Python 編寫的本機 OpenAI 相容橋接伺服器，供 [Shinsekai](https://github.com/RachelForster/Shinsekai) 使用 |
| 授權 | README 寫明採 MIT 授權。專案沒有 LICENSE 檔案，GitHub 未偵測到授權 |
| 需求 | PATH 中有 Antigravity CLI `agy`，並已登入 Google 帳號 |
| 監聽位址 | `http://127.0.0.1:8000` |
| 預設模型 | `gemini-3.8-flash-low` |
| 啟動器 | `start_bridge.bat`，Windows 批次檔 |
| 發行版 | 無 |

## 安裝

先確認 `agy` 可以正常執行：

```bash
agy --version
```

接著從這個專案複製以下檔案到你的 Shinsekai 資料夾：

```text
Shinsekai/
  start_bridge.bat
  tools/
    antigravity_bridge.py
    test_antigravity_bridge.py
```

`test_antigravity_bridge.py` 為選用檔案。

## 啟動

雙擊 `start_bridge.bat`。當主控台顯示以下訊息時，代表橋接器已就緒：

```text
[INFO] [AntigravityBridge] Starting Antigravity Bridge on http://127.0.0.1:8000 (Default Model: gemini-3.8-flash-low)
```

## 設定 Shinsekai

| 設定 | 內容 |
| --- | --- |
| LLM provider | `ChatGPT` 或 `Ollama` |
| Base URL | `http://127.0.0.1:8000/v1` |
| API Key | `none`，或任意字元 |
| Model name | 從下方清單任選一個 |

## 模型

- `antigravity-local`，預設別名
- `gemini-3.8-flash-low`，推薦且為預設模型
- `gemini-3.8-flash-medium`
- `gemini-3.8-flash-high`
- `gemini-3.7-flash-medium`
- `gemini-3.7-flash-low`
- `gemini-3.7-flash-high`
- `gemini-3.6-flash-medium`
- `gemini-3.1-pro-high`
- `claude-sonnet-4-6`
- `claude-opus-4-6-thinking`

## 運作行為

- 重複使用本機的 Google 帳號登入與模型配額，因此不需要 API 金鑰。
- 會注入對話 schema，使回覆符合 Shinsekai 解析器預期的格式。
- 以偽串流方式回傳結果，可配合 Shinsekai 的即時 TTS 與 Live2D 嘴型同步。
- 會在獨立的空目錄中執行 `agy`，並開啟受限終端機沙盒。
- 對話關閉或連線中斷時，會終止底層的 `agy` 子程序樹。
