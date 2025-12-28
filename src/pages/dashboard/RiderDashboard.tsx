import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { MapPin, DollarSign, Package, TrendingUp, AlertCircle } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ROUTES } from '@/lib/constants/routes';
import { getTimeBasedGreeting } from '@/lib/utils/greeting';
import { toast } from 'sonner';

const initialAvailableDeliveries = [
  { id: '1', pickup: '123 Main St, Lagos', dropoff: '456 Oak Ave, Lagos', distance: '5.2 km', offer: 25, status: 'available', price: 25 },
  { id: '2', pickup: '789 Park Rd, Abuja', dropoff: '321 Beach Blvd, Abuja', distance: '8.7 km', offer: 35, status: 'available', price: 35 },
];

const initialActiveDeliveries = [
  { id: '3', pickup: '555 Center St', dropoff: '777 West End', status: 'picked_up', price: 30, distance: '0 km', offer: 30 },
];

export function RiderDashboard() {
  const navigate = useNavigate();
  const [greeting] = useState(getTimeBasedGreeting());
  const [availableDeliveries, setAvailableDeliveries] = useState(initialAvailableDeliveries);
  const [activeDeliveries, setActiveDeliveries] = useState(initialActiveDeliveries);
  const walletBalance = 320.50;
  const todayEarnings = 85;
  const completedToday = 6;
  const pendingCommission = 21.50;

  const handleAcceptDelivery = (id: string) => {
    const delivery = availableDeliveries.find(d => d.id === id);
    if (delivery) {
      setAvailableDeliveries(availableDeliveries.filter(d => d.id !== id));
      setActiveDeliveries([...activeDeliveries, { ...delivery, status: 'in_transit' }]);
      toast.success(`Delivery from ${delivery.pickup.split(',')[0]} accepted!`);
    }
  };

  const handleMarkAsDelivered = (id: string) => {
    const delivery = activeDeliveries.find(d => d.id === id);
    if (delivery) {
      setActiveDeliveries(activeDeliveries.filter(d => d.id !== id));
      toast.success('Delivery marked as completed! Earnings updated.');
    }
  };

  const handleViewDetails = () => {
    navigate(ROUTES.DELIVERY_REQUESTS);
  };

  return (
    <DashboardLayout>
      <div className="p-4 space-y-6">
        <div className="space-y-6">
          {/* Welcome Section */}
          <div>
            <h1 className="heading-xl mb-2">{greeting.greeting}, Rider!</h1>
            <p className="text-gray-600">{greeting.message}</p>
          </div>

        {/* Low Balance Alert */}
        {walletBalance < 50 && (
          <Alert className="mb-6 border-brand-orange bg-orange-50">
            <AlertCircle className="h-4 w-4 text-brand-orange" />
            <AlertDescription className="text-brand-orange">
              Your wallet balance is low. Ensure sufficient balance before accepting pickups (7% commission deducted).
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
                <span className="text-sm text-gray-600">Today's Earnings</span>
                <TrendingUp className="h-5 w-5 text-brand-orange" />
              </div>
              <p className="text-3xl font-bold">${todayEarnings}</p>
              <p className="text-xs text-gray-500 mt-1">{completedToday} deliveries</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Active Deliveries</span>
                <Package className="h-5 w-5 text-brand-red" />
              </div>
              <p className="text-3xl font-bold">{activeDeliveries.length}</p>
              <p className="text-xs text-gray-500 mt-1">In progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Commission Due</span>
                <DollarSign className="h-5 w-5 text-gray-600" />
              </div>
              <p className="text-3xl font-bold">${pendingCommission.toFixed(2)}</p>
              <p className="text-xs text-gray-500 mt-1">7% platform fee</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Available Deliveries */}
          <Card>
            <CardHeader>
              <CardTitle>Available Deliveries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableDeliveries.map((delivery) => (
                  <div key={delivery.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start gap-3 mb-3">
                      <MapPin className="h-5 w-5 text-brand-yellow flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold mb-1">Pickup</p>
                        <p className="text-sm text-gray-600">{delivery.pickup}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 mb-3">
                      <MapPin className="h-5 w-5 text-brand-red flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold mb-1">Drop-off</p>
                        <p className="text-sm text-gray-600">{delivery.dropoff}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm text-gray-600">{delivery.distance}</span>
                        <p className="text-xl font-bold text-brand-red">${delivery.offer}</p>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                        onClick={() => handleAcceptDelivery(delivery.id)}
                      >
                        Accept
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active Deliveries */}
          <Card>
            <CardHeader>
              <CardTitle>Active Deliveries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeDeliveries.map((delivery) => (
                  <div key={delivery.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <Badge>{delivery.status.replace('_', ' ')}</Badge>
                      <p className="text-xl font-bold text-brand-red">${delivery.price}</p>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-brand-yellow" />
                        <span>{delivery.pickup}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-brand-red" />
                        <span>{delivery.dropoff}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {delivery.status === 'picked_up' && (
                        <Button 
                          size="sm" 
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          onClick={() => handleMarkAsDelivered(delivery.id)}
                        >
                          Mark as Delivered
                        </Button>
                      )}
                      {delivery.status === 'in_transit' && (
                        <Button 
                          size="sm" 
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                          onClick={() => handleViewDetails()}
                        >
                          In Transit
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleViewDetails()}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </DashboardLayout>
  );
}