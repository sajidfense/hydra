import { useEffect } from 'react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { SEO } from '@/components/SEO';
import { HeroSection } from '@/components/HeroSection';
import { MarqueeSection } from '@/components/MarqueeSection';
import { FlavorShowcase } from '@/components/FlavorShowcase';
import { NutritionStats } from '@/components/NutritionStats';
import { BenefitsSection } from '@/components/BenefitsSection';
import { VideoReveal } from '@/components/VideoReveal';
import { VideoGallery } from '@/components/VideoGallery';
import { FaqSection } from '@/components/FaqSection';
import { CtaBanner } from '@/components/CtaBanner';
import { ProgramsStrip } from '@/components/ProgramsStrip';

const Index = () => {
  useSmoothScroll();

  useEffect(() => {
    document.documentElement.classList.add('lenis');
    
    return () => {
      document.documentElement.classList.remove('lenis');
    };
  }, []);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "HYDRA+",
    "url": "https://www.hydraplus.com",
    "logo": "https://www.hydraplus.com/logo.png",
    "description": "Premium sugar-free electrolyte drinks with flexible subscriptions, multi-currency support, and AI-powered customer assistance. Optimal hydration delivered across Europe.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "ES"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "hello@hydraplus.com",
      "contactType": "Customer Service"
    },
    "sameAs": [
      "https://instagram.com/hydraplus",
      "https://tiktok.com/@hydraplus"
    ]
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="HYDRA+ | Premium Sugar-Free Electrolyte Drinks & Subscriptions"
        description="Clean, portable, sugar-free electrolytes with flexible subscriptions (2, 4, or 8 week delivery). Multi-currency checkout, AI support, and free shipping across Spain. Subscribe & save up to 20%."
        canonical="https://www.hydraplus.com"
        jsonLd={organizationSchema}
      />
      <HeroSection />
      <MarqueeSection />
      <FlavorShowcase />
      <NutritionStats />
      <BenefitsSection />
      <VideoReveal />
      <VideoGallery />
      <FaqSection />
      <CtaBanner />
      <ProgramsStrip />
    </div>
  );
};

export default Index;
