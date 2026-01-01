import type React from "react"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Phone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ROUTES } from "@/lib/constants/routes"
import { Logo } from "@/components/common/Logo"
import buyer from "@/assets/buyer.jpg"
import shop from "@/assets/shop.jpg"
import ecom from "@/assets/ecommm.jpg"
import shopper from "@/assets/shopper.jpg"

const IMAGES = [buyer, shop, ecom, shopper]

export function ForgotPasswordPage() {
  const navigate = useNavigate()
  const { showSuccess } = useToast()
  const [contactMethod, setContactMethod] = useState<"email" | "phone">("email")
  const [contact, setContact] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [imgIndex, setImgIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setImgIndex(i => (i + 1) % IMAGES.length), 4000)
    return () => clearInterval(timer)
  }, [])

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    setTimeout(() => {
      setMessage(`OTP sent to your ${contactMethod}`)
      showSuccess(`OTP sent to your ${contactMethod}`)
      setTimeout(() => {
        navigate(ROUTES.OTP_VERIFICATION)
      }, 1500)
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-white via-amber-50/80 to-orange-50/80 backdrop-blur-lg border-b-2 border-orange-200/50 shadow-md">
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-20">
          <Link
            to={ROUTES.HOME}
            className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-all duration-300 group"
          >
            <div className="relative">
              <Logo size="sm" />
            </div>
            <span className="text-2xl sm:text-3xl font-black tracking-tight logo-font">
              <span className="relative inline-block">
                <span className="relative bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 bg-clip-text text-transparent animate-gradient">
                  Fidelo
                </span>
              </span>
            </span>
          </Link>
          <p className="text-sm text-gray-600">
            Remembered your password?{" "}
            <Link to={ROUTES.LOGIN} className="font-semibold text-orange-600 hover:text-orange-700 transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left: Form */}
        <div className="w-full md:w-1/2 relative min-h-screen md:min-h-auto flex items-center justify-center p-4 md:p-10">
          {/* Mobile Background */}
          <div className="absolute inset-0 md:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={imgIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.12 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${IMAGES[imgIndex]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </AnimatePresence>
          </div>

          {/* Form Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md relative z-10"
          >
            <h1 className="text-5xl font-bold mb-3">Reset Password</h1>
            <p className="text-lg text-gray-600 mb-8">We'll send you a code to verify your identity</p>

            {message && (
              <Alert className="mb-6 bg-green-50 border-green-200">
                <AlertDescription className="text-green-800">{message}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSendOTP} className="space-y-6 mb-8">
              {/* Contact Method Selector */}
              <div className="space-y-3">
                <Label className="font-semibold text-base">Verify using:</Label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setContactMethod("email")}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 font-semibold transition ${
                      contactMethod === "email"
                        ? "border-orange-500 bg-orange-50 text-orange-600"
                        : "border-gray-200 bg-white text-gray-600 hover:border-orange-200"
                    }`}
                  >
                    Email
                  </button>
                  <button
                    type="button"
                    onClick={() => setContactMethod("phone")}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 font-semibold transition ${
                      contactMethod === "phone"
                        ? "border-orange-500 bg-orange-50 text-orange-600"
                        : "border-gray-200 bg-white text-gray-600 hover:border-orange-200"
                    }`}
                  >
                    Phone
                  </button>
                </div>
              </div>

              {/* Contact Input */}
              <div>
                <Label htmlFor="contact" className="font-semibold text-base block mb-2">
                  {contactMethod === "email" ? "Email Address" : "Phone Number"}
                </Label>
                <div className="relative">
                  {contactMethod === "email" ? (
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  ) : (
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  )}
                  <Input
                    id="contact"
                    type={contactMethod === "email" ? "email" : "tel"}
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder={contactMethod === "email" ? "john@example.com" : "+234 123 456 7890"}
                    className="pl-12 h-12 text-base"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold h-12 text-base"
              >
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </Button>
            </form>

          </motion.div>
        </div>

        {/* Right: Images (Desktop Only) */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-8 relative overflow-hidden">
          {/* Shadow Mirror Effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`shadow-${imgIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.08 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute w-80 h-96 rounded-3xl blur-3xl"
                style={{
                  backgroundImage: `url(${IMAGES[imgIndex]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </AnimatePresence>
          </div>

          {/* Main Image */}
          <div className="relative z-10 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={imgIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="relative"
              >
                <img
                  src={IMAGES[imgIndex]}
                  className="w-80 h-96 object-cover rounded-2xl"
                  alt="auth"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent via-transparent to-gray-50 opacity-40 pointer-events-none" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/30 via-transparent to-white/30 opacity-30 pointer-events-none" />
                <div className="absolute -inset-6 rounded-2xl bg-black/5 blur-2xl -z-10" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
