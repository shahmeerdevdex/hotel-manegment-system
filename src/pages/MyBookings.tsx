
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useBookings } from '@/hooks/useBookings';
import { Loader2, Calendar, Search, Filter, Mail, ArrowDown } from 'lucide-react';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import BookingDetails from '@/components/BookingDetails';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Define search form schema
const searchFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  status: z.string().optional(),
  date: z.object({
    from: z.date().optional(),
    to: z.date().optional()
  }).optional()
});

type SearchFormValues = z.infer<typeof searchFormSchema>;

const MyBookings = () => {
  const { user } = useAuth();
  const { bookings, isLoading, cancelBooking } = useBookings();
  const [date, setDate] = useState<DateRange | undefined>();
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const [filteredBookings, setFilteredBookings] = useState<any[]>([]);

  // Initialize form with validation schema
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      email: user?.email || '',
      status: 'all',
      date: undefined
    }
  });

  // Update email when user is loaded
  useEffect(() => {
    if (user?.email) {
      form.setValue('email', user.email);
    }
  }, [user, form]);

  // Update date range in form when calendar selection changes
  useEffect(() => {
    form.setValue('date', date);
  }, [date, form]);

  const handleSearch = (values: SearchFormValues) => {
    const filteredResults = bookings.filter(booking => {
      const matchEmail = booking.email.toLowerCase() === values.email.toLowerCase();
      const matchStatus = !values.status || values.status === 'all' 
        ? true 
        : booking.status === values.status;
      const matchDate = !values.date?.from || !values.date?.to 
        ? true 
        : (
          new Date(booking.check_in) >= values.date.from &&
          new Date(booking.check_out) <= (values.date.to || new Date())
        );
      return matchEmail && matchStatus && matchDate;
    });
    
    setFilteredBookings(filteredResults);
    setSearchPerformed(true);
  };

  const selectedBookingData = bookings.find(booking => booking.id === selectedBooking);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-hotel-darkGray mb-8 text-center">
            My Bookings
          </h1>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold text-hotel-darkGray mb-6 flex items-center">
                <Search className="mr-2 h-5 w-5 text-hotel-red" />
                Find Your Bookings
              </h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSearch)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Mail className="h-4 w-4 mr-2" />
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your email address" 
                              {...field} 
                              className="focus-visible:ring-hotel-red"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Filter className="h-4 w-4 mr-2" />
                            Booking Status
                          </FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="all">All Statuses</SelectItem>
                              <SelectItem value="confirmed">Confirmed</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="date"
                      render={() => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            Date Range
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal"
                                >
                                  <Calendar className="mr-2 h-4 w-4" />
                                  {date?.from ? (
                                    date.to ? (
                                      <>
                                        {format(date.from, "LLL dd, y")} -{" "}
                                        {format(date.to, "LLL dd, y")}
                                      </>
                                    ) : (
                                      format(date.from, "LLL dd, y")
                                    )
                                  ) : (
                                    <span>Pick a date range</span>
                                  )}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                              <CalendarComponent
                                initialFocus
                                mode="range"
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={2}
                                className="pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      className="bg-hotel-red hover:bg-red-700 flex items-center gap-2"
                    >
                      <Search className="h-4 w-4" />
                      Search Bookings
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-hotel-red" />
            </div>
          ) : searchPerformed && (
            filteredBookings.length > 0 ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Your Bookings ({filteredBookings.length})</h2>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>Sort by date</span>
                    <ArrowDown className="ml-1 h-4 w-4" />
                  </div>
                </div>
                
                {filteredBookings.map((booking) => (
                  <Card
                    key={booking.id} 
                    className="hover:shadow-md transition-all cursor-pointer"
                    onClick={() => setSelectedBooking(booking.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">Booking #{booking.id.substring(0, 8)}</h3>
                          <p className="text-sm text-gray-500">
                            Booked on {format(new Date(booking.created_at), 'MMM d, yyyy')}
                          </p>
                        </div>
                        <Badge className={`px-3 py-1 ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' : 
                          'bg-red-100 text-red-800 hover:bg-red-100'
                        }`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Room</p>
                          <p className="font-medium">Room {booking.room_number}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Guest</p>
                          <p className="font-medium">{booking.customer_name}</p>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Check In</p>
                            <p className="font-medium">{format(new Date(booking.check_in), 'MMM d, yyyy')}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Check Out</p>
                            <p className="font-medium">{format(new Date(booking.check_out), 'MMM d, yyyy')}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t">
                        <div>
                          <p className="text-sm text-gray-500">Total Amount</p>
                          <p className="font-bold text-xl">${booking.total_amount.toFixed(2)}</p>
                        </div>
                        <Button 
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedBooking(booking.id);
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="text-center py-12 mt-8">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">No Bookings Found</h3>
                  <p className="text-gray-500 mb-4">
                    We couldn't find any bookings associated with this email address.
                  </p>
                  <p className="text-gray-500">
                    If you've recently made a booking, please check your email for confirmation
                    or try searching with a different email address.
                  </p>
                </CardContent>
              </Card>
            )
          )}

          {!searchPerformed && !isLoading && (
            <Card className="text-center py-12 mt-8">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">Search for Your Bookings</h3>
                <p className="text-gray-500 mb-4">
                  Please enter your email address and any optional filters to find your bookings.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />

      {selectedBookingData && (
        <BookingDetails
          booking={selectedBookingData}
          isOpen={!!selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onCancel={cancelBooking}
        />
      )}
    </div>
  );
};

export default MyBookings;
