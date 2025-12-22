import type { User } from '@/types/user';

// Demo credentials for testing (remove in production)
export const DEMO_CREDENTIALS = {
  // Customer Account
  customer: {
    email: 'customer@demo.com',
    phone: '+234 111 111 1111',
    password: 'customer123',
    user: {
      id: '1',
      email: 'customer@demo.com',
      phone: '+234 111 111 1111',
      name: 'Demo Customer',
      role: 'customer' as const,
      isVerified: true,
      createdAt: new Date().toISOString(),
    },
  },
  // Seller Account
  seller: {
    email: 'seller@demo.com',
    phone: '+234 222 222 2222',
    password: 'seller123',
    user: {
      id: '2',
      email: 'seller@demo.com',
      phone: '+234 222 222 2222',
      name: 'Demo Seller',
      role: 'seller' as const,
      isVerified: true,
      createdAt: new Date().toISOString(),
    },
  },
  // Service Provider Account
  provider: {
    email: 'provider@demo.com',
    phone: '+234 333 333 3333',
    password: 'provider123',
    user: {
      id: '3',
      email: 'provider@demo.com',
      phone: '+234 333 333 3333',
      name: 'Demo Provider',
      role: 'service_provider' as const,
      isVerified: true,
      createdAt: new Date().toISOString(),
    },
  },
  // Delivery Rider Account
  rider: {
    email: 'rider@demo.com',
    phone: '+234 444 444 4444',
    password: 'rider123',
    user: {
      id: '4',
      email: 'rider@demo.com',
      phone: '+234 444 444 4444',
      name: 'Demo Rider',
      role: 'delivery_rider' as const,
      isVerified: true,
      createdAt: new Date().toISOString(),
    },
  },
  // Admin Account
  admin: {
    email: 'admin@demo.com',
    phone: '+234 555 555 5555',
    password: 'admin123',
    user: {
      id: '5',
      email: 'admin@demo.com',
      phone: '+234 555 555 5555',
      name: 'Demo Admin',
      role: 'admin' as const,
      isVerified: true,
      createdAt: new Date().toISOString(),
    },
  },
};

export function authenticateUser(emailOrPhone: string, password: string): User | null {
  const credentials = Object.values(DEMO_CREDENTIALS);
  
  for (const cred of credentials) {
    if ((cred.email === emailOrPhone || cred.phone === emailOrPhone) && cred.password === password) {
      return cred.user;
    }
  }
  
  return null;
}