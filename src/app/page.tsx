
import { Navbar } from "@/components/navbar"
import { GlassCard } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Pizza, Utensils, Coffee, Truck, Clock, ShieldCheck } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-restaurant")

  const features = [
    { icon: <Clock className="w-6 h-6 text-gold" />, title: "30 Min Delivery", desc: "Fastest delivery in the city." },
    { icon: <ShieldCheck className="w-6 h-6 text-gold" />, title: "Quality Food", desc: "Premium ingredients only." },
    { icon: <Truck className="w-6 h-6 text-gold" />, title: "Free Shipping", desc: "On orders above $30." },
  ]

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-4 overflow-hidden">
        {heroImage && (
          <div className="absolute inset-0 z-0">
            <Image 
              src={heroImage.imageUrl} 
              alt="Slice & Juice Restaurant" 
              fill 
              className="object-cover opacity-30 scale-110 blur-sm"
              priority
              data-ai-hint={heroImage.imageHint}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
          </div>
        )}

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm font-medium text-gold animate-bounce">
            <Pizza className="w-4 h-4" />
            Now Serving Fresh Flavors
          </div>
          <h1 className="text-5xl md:text-8xl font-bold font-headline tracking-tighter leading-none">
            Crave the <span className="text-gold italic">Slice</span>, <br />
            Love the <span className="text-gold italic">Juice</span>.
          </h1>
          <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover a premium fast-food experience where artisanal pizzas meet freshly squeezed juices. Gourmet flavors, delivered fast.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="gold-gradient text-lg px-12 py-8 rounded-2xl w-full sm:w-auto">
              <Link href="/menu">Explore Menu</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="glass text-lg px-12 py-8 rounded-2xl w-full sm:w-auto">
              <Link href="/about">Our Story</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Features */}
      <section className="py-24 px-4 bg-secondary/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <GlassCard key={i} className="p-8 flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center flex-shrink-0">
                {f.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">{f.title}</h3>
                <p className="text-muted-foreground">{f.desc}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Something for <span className="text-gold">Everyone</span></h2>
          <p className="text-muted-foreground max-w-xl mx-auto">From hand-tossed sourdough pizzas to refreshing organic juices, we craft everything with passion.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Pizzas", icon: <Pizza className="w-10 h-10" />, count: "12 Items" },
            { name: "Burgers", icon: <Utensils className="w-10 h-10" />, count: "8 Items" },
            { name: "Coffees", icon: <Coffee className="w-10 h-10" />, count: "15 Items" },
            { name: "Juices", icon: <Utensils className="w-10 h-10 text-gold" />, count: "10 Items" },
          ].map((cat, i) => (
            <GlassCard key={i} className="p-8 group text-center flex flex-col items-center gap-4 cursor-pointer hover:bg-white/5">
              <div className="w-20 h-20 rounded-full glass flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold">{cat.name}</h3>
                <p className="text-sm text-gold/60">{cat.count}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Footer Simple */}
      <footer className="py-12 px-4 border-t border-white/10 text-center">
        <p className="text-muted-foreground">© 2024 Slice & Juice Restaurant. All rights reserved.</p>
      </footer>
    </main>
  )
}
