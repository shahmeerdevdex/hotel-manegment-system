
import { ShieldCheck, Clock, CreditCard, Smartphone } from 'lucide-react';

const features = [
  {
    icon: <ShieldCheck className="h-8 w-8 text-hotel-accent" />,
    title: 'Best Rate Guarantee',
    description: "Find a lower rate? We'll match it and give you an additional 25% discount."
  },
  {
    icon: <Clock className="h-8 w-8 text-hotel-accent" />,
    title: 'Flexible Cancellation',
    description: 'Plans change. Most rates include free cancellation up to 24 hours before check-in.'
  },
  {
    icon: <Smartphone className="h-8 w-8 text-hotel-accent" />,
    title: 'Mobile Check-In',
    description: 'Skip the front desk and go straight to your room with our mobile app.'
  },
  {
    icon: <CreditCard className="h-8 w-8 text-hotel-accent" />,
    title: 'No Booking Fees',
    description: 'Book directly with us and never pay additional booking fees.'
  }
];

const WhyBookSection = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-hotel-brown mb-3 animate-fade-in">
            Why Book With Us
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 animate-fade-in">
            Experience the advantages of booking directly on our official website
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow animate-fade-in"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold text-hotel-brown mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBookSection;
