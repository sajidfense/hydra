import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCountUp } from '@/hooks/useCountUp';
import benefits from '@/content/benefits.json';

gsap.registerPlugin(ScrollTrigger);

function StatCard({ benefit, index }: { benefit: typeof benefits[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const count = useCountUp(benefit.value, 1500, isVisible);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: cardRef.current,
      start: 'top 70%',
      onEnter: () => setIsVisible(true),
      once: true,
    });

    gsap.from(cardRef.current, {
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 80%',
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.1,
    });

    return () => trigger.kill();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="flex flex-col items-center text-center px-6 py-4"
    >
      <p className="text-sm text-foreground/80 mb-1">up to</p>
      <div className="text-display text-4xl md:text-5xl lg:text-6xl text-foreground font-bold">
        {count}
        <span className="text-2xl md:text-3xl">{benefit.unit}</span>
      </div>
      <h3 className="text-sm md:text-base font-medium mt-2 text-foreground/90">{benefit.name}</h3>
    </div>
  );
}

export function NutritionStats() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-between py-16 md:py-24 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1628088062854-d1870b4553da?q=80&w=2070)',
        }}
      />
      
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 flex-1 flex flex-col justify-between">
        {/* Top Section: Title and Paragraph */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Title - Top Left */}
          <div className="flex flex-col justify-start">
            <h2 className="text-display text-5xl md:text-6xl lg:text-7xl text-primary">
              WHY HYDRA+
            </h2>
            <div className="inline-block mt-2 bg-accent">
              <h2 className="text-display text-5xl md:text-6xl lg:text-7xl px-4 py-2 text-accent-foreground">
                WORKS
              </h2>
            </div>
          </div>

          {/* Paragraph - Top Right */}
          <div className="flex items-start justify-end">
            <p className="text-sm md:text-base max-w-md text-right leading-relaxed text-foreground/80">
              Portable & convenient. Clean, sugar-free formula. Electrolytes + natural flavoring. Nothing artificial, no empty calories.
            </p>
          </div>
        </div>

        {/* Stats Section - Bottom */}
        <div className="mt-auto flex justify-center px-4">
          <div 
            className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-6 gap-px md:gap-0 rounded-2xl overflow-hidden bg-card border-2 border-border md:divide-x-2 md:divide-border"
          >
            {benefits.map((benefit, index) => (
              <div key={benefit.id} className="flex-1">
                <StatCard benefit={benefit} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
