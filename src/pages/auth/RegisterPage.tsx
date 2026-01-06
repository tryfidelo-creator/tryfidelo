import type React from "react"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/contexts/AuthContext"
import { useToast } from "@/hooks/use-toast"
import { ROUTES } from "@/lib/constants/routes"
import { ShoppingBag, Briefcase, Truck } from "lucide-react"
import type { UserRole } from "@/types/user"

import { Logo } from "@/components/common/Logo"
import buyer from "@/assets/buyer.jpg"
import shop from "@/assets/shop.jpg"
import ecom from "@/assets/ecommm.jpg"
import shopper from "@/assets/shopper.jpg"
import { RegisterStep1 } from "./components/RegisterStep1"
import { RegisterStep2 } from "./components/RegisterStep2"
import { RegisterStep3 } from "./components/RegisterStep3"
import { RegisterImageSection } from "./components/RegisterImageSection"

const IMAGES = [buyer, shop, ecom, shopper]

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
  const { register } = useAuth()
  const { showSuccess, showError } = useToast()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [imgIndex, setImgIndex] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "customer" as UserRole,
  })

  useEffect(() => {
    const timer = setInterval(() => setImgIndex(i => (i + 1) % IMAGES.length), 4000)
    return () => clearInterval(timer)
  }, [])

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

  const handleRegister = async () => {
    setIsLoading(true)

    try {
      const [firstName, ...lastNameParts] = formData.name.split(' ')
      const lastName = lastNameParts.join(' ')
      
      await register(formData.email, formData.password, firstName, lastName)
      showSuccess("Account created successfully! Welcome to Fidelo.")
      navigate(ROUTES.DASHBOARD)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Registration failed. Please try again."
      showError(errorMessage)
      console.error('Registration error:', errorMessage)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
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

          {/* Form Wrapper */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md relative z-10"
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
                className="text-3xl sm:text-5xl font-extrabold mb-2 text-gray-900"
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
            {step === 1 && <RegisterStep1 formData={formData} setFormData={setFormData} onSubmit={handleContinue} />}

            {step === 2 && <RegisterStep2 formData={formData} setFormData={setFormData} roleOptions={roleOptions} setStep={setStep} onSubmit={handleContinue} />}

            {step === 3 && <RegisterStep3 formData={formData} setFormData={setFormData} isLoading={isLoading} setStep={setStep} onSubmit={handleContinue} />}
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

        <RegisterImageSection IMAGES={IMAGES} imgIndex={imgIndex} />
      </div>
    </div>
  )
}
