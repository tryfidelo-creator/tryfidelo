import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Package, Star, ArrowUpRight } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const orders = [
  { id: '1', item: 'iPhone 13 Pro Max', seller: 'TechStore', price: 850, status: 'delivered', date: '2 days ago', rating: 5 },
  { id: '2', item: 'MacBook Pro M1', seller: 'ElectroHub', price: 1400, status: 'in_transit', date: 'Today', rating: null },
  { id: '3', item: 'Sony Camera', seller: 'PhotoPro', price: 650, status: 'pending', date: '5 days ago', rating: 4 },
];

const savedItems = [
  { id: '1', name: 'Samsung Galaxy S22', price: 799, seller: 'MobileWorld', saved: true },
  { id: '2', name: 'iPad Air', price: 599, seller: 'TechStore', saved: true },
  { id: '3', name: 'AirPods Pro', price: 249, seller: 'AudioGeek', saved: true },
];

function DashStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { label: 'Total Orders', value: '12', icon: '📦', change: '+3' },
        { label: 'Saved Items', value: '8', icon: '❤️', change: '+2' },
        { label: 'Spent', value: '$3,450', icon: '💳', change: '+₦2,500' },
        { label: 'Ratings Given', value: '11', icon: '⭐', change: '+4' },
      ].map((stat, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">{stat.icon}</span>
                <span className="text-blue-600 text-sm font-medium flex items-center gap-1">
                  <ArrowUpRight className="w-4 h-4" />
                  {stat.change}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

function OrdersSection({ orders }: { orders: any[] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'in_transit':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
      <Card className="border-2 border-gray-200">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Package className="w-6 h-6 text-blue-600" />
                Recent Orders
              </CardTitle>
              <p className="text-sm text-gray-600 mt-2">{orders.length} total orders</p>
            </div>
            <Button variant="outline" className="border-blue-200">View All</Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {orders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{order.item}</h4>
                    <p className="text-sm text-gray-600">from {order.seller}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">${order.price}</p>
                    <p className="text-xs text-gray-500">{order.date}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <Badge className={`${getStatusColor(order.status)} capitalize`}>
                    {order.status.replace('_', ' ')}
                  </Badge>
                  
                  {order.rating ? (
                    <div className="flex items-center gap-1">
                      {[...Array(order.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  ) : (
                    <Button size="sm" variant="outline" className="text-xs">Leave Review</Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function SavedItemsSection({ items }: { items: any[] }) {
  const [saved] = useState(items);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
      <Card className="border-2 border-gray-200">
        <CardHeader className="bg-gradient-to-r from-rose-50 to-pink-50 border-b">
          <div>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Heart className="w-6 h-6 text-rose-600" />
              Saved Items
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">{saved.length} items saved</p>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {saved.length === 0 ? (
            <div className="text-center py-8">
              <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">No saved items yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {saved.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-2 border-gray-200 rounded-lg p-4 hover:border-rose-400 transition-colors group"
                >
                  <div className="mb-3">
                    <h4 className="font-semibold text-gray-900 group-hover:text-rose-600 transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-600">{item.seller}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-gray-900">${item.price}</p>
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
                    >
                      View
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function RecentActivity() {
  const activities = [
    { event: 'Order delivered: iPhone 13 Pro Max', time: '2 days ago', icon: '✅' },
    { event: 'You rated TechStore 5 stars', time: '2 days ago', icon: '⭐' },
    { event: 'Order shipped: MacBook Pro M1', time: 'Today', icon: '📦' },
    { event: 'New message from ElectroHub', time: '1 hour ago', icon: '💬' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
      <Card className="border-2 border-gray-200">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b">
          <CardTitle className="text-xl">Activity</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {activities.map((activity, idx) => (
              <div key={idx} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <span className="text-xl">{activity.icon}</span>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.event}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function CustomerDashboard() {
  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-gray-900">Buyer Dashboard</h1>
          <p className="text-gray-600 mt-1">View your orders, saved items, and activity</p>
        </motion.div>

        <DashStats />
        <OrdersSection orders={orders} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SavedItemsSection items={savedItems} />
          </div>
          <RecentActivity />
        </div>
      </div>
    </DashboardLayout>
  );
}