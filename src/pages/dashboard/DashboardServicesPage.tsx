import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Briefcase, Search, Filter, Star, MapPin, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/constants/routes';

interface Service {
  id: string;
  title: string;
  provider: string;
  rating: number;
  reviews: number;
  pricePerHour: number;
  category: string;
  location: string;
  image: string;
  isVerified: boolean;
  availability: 'available' | 'busy' | 'offline';
}

const demoServices: Service[] = [
  {
    id: '1',
    title: 'Professional Photography',
    provider: 'John Studios',
    rating: 4.9,
    reviews: 156,
    pricePerHour: 85,
    category: 'Photography',
    location: 'Los Angeles, CA',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
    isVerified: true,
    availability: 'available',
  },
  {
    id: '2',
    title: 'Web Development',
    provider: 'Tech Solutions',
    rating: 4.8,
    reviews: 98,
    pricePerHour: 120,
    category: 'IT Services',
    location: 'San Francisco, CA',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
    isVerified: true,
    availability: 'available',
  },
  {
    id: '3',
    title: 'House Cleaning',
    provider: 'CleanPro',
    rating: 4.7,
    reviews: 234,
    pricePerHour: 45,
    category: 'Home Services',
    location: 'Austin, TX',
    image: 'https://images.unsplash.com/photo-1563453392212-d0a3fb1ce715?w=400&h=300&fit=crop',
    isVerified: true,
    availability: 'busy',
  },
  {
    id: '4',
    title: 'Personal Training',
    provider: 'FitLife Coaching',
    rating: 4.9,
    reviews: 167,
    pricePerHour: 65,
    category: 'Fitness',
    location: 'New York, NY',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
    isVerified: false,
    availability: 'available',
  },
  {
    id: '5',
    title: 'Graphic Design',
    provider: 'Creative Studio',
    rating: 4.8,
    reviews: 142,
    pricePerHour: 95,
    category: 'Design',
    location: 'Seattle, WA',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
    isVerified: true,
    availability: 'offline',
  },
];

export function DashboardServicesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

  const filteredServices = useMemo(() => {
    return demoServices.filter((service) => {
      const matchesSearch =
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || service.category === selectedCategory;
      const matchesAvailability =
        availabilityFilter === 'all' || service.availability === availabilityFilter;

      return matchesSearch && matchesCategory && matchesAvailability;
    });
  }, [searchQuery, selectedCategory, availabilityFilter]);

  const categories = ['All', ...new Set(demoServices.map((service) => service.category))];

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case 'available':
        return <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-800 rounded-full">🟢 Available</span>;
      case 'busy':
        return <span className="text-xs font-semibold px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">🟡 Busy</span>;
      case 'offline':
        return <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-800 rounded-full">⚫ Offline</span>;
      default:
        return null;
    }
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
            <Briefcase className="w-8 h-8 text-orange-600" />
            Services
          </h1>
          <p className="text-gray-600">Find and manage professional services</p>
        </motion.div>

        {/* Search & Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search services, providers, or locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2 items-center">
                <Filter className="w-5 h-5 text-gray-400" />
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={selectedCategory === category ? 'bg-orange-600 hover:bg-orange-700' : ''}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Availability Filter */}
              <div className="flex items-center gap-2">
                <div className="flex gap-2">
                  {['all', 'available', 'busy', 'offline'].map((status) => (
                    <Button
                      key={status}
                      variant={availabilityFilter === status ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setAvailabilityFilter(status)}
                      className={availabilityFilter === status ? 'bg-orange-600 hover:bg-orange-700' : ''}
                    >
                      {status === 'all'
                        ? 'All Status'
                        : status === 'available'
                          ? '🟢 Available'
                          : status === 'busy'
                            ? '🟡 Busy'
                            : '⚫ Offline'}
                    </Button>
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-auto">
                  Showing {filteredServices.length} of {demoServices.length} services
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                  <div className="relative">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      {getAvailabilityBadge(service.availability)}
                    </div>
                    {service.isVerified && (
                      <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        ✓ Verified
                      </div>
                    )}
                  </div>
                  <CardContent className="pt-4 flex-1 flex flex-col">
                    <h3 className="font-semibold text-lg mb-1 line-clamp-2">{service.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{service.provider}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(service.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-semibold">{service.rating}</span>
                      <span className="text-sm text-gray-500">({service.reviews})</span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1 mb-3 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {service.location}
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-1 text-lg font-bold text-orange-600 mb-4">
                      <DollarSign className="w-5 h-5" />
                      {service.pricePerHour}/hour
                    </div>

                    <div className="flex gap-2 mt-auto">
                      <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
                        Book Now
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <Card className="flex items-center justify-center py-12">
            <CardContent className="text-center">
              <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No services found matching your filters</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setAvailabilityFilter('all');
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Back to Public Services */}
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Want to see the public services?</p>
          <Link to={ROUTES.SERVICES}>
            <Button variant="outline">Browse Public Services</Button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
