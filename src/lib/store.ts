import { supabase } from "./supabase"
import { RoastReport, CheckReport, PaywallReport, PaymentRecord, ToolType } from "./types"

/* ── Roast store ──────────────────────────── */
export const roastStore = {
  async getReport(id: string): Promise<RoastReport | undefined> {
    const { data } = await supabase.from("reports").select("*").eq("id", id).single()
    if (!data) return undefined
    return {
      id: data.id, url: data.url, screenshotUrl: data.screenshot_url,
      overallScore: data.overall_score, summary: data.summary, topFixes: data.top_fixes,
      categories: data.categories, isPaid: data.is_paid, createdAt: data.created_at,
    }
  },
  async setReport(r: RoastReport): Promise<void> {
    await supabase.from("reports").insert({
      id: r.id, url: r.url, screenshot_url: r.screenshotUrl,
      overall_score: r.overallScore, summary: r.summary, top_fixes: r.topFixes,
      categories: r.categories, is_paid: r.isPaid, created_at: r.createdAt,
    })
  },
  async updateReport(id: string, updates: Partial<RoastReport>): Promise<RoastReport | undefined> {
    const dbUpdates: any = {}
    if (updates.isPaid !== undefined) dbUpdates.is_paid = updates.isPaid
    await supabase.from("reports").update(dbUpdates).eq("id", id)
    return this.getReport(id)
  },
  async setPayment(p: PaymentRecord): Promise<void> {
    await supabase.from("payments").insert({
      id: p.id, report_id: p.reportId, amount: p.amount, currency: p.currency,
      tx_hash: p.txHash, status: p.status, created_at: p.createdAt,
    })
  },
}

/* ── Ship store ───────────────────────────── */
export const shipStore = {
  async getReport(id: string): Promise<CheckReport | undefined> {
    const { data } = await supabase.from("ship_reports").select("*").eq("id", id).single()
    if (!data) return undefined
    return {
      id: data.id, url: data.url, overallScore: data.overall_score,
      passedCount: data.passed_count, failedCount: data.failed_count,
      warningCount: data.warning_count, summary: data.summary,
      categories: data.categories, isPaid: data.is_paid, createdAt: data.created_at,
    }
  },
  async setReport(r: CheckReport): Promise<void> {
    await supabase.from("ship_reports").insert({
      id: r.id, url: r.url, overall_score: r.overallScore,
      passed_count: r.passedCount, failed_count: r.failedCount,
      warning_count: r.warningCount, summary: r.summary,
      categories: r.categories, is_paid: r.isPaid, created_at: r.createdAt,
    })
  },
  async updateReport(id: string, u: Partial<CheckReport>): Promise<CheckReport | undefined> {
    const updates: any = {}
    if (u.isPaid !== undefined) updates.is_paid = u.isPaid
    await supabase.from("ship_reports").update(updates).eq("id", id)
    return this.getReport(id)
  },
  async setPayment(p: PaymentRecord): Promise<void> {
    await supabase.from("ship_payments").insert({
      id: p.id, report_id: p.reportId, amount: p.amount, currency: p.currency,
      tx_hash: p.txHash, status: p.status, created_at: p.createdAt,
    })
  },
}

/* ── Paywall store ────────────────────────── */
export const paywallStore = {
  async getReport(id: string): Promise<PaywallReport | undefined> {
    const { data } = await supabase.from("paywall_reports").select("*").eq("id", id).single()
    if (!data) return undefined
    return {
      id: data.id, url: data.url, screenshotUrl: data.screenshot_url,
      overallScore: data.overall_score, summary: data.summary, topFixes: data.top_fixes,
      categories: data.categories, isPaid: data.is_paid, createdAt: data.created_at,
    }
  },
  async setReport(r: PaywallReport): Promise<void> {
    await supabase.from("paywall_reports").insert({
      id: r.id, url: r.url, screenshot_url: r.screenshotUrl,
      overall_score: r.overallScore, summary: r.summary, top_fixes: r.topFixes,
      categories: r.categories, is_paid: r.isPaid, created_at: r.createdAt,
    })
  },
  async updateReport(id: string, updates: Partial<PaywallReport>): Promise<PaywallReport | undefined> {
    const dbUpdates: any = {}
    if (updates.isPaid !== undefined) dbUpdates.is_paid = updates.isPaid
    await supabase.from("paywall_reports").update(dbUpdates).eq("id", id)
    return this.getReport(id)
  },
  async setPayment(p: PaymentRecord): Promise<void> {
    await supabase.from("paywall_payments").insert({
      id: p.id, report_id: p.reportId, amount: p.amount, currency: p.currency,
      tx_hash: p.txHash, status: p.status, created_at: p.createdAt,
    })
  },
}

/* ── Unified lookup (tries all stores) ────── */
export async function findReportAnyTool(id: string): Promise<{ tool: ToolType; report: any } | null> {
  const roast = await roastStore.getReport(id)
  if (roast) return { tool: "roast", report: roast }
  const ship = await shipStore.getReport(id)
  if (ship) return { tool: "ship", report: ship }
  const paywall = await paywallStore.getReport(id)
  if (paywall) return { tool: "paywall", report: paywall }
  return null
}

export function getStore(tool: ToolType) {
  if (tool === "roast") return roastStore
  if (tool === "ship") return shipStore
  return paywallStore
}
