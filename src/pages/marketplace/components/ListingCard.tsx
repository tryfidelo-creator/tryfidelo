import { motion } from "framer-motion"
import { ArrowRight, MapPin, Tag } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

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

interface ListingCardProps {
  listing: Listing
  index: number
  viewMode: "grid" | "list"
}

export function ListingCard({ listing, index, viewMode }: ListingCardProps) {
  return (
    <motion.div
      key={listing.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        className={`overflow-hidden border-2 border-orange-100 hover:border-orange-300 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group bg-white ${
          viewMode === "list" ? "flex flex-row" : ""
        }`}
      >
        <div
          className={`overflow-hidden relative ${viewMode === "list" ? "w-48 flex-shrink-0" : "aspect-[4/3]"}`}
        >
          <img
            src={listing.image || "/placeholder.svg"}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {listing.isFeatured && (
            <Badge className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0 shadow-lg">
              Featured
            </Badge>
          )}
          {listing.isNegotiable && (
            <Badge className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-lg">
              <Tag className="w-3 h-3 mr-1" />
              Negotiable
            </Badge>
          )}
        </div>
        <CardContent className={`p-5 ${viewMode === "list" ? "flex-1 flex flex-col justify-between" : ""}`}>
          <div>
            <h3 className="font-bold text-xl mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors">
              {listing.title}
            </h3>
            <p className="text-3xl font-extrabold bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent mb-3">
              ${listing.price}
            </p>
            <p className="text-sm text-gray-600 mb-4 flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {listing.location}
            </p>
          </div>
          <Button className="cursor-pointer w-full bg-gradient-to-r from-amber-500 via-orange-600 to-rose-500 hover:from-amber-600 hover:via-orange-700 hover:to-rose-700 text-white font-bold rounded-xl h-12 shadow-lg hover:shadow-xl transition-all group">
            View Details
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
