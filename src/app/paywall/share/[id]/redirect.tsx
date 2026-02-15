"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { DollarSign } from "lucide-react"

export default function ShareRedirect({ id, toolPath }: { id: string; toolPath: string }) {
  const router = useRouter()
  useEffect(() => { router.replace(`/${toolPath}/report/${id}`) }, [id, toolPath, router])
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <DollarSign className="w-12 h-12 text-purple-500 animate-pulse mx-auto mb-4" />
        <p className="text-dark-300">Loading your audit...</p>
      </div>
    </div>
  )
}
