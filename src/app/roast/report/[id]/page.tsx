import { Metadata } from "next"
import ReportClient from "./ReportClient"
import { getBaseUrl } from "@/lib/utils"

type Props = { params: { id: string } }

async function getReport(id: string) {
  try {
    const baseUrl = getBaseUrl()
    const res = await fetch(`${baseUrl}/api/report/${id}?tool=roast`, { cache: "no-store" })
    if (!res.ok) return null
    return res.json()
  } catch { return null }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const report = await getReport(params.id)
  if (!report) return { title: "RoastPage.ai" }
  let domain = "unknown"
  try { domain = new URL(report.url).hostname } catch {}
  const base = getBaseUrl()
  const ogImage = `${base}/api/og?tool=roast&score=${report.overallScore}&site=${encodeURIComponent(domain)}`
  const title = `${domain} scored ${report.overallScore}/100 on RoastPage.ai`
  const description = report.summary || `AI landing page analysis for ${domain}`
  return {
    title, description,
    openGraph: { title, description, type: "website", url: `${base}/roast/report/${params.id}`, siteName: "Arena AI", images: [{ url: ogImage, width: 1200, height: 630, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  }
}

export default function ReportPage({ params }: Props) {
  return <ReportClient id={params.id} />
}
