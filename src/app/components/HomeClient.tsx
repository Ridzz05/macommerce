'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { categories, type Product } from '../data/products'
import { useSearch } from '../context/SearchContext'
import { CategoryFilterClient } from './CategoryFilterClient'
import { ProductGridClient } from './ProductGridClient'

interface HomeClientProps {
  products: Product[]
  worldCategory: string | null
  worldProducts: Product[]
}

type WorldTile = { type: 'product'; product: Product } | { type: 'placeholder'; key: string }

export default function HomeClient({ products, worldCategory, worldProducts }: HomeClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const { searchQuery, setSearchQuery } = useSearch()
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (searchQuery === '') {
      setSelectedCategory(null)
    }
  }, [searchQuery])

  const worldTiles = useMemo<WorldTile[]>(() => {
    const picked = worldProducts
      .slice(0, 9)
      .map((product) => ({ type: 'product' as const, product }))
    const placeholders = Array.from({ length: Math.max(0, 9 - picked.length) }, (_, index) => ({
      type: 'placeholder' as const,
      key: `placeholder-${index}`,
    }))
    return [...picked, ...placeholders]
  }, [worldProducts])

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const target = document.getElementById(sectionId)
      if (!target) {
        return
      }

      target.scrollIntoView({
        behavior: shouldReduceMotion ? 'auto' : 'smooth',
        block: 'start',
      })
    },
    [shouldReduceMotion],
  )

  const handleExploreWorld = useCallback(() => {
    if (worldCategory) {
      setSelectedCategory(worldCategory)
      setSearchQuery('')
    }

    requestAnimationFrame(() => {
      scrollToSection('browse-worlds')
    })
  }, [scrollToSection, setSearchQuery, worldCategory])
  return (
    <div className="pt-20 bg-[#FFFBF2]">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div
          id="browse-worlds"
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 mt-10"
        >
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
