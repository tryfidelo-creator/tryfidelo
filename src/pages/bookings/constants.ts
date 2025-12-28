export const BOOKINGS = [
  {
    id: '1',
    service: 'Professional House Cleaning',
    provider: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+234 701 234 5678',
    customer: 'John Doe',
    date: 'Dec 22, 2025',
    time: '2:00 PM',
    location: 'Lagos, Nigeria',
    price: 75,
    status: 'confirmed',
    description: 'Professional house cleaning service including all rooms and common areas.',
  },
  {
    id: '2',
    service: 'Plumbing Repair',
    provider: 'Mike Chen',
    email: 'mike@example.com',
    phone: '+234 702 345 6789',
    customer: 'Jane Smith',
    date: 'Dec 23, 2025',
    time: '10:00 AM',
    location: 'Abuja, Nigeria',
    price: 120,
    status: 'pending',
    description: 'Emergency plumbing repair for bathroom and kitchen fixtures.',
  },
  {
    id: '3',
    service: 'Electrical Work',
    provider: 'David Lee',
    email: 'david@example.com',
    phone: '+234 703 456 7890',
    customer: 'Alice Brown',
    date: 'Dec 24, 2025',
    time: '3:00 PM',
    location: 'Port Harcourt',
    price: 150,
    status: 'completed',
    description: 'Electrical installation and wiring for office space.',
  },
];

export type BookingStatus = 'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled';

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'completed':
      return 'bg-blue-100 text-blue-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
