import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '@/components/common/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ROUTES } from '@/lib/constants/routes';
import { Lock } from 'lucide-react';
import buyer from "@/assets/buyer.jpg"
import shop from "@/assets/shop.jpg"
import ecom from "@/assets/ecommm.jpg"
import shopper from "@/assets/shopper.jpg"

const IMAGES = [buyer, shop, ecom, shopper]

export function CreatePasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setImgIndex(i => (i + 1) % IMAGES.length), 4000)
    return () => clearInterval(timer)
  }, [])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword && password.length >= 8) {
      setIsLoading(true);
      setTimeout(() => {
        navigate(ROUTES.DASHBOARD);
      }, 500);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 h-16 border-b border-orange-200 bg-white flex items-center px-4 md:px-8">
        <Link to={ROUTES.HOME} className="flex items-center gap-2 hover:opacity-80">
          <Logo size="sm" />
          <span className="text-2xl font-black bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 bg-clip-text text-transparent">
            Fidelo
          </span>
        </Link>
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
            <h1 className="text-5xl font-bold mb-3">Create Password</h1>
            <p className="text-lg text-gray-600 mb-8">Secure your account with a strong password</p>

            <form onSubmit={handleSave} className="space-y-6">
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
                    placeholder="At least 8 characters"
                    className="pl-12 h-12 text-base"
                    required
                    minLength={8}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="font-semibold text-base block mb-2">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Retype password"
                    className="pl-12 h-12 text-base"
                    required
                    minLength={8}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={password !== confirmPassword || password.length < 8 || isLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold h-12 text-base disabled:opacity-50"
              >
                {isLoading ? "Saving..." : "Save Password"}
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Right: Images (Desktop Only) */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-8 relative overflow-hidden">
          {/* Shadow Mirror */}
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
          <div className="relative z-10">
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
  );
}