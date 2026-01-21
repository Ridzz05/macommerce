'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { categories, type Category, type Product } from '@/app/data/products'

type MarketplaceForm = {
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
  const [listQuery, setListQuery] = useState('')

  const hasProducts = useMemo(() => products.length > 0, [products])
  const totalProducts = products.length
  const categoryCount = useMemo(
    () => new Set(products.map((product) => product.category)).size,
    [products],
  )
  const marketplaceCount = useMemo(
    () =>
      products.reduce((total, product) => {
        return (
          total +
          (product.marketplace.tokopedia ? 1 : 0) +
          (product.marketplace.lazada ? 1 : 0) +
          (product.marketplace.tiktokshop ? 1 : 0)
        )
      }, 0),
    [products],
  )
  const averagePrice = useMemo(() => {
    if (totalProducts === 0) {
      return 0
    }
    const totalPrice = products.reduce((sum, product) => sum + product.price, 0)
    return Math.round(totalPrice / totalProducts)
  }, [products, totalProducts])
  const filteredList = useMemo(() => {
    if (!listQuery.trim()) {
      return products
    }
    const query = listQuery.toLowerCase()
    return products.filter((product) =>
      `${product.name} ${product.category}`.toLowerCase().includes(query),
    )
  }, [listQuery, products])

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
    <div className="space-y-8">
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white border border-[#EDE3CD] rounded-xl p-4 shadow-sm">
          <p className="text-xs text-[#8B7355]">Total Produk</p>
          <p className="mt-2 text-2xl font-semibold text-[#5C4B37]">{totalProducts}</p>
        </div>
        <div className="bg-white border border-[#EDE3CD] rounded-xl p-4 shadow-sm">
          <p className="text-xs text-[#8B7355]">World Aktif</p>
          <p className="mt-2 text-2xl font-semibold text-[#5C4B37]">{categoryCount}</p>
        </div>
        <div className="bg-white border border-[#EDE3CD] rounded-xl p-4 shadow-sm">
          <p className="text-xs text-[#8B7355]">Link Marketplace</p>
          <p className="mt-2 text-2xl font-semibold text-[#5C4B37]">{marketplaceCount}</p>
        </div>
        <div className="bg-white border border-[#EDE3CD] rounded-xl p-4 shadow-sm">
          <p className="text-xs text-[#8B7355]">Rata-rata Harga</p>
          <p className="mt-2 text-2xl font-semibold text-[#5C4B37]">
            {averagePrice ? `Rp ${averagePrice.toLocaleString('id-ID')}` : '—'}
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <form
          id="product-form"
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

          <div className="sticky bottom-4 bg-white/95 backdrop-blur border border-[#EDE3CD] rounded-xl px-3 py-2 flex flex-wrap gap-3 justify-end shadow-sm">
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

        <div className="space-y-4 sticky top-24 h-fit">
          <div className="bg-white border border-[#EDE3CD] rounded-xl p-4 sm:p-5 shadow-sm">
            <p className="text-xs font-semibold text-[#5C4B37]">Preview</p>
            <div className="mt-3 border border-[#EDE3CD] rounded-lg overflow-hidden bg-[#FDF6E3]">
              <div className="aspect-[4/3] bg-[#EDE3CD] flex items-center justify-center text-xs text-[#8B7355]">
                {form.imageUrl ? 'Gambar Utama' : 'Belum ada gambar'}
              </div>
              <div className="p-3">
                {form.category && (
                  <span className="inline-block px-1.5 py-0.5 text-[10px] font-medium bg-[#EDE3CD] text-[#5C4B37] rounded-full">
                    {form.category}
                  </span>
                )}
                <p className="mt-2 text-sm font-semibold text-[#5C4B37]">
                  {form.name || 'Nama produk'}
                </p>
                <p className="text-xs text-[#8B7355] mt-1">
                  {form.price
                    ? `Rp ${Number(form.price || 0).toLocaleString('id-ID')}`
                    : 'Harga belum diisi'}
                </p>
                <p className="text-xs text-[#8B7355] mt-2 line-clamp-3">
                  {form.description || 'Tulis deskripsi singkat untuk memberi konteks produk.'}
                </p>
              </div>
            </div>
            <p className="mt-3 text-xs text-[#8B7355]">
              Preview hanya menampilkan ringkasan. Gambar akan tampil saat URL valid.
            </p>
          </div>

          <div className="bg-white border border-[#EDE3CD] rounded-xl p-4 shadow-sm">
            <p className="text-xs font-semibold text-[#5C4B37]">Checklist Kurasi</p>
            <ul className="mt-3 space-y-2 text-xs text-[#8B7355]">
              <li>Pastikan judul jelas dan singkat.</li>
              <li>Tulis konteks: untuk siapa & kenapa menarik.</li>
              <li>Tambahkan minimal 1 link marketplace.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white border border-[#EDE3CD] rounded-xl shadow-sm">
        <div className="p-4 sm:p-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-[#5C4B37]">Daftar Produk</h2>
            <p className="text-xs text-[#8B7355] mt-1">
              Kelola produk yang sudah dipublikasikan dan update detailnya.
            </p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={listQuery}
              onChange={(event) => setListQuery(event.target.value)}
              placeholder="Cari nama atau kategori..."
              className="w-full sm:w-60 rounded-lg border border-[#EDE3CD] px-3 py-2 text-sm text-[#5C4B37] focus:outline-none focus:border-[#8B7355]"
              aria-label="Cari produk"
            />
            {listQuery && (
              <button
                type="button"
                onClick={() => setListQuery('')}
                className="px-3 py-2 rounded-lg border border-[#EDE3CD] text-xs text-[#5C4B37] hover:bg-[#F5ECD6]"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        <div className="border-t border-[#EDE3CD]">
          {isLoading ? (
            <div className="text-sm text-[#8B7355] p-4">Memuat produk...</div>
          ) : !hasProducts ? (
            <div className="text-sm text-[#8B7355] p-4">Belum ada produk.</div>
          ) : filteredList.length === 0 ? (
            <div className="text-sm text-[#8B7355] p-4">
              Tidak ada produk yang cocok dengan pencarian.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="text-xs uppercase text-[#8B7355] bg-[#FDF6E3]">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Produk</th>
                    <th className="px-4 py-3 text-left font-semibold">Kategori</th>
                    <th className="px-4 py-3 text-left font-semibold">Harga</th>
                    <th className="px-4 py-3 text-left font-semibold">Marketplace</th>
                    <th className="px-4 py-3 text-right font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDE3CD]">
                  {filteredList.map((product) => {
                    const activeMarketplaces = [
                      product.marketplace.tokopedia && 'Tokopedia',
                      product.marketplace.lazada && 'Lazada',
                      product.marketplace.tiktokshop && 'TikTok Shop',
                    ].filter(Boolean) as string[]

                    return (
                      <tr key={product.id} className="hover:bg-[#FFFBF2]">
                        <td className="px-4 py-3">
                          <p className="text-sm font-semibold text-[#5C4B37]">{product.name}</p>
                          <p className="text-xs text-[#8B7355] mt-1">ID {product.id}</p>
                        </td>
                        <td className="px-4 py-3 text-sm text-[#5C4B37]">{product.category}</td>
                        <td className="px-4 py-3 text-sm text-[#5C4B37]">
                          Rp {product.price.toLocaleString('id-ID')}
                        </td>
                        <td className="px-4 py-3">
                          {activeMarketplaces.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {activeMarketplaces.map((label) => (
                                <span
                                  key={label}
                                  className="px-2 py-0.5 rounded-full text-[10px] bg-[#EDE3CD] text-[#5C4B37]"
                                >
                                  {label}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-xs text-[#C3B091]">Belum ada</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 justify-end">
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
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
