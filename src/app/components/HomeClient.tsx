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
        <section
          id="world-of-week"
          className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] items-start"
        >
          <div className="space-y-3">
            <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-[#EDE3CD] text-[#5C4B37] rounded-full">
              World of the Week
            </span>
            <h2 className="text-2xl font-semibold text-[#5C4B37]">
              {worldCategory || 'World pilihan minggu ini'}
            </h2>
            <p className="text-sm text-[#8B7355]">
              Satu world dipilih setiap minggu untuk mengikuti tema konten. Grid 3x3 ini adalah
              peta kurasi—detail lengkap ada di bawah.
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] text-[#8B7355]">
              <span className="px-2 py-0.5 rounded-full bg-[#F5ECD6]">9 slot kurasi</span>
              <span className="px-2 py-0.5 rounded-full bg-[#F5ECD6]">
                {worldProducts.length} produk tersedia
              </span>
            </div>
            <button
              type="button"
              onClick={handleExploreWorld}
              className="mt-2 inline-flex items-center px-4 py-2 rounded-lg bg-[#5C4B37] text-white text-sm font-medium hover:bg-[#3D3224] transition-colors disabled:opacity-60"
              disabled={!worldCategory}
            >
              Lihat kurasi world ini
            </button>
          </div>

          <div className="rounded-2xl border border-[#EDE3CD] bg-white p-3 shadow-sm">
            <div className="grid grid-cols-3 gap-2">
              {worldTiles.map((tile, index) => {
                if (tile.type === 'product') {
                  return (
                    <div
                      key={tile.product.id}
                      className="aspect-square rounded-lg border border-[#EDE3CD] bg-[#FDF6E3] p-2 flex flex-col justify-between"
                      title={tile.product.name}
                    >
                      <span className="text-[10px] text-[#8B7355]">Pick #{index + 1}</span>
                      <span className="text-[11px] font-medium text-[#5C4B37] line-clamp-2">
                        {tile.product.name}
                      </span>
                    </div>
                  )
                }

                return (
                  <div
                    key={tile.key}
                    className="aspect-square rounded-lg border border-dashed border-[#EDE3CD] bg-[#FFFBF2] p-2 flex flex-col justify-between"
                  >
                    <span className="text-[10px] text-[#C3B091]">Slot kosong</span>
                    <span className="text-[11px] text-[#8B7355]">Curated soon</span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

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
