
import { createContext, useContext, useState, ReactNode } from 'react';
import { Room } from '@/hooks/useBookingSystem';

interface BookingWizardContextType {
  step: number;
  setStep: (step: number) => void;
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  resetBooking: () => void;
}

export interface BookingData {
  room?: Room;
  checkIn?: string;
  checkOut?: string;
  guestCount?: number;
  customerName?: string;
  email?: string;
  phone?: string;
  specialRequests?: string;
  extras?: {
    airportPickup?: boolean;
    breakfast?: boolean;
    latecheckout?: boolean;
  };
}

const initialBookingData: BookingData = {};

const BookingWizardContext = createContext<BookingWizardContextType | undefined>(undefined);

export function BookingWizardProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>(initialBookingData);

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData(prev => ({ ...prev, ...data }));
  };

  const resetBooking = () => {
    setStep(1);
    setBookingData(initialBookingData);
  };

  return (
    <BookingWizardContext.Provider value={{
      step,
      setStep,
      bookingData,
      updateBookingData,
      resetBooking
    }}>
      {children}
    </BookingWizardContext.Provider>
  );
}

export const useBookingWizard = () => {
  const context = useContext(BookingWizardContext);
  if (!context) {
    throw new Error('useBookingWizard must be used within a BookingWizardProvider');
  }
  return context;
};
