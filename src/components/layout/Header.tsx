import { Link } from 'react-router-dom';
import { Menu, ShoppingBag, Briefcase, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/common/Logo';
import { ROUTES } from '@/lib/constants/routes';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center gap-2">
            <Logo size="sm" />
            <span className="text-xl font-bold">TryFidelo</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to={ROUTES.MARKETPLACE} className="text-sm font-medium hover:text-brand-yellow transition-colors">
              Marketplace
            </Link>
            <Link to={ROUTES.SERVICES} className="text-sm font-medium hover:text-brand-yellow transition-colors">
              Services
            </Link>
            <Link to={ROUTES.DELIVERIES} className="text-sm font-medium hover:text-brand-yellow transition-colors">
              Delivery
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link to={ROUTES.LOGIN}>
              <Button variant="ghost" className="text-white hover:text-brand-yellow hover:bg-white/10">
                Login
              </Button>
            </Link>
            <Link to={ROUTES.REGISTER}>
              <Button className="bg-brand-yellow text-black hover:bg-brand-orange btn-rounded-full">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-black text-white border-l border-white/10 p-4">
              <nav className="flex flex-col gap-6 mt-8">
                <Link to={ROUTES.MARKETPLACE} className="flex items-center gap-3 text-lg font-medium hover:text-brand-yellow transition-colors">
                  <ShoppingBag className="h-5 w-5" />
                  Marketplace
                </Link>
                <Link to={ROUTES.SERVICES} className="flex items-center gap-3 text-lg font-medium hover:text-brand-yellow transition-colors">
                  <Briefcase className="h-5 w-5" />
                  Services
                </Link>
                <Link to={ROUTES.DELIVERIES} className="flex items-center gap-3 text-lg font-medium hover:text-brand-yellow transition-colors">
                  <Truck className="h-5 w-5" />
                  Delivery
                </Link>
                <div className="border-t border-white/10 pt-6 mt-6">
                  <Link to={ROUTES.LOGIN} className="block mb-4">
                    <Button variant="outline" className="w-full border-white bg-black text-white hover:bg-white hover:text-black">
                      Login
                    </Button>
                  </Link>
                  <Link to={ROUTES.REGISTER}>
                    <Button className="w-full bg-brand-yellow text-black hover:bg-brand-orange">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}