import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, MessageSquare, Phone, Bell } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

export function CommunicationPreferencesPage() {
  const navigate = useNavigate();

  const communicationChannels = [
    {
      title: 'Email Communications',
      description: 'Receive updates about your account, orders, and services via email',
      icon: Mail,
      enabled: true,
      options: [
        { label: 'Order confirmations and updates', enabled: true },
        { label: 'Product recommendations', enabled: true },
        { label: 'Promotional offers', enabled: false },
        { label: 'Weekly newsletter', enabled: true },
      ],
    },
    {
      title: 'SMS Communications',
      description: 'Get important alerts and updates via text message',
      icon: MessageSquare,
      enabled: true,
      options: [
        { label: 'Order status updates', enabled: true },
        { label: 'Delivery notifications', enabled: true },
        { label: 'Promotional SMS', enabled: false },
        { label: 'Account alerts', enabled: true },
      ],
    },
    {
      title: 'Phone Communications',
      description: 'We may call you for important customer service matters',
      icon: Phone,
      enabled: false,
      options: [
        { label: 'Allow customer support calls', enabled: false },
        { label: 'Allow promotional calls', enabled: false },
      ],
    },
    {
      title: 'Push Notifications',
      description: 'Receive real-time notifications on your mobile app',
      icon: Bell,
      enabled: true,
      options: [
        { label: 'Messages and chat', enabled: true },
        { label: 'Order updates', enabled: true },
        { label: 'Promotional alerts', enabled: false },
      ],
    },
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
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
          <h1 className="heading-xl mb-2">Communication Preferences</h1>
          <p className="text-gray-600">Manage how we communicate with you across different channels</p>
        </div>

        {/* Communication Channels */}
        <div className="space-y-6">
          {communicationChannels.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <Card key={index} className="border-0 shadow-sm">
                <CardHeader className="pb-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-100 rounded-lg text-brand-yellow">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{channel.title}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">{channel.description}</p>
                      </div>
                    </div>
                    <Switch defaultChecked={channel.enabled} />
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {channel.options.map((option, optIndex) => (
                      <div key={optIndex}>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <label className="flex items-center gap-3 flex-1 cursor-pointer">
                            <input
                              type="checkbox"
                              defaultChecked={option.enabled}
                              className="w-4 h-4 rounded border-gray-300"
                            />
                            <span className="text-sm text-gray-700">{option.label}</span>
                          </label>
                        </div>
                        {optIndex < channel.options.length - 1 && <Separator className="my-2" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Unsubscribe All Section */}
        <Card className="mt-8 border-0 shadow-sm bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Unsubscribe from All</h3>
                <p className="text-sm text-gray-600">Stop receiving all marketing and promotional communications</p>
              </div>
              <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-100">
                Unsubscribe All
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Info */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg text-sm text-gray-700">
          <p>
            We respect your preferences and will only contact you in the ways you choose. You can change these settings at any time.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
