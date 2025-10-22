import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUIStore } from "@/stores/uiStore";

export const AnnouncementBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isCartOpen, isNavOpen } = useUIStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isScrolled || isCartOpen || isNavOpen) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 animate-fade-in">
      <div className="container mx-auto flex items-center justify-center gap-2">
        <Link 
          to="/product/gift-bundle"
          className="text-sm md:text-base font-medium hover:underline flex items-center gap-2 group"
        >
          <span className="animate-pulse">🎁</span>
          <span>New Gift Packs Available</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </div>
  );
};
