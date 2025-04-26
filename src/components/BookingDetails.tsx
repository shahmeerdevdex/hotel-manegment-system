
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Calendar, Check, X, Mail, Phone, User, Home, Calendar as CalendarIcon } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { toast } from '@/components/ui/sonner';
import { Booking } from '@/hooks/useBookings';

interface BookingDetailsProps {
  booking: Booking;
  isOpen: boolean;
  onClose: () => void;
  onCancel: (id: string) => void;
}

const BookingDetails = ({ booking, isOpen, onClose, onCancel }: BookingDetailsProps) => {
  const handleCancel = async () => {
    try {
      await onCancel(booking.id);
      toast.success('Booking cancelled successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to cancel booking');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Booking Details</DialogTitle>
          <DialogDescription>
            Booking #{booking.id.substring(0, 8)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-red-100 text-red-800'
              }`}>
                {booking.status === 'confirmed' ? <Check className="w-3 h-3 mr-1" /> :
                 booking.status === 'cancelled' ? <X className="w-3 h-3 mr-1" /> :
                 null}
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Booked</p>
              <p className="font-medium">
                {formatDistanceToNow(new Date(booking.created_at), { addSuffix: true })}
              </p>
              <p className="text-xs text-gray-500">
                {format(new Date(booking.created_at), 'MMM d, yyyy')}
              </p>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 flex items-center mb-3">
              <User className="w-4 h-4 mr-2" />
              Guest Information
            </h4>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <span className="font-medium w-20">Name:</span> 
                {booking.customer_name}
              </div>
              <div className="flex items-center text-sm">
                <Mail className="w-4 h-4 mr-2 text-gray-400" />
                {booking.email}
              </div>
              <div className="flex items-center text-sm">
                <Phone className="w-4 h-4 mr-2 text-gray-400" />
                {booking.phone}
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 flex items-center mb-3">
              <Home className="w-4 h-4 mr-2" />
              Stay Details
            </h4>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                <span className="font-medium">Check-in:</span> 
                <span className="ml-2">{format(new Date(booking.check_in), 'MMM d, yyyy')}</span>
              </div>
              <div className="flex items-center text-sm">
                <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                <span className="font-medium">Check-out:</span>
                <span className="ml-2">{format(new Date(booking.check_out), 'MMM d, yyyy')}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="font-medium w-20">Room:</span>
                {booking.room_number}
              </div>
              <div className="flex items-center text-sm">
                <span className="font-medium w-20">Duration:</span>
                {booking.total_nights} {booking.total_nights === 1 ? 'night' : 'nights'}
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-100 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-xl font-bold">${booking.total_amount.toFixed(2)}</p>
              </div>
              {booking.status !== 'cancelled' && (
                <Button
                  variant="destructive"
                  onClick={handleCancel}
                  className="hover:bg-red-700"
                >
                  Cancel Booking
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDetails;
