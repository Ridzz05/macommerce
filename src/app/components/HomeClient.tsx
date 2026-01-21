'use client'

import { useEffect, useState } from 'react'
import { categories, type Product } from '../data/products'
import { useSearch } from '../context/SearchContext'
import { CategoryFilterClient } from './CategoryFilterClient'
import { ProductGridClient } from './ProductGridClient'

interface HomeClientProps {
  products: Product[]
}

export default function HomeClient({ products }: HomeClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const { searchQuery } = useSearch()

  useEffect(() => {
    if (searchQuery === '') {
      setSelectedCategory(null)
    }
  }, [searchQuery])

  return (
    <div className="pt-20 bg-[#FFFBF2]">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <CategoryFilterClient
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={categories}
          />
        </div>
        <ProductGridClient products={products} filteredCategory={selectedCategory} />
      </main>
    </div>
  )
}
