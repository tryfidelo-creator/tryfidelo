import type React from "react"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroupItem } from "@/components/ui/radio-group"
import { useAuth } from "@/contexts/AuthContext"
import { ROUTES } from "@/lib/constants/routes"
import { User, Mail, Phone, Lock, ShoppingBag, Briefcase, Truck } from "lucide-react"
import type { UserRole } from "@/types/user"
import type { User as UserType } from "@/types/user"
import { Logo } from "@/components/common/Logo"

const roleOptions = [
  {
    id: "customer",
    label: "Customer/Buyer",
    description: "Browse and purchase products & services",
    icon: ShoppingBag,
    color: "from-blue-100 to-cyan-100",
    borderColor: "border-blue-300",
  },
  {
    id: "seller",
    label: "Seller",
    description: "List and sell products on marketplace",
    icon: ShoppingBag,
    color: "from-green-100 to-emerald-100",
    borderColor: "border-green-300",
  },
  {
    id: "service_provider",
    label: "Service Provider",
    description: "Offer professional services",
    icon: Briefcase,
    color: "from-purple-100 to-pink-100",
    borderColor: "border-purple-300",
  },
  {
    id: "delivery_rider",
    label: "Delivery Rider",
    description: "Deliver parcels and earn",
    icon: Truck,
    color: "from-orange-100 to-rose-100",
    borderColor: "border-orange-300",
  },
]

export function RegisterPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "customer" as UserRole,
  })

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      setStep(3)
    } else {
      handleRegister()
    }
  }

  const handleRegister = () => {
    setIsLoading(true)

    setTimeout(() => {
      const newUser: UserType = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        isVerified: true,
        createdAt: new Date().toISOString(),
      }

      login(newUser)

      if (newUser.role === "admin") {
        navigate(ROUTES.ADMIN_DASHBOARD)
      } else {
        navigate(ROUTES.DASHBOARD)
      }

      setIsLoading(false)
    }, 500)
  }

  const handleGoogleSignup = () => {
    console.log("Google signup")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-amber-50/30 to-white">
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
            Already have an account?{" "}
            <Link to={ROUTES.LOGIN} className="font-semibold text-orange-600 hover:text-orange-700 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex items-center">
                  <motion.div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-sm sm:text-base transition-all ${
                      step >= num
                        ? "bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 text-white shadow-lg"
                        : "bg-gray-200 text-gray-600"
                    }`}
                    animate={step === num ? { scale: 1.1 } : { scale: 1 }}
                  >
                    {num}
                  </motion.div>
                  {num < 3 && (
                    <div
                      className={`h-1 w-12 sm:w-16 md:w-24 mx-2 sm:mx-4 transition-all ${
                        step > num ? "bg-gradient-to-r from-amber-500 to-orange-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mb-8">
              <motion.h1
                key={step}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-4xl sm:text-5xl font-extrabold mb-2 text-gray-900"
              >
                {step === 1 && "Create your account"}
                {step === 2 && "Choose your role"}
                {step === 3 && "Set your password"}
              </motion.h1>
              <motion.p
                key={`desc-${step}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-gray-600 text-lg"
              >
                {step === 1 && "Join Fidelo and start your journey"}
                {step === 2 && "How will you use Fidelo?"}
                {step === 3 && "Secure your account with a strong password"}
              </motion.p>
            </div>
          </div>

          <form onSubmit={handleContinue} className="space-y-6">
            {step === 1 && (
              <>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <Label htmlFor="name" className="text-gray-900 font-semibold mb-2 block">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="h-12 pl-12 border-2 border-gray-200 rounded-xl focus:border-orange-500 transition-all"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <Label htmlFor="email" className="text-gray-900 font-semibold mb-2 block">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="h-12 pl-12 border-2 border-gray-200 rounded-xl focus:border-orange-500 transition-all"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <Label htmlFor="phone" className="text-gray-900 font-semibold mb-2 block">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+234 123 456 7890"
                      className="h-12 pl-12 border-2 border-gray-200 rounded-xl focus:border-orange-500 transition-all"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                  <Button type="submit" className="btn-primary cursor-pointer w-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white font-bold text-base md:text-lg h-12 sm:h-14 px-8 rounded-xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 border-0">
                    Continue
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="relative"
                >
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500 font-medium">or</span>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                  <Button
                    type="button"
                    onClick={handleGoogleSignup}
                    className="w-full h-12 border-2 border-gray-300 bg-white text-gray-900 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all font-semibold flex items-center justify-center gap-3 cursor-pointer"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Sign up with Google
                  </Button>
                </motion.div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {roleOptions.map((option) => {
                    const Icon = option.icon
                    return (
                      <motion.label
                        key={option.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`cursor-pointer border-2 rounded-2xl p-4 sm:p-6 transition-all ${
                          formData.role === option.id
                            ? `border-orange-500 bg-gradient-to-br ${option.color} shadow-lg`
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Icon className="h-5 w-5 text-gray-700" />
                              <h3 className="font-bold text-gray-900">{option.label}</h3>
                            </div>
                            <p className="text-sm text-gray-600">{option.description}</p>
                          </div>
                        </div>
                      </motion.label>
                    )
                  })}
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    onClick={() => setStep(1)}
                    variant="outline"
                    className="flex-1 h-12 rounded-xl border-2 border-gray-300 text-gray-900 font-semibold hover:bg-gray-50 cursor-pointer"
                  >
                    Back
                  </Button>
                  <Button type="submit" className="btn-primary flex-1 h-12 text-lg justify-center">
                    Continue
                  </Button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <Label htmlFor="password" className="text-gray-900 font-semibold mb-2 block">
                    Create Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Enter a strong password"
                      className="h-12 pl-12 border-2 border-gray-200 rounded-xl focus:border-orange-500 transition-all"
                      required
                      minLength={6}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Minimum 6 characters</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 text-sm text-amber-900"
                >
                  <p className="font-semibold mb-2">Password tips:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Use a mix of uppercase and lowercase letters</li>
                    <li>• Include numbers and special characters</li>
                    <li>• Avoid common words or personal information</li>
                  </ul>
                </motion.div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    variant="outline"
                    className="flex-1 h-12 rounded-xl border-2 border-gray-300 text-gray-900 font-semibold hover:bg-gray-50 cursor-pointer"
                  >
                    Back
                  </Button>
                  <Button type="submit" disabled={isLoading} className="btn-primary flex-1 h-12 text-lg justify-center">
                    {isLoading ? "Creating..." : "Create Account"}
                  </Button>
                </div>
              </>
            )}
          </form>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 pt-8 border-t border-gray-200 text-center text-xs sm:text-sm text-gray-600"
          >
            <p className="mb-2">
              By creating an account, you agree to our{" "}
              <Link to={ROUTES.TERMS} className="text-orange-600 hover:underline font-semibold">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to={ROUTES.PRIVACY} className="text-orange-600 hover:underline font-semibold">
                Privacy Policy
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
