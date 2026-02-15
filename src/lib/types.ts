/* ── Tool type ─────────────────────────────── */
export type ToolType = "roast" | "ship" | "paywall"

/* ── Roast (landing page analysis) ────────── */
export interface RoastReport {
  id: string
  url: string
  screenshotUrl?: string
  overallScore: number
  summary: string
  topFixes: string[]
  categories: RoastCategory[]
  isPaid: boolean
  createdAt: string
}
export interface RoastCategory {
  name: string
  icon: string
  score: number
  grade: "A" | "B" | "C" | "D" | "F"
  summary: string
  issues: RoastIssue[]
  recommendations: string[]
  isFree: boolean
}
export interface RoastIssue {
  severity: "critical" | "warning" | "info"
  title: string
  description: string
  fix: string
}

/* ── Ship (pre-launch audit) ──────────────── */
export interface CheckReport {
  id: string
  url: string
  overallScore: number
  passedCount: number
  failedCount: number
  warningCount: number
  summary: string
  categories: CheckCategory[]
  isPaid: boolean
  createdAt: string
}
export interface CheckCategory {
  name: string
  icon: string
  checks: CheckItem[]
  isFree: boolean
}
export interface CheckItem {
  name: string
  status: "pass" | "fail" | "warning" | "info"
  description: string
  fix: string
  priority: "critical" | "high" | "medium" | "low"
}

/* ── Paywall (monetization audit) ─────────── */
export interface PaywallReport {
  id: string
  url: string
  screenshotUrl?: string
  overallScore: number
  summary: string
  topFixes: string[]
  categories: PaywallCategory[]
  isPaid: boolean
  createdAt: string
}
export interface PaywallCategory {
  name: string
  icon: string
  score: number
  grade: "A" | "B" | "C" | "D" | "F"
  summary: string
  issues: PaywallIssue[]
  recommendations: string[]
  isFree: boolean
}
export interface PaywallIssue {
  severity: "critical" | "warning" | "info"
  title: string
  description: string
  fix: string
}

/* ── Payment (shared) ─────────────────────── */
export interface PaymentRecord {
  id: string
  reportId: string
  amount: number
  currency: string
  txHash: string
  status: "pending" | "confirmed" | "failed"
  createdAt: string
}

/* ── Any report union (for unified endpoints) */
export type AnyReport = RoastReport | CheckReport | PaywallReport
