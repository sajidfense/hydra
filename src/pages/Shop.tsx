import { useEffect, useState, useRef } from 'react';
import { getProducts, ShopifyProduct } from '@/lib/shopify';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowRight, Droplet, ShoppingBag, Gift } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

type CategoryType = 'all' | 'electrolytes' | 'merchandise' | 'bundles';

interface Category {
  id: CategoryType;
  name: string;
  description: string;
  color: string;
  gradient: string;
  icon: React.ElementType;
  textColor: string;
}

const categories: Category[] = [
  {
    id: 'electrolytes',
    name: 'Electrolytes',
    description: 'Sugar-free hydration drinks',
    color: 'bg-blue-100 dark:bg-blue-950/30',
    gradient: 'from-blue-400 to-cyan-400',
    icon: Droplet,
    textColor: 'text-blue-900 dark:text-blue-100'
  },
  {
    id: 'merchandise',
    name: 'Merchandise',
    description: 'Bottles, apparel & accessories',
    color: 'bg-purple-100 dark:bg-purple-950/30',
    gradient: 'from-purple-400 to-pink-400',
    icon: ShoppingBag,
    textColor: 'text-purple-900 dark:text-purple-100'
  },
  {
    id: 'bundles',
    name: 'Bundles',
    description: 'Value packs & gift sets',
    color: 'bg-amber-100 dark:bg-amber-950/30',
    gradient: 'from-amber-400 to-orange-400',
    icon: Gift,
    textColor: 'text-amber-900 dark:text-amber-100'
  },
];

const Shop = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = (searchParams.get('category') as CategoryType) || 'all';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await getProducts(20);
        setProducts(productData);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filterProducts = (products: ShopifyProduct[], category: CategoryType) => {
    if (category === 'all') return products;
    
    return products.filter(product => {
      const productType = product.node.productType?.toLowerCase() || '';
      const tags = product.node.tags || [];
      const tagsString = Array.isArray(tags) ? tags.join(',').toLowerCase() : String(tags).toLowerCase();
      
      if (category === 'electrolytes') {
        return !productType.includes('bundle') && !productType.includes('apparel') && !productType.includes('accessories');
      }
      if (category === 'merchandise') {
        return productType.includes('apparel') || productType.includes('accessories');
      }
      if (category === 'bundles') {
        return productType.includes('bundle') || tagsString.includes('bundle');
      }
      return false;
    });
  };

  const filteredProducts = filterProducts(products, selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <SEO
        title="Shop Sugar-Free Electrolyte Drinks & Merchandise | Multi-Currency"
        description="Browse HYDRA+ electrolytes, merchandise, and value bundles in EUR, USD, GBP, CAD, or AUD. Sugar-free hydration drinks, apparel, accessories, and gift sets with AI-powered shopping assistance."
        canonical="https://www.hydraplus.com/shop"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Shop HYDRA+ Products",
          "description": "Shop sugar-free electrolyte drinks and lifestyle products",
          "url": "https://www.hydraplus.com/shop"
        }}
      />
      
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <header className="mb-16 text-center animate-fade-in">
          <h1 className="text-display text-5xl md:text-7xl lg:text-8xl mb-4">
            Shop HYDRA+
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover premium hydration and lifestyle products
          </p>
        </header>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                to={`/shop?category=${category.id}`}
                className={`group relative overflow-hidden rounded-3xl ${category.color} p-8 min-h-[320px] flex flex-col justify-between transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-2xl bg-white/50 dark:bg-black/20 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 ${category.textColor}`} />
                  </div>
                  <p className={`text-sm font-medium ${category.textColor} opacity-80 mb-2`}>
                    {category.description}
                  </p>
                  <h2 className={`text-4xl md:text-5xl font-bold ${category.textColor} mb-6`}>
                    {category.name}
                  </h2>
                </div>

                {/* Shop Now Button */}
                <Button 
                  variant="default"
                  className="relative z-10 w-fit group-hover:translate-x-2 transition-transform duration-300"
                >
                  Shop Now
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>

                {/* Decorative Icon */}
                <Icon className={`absolute -bottom-8 -right-8 w-48 h-48 ${category.textColor} opacity-5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`} />
              </Link>
            );
          })}
        </div>

        {/* Products Section */}
        {selectedCategory !== 'all' && (
          <div className="mb-8 flex items-center justify-between animate-fade-in">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                {categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <p className="text-muted-foreground">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setSearchParams({})}
            >
              View All
            </Button>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <TiltCard key={product.node.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface TiltCardProps {
  product: ShopifyProduct;
  index: number;
}

const TiltCard = ({ product, index }: TiltCardProps) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease-out',
    });
  };

  const image = product.node.images.edges[0]?.node;

  return (
    <Link
      ref={cardRef}
      to={`/product/${product.node.handle}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl overflow-hidden hover:shadow-xl animate-fade-in aspect-square"
      style={{ 
        animationDelay: `${index * 50}ms`,
        ...tiltStyle
      }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-secondary/20">
        {image ? (
          <img
            src={image.url}
            alt={image.altText || product.node.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Droplet className="w-16 h-16 text-muted-foreground/20" />
          </div>
        )}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/40 group-hover:from-black/70 transition-all duration-300" />

      {/* Title Overlay */}
      <div className="absolute inset-x-0 top-0 p-6 flex items-start justify-center">
        <h3 className="font-bold text-xl md:text-2xl text-white text-center drop-shadow-lg group-hover:scale-105 transition-transform duration-300">
          {product.node.title}
        </h3>
      </div>

      {/* Hover Arrow */}
      <div className="absolute inset-x-0 bottom-6 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
          <ArrowRight className="w-6 h-6 text-white" />
        </div>
      </div>
    </Link>
  );
};

export default Shop;
