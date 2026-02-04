import { Navbar } from "@/components/navbar"
import { GlassCard } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Pizza, Utensils, Coffee, Truck, Clock, ShieldCheck, ChevronRight, Star, ArrowRight } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-main")
  
  const featuredItems = [
    PlaceHolderImages.find(img => img.id === "pizza-margherita"),
    PlaceHolderImages.find(img => img.id === "burger-beef"),
    PlaceHolderImages.find(img => img.id === "drink-lemonade"),
    PlaceHolderImages.find(img => img.id === "pizza-pepperoni"),
  ].filter(Boolean)

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
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 pt-20 overflow-hidden">
        {/* Background Image with Premium Overlay */}
        {heroImage && (
          <div className="absolute inset-0 z-0">
            <Image 
              src={heroImage.imageUrl} 
              alt="Slice and Juice Experience" 
              fill 
              priority
              className="object-cover opacity-40 scale-105"
              data-ai-hint={heroImage.imageHint}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        )}

        <div className="relative z-10 max-w-7xl mx-auto text-center space-y-10 py-20">
          <div className="inline-flex items-center gap-2 px-6 py-2 glass-dark rounded-full text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-primary animate-in fade-in slide-in-from-bottom-4 duration-1000 mx-auto border border-primary/20">
            <Star className="w-4 h-4 fill-primary animate-pulse" />
            The Gold Standard of Fast Food
          </div>
          
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-both">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[1] md:leading-[0.9]">
              CRAVE THE <span className="text-gold italic">SLICE</span><br />
              LOVE THE <span className="text-gold italic">JUICE</span>
            </h1>
            <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light px-4">
              Experience a premium symphony of artisanal sourdough pizzas and cold-pressed organic juices, crafted for the modern palate.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500 fill-mode-both">
            <Button asChild size="lg" className="gold-gradient text-lg px-12 py-8 rounded-2xl w-full sm:w-auto font-black shadow-[0_20px_50px_rgba(255,215,0,0.2)] hover:scale-105 transition-all duration-300">
              <Link href="/menu" className="flex items-center gap-2">
                Explore Menu <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="glass border-white/10 text-lg px-12 py-8 rounded-2xl w-full sm:w-auto font-bold hover:bg-white/5 transition-all text-white backdrop-blur-md">
              <Link href="/about">Our Philosophy</Link>
            </Button>
          </div>
        </div>

        {/* Dynamic Background Texture */}
        <div className="absolute top-1/3 -left-48 w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 -right-48 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[120px] animate-pulse delay-1000" />
      </section>

      {/* Value Propositions */}
      <section className="py-32 px-4 relative z-10 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((f, i) => (
              <div key={i} className="group relative">
                <div className="absolute -inset-1 gold-gradient opacity-0 group-hover:opacity-10 rounded-[2.5rem] transition duration-500 blur-xl" />
                <GlassCard className="p-12 flex flex-col items-center text-center gap-8 h-full">
                  <div className="w-20 h-20 rounded-3xl gold-gradient flex items-center justify-center text-primary-foreground shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    {f.icon}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold tracking-tight">{f.title}</h3>
                    <p className="text-muted-foreground leading-relaxed font-light">{f.desc}</p>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items Carousel */}
      <section className="py-32 bg-secondary/5 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 space-y-20">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-10 text-center md:text-left">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">Trending <span className="text-gold italic">Masterpieces</span></h2>
              <p className="text-muted-foreground text-xl max-w-2xl font-light">Hand-picked selections that define our culinary excellence this season.</p>
            </div>
            <Button asChild variant="ghost" className="text-gold text-lg group h-auto p-0 hover:bg-transparent font-bold">
              <Link href="/menu" className="flex items-center gap-2">
                View Full Collection <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="relative px-4">
            <Carousel className="w-full" opts={{ align: "start", loop: true }}>
              <CarouselContent className="-ml-8">
                {featuredItems.map((item, i) => (
                  <CarouselItem key={i} className="pl-8 basis-full md:basis-1/2 lg:basis-1/3">
                    <div className="group cursor-pointer">
                      <GlassCard className="h-full overflow-hidden">
                        <div className="relative aspect-[4/5]">
                          <Image 
                            src={item!.imageUrl} 
                            alt={item!.description} 
                            fill 
                            className="object-cover group-hover:scale-110 transition-transform duration-1000"
                            data-ai-hint={item!.imageHint}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                          <div className="absolute bottom-10 left-10 right-10 space-y-3">
                            <span className="text-gold font-black tracking-[0.3em] text-xs uppercase">Signature Series</span>
                            <h3 className="text-3xl font-bold text-white leading-tight">{item!.description.split(' with ')[0]}</h3>
                            <div className="h-1 w-0 bg-gold group-hover:w-16 transition-all duration-500" />
                          </div>
                        </div>
                      </GlassCard>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden xl:flex absolute -top-12 right-12 gap-4">
                <CarouselPrevious className="static translate-y-0 glass border-white/10 w-12 h-12 hover:bg-white/10" />
                <CarouselNext className="static translate-y-0 glass border-white/10 w-12 h-12 hover:bg-white/10" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-32 px-4 bg-background border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Ready for a <span className="text-gold italic">Premium</span> Taste?</h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Join thousands of food lovers who refuse to compromise on quality. Order now and experience the S&J difference.
          </p>
          <Button asChild size="lg" className="gold-gradient px-16 py-10 rounded-3xl text-xl font-black shadow-2xl hover:scale-105 transition-all">
            <Link href="/menu">START YOUR ORDER</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-4 bg-secondary/5 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center font-black text-primary-foreground text-2xl shadow-lg">
                  S&J
                </div>
                <span className="font-bold text-3xl tracking-tighter">
                  <span className="text-gold">SLICE</span>&JUICE
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed font-light">
                Redefining fast food through artisanal precision, organic integrity, and sustainable delivery.
              </p>
            </div>
            
            <div className="space-y-8">
              <h4 className="font-bold uppercase tracking-[0.2em] text-xs text-gold">Curation</h4>
              <ul className="space-y-5 text-muted-foreground font-medium">
                <li><Link href="/menu" className="hover:text-primary transition-colors">Spring Collection</Link></li>
                <li><Link href="/menu" className="hover:text-primary transition-colors">Juice Bar</Link></li>
                <li><Link href="/location" className="hover:text-primary transition-colors">The Lab</Link></li>
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="font-bold uppercase tracking-[0.2em] text-xs text-gold">Company</h4>
              <ul className="space-y-5 text-muted-foreground font-medium">
                <li><Link href="/about" className="hover:text-primary transition-colors">Our Manifesto</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Sourcing Map</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Impact Report</Link></li>
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="font-bold uppercase tracking-[0.2em] text-xs text-gold">Newsletter</h4>
              <p className="text-sm text-muted-foreground font-light">Subscribe for exclusive flavor drops and seasonal manifests.</p>
              <div className="flex gap-3">
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="glass bg-white/5 border-white/10 rounded-2xl px-5 py-3 w-full outline-none focus:border-primary/50 text-sm transition-all" 
                />
                <Button size="sm" className="gold-gradient px-6 rounded-2xl font-bold">Join</Button>
              </div>
            </div>
          </div>
          
          <div className="text-center pt-12 border-t border-white/5">
            <p className="text-muted-foreground text-xs tracking-widest uppercase">
              © 2024 SLICE & JUICE RESTAURANT GROUP. DEFINING EXCELLENCE.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
