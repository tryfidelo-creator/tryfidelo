import { motion } from 'framer-motion';
import { MapPin, Package, CheckCircle, Clock, User, Phone } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const deliverySteps = [
  { status: 'completed', label: 'Order Placed', time: '10:30 AM', icon: Package },
  { status: 'completed', label: 'Rider Assigned', time: '10:45 AM', icon: User },
  { status: 'active', label: 'Picked Up', time: '11:15 AM', icon: CheckCircle },
  { status: 'pending', label: 'In Transit', time: 'Estimated 12:30 PM', icon: Clock },
  { status: 'pending', label: 'Delivered', time: 'Estimated 1:00 PM', icon: MapPin },
];

export function TrackingPage() {
  const delivery = {
    id: 'DEL-12345',
    pickup: '123 Main Street, Lagos',
    dropoff: '456 Oak Avenue, Lagos',
    rider: {
      name: 'Mike Rider',
      phone: '+234 555 123 4567',
      avatar: 'https://i.pravatar.cc/150?u=mikerider',
      rating: 4.8,
    },
    price: 30,
    status: 'picked_up',
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
            <h1 className="heading-xl mb-2">Track Delivery</h1>
            <p className="text-gray-600">Order ID: {delivery.id}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tracking Timeline */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Status</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Map Placeholder */}
                  <div className="bg-gray-200 rounded-lg h-64 mb-6 flex items-center justify-center">
                    <p className="text-gray-500">Map integration coming soon</p>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-6">
                    {deliverySteps.map((step, index) => {
                      const Icon = step.icon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-start gap-4"
                        >
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                            step.status === 'completed' ? 'bg-green-100' :
                            step.status === 'active' ? 'bg-brand-yellow' :
                            'bg-gray-100'
                          }`}>
                            <Icon className={`h-6 w-6 ${
                              step.status === 'completed' ? 'text-green-600' :
                              step.status === 'active' ? 'text-black' :
                              'text-gray-400'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className={`font-semibold ${
                                step.status === 'pending' ? 'text-gray-400' : ''
                              }`}>
                                {step.label}
                              </h4>
                              {step.status === 'active' && (
                                <Badge className="bg-brand-yellow text-black">Current</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{step.time}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Delivery Details */}
            <div className="space-y-6">
              {/* Rider Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Rider Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={delivery.rider.avatar} alt={delivery.rider.name} />
                      <AvatarFallback>{delivery.rider.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-lg">{delivery.rider.name}</h4>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <span>⭐ {delivery.rider.rating}</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-brand-yellow text-black hover:bg-brand-orange">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Rider
                  </Button>
                </CardContent>
              </Card>

              {/* Addresses */}
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-brand-yellow" />
                      <span className="font-semibold text-sm">Pickup</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-6">{delivery.pickup}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-brand-red" />
                      <span className="font-semibold text-sm">Drop-off</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-6">{delivery.dropoff}</p>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Delivery Fee</span>
                      <span className="text-2xl font-bold text-brand-red">${delivery.price}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button variant="outline" className="w-full">
                Report Issue
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}