import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { ShoppingBag, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/constants/routes';

interface MarketplaceItem {
  id: string;
  title: string;
  price: number;
  category: string;
  condition: 'new' | 'used';
  location: string;
  image: string;
  isFeatured: boolean;
}

const demoMarketplaceItems: MarketplaceItem[] = [
  {
    id: '1',
    title: 'Gaming Laptop',
    price: 950,
    category: 'Electronics',
    condition: 'used',
    location: 'San Francisco, CA',
    image: 'https://images.unsplash.com/photo-1591165431922-f21d084e2e30?w=400&h=300&fit=crop',
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Mountain Bike',
    price: 450,
    category: 'Sports & Outdoors',
    condition: 'used',
    location: 'Denver, CO',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    isFeatured: false,
  },
  {
    id: '3',
    title: 'Vintage Camera',
    price: 320,
    category: 'Photography',
    condition: 'new',
    location: 'Portland, OR',
    image: 'https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=400&h=300&fit=crop',
    isFeatured: true,
  },
  {
    id: '4',
    title: 'Designer Handbag',
    price: 580,
    category: 'Fashion',
    condition: 'used',
    location: 'New York, NY',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop',
    isFeatured: false,
  },
  {
    id: '5',
    title: 'Acoustic Guitar',
    price: 280,
    category: 'Music',
    condition: 'used',
    location: 'Austin, TX',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=300&fit=crop',
    isFeatured: false,
  },
];

export function DashboardMarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewFeaturedOnly, setViewFeaturedOnly] = useState(false);

  const filteredItems = useMemo(() => {
    return demoMarketplaceItems.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchesFeatured = !viewFeaturedOnly || item.isFeatured;

      return matchesSearch && matchesCategory && matchesFeatured;
    });
  }, [searchQuery, selectedCategory, viewFeaturedOnly]);

  const categories = ['All', ...new Set(demoMarketplaceItems.map((item) => item.category))];

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
            <ShoppingBag className="w-8 h-8 text-orange-600" />
            Marketplace
          </h1>
          <p className="text-gray-600">Browse and manage marketplace listings</p>
        </motion.div>

        {/* Search & Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search by title or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
              </div>

              {/* Filters */}
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

              {/* Featured Filter */}
              <div className="flex items-center gap-2">
                <Button
                  variant={viewFeaturedOnly ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewFeaturedOnly(!viewFeaturedOnly)}
                  className={viewFeaturedOnly ? 'bg-orange-600 hover:bg-orange-700' : ''}
                >
                  ⭐ Featured Only
                </Button>
                <span className="text-sm text-gray-600">
                  Showing {filteredItems.length} of {demoMarketplaceItems.length} items
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Listings Grid */}
        {filteredItems.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    {item.isFeatured && (
                      <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold">
                        ⭐ Featured
                      </div>
                    )}
                    <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs">
                      {item.condition === 'new' ? '🆕 New' : '♻️ Used'}
                    </div>
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.location}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-orange-600">${item.price}</span>
                      <span className="text-sm bg-gray-100 px-2 py-1 rounded">{item.category}</span>
                    </div>
                    <Button className="w-full bg-orange-600 hover:bg-orange-700">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <Card className="flex items-center justify-center py-12">
            <CardContent className="text-center">
              <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No items found matching your filters</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setViewFeaturedOnly(false);
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Back to Public Marketplace */}
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Want to see the public marketplace?</p>
          <Link to={ROUTES.MARKETPLACE}>
            <Button variant="outline">Browse Public Marketplace</Button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
