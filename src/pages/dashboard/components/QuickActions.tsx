import { Link } from 'react-router-dom';
import { ShoppingBag, Briefcase, Truck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ROUTES } from '@/lib/constants/routes';

export function QuickActions() {
  const actions = [
    {
      icon: ShoppingBag,
      label: 'Browse Marketplace',
      description: 'Find products from trusted sellers',
      route: ROUTES.MARKETPLACE,
    },
    {
      icon: Briefcase,
      label: 'Book Services',
      description: 'Professional services at your fingertips',
      route: ROUTES.SERVICES,
    },
    {
      icon: Truck,
      label: 'Request Delivery',
      description: 'Fast and reliable parcel delivery',
      route: ROUTES.DELIVERIES,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {actions.map(({ icon: Icon, label, description, route }) => (
        <Link key={label} to={route}>
          <Card className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-orange-300 h-full">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full flex items-center justify-center">
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{label}</h3>
              <p className="text-sm text-gray-600">{description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
