
import { Waves, Utensils, Dumbbell, Bath } from 'lucide-react';

const amenities = [
  {
    icon: Waves,
    title: 'Swimming Pool',
    description: 'Enjoy our luxurious indoor swimming pool'
  },
  {
    icon: Utensils,
    title: 'Room Service',
    description: '24/7 in-room dining service'
  },
  {
    icon: Dumbbell,
    title: 'Fitness Center',
    description: 'State-of-the-art fitness equipment'
  },
  {
    icon: Bath,
    title: 'Spa Center',
    description: 'Relaxing treatments and massages'
  }
];

const AmenitiesSection = () => {
  return (
    <section className="bg-hotel-beige py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-hotel-brown text-center mb-12">
          Hotel Amenities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {amenities.map((amenity, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <amenity.icon className="w-12 h-12 text-hotel-blue mb-4" />
              <h3 className="text-xl font-semibold text-hotel-brown mb-2">
                {amenity.title}
              </h3>
              <p className="text-gray-600">
                {amenity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
