import { useState, useMemo } from "react"
import { Header } from "../../components/layout/Header"
import { Footer } from "../../components/layout/Footer"
import { mockListings } from "./constants"
import { HeroSection } from "./components/HeroSection"
import { FilterPanel } from "./components/FilterPanel"
import { ListingsGrid } from "./components/ListingsGrid"
import { FloatingActionButton } from "./components/FloatingActionButton"

export function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [filters, setFilters] = useState({
    negotiable: false,
    featured: false,
  })

  const filteredListings = useMemo(() => {
    return mockListings.filter((listing) => {
      const matchesSearch =
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "All Categories" || listing.category === selectedCategory
      const matchesPrice = listing.price >= priceRange[0] && listing.price <= priceRange[1]
      const matchesNegotiable = !filters.negotiable || listing.isNegotiable
      const matchesFeatured = !filters.featured || listing.isFeatured
      return matchesSearch && matchesCategory && matchesPrice && matchesNegotiable && matchesFeatured
    })
  }, [searchQuery, selectedCategory, priceRange, filters])

  const scrollToProducts = () => {
    const productsSection = document.getElementById("products-list")
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/30 to-orange-50/20">
      <Header />

      <HeroSection onBrowseClick={scrollToProducts} />

      <div id="products-list" className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        <FilterPanel
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          viewMode={viewMode}
          setViewMode={setViewMode}
          showAdvancedFilters={showAdvancedFilters}
          setShowAdvancedFilters={setShowAdvancedFilters}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          filters={filters}
          setFilters={setFilters}
          filteredCount={filteredListings.length}
        />

        <ListingsGrid listings={filteredListings} viewMode={viewMode} />

        <FloatingActionButton href="/services" />
      </div>

      <Footer />
    </div>
  )
}
