
"use client"

import { Navbar } from "@/components/navbar"
import { GlassCard } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import Image from "next/image"
import { useState } from "react"
import { Plus } from "lucide-react"

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

  const filteredItems = activeCategory === "All" 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory)

  return (
    <main className="min-h-screen bg-background pt-32 pb-24 px-4">
      <Navbar />
      
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-5xl font-bold text-center">Our <span className="text-gold">Menu</span></h1>
          
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeCategory === cat 
                  ? "gold-gradient text-primary-foreground" 
                  : "glass hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredItems.map(item => {
            const imgData = PlaceHolderImages.find(img => img.id === item.imageId)
            return (
              <GlassCard key={item.id} className="flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden">
                  {imgData && (
                    <Image 
                      src={imgData.imageUrl} 
                      alt={item.name} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-primary-foreground font-bold">{item.category}</Badge>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold leading-tight">{item.name}</h3>
                    <span className="text-gold font-bold">${item.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground flex-1">{item.desc}</p>
                  <Button className="w-full gold-gradient rounded-xl py-6 font-bold">
                    <Plus className="w-5 h-5 mr-2" />
                    Add to Order
                  </Button>
                </div>
              </GlassCard>
            )
          })}
        </div>
      </div>
    </main>
  )
}
