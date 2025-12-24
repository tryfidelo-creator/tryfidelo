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
    <header className="sticky top-0 z-50 w-full bg-black text-white border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to={ROUTES.HOME}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Logo size="sm" />
            <span className="text-xl font-bold">
              <span className="text-brand-yellow">Try</span>
              <span className="text-white">Fidelo</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium hover:text-brand-yellow transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link to={ROUTES.LOGIN}>
              <Button
                variant="ghost"
                className="text-white hover:text-brand-yellow hover:bg-white/10"
              >
                Login
              </Button>
            </Link>
            <Link to={ROUTES.REGISTER}>
              <Button className="btn-primary">Get Started</Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[300px] bg-black text-white border-l border-white/10 p-4"
            >
              <nav className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="flex items-center gap-3 text-lg font-medium hover:text-brand-yellow transition-colors"
                    >
                      {Icon && <Icon className="h-5 w-5" />}
                      {link.label}
                    </Link>
                  )
                })}

                <div className="border-t border-white/10 pt-6 mt-6">
                  <Link to={ROUTES.LOGIN} className="block mb-4">
                    <Button
                      variant="outline"
                      className="w-full border-white bg-black text-white hover:bg-white hover:text-black"
                    >
                      Login
                    </Button>
                  </Link>

                  <Link to={ROUTES.REGISTER}>
                    <Button className="w-full btn-primary">
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
