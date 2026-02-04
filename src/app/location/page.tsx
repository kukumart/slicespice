
import { Navbar } from "@/components/navbar"
import { GlassCard } from "@/components/glass-card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function LocationPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-24 px-4">
      <Navbar />
      
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold">Find <span className="text-gold">Us</span></h1>
          <p className="text-muted-foreground max-w-xl mx-auto">Visit our flagship restaurant in the heart of the city or order delivery to your home.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Details */}
          <div className="space-y-6">
            <GlassCard className="p-8 flex items-start gap-4">
              <MapPin className="w-6 h-6 text-gold mt-1" />
              <div>
                <h3 className="font-bold text-xl mb-1">Our Flagship</h3>
                <p className="text-muted-foreground">123 Gourmet Avenue<br />Culinary District, NY 10001</p>
              </div>
            </GlassCard>
            
            <GlassCard className="p-8 flex items-start gap-4">
              <Clock className="w-6 h-6 text-gold mt-1" />
              <div>
                <h3 className="font-bold text-xl mb-1">Opening Hours</h3>
                <div className="text-muted-foreground space-y-1">
                  <p className="flex justify-between gap-8"><span>Mon - Thu</span> <span className="text-foreground">10AM - 11PM</span></p>
                  <p className="flex justify-between gap-8"><span>Fri - Sat</span> <span className="text-foreground">10AM - 02AM</span></p>
                  <p className="flex justify-between gap-8"><span>Sunday</span> <span className="text-foreground">12PM - 10PM</span></p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-8 flex items-start gap-4">
              <Phone className="w-6 h-6 text-gold mt-1" />
              <div>
                <h3 className="font-bold text-xl mb-1">Call Us</h3>
                <p className="text-muted-foreground">+1 (800) SLICE-JUICE</p>
              </div>
            </GlassCard>
          </div>

          {/* Map Placeholder */}
          <div className="lg:col-span-2 relative h-[500px] rounded-3xl overflow-hidden glass">
            <div className="absolute inset-0 bg-white/5 flex items-center justify-center flex-col gap-4">
              <div className="w-16 h-16 rounded-full gold-gradient animate-pulse flex items-center justify-center">
                <MapPin className="w-8 h-8 text-primary-foreground" />
              </div>
              <p className="text-muted-foreground font-medium">Interactive Map Loading...</p>
              <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/map/1200/800')] opacity-20 grayscale pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
