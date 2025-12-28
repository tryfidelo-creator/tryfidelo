import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, Lock, Users, Globe, Trash2 } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

export function PrivacyCenterPage() {
  const navigate = useNavigate();

  const privacySettings = [
    {
      title: 'Profile Visibility',
      description: 'Control who can see your profile and personal information',
      icon: Eye,
      options: ['Public', 'Friends Only', 'Private'],
    },
    {
      title: 'Search & Discovery',
      description: 'Allow your profile to appear in search results and recommendations',
      icon: Globe,
      enabled: true,
    },
    {
      title: 'Activity Status',
      description: 'Show when you are online and your last activity',
      icon: Users,
      enabled: true,
    },
    {
      title: 'Data Collection',
      description: 'Allow us to collect usage data to improve your experience',
      icon: Lock,
      enabled: false,
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-4 space-y-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="mb-4 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Privacy & Data
        </Button>

        <div className="mb-8">
          <h1 className="heading-xl mb-2">Privacy Center</h1>
          <p className="text-gray-600">Take control of your privacy and learn how we protect it</p>
        </div>

        {/* Privacy Settings */}
        <div className="space-y-4">
          {privacySettings.map((setting, index) => {
            const Icon = setting.icon;
            return (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{setting.title}</h3>
                        <p className="text-sm text-gray-600">{setting.description}</p>
                        {setting.options && (
                          <div className="mt-4 flex gap-2 flex-wrap">
                            {setting.options.map((option) => (
                              <Button
                                key={option}
                                variant="outline"
                                size="sm"
                                className="text-xs"
                              >
                                {option}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    {'enabled' in setting && (
                      <Switch defaultChecked={setting.enabled} className="mt-1" />
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Data Management */}
        <Card className="mt-8 border-0 shadow-sm">
          <CardHeader className="pb-4 border-b">
            <CardTitle className="text-lg">Data Management</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">Download Your Data</h4>
                  <p className="text-sm text-gray-600">Get a copy of your personal data in a portable format</p>
                </div>
                <Button variant="outline" size="sm" className="mt-1">
                  Download
                </Button>
              </div>

              <Separator />

              <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">Delete Your Account</h4>
                  <p className="text-sm text-gray-600">Permanently delete your account and all associated data</p>
                </div>
                <Button variant="outline" size="sm" className="mt-1 text-red-600 hover:text-red-700 hover:bg-red-50">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Policy Info */}
        <Card className="mt-8 border-0 shadow-sm bg-blue-50">
          <CardContent className="pt-6">
            <p className="text-sm text-gray-700">
              We take your privacy seriously. Read our{' '}
              <a href="/privacy" className="text-brand-yellow hover:text-brand-orange font-semibold">
                Privacy Policy
              </a>
              {' '}to learn more about how we collect, use, and protect your data.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
