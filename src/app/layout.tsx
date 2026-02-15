import type { Metadata } from "next"
import Script from "next/script"
import { Toaster } from "sonner"
import "./globals.css"

export const metadata: Metadata = {
  title: "Arena AI - Free AI Website Audit Tools | Landing Pages, Launch Checklist, Paywall Analysis",
  description: "Three powerful AI tools to audit your website before and after launch. Analyze landing pages for conversion, check launch readiness with 50+ tests, and optimize your pricing page for maximum revenue.",
  keywords: [
    "website audit", "landing page analyzer", "pre-launch checklist", "pricing page audit",
    "conversion optimization", "AI feedback", "landing page score", "paywall analysis",
    "SaaS pricing optimization", "website launch checklist", "SEO audit", "AI website review",
  ],
  authors: [{ name: "Arena AI" }],
  openGraph: {
    title: "Arena AI - Free AI Website Audit Tools",
    description: "Three AI-powered tools: Landing Page Roast, Pre-Launch Audit, and Paywall Analysis. Get actionable feedback in 30 seconds.",
    type: "website",
    siteName: "Arena AI",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "Arena AI - Website Audit Tools" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arena AI - Free AI Website Audit Tools",
    description: "Three AI-powered tools: Landing Page Roast, Pre-Launch Audit, and Paywall Analysis.",
    images: ["/api/og"],
    creator: "@SavkinSergeyX",
  },
  robots: { index: true, follow: true },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://arena-hub.vercel.app"),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>" />
      </head>
      <body className="min-h-screen bg-dark-950 text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Arena AI",
              "url": process.env.NEXT_PUBLIC_BASE_URL || "https://arena-hub.vercel.app",
              "description": "Three AI-powered website audit tools: Landing Page Roast, Pre-Launch Audit, and Paywall Analysis.",
              "applicationCategory": "WebApplication",
              "operatingSystem": "Web",
              "offers": [
                { "@type": "Offer", "name": "RoastPage.ai Free", "price": "0", "priceCurrency": "USD" },
                { "@type": "Offer", "name": "RoastPage.ai Full", "price": "9.99", "priceCurrency": "USD" },
                { "@type": "Offer", "name": "ShipChecklist.ai Free", "price": "0", "priceCurrency": "USD" },
                { "@type": "Offer", "name": "ShipChecklist.ai Full", "price": "7.99", "priceCurrency": "USD" },
                { "@type": "Offer", "name": "PaywallAudit.ai Free", "price": "0", "priceCurrency": "USD" },
                { "@type": "Offer", "name": "PaywallAudit.ai Full", "price": "7.99", "priceCurrency": "USD" },
              ],
            }),
          }}
        />
        {children}
        <Toaster theme="dark" position="top-right"
          toastOptions={{ style: { background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", color: "#f1f5f9" } }}
        />
      </body>
    </html>
  )
}
