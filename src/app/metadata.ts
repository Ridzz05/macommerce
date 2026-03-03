import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#FDF6E3",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://macommerce.shop"),
  title: {
    template: "%s | MaCommerce",
    default: "MaCommerce — Smart Picks & Curated Worlds",
  },
  description:
    "MaCommerce: Platform belanja kurasi pilihan untuk Gadget, Setup, dan Lifestyle. Temukan produk unik, lihat detail lengkap, dan pesan langsung via WhatsApp dengan mudah.",
  keywords: [
    "macommerce",
    "rekomendasi produk",
    "curated picks",
    "affiliate discovery",
    "gadget",
    "smart home",
    "digital tools",
    "template",
    "subscription tools",
    "lifestyle gear",
    "creator tools",
    "tiktok shop affiliate",
  ],
  authors: [{ name: "MaCommerce", url: "https://macommerce.shop" }],
  creator: "MaCommerce",
  publisher: "MaCommerce",
  applicationName: "MaCommerce",
  category: "shopping",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // verification: {
  //   google: "YOUR_GOOGLE_VERIFICATION_CODE",
  // },

  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://macommerce.shop",
    siteName: "MaCommerce",
    title: "MaCommerce — Smart Picks & Curated Worlds",
    description:
      "MaCommerce: Platform belanja kurasi pilihan untuk Gadget, Setup, dan Lifestyle. Temukan produk unik, lihat detail lengkap, dan pesan langsung via WhatsApp dengan mudah.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MaCommerce — Smart Picks & Curated Worlds",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "MaCommerce — Smart Picks & Curated Worlds",
    description:
      "MaCommerce: Platform belanja kurasi pilihan untuk Gadget, Setup, dan Lifestyle. Temukan produk unik, lihat detail lengkap, dan pesan langsung via WhatsApp dengan mudah.",
    images: ["/images/og-image.jpg"],
    creator: "@macommerce_id",
    site: "@macommerce_id",
  },

  alternates: {
    canonical: "https://macommerce.shop",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: "/apple-touch-icon.png",
  },

  other: {
    "msapplication-TileColor": "#FDF6E3",
    "theme-color": "#FDF6E3",
  },
};
