
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AmenitiesSection from '../components/AmenitiesSection';
import RoomsSection from '../components/RoomsSection';
import RewardsSection from '../components/RewardsSection';
import WhyBookSection from '../components/WhyBookSection';
import TestimonialsSection from '../components/TestimonialsSection';
import NewsletterSection from '../components/NewsletterSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-hotel-beige">
      <Navbar />
      <main>
        <HeroSection />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <AmenitiesSection />
          <RoomsSection />
          <RewardsSection />
          <WhyBookSection />
          <TestimonialsSection />
          <NewsletterSection />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
