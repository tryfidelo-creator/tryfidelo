import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Logo } from '@/components/common/Logo';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { ROUTES } from '@/lib/constants/routes';

export function OTPVerificationPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');

  const handleResendCode = () => {
    // TODO: API call to resend OTP
    console.log('Resend code');
  };

  const handleNext = () => {
    if (otp.length === 4) {
      // TODO: API call to verify OTP
      navigate(ROUTES.SECURITY_SETUP);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black py-4">
        <div className="container mx-auto px-4">
          <Link to={ROUTES.HOME} className="flex items-center gap-2 w-fit">
            <Logo size="sm" />
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto text-center"
        >
          <h1 className="text-3xl font-serif font-bold mb-2">
            Enter the 4-digit code sent to you
          </h1>
          <p className="text-3xl font-serif font-bold mb-12">
            at: {'{email}'}
          </p>

          <div className="flex justify-center mb-12">
            <InputOTP
              maxLength={4}
              value={otp}
              onChange={setOtp}
              className="gap-4"
            >
              <InputOTPGroup className="gap-4">
                <InputOTPSlot index={0} className="w-16 h-20 text-2xl border-2 border-black rounded-none" />
                <InputOTPSlot index={1} className="w-16 h-20 text-2xl border-2 border-black rounded-none" />
                <InputOTPSlot index={2} className="w-16 h-20 text-2xl border-2 border-black rounded-none" />
                <InputOTPSlot index={3} className="w-16 h-20 text-2xl border-2 border-black rounded-none" />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              type="button"
              onClick={handleResendCode}
              className="px-12 h-14 bg-black text-white rounded-full text-lg font-semibold hover:bg-gray-800 transition-all"
            >
              Resend Code
            </Button>
            <Button
              type="button"
              onClick={handleNext}
              disabled={otp.length !== 4}
              className="px-12 h-14 bg-black text-white rounded-full text-lg font-semibold hover:bg-gray-800 transition-all disabled:opacity-50"
            >
              Next
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}