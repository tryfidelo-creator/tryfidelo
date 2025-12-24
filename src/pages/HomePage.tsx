import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ShoppingBag, Briefcase, Truck, HeadphonesIcon, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ROUTES } from "@/lib/constants/routes"
import { FEATURES } from "@/lib/constants"
import shop from "../assets/shop.jpg"
import buyer from "../assets/buyer.jpg"
import shopper from "../assets/shopper.jpg"
import cart from "../assets/cart.jpg"

const featureIcons = {
  marketplace: ShoppingBag,
  services: Briefcase,
  delivery: Truck,
  support: HeadphonesIcon,
}

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/30 to-white">
      <Header />

      {/* Hero Section */}
      <section className="relative text-white overflow-hidden min-h-[500px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[750px]">
        <div className="absolute inset-0">
          <img src={shop} alt="Online Marketplace" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32 lg:py-40 flex items-center min-h-[500px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[750px]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-4 sm:mb-6 text-white text-balance">
              Everything You Need,
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                One Platform
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 mb-8 sm:mb-10 leading-relaxed text-pretty">
              Discover products, book trusted services, and send packages with ease anytime, anywhere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={ROUTES.MARKETPLACE}>
                <Button className="group w-full sm:w-auto bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white font-bold text-base md:text-lg h-12 sm:h-14 px-8 rounded-xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 border-0">
                  Explore Marketplace
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to={ROUTES.REGISTER}>
                <Button className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border-2 border-white/50 hover:bg-white/20 hover:border-white font-bold text-base md:text-lg h-12 sm:h-14 px-8 rounded-xl transition-all duration-300 hover:scale-105">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <p className="text-orange-600 text-sm sm:text-base md:text-lg font-bold mb-3 sm:mb-4 uppercase tracking-wide">
              One Platform, Endless Possibilities
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 sm:mb-6 text-balance">
              Everything You Need in{" "}
              <span className="bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 bg-clip-text text-transparent">
                One Place
              </span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-pretty px-4 sm:px-0">
              From buying and selling to booking services and deliveries—we've got you covered
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {FEATURES.map((feature, index) => {
              const Icon = featureIcons[feature.id as keyof typeof featureIcons]
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-2 border-orange-100 hover:border-orange-300 shadow-lg hover:shadow-2xl transition-all duration-300 h-full bg-gradient-to-br from-white via-amber-50/30 to-orange-50/30 hover:-translate-y-3 group">
                    <CardContent className="p-4 sm:p-6 md:p-8 flex flex-col h-full">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-4 sm:mb-6 bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                      </div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-4 sm:mb-6 text-sm md:text-base leading-relaxed">
                        {feature.description}
                      </p>
                      <ul className="text-xs sm:text-sm space-y-2 sm:space-y-3 mt-auto">
                        {feature.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 sm:gap-3">
                            <Check className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Image Showcase Section */}
      <section className="bg-gradient-to-br from-amber-100 via-orange-100 to-rose-100 py-16 sm:py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <p className="text-orange-700 text-sm sm:text-base md:text-lg font-bold mb-4 sm:mb-6 text-balance px-4 sm:px-0">
              Redefining access to services, trade, and delivery for
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 bg-clip-text text-transparent">
              MILLIONS OF PEOPLE
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <img
                src={buyer}
                alt="Marketplace in action"
                className="w-full h-60 sm:h-72 md:h-80 lg:h-96 object-cover rounded-2xl sm:rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-300"
              />
              <img
                src={shopper}
                alt="Services platform"
                className="w-full h-60 sm:h-72 md:h-80 lg:h-96 object-cover rounded-2xl sm:rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-300"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-orange-900/90 to-rose-900/90 text-white py-16 sm:py-20 md:py-28 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={cart}
            alt="Join us"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600/60 via-rose-600/70 to-pink-700/60" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-6 sm:mb-8 text-balance">
              <span className="bg-gradient-to-r from-yellow-200 via-amber-100 to-white bg-clip-text text-transparent">
                Ready to Get Started?
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed font-medium text-pretty px-4 sm:px-0">
              Join thousands of users already enjoying seamless buying, selling, and service bookings
            </p>
            <Link to={ROUTES.REGISTER}>
              <Button className="bg-white cursor-pointer text-orange-600 hover:bg-yellow-50 font-bold text-sm sm:text-base md:text-lg h-12 sm:h-14 md:h-16 px-8 sm:px-12 rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300">
                Create Free Account
                <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
