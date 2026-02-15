"use client"
import { useState, useEffect } from "react"
import { Flame, ClipboardCheck, DollarSign } from "lucide-react"

const toolStages: Record<string, string[]> = {
  roast: ["Taking screenshot...", "Scanning your page...", "AI is reading your copy...", "Analyzing design patterns...", "Preparing your roast...", "Writing recommendations...", "Almost done..."],
  ship: ["Taking screenshot...", "Scanning your site...", "Checking SEO basics...", "Testing security headers...", "Auditing accessibility...", "Compiling results...", "Almost done..."],
  paywall: ["Taking screenshot...", "Scanning pricing page...", "Analyzing plan structure...", "Evaluating conversion design...", "Checking psychology triggers...", "Writing recommendations...", "Almost done..."],
}

const toolIcons: Record<string, any> = { roast: Flame, ship: ClipboardCheck, paywall: DollarSign }
const toolColors: Record<string, string> = { roast: "text-orange-500", ship: "text-emerald-500", paywall: "text-purple-500" }
const toolLabels: Record<string, string> = { roast: "Roasting your page...", ship: "Auditing your site...", paywall: "Analyzing your paywall..." }

export default function LoadingAnimation({ tool = "roast" }: { tool?: string }) {
  const [stage, setStage] = useState(0)
  const stages = toolStages[tool] || toolStages.roast
  const Icon = toolIcons[tool] || Flame
  const color = toolColors[tool] || "text-orange-500"
  const label = toolLabels[tool] || "Analyzing..."

  useEffect(() => {
    const i = setInterval(() => setStage(p => (p < stages.length - 1 ? p + 1 : p)), 3000)
    return () => clearInterval(i)
  }, [stages.length])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <Icon className={`w-16 h-16 ${color} animate-pulse mx-auto mb-6`} />
        <h2 className="text-2xl font-bold mb-4">{label}</h2>
        <div className="space-y-2 mb-8">
          {stages.map((s, i) => (
            <div key={i} className={`text-sm transition-all duration-500 ${i < stage ? "text-green-400" : i === stage ? "text-white animate-pulse" : "text-dark-600"}`}>
              {i < stage ? "\u2705" : i === stage ? "\u23F3" : "\u2B1C"} {s}
            </div>
          ))}
        </div>
        <p className="text-dark-400 text-sm">This usually takes 15-30 seconds</p>
      </div>
    </div>
  )
}
