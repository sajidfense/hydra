import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function VideoReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !maskRef.current) return;

      // Animate the circular mask expanding
      gsap.fromTo(
        maskRef.current,
        {
          clipPath: 'circle(5% at 50% 50%)',
        },
        {
          clipPath: 'circle(150% at 50% 50%)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-background">
      <div className="w-full px-0">
        <div
          ref={videoContainerRef}
          className="relative w-full h-screen bg-background"
        >
          {/* Masked video/image container */}
          <div
            ref={maskRef}
            className="absolute inset-0"
            style={{
              clipPath: 'circle(5% at 50% 50%)',
            }}
          >
            {/* Placeholder video - replace with actual video */}
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                type="video/mp4"
              />
            </video>
          </div>

          {/* Overlay text when video is small */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-4xl md:text-6xl font-bold text-foreground/20">
              SCROLL TO REVEAL
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
