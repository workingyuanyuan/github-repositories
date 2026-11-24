---
title: shinsekai-antigravity-bridge
description: Local OpenAI-compatible server that lets Shinsekai use the logged-in Antigravity CLI without an API key.
repo: workingyuanyuan/shinsekai-antigravity-bridge
appliesTo: Commit 0461c0c on branch main. Windows, with the Antigravity CLI agy installed and logged in.
caveat: Each reply takes about 10 to 20 seconds, because every agy call carries an agent prompt of about 20k tokens. Turn off all tool sets and plugins in Shinsekai. The README says MIT License, but the repository has no LICENSE file.
effectiveDate: 2026-09-08
lastVerified: 2026-11-18
sources:
  - title: README.md at commit 0461c0c
    url: https://github.com/workingyuanyuan/shinsekai-antigravity-bridge/blob/0461c0c7ecb5d01598a2d3f6646bafbcdf58d7d4/README.md
---

## Facts

| Field | Value |
| --- | --- |
| Kind | Local OpenAI-compatible bridge server in Python, for [Shinsekai](https://github.com/RachelForster/Shinsekai) |
| License | The README says MIT License. The repository has no LICENSE file, and GitHub detects no license |
| Requires | Antigravity CLI `agy` on PATH, logged in to a Google account |
| Listens on | `http://127.0.0.1:8000` |
| Default model | `gemini-3.8-flash-low` |
| Launcher | `start_bridge.bat`, a Windows batch file |
| Releases | None |

## Install

Check that `agy` works first:

```bash
agy --version
```

Then copy these files from this repository into your Shinsekai folder:

```text
Shinsekai/
  start_bridge.bat
  tools/
    antigravity_bridge.py
    test_antigravity_bridge.py
```

`test_antigravity_bridge.py` is optional.

## Start

Double-click `start_bridge.bat`. The bridge is ready when the console shows:

```text
[INFO] [AntigravityBridge] Starting Antigravity Bridge on http://127.0.0.1:8000 (Default Model: gemini-3.8-flash-low)
```

## Configure Shinsekai

| Setting | Value |
| --- | --- |
| LLM provider | `ChatGPT` or `Ollama` |
| Base URL | `http://127.0.0.1:8000/v1` |
| API Key | `none`, or any characters |
| Model name | Any of the [models](#models) |

## Models

- `antigravity-local`, the default alias
- `gemini-3.8-flash-low`, recommended and the default
- `gemini-3.8-flash-medium`
- `gemini-3.8-flash-high`
- `gemini-3.7-flash-medium`
- `gemini-3.7-flash-low`
- `gemini-3.7-flash-high`
- `gemini-3.6-flash-medium`
- `gemini-3.1-pro-high`
- `claude-sonnet-4-6`
- `claude-opus-4-6-thinking`

## How it behaves

- It reuses the Google account login and model quota of the local machine, so no API key is needed.
- It injects a dialogue schema so that replies match the format Shinsekai's parser expects.
- It sends replies as a pseudo-stream, which works with Shinsekai's live TTS and Live2D lip sync.
- It runs `agy` in a separate empty directory with the restricted terminal sandbox turned on.
- When a conversation is closed or the connection drops, it kills the underlying `agy` child process tree.
