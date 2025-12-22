import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Package, Clock, MessageSquare, CheckCircle, AlertCircle, Truck } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface DeliveryRequest {
  id: string;
  sender: { id: string; name: string; avatar: string };
  pickupLocation: string;
  deliveryLocation: string;
  itemDescription: string;
  estimatedWeight: string;
  price: number;
  status: 'pending' | 'accepted' | 'in_transit' | 'delivered' | 'cancelled';
  rider?: { id: string; name: string; avatar: string; rating: number };
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

const mockDeliveryRequests: DeliveryRequest[] = [
  {
    id: '1',
    sender: { id: '1', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?u=john' },
    pickupLocation: '123 Main St, Lagos',
    deliveryLocation: '456 Oak Ave, Lagos',
    itemDescription: 'Electronic package',
    estimatedWeight: '2kg',
    price: 5000,
    status: 'accepted',
    rider: { id: '1', name: 'Mike Rider', avatar: 'https://i.pravatar.cc/150?u=mike', rating: 4.8 },
    createdAt: '2025-12-20 10:30 AM',
    updatedAt: '2025-12-21 09:15 AM',
    notes: 'Handle with care',
  },
  {
    id: '2',
    sender: { id: '2', name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?u=jane' },
    pickupLocation: '789 Queen Rd, Abuja',
    deliveryLocation: '321 King St, Abuja',
    itemDescription: 'Documents package',
    estimatedWeight: '0.5kg',
    price: 3000,
    status: 'in_transit',
    rider: { id: '2', name: 'Sarah Swift', avatar: 'https://i.pravatar.cc/150?u=sarah', rating: 4.9 },
    createdAt: '2025-12-21 08:00 AM',
    updatedAt: '2025-12-21 10:00 AM',
    notes: 'Urgent delivery',
  },
  {
    id: '3',
    sender: { id: '3', name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/150?u=alex' },
    pickupLocation: '555 Pine St, Portharcourt',
    deliveryLocation: '777 Elm Ave, Portharcourt',
    itemDescription: 'Food delivery - Takeout',
    estimatedWeight: '3kg',
    price: 2500,
    status: 'pending',
    createdAt: '2025-12-21 10:45 AM',
    updatedAt: '2025-12-21 10:45 AM',
  },
  {
    id: '4',
    sender: { id: '4', name: 'Emma Brown', avatar: 'https://i.pravatar.cc/150?u=emma' },
    pickupLocation: '222 River Rd, Ibadan',
    deliveryLocation: '888 Lake St, Ibadan',
    itemDescription: 'Parcel box',
    estimatedWeight: '5kg',
    price: 4500,
    status: 'delivered',
    rider: { id: '3', name: 'Tom Express', avatar: 'https://i.pravatar.cc/150?u=tom', rating: 4.7 },
    createdAt: '2025-12-20 02:30 PM',
    updatedAt: '2025-12-21 05:30 PM',
  },
];

export function DeliveryRequestsPage() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<DeliveryRequest[]>(mockDeliveryRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedRequest, setSelectedRequest] = useState<DeliveryRequest | null>(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [newStatus, setNewStatus] = useState('');

  // Filter requests based on user role
  const getFilteredRequests = () => {
    let filtered = requests;

    // Filter by role
    if (user?.role === 'delivery_rider') {
      // Riders see available requests and assigned requests
      filtered = filtered.filter(r => r.status === 'pending' || r.rider?.id === user.id);
    } else if (user?.role === 'admin') {
      // Admins see all requests
      filtered = filtered;
    } else {
      // Customers see only their requests
      filtered = filtered.filter(r => r.sender.id === user?.id);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(r =>
        r.itemDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.deliveryLocation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(r => r.status === filterStatus);
    }

    return filtered;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-blue-100 text-blue-800';
      case 'in_transit':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'accepted':
        return <CheckCircle className="h-4 w-4" />;
      case 'in_transit':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const handleAcceptRequest = (request: DeliveryRequest) => {
    if (user?.role !== 'delivery_rider') {
      toast.error('Only riders can accept requests');
      return;
    }
    setSelectedRequest(request);
    setRequests(requests.map(r =>
      r.id === request.id
        ? { ...r, status: 'accepted' as const, rider: { id: user.id, name: user.name || 'Rider', avatar: '', rating: 4.8 } }
        : r
    ));
    toast.success('Request accepted!');
  };

  const handleUpdateStatus = () => {
    if (!selectedRequest || !newStatus) {
      toast.error('Please select a status');
      return;
    }
    setRequests(requests.map(r =>
      r.id === selectedRequest.id
        ? { ...r, status: newStatus as DeliveryRequest['status'], updatedAt: new Date().toLocaleString() }
        : r
    ));
    setSelectedRequest({ ...selectedRequest, status: newStatus as DeliveryRequest['status'] });
    setShowStatusModal(false);
    toast.success('Status updated!');
  };

  const handleSendReply = () => {
    if (!replyMessage.trim()) {
      toast.error('Please enter a message');
      return;
    }
    toast.success('Message sent!');
    setReplyMessage('');
    setShowReplyModal(false);
  };

  const filteredRequests = getFilteredRequests();

  return (
    <DashboardLayout>
      <div className="p-4 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Package className="h-8 w-8 text-brand-yellow" />
            Delivery Requests
          </h1>
          <p className="text-gray-600 mt-1">
            {user?.role === 'delivery_rider' && 'Available requests and your assigned deliveries'}
            {user?.role === 'admin' && 'Manage all delivery requests in the system'}
            {user?.role !== 'delivery_rider' && user?.role !== 'admin' && 'Track your delivery requests'}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by item, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="in_transit">In Transit</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{filteredRequests.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-yellow-600">{filteredRequests.filter(r => r.status === 'pending').length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">In Transit</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-purple-600">{filteredRequests.filter(r => r.status === 'in_transit').length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Delivered</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">{filteredRequests.filter(r => r.status === 'delivered').length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request, index) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedRequest(request)}>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Header Row */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0">
                              <Package className="h-6 w-6 text-brand-yellow" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{request.itemDescription}</h3>
                              <p className="text-sm text-gray-600 mt-1">Request ID: {request.id}</p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(request.status)}>
                            {getStatusIcon(request.status)}
                            <span className="ml-1 capitalize">{request.status.replace('_', ' ')}</span>
                          </Badge>
                        </div>

                        <Separator />

                        {/* Location and Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-500 font-medium uppercase">Pickup</p>
                            <div className="flex items-start gap-2 mt-1">
                              <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                              <p className="text-sm text-gray-900">{request.pickupLocation}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 font-medium uppercase">Delivery</p>
                            <div className="flex items-start gap-2 mt-1">
                              <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                              <p className="text-sm text-gray-900">{request.deliveryLocation}</p>
                            </div>
                          </div>
                        </div>

                        {/* Details Row */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Weight</p>
                            <p className="font-medium text-gray-900">{request.estimatedWeight}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Price</p>
                            <p className="font-medium text-brand-yellow">₦{request.price.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Created</p>
                            <p className="font-medium text-gray-900">{request.createdAt}</p>
                          </div>
                        </div>

                        {/* Sender/Rider Info */}
                        <Separator />

                        <div className="flex items-center justify-between flex-wrap gap-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={request.rider?.avatar || request.sender.avatar} alt={request.rider?.name || request.sender.name} />
                              <AvatarFallback>{(request.rider?.name || request.sender.name)[0]}</AvatarFallback>
                            </Avatar>
                            <div className="text-sm">
                              <p className="font-medium text-gray-900">{request.rider?.name || request.sender.name}</p>
                              <p className="text-gray-600">
                                {request.rider ? `${request.rider.rating}★ Rider` : 'Sender'}
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedRequest(request);
                                setShowReplyModal(true);
                              }}
                            >
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Reply
                            </Button>

                            {user?.role === 'delivery_rider' && request.status === 'pending' && (
                              <Button
                                size="sm"
                                className="bg-brand-yellow text-black hover:bg-brand-orange"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAcceptRequest(request);
                                }}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Accept
                              </Button>
                            )}

                            {(user?.role === 'delivery_rider' || user?.role === 'admin') && request.status !== 'cancelled' && request.status !== 'delivered' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedRequest(request);
                                  setNewStatus('');
                                  setShowStatusModal(true);
                                }}
                              >
                                Update Status
                              </Button>
                            )}
                          </div>
                        </div>

                        {request.notes && (
                          <>
                            <Separator />
                            <div>
                              <p className="text-xs text-gray-500 font-medium uppercase">Notes</p>
                              <p className="text-sm text-gray-900 mt-1">{request.notes}</p>
                            </div>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">No delivery requests found</p>
                </CardContent>
              </Card>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Reply Modal */}
      <Dialog open={showReplyModal} onOpenChange={setShowReplyModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Message</DialogTitle>
            <DialogDescription>
              Reply to {selectedRequest?.rider?.name || selectedRequest?.sender.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder="Type your message..."
              rows={4}
            />
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowReplyModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendReply} className="bg-brand-yellow text-black hover:bg-brand-orange">
                Send
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Status Update Modal */}
      <Dialog open={showStatusModal} onOpenChange={setShowStatusModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Delivery Status</DialogTitle>
            <DialogDescription>
              Update the status for this delivery request
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select new status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="in_transit">In Transit</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowStatusModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateStatus} className="bg-brand-yellow text-black hover:bg-brand-orange">
                Update
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
