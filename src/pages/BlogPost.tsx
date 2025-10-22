import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const blogContent: Record<string, {
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  content: JSX.Element;
}> = {
  'electrolytes-for-athletes': {
    title: 'Electrolytes for Athletes: The Secret to Better Performance & Recovery',
    category: 'Athletes',
    date: '2025-01-15',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=600&fit=crop',
    content: (
      <>
        <h2 className="text-3xl font-bold mb-4">Introduction</h2>
        <p className="mb-6">For athletes pushing their limits, hydration isn't just about water. Every sweat droplet carries hidden losses: water and essential minerals known as electrolytes. When we talk about training, competition, or recovery, the right balance of fluids and electrolytes can make the difference between peak performance and unnecessary fatigue.</p>

        <h2 className="text-3xl font-bold mb-4">What Are Electrolytes and Why Do They Matter to Athletes</h2>
        <p className="mb-6">Electrolytes—minerals like sodium, potassium, magnesium, and chloride—help regulate fluid balance, nerve impulses, and muscle contractions. When you sweat during intense or prolonged exercise, you're not only losing water but also these minerals. Multiple studies show that even a 1–2% drop in body mass through sweat (typical in endurance events) can raise heart rate, impair aerobic performance, and increase thermal strain.</p>

        <h2 className="text-3xl font-bold mb-4">Performance Impact & Research</h2>
        <p className="mb-6">Research confirms that athletes who plan hydration and electrolyte replacement perform better. For example, a study found that athletes with individualized hydration plans improved anaerobic power and attention. Another study reviewing fluid and electrolyte needs concluded that without replacing sodium and water losses, aerobic performance degrades significantly.</p>
        <p className="mb-6">It's not just about avoiding dehydration; it's about optimizing your state so you can go the extra mile, recover faster, and stay healthy. A beverage with proper electrolyte content outperformed water alone in one study by improving the beverage hydration index (BHI) and decreasing urine volume, meaning better hydration status.</p>

        <h2 className="text-3xl font-bold mb-4">When & How to Use Electrolytes in Training</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Pre-workout:</strong> Hydrate ~2h before exercise with a drink that includes electrolytes, especially if you anticipate heavy sweat.</li>
          <li><strong>During training/competition:</strong> For sessions longer than 60 mins (especially in heat), drink regularly and include electrolytes. Water alone may not suffice.</li>
          <li><strong>Post-exercise:</strong> Use an electrolyte beverage to restore fluid and mineral balance quickly, supporting recovery and muscle function.</li>
        </ul>

        <h2 className="text-3xl font-bold mb-4">Practical Integration with Hydra+</h2>
        <p className="mb-6">Hydra+ sachets are designed for portability and efficacy: mix one sachet in ~500–600 ml water, sip before, during or after your session. Because they're sugar-free and crafted for performance, they fit clean-label preferences and are perfect for gym bags or event kits.</p>

        <h2 className="text-3xl font-bold mb-4">Conclusion</h2>
        <p className="mb-6">For athletes, hydration is more than thirst—it's strategy. With the right electrolyte support you not only maintain performance, but you also support recovery and resilience. Train hard, hydrate smart, and let minerals work for you.</p>
      </>
    )
  },
  'electrolytes-for-professionals': {
    title: 'Electrolytes for Business Professionals: Focus, Energy & Hydration at Work',
    category: 'Professionals',
    date: '2025-01-10',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=600&fit=crop',
    content: (
      <>
        <h2 className="text-3xl font-bold mb-4">Introduction</h2>
        <p className="mb-6">Your day might not involve sprints or squats, but it still demands performance: back-to-back meetings, travel, deadlines, screen time. One often-overlooked factor? Hydration. Even slight dehydration or electrolyte imbalance can reduce productivity, impair mood, and slow reaction times.</p>

        <h2 className="text-3xl font-bold mb-4">The Hidden Productivity Drain: Dehydration & Electrolytes</h2>
        <p className="mb-6">Research indicates that dehydration—even mild—can reduce cognitive performance and attention. A review from the University of Stirling on electrolyte-enhanced drinks found that while most moderate activity requires only water, there are scenario-specific needs where electrolytes make sense (e.g., busy professionals, travel, heat, dehydration from caffeine).</p>
        <p className="mb-6">Another article about hydration in the workplace noted that electrolyte drinks help prevent fatigue and muscle cramps in high-heat or high-sweat jobs.</p>

        <h2 className="text-3xl font-bold mb-4">How Electrolytes Help in the Professional Day</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Sustain focus & clarity:</strong> Balancing electrolytes supports nerve transmission and brain function, so you stay sharp.</li>
          <li><strong>Combat dehydration from environment:</strong> Air-conditioned offices, flights, coffee, and screen time all add to your fluid loss.</li>
          <li><strong>Repair midday dip:</strong> Instead of sugary drinks, an electrolyte-based hydration can reduce the crash-and-recover cycle.</li>
        </ul>

        <h2 className="text-3xl font-bold mb-4">Smart Habits for Professionals</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Keep a sachet at your desk. Mix with water when you feel the afternoon slump approaching.</li>
          <li>Instead of multiple coffees or energy drinks, hydrate first. Caffeine stimulates but doesn't replace lost electrolytes.</li>
          <li>If travelling, mix a sachet when you land or before a long meeting to re-balance your system and avoid fatigue.</li>
          <li>Pair hydration with low-glycemic snacks to maintain stable energy levels.</li>
        </ul>

        <h2 className="text-3xl font-bold mb-4">Why Hydra+ Works for Professionals</h2>
        <p className="mb-6">Hydra+ offers a sugar-free, portable sachet you can keep in your laptop bag. No bulky sports drink bottles. The clean Mediterranean flavour options are light and refreshing—rather than heavy or overly sweet. Manufactured in the EU with compliance built in, it's a smart wellness choice for the busy professional.</p>

        <h2 className="text-3xl font-bold mb-4">Conclusion</h2>
        <p className="mb-6">For business professionals, hydration isn't just a wellness perk—it's a performance tool. Electrolytes are no longer just for athlete gyms: they're for boardrooms, airports, and desks. Stay sharp, stay hydrated—with purpose.</p>
      </>
    )
  },
  'electrolytes-for-travellers': {
    title: 'Electrolytes for Travellers: Beat Jet Lag, Heat & Dehydration Anywhere',
    category: 'Travellers',
    date: '2025-01-05',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=600&fit=crop',
    content: (
      <>
        <h2 className="text-3xl font-bold mb-4">Introduction</h2>
        <p className="mb-6">Whether you're boarding a red-eye or stepping off a chartered taxi under a scorching sun, travel taxes your body's systems. Dehydration and electrolyte imbalance are often part of the experience—but they shouldn't be.</p>

        <h2 className="text-3xl font-bold mb-4">The Science of Travel Hydration</h2>
        <p className="mb-6">Airplane cabins can have less than 20% humidity—which means higher fluid loss through your skin and lungs. Combine that with caffeine, time-zone shifts and movement, and you're at risk of brain fog, fatigue and impaired performance.</p>
        <p className="mb-6">Additionally, sweat and heat—especially in tropical destinations—cause electrolyte losses. One study found that workers in hot environments drinking electrolyte beverages had better hydration markers than those drinking water alone.</p>

        <h2 className="text-3xl font-bold mb-4">Travel Scenarios Where Electrolytes Help</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Long-haul flights:</strong> Take one sachet in water before boarding and one after landing to reset your system.</li>
          <li><strong>Hot climates / beach holidays:</strong> Even light activity under high heat depletes electrolytes faster—help support fluid balance.</li>
          <li><strong>Jet lag & time zone shift:</strong> Hydration matters for cognitive recovery and sleep regulation; losing fluids and electrolytes worsens fatigue.</li>
        </ul>

        <h2 className="text-3xl font-bold mb-4">Practical Travel Plan</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Pre-boarding:</strong> Mix a sachet in 500 ml water.</li>
          <li><strong>On arrival:</strong> Sip another near first hour of activity or meeting.</li>
          <li><strong>Under the sun:</strong> Keep sachets in your day bag—mix in bottled water from local sources.</li>
          <li><strong>Avoid sugary soft-drinks or heavy alcohol:</strong> hydration is better served clean.</li>
        </ul>

        <h2 className="text-3xl font-bold mb-4">Why Hydra+ Is Travel-Friendly</h2>
        <p className="mb-6">The sachet format is lightweight and airport-friendly. No large bottles or bulky packaging. Clean-label ingredients mean no sugar-spiked crash. EU-made and compliance ready means you can trust it in unfamiliar markets. Flavours are light and refreshing—ideal after a flight or for warm climate hydration.</p>

        <h2 className="text-3xl font-bold mb-4">Conclusion</h2>
        <p className="mb-6">Travel doesn't have to drain your energy. With the right hydration mindset and a smart electrolyte sachet like Hydra+, you can stay sharp, cool and balanced—across time-zones and climates.</p>
      </>
    )
  },
  'electrolytes-for-wellness': {
    title: 'Electrolytes for Wellness: Everyday Hydration & Balanced Energy',
    category: 'Wellness',
    date: '2024-12-28',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=600&fit=crop',
    content: (
      <>
        <h2 className="text-3xl font-bold mb-4">Introduction</h2>
        <p className="mb-6">Electrolytes are often painted as athlete-only territory, but in reality they play a role in everyday wellness. From morning routines to light workouts to desk-bound days, supporting fluid-electrolyte balance is a pillar of holistic health.</p>

        <h2 className="text-3xl font-bold mb-4">The Role of Electrolytes in Daily Wellness</h2>
        <p className="mb-6">Sweat, light exercise, even air-conditioned environments cause small electrolyte losses. While water is sufficient in many cases, certain contexts benefit from electrolyte support—especially when mental focus, travel, or climate stress is involved. A review observed that although sports drinks are not needed for all activity, they have value in specific situations.</p>
        <p className="mb-6">Another article explains that electrolytes play a vital role in fluid balance, nerve and muscle function, and overall daily performance—even when you are not training at elite levels.</p>

        <h2 className="text-3xl font-bold mb-4">Wellness Habit Building</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Morning ritual:</strong> Mix a sachet in water before coffee to get ahead of dehydration.</li>
          <li><strong>Workday hydration:</strong> Instead of soda, use an electrolyte sachet for a clean energy boost.</li>
          <li><strong>Light activity / yoga / walks:</strong> Supporting recovery and fluid balance matters even in low-intensity movement.</li>
          <li><strong>Heat or climate stress:</strong> If your environment is hot or you're exposed to air-conditioning, your body loses more fluid and electrolytes than you might think.</li>
        </ul>

        <h2 className="text-3xl font-bold mb-4">The Hydra+ Advantage</h2>
        <p className="mb-6">With flavours like "Citrus Charge", "Berry Boost", "Tropical Surge" and "Arctic Wave", Hydra+ blends everyday wellness with hydration. Sugar-free, science-inspired, and designed for portability—this isn't just sport hydration; it's lifestyle hydration.</p>

        <h2 className="text-3xl font-bold mb-4">Research-driven clarity</h2>
        <p className="mb-6">Hydration knowledge among athletes and wellness-oriented people is still lagging. One study noted significant barriers in hydration behaviour and attitudes. To build better habits, supporting your body with the right hydration moment is smart.</p>

        <h2 className="text-3xl font-bold mb-4">Conclusion</h2>
        <p className="mb-6">Wellness isn't about extremes—it's about consistency. Drinking water is key, but supporting your fluids with electrolytes in the right context gives you an edge in clarity, recovery and vitality.</p>
      </>
    )
  }
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogContent[slug] : null;

  if (!post) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Blog post not found</h1>
          <Link to="/blog">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <Link to="/blog" className="inline-flex items-center text-sm mb-8 hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        {/* Hero Image */}
        <div className="aspect-video rounded-3xl overflow-hidden mb-8">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Post Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <span className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-bold mb-4">
            {post.category}
          </span>
          
          <h1 className="text-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {new Date(post.date).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              {post.readTime}
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="max-w-3xl mx-auto prose prose-lg prose-headings:font-display prose-headings:font-bold prose-p:text-muted-foreground prose-li:text-muted-foreground">
          {post.content}
        </div>

        {/* CTA */}
        <div className="max-w-3xl mx-auto mt-16 p-8 bg-primary rounded-3xl text-center">
          <h3 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to optimize your hydration?
          </h3>
          <p className="text-primary-foreground/90 mb-6">
            Try Hydra+ and experience the difference clean electrolytes make.
          </p>
          <Link to="/shop">
            <Button size="lg" variant="secondary">
              Shop Now
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
