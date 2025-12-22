import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Edit2, Check, X, ArrowLeft } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';

export function PersonalInfoPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+234 123 456 7890',
    address: '123 Main Street, Lagos, Nigeria',
    country: 'Nigeria',
  });

  const [tempFormData, setTempFormData] = useState(formData);

  const handleEdit = () => {
    setIsEditing(true);
    setTempFormData(formData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempFormData(formData);
  };

  const handleSave = () => {
    setFormData(tempFormData);
    setIsEditing(false);
    // TODO: API call to update profile
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempFormData(prev => ({ ...prev, [name]: value }));
  };

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
          <h1 className="heading-xl mb-2">Personal Info</h1>
          <p className="text-gray-600">Manage your personal information</p>
        </div>

        {/* Profile Header Card */}
        <Card className="mb-8 border-0 shadow-sm">
          <CardContent className="p-8">
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage 
                      src={`https://i.pravatar.cc/150?u=${formData.email}`} 
                      alt={formData.name} 
                    />
                    <AvatarFallback>{formData.name[0]}</AvatarFallback>
                  </Avatar>
                  <button aria-label="Edit profile picture" className="absolute bottom-0 right-0 bg-brand-yellow text-black p-2 rounded-full hover:bg-brand-orange transition-colors">
                    <Edit2 className="h-4 w-4" />
                  </button>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">{formData.name}</h2>
                  <p className="text-gray-600">{formData.email}</p>
                </div>
              </div>
              <Button 
                variant={isEditing ? "ghost" : "outline"}
                onClick={isEditing ? handleCancel : handleEdit}
                className={isEditing ? "text-red-600 hover:bg-red-50" : ""}
              >
                {isEditing ? (
                  <>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </>
                )}
              </Button>
            </div>

            <Separator className="mb-8" />

            {/* Form Fields */}
            <div className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Name
                </Label>
                {isEditing ? (
                  <Input
                    id="name"
                    name="name"
                    value={tempFormData.name}
                    onChange={handleChange}
                    className="mt-2"
                  />
                ) : (
                  <p className="text-lg mt-2">{formData.name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                {isEditing ? (
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={tempFormData.email}
                    onChange={handleChange}
                    className="mt-2"
                  />
                ) : (
                  <>
                    <p className="text-lg mt-2">{formData.email}</p>
                    <p className="text-xs text-green-600 mt-1">✓ Verified</p>
                  </>
                )}
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone number
                </Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={tempFormData.phone}
                    onChange={handleChange}
                    placeholder="Add your phone number"
                    className="mt-2"
                  />
                ) : (
                  <p className="text-lg mt-2">{formData.phone}</p>
                )}
              </div>

              <div>
                <Label htmlFor="address" className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Address
                </Label>
                {isEditing ? (
                  <Input
                    id="address"
                    name="address"
                    value={tempFormData.address}
                    onChange={handleChange}
                    className="mt-2"
                  />
                ) : (
                  <p className="text-lg mt-2">{formData.address}</p>
                )}
              </div>

              <div>
                <Label htmlFor="country" className="text-sm font-semibold mb-2">
                  Country
                </Label>
                {isEditing ? (
                  <Input
                    id="country"
                    name="country"
                    value={tempFormData.country}
                    onChange={handleChange}
                    className="mt-2"
                  />
                ) : (
                  <p className="text-lg mt-2">{formData.country}</p>
                )}
              </div>

              {isEditing && (
                <div className="flex gap-3 pt-4">
                  <Button 
                    onClick={handleSave}
                    className="flex-1 bg-brand-yellow text-black hover:bg-brand-orange"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
