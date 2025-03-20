import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://macommerce.shop'),
  title: {
    template: '%s | MaCommerce - Marketplace Terpercaya Indonesia',
    default: 'MaCommerce - Belanja Online Mudah & Aman | Marketplace Terpercaya Indonesia',
  },
  description: 'MaCommerce adalah marketplace terpercaya di Indonesia yang menyediakan berbagai produk berkualitas seperti fashion, kecantikan, elektronik, dan kebutuhan sehari-hari dengan harga terbaik. Nikmati pengalaman belanja online yang aman dan nyaman.',
  keywords: [
    'marketplace indonesia',
    'belanja online',
    'jual beli online',
    'produk berkualitas',
    'fashion indonesia',
    'produk kecantikan',
    'elektronik murah',
    'marketplace terpercaya',
    'macommerce',
    'toko online indonesia'
  ],
  authors: [{ 
    name: 'MaCommerce',
    url: 'https://macommerce.shop'
  }],
  creator: 'MaCommerce Indonesia',
  publisher: 'MaCommerce',
  applicationName: 'MaCommerce - Marketplace Indonesia',
  category: 'marketplace',
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://macommerce.shop',
    siteName: 'MaCommerce',
    title: 'MaCommerce - Marketplace Terpercaya Indonesia',
    description: 'Temukan berbagai produk berkualitas dengan harga terbaik di MaCommerce. Marketplace terpercaya dengan pengiriman cepat ke seluruh Indonesia. Belanja online jadi lebih mudah dan aman.',
    images: [
      {
        url: 'https://macommerce.shop/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MaCommerce - Marketplace Indonesia',
        type: 'image/jpeg',
      },
    ],
    countryName: 'Indonesia',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MaCommerce - Marketplace Terpercaya Indonesia',
    description: 'Temukan berbagai produk berkualitas dengan harga terbaik di MaCommerce. Marketplace terpercaya dengan pengiriman cepat ke seluruh Indonesia. Belanja online jadi lebih mudah dan aman.',
    images: ['https://macommerce.shop/images/twitter-image.jpg'],
    creator: '@macommerce_id',
    site: '@macommerce_id',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://macommerce.shop',
    languages: {
      'id-ID': 'https://macommerce.shop',
      'en-US': 'https://macommerce.shop/en',
    },
  },
  other: {
    'msapplication-TileColor': '#FDF6E3',
    'theme-color': '#FDF6E3',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-title': 'MaCommerce',
    'apple-mobile-web-app-status-bar-style': 'default',
  }
}; 