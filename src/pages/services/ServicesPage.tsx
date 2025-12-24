import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { DollarSign, Users, TrendingUp, Shield, Clock, Award, ArrowRight, Package, Briefcase } from "lucide-react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ROUTES } from "@/lib/constants/routes"
import cart from "../../assets/cart.jpg"

const sellerBenefits = [
  {
    icon: DollarSign,
    title: "Direct Customer Payments",
    description:
      "Receive payments directly from customers via cash, bank transfer, or any method you prefer. We just connect you.",
  },
  {
    icon: Users,
    title: "Access to Millions of Buyers",
    description: "Reach customers across the country actively looking for products and services.",
  },
  {
    icon: Shield,
    title: "Simple Platform Fee",
    description: "Fund your wallet to cover our small platform fee. Only pay when you advertise your listings.",
  },
  {
    icon: Clock,
    title: "Flexible Schedule",
    description: "Work on your own time. Accept orders when it suits you.",
  },
  {
    icon: TrendingUp,
    title: "Boost Your Visibility",
    description: "Promote your listings with hourly ads. Track performance and control your advertising budget.",
  },
  {
    icon: Award,
    title: "Build Your Reputation",
    description: "Earn reviews, badges, and become a trusted seller on the platform.",
  },
]

const howItWorks = [
  {
    step: "01",
    title: "Create Your Profile",
    description: "Sign up and complete your seller profile with your business details and offerings.",
  },
  {
    step: "02",
    title: "List Your Products/Services",
    description: "Add your items or services with descriptions, images, and pricing. Optionally promote with ads.",
  },
  {
    step: "03",
    title: "Get Discovered",
    description: "Customers find you through search, categories, and recommendations.",
  },
  {
    step: "04",
    title: "Connect & Earn",
    description: "Accept orders, deliver quality, and receive payment directly from customers your way.",
  },
]

const sellerTypes = [
  {
    icon: Package,
    title: "Product Sellers",
    description: "Sell physical products from electronics to fashion, home goods, and more.",
    earnings: "Avg. $2,000+/month",
  },
  {
    icon: Briefcase,
    title: "Service Providers",
    description: "Offer professional services like tutoring, cleaning, tech support, and consulting.",
    earnings: "Avg. $3,500+/month",
  },
  {
    icon: Users,
    title: "Delivery Partners",
    description: "Earn by delivering packages and parcels in your local area on your schedule.",
    earnings: "Avg. $1,500+/month",
  },
]

export function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/30 to-white">
      <Header />

      {/* Hero Section */}
      <section className="relative text-white overflow-hidden min-h-[500px] sm:min-h-[600px] md:min-h-[700px]">
        <div className="absolute inset-0">
          <img src={cart || "/placeholder.svg"} alt="Start Selling" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32 lg:py-40 flex items-center min-h-[500px] sm:min-h-[600px] md:min-h-[700px]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-4 sm:mb-6 text-white text-balance">
              Turn Your Skills Into
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                Income Today
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 mb-8 sm:mb-10 leading-relaxed text-pretty">
              Start selling products, offering services, or delivering packages. Zero upfront costs, unlimited
              potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={ROUTES.REGISTER}>
                <Button className="cursor-pointer group w-full sm:w-auto bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white font-bold text-base md:text-lg h-12 sm:h-14 px-8 rounded-xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 border-0">
                  Start Selling Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button className="cursor-pointer w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border-2 border-white/50 hover:bg-white/20 hover:border-white font-bold text-base md:text-lg h-12 sm:h-14 px-8 rounded-xl transition-all duration-300 hover:scale-105">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
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
              Why Sell With Us
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 sm:mb-6 text-balance">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 bg-clip-text text-transparent">
                Succeed
              </span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              We connect you with customers — you handle payments your way. Just fund your wallet to cover our platform
              fee and optional advertising costs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {sellerBenefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-2 border-orange-100 hover:border-orange-300 shadow-lg hover:shadow-2xl transition-all duration-300 h-full bg-gradient-to-br from-white via-amber-50/30 to-orange-50/30 hover:-translate-y-2 group">
                    <CardContent className="p-6 sm:p-8">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 mb-5 sm:mb-6 bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                        <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900">{benefit.title}</h3>
                      <p className="text-gray-600 text-base leading-relaxed">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-20 md:py-28 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <p className="text-orange-600 text-sm sm:text-base md:text-lg font-bold mb-3 sm:mb-4 uppercase tracking-wide">
              Simple Process
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 sm:mb-6 text-balance">
              How It{" "}
              <span className="bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 bg-clip-text text-transparent">
                Works
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="border-2 border-orange-200 shadow-lg h-full bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <CardContent className="p-6 sm:p-8">
                    <div className="text-7xl sm:text-8xl font-black text-orange-100 mb-4">{step.step}</div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900">{step.title}</h3>
                    <p className="text-gray-600 text-base leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-orange-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seller Types Section */}
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
              Choose Your Path
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 sm:mb-6 text-balance">
              What Will You{" "}
              <span className="bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 bg-clip-text text-transparent">
                Sell?
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {sellerTypes.map((type, index) => {
              const Icon = type.icon
              return (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-2 border-orange-100 hover:border-orange-400 shadow-lg hover:shadow-2xl transition-all duration-300 h-full bg-white hover:-translate-y-3 group cursor-pointer">
                    <CardContent className="p-8">
                      <div className="w-20 h-20 mb-6 bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300 mx-auto">
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-center text-gray-900">{type.title}</h3>
                      <p className="text-gray-600 text-base leading-relaxed text-center mb-4">{type.description}</p>
                      <div className="text-center">
                        
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-orange-900/90 to-rose-900/90 text-white py-16 sm:py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={cart || "/placeholder.svg"}
            alt="Start Selling Today"
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 sm:mb-8 text-balance">
              <span className="bg-gradient-to-r from-yellow-200 via-amber-100 to-white bg-clip-text text-transparent">
                Ready to Start Earning?
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed font-medium text-pretty">
              Join thousands of successful sellers. We connect you with customers, you get paid directly your way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to={ROUTES.REGISTER}>
                <Button className="cursor-pointer bg-white text-orange-600 hover:bg-yellow-50 font-bold text-base md:text-lg h-12 sm:h-14 px-10 rounded-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300">
                  Create Seller Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <p className="text-white/80 text-sm">No upfront fees • Fund wallet for ads & platform access</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
