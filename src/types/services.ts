export interface Service {
  id: string;
  providerId: string;
  title: string;
  description: string;
  category: string;
  basePrice?: number;
  images: string[];
  rating: number;
  reviewCount: number;
  status: 'available' | 'unavailable';
  createdAt: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  customerId: string;
  providerId: string;
  agreedPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  scheduledDate?: string;
  createdAt: string;
}