---
title: Pixel-Kitten-Town-Class
description: 離線的課堂獎勵網頁，每位學生是一隻會累積分數並升級的貓。
repo: workingyuanyuan/Pixel-Kitten-Town-Class
appliesTo: master 分支的 commit b097645。這個專案沒有任何已標記的發行版。
caveat: 需要 Chrome 或 Edge，因為存檔使用 Firefox 與 Safari 所缺乏的 File System Access API。啟動器需要已安裝 Python。專案沒有 LICENSE 檔案，內附美術素材另有各自的使用條款。
effectiveDate: 2026-11-03
lastVerified: 2026-11-18
sources:
  - title: README.md at commit b097645
    url: https://github.com/workingyuanyuan/Pixel-Kitten-Town-Class/blob/b097645ba0e7ffbb50d03d46e95741c9ad0c41ed/README.md
---

## 事實

| 欄位 | 內容 |
| --- | --- |
| 類型 | 純 JavaScript 靜態網頁，由執行小型本機網頁伺服器的 Windows 批次檔啟動 |
| 介面名稱 | 貓咪小鎮 |
| 線上託管版本 | <https://workingyuanyuan.github.io/Pixel-Kitten-Town-Class/> |
| 授權 | 沒有 LICENSE 檔案，GitHub 未偵測到授權。README 稱其為非商業教學工具 |
| 需求 | Chrome 或 Edge。啟動器 `啟動.bat` 為 Windows 批次檔，需要 PATH 中有 Python |
| 連接埠 | 預設 8173；若被佔用會往上嘗試至 8200 |
| 資料 | 位於 `data` 資料夾的 JSON 檔案，每個班級一個檔案 |
| 介面語言 | 繁體中文 |
| 發行版 | 無 |

## 啟動

1. 在專案資料夾中雙擊 `啟動.bat`，系統會開啟主控台視窗並在瀏覽器顯示小鎮。
2. 點擊連結資料夾按鈕並選擇專案內的 `data` 資料夾本身，接著允許 Chrome 編輯檔案。
3. 點擊一隻貓咪，再按側邊欄的 `+1` 按鈕，或按 Enter、Space。單純點擊貓咪不會改變分數。
4. 關閉主控台視窗即可停止。分數會自動儲存。

在連結 `data` 資料夾之前，頁面處於唯讀狀態，不會儲存任何分數。

## 匯入班級名單

將學生姓名放進 `tools/names.txt`，接著執行：

```bash
python tools/import_roster.py
```

細節記載於專案內的 `AGENT-名單匯入.md`。若沒有提供名單，頁面會建立一個以座號與零分組成的預設佔位班級。

若要新增班級，在 `data` 中建立另一個 JSON 檔案：

```bash
python tools/import_roster.py --class-id <class-id>
```

## 計分規則

| 規則 | 內容 |
| --- | --- |
| 每學期上限 | 30 分 |
| 每級所需分數 | 3 |
| 最高等級 | 10 |
| 檔案內儲存項目 | 僅分數，等級為計算得出 |

達到 30 分時獎勵按鈕會停用。除了復原之外沒有扣分功能。

## 存檔與備份

- 每次給予獎勵約 1 秒後存檔，因此快速連續獎勵只會寫入一次。
- 每天首次存檔時，會把前一份檔案內容複製到 `data/backups/`，最多保留最近 30 份。
- 若班級檔案無法解析，頁面會顯示紅色橫幅並拒絕寫入。請用文字編輯器修正檔案後，按工具列的重新載入按鈕。

## 工具

```bash
python tools/import_roster.py
python tools/export_grades.py
node tools/test-model.js
```

| 工具 | 用途 |
| --- | --- |
| `import_roster.py` | 將純文字姓名清單轉為班級 JSON 檔 |
| `export_grades.py` | 輸出期末成績用的 `data/export-YYYY-MM-DD.csv` |
| `test-model.js` | 測試積分與等級計算邏輯 |

標題、分數門檻與地圖大小等設定位於 `js/config.js`。

## 刻意不加入的功能

- 無排行榜或排名。
- 無音效。
- 無學生登入與網路連線，分數僅存在於老師電腦的檔案中。
- 進度條絕不使用紅色。

## 素材授權

| 用途 | 素材包 | 作者 |
| --- | --- | --- |
| 貓咪動畫 | Animated Pixel Kittens / Cats 32x32 | Last tick |
| 地圖與場景 | Pixel Art Top Down - Basic | Cainos |

色票參考了 Cup Nooble 的 Sprout Lands UI Pack，但專案內不含該素材包的任何檔案。完整致謝清單記載於專案內的 `CREDITS.md`。
