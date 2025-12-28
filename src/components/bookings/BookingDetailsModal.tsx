import { motion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Calendar, Clock, MapPin, User, DollarSign } from "lucide-react"

interface BookingDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  booking: {
    id: string
    service: string
    provider: string
    customer?: string
    date: string
    time: string
    location: string
    price: number
    status: string
    description?: string
  }
}

export function BookingDetailsModal({
  open,
  onOpenChange,
  booking,
}: BookingDetailsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl">{booking.service}</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Status Badge */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-600">Status</span>
              <span className={`px-4 py-2 rounded-full font-semibold text-sm capitalize ${
                booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                'bg-red-100 text-red-800'
              }`}>
                {booking.status}
              </span>
            </div>

            {/* Details Grid */}
            <div className="border-t pt-4 space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-600">Provider</p>
                  <p className="font-semibold">{booking.provider}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-semibold">{booking.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="font-semibold">{booking.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-semibold">{booking.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-600">Price</p>
                  <p className="font-semibold text-lg">${booking.price}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            {booking.description && (
              <div className="border-t pt-4">
                <p className="text-sm text-gray-600 mb-2">Description</p>
                <p className="text-gray-700">{booking.description}</p>
              </div>
            )}
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
