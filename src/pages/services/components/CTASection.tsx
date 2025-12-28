import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/lib/constants/routes"
import store from "@/assets/store.jpg"

export function CTASection() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-orange-900/90 to-rose-900/90 text-white py-16 sm:py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={store || "/placeholder.svg"}
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
  )
}
