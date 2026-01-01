import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ROUTES } from '@/lib/constants/routes';
import { BRAND_COLORS } from '@/lib/constants/colors';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/30 to-white flex flex-col">
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
                  
                  {/* 404 Text */}
                  <text x="150" y="140" fontSize="80" fontWeight="bold" textAnchor="middle" 
                    fill={`url(#gradient404)`}>
                    404
                  </text>
                  
                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id="gradient404" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={BRAND_COLORS.yellow} />
                      <stop offset="50%" stopColor={BRAND_COLORS.orange} />
                      <stop offset="100%" stopColor={BRAND_COLORS.red} />
                    </linearGradient>
                  </defs>
                  
                  {/* Floating elements */}
                  <circle cx="80" cy="80" r="8" fill={BRAND_COLORS.orange} opacity="0.6" />
                  <circle cx="220" cy="100" r="6" fill={BRAND_COLORS.yellow} opacity="0.6" />
                  <circle cx="240" cy="200" r="7" fill={BRAND_COLORS.red} opacity="0.6" />
                </svg>
                
                {/* Animated search icon */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-10 right-10"
                >
                  <Search className="w-8 h-8 text-orange-500" />
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
                <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">
                  Page Not Found
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 mb-4">
                Oops! We couldn't find what you're looking for.
              </p>
              
              <p className="text-gray-500 mb-8">
                The page you're trying to access might have been moved, removed, or doesn't exist. Let's get you back on track.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Link to={ROUTES.HOME} className="flex-1 sm:flex-none">
                  <Button className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white font-semibold rounded-lg h-12 group">
                    <Home className="w-4 h-4 mr-2" />
                    Back to Home
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                <Link to={ROUTES.MARKETPLACE} className="flex-1 sm:flex-none">
                  <Button variant="outline" className="w-full border-2 border-orange-200 text-gray-700 hover:bg-orange-50 font-semibold rounded-lg h-12">
                    <Search className="w-4 h-4 mr-2" />
                    Browse Marketplace
                  </Button>
                </Link>
              </div>

              {/* Helpful Links */}
              <div className="mt-10 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-4">Need help?</p>
                <div className="flex flex-col gap-2">
                  <Link to={ROUTES.HELP_CENTER} className="text-orange-600 hover:text-orange-700 font-medium transition-colors">
                    → Visit Help Center
                  </Link>
                  <Link to={ROUTES.CONTACT} className="text-orange-600 hover:text-orange-700 font-medium transition-colors">
                    → Contact Support
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
