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
    <main className="min-h-screen bg-background pt-24 pb-32 px-4 relative">
      <Navbar />
      
      <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="space-y-4">
            <h1 className="text-[var(--text-display)] font-black tracking-tight uppercase leading-[0.8]">
              Our <span className="gold-highlight italic animate-masterpiece text-black px-6">Curation</span>
            </h1>
            <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium leading-tight">
              Explore a symphony of premium flavors, hand-crafted with artisanal precision.
            </p>
          </div>
          
          <div className="w-full max-w-4xl space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1 group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-gold transition-colors" />
                <Input 
                  className="glass h-14 pl-14 pr-6 rounded-2xl text-lg border-white/5 focus-visible:ring-primary/20 bg-white/5 transition-all focus:bg-white/10"
                  placeholder="What are you craving?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {mounted && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="h-14 px-8 rounded-2xl gold-gradient text-black font-black shadow-xl hover:scale-105 transition-all border-none uppercase tracking-widest text-xs h-auto">
                      <Sparkles className="w-5 h-5 mr-3" />
                      AI Assistant
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="glass-dark border-white/10 text-foreground max-w-xl rounded-3xl p-8">
                    <DialogHeader>
                      <DialogTitle className="text-3xl font-black uppercase tracking-tight text-center">Taste <span className="text-gold">Assistant</span></DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 pt-6">
                      <div className="space-y-2">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] text-center">Personalized Palate Mapping</p>
                        <Input 
                          placeholder="e.g. Something spicy for a rainy afternoon..." 
                          className="glass border-white/10 h-14 rounded-xl text-base px-6"
                          value={aiPreference}
                          onChange={(e) => setAiPreference(e.target.value)}
                        />
                      </div>
                      <Button 
                        onClick={handleAiRecommend} 
                        disabled={aiLoading}
                        className="w-full gold-gradient text-black h-14 rounded-xl font-black text-lg border-none shadow-xl hover:scale-[1.02] transition-all"
                      >
                        {aiLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "FIND MY MATCH"}
                      </Button>

                      {aiResult && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                          <div className="space-y-4">
                            {aiResult.recommendations.map((rec, i) => {
                              const item = MENU_ITEMS.find(m => m.id === rec.itemId)
                              return item ? (
                                <GlassCard key={i} className="p-6 border-primary/20 bg-white/5" hover={false}>
                                  <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-black text-gold uppercase text-lg tracking-tight leading-none">{item.name}</h4>
                                    <span className="font-black text-gold text-lg">${item.price}</span>
                                  </div>
                                  <div className="p-3 bg-primary/5 rounded-xl border border-primary/20 mb-4 italic">
                                    <p className="text-xs text-foreground leading-relaxed font-black opacity-80">"{rec.reason}"</p>
                                  </div>
                                  <Button 
                                    size="sm" 
                                    className="gold-gradient text-black font-black h-10 rounded-lg border-none w-full shadow-lg text-xs"
                                    onClick={() => handleAddToCart(item)}
                                  >
                                    ADD TO SELECTION
                                  </Button>
                                </GlassCard>
                              ) : null
                            })}
                          </div>
                          <div className="p-6 gold-gradient rounded-2xl shadow-xl relative overflow-hidden">
                            <p className="text-[9px] font-black text-black uppercase tracking-[0.3em] mb-2 opacity-60">Chef's Secret Pairing</p>
                            <p className="text-xs font-bold text-black italic leading-relaxed">{aiResult.pairingTip}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-xl font-black transition-all duration-300 text-xs tracking-widest uppercase ${
                    activeCategory === cat 
                    ? "gold-gradient text-black shadow-lg scale-105" 
                    : "glass hover:bg-white/10 text-muted-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => {
              const imgData = PlaceHolderImages.find(img => img.id === item.imageId)
              const qty = getItemQty(item.id)
              
              return (
                <GlassCard key={item.id} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl m-3 shadow-xl">
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
                    <div className="absolute top-4 left-4 z-20">
                      <Badge className="bg-primary text-black font-black px-3 py-1 rounded-lg backdrop-blur-xl border-none shadow-lg uppercase tracking-widest text-[9px]">
                        {item.category}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  </div>
                  <div className="p-6 pt-2 flex flex-col flex-1">
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-start gap-3">
                        <h3 className="text-xl font-black leading-tight group-hover:text-gold transition-colors uppercase tracking-tight">{item.name}</h3>
                        <span className="text-lg font-black text-gold whitespace-nowrap">${item.price}</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed font-medium uppercase tracking-widest line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                    
                    <div className="mt-auto">
                      {qty > 0 ? (
                        <div className="flex items-center justify-between glass p-1.5 rounded-xl border-primary/40 bg-primary/5 animate-in fade-in zoom-in">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-10 w-10 rounded-lg hover:bg-white/10 text-gold"
                            onClick={() => updateQty(item.id, -1)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <div className="flex flex-col items-center">
                            <span className="font-black text-lg text-foreground leading-none">{qty}</span>
                            <span className="text-[7px] font-black uppercase tracking-[0.2em] text-gold mt-1">Reserved</span>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-10 w-10 rounded-lg hover:bg-white/10 text-gold"
                            onClick={() => updateQty(item.id, 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          onClick={() => handleAddToCart(item)}
                          className="w-full gold-gradient text-black rounded-xl py-6 font-black shadow-lg hover:scale-[1.02] active:scale-95 transition-all border-none uppercase tracking-widest text-xs flex items-center justify-center gap-3 h-auto"
                        >
                          <Plus className="w-4 h-4" />
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
              <GlassCard key={i} className="flex flex-col h-[500px]" hover={false}>
                <Skeleton className="h-[300px] w-full m-3 rounded-2xl" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-12 w-full rounded-xl mt-auto" />
                </div>
              </GlassCard>
            ))
          )}
        </div>
      </div>

      {totalItems > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4 animate-in slide-in-from-bottom-8 duration-700">
          <Link href="/order" className="no-underline group block">
            <GlassCard className="p-5 bg-primary text-black border-none shadow-2xl flex items-center justify-between hover:scale-[1.02] transition-all rounded-3xl">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-black/10 flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-black text-xl uppercase tracking-tighter leading-none">{totalItems} Masterpieces</p>
                    <p className="text-[9px] font-black opacity-60 uppercase tracking-[0.3em] mt-1">Curated Selection</p>
                  </div>
               </div>
               <div className="flex items-center gap-4 text-right">
                  <div className="space-y-0.5">
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] opacity-60">Subtotal</p>
                    <p className="font-black text-2xl leading-none">${subtotal.toFixed(2)}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center group-hover:translate-x-2 transition-transform shrink-0">
                    <ArrowRight className="w-6 h-6" />
                  </div>
               </div>
            </GlassCard>
          </Link>
        </div>
      )}
    </main>
  )
}