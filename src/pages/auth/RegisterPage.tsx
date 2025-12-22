import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Logo } from '@/components/common/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/lib/constants/routes';
import type { UserRole } from '@/types/user';
import type { User } from '@/types/user';

export function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'customer' as UserRole,
  });

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      // Complete registration
      handleRegister();
    }
  };

  const handleRegister = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newUser: User = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        isVerified: true,
        createdAt: new Date().toISOString(),
      };
      
      login(newUser);
      
      // Redirect based on role
      if (newUser.role === 'admin') {
        navigate(ROUTES.ADMIN_DASHBOARD);
      } else {
        navigate(ROUTES.DASHBOARD);
      }
      
      setIsLoading(false);
    }, 500);
  };

  const handleGoogleSignup = () => {
    // TODO: Implement Google OAuth
    console.log('Google signup');
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
          className="max-w-md mx-auto"
        >
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className={`h-2 w-12 rounded-full ${step >= 1 ? 'bg-brand-yellow' : 'bg-gray-200'}`} />
            <div className={`h-2 w-12 rounded-full ${step >= 2 ? 'bg-brand-yellow' : 'bg-gray-200'}`} />
            <div className={`h-2 w-12 rounded-full ${step >= 3 ? 'bg-brand-yellow' : 'bg-gray-200'}`} />
          </div>

          <h1 className="text-4xl font-serif font-bold text-center mb-2">
            {step === 1 ? 'Create your account' : step === 2 ? 'Choose your role' : 'Set your password'}
          </h1>
          <p className="text-center text-gray-600 mb-8">
            {step === 1 ? 'Join TryFidelo today' : step === 2 ? 'How will you use TryFidelo?' : 'Secure your account'}
          </p>

          <form onSubmit={handleContinue} className="space-y-6">
            {step === 1 && (
              <>
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="h-12 mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="h-12 mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+234 123 456 7890"
                    className="h-12 mt-1"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-black text-white rounded-full text-lg font-semibold hover:bg-gray-800 transition-all"
                >
                  Continue
                </Button>

                <div className="text-center">
                  <span className="text-gray-600">or</span>
                </div>

                <Button
                  type="button"
                  onClick={handleGoogleSignup}
                  variant="outline"
                  className="w-full h-12 border-2 bg-blue-50 border-blue-100 rounded-full text-lg font-semibold hover:bg-blue-100 transition-all flex items-center justify-center gap-3"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
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

                <p className="text-center text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link to={ROUTES.LOGIN} className="text-brand-yellow font-semibold hover:underline">
                    Sign in
                  </Link>
                </p>
              </>
            )}
            {step === 2 && (
              <>
                <RadioGroup
                  value={formData.role}
                  onValueChange={(value) => setFormData({ ...formData, role: value as UserRole })}
                  className="space-y-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-center space-x-3 border-2 rounded-lg p-4 cursor-pointer ${
                      formData.role === 'customer' ? 'border-brand-yellow bg-yellow-50' : 'border-gray-200'
                    }`}
                  >
                    <RadioGroupItem value="customer" id="customer" />
                    <Label htmlFor="customer" className="flex-1 cursor-pointer">
                      <div className="font-semibold">Customer/Buyer</div>
                      <div className="text-sm text-gray-600">Browse and purchase products & services</div>
                    </Label>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-center space-x-3 border-2 rounded-lg p-4 cursor-pointer ${
                      formData.role === 'seller' ? 'border-brand-yellow bg-yellow-50' : 'border-gray-200'
                    }`}
                  >
                    <RadioGroupItem value="seller" id="seller" />
                    <Label htmlFor="seller" className="flex-1 cursor-pointer">
                      <div className="font-semibold">Seller</div>
                      <div className="text-sm text-gray-600">List and sell products on marketplace</div>
                    </Label>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-center space-x-3 border-2 rounded-lg p-4 cursor-pointer ${
                      formData.role === 'service_provider' ? 'border-brand-yellow bg-yellow-50' : 'border-gray-200'
                    }`}
                  >
                    <RadioGroupItem value="service_provider" id="service_provider" />
                    <Label htmlFor="service_provider" className="flex-1 cursor-pointer">
                      <div className="font-semibold">Service Provider</div>
                      <div className="text-sm text-gray-600">Offer professional services</div>
                    </Label>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-center space-x-3 border-2 rounded-lg p-4 cursor-pointer ${
                      formData.role === 'delivery_rider' ? 'border-brand-yellow bg-yellow-50' : 'border-gray-200'
                    }`}
                  >
                    <RadioGroupItem value="delivery_rider" id="delivery_rider" />
                    <Label htmlFor="delivery_rider" className="flex-1 cursor-pointer">
                      <div className="font-semibold">Delivery Rider</div>
                      <div className="text-sm text-gray-600">Deliver parcels and earn</div>
                    </Label>
                  </motion.div>
                </RadioGroup>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    onClick={() => setStep(1)}
                    variant="outline"
                    className="flex-1 h-12 rounded-full text-lg font-semibold"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 h-12 bg-black text-white rounded-full text-lg font-semibold hover:bg-gray-800 transition-all"
                  >
                    Continue
                  </Button>
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <div>
                  <Label htmlFor="password">Create Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter a strong password"
                    className="h-12 mt-1"
                    required
                    minLength={6}
                  />
                  <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    variant="outline"
                    className="flex-1 h-12 rounded-full text-lg font-semibold"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 h-12 bg-black text-white rounded-full text-lg font-semibold hover:bg-gray-800 transition-all disabled:opacity-50"
                  >
                    {isLoading ? 'Creating...' : 'Create Account'}
                  </Button>
                </div>
              </>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
}