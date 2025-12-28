import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/lib/constants/routes"
import store from "@/assets/store.jpg"

interface HeroSectionProps {
  onLearnMore: () => void
}

export function HeroSection({ onLearnMore }: HeroSectionProps) {
  return (
    <section className="relative text-white overflow-hidden min-h-[500px] sm:min-h-[600px] md:min-h-[700px]">
      <div className="absolute inset-0">
        <img src={store || "/placeholder.svg"} alt="Start Selling" className="w-full h-full object-cover" />
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
            Earn
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
              Your Way
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 mb-8 sm:mb-10 leading-relaxed text-pretty">
            Start selling products, offering services, or delivering packages. Zero upfront costs, unlimited potential.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to={ROUTES.REGISTER}>
              <Button className="cursor-pointer group w-full sm:w-auto bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white font-bold text-base md:text-lg h-12 sm:h-14 px-8 rounded-xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 border-0">
                Start Selling Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button
              onClick={onLearnMore}
              className="cursor-pointer w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border-2 border-white/50 hover:bg-white/20 hover:border-white font-bold text-base md:text-lg h-12 sm:h-14 px-8 rounded-xl transition-all duration-300 hover:scale-105"
            >
              Learn More
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
