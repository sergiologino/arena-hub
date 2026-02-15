-- ============================================================
-- DDL для PaywallAudit.ai
-- Выполнить в Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- ============================================================

-- 1. Таблица отчётов
CREATE TABLE IF NOT EXISTS paywall_reports (
  id            TEXT PRIMARY KEY,
  url           TEXT NOT NULL,
  screenshot_url TEXT,
  overall_score INTEGER NOT NULL DEFAULT 0,
  summary       TEXT,
  top_fixes     JSONB DEFAULT '[]'::jsonb,
  categories    JSONB DEFAULT '[]'::jsonb,
  is_paid       BOOLEAN NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Индекс для быстрого поиска по дате (история, сортировка)
CREATE INDEX IF NOT EXISTS idx_paywall_reports_created_at
  ON paywall_reports (created_at DESC);

-- 2. Таблица платежей
CREATE TABLE IF NOT EXISTS paywall_payments (
  id            TEXT PRIMARY KEY,
  report_id     TEXT NOT NULL REFERENCES paywall_reports(id) ON DELETE CASCADE,
  amount        NUMERIC(10,2) NOT NULL,
  currency      TEXT NOT NULL DEFAULT 'USDT',
  tx_hash       TEXT NOT NULL,
  status        TEXT NOT NULL DEFAULT 'pending',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Индекс для поиска подтверждённых платежей по отчёту
CREATE INDEX IF NOT EXISTS idx_paywall_payments_report_id
  ON paywall_payments (report_id)
  WHERE status = 'confirmed';

-- Уникальность tx_hash (одна транзакция — один платёж)
CREATE UNIQUE INDEX IF NOT EXISTS idx_paywall_payments_tx_hash
  ON paywall_payments (tx_hash);

-- 3. RLS (Row Level Security) — разрешаем anon-ключу полный доступ
--    (аналогично существующим таблицам reports / ship_reports)
ALTER TABLE paywall_reports  ENABLE ROW LEVEL SECURITY;
ALTER TABLE paywall_payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_read_paywall_reports"  ON paywall_reports  FOR SELECT USING (true);
CREATE POLICY "anon_insert_paywall_reports" ON paywall_reports FOR INSERT WITH CHECK (true);
CREATE POLICY "anon_update_paywall_reports" ON paywall_reports FOR UPDATE USING (true);

CREATE POLICY "anon_read_paywall_payments"  ON paywall_payments  FOR SELECT USING (true);
CREATE POLICY "anon_insert_paywall_payments" ON paywall_payments FOR INSERT WITH CHECK (true);
