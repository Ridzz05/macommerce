'use client'

import { Product } from '../lib/products'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { slugify } from '../lib/products'

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  // Format price to IDR
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(product.price)

  const productSlug = slugify(product.name)

  // Schema.org markup
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      image: product.imageUrl,
      description: product.description,
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'IDR',
        availability: 'https://schema.org/InStock',
        url: `https://macommerce.shop/product/${productSlug}`,
      },
      brand: {
        '@type': 'Brand',
        name: 'MaCommerce',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://macommerce.shop',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: product.name,
          item: `https://macommerce.shop/product/${productSlug}`,
        },
      ],
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square"
          >
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </motion.div>
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <h1 className="text-2xl font-bold text-[#5C4B37]">
                {product.name}
              </h1>
              <div className="text-xl font-bold text-[#8B7355]">
                {formattedPrice}
              </div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[#8B7355]"
            >
              {product.description}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <h2 className="font-medium text-[#5C4B37]">Fitur Utama:</h2>
              <ul className="list-disc list-inside text-[#8B7355] space-y-1">
                {product.features.map((feature, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + (index * 0.1) }}
                  >
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
} 
