import { motion } from "framer-motion"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FloatingActionButtonProps {
  href: string
}

export function FloatingActionButton({ href }: FloatingActionButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="fixed bottom-8 right-8 z-50"
    >
      <a href={href}>
        <Button className="cursor-pointer group bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white font-bold text-lg h-16 px-8 rounded-full shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 border-0">
          <Plus className="mr-2 h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
          Start Selling
        </Button>
      </a>
    </motion.div>
  )
}
