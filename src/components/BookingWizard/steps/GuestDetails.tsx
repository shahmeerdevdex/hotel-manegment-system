
import { useBookingWizard } from '@/contexts/BookingWizardContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

const GuestDetails = () => {
  const { bookingData, updateBookingData, setStep } = useBookingWizard();

  const handleBack = () => setStep(1);
  
  const handleContinue = () => {
    if (bookingData.customerName && bookingData.email && bookingData.phone) {
      setStep(3);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={bookingData.customerName || ''}
            onChange={(e) => updateBookingData({ customerName: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={bookingData.email || ''}
            onChange={(e) => updateBookingData({ email: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={bookingData.phone || ''}
            onChange={(e) => updateBookingData({ phone: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="guests">Number of Guests</Label>
          <Input
            id="guests"
            type="number"
            min={1}
            max={bookingData.room?.maxGuests || 1}
            value={bookingData.guestCount || 1}
            onChange={(e) => updateBookingData({ guestCount: parseInt(e.target.value) })}
            required
          />
        </div>

        <div>
          <Label htmlFor="requests">Special Requests</Label>
          <Textarea
            id="requests"
            value={bookingData.specialRequests || ''}
            onChange={(e) => updateBookingData({ specialRequests: e.target.value })}
            placeholder="Any special requests or requirements?"
          />
        </div>

        <div className="space-y-4">
          <Label>Additional Services</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="airport-pickup"
                checked={bookingData.extras?.airportPickup}
                onCheckedChange={(checked) => 
                  updateBookingData({
                    extras: { ...bookingData.extras, airportPickup: checked as boolean }
                  })
                }
              />
              <label htmlFor="airport-pickup" className="text-sm">
                Airport Pickup Service (+$50)
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="breakfast"
                checked={bookingData.extras?.breakfast}
                onCheckedChange={(checked) => 
                  updateBookingData({
                    extras: { ...bookingData.extras, breakfast: checked as boolean }
                  })
                }
              />
              <label htmlFor="breakfast" className="text-sm">
                Daily Breakfast (+$15 per person)
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="late-checkout"
                checked={bookingData.extras?.latecheckout}
                onCheckedChange={(checked) => 
                  updateBookingData({
                    extras: { ...bookingData.extras, latecheckout: checked as boolean }
                  })
                }
              />
              <label htmlFor="late-checkout" className="text-sm">
                Late Checkout until 2 PM (+$30)
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handleBack}>
          Back
        </Button>
        <Button
          onClick={handleContinue}
          disabled={!bookingData.customerName || !bookingData.email || !bookingData.phone}
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  );
};

export default GuestDetails;
