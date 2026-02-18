import { Metadata } from "next"
import ShareRedirect from "./redirect"
import { getBaseUrl } from "@/lib/utils"

type Props = { params: { id: string } }

async function getReport(id: string) {
  try {
    const baseUrl = getBaseUrl()
    const res = await fetch(`${baseUrl}/api/report/${id}?tool=paywall`, { cache: "no-store" })
    if (!res.ok) return null
    return res.json()
  } catch { return null }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const report = await getReport(params.id)
  if (!report) return { title: "PaywallAudit.ai" }
  let domain = "unknown"
  try { domain = new URL(report.url).hostname } catch {}
  const base = getBaseUrl()
  const ogImage = `${base}/api/og?tool=paywall&score=${report.overallScore}&site=${encodeURIComponent(domain)}`
  const title = `${domain} scored ${report.overallScore}/100 on PaywallAudit.ai`
  const description = report.summary || `Monetization audit for ${domain}`
  return {
    title, description,
    openGraph: { title, description, type: "website", url: `${base}/paywall/share/${params.id}`, siteName: "App Audit", images: [{ url: ogImage, width: 1200, height: 630, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  }
}

export default function SharePage({ params }: Props) {
  return <ShareRedirect id={params.id} toolPath="paywall" />
}
