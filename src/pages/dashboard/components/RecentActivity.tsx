import { ShoppingBag, Briefcase, Truck, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RECENT_ACTIVITY } from '../constants';

export function RecentActivity() {
  const getIcon = (type: string) => {
    const iconProps = 'h-5 w-5 text-black';
    switch (type) {
      case 'marketplace':
        return <ShoppingBag className={iconProps} />;
      case 'service':
        return <Briefcase className={iconProps} />;
      case 'delivery':
        return <Truck className={iconProps} />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {RECENT_ACTIVITY.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 flex items-center justify-center flex-shrink-0">
                {getIcon(activity.type)}
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
  );
}
