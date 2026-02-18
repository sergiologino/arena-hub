# Conventions

## Язык
- Код и комментарии: английский
- Документация docs/ai/: русский

## TypeScript
- Strict mode
- Интерфейсы предпочтительнее type aliases для объектов
- camelCase для переменных и функций, PascalCase для компонентов и типов
- snake_case для полей Supabase (маппинг в store.ts)

## React / Next.js
- App Router (не Pages)
- "use client" только при необходимости (hooks, interactivity)
- Server Components по умолчанию
- Компоненты: один файл = один экспорт

## Стилизация
- Tailwind CSS utility-first
- Кастомные классы: `glass`, `glass-card`, `glow-*` (в globals.css)
- Dark theme only (bg-dark-950)
- Framer Motion для анимаций

## API Routes
- POST для создания отчётов, GET для чтения
- JSON response с полем `error` при ошибках
- Валидация URL перед анализом (isValidUrl + HTTP check)
- response_format: { type: "json_object" } для OpenAI

## Файловая структура
- `src/components/{tool}/` — компоненты конкретного инструмента
- `src/components/shared/` — переиспользуемые компоненты
- `src/lib/prompts/` — AI-промпты по инструментам
- `src/lib/store.ts` — весь data access в одном файле

## Тестирование
- Vitest
- Тесты рядом с кодом: `*.test.ts`

## Git
- Ветка: master
- Деплой: автоматический через Vercel
