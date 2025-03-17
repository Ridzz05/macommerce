import { Metadata } from 'next'
import { products } from '@/app/data/products'
import ProductDetail from '@/app/components/ProductDetail'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = products.find(
    (p) => p.name.toLowerCase().replace(/ /g, '-') === params.slug
  )

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

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.name.toLowerCase().replace(/ /g, '-'),
  }))
}

export default function ProductPage({ params }: Props) {
  const product = products.find(
    (p) => p.name.toLowerCase().replace(/ /g, '-') === params.slug
  )

  if (!product) {
    notFound()
  }

  return <ProductDetail product={product} />
} 