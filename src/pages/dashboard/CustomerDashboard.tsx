import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { QuickActions } from './components/QuickActions';
import { RecentActivity } from './components/RecentActivity';
import { ActiveChats } from './components/ActiveChats';
import { getTimeBasedGreeting } from '@/lib/utils/greeting';

export function CustomerDashboard() {
  const greeting = useMemo(() => getTimeBasedGreeting(), []);

  return (
    <DashboardLayout>
      <div className="p-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Welcome Section */}
          <div>
            <h1 className="heading-xl mb-2">{greeting.greeting}, Customer!</h1>
            <p className="text-gray-600">{greeting.message}</p>
          </div>

          {/* Quick Actions */}
          <QuickActions />

          {/* Activity and Chats Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RecentActivity />
            </div>
            <div>
              <ActiveChats />
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}