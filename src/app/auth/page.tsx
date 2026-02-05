
"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { GlassCard } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/firebase"
import { 
  initiateEmailSignIn, 
  initiateEmailSignUp 
} from "@/firebase/non-blocking-login"
import { useRouter } from "next/navigation"
import { Loader2, LogIn, UserPlus, ShieldCheck } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  
  const { auth, user, isUserLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (user && !isUserLoading) {
      router.push("/")
    }
  }, [user, isUserLoading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isLogin) {
        initiateEmailSignIn(auth, email, password)
      } else {
        initiateEmailSignUp(auth, email, password)
      }
      // Auth state change is handled by onAuthStateChanged in the provider
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Auth Error",
        description: error.message,
      })
      setIsLoading(false)
    }
  }

  if (isUserLoading) {
    return (
      <main className="min-h-screen bg-background pt-32 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-gold animate-spin" />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background pt-32 pb-24 px-4">
      <Navbar />
      
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-black tracking-tighter uppercase">
            {isLogin ? "Welcome" : "Join the"}<br />
            <span className="gold-highlight italic text-primary-foreground">
              {isLogin ? "Back" : "Circle"}
            </span>
          </h1>
          <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">
            Access your premium S&S experience
          </p>
        </div>

        <GlassCard className="p-8 border-white/5" hover={false}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-muted-foreground uppercase tracking-widest text-[10px] font-black">Email Address</Label>
              <Input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass h-14 border-white/10 focus:border-primary/50 font-bold" 
                placeholder="chef@slice-spice.com" 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground uppercase tracking-widest text-[10px] font-black">Password</Label>
              <Input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="glass h-14 border-white/10 focus:border-primary/50 font-bold" 
                placeholder="••••••••" 
                required 
              />
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full gold-gradient text-primary-foreground h-16 rounded-2xl font-black text-lg border-none uppercase tracking-widest shadow-xl hover:scale-[1.02] transition-all"
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin text-primary-foreground" />
              ) : (
                <span className="flex items-center gap-2">
                  {isLogin ? <LogIn className="w-5 h-5 text-primary-foreground" /> : <UserPlus className="w-5 h-5 text-primary-foreground" />}
                  {isLogin ? "SIGN IN" : "CREATE ACCOUNT"}
                </span>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-gold transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </GlassCard>

        <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50">
          <ShieldCheck className="w-3 h-3" />
          Secure Gold Standard Encryption
        </div>
      </div>
    </main>
  )
}
