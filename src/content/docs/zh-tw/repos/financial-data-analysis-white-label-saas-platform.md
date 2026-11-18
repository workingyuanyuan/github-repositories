---
title: financial-data-analysis-white-label-saas-platform
description: B2B 財經數據白牌 SaaS 的 Next.js 14 原型，含訂閱金流與電子發票。
repo: workingyuanyuan/financial-data-analysis-white-label-saas-platform
appliesTo: main 分支的 commit ff1db1a。這個專案沒有任何已標記的發行版。
caveat: 這是一個原型。未設定 Stripe 或 ECPay 時，付款按鈕會走原型備援路徑，不會呼叫任何外部金流服務。透過 WebSocket 傳輸即時報價為規劃中的架構，尚未實作上線。專案沒有 LICENSE 檔案。
effectiveDate: 2026-06-26
lastVerified: 2026-11-18
sources:
  - title: README.md at commit ff1db1a
    url: https://github.com/workingyuanyuan/financial-data-analysis-white-label-saas-platform/blob/ff1db1af67a4b2b9a8ae91acb687ac64b7b6d2bb/README.md
---

## 事實

| 欄位 | 內容 |
| --- | --- |
| 類型 | 使用 Prisma 與 PostgreSQL 的 Next.js 14 網頁應用程式原型 |
| 授權 | 沒有 LICENSE 檔案，GitHub 未偵測到授權 |
| 套件管理器 | pnpm |
| 資料庫 | PostgreSQL，透過 `DATABASE_URL` 連線 |
| 身分驗證 | NextAuth |
| 金流 | Stripe Checkout 與 webhooks |
| 電子發票 | 本機為 `mock`，台灣正式環境為 ECPay |
| 圖表 | TradingView Lightweight Charts |
| 發行版 | 無 |

## 本機執行

```bash
pnpm install
cp .env.example .env
pnpm db:push
pnpm db:seed
pnpm dev
```

接著開啟 `http://localhost:3000`。

| 步驟 | 作用 |
| --- | --- |
| `pnpm install` | 安裝相依套件 |
| `cp .env.example .env` | 建立環境變數檔 |
| `pnpm db:push`, `pnpm db:seed` | 建立資料庫結構與展示資料 |
| `pnpm dev` | 啟動本機開發伺服器 |

## 展示帳號

執行 `pnpm db:seed` 後即可使用：

| 欄位 | 內容 |
| --- | --- |
| 電子郵件 | `demo@quantora.test` |
| 密碼 | `demo-password` |

## 環境變數

| 變數 | 用途 |
| --- | --- |
| `DATABASE_URL` | PostgreSQL 連線字串 |
| `NEXTAUTH_SECRET` | NextAuth JWT 的簽章密鑰 |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | Stripe Checkout 與 webhook 簽章驗證 |
| `STRIPE_PRICE_*` | 各方案與計費週期對應的 Stripe Price ID |
| `INVOICE_PROVIDER` | 本機為 `mock`，台灣正式環境為 `ecpay` |
| `ECPAY_*` | ECPay 電子發票簽章與 API 設定 |
| `NEXT_PUBLIC_QUOTE_WS_URL` | 未來供即時報價使用的 WebSocket 閘道 |

完整清單見專案內的 `.env.example`。

## 部署到 Vercel

- 在 Vercel 專案設定中加入所有環境變數。
- 將 Stripe webhook 指向 `/api/webhooks/stripe`，並把 `STRIPE_WEBHOOK_SECRET` 設為 Stripe 產生的值。
- Vercel Serverless 不適合長連線 WebSocket，即時報價請另設獨立閘道。
- 正式環境建置會先執行 `prisma generate`。資料庫結構遷移請交由 CI/CD 或發布流程管理。
