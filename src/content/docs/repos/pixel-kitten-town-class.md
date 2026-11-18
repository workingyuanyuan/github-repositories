---
title: Pixel-Kitten-Town-Class
description: Offline classroom reward page where each student is a cat that gains points and levels.
repo: workingyuanyuan/Pixel-Kitten-Town-Class
appliesTo: Commit b097645 on branch master. The repository has no tagged release.
caveat: It needs Chrome or Edge, because saving uses the File System Access API that Firefox and Safari lack. Python must be installed for the launcher. The repository has no LICENSE file, and the bundled art has its own terms.
effectiveDate: 2026-11-03
lastVerified: 2026-11-18
sources:
  - title: README.md at commit b097645
    url: https://github.com/workingyuanyuan/Pixel-Kitten-Town-Class/blob/b097645ba0e7ffbb50d03d46e95741c9ad0c41ed/README.md
---

## Facts

| Field | Value |
| --- | --- |
| Kind | Static web page in plain JavaScript, started by a Windows batch file that runs a small local web server |
| Name in the interface | 貓咪小鎮, "Kitten Town" |
| Hosted copy | <https://workingyuanyuan.github.io/Pixel-Kitten-Town-Class/> |
| License | No LICENSE file. GitHub detects no license. The README calls it a non-commercial teaching tool |
| Requires | Chrome or Edge. The launcher `啟動.bat` is a Windows batch file and needs Python on PATH |
| Port | 8173 by default. If taken, it tries higher ports up to 8200 |
| Data | JSON files in the `data` folder, one file per class |
| Interface language | Traditional Chinese |
| Releases | None |

## Start

1. Double-click `啟動.bat` in the project folder. A console window opens and the browser shows the town.
2. Click the connect-folder button and choose the project's `data` folder itself, then allow Chrome to edit files.
3. Click a cat, then press the `+1` button in the side panel, or press Enter or Space. Clicking the cat alone never changes a score.
4. Close the console window to stop. Scores are saved automatically.

Until the `data` folder is connected, the page is read-only and no score is saved.

## Import a class list

Put the student names in `tools/names.txt`, then run:

```bash
python tools/import_roster.py
```

Details are in `AGENT-名單匯入.md` in the repository. Without a list, the page creates a placeholder class with seat numbers and zero points.

To add a class, create another JSON file in `data`:

```bash
python tools/import_roster.py --class-id <class-id>
```

## Scoring

| Rule | Value |
| --- | --- |
| Maximum per term | 30 points |
| Points per level | 3 |
| Highest level | 10 |
| Stored in the file | Points only. Levels are computed |

At 30 points the reward button is disabled. There is no way to subtract points other than undo.

## Saving and backups

- A save happens about 1 second after a reward, so quick repeated rewards cause one save.
- On the first save of each day, the previous file content is copied to `data/backups/`. The last 30 copies are kept.
- If a class file cannot be parsed, the page shows a red banner and refuses to write. Fix the file in a text editor, then press the reload button in the toolbar.

## Tools

```bash
python tools/import_roster.py
python tools/export_grades.py
node tools/test-model.js
```

| Tool | Purpose |
| --- | --- |
| `import_roster.py` | Turns a plain-text name list into a class JSON file |
| `export_grades.py` | Writes `data/export-YYYY-MM-DD.csv` for end-of-term grades |
| `test-model.js` | Tests the point and level calculation |

Settings such as the title, point thresholds and map size are in `js/config.js`.

## Left out on purpose

- No leaderboard or ranking.
- No sound.
- No student login and no network connection. Scores exist only in files on the teacher's computer.
- The progress bar never uses red.

## Asset credits

| Use | Pack | Author |
| --- | --- | --- |
| Cat animation | Animated Pixel Kittens / Cats 32x32 | Last tick |
| Map and scenery | Pixel Art Top Down - Basic | Cainos |

The colour palette refers to the Sprout Lands UI Pack by Cup Nooble, but the repository contains no file from that pack. Full credits are in `CREDITS.md` in the repository.
