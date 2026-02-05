import { Navbar } from "@/components/navbar"
import { GlassCard } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Truck, Clock, ShieldCheck, ChevronRight, Star, ArrowRight } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-main")
  
  const featuredItems = [
    { ...PlaceHolderImages.find(img => img.id === "pizza-margherita"), label: "Classic Pizza Margherita" },
    { ...PlaceHolderImages.find(img => img.id === "burger-beef"), label: "Juicy Classic Beef Burger" },
  ].filter(img => img.id)

  const features = [
    { 
      icon: <Clock className="w-6 h-6" />, 
      title: "30 Min Delivery", 
      desc: "Freshness guaranteed at your doorstep within thirty minutes." 
    },
    { 
      icon: <ShieldCheck className="w-6 h-6" />, 
      title: "Quality First", 
      desc: "Only premium, organic ingredients sourced from local farms." 
    },
    { 
      icon: <Truck className="w-6 h-6" />, 
      title: "Eco-Delivery", 
      desc: "Carbon-neutral delivery in 100% biodegradable packaging." 
    },
  ]

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 font-body">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 overflow-hidden">
        {/* Background Image with Premium Overlay */}
        {heroImage && (
          <div className="absolute inset-0 z-0">
            <Image 
              src={heroImage.imageUrl} 
              alt="Slice and Spice Experience" 
              fill 
              priority
              className="object-cover opacity-60"
              data-ai-hint={heroImage.imageHint}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background" />
          </div>
        )}

        <div className="relative z-10 max-w-7xl mx-auto text-center space-y-12 py-20">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-xs md:text-sm font-black tracking-[0.3em] uppercase text-primary mx-auto">
            <Star className="w-4 h-4 fill-primary" />
            The Gold Standard of Fast Food
          </div>
          
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[1.1] uppercase animate-in fade-in slide-in-from-bottom-8 duration-1000">
              CRAVE THE <span className="gold-highlight italic">SLICE</span><br />
              LOVE THE <span className="gold-highlight italic">SPICE</span>
            </h1>
            <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium px-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
              Experience a premium symphony of artisanal sourdough pizzas and bold exotic spices, crafted for the modern palate.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
            <button asChild className="gold-gradient text-primary-foreground text-lg px-12 py-8 rounded-2xl w-full sm:w-auto font-black shadow-2xl hover:scale-105 transition-all duration-300 uppercase tracking-widest border-none flex items-center justify-center gap-2 cursor-pointer">
              <Link href="/menu" className="flex items-center gap-2 no-underline text-primary-foreground">
                Order Now <ArrowRight className="w-5 h-5" />
              </Link>
            </button>
            <Button asChild variant="outline" size="lg" className="glass border-white/20 text-lg px-12 py-8 rounded-2xl w-full sm:w-auto font-bold hover:bg-white/10 transition-all text-white backdrop-blur-md uppercase tracking-widest">
              <Link href="/about">Our Philosophy</Link>
            </Button>
          </div>
        </div>

        {/* Decorative Gradients */}
        <div className="absolute top-1/4 -left-64 w-[50rem] h-[50rem] bg-primary/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 -right-64 w-[50rem] h-[50rem] bg-primary/5 rounded-full blur-[140px]" />
      </section>

      {/* Value Propositions */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <GlassCard key={i} className="p-12 flex flex-col items-center text-center gap-6 h-full border-white/5 hover:border-primary/30">
                <div className="w-16 h-16 rounded-2xl gold-gradient flex items-center justify-center text-primary-foreground shadow-lg">
                  {f.icon}
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-black tracking-tight uppercase">{f.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm font-medium">{f.desc}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="py-32 px-4 bg-background">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
               <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">Trending <span className="gold-highlight italic">Masterpieces</span></h2>
               <Link href="/menu" className="hidden md:flex items-center gap-2 text-gold font-black uppercase tracking-widest text-sm hover:underline">
                  Full Menu <ChevronRight className="w-4 h-4" />
               </Link>
            </div>
            <div className="h-2 w-48 gold-gradient rounded-full" />
            <p className="text-muted-foreground text-lg max-w-2xl font-medium">Discover our most requested creations this season.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {featuredItems.map((item, i) => (
              <Link href="/menu" key={i} className="group block">
                <GlassCard className="aspect-[16/10] overflow-hidden rounded-[2.5rem]">
                  <Image 
                    src={item!.imageUrl!} 
                    alt={item!.description!} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    data-ai-hint={item!.imageHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gold mb-2">Signature Series</p>
                    <h3 className="text-3xl font-black text-white uppercase tracking-tight">{item!.label}</h3>
                    <div className="h-1 w-12 gold-gradient mt-2 group-hover:w-24 transition-all duration-500" />
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 bg-background border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">Ready for a <span className="gold-highlight italic">Premium</span> Taste?</h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Join the elite circle of food lovers who refuse to compromise. Order now and experience the S&S difference.
          </p>
          <button className="gold-gradient text-primary-foreground px-16 py-10 rounded-2xl text-xl font-black shadow-2xl hover:scale-105 transition-all uppercase tracking-widest border-none cursor-pointer">
            <Link href="/menu" className="no-underline text-primary-foreground">START YOUR ORDER</Link>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-4 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center font-black text-primary-foreground text-xl">
                  S&S
                </div>
                <span className="font-black text-2xl tracking-tighter uppercase text-foreground">
                  <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded-lg mr-1 inline-block">SLICE</span>&SPICE
                </span>
              </div>
              <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                Defining the new standard of premium fast food through artisanal precision and bold flavor innovation.
              </p>
            </div>
            
            <div className="space-y-6">
              <h4 className="font-black uppercase tracking-[0.2em] text-xs text-gold">Curation</h4>
              <div className="h-px w-full bg-white/10" />
              <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                <li><Link href="/menu" className="hover:text-primary transition-colors">Menu</Link></li>
                <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link href="/location" className="hover:text-primary transition-colors">Location</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="font-black uppercase tracking-[0.2em] text-xs text-gold">Company</h4>
              <div className="h-px w-full bg-white/10" />
              <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">Philosophy</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Sustainability</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Privacy</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="font-black uppercase tracking-[0.2em] text-xs text-gold">Newsletter</h4>
              <div className="h-px w-full bg-white/10" />
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 w-full text-sm outline-none focus:border-primary/50 text-white" 
                />
                <button className="gold-gradient text-primary-foreground px-6 rounded-xl font-black uppercase text-xs border-none cursor-pointer">Join</button>
              </div>
            </div>
          </div>
          
          <div className="text-center pt-12 border-t border-white/5">
            <p className="text-muted-foreground text-[10px] tracking-[0.3em] font-black uppercase">
              © 2024 SLICE & SPICE RESTAURANT GROUP. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
