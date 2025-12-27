import type React from "react"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Lock } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { authenticateUser } from "@/lib/constants/demoCredentials"
import { ROUTES } from "@/lib/constants/routes"
import { Logo } from "@/components/common/Logo"

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [emailOrPhone, setEmailOrPhone] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    setTimeout(() => {
      const user = authenticateUser(emailOrPhone, password)

      if (user) {
        login(user)
        if (user.role === "admin") {
          navigate(ROUTES.ADMIN_DASHBOARD)
        } else {
          navigate(ROUTES.DASHBOARD)
        }
      } else {
        setError("Invalid credentials. Please try again.")
      }
      setIsLoading(false)
    }, 500)
  }

  const handleGoogleLogin = () => {
    console.log("Google login")
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
            Don't have an account?{" "}
            <Link
              to={ROUTES.REGISTER}
              className="font-semibold text-orange-600 hover:text-orange-700 transition-colors"
            >
              Sign up
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
          className="max-w-md mx-auto"
        >
          <div className="mb-8 sm:mb-10">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 text-gray-900">Welcome Back</h1>
            <p className="text-gray-600 text-lg">Sign in to access your Fidelo account</p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 border-2 border-orange-200 rounded-2xl p-4 sm:p-6 mb-8 shadow-lg"
          >
            <p className="text-sm font-bold text-orange-900 mb-3">Demo Credentials:</p>
            <div className="text-xs sm:text-sm text-orange-800 space-y-2 font-medium">
              <p>customer@demo.com / customer123</p>
              <p>seller@demo.com / seller123</p>
              <p>provider@demo.com / provider123</p>
              <p>rider@demo.com / rider123</p>
            </div>
          </motion.div>

          <form onSubmit={handleLogin} className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Label htmlFor="emailOrPhone" className="text-gray-900 font-semibold mb-2 block">
                Email or Phone
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="emailOrPhone"
                  type="text"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="customer@demo.com"
                  className="h-12 mt-1 pl-12 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-orange-500/10 transition-all"
                  required
                />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Label htmlFor="password" className="text-gray-900 font-semibold mb-2 block">
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
                  className="h-12 mt-1 pl-12 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-orange-500/10 transition-all"
                  required
                />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Button type="submit" disabled={isLoading} className="btn-primary cursor-pointer w-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white font-bold text-base md:text-lg h-12 sm:h-14 px-8 rounded-xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 border-0">
                {isLoading ? "Signing in..." : "Sign In"}
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
                <span className="px-2 bg-white text-gray-500 font-medium">or continue with</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <Button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full h-12 border-2 border-gray-300 bg-white text-gray-900 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all font-semibold flex items-center justify-center gap-3 cursor-pointer hover:scale-105"
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
                Continue with Google
              </Button>
            </motion.div>
          </form>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 pt-8 border-t border-gray-200 text-center"
          >
            <p className="text-sm text-gray-600 mb-4">
              <Link to="#" className="text-orange-600 hover:text-orange-700 font-semibold transition-colors">
                Forgot password?
              </Link>
            </p>
            <p className="text-xs text-gray-500">
              By signing in, you agree to our{" "}
              <Link to={ROUTES.TERMS} className="text-orange-600 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to={ROUTES.PRIVACY} className="text-orange-600 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
