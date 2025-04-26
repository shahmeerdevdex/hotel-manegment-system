
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useBookingSystem } from '@/hooks/useBookingSystem';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { ChevronDown, Plus, X } from 'lucide-react';

interface RoomFormProps {
  room?: {
    id: string;
    number: string;
    type: string;
    price: number;
    maxGuests: number;
    description: string;
    image: string;
    discount: number;
    status: 'available' | 'reserved';
    features?: string[];
  };
  onSubmit: () => void;
}

const roomTypes = [
  { value: 'Standard', label: 'Standard Room' },
  { value: 'Deluxe', label: 'Deluxe Room' },
  { value: 'Suite', label: 'Suite' },
  { value: 'Executive', label: 'Executive Room' },
  { value: 'Presidential', label: 'Presidential Suite' },
];

const RoomForm = ({ room, onSubmit }: RoomFormProps) => {
  const { addRoom, updateRoom } = useBookingSystem();
  const [formData, setFormData] = useState({
    number: room?.number || '',
    type: room?.type || 'Standard',
    price: room?.price || 100,
    maxGuests: room?.maxGuests || 2,
    description: room?.description || '',
    image: room?.image || 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461',
    discount: room?.discount || 0,
    features: room?.features || [],
  });
  
  const [newFeature, setNewFeature] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' || name === 'maxGuests' || name === 'discount' 
        ? parseFloat(value) 
        : value
    });
  };

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()]
      });
      setNewFeature('');
    }
  };

  const removeFeature = (feature: string) => {
    setFormData({
      ...formData,
      features: formData.features.filter(f => f !== feature)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (room) {
      updateRoom(room.id, {
        ...room,
        ...formData
      });
    } else {
      addRoom({
        ...formData,
        id: Date.now().toString(),
        status: 'available',
      });
    }
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="number">Room Number</Label>
          <Input
            id="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            required
            placeholder="101"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="type">Room Type</Label>
          <div className="relative">
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
              required
            >
              {roomTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price per Night ($)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            min={0}
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="discount">Discount (%)</Label>
          <Input
            id="discount"
            name="discount"
            type="number"
            min={0}
            max={100}
            value={formData.discount}
            onChange={handleChange}
          />
          <p className="text-xs text-muted-foreground">
            Final price: ${(formData.price * (1 - formData.discount / 100)).toFixed(2)}
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="maxGuests">Max Guests</Label>
          <Input
            id="maxGuests"
            name="maxGuests"
            type="number"
            min={1}
            value={formData.maxGuests}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
          {formData.image && (
            <div className="mt-2 relative w-full h-24 overflow-hidden rounded-md">
              <img 
                src={formData.image} 
                alt="Room preview" 
                className="object-cover w-full h-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461';
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          required
          placeholder="Describe the room features, view, etc."
        />
      </div>

      <div className="space-y-2">
        <Label>Room Features</Label>
        <div className="flex items-center space-x-2">
          <Input
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            placeholder="Add a feature (e.g., Wi-Fi, King Bed)"
            className="flex-1"
          />
          <Button 
            type="button" 
            variant="outline" 
            size="icon"
            onClick={addFeature}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {formData.features.map((feature, index) => (
            <div 
              key={index}
              className="flex items-center bg-muted py-1 pl-3 pr-2 rounded-full text-sm"
            >
              {feature}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-5 w-5 ml-1"
                onClick={() => removeFeature(feature)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onSubmit}>
          Cancel
        </Button>
        <Button type="submit" className="bg-hotel-red hover:bg-red-700">
          {room ? 'Update Room' : 'Add Room'}
        </Button>
      </div>
    </form>
  );
};

export default RoomForm;
