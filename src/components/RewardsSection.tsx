
import { CreditCard, Gift, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RewardsSection = () => {
  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-hotel-red/95 to-red-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left side - Image */}
            <div className="relative h-64 md:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1563911302283-d2bc129e7570?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Hotel rewards card" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="absolute top-6 left-6 bg-white bg-opacity-90 py-2 px-4 rounded-md">
                <span className="text-hotel-red font-bold text-sm">EXCLUSIVE OFFER</span>
              </div>
            </div>
            
            {/* Right side - Content */}
            <div className="p-8 md:p-10 text-white flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4">Join Our Rewards Program</h2>
              <p className="text-white/80 mb-6">
                Earn points with every stay and enjoy exclusive benefits designed for our valued members.
                Start earning rewards today with our loyalty program.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Earn Points with Every Stay</h4>
                    <p className="text-sm text-white/70">Convert your stays into valuable points</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Member-Exclusive Rates</h4>
                    <p className="text-sm text-white/70">Access special rates and offers</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Free Room Upgrades</h4>
                    <p className="text-sm text-white/70">Subject to availability upon arrival</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-white text-hotel-red hover:bg-gray-100 min-w-[160px]">
                  Join Now - It's Free
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RewardsSection;
