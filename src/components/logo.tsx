import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function Logo({ className, size = "md" }: LogoProps) {
  const scales = {
    sm: "scale-75",
    md: "scale-100",
    lg: "scale-150"
  }

  return (
    <div className={cn(
      "flex flex-col items-center justify-center group pointer-events-auto bg-primary p-4 rounded-3xl border border-black/10 shadow-2xl transition-all duration-500 hover:scale-105",
      scales[size], 
      className
    )}>
      <div className="relative h-12 w-24 flex items-center justify-center">
        {/* Left S (Black) */}
        <span className="absolute left-2 text-5xl font-black text-black leading-none -translate-x-1 group-hover:-translate-x-2 transition-transform duration-700 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] select-none italic" style={{ fontFamily: 'serif' }}>
          S
        </span>
        
        {/* Overlapping & (Black) */}
        <span className="absolute z-10 text-4xl font-black text-black leading-none group-hover:scale-110 transition-transform duration-700 select-none italic" style={{ fontFamily: 'serif' }}>
          &
        </span>
        
        {/* Right S (Black) */}
        <span className="absolute right-2 text-5xl font-black text-black leading-none translate-x-1 group-hover:translate-x-2 transition-transform duration-700 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] select-none italic" style={{ fontFamily: 'serif' }}>
          S
        </span>
      </div>
      
      <div className="mt-1 relative overflow-hidden px-2">
        <span className="text-[10px] font-black tracking-[0.4em] text-black uppercase whitespace-nowrap group-hover:tracking-[0.5em] transition-all duration-700">
          SLICE & SPICE
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>
    </div>
  )
}
