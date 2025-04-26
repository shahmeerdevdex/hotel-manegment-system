
import { useBookingWizard } from '@/contexts/BookingWizardContext';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { useBookingSystem } from '@/hooks/useBookingSystem';
import { addDays } from 'date-fns';

const RoomSelection = () => {
  const { rooms } = useBookingSystem();
  const { bookingData, updateBookingData, setStep } = useBookingWizard();

  const handleContinue = () => {
    if (bookingData.room && bookingData.checkIn && bookingData.checkOut) {
      setStep(2);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Select Dates</h3>
          <Calendar
            mode="range"
            selected={{
              from: bookingData.checkIn ? new Date(bookingData.checkIn) : undefined,
              to: bookingData.checkOut ? new Date(bookingData.checkOut) : undefined
            }}
            onSelect={(range) => {
              if (range?.from) {
                updateBookingData({
                  checkIn: range.from.toISOString(),
                  checkOut: range.to ? range.to.toISOString() : addDays(range.from, 1).toISOString()
                });
              }
            }}
            disabled={(date) => date < new Date()}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Select Room</h3>
          <div className="space-y-4">
            {rooms.map((room) => (
              <div
                key={room.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  bookingData.room?.id === room.id
                    ? 'border-primary bg-primary/5'
                    : 'hover:border-gray-300'
                }`}
                onClick={() => updateBookingData({ room })}
              >
                <h4 className="font-medium">{room.type} Room</h4>
                <p className="text-sm text-gray-500">Room {room.number}</p>
                <p className="text-sm text-gray-500">Up to {room.maxGuests} guests</p>
                <p className="font-medium mt-2">${room.price}/night</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleContinue}
          disabled={!bookingData.room || !bookingData.checkIn || !bookingData.checkOut}
        >
          Continue to Guest Details
        </Button>
      </div>
    </div>
  );
};

export default RoomSelection;
