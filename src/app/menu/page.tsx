"use client"

import { Navbar } from "@/components/navbar"
import { GlassCard } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import Image from "next/image"
import { useState, useMemo } from "react"
import { Plus, Search, ShoppingBag } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useCart } from "@/context/cart-context"

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
  const { addToCart, cart } = useCart()

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

  return (
    <main className="min-h-screen bg-background pt-32 pb-24 px-4">
      <Navbar />
      
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="flex flex-col items-center gap-12 text-center">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight">Our <span className="text-gold italic">Masterpieces</span></h1>
            <p className="text-muted-foreground text-xl max-w-2xl">Discover a symphony of premium flavors, curated for the modern foodie.</p>
          </div>
          
          <div className="w-full max-w-4xl space-y-8">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-gold transition-colors" />
              <Input 
                className="glass h-16 pl-16 pr-6 rounded-2xl text-lg border-white/5 focus-visible:ring-primary/20 bg-white/5"
                placeholder="Search your cravings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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
                <GlassCard key={item.id} className="flex flex-col">
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
                      <Badge className="bg-primary/90 text-primary-foreground font-black px-4 py-1 rounded-lg backdrop-blur-md border-none shadow-lg">
                        {item.category.toUpperCase()}
                      </Badge>
                      {qty > 0 && (
                        <Badge className="bg-foreground text-background font-black px-4 py-1 rounded-lg backdrop-blur-md border-none shadow-lg self-start">
                          {qty} IN CART
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-1 space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold leading-tight group-hover:text-gold transition-colors">{item.name}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{item.desc}</p>
                    </div>
                    
                    <div className="pt-4 mt-auto border-t border-white/5 flex items-center justify-between">
                      <span className="text-2xl font-black text-gold">${item.price}</span>
                      <Button 
                        onClick={() => addToCart(item)}
                        className="gold-gradient text-primary-foreground rounded-xl px-4 py-6 font-black shadow-lg hover:scale-105 transition-transform border-none"
                      >
                        <Plus className="w-5 h-5" />
                        ADD
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-24 space-y-4">
            <h3 className="text-3xl font-bold text-muted-foreground">No matches found for "{searchQuery}"</h3>
            <p className="text-gold">Try exploring another category</p>
          </div>
        )}
      </div>
    </main>
  )
}
