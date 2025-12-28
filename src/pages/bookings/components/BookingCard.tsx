import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getStatusColor } from '../constants';

interface BookingCardProps {
  booking: {
    id: string;
    service: string;
    provider: string;
    date: string;
    time: string;
    location: string;
    price: number;
    status: string;
  };
  onViewDetails: (id: string) => void;
  onContactProvider: (id: string) => void;
  index: number;
}

export function BookingCard({
  booking,
  onViewDetails,
  onContactProvider,
  index,
}: BookingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.01 }}
    >
      <Card className="border-2 border-gray-100 hover:border-orange-300 transition-all">
        <CardContent className="p-6">
          {/* Header with Title and Price */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">{booking.service}</h3>
              <Badge className={getStatusColor(booking.status)}>
                {booking.status}
              </Badge>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-orange-600">${booking.price}</p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="h-4 w-4 text-orange-500" />
              <span>Provider: {booking.provider}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4 text-orange-500" />
              <span>{booking.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4 text-orange-500" />
              <span>{booking.time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4 text-orange-500" />
              <span>{booking.location}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 hover:border-orange-500 hover:text-orange-600"
              onClick={() => onViewDetails(booking.id)}
            >
              View Details
            </Button>
            {booking.status === 'pending' && (
              <Button
                variant="outline"
                className="flex-1 text-red-600 hover:text-red-700 hover:border-red-300"
              >
                Cancel
              </Button>
            )}
            {booking.status === 'confirmed' && (
              <Button
                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold"
                onClick={() => onContactProvider(booking.id)}
              >
                Contact Provider
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
