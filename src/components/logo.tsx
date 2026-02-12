"use client"

import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function Logo({ className, size = "md" }: LogoProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scales = {
    sm: "scale-75",
    md: "scale-100",
    lg: "scale-150"
  }

  // Prevent hydration flicker by returning a placeholder of the same size/structure
  if (!mounted) return (
    <div 
      className={cn("w-24 h-12 bg-primary/20 rounded-3xl animate-pulse", scales[size], className)} 
      suppressHydrationWarning
    />
  )

  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center group pointer-events-auto bg-primary p-4 rounded-3xl border border-black/10 shadow-2xl transition-all duration-500 hover:scale-105",
        scales[size], 
        className
      )}
      suppressHydrationWarning
    >
      <div className="relative h-12 w-24 flex items-center justify-center">
        {/* Left S (Black) */}
        <span className="absolute left-2 text-5xl font-black text-black leading-none -translate-x-1 group-hover:-translate-x-2 transition-transform duration-700 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] select-none italic" style={{ fontFamily: 'serif' }}>
          S
        </span>
        
        {/* Overlapping & (Black) */}
        <span className="absolute z-10 text-4xl font-black text-black leading-none group-hover:scale-110 transition-transform duration-700 select-none italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" style={{ fontFamily: 'serif' }}>
          &
        </span>
        
        {/* Right S (Black) */}
        <span className="absolute right-2 text-5xl font-black text-black leading-none translate-x-1 group-hover:translate-x-2 transition-transform duration-700 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] select-none italic" style={{ fontFamily: 'serif' }}>
          S
        </span>
      </div>
      
      <div className="mt-2 relative overflow-hidden px-2">
        <span className="text-xs font-black tracking-[0.25em] text-black uppercase whitespace-nowrap group-hover:tracking-[0.3em] transition-all duration-700 block">
          SLICE & SPICE
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>
    </div>
  )
}
