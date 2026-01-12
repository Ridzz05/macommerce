'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { categories, type Category, type Product } from '@/app/data/products'

type MarketplaceForm = {
  shopee: string
  tokopedia: string
  lazada: string
  tiktokshop: string
}

type ProductForm = {
  name: string
  price: string
  imageUrl: string
  imagesText: string
  category: Category | ''
  description: string
  featuresText: string
  demoUrl: string
  marketplace: MarketplaceForm
}

const createEmptyForm = (): ProductForm => ({
  name: '',
  price: '',
  imageUrl: '',
  imagesText: '',
  category: categories[0] ?? '',
  description: '',
  featuresText: '',
  demoUrl: '',
  marketplace: {
    shopee: '',
    tokopedia: '',
    lazada: '',
    tiktokshop: '',
  },
})

const parseLines = (value: string) =>
  value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

export default function AdminProductsClient() {
  const [products, setProducts] = useState<Product[]>([])
  const [form, setForm] = useState<ProductForm>(createEmptyForm)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const hasProducts = useMemo(() => products.length > 0, [products])

  const fetchProducts = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/products', { cache: 'no-store' })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.error || 'Gagal memuat produk.')
      }

      setProducts(Array.isArray(data?.products) ? data.products : [])
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : 'Gagal memuat produk.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const resetForm = () => {
    setForm(createEmptyForm())
    setEditingId(null)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSaving(true)
    setError(null)
    setSuccess(null)

    const price = Number(form.price)
    const features = parseLines(form.featuresText)
    const images = parseLines(form.imagesText)

    if (!form.name.trim() || !form.description.trim() || !form.imageUrl.trim()) {
      setError('Nama, deskripsi, dan image URL wajib diisi.')
      setIsSaving(false)
      return
    }

    if (!Number.isFinite(price) || price < 0) {
      setError('Harga tidak valid.')
      setIsSaving(false)
      return
    }

    if (!form.category) {
      setError('Kategori wajib dipilih.')
      setIsSaving(false)
      return
    }

    if (features.length === 0) {
      setError('Minimal satu fitur wajib diisi.')
      setIsSaving(false)
      return
    }

    const payload = {
      name: form.name.trim(),
      price,
      imageUrl: form.imageUrl.trim(),
      images: images.length > 0 ? images : undefined,
      category: form.category,
      description: form.description.trim(),
      features,
      demoUrl: form.demoUrl.trim() || undefined,
      marketplace: {
        shopee: form.marketplace.shopee.trim() || undefined,
        tokopedia: form.marketplace.tokopedia.trim() || undefined,
        lazada: form.marketplace.lazada.trim() || undefined,
        tiktokshop: form.marketplace.tiktokshop.trim() || undefined,
      },
    }

    try {
      const response = await fetch(editingId ? `/api/products/${editingId}` : '/api/products', {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product: payload }),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.error || 'Gagal menyimpan produk.')
      }

      setSuccess(editingId ? 'Produk berhasil diperbarui.' : 'Produk berhasil ditambahkan.')
      resetForm()
      await fetchProducts()
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Gagal menyimpan produk.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleEdit = (product: Product) => {
    setEditingId(product.id)
    setSuccess(null)
    setError(null)
    setForm({
      name: product.name,
      price: String(product.price),
      imageUrl: product.imageUrl,
      imagesText: product.images?.join('\n') ?? '',
      category: product.category,
      description: product.description,
      featuresText: product.features.join('\n'),
      demoUrl: product.demoUrl ?? '',
      marketplace: {
        shopee: product.marketplace.shopee ?? '',
        tokopedia: product.marketplace.tokopedia ?? '',
        lazada: product.marketplace.lazada ?? '',
        tiktokshop: product.marketplace.tiktokshop ?? '',
      },
    })
  }

  const handleDelete = async (productId: number) => {
    const confirmed = window.confirm('Hapus produk ini?')
    if (!confirmed) {
      return
    }

    setError(null)
    setSuccess(null)

    try {
      const response = await fetch(`/api/products/${productId}`, { method: 'DELETE' })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.error || 'Gagal menghapus produk.')
      }

      setSuccess('Produk berhasil dihapus.')
      await fetchProducts()
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Gagal menghapus produk.')
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#5C4B37]">Admin Produk</h1>
        <p className="text-sm text-[#8B7355] mt-1">
          Kelola data produk, deskripsi, dan detail marketplace dari sini.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-[#EDE3CD] rounded-xl p-4 sm:p-6 shadow-sm space-y-4"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm text-[#5C4B37] font-medium">
            Nama Produk
            <input
              type="text"
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              className="mt-2 w-full rounded-lg border border-[#EDE3CD] px-3 py-2 text-sm text-[#5C4B37] focus:outline-none focus:border-[#8B7355]"
            />
          </label>
          <label className="text-sm text-[#5C4B37] font-medium">
            Harga (IDR)
            <input
              type="number"
              value={form.price}
              onChange={(event) => setForm((prev) => ({ ...prev, price: event.target.value }))}
              className="mt-2 w-full rounded-lg border border-[#EDE3CD] px-3 py-2 text-sm text-[#5C4B37] focus:outline-none focus:border-[#8B7355]"
            />
          </label>
          <label className="text-sm text-[#5C4B37] font-medium sm:col-span-2">
            Image URL Utama
            <input
              type="text"
              value={form.imageUrl}
              onChange={(event) => setForm((prev) => ({ ...prev, imageUrl: event.target.value }))}
              className="mt-2 w-full rounded-lg border border-[#EDE3CD] px-3 py-2 text-sm text-[#5C4B37] focus:outline-none focus:border-[#8B7355]"
            />
          </label>
          <label className="text-sm text-[#5C4B37] font-medium sm:col-span-2">
            Images Tambahan (satu per baris)
            <textarea
              rows={3}
              value={form.imagesText}
              onChange={(event) => setForm((prev) => ({ ...prev, imagesText: event.target.value }))}
              className="mt-2 w-full rounded-lg border border-[#EDE3CD] px-3 py-2 text-sm text-[#5C4B37] focus:outline-none focus:border-[#8B7355]"
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm text-[#5C4B37] font-medium">
            Kategori
            <select
              value={form.category}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, category: event.target.value as Category }))
              }
              className="mt-2 w-full rounded-lg border border-[#EDE3CD] px-3 py-2 text-sm text-[#5C4B37] focus:outline-none focus:border-[#8B7355]"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm text-[#5C4B37] font-medium">
            Demo URL (opsional)
            <input
              type="text"
              value={form.demoUrl}
              onChange={(event) => setForm((prev) => ({ ...prev, demoUrl: event.target.value }))}
              className="mt-2 w-full rounded-lg border border-[#EDE3CD] px-3 py-2 text-sm text-[#5C4B37] focus:outline-none focus:border-[#8B7355]"
            />
          </label>
        </div>

        <label className="text-sm text-[#5C4B37] font-medium block">
          Deskripsi
          <textarea
            rows={4}
            value={form.description}
            onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
            className="mt-2 w-full rounded-lg border border-[#EDE3CD] px-3 py-2 text-sm text-[#5C4B37] focus:outline-none focus:border-[#8B7355]"
          />
        </label>

        <label className="text-sm text-[#5C4B37] font-medium block">
          Fitur (satu per baris)
          <textarea
            rows={4}
            value={form.featuresText}
            onChange={(event) => setForm((prev) => ({ ...prev, featuresText: event.target.value }))}
            className="mt-2 w-full rounded-lg border border-[#EDE3CD] px-3 py-2 text-sm text-[#5C4B37] focus:outline-none focus:border-[#8B7355]"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm text-[#5C4B37] font-medium">
            Shopee
            <input
              type="text"
              value={form.marketplace.shopee}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  marketplace: { ...prev.marketplace, shopee: event.target.value },
                }))
              }
              className="mt-2 w-full rounded-lg border border-[#EDE3CD] px-3 py-2 text-sm text-[#5C4B37] focus:outline-none focus:border-[#8B7355]"
            />
          </label>
          <label className="text-sm text-[#5C4B37] font-medium">
            Tokopedia
            <input
              type="text"
              value={form.marketplace.tokopedia}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  marketplace: { ...prev.marketplace, tokopedia: event.target.value },
                }))
              }
              className="mt-2 w-full rounded-lg border border-[#EDE3CD] px-3 py-2 text-sm text-[#5C4B37] focus:outline-none focus:border-[#8B7355]"
            />
          </label>
          <label className="text-sm text-[#5C4B37] font-medium">
            Lazada
            <input
              type="text"
              value={form.marketplace.lazada}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  marketplace: { ...prev.marketplace, lazada: event.target.value },
                }))
              }
              className="mt-2 w-full rounded-lg border border-[#EDE3CD] px-3 py-2 text-sm text-[#5C4B37] focus:outline-none focus:border-[#8B7355]"
            />
          </label>
          <label className="text-sm text-[#5C4B37] font-medium">
            TikTok Shop
            <input
              type="text"
              value={form.marketplace.tiktokshop}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  marketplace: { ...prev.marketplace, tiktokshop: event.target.value },
                }))
              }
              className="mt-2 w-full rounded-lg border border-[#EDE3CD] px-3 py-2 text-sm text-[#5C4B37] focus:outline-none focus:border-[#8B7355]"
            />
          </label>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-green-700">{success}</p>}

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={isSaving}
            className="px-4 py-2 rounded-lg bg-[#5C4B37] text-white text-sm font-medium hover:bg-[#3D3224] disabled:opacity-70"
          >
            {isSaving ? 'Menyimpan...' : editingId ? 'Simpan Perubahan' : 'Tambah Produk'}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 rounded-lg border border-[#EDE3CD] text-sm text-[#5C4B37] hover:bg-[#F5ECD6]"
          >
            Batalkan
          </button>
        </div>
      </form>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-[#5C4B37] mb-3">Daftar Produk</h2>
        {isLoading ? (
          <div className="text-sm text-[#8B7355]">Memuat produk...</div>
        ) : !hasProducts ? (
          <div className="text-sm text-[#8B7355]">Belum ada produk.</div>
        ) : (
          <div className="space-y-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="border border-[#EDE3CD] rounded-xl p-4 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div>
                  <p className="text-sm font-semibold text-[#5C4B37]">{product.name}</p>
                  <p className="text-xs text-[#8B7355] mt-1">
                    ID {product.id} • {product.category} • Rp {product.price.toLocaleString('id-ID')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(product)}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg border border-[#EDE3CD] text-[#5C4B37] hover:bg-[#F5ECD6]"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(product.id)}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-red-600 text-white hover:bg-red-700"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
