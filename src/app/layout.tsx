import type { Metadata } from 'next'
import { Lexend_Giga, Lexend, Montserrat, Raleway } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import { SearchProvider } from './context/SearchContext'

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
  metadataBase: new URL('https://jasaku.com'),
  title: {
    default: 'JasaKu - Layanan Digital Terpercaya',
    template: '%s | JasaKu'
  },
  description: 'Temukan berbagai layanan digital premium dengan harga terbaik. Tersedia layanan E-Wallet, Bank, dan layanan digital lainnya.',
  keywords: ['jasa digital', 'e-wallet', 'bank', 'layanan digital'],
  openGraph: {
    title: 'JasaKu - Layanan Digital Terpercaya',
    description: 'Temukan berbagai layanan digital premium dengan harga terbaik. Tersedia layanan E-Wallet, Bank, dan layanan digital lainnya.',
    url: 'https://jasaku.com',
    siteName: 'JasaKu',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45',
        width: 1200,
        height: 630,
        alt: 'JasaKu Preview'
      }
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JasaKu - Layanan Digital Terpercaya',
    description: 'Temukan berbagai layanan digital premium dengan harga terbaik. Tersedia layanan E-Wallet, Bank, dan layanan digital lainnya.',
    images: ['https://images.unsplash.com/photo-1593642632823-8f785ba67e45'],
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
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
