import { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, MoreVertical } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const mockAds = [
  {
    id: '1',
    title: 'iPhone 13 Pro 256GB',
    category: 'Electronics',
    price: 850,
    image: 'https://picsum.photos/200/200?random=1',
    status: 'active',
    views: 234,
    posted: '2 days ago',
    description: 'Excellent condition, original box included',
  },
  {
    id: '2',
    title: 'Toyota Corolla 2020',
    category: 'Vehicles',
    price: 8500,
    image: 'https://picsum.photos/200/200?random=2',
    status: 'sold',
    views: 1200,
    posted: '5 days ago',
    description: 'Automatic transmission, full service history',
  },
  {
    id: '3',
    title: 'Gaming Laptop - HP Omen',
    category: 'Electronics',
    price: 1200,
    image: 'https://picsum.photos/200/200?random=3',
    status: 'active',
    views: 89,
    posted: '1 week ago',
    description: 'RTX 3060, Intel i7, 16GB RAM',
  },
];

export function MyAdsPage() {
  const [ads, setAds] = useState(mockAds);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedAd, setSelectedAd] = useState<typeof mockAds[0] | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    description: '',
  });

  const filteredAds = ads.filter(ad => {
    const matchesSearch = ad.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ad.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCreateAd = () => {
    setFormData({ title: '', category: '', price: '', description: '' });
    setSelectedAd(null);
    setIsEditing(false);
    setShowCreateDialog(true);
  };

  const handleEditAd = (ad: typeof mockAds[0]) => {
    setSelectedAd(ad);
    setFormData({
      title: ad.title,
      category: ad.category,
      price: ad.price.toString(),
      description: ad.description,
    });
    setIsEditing(true);
    setShowCreateDialog(true);
  };

  const handleSaveAd = () => {
    if (isEditing && selectedAd) {
      setAds(ads.map(ad =>
        ad.id === selectedAd.id
          ? { ...ad, ...formData, price: parseInt(formData.price) }
          : ad
      ));
    } else {
      const newAd = {
        id: (Math.max(...ads.map(a => parseInt(a.id))) + 1).toString(),
        ...formData,
        price: parseInt(formData.price),
        image: 'https://picsum.photos/200/200?random=new',
        status: 'active' as const,
        views: 0,
        posted: 'just now',
      };
      setAds([newAd, ...ads]);
    }
    setShowCreateDialog(false);
    setFormData({ title: '', category: '', price: '', description: '' });
  };


  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'sold':
        return <Badge className="bg-gray-100 text-gray-800">Sold</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="heading-xl mb-2">My Ads</h1>
            <p className="text-gray-600">Create, edit, and manage your advertisements</p>
          </div>
          <Button 
            onClick={handleCreateAd}
            className="bg-brand-yellow text-black hover:bg-brand-orange"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Ad
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">Total Ads</p>
                <h3 className="text-3xl font-bold text-brand-yellow">{ads.length}</h3>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">Active</p>
                <h3 className="text-3xl font-bold text-green-500">
                  {ads.filter(a => a.status === 'active').length}
                </h3>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">Total Views</p>
                <h3 className="text-3xl font-bold text-brand-orange">
                  {ads.reduce((sum, ad) => sum + ad.views, 0)}
                </h3>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">Sold</p>
                <h3 className="text-3xl font-bold text-gray-500">
                  {ads.filter(a => a.status === 'sold').length}
                </h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search ads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ads</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Ads List */}
        <div className="space-y-4">
          {filteredAds.length > 0 ? (
            filteredAds.map((ad) => (
              <Card key={ad.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    {/* Image */}
                    <div className="w-full sm:w-48 h-48 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={ad.image}
                        alt={ad.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-4 gap-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{ad.title}</h3>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline">{ad.category}</Badge>
                            {getStatusBadge(ad.status)}
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditAd(ad)}>
                                <Edit2 className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-2">{ad.description}</p>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-6">
                          <div>
                            <p className="text-sm text-gray-600">Price</p>
                            <p className="text-2xl font-bold text-brand-yellow">₦{ad.price.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              Views
                            </p>
                            <p className="text-2xl font-bold">{ad.views}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Posted</p>
                            <p className="text-sm font-semibold">{ad.posted}</p>
                          </div>
                        </div>

                        <Button 
                          variant="outline"
                          onClick={() => handleEditAd(ad)}
                          className="w-full sm:w-auto"
                        >
                          <Edit2 className="h-4 w-4 mr-2" />
                          Edit Ad
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-12 text-center">
                <p className="text-gray-600 mb-4">No ads found</p>
                <Button 
                  onClick={handleCreateAd}
                  className="bg-brand-yellow text-black hover:bg-brand-orange"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Ad
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Create/Edit Ad Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Ad' : 'Create New Ad'}</DialogTitle>
            <DialogDescription>
              {isEditing ? 'Update your advertisement details' : 'Fill in the details for your new advertisement'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div>
              <Label htmlFor="title" className="text-sm font-semibold">
                Title
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Enter ad title"
                className="mt-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category" className="text-sm font-semibold">
                  Category
                </Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Vehicles">Vehicles</SelectItem>
                    <SelectItem value="Fashion">Fashion</SelectItem>
                    <SelectItem value="Home & Garden">Home & Garden</SelectItem>
                    <SelectItem value="Sports">Sports</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="price" className="text-sm font-semibold">
                  Price (₦)
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  placeholder="0.00"
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-semibold">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Describe your item in detail"
                className="mt-2 min-h-28"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSaveAd}
              className="bg-brand-yellow text-black hover:bg-brand-orange"
            >
              {isEditing ? 'Save Changes' : 'Create Ad'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
