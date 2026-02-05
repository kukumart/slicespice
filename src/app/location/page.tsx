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
      
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <Badge className="bg-primary text-primary-foreground font-black px-4 py-1 rounded-lg uppercase tracking-widest mb-4">
            Our Network
          </Badge>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase">FIND A <span className="gold-highlight text-primary-foreground">HUB</span></h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-medium">
            Visit our flagship restaurant at Waris Mall or discover our specialized express hubs across Nairobi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
              <Star className="w-6 h-6 text-gold fill-gold" />
              Active Hubs
            </h2>
            <div className="space-y-4">
              {LOCATIONS.map((loc, i) => (
                <GlassCard key={i} className="p-6 border-white/5 hover:border-primary/20">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-black text-xl tracking-tight uppercase">{loc.name}</h3>
                      <Badge variant={loc.status === "Open Now" ? "default" : "secondary"} className={loc.status === "Open Now" ? "bg-primary text-primary-foreground font-bold" : ""}>
                        {loc.status}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground font-medium">
                      <p className="flex items-center gap-2 leading-tight"><MapPin className="w-5 h-5 text-gold shrink-0" /> {loc.address}</p>
                      <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-gold" /> 10:00 AM - 11:00 PM</p>
                    </div>
                    <div className="pt-2 flex justify-between items-center">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gold">{loc.type}</p>
                      <Link 
                        href={loc.mapUrl} 
                        target="_blank" 
                        className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                      >
                        Map <Navigation className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
            
            <GlassCard className="p-8 bg-primary/5 border-primary/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center text-primary-foreground shadow-lg">
                  <Phone className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-black uppercase text-xs tracking-widest text-gold">Priority Line</h4>
                  <p className="font-bold text-lg">+254 (0) SLICE-JUICE</p>
                </div>
              </div>
            </GlassCard>
          </div>

          <div className="lg:col-span-8">
            <div className="relative h-[600px] md:h-[700px] rounded-[3rem] overflow-hidden glass group">
              <div className="absolute top-8 right-8 z-30 flex flex-col gap-2">
                <Link 
                  href={flagship.mapUrl}
                  target="_blank"
                  className="glass w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-colors pointer-events-auto"
                >
                  <Navigation className="w-6 h-6 text-gold" />
                </Link>
                <div className="glass p-2 rounded-2xl flex flex-col gap-2 pointer-events-auto">
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center font-bold hover:bg-white/10">+</button>
                  <div className="h-px bg-white/5" />
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center font-bold hover:bg-white/10">-</button>
                </div>
              </div>

              <div className="absolute inset-0 bg-[#0a0a0a] overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/nairobi-map/1200/800')] opacity-20 grayscale pointer-events-none mix-blend-luminosity" />
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                   <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping scale-150" />
                      <div className="relative w-16 h-16 rounded-full gold-gradient shadow-2xl shadow-primary/40 flex items-center justify-center border-4 border-black/50">
                        <MapPin className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <GlassCard className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest bg-black/80">Waris Mall Flagship</GlassCard>
                      </div>
                   </div>
                </div>
              </div>

              <div className="absolute bottom-8 left-8 right-8 z-30">
                <GlassCard className="p-6 bg-black/60 backdrop-blur-3xl border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <Star className="w-8 h-8 text-gold fill-gold" />
                    <div>
                      <p className="font-black text-lg uppercase tracking-tight">The Gold Standard</p>
                      <p className="text-xs text-muted-foreground font-medium">Opposite Carrefour, Eastern Bypass. Your slice awaits.</p>
                    </div>
                  </div>
                  <Link 
                    href={flagship.mapUrl}
                    target="_blank"
                    className="gold-gradient text-primary-foreground px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-lg flex items-center gap-2 no-underline"
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
