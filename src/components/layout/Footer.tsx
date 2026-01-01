import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Logo } from "@/components/common/Logo"
import { ROUTES } from "@/lib/constants/routes"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <Logo size="sm" />
              <span className="text-2xl sm:text-3xl font-black tracking-tight logo-font">
              <span className="relative inline-block">
                <span className="relative bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 bg-clip-text text-transparent animate-gradient">
                  Fidelo
                </span>
              </span>
             </span>
            </div>
            <p className="text-sm text-gray-400 mb-6 sm:mb-8 leading-relaxed">
              Connecting everyday people to opportunity at scale
            </p>
            <div className="text-sm text-gray-400 space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <a
                  href="mailto:hello@fidelo.com"
                  className="hover:text-orange-400 transition-colors font-medium break-all"
                >
                  hello@fidelo.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span className="font-medium">(212) coming-soon</span>
              </div>
              <div className="flex items-start gap-2 mt-4">
                <MapPin className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">123 Anywhere St.</p>
                  <p>Any City, ST 12345</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link
                  to={ROUTES.MARKETPLACE}
                  className="hover:text-orange-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full group-hover:scale-150 transition-transform" />
                  Explore
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.SERVICES}
                  className="hover:text-orange-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full group-hover:scale-150 transition-transform" />
                  Start Selling
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.DELIVERIES}
                  className="hover:text-orange-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full group-hover:scale-150 transition-transform" />
                  Delivery
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.DASHBOARD}
                  className="hover:text-orange-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full group-hover:scale-150 transition-transform" />
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-white">Support</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link to="/help" className="hover:text-orange-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full group-hover:scale-150 transition-transform" />
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-orange-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full group-hover:scale-150 transition-transform" />
                  Safety
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-orange-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full group-hover:scale-150 transition-transform" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-orange-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full group-hover:scale-150 transition-transform" />
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-white">Follow Us</h3>
            <div className="flex gap-3 sm:gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white hover:scale-110 hover:shadow-lg transition-all duration-300"
              >
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-sky-400 to-sky-500 flex items-center justify-center text-white hover:scale-110 hover:shadow-lg transition-all duration-300"
              >
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center text-white hover:scale-110 hover:shadow-lg transition-all duration-300"
              >
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white hover:scale-110 hover:shadow-lg transition-all duration-300"
              >
                <Youtube className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-gradient-to-r from-transparent via-orange-500/30 to-transparent mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
          <p className="text-xs sm:text-sm text-gray-400">
            © {new Date().getFullYear()} <span className="text-orange-400 font-semibold">Fidelo™</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
