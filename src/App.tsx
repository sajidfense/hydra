import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { StickyNav } from "@/components/StickyNav";
import { Footer } from "@/components/Footer";
import { Preloader } from "@/components/Preloader";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { AIChatbox } from "@/components/AIChatbox";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Subscribe from "./pages/Subscribe";
import About from "./pages/About";
import Reviews from "./pages/Reviews";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import Stores from "./pages/Stores";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" />
        <Preloader />
      <BrowserRouter>
        <ScrollToTop />
        <AnnouncementBar />
        <StickyNav />
        <AIChatbox />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:handle" element={<Product />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/about" element={<About />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
