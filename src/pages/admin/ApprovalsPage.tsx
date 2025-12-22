import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Mail, Phone } from 'lucide-react';
import { AdminLayout } from '@/components/dashboard/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const pendingApprovals = [
  { id: '1', type: 'seller', name: 'John Smith', email: 'john@example.com', phone: '+234 123 456 7890', date: '2 hours ago', avatar: 'https://i.pravatar.cc/150?u=john1' },
  { id: '2', type: 'service_provider', name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+234 987 654 3210', date: '5 hours ago', avatar: 'https://i.pravatar.cc/150?u=sarah1' },
  { id: '3', type: 'delivery_rider', name: 'Mike Chen', email: 'mike@example.com', phone: '+234 555 123 4567', date: '1 day ago', avatar: 'https://i.pravatar.cc/150?u=mike1' },
  { id: '4', type: 'seller', name: 'Emma Wilson', email: 'emma@example.com', phone: '+234 444 555 6666', date: '1 day ago', avatar: 'https://i.pravatar.cc/150?u=emma1' },
];

export function ApprovalsPage() {
  const [filter, setFilter] = useState('all');

  const filteredApprovals = filter === 'all' 
    ? pendingApprovals 
    : pendingApprovals.filter(a => a.type === filter);

  const handleApprove = (id: string) => {
    // TODO: API call to approve user
    console.log('Approve:', id);
  };

  const handleReject = (id: string) => {
    // TODO: API call to reject user
    console.log('Reject:', id);
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="heading-xl mb-2">User Approvals</h1>
            <p className="text-gray-600">Review and approve new user registrations</p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Pending Approvals ({filteredApprovals.length})</CardTitle>
                <Tabs value={filter} onValueChange={setFilter}>
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="seller">Sellers</TabsTrigger>
                    <TabsTrigger value="service_provider">Providers</TabsTrigger>
                    <TabsTrigger value="delivery_rider">Riders</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredApprovals.map((approval, index) => (
                  <motion.div
                    key={approval.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center gap-4 p-6 bg-white border-2 border-gray-100 rounded-lg hover:border-brand-yellow transition-all"
                  >
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={approval.avatar} alt={approval.name} />
                      <AvatarFallback>{approval.name[0]}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-lg mb-1">{approval.name}</h4>
                          <Badge variant="secondary" className="mb-2">
                            {approval.type.replace('_', ' ')}
                          </Badge>
                        </div>
                        <span className="text-sm text-gray-500">{approval.date}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {approval.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          {approval.phone}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button
                        onClick={() => handleApprove(approval.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleReject(approval.id)}
                        variant="outline"
                        className="border-red-600 text-red-600 hover:bg-red-50"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  );
}