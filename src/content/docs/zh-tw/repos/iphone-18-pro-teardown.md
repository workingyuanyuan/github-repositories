---
title: iphone-18-pro-teardown
description: 用 3D 互動一層層拆解 iPhone 18 Pro 的教育用網頁。
repo: workingyuanyuan/iphone-18-pro-teardown
appliesTo: main 分支的 commit a2d020f。這個專案沒有任何已標記的發行版。
caveat: 專案沒有 LICENSE 檔案。規格來自 WekiHome 的單一拆解影片。3D 模型中的厚度與隱藏零件屬於推估值。
effectiveDate: 2026-11-17
lastVerified: 2026-11-18
sources:
  - title: README.md at commit a2d020f
    url: https://github.com/workingyuanyuan/iphone-18-pro-teardown/blob/a2d020fc5b41d78bb5478cf6ef43891e5774f7f6/README.md
---

## 事實

| 欄位 | 內容 |
| --- | --- |
| 類型 | 以 Vite、TypeScript 與 three.js 建置的靜態網頁應用程式 |
| 線上網站 | <https://workingyuanyuan.github.io/iphone-18-pro-teardown/> |
| 授權 | 沒有 LICENSE 檔案，GitHub 未偵測到授權 |
| 內容來源 | WekiHome 拆解影片，<https://youtu.be/BLKegH19KGI>，日期 2026-09-20 |
| 可拆卸零件 | 18 個，依拆解順序編號 |
| 部署 | 推送至 `main` 會透過 GitHub Actions 自動建置並部署 |
| 介面語言 | 繁體中文 |
| 發行版 | 無 |

## 開發

```bash
npm install
npm run dev
npm test
npm run build
```

| 指令 | 結果 |
| --- | --- |
| `npm run dev` | 於 `http://localhost:5173` 啟動開發伺服器 |
| `npm test` | 執行組裝邏輯與零件資料的單元測試 |
| `npm run build` | 型別檢查後在 `dist/` 產生可由任何靜態空間代管的靜態網站 |
| `npm run build:models` | 透過 Blender 腳本依量測資料重新產生 3D 模型 |

## 功能

- 附帶層級限制的自由拆解：只有外露的零件可以拆下，被阻擋的零件會顯示擋住它的零件。
- 重新組裝，支援復原與「全部裝回」。
- 依影片順序進行的引導「下一步」模式。
- 攝影機：自由環繞、四個預設視角、零件特寫、X 光模式與爆炸圖滑桿。
- 零件卡包含白話說明、規格與拆解看點，每項皆連結至影片對應時間戳記。
- 鍵盤快捷鍵：Esc 離開、Delete 拆下、Ctrl+Z 復原、N 前往下一步。

## 目錄結構

```text
src/
  core/        Pure logic, no three.js dependency, unit tested
  engine/      three.js stage, viewer and tweening
  builders/    Shared procedural geometry, materials and canvas textures
  data/phones/iphone-18-pro/   Part list, guide order and model loading
  ui/          DOM interface and controllers
```

## 資料準確性

- 規格與知識點均取自拆解影片並附帶時間戳記。
- 3D 模型外觀依據 Apple 官方尺寸圖繪製，內部零件則由拆解畫面量測推算。
- 量測來源記載於專案內的 `docs/measurements.md`，誤差表記載於 `docs/deviation.md`。
