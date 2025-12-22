export type UserRole = 'customer' | 'seller' | 'service_provider' | 'delivery_rider' | 'admin';

export interface User {
  id: string;
  email?: string;
  phone?: string;
  name: string;
  role: UserRole;
  avatar?: string;
  isVerified: boolean;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}