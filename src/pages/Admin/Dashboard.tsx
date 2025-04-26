
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RoomForm from '@/components/Admin/RoomForm';
import { useBookingSystem } from '@/hooks/useBookingSystem';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Pencil, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const Dashboard = () => {
  const { rooms, bookings, updateRoomStatus, deleteRoom } = useBookingSystem();
  const [isAddingRoom, setIsAddingRoom] = useState(false);
  const [editingRoom, setEditingRoom] = useState<typeof rooms[0] | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState<string | null>(null);

  const handleEditRoom = (room: typeof rooms[0]) => {
    setEditingRoom(room);
  };

  const handleDeleteRoom = (roomId: string) => {
    setRoomToDelete(roomId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteRoom = () => {
    if (roomToDelete) {
      deleteRoom(roomToDelete);
      toast.success('Room deleted successfully');
      setIsDeleteDialogOpen(false);
      setRoomToDelete(null);
    }
  };

  const handleFormSubmit = () => {
    setIsAddingRoom(false);
    setEditingRoom(null);
    toast.success(editingRoom ? 'Room updated successfully' : 'Room added successfully');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-hotel-darkGray">Admin Dashboard</h1>
            <Button onClick={() => setIsAddingRoom(true)} className="bg-hotel-red hover:bg-red-700">
              Add New Room
            </Button>
          </div>

          {isAddingRoom && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Add New Room</CardTitle>
              </CardHeader>
              <CardContent>
                <RoomForm onSubmit={handleFormSubmit} />
              </CardContent>
            </Card>
          )}

          {editingRoom && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Edit Room</CardTitle>
              </CardHeader>
              <CardContent>
                <RoomForm room={editingRoom} onSubmit={handleFormSubmit} />
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-lg">Total Rooms</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-3xl font-bold">{rooms.length}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="bg-green-50">
                <CardTitle className="text-lg">Available Rooms</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-3xl font-bold">
                  {rooms.filter(room => room.status === 'available').length}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="bg-red-50">
                <CardTitle className="text-lg">Total Bookings</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-3xl font-bold">{bookings.length}</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Manage Rooms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Room Number</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Max Guests</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Discount</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rooms.map((room) => (
                      <TableRow key={room.id}>
                        <TableCell>{room.number}</TableCell>
                        <TableCell>{room.type}</TableCell>
                        <TableCell>${room.price}</TableCell>
                        <TableCell>{room.maxGuests}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            room.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {room.status === 'available' ? 'Available' : 'Reserved'}
                          </span>
                        </TableCell>
                        <TableCell>{room.discount}%</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => updateRoomStatus(room.id, room.status === 'available' ? 'reserved' : 'available')}
                            >
                              {room.status === 'available' ? 'Mark Reserved' : 'Mark Available'}
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleEditRoom(room)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => handleDeleteRoom(room.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>Check In</TableHead>
                      <TableHead>Check Out</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>#{booking.id.substring(0, 8)}</TableCell>
                        <TableCell>{booking.customerName}</TableCell>
                        <TableCell>{booking.roomNumber}</TableCell>
                        <TableCell>{booking.checkIn}</TableCell>
                        <TableCell>{booking.checkOut}</TableCell>
                        <TableCell>${booking.totalAmount}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
              </DialogHeader>
              <p className="py-4">Are you sure you want to delete this room? This action cannot be undone.</p>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={confirmDeleteRoom}>
                  Delete
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
