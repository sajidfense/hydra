import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlappingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each word individually
      const words = sectionRef.current?.querySelectorAll('.word');
      
      if (words) {
        gsap.fromTo(
          words,
          { opacity: 0.5 },
          {
            opacity: 1,
            stagger: 0.05,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'bottom 40%',
              scrub: 1,
            },
          }
        );
      }

      // Animate overlapping line words
      const fuelWords = overlappingRef.current?.querySelectorAll('.word');
      
      if (fuelWords) {
        gsap.fromTo(
          fuelWords,
          { opacity: 0.5 },
          {
            opacity: 1,
            stagger: 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 50%',
              end: 'center center',
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden" style={{ backgroundColor: '#eb8d17' }}>
      <div className="container mx-auto px-4">
        <div className="relative">
          <div className="space-y-2 md:space-y-4">
            <div className="overflow-hidden">
              <h2 className="text-display text-5xl md:text-7xl lg:text-9xl text-center text-white">
                <span className="word inline-block opacity-50">SAY</span>{' '}
                <span className="word inline-block opacity-50">GOODBYE</span>{' '}
                <span className="word inline-block opacity-50">TO</span>
              </h2>
            </div>
            <div className="overflow-hidden mb-8 md:mb-16">
              <h2 className="text-display text-5xl md:text-7xl lg:text-9xl text-center text-white">
                <span className="word inline-block opacity-50">SUGAR-HEAVY</span>{' '}
                <span className="word inline-block opacity-50">BOTTLES</span>
              </h2>
            </div>
            <div className="overflow-hidden">
              <h2 className="text-display text-5xl md:text-7xl lg:text-9xl text-center text-white"><br/>
                <span className="word inline-block opacity-50">HYDRATION</span>{' '}
                <span className="word inline-block opacity-50">MADE</span>{' '}
                <span className="word inline-block opacity-50">SIMPLE</span>
              </h2>
            </div>
          </div>

          {/* Overlapping "CLEAN & PORTABLE" line */}
          <div 
            ref={overlappingRef}
            className="absolute left-1/2 -translate-x-1/2"
            style={{ top: '42%', transform: 'translate(-50%, -50%)' }}
          ><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <div 
              className="inline-block px-4 md:px-8 py-2 md:py-3"
              style={{ backgroundColor: '#0c2d64' }}
            >
              <h2 
                className="text-display text-4xl md:text-6xl lg:text-8xl text-center italic"
                style={{ color: '#eb8d17' }}
              >
                <span className="word inline-block opacity-50">CLEAN</span>{' '}
                <span className="word inline-block opacity-50">&</span>{' '}
                <span className="word inline-block opacity-50">PORTABLE</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
