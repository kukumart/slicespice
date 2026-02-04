import { Navbar } from "@/components/navbar"
import { GlassCard } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Pizza, Utensils, Coffee, Truck, Clock, ShieldCheck, ChevronRight, Star } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-restaurant")
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
              className="object-cover opacity-20 scale-105"
              priority
              data-ai-hint={heroImage.imageHint}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background"></div>
          </div>
        )}

        <div className="relative z-10 max-w-6xl mx-auto text-center space-y-12">
          <div className="inline-flex items-center gap-2 px-6 py-2 glass rounded-full text-sm font-bold tracking-wider uppercase text-primary animate-float">
            <Star className="w-4 h-4 fill-primary" />
            The Gold Standard of Fast Food
          </div>
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.9]">
            CRAVE THE <span className="text-gold italic font-extrabold">SLICE</span><br />
            LOVE THE <span className="text-gold italic font-extrabold">JUICE</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
            Artisanal sourdough pizzas and cold-pressed organic juices. <br className="hidden md:block" />
            A premium symphony of flavors for the modern palate.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Button asChild size="lg" className="gold-gradient text-xl px-16 py-8 rounded-full w-full sm:w-auto font-bold shadow-2xl hover:scale-105 transition-transform">
              <Link href="/menu">Browse Menu</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="glass border-white/20 text-xl px-16 py-8 rounded-full w-full sm:w-auto font-bold hover:bg-white/5 transition-all">
              <Link href="/about">Our Philosophy</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Features */}
      <section className="py-24 px-4">
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
      <section className="py-24 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 space-y-16">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Trending <span className="text-gold">Flavors</span></h2>
              <p className="text-muted-foreground text-xl max-w-xl">The most ordered masterpieces from our kitchen this week.</p>
            </div>
            <Button asChild variant="ghost" className="text-gold text-lg group">
              <Link href="/menu" className="flex items-center gap-2">
                Full Menu <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <Carousel className="w-full">
            <CarouselContent className="-ml-6">
              {featuredItems.map((item, i) => (
                <CarouselItem key={i} className="pl-6 md:basis-1/2 lg:basis-1/3">
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
            <div className="hidden md:block">
              <CarouselPrevious className="glass border-white/10 -left-16" />
              <CarouselNext className="glass border-white/10 -right-16" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-bold text-primary-foreground text-xl">
                S&J
              </div>
              <span className="font-headline font-bold text-2xl tracking-tight">
                <span className="text-gold">Slice</span>&Juice
              </span>
            </div>
            <p className="text-muted-foreground">Elevating the fast food experience through artisanal quality and premium ingredients.</p>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-sm text-gold">Explore</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link href="/menu" className="hover:text-primary transition-colors">Full Menu</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
              <li><Link href="/location" className="hover:text-primary transition-colors">Find Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-sm text-gold">Company</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-sm text-gold">Join the Club</h4>
            <p className="text-sm text-muted-foreground mb-4">Subscribe to receive exclusive offers and flavor drops.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email" className="glass bg-white/5 border-white/10 rounded-lg px-4 py-2 w-full outline-none focus:border-primary/50" />
              <Button size="sm" className="gold-gradient">Join</Button>
            </div>
          </div>
        </div>
        <div className="text-center pt-12 border-t border-white/5">
          <p className="text-muted-foreground text-sm">© 2024 Slice & Juice Restaurant Group. Crafted for excellence.</p>
        </div>
      </footer>
    </main>
  )
}