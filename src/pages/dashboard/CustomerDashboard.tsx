import { Link } from 'react-router-dom';
import { ShoppingBag, Briefcase, Truck, MessageSquare, TrendingUp } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants/routes';

const recentActivity = [
  { id: '1', type: 'marketplace', title: 'Inquired about iPhone 13 Pro', date: '2 hours ago' },
  { id: '2', type: 'service', title: 'Booked House Cleaning Service', date: '1 day ago' },
  { id: '3', type: 'delivery', title: 'Requested parcel delivery', date: '2 days ago' },
];

const activeChats = [
  { id: '1', name: 'John Seller', message: 'I can do $800 for the phone', time: '10 min ago', unread: 2 },
  { id: '2', name: 'Sarah Cleaner', message: 'I\'ll be there at 2 PM', time: '1 hour ago', unread: 0 },
];

export function CustomerDashboard() {
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="heading-xl mb-2">Welcome back, Customer!</h1>
          <p className="text-gray-600">Here's what's happening with your account</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link to={ROUTES.MARKETPLACE}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-brand-yellow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-yellow-orange rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Browse Marketplace</h3>
                <p className="text-sm text-gray-600">Find products from trusted sellers</p>
              </CardContent>
            </Card>
          </Link>

          <Link to={ROUTES.SERVICES}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-brand-yellow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-yellow-orange rounded-full flex items-center justify-center">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Book Services</h3>
                <p className="text-sm text-gray-600">Professional services at your fingertips</p>
              </CardContent>
            </Card>
          </Link>

          <Link to={ROUTES.DELIVERIES}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-brand-yellow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-yellow-orange rounded-full flex items-center justify-center">
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Request Delivery</h3>
                <p className="text-sm text-gray-600">Fast and reliable parcel delivery</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-brand-yellow flex items-center justify-center flex-shrink-0">
                        {activity.type === 'marketplace' && <ShoppingBag className="h-5 w-5 text-black" />}
                        {activity.type === 'service' && <Briefcase className="h-5 w-5 text-black" />}
                        {activity.type === 'delivery' && <Truck className="h-5 w-5 text-black" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{activity.title}</h4>
                        <p className="text-sm text-gray-600">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Active Chats */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Active Chats
                  </span>
                  <Link to={ROUTES.MESSAGES}>
                    <Button variant="ghost" size="sm">View All</Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeChats.map((chat) => (
                    <div key={chat.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-sm truncate">{chat.name}</h4>
                          {chat.unread > 0 && (
                            <span className="bg-brand-red text-white text-xs rounded-full px-2 py-0.5">
                              {chat.unread}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 truncate">{chat.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{chat.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}