import { motion } from "framer-motion"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Send } from "lucide-react"
import { toast } from "sonner"

interface ContactProviderModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  provider: {
    name: string
    email?: string
    phone?: string
  }
}

export function ContactProviderModal({
  open,
  onOpenChange,
  provider,
}: ContactProviderModalProps) {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!message.trim()) {
      toast.error("Please enter a message")
      return
    }

    setLoading(true)
    // Simulate sending message
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLoading(false)

    toast.success("Message sent to " + provider.name)
    setMessage("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-orange-500" />
              Contact {provider.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Provider Info */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-lg border border-orange-200">
              <p className="font-semibold text-gray-900">{provider.name}</p>
              {provider.email && (
                <p className="text-sm text-gray-600">{provider.email}</p>
              )}
              {provider.phone && (
                <p className="text-sm text-gray-600">{provider.phone}</p>
              )}
            </div>

            {/* Message Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Message
              </label>
              <Textarea
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-32 resize-none focus:ring-2 focus:ring-orange-500"
              />
              <p className="text-xs text-gray-500 mt-2">
                {message.length}/500 characters
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold"
                onClick={handleSend}
                disabled={loading || !message.trim()}
              >
                <Send className="h-4 w-4 mr-2" />
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
