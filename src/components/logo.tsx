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

  // Hydration Fix: Render a stable structure on the server.
  // The 'group' and animation effects are safe because they depend on CSS or post-mount state.
  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center pointer-events-auto bg-primary p-4 rounded-3xl border border-black/10 shadow-2xl transition-all duration-500",
        mounted ? "group hover:scale-105" : "opacity-90",
        scales[size], 
        className
      )}
    >
      <div className="relative h-12 w-24 flex items-center justify-center">
        {/* Left S (Black) */}
        <span className={cn(
          "absolute left-2 text-5xl font-black text-black leading-none -translate-x-1 transition-transform duration-700 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] select-none italic",
          mounted && "group-hover:-translate-x-2"
        )} style={{ fontFamily: 'serif' }}>
          S
        </span>
        
        {/* Overlapping & (Black) */}
        <span className={cn(
          "absolute z-10 text-4xl font-black text-black leading-none transition-transform duration-700 select-none italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]",
          mounted && "group-hover:scale-110"
        )} style={{ fontFamily: 'serif' }}>
          &
        </span>
        
        {/* Right S (Black) */}
        <span className={cn(
          "absolute right-2 text-5xl font-black text-black leading-none translate-x-1 transition-transform duration-700 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] select-none italic",
          mounted && "group-hover:translate-x-2"
        )} style={{ fontFamily: 'serif' }}>
          S
        </span>
      </div>
      
      <div className="mt-2 relative overflow-hidden px-2">
        <span className={cn(
          "text-xs font-black tracking-[0.25em] text-black uppercase whitespace-nowrap transition-all duration-700 block",
          mounted && "group-hover:tracking-[0.3em]"
        )}>
          SLICE & SPICE
        </span>
        {mounted && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        )}
      </div>
    </div>
  )
}
