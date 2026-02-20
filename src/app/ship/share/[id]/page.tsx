import { Metadata } from "next"
import ShareRedirect from "./redirect"
import { getBaseUrl } from "@/lib/utils"
import { shipStore } from "@/lib/store"

type Props = { params: { id: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const report = await shipStore.getReport(params.id)
    if (!report) return { title: "ShipChecklist.ai" }
    let domain = "unknown"
    try { domain = new URL(report.url).hostname } catch {}
    const base = getBaseUrl()
    const ogImage = `${base}/api/og?tool=ship&score=${report.overallScore}&site=${encodeURIComponent(domain)}&passed=${report.passedCount}&failed=${report.failedCount}`
    const title = `${domain} scored ${report.overallScore}/100 on ShipChecklist.ai`
    const description = report.summary || `Pre-launch audit for ${domain}`
    return {
      title, description,
      openGraph: { title, description, type: "website", url: `${base}/ship/share/${params.id}`, siteName: "App Audit", images: [{ url: ogImage, width: 1200, height: 630, alt: title }] },
      twitter: { card: "summary_large_image", title, description, images: [ogImage] },
    }
  } catch { return { title: "ShipChecklist.ai" } }
}

export default function SharePage({ params }: Props) {
  return <ShareRedirect id={params.id} toolPath="ship" />
}
