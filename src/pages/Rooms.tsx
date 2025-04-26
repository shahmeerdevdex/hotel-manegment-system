
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useBookingSystem } from '@/hooks/useBookingSystem';
import { Card } from '@/components/ui/card';
import BookingModal from '@/components/BookingModal';

const Rooms = () => {
  const { rooms } = useBookingSystem();
  const [filters, setFilters] = useState({
    type: '',
    maxPrice: '',
    guests: '',
  });
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const filteredRooms = rooms.filter((room) => {
    let matchesFilters = true;
    
    // Only show available rooms
    if (room.status !== 'available') {
      return false;
    }
    
    // Filter by type
    if (filters.type && room.type !== filters.type) {
      matchesFilters = false;
    }
    
    // Filter by price
    if (filters.maxPrice && room.price > parseInt(filters.maxPrice)) {
      matchesFilters = false;
    }
    
    // Filter by guests
    if (filters.guests && room.maxGuests < parseInt(filters.guests)) {
      matchesFilters = false;
    }
    
    return matchesFilters;
  });

  const openBookingModal = (roomId: string) => {
    setSelectedRoom(roomId);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-hotel-darkGray mb-8 text-center">
            Our Rooms & Suites
          </h1>

          {/* Filters */}
          <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
            <h2 className="text-xl font-semibold text-hotel-darkGray mb-4">Filter Rooms</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="type">Room Type</Label>
                <select
                  id="type"
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">All Types</option>
                  <option value="Standard">Standard</option>
                  <option value="Deluxe">Deluxe</option>
                  <option value="Suite">Suite</option>
                  <option value="Executive">Executive</option>
                  <option value="Presidential">Presidential</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="maxPrice">Max Price</Label>
                <Input
                  id="maxPrice"
                  name="maxPrice"
                  type="number"
                  placeholder="Max price per night"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                />
              </div>
              
              <div>
                <Label htmlFor="guests">Number of Guests</Label>
                <Input
                  id="guests"
                  name="guests"
                  type="number"
                  placeholder="Number of guests"
                  min="1"
                  value={filters.guests}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.length > 0 ? (
              filteredRooms.map((room) => (
                <Card key={room.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={room.image}
                      alt={`${room.type} Room`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-hotel-darkGray">
                        {room.type} Room
                      </h3>
                      <div className="text-xs bg-gray-100 px-2 py-1 rounded">
                        Room {room.number}
                      </div>
                    </div>
                    <p className="text-hotel-lightGray text-sm mt-2 mb-4">
                      {room.description || `Comfortable ${room.type.toLowerCase()} room with amenities for up to ${room.maxGuests} guests.`}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        Up to {room.maxGuests} guests
                      </span>
                      {room.discount > 0 && (
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                          {room.discount}% OFF
                        </span>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-hotel-red font-bold">
                        {room.discount > 0 ? (
                          <div>
                            <span className="line-through text-gray-400 text-sm mr-2">
                              ${room.price}
                            </span>
                            ${Math.round(room.price * (1 - room.discount / 100))}
                          </div>
                        ) : (
                          <span>${room.price}</span>
                        )}
                        <span className="text-sm text-hotel-lightGray font-normal"> / night</span>
                      </div>
                      <Button 
                        className="bg-hotel-red hover:bg-red-700" 
                        onClick={() => openBookingModal(room.id)}
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <h3 className="text-xl text-hotel-darkGray mb-2">No rooms matching your criteria</h3>
                <p className="text-hotel-lightGray">
                  Try adjusting your filters to see more options.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      
      {selectedRoom && (
        <BookingModal
          roomId={selectedRoom}
          onClose={() => setSelectedRoom(null)}
        />
      )}
    </div>
  );
};

export default Rooms;
