import { Navbar } from "@/components/navbar"
import { GlassCard } from "@/components/glass-card"
import { MapPin, Phone, Mail, Clock, Navigation, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const LOCATIONS = [
  {
    name: "Downtown Flagship",
    address: "123 Gourmet Avenue, NY 10001",
    status: "Open Now",
    type: "Dine-in & Delivery"
  },
  {
    name: "Brooklyn Slice Hub",
    address: "45 Artisanal Street, BK 11201",
    status: "Opening Soon",
    type: "Express & Pickup"
  },
  {
    name: "The Juice Lab",
    address: "88 Organic Blvd, NY 10013",
    status: "Open Now",
    type: "Cold-Press Specialist"
  }
]

export default function LocationPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-24 px-4">
      <Navbar />
      
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <Badge className="bg-primary text-primary-foreground font-black px-4 py-1 rounded-lg uppercase tracking-widest mb-4">
            Our Network
          </Badge>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter">FIND A <span className="gold-highlight">HUB</span></h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-medium">
            Visit our flagship restaurant in the heart of the city or discover our specialized express hubs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sidebar: Hub List */}
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
                      <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gold" /> {loc.address}</p>
                      <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-gold" /> 10:00 AM - 11:00 PM</p>
                    </div>
                    <div className="pt-2">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gold">{loc.type}</p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
            
            <GlassCard className="p-8 bg-primary/5 border-primary/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center text-primary-foreground shadow-lg">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black uppercase text-xs tracking-widest text-gold">Priority Line</h4>
                  <p className="font-bold text-lg">+1 (800) SLICE-JUICE</p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Main Content: Interactive Map Placeholder */}
          <div className="lg:col-span-8">
            <div className="relative h-[600px] md:h-[700px] rounded-[3rem] overflow-hidden glass group">
              {/* Fake Map UI Overlay */}
              <div className="absolute top-8 right-8 z-20 flex flex-col gap-2">
                <button className="glass w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Navigation className="w-6 h-6 text-gold" />
                </button>
                <div className="glass p-2 rounded-2xl flex flex-col gap-2">
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center font-bold hover:bg-white/10">+</button>
                  <div className="h-px bg-white/5" />
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center font-bold hover:bg-white/10">-</button>
                </div>
              </div>

              {/* Map Canvas Placeholder */}
              <div className="absolute inset-0 bg-[#0a0a0a] overflow-hidden">
                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
                
                {/* Background "Map" Shape */}
                <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/map-dark/1200/800')] opacity-20 grayscale pointer-events-none mix-blend-luminosity" />
                
                {/* Interactive Points */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
                   <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping scale-150" />
                      <div className="relative w-16 h-16 rounded-full gold-gradient shadow-2xl shadow-primary/40 flex items-center justify-center border-4 border-black/50">
                        <MapPin className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <GlassCard className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest">Flagship HQ</GlassCard>
                      </div>
                   </div>
                </div>

                <div className="absolute bottom-1/4 right-1/4">
                   <div className="relative group/pin cursor-pointer">
                      <div className="w-10 h-10 rounded-full glass border-primary/50 flex items-center justify-center text-gold hover:scale-110 transition-transform">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/pin:opacity-100 transition-opacity whitespace-nowrap">
                        <GlassCard className="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest">Brooklyn Hub</GlassCard>
                      </div>
                   </div>
                </div>
              </div>

              {/* Bottom Info Bar */}
              <div className="absolute bottom-8 left-8 right-8 z-20">
                <GlassCard className="p-6 bg-black/40 backdrop-blur-3xl border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <Star className="w-8 h-8 text-gold fill-gold" />
                    <div>
                      <p className="font-black text-lg uppercase tracking-tight">The Gold Standard</p>
                      <p className="text-xs text-muted-foreground font-medium">Find your nearest premium slice and cold-pressed juice hub.</p>
                    </div>
                  </div>
                  <button className="gold-gradient text-primary-foreground px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-lg">
                    Get Directions
                  </button>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
