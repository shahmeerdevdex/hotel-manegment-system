
import { BookingWizardProvider } from '@/contexts/BookingWizardContext';
import BookingWizard from './BookingWizard/BookingWizard';

interface BookingModalProps {
  roomId: string;
  onClose: () => void;
}

const BookingModal = ({ roomId, onClose }: BookingModalProps) => {
  return (
    <BookingWizardProvider>
      <BookingWizard isOpen={true} onClose={onClose} />
    </BookingWizardProvider>
  );
};

export default BookingModal;
