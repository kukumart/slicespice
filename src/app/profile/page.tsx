"use client"

import { Navbar } from "@/components/navbar"
import { GlassCard } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  useFirestore, 
  useCollection,
  useUser,
  useMemoFirebase,
  useDoc
} from "@/firebase"
import { 
  collection, 
  query, 
  where, 
  orderBy,
  doc
} from "firebase/firestore"
import { 
  Loader2, 
  ShoppingBag, 
  Clock, 
  Package, 
  ChevronRight,
  User,
  Star,
  ShieldCheck
} from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

const STATUS_CONFIG = {
  placed: { label: "Order Received", color: "bg-blue-500/10 text-blue-500" },
  preparing: { label: "In the Kitchen", color: "bg-orange-500/10 text-orange-500" },
  "on-the-way": { label: "Out for Delivery", color: "bg-purple-500/10 text-purple-500" },
  delivered: { label: "Enjoyed", color: "bg-green-500/10 text-green-500" },
}

export default function ProfilePage() {
  const { user, isUserLoading } = useUser()
  const db = useFirestore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  
  const adminRef = useMemoFirebase(() => user ? doc(db, "roles_admin", user.uid) : null, [db, user])
  const { data: adminRole } = useDoc(adminRef)
  const isAdmin = !!adminRole

  const ordersQuery = useMemoFirebase(() => 
    user ? query(collection(db, "orders"), where("userId", "==", user.uid), orderBy("createdAt", "desc")) : null, 
    [db, user]
  )
  const { data: orders, isLoading: isOrdersLoading } = useCollection(ordersQuery)

  if (isUserLoading || !mounted) {
    return (
      <main className="min-h-screen bg-background pt-32 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-gold animate-spin" />
      </main>
    )
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-background pt-32 pb-24 px-4 flex items-center justify-center">
        <Navbar />
        <GlassCard className="max-w-md p-12 text-center space-y-6">
          <div className="w-20 h-20 glass rounded-full flex items-center justify-center mx-auto text-gold">
            <User className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-black uppercase tracking-tight">Identity Required</h2>
            <p className="text-muted-foreground text-sm font-black uppercase tracking-widest">Sign in to view your selection history</p>
          </div>
          <Button asChild className="gold-gradient text-black w-full py-7 font-black rounded-2xl border-none uppercase tracking-widest">
            <Link href="/auth">AUTHENTICATE</Link>
          </Button>
        </GlassCard>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background pt-32 pb-24 px-4">
      <Navbar />
      
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-[2rem] gold-gradient flex items-center justify-center text-black shadow-2xl">
              <User className="w-12 h-12" />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-black uppercase tracking-tighter text-white">My <span className="gold-highlight text-black italic">Vault</span></h1>
              <div className="flex items-center gap-2">
                <span className="gold-highlight text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest text-black flex items-center gap-2">
                  <Star className="w-3 h-3 text-black fill-black" /> {isAdmin ? "ADMIN COMMANDER" : "GOLD STANDARD MEMBER"}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4">
             <GlassCard className="p-4 px-6 text-center" hover={false}>
               <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Orders</p>
               <p className="text-xl font-black text-gold">{orders?.length || 0}</p>
             </GlassCard>
             <GlassCard className="p-4 px-6 text-center" hover={false}>
               <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Status</p>
               <span className="gold-highlight text-lg font-black text-black px-4 py-1 rounded-lg mt-1">ELITE</span>
             </GlassCard>
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h2 className="text-xl font-black uppercase tracking-tight flex items-center gap-3 text-white">
              <ShoppingBag className="w-5 h-5 text-gold" />
              Order History
            </h2>
          </div>

          <div className="space-y-6">
            {isOrdersLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-32 w-full rounded-3xl" />
              ))
            ) : orders && orders.length > 0 ? (
              orders.map((order: any) => (
                <Link key={order.id} href={`/track/${order.id}`} className="block group">
                  <GlassCard className="p-8 border-white/5 group-hover:border-primary/30 transition-all">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-gold">
                          <Package className="w-7 h-7" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                             <h3 className="font-black uppercase text-lg leading-none text-white">Order #{order.id.slice(-6).toUpperCase()}</h3>
                             <Badge className={`${STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG]?.color || 'bg-white/5'} text-[10px] font-black uppercase tracking-widest border-none`}>
                               {STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG]?.label || order.status}
                             </Badge>
                          </div>
                          <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest flex items-center gap-2">
                             <Clock className="w-3 h-3" /> {mounted && order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString() : 'Just now'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between w-full md:w-auto gap-8">
                         <div className="text-right">
                           <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total Paid</p>
                           <p className="text-xl font-black text-gold">${order.total?.toFixed(2)}</p>
                         </div>
                         <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-gold transition-colors group-hover:translate-x-1" />
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              ))
            ) : (
              <div className="text-center py-20 space-y-6">
                <div className="w-16 h-16 glass rounded-full flex items-center justify-center mx-auto text-muted-foreground opacity-30">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <p className="font-black uppercase tracking-widest text-xs text-muted-foreground">Your history is clear</p>
                  <Button asChild variant="link" className="text-gold font-black uppercase tracking-widest text-[10px]">
                    <Link href="/menu">Start your first selection</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <GlassCard className="p-10 bg-primary/5 border-primary/10" hover={false}>
           <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
              <div className="w-20 h-20 rounded-full gold-gradient flex items-center justify-center text-black shrink-0 shadow-2xl">
                <ShieldCheck className="w-10 h-10 text-black" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black uppercase tracking-tight text-white">The S&S Security Promise</h3>
                <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                  Your selection history and profile data are protected by our Gold Standard encryption protocols. We value your privacy as much as your palate.
                </p>
              </div>
           </div>
        </GlassCard>
      </div>
    </main>
  )
}
