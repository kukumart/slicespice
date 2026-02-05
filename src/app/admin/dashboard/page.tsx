
"use client"

import { Navbar } from "@/components/navbar"
import { GlassCard } from "@/components/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
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
  useMemoFirebase,
  updateDocumentNonBlocking
} from "@/firebase"
import { 
  collection, 
  query, 
  orderBy, 
  doc
} from "firebase/firestore"
import { 
  Loader2, 
  Clock, 
  Truck, 
  Utensils, 
  PackageCheck,
  LayoutDashboard,
  Filter,
  ShieldAlert,
  TrendingUp,
  ArrowUpRight
} from "lucide-react"
import { useMemo } from "react"
import Link from "next/link"
import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const STATUS_CONFIG = {
  placed: { label: "Placed", icon: Clock, color: "bg-blue-500/10 text-blue-500", next: "preparing" },
  preparing: { label: "Preparing", icon: Utensils, color: "bg-orange-500/10 text-orange-500", next: "on-the-way" },
  "on-the-way": { label: "On the way", icon: Truck, color: "bg-purple-500/10 text-purple-500", next: "delivered" },
  delivered: { label: "Delivered", icon: PackageCheck, color: "bg-green-500/10 text-green-500", next: null },
}

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

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
    updateDocumentNonBlocking(orderRef, { status: config.next })
  }

  const stats = useMemo(() => {
    if (!orders) return { active: 0, completed: 0, revenue: 0, chartData: [] }
    
    // Simple revenue aggregation for the chart
    const dailyData: Record<string, number> = {}
    orders.forEach(o => {
      const date = o.createdAt?.toDate ? o.createdAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Recent'
      dailyData[date] = (dailyData[date] || 0) + (o.total || 0)
    })

    const chartData = Object.entries(dailyData).map(([date, total]) => ({ date, revenue: total })).reverse()

    return {
      active: orders.filter(o => o.status !== 'delivered').length,
      completed: orders.filter(o => o.status === 'delivered').length,
      revenue: orders.reduce((acc, o) => acc + (o.total || 0), 0),
      chartData
    }
  }, [orders])

  if (isUserLoading || isAdminCheckLoading) {
    return (
      <main className="min-h-screen bg-background pt-32 pb-24 flex flex-col items-center justify-center space-y-8 px-4">
        <Loader2 className="w-12 h-12 text-gold animate-spin" />
        <div className="w-full max-w-7xl space-y-8">
           <Skeleton className="h-[400px] w-full rounded-3xl" />
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Skeleton className="h-32 w-full rounded-3xl" />
              <Skeleton className="h-32 w-full rounded-3xl" />
              <Skeleton className="h-32 w-full rounded-3xl" />
           </div>
        </div>
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
            <p className="text-muted-foreground text-sm font-black uppercase tracking-widest">Authorized Command Center Only</p>
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
      
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-4">
            <h1 className="text-6xl font-black tracking-tighter uppercase">Command <span className="gold-highlight italic text-black">Center</span></h1>
            <p className="text-muted-foreground font-black uppercase tracking-[0.2em] text-xs flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4 text-gold" /> Gold Standard Real-time Operations
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <GlassCard className="lg:col-span-2 p-8 border-white/5" hover={false}>
             <div className="flex items-center justify-between mb-8">
               <div className="space-y-1">
                 <h3 className="font-black uppercase tracking-tight text-lg">Revenue Stream</h3>
                 <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                   <TrendingUp className="w-3 h-3 text-green-500" /> +12% growth since last week
                 </p>
               </div>
               <Badge variant="outline" className="border-white/10 text-[10px] font-black uppercase tracking-widest">Live Updates</Badge>
             </div>
             
             <div className="h-[300px] w-full">
               <ChartContainer config={chartConfig} className="h-full w-full">
                 <AreaChart data={stats.chartData} margin={{ left: 12, right: 12 }}>
                   <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                   <XAxis
                     dataKey="date"
                     tickLine={false}
                     axisLine={false}
                     tickMargin={8}
                     tickFormatter={(value) => value}
                     stroke="rgba(255,255,255,0.3)"
                     fontSize={10}
                   />
                   <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                   <Area
                     dataKey="revenue"
                     type="natural"
                     fill="var(--color-revenue)"
                     fillOpacity={0.1}
                     stroke="var(--color-revenue)"
                     strokeWidth={3}
                   />
                 </AreaChart>
               </ChartContainer>
             </div>
           </GlassCard>

           <GlassCard className="p-8 border-white/5 flex flex-col" hover={false}>
              <h3 className="font-black uppercase tracking-tight text-lg mb-6">Efficiency Pulse</h3>
              <div className="space-y-8 flex-1">
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Preparation Speed</span>
                    <span className="text-xs font-black">94%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full gold-gradient w-[94%]" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Delivery Precision</span>
                    <span className="text-xs font-black">88%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full gold-gradient w-[88%]" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Customer Sentiment</span>
                    <span className="text-xs font-black">98%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full gold-gradient w-[98%]" />
                  </div>
                </div>
              </div>
              <Button variant="ghost" className="mt-8 w-full border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest h-12">
                Download Full Audit <ArrowUpRight className="w-3 h-3 ml-2" />
              </Button>
           </GlassCard>
        </div>

        <GlassCard className="border-white/5 overflow-hidden" hover={false}>
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
             <h2 className="font-black uppercase tracking-widest text-sm flex items-center gap-2 text-foreground">
               Live Order Queue
               <Badge className="bg-primary text-black font-black ml-2">{orders?.length || 0}</Badge>
             </h2>
             <Button variant="ghost" size="sm" className="text-xs font-black uppercase tracking-widest text-muted-foreground">
               <Filter className="w-3 h-3 mr-2" /> Filter Stream
             </Button>
          </div>
          
          <div className="overflow-x-auto">
            {isOrdersLoading ? (
              <div className="p-10 space-y-4">
                 <Skeleton className="h-12 w-full" />
                 <Skeleton className="h-12 w-full" />
                 <Skeleton className="h-12 w-full" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-white/5 hover:bg-transparent uppercase font-black text-[10px] tracking-widest text-muted-foreground">
                    <TableHead className="w-[100px]">Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Partner</TableHead>
                    <TableHead>Pulse</TableHead>
                    <TableHead className="text-right">Action</TableHead>
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
                            <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{order.customerPhone}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            {order.items?.map((item: any, i: number) => (
                              <span key={i} className="text-[10px] font-black uppercase tracking-tight text-muted-foreground">
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
                              Transition to {STATUS_CONFIG[status.next as keyof typeof STATUS_CONFIG].label}
                            </Button>
                          ) : (
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic opacity-50">Masterpiece Delivered</span>
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
              <p className="font-black uppercase tracking-widest text-xs text-muted-foreground">The order stream is currently idle</p>
            </div>
          )}
        </GlassCard>
      </div>
    </main>
  )
}
