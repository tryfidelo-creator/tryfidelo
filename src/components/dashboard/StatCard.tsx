import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
  delay?: number;
}

export function StatCard({ title, value, change, icon, delay = 0 }: StatCardProps) {
  const isPositive = change?.startsWith('+');
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="border-2 border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center text-orange-600">
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl md:text-3xl font-bold text-gray-900">{value}</div>
          {change && (
            <p className={`text-sm mt-2 font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className="w-3 h-3 inline mr-1" />
              {change} from last month
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
