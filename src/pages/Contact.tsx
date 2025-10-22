import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Send } from 'lucide-react';
import { FaqSection } from '@/components/FaqSection';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const contactSchema = z.object({
  name: z.string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z.string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  subject: z.string()
    .trim()
    .min(1, { message: "Subject is required" })
    .max(200, { message: "Subject must be less than 200 characters" }),
  message: z.string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(1000, { message: "Message must be less than 1000 characters" })
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Message sent!', {
      description: 'Thank you for reaching out. We\'ll get back to you soon!',
    });
    
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <SEO
        title="Contact HYDRA+ | 24/7 AI Support & Customer Service"
        description="Get instant help with our AI chatbox or contact HYDRA+ for questions, subscription management, or wholesale inquiries. Multi-language support for all your sugar-free electrolyte needs."
        canonical="https://www.hydraplus.com/contact"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact HYDRA+",
          "description": "Contact HYDRA+ customer support with AI-powered assistance",
          "url": "https://www.hydraplus.com/contact"
        }}
      />
      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-display text-5xl md:text-7xl lg:text-8xl mb-6 uppercase font-black">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-4">
            We love to hear from you.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Reach out with comments, questions and feedback. Our lovely team will reply as quickly as we can.
          </p>
        </header>

        <div className="max-w-3xl mx-auto">
          {/* Contact Form */}
          <div className="bg-secondary/10 p-8 md:p-10 rounded-3xl">
            <h2 className="text-display text-3xl md:text-4xl mb-6">Send Us a Message</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your name" 
                          {...field}
                          className="h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder="your.email@example.com" 
                          {...field}
                          className="h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="What's this about?" 
                          {...field}
                          className="h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us what's on your mind..." 
                          {...field}
                          className="min-h-[150px] resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <FaqSection />
    </div>
  );
};

export default Contact;
