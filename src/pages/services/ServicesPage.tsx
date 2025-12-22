import { useState } from 'react';
import { Search, Star, MapPin } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const serviceCategories = [
  'All Services',
  'Home Services',
  'Beauty & Wellness',
  'Tutoring',
  'IT & Tech',
  'Events',
  'Professional',
];

const mockServices = [
  {
    id: '1',
    title: 'Professional House Cleaning',
    provider: 'Sarah Johnson',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    rating: 4.8,
    reviews: 124,
    basePrice: 50,
    location: 'Lagos',
    category: 'Home Services',
  },
  {
    id: '2',
    title: 'Mobile App Development',
    provider: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?u=john',
    rating: 4.9,
    reviews: 89,
    basePrice: 500,
    location: 'Abuja',
    category: 'IT & Tech',
  },
  {
    id: '3',
    title: 'Wedding Photography',
    provider: 'Mike Chen',
    avatar: 'https://i.pravatar.cc/150?u=mike',
    rating: 5.0,
    reviews: 156,
    basePrice: 800,
    location: 'Port Harcourt',
    category: 'Events',
  },
  {
    id: '4',
    title: 'Hair Styling & Makeup',
    provider: 'Emma Wilson',
    avatar: 'https://i.pravatar.cc/150?u=emma',
    rating: 4.7,
    reviews: 203,
    basePrice: 75,
    location: 'Lagos',
    category: 'Beauty & Wellness',
  },
];

export function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Services');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="heading-xl mb-2">Professional Services</h1>
          <p className="text-gray-600">Book trusted service providers for all your needs</p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {serviceCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockServices.map((service) => (
            <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={service.avatar} alt={service.provider} />
                    <AvatarFallback>{service.provider[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{service.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{service.provider}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-brand-yellow text-brand-yellow" />
                        <span className="text-sm font-semibold ml-1">{service.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({service.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  {service.location}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Starting from</p>
                    <p className="text-2xl font-bold text-brand-red">${service.basePrice}</p>
                  </div>
                  <Badge variant="secondary">Negotiable</Badge>
                </div>

                <Button className="w-full mt-4 bg-black hover:bg-gray-800">
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}