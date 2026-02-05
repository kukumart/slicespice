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
  initiateEmailSignUp,
  initiateGoogleSignIn
} from "@/firebase/non-blocking-login"
import { useRouter } from "next/navigation"
import { Loader2, LogIn, UserPlus, ShieldCheck } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  
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
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Auth Error",
        description: error.message,
      })
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true)
    try {
      initiateGoogleSignIn(auth)
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Google Auth Error",
        description: error.message,
      })
      setIsGoogleLoading(false)
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
          <div className="space-y-6">
            <Button 
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
              className="w-full glass h-14 rounded-2xl font-black text-sm border-white/10 uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3"
            >
              {isGoogleLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  {isLogin ? "Sign in with Google" : "Sign up with Google"}
                </>
              )}
            </Button>

            <div className="relative flex items-center gap-4">
              <div className="flex-1 h-px bg-white/5" />
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">OR</span>
              <div className="flex-1 h-px bg-white/5" />
            </div>

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
          </div>

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