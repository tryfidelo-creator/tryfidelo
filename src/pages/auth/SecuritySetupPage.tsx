import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Logo } from '@/components/common/Logo';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants/routes';

export function SecuritySetupPage() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<'phone' | 'password' | null>(null);

  const handleNext = () => {
    if (selectedMethod === 'password') {
      navigate(ROUTES.CREATE_PASSWORD);
    } else if (selectedMethod === 'phone') {
      // TODO: Navigate to phone verification
      navigate(ROUTES.DASHBOARD);
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
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-4xl font-serif font-bold text-center mb-4">
            Secure your Account
          </h1>
          <p className="text-center text-gray-600 text-lg mb-12 max-w-xl mx-auto">
            Prevent unauthorized access to your account; choose an authentication method to protect your account.
          </p>

          <div className="space-y-4 mb-12">
            <button
              onClick={() => setSelectedMethod('phone')}
              className={`w-full h-20 border-2 rounded-full text-xl font-semibold transition-all ${
                selectedMethod === 'phone'
                  ? 'border-black bg-black text-white'
                  : 'border-black bg-white text-black hover:bg-gray-50'
              }`}
            >
              Phone Number
            </button>
            <button
              onClick={() => setSelectedMethod('password')}
              className={`w-full h-20 border-2 rounded-full text-xl font-semibold transition-all ${
                selectedMethod === 'password'
                  ? 'border-black bg-black text-white'
                  : 'border-black bg-white text-black hover:bg-gray-50'
              }`}
            >
              Create Password
            </button>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleNext}
              disabled={!selectedMethod}
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