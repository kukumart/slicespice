
"use client"

import { useState, useEffect, ReactNode } from "react"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Share2, Copy, Check, Twitter, Facebook, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { GlassCard } from "./glass-card"
import Image from "next/image"

interface ShareDialogProps {
  trigger?: ReactNode
}

export function ShareDialog({ trigger }: ShareDialogProps) {
  const [url, setUrl] = useState("")
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    setUrl(window.location.origin)
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    toast({
      title: "Link Copied!",
      description: "Share the spice with your friends.",
      className: "glass-dark border-primary/20",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  // QR generation API URL
  const qrCodeUrl = url ? `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}` : ""

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" className="h-12 w-12 rounded-2xl glass hover:bg-white/10 group">
            <Share2 className="w-5 h-5 text-gold group-hover:scale-110 transition-transform" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="glass-dark border-white/10 text-foreground max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-3xl font-black uppercase tracking-tight text-center">
            Share the <span className="text-gold">Spice</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-8 pt-6">
          <GlassCard className="p-6 bg-white rounded-3xl" hover={false}>
            {qrCodeUrl && (
              <Image 
                src={qrCodeUrl} 
                alt="Scan to share" 
                width={180} 
                height={180}
                className="rounded-xl"
                unoptimized
              />
            )}
          </GlassCard>

          <p className="text-center text-xs font-black uppercase tracking-widest text-muted-foreground">
            Scan to experience the gold standard
          </p>

          <div className="w-full space-y-4">
            <div className="flex gap-2 w-full">
              <div className="flex-1 glass rounded-xl px-4 py-3 text-xs font-mono truncate border-white/5 opacity-50 flex items-center">
                {url}
              </div>
              <Button 
                onClick={handleCopy}
                className="gold-gradient text-primary-foreground font-black uppercase tracking-widest text-[10px] px-6 rounded-xl border-none h-12"
              >
                {copied ? <Check className="w-4 h-4 text-primary-foreground" /> : <Copy className="w-4 h-4 text-primary-foreground" />}
              </Button>
            </div>

            <div className="flex justify-between gap-2">
              <Button variant="ghost" className="flex-1 glass h-12 rounded-xl border-white/5 hover:bg-white/10">
                <Twitter className="w-4 h-4 text-[#1DA1F2]" />
              </Button>
              <Button variant="ghost" className="flex-1 glass h-12 rounded-xl border-white/5 hover:bg-white/10">
                <Facebook className="w-4 h-4 text-[#4267B2]" />
              </Button>
              <Button variant="ghost" className="flex-1 glass h-12 rounded-xl border-white/5 hover:bg-white/10">
                <Send className="w-4 h-4 text-[#0088cc]" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
