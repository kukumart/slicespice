import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <div className={cn(
      "glass-dark rounded-[2.5rem] overflow-hidden transition-all duration-700 border border-white/5 relative group inner-gold-glow",
      hover && "hover:translate-y-[-12px] hover:shadow-primary/20 hover:border-primary/30",
      className
    )}>
      {/* Suble outer reflection on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-700 gold-gradient animate-shimmer-gold pointer-events-none" />
      
      {/* Premium corner highlight */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </div>
  )
}