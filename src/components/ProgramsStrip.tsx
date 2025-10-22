import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Users, Briefcase, GraduationCap, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const programs = [
  {
    id: 'athletes',
    title: 'For Athletes',
    description: 'Athletes who push limits and need optimal hydration for peak performance.',
    icon: Trophy,
    blogSlug: 'electrolytes-for-athletes',
  },
  {
    id: 'professionals',
    title: 'For Professionals',
    description: 'Beat the midday crash and stay focused throughout your busy workday.',
    icon: Briefcase,
    blogSlug: 'electrolytes-for-professionals',
  },
  {
    id: 'travelers',
    title: 'For Travelers',
    description: 'Stay hydrated in the heat wherever your adventures take you.',
    icon: GraduationCap,
    blogSlug: 'electrolytes-for-travellers',
  },
  {
    id: 'wellness',
    title: 'For Wellness',
    description: 'Everyday people who care about wellness and clean ingredients.',
    icon: Users,
    blogSlug: 'electrolytes-for-wellness',
  },
];

export function ProgramsStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          y: 80,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.15,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <h2 className="text-display text-4xl md:text-6xl lg:text-7xl text-center mb-4">Hydration for</h2>
        <h2 className="text-display text-4xl md:text-6xl lg:text-7xl text-center mb-12">Every Moment</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <div
              key={program.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-card border-2 border-border rounded-2xl p-8 hover:scale-105 hover:border-accent transition-all duration-300"
            >
              <program.icon className="w-12 h-12 mb-4 text-accent" />
              <h3 className="text-display text-2xl mb-3">{program.title}</h3>
              <p className="text-muted-foreground mb-6 text-sm">{program.description}</p>
              <Button variant="outline" size="sm" asChild>
                <Link to={`/blog/${program.blogSlug}`}>
                  Learn more
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
