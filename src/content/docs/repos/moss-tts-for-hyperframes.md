---
title: Moss-TTS-for-HyperFrames
description: Node.js CLI and agent skill that produces narration WAV files through the Moss cloud speech API.
repo: workingyuanyuan/Moss-TTS-for-HyperFrames
appliesTo: Commit 1dd5c44 on branch main, package version 1.0.0. Node.js 22 or newer.
caveat: It calls a cloud API and needs an account key in MOSS_API_KEY. The skill is used only when the user names Moss explicitly. Speech speed other than 1x is an error, and requests are not retried. The repository has no LICENSE file.
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

## Facts

| Field | Value |
| --- | --- |
| Kind | Node.js CLI and agent skill. Skill name `moss-tts`, package name `moss-tts-skill` |
| License | No LICENSE file. GitHub detects no license |
| Version | 1.0.0, from `package.json` |
| Requires | Node.js 22 or newer. No third-party npm dependencies |
| API endpoint | `https://api.mosi.cn`, fixed |
| Credentials | Environment variable `MOSS_API_KEY`. Optional `MOSS_VOICE_ID` |
| Output | A standalone WAV file and a metadata file `<wav>.json` with paths relative to the metadata file |
| Releases | None |

This is a different project from [local-tts-sfx](/repos/local-tts-sfx/), which runs the MOSS-TTS model on a local GPU.

## Use the CLI

Set `MOSS_API_KEY` in the current shell or a secret manager. Do not write the key into the repository.

```powershell
node scripts/moss-tts.mjs voices --provider moss
node scripts/moss-tts.mjs synth --provider moss --text '這是一段旁白。' --voice '<account-voice-id>' --out narration.wav
node scripts/moss-tts.mjs synth --provider moss --text-file narration.txt --voice '<account-voice-id>' --out narration.wav --force
```

| Option | Purpose |
| --- | --- |
| `--voice` | Voice ID of the account. `MOSS_VOICE_ID` can supply it instead |
| `--text-file` | Reads the script from a UTF-8 file |
| `--metadata` | Writes the metadata JSON to another path |
| `--force` | Overwrites an existing output |
| `--help`, `--version` | Shows all parameters, or the version |

Synchronous Flash and Pro WAV output are supported. General audio output has no subtitle timestamps.

## HyperFrames

The HyperFrames bridge connects through `HF_MEDIA_ENGINE`. The launcher is described in `references/hyperframes.md` in the repository. Subtitles need the HyperFrames CLI installed, because this package calls its public `transcribe` command. The general CLI does not need HyperFrames.

## Install into a project

The source repository is the maintenance base. Copy a committed version into a project as a release:

```powershell
node scripts/install.mjs --to 'path/to/project/.agents/skills/moss-tts'
node scripts/install.mjs --verify 'path/to/project/.agents/skills/moss-tts'
```

- The destination must be a new directory outside the source.
- The installer writes `INSTALLATION.json` with the version, source commit and the SHA-256 of every file.
- After installing, `node scripts/moss-tts.mjs --version` runs from the destination without the source repository.
- No `.codex` path is a supported install location.

## Test

```powershell
npm test
$env:HF_SKILLS_DIR = 'path/to/Hyperframes/.agents/skills'
npm run test:hyperframes
```

The tests use a locally synthesised WAV fixture and a mock fetch, so they need no account credentials. Real recognition quality and Moss audio quality are not covered by the tests.
