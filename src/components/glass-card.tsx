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
      "glass-dark rounded-[2rem] overflow-hidden transition-all duration-500 border border-white/5 relative group",
      hover && "hover:translate-y-[-8px] hover:shadow-primary/10 hover:border-primary/20",
      className
    )}>
      {/* Suble inner glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 gold-gradient" />
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  )
}