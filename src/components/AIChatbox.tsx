import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AIChatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m here to help you with any questions about HYDRA+ products, subscriptions, or orders. How can I assist you today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // TODO: Replace with actual Lovable AI call when Lovable Cloud is enabled
      // This is a placeholder response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response = getPlaceholderResponse(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again or contact our support team.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getPlaceholderResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('shipping') || lowerInput.includes('delivery')) {
      return 'We offer free shipping across Spain! For international orders, shipping costs are calculated at checkout based on your location.';
    }
    if (lowerInput.includes('subscription') || lowerInput.includes('subscribe')) {
      return 'Our subscription plans let you save up to 20% on every order! You can choose delivery every 2, 4, or 8 weeks. Skip, pause, or cancel anytime with no commitments.';
    }
    if (lowerInput.includes('flavor') || lowerInput.includes('taste')) {
      return 'HYDRA+ comes in several refreshing flavors including Lemon-Lime, Berry Blast, Tropical Punch, and more! All our flavors are sugar-free and naturally flavored.';
    }
    if (lowerInput.includes('ingredient') || lowerInput.includes('what')) {
      return 'HYDRA+ contains essential electrolytes (sodium, potassium, magnesium), B vitamins, and natural flavors. It\'s sugar-free, keto-friendly, and designed for optimal hydration.';
    }
    if (lowerInput.includes('price') || lowerInput.includes('cost')) {
      return 'Our one-time purchase is €19.99 per box (20 sachets). Subscribe and save up to 20% with our subscription plans starting at €17.99!';
    }
    
    return 'Thanks for your question! For detailed information, please visit our FAQ page or contact our support team at support@hydraplus.com. I\'m currently in demo mode - enable Lovable Cloud for full AI capabilities!';
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 transition-all",
          isOpen && "scale-0"
        )}
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-6 right-6 w-[380px] h-[500px] bg-background border border-border rounded-lg shadow-xl z-50 flex flex-col transition-all",
          !isOpen && "scale-0 opacity-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground rounded-t-lg">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            <h3 className="font-semibold">HYDRA+ Support</h3>
          </div>
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex",
                  message.role === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-4 py-2",
                    message.role === 'user'
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg px-4 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce delay-100" />
                    <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isLoading}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};
