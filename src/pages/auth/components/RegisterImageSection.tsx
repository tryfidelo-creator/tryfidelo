import { motion, AnimatePresence } from "framer-motion"

interface RegisterImageSectionProps {
  IMAGES: string[]
  imgIndex: number
}

export function RegisterImageSection({ IMAGES, imgIndex }: RegisterImageSectionProps) {
  return (
    <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-0 relative overflow-hidden">
      {/* Shadow Mirror Effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`shadow-${imgIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.08 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute w-full h-full rounded-3xl blur-3xl"
            style={{
              backgroundImage: `url(${IMAGES[imgIndex]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </AnimatePresence>
      </div>

      {/* Main Image with some fade Effect */}
      <div className="relative z-10 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={imgIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <img
              src={IMAGES[imgIndex]}
              className="w-full h-230 object-cover rounded-sm"
              alt="auth"
            />
            {/* Gradient Fade Edges */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent via-transparent to-gray-50 opacity-40 pointer-events-none" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/30 via-transparent to-white/30 opacity-30 pointer-events-none" />
            {/* Subtle Shadow */}
            <div className="absolute -inset-6 rounded-2xl bg-black/5 blur-2xl -z-10" />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
