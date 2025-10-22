import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';

const blogPosts = [
  {
    id: 1,
    title: 'Electrolytes for Athletes: The Secret to Better Performance & Recovery',
    excerpt: 'Discover why electrolytes are essential for athletes, how they boost endurance and recovery, and how to integrate them effectively into your training.',
    date: '2025-01-15',
    readTime: '6 min read',
    category: 'Athletes',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
    slug: 'electrolytes-for-athletes'
  },
  {
    id: 2,
    title: 'Electrolytes for Business Professionals: Focus, Energy & Hydration at Work',
    excerpt: 'Learn how electrolytes support productivity, hydration and cognitive clarity for professionals working long hours in offices, travel or high-stress environments.',
    date: '2025-01-10',
    readTime: '5 min read',
    category: 'Professionals',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop',
    slug: 'electrolytes-for-professionals'
  },
  {
    id: 3,
    title: 'Electrolytes for Travellers: Beat Jet Lag, Heat & Dehydration Anywhere',
    excerpt: 'Explore how electrolyte sachets support hydration for travellers, offset the effects of flights, heat and climate, and keep you energised on the move.',
    date: '2025-01-05',
    readTime: '5 min read',
    category: 'Travellers',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop',
    slug: 'electrolytes-for-travellers'
  },
  {
    id: 4,
    title: 'Electrolytes for Wellness: Everyday Hydration & Balanced Energy',
    excerpt: 'Learn why electrolyte hydration matters beyond sport—how it supports everyday wellness, cognitive clarity, skin health and sustained energy.',
    date: '2024-12-28',
    readTime: '5 min read',
    category: 'Wellness',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop',
    slug: 'electrolytes-for-wellness'
  }
];

const categories = ['All', 'Athletes', 'Professionals', 'Travellers', 'Wellness'];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);
  
  const featuredPost = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <SEO
        title="HYDRA+ Blog | Hydration Tips, Wellness & Electrolyte Guides"
        description="Expert tips on hydration, electrolytes, and wellness for athletes, professionals, travellers, and wellness enthusiasts. Learn how to optimize your hydration with HYDRA+ sugar-free drinks."
        canonical="https://www.hydraplus.com/blog"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "HYDRA+ Blog",
          "description": "Hydration tips, wellness guides, and electrolyte education",
          "url": "https://www.hydraplus.com/blog"
        }}
      />
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-display text-6xl md:text-8xl lg:text-9xl mb-6 uppercase font-black">
            Blog
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Stories, tips, and insights on hydration, health, and living your best life
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === selectedCategory ? 'default' : 'outline'}
              className="rounded-full"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-16">
            <div className="relative h-[500px] rounded-3xl overflow-hidden group">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <div className="max-w-3xl">
                  <span className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-bold mb-4">
                    {featuredPost.category}
                  </span>
                  <h2 className="text-display text-4xl md:text-5xl lg:text-6xl text-white mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-white/90 text-lg mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-6 text-white/80 text-sm mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredPost.date).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  <Button size="lg" className="group/btn" asChild>
                    <Link to={`/blog/${featuredPost.slug}`}>
                      Read Article
                      <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Grid */}
        {gridPosts.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridPosts.map((post) => (
              <article
                key={post.id}
                className="group cursor-pointer"
              >
                <div className="aspect-video rounded-2xl overflow-hidden mb-4">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                <div className="space-y-3">
                  <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-bold">
                    {post.category}
                  </span>
                  
                  <h3 className="text-display text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-4 text-muted-foreground text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-primary font-bold hover:underline group/link"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
