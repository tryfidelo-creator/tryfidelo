import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Smartphone, Key, Phone, ShieldAlert, Check, ArrowLeft } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export function SecurityPage() {
  const navigate = useNavigate();
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const securityItems = [
    {
      id: 'password',
      title: 'Password',
      description: 'Manage your password',
      status: 'set',
      icon: Lock,
      action: 'Change',
    },
    {
      id: 'passkeys',
      title: 'Passkeys',
      description: 'Passkeys are easier and more secure than passwords',
      status: 'not-set',
      icon: Key,
      action: 'Add',
    },
    {
      id: 'authenticator',
      title: 'Authenticator app',
      description: 'Set up your authenticator app to add an extra layer of security',
      status: 'not-set',
      icon: Smartphone,
      action: 'Add',
    },
    {
      id: '2fa',
      title: '2-step verification',
      description: 'Add additional security to your account with 2-step verification',
      status: 'not-set',
      icon: ShieldAlert,
      action: 'Add',
    },
    {
      id: 'recovery',
      title: 'Recovery phone',
      description: 'Add a backup phone number to access your account',
      status: 'not-set',
      icon: Phone,
      action: 'Add',
    },
  ];

  const handleChangePassword = () => {
    if (newPassword === confirmPassword && newPassword.length >= 8) {
      // TODO: API call to change password
      setShowPasswordDialog(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

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
          Back to Profile
        </Button>
        <div className="mb-8">
          <h1 className="heading-xl mb-2">Security</h1>
          <p className="text-gray-600">Manage your account security settings</p>
        </div>

        {/* Logging in Section */}
        <Card className="mb-6 border-0 shadow-sm">
          <CardHeader className="pb-4 border-b">
            <CardTitle className="text-lg flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Logging in
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {securityItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className="flex items-start justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mt-1 flex-shrink-0">
                        <Icon className="h-5 w-5 text-gray-700" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        {item.status === 'set' && (
                          <Badge className="mt-2 bg-green-100 text-green-800 hover:bg-green-100">
                            <Check className="h-3 w-3 mr-1" />
                            Set
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={item.id === 'password' ? () => setShowPasswordDialog(true) : () => setShowAuthDialog(true)}
                      className="flex-shrink-0"
                    >
                      {item.action}
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Active Sessions */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4 border-b">
            <CardTitle className="text-lg">Active sessions</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Chrome on Windows</h4>
                  <p className="text-sm text-gray-600">Last active: Just now</p>
                  <p className="text-xs text-gray-500 mt-2">IP: 192.168.1.1</p>
                </div>
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                  Current
                </Badge>
              </div>

              <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Safari on iPhone</h4>
                  <p className="text-sm text-gray-600">Last active: 2 hours ago</p>
                  <p className="text-xs text-gray-500 mt-2">IP: 192.168.1.2</p>
                </div>
                <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50 hover:text-red-700">
                  Sign out
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Change Password Dialog */}
      <AlertDialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Change Password</AlertDialogTitle>
            <AlertDialogDescription>
              Enter your current password and your new password
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="current-password" className="text-sm font-semibold mb-2">
                Current password
              </Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="new-password" className="text-sm font-semibold mb-2">
                New password
              </Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="confirm-password" className="text-sm font-semibold mb-2">
                Confirm password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="mt-2"
              />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleChangePassword}
              className="bg-brand-yellow text-black hover:bg-brand-orange"
            >
              Change Password
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Setup Feature Dialog */}
      <AlertDialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Coming Soon</AlertDialogTitle>
            <AlertDialogDescription>
              This feature will be available soon. We're working on implementing it for you.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
