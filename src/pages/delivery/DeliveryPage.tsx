import { useState } from 'react';
import { MapPin, Package, Clock } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function DeliveryPage() {
  const [pickupAddress, setPickupAddress] = useState('');
  const [dropoffAddress, setDropoffAddress] = useState('');
  const [parcelDescription, setParcelDescription] = useState('');

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API call to create delivery request
    console.log('Create delivery request');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="heading-xl mb-2">Parcel Delivery</h1>
          <p className="text-gray-600">Fast and reliable delivery service across the nation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Delivery Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Create Delivery Request</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateRequest} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <MapPin className="inline h-4 w-4 mr-1" />
                      Pickup Address
                    </label>
                    <Input
                      type="text"
                      value={pickupAddress}
                      onChange={(e) => setPickupAddress(e.target.value)}
                      placeholder="Enter pickup location"
                      className="h-12"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <MapPin className="inline h-4 w-4 mr-1" />
                      Drop-off Address
                    </label>
                    <Input
                      type="text"
                      value={dropoffAddress}
                      onChange={(e) => setDropoffAddress(e.target.value)}
                      placeholder="Enter drop-off location"
                      className="h-12"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Package className="inline h-4 w-4 mr-1" />
                      Parcel Description
                    </label>
                    <Textarea
                      value={parcelDescription}
                      onChange={(e) => setParcelDescription(e.target.value)}
                      placeholder="Describe your parcel (size, weight, fragile items, etc.)"
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full h-12 bg-brand-yellow text-black hover:bg-brand-orange">
                    Request Delivery
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-yellow flex items-center justify-center text-black font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Create Request</h4>
                    <p className="text-sm text-gray-600">Enter pickup and drop-off details</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center text-white font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Get Matched</h4>
                    <p className="text-sm text-gray-600">Available riders will see your request</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center text-white font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Negotiate Price</h4>
                    <p className="text-sm text-gray-600">Chat with rider to agree on price</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Track Delivery</h4>
                    <p className="text-sm text-gray-600">Monitor your parcel in real-time</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Base Fee</span>
                    <span className="font-semibold">Negotiable</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Platform Fee</span>
                    <span className="font-semibold">7%</span>
                  </div>
                  <div className="border-t pt-3">
                    <p className="text-xs text-gray-500">
                      <Clock className="inline h-3 w-3 mr-1" />
                      Payment is made offline to the rider
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}