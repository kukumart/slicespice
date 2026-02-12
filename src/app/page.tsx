import { Navbar } from "@/components/navbar"
import { GlassCard } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Truck, Clock, ShieldCheck, Star, ArrowRight, Share2, ChefHat, Flame, Leaf } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Logo } from "@/components/logo"

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-main")
  
  const featuredItems = [
    { ...PlaceHolderImages.find(img => img.id === "pizza-margherita"), label: "Yummy Cheese Pizza" },
    { ...PlaceHolderImages.find(img => img.id === "burger-beef"), label: "Big Juicy Burger" },
  ].filter(img => !!img.id)

  const processSteps = [
    { 
      icon: <ChefHat className="w-10 h-10" />, 
      title: "Homemade Dough", 
      desc: "We make our pizza bread from scratch so it's super soft and crunchy." 
    },
    { 
      icon: <Flame className="w-10 h-10" />, 
      title: "Tasty Spices", 
      desc: "We use special spices to make every bite full of flavor." 
    },
    { 
      icon: <Leaf className="w-10 h-10" />, 
      title: "Fresh Veggies", 
      desc: "All our food comes from local farms so it's healthy and fresh." 
    },
  ]

  const testimonials = [
    { name: "Julian M.", role: "Food Lover", text: "This is the best burger I've ever had! It's so big and yummy." },
    { name: "Sarah K.", role: "Pizza Fan", text: "The pizza arrived super fast and it was still nice and hot!" }
  ]

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 font-body">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center px-4 pt-20 overflow-hidden border-b border-white/5">
        {heroImage && (
          <div className="absolute inset-0 z-0">
            <Image 
              src={heroImage.imageUrl} 
              alt="Slice and Spice Experience" 
              fill 
              priority
              className="object-cover opacity-60 scale-105"
              data-ai-hint={heroImage.imageHint}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-transparent to-background" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
          </div>
        )}

        <div className="relative z-10 max-w-7xl mx-auto text-center space-y-8 py-16 px-4">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full text-[10px] font-black tracking-[0.4em] uppercase text-gold mx-auto glass backdrop-blur-2xl border-white/10 shadow-xl animate-in fade-in slide-in-from-top-4 duration-1000">
            <Star className="w-4 h-4 fill-gold" />
            The Best Food Experience
          </div>
          
          <div className="space-y-6">
            <h1 className="text-[var(--text-display)] font-black tracking-tighter leading-tight uppercase animate-in fade-in slide-in-from-bottom-12 duration-1000 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-white">
              BEST <span className="gold-highlight italic text-black px-4">PIZZA</span><br />
              BEST <span className="gold-highlight italic text-black px-4">BURGERS</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-tight font-bold animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300 drop-shadow-2xl uppercase tracking-tight">
              Yummy pizzas and big burgers delivered to your door in 30 minutes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 animate-in fade-in slide-in-from-bottom-20 duration-1000 delay-600">
            <Button asChild className="gold-gradient text-black text-lg px-12 py-8 rounded-2xl w-full sm:w-auto font-black shadow-2xl hover:scale-105 transition-all duration-500 uppercase tracking-widest border-none h-auto group">
              <Link href="/menu">
                ORDER NOW <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="glass border-white/20 text-lg px-12 py-8 rounded-2xl w-full sm:w-auto font-black hover:bg-white/10 transition-all text-white backdrop-blur-2xl uppercase tracking-widest h-auto">
              <Link href="/about">OUR STORY</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* The Process Section */}
      <section className="py-24 px-4 bg-background border-b border-white/5">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <p className="text-gold font-black uppercase tracking-[0.5em] text-[10px]">How We Cook</p>
            <h2 className="text-[var(--text-h1)] font-black tracking-tighter uppercase">Our Cooking <span className="gold-highlight text-black italic">Magic</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processSteps.map((step, i) => (
              <GlassCard key={i} className="p-10 text-center group" hover={true}>
                <div className="w-20 h-20 rounded-2xl gold-gradient flex items-center justify-center text-black mx-auto mb-6 shadow-2xl rotate-3 group-hover:rotate-12 transition-transform duration-500">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest leading-relaxed opacity-80">{step.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="space-y-3 max-w-2xl">
              <p className="text-gold font-black uppercase tracking-[0.5em] text-[10px]">Top Favorites</p>
              <h2 className="text-[var(--text-h1)] font-black tracking-tighter uppercase leading-none">Most Loved <span className="gold-highlight text-black italic animate-masterpiece">Food</span></h2>
            </div>
            <Link href="/menu" className="text-gold font-black uppercase tracking-widest text-[10px] hover:underline flex items-center gap-2 mb-2">
              See Everything <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {featuredItems.map((item, i) => (
              <Link href="/menu" key={i} className="group block no-underline">
                <GlassCard className="aspect-[16/9] rounded-3xl overflow-hidden relative" hover={true}>
                  <Image 
                    src={item.imageUrl!} 
                    alt={item.description!} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                    data-ai-hint={item.imageHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 group-hover:opacity-70 transition-opacity" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gold mb-2">Super Yummy</p>
                    <div className="flex justify-between items-end gap-6">
                      <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">{item.label}</h3>
                      <div className="w-14 h-14 rounded-full glass flex items-center justify-center group-hover:bg-gold group-hover:text-black transition-all shrink-0">
                        <ArrowRight className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-24 px-4 bg-white/5 border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <p className="text-gold font-black uppercase tracking-[0.5em] text-[10px]">Happy Customers</p>
            <h2 className="text-[var(--text-h1)] font-black tracking-tighter uppercase leading-none">What Kids and <span className="gold-highlight text-black italic">Grown-ups Say</span></h2>
            <p className="text-xl text-muted-foreground font-medium uppercase leading-relaxed tracking-tight">
              Join over 50,000 happy people who love our food every single day.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <p className="text-4xl font-black text-gold">4.9/5</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Star Rating</p>
              </div>
              <div>
                <p className="text-4xl font-black text-gold">30MIN</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Super Fast Delivery</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            {testimonials.map((t, i) => (
              <GlassCard key={i} className="p-8 border-white/5" hover={false}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center text-black font-black uppercase text-xs">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-black uppercase text-sm tracking-tight">{t.name}</p>
                    <p className="text-[10px] text-gold font-black uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
                <p className="text-lg italic font-medium leading-relaxed text-muted-foreground">"{t.text}"</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 bg-background relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center space-y-10 relative z-10">
          <h2 className="text-[var(--text-h1)] md:text-[var(--text-display)] font-black tracking-tighter uppercase leading-tight">Hungry for the <span className="gold-highlight text-black italic">Best?</span></h2>
          <p className="text-xl md:text-3xl max-w-3xl mx-auto font-medium leading-relaxed uppercase tracking-tight opacity-90">
            Order now and get the best food ever made. One click away!
          </p>
          <div className="flex justify-center">
            <Button asChild className="gold-gradient text-black px-12 py-10 rounded-3xl text-xl md:text-2xl font-black shadow-2xl hover:scale-110 transition-all uppercase tracking-widest border-none cursor-pointer group h-auto">
              <Link href="/menu" className="flex items-center gap-6">
                ORDER NOW <ArrowRight className="w-8 h-8 group-hover:translate-x-5 transition-transform duration-500" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-black border-t border-white/10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex justify-start">
                <Logo size="sm" className="items-start" />
              </div>
              <p className="text-muted-foreground text-sm font-medium leading-relaxed opacity-70 uppercase tracking-widest">
                We make the best food using fresh ingredients and a lot of love.
              </p>
            </div>
            
            <div className="space-y-6">
              <h4 className="font-black uppercase tracking-[0.4em] text-[10px] text-gold">Pages</h4>
              <ul className="space-y-3 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground list-none p-0">
                <li><Link href="/menu" className="hover:text-gold transition-colors no-underline">The Menu</Link></li>
                <li><Link href="/about" className="hover:text-gold transition-colors no-underline">About Us</Link></li>
                <li><Link href="/location" className="hover:text-gold transition-colors no-underline">Find Us</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="font-black uppercase tracking-[0.4em] text-[10px] text-gold">Company</h4>
              <ul className="space-y-3 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground list-none p-0">
                <li><Link href="#" className="hover:text-gold transition-colors no-underline">Work with Us</Link></li>
                <li><Link href="#" className="hover:text-gold transition-colors no-underline">Save the Planet</Link></li>
                <li><Link href="#" className="hover:text-gold transition-colors no-underline">Privacy Stuff</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="font-black uppercase tracking-[0.4em] text-[10px] text-gold">Newsletter</h4>
              <div className="flex flex-col gap-3">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-[10px] outline-none focus:border-gold/50 text-white transition-all font-black uppercase tracking-widest" 
                />
                <Button className="gold-gradient text-black py-3 rounded-xl font-black uppercase text-[10px] border-none cursor-pointer tracking-widest hover:opacity-90 transition-opacity h-auto">JOIN US</Button>
              </div>
            </div>
          </div>
          
          <div className="text-center pt-8 border-t border-white/5">
            <p className="text-muted-foreground text-[8px] tracking-[0.5em] font-black uppercase opacity-40">
              © 2024 SLICE & SPICE. THE BEST FOOD EVER.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
