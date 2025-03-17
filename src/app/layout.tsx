import type { Metadata } from 'next'
import { Lexend_Giga, Lexend, Montserrat, Raleway } from 'next/font/google'
import './globals.css'
import { SearchProvider } from './context/SearchContext'
import Navbar from './components/Navbar'

// Initialize fonts with display swap and preload
const lexendGiga = Lexend_Giga({
  subsets: ['latin'],
  variable: '--font-lexend-giga',
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600'],
  fallback: ['system-ui', 'arial']
});

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600'],
  fallback: ['system-ui', 'arial']
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600'],
  fallback: ['system-ui', 'arial']
});

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600'],
  fallback: ['system-ui', 'arial']
});

export const metadata: Metadata = {
  metadataBase: new URL('https://macommerce.com'),
  title: {
    template: '%s | MaCommerce - Marketplace Indonesia',
    default: 'MaCommerce - Marketplace Indonesia Terpercaya',
  },
  description: 'MaCommerce adalah marketplace Indonesia yang menyediakan berbagai produk berkualitas dengan harga terbaik. Temukan produk fashion, elektronik, dan kebutuhan sehari-hari.',
  keywords: ['marketplace indonesia', 'jual beli online', 'belanja online', 'produk berkualitas', 'fashion', 'elektronik'],
  authors: [{ name: 'MaCommerce Team' }],
  creator: 'MaCommerce',
  publisher: 'MaCommerce',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://macommerce.com',
    siteName: 'MaCommerce',
    title: 'MaCommerce - Marketplace Indonesia Terpercaya',
    description: 'Temukan berbagai produk berkualitas dengan harga terbaik di MaCommerce. Marketplace terpercaya dengan pengiriman cepat ke seluruh Indonesia.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MaCommerce - Marketplace Indonesia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MaCommerce - Marketplace Indonesia Terpercaya',
    description: 'Temukan berbagai produk berkualitas dengan harga terbaik di MaCommerce. Marketplace terpercaya dengan pengiriman cepat ke seluruh Indonesia.',
    images: ['/images/twitter-image.jpg'],
    creator: '@macommerce',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://macommerce.com',
    languages: {
      'id-ID': 'https://macommerce.com/id',
      'en-US': 'https://macommerce.com/en',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${lexendGiga.variable} ${lexend.variable} ${montserrat.variable} ${raleway.variable} font-montserrat bg-[#FFFBF2]`}>
        <SearchProvider>
          <Navbar />
          {children}
        </SearchProvider>
      </body>
    </html>
  )
}
