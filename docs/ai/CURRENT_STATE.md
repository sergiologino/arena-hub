# Current State

## Статус: Production (MVP)

## Что работает
- Главная страница Hub с навигацией по трём инструментам
- RoastPage.ai: ввод URL → AI-анализ → отчёт с 8 категориями → share-страница
- ShipChecklist.ai: ввод URL → AI-аудит → отчёт с 10 категориями → share-страница
- PaywallAudit.ai: ввод URL → AI-анализ → отчёт с 10 категориями → share-страница
- Оплата USDT (Polygon) через PaymentModal + верификация tx_hash
- Промо-коды (LAUNCH2025, PRODUCTHUNT, FRIEND и др.)
- OG-image генерация (/api/og)
- SEO: robots.ts, sitemap.ts, JSON-LD, OpenGraph/Twitter meta
- История отчётов (/history)
- Healthcheck endpoint (/api/health)
- Dark theme UI (glass-morphism стиль)

## Env-переменные (required)
- `OPENAI_API_KEY` — ключ OpenAI
- `SUPABASE_URL` — URL Supabase проекта
- `SUPABASE_ANON_KEY` — анонимный ключ Supabase
- `USDT_WALLET_ADDRESS` — адрес кошелька для приёма платежей (server)
- `NEXT_PUBLIC_USDT_WALLET` — адрес кошелька (client)

## Известные особенности
- Промо-коды хранятся в памяти процесса (promoUsage) — при рестарте сбрасываются
- PaywallAudit: model всегда `gpt-4o` (нет разницы free/pro по модели, только по промпту)
- Supabase RLS: полный anon-доступ (no auth)

## Деплой
- Vercel (auto-deploy из master)
- URL: https://arena-hub.vercel.app
