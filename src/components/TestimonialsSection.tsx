
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Emma Thompson',
    title: 'Business Traveler',
    quote: 'The attention to detail and personalized service made my business trip exceptionally comfortable. The staff went above and beyond to meet my needs.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 2,
    name: 'Michael Johnson',
    title: 'Family Vacation',
    quote: 'Our family vacation was perfect thanks to the amazing amenities and spacious rooms. The kids loved the pool, and we appreciated the thoughtful touches throughout our stay.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 3,
    name: 'Sophia Martinez',
    title: 'Honeymoon Stay',
    quote: 'We couldn\'t have chosen a better place for our honeymoon. The romantic atmosphere and exceptional service created memories we\'ll cherish forever.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-hotel-darkGray mb-3 animate-fade-in">
            What Our Guests Say
          </h2>
          <p className="max-w-2xl mx-auto text-hotel-lightGray animate-fade-in">
            Discover experiences from our valued guests around the world
          </p>
        </div>
        
        <div className="relative animate-fade-in">
          {/* Testimonial Slider */}
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="w-full flex-shrink-0 p-4"
                >
                  <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <p className="text-lg italic text-hotel-darkGray mb-4">
                          "{testimonial.quote}"
                        </p>
                        <div>
                          <h4 className="font-bold text-hotel-darkGray">{testimonial.name}</h4>
                          <p className="text-sm text-hotel-lightGray">{testimonial.title}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <button 
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-3 md:translate-x-0 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors z-10"
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-3 md:translate-x-0 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors z-10"
            onClick={nextTestimonial}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          
          {/* Dots */}
          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full ${
                  index === activeIndex ? 'bg-hotel-red' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
