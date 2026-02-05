import { Navbar } from "@/components/navbar"
import { GlassCard } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Truck, Clock, ShieldCheck, ChevronRight, Star, ArrowRight, Share2, Sparkles } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { ShareDialog } from "@/components/share-dialog"

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-main")
  
  const featuredItems = [
    { ...PlaceHolderImages.find(img => img.id === "pizza-margherita"), label: "Classic Pizza Margherita" },
    { ...PlaceHolderImages.find(img => img.id === "burger-beef"), label: "Juicy Classic Beef Burger" },
  ].filter(img => !!img.id)

  const features = [
    { 
      icon: <Clock className="w-10 h-10 text-primary-foreground" />, 
      title: "30 Min Delivery", 
      desc: "Freshness guaranteed at your doorstep within thirty minutes." 
    },
    { 
      icon: <ShieldCheck className="w-10 h-10 text-primary-foreground" />, 
      title: "Quality First", 
      desc: "Only premium, organic ingredients sourced from local farms." 
    },
    { 
      icon: <Truck className="w-10 h-10 text-primary-foreground" />, 
      title: "Eco-Delivery", 
      desc: "Carbon-neutral delivery in 100% biodegradable packaging." 
    },
  ]

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 font-body">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 overflow-hidden">
        {heroImage && (
          <div className="absolute inset-0 z-0">
            <Image 
              src={heroImage.imageUrl} 
              alt="Slice and Spice Experience" 
              fill 
              priority
              className="object-cover opacity-60 scale-105 animate-in fade-in zoom-in duration-[2000ms]"
              data-ai-hint={heroImage.imageHint}
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-background" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        )}

        <div className="relative z-10 max-w-7xl mx-auto text-center space-y-16 py-20 px-4">
          <div className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-base font-black tracking-[0.4em] uppercase text-primary mx-auto glass backdrop-blur-2xl border-primary/30 shadow-[0_0_50px_rgba(255,215,0,0.15)] animate-in fade-in slide-in-from-top-4 duration-1000">
            <Star className="w-6 h-6 fill-primary" />
            The Gold Standard Experience
          </div>
          
          <div className="space-y-12">
            <h1 className="text-9xl md:text-[13rem] lg:text-[16rem] font-black tracking-tighter leading-[0.8] uppercase animate-in fade-in slide-in-from-bottom-12 duration-1000 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              CRAVE THE <span className="gold-highlight italic text-primary-foreground px-10 py-3">SLICE</span><br />
              LOVE THE <span className="gold-highlight italic text-primary-foreground px-10 py-3">SPICE</span>
            </h1>
            <p className="text-3xl md:text-5xl text-white/90 max-w-5xl mx-auto leading-relaxed font-black animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300 drop-shadow-2xl uppercase tracking-tight">
              A premium symphony of artisanal sourdough pizzas and bold exotic spices.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-10 pt-10 animate-in fade-in slide-in-from-bottom-20 duration-1000 delay-600">
            <button className="gold-gradient text-primary-foreground text-2xl px-20 py-12 rounded-[3rem] w-full sm:w-auto font-black shadow-[0_30px_70px_rgba(255,215,0,0.3)] hover:scale-110 active:scale-95 transition-all duration-500 uppercase tracking-widest border-none flex items-center justify-center gap-4 cursor-pointer group">
              <Link href="/menu" className="flex items-center gap-4 no-underline text-primary-foreground">
                START SELECTION <ArrowRight className="w-8 h-8 text-primary-foreground group-hover:translate-x-3 transition-transform duration-500" />
              </Link>
            </button>
            <Button asChild variant="outline" size="lg" className="glass border-white/30 text-2xl px-20 py-12 rounded-[3rem] w-full sm:w-auto font-black hover:bg-white/10 transition-all text-white backdrop-blur-2xl uppercase tracking-widest hover:border-white/50">
              <Link href="/about">PHILOSOPHY</Link>
            </Button>
          </div>
        </div>

        {/* Ambient Premium Glows */}
        <div className="absolute top-1/3 -left-96 w-[60rem] h-[60rem] bg-primary/20 rounded-full blur-[180px] opacity-30 animate-pulse" />
        <div className="absolute bottom-0 -right-96 w-[60rem] h-[60rem] bg-primary/20 rounded-full blur-[180px] opacity-30 animate-pulse" />
      </section>

      {/* Value Propositions */}
      <section className="py-40 px-4 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {features.map((f, i) => (
              <GlassCard key={i} className="p-20 flex flex-col items-center text-center gap-12">
                <div className="w-32 h-32 rounded-[2.5rem] gold-gradient flex items-center justify-center text-primary-foreground shadow-2xl rotate-3 group-hover:rotate-12 transition-transform duration-700">
                  {f.icon}
                </div>
                <div className="space-y-6">
                  <h3 className="text-4xl font-black tracking-tight uppercase">{f.title}</h3>
                  <div className="h-1.5 w-16 gold-gradient mx-auto rounded-full group-hover:w-32 transition-all duration-700" />
                  <p className="text-muted-foreground leading-relaxed text-base font-medium uppercase tracking-widest opacity-80 pt-6">{f.desc}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="py-40 px-4 bg-background border-y border-white/5">
        <div className="max-w-7xl mx-auto space-y-32">
          <div className="space-y-12 text-center md:text-left relative">
            <div className="space-y-6">
              <p className="text-gold font-black uppercase tracking-[0.5em] text-sm">Curated Selection</p>
              <h2 className="text-7xl md:text-[10rem] font-black tracking-tighter uppercase leading-[0.85]">Trending <span className="gold-highlight italic animate-masterpiece text-primary-foreground">Masterpieces</span></h2>
            </div>
            <p className="text-muted-foreground text-2xl md:text-4xl max-w-4xl font-medium leading-tight">Discover our most requested culinary creations this season.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            {featuredItems.map((item, i) => (
              <Link href="/menu" key={i} className="group block">
                <GlassCard className="aspect-[16/10] rounded-[4rem] overflow-hidden">
                  <Image 
                    src={item.imageUrl!} 
                    alt={item.description!} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                    data-ai-hint={item.imageHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-700" />
                  <div className="absolute bottom-16 left-16 right-16 space-y-6">
                    <p className="text-[12px] font-black uppercase tracking-[0.5em] text-gold">Elite Signature Series</p>
                    <div className="flex justify-between items-end gap-10">
                      <h3 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">{item.label}</h3>
                      <div className="w-20 h-20 rounded-full glass flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all duration-700">
                        <ArrowRight className="w-10 h-10" />
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sharing Section */}
      <section className="py-48 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <GlassCard className="p-20 md:p-40 text-center space-y-24 border-primary/20 bg-primary/5 overflow-hidden group/share">
            <div className="absolute top-0 right-0 p-20 opacity-5 group-hover/share:opacity-10 transition-opacity duration-1000 rotate-12">
              <Share2 className="w-[40rem] h-[40rem] text-gold" />
            </div>
            <div className="space-y-12 relative z-10">
              <h2 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85]">Share the <span className="gold-highlight italic text-primary-foreground">Spice</span></h2>
              <p className="text-muted-foreground text-2xl md:text-4xl max-w-3xl mx-auto font-medium uppercase tracking-tight opacity-80">
                Invite your inner circle to the gold standard.
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-20 relative z-10">
               <div className="p-10 bg-white rounded-[4rem] shadow-[0_40px_100px_rgba(255,215,0,0.25)] rotate-[-4deg] hover:rotate-0 transition-all duration-700 hover:scale-105">
                  <ShareDialog trigger={
                    <div className="cursor-pointer">
                       <Image 
                        src="https://picsum.photos/seed/share-qr/300/300" 
                        alt="Scan to share" 
                        width={300} 
                        height={300}
                        className="rounded-[3rem]"
                        data-ai-hint="qr code"
                       />
                       <p className="text-[12px] font-black uppercase tracking-[0.4em] text-black mt-10 opacity-60">Scan to initiate</p>
                    </div>
                  } />
               </div>
               <div className="space-y-12 text-center md:text-left max-w-md">
                  <div className="space-y-6">
                    <p className="font-black uppercase tracking-[0.5em] text-base text-gold">Elite Referrals</p>
                    <p className="text-muted-foreground text-xl font-medium leading-relaxed">Unlock artisanal rewards for every new masterpiece lover you bring to the circle.</p>
                  </div>
                  <ShareDialog trigger={
                    <Button className="gold-gradient text-primary-foreground px-16 py-12 rounded-[2.5rem] font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-110 transition-all border-none text-sm">
                      <Share2 className="w-8 h-8 mr-6 text-primary-foreground" />
                      Generate Invite Link
                    </Button>
                  } />
               </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-48 px-4 bg-background relative border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center space-y-20">
          <div className="space-y-6">
            <h2 className="text-7xl md:text-[11rem] font-black tracking-tighter uppercase leading-[0.8]">Ready for the <span className="gold-highlight italic text-primary-foreground">Peak?</span></h2>
          </div>
          <p className="text-muted-foreground text-3xl md:text-5xl max-w-4xl mx-auto font-medium leading-relaxed uppercase tracking-tight opacity-90">
            Join the elite circle of food lovers. Your masterpiece is waiting.
          </p>
          <button className="gold-gradient text-primary-foreground px-24 py-14 rounded-[4rem] text-3xl font-black shadow-[0_40px_100px_rgba(255,215,0,0.3)] hover:scale-110 transition-all uppercase tracking-widest border-none cursor-pointer group">
            <Link href="/menu" className="no-underline text-primary-foreground flex items-center gap-6">
              START ORDER <ArrowRight className="w-10 h-10 group-hover:translate-x-5 transition-transform duration-500" />
            </Link>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-40 px-4 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 mb-40">
            <div className="space-y-12">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center font-black text-primary-foreground text-4xl shadow-2xl">
                  S&S
                </div>
                <span className="font-black text-4xl tracking-tighter uppercase text-white">
                  SLICE<span className="text-gold">&</span>SPICE
                </span>
              </div>
              <p className="text-muted-foreground text-xl font-medium leading-relaxed opacity-70">
                The global benchmark for premium fast food.
              </p>
            </div>
            
            <div className="space-y-12">
              <h4 className="font-black uppercase tracking-[0.4em] text-sm text-gold">Curation</h4>
              <ul className="space-y-8 text-base font-black uppercase tracking-[0.2em] text-muted-foreground">
                <li><Link href="/menu" className="hover:text-gold transition-colors">Menu Stream</Link></li>
                <li><Link href="/about" className="hover:text-gold transition-colors">Our Ethos</Link></li>
                <li><Link href="/location" className="hover:text-gold transition-colors">Hub Locator</Link></li>
              </ul>
            </div>

            <div className="space-y-12">
              <h4 className="font-black uppercase tracking-[0.4em] text-sm text-gold">Corporate</h4>
              <ul className="space-y-8 text-base font-black uppercase tracking-[0.2em] text-muted-foreground">
                <li><Link href="#" className="hover:text-gold transition-colors">Franchise Inquiry</Link></li>
                <li><Link href="#" className="hover:text-gold transition-colors">Sustainability</Link></li>
                <li><Link href="#" className="hover:text-gold transition-colors">Privacy Protocols</Link></li>
              </ul>
            </div>

            <div className="space-y-12">
              <h4 className="font-black uppercase tracking-[0.4em] text-sm text-gold">Elite News</h4>
              <div className="flex flex-col gap-6">
                <input 
                  type="email" 
                  placeholder="Official Email Address" 
                  className="bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-base outline-none focus:border-gold/50 text-white transition-all font-bold" 
                />
                <button className="gold-gradient text-primary-foreground py-6 rounded-2xl font-black uppercase text-sm border-none cursor-pointer hover:opacity-90 transition-opacity">JOIN CIRCLE</button>
              </div>
            </div>
          </div>
          
          <div className="text-center pt-32 border-t border-white/10">
            <p className="text-muted-foreground text-[12px] tracking-[0.5em] font-black uppercase opacity-40">
              © 2024 SLICE & SPICE RESTAURANT GROUP. DEFINING THE GOLD STANDARD.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
