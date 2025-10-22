import { Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { StickyNav } from '@/components/StickyNav';
import { Footer } from '@/components/Footer';

export default function Stores() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Find HYDRA+ in Stores Near You | Retail & Wholesale"
        description="HYDRA+ sugar-free electrolyte drinks coming soon to retailers across Spain and Europe. Flexible subscriptions available now with multi-currency checkout. Contact us for wholesale or retail inquiries."
        canonical="https://www.hydraplus.com/stores"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Find HYDRA+ in Stores",
          "description": "Locate HYDRA+ retail stores and learn about wholesale opportunities",
          "url": "https://www.hydraplus.com/stores"
        }}
      />
      <StickyNav />
      
      <main className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-display text-6xl md:text-8xl lg:text-9xl text-primary mb-8">
            COMING TO A
          </h1>
          <h1 className="text-display text-6xl md:text-8xl lg:text-9xl text-accent mb-12">
            STORE NEAR YOU
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            We're working hard to bring HYDRA+ to retailers in your area. 
            Our clean, sugar-free electrolyte drinks will soon be available at stores nationwide.
          </p>
          
          <p className="text-base md:text-lg text-foreground/70 mb-12 max-w-2xl mx-auto">
            Want to stock HYDRA+ at your store? Interested in wholesale pricing? 
            Looking for a specific location?
          </p>
          
          <Button size="lg" className="text-lg px-8" asChild>
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
