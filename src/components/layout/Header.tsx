import { Link } from "react-router-dom"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/common/Logo"
import { ROUTES } from "@/lib/constants/routes"
import { NAV_LINKS, type NavLink } from "@/lib/constants"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface HeaderProps {
  navLinks?: readonly NavLink[]
}

export function Header({ navLinks = NAV_LINKS }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-white via-amber-50/80 to-orange-50/80 backdrop-blur-lg border-b-2 border-orange-200/50 shadow-md">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          {/* Logo */}
          <Link
            to={ROUTES.HOME}
            className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-all duration-300 group"
          >
            <div className="relative">
              <Logo size="sm" />
            </div>
            <span className="text-xl sm:text-2xl font-extrabold">
              <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent">
                Try
              </span>
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Fidelo</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="relative text-sm lg:text-base font-semibold text-gray-700 hover:text-orange-600 transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-600 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            <Link to={ROUTES.LOGIN}>
              <Button
                variant="ghost"
                className="text-sm lg:text-base cursor-pointer text-gray-700 hover:text-orange-600 hover:bg-orange-100 font-semibold transition-all duration-300"
              >
                Login
              </Button>
            </Link>
            <Link to={ROUTES.REGISTER}>
              <Button className="text-sm lg:text-base bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 text-white hover:from-amber-600 hover:via-orange-700 hover:to-rose-700 font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-full px-4 lg:px-6">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] bg-gradient-to-br from-white via-amber-50 to-orange-50 border-l-2 border-orange-200 p-6"
            >
              <nav className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="flex items-center gap-3 text-lg font-semibold text-gray-700 hover:text-orange-600 transition-colors"
                    >
                      {Icon && <Icon className="h-5 w-5" />}
                      {link.label}
                    </Link>
                  )
                })}
                <div className="border-t-2 border-orange-200 pt-6 mt-6">
                  <Link to={ROUTES.LOGIN} className="block mb-4">
                    <Button
                      variant="outline"
                      className="w-full border-2 border-orange-300 bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-semibold"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to={ROUTES.REGISTER}>
                    <Button className="w-full bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 text-white hover:from-amber-600 hover:via-orange-700 hover:to-rose-700 font-bold shadow-lg">
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
  )
}
