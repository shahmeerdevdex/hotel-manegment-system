
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Define types
export interface Room {
  id: string;
  number: string;
  type: string;
  price: number;
  maxGuests: number;
  description: string;
  image: string;
  discount: number;
  status: 'available' | 'reserved';
  features?: string[];
}

export interface Booking {
  id: string;
  roomId: string;
  roomNumber: string;
  customerName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  totalNights: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

interface BookingContextType {
  rooms: Room[];
  bookings: Booking[];
  addRoom: (room: Room) => void;
  updateRoom: (id: string, room: Partial<Room>) => void;
  updateRoomStatus: (id: string, status: 'available' | 'reserved') => void;
  deleteRoom: (id: string) => void;
  addBooking: (booking: Booking) => void;
  cancelBooking: (id: string) => void;
}

// Create context
const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Sample initial data
const sampleRooms: Room[] = [
  {
    id: '1',
    number: '101',
    type: 'Deluxe',
    price: 299,
    maxGuests: 2,
    description: 'Spacious room with king-size bed, city views, and elegant amenities.',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    discount: 0,
    status: 'available',
    features: ['King Bed', 'City View', 'Free Wi-Fi', 'Minibar']
  },
  {
    id: '2',
    number: '201',
    type: 'Executive',
    price: 459,
    maxGuests: 2,
    description: 'Luxury suite with separate living area, premium bedding, and panoramic views.',
    image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    discount: 10,
    status: 'available',
    features: ['King Bed', 'Panoramic View', 'Lounge Area', 'Premium Amenities']
  },
  {
    id: '3',
    number: '303',
    type: 'Standard',
    price: 199,
    maxGuests: 2,
    description: 'Comfortable room with stunning views and modern amenities.',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    discount: 0,
    status: 'available',
    features: ['Queen Bed', 'Mountain View', 'Workspace', 'Room Service']
  },
  {
    id: '4',
    number: '501',
    type: 'Presidential',
    price: 899,
    maxGuests: 4,
    description: 'Our finest suite with spacious living areas and personalized service.',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    discount: 0,
    status: 'reserved',
    features: ['King Bed', 'Multiple Rooms', 'Private Terrace', 'Butler Service']
  }
];

const sampleBookings: Booking[] = [
  {
    id: 'BK12345678',
    roomId: '4',
    roomNumber: '501',
    customerName: 'John Smith',
    email: 'john@example.com',
    phone: '+1-234-567-8901',
    checkIn: '2025-05-10',
    checkOut: '2025-05-15',
    totalNights: 5,
    totalAmount: 4495,
    status: 'confirmed',
    createdAt: '2025-04-20T10:30:00Z'
  }
];

// Provider component
export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [rooms, setRooms] = useState<Room[]>(() => {
    const savedRooms = localStorage.getItem('hotel_rooms');
    return savedRooms ? JSON.parse(savedRooms) : sampleRooms;
  });
  
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const savedBookings = localStorage.getItem('hotel_bookings');
    return savedBookings ? JSON.parse(savedBookings) : sampleBookings;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('hotel_rooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem('hotel_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const addRoom = (room: Room) => {
    setRooms([...rooms, room]);
  };

  const updateRoom = (id: string, updatedRoom: Partial<Room>) => {
    setRooms(rooms.map(room => room.id === id ? { ...room, ...updatedRoom } : room));
  };

  const updateRoomStatus = (id: string, status: 'available' | 'reserved') => {
    setRooms(rooms.map(room => room.id === id ? { ...room, status } : room));
  };

  const deleteRoom = (id: string) => {
    // Check if room has associated bookings
    const hasBookings = bookings.some(booking => booking.roomId === id);
    if (hasBookings) {
      // If room has bookings, don't delete it but update its status
      setRooms(rooms.map(room => room.id === id ? { ...room, status: 'reserved' } : room));
    } else {
      setRooms(rooms.filter(room => room.id !== id));
    }
  };

  const addBooking = (booking: Booking) => {
    setBookings([...bookings, booking]);
  };

  const cancelBooking = (id: string) => {
    // Update booking status
    setBookings(bookings.map(booking => {
      if (booking.id === id) {
        // Find the room associated with this booking
        const room = rooms.find(r => r.id === booking.roomId);
        if (room) {
          // Make the room available again
          updateRoomStatus(room.id, 'available');
        }
        return { ...booking, status: 'cancelled' };
      }
      return booking;
    }));
  };

  return (
    <BookingContext.Provider value={{ 
      rooms, 
      bookings, 
      addRoom, 
      updateRoom,
      updateRoomStatus,
      deleteRoom,
      addBooking,
      cancelBooking
    }}>
      {children}
    </BookingContext.Provider>
  );
};

// Custom hook
export const useBookingSystem = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBookingSystem must be used within a BookingProvider');
  }
  return context;
};
