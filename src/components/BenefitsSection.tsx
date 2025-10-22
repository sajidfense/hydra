import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  { text: 'ZERO SUGAR', color: '#3B82F6' },
  { text: 'ESSENTIAL ELECTROLYTES', color: '#8B5CF6' },
  { text: 'PORTABLE & CONVENIENT', color: '#F97316' },
  { text: 'NATURAL FLAVORS', color: '#FDB913' },
];

export function BenefitsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const benefitRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      benefitRefs.current.forEach((benefit, index) => {
        if (!benefit) return;

        gsap.fromTo(
          benefit,
          { 
            x: index % 2 === 0 ? -200 : 200,
            opacity: 0,
            rotateZ: index % 2 === 0 ? -5 : 5
          },
          {
            x: 0,
            opacity: 1,
            rotateZ: 0,
            scrollTrigger: {
              trigger: benefit,
              start: 'top 80%',
              end: 'top 40%',
              scrub: 1,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-2xl md:text-3xl mb-2 text-foreground/80">
            Why Choose Hydra+?
          </h2>
          <p className="text-xl md:text-2xl text-foreground/60">
            Clean ingredients, bold flavors, maximum hydration
          </p>
        </div>

        {/* Benefits */}
        <div className="space-y-6 md:space-y-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              ref={(el) => (benefitRefs.current[index] = el)}
              className="relative"
              style={{
                marginLeft: index % 2 === 0 ? '0' : 'auto',
                marginRight: index % 2 === 0 ? 'auto' : '0',
                maxWidth: index === 1 ? '90%' : index === 2 ? '95%' : '85%',
              }}
            >
              <div
                className="px-8 md:px-16 py-8 md:py-12 rounded-2xl transform transition-transform hover:scale-105"
                style={{
                  backgroundColor: benefit.color,
                  transform: `rotate(${index % 2 === 0 ? -1 : 1}deg)`,
                }}
              >
                <h3
                  className="text-display text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-none"
                  style={{
                    color: benefit.color === '#F5E6D3' ? '#000000' : '#FFFFFF',
                  }}
                >
                  {benefit.text}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
