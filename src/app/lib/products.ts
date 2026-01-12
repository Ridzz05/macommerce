import { kv } from '@vercel/kv'
import { categories, products as seedProducts, type Category, type Product } from '@/app/data/products'

const PRODUCTS_KEY = 'products'

export type ProductInput = Omit<Product, 'id'> & { id?: number }

export function slugify(value: string) {
  return value.toLowerCase().trim().replace(/\s+/g, '-')
}

const toString = (value: unknown) => (typeof value === 'string' ? value.trim() : '')

const toOptionalString = (value: unknown) => {
  const normalized = toString(value)
  return normalized.length > 0 ? normalized : undefined
}

const toStringArray = (value: unknown) => {
  if (Array.isArray(value)) {
    return value
      .filter((item): item is string => typeof item === 'string')
      .map((item) => item.trim())
      .filter(Boolean)
  }

  if (typeof value === 'string') {
    return value
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean)
  }

  return []
}

const toMarketplace = (value: unknown) => {
  const record = typeof value === 'object' && value ? (value as Record<string, unknown>) : {}

  return {
    shopee: toOptionalString(record.shopee),
    tokopedia: toOptionalString(record.tokopedia),
    lazada: toOptionalString(record.lazada),
    tiktokshop: toOptionalString(record.tiktokshop),
  }
}

export function parseProductPayload(payload: unknown): { ok: true; value: ProductInput } | { ok: false; error: string } {
  if (!payload || typeof payload !== 'object') {
    return { ok: false, error: 'Payload tidak valid.' }
  }

  const record = payload as Record<string, unknown>
  const name = toString(record.name)
  const description = toString(record.description)
  const imageUrl = toString(record.imageUrl)
  const category = toString(record.category)
  const price = typeof record.price === 'number' ? record.price : Number(record.price)
  const features = toStringArray(record.features)
  const images = toStringArray(record.images)
  const demoUrl = toOptionalString(record.demoUrl)
  const marketplace = toMarketplace(record.marketplace)

  if (!name) {
    return { ok: false, error: 'Nama produk wajib diisi.' }
  }

  if (!description) {
    return { ok: false, error: 'Deskripsi wajib diisi.' }
  }

  if (!imageUrl) {
    return { ok: false, error: 'Image URL wajib diisi.' }
  }

  if (!Number.isFinite(price) || price < 0) {
    return { ok: false, error: 'Harga tidak valid.' }
  }

  if (!category || !categories.includes(category as Category)) {
    return { ok: false, error: 'Kategori tidak valid.' }
  }

  if (features.length === 0) {
    return { ok: false, error: 'Minimal satu fitur wajib diisi.' }
  }

  const id = typeof record.id === 'number' ? record.id : undefined

  return {
    ok: true,
    value: {
      id,
      name,
      price,
      imageUrl,
      images: images.length > 0 ? images : undefined,
      category: category as Category,
      description,
      features,
      demoUrl,
      marketplace,
    },
  }
}

export async function getProducts() {
  try {
    const stored = await kv.get<Product[]>(PRODUCTS_KEY)

    if (stored === null) {
      await kv.set(PRODUCTS_KEY, seedProducts)
      return seedProducts
    }

    return stored
  } catch (_error) {
    return seedProducts
  }
}

export async function saveProducts(nextProducts: Product[]) {
  await kv.set(PRODUCTS_KEY, nextProducts)
  return nextProducts
}

export async function getProductById(id: number) {
  const products = await getProducts()
  return products.find((product) => product.id === id) ?? null
}

export async function getProductBySlug(slug: string) {
  const products = await getProducts()
  return products.find((product) => slugify(product.name) === slug) ?? null
}

export async function createProduct(input: ProductInput) {
  const products = await getProducts()
  const nextId = input.id ?? (products.length > 0 ? Math.max(...products.map((product) => product.id)) + 1 : 1)

  if (products.some((product) => product.id === nextId)) {
    throw new Error('ID produk sudah digunakan.')
  }

  const created: Product = {
    ...input,
    id: nextId,
  }

  await saveProducts([...products, created])
  return created
}

export async function updateProduct(id: number, input: ProductInput) {
  const products = await getProducts()
  const index = products.findIndex((product) => product.id === id)

  if (index === -1) {
    return null
  }

  const updated: Product = {
    ...products[index],
    ...input,
    id,
  }

  const nextProducts = [...products]
  nextProducts[index] = updated

  await saveProducts(nextProducts)
  return updated
}

export async function deleteProduct(id: number) {
  const products = await getProducts()
  const nextProducts = products.filter((product) => product.id !== id)

  if (nextProducts.length === products.length) {
    return false
  }

  await saveProducts(nextProducts)
  return true
}
