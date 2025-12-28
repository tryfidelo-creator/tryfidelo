import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Calendar, DollarSign, Star, TrendingUp, AlertCircle } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ROUTES } from '@/lib/constants/routes';
import { getTimeBasedGreeting } from '@/lib/utils/greeting';
import { toast } from 'sonner';

const initialUpcomingBookings = [
  { id: '1', service: 'House Cleaning', customer: 'John Doe', date: 'Today, 2:00 PM', price: 75, status: 'confirmed' },
  { id: '2', service: 'Plumbing Repair', customer: 'Jane Smith', date: 'Tomorrow, 10:00 AM', price: 120, status: 'pending' },
  { id: '3', service: 'Electrical Work', customer: 'Mike Johnson', date: 'Dec 24, 3:00 PM', price: 150, status: 'confirmed' },
];

export function ProviderDashboard() {
  const [greeting, setGreeting] = useState({ greeting: 'Welcome back', message: 'Provider!' });
  const [upcomingBookings, setUpcomingBookings] = useState(initialUpcomingBookings);
  const walletBalance = 450.75;
  const rating = 4.8;
  const totalBookings = 156;
  const pendingCommission = 45.50;

  useEffect(() => {
    setGreeting(getTimeBasedGreeting());
  }, []);

  const handleAcceptBooking = (id: string) => {
    const booking = upcomingBookings.find(b => b.id === id);
    if (booking) {
      setUpcomingBookings(upcomingBookings.map(b => 
        b.id === id ? { ...b, status: 'confirmed' } : b
      ));
      toast.success(`Booking with ${booking.customer} accepted!`);
    }
  };

  const handleDeclineBooking = (id: string) => {
    const booking = upcomingBookings.find(b => b.id === id);
    if (booking) {
      setUpcomingBookings(upcomingBookings.filter(b => b.id !== id));
      toast.error(`Booking from ${booking.customer} declined.`);
    }
  };

  const handleViewDetails = () => {
    toast.info('Opening booking details...');
  };

  return (
    <DashboardLayout>
      <div className="p-4 space-y-6">
        <div className="space-y-6">
          {/* Welcome Section */}
          <div>
            <h1 className="heading-xl mb-2">{greeting.greeting}, Provider!</h1>
            <p className="text-gray-600">{greeting.message}</p>
          </div>

        {/* Low Balance Alert */}
        {walletBalance < 100 && (
          <Alert className="mb-6 border-brand-orange bg-orange-50">
            <AlertCircle className="h-4 w-4 text-brand-orange" />
            <AlertDescription className="text-brand-orange">
              Your wallet balance is low. Top up to ensure smooth booking confirmations.
              <Link to={ROUTES.WALLET} className="font-semibold underline ml-2">Top up now</Link>
            </AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Wallet Balance</span>
                <DollarSign className="h-5 w-5 text-brand-yellow" />
              </div>
              <p className="text-3xl font-bold">${walletBalance.toFixed(2)}</p>
              <p className="text-xs text-gray-500 mt-1">Available balance</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Rating</span>
                <Star className="h-5 w-5 text-brand-yellow fill-brand-yellow" />
              </div>
              <p className="text-3xl font-bold">{rating}</p>
              <p className="text-xs text-gray-500 mt-1">From {totalBookings} bookings</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">This Month</span>
                <TrendingUp className="h-5 w-5 text-brand-orange" />
              </div>
              <p className="text-3xl font-bold">24</p>
              <p className="text-xs text-gray-500 mt-1">Completed bookings</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Commission Due</span>
                <DollarSign className="h-5 w-5 text-brand-red" />
              </div>
              <p className="text-3xl font-bold">${pendingCommission.toFixed(2)}</p>
              <p className="text-xs text-gray-500 mt-1">10% platform fee</p>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Bookings */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Bookings
              </CardTitle>
              <Link to={ROUTES.BOOKINGS}>
                <Button variant="outline">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div key={booking.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-lg">{booking.service}</h4>
                        <p className="text-sm text-gray-600">Customer: {booking.customer}</p>
                      </div>
                      <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <span className="text-gray-600">{booking.date}</span>
                      <span className="text-2xl font-bold text-brand-red">${booking.price}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {booking.status === 'pending' && (
                      <>
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleAcceptBooking(booking.id)}
                        >
                          Accept
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDeclineBooking(booking.id)}
                        >
                          Decline
                        </Button>
                      </>
                    )}
                    {booking.status === 'confirmed' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewDetails()}
                      >
                        View Details
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}