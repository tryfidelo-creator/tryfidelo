import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  MessageSquare,
  MoreVertical,
  Flag,
  Ban,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';

interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  location: string;
  joinDate: string;
  role: 'seller' | 'buyer' | 'both';
  isOnline: boolean;
  about: string;
  responseTime: string;
  itemsSold: number;
  verified: boolean;
}

const mockUser: UserProfile = {
  id: '123',
  name: 'John Smith',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  rating: 4.8,
  reviewCount: 247,
  location: 'Lagos, Nigeria',
  joinDate: 'Joined June 2022',
  role: 'seller',
  isOnline: true,
  about:
    'Professional seller with years of experience. I guarantee genuine products and fast delivery.',
  responseTime: '< 1 hour',
  itemsSold: 543,
  verified: true,
};

export function UserProfilePage() {
  const navigate = useNavigate();
  const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false);
  const [selectedBlockReason, setSelectedBlockReason] = useState('');

  const blockReasons = [
    'Spam or scam',
    'Inappropriate content',
    'Harassment or bullying',
    'Offensive behavior',
    "Don't want to see their items",
    'Other',
  ];

  const handleBlock = () => {
    if (!selectedBlockReason) return;
    // TODO: API call to block user
    console.log('User blocked with reason:', selectedBlockReason);
    setIsBlockDialogOpen(false);
    navigate(-1);
  };

  const stats = [
    { label: 'Items Sold', value: mockUser.itemsSold },
    { label: 'Response Time', value: mockUser.responseTime },
    { label: 'Member Since', value: mockUser.joinDate.split(' ')[1] },
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mb-6 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Messages
          </Button>
        </motion.div>

        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="border-0 shadow-md mb-6">
            <CardContent className="p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                      <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {mockUser.isOnline && (
                      <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-2 border-white rounded-full" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h1 className="text-2xl font-bold text-gray-900">
                        {mockUser.name}
                      </h1>
                      {mockUser.verified && (
                        <Badge className="bg-blue-100 text-blue-700 flex items-center gap-1">
                          ✓ Verified
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(mockUser.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">
                          {mockUser.rating} ({mockUser.reviewCount} reviews)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {mockUser.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {mockUser.joinDate}
                      </div>
                    </div>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="text-red-600 cursor-pointer">
                      <Flag className="w-4 h-4 mr-2" />
                      Report User
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setIsBlockDialogOpen(true)}
                      className="text-red-600 cursor-pointer"
                    >
                      <Ban className="w-4 h-4 mr-2" />
                      Block User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-2 gap-3 mb-6"
        >
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-white flex items-center justify-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Send Message
          </Button>
          <Button variant="outline">View All Listings</Button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-4 text-center">
                <p className="text-xs text-gray-600 uppercase mb-1">
                  {stat.label}
                </p>
                <p className="text-lg font-bold text-gray-900">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card className="border-0 shadow-sm mb-6">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-3">About</h3>
              <p className="text-gray-700 text-sm">{mockUser.about}</p>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between items-center py-2 border-b pb-2">
                  <span className="text-sm text-gray-600">Seller Rating</span>
                  <span className="font-semibold text-gray-900">
                    {mockUser.rating}/5.0
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b pb-2">
                  <span className="text-sm text-gray-600">Response Time</span>
                  <span className="font-semibold text-gray-900">
                    {mockUser.responseTime}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600">Online Status</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="font-semibold text-gray-900">Online Now</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Recent Reviews</h3>
              <div className="space-y-4">
                {[1, 2].map((review) => (
                  <div key={review} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-900">
                          Great seller!
                        </p>
                        <p className="text-xs text-gray-500">
                          Review by Buyer • 2 weeks ago
                        </p>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">
                      Fast delivery, item was exactly as described.
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Block User Dialog */}
      <AlertDialog open={isBlockDialogOpen} onOpenChange={setIsBlockDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Block {mockUser.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              You won't see messages or listings from this user. You can unblock
              them later in your settings.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700">
              Reason for blocking (optional)
            </p>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {blockReasons.map((reason) => (
                <label
                  key={reason}
                  className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="radio"
                    name="blockReason"
                    value={reason}
                    checked={selectedBlockReason === reason}
                    onChange={(e) => setSelectedBlockReason(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">{reason}</span>
                </label>
              ))}
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBlock}
              className="bg-red-600 hover:bg-red-700"
            >
              Block User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
