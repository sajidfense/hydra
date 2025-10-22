import { Instagram, Mail } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-display text-3xl mb-4">HYDRA+</h3>
            <p className="text-sm opacity-80">
              Clean, portable, sugar-free electrolytes for everyday energy, focus, and recovery.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/shop" className="hover:text-accent transition-colors">All Flavors</a></li>
              <li><a href="/shop" className="hover:text-accent transition-colors">Variety Packs</a></li>
              <li><a href="/about" className="hover:text-accent transition-colors">About Us</a></li>
              <li><a href="#stores" className="hover:text-accent transition-colors">Find in Stores</a></li>
            </ul>
          </div>


          {/* Newsletter */}
          <div>
            <h4 className="font-bold mb-4">Stay Connected</h4>
            <p className="text-sm opacity-80 mb-4">Get the latest flavors and exclusive offers.</p>
            <div className="flex gap-2 mb-4">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Button variant="secondary" size="icon">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="w-6 h-6 hover:text-accent transition-colors" />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <FaTiktok className="w-6 h-6 hover:text-accent transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="opacity-70">© 2025 HYDRA+. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/about" className="hover:text-accent transition-colors">About Us</a>
            <a href="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="/terms-and-conditions" className="hover:text-accent transition-colors">Terms of Service</a>
            <a href="/contact" className="hover:text-accent transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
