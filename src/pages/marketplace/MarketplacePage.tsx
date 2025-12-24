import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, Filter, Grid, List, ShoppingBag, TrendingUp, Plus, ArrowRight, MapPin, Tag } from "lucide-react"
import { Header } from "../../components/layout/Header"
import { Footer } from "../../components/layout/Footer"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import cart from "@/assets/cart.jpg"

const categories = [
  "All Categories",
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Vehicles",
  "Real Estate",
  "Jobs",
  "Services",
]

const mockListings = [
  {
    id: "1",
    title: "Premium Wireless Headphones",
    price: 129,
    location: "New York, NY",
    image: cart,
    category: "Electronics",
    isNegotiable: true,
    isFeatured: true,
  },
  {
    id: "2",
    title: "Modern Office Chair",
    price: 250,
    location: "Los Angeles, CA",
    image: cart,
    category: "Home & Garden",
    isNegotiable: true,
    isFeatured: false,
  },
  {
    id: "3",
    title: "Smart Watch Series 8",
    price: 399,
    location: "Chicago, IL",
    image: cart,
    category: "Electronics",
    isNegotiable: false,
    isFeatured: true,
  },
  {
    id: "4",
    title: "Designer Leather Bag",
    price: 180,
    location: "Miami, FL",
    image: cart,
    category: "Fashion",
    isNegotiable: true,
    isFeatured: false,
  },
  {
    id: "5",
    title: "Gaming Console Pro",
    price: 499,
    location: "Seattle, WA",
    image: cart,
    category: "Electronics",
    isNegotiable: true,
    isFeatured: false,
  },
  {
    id: "6",
    title: "Vintage Coffee Table",
    price: 150,
    location: "Boston, MA",
    image: cart,
    category: "Home & Garden",
    isNegotiable: true,
    isFeatured: false,
  },
]

export function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredListings = useMemo(() => {
    return mockListings.filter((listing) => {
      const matchesSearch =
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "All Categories" || listing.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/30 to-orange-50/20">
      <Header />

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
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-semibold">100K+ Active Listings</span>
              </div>
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
                <Button className="cursor-pointer group bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white font-bold text-lg h-14 px-8 rounded-xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 border-0">
                  Browse Products
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button className="cursor-pointer bg-white/10 backdrop-blur-md text-white border-2 border-white/50 hover:bg-white/20 hover:border-white font-bold text-lg h-14 px-8 rounded-xl transition-all duration-300 hover:scale-105">
                  <Plus className="mr-2 h-5 w-5" />
                  Start Selling
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl border-2 border-orange-100 p-4 sm:p-6 lg:p-8 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search by product name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-base border-2 border-gray-200 focus:border-orange-400 rounded-xl transition-colors"
              />
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="cursor-pointer h-14 px-6 rounded-xl border-2 hover:border-orange-400 hover:bg-orange-50 transition-all bg-transparent"
              >
                <Filter className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline">Advanced Filters</span>
                <span className="sm:hidden">Filter</span>
              </Button>
              <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  className={`cursor-pointer h-12 w-12 rounded-lg transition-all ${viewMode === "grid" ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg" : "hover:bg-white"}`}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-5 w-5" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  className={`cursor-pointer h-12 w-12 rounded-lg transition-all ${viewMode === "list" ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg" : "hover:bg-white"}`}
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`cursor-pointer whitespace-nowrap rounded-full px-6 h-11 transition-all ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 text-white shadow-lg hover:shadow-xl scale-105"
                    : "border-2 hover:border-orange-400 hover:bg-orange-50"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing <span className="font-semibold text-orange-600">{filteredListings.length}</span> result
            {filteredListings.length !== 1 ? "s" : ""}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}>
          {filteredListings.length === 0 ? (
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
              {filteredListings.map((listing, index) => (
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
                      className={`overflow-hidden relative ${
                        viewMode === "list" ? "w-48 flex-shrink-0" : "aspect-[4/3]"
                      }`}
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
                      <Button className="cursor-pointer w-full bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 hover:from-amber-600 hover:via-orange-700 hover:to-rose-700 text-white font-bold rounded-xl h-12 shadow-lg hover:shadow-xl transition-all group">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <Button className="cursor-pointer group bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white font-bold text-lg h-16 px-8 rounded-full shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 border-0">
            <Plus className="mr-2 h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
            Start Selling
          </Button>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
