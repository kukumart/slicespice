
"use client"

import { Navbar } from "@/components/navbar"
import { GlassCard } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { ShoppingBag, Truck, CreditCard, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

export default function OrderPage() {
  const router = useRouter()
  const [step, setStep] = useState(1) // 1: Cart Summary, 2: Delivery Details

  const cartItems = [
    { id: 1, name: "Classic Margherita", price: 14.99, qty: 1 },
    { id: 8, name: "Fresh Mint Lemonade", price: 4.99, qty: 2 },
  ]

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0)
  const deliveryFee = 3.50
  const total = subtotal + deliveryFee

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate order submission
    const orderId = Math.random().toString(36).substr(2, 9).toUpperCase()
    router.push(`/track/${orderId}`)
  }

  return (
    <main className="min-h-screen bg-background pt-32 pb-24 px-4">
      <Navbar />

      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-12 overflow-x-auto pb-4">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${step >= 1 ? 'border-primary text-gold' : 'border-white/10 text-muted-foreground'}`}>
            <ShoppingBag className="w-4 h-4" />
            <span className="font-bold whitespace-nowrap">Order Review</span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${step >= 2 ? 'border-primary text-gold' : 'border-white/10 text-muted-foreground'}`}>
            <Truck className="w-4 h-4" />
            <span className="font-bold whitespace-nowrap">Delivery & Payment</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Area */}
          <div className="lg:col-span-2 space-y-8">
            {step === 1 ? (
              <GlassCard className="p-8 space-y-8">
                <h2 className="text-3xl font-bold">Your <span className="text-gold">Selection</span></h2>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-4 border-b border-white/5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 glass rounded-lg flex items-center justify-center font-bold">{item.qty}x</div>
                        <div>
                          <h4 className="font-bold">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">Customized: Extra Cheese</p>
                        </div>
                      </div>
                      <span className="font-bold text-gold">${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <Button onClick={() => setStep(2)} className="w-full gold-gradient py-8 rounded-2xl text-lg font-bold">
                  Proceed to Delivery
                </Button>
              </GlassCard>
            ) : (
              <GlassCard className="p-8 space-y-8">
                <h2 className="text-3xl font-bold">Delivery <span className="text-gold">Details</span></h2>
                <form onSubmit={handlePlaceOrder} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input className="glass border-white/10" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone Number</Label>
                      <Input className="glass border-white/10" placeholder="+1 (555) 000-0000" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Delivery Address</Label>
                    <Input className="glass border-white/10" placeholder="Street Name, Building No." required />
                  </div>
                  <div className="space-y-2">
                    <Label>Delivery Note (Optional)</Label>
                    <Textarea className="glass border-white/10" placeholder="Gate code, floor, or specific instructions..." />
                  </div>
                  
                  <div className="space-y-4 pt-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-gold" />
                      Payment Method
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <label className="relative glass p-4 rounded-xl cursor-pointer border border-primary/40">
                        <input type="radio" name="payment" className="absolute opacity-0" defaultChecked />
                        <div className="font-bold">Cash on Delivery</div>
                        <div className="text-xs text-muted-foreground">Pay when you receive</div>
                      </label>
                      <label className="relative glass p-4 rounded-xl cursor-pointer border border-white/5 opacity-50">
                        <input type="radio" name="payment" className="absolute opacity-0" disabled />
                        <div className="font-bold">Credit/Debit Card</div>
                        <div className="text-xs text-muted-foreground">Coming Soon</div>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <Button type="button" variant="ghost" onClick={() => setStep(1)} className="flex-1 py-8 rounded-2xl">
                      Back
                    </Button>
                    <Button type="submit" className="flex-[2] gold-gradient py-8 rounded-2xl text-lg font-bold">
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
              <div className="space-y-3">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="h-px bg-white/5 my-4" />
                <div className="flex justify-between text-2xl font-bold">
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
                  <p className="text-xs text-muted-foreground">Estimated time: 25-35 minutes.</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </main>
  )
}
