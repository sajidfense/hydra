import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ordersFaqs = [
  {
    question: 'How long will my order take to arrive?',
    answer: 'Orders within Spain typically arrive in 2–4 business days, and 5–7 days for other EU countries. You\'ll receive tracking details once your package ships.'
  },
  {
    question: 'Can I edit or cancel my order after placing it?',
    answer: 'If your order hasn\'t been processed yet, contact our team at support@hydraplus.eu within 12 hours of purchase, and we\'ll do our best to make changes.'
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Yes! Hydra+ ships throughout the European Union. We\'re expanding to other regions soon — join our mailing list for updates.'
  },
  {
    question: 'What if my order arrives damaged or incomplete?',
    answer: 'We\'re sorry for the inconvenience. Please email orders@hydraplus.eu with your order number and photos of the items — we\'ll replace or refund immediately.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major debit/credit cards, PayPal, and Apple Pay. Secure checkout is handled through encrypted payment gateways.'
  },
  {
    question: 'Can I return or exchange my purchase?',
    answer: 'Unopened products can be returned within 14 days of delivery. For returns or exchanges, contact returns@hydraplus.eu and we\'ll guide you through the process.'
  },
];

const productFaqs = [
  {
    question: 'How do I use Hydra+ sachets?',
    answer: 'Mix one sachet with 500–600ml of water, shake or stir, and enjoy — before, during, or after workouts, or any time you need hydration.'
  },
  {
    question: 'Who can use Hydra+?',
    answer: 'Hydra+ is designed for everyone — athletes, travelers, office workers, or anyone needing clean hydration without sugar.'
  },
  {
    question: 'Is Hydra+ safe for daily use?',
    answer: 'Yes. Hydra+ contains natural, low-sodium ingredients balanced for daily hydration. For specific medical conditions, consult your doctor.'
  },
  {
    question: 'Does Hydra+ contain caffeine or sugar?',
    answer: 'No. Hydra+ is caffeine-free and sugar-free, sweetened naturally with stevia for a clean taste.'
  },
  {
    question: 'Where is Hydra+ manufactured?',
    answer: 'Hydra+ is formulated and made in Spain, under GMP, HACCP, and EFSA regulations, ensuring top-quality standards.'
  },
  {
    question: 'How should I store Hydra+ sachets?',
    answer: 'Keep sachets in a cool, dry place, away from direct sunlight or humidity. No refrigeration needed.'
  },
];

export function FaqSection() {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <section className="py-20 md:py-32" style={{ backgroundColor: '#eb8d17' }}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-display text-5xl md:text-7xl mb-2 text-white">
            FREQUENTLY ASKED
          </h2>
          <div className="inline-block px-8 py-4 -rotate-2" style={{ backgroundColor: '#f5c112' }}>
            <h2 className="text-display text-5xl md:text-7xl" style={{ color: '#0c2d64' }}>
              QUESTIONS
            </h2>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-transparent gap-4">
              <TabsTrigger 
                value="orders"
                className="px-8 py-3 rounded-full text-lg font-bold border-2 border-white data-[state=active]:bg-white data-[state=active]:text-[#eb8d17] data-[state=inactive]:bg-transparent data-[state=inactive]:text-white"
              >
                🛒 ORDERS
              </TabsTrigger>
              <TabsTrigger 
                value="product"
                className="px-8 py-3 rounded-full text-lg font-bold border-2 border-white data-[state=active]:bg-white data-[state=active]:text-[#eb8d17] data-[state=inactive]:bg-transparent data-[state=inactive]:text-white"
              >
                💧 PRODUCT
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="orders">
            <Accordion type="single" collapsible className="space-y-4">
              {ordersFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`orders-${index}`}
                  className="bg-white/20 backdrop-blur-sm rounded-full border-0 overflow-hidden px-6"
                >
                  <AccordionTrigger 
                    className="py-6 text-left text-lg font-medium hover:no-underline text-white"
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-white/90">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          <TabsContent value="product">
            <Accordion type="single" collapsible className="space-y-4">
              {productFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`product-${index}`}
                  className="bg-white/20 backdrop-blur-sm rounded-full border-0 overflow-hidden px-6"
                >
                  <AccordionTrigger 
                    className="py-6 text-left text-lg font-medium hover:no-underline text-white"
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-white/90">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
