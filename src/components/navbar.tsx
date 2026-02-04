
"use client"

import Link from "next/link"
import { ShoppingCart, Menu, X, MapPin, Info } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: "Menu", href: "/menu", icon: <Menu className="w-4 h-4 mr-2" /> },
    { name: "About", href: "/about", icon: <Info className="w-4 h-4 mr-2" /> },
    { name: "Location", href: "/location", icon: <MapPin className="w-4 h-4 mr-2" /> },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 pointer-events-none">
      <div className="max-w-7xl mx-auto glass rounded-2xl p-4 flex items-center justify-between pointer-events-auto">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center font-bold text-primary-foreground text-xl">
            S&J
          </div>
          <span className="font-headline font-bold text-xl tracking-tight hidden sm:block">
            <span className="text-gold">Slice</span>&Juice
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium hover:text-primary transition-colors flex items-center"
            >
              {link.name}
            </Link>
          ))}
          <Button asChild variant="default" className="rounded-full gold-gradient hover:opacity-90 transition-opacity">
            <Link href="/order" className="flex items-center">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Order Now
            </Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 glass rounded-2xl p-6 flex flex-col gap-4 pointer-events-auto animate-in fade-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-lg font-medium hover:text-primary flex items-center"
              onClick={() => setIsOpen(false)}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
          <Button asChild variant="default" className="w-full gold-gradient rounded-xl py-6">
            <Link href="/order" className="flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Order Now
            </Link>
          </Button>
        </div>
      )}
    </nav>
  )
}
