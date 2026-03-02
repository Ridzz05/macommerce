import HomeClient from './components/HomeClient'
import { getProducts } from './lib/products'

export const revalidate = 3600 // ISR: Revalidate caching every 1 hour

export default async function Home() {
  const products = await getProducts()

  return <HomeClient products={products} />
}
