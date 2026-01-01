import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, MapPin, CheckCircle, XCircle, TrendingUp, AlertCircle, ArrowUpRight } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';

const bookings = [
  { id: '1', service: 'House Cleaning', customer: 'John Doe', date: 'Today, 2:00 PM', location: '123 Main St', price: 75, status: 'confirmed' },
  { id: '2', service: 'Plumbing Repair', customer: 'Jane Smith', date: 'Tomorrow, 10:00 AM', location: '456 Oak Ave', price: 120, status: 'pending' },
  { id: '3', service: 'Electrical Work', customer: 'Mike Johnson', date: 'Dec 24, 3:00 PM', location: '789 Park Rd', price: 150, status: 'confirmed' },
];

function DashStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { label: 'Wallet Balance', value: '$450.75', change: '+12%', icon: '💰', trend: 'up' },
        { label: 'Rating', value: '4.8★', change: '+0.2', icon: '⭐', trend: 'up' },
        { label: 'Total Bookings', value: '156', change: '+28', icon: '📅', trend: 'up' },
        { label: 'Completion Rate', value: '98%', change: '+2%', icon: '✅', trend: 'up' },
      ].map((stat, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">{stat.icon}</span>
                <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                  <ArrowUpRight className="w-4 h-4" />
                  {stat.change}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

function BookingsSection({ bookings }: { bookings: any[] }) {
  const [bookingsList, setBookingsList] = useState(bookings);

  const handleAction = (id: string, action: 'accept' | 'decline') => {
    const booking = bookingsList.find(b => b.id === id);
    if (action === 'accept') {
      setBookingsList(bookingsList.map(b => b.id === id ? { ...b, status: 'confirmed' } : b));
      toast.success(`Booking with ${booking?.customer} confirmed!`);
    } else {
      setBookingsList(bookingsList.filter(b => b.id !== id));
      toast.error(`Booking from ${booking?.customer} declined.`);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
      <Card className="border-2 border-gray-200">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Calendar className="w-6 h-6 text-purple-600" />
                Upcoming Bookings
              </CardTitle>
              <p className="text-sm text-gray-600 mt-2">{bookingsList.length} scheduled</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {bookingsList.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No bookings scheduled</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookingsList.map((booking) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="border-2 border-gray-200 rounded-lg p-4 hover:border-purple-400 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{booking.service}</h4>
                      <div className="space-y-2 mt-2">
                        <p className="text-sm text-gray-700 flex items-center gap-2">
                          <User className="w-4 h-4 text-purple-600" />
                          {booking.customer}
                        </p>
                        <p className="text-sm text-gray-700 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-purple-600" />
                          {booking.date}
                        </p>
                        <p className="text-sm text-gray-700 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-purple-600" />
                          {booking.location}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-purple-600">${booking.price}</p>
                      <Badge className={booking.status === 'confirmed' ? 'bg-green-100 text-green-800 mt-2' : 'bg-yellow-100 text-yellow-800 mt-2'}>
                        {booking.status}
                      </Badge>
                    </div>
                  </div>

                  {booking.status === 'pending' && (
                    <div className="flex gap-2 pt-4 border-t">
                      <Button
                        onClick={() => handleAction(booking.id, 'accept')}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Accept
                      </Button>
                      <Button
                        onClick={() => handleAction(booking.id, 'decline')}
                        variant="outline"
                        className="flex-1 border-red-300 text-red-600 hover:bg-red-50 gap-2"
                      >
                        <XCircle className="w-4 h-4" />
                        Decline
                      </Button>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function ProviderDashboard() {
  const [walletLow] = useState(false);

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-gray-900">Service Provider Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage bookings and track your performance</p>
        </motion.div>

        {walletLow && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Alert className="border-2 border-orange-300 bg-orange-50">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <AlertDescription className="text-orange-800">
                Your wallet balance is low. Top up to ensure smooth booking management.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        <DashStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <BookingsSection bookings={bookings} />
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <Card className="border-2 border-gray-200 h-fit">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Response Rate</span>
                      <span className="text-lg font-bold text-green-600">96%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '96%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">On-time Completion</span>
                      <span className="text-lg font-bold text-blue-600">98%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '98%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Customer Satisfaction</span>
                      <span className="text-lg font-bold text-purple-600">94%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '94%' }} />
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-6">
                  View Detailed Analytics
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
