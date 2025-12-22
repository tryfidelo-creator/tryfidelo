export interface Listing {
  id: string;
  sellerId: string;
  title: string;
  description: string;
  category: string;
  location: string;
  images: string[];
  basePrice?: number;
  isNegotiable: boolean;
  status: 'active' | 'paused' | 'sold';
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}