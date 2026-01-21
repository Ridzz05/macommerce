import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://macommerce.shop"),
  title: {
    template: "%s | MaCommerce",
    default: "MaCommerce — Smart Picks & Curated Worlds",
  },
  description:
    "Kurasi rekomendasi produk keren & berguna dari berbagai kategori: gadget, smart home, lifestyle gear, digital tools, template, dan source code. Jelajahi, bandingkan, lalu beli lewat link rekomendasi.",
  keywords: [
    "macommerce",
    "rekomendasi produk",
    "curated picks",
    "affiliate products",
    "gadget",
    "smart home",
    "digital tools",
    "template",
    "source code",
    "lifestyle gear",
    "creator tools",
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

  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://macommerce.shop",
    siteName: "MaCommerce",
    title: "MaCommerce — Smart Picks & Curated Worlds",
    description:
      "Kurasi rekomendasi produk keren & berguna. Jelajahi worlds: RC World, Smart Home, Digital Tools, Lifestyle Gear, Creator Tools.",
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
      "Kurasi rekomendasi produk keren & berguna dari berbagai kategori. Smart picks, not random.",
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
    apple: "/icons/icon-192.png",
  },

  other: {
    "msapplication-TileColor": "#FDF6E3",
    "theme-color": "#FDF6E3",
  },
};
