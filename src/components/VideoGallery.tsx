import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Play, X } from 'lucide-react';
import videos from '@/content/videos.json';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

export function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const whatsRef = useRef<HTMLHeadingElement>(null);
  const sayingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate "WHAT'S" to the right
      if (whatsRef.current) {
        gsap.to(whatsRef.current, {
          x: 100,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      // Animate "SAYING" to the left
      if (sayingRef.current) {
        gsap.to(sayingRef.current, {
          x: -100,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      // Animate video cards from same pinpoint - staggered one at a time
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          {
            y: '80vh',
            x: '50vw', // All start from exact same center point
            left: '-50%',
            scale: 0.6,
            opacity: 0,
            rotation: 0, // Start with no rotation
          },
          {
            y: 0,
            x: 0,
            left: 0,
            scale: 1,
            opacity: 1,
            rotation: 0, // Let CSS handle final rotation
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `${10 + index * 15}% bottom`,
              end: `${25 + index * 15}% center`,
              scrub: 1,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={sectionRef} className="relative min-h-[300vh]">
        {/* Fullscreen heading section - fixed in background */}
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
          <h2 ref={whatsRef} className="text-[15vw] md:text-[20vw] font-black leading-none text-foreground">
            WHAT'S
          </h2>
          <h2 className="text-[15vw] md:text-[20vw] font-black leading-none text-primary">
            EVERYONE
          </h2>
          <h2 ref={sayingRef} className="text-[15vw] md:text-[20vw] font-black leading-none text-foreground">
            SAYING
          </h2>
        </div>

        {/* Video gallery grid - positioned absolutely to overlay text */}
        <div className="absolute inset-0 flex items-end justify-center pb-32">
          <div className="container mx-auto px-4">
            <div className="relative flex items-center justify-center gap-0 flex-nowrap max-w-7xl mx-auto">
            {videos.map((video, index) => {
              const rotations = [-8, 6, -4, 8, -6, 5]; // Different rotation angles for each card
              const zIndexes = [10, 20, 15, 25, 12, 22]; // Stacking order
              const offsets = [
                { x: '-10%', y: '6%' },
                { x: '-5%', y: '-4%' },
                { x: '0%', y: '8%' },
                { x: '5%', y: '-2%' },
                { x: '-8%', y: '4%' },
                { x: '10%', y: '2%' }
              ]; // Position offsets for overlap
              
              return (
                <div
                  key={video.id}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className="relative group cursor-pointer aspect-[9/16] rounded-2xl overflow-hidden border-4 border-background shadow-2xl transition-all duration-300 hover:!z-[100] hover:scale-105"
                  style={{
                    width: '260px',
                    transform: `rotate(${rotations[index]}deg) translate(${offsets[index].x}, ${offsets[index].y})`,
                    zIndex: zIndexes[index],
                    marginLeft: index > 0 ? '-100px' : '0'
                  }}
                  onClick={() => setSelectedVideo(video.youtubeId)}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-16 h-16 text-white" fill="white" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-white font-bold text-sm">{video.title}</h3>
                  </div>
                </div>
              );
            })}
            </div>
            
            {/* Explore All Button */}
            <div className="flex justify-center mt-24">
              <Link to="/reviews">
                <Button 
                  size="lg"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-12 py-6 text-lg font-bold rounded-full"
                >
                  EXPLORE ALL
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={() => setSelectedVideo(null)}
          >
            <X className="w-6 h-6" />
          </Button>
          <div className="w-full max-w-4xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
