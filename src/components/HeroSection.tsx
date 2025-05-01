
import { useState } from 'react';
import { Search, CalendarIcon, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2 Adults, 0 Children');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search for:', { destination, checkIn, checkOut, guests });
  };

  return (
    <section className="relative h-[100vh] w-full overflow-hidden">
      {/* Hero Background with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-20000 transform scale-105 animate-subtle-zoom"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
          animationName: 'subtle-zoom',
          animationDuration: '20s',
          animationIterationCount: 'infinite',
          animationDirection: 'alternate'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30"></div>
      </div>

      {/* Content Container */}
      <div className="relative h-full flex flex-col justify-center items-center text-center text-white z-10 px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-shadow">
            Experience Luxury <br/>
            <span className="text-hotel-accent">Beyond Imagination</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-shadow opacity-90">
            Discover the perfect blend of elegance, comfort, and impeccable service at our award-winning properties worldwide.
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div 
          className="w-full max-w-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row">
              {/* Destination */}
              <div className="flex-1 flex items-center p-5 border-b md:border-b-0 md:border-r border-gray-200">
                <Search className="text-hotel-accent mr-3 h-5 w-5" />
                <div className="flex-1">
                  <label htmlFor="destination" className="block text-xs font-medium text-gray-500">
                    Destination
                  </label>
                  <Input
                    id="destination"
                    type="text"
                    placeholder="City, Airport, Point of Interest"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full border-none p-0 focus-visible:ring-0 focus:outline-none search-input text-black text-lg"
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="flex flex-1 divide-x border-b md:border-b-0 md:border-r border-gray-200">
                {/* Check In */}
                <div className="flex-1 flex items-center p-5">
                  <CalendarIcon className="text-hotel-accent mr-3 h-5 w-5" />
                  <div className="flex-1">
                    <label htmlFor="check-in" className="block text-xs font-medium text-gray-500">
                      Check In
                    </label>
                    <Input
                      id="check-in"
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full border-none p-0 focus-visible:ring-0 focus:outline-none search-input text-black text-lg"
                    />
                  </div>
                </div>

                {/* Check Out */}
                <div className="flex-1 flex items-center p-5">
                  <CalendarIcon className="text-hotel-accent mr-3 h-5 w-5" />
                  <div className="flex-1">
                    <label htmlFor="check-out" className="block text-xs font-medium text-gray-500">
                      Check Out
                    </label>
                    <Input
                      id="check-out"
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full border-none p-0 focus-visible:ring-0 focus:outline-none search-input text-black text-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Guests */}
              <div className="flex-1 flex items-center p-5 border-b md:border-b-0 md:border-r border-gray-200">
                <Users className="text-hotel-accent mr-3 h-5 w-5" />
                <div className="flex-1">
                  <label htmlFor="guests" className="block text-xs font-medium text-gray-500">
                    Guests
                  </label>
                  <select
                    id="guests"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-transparent border-none p-0 focus:outline-none search-input text-black text-lg"
                  >
                    <option>1 Adult, 0 Children</option>
                    <option>2 Adults, 0 Children</option>
                    <option>2 Adults, 1 Child</option>
                    <option>2 Adults, 2 Children</option>
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <div className="p-4 bg-white flex">
                <Button 
                  type="submit" 
                  className="w-full bg-hotel-accent hover:bg-hotel-brown text-white py-6 px-8 text-lg font-medium transition-all duration-300"
                >
                  Search
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
