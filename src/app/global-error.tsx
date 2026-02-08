"use client"

import { RefreshCcw } from "lucide-react"

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body className="bg-[#121212] text-white flex items-center justify-center min-h-screen p-4 font-sans">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="w-24 h-24 bg-primary rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl rotate-3">
             <span className="text-black font-black text-5xl italic" style={{ fontFamily: 'serif' }}>&</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-black uppercase tracking-tighter">Critical Failure</h1>
            <p className="text-muted-foreground text-sm uppercase tracking-widest">The Gold Standard Encountered an Exception</p>
          </div>
          <button 
            onClick={() => reset()}
            className="w-full bg-primary text-black py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-2xl"
          >
            <RefreshCcw className="w-5 h-5" /> Hard Reset System
          </button>
        </div>
      </body>
    </html>
  )
}
