---
title: Moss-TTS-for-HyperFrames
description: 透過 Moss 雲端語音 API 產生旁白 WAV 的 Node.js CLI 與 agent skill。
repo: workingyuanyuan/Moss-TTS-for-HyperFrames
appliesTo: main 分支的 commit 1dd5c44，套件版本 1.0.0。環境為 Node.js 22 以上。
caveat: 本工具會呼叫雲端 API，需要在 MOSS_API_KEY 提供帳號金鑰。只有在明確指定使用 Moss 時才會呼叫這個 skill。1x 以外的語速設定會報錯，且請求失敗不會重試。專案沒有 LICENSE 檔案。
effectiveDate: 2026-09-19
lastVerified: 2026-11-18
sources:
  - title: README.md at commit 1dd5c44
    url: https://github.com/workingyuanyuan/Moss-TTS-for-HyperFrames/blob/1dd5c44d45a061c78bfe284b86d724c7b10f1152/README.md
  - title: package.json at commit 1dd5c44
    url: https://github.com/workingyuanyuan/Moss-TTS-for-HyperFrames/blob/1dd5c44d45a061c78bfe284b86d724c7b10f1152/package.json
  - title: SKILL.md at commit 1dd5c44
    url: https://github.com/workingyuanyuan/Moss-TTS-for-HyperFrames/blob/1dd5c44d45a061c78bfe284b86d724c7b10f1152/SKILL.md
---

## 事實

| 欄位 | 內容 |
| --- | --- |
| 類型 | Node.js CLI 與 agent skill。Skill 名稱為 `moss-tts`，套件名稱為 `moss-tts-skill` |
| 授權 | 沒有 LICENSE 檔案，GitHub 未偵測到授權 |
| 版本 | 1.0.0，出自 `package.json` |
| 需求 | Node.js 22 以上，無第三方 npm 相依套件 |
| API 端點 | `https://api.mosi.cn`，固定值 |
| 憑證 | 環境變數 `MOSS_API_KEY`，選用 `MOSS_VOICE_ID` |
| 輸出 | 獨立的 WAV 檔與中繼資料檔 `<wav>.json`，其中路徑相對於該中繼資料檔 |
| 發行版 | 無 |

這是與 [local-tts-sfx](/zh-tw/repos/local-tts-sfx/) 不同的專案，後者是在本機 GPU 上執行 MOSS-TTS 模型。

## 使用 CLI

在目前的 shell 或密鑰管理器中設定 `MOSS_API_KEY`。請勿將金鑰寫進專案中。

```powershell
node scripts/moss-tts.mjs voices --provider moss
node scripts/moss-tts.mjs synth --provider moss --text '這是一段旁白。' --voice '<account-voice-id>' --out narration.wav
node scripts/moss-tts.mjs synth --provider moss --text-file narration.txt --voice '<account-voice-id>' --out narration.wav --force
```

| 選項 | 用途 |
| --- | --- |
| `--voice` | 帳號的 voice ID，也可以改由 `MOSS_VOICE_ID` 提供 |
| `--text-file` | 從 UTF-8 檔案讀取講稿 |
| `--metadata` | 將中繼資料 JSON 寫入其他路徑 |
| `--force` | 覆寫既有的輸出檔案 |
| `--help`, `--version` | 顯示所有參數或版本號 |

支援同步的 Flash 與 Pro WAV 輸出。一般音訊輸出不包含字幕時間軸。

## HyperFrames

HyperFrames 橋接透過 `HF_MEDIA_ENGINE` 連接，啟動器說明記載於專案內的 `references/hyperframes.md`。產生字幕需要已安裝 HyperFrames CLI，因為本套件會呼叫其公開的 `transcribe` 指令；一般 CLI 用途不需要 HyperFrames。

## 安裝到專案中

原始碼專案是維護基地。將已 commit 的版本作為發行版複製到目標專案：

```powershell
node scripts/install.mjs --to 'path/to/project/.agents/skills/moss-tts'
node scripts/install.mjs --verify 'path/to/project/.agents/skills/moss-tts'
```

- 目標位置必須是位於原始專案之外的新目錄。
- 安裝腳本會寫入 `INSTALLATION.json`，記錄版本、來源 commit 與每個檔案的 SHA-256。
- 安裝完成後，可在目標位置直接執行 `node scripts/moss-tts.mjs --version`，不需依賴原始專案。
- 不支援安裝至任何 `.codex` 路徑。

## 測試

```powershell
npm test
$env:HF_SKILLS_DIR = 'path/to/Hyperframes/.agents/skills'
npm run test:hyperframes
```

測試使用本機合成的 WAV 測試檔與模擬的 fetch，因此不需要帳號憑證。實際語音辨識品質與 Moss 音訊品質不在測試涵蓋範圍內。
