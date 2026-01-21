import HomeClient from './components/HomeClient'
import { getProducts } from './lib/products'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const products = await getProducts()

  return <HomeClient products={products} />
}
