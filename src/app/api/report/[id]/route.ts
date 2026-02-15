import { NextRequest, NextResponse } from "next/server"
import { roastStore, shipStore, paywallStore } from "@/lib/store"
import { ToolType } from "@/lib/types"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const tool = req.nextUrl.searchParams.get("tool") as ToolType | null

  let report: any = null

  if (tool === "roast") {
    report = await roastStore.getReport(params.id)
  } else if (tool === "ship") {
    report = await shipStore.getReport(params.id)
  } else if (tool === "paywall") {
    report = await paywallStore.getReport(params.id)
  } else {
    report = await roastStore.getReport(params.id)
    if (!report) report = await shipStore.getReport(params.id)
    if (!report) report = await paywallStore.getReport(params.id)
  }

  if (!report) return NextResponse.json({ error: "Report not found" }, { status: 404 })

  if (!report.isPaid) {
    if (report.categories) {
      return NextResponse.json({
        ...report,
        categories: report.categories.map((cat: any) => {
          if (cat.isFree) return cat
          if (cat.checks) return { ...cat, checks: [] }
          return { ...cat, issues: [], recommendations: [], summary: "Unlock the full report to see this analysis" }
        }),
      })
    }
  }
  return NextResponse.json(report)
}
