import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, MessageSquare, XCircle } from 'lucide-react';
import { AdminLayout } from '@/components/dashboard/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const disputes = [
  {
    id: '1',
    type: 'marketplace',
    title: 'Product not as described',
    complainant: 'John Doe',
    respondent: 'Seller ABC',
    description: 'The iPhone I received is not in the condition described in the listing.',
    status: 'pending',
    date: '1 day ago',
  },
  {
    id: '2',
    type: 'delivery',
    title: 'Late delivery complaint',
    complainant: 'Jane Smith',
    respondent: 'Rider XYZ',
    description: 'Package was delivered 3 hours late without prior notice.',
    status: 'resolved',
    date: '2 days ago',
  },
  {
    id: '3',
    type: 'service',
    title: 'Incomplete service',
    complainant: 'Alice Brown',
    respondent: 'Provider 123',
    description: 'Cleaning service was not completed as agreed.',
    status: 'pending',
    date: '3 days ago',
  },
];

export function DisputesPage() {
  const [filter, setFilter] = useState('all');
  const [selectedDispute, setSelectedDispute] = useState<typeof disputes[0] | null>(null);
  const [resolution, setResolution] = useState('');

  const filteredDisputes = filter === 'all'
    ? disputes
    : disputes.filter(d => d.status === filter);

  const handleResolve = (action: 'approve' | 'reject') => {
    if (selectedDispute && resolution) {
      // TODO: API call to resolve dispute
      console.log(`${action} dispute:`, selectedDispute.id, resolution);
      setResolution('');
      setSelectedDispute(null);
    }
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
            <h1 className="heading-xl mb-2">Dispute Management</h1>
            <p className="text-gray-600">Review and resolve user disputes</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Total Disputes</span>
                  <AlertCircle className="h-5 w-5 text-gray-600" />
                </div>
                <p className="text-3xl font-bold">{disputes.length}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Pending</span>
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                </div>
                <p className="text-3xl font-bold">{disputes.filter(d => d.status === 'pending').length}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Resolved</span>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <p className="text-3xl font-bold">{disputes.filter(d => d.status === 'resolved').length}</p>
              </CardContent>
            </Card>
          </div>

          {/* Disputes List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Disputes ({filteredDisputes.length})</CardTitle>
                <Tabs value={filter} onValueChange={setFilter}>
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="resolved">Resolved</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredDisputes.map((dispute, index) => (
                  <motion.div
                    key={dispute.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-6 bg-white border-2 border-gray-100 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{dispute.title}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">{dispute.type}</Badge>
                          <Badge className={dispute.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}>
                            {dispute.status}
                          </Badge>
                          <span className="text-sm text-gray-500">{dispute.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-gray-600">Complainant:</span>
                        <p className="font-semibold">{dispute.complainant}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Respondent:</span>
                        <p className="font-semibold">{dispute.respondent}</p>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{dispute.description}</p>

                    {dispute.status === 'pending' && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            onClick={() => setSelectedDispute(dispute)}
                            className="bg-brand-yellow text-black hover:bg-brand-orange"
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Review & Resolve
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Resolve Dispute</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 pt-4">
                            <div>
                              <h4 className="font-semibold mb-2">{dispute.title}</h4>
                              <p className="text-sm text-gray-600 mb-4">{dispute.description}</p>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Resolution Notes</label>
                              <Textarea
                                value={resolution}
                                onChange={(e) => setResolution(e.target.value)}
                                placeholder="Enter your resolution notes..."
                                className="min-h-[100px]"
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button
                                onClick={() => handleResolve('approve')}
                                className="flex-1 bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Resolve in Favor
                              </Button>
                              <Button
                                onClick={() => handleResolve('reject')}
                                variant="outline"
                                className="flex-1 border-red-600 text-red-600 hover:bg-red-50"
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject Complaint
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
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