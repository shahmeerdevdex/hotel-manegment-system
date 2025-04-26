
import { useState } from 'react';
import { Search, CalendarIcon, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
    <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Content Container */}
      <div className="relative h-full flex flex-col justify-center items-center text-center text-white z-10 px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-shadow animate-fade-in">
          Discover Luxury Everywhere
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl text-shadow animate-fade-in">
          Experience exceptional service and unforgettable stays at our premium hotels and resorts worldwide.
        </p>

        {/* Search Form */}
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden animate-fade-in">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row">
            {/* Destination */}
            <div className="flex-1 flex items-center p-4 border-b md:border-b-0 md:border-r border-gray-200">
              <Search className="text-hotel-lightGray mr-2 h-5 w-5" />
              <div className="flex-1">
                <label htmlFor="destination" className="block text-xs font-medium text-hotel-darkGray">
                  Destination
                </label>
                <Input
                  id="destination"
                  type="text"
                  placeholder="City, Airport, Point of Interest"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full border-none p-0 focus-visible:ring-0 focus:outline-none search-input text-black"
                />
              </div>
            </div>

            {/* Dates */}
            <div className="flex flex-1 divide-x border-b md:border-b-0 md:border-r border-gray-200">
              {/* Check In */}
              <div className="flex-1 flex items-center p-4">
                <CalendarIcon className="text-hotel-lightGray mr-2 h-5 w-5" />
                <div className="flex-1">
                  <label htmlFor="check-in" className="block text-xs font-medium text-hotel-darkGray">
                    Check In
                  </label>
                  <Input
                    id="check-in"
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full border-none p-0 focus-visible:ring-0 focus:outline-none search-input text-black"
                  />
                </div>
              </div>

              {/* Check Out */}
              <div className="flex-1 flex items-center p-4">
                <CalendarIcon className="text-hotel-lightGray mr-2 h-5 w-5" />
                <div className="flex-1">
                  <label htmlFor="check-out" className="block text-xs font-medium text-hotel-darkGray">
                    Check Out
                  </label>
                  <Input
                    id="check-out"
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full border-none p-0 focus-visible:ring-0 focus:outline-none search-input text-black"
                  />
                </div>
              </div>
            </div>

            {/* Guests */}
            <div className="flex-1 flex items-center p-4 border-b md:border-b-0 md:border-r border-gray-200">
              <Users className="text-hotel-lightGray mr-2 h-5 w-5" />
              <div className="flex-1">
                <label htmlFor="guests" className="block text-xs font-medium text-hotel-darkGray">
                  Guests
                </label>
                <select
                  id="guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full bg-transparent border-none p-0 focus:outline-none search-input text-black"
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
                className="w-full bg-hotel-red hover:bg-red-700 text-white py-6"
              >
                Search
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
