import { ImageResponse } from "next/og"
export const runtime = "edge"
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const tool = searchParams.get("tool") || ""
  const score = searchParams.get("score") || ""
  const site = searchParams.get("site") || ""
  const passed = searchParams.get("passed") || ""
  const failed = searchParams.get("failed") || ""

  const toolConfig: Record<string, { emoji: string; name: string; color: string; tagline: string }> = {
    roast: { emoji: "\uD83D\uDD25", name: "RoastPage.ai", color: "#f97316", tagline: "Landing Page Conversion Score" },
    ship: { emoji: "\u2705", name: "ShipChecklist.ai", color: "#22c55e", tagline: "Pre-Launch Website Audit" },
    paywall: { emoji: "\uD83D\uDCB0", name: "PaywallAudit.ai", color: "#a855f7", tagline: "Monetization & Pricing Score" },
  }

  const cfg = toolConfig[tool] || { emoji: "\u26A1", name: "App Audit", color: "#6366f1", tagline: "AI Website Audit Tools" }

  if (score && site) {
    const scoreNum = Number(score)
    const color = scoreNum >= 80 ? "#22c55e" : scoreNum >= 60 ? "#eab308" : scoreNum >= 40 ? "#f97316" : "#ef4444"
    return new ImageResponse(
      (
        <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#020617", fontFamily: "sans-serif", padding: "40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <span style={{ fontSize: "48px" }}>{cfg.emoji}</span>
            <span style={{ fontSize: "36px", fontWeight: 800, color: "white" }}>{cfg.name}</span>
          </div>
          <div style={{ fontSize: "22px", color: "#94a3b8", marginBottom: "16px" }}>{decodeURIComponent(site)}</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "160px", height: "160px", borderRadius: "50%", border: `6px solid ${color}`, marginBottom: "16px" }}>
            <span style={{ fontSize: "64px", fontWeight: 900, color }}>{score}</span>
          </div>
          {(passed || failed) && (
            <div style={{ display: "flex", gap: "24px", fontSize: "18px", marginBottom: "8px" }}>
              {passed && <span style={{ color: "#22c55e" }}>{passed} passed</span>}
              {failed && <span style={{ color: "#ef4444" }}>{failed} failed</span>}
            </div>
          )}
          <div style={{ fontSize: "18px", color: cfg.color, fontWeight: 700 }}>{cfg.tagline}</div>
        </div>
      ),
      { width: 1200, height: 630 }
    )
  }

  return new ImageResponse(
    (
      <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#020617", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <span style={{ fontSize: "48px" }}>{cfg.emoji}</span>
          <span style={{ fontSize: "40px", fontWeight: 800, color: "white" }}>{cfg.name}</span>
        </div>
        <div style={{ fontSize: "24px", color: cfg.color, fontWeight: 700 }}>{cfg.tagline}</div>
        <div style={{ fontSize: "20px", color: "#94a3b8", marginTop: "16px" }}>AI-powered analysis in 30 seconds</div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
