import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductDetail from '@/app/components/ProductDetail'
import { getProductBySlug } from '@/app/lib/products'

import { getProducts, slugify } from '@/app/lib/products'

export const revalidate = 3600 // ISR: Revalidate caching every 1 hour

export async function generateStaticParams() {
  const products = await getProducts()
  
  return products.map((product) => ({
    slug: slugify(product.name),
  }))
}

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    return {
      title: 'Produk Tidak Ditemukan',
      description: 'Maaf, produk yang Anda cari tidak ditemukan di MaCommerce.',
    }
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.imageUrl,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [product.imageUrl],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  return <ProductDetail product={product} />
}
