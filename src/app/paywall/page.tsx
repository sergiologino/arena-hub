"use client"
import { useState, FormEvent } from "react"
import { motion } from "framer-motion"
import { DollarSign, Target, Brain, Smartphone, Scale, BarChart3, Zap, Globe, Loader2, Check, ArrowRight, ChevronDown, ArrowLeft, ShieldCheck, MessageSquare } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { normalizeUrl, isValidUrl } from "@/lib/utils"

const categories = [
  { icon: BarChart3, title: "Pricing Layout", desc: "Visual hierarchy, plan comparison, clarity" },
  { icon: Target, title: "CTA & Conversion", desc: "Button copy, placement, urgency triggers" },
  { icon: Brain, title: "Psychology", desc: "Anchoring, decoy pricing, loss aversion" },
  { icon: ShieldCheck, title: "Trust & Proof", desc: "Testimonials, guarantees, social proof" },
  { icon: Smartphone, title: "Mobile Pricing", desc: "Responsive pricing tables, mobile UX" },
  { icon: MessageSquare, title: "FAQ & Objections", desc: "Objection handling, refund policy" },
]

const faqs = [
  { q: "What does it analyze?", a: "10 categories: pricing layout, plan structure, CTAs, trust signals, value proposition, psychology triggers, mobile experience, FAQ handling, transparency, and competitive positioning." },
  { q: "How is this different from RoastPage?", a: "RoastPage analyzes general landing pages for conversion. PaywallAudit specifically analyzes pricing pages, paywall design, and monetization strategy." },
  { q: "What do I get for free?", a: "Overall monetization score plus 3 detailed category analyses. Full 10-category report is $7.99." },
  { q: "Can I analyze competitor pricing?", a: "Absolutely! Enter any public pricing page URL to see how competitors structure their monetization." },
]

export default function PaywallPage() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [promoCode, setPromoCode] = useState("")
  const [showPromo, setShowPromo] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const router = useRouter()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!url.trim()) { toast.error("Please enter a URL"); return }
    const cleanUrl = normalizeUrl(url)
    if (!isValidUrl(cleanUrl)) { toast.error("Please enter a valid URL"); return }
    setLoading(true)
    try {
      const res = await fetch("/api/paywall-check", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: cleanUrl, promoCode }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Analysis failed")
      router.push(`/paywall/report/${data.id}`)
    } catch (err: any) {
      toast.error(err.message || "Something went wrong")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-dark-400 hover:text-white transition"><ArrowLeft className="w-4 h-4" /></Link>
            <div className="flex items-center gap-2">
              <DollarSign className="w-7 h-7 text-purple-500" />
              <span className="text-xl font-bold">PaywallAudit<span className="text-purple-500">.ai</span></span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/history" className="text-sm text-dark-300 hover:text-white transition">History</Link>
            <a href="#pricing" className="text-sm text-dark-300 hover:text-white transition">Pricing</a>
            <a href="#faq" className="text-sm text-dark-300 hover:text-white transition">FAQ</a>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-purple-300 mb-6">
              <DollarSign className="w-4 h-4" /> AI Monetization Analysis
            </div>
            <h1 className="text-5xl sm:text-7xl font-black mb-6 leading-tight">
              Is your pricing page<br /><span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">leaving money</span> on the table?
            </h1>
            <p className="text-xl text-dark-300 mb-10 max-w-2xl mx-auto">
              AI analyzes your pricing page for <span className="text-white font-semibold">conversion psychology, plan structure, and monetization strategy</span>. Get a detailed score and actionable fixes in 30 seconds.
            </p>
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                  <input type="text" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://your-app.com/pricing"
                    className="w-full pl-12 pr-4 py-4 bg-dark-800 border border-dark-600 rounded-xl text-white placeholder:text-dark-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg" disabled={loading} />
                </div>
                <button type="submit" disabled={loading}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-xl text-white font-bold text-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 glow-purple whitespace-nowrap">
                  {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Analyzing...</> : <>Audit Paywall <DollarSign className="w-5 h-5" /></>}
                </button>
              </div>
            </form>
            <div className="mt-4">
              {!showPromo ? (
                <button onClick={() => setShowPromo(true)} className="text-sm text-dark-400 hover:text-purple-400 transition">Have a promo code?</button>
              ) : (
                <div className="flex items-center justify-center gap-2 mt-2">
                  <input type="text" value={promoCode} onChange={e => setPromoCode(e.target.value.toUpperCase())} placeholder="PROMO CODE"
                    className="px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white text-sm w-40 text-center uppercase" />
                </div>
              )}
              <p className="text-sm text-dark-400 mt-2">Free quick analysis - Full report $7.99</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">What we <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">analyze</span></h2>
          <p className="text-dark-300 text-center mb-12 max-w-xl mx-auto">10 categories focused on pricing psychology and monetization</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="glass-card hover:border-purple-500/30 transition-colors group">
                <f.icon className="w-8 h-8 text-purple-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-dark-300 text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-4 bg-dark-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Simple <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">pricing</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="glass-card">
              <h3 className="text-xl font-bold mb-2">Quick Analysis</h3>
              <div className="text-3xl font-black mb-4">Free</div>
              <ul className="space-y-3 mb-6">
                {["Overall monetization score", "Top 3 categories analyzed", "Basic recommendations"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-dark-200"><Check className="w-4 h-4 text-green-500 flex-shrink-0" /> {item}</li>
                ))}
              </ul>
              <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="w-full py-3 rounded-xl border border-dark-600 hover:border-dark-400 text-dark-200 font-semibold transition">Try Free</button>
            </div>
            <div className="glass-card border-purple-500/30 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-xs font-bold">FULL AUDIT</div>
              <h3 className="text-xl font-bold mb-2">Deep Analysis</h3>
              <div className="text-3xl font-black mb-1">$7.99</div>
              <div className="text-sm text-dark-400 mb-4">per page, one-time</div>
              <ul className="space-y-3 mb-6">
                {["All 10 audit categories", "Psychology trigger analysis", "CTA rewrite suggestions", "Competitive positioning", "Plan structure optimization", "Trust signal recommendations", "Mobile pricing UX audit"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-dark-200"><Check className="w-4 h-4 text-purple-500 flex-shrink-0" /> {item}</li>
                ))}
              </ul>
              <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold transition glow-purple">
                Get Full Report <ArrowRight className="inline w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12"><span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">FAQ</span></h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-card cursor-pointer select-none" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold pr-4">{faq.q}</h3>
                  <ChevronDown className={`w-5 h-5 text-dark-400 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </div>
                {openFaq === i && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-dark-300 text-sm mt-3">{faq.a}</motion.p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2"><DollarSign className="w-5 h-5 text-purple-500" /><span className="font-bold">PaywallAudit<span className="text-purple-500">.ai</span></span></div>
          <div className="flex items-center gap-4 text-sm text-dark-400">
            <Link href="/roast" className="hover:text-orange-400 transition">Landing Page Roast</Link>
            <Link href="/ship" className="hover:text-emerald-400 transition">Pre-Launch Audit</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
