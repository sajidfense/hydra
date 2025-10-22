import { useRef } from 'react';
import { SEO } from '@/components/SEO';
import videosData from '@/content/videos.json';

const Reviews = () => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleMouseEnter = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.play();
    }
  };

  const handleMouseLeave = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  // Stagger pattern - alternating top and bottom positions for each column
  const getStaggerClass = (index: number) => {
    const position = index % 4;
    if (position === 1 || position === 3) {
      return 'mt-12'; // Offset every 2nd and 4th item
    }
    return '';
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <SEO
        title="HYDRA+ Customer Reviews & Video Testimonials"
        description="Watch real customer reviews and testimonials about HYDRA+ sugar-free electrolyte drinks. See how athletes, professionals, and wellness enthusiasts stay hydrated."
        canonical="https://www.hydraplus.com/reviews"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ReviewPage",
          "name": "HYDRA+ Customer Reviews",
          "description": "Customer reviews and testimonials for HYDRA+ electrolyte drinks",
          "url": "https://www.hydraplus.com/reviews"
        }}
      />
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-display text-6xl md:text-8xl lg:text-9xl mb-4 uppercase font-black">
            Reviews
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            At Hydra+, we live boldly, daring you to break boundaries and rediscover your inner rebel with each sip.
          </p>
        </div>

        {/* Video Grid - 4 columns with staggered layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videosData.map((video, index) => (
            <div
              key={video.id}
              className={`relative aspect-[9/16] rounded-2xl overflow-hidden group cursor-pointer ${getStaggerClass(index)}`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {/* Video Element */}
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
                poster={video.thumbnail}
              >
                <source
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  type="video/mp4"
                />
              </video>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Title - Always visible at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
                <h3 className="text-white font-bold text-base md:text-lg drop-shadow-lg">
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
