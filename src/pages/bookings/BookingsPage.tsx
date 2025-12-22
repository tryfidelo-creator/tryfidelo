import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const bookings = [
  {
    id: '1',
    service: 'Professional House Cleaning',
    provider: 'Sarah Johnson',
    customer: 'John Doe',
    date: 'Dec 22, 2025',
    time: '2:00 PM',
    location: 'Lagos, Nigeria',
    price: 75,
    status: 'confirmed',
  },
  {
    id: '2',
    service: 'Plumbing Repair',
    provider: 'Mike Chen',
    customer: 'Jane Smith',
    date: 'Dec 23, 2025',
    time: '10:00 AM',
    location: 'Abuja, Nigeria',
    price: 120,
    status: 'pending',
  },
  {
    id: '3',
    service: 'Electrical Work',
    provider: 'David Lee',
    customer: 'Alice Brown',
    date: 'Dec 24, 2025',
    time: '3:00 PM',
    location: 'Port Harcourt',
    price: 150,
    status: 'completed',
  },
];

export function BookingsPage() {
  const [filter, setFilter] = useState('all');

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="heading-xl mb-2">My Bookings</h1>
            <p className="text-gray-600">Manage your service bookings</p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Bookings ({filteredBookings.length})</CardTitle>
                <Tabs value={filter} onValueChange={setFilter}>
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredBookings.map((booking, index) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                    className="p-6 bg-white border-2 border-gray-100 rounded-lg hover:border-brand-yellow transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{booking.service}</h3>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-brand-red">${booking.price}</p>
                        <p className="text-sm text-gray-600">Total</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="h-4 w-4" />
                        <span>Provider: {booking.provider}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{booking.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{booking.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{booking.location}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        View Details
                      </Button>
                      {booking.status === 'pending' && (
                        <Button variant="outline" className="flex-1 text-red-600 hover:text-red-700">
                          Cancel
                        </Button>
                      )}
                      {booking.status === 'confirmed' && (
                        <Button className="flex-1 bg-brand-yellow text-black hover:bg-brand-orange">
                          Contact Provider
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}