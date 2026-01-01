import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Truck, Search, Filter, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/constants/routes';

interface DeliveryRequest {
  id: string;
  pickupLocation: string;
  dropoffLocation: string;
  estimatedPrice: number;
  estimatedTime: string;
  distance: string;
  packageType: string;
  status: 'pending' | 'accepted' | 'in-transit' | 'completed';
  createdAt: string;
  riderName?: string;
  riderRating?: number;
}

const demoDeliveries: DeliveryRequest[] = [
  {
    id: '1',
    pickupLocation: '123 Main St, San Francisco, CA',
    dropoffLocation: '456 Market St, San Francisco, CA',
    estimatedPrice: 25,
    estimatedTime: '15 mins',
    distance: '2.3 mi',
    packageType: 'Small Box',
    status: 'completed',
    createdAt: '2024-01-01 10:00 AM',
    riderName: 'Ahmed',
    riderRating: 4.9,
  },
  {
    id: '2',
    pickupLocation: '789 Oak Ave, Los Angeles, CA',
    dropoffLocation: '321 Elm St, Los Angeles, CA',
    estimatedPrice: 35,
    estimatedTime: '25 mins',
    distance: '4.1 mi',
    packageType: 'Medium Box',
    status: 'in-transit',
    createdAt: '2024-01-01 02:30 PM',
    riderName: 'Maria',
    riderRating: 4.8,
  },
  {
    id: '3',
    pickupLocation: '555 Pine Rd, New York, NY',
    dropoffLocation: '777 Cedar Ln, New York, NY',
    estimatedPrice: 45,
    estimatedTime: '35 mins',
    distance: '6.7 mi',
    packageType: 'Large Package',
    status: 'accepted',
    createdAt: '2024-01-01 03:15 PM',
    riderName: 'James',
    riderRating: 4.7,
  },
  {
    id: '4',
    pickupLocation: '222 Birch St, Austin, TX',
    dropoffLocation: '999 Maple Ave, Austin, TX',
    estimatedPrice: 28,
    estimatedTime: '18 mins',
    distance: '2.8 mi',
    packageType: 'Small Box',
    status: 'pending',
    createdAt: '2024-01-01 04:00 PM',
  },
  {
    id: '5',
    pickupLocation: '444 Spruce Dr, Denver, CO',
    dropoffLocation: '666 Ash St, Denver, CO',
    estimatedPrice: 32,
    estimatedTime: '22 mins',
    distance: '3.5 mi',
    packageType: 'Medium Box',
    status: 'completed',
    createdAt: '2024-01-01 05:10 PM',
    riderName: 'Sofia',
    riderRating: 4.9,
  },
];

export function DashboardDeliveryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredDeliveries = useMemo(() => {
    return demoDeliveries.filter((delivery) => {
      const matchesSearch =
        delivery.pickupLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        delivery.dropoffLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        delivery.packageType.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || delivery.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="text-xs font-semibold px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">⏳ Pending</span>;
      case 'accepted':
        return <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-800 rounded-full">✓ Accepted</span>;
      case 'in-transit':
        return <span className="text-xs font-semibold px-2 py-1 bg-purple-100 text-purple-800 rounded-full">🚚 In Transit</span>;
      case 'completed':
        return <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-800 rounded-full">✓ Completed</span>;
      default:
        return null;
    }
  };

  const stats = {
    total: demoDeliveries.length,
    pending: demoDeliveries.filter((d) => d.status === 'pending').length,
    inTransit: demoDeliveries.filter((d) => d.status === 'in-transit').length,
    completed: demoDeliveries.filter((d) => d.status === 'completed').length,
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Truck className="w-8 h-8 text-orange-600" />
            Delivery Management
          </h1>
          <p className="text-gray-600">Track and manage your deliveries</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Total Deliveries</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">In Transit</p>
                <p className="text-3xl font-bold text-purple-600">{stats.inTransit}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Completed</p>
                <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Search & Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search by pickup or dropoff location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
              </div>

              {/* Status Filters */}
              <div className="flex items-center gap-2 flex-wrap">
                <Filter className="w-5 h-5 text-gray-400" />
                <div className="flex gap-2 flex-wrap">
                  {['all', 'pending', 'accepted', 'in-transit', 'completed'].map((status) => (
                    <Button
                      key={status}
                      variant={statusFilter === status ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setStatusFilter(status)}
                      className={statusFilter === status ? 'bg-orange-600 hover:bg-orange-700' : ''}
                    >
                      {status === 'all'
                        ? 'All Status'
                        : status === 'pending'
                          ? '⏳ Pending'
                          : status === 'accepted'
                            ? '✓ Accepted'
                            : status === 'in-transit'
                              ? '🚚 In Transit'
                              : '✓ Completed'}
                    </Button>
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-auto">
                  Showing {filteredDeliveries.length} of {demoDeliveries.length} deliveries
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Deliveries List */}
        {filteredDeliveries.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {filteredDeliveries.map((delivery, index) => (
              <motion.div
                key={delivery.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                      {/* Route Info */}
                      <div className="md:col-span-2">
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-gray-900">Pickup</p>
                              <p className="text-sm text-gray-600">{delivery.pickupLocation}</p>
                            </div>
                          </div>
                          <div className="border-l-2 border-orange-200 ml-2.5 h-4" />
                          <div className="flex items-start gap-2">
                            <MapPin className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-gray-900">Dropoff</p>
                              <p className="text-sm text-gray-600">{delivery.dropoffLocation}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-gray-500">Package Type</p>
                          <p className="text-sm font-semibold text-gray-900">{delivery.packageType}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Distance</p>
                          <p className="text-sm font-semibold text-gray-900">{delivery.distance}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Est. Time</p>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-gray-600" />
                            <p className="text-sm font-semibold text-gray-900">{delivery.estimatedTime}</p>
                          </div>
                        </div>
                      </div>

                      {/* Status & Actions */}
                      <div className="flex flex-col gap-3 items-start md:items-end">
                        <div>{getStatusBadge(delivery.status)}</div>
                        <div className="text-right w-full md:w-auto">
                          <p className="text-xs text-gray-500">Estimated Price</p>
                          <p className="text-lg font-bold text-orange-600">${delivery.estimatedPrice}</p>
                        </div>
                        {delivery.riderName && (
                          <div className="text-right text-xs">
                            <p className="text-gray-600">Rider: <span className="font-semibold">{delivery.riderName}</span></p>
                            <p className="text-gray-600">Rating: <span className="font-semibold">⭐ {delivery.riderRating}</span></p>
                          </div>
                        )}
                        <Button className="w-full md:w-auto bg-orange-600 hover:bg-orange-700 text-sm">
                          {delivery.status === 'completed' ? 'View Details' : 'Track'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <Card className="flex items-center justify-center py-12">
            <CardContent className="text-center">
              <Truck className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No deliveries found matching your filters</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Back to Public Delivery */}
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Want to create a new delivery request?</p>
          <Link to={ROUTES.DELIVERIES}>
            <Button variant="outline">Browse Delivery Options</Button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
