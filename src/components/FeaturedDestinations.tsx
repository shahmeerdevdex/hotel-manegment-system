
import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Featured destinations data
const destinations = [
  {
    id: 1,
    name: 'New York',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    properties: 24
  },
  {
    id: 2,
    name: 'Paris',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    properties: 18
  },
  {
    id: 3,
    name: 'Tokyo',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    properties: 12
  },
  {
    id: 4,
    name: 'Dubai',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    properties: 15
  },
  {
    id: 5,
    name: 'London',
    image: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    properties: 20
  },
  {
    id: 6,
    name: 'Rome',
    image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    properties: 16
  },
  {
    id: 7,
    name: 'Bali',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    properties: 10
  }
];

const FeaturedDestinations = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Scroll handling
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-hotel-darkGray animate-fade-in">Featured Destinations</h2>
          <p className="text-hotel-lightGray mt-2 animate-fade-in">Explore our collection of premium hotels in world-class destinations</p>
        </div>
        
        {/* Navigation arrows */}
        <div className="flex space-x-2">
          <button 
            onClick={() => scroll('left')} 
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={() => scroll('right')} 
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Scrollable container */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto pb-8 space-x-6 scrollbar-none"
      >
        {destinations.map((destination) => (
          <div 
            key={destination.id}
            className="flex-shrink-0 w-64 md:w-80 destination-card animate-fade-in"
          >
            <div className="relative rounded-xl overflow-hidden h-80 md:h-96">
              <img 
                src={destination.image} 
                alt={destination.name} 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              
              {/* Text overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 gradient-overlay">
                <h3 className="text-xl font-bold text-white mb-1">{destination.name}</h3>
                <p className="text-sm text-gray-200">{destination.properties} properties</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedDestinations;
