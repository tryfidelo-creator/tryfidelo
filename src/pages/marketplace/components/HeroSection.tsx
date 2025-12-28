import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import cart from "@/assets/cart.jpg"

interface HeroSectionProps {
  onBrowseClick: () => void
}

export function HeroSection({ onBrowseClick }: HeroSectionProps) {
  return (
    <section className="relative text-white py-20 sm:py-24 md:py-32 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-black/60 z-10" />
      <img src={cart || "/placeholder.svg"} alt="Shopping" className="absolute inset-0 w-full h-full object-cover" />
      <div className="relative z-20 container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-left max-w-2xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-balance leading-tight">
              Discover Amazing{" "}
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                Deals
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 text-pretty leading-relaxed">
              Buy and sell products from trusted sellers in your community. Join thousands of happy buyers and sellers
              today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={onBrowseClick}
                className="cursor-pointer group bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white font-bold text-lg h-14 px-8 rounded-xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 border-0"
              >
                Browse Products
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <a href="/services">
                <Button className="cursor-pointer bg-white/10 backdrop-blur-md text-white border-2 border-white/50 hover:bg-white/20 hover:border-white font-bold text-lg h-14 px-8 rounded-xl transition-all duration-300 hover:scale-105">
                  Start Selling
                </Button>
                </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
