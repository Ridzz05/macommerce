import { Lexend_Giga, Lexend, Montserrat, Raleway } from 'next/font/google'
import './globals.css'
import RootLayoutClient from './components/RootLayoutClient'
import { metadata } from './metadata'

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
      </head>
      <RootLayoutClient
        lexendGigaClass={lexendGiga.variable}
        lexendClass={lexend.variable}
        montserratClass={montserrat.variable}
        ralewayClass={raleway.variable}
      >
        {children}
      </RootLayoutClient>
    </html>
  )
}
