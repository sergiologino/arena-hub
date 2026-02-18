# Architecture

## Тип проекта
Монолитное Next.js 14 приложение (App Router). Один frontend-сервис, без отдельного backend.

## Стек
- **Framework**: Next.js 14.2 (App Router, React 18)
- **Language**: TypeScript 5.7
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion 11
- **Icons**: Lucide React
- **DB**: Supabase (PostgreSQL + Row Level Security)
- **AI**: OpenAI GPT-4o / GPT-4o-mini (через REST API напрямую)
- **Screenshots**: thum.io (внешний сервис)
- **Payments**: USDT на Polygon (ручная верификация tx_hash)
- **ID Generation**: nanoid
- **Notifications**: Sonner (toast)
- **Testing**: Vitest
- **Deploy**: Vercel

## Структура каталогов
```
src/
├── app/
│   ├── page.tsx              # Hub landing (главная)
│   ├── layout.tsx            # Root layout + metadata + JSON-LD
│   ├── globals.css           # Tailwind + custom styles
│   ├── robots.ts / sitemap.ts
│   ├── roast/                # RoastPage.ai (form + report + share)
│   ├── ship/                 # ShipChecklist.ai (form + report + share)
│   ├── paywall/              # PaywallAudit.ai (form + report + share)
│   ├── history/              # Общая история отчётов
│   └── api/
│       ├── roast/route.ts    # POST — запуск roast-анализа
│       ├── check/route.ts    # POST — запуск ship-аудита
│       ├── paywall-check/route.ts  # POST — запуск paywall-аудита
│       ├── report/[id]/route.ts    # GET — получить отчёт по ID
│       ├── payment/verify/route.ts # POST — верификация платежа
│       ├── health/route.ts         # GET — healthcheck
│       └── og/route.tsx            # GET — OG-image генерация
├── components/
│   ├── roast/CategoryCard.tsx
│   ├── ship/CheckCategoryCard.tsx
│   ├── paywall/PaywallCategoryCard.tsx
│   └── shared/               # LoadingAnimation, ShareButtons, PaymentModal, ScoreCircle
└── lib/
    ├── types.ts              # Все TypeScript-интерфейсы
    ├── store.ts              # Data access layer (Supabase CRUD)
    ├── supabase.ts           # Supabase client singleton
    ├── utils.ts              # Утилиты (isValidUrl и пр.)
    └── prompts/              # System prompts для каждого инструмента
        ├── roast.ts
        ├── ship.ts
        └── paywall.ts
```

## Потоки данных
1. Пользователь вводит URL → POST API route
2. API route: проверяет URL → делает screenshot (thum.io) + парсит HTML-текст → отправляет GPT-4o
3. GPT-4o возвращает JSON → API сохраняет в Supabase → возвращает report ID
4. Клиент переходит на /[tool]/report/[id] → загружает отчёт из Supabase
5. Для full-отчёта: PaymentModal → пользователь платит USDT → /api/payment/verify → разблокировка

## Таблицы Supabase
- `reports` — Roast-отчёты
- `payments` — Roast-платежи
- `ship_reports` — Ship-отчёты
- `ship_payments` — Ship-платежи
- `paywall_reports` — Paywall-отчёты
- `paywall_payments` — Paywall-платежи

Все таблицы с RLS, anon-ключ имеет полный доступ (SELECT, INSERT, UPDATE).
