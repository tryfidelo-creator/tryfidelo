import { motion } from "framer-motion"
import { FilterBar } from "./FilterBar"
import { CategoryFilter } from "./CategoryFilter"
import { AdvancedFilters } from "./AdvancedFilters"

interface FilterPanelProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  viewMode: "grid" | "list"
  setViewMode: (mode: "grid" | "list") => void
  showAdvancedFilters: boolean
  setShowAdvancedFilters: (show: boolean) => void
  priceRange: [number, number]
  setPriceRange: (range: [number, number]) => void
  filters: { negotiable: boolean; featured: boolean }
  setFilters: (filters: { negotiable: boolean; featured: boolean }) => void
  filteredCount: number
}

export function FilterPanel({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  viewMode,
  setViewMode,
  showAdvancedFilters,
  setShowAdvancedFilters,
  priceRange,
  setPriceRange,
  filters,
  setFilters,
  filteredCount,
}: FilterPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white rounded-2xl shadow-xl border-2 border-orange-100 p-4 sm:p-6 lg:p-8 mb-8"
    >
      <div className="flex flex-col gap-4 mb-6">
        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          viewMode={viewMode}
          setViewMode={setViewMode}
          showAdvancedFilters={showAdvancedFilters}
          setShowAdvancedFilters={setShowAdvancedFilters}
        />
      </div>

      <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

      <AdvancedFilters
        showAdvancedFilters={showAdvancedFilters}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        filters={filters}
        setFilters={setFilters}
        setShowAdvancedFilters={setShowAdvancedFilters}
      />

      <div className="mt-4 text-sm text-gray-600">
        Showing <span className="font-semibold text-orange-600">{filteredCount}</span> result
        {filteredCount !== 1 ? "s" : ""}
      </div>
    </motion.div>
  )
}
