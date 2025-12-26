import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  DollarSign,
  TrendingUp,
  Shield,
  Clock,
  Award,
  ArrowRight,
  MapPin,
  Calendar,
  Smartphone,
  Package,
  Truck,
} from "lucide-react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ROUTES } from "@/lib/constants/routes"

const deliveryBenefits = [
  {
    icon: DollarSign,
    title: "Earn on Your Schedule",
    description: "Make money when you want. Accept deliveries that work for you. Get paid directly by customers.",
  },import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  DollarSign,
  TrendingUp,
  Shield,
  Clock,
  Award,
  ArrowRight,
  MapPin,
  Calendar,
  Smartphone,
  Package,
  Truck,
} from "lucide-react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ROUTES } from "@/lib/constants/routes"
import ecommm from "@/assets/ecommm.jpg"
import rider from "@/assets/rider.jpg"

const sendPackageBenefits = [
  {
    icon: MapPin,
    title: "Local & Long Distance",
    description: "Send packages within your city or across the country. We connect you with reliable riders.",
  },
  {
    icon: Shield,
    title: "Secure Delivery",
    description: "Track your package in real-time. Verified delivery partners ensure safe handling.",
  },
  {
    icon: Clock,
    title: "Fast & Flexible",
    description: "Same-day or scheduled delivery options. Choose pickup and delivery times that work for you.",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description: "Negotiate prices directly with riders. Pay only what you agree upon - cash or transfer.",
  },
]

const sendPackageSteps = [
  {
    step: "01",
    title: "Create Request",
    description: "Enter pickup and delivery locations, package details, and your preferred delivery time and pricing.",
  },
  {
    step: "02",
    title: "Available Riders See Request",
    description: "Nearby verified delivery partners are notified and can view your delivery request details.",
  },
  {
    step: "03",
    title: "Track Status & Receive Package",
    description:
      "Monitor your package in real-time from pickup to delivery. Confirm receipt and pay the rider directly.",
  },
]

const deliveryBenefits = [
  {
    icon: DollarSign,
    title: "Earn on Your Schedule",
    description: "Make money when you want. Accept deliveries that work for you. Get paid directly by customers.",
  },
  {
    icon: MapPin,
    title: "Work in Your Area",
    description: "Deliver locally in areas you know. Choose your radius and preferred locations.",
  },
  {
    icon: Clock,
    title: "Complete Flexibility",
    description: "No minimum hours. Work full-time, part-time, or whenever you have spare time.",
  },
  {
    icon: TrendingUp,
    title: "Simple Platform Fee",
    description:
      "Fund your wallet to cover the platform connection fee. We connect you with customers seeking delivery.",
  },
  {
    icon: Award,
    title: "Bonus Incentives",
    description: "Earn bonuses for peak hours, completing milestones, and maintaining high ratings.",
  },
]

const deliveryHowItWorks = [
  {
    step: "01",
    title: "Sign Up & Get Verified",
    description: "Complete a quick registration and upload your ID and vehicle documents for verification.",
  },
  {
    step: "02",
    title: "Go Online & Accept Orders",
    description: "Open the app, go online, and start receiving nearby delivery requests instantly.",
  },
  {
    step: "03",
    title: "Pick Up & Deliver",
    description: "Navigate to pickup location, collect the package, and deliver to the customer.",
  },
  {
    step: "04",
    title: "Get Paid Your Way",
    description: "Complete the delivery and receive payment directly from the customer via cash or transfer.",
  },
]

const requirements = [
  {
    icon: Calendar,
    title: "Age Requirement",
    description: "Be at least 18 years old with a valid government-issued ID.",
  },
  {
    icon: MapPin,
    title: "Transportation",
    description: "Have access to a bike, motorcycle, or car in good working condition.",
  },
  {
    icon: Smartphone,
    title: "Smart Device",
    description: "Own a smartphone with GPS and data plan for the delivery app.",
  },
]

export function DeliveryPage() {
  const scrollToDeliveryPartner = () => {
    document.getElementById("delivery-partner")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/30 to-white">
      <Header />

      <section className="relative text-white overflow-hidden min-h-[500px] sm:min-h-[600px] md:min-h-[700px]">
        <div className="absolute inset-0">
          <img src={ecommm || "/placeholder.svg"} alt="Send Packages" className="w-full h-full object-cover" />
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
              Send Packages,
              <br />
              <span className="bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 bg-clip-text text-transparent">
                Your Way
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 mb-8 sm:mb-10 leading-relaxed text-pretty">
              Connect with verified delivery partners. Fast, secure, and affordable package delivery at your terms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={ROUTES.REGISTER}>
                <Button className="cursor-pointer group w-full sm:w-auto bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white font-bold text-base md:text-lg h-12 sm:h-14 px-8 rounded-xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 border-0">
                  Create Request Now
                  <Package className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                onClick={scrollToDeliveryPartner}
                className="cursor-pointer group w-full sm:w-auto bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white/20 text-white font-bold text-base md:text-lg h-12 sm:h-14 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Become a Partner
                <Truck className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <p className="text-amber-600 text-sm sm:text-base md:text-lg font-bold mb-3 sm:mb-4 uppercase tracking-wide">
              Why Fidelo Delivery
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 sm:mb-6 text-balance">
              The Benefits of Sending with{" "}
              <span className="bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 bg-clip-text text-transparent">
                Fidelo
              </span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              Connect with verified delivery partners and pay directly. No platform fees on your deliveries.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {sendPackageBenefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-2 border-amber-100 hover:border-amber-300 shadow-lg hover:shadow-2xl transition-all duration-300 h-full bg-gradient-to-br from-white via-amber-50/30 to-orange-50/30 hover:-translate-y-2 group">
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
              How It Works
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 sm:mb-6 text-balance">
              How to{" "}
              <span className="bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 bg-clip-text text-transparent">
                Send a Package
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {sendPackageSteps.map((step, index) => (
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
                {index < sendPackageSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-orange-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Send Package CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12 sm:mt-16"
          >
            <Link to={ROUTES.REGISTER}>
              <Button className="cursor-pointer group bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white font-bold text-base md:text-lg h-12 sm:h-14 px-10 rounded-xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 border-0">
                Create Your First Request
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <p className="text-gray-600 mt-4 text-sm">No fees • Direct payment with riders</p>
          </motion.div>
        </div>
      </section>

      <section id="delivery-partner" className="py-16 sm:py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <p className="text-cyan-600 text-sm sm:text-base md:text-lg font-bold mb-3 sm:mb-4 uppercase tracking-wide">
              Why Deliver With Us
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 sm:mb-6 text-balance">
              The Benefits of Being a{" "}
              <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Delivery Partner
              </span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              We connect you with delivery opportunities — you receive payment directly from customers however you
              prefer.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {deliveryBenefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-2 border-cyan-100 hover:border-cyan-300 shadow-lg hover:shadow-2xl transition-all duration-300 h-full bg-gradient-to-br from-white via-cyan-50/30 to-blue-50/30 hover:-translate-y-2 group">
                    <CardContent className="p-6 sm:p-8">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 mb-5 sm:mb-6 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
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

      {/* Getting Started Section */}
      <section className="py-16 sm:py-20 md:py-28 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <p className="text-cyan-600 text-sm sm:text-base md:text-lg font-bold mb-3 sm:mb-4 uppercase tracking-wide">
              Getting Started
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 sm:mb-6 text-balance">
              How to{" "}
              <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Start Delivering
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {deliveryHowItWorks.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="border-2 border-cyan-200 shadow-lg h-full bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <CardContent className="p-6 sm:p-8">
                    <div className="text-7xl sm:text-8xl font-black text-cyan-100 mb-4">{step.step}</div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900">{step.title}</h3>
                    <p className="text-gray-600 text-base leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
                {index < deliveryHowItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-cyan-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 sm:py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <p className="text-cyan-600 text-sm sm:text-base md:text-lg font-bold mb-3 sm:mb-4 uppercase tracking-wide">
              Requirements
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 sm:mb-6 text-balance">
              What You{" "}
              <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Need
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {requirements.map((req, index) => {
              const Icon = req.icon
              return (
                <motion.div
                  key={req.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-2 border-cyan-100 hover:border-cyan-400 shadow-lg hover:shadow-2xl transition-all duration-300 h-full bg-white hover:-translate-y-3 group cursor-pointer">
                    <CardContent className="p-8">
                      <div className="w-20 h-20 mb-6 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300 mx-auto">
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-center text-gray-900">{req.title}</h3>
                      <p className="text-gray-600 text-base leading-relaxed text-center">{req.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Ready to Start Earning Section */}
      <section
        className="py-16 sm:py-20 md:py-28 relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.7) 100%), url(${rider || "/placeholder.svg"})`,
        }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center text-white bg-black/40 backdrop-blur-sm rounded-2xl p-8 sm:p-10 md:p-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-6 sm:mb-8 text-balance">
              Ready to{" "}
              <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 bg-clip-text text-transparent">
                Start Earning?
              </span>
            </h2>
            <p className="text-gray-200 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Join thousands of delivery partners earning on their own schedule. Sign up today and start receiving
              delivery requests.
            </p>
            <Link to={ROUTES.REGISTER}>
              <Button className="cursor-pointer group bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white font-bold text-base md:text-lg h-12 sm:h-14 px-10 rounded-xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 border-0">
                Become a Delivery Partner
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

     <Footer />
    </div>
  )
}

  {
    icon: MapPin,
    title: "Work in Your Area",
    description: "Deliver locally in areas you know. Choose your radius and preferred locations.",
  },
  
  {
    icon: Clock,
    title: "Complete Flexibility",
    description: "No minimum hours. Work full-time, part-time, or whenever you have spare time.",
  },
  {
    icon: TrendingUp,
    title: "Simple Platform Fee",
    description:
      "Fund your wallet to cover the platform connection fee. We connect you with customers seeking delivery.",
  },
  {
    icon: Award,
    title: "Bonus Incentives",
    description: "Earn bonuses for peak hours, completing milestones, and maintaining high ratings.",
  },
]

const howItWorks = [
  {
    step: "01",
    title: "Sign Up & Get Verified",
    description: "Complete a quick registration and upload your ID and vehicle documents for verification.",
  },
  {
    step: "02",
    title: "Go Online & Accept Orders",
    description: "Open the app, go online, and start receiving nearby delivery requests instantly.",
  },
  {
    step: "03",
    title: "Pick Up & Deliver",
    description: "Navigate to pickup location, collect the package, and deliver to the customer.",
  },
  {
    step: "04",
    title: "Get Paid Your Way",
    description: "Complete the delivery and receive payment directly from the customer via cash or transfer.",
  },
]

const requirements = [
  {
    icon: Calendar,
    title: "Age Requirement",
    description: "Be at least 18 years old with a valid government-issued ID.",
  },
  {
    icon: MapPin,
    title: "Transportation",
    description: "Have access to a bike, motorcycle, or car in good working condition.",
  },
  {
    icon: Smartphone,
    title: "Smart Device",
    description: "Own a smartphone with GPS and data plan for the delivery app.",
  },
]

const sendPackageBenefits = [
  {
    icon: MapPin,
    title: "Local & Long Distance",
    description: "Send packages within your city or across the country. We connect you with reliable riders.",
  },
  {
    icon: Shield,
    title: "Secure Delivery",
    description: "Track your package in real-time. Verified delivery partners ensure safe handling.",
  },
  {
    icon: Clock,
    title: "Fast & Flexible",
    description: "Same-day or scheduled delivery options. Choose pickup and delivery times that work for you.",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description: "Negotiate prices directly with riders. Pay only what you agree upon - cash or transfer.",
  },
]

const sendPackageSteps = [
  {
    step: "01",
    title: "Create Request",
    description: "Enter pickup and delivery locations, package details, and your preferred delivery time and pricing.",
  },
  {
    step: "02",
    title: "Available Riders See Request",
    description: "Nearby verified delivery partners are notified and can view your delivery request details.",
  },
  {
    step: "03",
    title: "Track Status & Receive Package",
    description:
      "Monitor your package in real-time from pickup to delivery. Confirm receipt and pay the rider directly.",
  },
]

export function DeliveryPage() {
  const scrollToSendPackage = () => {
    document.getElementById("send-package")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-cyan-50/30 to-white">
      <Header />

      {/* Hero Section */}
      <section className="relative text-white overflow-hidden min-h-[500px] sm:min-h-[600px] md:min-h-[700px]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=1200"
            alt="Delivery Partner"
            className="w-full h-full object-cover"
          />
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
              Deliver Packages,
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Earn Daily Income
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 mb-8 sm:mb-10 leading-relaxed text-pretty">
              Be your own boss. Set your own hours. Earn more delivering packages in your local area.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={ROUTES.REGISTER}>
                <Button className="cursor-pointer group w-full sm:w-auto bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white font-bold text-base md:text-lg h-12 sm:h-14 px-8 rounded-xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 border-0">
                  Become a Partner
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                onClick={scrollToSendPackage}
                className="cursor-pointer group w-full sm:w-auto bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white/20 text-white font-bold text-base md:text-lg h-12 sm:h-14 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Send a Package
                <Package className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
            <p className="text-cyan-600 text-sm sm:text-base md:text-lg font-bold mb-3 sm:mb-4 uppercase tracking-wide">
              Why Deliver With Us
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 sm:mb-6 text-balance">
              The Benefits of Being a{" "}
              <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Delivery Partner
              </span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              We connect you with delivery opportunities — you receive payment directly from customers however you
              prefer.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {deliveryBenefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-2 border-cyan-100 hover:border-cyan-300 shadow-lg hover:shadow-2xl transition-all duration-300 h-full bg-gradient-to-br from-white via-cyan-50/30 to-blue-50/30 hover:-translate-y-2 group">
                    <CardContent className="p-6 sm:p-8">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 mb-5 sm:mb-6 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
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
      <section className="py-16 sm:py-20 md:py-28 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <p className="text-cyan-600 text-sm sm:text-base md:text-lg font-bold mb-3 sm:mb-4 uppercase tracking-wide">
              Getting Started
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 sm:mb-6 text-balance">
              How to{" "}
              <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Start Delivering
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
                <Card className="border-2 border-cyan-200 shadow-lg h-full bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <CardContent className="p-6 sm:p-8">
                    <div className="text-7xl sm:text-8xl font-black text-cyan-100 mb-4">{step.step}</div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900">{step.title}</h3>
                    <p className="text-gray-600 text-base leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-cyan-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 sm:py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <p className="text-cyan-600 text-sm sm:text-base md:text-lg font-bold mb-3 sm:mb-4 uppercase tracking-wide">
              Requirements
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 sm:mb-6 text-balance">
              What You{" "}
              <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Need
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {requirements.map((req, index) => {
              const Icon = req.icon
              return (
                <motion.div
                  key={req.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-2 border-cyan-100 hover:border-cyan-400 shadow-lg hover:shadow-2xl transition-all duration-300 h-full bg-white hover:-translate-y-3 group cursor-pointer">
                    <CardContent className="p-8">
                      <div className="w-20 h-20 mb-6 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300 mx-auto">
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-center text-gray-900">{req.title}</h3>
                      <p className="text-gray-600 text-base leading-relaxed text-center">{req.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Send Package Section */}
      <section
        id="send-package"
        className="py-16 sm:py-20 md:py-28 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <p className="text-orange-600 text-sm sm:text-base md:text-lg font-bold mb-3 sm:mb-4 uppercase tracking-wide">
              Send Packages
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 sm:mb-6 text-balance">
              Need to{" "}
              <span className="bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 bg-clip-text text-transparent">
                Send a Package?
              </span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              Connect with verified delivery partners in your area. Fast, secure, and affordable package delivery.
            </p>
          </motion.div>

          {/* Send Package Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
            {sendPackageBenefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-2 border-orange-100 hover:border-orange-300 shadow-lg hover:shadow-2xl transition-all duration-300 h-full bg-white hover:-translate-y-2 group">
                    <CardContent className="p-6">
                      <div className="w-14 h-14 mb-5 bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-gray-900">{benefit.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* How to Send Package Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">How It Works</h3>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12">
            {sendPackageSteps.map((step, index) => (
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
                {index < sendPackageSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-orange-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Send Package CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link to={ROUTES.REGISTER}>
              <Button className="cursor-pointer group bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white font-bold text-base md:text-lg h-12 sm:h-14 px-10 rounded-xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 border-0">
                Create Delivery Request
                <Truck className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <p className="text-gray-600 mt-4 text-sm">No fees for posting requests • Pay riders directly</p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-cyan-900/90 to-blue-900/90 text-white py-16 sm:py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=1200"
            alt="Start Delivering Today"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/60 via-blue-600/70 to-indigo-700/60" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 sm:mb-8 text-balance">
              <span className="bg-gradient-to-r from-cyan-200 via-blue-100 to-white bg-clip-text text-transparent">
                Start Earning Today
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed font-medium text-pretty">
              Join thousands of delivery partners earning flexible income. We connect, you deliver and get paid
              directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to={ROUTES.REGISTER}>
                <Button className="cursor-pointer bg-white text-cyan-600 hover:bg-cyan-50 font-bold text-base md:text-lg h-12 sm:h-14 px-10 rounded-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300">
                  Sign Up as Delivery Partner
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <p className="text-white/80 text-sm">Fund wallet for platform access • Earn flexible income</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
