import HomeClient from './components/HomeClient'
import { categories as allCategories } from './data/products'
import { getProducts } from './lib/products'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const products = await getProducts()
  const availableCategories = Array.from(new Set(products.map((product) => product.category)))
  const worldCategories = availableCategories.length > 0 ? availableCategories : allCategories
  const weekIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 7))
  const worldCategory = worldCategories[weekIndex % worldCategories.length] ?? null
  const worldProducts = worldCategory
    ? products.filter((product) => product.category === worldCategory).slice(0, 9)
    : []

  return (
    <HomeClient
      products={products}
      worldCategory={worldCategory}
      worldProducts={worldProducts}
    />
  )
}
