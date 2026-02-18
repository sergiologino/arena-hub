import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://app-audit.pro"

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/roast`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/ship`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/paywall`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/history`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ]
}
