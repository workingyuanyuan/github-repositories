---
title: local-tts-sfx
description: 讓 coding agent 用本機 GPU 生成旁白語音與音效的服務，提供 MCP、CLI 與 HTTP。
repo: workingyuanyuan/local-tts-sfx
appliesTo: main 分支的 commit 46e6e54。環境為搭載 NVIDIA GPU 的原生 Linux x86_64 或 WSL2。這個專案沒有任何已標記的發行版。
caveat: 完整測試僅在 WSL2 下的 RTX 5090 Laptop（24 GB）執行過。需要約 16.5 GiB 的模型權重，以及支援 bf16 的 GPU。服務僅綁定在 127.0.0.1 且沒有身分驗證，請勿對外開放這個連接埠。
effectiveDate: 2026-11-17
lastVerified: 2026-11-18
sources:
  - title: README.md at commit 46e6e54
    url: https://github.com/workingyuanyuan/local-tts-sfx/blob/46e6e54ea39a3139ff9801c10f2adc70ab88d401/README.md
  - title: LICENSE at commit 46e6e54
    url: https://github.com/workingyuanyuan/local-tts-sfx/blob/46e6e54ea39a3139ff9801c10f2adc70ab88d401/LICENSE
---

## 事實

| 欄位 | 內容 |
| --- | --- |
| 類型 | 供 Claude Code、Codex 等程式設計 agent 使用的本機文字轉語音與音效服務 |
| 授權 | Apache-2.0 |
| 語音模型 | MOSS-TTS-Local-Transformer-v1.5 |
| 音效模型 | MOSS-SoundEffect v2.0（選裝），每段最長 30 秒 |
| 介面 | MCP stdio 伺服器 `tts-mcp`、命令列 `tts`、部分相容於 OpenAI `/v1/audio/speech` 的 HTTP API |
| 預設位址 | `127.0.0.1:8765` |
| 輸出格式 | wav、flac、mp3 |
| Python | 3.12，由 `uv` 依 `uv.lock` 建立環境 |
| 專案名稱 | 專案名稱為 `local-tts-sfx`。README clone 的是 `workingyuanyuan/local-tts.git`，GitHub 會將該名稱導向此專案 |
| 發行版 | 無 |

## 需求

| 項目 | 需求 |
| --- | --- |
| 作業系統 | 原生 Linux x86_64 或 WSL2。建議搭配 systemd 使用者服務；若無 systemd 則於前景執行伺服器 |
| GPU | 支援 bf16 的 NVIDIA GPU，Ampere 或 RTX 30 系列以上。建議 16 GB 以上 VRAM。未曾在 16 GB 顯示卡上實測 |
| 驅動程式 | 支援 CUDA 12.8 的 NVIDIA 驅動程式，Linux 570 以上。不需另外安裝 CUDA Toolkit |
| 磁碟空間 | `~/.cache/huggingface/` 中約 16.5 GiB 的權重，以及 `.venv` 約 7.3 GiB |
| 工具 | `git`、`ffmpeg`、`uv` |
| 音效（選裝） | 額外約 11 GiB 權重，以及 `workers/moss-sfx/.venv` 約 7.5 GiB |

## 安裝

所有指令皆於專案根目錄執行。

```bash
git clone --recurse-submodules https://github.com/workingyuanyuan/local-tts.git
cd local-tts
UV_HTTP_TIMEOUT=600 uv sync --frozen
uvx --from huggingface_hub hf download OpenMOSS-Team/MOSS-TTS-Local-Transformer-v1.5 --revision be7766a6735b98bd793f7c79fb720b4d0f5d13b8
uvx --from huggingface_hub hf download OpenMOSS-Team/MOSS-Audio-Tokenizer-v2 --revision f6e20e543b33d2c252a7ef71bdf8aa71e5ff9169
scripts/install_service.sh
mkdir -p ~/.local/bin && ln -sfn "$PWD/.venv/bin/tts" ~/.local/bin/tts
claude mcp add -s user local-tts -- "$PWD/.venv/bin/tts-mcp"
codex mcp add local-tts -- "$PWD/.venv/bin/tts-mcp"
scripts/install_agent_rules.sh
.venv/bin/tts health
```

| 步驟 | 作用 |
| --- | --- |
| `uv sync --frozen` | 依 `uv.lock` 建立 `.venv` |
| 兩次 `hf download` | 下載鎖定版本的模型與編解碼器權重 |
| `scripts/install_service.sh` | 安裝並啟動 systemd 使用者服務 |
| `ln -sfn` | 選用，讓 `tts` 可直接從 `~/.local/bin` 執行 |
| `claude mcp add`, `codex mcp add` | 註冊 MCP 伺服器。略過未使用的 agent |
| `scripts/install_agent_rules.sh` | 為 Claude Code 與 Codex 安裝 `narration` 與 `sound-effects` skill |
| `tts health` | 確認服務正在運作 |

專案路徑不可包含空格、`%`、引號或反斜線。

## 安裝音效功能

音效模型因套件版本與主服務衝突，因此使用獨立環境。

```bash
UV_HTTP_TIMEOUT=600 uv sync --frozen --project workers/moss-sfx
uvx --from huggingface_hub hf download OpenMOSS-Team/MOSS-SoundEffect-v2.0 --revision e35df4d82fbe87fcd5d14e5d100e349c0c3c076d
systemctl --user restart local-tts
```

沒有安裝 worker 環境時，音效請求會回傳 503 `sfx_worker_not_installed`，語音功能仍可正常運作。

## 啟動與停止

```bash
systemctl --user restart local-tts
systemctl --user stop local-tts
systemctl --user status local-tts
journalctl --user -u local-tts -f
curl -s localhost:8765/health
```

若沒有 systemd，請在前景執行伺服器：

```bash
HF_HUB_OFFLINE=1 .venv/bin/tts-server
```

- 模型會在首次請求時載入，耗時約 10 至 20 秒，閒置 10 分鐘後卸載。
- 語音模型與音效模型不會同時載入。切換模型需數十秒，因此請將同一任務的所有語音與所有音效分批產生。
- 可透過 `config/server.yaml` 或 `LOCAL_TTS_PORT` 變更連接埠。用戶端使用 `LOCAL_TTS_URL`。

## CLI

```bash
tts say "Hello, welcome." -l en -o /abs/path/hello.wav
tts say -f script.txt -l zh -v demo_zh_female -o /abs/out.mp3
tts say "..." -o /abs/out.wav --no-wait --json
tts job <job_id> --wait -o /abs/out.wav
tts clips deck.json -d /abs/audio -l zh -v demo_zh_female
tts sfx "a heavy wooden door slams shut" -s 3 -o /abs/door.wav
tts sfx-clips effects.json -d /abs/sfx
tts cancel <job_id>
tts jobs
tts unload
tts models
tts voices
tts health
```

- `-o` 必須為絕對路徑，並依副檔名決定輸出格式。
- 若目標檔案已存在會回報錯誤，除非加上 `--overwrite`。
- `tts clips FILE` 接受例如 `[{"id": "s01", "text": "..."}]` 的 JSON 陣列，為每段片段寫出一個檔案。
- `tts sfx` 需要以 `-s` 指定秒數，上限為 30。

| 結束代碼 | 意義 |
| --- | --- |
| 0 | 完成 |
| 1 | 錯誤 |
| 2 | 用法錯誤 |
| 3 | 使用 `--no-wait` 或逾時後仍在處理中，工作會繼續在背景執行 |
| 4 | 多片段工作結束，但部分片段失敗或未寫入 |

## MCP 工具

| 工具 | 用途 |
| --- | --- |
| `generate_speech` | 從 `text` 產生單一音訊檔至絕對路徑 `output_path` |
| `get_speech_job` | 等待進行中的語音工作並寫出檔案 |
| `generate_speech_clips` | 在 `output_dir` 產生最多 100 個片段，每段一個檔案 |
| `get_speech_clips` | 等待多片段語音工作完成 |
| `generate_sound_effect` | 依 `prompt` 與 `seconds` 產生單一音效 |
| `get_sound_effect_job` | 等待音效工作完成 |
| `generate_sound_effect_clips` | 產生最多 100 個音效，每個一個檔案 |
| `get_sound_effect_clips` | 等待多片段音效工作完成 |
| `cancel_speech_job` | 取消語音或音效工作 |
| `list_speech_jobs` | 列出服務仍保留紀錄的工作，以便找回遺失的 `job_id` |
| `unload_model` | 卸載目前載入的模型以釋放 VRAM |
| `register_voice` | 以 3 至 30 秒的參考錄音註冊人聲 |
| `list_models`, `list_voices`, `tts_status` | 唯讀查詢 |

單次呼叫預設等待 45 秒。長篇旁白會回傳 `status: "pending"` 與 `job_id` 及 `next` 欄位；請以這些參數呼叫 `next` 指定的工具，不要重送文字。

## 已知限制

- 語音模型偶爾會讀錯字或漏掉片段開頭幾個字。漏掉整句通常會觸發重試，但漏掉少數字詞不會被偵測到。若完整性很重要，請用 `scripts/asr_compare.py` 進行語音辨識比對並實際試聽。
- 當目標文字與人聲參考錄音的主題相近時，模型可能會說出參考錄音裡的字詞。請選用主題無關的參考錄音。
- 未指定 `voice` 時，單次呼叫內的聲音會保持一致，但不同呼叫之間會改變。請固定指定 `voice`，或在單次多片段工作中一次產生所有片段。
- 背景音樂與歌曲不在音效模型的適用範圍內。
