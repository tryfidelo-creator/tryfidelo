import { Filter, Grid, List, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface FilterBarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  viewMode: "grid" | "list"
  setViewMode: (mode: "grid" | "list") => void
  showAdvancedFilters: boolean
  setShowAdvancedFilters: (show: boolean) => void
}

export function FilterBar({
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  showAdvancedFilters,
  setShowAdvancedFilters,
}: FilterBarProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
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
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="cursor-pointer h-14 px-6 rounded-xl border-2 border-orange-400 bg-orange-50 hover:bg-orange-100 text-orange-600 font-semibold transition-all"
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
  )
}
