import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { ROUTES } from '@/lib/constants/routes';

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Logo size="sm" />
              <span className="text-2xl font-serif font-bold">
                <span className="text-brand-yellow">Try</span>
                <span className="text-brand-red">Fidelo</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-6">
              Connecting everyday people to opportunity—at scale
            </p>
            <div className="text-xs text-gray-500 space-y-1">
              <p className="font-semibold">hellotryfidelo.com</p>
              <p>(212) coming-soon</p>
              <p className="mt-3">123 Anywhere St.</p>
              <p>Any City, ST 12345</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to={ROUTES.MARKETPLACE} className="hover:text-brand-yellow transition-colors">Marketplace</Link></li>
              <li><Link to={ROUTES.SERVICES} className="hover:text-brand-yellow transition-colors">Services</Link></li>
              <li><Link to={ROUTES.DELIVERIES} className="hover:text-brand-yellow transition-colors">Delivery</Link></li>
              <li><Link to={ROUTES.DASHBOARD} className="hover:text-brand-yellow transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/help" className="hover:text-brand-yellow transition-colors">Help Center</Link></li>
              <li><Link to="/help" className="hover:text-brand-yellow transition-colors">Safety</Link></li>
              <li><Link to="/terms" className="hover:text-brand-yellow transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-brand-yellow transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-brand-yellow transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-brand-yellow transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-brand-yellow transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" aria-label="YouTube" className="text-gray-400 hover:text-brand-yellow transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>© 2025 TryFidelo™. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}