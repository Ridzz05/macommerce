import { MetadataRoute } from 'next'
import { products } from './data/products'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://macommerce.com'

  // Get all product slugs
  const productUrls = products.map((product) => ({
    url: `${baseUrl}/product/${product.name.toLowerCase().replace(/ /g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Get unique categories using filter and indexOf
  const categories = products
    .map(product => product.category)
    .filter((value, index, self) => self.indexOf(value) === index)

  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/category/${category.toLowerCase().replace(/ /g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...productUrls,
    ...categoryUrls,
  ]
} 