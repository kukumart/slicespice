"use client"

import { Navbar } from "@/components/navbar"
import { GlassCard } from "@/components/glass-card"
import { Progress } from "@/components/ui/progress"
import { useParams } from "next/navigation"
import { Clock, CheckCircle2, Truck, Utensils, PackageCheck } from "lucide-react"
import { useEffect, useState } from "react"

const STEPS = [
  { id: 1, name: "Order Placed", icon: <CheckCircle2 className="w-6 h-6" />, desc: "We've received your order." },
  { id: 2, name: "Preparing", icon: <Utensils className="w-6 h-6" />, desc: "Our chefs are crafting your food." },
  { id: 3, name: "On the way", icon: <Truck className="w-6 h-6" />, desc: "Our rider is heading your way." },
  { id: 4, name: "Delivered", icon: <PackageCheck className="w-6 h-6" />, desc: "Enjoy your fresh meal!" },
]

export default function TrackingPage() {
  const { orderId } = useParams()
  const [currentStep, setCurrentStep] = useState(2)
  const [progress, setProgress] = useState(45)

  // Simulation: Move progress slightly for realism
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => Math.min(p + 0.1, 55))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <main className="min-h-screen bg-background pt-32 pb-24 px-4">
      <Navbar />

      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Tracking Your <span className="gold-highlight">Cravings</span></h1>
          <p className="text-muted-foreground font-mono">Order ID: #{orderId}</p>
        </div>

        <GlassCard className="p-10 space-y-12">
          {/* Estimated Time Header */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="space-y-2">
              <p className="text-muted-foreground uppercase tracking-widest text-xs font-bold">Estimated Arrival</p>
              <h2 className="text-5xl font-bold text-primary-foreground gold-gradient px-4 py-1 rounded-2xl flex items-center gap-4">
                <Clock className="w-10 h-10" />
                25-30 <span className="text-lg text-primary-foreground/70 font-black">MIN</span>
              </h2>
            </div>
            <div className="glass p-6 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-full gold-gradient text-primary-foreground flex items-center justify-center font-bold">SJ</div>
              <div>
                <p className="font-bold">Marco rider</p>
                <p className="text-xs text-muted-foreground">Your assigned rider</p>
              </div>
            </div>
          </div>

          <Progress value={progress} className="h-3 bg-white/5" />

          {/* Status Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {STEPS.map((step) => {
              const isActive = step.id <= currentStep
              const isProcessing = step.id === currentStep
              return (
                <div key={step.id} className={`flex md:flex-col items-start gap-4 transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-20 grayscale'}`}>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all ${isProcessing ? 'gold-gradient text-primary-foreground scale-110 shadow-lg shadow-primary/30' : 'glass'}`}>
                    {step.icon}
                  </div>
                  <div className="space-y-1">
                    <p className={`font-bold ${isProcessing ? 'text-primary-foreground gold-gradient px-2 rounded-md' : ''}`}>{step.name}</p>
                    <p className="text-xs text-muted-foreground leading-tight">{step.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </GlassCard>

        {/* Support Card */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm">
            Need help with your order? <span className="gold-highlight px-2 py-0.5 rounded-md cursor-pointer hover:scale-105 transition-transform font-bold">Contact Support</span>
          </p>
        </div>
      </div>
    </main>
  )
}
