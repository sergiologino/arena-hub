"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Flame, ClipboardCheck, DollarSign, ArrowLeft, ExternalLink, Trash2, Clock } from "lucide-react"
import { motion } from "framer-motion"
import { extractDomain, getScoreColor } from "@/lib/utils"

interface HistoryItem { id: string; url: string; score: number; createdAt: string; tool?: string }

const toolConfig: Record<string, { icon: any; color: string; path: string; label: string }> = {
  roast: { icon: Flame, color: "text-orange-500", path: "/roast/report", label: "Roast" },
  ship: { icon: ClipboardCheck, color: "text-emerald-500", path: "/ship/report", label: "Audit" },
  paywall: { icon: DollarSign, color: "text-purple-500", path: "/paywall/report", label: "Paywall" },
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([])

  useEffect(() => {
    try {
      const allItems: HistoryItem[] = []
      const roastStored = localStorage.getItem("roastpage_history")
      if (roastStored) JSON.parse(roastStored).forEach((h: any) => allItems.push({ ...h, tool: "roast" }))
      const shipStored = localStorage.getItem("shipchecklist_history")
      if (shipStored) JSON.parse(shipStored).forEach((h: any) => allItems.push({ ...h, tool: "ship" }))
      const paywallStored = localStorage.getItem("paywall_history")
      if (paywallStored) JSON.parse(paywallStored).forEach((h: any) => allItems.push({ ...h, tool: "paywall" }))
      allItems.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      setHistory(allItems.slice(0, 100))
    } catch {}
  }, [])

  function clearAll() {
    setHistory([])
    localStorage.removeItem("roastpage_history")
    localStorage.removeItem("shipchecklist_history")
    localStorage.removeItem("paywall_history")
  }

  return (
    <div className="min-h-screen pb-20">
      <nav className="sticky top-0 z-50 glass border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-dark-300 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-bold">App Audit</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 pt-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
            <Clock className="w-7 h-7 text-indigo-500" /> All History
          </h1>
          {history.length > 0 && (
            <button onClick={clearAll} className="flex items-center gap-1 text-sm text-dark-400 hover:text-red-400 transition">
              <Trash2 className="w-4 h-4" /> Clear all
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="text-center py-20">
            <Clock className="w-16 h-16 text-dark-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-dark-300 mb-2">No reports yet</h2>
            <p className="text-dark-400 mb-6">Run your first analysis to see it here</p>
            <Link href="/" className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl text-white font-bold transition">
              Get Started
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item, i) => {
              const cfg = toolConfig[item.tool || "roast"]
              const Icon = cfg.icon
              return (
                <motion.div key={`${item.tool}-${item.id}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                  <Link href={`${cfg.path}/${item.id}`} className="glass-card flex items-center justify-between hover:border-white/20 transition-colors block">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-lg font-black"
                        style={{ color: getScoreColor(item.score), border: `2px solid ${getScoreColor(item.score)}` }}>
                        {item.score}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold truncate flex items-center gap-2">
                          <Icon className={`w-4 h-4 ${cfg.color} flex-shrink-0`} />
                          {extractDomain(item.url)} <ExternalLink className="w-3 h-3 text-dark-400 flex-shrink-0" />
                        </div>
                        <div className="text-xs text-dark-400">
                          <span className={cfg.color}>{cfg.label}</span> · {new Date(item.createdAt).toLocaleDateString()} {new Date(item.createdAt).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                    <span className="text-dark-400 text-sm flex-shrink-0 ml-4">View</span>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
