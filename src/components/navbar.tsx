
"use client"

import Link from "next/link"
import { ShoppingCart, Menu, X, MapPin, Info, Utensils, User, LogOut, LayoutDashboard, Settings, Shield } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useCart } from "@/context/cart-context"
import { Badge } from "@/components/ui/badge"
import { useFirebase, useDoc, useFirestore, useMemoFirebase } from "@/firebase"
import { doc } from "firebase/firestore"
import { ShareDialog } from "./share-dialog"
import { Logo } from "./logo"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { totalItems } = useCart()
  const { auth, user } = useFirebase()
  const db = useFirestore()

  const adminRef = useMemoFirebase(() => user ? doc(db, "roles_admin", user.uid) : null, [db, user])
  const { data: adminRole } = useDoc(adminRef)
  const isAdmin = !!adminRole

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Menu", href: "/menu", icon: <Utensils className="w-4 h-4 mr-2" /> },
    { name: "About Us", href: "/about", icon: <Info className="w-4 h-4 mr-2" /> },
    { name: "Location", href: "/location", icon: <MapPin className="w-4 h-4 mr-2" /> },
  ]

  const handleLogout = () => {
    auth.signOut()
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-6 pointer-events-none">
      <div className={cn(
        "max-w-7xl mx-auto p-3 flex items-center justify-between pointer-events-auto transition-all duration-500 rounded-[1.5rem]",
        scrolled ? "glass-dark shadow-2xl border-white/10 translate-y-[-4px]" : "bg-transparent"
      )}>
        <Link href="/" className="flex items-center gap-3 px-2 group no-underline">
          <Logo size="sm" />
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-xs font-black uppercase tracking-widest hover:text-gold transition-colors relative group no-underline text-foreground"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 gold-gradient group-hover:w-full transition-all duration-300" />
            </Link>
          ))}

          <div className="flex items-center gap-4">
            <ShareDialog />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-12 w-12 rounded-2xl glass hover:bg-white/10">
                    <User className="w-6 h-6 text-gold" />
                    {isAdmin && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-background flex items-center justify-center">
                        <Shield className="w-2.5 h-2.5 text-black fill-black" />
                      </div>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="glass-dark border-white/10 w-64" align="end">
                  <DropdownMenuLabel className="font-black uppercase tracking-widest text-[10px] text-muted-foreground p-4">Member Identity</DropdownMenuLabel>
                  <div className="px-4 pb-4">
                    <p className="text-xs font-black truncate text-foreground">{user.email || 'Anonymous Member'}</p>
                    <div className="mt-2">
                      <span className="gold-highlight text-[8px] font-black px-2 py-0.5 rounded-md uppercase tracking-[0.2em] text-black">
                        {isAdmin ? "ADMIN COMMANDER" : "GOLD STANDARD PROFILE"}
                      </span>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-white/5" />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer font-bold flex items-center gap-2 py-4 px-4 hover:bg-white/5">
                      <Settings className="w-4 h-4 text-gold" /> My Selection Vault
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin/dashboard" className="cursor-pointer font-bold flex items-center gap-2 py-4 px-4 hover:bg-white/5 bg-primary/5">
                        <LayoutDashboard className="w-4 h-4 text-primary" /> Admin Command Center
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator className="bg-white/5" />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer font-bold text-destructive hover:text-destructive flex items-center gap-2 py-4 px-4">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="ghost" className="h-12 px-6 rounded-2xl glass hover:bg-white/10 font-black uppercase tracking-widest text-xs">
                <Link href="/auth">Sign In</Link>
              </Button>
            )}

            <Button asChild variant="default" className="rounded-2xl gold-gradient hover:opacity-90 transition-all font-black px-8 py-6 shadow-xl hover:scale-105 active:scale-95 relative overflow-visible border-none text-black">
              <Link href="/order" className="flex items-center text-black no-underline">
                <ShoppingCart className="w-5 h-5 mr-2 text-black" />
                ORDER
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-black text-primary font-bold border-2 border-primary rounded-full px-2 py-0.5 min-w-[1.5rem] h-6 flex items-center justify-center">
                    {totalItems}
                  </Badge>
                )}
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4 md:hidden pointer-events-auto">
          <ShareDialog />
          <Link href="/order" className="relative glass w-12 h-12 rounded-2xl flex items-center justify-center no-underline">
            <ShoppingCart className="w-6 h-6 text-foreground" />
            {totalItems > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-primary text-black font-black text-[10px] p-1 h-5 w-5 flex items-center justify-center rounded-full">
                {totalItems}
              </Badge>
            )}
          </Link>
          <button 
            className="glass w-12 h-12 rounded-2xl flex items-center justify-center text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 glass-dark rounded-[2rem] p-8 flex flex-col gap-6 pointer-events-auto animate-in fade-in slide-in-from-top-4 border-white/10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-2xl font-black uppercase tracking-tighter hover:text-gold flex items-center group no-underline text-foreground"
              onClick={() => setIsOpen(false)}
            >
              <span className="w-2 h-2 rounded-full gold-gradient mr-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              {link.name}
            </Link>
          ))}
          {user && (
             <Link 
              href="/profile" 
              className="text-2xl font-black uppercase tracking-tighter hover:text-gold flex items-center group no-underline text-foreground"
              onClick={() => setIsOpen(false)}
            >
              <span className="w-2 h-2 rounded-full gold-gradient mr-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              My Vault
            </Link>
          )}
          {isAdmin && (
             <Link 
              href="/admin/dashboard" 
              className="text-2xl font-black uppercase tracking-tighter text-primary flex items-center group no-underline"
              onClick={() => setIsOpen(false)}
            >
              <span className="w-2 h-2 rounded-full bg-primary mr-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              Admin Center
            </Link>
          )}
          <div className="h-px bg-white/5 my-2" />
          <div className="grid grid-cols-2 gap-4">
            {user ? (
               <Button onClick={handleLogout} variant="outline" className="glass rounded-[1.25rem] py-8 text-lg font-black uppercase tracking-widest text-destructive">
                LOGOUT
               </Button>
            ) : (
              <Button asChild variant="outline" className="glass rounded-[1.25rem] py-8 text-lg font-black uppercase tracking-widest">
                <Link href="/auth">LOGIN</Link>
              </Button>
            )}
            <Button asChild variant="default" className="gold-gradient rounded-[1.25rem] py-8 text-lg font-black border-none text-black">
              <Link href="/order" className="flex items-center justify-center text-black no-underline">
                <ShoppingCart className="w-6 h-6 mr-3 text-black" />
                ORDER
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
