import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import flavors from '@/content/flavors.json';
import productCanPlaceholder from '@/assets/product-can-placeholder.png';

gsap.registerPlugin(ScrollTrigger);

export function FlavorShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !sliderRef.current || !titleRef.current || !containerRef.current) return;

      const totalWidth = sliderRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const scrollDistance = totalWidth - viewportWidth;

      // Title animation - appears from bottom
      gsap.fromTo(
        titleRef.current,
        { y: 150, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'top 50%',
            scrub: 1,
          },
        }
      );

      // Pin the section and scroll horizontally
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${scrollDistance + window.innerHeight}`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          gsap.to(sliderRef.current, {
            x: -scrollDistance * self.progress,
            duration: 0,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-background">
      <div ref={containerRef} className="h-screen flex items-center overflow-hidden">
        <div className="w-full">
          {/* Horizontal scrolling - title and flavor cards */}
          <div ref={sliderRef} className="flex items-center h-screen gap-8 md:gap-12">
            {/* Title - first item in slider */}
            <div className="flex-shrink-0 flex items-center justify-start pl-8 md:pl-16 lg:pl-24">
              <h2 ref={titleRef} className="text-display text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.9]">
                WE HAVE 4 <br />
                <span className="bg-accent text-accent-foreground px-4 inline-block">
                  FREAKING
                </span>{' '}
                <br />
                DELICIOUS FLAVORS
              </h2>
            </div>

            {/* Flavor cards */}
            {flavors.map((flavor, index) => (
              <div
                key={flavor.id}
                className="flex-shrink-0 flex items-center justify-center px-4"
              >
                <Link to={`/product/${flavor.id}`}>
                  <div 
                    ref={(el) => (cardRefs.current[index] = el)}
                    className="relative cursor-pointer transition-transform hover:scale-105"
                  >
                    {/* Product can image - overlaps top of card */}
                    <img
                      src={productCanPlaceholder}
                      alt={flavor.name}
                      className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 md:w-40 lg:w-48 h-auto z-10 drop-shadow-2xl pointer-events-none"
                    />
                    
                    {/* Product card - 4:3 aspect ratio and rotated */}
                    <div
                      className="w-[320px] md:w-[380px] lg:w-[440px] aspect-[4/3] rounded-3xl p-6 md:p-8 flex flex-col justify-end relative overflow-visible shadow-2xl transform rotate-6"
                      style={{ backgroundColor: flavor.color }}
                    >
                      {/* Flavor name at bottom */}
                      <h3 className="text-display text-3xl md:text-4xl lg:text-5xl text-white drop-shadow-lg leading-tight">
                        {flavor.name.toUpperCase()}
                      </h3>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Button positioned at bottom center */}
          <div className="absolute bottom-12 left-0 right-0 text-center z-10">
            <Link to="/shop">
              <Button size="lg" className="text-lg px-12 py-6 rounded-full">
                Get it now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
