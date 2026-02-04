
"use client"

import { Navbar } from "@/components/navbar"
import { GlassCard } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { ShoppingBag, Truck, CreditCard, ChevronRight, Minus, Plus, Trash2, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/cart-context"
import Link from "next/link"

export default function OrderPage() {
  const router = useRouter()
  const { cart, subtotal, updateQty, removeFromCart, clearCart } = useCart()
  const [step, setStep] = useState(1) // 1: Cart Summary, 2: Delivery Details

  const deliveryFee = cart.length > 0 ? 3.50 : 0
  const total = subtotal + deliveryFee

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    const orderId = Math.random().toString(36).substr(2, 9).toUpperCase()
    clearCart()
    router.push(`/track/${orderId}`)
  }

  if (cart.length === 0 && step === 1) {
    return (
      <main className="min-h-screen bg-background pt-32 pb-24 px-4">
        <Navbar />
        <div className="max-w-xl mx-auto text-center space-y-8">
          <div className="w-32 h-32 glass rounded-full flex items-center justify-center mx-auto text-gold animate-float">
            <ShoppingBag className="w-16 h-16" />
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight">Your cart is <span className="text-gold">empty</span></h1>
            <p className="text-muted-foreground text-lg">Looks like you haven't added any masterpieces to your selection yet.</p>
          </div>
          <Button asChild size="lg" className="gold-gradient px-12 py-8 rounded-2xl font-bold text-lg">
            <Link href="/menu">Go to Menu</Link>
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background pt-32 pb-24 px-4">
      <Navbar />

      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${step >= 1 ? 'border-primary text-gold bg-primary/5 shadow-lg shadow-primary/5' : 'border-white/10 text-muted-foreground'}`}>
            <ShoppingBag className="w-4 h-4" />
            <span className="font-bold whitespace-nowrap">Order Review</span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${step >= 2 ? 'border-primary text-gold bg-primary/5 shadow-lg shadow-primary/5' : 'border-white/10 text-muted-foreground'}`}>
            <Truck className="w-4 h-4" />
            <span className="font-bold whitespace-nowrap">Delivery & Payment</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Area */}
          <div className="lg:col-span-2 space-y-8">
            {step === 1 ? (
              <GlassCard className="p-8 space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold">Your <span className="text-gold">Selection</span></h2>
                  <Button variant="ghost" onClick={clearCart} className="text-muted-foreground hover:text-destructive flex items-center gap-2">
                    <Trash2 className="w-4 h-4" /> Clear All
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between py-6 border-b border-white/5 gap-6">
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-20 glass rounded-2xl overflow-hidden flex-shrink-0 relative">
                          <div className="absolute inset-0 gold-gradient opacity-10" />
                          <div className="w-full h-full flex items-center justify-center font-bold text-2xl text-gold">
                            {item.name.charAt(0)}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold text-xl">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                          <p className="font-bold text-gold">${item.price}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between sm:justify-end gap-8">
                        <div className="flex items-center gap-4 glass p-1.5 rounded-xl">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="w-8 h-8 rounded-lg hover:bg-white/10"
                            onClick={() => updateQty(item.id, -1)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="font-black min-w-[1.5rem] text-center">{item.qty}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="w-8 h-8 rounded-lg hover:bg-white/10"
                            onClick={() => updateQty(item.id, 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <span className="font-black text-xl min-w-[5rem] text-right">${(item.price * item.qty).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button asChild variant="outline" className="flex-1 py-8 rounded-2xl font-bold border-white/10">
                    <Link href="/menu"><ArrowLeft className="w-4 h-4 mr-2" /> Add More</Link>
                  </Button>
                  <Button onClick={() => setStep(2)} className="flex-[2] gold-gradient py-8 rounded-2xl text-lg font-bold shadow-xl shadow-primary/10">
                    Proceed to Delivery
                  </Button>
                </div>
              </GlassCard>
            ) : (
              <GlassCard className="p-8 space-y-8">
                <h2 className="text-3xl font-bold">Delivery <span className="text-gold">Details</span></h2>
                <form onSubmit={handlePlaceOrder} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-muted-foreground uppercase tracking-widest text-[10px] font-black">Full Name</Label>
                      <Input className="glass h-14 border-white/10 focus:border-primary/50" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-muted-foreground uppercase tracking-widest text-[10px] font-black">Phone Number</Label>
                      <Input className="glass h-14 border-white/10 focus:border-primary/50" placeholder="+1 (555) 000-0000" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground uppercase tracking-widest text-[10px] font-black">Delivery Address</Label>
                    <Input className="glass h-14 border-white/10 focus:border-primary/50" placeholder="Street Name, Building No." required />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground uppercase tracking-widest text-[10px] font-black">Delivery Note (Optional)</Label>
                    <Textarea className="glass min-h-[100px] border-white/10 focus:border-primary/50" placeholder="Gate code, floor, or specific instructions..." />
                  </div>
                  
                  <div className="space-y-4 pt-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-gold" />
                      Payment Method
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <label className="relative glass p-6 rounded-2xl cursor-pointer border border-primary/40 bg-primary/5 shadow-inner">
                        <input type="radio" name="payment" className="absolute opacity-0" defaultChecked />
                        <div className="font-bold text-lg">Cash on Delivery</div>
                        <div className="text-xs text-muted-foreground">Pay when you receive</div>
                      </label>
                      <label className="relative glass p-6 rounded-2xl cursor-not-allowed border border-white/5 opacity-40">
                        <input type="radio" name="payment" className="absolute opacity-0" disabled />
                        <div className="font-bold text-lg">Credit/Debit Card</div>
                        <div className="text-xs text-muted-foreground italic">Coming Soon</div>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <Button type="button" variant="ghost" onClick={() => setStep(1)} className="flex-1 py-8 rounded-2xl font-bold">
                      Back to Cart
                    </Button>
                    <Button type="submit" className="flex-[2] gold-gradient py-8 rounded-2xl text-lg font-bold shadow-2xl">
                      Confirm & Place Order
                    </Button>
                  </div>
                </form>
              </GlassCard>
            )}
          </div>

          {/* Sidebar Summary */}
          <div className="space-y-8">
            <GlassCard className="p-8 space-y-6">
              <h3 className="text-2xl font-bold">Order Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-bold text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery Fee</span>
                  <span className="font-bold text-foreground">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="h-px bg-white/5 my-4" />
                <div className="flex justify-between text-3xl font-black">
                  <span>Total</span>
                  <span className="text-gold">${total.toFixed(2)}</span>
                </div>
              </div>
            </GlassCard>
            
            <GlassCard className="p-6 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-gold mt-1" />
                <div className="space-y-1">
                  <p className="font-bold text-sm">Express Delivery</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">Your order will be prepared and delivered in approximately 25-35 minutes.</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </main>
  )
}
