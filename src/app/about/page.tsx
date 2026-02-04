
import { Navbar } from "@/components/navbar"
import { GlassCard } from "@/components/glass-card"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import Image from "next/image"

export default function AboutPage() {
  const restaurantImage = PlaceHolderImages.find(img => img.id === "hero-restaurant")

  return (
    <main className="min-h-screen bg-background pt-32 pb-24 px-4">
      <Navbar />
      
      <div className="max-w-5xl mx-auto space-y-24">
        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold tracking-tight">Our <span className="text-gold">Story</span></h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Founded in 2021, Slice & Juice began with a simple observation: why should fast food be a compromise on health or quality? We wanted to combine the comfort of a perfect pizza with the vitality of fresh, organic juices.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every crust is hand-stretched from our 48-hour fermented sourdough. Every burger is formed with premium locally-sourced beef. And every drop of juice is squeezed right before it leaves our kitchen.
            </p>
          </div>
          <div className="relative aspect-square rounded-3xl overflow-hidden glass">
            {restaurantImage && (
              <Image 
                src={restaurantImage.imageUrl} 
                alt="Our kitchen" 
                fill 
                className="object-cover"
              />
            )}
          </div>
        </div>

        {/* Mission Section */}
        <section className="space-y-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold">Mission & <span className="text-gold">Values</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GlassCard className="p-8 space-y-4">
              <h3 className="text-2xl font-bold text-gold">Premium First</h3>
              <p className="text-muted-foreground">We never settle for "good enough". Our ingredients are hand-picked from premium suppliers.</p>
            </GlassCard>
            <GlassCard className="p-8 space-y-4">
              <h3 className="text-2xl font-bold text-gold">Eco-Conscious</h3>
              <p className="text-muted-foreground">Our packaging is 100% biodegradable. We care about the planet as much as our taste buds.</p>
            </GlassCard>
            <GlassCard className="p-8 space-y-4">
              <h3 className="text-2xl font-bold text-gold">Community</h3>
              <p className="text-muted-foreground">Slice & Juice is a hub for the local community, supporting local farms and businesses.</p>
            </GlassCard>
          </div>
        </section>
      </div>
    </main>
  )
}
