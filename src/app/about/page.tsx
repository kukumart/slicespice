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
            <h1 className="text-[var(--text-h1)] font-black uppercase tracking-tight">Our <span className="gold-highlight italic text-black">Story</span></h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Founded in 2021, Slice & Spice began with a simple observation: why should fast food be a compromise on health or flavor? We wanted to combine the comfort of a perfect pizza with the intensity of bold, artisanal spices.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Every crust is hand-stretched from our 48-hour fermented sourdough. Every burger is formed with premium locally-sourced beef.
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
            <h2 className="text-[var(--text-h2)] font-black uppercase tracking-tighter">Mission & <span className="gold-highlight italic text-black">Values</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <GlassCard className="p-10 space-y-4">
              <h3 className="text-xl md:text-2xl font-black text-primary-foreground gold-gradient inline-block px-4 py-1 rounded-xl">Premium First</h3>
              <p className="text-base text-muted-foreground leading-relaxed">We never settle for "good enough". Our ingredients are hand-picked from premium suppliers.</p>
            </GlassCard>
            <GlassCard className="p-10 space-y-4">
              <h3 className="text-xl md:text-2xl font-black text-primary-foreground gold-gradient inline-block px-4 py-1 rounded-xl">Eco-Conscious</h3>
              <p className="text-base text-muted-foreground leading-relaxed">Our packaging is 100% biodegradable. We care about the planet as much as our taste buds.</p>
            </GlassCard>
            <GlassCard className="p-10 space-y-4">
              <h3 className="text-xl md:text-2xl font-black text-primary-foreground gold-gradient inline-block px-4 py-1 rounded-xl">Community</h3>
              <p className="text-base text-muted-foreground leading-relaxed">Slice & Spice is a hub for the local community, supporting local farms and businesses.</p>
            </GlassCard>
          </div>
        </section>
      </div>
    </main>
  )
}