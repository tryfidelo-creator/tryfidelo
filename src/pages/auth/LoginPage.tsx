import type React from "react"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Lock } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useToast } from "@/hooks/use-toast"

import { ROUTES } from "@/lib/constants/routes"
import { Logo } from "@/components/common/Logo"
import buyer from "@/assets/buyer.jpg"
import shop from "@/assets/shop.jpg"
import ecom from "@/assets/ecommm.jpg"
import shopper from "@/assets/shopper.jpg"

const IMAGES = [buyer, shop, ecom, shopper]

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { showSuccess, showError } = useToast()
  const [emailOrPhone, setEmailOrPhone] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [imgIndex, setImgIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setImgIndex(i => (i + 1) % IMAGES.length), 4000)
    return () => clearInterval(timer)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await login(emailOrPhone, password)
      showSuccess("Login successful! Welcome back.")
      navigate(ROUTES.DASHBOARD)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed. Please try again."
      setError(errorMessage)
      showError(errorMessage)
      setIsLoading(false)
    }
  }

  const handleGoogleSignup = () => {
    console.log("Google Signup")
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
            Don't have an account?{" "}
            <Link to={ROUTES.REGISTER} className="font-semibold text-orange-600 hover:text-orange-700 transition-colors">
              Sign Up
            </Link>
          </p>
        </div>
      </header>


      {/* Main Grid Layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left: Form */}
        <div className="w-full md:w-1/2 relative min-h-screen md:min-h-auto flex items-center justify-center p-4 md:p-10">
          {/* Mobile Background with Animation */}
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
            <h1 className="text-5xl font-bold mb-2 text-center">Welcome Back</h1>
            <p className="text-xl text-gray-600 mb-4 text-center">Sign in to your account</p>

            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 border-2 border-orange-200 rounded-2xl p-4 sm:p-6 mb-8 shadow-lg"
          >
            <p className="text-sm font-bold text-orange-900 mb-1">Demo Credentials:</p>
            <div className="text-xs sm:text-sm text-orange-800 space-y-2 font-medium">
              <p>customer@demo.com / customer123</p>
              <p>seller@demo.com / seller123</p>
              <p>provider@demo.com / provider123</p>
              <p>rider@demo.com / rider123</p>
            </div>
          </motion.div>

            <form onSubmit={handleLogin} className="space-y-6 mb-4">
              <div>
                <Label htmlFor="emailOrPhone" className="font-semibold text-base block mb-2">
                  Email or Phone
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="emailOrPhone"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder="customer@demo.com"
                    className="pl-12 h-12 text-base"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="font-semibold text-base block mb-2">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
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
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="text-center space-y-3">
              <p className="text-base text-gray-600">
                <Link to={ROUTES.FORGOT_PASSWORD} className="text-orange-600 font-semibold hover:underline">
                  Forgot password?
                </Link>
              </p>

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
                    Sign in with Google
                  </Button>
                </motion.div>


              <p className="text-sm text-gray-500">
                By signing in, you agree to our{" "}
                <Link to={ROUTES.TERMS} className="text-orange-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to={ROUTES.PRIVACY} className="text-orange-600 hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right: Images (Desktop Only) */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-0 relative overflow-hidden">
          {/* Shadow Mirror Effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`shadow-${imgIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.08 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute w-full h-full rounded-3xl blur-3xl"
                style={{
                  backgroundImage: `url(${IMAGES[imgIndex]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </AnimatePresence>
          </div>

          {/* Main Image with Fade Effect */}
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
                  className="w-full h-230 object-cover rounded-2xl"
                  alt="auth"
                />
                {/* Gradient Fade Edges */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent via-transparent to-gray-50 opacity-40 pointer-events-none" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/30 via-transparent to-white/30 opacity-30 pointer-events-none" />
                {/* Subtle Shadow */}
                <div className="absolute -inset-6 rounded-2xl bg-black/5 blur-2xl -z-10" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
