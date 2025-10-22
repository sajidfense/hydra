import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Check, Package, Truck, Gift } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCartStore } from "@/stores/cartStore";
import { useCurrencyStore } from "@/stores/currencyStore";
import { useToast } from "@/hooks/use-toast";
import { useUIStore } from "@/stores/uiStore";
import productCanPlaceholder from "@/assets/product-can-placeholder.png";

export default function Subscribe() {
  const [selectedFrequencies, setSelectedFrequencies] = useState<Record<number, string>>({
    0: "4 weeks",
    1: "4 weeks",
    2: "4 weeks",
  });

  const addItem = useCartStore(state => state.addItem);
  const { formatPrice, convertPrice } = useCurrencyStore();
  const { toast } = useToast();
  const setCartOpen = useUIStore(state => state.setCartOpen);

  const frequencyOptions = [
    { label: "Every 2 weeks", value: "2 weeks" },
    { label: "Every 4 weeks", value: "4 weeks" },
    { label: "Every 8 weeks", value: "8 weeks" },
  ];

  const subscriptionTiers = [
    {
      name: "Starter Pack",
      description: "1 Box (20 sachets)",
      frequency: "Monthly",
      priceEur: 17.99,
      savings: "10% off",
      popular: false,
    },
    {
      name: "Hydra+ Duo",
      description: "2 Boxes (40 sachets)",
      frequency: "Monthly",
      priceEur: 33.99,
      savings: "15% off",
      popular: true,
    },
    {
      name: "Performance Pack",
      description: "3 Boxes (60 sachets)",
      frequency: "Monthly",
      priceEur: 47.99,
      savings: "20% off",
      popular: false,
    },
  ];

  const benefits = [
    "Save up to 20% off every order",
    "Subscribers get early access to new flavors",
    "Free shipping across Spain",
    "Skip, pause or cancel anytime",
  ];

  const handleSelectPlan = (tier: typeof subscriptionTiers[0], index: number) => {
    const frequency = selectedFrequencies[index];
    const convertedPrice = convertPrice(tier.priceEur);
    const priceValue = convertedPrice.toFixed(2);
    
    // Create a subscription cart item
    const subscriptionItem = {
      product: {
        node: {
          id: `subscription-${tier.name.toLowerCase().replace(/\s+/g, '-')}`,
          title: `${tier.name} Subscription`,
          handle: `subscription-${tier.name.toLowerCase().replace(/\s+/g, '-')}`,
          description: `${tier.description} - Delivered ${frequency}`,
          productType: 'Subscription',
          tags: ['subscription', 'electrolytes'],
          priceRange: {
            minVariantPrice: {
              amount: priceValue,
              currencyCode: 'EUR'
            }
          },
          images: {
            edges: [{
              node: {
                url: productCanPlaceholder,
                altText: tier.name
              }
            }]
          },
          variants: {
            edges: [{
              node: {
                id: `subscription-variant-${tier.name.toLowerCase().replace(/\s+/g, '-')}-${frequency.replace(/\s+/g, '-')}`,
                title: `${frequency} delivery`,
                price: {
                  amount: priceValue,
                  currencyCode: 'EUR'
                },
                availableForSale: true,
                selectedOptions: []
              }
            }]
          },
          options: [{
            name: 'Frequency',
            values: ['2 weeks', '4 weeks', '8 weeks']
          }]
        }
      },
      variantId: `subscription-variant-${tier.name.toLowerCase().replace(/\s+/g, '-')}-${frequency.replace(/\s+/g, '-')}`,
      variantTitle: `${frequency} delivery`,
      price: {
        amount: priceValue,
        currencyCode: 'EUR'
      },
      quantity: 1,
      selectedOptions: [
        {
          name: 'Frequency',
          value: frequency
        },
        {
          name: 'Plan',
          value: tier.name
        }
      ]
    };

    addItem(subscriptionItem);
    
    toast({
      title: "Added to cart",
      description: `${tier.name} - ${frequency} delivery`,
    });

    // Open cart drawer
    setCartOpen(true);
  };

  return (
    <>
      <SEO 
        title="Subscribe & Save Up to 20% | Flexible Electrolyte Subscriptions"
        description="Subscribe to HYDRA+ electrolyte sachets with flexible delivery every 2, 4, or 8 weeks. Save up to 20%, multi-currency checkout (EUR, USD, GBP), free shipping across Spain. Skip, pause, or cancel anytime."
        canonical="https://www.hydraplus.com/subscribe"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "HYDRA+ Subscription Plans",
          "description": "Flexible electrolyte subscriptions with 2, 4, or 8 week delivery options",
          "url": "https://www.hydraplus.com/subscribe",
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "EUR",
            "lowPrice": "17.99",
            "highPrice": "47.99",
            "offerCount": "3"
          }
        }}
      />

      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-display text-6xl md:text-7xl lg:text-8xl text-primary">
                    Subscribe to Hydration
                  </h1>
                  <p className="text-xl md:text-2xl text-muted-foreground max-w-xl">
                    Daily hydration, delivered to your door.
                  </p>
                  <p className="text-lg text-foreground max-w-xl">
                    Subscribe and stay consistently hydrated — without the hassle.
                  </p>
                </div>

                {/* Benefits List */}
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-accent" />
                      </div>
                      <span className="text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>

                <Button size="lg" className="text-lg px-8" asChild>
                  <a href="#plans">Choose Your Plan</a>
                </Button>
              </div>

              {/* Right Image */}
              <div className="relative">
                <div className="relative z-10 aspect-square max-w-md mx-auto">
                  <img
                    src={productCanPlaceholder}
                    alt="Electrolyte subscription"
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-secondary/20 blur-3xl -z-0" />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-display text-4xl md:text-5xl lg:text-6xl text-center mb-16 text-primary">
              Hydration that feels like a ritual you want to keep
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
                  <Package className="w-8 h-8 text-accent" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-bold text-accent uppercase tracking-wider">Step One</p>
                  <h3 className="text-xl font-bold text-foreground">Pick your plan</h3>
                  <p className="text-muted-foreground">Choose from our three subscription tiers</p>
                </div>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
                  <Truck className="w-8 h-8 text-accent" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-bold text-accent uppercase tracking-wider">Step Two</p>
                  <h3 className="text-xl font-bold text-foreground">Set delivery frequency</h3>
                  <p className="text-muted-foreground">Choose monthly delivery that fits your routine</p>
                </div>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
                  <Gift className="w-8 h-8 text-accent" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-bold text-accent uppercase tracking-wider">Step Three</p>
                  <h3 className="text-xl font-bold text-foreground">Enjoy & manage</h3>
                  <p className="text-muted-foreground">Manage your subscription anytime from your account</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Subscription Tiers */}
        <section id="plans" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-display text-4xl md:text-5xl lg:text-6xl text-primary">
                Choose Your Plan
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Select the subscription that fits your hydration needs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {subscriptionTiers.map((tier, index) => (
                <div
                  key={index}
                  className={`relative rounded-2xl p-8 border-2 transition-all hover:scale-105 ${
                    tier.popular
                      ? "border-accent bg-accent/5 shadow-xl"
                      : "border-border bg-card"
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-bold uppercase">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-foreground">{tier.name}</h3>
                      <p className="text-muted-foreground">{tier.description}</p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-primary">{formatPrice(tier.priceEur)}</span>
                        <span className="text-muted-foreground">/{tier.frequency.toLowerCase()}</span>
                      </div>
                      <p className="text-accent font-semibold">{tier.savings}</p>
                    </div>

                    {/* Frequency Selector */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Delivery Frequency
                      </label>
                      <Select
                        value={selectedFrequencies[index]}
                        onValueChange={(value) =>
                          setSelectedFrequencies((prev) => ({
                            ...prev,
                            [index]: value,
                          }))
                        }
                      >
                        <SelectTrigger className="w-full bg-background border-border z-50">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border z-[100]">
                          {frequencyOptions.map((option) => (
                            <SelectItem 
                              key={option.value} 
                              value={option.value}
                              className="cursor-pointer hover:bg-accent/10"
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="pt-4 space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-accent flex-shrink-0" />
                        <span>Free shipping across Spain</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-accent flex-shrink-0" />
                        <span>Early access to new flavors</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-accent flex-shrink-0" />
                        <span>Skip, pause or cancel anytime</span>
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      variant={tier.popular ? "default" : "outline"}
                      size="lg"
                      onClick={() => handleSelectPlan(tier, index)}
                    >
                      Select Plan
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center space-y-4">
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                Note: To complete your subscription purchase, you'll need to set up a Shopify subscription product. 
                After checkout, your recurring orders will be managed through Shopify.
              </p>
              <p className="text-muted-foreground">
                Need help choosing? <a href="/contact" className="text-accent hover:underline">Contact us</a>
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="max-w-3xl mx-auto space-y-12">
            <h2 className="text-display text-4xl md:text-5xl text-center text-primary">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-2">Can I change my plan?</h3>
                <p className="text-muted-foreground">
                  Yes! You can upgrade or downgrade your subscription plan at any time from your account dashboard.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-2">How does billing work?</h3>
                <p className="text-muted-foreground">
                  You'll be charged on the same day each month. You can update your billing information or payment method anytime.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-2">Can I pause or cancel?</h3>
                <p className="text-muted-foreground">
                  Absolutely! You have full control to skip, pause, or cancel your subscription at any time with no penalties.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-2">When will I receive my first order?</h3>
                <p className="text-muted-foreground">
                  Your first order ships within 2-3 business days. Subsequent orders are automatically sent based on your chosen frequency.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-display text-4xl md:text-5xl lg:text-6xl text-primary">
              Ready to Start Your Hydration Journey?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join hundreds of satisfied subscribers who never run out of their favorite electrolytes.
            </p>
            <Button size="lg" className="text-lg px-12" asChild>
              <a href="#plans">Choose Your Plan</a>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
