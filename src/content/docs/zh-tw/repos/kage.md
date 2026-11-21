---
title: Kage
description: 把需求排版成暗色、僅供螢幕閱讀的 HTML 文件的 agent skill。
repo: workingyuanyuan/Kage
appliesTo: main 分支的 commit d5fb072。這個專案沒有任何已標記的發行版。
caveat: 產出只有供螢幕閱讀的 HTML。SKILL.md 寫明原生 Office 檔、PDF 與淺色設計需要其他交付方式。截圖與像素檢查需要 Chrome 或 Edge。
effectiveDate: 2026-09-12
lastVerified: 2026-11-18
sources:
  - title: README.md at commit d5fb072
    url: https://github.com/workingyuanyuan/Kage/blob/d5fb0729e3a5728a7332fb9367632fedc24952f2/README.md
  - title: SKILL.md at commit d5fb072
    url: https://github.com/workingyuanyuan/Kage/blob/d5fb0729e3a5728a7332fb9367632fedc24952f2/SKILL.md
  - title: LICENSE at commit d5fb072
    url: https://github.com/workingyuanyuan/Kage/blob/d5fb0729e3a5728a7332fb9367632fedc24952f2/LICENSE
---

## 事實

| 欄位 | 內容 |
| --- | --- |
| 類型 | Agent skill。入口檔是 `SKILL.md`，skill 名稱為 `kage` |
| 授權 | MIT。內附字型採 OFL 授權 |
| 執行環境 | Node.js，沒有任何外部相依套件。專案內沒有 `package.json` |
| 瀏覽器 | Chrome 或 Edge，用於截圖與像素檢查 |
| 文件類型 | 8 種：`one-pager`、`long-doc`、`letter`、`portfolio`、`changelog`、`equity-report`、`slides`、`landing-page` |
| 語言 | 繁體中文（`assets/templates/<type>.html`）與英文（`assets/templates/<type>-en.html`），共 16 個模板 |
| 發行版 | 無 |
| 展示頁 | <https://yuanaruru.com/Kage/index-en.html> |

## 安裝

```bash
git clone https://github.com/workingyuanyuan/Kage.git
```

接著把 clone 下來的資料夾移到你的 agent 的 skill 路徑。Agent 會先讀 `SKILL.md`，需要時再開啟其他規格與模板。README 沒有指定特定的 skill 路徑。

如果找不到 Chrome 或 Edge，把環境變數 `KAGE_CHROME` 設為瀏覽器執行檔的路徑。

## 使用

向 agent 指定 Kage，或要求暗色類比風格的 HTML 排版，並說明文件的用途。Agent 會依需求選擇模板、語言與篇幅。

```text
Turn these meeting notes into a one-pager for my manager
```

| 你想要的 | 可以這樣說 |
| --- | --- |
| 一頁的提案或摘要 | 「幫我寫一份提案，只要一頁」 |
| 白皮書或技術文件 | 「把這個整理成長篇技術文件」 |
| 正式書信 | 「起草一份正式通知」 |
| 作品集或案例研究 | 「用這三個專案做一份作品集」 |
| 版本更新說明 | 「把這幾次發行整理成正式的更新說明」 |
| 個股報告或投資備忘錄 | 「寫一份個股報告，包含目標價與風險」 |
| 簡報 | 「做一份簡報，大約五頁」 |
| 產品落地頁 | 「做一個產品頁，包含定價與常見問題」 |
| 英文產出 | 用英文提出需求，或指定英文 |

## 檢查指令

README 列出以下指令，各自的適用範圍記載在專案內的 `references/production.md`。

```bash
node scripts/kage.mjs check
node scripts/kage.mjs content <type> <draft.json>
node scripts/kage.mjs placeholders <finished>
node scripts/kage.mjs shot <file.html> --widths 1280,375
node scripts/kage.mjs shot <file.html> --bg-only
node scripts/kage.mjs bg <background.png>
```

| 指令 | 檢查內容 |
| --- | --- |
| `check` | 共用 CSS 區塊、色彩 token、模板 lint、內容契約 |
| `content` | 結構化草稿的結構與長度上限 |
| `placeholders` | 殘留的 `{{}}` 佔位符與標記的資料缺口 |
| `shot` | 依指定寬度截圖。`--frames` 會每個畫面或每張投影片輸出一張 |
| `bg` | 背景層的八項像素檢查 |

## 限制

- 展示文件中的公司、人物與數字全部是虛構的。
- 缺少必要素材時，工作文件會標記為 `[需要資料：…]`。
- 第二種語氣模式「develop」只有在指名要求時才會使用。
- README 註明架構參考自 tw93 的 [Kami](https://github.com/tw93/kami)：把文件排版做成 agent skill 來發布。

## 相關

- [obsidian-kage-theme](/zh-tw/repos/obsidian-kage-theme/) 把同一套視覺語言套用到 Obsidian。
