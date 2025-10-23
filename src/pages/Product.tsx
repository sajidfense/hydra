import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductByHandle } from '@/lib/shopify';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Loader2, ArrowLeft, Droplet, Zap, Leaf, ThermometerSun, Sparkles, Heart, Package } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { useCurrencyStore } from '@/stores/currencyStore';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { VideoGallery } from '@/components/VideoGallery';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import productVid from '@/assets/product_vid.mp4'

const Product = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const addItem = useCartStore(state => state.addItem);
  const { formatPrice } = useCurrencyStore();

  const nutritionBenefits = [
    { icon: Droplet, label: 'Essential Electrolytes', description: 'Sodium & Potassium' },
    { icon: Zap, label: 'Zero Sugar', description: 'No Added Sugars' },
    { icon: Leaf, label: 'Natural Flavors', description: 'Clean Ingredients' },
    { icon: ThermometerSun, label: 'Hydration Boost', description: 'Fast Absorption' },
    { icon: Sparkles, label: 'Vitamin Enhanced', description: 'Essential Vitamins' },
    { icon: Heart, label: 'Vegan Friendly', description: 'Plant-Based' },
  ];

  const faqs = [
    {
      emoji: '💧',
      question: 'What makes Hydra+ different from other electrolyte drinks?',
      answer: 'Hydra+ uses a clean, sugar-free formula with balanced electrolytes and natural flavors inspired by the Mediterranean. Unlike bottled sports drinks, it\'s portable, affordable, and made in the EU under GMP and EFSA quality standards.'
    },
    {
      emoji: '⚡',
      question: 'How do I use Hydra+ sachets?',
      answer: 'Simply mix one sachet with 500–600 ml of cold water, shake or stir, and enjoy. Perfect before, during, or after exercise — or anytime you need a hydration boost.'
    },
    {
      emoji: '🧂',
      question: 'Does Hydra+ contain sugar or artificial ingredients?',
      answer: 'No. Hydra+ is 100% sugar-free and sweetened with natural, calorie-free alternatives like stevia. It contains no artificial colors or preservatives, just clean ingredients that work.'
    },
    {
      emoji: '🍋',
      question: 'Where is Hydra+ made?',
      answer: 'All Hydra+ products are formulated and manufactured in Spain under EU GMP and HACCP compliance, ensuring purity, consistency, and safety in every sachet.'
    },
    {
      emoji: '🧃',
      question: 'How many sachets can I take per day?',
      answer: 'We recommend 1–3 sachets per day, depending on your activity level and environment. Athletes or those in hot climates may need more frequent hydration.'
    },
    {
      emoji: '♻️',
      question: 'Are the sachets recyclable or eco-friendly?',
      answer: 'Yes — our packaging is made from moisture-resistant recyclable materials, and we\'re actively developing a biodegradable line to reduce waste even further.'
    },
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      if (!handle) return;
      
      try {
        const productData = await getProductByHandle(handle);
        setProduct(productData);
        
        if (productData?.variants?.edges?.length > 0) {
          const firstVariant = productData.variants.edges[0].node;
          setSelectedVariant(firstVariant);
          
          const initialOptions: Record<string, string> = {};
          firstVariant.selectedOptions.forEach((option: any) => {
            initialOptions[option.name] = option.value;
          });
          setSelectedOptions(initialOptions);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [handle]);

  const handleOptionChange = (optionName: string, value: string) => {
    const newOptions = { ...selectedOptions, [optionName]: value };
    setSelectedOptions(newOptions);

    const variant = product.variants.edges.find((v: any) =>
      v.node.selectedOptions.every((opt: any) => newOptions[opt.name] === opt.value)
    );

    if (variant) {
      setSelectedVariant(variant.node);
    }
  };

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    const productWrapper = {
      node: product
    };

    const cartItem = {
      product: productWrapper,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success('Added to cart!', {
      description: product.title,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Product not found</h1>
          <Link to="/shop">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shop
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const image = product.images.edges[0]?.node;

  return (
    <div className="min-h-screen">
      {/* Hero Video Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={productVid} type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />

        {/* Content */}
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl">
              <h1 className="text-display text-6xl md:text-8xl lg:text-9xl text-white mb-6 uppercase font-black leading-none">
                {product.title}
              </h1>
              
              {product.description && (
                <div className="max-w-xl ml-auto">
                  <p className="text-white text-lg md:text-xl mb-8 text-right">
                    {product.description}
                  </p>
                  <div className="flex justify-end">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="text-lg px-8"
                      onClick={() => {
                        const detailsSection = document.getElementById('product-details');
                        detailsSection?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <Link to="/shop" className="inline-flex items-center text-sm mb-8 hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Shop
        </Link>

        {/* Product Details */}
        <div id="product-details" className="grid md:grid-cols-2 gap-12 mb-24">
          <div className="aspect-square bg-secondary/20 rounded-lg overflow-hidden">
            {image && (
              <img
                src={image.url}
                alt={image.altText || product.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div>
            <h1 className="text-display text-4xl md:text-5xl lg:text-6xl mb-4">
              {product.title}
            </h1>
            
            <p className="text-3xl font-bold mb-6">
              {formatPrice(parseFloat(selectedVariant?.price.amount || '0'))}
            </p>

            {product.description && (
              <p className="text-muted-foreground mb-8">
                {product.description}
              </p>
            )}

            {product.options && product.options.length > 0 && (
              <div className="space-y-4 mb-8">
                {product.options.map((option: any) => (
                  <div key={option.name}>
                    <label className="block text-sm font-medium mb-2">
                      {option.name}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((value: string) => (
                        <Button
                          key={value}
                          variant={selectedOptions[option.name] === value ? "default" : "outline"}
                          onClick={() => handleOptionChange(option.name, value)}
                        >
                          {value}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-4">
              <Button
                size="lg"
                className="w-full md:w-auto"
                onClick={handleAddToCart}
                disabled={!selectedVariant?.availableForSale}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {selectedVariant?.availableForSale ? 'Add to Cart' : 'Out of Stock'}
              </Button>

              {/* Subscribe & Save Section */}
              <div className="p-4 bg-accent/10 border-2 border-accent/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Package className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground mb-1">Subscribe & Save up to 20%</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Get consistent hydration delivered monthly with free shipping across Spain.
                    </p>
                    <Button variant="outline" size="sm" asChild className="border-accent hover:bg-accent hover:text-accent-foreground">
                      <Link to="/subscribe">View Subscription Plans</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nutrition & Ingredients Section */}
        <section className="mb-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div>
              <h2 className="text-display text-4xl md:text-5xl lg:text-6xl mb-4">
                Nutrition &
              </h2>
              <h2 className="text-display text-4xl md:text-5xl lg:text-6xl mb-6" style={{ color: '#eb8d17' }}>
                Ingredients
              </h2>
              
              <p className="text-muted-foreground mb-8">
                Each sachet contains a powerful blend of essential electrolytes, vitamins, and minerals designed to keep you hydrated and energized throughout the day.
              </p>

              {/* Icons Grid */}
              <div className="grid grid-cols-3 gap-6">
                {nutritionBenefits.map((benefit, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-secondary/20 rounded-full flex items-center justify-center">
                      <benefit.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xs font-bold mb-1 uppercase">{benefit.label}</h3>
                    <p className="text-xs text-muted-foreground">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Nutrition Image */}
            <div className="aspect-square bg-secondary/20 rounded-lg overflow-hidden">
              {image && (
                <img
                  src={image.url}
                  alt="Nutrition Facts"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        </section>

        {/* Video Gallery Section */}
        <VideoGallery />

        {/* FAQ Section */}
        <section className="mt-24 py-16 bg-primary rounded-2xl">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-display text-5xl md:text-7xl text-primary-foreground mb-2">
                FREQUENTLY ASKED
              </h2>
              <div className="inline-block" style={{ backgroundColor: '#f5c112' }}>
                <h2 className="text-display text-5xl md:text-7xl px-6 py-2" style={{ color: '#0c2d64' }}>
                  QUESTIONS
                </h2>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl border-0 overflow-hidden"
                  >
                    <AccordionTrigger className="px-6 py-6 text-left text-lg md:text-xl font-medium text-primary-foreground hover:no-underline hover:bg-primary-foreground/5 transition-colors">
                      <span className="mr-3">{faq.emoji}</span>
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 text-primary-foreground/90">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Product;
