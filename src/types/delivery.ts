export interface DeliveryRequest {
  id: string;
  customerId: string;
  riderId?: string;
  pickupAddress: string;
  dropoffAddress: string;
  parcelDescription: string;
  agreedPrice?: number;
  status: 'pending' | 'accepted' | 'picked_up' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface DeliveryLocation {
  address: string;
  lat: number;
  lng: number;
}