'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
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

  useEffect(() => {
    if (searchQuery === '') {
      setSelectedCategory(null)
    }
  }, [searchQuery])

  const worldTiles = useMemo<WorldTile[]>(() => {
    const picked = worldProducts.slice(0, 9).map((product) => ({ type: 'product', product }))
    const placeholders = Array.from({ length: Math.max(0, 9 - picked.length) }, (_, index) => ({
      type: 'placeholder' as const,
      key: `placeholder-${index}`,
    }))
    return [...picked, ...placeholders]
  }, [worldProducts])

  const handleExploreWorld = useCallback(() => {
    if (worldCategory) {
      setSelectedCategory(worldCategory)
      setSearchQuery('')
    }

    const target = document.getElementById('browse-worlds')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [setSearchQuery, worldCategory])

  return (
    <div className="pt-20 bg-[#FFFBF2]">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] items-center">
          <div className="space-y-4">
            <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-[#EDE3CD] text-[#5C4B37] rounded-full">
              Smart discovery brand
            </span>
            <h1 className="text-3xl sm:text-4xl font-semibold text-[#5C4B37] leading-tight">
              Curated picks, not random products.
            </h1>
            <p className="text-sm sm:text-base text-[#8B7355] max-w-xl">
              MaCommerce adalah ruang kurasi yang menghubungkan perhatian di media sosial dengan
              transaksi di toko resmi atau TikTok Shop affiliate.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#world-of-week"
                className="px-4 py-2 rounded-lg bg-[#5C4B37] text-white text-sm font-medium hover:bg-[#3D3224] transition-colors"
              >
                World of the Week
              </a>
              <a
                href="#browse-worlds"
                className="px-4 py-2 rounded-lg border border-[#EDE3CD] text-sm font-medium text-[#5C4B37] hover:bg-[#F5ECD6] transition-colors"
              >
                Explore Worlds
              </a>
            </div>
          </div>

          <div className="bg-white border border-[#EDE3CD] rounded-2xl p-4 sm:p-5 shadow-sm">
            <p className="text-xs font-semibold text-[#5C4B37]">Kenapa MaCommerce?</p>
            <ul className="mt-3 space-y-2 text-xs text-[#8B7355]">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#5C4B37]" />
                Kurasi mingguan yang selaras dengan konten IG/TikTok.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#5C4B37]" />
                Konteks jelas: untuk siapa, kenapa menarik, plus-minus.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#5C4B37]" />
                Beli di toko resmi atau TikTok Shop affiliate.
              </li>
            </ul>
          </div>
        </section>

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
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 mt-12"
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
