import { useState } from 'react';
import { AdminLayout } from '@/components/dashboard/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { motion } from 'framer-motion';
import { Search, MapPin, Package, CheckCircle, AlertCircle, Truck, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

interface DeliveryRequest {
  id: string;
  sender: { id: string; name: string; avatar: string };
  rider?: { id: string; name: string; avatar: string; rating: number };
  pickupLocation: string;
  deliveryLocation: string;
  itemDescription: string;
  price: number;
  status: 'pending' | 'accepted' | 'in_transit' | 'delivered' | 'cancelled';
  createdAt: string;
}

const mockDeliveryRequests: DeliveryRequest[] = [
  {
    id: '1',
    sender: { id: '1', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?u=john' },
    rider: { id: '1', name: 'Mike Rider', avatar: 'https://i.pravatar.cc/150?u=mike', rating: 4.8 },
    pickupLocation: '123 Main St, Lagos',
    deliveryLocation: '456 Oak Ave, Lagos',
    itemDescription: 'Electronic package',
    price: 5000,
    status: 'in_transit',
    createdAt: '2025-12-21 10:30 AM',
  },
  {
    id: '2',
    sender: { id: '2', name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?u=jane' },
    rider: { id: '2', name: 'Sarah Swift', avatar: 'https://i.pravatar.cc/150?u=sarah', rating: 4.9 },
    pickupLocation: '789 Queen Rd, Abuja',
    deliveryLocation: '321 King St, Abuja',
    itemDescription: 'Documents package',
    price: 3000,
    status: 'delivered',
    createdAt: '2025-12-21 08:00 AM',
  },
  {
    id: '3',
    sender: { id: '3', name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/150?u=alex' },
    pickupLocation: '555 Pine St, Portharcourt',
    deliveryLocation: '777 Elm Ave, Portharcourt',
    itemDescription: 'Food delivery - Takeout',
    price: 2500,
    status: 'pending',
    createdAt: '2025-12-21 10:45 AM',
  },
  {
    id: '4',
    sender: { id: '4', name: 'Emma Brown', avatar: 'https://i.pravatar.cc/150?u=emma' },
    rider: { id: '3', name: 'Tom Express', avatar: 'https://i.pravatar.cc/150?u=tom', rating: 4.7 },
    pickupLocation: '222 River Rd, Ibadan',
    deliveryLocation: '888 Lake St, Ibadan',
    itemDescription: 'Parcel box',
    price: 4500,
    status: 'delivered',
    createdAt: '2025-12-20 02:30 PM',
  },
];

export function AdminDeliveryRequestsPage() {
  const [deliveries, setDeliveries] = useState<DeliveryRequest[]>(mockDeliveryRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredDeliveries = deliveries.filter((delivery) => {
    const matchesSearch = 
      delivery.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.itemDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || delivery.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-blue-100 text-blue-800';
      case 'in_transit':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="h-4 w-4" />;
      case 'accepted':
        return <CheckCircle className="h-4 w-4" />;
      case 'in_transit':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const handleCancelDelivery = (id: string) => {
    const delivery = deliveries.find(d => d.id === id);
    if (delivery && delivery.status === 'pending') {
      setDeliveries(deliveries.map(d =>
        d.id === id ? { ...d, status: 'cancelled' } : d
      ));
      toast.success(`Delivery "${delivery.itemDescription}" has been cancelled.`);
    } else {
      toast.error('Can only cancel pending deliveries.');
    }
  };

  const stats = {
    total: deliveries.length,
    pending: deliveries.filter(d => d.status === 'pending').length,
    inTransit: deliveries.filter(d => d.status === 'in_transit').length,
    delivered: deliveries.filter(d => d.status === 'delivered').length,
    totalRevenue: deliveries.filter(d => d.status === 'delivered').reduce((sum, d) => sum + (d.price * 0.1), 0),
  };

  return (
    <AdminLayout>
      <div className="p-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div>
            <h1 className="heading-xl mb-2">Delivery Management</h1>
            <p className="text-gray-600">Monitor and manage all delivery requests on the platform</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Total Deliveries</span>
                  <Package className="h-5 w-5 text-brand-orange" />
                </div>
                <p className="text-3xl font-bold">{stats.total}</p>
                <p className="text-xs text-gray-500 mt-1">All time</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Pending</span>
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                </div>
                <p className="text-3xl font-bold">{stats.pending}</p>
                <p className="text-xs text-gray-500 mt-1">Awaiting acceptance</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">In Transit</span>
                  <Truck className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-3xl font-bold">{stats.inTransit}</p>
                <p className="text-xs text-gray-500 mt-1">On delivery</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Delivered</span>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <p className="text-3xl font-bold">{stats.delivered}</p>
                <p className="text-xs text-gray-500 mt-1">Completed</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Platform Fee</span>
                  <TrendingUp className="h-5 w-5 text-brand-yellow" />
                </div>
                <p className="text-3xl font-bold">₦{Math.round(stats.totalRevenue)}</p>
                <p className="text-xs text-gray-500 mt-1">From delivered</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <Card>
            <CardContent className="p-6">
              <div className="flex gap-4 flex-col md:flex-row">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search by sender, item, or location..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="in_transit">In Transit</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Delivery List */}
          <Card>
            <CardHeader>
              <CardTitle>Active Deliveries ({filteredDeliveries.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredDeliveries.length > 0 ? (
                  filteredDeliveries.map((delivery) => (
                    <motion.div
                      key={delivery.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3 flex-1">
                          <Avatar>
                            <AvatarImage src={delivery.sender.avatar} alt={delivery.sender.name} />
                            <AvatarFallback>{delivery.sender.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{delivery.sender.name}</h4>
                            <p className="text-xs text-gray-600">{delivery.itemDescription}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(delivery.status)}>
                            {getStatusIcon(delivery.status)}
                            <span className="ml-1 capitalize">{delivery.status.replace('_', ' ')}</span>
                          </Badge>
                        </div>
                      </div>

                      <Separator className="my-3" />

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-brand-orange flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-xs text-gray-600">Pickup</p>
                            <p className="text-sm font-medium">{delivery.pickupLocation}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-brand-red flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-xs text-gray-600">Delivery</p>
                            <p className="text-sm font-medium">{delivery.deliveryLocation}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <p className="text-xs text-gray-600">Price</p>
                            <p className="text-sm font-semibold text-brand-orange">₦{delivery.price.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Requested</p>
                            <p className="text-xs text-gray-500">{delivery.createdAt}</p>
                          </div>
                        </div>
                      </div>

                      {delivery.rider && (
                        <>
                          <Separator className="my-3" />
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={delivery.rider.avatar} alt={delivery.rider.name} />
                              <AvatarFallback>{delivery.rider.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{delivery.rider.name}</p>
                              <p className="text-xs text-gray-600">Rating: {delivery.rider.rating}⭐</p>
                            </div>
                          </div>
                        </>
                      )}

                      <div className="mt-3 flex gap-2 justify-end">
                        {delivery.status === 'pending' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCancelDelivery(delivery.id)}
                            className="text-red-600 border-red-600 hover:bg-red-50"
                          >
                            Cancel
                          </Button>
                        )}
                        <Button size="sm" className="bg-brand-orange hover:bg-brand-orange/90">
                          View Details
                        </Button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No deliveries found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
