
import { Navbar } from "@/components/navbar"
import { GlassCard } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Pizza, Utensils, Coffee, Truck, Clock, ShieldCheck, ChevronRight, Star } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-main") || PlaceHolderImages.find(img => img.id === "hero-restaurant")
  
  const featuredItems = [
    PlaceHolderImages.find(img => img.id === "pizza-margherita"),
    PlaceHolderImages.find(img => img.id === "burger-beef"),
    PlaceHolderImages.find(img => img.id === "drink-lemonade"),
    PlaceHolderImages.find(img => img.id === "pizza-pepperoni"),
  ].filter(Boolean)

  const features = [
    { icon: <Clock className="w-6 h-6" />, title: "30 Min Delivery", desc: "Fastest delivery in the city." },
    { icon: <ShieldCheck className="w-6 h-6" />, title: "Quality Food", desc: "Premium ingredients only." },
    { icon: <Truck className="w-6 h-6" />, title: "Free Shipping", desc: "On orders above $30." },
  ]

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 overflow-hidden">
        {heroImage && (
          <div className="absolute inset-0 z-0">
            <Image 
              src={heroImage.imageUrl} 
              alt="Slice & Juice Experience" 
              fill 
              className="object-cover opacity-60 scale-105 transition-transform duration-[10s] hover:scale-100"
              priority
              data-ai-hint={heroImage.imageHint}
            />
            {/* Dynamic Overlays for clarity */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
          </div>
        )}

        <div className="relative z-10 max-w-7xl mx-auto text-center space-y-8 md:space-y-12 py-12">
          <div className="inline-flex items-center gap-2 px-6 py-2 glass rounded-full text-xs md:text-sm font-bold tracking-wider uppercase text-primary animate-in fade-in slide-in-from-bottom-4 duration-1000 mx-auto">
            <Star className="w-4 h-4 fill-primary" />
            The Gold Standard of Fast Food
          </div>
          
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-both">
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[1.1] md:leading-[0.95]">
              CRAVE THE <span className="text-gold italic font-extrabold">SLICE</span><br />
              LOVE THE <span className="text-gold italic font-extrabold">JUICE</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light px-4 drop-shadow-lg">
              Artisanal sourdough pizzas and cold-pressed organic juices. <br className="hidden md:block" />
              A premium symphony of flavors for the modern palate.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 pt-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500 fill-mode-both">
            <Button asChild size="lg" className="gold-gradient text-lg md:text-xl px-12 md:px-16 py-6 md:py-8 rounded-full w-full sm:w-auto font-bold shadow-2xl hover:scale-105 transition-transform">
              <Link href="/menu">Browse Menu</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="glass border-white/20 text-lg md:text-xl px-12 md:px-16 py-6 md:py-8 rounded-full w-full sm:w-auto font-bold hover:bg-white/10 transition-all text-white">
              <Link href="/about">Our Philosophy</Link>
            </Button>
          </div>
        </div>

        {/* Floating background element for visual depth */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block opacity-50">
          <div className="w-1 h-12 rounded-full glass border-white/10" />
        </div>
      </section>

      {/* Quick Features */}
      <section className="py-24 px-4 bg-background relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <GlassCard key={i} className="p-10 flex flex-col items-center text-center gap-6">
              <div className="w-16 h-16 rounded-3xl gold-gradient flex items-center justify-center text-primary-foreground shadow-lg">
                {f.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Featured Items Carousel */}
      <section className="py-24 bg-secondary/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 space-y-16">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8 text-center md:text-left">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Trending <span className="text-gold">Flavors</span></h2>
              <p className="text-muted-foreground text-lg md:text-xl max-w-xl">The most ordered masterpieces from our kitchen this week.</p>
            </div>
            <Button asChild variant="ghost" className="text-gold text-lg group h-auto p-0 hover:bg-transparent">
              <Link href="/menu" className="flex items-center gap-2">
                Full Menu <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="px-4 md:px-0">
            <Carousel className="w-full">
              <CarouselContent className="-ml-6">
                {featuredItems.map((item, i) => (
                  <CarouselItem key={i} className="pl-6 basis-full md:basis-1/2 lg:basis-1/3">
                    <GlassCard className="h-full">
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <Image 
                          src={item!.imageUrl} 
                          alt={item!.description} 
                          fill 
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          data-ai-hint={item!.imageHint}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-8 left-8 right-8 space-y-2">
                          <h3 className="text-2xl font-bold text-white">{item!.description.split(' with ')[0]}</h3>
                          <p className="text-gold font-mono tracking-widest text-sm uppercase">Signature Recipe</p>
                        </div>
                      </div>
                    </GlassCard>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden xl:block">
                <CarouselPrevious className="glass border-white/10 -left-16" />
                <CarouselNext className="glass border-white/10 -right-16" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-4 border-t border-white/5 bg-background relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2 justify-start">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-bold text-primary-foreground text-xl">
                S&J
              </div>
              <span className="font-headline font-bold text-2xl tracking-tight">
                <span className="text-gold">Slice</span>&Juice
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">Elevating the fast food experience through artisanal quality and premium ingredients.</p>
          </div>
          <div className="flex flex-col items-start">
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-gold">Explore</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link href="/menu" className="hover:text-primary transition-colors">Full Menu</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
              <li><Link href="/location" className="hover:text-primary transition-colors">Find Us</Link></li>
            </ul>
          </div>
          <div className="flex flex-col items-start">
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-gold">Company</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="font-bold uppercase tracking-widest text-xs text-gold">Join the Club</h4>
            <p className="text-sm text-muted-foreground">Subscribe to receive exclusive offers and flavor drops.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email" className="glass bg-white/5 border-white/10 rounded-lg px-4 py-2 w-full outline-none focus:border-primary/50 text-sm" />
              <Button size="sm" className="gold-gradient px-6">Join</Button>
            </div>
          </div>
        </div>
        <div className="text-center pt-12 border-t border-white/5">
          <p className="text-muted-foreground text-xs md:text-sm">© 2024 Slice & Juice Restaurant Group. Crafted for excellence.</p>
        </div>
      </footer>
    </main>
  )
}
