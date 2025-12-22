import { Link } from 'react-router-dom';
import { User, Shield, Lock, LogOut, Star, AlertCircle } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/lib/constants/routes';

export function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  const settings = [
    {
      icon: User,
      label: 'Personal info',
      description: 'Update your personal details',
      path: '/profile/personal-info',
      color: 'bg-blue-100',
    },
    {
      icon: Shield,
      label: 'Security',
      description: 'Manage your security settings',
      path: '/profile/security',
      color: 'bg-green-100',
    },
    {
      icon: Lock,
      label: 'Privacy & Data',
      description: 'Control your privacy settings',
      path: '/profile/privacy-data',
      color: 'bg-purple-100',
    },
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header with User Info */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="heading-xl mb-2">Account Settings</h1>
              <p className="text-gray-600">Manage your account and preferences</p>
            </div>
            <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full">
              <Star className="h-4 w-4 text-brand-yellow fill-brand-yellow" />
              <span className="text-sm font-semibold">{(user as any)?.rating || '5.0'} Rating</span>
            </div>
          </div>

          {/* User Profile Card */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8">
              <div className="flex items-center gap-6 mb-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage 
                    src={`https://i.pravatar.cc/150?u=${user?.email}`}
                    alt={user?.name}
                  />
                  <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold mb-1">{user?.name}</h2>
                  <p className="text-gray-600 mb-2">{user?.email}</p>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                      ✓ Verified
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                      {user?.role === 'customer' && 'Buyer'}
                      {user?.role === 'seller' && 'Seller'}
                      {user?.role === 'service_provider' && 'Service Provider'}
                      {user?.role === 'delivery_rider' && 'Delivery Rider'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {settings.map((setting) => {
            const Icon = setting.icon;
            return (
              <Link key={setting.path} to={setting.path}>
                <Card className="h-full border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className={`${setting.color} p-4 rounded-full mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6 text-gray-800" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{setting.label}</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-1">{setting.description}</p>
                    <span className="text-xs text-brand-yellow font-semibold group-hover:translate-x-1 transition-transform">
                      Go →
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Account Status Section */}
        <Card className="mb-8 border-l-4 border-l-brand-yellow bg-yellow-50 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-brand-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Account Status</h3>
                <p className="text-sm text-gray-600 mb-3">Your account is in good standing. Keep your information up to date to avoid any issues.</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Email verified
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Phone verified
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    ID verified
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button 
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign out of all devices
        </Button>
      </div>
    </DashboardLayout>
  );
}