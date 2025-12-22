import { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Plus } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const transactions = [
  { id: '1', type: 'credit', amount: 100, description: 'Wallet Top-up', date: '2025-12-20 10:30 AM', balance: 450.75 },
  { id: '2', type: 'debit', amount: 45.50, description: 'Service Commission (10%)', date: '2025-12-19 3:15 PM', balance: 350.75 },
  { id: '3', type: 'credit', amount: 455, description: 'Service Payment Received', date: '2025-12-19 3:15 PM', balance: 396.25 },
  { id: '4', type: 'debit', amount: 5, description: 'Daily Ad Fee', date: '2025-12-19 12:00 AM', balance: -58.75 },
  { id: '5', type: 'credit', amount: 200, description: 'Wallet Top-up', date: '2025-12-18 2:00 PM', balance: -53.75 },
];

export function WalletPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const balance = 450.75;
  const totalEarnings = 1250;
  const totalCommissions = 125.50;

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="heading-xl mb-2">Wallet</h1>
          <p className="text-gray-600">Manage your earnings and transactions</p>
        </div>

        {/* Balance Card */}
        <Card className="mb-8 bg-gradient-primary text-white">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-black/80 mb-2">Available Balance</p>
                <h2 className="text-5xl font-bold mb-4 text-black">${balance.toFixed(2)}</h2>
                <Button className="bg-white text-black hover:bg-gray-100">
                  <Plus className="h-4 w-4 mr-2" />
                  Top Up Wallet
                </Button>
              </div>
              <div className="text-right">
                <div className="mb-4">
                  <p className="text-black/80 text-sm mb-1">Total Earnings</p>
                  <p className="text-2xl font-bold text-black">${totalEarnings.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-black/80 text-sm mb-1">Total Commissions</p>
                  <p className="text-2xl font-bold text-black">${totalCommissions.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">This Month</span>
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-green-600">+$455</p>
              <p className="text-xs text-gray-500 mt-1">Earnings</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">This Month</span>
                <TrendingDown className="h-5 w-5 text-red-600" />
              </div>
              <p className="text-3xl font-bold text-red-600">-$50.50</p>
              <p className="text-xs text-gray-500 mt-1">Commissions & Fees</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Net Income</span>
                <DollarSign className="h-5 w-5 text-brand-yellow" />
              </div>
              <p className="text-3xl font-bold">$404.50</p>
              <p className="text-xs text-gray-500 mt-1">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Transaction History</CardTitle>
              <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="week">This Week</TabsTrigger>
                  <TabsTrigger value="month">This Month</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {transaction.type === 'credit' ? (
                      <ArrowUpRight className="h-6 w-6 text-green-600" />
                    ) : (
                      <ArrowDownRight className="h-6 w-6 text-red-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{transaction.description}</h4>
                    <p className="text-sm text-gray-600">{transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xl font-bold ${
                      transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">Balance: ${transaction.balance.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}