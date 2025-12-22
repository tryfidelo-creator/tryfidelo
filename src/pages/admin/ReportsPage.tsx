import { motion } from 'framer-motion';
import { DollarSign, Users, ShoppingBag, Briefcase, Truck } from 'lucide-react';
import { AdminLayout } from '@/components/dashboard/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const revenueData = [
  { month: 'Jan', marketplace: 1200, services: 800, delivery: 400 },
  { month: 'Feb', marketplace: 1500, services: 950, delivery: 500 },
  { month: 'Mar', marketplace: 1800, services: 1100, delivery: 600 },
  { month: 'Apr', marketplace: 2100, services: 1300, delivery: 700 },
  { month: 'May', marketplace: 2400, services: 1500, delivery: 800 },
  { month: 'Jun', marketplace: 2800, services: 1700, delivery: 950 },
];

export function ReportsPage() {
  const totalRevenue = revenueData.reduce((sum, month) => 
    sum + month.marketplace + month.services + month.delivery, 0
  );

  const marketplaceRevenue = revenueData.reduce((sum, month) => sum + month.marketplace, 0);
  const servicesRevenue = revenueData.reduce((sum, month) => sum + month.services, 0);
  const deliveryRevenue = revenueData.reduce((sum, month) => sum + month.delivery, 0);

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="heading-xl mb-2">Earnings Reports</h1>
            <p className="text-gray-600">Platform revenue and performance analytics</p>
          </div>

          {/* Period Filter */}
          <div className="mb-8">
            <Tabs defaultValue="6months">
              <TabsList>
                <TabsTrigger value="1month">Last Month</TabsTrigger>
                <TabsTrigger value="3months">Last 3 Months</TabsTrigger>
                <TabsTrigger value="6months">Last 6 Months</TabsTrigger>
                <TabsTrigger value="1year">Last Year</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Revenue Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Total Revenue</span>
                  <DollarSign className="h-5 w-5 text-brand-yellow" />
                </div>
                <p className="text-3xl font-bold">${totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">+12% from last period</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Marketplace</span>
                  <ShoppingBag className="h-5 w-5 text-brand-orange" />
                </div>
                <p className="text-3xl font-bold">${marketplaceRevenue.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">Fixed ad fees</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Services</span>
                  <Briefcase className="h-5 w-5 text-brand-red" />
                </div>
                <p className="text-3xl font-bold">${servicesRevenue.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">10% commission</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Delivery</span>
                  <Truck className="h-5 w-5 text-gray-600" />
                </div>
                <p className="text-3xl font-bold">${deliveryRevenue.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">7% commission</p>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Chart */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {revenueData.map((month, index) => {
                  const total = month.marketplace + month.services + month.delivery;
                  const marketplacePercent = (month.marketplace / total) * 100;
                  const servicesPercent = (month.services / total) * 100;
                  const deliveryPercent = (month.delivery / total) * 100;

                  return (
                    <motion.div
                      key={month.month}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-sm font-semibold w-12">{month.month}</span>
                        <div className="flex-1 h-8 bg-gray-100 rounded-full overflow-hidden flex">
                          <div
                            className="bg-brand-yellow h-full flex items-center justify-center text-xs font-semibold text-black"
                            style={{ width: `${marketplacePercent}%` }}
                          >
                            {marketplacePercent > 15 && `$${month.marketplace}`}
                          </div>
                          <div
                            className="bg-brand-orange h-full flex items-center justify-center text-xs font-semibold text-white"
                            style={{ width: `${servicesPercent}%` }}
                          >
                            {servicesPercent > 15 && `$${month.services}`}
                          </div>
                          <div
                            className="bg-brand-red h-full flex items-center justify-center text-xs font-semibold text-white"
                            style={{ width: `${deliveryPercent}%` }}
                          >
                            {deliveryPercent > 15 && `$${month.delivery}`}
                          </div>
                        </div>
                        <span className="text-sm font-bold w-20 text-right">${total}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-brand-yellow rounded" />
                  <span className="text-sm">Marketplace</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-brand-orange rounded" />
                  <span className="text-sm">Services</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-brand-red rounded" />
                  <span className="text-sm">Delivery</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Growth */}
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Users className="h-8 w-8 mx-auto mb-2 text-brand-yellow" />
                  <p className="text-2xl font-bold">850</p>
                  <p className="text-sm text-gray-600">Customers</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <ShoppingBag className="h-8 w-8 mx-auto mb-2 text-brand-orange" />
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-sm text-gray-600">Sellers</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Briefcase className="h-8 w-8 mx-auto mb-2 text-brand-red" />
                  <p className="text-2xl font-bold">89</p>
                  <p className="text-sm text-gray-600">Providers</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Truck className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                  <p className="text-2xl font-bold">45</p>
                  <p className="text-sm text-gray-600">Riders</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  );
}