import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headline1Ref = useRef<HTMLHeadingElement>(null);
  const headline2Ref = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Rotate and scale entire hero section on scroll
      gsap.to(sectionRef.current, {
        rotation: -3.45,
        scale: 0.92,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Headline animations
      gsap.from([headline1Ref.current, headline2Ref.current], {
        y: 120,
        opacity: 0,
        skewY: 3,
        stagger: 0.08,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <section
        ref={sectionRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
        style={{ backgroundColor: '#eb8d17' }}
      >
        {/* Background video - hidden on mobile */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 hidden md:block"
        >
          <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
        </video>

        {/* Background image - shown only on mobile */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0 md:hidden"
          style={{ backgroundImage: 'url(/hero-can-1.jpg)' }}
        />

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30 z-[1]" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-5xl mx-auto space-y-4">
            <div className="overflow-hidden">
              <h1 ref={headline1Ref} className="text-display text-6xl md:text-8xl lg:text-9xl text-white">
                Hydration,
              </h1>
            </div>
            <div className="overflow-hidden">
              <h1 ref={headline2Ref} className="text-display text-6xl md:text-8xl lg:text-9xl text-white">
                Simplified
              </h1>
            </div>
          </div>

          <p className="text-lg md:text-xl mt-8 mb-12 max-w-2xl mx-auto text-white/90">
            Clean, portable, sugar-free electrolytes for everyday energy, focus, and recovery.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <a href="/shop">Shop Now</a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 text-white border-white/20 hover:bg-white/20" asChild>
              <a href="/subscribe">Subscribe & Save</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
