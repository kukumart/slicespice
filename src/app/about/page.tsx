import { Navbar } from "@/components/navbar"
import { GlassCard } from "@/components/glass-card"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import Image from "next/image"

export default function AboutPage() {
  const restaurantImage = PlaceHolderImages.find(img => img.id === "hero-restaurant")

  return (
    <main className="min-h-screen bg-background pt-32 pb-24 px-4">
      <Navbar />
      
      <div className="max-w-6xl mx-auto space-y-32">
        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <h1 className="text-8xl md:text-9xl font-bold tracking-tight uppercase">Our <span className="gold-highlight italic text-black">Story</span></h1>
            <p className="text-2xl text-muted-foreground leading-relaxed">
              Founded in 2021, Slice & Spice began with a simple observation: why should fast food be a compromise on health or flavor? We wanted to combine the comfort of a perfect pizza with the intensity of bold, artisanal spices.
            </p>
            <p className="text-2xl text-muted-foreground leading-relaxed">
              Every crust is hand-stretched from our 48-hour fermented sourdough. Every burger is formed with premium locally-sourced beef.
            </p>
          </div>
          <div className="relative aspect-square rounded-[3rem] overflow-hidden glass shadow-2xl">
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
        <section className="space-y-20">
          <div className="text-center">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">Mission & <span className="gold-highlight italic text-black">Values</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <GlassCard className="p-12 space-y-6">
              <h3 className="text-3xl font-black text-primary-foreground gold-gradient inline-block px-5 py-2 rounded-xl">Premium First</h3>
              <p className="text-xl text-muted-foreground leading-relaxed">We never settle for "good enough". Our ingredients are hand-picked from premium suppliers.</p>
            </GlassCard>
            <GlassCard className="p-12 space-y-6">
              <h3 className="text-3xl font-black text-primary-foreground gold-gradient inline-block px-5 py-2 rounded-xl">Eco-Conscious</h3>
              <p className="text-xl text-muted-foreground leading-relaxed">Our packaging is 100% biodegradable. We care about the planet as much as our taste buds.</p>
            </GlassCard>
            <GlassCard className="p-12 space-y-6">
              <h3 className="text-3xl font-black text-primary-foreground gold-gradient inline-block px-5 py-2 rounded-xl">Community</h3>
              <p className="text-xl text-muted-foreground leading-relaxed">Slice & Spice is a hub for the local community, supporting local farms and businesses.</p>
            </GlassCard>
          </div>
        </section>
      </div>
    </main>
  )
}
