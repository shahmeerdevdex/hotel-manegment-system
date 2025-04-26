
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
        <AmenitiesSection />
        <RoomsSection />
        <RewardsSection />
        <WhyBookSection />
        <TestimonialsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
