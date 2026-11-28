---
title: instagram-linkedin-carousel-skill
description: 把長文做成 Instagram 或 LinkedIn 輪播圖的 agent skill，可匯出 PNG 與 PDF。
repo: workingyuanyuan/instagram-linkedin-carousel-skill
appliesTo: main 分支的 commit 6b03630。這個專案沒有任何已標記的發行版。
caveat: 只有在明確取得使用者核准投影片文案後才會開始算圖。需要 Node.js 20 以上、npm 與相容 Chromium 的瀏覽器。專案沒有 LICENSE 檔案。
effectiveDate: 2026-09-12
lastVerified: 2026-11-18
sources:
  - title: README.md at commit 6b03630
    url: https://github.com/workingyuanyuan/instagram-linkedin-carousel-skill/blob/6b036305cf4b38f4ae04b2fdc273cde0468ee86a/README.md
  - title: SKILL.md at commit 6b03630
    url: https://github.com/workingyuanyuan/instagram-linkedin-carousel-skill/blob/6b036305cf4b38f4ae04b2fdc273cde0468ee86a/SKILL.md
---

## 事實

| 欄位 | 內容 |
| --- | --- |
| 類型 | Agent skill。入口檔是 `SKILL.md`，skill 名稱為 `instagram-linkedin-carousel` |
| 授權 | 沒有 LICENSE 檔案，GitHub 未偵測到授權 |
| 需求 | Node.js 20 以上、npm、相容 Chromium 的瀏覽器 |
| 輸入 | 純文字長文 |
| 輸出 | 從瀏覽器預覽匯出的 PNG 與 PDF。展示圖片尺寸為 1080 × 1350 |
| 頁面類型 | 5 種：Cover、Editorial、Process、List、Conclusion |
| 版面質感 | Dark 或 Paper、三種顆粒程度、一組固定的橘棕色強調色票 |
| 展示範例語言 | 英文與中文 |
| 發行版 | 無 |

## 使用

呼叫 `$instagram-linkedin-carousel` 並提供：

```text
Platform: Instagram or LinkedIn
Goals: ...
Audience: ...
Brand Voice: ...

[paste the complete source text]
```

接著要求產出大綱、文案草稿、預覽或匯出檔案。

| 輸入項目 | 是否必填 |
| --- | --- |
| 平台 | 是：Instagram 或 LinkedIn |
| 原始長文 | 是，需完整提供 |
| 目標、受眾 | 可從需求推斷 |
| 品牌語調 | 選填 |

## 核准關卡

這個 skill 會先撰寫投影片文案。審閱並明確核准後，才會進行預覽與匯出。

## 安裝

這個專案本身就是根目錄帶有 `SKILL.md` 的 skill 資料夾，因此將 clone 下來的目錄放到 agent 載入 skill 的位置即可：

```bash
git clone https://github.com/workingyuanyuan/instagram-linkedin-carousel-skill.git
```

## 致謝

敘事框架參考 coreyhaines31 的 <https://github.com/coreyhaines31/marketingskills> 中的 `marketingskills/skills/social/references`。
