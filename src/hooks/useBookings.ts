
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';

export interface Booking {
  id: string;
  room_id: string;
  room_number: string;
  customer_name: string;
  email: string;
  phone: string;
  check_in: string;
  check_out: string;
  total_nights: number;
  total_amount: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  created_at: string;
}

export const useBookings = () => {
  const queryClient = useQueryClient();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast.error('Error loading bookings');
        throw error;
      }

      return data as Booking[];
    },
  });

  const cancelBooking = useMutation({
    mutationFn: async (bookingId: string) => {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast.success('Booking cancelled successfully');
    },
    onError: () => {
      toast.error('Failed to cancel booking');
    },
  });

  return {
    bookings,
    isLoading,
    cancelBooking: cancelBooking.mutate,
  };
};
