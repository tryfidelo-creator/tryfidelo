import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '@/components/common/Logo';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { ROUTES } from '@/lib/constants/routes';
import buyer from "@/assets/buyer.jpg"
import shop from "@/assets/shop.jpg"
import ecom from "@/assets/ecommm.jpg"
import shopper from "@/assets/shopper.jpg"

const IMAGES = [buyer, shop, ecom, shopper]

export function OTPVerificationPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setImgIndex(i => (i + 1) % IMAGES.length), 4000)
    return () => clearInterval(timer)
  }, [])

  const handleResendCode = () => {
    console.log('Resend code');
  };

  const handleNext = () => {
    if (otp.length === 4) {
      navigate(ROUTES.SECURITY_SETUP);
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
            className="w-full max-w-md relative z-10 text-center"
          >
            <h1 className="text-5xl font-bold mb-3">Verify Your Code</h1>
            <p className="text-lg text-gray-600 mb-8">Enter the 4-digit code sent to you</p>

            <div className="mb-8 flex justify-center">
              <InputOTP
                maxLength={4}
                value={otp}
                onChange={setOtp}
                className="gap-4"
              >
                <InputOTPGroup className="gap-4">
                  <InputOTPSlot index={0} className="w-16 h-16 text-2xl border-2 border-orange-300 rounded-lg" />
                  <InputOTPSlot index={1} className="w-16 h-16 text-2xl border-2 border-orange-300 rounded-lg" />
                  <InputOTPSlot index={2} className="w-16 h-16 text-2xl border-2 border-orange-300 rounded-lg" />
                  <InputOTPSlot index={3} className="w-16 h-16 text-2xl border-2 border-orange-300 rounded-lg" />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <div className="flex gap-3 justify-center mb-6">
              <Button
                type="button"
                onClick={handleResendCode}
                className="px-6 h-12 bg-white border-2 border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 font-semibold"
              >
                Resend
              </Button>
              <Button
                type="button"
                onClick={handleNext}
                disabled={otp.length !== 4}
                className="px-8 h-12 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold disabled:opacity-50"
              >
                Verify
              </Button>
            </div>

            <p className="text-sm text-gray-600">
              Didn't receive code? <a href="#" className="text-orange-600 font-semibold hover:underline">Try again</a>
            </p>
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