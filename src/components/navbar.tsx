"use client"

import Link from "next/link"
import { ShoppingCart, Menu, X, MapPin, Info, Utensils } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Menu", href: "/menu", icon: <Utensils className="w-4 h-4 mr-2" /> },
    { name: "About", href: "/about", icon: <Info className="w-4 h-4 mr-2" /> },
    { name: "Location", href: "/location", icon: <MapPin className="w-4 h-4 mr-2" /> },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-6 pointer-events-none">
      <div className={cn(
        "max-w-7xl mx-auto p-3 flex items-center justify-between pointer-events-auto transition-all duration-500 rounded-[1.5rem]",
        scrolled ? "glass-dark shadow-2xl border-white/10 translate-y-[-4px]" : "bg-transparent"
      )}>
        <Link href="/" className="flex items-center gap-3 px-2 group">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center font-black text-primary-foreground text-2xl shadow-lg group-hover:rotate-12 transition-transform">
            S&J
          </div>
          <span className="font-headline font-black text-2xl tracking-tighter hidden sm:block">
            <span className="text-gold">SLICE</span>&JUICE
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-sm font-bold uppercase tracking-widest hover:text-gold transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 gold-gradient group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
          <Button asChild variant="default" className="rounded-full gold-gradient hover:opacity-90 transition-all font-black px-8 py-6 shadow-xl hover:scale-105 active:scale-95">
            <Link href="/order" className="flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2" />
              ORDER NOW
            </Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden glass w-12 h-12 rounded-2xl flex items-center justify-center text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 glass-dark rounded-[2rem] p-8 flex flex-col gap-6 pointer-events-auto animate-in fade-in slide-in-from-top-4 border-white/10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-2xl font-black uppercase tracking-tighter hover:text-gold flex items-center group"
              onClick={() => setIsOpen(false)}
            >
              <span className="w-2 h-2 rounded-full gold-gradient mr-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              {link.name}
            </Link>
          ))}
          <div className="h-px bg-white/5 my-2" />
          <Button asChild variant="default" className="w-full gold-gradient rounded-[1.25rem] py-8 text-xl font-black">
            <Link href="/order" className="flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 mr-3" />
              ORDER NOW
            </Link>
          </Button>
        </div>
      )}
    </nav>
  )
}