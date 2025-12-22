import { Link } from 'react-router-dom';
import { Users, DollarSign, ShoppingBag, AlertCircle, CheckCircle, FileText, Wallet, Package } from 'lucide-react';
import { AdminLayout } from '@/components/dashboard/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ROUTES } from '@/lib/constants/routes';

const pendingApprovals = [
  { id: '1', type: 'seller', name: 'John Smith', email: 'john@example.com', date: '2 hours ago' },
  { id: '2', type: 'provider', name: 'Sarah Johnson', email: 'sarah@example.com', date: '5 hours ago' },
];

const recentDisputes = [
  { id: '1', type: 'marketplace', title: 'Product not as described', status: 'pending', date: '1 day ago' },
  { id: '2', type: 'delivery', title: 'Late delivery complaint', status: 'resolved', date: '2 days ago' },
];

export function AdminDashboard() {
  const totalUsers = 1250;
  const totalRevenue = 45678;
  const activeListings = 3456;
  const pendingCount = 12;

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="heading-xl mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Platform overview and management</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Link to={ROUTES.ADMIN_APPROVALS}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-brand-yellow">
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-12 w-12 mx-auto mb-3 text-brand-yellow" />
                <h3 className="font-semibold mb-1">User Approvals</h3>
                <p className="text-sm text-gray-600">Review new registrations</p>
              </CardContent>
            </Card>
          </Link>

          <Link to={ROUTES.ADMIN_WALLET}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-brand-yellow">
              <CardContent className="p-6 text-center">
                <Wallet className="h-12 w-12 mx-auto mb-3 text-brand-orange" />
                <h3 className="font-semibold mb-1">Wallet Management</h3>
                <p className="text-sm text-gray-600">Manage user credits</p>
              </CardContent>
            </Card>
          </Link>

          <Link to={ROUTES.DELIVERY_REQUESTS}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-brand-yellow">
              <CardContent className="p-6 text-center">
                <Package className="h-12 w-12 mx-auto mb-3 text-blue-600" />
                <h3 className="font-semibold mb-1">Delivery Requests</h3>
                <p className="text-sm text-gray-600">Manage all deliveries</p>
              </CardContent>
            </Card>
          </Link>

          <Link to={ROUTES.ADMIN_REPORTS}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-brand-yellow">
              <CardContent className="p-6 text-center">
                <FileText className="h-12 w-12 mx-auto mb-3 text-brand-red" />
                <h3 className="font-semibold mb-1">Reports</h3>
                <p className="text-sm text-gray-600">View earnings & analytics</p>
              </CardContent>
            </Card>
          </Link>

          <Link to={ROUTES.ADMIN_DISPUTES}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-brand-yellow">
              <CardContent className="p-6 text-center">
                <AlertCircle className="h-12 w-12 mx-auto mb-3 text-gray-600" />
                <h3 className="font-semibold mb-1">Disputes</h3>
                <p className="text-sm text-gray-600">Resolve user issues</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Total Users</span>
                <Users className="h-5 w-5 text-brand-yellow" />
              </div>
              <p className="text-3xl font-bold">{totalUsers.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Total Revenue</span>
                <DollarSign className="h-5 w-5 text-brand-orange" />
              </div>
              <p className="text-3xl font-bold">${totalRevenue.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Active Listings</span>
                <ShoppingBag className="h-5 w-5 text-brand-red" />
              </div>
              <p className="text-3xl font-bold">{activeListings.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">Across platform</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Pending Actions</span>
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <p className="text-3xl font-bold">{pendingCount}</p>
              <p className="text-xs text-gray-500 mt-1">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Approvals */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Pending Approvals</CardTitle>
                <Link to={ROUTES.ADMIN_APPROVALS}>
                  <Button variant="outline" size="sm">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingApprovals.map((approval) => (
                  <div key={approval.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{approval.name}</h4>
                      <p className="text-sm text-gray-600 mb-1">{approval.email}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{approval.type}</Badge>
                        <span className="text-xs text-gray-500">{approval.date}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline">Reject</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Disputes */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Disputes</CardTitle>
                <Link to={ROUTES.ADMIN_DISPUTES}>
                  <Button variant="outline" size="sm">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDisputes.map((dispute) => (
                  <div key={dispute.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold mb-1">{dispute.title}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{dispute.type}</Badge>
                          <span className="text-xs text-gray-500">{dispute.date}</span>
                        </div>
                      </div>
                      <Badge variant={dispute.status === 'resolved' ? 'default' : 'secondary'}>
                        {dispute.status}
                      </Badge>
                    </div>
                    {dispute.status === 'pending' && (
                      <Button size="sm" className="mt-2">Review</Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}