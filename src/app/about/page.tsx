import { Navbar } from "@/components/navbar"
import { GlassCard } from "@/components/glass-card"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import Image from "next/image"

export default function AboutPage() {
  const restaurantImage = PlaceHolderImages.find(img => img.id === "hero-restaurant")

  return (
    <main className="min-h-screen bg-background pt-24 pb-16 px-4">
      <Navbar />
      
      <div className="max-w-6xl mx-auto space-y-16 md:space-y-24">
        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="space-y-6 md:space-y-8">
            <h1 className="text-[var(--text-h1)] font-black uppercase tracking-tight">About <span className="gold-highlight italic text-black">Us</span></h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              We started Slice & Spice in 2021 because we wanted to make fast food better. We thought, "Why can't fast food be healthy and super yummy at the same time?"
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              We use special dough for our pizza and the best meat for our burgers. Every single meal is made with a lot of care to make sure you love it!
            </p>
          </div>
          <div className="relative aspect-square rounded-3xl overflow-hidden glass shadow-2xl">
            {restaurantImage && (
              <Image 
                src={restaurantImage.imageUrl} 
                alt="Our kitchen" 
                fill 
                className="object-cover"
                data-ai-hint={restaurantImage.imageHint}
              />
            )}
          </div>
        </div>

        {/* Mission Section */}
        <section className="space-y-12 md:space-y-16">
          <div className="text-center">
            <h2 className="text-[var(--text-h2)] font-black uppercase tracking-tighter">Why We Are <span className="gold-highlight italic text-black">Special</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <GlassCard className="p-10 space-y-4">
              <h3 className="text-xl md:text-2xl font-black text-primary-foreground gold-gradient inline-block px-4 py-1 rounded-xl">Best Quality</h3>
              <p className="text-base text-muted-foreground leading-relaxed">We only use the freshest and best ingredients we can find. No shortcuts!</p>
            </GlassCard>
            <GlassCard className="p-10 space-y-4">
              <h3 className="text-xl md:text-2xl font-black text-primary-foreground gold-gradient inline-block px-4 py-1 rounded-xl">Help the Planet</h3>
              <p className="text-base text-muted-foreground leading-relaxed">Our boxes and bags are good for the earth. We want to keep the world beautiful.</p>
            </GlassCard>
            <GlassCard className="p-10 space-y-4">
              <h3 className="text-xl md:text-2xl font-black text-primary-foreground gold-gradient inline-block px-4 py-1 rounded-xl">Good Friends</h3>
              <p className="text-base text-muted-foreground leading-relaxed">We love our community and work with local farmers to bring you the best food.</p>
            </GlassCard>
          </div>
        </section>
      </div>
    </main>
  )
}
