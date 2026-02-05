"use client"

import { Navbar } from "@/components/navbar"
import { GlassCard } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import Image from "next/image"
import { useState, useMemo, useEffect } from "react"
import { Plus, Minus, Search, Sparkles, Loader2, ShoppingCart, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useCart } from "@/context/cart-context"
import { recommendFood, RecommendFoodOutput } from "@/ai/flows/recommend-food-flow"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const MENU_ITEMS = [
  { id: 1, category: "Pizza", name: "Classic Margherita", price: 14.99, desc: "Fresh basil, buffalo mozzarella, and san marzano tomatoes.", imageId: "pizza-margherita" },
  { id: 2, category: "Pizza", name: "Fiery Pepperoni", price: 16.99, desc: "Spicy pepperoni, chili flakes, and triple cheese blend.", imageId: "pizza-pepperoni" },
  { id: 3, category: "Burgers", name: "Signature Gold Burger", price: 18.99, desc: "Aged beef patty, gold-leaf bun, truffle mayo, and aged cheddar.", imageId: "burger-beef" },
  { id: 4, category: "Burgers", name: "Crispy Sriracha Chicken", price: 15.99, desc: "Double-breaded chicken breast with honey sriracha glaze.", imageId: "burger-chicken" },
  { id: 5, category: "Snacks", name: "Truffle Fries", price: 7.99, desc: "Double-fried potatoes tossed in truffle oil and parmesan.", imageId: "snack-fries" },
  { id: 6, category: "Snacks", name: "Giant Onion Rings", price: 6.99, desc: "Sweet vidalia onions in a crispy golden beer batter.", imageId: "snack-onion-rings" },
  { id: 7, category: "Drinks", name: "Artisanal Latte", price: 5.49, desc: "Locally roasted beans with velvety steamed milk.", imageId: "coffee-latte" },
  { id: 8, category: "Drinks", name: "Fresh Mint Lemonade", price: 4.99, desc: "Cold-pressed lemons with garden-fresh mint leaves.", imageId: "drink-lemonade" },
]

const CATEGORIES = ["All", "Pizza", "Burgers", "Snacks", "Drinks"]

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [aiPreference, setAiPreference] = useState("")
  const [aiLoading, setAiLoading] = useState(false)
  const [aiResult, setAiResult] = useState<RecommendFoodOutput | null>(null)
  const [mounted, setMounted] = useState(false)
  
  const { addToCart, updateQty, cart, totalItems, subtotal } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.desc.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  const getItemQty = (id: number) => {
    return cart.find(i => i.id === id)?.qty || 0
  }

  const handleAddToCart = (item: any) => {
    addToCart(item)
    toast({
      title: "Selection Added",
      description: `${item.name} is now in your cart.`,
      className: "glass-dark border-primary/20",
    })
  }

  const handleAiRecommend = async () => {
    if (!aiPreference) return
    setAiLoading(true)
    setAiResult(null)
    try {
      const result = await recommendFood({ preference: aiPreference })
      setAiResult(result)
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Assistant is Busy",
        description: "The Taste Assistant is receiving high volume. Please try again in a few moments.",
        className: "glass-dark border-destructive/20",
      })
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background pt-32 pb-32 px-4 relative">
      <Navbar />
      
      <div className="max-w-7xl mx-auto space-y-24">
        <div className="flex flex-col items-center gap-16 text-center">
          <div className="space-y-8">
            <h1 className="text-9xl md:text-[12rem] font-black tracking-tight uppercase leading-[0.8]">
              Our <span className="gold-highlight italic animate-masterpiece text-black px-10">Curation</span>
            </h1>
            <p className="text-3xl md:text-5xl text-muted-foreground max-w-4xl mx-auto font-medium leading-tight">
              Explore a symphony of premium flavors, hand-crafted with artisanal precision.
            </p>
          </div>
          
          <div className="w-full max-w-5xl space-y-12">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="relative flex-1 group">
                <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-8 h-8 text-muted-foreground group-focus-within:text-gold transition-colors" />
                <Input 
                  className="glass h-24 pl-20 pr-10 rounded-[2rem] text-2xl border-white/5 focus-visible:ring-primary/20 bg-white/5 transition-all focus:bg-white/10"
                  placeholder="What are you craving?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {mounted && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="h-24 px-12 rounded-[2rem] gold-gradient text-black font-black shadow-2xl hover:scale-105 transition-all border-none uppercase tracking-widest text-base">
                      <Sparkles className="w-8 h-8 mr-4" />
                      AI Assistant
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="glass-dark border-white/10 text-foreground max-w-2xl rounded-[3rem] p-12">
                    <DialogHeader>
                      <DialogTitle className="text-5xl font-black uppercase tracking-tight text-center">Taste <span className="text-gold">Assistant</span></DialogTitle>
                    </DialogHeader>
                    <div className="space-y-10 pt-10">
                      <div className="space-y-4">
                        <p className="text-[12px] font-black text-muted-foreground uppercase tracking-[0.3em] text-center">Personalized Palate Mapping</p>
                        <Input 
                          placeholder="e.g. Something spicy for a rainy afternoon..." 
                          className="glass border-white/10 h-20 rounded-3xl text-xl px-8"
                          value={aiPreference}
                          onChange={(e) => setAiPreference(e.target.value)}
                        />
                      </div>
                      <Button 
                        onClick={handleAiRecommend} 
                        disabled={aiLoading}
                        className="w-full gold-gradient text-black h-20 rounded-3xl font-black text-2xl border-none shadow-xl hover:scale-[1.02] transition-all"
                      >
                        {aiLoading ? <Loader2 className="w-10 h-10 animate-spin" /> : "FIND MY MATCH"}
                      </Button>

                      {aiResult && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                          <div className="space-y-6">
                            {aiResult.recommendations.map((rec, i) => {
                              const item = MENU_ITEMS.find(m => m.id === rec.itemId)
                              return item ? (
                                <GlassCard key={i} className="p-8 border-primary/20 bg-white/5" hover={false}>
                                  <div className="flex justify-between items-start mb-6">
                                    <h4 className="font-black text-gold uppercase text-2xl tracking-tight leading-none">{item.name}</h4>
                                    <span className="font-black text-gold text-xl">${item.price}</span>
                                  </div>
                                  <div className="p-6 bg-primary/5 rounded-3xl border border-primary/20 mb-8 italic">
                                    <p className="text-sm text-foreground leading-relaxed font-black opacity-80">"{rec.reason}"</p>
                                  </div>
                                  <Button 
                                    size="lg" 
                                    className="gold-gradient text-black font-black h-16 rounded-2xl border-none w-full shadow-lg text-lg"
                                    onClick={() => handleAddToCart(item)}
                                  >
                                    ADD TO SELECTION
                                  </Button>
                                </GlassCard>
                              ) : null
                            })}
                          </div>
                          <div className="p-8 gold-gradient rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 opacity-10">
                              <Sparkles className="w-16 h-16 text-black" />
                            </div>
                            <p className="text-[12px] font-black text-black uppercase tracking-[0.3em] mb-4 opacity-60">Chef's Secret Pairing</p>
                            <p className="text-base font-bold text-black italic leading-relaxed">{aiResult.pairingTip}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-12 py-5 rounded-[1.5rem] font-black transition-all duration-500 text-base tracking-widest uppercase ${
                    activeCategory === cat 
                    ? "gold-gradient text-black shadow-2xl shadow-primary/20 scale-110" 
                    : "glass hover:bg-white/10 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => {
              const imgData = PlaceHolderImages.find(img => img.id === item.imageId)
              const qty = getItemQty(item.id)
              
              return (
                <GlassCard key={item.id} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] m-4 shadow-2xl">
                    {imgData ? (
                      <Image 
                        src={imgData.imageUrl} 
                        alt={item.name} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-[1500ms]"
                        data-ai-hint={imgData.imageHint}
                      />
                    ) : (
                      <Skeleton className="w-full h-full" />
                    )}
                    <div className="absolute top-8 left-8 z-20">
                      <Badge className="bg-primary text-black font-black px-6 py-3 rounded-2xl backdrop-blur-xl border-none shadow-2xl uppercase tracking-widest text-[12px]">
                        {item.category}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
                  </div>
                  <div className="p-10 pt-6 flex flex-col flex-1">
                    <div className="space-y-6 mb-10">
                      <div className="flex justify-between items-start gap-6">
                        <h3 className="text-3xl font-black leading-[1.1] group-hover:text-gold transition-colors uppercase tracking-tight">{item.name}</h3>
                        <span className="text-2xl font-black text-gold whitespace-nowrap">${item.price}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed font-medium opacity-80 uppercase tracking-widest line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                    
                    <div className="mt-auto">
                      {qty > 0 ? (
                        <div className="flex items-center justify-between glass p-3 rounded-3xl border-primary/40 bg-primary/5 animate-in fade-in zoom-in duration-500">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-16 w-16 rounded-2xl hover:bg-white/10 text-gold"
                            onClick={() => updateQty(item.id, -1)}
                          >
                            <Minus className="w-8 h-8" />
                          </Button>
                          <div className="flex flex-col items-center">
                            <span className="font-black text-2xl text-foreground leading-none">{qty}</span>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gold mt-2">Reserved</span>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-16 w-16 rounded-2xl hover:bg-white/10 text-gold"
                            onClick={() => updateQty(item.id, 1)}
                          >
                            <Plus className="w-8 h-8" />
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          onClick={() => handleAddToCart(item)}
                          className="w-full gold-gradient text-black rounded-3xl py-10 font-black shadow-2xl hover:scale-[1.02] active:scale-95 transition-all border-none uppercase tracking-widest text-sm flex items-center justify-center gap-4"
                        >
                          <Plus className="w-6 h-6" />
                          SELECT MASTERPIECE
                        </Button>
                      )}
                    </div>
                  </div>
                </GlassCard>
              )
            })
          ) : (
            Array.from({ length: 8 }).map((_, i) => (
              <GlassCard key={i} className="flex flex-col h-[700px]" hover={false}>
                <Skeleton className="h-[450px] w-full m-4 rounded-[2.5rem]" />
                <div className="p-10 space-y-8">
                  <Skeleton className="h-12 w-3/4" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-24 w-full rounded-3xl mt-auto" />
                </div>
              </GlassCard>
            ))
          )}
        </div>
      </div>

      {totalItems > 0 && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-6 animate-in slide-in-from-bottom-12 duration-1000">
          <Link href="/order" className="no-underline group block">
            <GlassCard className="p-8 bg-primary text-black border-none shadow-[0_20px_60px_rgba(255,215,0,0.4)] flex items-center justify-between hover:scale-[1.05] transition-all duration-500 rounded-[3rem]">
               <div className="flex items-center gap-8">
                  <div className="w-20 h-20 rounded-2xl bg-black/10 backdrop-blur-md flex items-center justify-center shadow-inner">
                    <ShoppingCart className="w-10 h-10" />
                  </div>
                  <div>
                    <p className="font-black text-3xl uppercase tracking-tighter leading-none">{totalItems} Masterpieces</p>
                    <p className="text-[12px] font-black opacity-60 uppercase tracking-[0.3em] mt-3">Curated Selection</p>
                  </div>
               </div>
               <div className="flex items-center gap-8 text-right">
                  <div className="space-y-2">
                    <p className="text-[12px] font-black uppercase tracking-[0.3em] opacity-60">Subtotal</p>
                    <p className="font-black text-4xl leading-none">${subtotal.toFixed(2)}</p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-black/5 flex items-center justify-center group-hover:translate-x-4 transition-transform duration-500">
                    <ArrowRight className="w-10 h-10" />
                  </div>
               </div>
            </GlassCard>
          </Link>
        </div>
      )}
    </main>
  )
}
