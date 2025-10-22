import { useEffect, useState } from 'react';

export const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const startTime = Date.now();
    const minDisplayTime = 3000; // 3 seconds minimum
    let isPageLoaded = false;

    const handleLoad = () => {
      isPageLoaded = true;
      checkAndHide();
    };

    const checkAndHide = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = minDisplayTime - elapsedTime;

      if (remainingTime <= 0) {
        setIsVisible(false);
      } else {
        setTimeout(() => setIsVisible(false), remainingTime);
      }
    };

    // Set minimum display time
    const minTimer = setTimeout(() => {
      if (isPageLoaded || document.readyState === 'complete') {
        setIsVisible(false);
      }
    }, minDisplayTime);

    // Listen for page load
    if (document.readyState === 'complete') {
      isPageLoaded = true;
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearTimeout(minTimer);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <svg
        width="400"
        height="120"
        viewBox="0 0 400 120"
        className="max-w-[90vw]"
      >
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="text-[80px] font-bold fill-none stroke-primary"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 1000,
            strokeDashoffset: 1000,
            animation: 'drawText 2s ease-in-out infinite'
          }}
        >
          HYDRA+
        </text>
      </svg>
      
      <style>{`
        @keyframes drawText {
          0% {
            stroke-dashoffset: 1000;
          }
          50% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -1000;
          }
        }
      `}</style>
    </div>
  );
};
