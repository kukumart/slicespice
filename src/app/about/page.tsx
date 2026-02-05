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
            <h1 className="text-6xl font-bold tracking-tight uppercase">Our <span className="gold-highlight italic">Story</span></h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Founded in 2021, Slice & Spice began with a simple observation: why should fast food be a compromise on health or flavor? We wanted to combine the comfort of a perfect pizza with the intensity of bold, artisanal spices.
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Every crust is hand-stretched from our 48-hour fermented sourdough. Every burger is formed with premium locally-sourced beef. And every spice blend is toasted and ground right before it hits your plate.
            </p>
          </div>
          <div className="relative aspect-square rounded-3xl overflow-hidden glass">
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
        <section className="space-y-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold uppercase">Mission & <span className="gold-highlight italic">Values</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GlassCard className="p-8 space-y-4">
              <h3 className="text-2xl font-bold text-primary-foreground gold-gradient inline-block px-3 py-1 rounded-lg">Premium First</h3>
              <p className="text-muted-foreground">We never settle for "good enough". Our ingredients are hand-picked from premium suppliers.</p>
            </GlassCard>
            <GlassCard className="p-8 space-y-4">
              <h3 className="text-2xl font-bold text-primary-foreground gold-gradient inline-block px-3 py-1 rounded-lg">Eco-Conscious</h3>
              <p className="text-muted-foreground">Our packaging is 100% biodegradable. We care about the planet as much as our taste buds.</p>
            </GlassCard>
            <GlassCard className="p-8 space-y-4">
              <h3 className="text-2xl font-bold text-primary-foreground gold-gradient inline-block px-3 py-1 rounded-lg">Community</h3>
              <p className="text-muted-foreground">Slice & Spice is a hub for the local community, supporting local farms and businesses.</p>
            </GlassCard>
          </div>
        </section>
      </div>
    </main>
  )
}
