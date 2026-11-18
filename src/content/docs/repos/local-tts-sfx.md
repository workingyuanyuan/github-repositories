---
title: local-tts-sfx
description: Local GPU service that gives coding agents narration speech and sound effects through MCP, CLI or HTTP.
repo: workingyuanyuan/local-tts-sfx
appliesTo: Commit 46e6e54 on branch main. Linux x86_64, native or WSL2, with an NVIDIA GPU. The repository has no tagged release.
caveat: Tested in full only on an RTX 5090 Laptop with 24 GB under WSL2. It needs about 16.5 GiB of model weights, and a GPU with bf16 support. The service binds to 127.0.0.1 without authentication, so do not expose the port.
effectiveDate: 2026-11-17
lastVerified: 2026-11-18
sources:
  - title: README.md at commit 46e6e54
    url: https://github.com/workingyuanyuan/local-tts-sfx/blob/46e6e54ea39a3139ff9801c10f2adc70ab88d401/README.md
  - title: LICENSE at commit 46e6e54
    url: https://github.com/workingyuanyuan/local-tts-sfx/blob/46e6e54ea39a3139ff9801c10f2adc70ab88d401/LICENSE
---

## Facts

| Field | Value |
| --- | --- |
| Kind | Local text-to-speech and sound-effect service for coding agents such as Claude Code and Codex |
| License | Apache-2.0 |
| Speech model | MOSS-TTS-Local-Transformer-v1.5 |
| Sound-effect model | MOSS-SoundEffect v2.0, optional, at most 30 seconds per clip |
| Interfaces | MCP stdio server `tts-mcp`, command line `tts`, HTTP API partly compatible with OpenAI `/v1/audio/speech` |
| Default address | `127.0.0.1:8765` |
| Output formats | wav, flac, mp3 |
| Python | 3.12, environment built by `uv` from `uv.lock` |
| Repository name | The repository is `local-tts-sfx`. The README clones `workingyuanyuan/local-tts.git`; GitHub resolves that name to this repository |
| Releases | None |

## Requirements

| Item | Requirement |
| --- | --- |
| Operating system | Linux x86_64, native or WSL2. A systemd user service is recommended; without systemd the server runs in the foreground |
| GPU | NVIDIA GPU with bf16 support, Ampere or RTX 30 series or newer. 16 GB of VRAM or more is recommended. A 16 GB card was not tested |
| Driver | NVIDIA driver that supports CUDA 12.8, Linux 570 or newer. No separate CUDA Toolkit is needed |
| Disk | About 16.5 GiB of weights in `~/.cache/huggingface/`, and about 7.3 GiB for `.venv` |
| Tools | `git`, `ffmpeg`, `uv` |
| Sound effects, optional | About 11 GiB more weights and about 7.5 GiB for `workers/moss-sfx/.venv` |

## Install

Run every command from the project root.

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

| Step | What it does |
| --- | --- |
| `uv sync --frozen` | Builds `.venv` from `uv.lock` |
| `hf download` twice | Downloads the pinned model and codec weights |
| `scripts/install_service.sh` | Installs and starts the systemd user service |
| `ln -sfn` | Optional. Makes `tts` runnable from `~/.local/bin` |
| `claude mcp add`, `codex mcp add` | Registers the MCP server. Skip the agent you do not use |
| `scripts/install_agent_rules.sh` | Installs the `narration` and `sound-effects` skills for Claude Code and Codex |
| `tts health` | Confirms the service is running |

The project path must not contain spaces, `%`, quotes or backslashes.

## Install sound effects

The sound-effect model has its own environment because its package versions conflict with the service.

```bash
UV_HTTP_TIMEOUT=600 uv sync --frozen --project workers/moss-sfx
uvx --from huggingface_hub hf download OpenMOSS-Team/MOSS-SoundEffect-v2.0 --revision e35df4d82fbe87fcd5d14e5d100e349c0c3c076d
systemctl --user restart local-tts
```

Without the worker environment, sound-effect requests return 503 `sfx_worker_not_installed`, and speech still works.

## Run and stop

```bash
systemctl --user restart local-tts
systemctl --user stop local-tts
systemctl --user status local-tts
journalctl --user -u local-tts -f
curl -s localhost:8765/health
```

Without systemd, run the server in the foreground:

```bash
HF_HUB_OFFLINE=1 .venv/bin/tts-server
```

- The model loads on the first request, in about 10 to 20 seconds, and unloads after 10 minutes idle.
- The speech model and the sound-effect model are never loaded together. Switching takes tens of seconds, so generate all speech and all sound effects of a task in separate batches.
- The port can be changed in `config/server.yaml` or with `LOCAL_TTS_PORT`. Clients use `LOCAL_TTS_URL`.

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

- `-o` must be an absolute path. The file extension selects the format.
- An existing target is an error unless `--overwrite` is given.
- `tts clips FILE` takes a JSON array such as `[{"id": "s01", "text": "..."}]` and writes one file per clip.
- `tts sfx` requires `-s`, the length in seconds, at most 30.

| Exit code | Meaning |
| --- | --- |
| 0 | Done |
| 1 | Error |
| 2 | Usage error |
| 3 | Still processing, after `--no-wait` or a timeout. The job keeps running |
| 4 | A multi-clip job ended with some clips failed or not written |

## MCP tools

| Tool | Purpose |
| --- | --- |
| `generate_speech` | One audio file from `text` to an absolute `output_path` |
| `get_speech_job` | Waits for a pending speech job and writes the file |
| `generate_speech_clips` | Up to 100 clips, one file each, in `output_dir` |
| `get_speech_clips` | Waits for a multi-clip speech job |
| `generate_sound_effect` | One sound effect from `prompt` and `seconds` |
| `get_sound_effect_job` | Waits for a sound-effect job |
| `generate_sound_effect_clips` | Up to 100 sound effects, one file each |
| `get_sound_effect_clips` | Waits for a multi-clip sound-effect job |
| `cancel_speech_job` | Cancels a speech or sound-effect job |
| `list_speech_jobs` | Lists jobs the service still remembers, to recover a lost `job_id` |
| `unload_model` | Unloads the current model to free VRAM |
| `register_voice` | Registers a voice from a 3 to 30 second reference recording |
| `list_models`, `list_voices`, `tts_status` | Read-only queries |

A call waits 45 seconds by default. A long narration returns `status: "pending"` with a `job_id` and a `next` field; call the tool named in `next` with those arguments instead of sending the text again.

## Known limits

- The speech model sometimes misreads a word or drops the first few words of a clip. A dropped sentence usually triggers a retry, but a few missing words are not detected. When completeness matters, compare with speech recognition using `scripts/asr_compare.py` and listen.
- When the target text is close in topic to the reference recording of a voice, the model may speak words from the reference recording. Choose a reference recording on an unrelated topic.
- Without a `voice`, the voice stays the same inside one call and differs between calls. Fix a `voice`, or generate all clips in one multi-clip job.
- Background music and songs are outside the sound-effect model's scope.
