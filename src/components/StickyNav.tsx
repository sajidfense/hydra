import { useState, useEffect, useRef } from 'react';
import { Menu, X, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartDrawer } from '@/components/CartDrawer';
import { CurrencySelector } from '@/components/CurrencySelector';
import { useUIStore } from '@/stores/uiStore';
import gsap from 'gsap';
import heroCan1 from '@/assets/hero-can-1.jpg';
import heroCan2 from '@/assets/hero-can-2.jpg';
import heroCan3 from '@/assets/hero-can-3.jpg';

export function StickyNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const desktopMenuRef = useRef<HTMLDivElement>(null);
  const menuContentRef = useRef<HTMLDivElement>(null);
  const setNavOpen = useUIStore(state => state.setNavOpen);

  useEffect(() => {
    setNavOpen(isDesktopMenuOpen);
  }, [isDesktopMenuOpen, setNavOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDesktopMenuOpen && desktopMenuRef.current && menuContentRef.current) {
      // Animate menu opening
      gsap.fromTo(
        desktopMenuRef.current,
        { y: '-100%' },
        { y: '0%', duration: 0.8, ease: 'power3.out' }
      );
      
      gsap.fromTo(
        menuContentRef.current.querySelectorAll('.menu-link'),
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, delay: 0.3, ease: 'power2.out' }
      );
      
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDesktopMenuOpen]);

  const navLinks = [
    { label: 'Find in stores', href: '/stores', image: heroCan2 },
    { label: 'Subscribe', href: '/subscribe', image: heroCan3 },
    { label: 'Shop', href: '/shop', image: heroCan1 },
    { label: 'About us', href: '/about', image: heroCan3 },
    { label: 'Reviews', href: '/reviews', image: heroCan1 },
    { label: 'Blog', href: '/blog', image: heroCan2 },
    { label: 'Contact', href: '/contact', image: heroCan3 },
  ];

  const handleDesktopMenuToggle = () => {
    if (isDesktopMenuOpen && desktopMenuRef.current) {
      gsap.to(desktopMenuRef.current, {
        y: '-100%',
        duration: 0.6,
        ease: 'power3.in',
        onComplete: () => setIsDesktopMenuOpen(false),
      });
    } else {
      setIsDesktopMenuOpen(true);
    }
  };

  return (
    <nav
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-lg py-3 top-0' : 'bg-transparent py-6 top-9'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="/" className="text-display text-2xl md:text-3xl">
          HYDRA+
        </a>

        <div className="flex items-center gap-2">
          <CurrencySelector />
          <CartDrawer />
          <button
            onClick={handleDesktopMenuToggle}
            className="text-sm font-medium hover:text-accent transition-colors"
            aria-label="Toggle menu"
          >
            {isDesktopMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="bg-background border-t border-border mt-4 py-6 px-4">
          <ul className="space-y-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="block text-lg font-medium hover:text-accent transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4 mt-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <Youtube className="w-6 h-6" />
            </a>
          </div>
        </div>
      )}

      {/* Desktop Fullscreen Menu */}
      {isDesktopMenuOpen && (
        <div
          ref={desktopMenuRef}
          className="fixed inset-0 z-[100] bg-background"
          style={{ transform: 'translateY(-100%)' }}
        >
          <div className="h-full grid grid-cols-1 md:grid-cols-2">
            {/* Left Side - Navigation with Background */}
            <div ref={menuContentRef} className="flex flex-col justify-between p-12 lg:p-16 bg-background/95 backdrop-blur-sm">
              <div>
                {/* Find in Stores Button */}
                <div className="menu-link mb-8">
                  <Button size="lg" asChild>
                    <a href="/stores">Find in stores</a>
                  </Button>
                </div>
                
                <nav>
                  <ul className="space-y-4">
                    {navLinks.map((link) => (
                      <li key={link.label} className="menu-link">
                        <a
                          href={link.href}
                          className="text-display text-5xl lg:text-6xl xl:text-7xl hover:text-accent transition-colors block"
                          onClick={handleDesktopMenuToggle}
                          onMouseEnter={() => setHoveredLink(link.label)}
                          onMouseLeave={() => setHoveredLink(null)}
                        >
                          {link.label.toUpperCase()}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              <div className="menu-link flex items-center gap-6">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-accent transition-colors">
                  Instagram
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hover:text-accent transition-colors">
                  TikTok
                </a>
              </div>
            </div>

            {/* Right Side - Dynamic Product Image */}
            <div className="relative overflow-hidden bg-muted hidden md:block">
              {/* Close Button in top right */}
              <div className="absolute top-16 right-8 z-10">
                <button
                  onClick={handleDesktopMenuToggle}
                  className="p-3 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="h-full w-full">
                {navLinks.map((link) => (
                  <img
                    key={link.label}
                    src={link.image}
                    alt={link.label}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                      hoveredLink === link.label || (!hoveredLink && link.label === 'Shop')
                        ? 'opacity-100'
                        : 'opacity-0'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            {/* Mobile Close Button */}
            <div className="absolute top-8 right-8 z-10 md:hidden">
              <button
                onClick={handleDesktopMenuToggle}
                className="p-3 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
