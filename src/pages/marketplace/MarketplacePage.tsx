import { useState } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const categories = [
  'All Categories',
  'Electronics',
  'Fashion',
  'Home & Garden',
  'Vehicles',
  'Real Estate',
  'Jobs',
  'Services',
];

const mockListings = [
  {
    id: '1',
    title: 'iPhone 13 Pro Max',
    price: 850,
    location: 'Lagos, Nigeria',
    image: 'https://picsum.photos/400/300?random=1',
    category: 'Electronics',
    isNegotiable: true,
  },
  {
    id: '2',
    title: 'Designer Sofa Set',
    price: 1200,
    location: 'Abuja, Nigeria',
    image: 'https://picsum.photos/400/300?random=2',
    category: 'Home & Garden',
    isNegotiable: true,
  },
  {
    id: '3',
    title: 'Toyota Camry 2018',
    price: 8500,
    location: 'Port Harcourt',
    image: 'https://picsum.photos/400/300?random=3',
    category: 'Vehicles',
    isNegotiable: true,
  },
  {
    id: '4',
    title: 'MacBook Pro M1',
    price: 1400,
    location: 'Lagos, Nigeria',
    image: 'https://picsum.photos/400/300?random=4',
    category: 'Electronics',
    isNegotiable: true,
  },
];

export function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="heading-xl mb-2">Marketplace</h1>
          <p className="text-gray-600">Browse thousands of products from trusted sellers</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Button variant="outline" className="h-12 px-6">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </Button>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                className="h-12 w-12"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-5 w-5" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                className="h-12 w-12"
                onClick={() => setViewMode('list')}
              >
                <List className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {categories.map((category) => (
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

        {/* Listings Grid */}
        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-6`}>
          {mockListings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg line-clamp-1">{listing.title}</h3>
                  {listing.isNegotiable && (
                    <Badge variant="secondary" className="text-xs">Negotiable</Badge>
                  )}
                </div>
                <p className="text-2xl font-bold text-brand-red mb-2">${listing.price}</p>
                <p className="text-sm text-gray-600 mb-3">{listing.location}</p>
                <Button className="w-full bg-black hover:bg-gray-800">
                  View Details
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