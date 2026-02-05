import { Navbar } from "@/components/navbar"
import { GlassCard } from "@/components/glass-card"
import { MapPin, Phone, Clock, Navigation, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const LOCATIONS = [
  {
    name: "Waris Mall Flagship",
    address: "Eastern Bypass, Waris Mall, Opposite Carrefour, Ground Floor, Nairobi",
    status: "Open Now",
    type: "Dine-in & Delivery",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Waris+Mall+Eastern+Bypass+Nairobi"
  },
  {
    name: "Eastern Bypass Hub",
    address: "Eastern Bypass Service Road, Nairobi",
    status: "Open Now",
    type: "Express & Pickup",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Eastern+Bypass+Service+Road+Nairobi"
  },
  {
    name: "CBD Juice Lab",
    address: "Kenyatta Avenue, Nairobi Central",
    status: "Opening Soon",
    type: "Cold-Press Specialist",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Kenyatta+Avenue+Nairobi"
  }
]

export default function LocationPage() {
  const flagship = LOCATIONS[0]

  return (
    <main className="min-h-screen bg-background pt-32 pb-24 px-4">
      <Navbar />
      
      <div className="max-w-7xl mx-auto space-y-16 md:space-y-24">
        <div className="text-center space-y-6 md:space-y-10">
          <Badge className="bg-primary text-primary-foreground font-black px-6 py-2 rounded-xl uppercase tracking-widest mb-4 md:mb-6 text-xs md:text-sm">
            Our Network
          </Badge>
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tighter uppercase leading-[0.85]">FIND A <span className="gold-highlight text-black italic px-6 md:px-10">HUB</span></h1>
          <p className="text-xl md:text-3xl lg:text-5xl max-w-4xl mx-auto font-medium leading-tight">
            Visit our flagship at Waris Mall or discover specialized hubs across Nairobi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12">
          <div className="lg:col-span-4 space-y-8 md:space-y-10">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight flex items-center gap-4">
              <Star className="w-8 h-8 md:w-10 md:h-10 text-gold fill-gold" />
              Active Hubs
            </h2>
            <div className="space-y-6">
              {LOCATIONS.map((loc, i) => (
                <GlassCard key={i} className="p-6 md:p-8 border-white/5 hover:border-primary/20">
                  <div className="space-y-4 md:space-y-6">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-black text-2xl md:text-3xl tracking-tight uppercase leading-none">{loc.name}</h3>
                      <Badge variant={loc.status === "Open Now" ? "default" : "secondary"} className={loc.status === "Open Now" ? "bg-primary text-black font-bold px-4 py-1" : ""}>
                        {loc.status}
                      </Badge>
                    </div>
                    <div className="space-y-3 md:space-y-4 text-lg md:text-xl text-muted-foreground font-medium">
                      <p className="flex items-start gap-4 leading-tight"><MapPin className="w-6 h-6 md:w-8 md:h-8 text-gold shrink-0 mt-1" /> {loc.address}</p>
                      <p className="flex items-center gap-4"><Clock className="w-5 h-5 md:w-6 md:h-6 text-gold" /> 10:00 AM - 11:00 PM</p>
                    </div>
                    <div className="pt-4 flex justify-between items-center border-t border-white/5">
                      <p className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.2em] text-gold">{loc.type}</p>
                      <Link 
                        href={loc.mapUrl} 
                        target="_blank" 
                        className="text-xs md:text-sm font-bold text-primary hover:underline flex items-center gap-2"
                      >
                        Map <Navigation className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
            
            <GlassCard className="p-8 md:p-10 bg-primary/5 border-primary/20">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full gold-gradient flex items-center justify-center text-primary-foreground shadow-lg shrink-0">
                  <Phone className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-black uppercase text-[10px] md:text-sm tracking-widest text-gold mb-1">Priority Line</h4>
                  <p className="font-black text-xl md:text-3xl">+254 (0) SLICE-JUICE</p>
                </div>
              </div>
            </GlassCard>
          </div>

          <div className="lg:col-span-8">
            <div className="relative h-[500px] md:h-[700px] lg:h-[850px] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden glass group shadow-2xl">
              <div className="absolute top-6 md:top-10 right-6 md:right-10 z-30 flex flex-col gap-4">
                <Link 
                  href={flagship.mapUrl}
                  target="_blank"
                  className="glass w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl flex items-center justify-center hover:bg-white/10 transition-colors pointer-events-auto shadow-xl"
                >
                  <Navigation className="w-6 h-6 md:w-8 md:h-8 text-gold" />
                </Link>
                <div className="glass p-2 md:p-3 rounded-2xl md:rounded-3xl flex flex-col gap-2 md:gap-3 pointer-events-auto shadow-xl">
                  <button className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center font-black text-xl md:text-2xl hover:bg-white/10">+</button>
                  <div className="h-px bg-white/5" />
                  <button className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center font-black text-xl md:text-2xl hover:bg-white/10">-</button>
                </div>
              </div>

              <div className="absolute inset-0 bg-[#0a0a0a] overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:50px_50px]" />
                <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/nairobi-map/1600/1000')] opacity-20 grayscale pointer-events-none mix-blend-luminosity" />
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                   <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping scale-150" />
                      <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-full gold-gradient shadow-2xl shadow-primary/40 flex items-center justify-center border-4 border-black/50">
                        <MapPin className="w-8 h-8 md:w-12 md:h-12 text-primary-foreground" />
                      </div>
                      <div className="absolute top-full mt-4 md:mt-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <GlassCard className="px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl text-[10px] md:text-sm font-black uppercase tracking-widest bg-black/80 shadow-2xl border-white/10">Waris Mall Flagship</GlassCard>
                      </div>
                   </div>
                </div>
              </div>

              <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 right-6 md:right-10 z-30">
                <GlassCard className="p-6 md:p-8 bg-black/60 backdrop-blur-3xl border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
                  <div className="flex items-center gap-4 md:gap-6">
                    <Star className="w-8 h-8 md:w-12 md:h-12 text-gold fill-gold shrink-0" />
                    <div>
                      <p className="font-black text-2xl md:text-4xl uppercase tracking-tight">The Gold Standard</p>
                      <p className="text-lg md:text-xl text-muted-foreground font-medium">Opposite Carrefour, Eastern Bypass. Nairobi.</p>
                    </div>
                  </div>
                  <Link 
                    href={flagship.mapUrl}
                    target="_blank"
                    className="gold-gradient text-black px-8 md:px-12 py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-base md:text-lg uppercase tracking-widest hover:scale-105 transition-all shadow-2xl flex items-center gap-3 md:gap-4 no-underline w-full md:w-auto justify-center"
                  >
                    Get Directions
                  </Link>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}