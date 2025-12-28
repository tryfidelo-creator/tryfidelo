import { Button } from "@/components/ui/button"
import { categories } from "../constants"

interface CategoryFilterProps {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
}

export function CategoryFilter({ selectedCategory, setSelectedCategory }: CategoryFilterProps) {
  return (
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
  )
}
