import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2, Truck } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useCurrencyStore } from "@/stores/currencyStore";
import { useUIStore } from "@/stores/uiStore";
import { toast } from "sonner";
import { getProducts, type ShopifyProduct } from "@/lib/shopify";
import { Link } from "react-router-dom";
import confetti from "canvas-confetti";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [recommendations, setRecommendations] = useState<ShopifyProduct[]>([]);
  const [loadingRecs, setLoadingRecs] = useState(false);
  const hasTriggeredConfetti = useRef(false);
  const setCartOpen = useUIStore(state => state.setCartOpen);
  const { formatPrice, convertPrice } = useCurrencyStore();
  
  const { 
    items, 
    isLoading, 
    addItem,
    updateQuantity, 
    removeItem, 
    createCheckout 
  } = useCartStore();

  // Update UI store when cart opens/closes
  useEffect(() => {
    setCartOpen(isOpen);
  }, [isOpen, setCartOpen]);
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);
  const totalPriceConverted = convertPrice(totalPrice);
  
  const FREE_SHIPPING_THRESHOLD = 100;
  const freeShippingConverted = convertPrice(FREE_SHIPPING_THRESHOLD);
  const progressPercentage = Math.min((totalPriceConverted / freeShippingConverted) * 100, 100);
  const remainingForFreeShipping = Math.max(freeShippingConverted - totalPriceConverted, 0);

  // Trigger confetti when free shipping threshold is reached
  useEffect(() => {
    if (totalPriceConverted >= freeShippingConverted && !hasTriggeredConfetti.current && isOpen) {
      hasTriggeredConfetti.current = true;
      
      // Trigger confetti animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE']
      });
      
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#8B5CF6', '#A78BFA', '#C4B5FD']
        });
      }, 200);
      
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#8B5CF6', '#A78BFA', '#C4B5FD']
        });
      }, 400);
    }
    
    // Reset confetti trigger when total drops below threshold
    if (totalPriceConverted < freeShippingConverted) {
      hasTriggeredConfetti.current = false;
    }
  }, [totalPriceConverted, freeShippingConverted, isOpen]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!isOpen) return;
      
      setLoadingRecs(true);
      try {
        const products = await getProducts(4);
        // Filter out products already in cart
        const cartProductIds = items.map(item => item.product.node.id);
        const filtered = products.filter(p => !cartProductIds.includes(p.node.id));
        setRecommendations(filtered);
      } catch (error) {
        console.error('Failed to load recommendations:', error);
      } finally {
        setLoadingRecs(false);
      }
    };

    fetchRecommendations();
  }, [isOpen, items]);

  const handleAddRecommendation = (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;

    const cartItem = {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || []
    };

    addItem(cartItem);
    toast.success(`${product.node.title} added to cart`);
  };

  const handleCheckout = async () => {
    try {
      await createCheckout();
      const checkoutUrl = useCartStore.getState().checkoutUrl;
      if (checkoutUrl) {
        window.open(checkoutUrl, '_blank');
        setIsOpen(false);
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      toast.error('Failed to create checkout. Please try again.');
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-accent">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? "Your cart is empty" : `${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`}
          </SheetDescription>
        </SheetHeader>
        
        {/* Free Shipping Progress Bar */}
        {items.length > 0 && (
          <div className="flex-shrink-0 pt-4 pb-2 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Truck className={`h-4 w-4 ${remainingForFreeShipping === 0 ? 'text-purple-500 animate-bounce' : 'text-purple-500'}`} />
                <span className="font-medium">
                  {remainingForFreeShipping > 0 
                    ? `Add ${formatPrice(remainingForFreeShipping)} for free shipping!`
                    : 'You qualify for free shipping! 🎉'
                  }
                </span>
              </div>
            </div>
            <Progress value={progressPercentage} className="h-2 [&>div]:bg-purple-500" />
          </div>
        )}
        
        <div className="flex flex-col flex-1 pt-4 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Your cart is empty</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex gap-4 p-2">
                      <div className="w-16 h-16 bg-secondary/20 rounded-md overflow-hidden flex-shrink-0">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img
                            src={item.product.node.images.edges[0].node.url}
                            alt={item.product.node.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{item.product.node.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.selectedOptions.map(option => option.value).join(' • ')}
                        </p>
                        <p className="font-semibold">
                          {formatPrice(parseFloat(item.price.amount))}
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => removeItem(item.variantId)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                        
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Product Recommendations */}
              {recommendations.length > 0 && (
                <div className="pt-4 mt-4 border-t">
                  <h3 className="text-sm font-semibold mb-3">You might also like</h3>
                  <div className="space-y-3">
                    {recommendations.slice(0, 3).map((product) => (
                      <div key={product.node.id} className="flex gap-3 p-2 rounded-lg hover:bg-secondary/20 transition-colors">
                        <div className="w-16 h-16 bg-secondary/20 rounded-md overflow-hidden flex-shrink-0">
                          {product.node.images?.edges?.[0]?.node && (
                            <img
                              src={product.node.images.edges[0].node.url}
                              alt={product.node.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link 
                            to={`/product/${product.node.handle}`}
                            className="font-medium text-sm hover:underline line-clamp-2"
                            onClick={() => setIsOpen(false)}
                          >
                            {product.node.title}
                          </Link>
                          <p className="text-sm font-semibold text-primary mt-1">
                            {formatPrice(parseFloat(product.node.priceRange.minVariantPrice.amount))}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAddRecommendation(product)}
                          className="flex-shrink-0"
                        >
                          Add
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex-shrink-0 space-y-4 pt-4 border-t bg-background">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-xl font-bold">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                
                <Button 
                  onClick={handleCheckout}
                  className="w-full" 
                  size="lg"
                  disabled={items.length === 0 || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating Checkout...
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Checkout
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
