import { useState } from 'react';
import { MapPin, Navigation, Truck, Star, Clock, Phone, ArrowUpRight, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';

const availableDeliveries = [
  { id: '1', pickup: '123 Main St', dropoff: '456 Oak Ave', distance: '5.2 km', payment: 25, time: '15 min' },
  { id: '2', pickup: '789 Park Rd', dropoff: '321 Beach Blvd', distance: '8.7 km', payment: 35, time: '22 min' },
  { id: '3', pickup: '555 Center St', dropoff: '777 West End', distance: '3.2 km', payment: 18, time: '10 min' },
];

const activeDeliveries = [
  { id: '4', pickup: '100 North Ave', dropoff: '200 South St', status: 'in_transit', time: '8 min left', customer: 'John D.', rating: 4.8 },
];

function DashStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { label: 'Wallet Balance', value: '$320.50', change: '+5%', icon: '💰', trend: 'up' },
        { label: 'Today\'s Earnings', value: '$85.00', change: '+12%', icon: '📈', trend: 'up' },
        { label: 'Completed Today', value: '6', change: '+2', icon: '✅', trend: 'up' },
        { label: 'Rating', value: '4.9★', change: '+0.1', icon: '⭐', trend: 'up' },
      ].map((stat, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
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

function AvailableDeliveries() {
  const [deliveries, setDeliveries] = useState(availableDeliveries);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
      <Card className="border-2 border-gray-200">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Navigation className="w-6 h-6 text-green-600" />
                Available Deliveries
              </CardTitle>
              <p className="text-sm text-gray-600 mt-2">{deliveries.length} opportunities available</p>
            </div>
            <Button className="bg-green-600 hover:bg-green-700 text-white">Refresh</Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {deliveries.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🚚</div>
              <p className="text-gray-600 mb-4">No deliveries available right now</p>
              <p className="text-sm text-gray-500">New deliveries will appear as they become available</p>
            </div>
          ) : (
            <div className="space-y-4">
              {deliveries.map((delivery) => (
                <motion.div
                  key={delivery.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="border-2 border-gray-200 rounded-lg p-4 hover:border-green-400 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <MapPin className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-gray-900">{delivery.pickup}</p>
                          <p className="text-sm text-gray-600">Pickup location</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 ml-3">
                        <div className="w-5 h-5 border-2 border-green-600 rounded-full" />
                        <div>
                          <p className="font-semibold text-gray-900">{delivery.dropoff}</p>
                          <p className="text-sm text-gray-600">Dropoff location</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-3xl font-bold text-green-600">${delivery.payment}</p>
                      <p className="text-sm text-gray-600">{delivery.distance}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-gray-600">
                        <Clock className="w-4 h-4" />
                        {delivery.time}
                      </span>
                      <Badge variant="outline" className="border-green-300 text-green-700">
                        Est. {delivery.distance}
                      </Badge>
                    </div>
                    <Button
                      onClick={() => {
                        setDeliveries(deliveries.filter(d => d.id !== delivery.id));
                        toast.success('Delivery accepted! Head to pickup location.');
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Accept Delivery
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ActiveDeliveries() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
      <Card className="border-2 border-gray-200">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Truck className="w-6 h-6 text-blue-600" />
            Active Deliveries
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {activeDeliveries.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🎯</div>
              <p className="text-gray-600">No active deliveries</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeDeliveries.map((delivery) => (
                <div key={delivery.id} className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-semibold text-gray-900">On the way</p>
                      <p className="text-sm text-gray-600 mt-1">Arriving in {delivery.time}</p>
                    </div>
                    <Badge className="bg-blue-600">In Transit</Badge>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700">{delivery.pickup}</span>
                    </div>
                    <div className="ml-5 border-l-2 border-blue-400 pl-5 -my-2 text-sm text-gray-500">
                      In transit
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">{delivery.dropoff}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-blue-200">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Customer</p>
                        <p className="font-semibold">{delivery.customer}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Rating</p>
                        <p className="font-semibold flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          {delivery.rating}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-blue-300">
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Delivered
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function RiderDashboard() {
  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-gray-900">Delivery Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage deliveries and track your earnings</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Alert className="border-2 border-blue-300 bg-blue-50">
            <AlertCircle className="h-5 w-5 text-blue-600" />
            <AlertDescription className="text-blue-800">
              ✨ Complete 10 deliveries this week to earn a ₦500 bonus!
            </AlertDescription>
          </Alert>
        </motion.div>

        <DashStats />
        <AvailableDeliveries />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ActiveDeliveries />
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <Card className="border-2 border-gray-200 h-fit">
              <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b">
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-600" />
                  Your Rating
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <p className="text-5xl font-bold text-yellow-600 mb-2">4.9</p>
                  <div className="flex justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">Based on 142 deliveries</p>
                </div>

                <div className="space-y-3 border-t pt-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">On-time Delivery</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '95%' }} />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Professionalism</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }} />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Cleanliness</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '88%' }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
