"use client"

import { Navbar } from "@/components/navbar"
import { GlassCard } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { ShoppingBag, Truck, CreditCard, ChevronRight, Minus, Plus, Trash2, ArrowLeft, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/cart-context"
import Link from "next/link"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { useFirestore, useAuth } from "@/firebase"
import { errorEmitter } from "@/firebase/error-emitter"
import { FirestorePermissionError } from "@/firebase/errors"

export default function OrderPage() {
  const router = useRouter()
  const db = useFirestore()
  const { user } = useAuth()
  const { cart, subtotal, updateQty, removeFromCart, clearCart } = useCart()
  const [step, setStep] = useState(1) // 1: Cart Summary, 2: Delivery Details
  const [loading, setLoading] = useState(false)

  const deliveryFee = cart.length > 0 ? 3.50 : 0
  const total = subtotal + deliveryFee

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.target as HTMLFormElement)
    const orderData = {
      userId: user?.uid || "guest",
      items: cart.map(i => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })),
      total: total,
      status: "placed",
      createdAt: serverTimestamp(),
      deliveryAddress: formData.get("address") as string,
      customerName: formData.get("name") as string,
      customerPhone: formData.get("phone") as string,
      deliveryNote: formData.get("note") as string,
    }

    try {
      const docRef = await addDoc(collection(db, "orders"), orderData)
      clearCart()
      router.push(`/track/${docRef.id}`)
    } catch (error: any) {
      const permissionError = new FirestorePermissionError({
        path: 'orders',
        operation: 'create',
        requestResourceData: orderData,
      })
      errorEmitter.emit('permission-error', permissionError)
    } finally {
      setLoading(false)
    }
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
            <h1 className="text-5xl font-bold tracking-tight uppercase">Your cart is <span className="text-gold">empty</span></h1>
            <p className="text-muted-foreground text-lg font-medium">Looks like you haven't added any masterpieces to your selection yet.</p>
          </div>
          <Button asChild size="lg" className="gold-gradient text-primary-foreground px-12 py-8 rounded-2xl font-black text-lg border-none uppercase tracking-widest">
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
            <span className="font-bold whitespace-nowrap uppercase tracking-widest text-xs">Order Review</span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${step >= 2 ? 'border-primary text-gold bg-primary/5 shadow-lg shadow-primary/5' : 'border-white/10 text-muted-foreground'}`}>
            <Truck className="w-4 h-4" />
            <span className="font-bold whitespace-nowrap uppercase tracking-widest text-xs">Delivery & Payment</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {step === 1 ? (
              <GlassCard className="p-8 space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-black uppercase tracking-tight">Your <span className="text-gold">Selection</span></h2>
                  <Button variant="ghost" onClick={clearCart} className="text-muted-foreground hover:text-destructive flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
                    <Trash2 className="w-4 h-4" /> Clear All
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between py-6 border-b border-white/5 gap-6">
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-20 glass rounded-2xl overflow-hidden flex-shrink-0 relative">
                          <div className="absolute inset-0 gold-gradient opacity-10" />
                          <div className="w-full h-full flex items-center justify-center font-black text-2xl text-gold">
                            {item.name.charAt(0)}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-black text-xl uppercase tracking-tight">{item.name}</h4>
                          <p className="text-xs text-muted-foreground uppercase tracking-widest font-black">{item.category}</p>
                          <p className="font-black text-gold">${item.price}</p>
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
                  <Button asChild variant="outline" className="flex-1 py-8 rounded-2xl font-black border-white/10 uppercase tracking-widest text-xs">
                    <Link href="/menu"><ArrowLeft className="w-4 h-4 mr-2" /> Add More</Link>
                  </Button>
                  <Button onClick={() => setStep(2)} className="flex-[2] gold-gradient text-primary-foreground py-8 rounded-2xl text-lg font-black shadow-xl shadow-primary/10 border-none uppercase tracking-widest">
                    Proceed to Delivery
                  </Button>
                </div>
              </GlassCard>
            ) : (
              <GlassCard className="p-8 space-y-8">
                <h2 className="text-3xl font-black uppercase tracking-tight">Delivery <span className="text-gold">Details</span></h2>
                <form onSubmit={handlePlaceOrder} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-muted-foreground uppercase tracking-widest text-[10px] font-black">Full Name</Label>
                      <Input name="name" className="glass h-14 border-white/10 focus:border-primary/50 font-bold" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-muted-foreground uppercase tracking-widest text-[10px] font-black">Phone Number</Label>
                      <Input name="phone" className="glass h-14 border-white/10 focus:border-primary/50 font-bold" placeholder="+254..." required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground uppercase tracking-widest text-[10px] font-black">Delivery Address</Label>
                    <Input name="address" className="glass h-14 border-white/10 focus:border-primary/50 font-bold" placeholder="Street Name, Building No." required />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground uppercase tracking-widest text-[10px] font-black">Delivery Note (Optional)</Label>
                    <Textarea name="note" className="glass min-h-[100px] border-white/10 focus:border-primary/50 font-bold" placeholder="Gate code, floor, or specific instructions..." />
                  </div>
                  
                  <div className="space-y-4 pt-4">
                    <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-gold" />
                      Payment Method
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <label className="relative glass p-6 rounded-2xl cursor-pointer border border-primary/40 bg-primary/5 shadow-inner">
                        <input type="radio" name="payment" className="absolute opacity-0" defaultChecked />
                        <div className="font-black text-lg uppercase">Cash on Delivery</div>
                        <div className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Pay when you receive</div>
                      </label>
                      <label className="relative glass p-6 rounded-2xl cursor-not-allowed border border-white/5 opacity-40">
                        <input type="radio" name="payment" className="absolute opacity-0" disabled />
                        <div className="font-black text-lg uppercase">Credit/Debit Card</div>
                        <div className="text-[10px] text-muted-foreground italic uppercase font-black tracking-widest">Coming Soon</div>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <Button type="button" variant="ghost" onClick={() => setStep(1)} className="flex-1 py-8 rounded-2xl font-black uppercase tracking-widest">
                      Back to Cart
                    </Button>
                    <Button type="submit" disabled={loading} className="flex-[2] gold-gradient text-primary-foreground py-8 rounded-2xl text-lg font-black shadow-2xl border-none uppercase tracking-widest">
                      {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Confirm & Place Order"}
                    </Button>
                  </div>
                </form>
              </GlassCard>
            )}
          </div>

          <div className="space-y-8">
            <GlassCard className="p-8 space-y-6">
              <h3 className="text-2xl font-black uppercase tracking-tight">Order Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-muted-foreground text-xs font-black uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="font-black text-foreground text-sm">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground text-xs font-black uppercase tracking-widest">
                  <span>Delivery Fee</span>
                  <span className="font-black text-foreground text-sm">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="h-px bg-white/5 my-4" />
                <div className="flex justify-between text-3xl font-black uppercase tracking-tighter">
                  <span>Total</span>
                  <span className="text-gold">${total.toFixed(2)}</span>
                </div>
              </div>
            </GlassCard>
            
            <GlassCard className="p-6 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-gold mt-1" />
                <div className="space-y-1">
                  <p className="font-black text-sm uppercase tracking-tight">Express Delivery</p>
                  <p className="text-xs text-muted-foreground leading-relaxed font-medium">Your order will be prepared and delivered in approximately 25-35 minutes.</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </main>
  )
}
