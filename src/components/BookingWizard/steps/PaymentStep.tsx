
import { useBookingWizard } from '@/contexts/BookingWizardContext';
import { Button } from '@/components/ui/button';
import { useBookingSystem } from '@/hooks/useBookingSystem';
import { differenceInDays } from 'date-fns';

interface PaymentStepProps {
  onSuccess: () => void;
}

const PaymentStep = ({ onSuccess }: PaymentStepProps) => {
  const { bookingData, setStep } = useBookingWizard();
  const { addBooking, updateRoomStatus } = useBookingSystem();

  const calculateTotal = () => {
    if (!bookingData.room || !bookingData.checkIn || !bookingData.checkOut) return 0;
    
    const nightsCount = differenceInDays(
      new Date(bookingData.checkOut),
      new Date(bookingData.checkIn)
    );
    
    let total = bookingData.room.price * nightsCount;
    
    // Add extras
    if (bookingData.extras?.airportPickup) total += 50;
    if (bookingData.extras?.breakfast) total += 15 * (bookingData.guestCount || 1);
    if (bookingData.extras?.latecheckout) total += 30;
    
    return total;
  };

  const handleBack = () => setStep(2);

  const handleConfirm = async () => {
    if (!bookingData.room || !bookingData.checkIn || !bookingData.checkOut) return;

    const bookingId = `BK${Date.now().toString().slice(-8)}`;
    
    const booking = {
      id: bookingId,
      roomId: bookingData.room.id,
      roomNumber: bookingData.room.number,
      customerName: bookingData.customerName || '',
      email: bookingData.email || '',
      phone: bookingData.phone || '',
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      totalNights: differenceInDays(
        new Date(bookingData.checkOut),
        new Date(bookingData.checkIn)
      ),
      totalAmount: calculateTotal(),
      status: 'confirmed' as const, // Explicitly specifying the status as a literal type
      createdAt: new Date().toISOString()
    };

    await addBooking(booking);
    await updateRoomStatus(bookingData.room.id, 'reserved');
    onSuccess();
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium mb-4">Booking Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Room Type:</span>
            <span>{bookingData.room?.type} Room</span>
          </div>
          <div className="flex justify-between">
            <span>Room Number:</span>
            <span>{bookingData.room?.number}</span>
          </div>
          <div className="flex justify-between">
            <span>Check-in:</span>
            <span>{new Date(bookingData.checkIn || '').toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Check-out:</span>
            <span>{new Date(bookingData.checkOut || '').toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Guests:</span>
            <span>{bookingData.guestCount}</span>
          </div>
          {Object.entries(bookingData.extras || {}).map(([key, value]) => 
            value && (
              <div key={key} className="flex justify-between text-sm">
                <span>{key === 'airportPickup' ? 'Airport Pickup' : 
                       key === 'breakfast' ? 'Daily Breakfast' : 'Late Checkout'}</span>
                <span>{key === 'airportPickup' ? '$50' :
                       key === 'breakfast' ? `$${15 * (bookingData.guestCount || 1)}` : '$30'}</span>
              </div>
            )
          )}
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-medium">
              <span>Total Amount:</span>
              <span>${calculateTotal()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handleBack}>
          Back
        </Button>
        <Button onClick={handleConfirm}>
          Confirm Booking
        </Button>
      </div>
    </div>
  );
};

export default PaymentStep;
