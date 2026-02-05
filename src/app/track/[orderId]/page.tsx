
"use client"

import { Navbar } from "@/components/navbar"
import { GlassCard } from "@/components/glass-card"
import { Progress } from "@/components/ui/progress"
import { useParams } from "next/navigation"
import { Clock, CheckCircle2, Truck, Utensils, PackageCheck, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { doc } from "firebase/firestore"
import { useFirestore, useDoc, useMemoFirebase } from "@/firebase"

const STEPS = [
  { id: 1, status: "placed", name: "Order Placed", icon: (active: boolean) => <CheckCircle2 className={`w-6 h-6 ${active ? 'text-primary-foreground' : 'text-muted-foreground'}`} />, desc: "We've received your order." },
  { id: 2, status: "preparing", name: "Preparing", icon: (active: boolean) => <Utensils className={`w-6 h-6 ${active ? 'text-primary-foreground' : 'text-muted-foreground'}`} />, desc: "Our chefs are crafting your food." },
  { id: 3, status: "on-the-way", name: "On the way", icon: (active: boolean) => <Truck className={`w-6 h-6 ${active ? 'text-primary-foreground' : 'text-muted-foreground'}`} />, desc: "Our rider is heading your way." },
  { id: 4, status: "delivered", name: "Delivered", icon: (active: boolean) => <PackageCheck className={`w-6 h-6 ${active ? 'text-primary-foreground' : 'text-muted-foreground'}`} />, desc: "Enjoy your fresh meal!" },
]

const PROVIDER_NAMES: Record<string, string> = {
  'own': 'S&S Express Rider',
  'uber-eats': 'Uber Eats Courier',
  'bolt': 'Bolt Food Courier'
}

export default function TrackingPage() {
  const { orderId } = useParams()
  const db = useFirestore()
  const orderRef = useMemoFirebase(() => doc(db, "orders", orderId as string), [db, orderId])
  const { data: order, isLoading } = useDoc(orderRef)

  const [progress, setProgress] = useState(0)

  const currentStepIndex = order ? STEPS.findIndex(s => s.status === order.status) + 1 : 0

  useEffect(() => {
    if (currentStepIndex > 0) {
      setProgress((currentStepIndex / STEPS.length) * 100)
    }
  }, [currentStepIndex])

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background pt-32 pb-24 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-gold animate-spin" />
      </main>
    )
  }

  if (!order) {
    return (
      <main className="min-h-screen bg-background pt-32 pb-24 px-4 text-center">
        <Navbar />
        <h1 className="text-4xl font-black uppercase">Order Not Found</h1>
        <p className="text-muted-foreground mt-4">We couldn't locate order #{orderId}</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background pt-32 pb-24 px-4">
      <Navbar />

      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-black tracking-tighter uppercase">Tracking Your <span className="gold-highlight italic text-primary-foreground">Cravings</span></h1>
          <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest">Order Reference: #{orderId.slice(-6).toUpperCase()}</p>
        </div>

        <GlassCard className="p-10 space-y-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="space-y-2">
              <p className="text-muted-foreground uppercase tracking-[0.2em] text-xs font-black">Estimated Arrival</p>
              <h2 className="text-5xl font-black text-primary-foreground gold-gradient px-6 py-2 rounded-2xl flex items-center gap-4 shadow-xl">
                <Clock className="w-10 h-10 text-primary-foreground" />
                25-30 <span className="text-lg text-primary-foreground/70 font-black">MIN</span>
              </h2>
            </div>
            <div className="glass p-6 rounded-2xl flex items-center gap-4 border-white/10 bg-white/5">
              <div className="w-12 h-12 rounded-full gold-gradient text-primary-foreground flex items-center justify-center font-black">
                {order.deliveryProvider === 'own' ? 'SS' : order.deliveryProvider.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-black uppercase tracking-tight">{PROVIDER_NAMES[order.deliveryProvider] || 'Partner Rider'}</p>
                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">En route to {order.customerName}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-gold mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-4 bg-white/5 border border-white/5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {STEPS.map((step) => {
              const isActive = step.id <= currentStepIndex
              return (
                <div key={step.id} className={`flex md:flex-col items-start gap-4 transition-all duration-700 ${isActive ? 'opacity-100' : 'opacity-20 grayscale'}`}>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-500 ${isActive ? 'gold-gradient shadow-lg shadow-primary/30 border-none' : 'glass border-white/5'}`}>
                    {step.icon(isActive)}
                  </div>
                  <div className="space-y-1">
                    <p className={`font-black uppercase tracking-tight text-sm ${isActive ? 'text-gold' : ''}`}>{step.name}</p>
                    <p className="text-[10px] text-muted-foreground leading-tight uppercase font-black tracking-widest">{step.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </GlassCard>

        <div className="text-center">
          <p className="text-muted-foreground text-sm font-medium">
            Need help with your order? <span className="gold-highlight text-primary-foreground px-3 py-1 rounded-md cursor-pointer hover:scale-105 transition-all font-black uppercase text-xs tracking-widest">Contact Support</span>
          </p>
        </div>
      </div>
    </main>
  )
}
