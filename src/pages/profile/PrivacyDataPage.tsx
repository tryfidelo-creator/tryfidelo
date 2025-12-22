import { Link, useNavigate } from 'react-router-dom';
import { Eye, Bell, Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { ROUTES } from '@/lib/constants/routes';

export function PrivacyDataPage() {
  const navigate = useNavigate();
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mb-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Profile
          </Button>
          <h1 className="heading-xl mb-2">Privacy & Data</h1>
          <p className="text-gray-600">Control your privacy settings and data preferences</p>
        </div>

        {/* Privacy Section */}
        <Card className="mb-6 border-0 shadow-sm">
          <CardHeader className="pb-4 border-b">
            <CardTitle className="text-lg flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">Privacy Center</h4>
                  <p className="text-sm text-gray-600">Take control of your privacy and learn how we protect it</p>
                </div>
                <Link to={ROUTES.PRIVACY_CENTER} className="flex-shrink-0">
                  <Button variant="ghost" size="sm" className="text-brand-yellow hover:text-brand-orange">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <Separator />

              <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">Communication Preferences</h4>
                  <p className="text-sm text-gray-600">Manage how we communicate with you</p>
                </div>
                <Link to={ROUTES.COMMUNICATION_PREFERENCES} className="flex-shrink-0">
                  <Button variant="ghost" size="sm" className="text-brand-yellow hover:text-brand-orange">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications Section */}
        <Card className="mb-6 border-0 shadow-sm">
          <CardHeader className="pb-4 border-b">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {[
                { title: 'Email notifications', description: 'Receive important updates via email' },
                { title: 'SMS notifications', description: 'Get urgent messages via SMS' },
                { title: 'Push notifications', description: 'Receive notifications on your device' },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <Switch defaultChecked={index === 0} />
                  </div>
                  {index < 2 && <Separator className="mt-6" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Data Management Section */}
        <Card className="mb-6 border-0 shadow-sm">
          <CardHeader className="pb-4 border-b">
            <CardTitle className="text-lg flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Download your data</h4>
                  <p className="text-sm text-gray-600">Get a copy of your personal data</p>
                </div>
                <Button variant="outline" size="sm">
                  Download
                </Button>
              </div>

              <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Delete your account</h4>
                  <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
                </div>
                <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50 hover:text-red-700">
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legal Section */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4 border-b">
            <CardTitle className="text-lg flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Legal
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Link 
                to={ROUTES.TERMS}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <span className="text-gray-900 hover:text-brand-yellow font-medium">Terms of Service</span>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </Link>
              <Link 
                to={ROUTES.PRIVACY}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <span className="text-gray-900 hover:text-brand-yellow font-medium">Privacy Policy</span>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </Link>
              <Link 
                to={ROUTES.HELP}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <span className="text-gray-900 hover:text-brand-yellow font-medium">Help Center</span>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
