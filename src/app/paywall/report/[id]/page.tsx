import { Metadata } from "next"
import ReportClient from "./ReportClient"
import { getBaseUrl } from "@/lib/utils"
import { paywallStore } from "@/lib/store"

type Props = { params: { id: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const report = await paywallStore.getReport(params.id)
    if (!report) return { title: "PaywallAudit.ai" }
    let domain = "unknown"
    try { domain = new URL(report.url).hostname } catch {}
    const base = getBaseUrl()
    const ogImage = `${base}/api/og?tool=paywall&score=${report.overallScore}&site=${encodeURIComponent(domain)}`
    const title = `${domain} scored ${report.overallScore}/100 on PaywallAudit.ai`
    const description = report.summary || `Monetization audit for ${domain}`
    return {
      title, description,
      openGraph: { title, description, type: "website", url: `${base}/paywall/report/${params.id}`, siteName: "App Audit", images: [{ url: ogImage, width: 1200, height: 630, alt: title }] },
      twitter: { card: "summary_large_image", title, description, images: [ogImage] },
    }
  } catch { return { title: "PaywallAudit.ai" } }
}

export default function ReportPage({ params }: Props) {
  return <ReportClient id={params.id} />
}
