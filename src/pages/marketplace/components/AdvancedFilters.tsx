import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { motion } from "framer-motion"

interface AdvancedFiltersProps {
  showAdvancedFilters: boolean
  priceRange: [number, number]
  setPriceRange: (range: [number, number]) => void
  filters: { negotiable: boolean; featured: boolean }
  setFilters: (filters: { negotiable: boolean; featured: boolean }) => void
  setShowAdvancedFilters: (show: boolean) => void
}

export function AdvancedFilters({
  showAdvancedFilters,
  priceRange,
  setPriceRange,
  filters,
  setFilters,
  setShowAdvancedFilters,
}: AdvancedFiltersProps) {
  return (
    <>
      {showAdvancedFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-6 pt-6 border-t-2 border-gray-200 w-full"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Price Range Filter */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                Price Range
                <span className="text-sm text-orange-600">
                  ${priceRange[0]} - ${priceRange[1]}
                </span>
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-600">Min Price</label>
                  <Input
                    type="number"
                    min="0"
                    max="1000"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([Math.min(parseInt(e.target.value) || 0, priceRange[1]), priceRange[1]])
                    }
                    className="h-10 border-2 border-gray-200 focus:border-orange-400 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600">Max Price</label>
                  <Input
                    type="number"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], Math.max(parseInt(e.target.value) || 1000, priceRange[0])])
                    }
                    className="h-10 border-2 border-gray-200 focus:border-orange-400 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Condition Filter */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Condition</h4>
              <div className="space-y-3">
                <div
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => setFilters({ ...filters, featured: !filters.featured })}
                >
                  <Checkbox
                    checked={filters.featured}
                    onCheckedChange={(checked) => setFilters({ ...filters, featured: checked as boolean })}
                  />
                  <label className="cursor-pointer text-sm text-gray-700">Featured Only</label>
                </div>
                <div
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => setFilters({ ...filters, negotiable: !filters.negotiable })}
                >
                  <Checkbox
                    checked={filters.negotiable}
                    onCheckedChange={(checked) => setFilters({ ...filters, negotiable: checked as boolean })}
                  />
                  <label className="cursor-pointer text-sm text-gray-700">Negotiable Price</label>
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <div className="sm:col-span-2 lg:col-span-2 flex gap-3">
              <Button
                onClick={() => {
                  setPriceRange([0, 1000])
                  setFilters({ negotiable: false, featured: false })
                }}
                className="flex-1 cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-lg h-11 transition-colors"
              >
                Reset Filters
              </Button>
              <Button
                onClick={() => setShowAdvancedFilters(false)}
                className="flex-1 cursor-pointer bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 hover:from-amber-600 hover:via-orange-700 hover:to-rose-700 text-white font-semibold rounded-lg h-11 shadow-lg transition-all"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
}
