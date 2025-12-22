import { Link, useNavigate } from 'react-router-dom';
import { Plus, Package, MessageSquare, DollarSign, AlertCircle } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ROUTES } from '@/lib/constants/routes';

const myListings = [
  { id: '1', title: 'iPhone 13 Pro Max', price: 850, status: 'active', views: 124, inquiries: 8 },
  { id: '2', title: 'MacBook Pro M1', price: 1400, status: 'active', views: 89, inquiries: 5 },
  { id: '3', title: 'Sony Camera', price: 650, status: 'paused', views: 45, inquiries: 2 },
];

export function SellerDashboard() {
  const navigate = useNavigate();
  const walletBalance = 245.50;
  const dailyAdFee = 5;
  const daysRemaining = Math.floor(walletBalance / dailyAdFee);

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="heading-xl mb-2">Seller Dashboard</h1>
          <p className="text-gray-600">Manage your listings and track performance</p>
        </div>

        {/* Wallet Alert */}
        {daysRemaining < 10 && (
          <Alert className="mb-6 border-brand-orange bg-orange-50">
            <AlertCircle className="h-4 w-4 text-brand-orange" />
            <AlertDescription className="text-brand-orange">
              Your wallet balance is low. You have approximately {daysRemaining} days of ad coverage remaining.
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
              <p className="text-xs text-gray-500 mt-1">~{daysRemaining} days coverage</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Active Listings</span>
                <Package className="h-5 w-5 text-brand-orange" />
              </div>
              <p className="text-3xl font-bold">{myListings.filter(l => l.status === 'active').length}</p>
              <p className="text-xs text-gray-500 mt-1">Total: {myListings.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Total Views</span>
                <Package className="h-5 w-5 text-brand-red" />
              </div>
              <p className="text-3xl font-bold">{myListings.reduce((sum, l) => sum + l.views, 0)}</p>
              <p className="text-xs text-gray-500 mt-1">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Inquiries</span>
                <MessageSquare className="h-5 w-5 text-gray-600" />
              </div>
              <p className="text-3xl font-bold">{myListings.reduce((sum, l) => sum + l.inquiries, 0)}</p>
              <p className="text-xs text-gray-500 mt-1">Active chats</p>
            </CardContent>
          </Card>
        </div>

        {/* My Listings */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>My Listings</CardTitle>
              <Button 
                onClick={() => navigate(ROUTES.CREATE_LISTING)}
                className="bg-brand-yellow text-black hover:bg-brand-orange"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Listing
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myListings.map((listing) => (
                <div key={listing.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-20 h-20 bg-gray-300 rounded-lg flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-lg">{listing.title}</h4>
                        <p className="text-2xl font-bold text-brand-red">${listing.price}</p>
                      </div>
                      <Badge variant={listing.status === 'active' ? 'default' : 'secondary'}>
                        {listing.status}
                      </Badge>
                    </div>
                    <div className="flex gap-6 text-sm text-gray-600">
                      <span>{listing.views} views</span>
                      <span>{listing.inquiries} inquiries</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">
                      {listing.status === 'active' ? 'Pause' : 'Activate'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}