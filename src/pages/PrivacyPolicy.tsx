import { SEO } from '@/components/SEO';
import { StickyNav } from '@/components/StickyNav';
import { Footer } from '@/components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Privacy Policy | HYDRA+"
        description="HYDRA+ Privacy Policy - Learn how we collect, use, and protect your personal data under GDPR compliance."
        canonical="https://www.hydraplus.com/privacy-policy"
      />
      <StickyNav />
      
      <main className="container mx-auto px-4 py-24 md:py-32 max-w-4xl">
        <h1 className="text-display text-5xl md:text-7xl text-primary mb-8">
          PRIVACY POLICY
        </h1>
        
        <div className="prose prose-lg max-w-none space-y-8 text-foreground">
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">1. Introduction</h2>
            <p>
              At Hydra+, your privacy matters. This Privacy Policy explains how we collect, use, store, and protect your personal data when you visit our website, purchase our products, or interact with our brand.
            </p>
            <p>
              By using our website (www.hydraplus.com) or purchasing our products, you agree to the terms of this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">2. Data Controller</h2>
            <p>
              Hydra+, based in Spain, is the data controller responsible for processing your personal information under the EU General Data Protection Regulation (GDPR).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">3. Information We Collect</h2>
            <p>We collect personal data in the following ways:</p>
            
            <h3 className="text-xl font-semibold text-primary mt-6 mb-3">a. Information You Provide Directly</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name and contact details (email, shipping/billing address)</li>
              <li>Account registration details (if applicable)</li>
              <li>Payment and order information (processed securely through third-party payment providers)</li>
              <li>Messages or inquiries sent via our contact form or email</li>
            </ul>

            <h3 className="text-xl font-semibold text-primary mt-6 mb-3">b. Information Collected Automatically</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>IP address, browser type, device information, and website usage data via cookies and analytics tools (e.g., Google Analytics)</li>
              <li>Interaction data such as pages viewed, time spent on site, and referring URLs</li>
            </ul>

            <h3 className="text-xl font-semibold text-primary mt-6 mb-3">c. Cookies</h3>
            <p>
              Cookies help us improve user experience, track website performance, and deliver relevant content. You can manage or disable cookies in your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">4. How We Use Your Information</h2>
            <p>Hydra+ uses your data for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Processing and delivering your orders</li>
              <li>Responding to your inquiries or support requests</li>
              <li>Sending order confirmations and updates</li>
              <li>Improving our website, products, and customer experience</li>
              <li>Email marketing (only if you have opted in)</li>
              <li>Compliance with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">5. Legal Basis for Processing</h2>
            <p>We process your personal data based on:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Contractual necessity:</strong> to fulfill your orders</li>
              <li><strong>Consent:</strong> for email marketing and newsletters</li>
              <li><strong>Legitimate interest:</strong> to enhance user experience and prevent fraud</li>
              <li><strong>Legal compliance:</strong> to meet EU and Spanish regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">6. Data Retention</h2>
            <p>
              We retain your personal information only as long as necessary for the purposes stated above or as required by law. Once data is no longer needed, it will be securely deleted or anonymized.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">7. Sharing Your Information</h2>
            <p>We do not sell or rent your personal data.</p>
            <p>We may share limited data with trusted third parties, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Payment processors (for secure transactions)</li>
              <li>Logistics and shipping providers (to deliver your order)</li>
              <li>IT service providers (for site hosting and maintenance)</li>
            </ul>
            <p>All third-party partners are GDPR-compliant and bound by data protection agreements.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">8. International Transfers</h2>
            <p>
              If your data is transferred outside the European Economic Area (EEA), we ensure adequate safeguards (such as Standard Contractual Clauses) to protect your privacy rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">9. Your Rights Under GDPR</h2>
            <p>You have the following rights:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
              <li><strong>Erasure:</strong> Request deletion ("right to be forgotten")</li>
              <li><strong>Restriction:</strong> Limit how your data is processed</li>
              <li><strong>Portability:</strong> Request transfer of your data to another provider</li>
              <li><strong>Objection:</strong> Withdraw consent for marketing or certain processing activities</li>
            </ul>
            <p>
              To exercise any of these rights, email us at <a href="mailto:hello@hydraplus.com" className="text-accent hover:underline">hello@hydraplus.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">10. Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal data from unauthorized access, disclosure, alteration, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">11. Links to Other Websites</h2>
            <p>
              Our website may include links to external sites. Hydra+ is not responsible for the content or privacy practices of these third-party sites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">12. Updates to This Policy</h2>
            <p>
              We may update this Privacy Policy occasionally. Any significant changes will be posted on this page with a revised effective date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">13. Contact Us</h2>
            <p>For any questions, requests, or privacy concerns, contact us at:</p>
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
