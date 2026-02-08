"use client"

import { useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { GlassCard } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { RefreshCcw, AlertCircle, Home } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error centrally
    console.error("Application runtime failure:", error)
  }, [error])

  return (
    <main className="min-h-screen bg-background pt-32 pb-24 px-4 flex items-center justify-center">
      <Navbar />
      <div className="max-w-xl w-full">
        <GlassCard className="p-12 text-center space-y-8 border-destructive/20" hover={false}>
          <div className="w-24 h-24 glass rounded-full flex items-center justify-center mx-auto text-destructive animate-pulse">
            <AlertCircle className="w-12 h-12" />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl font-black uppercase tracking-tight">System <span className="text-destructive">Interrupt</span></h1>
            <p className="text-muted-foreground font-medium text-lg leading-relaxed">
              The Gold Standard encountered a slight "spice" in the system. Our team has been notified.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={() => reset()}
              className="flex-1 gold-gradient text-black h-16 rounded-2xl font-black uppercase tracking-widest text-xs border-none shadow-xl hover:scale-105 transition-all"
            >
              <RefreshCcw className="w-4 h-4 mr-2" /> REINITIALIZE
            </Button>
            <Button asChild variant="outline" className="flex-1 glass h-16 rounded-2xl font-black uppercase tracking-widest text-xs border-white/10">
              <Link href="/"><Home className="w-4 h-4 mr-2" /> EXIT TO HOME</Link>
            </Button>
          </div>
          
          {process.env.NODE_ENV === 'development' && (
            <div className="p-4 bg-black/40 rounded-xl text-left font-mono text-[10px] text-destructive/80 overflow-auto max-h-32">
              {error.message || "An internal error occurred."}
              {error.digest && <div className="mt-2 opacity-50">Digest: {error.digest}</div>}
            </div>
          )}
        </GlassCard>
      </div>
    </main>
  )
}
