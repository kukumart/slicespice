
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
      "glass-dark rounded-3xl overflow-hidden transition-all duration-300",
      hover && "hover:translate-y-[-4px] hover:shadow-primary/20",
      className
    )}>
      {children}
    </div>
  )
}
