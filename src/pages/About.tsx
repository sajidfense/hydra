import { useEffect } from 'react';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Droplet, Leaf, MapPin, Award } from 'lucide-react';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const values = [
    {
      icon: Droplet,
      title: 'Portable & Convenient',
      description: 'Take it anywhere — the gym, the office, or the beach. Just add water and go.',
    },
    {
      icon: Leaf,
      title: 'Clean, Sugar-Free Formula',
      description: 'Electrolytes + natural flavoring. Nothing artificial, no empty calories.',
    },
    {
      icon: MapPin,
      title: 'EU-Certified Quality',
      description: 'Produced under GMP and EFSA standards for premium safety and consistency.',
    },
    {
      icon: Award,
      title: 'Mediterranean-Inspired',
      description: 'Refreshing flavors inspired by the vibrant tastes of the Mediterranean.',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <SEO
        title="About HYDRA+ | EU-Made Sugar-Free Electrolyte Drinks"
        description="HYDRA+ is proudly developed in the EU with clean, science-backed electrolyte sachets. Affordable hydration with flexible subscriptions, multi-currency support, and AI assistance. Designed to replace overpriced imports across Spain and Europe."
        canonical="https://www.hydraplus.com/about"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About HYDRA+",
          "description": "Learn about HYDRA+ - EU-made sugar-free electrolyte drinks with flexible subscriptions and global currency support",
          "url": "https://www.hydraplus.com/about"
        }}
      />
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-display text-5xl md:text-7xl lg:text-8xl mb-6">
            Made for Spain.
          </h1>
          <h2 className="text-display text-5xl md:text-7xl lg:text-8xl mb-8">
            Built for Europe.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            HYDRA+ is proudly developed in the EU — designed to replace overpriced imports with affordable, clean hydration. We're bringing smarter wellness to Spain, then expanding across Europe.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 mb-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-display text-4xl md:text-5xl lg:text-6xl mb-8">
            About Hydra+
          </h2>
          <div className="space-y-6 text-base md:text-lg leading-relaxed">
            <p>
              At Hydra+, we believe hydration should be simple, clean, and accessible — without the sugar, waste, or hype. Born between the UAE and Spain, Hydra+ was created to redefine how people across Europe stay hydrated — with science-backed electrolyte sachets that are affordable, portable, and delicious.
            </p>
            <p>
              Our mission is to replace outdated, sugar-loaded sports drinks with modern, minimal hydration you can trust. Every Hydra+ sachet is made in the EU under GMP and EFSA standards, using premium ingredients and Mediterranean-inspired flavors designed for both performance and everyday wellness.
            </p>
            <p>
              From the gym to the office to the beach, Hydra+ helps you stay charged — wherever life takes you. We're not just building a hydration product, we're building a movement for better living through smarter wellness, sustainability, and transparency.
            </p>
            <p className="font-semibold text-lg md:text-xl">
              Hydra+ — Hydration, Simplified.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-secondary/30 py-16 md:py-24 mb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-display text-4xl md:text-5xl lg:text-6xl mb-8 text-center">
              Say Goodbye to Sugar-Heavy Bottles
            </h2>
            <div className="space-y-6 text-base md:text-lg">
              <p>
                Most hydration drinks in Spain are still stuck in the past — sugary, bulky, and overpriced. HYDRA+ changes that with clean, science-backed electrolyte sachets made right here in the EU.
              </p>
              <p>
                Each sachet helps you hydrate smarter — no sugar, no junk, just pure minerals that keep your body and mind performing at their best.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="container mx-auto px-4 mb-24">
        <h2 className="text-display text-4xl md:text-5xl lg:text-6xl mb-12 text-center">
          Why HYDRA+ Works
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-shadow"
            >
              <value.icon className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who We Serve */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24 mb-24">
        <div className="container mx-auto px-4">
          <h2 className="text-display text-4xl md:text-5xl lg:text-6xl mb-12 text-center">
            Hydration for Every Moment
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Athletes</h3>
              <p className="text-sm opacity-80">Who push limits</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Professionals</h3>
              <p className="text-sm opacity-80">Beating the midday crash</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Travelers</h3>
              <p className="text-sm opacity-80">Staying hydrated in heat</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Wellness Seekers</h3>
              <p className="text-sm opacity-80">Who care about ingredients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 mb-24">
        <h2 className="text-display text-4xl md:text-5xl lg:text-6xl mb-12 text-center">
          What People Are Saying
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-lg p-8">
            <p className="text-lg mb-4 italic">
              "Finally a hydration product I can take anywhere — tastes great too!"
            </p>
            <p className="font-semibold">— Laura, Madrid</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-8">
            <p className="text-lg mb-4 italic">
              "Better than Aquarius, and without the sugar crash."
            </p>
            <p className="font-semibold">— Carlos, Barcelona</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 text-center">
        <h2 className="text-display text-4xl md:text-5xl lg:text-6xl mb-8">
          Join the HYDRA+ Movement
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Experience clean, portable hydration designed for the modern European lifestyle.
        </p>
        <Button size="lg" className="text-lg px-8" asChild>
          <a href="/shop">Shop Now</a>
        </Button>
      </section>
    </div>
  );
};

export default About;
