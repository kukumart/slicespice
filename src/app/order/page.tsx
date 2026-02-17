"use client"

import { Navbar } from "@/components/navbar"
import { GlassCard } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { ShoppingBag, Truck, CreditCard, ChevronRight, Minus, Plus, Trash2, ArrowLeft, Loader2, Bike, Wallet, Sparkles, Smartphone } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/cart-context"
import Link from "next/link"
import { collection, doc, serverTimestamp } from "firebase/firestore"
import { useFirestore, useUser, setDocumentNonBlocking } from "@/firebase"
import { useToast } from "@/hooks/use-toast"

const DELIVERY_PROVIDERS = [
  { id: 'own', name: 'S&S Express', desc: 'Our priority riders', icon: <Bike className="w-5 h-5" /> },
  { id: 'uber-eats', name: 'Uber Eats', desc: 'Partner delivery', icon: <Truck className="w-5 h-5" /> },
  { id: 'bolt', name: 'Bolt Food', desc: 'Partner delivery', icon: <Truck className="w-5 h-5" /> },
]

export default function OrderPage() {
  const router = useRouter()
  const db = useFirestore()
  const { user } = useUser()
  const { cart, subtotal, updateQty, clearCart } = useCart()
  const { toast } = useToast()
  const [step, setStep] = useState(1) 
  const [loading, setLoading] = useState(false)
  const [deliveryProvider, setDeliveryProvider] = useState('own')
  const [paymentMethod, setPaymentMethod] = useState('cash')

  const deliveryFee = cart.length > 0 ? (deliveryProvider === 'own' ? 2.50 : 3.50) : 0
  const total = subtotal + deliveryFee

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.target as HTMLFormElement)
    const orderCol = collection(db, "orders")
    const newOrderRef = doc(orderCol)
    
    const orderData = {
      id: newOrderRef.id,
      userId: user?.uid || "guest",
      items: cart.map(i => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })),
      total: total,
      status: "placed",
      paymentMethod: paymentMethod,
      deliveryProvider: deliveryProvider,
      createdAt: serverTimestamp(),
      deliveryAddress: formData.get("address") as string,
      customerName: formData.get("name") as string,
      customerPhone: formData.get("phone") as string,
      deliveryNote: formData.get("note") as string,
    }

    if (paymentMethod === 'mpesa') {
      toast({
        title: "M-Pesa STK Push",
        description: "Please check your phone for the M-Pesa prompt to authorize payment.",
        className: "glass-dark border-primary/20",
      })
    }

    setDocumentNonBlocking(newOrderRef, orderData, {})
    
    setTimeout(() => {
      clearCart()
      router.push(`/track/${newOrderRef.id}`)
      setLoading(false)
    }, 1500)
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
          <Button asChild size="lg" className="gold-gradient text-black px-12 py-8 rounded-2xl font-black text-lg border-none uppercase tracking-widest shadow-xl">
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
          <div className={`flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all ${step >= 1 ? 'border-primary text-black bg-primary shadow-lg scale-105' : 'border-white/10 text-muted-foreground opacity-50'}`}>
            <ShoppingBag className="w-4 h-4" />
            <span className="font-black whitespace-nowrap uppercase tracking-widest text-xs">Review Selection</span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground opacity-20" />
          <div className={`flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all ${step >= 2 ? 'border-primary text-black bg-primary shadow-lg scale-105' : 'border-white/10 text-muted-foreground opacity-50'}`}>
            <Truck className="w-4 h-4" />
            <span className="font-black whitespace-nowrap uppercase tracking-widest text-xs">Delivery & Pay</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* LEFT COLUMN START */}
          <div className="lg:col-span-2 space-y-8">
            {step === 1 ? (
              <GlassCard className="p-8 space-y-8" hover={false}>
                <div className="flex items-center justify-between border-b border-white/5 pb-6">
                  <h2 className="text-3xl font-black uppercase tracking-tight">Current <span className="text-gold">Cart</span></h2>
                  <Button variant="ghost" onClick={clearCart} className="text-muted-foreground hover:text-destructive flex items-center gap-2 font-black uppercase tracking-widest text-[10px]">
                    <Trash2 className="w-4 h-4" /> Clear All
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between py-6 glass rounded-2xl p-6 border-white/5 gap-6 group">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 glass rounded-xl overflow-hidden flex-shrink-0 relative">
                          <div className="absolute inset-0 gold-gradient opacity-10" />
                          <div className="w-full h-full flex items-center justify-center font-black text-xl text-gold group-hover:scale-110 transition-transform">
                            {item.name.charAt(0)}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-black text-lg uppercase tracking-tight leading-none">{item.name}</h4>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black opacity-60">{item.category}</p>
                          <p className="font-black text-gold">${item.price}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between sm:justify-end gap-10">
                        <div className="flex items-center gap-2 glass p-1 rounded-xl bg-white/5">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="w-10 h-10 rounded-lg hover:bg-white/10 text-gold"
                            onClick={() => updateQty(item.id, -1)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="font-black min-w-[1.5rem] text-center text-lg">{item.qty}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="w-10 h-10 rounded-lg hover:bg-white/10 text-gold"
                            onClick={() => updateQty(item.id, 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <span className="font-black text-2xl min-w-[6rem] text-right text-gold">${(item.price * item.qty).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button asChild variant="outline" className="flex-1 py-8 rounded-2xl font-black border-white/10 uppercase tracking-widest text-[10px] glass">
                    <Link href="/menu"><ArrowLeft className="w-4 h-4 mr-2" /> Continue Shopping</Link>
                  </Button>
                  <Button onClick={() => setStep(2)} className="flex-[2] gold-gradient text-black py-8 rounded-2xl text-lg font-black shadow-2xl border-none uppercase tracking-widest group">
                    Next: Delivery Details <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </GlassCard>
            ) : (
              <GlassCard className="p-8 space-y-10" hover={false}>
                <div className="border-b border-white/5 pb-6">
                  <h2 className="text-3xl font-black uppercase tracking-tight leading-none">Complete <span className="text-gold">Order</span></h2>
                  <p className="text-xs text-muted-foreground font-black uppercase tracking-widest mt-2">Step 2 of 2: Shipping & Payment</p>
                </div>
                
                <form onSubmit={handlePlaceOrder} className="space-y-12">
                  <div className="space-y-6">
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gold flex items-center gap-2">
                       <Truck className="w-4 h-4" /> Recipient Info
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-muted-foreground uppercase tracking-widest text-[10px] font-black">Full Name</Label>
                        <Input name="name" className="glass h-14 border-white/10 focus:border-primary/50 font-bold bg-white/5" placeholder="John Doe" required />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-muted-foreground uppercase tracking-widest text-[10px] font-black">Phone Number</Label>
                        <Input name="phone" className="glass h-14 border-white/10 focus:border-primary/50 font-bold bg-white/5" placeholder="+254..." required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-muted-foreground uppercase tracking-widest text-[10px] font-black">Delivery Address</Label>
                      <Input name="address" className="glass h-14 border-white/10 focus:border-primary/50 font-bold bg-white/5" placeholder="Street Name, Apartment, Floor" required />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-muted-foreground uppercase tracking-widest text-[10px] font-black">Driver Instructions (Optional)</Label>
                      <Textarea name="note" className="glass min-h-[100px] border-white/10 focus:border-primary/50 font-bold bg-white/5" placeholder="e.g. Leave at the gate, call upon arrival..." />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gold flex items-center gap-2">
                       <Bike className="w-4 h-4" /> Delivery Mode
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {DELIVERY_PROVIDERS.map((provider) => (
                        <label 
                          key={provider.id} 
                          className={`relative glass p-6 rounded-2xl cursor-pointer border transition-all duration-300 ${
                            deliveryProvider === provider.id ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(255,215,0,0.1)]' : 'border-white/5 opacity-40 hover:opacity-100 hover:border-white/20'
                          }`}
                          onClick={() => setDeliveryProvider(provider.id)}
                        >
                          <input type="radio" name="provider" className="absolute opacity-0" checked={deliveryProvider === provider.id} onChange={() => {}} />
                          <div className={`flex items-center gap-2 font-black text-sm uppercase ${deliveryProvider === provider.id ? 'text-primary' : 'text-foreground'}`}>
                            {provider.icon} {provider.name}
                          </div>
                          <div className="text-[9px] uppercase font-black tracking-widest mt-1 opacity-60">
                            {provider.desc}
                          </div>
                          {deliveryProvider === provider.id && (
                            <div className="absolute top-2 right-2">
                              <Sparkles className="w-3 h-3 text-gold animate-pulse" />
                            </div>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gold flex items-center gap-2">
                       <CreditCard className="w-4 h-4" /> Payment Selection
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <label 
                        className={`relative glass p-6 rounded-2xl cursor-pointer border transition-all duration-300 ${
                          paymentMethod === 'cash' ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(255,215,0,0.1)]' : 'border-white/5 opacity-40 hover:opacity-100'
                        }`}
                        onClick={() => setPaymentMethod('cash')}
                      >
                        <input type="radio" name="payment" className="absolute opacity-0" checked={paymentMethod === 'cash'} onChange={() => {}} />
                        <div className="flex items-center gap-3">
                          <Wallet className={`w-6 h-6 ${paymentMethod === 'cash' ? 'text-primary' : 'text-foreground'}`} />
                          <div className="font-black text-lg uppercase leading-none">Cash</div>
                        </div>
                        <div className="text-[10px] uppercase font-black tracking-widest mt-2">Pay on Delivery</div>
                      </label>

                      <label 
                        className={`relative glass p-6 rounded-2xl cursor-pointer border transition-all duration-300 ${
                          paymentMethod === 'mpesa' ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(255,215,0,0.1)]' : 'border-white/5 opacity-40 hover:opacity-100'
                        }`}
                        onClick={() => setPaymentMethod('mpesa')}
                      >
                        <input type="radio" name="payment" className="absolute opacity-0" checked={paymentMethod === 'mpesa'} onChange={() => {}} />
                        <div className="flex items-center gap-3">
                          <Smartphone className={`w-6 h-6 ${paymentMethod === 'mpesa' ? 'text-primary' : 'text-foreground'}`} />
                          <div className="font-black text-lg uppercase leading-none">M-Pesa</div>
                        </div>
                        <div className="text-[10px] uppercase font-black tracking-widest mt-2">STK Push Simulation</div>
                      </label>

                      <label className="relative glass p-6 rounded-2xl cursor-not-allowed border border-white/5 opacity-20">
                        <input type="radio" name="payment" className="absolute opacity-0" disabled />
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-6 h-6" />
                          <div className="font-black text-lg uppercase leading-none">Card</div>
                        </div>
                        <div className="text-[10px] text-muted-foreground italic uppercase font-black tracking-widest mt-2">Coming Soon</div>
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button type="button" variant="ghost" onClick={() => setStep(1)} className="flex-1 py-8 rounded-2xl font-black uppercase tracking-widest text-[10px] glass">
                      Back to Selection
                    </Button>
                    <Button type="submit" disabled={loading} className="flex-[2] gold-gradient text-black py-8 rounded-2xl text-xl font-black shadow-2xl border-none uppercase tracking-widest">
                      {loading ? <Loader2 className="w-6 h-6 animate-spin text-black" /> : "Authorize & Place Order"}
                    </Button>
                  </div>
                </form>
              </GlassCard>
            )
          }
          </div> {/* END OF LEFT COLUMN */}

          {/* RIGHT COLUMN START */}
          <div className="space-y-8">
            <GlassCard className="p-8 space-y-8 border-white/10" hover={false}>
              <h3 className="text-2xl font-black uppercase tracking-tight border-b border-white/5 pb-4">Bill Summary</h3>
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-[10px] font-black uppercase tracking-widest">Merchandise Subtotal</span>
                  <span className="font-black text-lg">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-[10px] font-black uppercase tracking-widest">Service & Delivery</span>
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-primary">{deliveryProvider === 'own' ? 'Priority Express' : 'Partner Standard'}</span>
                  </div>
                  <span className="font-black text-lg">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="h-px bg-white/5 my-2" />
                <div className="flex justify-between items-end pt-2">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-[10px] font-black uppercase tracking-widest">Grand Total</span>
                    <span className="text-[8px] font-black uppercase tracking-widest text-primary italic">All Taxes Included</span>
                  </div>
                  <span className="text-4xl font-black text-gold tracking-tighter">${total.toFixed(2)}</span>
                </div>
              </div>
            </GlassCard>
            
            <GlassCard className="p-6 bg-primary/5 border-primary/20" hover={false}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                   <Sparkles className="w-5 h-5 text-gold" />
                </div>
                <div className="space-y-1">
                  <p className="font-black text-sm uppercase tracking-tight">The S&S Guarantee</p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed font-medium uppercase tracking-widest">
                    Your order will arrive at peak temperature in premium sustainable packaging.
                  </p>
                </div>
              </div>
            </GlassCard>

            <div className="px-4 text-center">
               <p className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-40">
                 Secure Gold Standard Encryption
               </p>
            </div>
          </div> {/* END OF RIGHT COLUMN */}
        </div>   {/* END OF GRID */}
      </div>     {/* END OF MAX-W-5XL */}
    </main>
  )
}