import { useState } from 'react';
import { Plus, Search, Filter, Eye, Edit2, Trash2, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
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
import { toast } from 'sonner';

interface Ad {
  id: string;
  title: string;
  category: string;
  price: number;
  status: 'active' | 'draft' | 'sold';
  views: number;
  image: string;
  createdAt: string;
}

const mockAds: Ad[] = [
  {
    id: '1',
    title: 'iPhone 14 Pro Max',
    category: 'Electronics',
    price: 999,
    status: 'active',
    views: 1250,
    image: 'https://images.unsplash.com/photo-1592286927505-1fed6f4d4640?w=400&h=400&fit=crop',
    createdAt: '2024-12-15'
  },
  {
    id: '2',
    title: 'MacBook Pro 16"',
    category: 'Electronics',
    price: 2499,
    status: 'active',
    views: 890,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
    createdAt: '2024-12-10'
  },
  {
    id: '3',
    title: 'Running Shoes',
    category: 'Sports',
    price: 120,
    status: 'draft',
    views: 0,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    createdAt: '2024-12-18'
  },
  {
    id: '4',
    title: 'Vintage Watch',
    category: 'Accessories',
    price: 450,
    status: 'sold',
    views: 2100,
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=400&fit=crop',
    createdAt: '2024-11-20'
  }
];

export function MyAdsPage() {
  const [ads, setAds] = useState<Ad[]>(mockAds);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteAd, setDeleteAd] = useState<Ad | null>(null);

  const filteredAds = ads.filter(ad => {
    const matchesSearch = ad.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ad.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statsData = [
    { label: 'Total Ads', value: ads.length, color: 'bg-blue-100 text-blue-700' },
    { label: 'Active', value: ads.filter(a => a.status === 'active').length, color: 'bg-green-100 text-green-700' },
    { label: 'Views', value: ads.reduce((sum, a) => sum + a.views, 0).toLocaleString(), color: 'bg-yellow-100 text-yellow-700' },
  ];

  const handleDeleteAd = (id: string) => {
    setAds(ads.filter(ad => ad.id !== id));
    setDeleteAd(null);
    toast.success('Ad deleted successfully');
  };

  const handleEditAd = (ad: Ad) => {
    setEditingAd(ad);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingAd) return;
    setAds(ads.map(ad => ad.id === editingAd.id ? editingAd : ad));
    setIsEditDialogOpen(false);
    setEditingAd(null);
    toast.success('Ad updated successfully');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 p-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">My Ads</h1>
            <p className="text-gray-600 mt-1">Manage and publish your product listings</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-white flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Create New Ad
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Ad</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ad Title</label>
                  <Input placeholder="e.g., iPhone 14 Pro Max" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="furniture">Furniture</SelectItem>
                      <SelectItem value="sports">Sports & Outdoors</SelectItem>
                      <SelectItem value="fashion">Fashion</SelectItem>
                      <SelectItem value="home">Home & Garden</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                  <Input type="number" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <Input placeholder="Describe your item..." className="h-24" />
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-white flex-1">Create Ad</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {statsData.map((stat, index) => (
            <Card key={index} className="p-6 border-0 shadow-sm">
              <div className={`inline-block p-3 rounded-lg mb-4 ${stat.color}`}>
                <Package className="w-6 h-6" />
              </div>
              <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
            </Card>
          ))}
        </div>

        {/* Search and Filter */}
        <Card className="p-4 border-0 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search ads..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[150px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Ads Grid */}
        {filteredAds.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAds.map(ad => (
              <Card key={ad.id} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
                <div className="relative">
                  <img src={ad.image} alt={ad.title} className="w-full h-48 object-cover" />
                  <Badge
                    variant="secondary"
                    className={`absolute top-3 right-3 ${
                      ad.status === 'active' ? 'bg-green-100 text-green-700' :
                      ad.status === 'draft' ? 'bg-gray-100 text-gray-700' :
                      'bg-orange-100 text-orange-700'
                    }`}
                  >
                    {ad.status.charAt(0).toUpperCase() + ad.status.slice(1)}
                  </Badge>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 truncate">{ad.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{ad.category}</p>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xl font-bold text-yellow-600">${ad.price.toLocaleString()}</p>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">{ad.views}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-2"
                      onClick={() => handleEditAd(ad)}
                    >
                      <Edit2 className="w-3 h-3" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => setDeleteAd(ad)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center border-0 shadow-sm">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No ads found</h3>
            <p className="text-gray-600 mb-6">Create your first ad to start selling</p>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
              Create Your First Ad
            </Button>
          </Card>
        )}

        {/* Edit Ad Modal */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Ad</DialogTitle>
            </DialogHeader>
            {editingAd && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <Input
                    value={editingAd.title}
                    onChange={(e) =>
                      setEditingAd({ ...editingAd, title: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                  <Input
                    type="number"
                    value={editingAd.price}
                    onChange={(e) =>
                      setEditingAd({
                        ...editingAd,
                        price: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <Select
                    value={editingAd.status}
                    onValueChange={(value) =>
                      setEditingAd({
                        ...editingAd,
                        status: value as 'active' | 'draft' | 'sold',
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="sold">Sold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditDialogOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white flex-1"
                    onClick={handleSaveEdit}
                  >
                    Save Changes
                  </Button>
                </div>
              </motion.div>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deleteAd} onOpenChange={() => setDeleteAd(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Ad?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{deleteAd?.title}"? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteAd && handleDeleteAd(deleteAd.id)}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
}
