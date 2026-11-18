---
title: obsidian-kage-theme
description: Obsidian 主題，有暗色與紙張兩種模式，在社群主題中名為 Kage。
repo: workingyuanyuan/obsidian-kage-theme
appliesTo: 發行版 1.0.4，main 分支的 commit 2cbc371
caveat: 安裝程式版本必須是 1.4.5 以上，否則螢光標記的背景會變成透明。Obsidian 的強調色選擇器對這個主題沒有作用，這是刻意的設計。
effectiveDate: 2026-08-09
lastVerified: 2026-11-18
sources:
  - title: README.md at commit 2cbc371
    url: https://github.com/workingyuanyuan/obsidian-kage-theme/blob/2cbc371a46a04c2170b53215066415fdfacc0e17/README.md
  - title: manifest.json at commit 2cbc371
    url: https://github.com/workingyuanyuan/obsidian-kage-theme/blob/2cbc371a46a04c2170b53215066415fdfacc0e17/manifest.json
  - title: Release 1.0.4
    url: https://github.com/workingyuanyuan/obsidian-kage-theme/releases/tag/1.0.4
  - title: Obsidian community theme list
    url: https://github.com/obsidianmd/obsidian-releases/blob/master/community-css-themes.json
---

## 事實

| 欄位 | 內容 |
| --- | --- |
| 類型 | Obsidian 主題，在社群主題中以 `Kage` 之名收錄 |
| 授權 | MIT |
| 最新發行版 | 1.0.4，發布於 2026-08-09 |
| 發行檔案 | `manifest.json`、`theme.css` |
| Obsidian 最低版本 | 1.5.0，出自 `manifest.json` |
| 安裝程式最低版本 | 1.4.5 |
| 模式 | 暗色（預設）與紙張，紙張即淺色模式 |
| 選用外掛 | [Style Settings](https://github.com/mgmeyers/obsidian-style-settings) |

## 從社群主題安裝

在 Obsidian 開啟設定，依序進入外觀、主題、管理，搜尋 `Kage`。

## 手動安裝

把發行版中的 `theme.css` 與 `manifest.json` 放進下面的資料夾，再到設定、外觀、主題選擇 Kage。資料夾名稱必須剛好是 `Kage`。

```text
<vault>/.obsidian/themes/Kage/
```

在 Linux 或 macOS 上，假設已把 1.0.4 發行版的兩個檔案下載到目前目錄：

```bash
mkdir -p "<vault>/.obsidian/themes/Kage"
cp theme.css manifest.json "<vault>/.obsidian/themes/Kage/"
```

## 需求與已知問題

- Obsidian 1.5.0 以上。
- 安裝程式版本 1.4.5 以上。可在設定、關於、Installer version 查看。
- 安裝程式較舊時，內建的瀏覽器引擎不認得主題使用的混色語法，螢光標記的背景會變成透明。重新下載並執行 Obsidian 安裝程式即可解決，不會動到 vault。

## 模式

紙張模式跟隨 Obsidian 本身的 Base color scheme 設定，可為 Light、Dark 或 System。主題沒有另外的切換開關。

## Style Settings

安裝 Style Settings 外掛後可以調整下列項目。沒有安裝外掛時，主題以預設值運作。

| 設定 | 預設值 | 其他選項 |
| --- | --- | --- |
| Composition strength（漏光或泛黃的強度） | C, reading | A narrative、B structural |
| Grain strength（顆粒強度） | 0.10 | 0.085、0.12 |
| Composition line（構圖線） | on | off |
| Composition shape（構圖形狀） | arc | thin line |
| Full three lines on note pages（筆記頁顯示完整三條線） | off | on |
| Scratches（刮痕） | off | on |
| Dust（灰塵） | off | on |

## 限制

- 主題只使用一個強調色家族。外觀設定裡的強調色色盤沒有作用。
- 設計語言、色彩 token、顆粒素材與部分量測程式碼移植自同一作者的 kage-visual-kit（MIT 授權），細節記載在專案內的 `NOTICE.md`。

## 相關

- [Kage](/zh-tw/repos/kage/) 是以同一套視覺語言產出 HTML 文件的 agent skill。
