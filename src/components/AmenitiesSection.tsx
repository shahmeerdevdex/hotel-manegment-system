
import { Waves, Utensils, Dumbbell, Bath } from 'lucide-react';
import { motion } from 'framer-motion';

const amenities = [
  {
    icon: Waves,
    title: 'Swimming Pool',
    description: 'Enjoy our luxurious indoor swimming pool with temperature control'
  },
  {
    icon: Utensils,
    title: 'Room Service',
    description: 'Premium 24/7 in-room dining experience with chef specials'
  },
  {
    icon: Dumbbell,
    title: 'Fitness Center',
    description: 'State-of-the-art equipment with personal trainers available'
  },
  {
    icon: Bath,
    title: 'Spa Center',
    description: 'Relaxing treatments and massages from certified therapists'
  }
];

const AmenitiesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section className="bg-gradient-to-b from-hotel-beige to-white py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-hotel-brown mb-4 relative inline-block">
            Our Amenities
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-hotel-accent mt-2"></span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience luxury and comfort with our premium hotel amenities designed for your perfect stay
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {amenities.map((amenity, index) => (
            <motion.div 
              key={index}
              className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              variants={itemVariants}
            >
              <div className="bg-hotel-accent/10 p-5 rounded-full mb-6">
                <amenity.icon className="w-10 h-10 text-hotel-accent" />
              </div>
              <h3 className="text-xl font-semibold text-hotel-brown mb-3">
                {amenity.title}
              </h3>
              <p className="text-gray-600">
                {amenity.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
