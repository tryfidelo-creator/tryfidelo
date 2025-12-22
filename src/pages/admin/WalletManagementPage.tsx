import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Plus, Search, TrendingUp, TrendingDown } from 'lucide-react';
import { AdminLayout } from '@/components/dashboard/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const users = [
  { id: '1', name: 'John Seller', role: 'seller', balance: 245.50, email: 'john@example.com' },
  { id: '2', name: 'Sarah Provider', role: 'service_provider', balance: 450.75, email: 'sarah@example.com' },
  { id: '3', name: 'Mike Rider', role: 'delivery_rider', balance: 320.50, email: 'mike@example.com' },
  { id: '4', name: 'Emma Seller', role: 'seller', balance: 125.00, email: 'emma@example.com' },
];

export function WalletManagementPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<typeof users[0] | null>(null);
  const [creditAmount, setCreditAmount] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCredit = () => {
    if (selectedUser && creditAmount) {
      // TODO: API call to credit wallet
      console.log(`Credit ${creditAmount} to ${selectedUser.name}`);
      setCreditAmount('');
      setSelectedUser(null);
    }
  };

  const totalBalance = users.reduce((sum, user) => sum + user.balance, 0);

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="heading-xl mb-2">Wallet Management</h1>
            <p className="text-gray-600">Manage user wallets and credits</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Total Balance</span>
                  <DollarSign className="h-5 w-5 text-brand-yellow" />
                </div>
                <p className="text-3xl font-bold">${totalBalance.toFixed(2)}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Active Wallets</span>
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <p className="text-3xl font-bold">{users.length}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Low Balance</span>
                  <TrendingDown className="h-5 w-5 text-red-600" />
                </div>
                <p className="text-3xl font-bold">{users.filter(u => u.balance < 200).length}</p>
              </CardContent>
            </Card>
          </div>

          {/* Users List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>User Wallets</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{user.name}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{user.role.replace('_', ' ')}</Badge>
                        <span className="text-sm text-gray-600">{user.email}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">${user.balance.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">Balance</p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => setSelectedUser(user)}
                          className="bg-brand-yellow text-black hover:bg-brand-orange"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Credit
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Credit Wallet</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                          <div>
                            <Label>User</Label>
                            <Input value={user.name} disabled className="mt-1" />
                          </div>
                          <div>
                            <Label htmlFor="amount">Amount ($)</Label>
                            <Input
                              id="amount"
                              type="number"
                              value={creditAmount}
                              onChange={(e) => setCreditAmount(e.target.value)}
                              placeholder="Enter amount"
                              className="mt-1"
                              min="1"
                            />
                          </div>
                          <Button
                            onClick={handleCredit}
                            className="w-full bg-brand-yellow text-black hover:bg-brand-orange"
                          >
                            Credit Wallet
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
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