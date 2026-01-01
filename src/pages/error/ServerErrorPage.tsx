import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Home, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ROUTES } from '@/lib/constants/routes';
import { BRAND_COLORS } from '@/lib/constants/colors';

export function ServerErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-red-50/30 to-white flex flex-col">
      <Header />
      
      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <div className="relative w-64 h-64">
                <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-lg">
                  {/* Background circle */}
                  <circle cx="150" cy="150" r="140" fill={`${BRAND_COLORS.cream}`} />
                  
                  {/* Server/Box illustration */}
                  <rect x="80" y="100" width="140" height="100" rx="8" fill="none" stroke={BRAND_COLORS.red} strokeWidth="3" />
                  <circle cx="105" cy="125" r="6" fill={BRAND_COLORS.red} />
                  <circle cx="135" cy="125" r="6" fill={BRAND_COLORS.orange} />
                  <circle cx="165" cy="125" r="6" fill={BRAND_COLORS.yellow} />
                  <circle cx="195" cy="125" r="6" fill={BRAND_COLORS.red} />
                  
                  {/* Lines representing error */}
                  <line x1="90" y1="160" x2="210" y2="160" stroke={BRAND_COLORS.orange} strokeWidth="2" />
                  <line x1="90" y1="180" x2="210" y2="180" stroke={BRAND_COLORS.orange} strokeWidth="2" />
                  
                  {/* Alert icon */}
                  <circle cx="150" cy="60" r="20" fill={BRAND_COLORS.red} opacity="0.1" />
                  <text x="150" y="70" fontSize="28" fontWeight="bold" textAnchor="middle" fill={BRAND_COLORS.red}>!</text>
                </svg>
                
                {/* Animated alert */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-4 right-4"
                >
                  <AlertCircle className="w-8 h-8 text-red-500" />
                </motion.div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center md:text-left"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  500
                </span>
              </h1>
              
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Server Error
              </h2>
              
              <p className="text-lg md:text-xl text-gray-600 mb-4">
                Something went wrong on our end.
              </p>
              
              <p className="text-gray-500 mb-8">
                Our team has been notified and is working to fix the issue. Please try again in a few moments or contact support if the problem persists.
              </p>

              {/* Status Info */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
                <p className="text-sm text-red-700 font-medium">
                  Error ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>
                <p className="text-xs text-red-600 mt-1">
                  Time: {new Date().toLocaleTimeString()}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <button
                  onClick={() => window.location.reload()}
                  className="flex-1 sm:flex-none px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold rounded-lg h-12 flex items-center justify-center group transition-all duration-300 hover:shadow-lg"
                >
                  <ArrowRight className="w-4 h-4 mr-2 rotate-180 group-hover:-translate-x-1 transition-transform" />
                  Try Again
                </button>

                <Link to={ROUTES.HOME} className="flex-1 sm:flex-none">
                  <Button variant="outline" className="w-full border-2 border-orange-200 text-gray-700 hover:bg-orange-50 font-semibold rounded-lg h-12">
                    <Home className="w-4 h-4 mr-2" />
                    Go Home
                  </Button>
                </Link>
              </div>

              {/* Support Link */}
              <div className="mt-10 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-4">Still having issues?</p>
                <Link to={ROUTES.CONTACT} className="text-red-600 hover:text-red-700 font-medium transition-colors">
                  → Contact Our Support Team
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
