
"use client"

import { Navbar } from "@/components/navbar"
import { GlassCard } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  useFirestore, 
  useCollection,
  useAuth,
  useDoc,
  useMemoFirebase
} from "@/firebase"
import { 
  collection, 
  query, 
  orderBy, 
  doc, 
  updateDoc 
} from "firebase/firestore"
import { 
  Loader2, 
  Clock, 
  Truck, 
  Utensils, 
  PackageCheck,
  LayoutDashboard,
  Filter,
  ShieldAlert
} from "lucide-react"
import { useMemo } from "react"
import { errorEmitter } from "@/firebase/error-emitter"
import { FirestorePermissionError } from "@/firebase/errors"
import Link from "next/link"

const STATUS_CONFIG = {
  placed: { label: "Placed", icon: Clock, color: "bg-blue-500/10 text-blue-500", next: "preparing" },
  preparing: { label: "Preparing", icon: Utensils, color: "bg-orange-500/10 text-orange-500", next: "on-the-way" },
  "on-the-way": { label: "On the way", icon: Truck, color: "bg-purple-500/10 text-purple-500", next: "delivered" },
  delivered: { label: "Delivered", icon: PackageCheck, color: "bg-green-500/10 text-green-500", next: null },
}

export default function AdminDashboard() {
  const { user, isUserLoading } = useAuth()
  const db = useFirestore()
  
  const adminRef = useMemoFirebase(() => user ? doc(db, "roles_admin", user.uid) : null, [db, user])
  const { data: adminRole, isLoading: isAdminCheckLoading } = useDoc(adminRef)
  
  const ordersQuery = useMemoFirebase(() => query(collection(db, "orders"), orderBy("createdAt", "desc")), [db])
  const { data: orders, isLoading: isOrdersLoading } = useCollection(ordersQuery)

  const handleUpdateStatus = (orderId: string, currentStatus: string) => {
    const config = STATUS_CONFIG[currentStatus as keyof typeof STATUS_CONFIG]
    if (!config || !config.next) return

    const orderRef = doc(db, "orders", orderId)
    updateDoc(orderRef, { status: config.next })
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: `orders/${orderId}`,
          operation: 'update',
          requestResourceData: { status: config.next },
        })
        errorEmitter.emit('permission-error', permissionError)
      })
  }

  const stats = useMemo(() => {
    if (!orders) return { active: 0, completed: 0, revenue: 0 }
    return {
      active: orders.filter(o => o.status !== 'delivered').length,
      completed: orders.filter(o => o.status === 'delivered').length,
      revenue: orders.reduce((acc, o) => acc + (o.total || 0), 0)
    }
  }, [orders])

  if (isUserLoading || isAdminCheckLoading) {
    return (
      <main className="min-h-screen bg-background pt-32 pb-24 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-gold animate-spin" />
      </main>
    )
  }

  if (!user || !adminRole) {
    return (
      <main className="min-h-screen bg-background pt-32 pb-24 px-4 flex items-center justify-center">
        <Navbar />
        <GlassCard className="max-w-md p-12 text-center space-y-6">
          <div className="w-20 h-20 glass rounded-full flex items-center justify-center mx-auto text-destructive animate-pulse">
            <ShieldAlert className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-black uppercase tracking-tight">Access Denied</h2>
            <p className="text-muted-foreground text-sm font-medium">This command center is reserved for authorized Slice & Spice staff only.</p>
          </div>
          <Button asChild className="gold-gradient text-black w-full py-7 font-black rounded-2xl border-none uppercase tracking-widest">
            <Link href="/auth">Authenticate Now</Link>
          </Button>
        </GlassCard>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background pt-32 pb-24 px-4">
      <Navbar />
      
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-4">
            <h1 className="text-6xl font-black tracking-tighter uppercase">Command <span className="gold-highlight italic text-black">Center</span></h1>
            <p className="text-muted-foreground font-medium uppercase tracking-[0.2em] text-xs flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4 text-gold" /> Real-time Order Stream
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 w-full md:w-auto">
            <GlassCard className="p-4 flex flex-col items-center justify-center min-w-[120px]" hover={false}>
              <span className="text-2xl font-black text-gold">{stats.active}</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Active</span>
            </GlassCard>
            <GlassCard className="p-4 flex flex-col items-center justify-center min-w-[120px]" hover={false}>
              <span className="text-2xl font-black text-gold">{stats.completed}</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Done</span>
            </GlassCard>
            <GlassCard className="p-4 flex flex-col items-center justify-center min-w-[120px]" hover={false}>
              <span className="text-2xl font-black text-gold">${stats.revenue.toFixed(0)}</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Revenue</span>
            </GlassCard>
          </div>
        </div>

        <GlassCard className="border-white/5 overflow-hidden" hover={false}>
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
             <h2 className="font-black uppercase tracking-widest text-sm flex items-center gap-2 text-foreground">
               Recent Orders
               <Badge className="bg-primary text-black font-black ml-2">{orders?.length || 0}</Badge>
             </h2>
             <Button variant="ghost" size="sm" className="text-xs font-black uppercase tracking-widest text-muted-foreground">
               <Filter className="w-3 h-3 mr-2" /> Filter
             </Button>
          </div>
          
          <div className="overflow-x-auto">
            {isOrdersLoading ? (
              <div className="p-20 flex justify-center">
                <Loader2 className="w-8 h-8 text-gold animate-spin" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-white/5 hover:bg-transparent uppercase font-black text-[10px] tracking-widest text-muted-foreground">
                    <TableHead className="w-[100px]">Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders?.map((order: any) => {
                    const status = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG]
                    return (
                      <TableRow key={order.id} className="border-white/5 hover:bg-white/5 transition-colors">
                        <TableCell className="font-mono text-xs font-black text-gold">
                          #{order.id.slice(-6).toUpperCase()}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-black uppercase text-xs text-foreground">{order.customerName}</span>
                            <span className="text-[10px] text-muted-foreground">{order.customerPhone}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            {order.items?.map((item: any, i: number) => (
                              <span key={i} className="text-[10px] font-medium text-muted-foreground">
                                {item.qty}x {item.name}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="font-black text-sm text-foreground">${order.total?.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-[10px] font-black uppercase tracking-tighter border-white/10 text-foreground">
                            {order.deliveryProvider}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {status && (
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${status.color}`}>
                              <status.icon className="w-3 h-3" />
                              {status.label}
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {status?.next ? (
                            <Button 
                              onClick={() => handleUpdateStatus(order.id, order.status)}
                              className="gold-gradient text-black text-[10px] font-black uppercase tracking-widest h-8 px-4 border-none shadow-lg hover:scale-105 active:scale-95 transition-all"
                            >
                              Move to {STATUS_CONFIG[status.next as keyof typeof STATUS_CONFIG].label}
                            </Button>
                          ) : (
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic opacity-50">Completed</span>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            )}
          </div>
          
          {(!orders || orders.length === 0) && !isOrdersLoading && (
            <div className="p-20 text-center space-y-4">
              <div className="w-16 h-16 glass rounded-full flex items-center justify-center mx-auto text-muted-foreground">
                <LayoutDashboard className="w-8 h-8" />
              </div>
              <p className="font-black uppercase tracking-widest text-xs text-muted-foreground">No orders in the stream</p>
            </div>
          )}
        </GlassCard>
      </div>
    </main>
  )
}
