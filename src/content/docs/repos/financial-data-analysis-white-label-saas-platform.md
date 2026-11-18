---
title: financial-data-analysis-white-label-saas-platform
description: Next.js 14 prototype of a white-label B2B financial data product with subscriptions and e-invoices.
repo: workingyuanyuan/financial-data-analysis-white-label-saas-platform
appliesTo: Commit ff1db1a on branch main. The repository has no tagged release.
caveat: It is a prototype. Without Stripe or ECPay settings, the payment button uses a prototype fallback and calls no external payment service. Real-time quotes over WebSocket are a planned architecture, not a running feature. The repository has no LICENSE file.
effectiveDate: 2026-06-26
lastVerified: 2026-11-18
sources:
  - title: README.md at commit ff1db1a
    url: https://github.com/workingyuanyuan/financial-data-analysis-white-label-saas-platform/blob/ff1db1af67a4b2b9a8ae91acb687ac64b7b6d2bb/README.md
---

## Facts

| Field | Value |
| --- | --- |
| Kind | Next.js 14 web application prototype, with Prisma and PostgreSQL |
| License | No LICENSE file. GitHub detects no license |
| Package manager | pnpm |
| Database | PostgreSQL, through `DATABASE_URL` |
| Authentication | NextAuth |
| Payments | Stripe Checkout and webhooks |
| E-invoices | `mock` locally, ECPay for production in Taiwan |
| Charts | TradingView Lightweight Charts |
| Releases | None |

## Run locally

```bash
pnpm install
cp .env.example .env
pnpm db:push
pnpm db:seed
pnpm dev
```

Then open `http://localhost:3000`.

| Step | What it does |
| --- | --- |
| `pnpm install` | Installs dependencies |
| `cp .env.example .env` | Creates the environment file |
| `pnpm db:push`, `pnpm db:seed` | Creates the database schema and demo data |
| `pnpm dev` | Starts the local development server |

## Demo account

Available after `pnpm db:seed`:

| Field | Value |
| --- | --- |
| Email | `demo@quantora.test` |
| Password | `demo-password` |

## Environment variables

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Signing secret for NextAuth JWTs |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | Stripe Checkout and webhook signature check |
| `STRIPE_PRICE_*` | Stripe Price ID for each plan and billing period |
| `INVOICE_PROVIDER` | `mock` locally, `ecpay` for production in Taiwan |
| `ECPAY_*` | ECPay e-invoice signing and API settings |
| `NEXT_PUBLIC_QUOTE_WS_URL` | Future WebSocket gateway for real-time quotes |

The full list is in `.env.example` in the repository.

## Deploy on Vercel

- Add every environment variable in the Vercel project settings.
- Point the Stripe webhook at `/api/webhooks/stripe` and set `STRIPE_WEBHOOK_SECRET` to the value Stripe generates.
- Vercel Serverless does not suit long-lived WebSocket connections. Use a separate gateway for real-time quotes.
- The production build runs `prisma generate` first. Manage schema migrations in CI/CD or the release process.
