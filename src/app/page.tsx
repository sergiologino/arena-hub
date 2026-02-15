"use client"
import { motion } from "framer-motion"
import { Flame, ClipboardCheck, DollarSign, ArrowRight, Zap, Shield, Target, BarChart3, Star, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const tools = [
  {
    icon: Flame,
    name: "RoastPage.ai",
    tagline: "Landing Page Roast",
    description: "AI analyzes your landing page and gives brutal, actionable feedback on copy, design, CTAs, and conversion potential. Score 0-100.",
    color: "text-orange-500",
    borderColor: "hover:border-orange-500/40",
    gradient: "from-orange-500 to-red-500",
    glow: "glow-orange",
    href: "/roast",
    features: ["8 analysis categories", "Conversion score 0-100", "Copy rewrite suggestions", "CTA optimization"],
    price: "Free / $7.99",
  },
  {
    icon: ClipboardCheck,
    name: "ShipChecklist.ai",
    tagline: "Pre-Launch Audit",
    description: "50+ automated checks across SEO, security, performance, legal, accessibility, and more. Never launch unprepared again.",
    color: "text-emerald-500",
    borderColor: "hover:border-emerald-500/40",
    gradient: "from-emerald-500 to-cyan-500",
    glow: "glow-green",
    href: "/ship",
    features: ["50+ individual checks", "10 audit categories", "Pass/fail verdicts", "Priority-ranked fixes"],
    price: "Free / $7.99",
  },
  {
    icon: DollarSign,
    name: "PaywallAudit.ai",
    tagline: "Pricing Page Audit",
    description: "AI analyzes your pricing page for conversion psychology, plan structure, and monetization strategy. Stop leaving money on the table.",
    color: "text-purple-500",
    borderColor: "hover:border-purple-500/40",
    gradient: "from-purple-500 to-blue-500",
    glow: "glow-purple",
    href: "/paywall",
    features: ["10 monetization categories", "Psychology triggers", "CTA optimization", "Competitive positioning"],
    price: "Free / $7.99",
  },
]

const stats = [
  { value: "3", label: "AI Audit Tools" },
  { value: "100+", label: "Combined Checks" },
  { value: "30s", label: "Average Analysis Time" },
  { value: "Free", label: "To Get Started" },
]

const faqs = [
  { q: "What is Arena AI?", a: "Arena AI is a suite of three AI-powered website audit tools designed for founders, marketers, and developers. Each tool focuses on a different aspect: landing page conversion, launch readiness, and pricing page optimization." },
  { q: "Are the tools free?", a: "Each tool offers a free tier with limited analysis. Full reports are available as one-time purchases ($7.99) with no subscription required." },
  { q: "What AI model do you use?", a: "We use GPT-4 Vision to analyze both the visual design (via screenshots) and the content of your pages. This allows us to give feedback on layout, copy, and design simultaneously." },
  { q: "Can I audit competitor websites?", a: "Yes! All three tools work with any public URL. Enter a competitor's landing page, pricing page, or website to see how they score." },
  { q: "How do payments work?", a: "We accept USDT on the Polygon network. Fast transactions, low fees, and no signups required. Just pay and unlock your full report instantly." },
]

export default function HubPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-7 h-7 text-indigo-500" />
            <span className="text-xl font-bold">Arena<span className="text-indigo-500"> AI</span></span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/roast" className="text-sm text-dark-300 hover:text-orange-400 transition">Roast</Link>
            <Link href="/ship" className="text-sm text-dark-300 hover:text-emerald-400 transition">Ship</Link>
            <Link href="/paywall" className="text-sm text-dark-300 hover:text-purple-400 transition">Paywall</Link>
            <Link href="/history" className="text-sm text-dark-300 hover:text-white transition">History</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px]" />
        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-indigo-300 mb-6">
              <Zap className="w-4 h-4" /> Three AI Tools, One Platform
            </div>
            <h1 className="text-5xl sm:text-7xl font-black mb-6 leading-tight">
              AI-powered<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-emerald-400 to-purple-400">website audit tools</span>
            </h1>
            <p className="text-xl text-dark-300 mb-12 max-w-3xl mx-auto">
              Analyze your <span className="text-orange-400 font-semibold">landing pages</span>, check <span className="text-emerald-400 font-semibold">launch readiness</span>, and optimize your <span className="text-purple-400 font-semibold">pricing strategy</span> — all powered by GPT-4 Vision. Free to start.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-4 flex flex-wrap items-center justify-center gap-8 sm:gap-16">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold">{s.value}</div>
              <div className="text-sm text-dark-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tools */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Choose your <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-emerald-400 to-purple-400">audit tool</span></h2>
          <p className="text-dark-300 text-center mb-12 max-w-2xl mx-auto">Each tool is designed for a specific stage of your product lifecycle</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {tools.map((tool, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} viewport={{ once: true }}>
                <Link href={tool.href} className={`glass-card block h-full ${tool.borderColor} transition-all group`}>
                  <tool.icon className={`w-10 h-10 ${tool.color} mb-4 group-hover:scale-110 transition-transform`} />
                  <h3 className="text-xl font-bold mb-1">{tool.name}</h3>
                  <p className={`text-sm ${tool.color} font-medium mb-3`}>{tool.tagline}</p>
                  <p className="text-dark-300 text-sm mb-6">{tool.description}</p>
                  <ul className="space-y-2 mb-6">
                    {tool.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-dark-200">
                        <span className={tool.color}>&#10003;</span> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-sm text-dark-400">{tool.price}</span>
                    <span className={`inline-flex items-center gap-1 text-sm font-semibold ${tool.color} group-hover:gap-2 transition-all`}>
                      Try Now <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-dark-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">How it <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">works</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Enter URL", desc: "Paste your landing page, website, or pricing page URL" },
              { step: "2", title: "AI Analyzes", desc: "GPT-4 Vision screenshots and analyzes your page in ~30 seconds" },
              { step: "3", title: "Get Results", desc: "Receive a detailed score with specific, actionable fixes" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} viewport={{ once: true }} className="text-center">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-lg mx-auto mb-4">{s.step}</div>
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-dark-300 text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12"><span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">FAQ</span></h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-card cursor-pointer select-none" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold pr-4">{faq.q}</h3>
                  <ChevronDown className={`w-5 h-5 text-dark-400 transition-transform flex-shrink-0 ${openFaq === i ? "rotate-180" : ""}`} />
                </div>
                {openFaq === i && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-dark-300 text-sm mt-3">{faq.a}</motion.p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-emerald-400 to-purple-400">level up</span>?</h2>
          <p className="text-dark-300 mb-8">Choose a tool and get AI-powered feedback in 30 seconds.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/roast" className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-white font-bold transition glow-orange">
              Roast Landing Page <Flame className="inline w-4 h-4 ml-1" />
            </Link>
            <Link href="/ship" className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl text-white font-bold transition glow-green">
              Pre-Launch Audit <ClipboardCheck className="inline w-4 h-4 ml-1" />
            </Link>
            <Link href="/paywall" className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white font-bold transition glow-purple">
              Paywall Audit <DollarSign className="inline w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-500" />
              <span className="font-bold">Arena<span className="text-indigo-500"> AI</span></span>
            </div>
            <div className="flex items-center gap-6 text-sm text-dark-400">
              <Link href="/roast" className="hover:text-orange-400 transition">RoastPage.ai</Link>
              <Link href="/ship" className="hover:text-emerald-400 transition">ShipChecklist.ai</Link>
              <Link href="/paywall" className="hover:text-purple-400 transition">PaywallAudit.ai</Link>
              <Link href="/history" className="hover:text-white transition">History</Link>
            </div>
          </div>
          <p className="text-center text-xs text-dark-500 mt-4">&copy; 2025 Arena AI. All tools are powered by GPT-4 Vision.</p>
        </div>
      </footer>
    </div>
  )
}
