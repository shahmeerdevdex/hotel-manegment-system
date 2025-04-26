
import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useBookingSystem } from '@/hooks/useBookingSystem';

const RoomsSection = () => {
  const { rooms } = useBookingSystem();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % rooms.length);
  };
  
  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + rooms.length) % rooms.length);
  };

  // Filter only available rooms
  const availableRooms = rooms.filter(room => room.status === 'available');
  const displayRooms = availableRooms.length > 0 ? availableRooms.slice(0, 3) : rooms.slice(0, 3);

  return (
    <section className="py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-hotel-darkGray mb-3 animate-fade-in">
            Luxurious Rooms & Suites
          </h2>
          <p className="max-w-2xl mx-auto text-hotel-lightGray animate-fade-in">
            Experience the epitome of comfort and style in our thoughtfully designed accommodations
          </p>
        </div>
        
        <div className="relative animate-fade-in">
          {/* Large screen carousel */}
          <div className="hidden md:flex gap-6">
            {displayRooms.map((room, index) => (
              <div key={room.id} className="flex-1 bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={room.image} 
                    alt={room.type} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold">{room.type}</h3>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 text-sm">4.8</span>
                    </div>
                  </div>
                  <p className="text-hotel-lightGray text-sm mb-4">{room.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.features?.map((feature, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-hotel-red font-bold">
                      ${room.price} <span className="text-sm text-hotel-lightGray font-normal">/ night</span>
                    </div>
                    <Link to="/rooms">
                      <Button className="text-sm font-medium bg-hotel-red hover:bg-red-700">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile carousel */}
          <div className="md:hidden">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="h-64 overflow-hidden">
                <img 
                  src={rooms[activeIndex].image} 
                  alt={rooms[activeIndex].type} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold">{rooms[activeIndex].type}</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 text-sm">4.8</span>
                  </div>
                </div>
                <p className="text-hotel-lightGray text-sm mb-4">{rooms[activeIndex].description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {rooms[activeIndex].features?.map((feature, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-hotel-red font-bold">
                    ${rooms[activeIndex].price} <span className="text-sm text-hotel-lightGray font-normal">/ night</span>
                  </div>
                  <Link to="/rooms">
                    <Button className="text-sm font-medium bg-hotel-red hover:bg-red-700">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Mobile carousel controls */}
            <div className="flex justify-center mt-6 gap-2">
              {rooms.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full ${
                    index === activeIndex ? 'bg-hotel-red' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Navigation arrows - only visible on desktop */}
          <div className="hidden md:block">
            <button 
              className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-5 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-5 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          
          <div className="text-center mt-10">
            <Link to="/rooms">
              <Button className="bg-hotel-red hover:bg-red-700">
                View All Rooms
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomsSection;
