
import { useBookingWizard } from '@/contexts/BookingWizardContext';
import RoomSelection from './steps/RoomSelection';
import GuestDetails from './steps/GuestDetails';
import PaymentStep from './steps/PaymentStep';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface BookingWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingWizard = ({ isOpen, onClose }: BookingWizardProps) => {
  const { step } = useBookingWizard();

  const renderStep = () => {
    switch (step) {
      case 1:
        return <RoomSelection />;
      case 2:
        return <GuestDetails />;
      case 3:
        return <PaymentStep onSuccess={onClose} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            {[1, 2, 3].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`w-3 h-3 rounded-full ${
                  step >= stepNumber ? 'bg-primary' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">
            Step {step} of 3
          </span>
        </div>
        {renderStep()}
      </DialogContent>
    </Dialog>
  );
};

export default BookingWizard;
