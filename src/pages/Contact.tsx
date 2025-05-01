
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "We've received your message and will get back to you shortly.",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-hotel-beige">
      <Navbar />
      <main className="pt-32 pb-16">
        {/* Hero Section */}
        <section className="relative py-20 bg-hotel-brown text-white">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
              <p className="text-lg opacity-90 mb-8">
                We're here to answer any questions you may have
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Contact Info + Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                <h2 className="text-2xl font-bold text-hotel-brown mb-6">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange} 
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input 
                      id="subject" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange} 
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      name="message"
                      value={formData.message}
                      onChange={handleChange} 
                      className="min-h-[150px]"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-hotel-accent hover:bg-hotel-brown text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </motion.div>
              
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-10"
              >
                <div>
                  <h2 className="text-2xl font-bold text-hotel-brown mb-6">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <MapPin className="w-6 h-6 text-hotel-accent mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-hotel-brown">Address</h4>
                        <p className="text-gray-600">123 Luxury Avenue, Beverly Hills</p>
                        <p className="text-gray-600">CA 90210, United States</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="w-6 h-6 text-hotel-accent mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-hotel-brown">Phone</h4>
                        <p className="text-gray-600">+1 (555) 123-4567</p>
                        <p className="text-gray-600">+1 (800) 987-6543 (Toll-free)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Mail className="w-6 h-6 text-hotel-accent mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-hotel-brown">Email</h4>
                        <p className="text-gray-600">info@rebstockhotel.com</p>
                        <p className="text-gray-600">reservations@rebstockhotel.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Clock className="w-6 h-6 text-hotel-accent mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-hotel-brown">Hours</h4>
                        <p className="text-gray-600">Front Desk: Open 24/7</p>
                        <p className="text-gray-600">Reservations: 8:00 AM - 10:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-hotel-brown rounded-xl text-white">
                  <h3 className="text-xl font-bold mb-3">Need urgent assistance?</h3>
                  <p className="mb-4 text-white/80">
                    Our guest relations team is available 24/7 to assist with urgent matters.
                  </p>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    <span className="font-medium">+1 (555) 999-8888</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-hotel-brown mb-4">Find Us</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Located in the heart of Beverly Hills, our hotel is conveniently situated near major attractions
              </p>
            </div>
            
            <div className="h-[400px] rounded-xl overflow-hidden shadow-lg">
              {/* Replace with actual map implementation if needed */}
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                <p>Interactive Map Would Be Embedded Here</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
