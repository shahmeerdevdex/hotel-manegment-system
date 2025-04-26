
import { useState } from 'react';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail('');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-hotel-red/10 p-3 rounded-full">
            <Mail className="h-7 w-7 text-hotel-red" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-hotel-darkGray mb-3 animate-fade-in">
          Subscribe to Our Newsletter
        </h2>
        <p className="max-w-2xl mx-auto text-hotel-lightGray mb-8 animate-fade-in">
          Stay updated with special offers, new property announcements, and travel inspiration
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto animate-fade-in">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            className="bg-hotel-red hover:bg-red-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
        
        <p className="text-xs text-gray-500 mt-4 animate-fade-in">
          By subscribing, you agree to our <a href="#" className="underline">Privacy Policy</a> 
          and consent to receive updates from our hotel.
        </p>
      </div>
    </section>
  );
};

export default NewsletterSection;
