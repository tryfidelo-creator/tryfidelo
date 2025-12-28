import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { BookingDetailsModal } from '@/components/bookings/BookingDetailsModal';
import { ContactProviderModal } from '@/components/bookings/ContactProviderModal';
import { BookingCard } from './components/BookingCard';
import { BookingsFilter } from './components/BookingsFilter';
import { BOOKINGS } from './constants';

export function BookingsPage() {
  const [filter, setFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const [contactingProvider, setContactingProvider] = useState<string | null>(null);

  const filteredBookings = useMemo(() => {
    return filter === 'all'
      ? BOOKINGS
      : BOOKINGS.filter((b) => b.status === filter);
  }, [filter]);

  const selectedBookingData = BOOKINGS.find((b) => b.id === selectedBooking);
  const contactingProviderData = BOOKINGS.find(
    (b) => b.id === contactingProvider
  );

  return (
    <DashboardLayout>
      <div className="p-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Header */}
          <div>
            <h1 className="heading-xl mb-2">My Bookings</h1>
            <p className="text-gray-600">Manage your service bookings</p>
          </div>

          {/* Filter */}
          <BookingsFilter
            filter={filter}
            onFilterChange={setFilter}
            count={filteredBookings.length}
          />

          {/* Bookings List */}
          <div className="space-y-4">
            {filteredBookings.map((booking, index) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onViewDetails={setSelectedBooking}
                onContactProvider={setContactingProvider}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      {selectedBookingData && (
        <BookingDetailsModal
          open={!!selectedBooking}
          onOpenChange={(open) => !open && setSelectedBooking(null)}
          booking={selectedBookingData}
        />
      )}

      {contactingProviderData && (
        <ContactProviderModal
          open={!!contactingProvider}
          onOpenChange={(open) => !open && setContactingProvider(null)}
          provider={{
            name: contactingProviderData.provider,
            email: contactingProviderData.email,
            phone: contactingProviderData.phone,
          }}
        />
      )}
    </DashboardLayout>
  );
}