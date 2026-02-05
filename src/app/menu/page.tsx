"use client"

import { Navbar } from "@/components/navbar"
import { GlassCard } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import Image from "next/image"
import { useState, useMemo } from "react"
import { Plus, Minus, Search, Sparkles, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useCart } from "@/context/cart-context"
import { recommendFood, RecommendFoodOutput } from "@/ai/flows/recommend-food-flow"
import { useToast } from "@/hooks/use-toast"
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
  
  const { addToCart, updateQty, cart } = useCart()
  const { toast } = useToast()

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
      title: "Added to Cart",
      description: `${item.name} has been added to your selection.`,
      className: "glass-dark border-primary/20",
    })
  }

  const handleAiRecommend = async () => {
    if (!aiPreference) return
    setAiLoading(true)
    try {
      const result = await recommendFood({ preference: aiPreference })
      setAiResult(result)
    } catch (error) {
      console.error(error)
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background pt-32 pb-24 px-4">
      <Navbar />
      
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="flex flex-col items-center gap-12 text-center">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight uppercase">Our <span className="gold-highlight italic animate-masterpiece text-primary-foreground">Masterpieces</span></h1>
            <p className="text-muted-foreground text-xl max-w-2xl font-medium">Discover a symphony of premium flavors, curated for the modern foodie.</p>
          </div>
          
          <div className="w-full max-w-4xl space-y-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1 group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-gold transition-colors" />
                <Input 
                  className="glass h-16 pl-16 pr-6 rounded-2xl text-lg border-white/5 focus-visible:ring-primary/20 bg-white/5"
                  placeholder="Search your cravings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="h-16 px-8 rounded-2xl gold-gradient text-primary-foreground font-black shadow-xl hover:scale-105 transition-all border-none">
                    <Sparkles className="w-5 h-5 mr-2 text-primary-foreground" />
                    ASK AI TASTE ASSISTANT
                  </Button>
                </DialogTrigger>
                <DialogContent className="glass-dark border-white/10 text-foreground max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="text-3xl font-black uppercase tracking-tight">AI Taste <span className="text-gold">Assistant</span></DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 pt-4">
                    <div className="space-y-2">
                      <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Describe your mood or craving</p>
                      <Input 
                        placeholder="e.g. Something spicy and a cold drink..." 
                        className="glass border-white/10 h-14"
                        value={aiPreference}
                        onChange={(e) => setAiPreference(e.target.value)}
                      />
                    </div>
                    <Button 
                      onClick={handleAiRecommend} 
                      disabled={aiLoading}
                      className="w-full gold-gradient text-primary-foreground h-14 font-black text-lg border-none"
                    >
                      {aiLoading ? <Loader2 className="w-6 h-6 animate-spin text-primary-foreground" /> : "GENERATE RECOMMENDATION"}
                    </Button>

                    {aiResult && (
                      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="space-y-4">
                          {aiResult.recommendations.map((rec, i) => {
                            const item = MENU_ITEMS.find(m => m.id === rec.itemId)
                            return item ? (
                              <div key={i} className="glass p-4 rounded-xl border-primary/20 bg-primary/5">
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-black text-gold uppercase">{item.name}</h4>
                                  <span className="font-bold text-xs">${item.price}</span>
                                </div>
                                <p className="text-sm text-muted-foreground italic">"{rec.reason}"</p>
                                <Button 
                                  size="sm" 
                                  className="mt-3 gold-gradient text-primary-foreground font-black h-8 border-none w-full"
                                  onClick={() => handleAddToCart(item)}
                                >
                                  ADD TO SELECTION
                                </Button>
                              </div>
                            ) : null
                          })}
                        </div>
                        <div className="p-4 border-l-4 border-gold bg-white/5 rounded-r-xl">
                          <p className="text-xs font-black text-gold uppercase tracking-widest mb-1">Spice Pairing Tip</p>
                          <p className="text-sm italic">{aiResult.pairingTip}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-8 py-3 rounded-full font-bold transition-all duration-300 text-sm tracking-widest uppercase ${
                    activeCategory === cat 
                    ? "gold-gradient text-primary-foreground shadow-lg shadow-primary/20 scale-105" 
                    : "glass hover:bg-white/10 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {filteredItems.map(item => {
              const imgData = PlaceHolderImages.find(img => img.id === item.imageId)
              const qty = getItemQty(item.id)
              
              return (
                <GlassCard key={item.id} className="flex flex-col group">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    {imgData && (
                      <Image 
                        src={imgData.imageUrl} 
                        alt={item.name} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        data-ai-hint={imgData.imageHint}
                      />
                    )}
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                      <Badge className="bg-primary text-primary-foreground font-black px-4 py-1 rounded-lg backdrop-blur-md border-none shadow-lg uppercase tracking-widest">
                        {item.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-1 space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors uppercase tracking-tight">{item.name}</h3>
                        <span className="text-xl font-black text-gold whitespace-nowrap">${item.price}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 font-medium">{item.desc}</p>
                    </div>
                    
                    <div className="pt-4 mt-auto border-t border-white/5">
                      {qty > 0 ? (
                        <div className="flex items-center justify-between glass p-1.5 rounded-2xl border-primary/40 bg-primary/5 animate-in fade-in zoom-in duration-300">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-12 w-12 rounded-xl hover:bg-white/10 text-gold"
                            onClick={() => updateQty(item.id, -1)}
                          >
                            <Minus className="w-5 h-5" />
                          </Button>
                          <div className="flex flex-col items-center">
                            <span className="font-black text-xl">{qty}</span>
                            <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">In Cart</span>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-12 w-12 rounded-xl hover:bg-white/10 text-gold"
                            onClick={() => updateQty(item.id, 1)}
                          >
                            <Plus className="w-5 h-5" />
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          onClick={() => handleAddToCart(item)}
                          className="w-full gold-gradient text-primary-foreground rounded-2xl py-7 font-black shadow-xl hover:scale-[1.02] active:scale-95 transition-all border-none uppercase tracking-widest flex items-center justify-center gap-2"
                        >
                          <Plus className="w-5 h-5 text-primary-foreground" />
                          ADD TO CART
                        </Button>
                      )}
                    </div>
                  </div>
                </GlassCard>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-24 space-y-4">
            <h3 className="text-3xl font-bold text-muted-foreground">No matches found for "{searchQuery}"</h3>
            <p className="text-primary-foreground gold-gradient px-4 py-1 rounded-lg inline-block font-black">Try exploring another category</p>
          </div>
        )}
      </div>
    </main>
  )
}
