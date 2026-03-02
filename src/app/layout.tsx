import { Montserrat } from 'next/font/google'
import Script from 'next/script'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import RootLayoutClient from './components/RootLayoutClient'
import { metadata } from './metadata'
import { AuthProvider } from './context/AuthContext'

// Initialize fonts with display swap and preload
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600'],
  fallback: ['system-ui', 'arial']
});

export { metadata }

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
        <link 
          rel="icon" 
          href="/favicon.ico" 
          sizes="any" 
        />
        <link 
          rel="apple-touch-icon" 
          href="/apple-touch-icon.png" 
        />
        <link 
          rel="manifest" 
          href="/manifest.json" 
        />
          {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-N8GBV0JMX3"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-N8GBV0JMX3');
            `,
          }}
        />
        {/* Global JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebSite',
                  '@id': 'https://macommerce.shop/#website',
                  url: 'https://macommerce.shop',
                  name: 'MaCommerce',
                  description: 'Platform belanja kurasi pilihan untuk Gadget, Setup, dan Lifestyle.',
                  potentialAction: [
                    {
                      '@type': 'SearchAction',
                      target: {
                        '@type': 'EntryPoint',
                        urlTemplate: 'https://macommerce.shop/?q={search_term_string}'
                      },
                      'query-input': 'required name=search_term_string'
                    }
                  ]
                },
                {
                  '@type': 'Organization',
                  '@id': 'https://macommerce.shop/#organization',
                  name: 'MaCommerce',
                  url: 'https://macommerce.shop',
                  logo: {
                    '@type': 'ImageObject',
                    url: 'https://macommerce.shop/images/og-image.jpg'
                  },
                  sameAs: [
                    'https://instagram.com/macommerce_id'
                  ]
                }
              ]
            })
          }}
        />
      </head>
      <RootLayoutClient
        montserratClass={montserrat.variable}
      >
        <AuthProvider>
          {children}
          <SpeedInsights />
        </AuthProvider>
      </RootLayoutClient>
    </html>
  )
}
