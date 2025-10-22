import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ShoppingCart, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function CtaBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(bannerRef.current, {
        scrollTrigger: {
          trigger: bannerRef.current,
          start: 'top 80%',
        },
        y: 100,
        opacity: 0,
        duration: 1,
      });
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={bannerRef} className="py-24 md:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-display text-5xl md:text-7xl lg:text-8xl mb-6">
          Ready to fuel up?
        </h2>
        <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto opacity-90">
          Experience the perfect blend of protein and caffeine. Available online and in stores near you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            variant="secondary"
            className="text-lg px-8 gap-2"
            asChild
          >
            <a href="https://amazon.com" target="_blank" rel="noopener noreferrer">
              <ShoppingCart className="w-5 h-5" />
              Buy on Amazon
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 gap-2 bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
          >
            <MapPin className="w-5 h-5" />
            Find in stores
          </Button>
        </div>
      </div>
    </div>
  );
}
