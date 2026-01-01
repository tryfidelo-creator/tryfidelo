import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Plus, Package, TrendingUp, Zap, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ListingCard } from '@/components/dashboard/ListingCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ROUTES } from '@/lib/constants/routes';
import { getTimeBasedGreeting } from '@/lib/utils/greeting';
import { toast } from 'sonner';

const initialMyListings = [
  { id: '1', title: 'iPhone 13 Pro Max', price: 850, status: 'active' as const, views: 124, inquiries: 8 },
  { id: '2', title: 'MacBook Pro M1', price: 1400, status: 'active' as const, views: 89, inquiries: 5 },
  { id: '3', title: 'Sony Camera', price: 650, status: 'paused' as const, views: 45, inquiries: 2 },
];

export function SellerDashboard() {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState({ greeting: 'Welcome back' });
  const [myListings, setMyListings] = useState(initialMyListings);
  const walletBalance = 245.50;
  const totalEarnings = 5240.00;
  const monthlyRevenue = 1850.50;
  const activeListings = myListings.filter(l => l.status === 'active').length;

  useEffect(() => {
    setGreeting(getTimeBasedGreeting());
  }, []);

  const handleEditListing = (id: string) => {
    const listing = myListings.find(l => l.id === id);
    if (listing) {
      toast.info(`Editing "${listing.title}"...`);
      navigate(ROUTES.CREATE_LISTING);
    }
  };

  const handleDeleteListing = (id: string) => {
    const listing = myListings.find(l => l.id === id);
    if (listing) {
      setMyListings(myListings.filter(l => l.id !== id));
      toast.success(`"${listing.title}" has been deleted!`);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{greeting.greeting}, Seller!</h1>
          <p className="text-gray-600">Manage your listings and track your sales performance</p>
        </motion.div>

        {walletBalance < 300 && (
          <Alert className="border-2 border-orange-200 bg-orange-50">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            <AlertDescription className="text-orange-700 font-medium">
              Your wallet balance is running low. Top up to keep your listings active.
              <Link to={ROUTES.WALLET} className="ml-2 font-semibold underline">Top up now →</Link>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="Wallet Balance"
            value={`$${walletBalance.toFixed(2)}`}
            change="-5%"
            icon={<Plus className="w-5 h-5" />}
            delay={0}
          />
          <StatCard
            title="Total Earnings"
            value={`$${totalEarnings.toFixed(2)}`}
            change="+12.5%"
            icon={<TrendingUp className="w-5 h-5" />}
            delay={0.1}
          />
          <StatCard
            title="Monthly Revenue"
            value={`$${monthlyRevenue.toFixed(2)}`}
            change="+8.2%"
            icon={<Zap className="w-5 h-5" />}
            delay={0.2}
          />
          <StatCard
            title="Active Listings"
            value={activeListings}
            change="+2"
            icon={<Package className="w-5 h-5" />}
            delay={0.3}
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="border-2 border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
              <div>
                <CardTitle className="text-2xl">My Listings</CardTitle>
                <p className="text-sm text-gray-600 mt-1">{myListings.length} total • {activeListings} active</p>
              </div>
              <Button
                onClick={() => navigate(ROUTES.CREATE_LISTING)}
                className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white font-semibold rounded-lg h-10"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Listing
              </Button>
            </CardHeader>
            <CardContent>
              {myListings.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No listings yet</p>
                  <Button
                    onClick={() => navigate(ROUTES.CREATE_LISTING)}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Create Your First Listing
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myListings.map((listing) => (
                    <ListingCard
                      key={listing.id}
                      item={listing}
                      onEdit={handleEditListing}
                      onDelete={handleDeleteListing}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="border-2 border-gray-200">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { event: 'New inquiry on iPhone 13 Pro Max', time: '2 hours ago' },
                  { event: 'Listing "MacBook Pro M1" promoted', time: '5 hours ago' },
                  { event: 'Payment received: $425.00', time: '1 day ago' },
                ].map((activity, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-gray-700">{activity.event}</span>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}