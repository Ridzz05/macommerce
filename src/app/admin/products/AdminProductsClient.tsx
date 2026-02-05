'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { categories, type Category, type Product } from '@/app/data/products'



import { Trash2, Plus } from 'lucide-react'

// ... (in imports)

type ProductOptionInput = {
  label: string
  price: string
  value?: string
}

type ProductForm = {
  name: string
  price: string
  discountPrice: string
  imageUrl: string
  imagesText: string
  category: Category | ''
  description: string
  featuresText: string
  demoUrl: string

  options: ProductOptionInput[]
}

const createEmptyForm = (): ProductForm => ({
  name: '',
  price: '',
  discountPrice: '',
  imageUrl: '',
  imagesText: '',
  category: categories[0] ?? '',
  description: '',
  featuresText: '',
  demoUrl: '',

  options: [],
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
    const discountPrice = form.discountPrice ? Number(form.discountPrice) : undefined
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


    const options = form.options
      .filter(opt => opt.label.trim())
      .map(opt => ({
        label: opt.label.trim(),
        price: Number(opt.price) || 0,
        value: opt.label.toLowerCase().replace(/\s+/g, '_')
      }));

    const payload = {
 
       name: form.name,
       price: price,
       discountPrice: discountPrice,
       imageUrl: form.imageUrl,
       images: images,
       category: form.category,
       description: form.description,
       features: features,
       demoUrl: form.demoUrl || undefined,
       options: options.length > 0 ? options : undefined
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
      discountPrice: product.discountPrice ? String(product.discountPrice) : '',
      imageUrl: product.imageUrl,
      imagesText: product.images?.join('\n') ?? '',
      category: product.category,
      description: product.description,
      featuresText: product.features.join('\n'),
      demoUrl: product.demoUrl ?? '',

      options: product.options?.map(opt => ({
        label: opt.label,
        price: String(opt.price),
        value: String(opt.value)
      })) ?? [],
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
      <div className="flex items-center gap-2 mb-6 lg:hidden">
        <Link 
          href="/" 
          className="p-2 -ml-2 rounded-lg hover:bg-[#EDE3CD] text-[#5C4B37] transition-colors flex items-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="font-medium text-sm">Kembali ke Beranda</span>
        </Link>
      </div>

      <section className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
           {/* Placeholder for potential title if needed, or just leave empty to push search right */}
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            value={listQuery}
            onChange={(event) => setListQuery(event.target.value)}
            placeholder="Cari nama atau kategori..."
            className="w-full sm:w-80 rounded-lg border border-[#EDE3CD] px-3 py-2 text-sm text-[#5C4B37] focus:outline-none focus:border-[#8B7355] bg-white"
            aria-label="Cari produk"
          />
          {listQuery && (
            <button
              type="button"
              onClick={() => setListQuery('')}
              className="px-3 py-2 rounded-lg border border-[#EDE3CD] text-xs text-[#5C4B37] hover:bg-[#F5ECD6] bg-white"
            >
              Reset
            </button>
          )}
        </div>
      </section>

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
            <label className="text-sm text-[#5C4B37] font-medium">
              Harga Diskon (Opsional)
              <input
                type="number"
                value={form.discountPrice}
                onChange={(event) => setForm((prev) => ({ ...prev, discountPrice: event.target.value }))}
                placeholder="Kosongkan jika tidak ada diskon"
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
            
            <div className="sm:col-span-2">
              <label className="text-sm text-[#5C4B37] font-medium block mb-2">
                Varian Produk
              </label>
              <div className="space-y-3">
                {form.options.map((option, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Nama Varian (ex: 100 Views)"
                        value={option.label}
                        onChange={(e) => {
                          const newOptions = [...form.options]
                          newOptions[index].label = e.target.value
                          setForm(prev => ({ ...prev, options: newOptions }))
                        }}
                        className="w-full rounded-lg border border-[#EDE3CD] px-3 py-2 text-sm text-[#5C4B37] focus:outline-none focus:border-[#8B7355]"
                      />
                    </div>
                    <div className="w-32">
                      <input
                        type="number"
                        placeholder="Harga"
                        value={option.price}
                        onChange={(e) => {
                          const newOptions = [...form.options]
                          newOptions[index].price = e.target.value
                          setForm(prev => ({ ...prev, options: newOptions }))
                        }}
                        className="w-full rounded-lg border border-[#EDE3CD] px-3 py-2 text-sm text-[#5C4B37] focus:outline-none focus:border-[#8B7355]"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newOptions = form.options.filter((_, i) => i !== index)
                        setForm(prev => ({ ...prev, options: newOptions }))
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-[1px]"
                      title="Hapus Varian"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={() => setForm(prev => ({
                    ...prev,
                    options: [...prev.options, { label: '', price: '' }]
                  }))}
                  className="flex items-center gap-2 text-xs font-medium text-[#8B7355] hover:text-[#5C4B37] px-2 py-1.5 rounded-lg hover:bg-[#FDF6E3] transition-colors w-fit border border-dashed border-[#8B7355]/30 hover:border-[#8B7355]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Tambah Varian
                </button>
              </div>
            </div>
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

{/* Marketplace inputs removed */}

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
                <div className="aspect-[4/3] bg-[#EDE3CD] flex items-center justify-center text-xs text-[#8B7355] relative">
                  {form.imageUrl ? (
                    <img 
                      src={form.imageUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    /> 
                  ) : (
                    <div className="w-full h-full animate-pulse bg-[#E6DBC4]" />
                  )}

                  {/* Discount Badge Preview */}
                  {form.discountPrice && Number(form.discountPrice) > 0 && Number(form.price) > 0 && (
                      <div className="absolute top-2 left-2 z-10 px-2 py-1 bg-[#D32F2F] text-white text-[10px] font-bold rounded shadow-sm">
                          {Math.round(((Number(form.price) - Number(form.discountPrice)) / Number(form.price)) * 100)}% OFF
                      </div>
                  )}
                </div>
                <div className="p-3">
                  {form.category ? (
                    <span className="inline-block px-1.5 py-0.5 text-[10px] font-medium bg-[#EDE3CD] text-[#5C4B37] rounded-full">
                      {form.category}
                    </span>
                  ) : (
                     <div className="h-4 w-20 bg-[#EDE3CD] animate-pulse rounded-full" />
                  )}
                  {form.name ? (
                    <p className="mt-2 text-sm font-semibold text-[#5C4B37] line-clamp-2 leading-tight min-h-[2.5em]">
                      {form.name}
                    </p>
                  ) : (
                    <div className="mt-2 h-5 w-3/4 bg-[#EDE3CD] animate-pulse rounded" />
                  )}
                  <div className="mt-1 flex flex-col gap-0.5">
                    {form.price ? (
                      form.discountPrice && Number(form.discountPrice) > 0 ? (
                        <div className="flex flex-col items-start -space-y-0.5">
                            <p className="text-[10px] text-[#8B7355]/80 line-through decoration-red-500/50">
                                Rp {Number(form.price).toLocaleString('id-ID')}
                            </p>
                            <p className="text-sm font-bold text-[#D32F2F]">
                                Rp {Number(form.discountPrice).toLocaleString('id-ID')}
                            </p>
                        </div>
                      ) : (
                        <p className="text-sm font-bold text-[#5C4B37]">
                           Rp {Number(form.price).toLocaleString('id-ID')}
                        </p>
                      )
                    ) : (
                       <div className="h-4 w-24 bg-[#EDE3CD] animate-pulse rounded" />
                    )}
                    
                    {form.options.length > 0 && (
                      <span className="text-[10px] text-[#8B7355]">
                          + {form.options.length} Varian Lain
                      </span>
                    )}
                  </div>
                {form.description ? (
                  <p className="text-xs text-[#8B7355] mt-2 line-clamp-3">
                    {form.description}
                  </p>
                ) : (
                  <div className="mt-2 space-y-1">
                    <div className="h-3 w-full bg-[#EDE3CD] animate-pulse rounded" />
                    <div className="h-3 w-5/6 bg-[#EDE3CD] animate-pulse rounded" />
                    <div className="h-3 w-4/6 bg-[#EDE3CD] animate-pulse rounded" />
                  </div>
                )}
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
            <div className="w-full overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="text-xs uppercase text-[#8B7355] bg-[#FDF6E3]">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Produk</th>
                    <th className="px-4 py-3 text-left font-semibold">Kategori</th>
                    <th className="px-4 py-3 text-left font-semibold">Harga</th>

                    <th className="px-4 py-3 text-right font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDE3CD]">
                  {filteredList.map((product) => {


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
{/* marketplace column body removed */}
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
