import { SEO } from '@/components/SEO';
import { StickyNav } from '@/components/StickyNav';
import { Footer } from '@/components/Footer';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Terms & Conditions | HYDRA+"
        description="HYDRA+ Terms & Conditions - Read our terms of service for purchasing and using our sugar-free electrolyte products."
        canonical="https://www.hydraplus.com/terms-and-conditions"
      />
      <StickyNav />
      
      <main className="container mx-auto px-4 py-24 md:py-32 max-w-4xl">
        <h1 className="text-display text-5xl md:text-7xl text-primary mb-8">
          TERMS & CONDITIONS
        </h1>
        
        <div className="prose prose-lg max-w-none space-y-8 text-foreground">
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">1. Introduction</h2>
            <p>
              Welcome to Hydra+. These Terms & Conditions govern your use of our website (www.hydraplus.com) and the purchase of our products.
            </p>
            <p>
              By accessing the website or completing a purchase, you agree to be bound by these Terms. Please read them carefully before using our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">2. Definitions</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>"We," "Us," "Our," refer to Hydra+, a company based in Spain.</li>
              <li>"You," "Your," refers to the customer or user of our website.</li>
              <li>"Products" refer to any goods offered by Hydra+ for sale on the website.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">3. Eligibility</h2>
            <p>
              To make a purchase, you must be at least 18 years old and capable of entering into legally binding agreements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">4. Products & Availability</h2>
            <p>
              We strive to ensure all products listed are accurately described and available. However, product images, descriptions, and packaging are for illustrative purposes only.
            </p>
            <p>Hydra+ reserves the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Modify, discontinue, or update products at any time without notice.</li>
              <li>Limit quantities available for sale or refuse orders that appear fraudulent or suspicious.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">5. Pricing & Payment</h2>
            <p>
              All prices are listed in Euros (€) and include applicable VAT unless stated otherwise.
            </p>
            <p>
              Hydra+ reserves the right to adjust pricing at any time.
            </p>
            <p>
              Payments are securely processed via approved third-party gateways. By completing a transaction, you confirm that you are authorized to use the chosen payment method.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">6. Shipping & Delivery</h2>
            <p>
              We currently ship within Spain and other EU countries. Delivery times vary based on location but typically range between 2–7 business days.
            </p>
            <p>
              Hydra+ is not responsible for delays caused by postal services, customs, or events beyond our control.
            </p>
            <p>
              For detailed information, please refer to our Shipping Policy (if applicable).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">7. Returns & Refunds</h2>
            <p>
              We accept returns of unopened products within 14 days of delivery, provided items are in their original packaging.
            </p>
            <p>
              To initiate a return, contact us at <a href="mailto:hello@hydraplus.com" className="text-accent hover:underline">hello@hydraplus.com</a> with your order number.
            </p>
            <p>
              Refunds will be processed once returned products are received and inspected. Shipping costs are non-refundable unless the product was defective or incorrect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">8. Subscriptions (If Applicable)</h2>
            <p>If you subscribe to Hydra+ products:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You authorize recurring billing according to your selected plan.</li>
              <li>You may cancel anytime by emailing <a href="mailto:hello@hydraplus.com" className="text-accent hover:underline">hello@hydraplus.com</a> or through your customer account before the next billing cycle.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">9. Intellectual Property</h2>
            <p>
              All content on this website — including logos, product names, text, graphics, images, videos, and design elements — is the exclusive property of Hydra+ or its licensors and is protected under EU and international copyright and trademark laws.
            </p>
            <p>
              You may not reproduce, modify, or distribute any content without prior written consent from Hydra+.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">10. User Conduct</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the website for unlawful purposes.</li>
              <li>Interfere with website security or functionality.</li>
              <li>Upload malicious code, spam, or offensive content.</li>
              <li>Impersonate any individual or company.</li>
            </ul>
            <p>
              Hydra+ reserves the right to suspend or terminate access if misuse is detected.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">11. Limitation of Liability</h2>
            <p>
              Hydra+ is not liable for any indirect, incidental, or consequential damages arising from the use of our website or products.
            </p>
            <p>
              Our total liability for any claim related to product purchase shall not exceed the amount paid for that specific product.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">12. Health Disclaimer</h2>
            <p>
              Hydra+ electrolyte products are not intended to diagnose, treat, cure, or prevent any disease.
            </p>
            <p>
              Always consult a healthcare professional if you have existing health conditions, allergies, or dietary concerns before using any supplement or hydration product.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">13. Privacy & Data Protection</h2>
            <p>
              Your privacy is important to us. Personal data is handled in accordance with our <a href="/privacy-policy" className="text-accent hover:underline">Privacy Policy</a>, available at www.hydraplus.com/privacy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">14. Force Majeure</h2>
            <p>
              Hydra+ is not responsible for failure or delays caused by circumstances beyond our control, such as natural disasters, transport disruptions, or supply chain issues.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">15. Governing Law & Jurisdiction</h2>
            <p>
              These Terms & Conditions are governed by Spanish law and any disputes shall be subject to the exclusive jurisdiction of the courts of Spain.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">16. Changes to Terms</h2>
            <p>
              Hydra+ may update these Terms & Conditions from time to time. The most recent version will always be available on our website with the updated "Effective Date."
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">17. Contact Us</h2>
            <p>For any questions, feedback, or concerns about these Terms, contact us at:</p>
            <p>
              Email: <a href="mailto:hello@hydraplus.com" className="text-accent hover:underline">hello@hydraplus.com</a>
            </p>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
