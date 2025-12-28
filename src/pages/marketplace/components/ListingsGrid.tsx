import { motion } from "framer-motion"
import { ShoppingBag } from "lucide-react"
import { ListingCard } from "./ListingCard"

interface Listing {
  id: string
  title: string
  price: number
  location: string
  image: string
  category: string
  isNegotiable: boolean
  isFeatured: boolean
}

interface ListingsGridProps {
  listings: Listing[]
  viewMode: "grid" | "list"
}

export function ListingsGrid({ listings, viewMode }: ListingsGridProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}>
      {listings.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No listings found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div
          className={`grid ${
            viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
          } gap-4 sm:gap-6`}
        >
          {listings.map((listing, index) => (
            <ListingCard key={listing.id} listing={listing} index={index} viewMode={viewMode} />
          ))}
        </div>
      )}
    </motion.div>
  )
}
